import React, { Component } from 'react'
import { DatePicker, Input, Button,Modal,Select,message } from 'antd'
import '../../dist/css/warningSearch.css'
import axios from 'axios'
import qs from 'querystring'
import store from '../../redux/store'
import { getAllDataAction } from '../../redux/actionCreators'
import MyTable from '../bases/WarnningTable'
const { Search } = Input
const {Option} = Select
export default class WarningDeal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataTotal: 10,
            data: [],
            visible: false,
            warningdata:[],
            warning: [],   //查询
            warnEqu: '', //告警设备
            warnCon: '', //告警内容
            warnLever: ''  //告警级别
        }
        store.subscribe(() => {
            this.setState(store.getState())
        })
    }
    // 根据日期查找数据
    onChange = (value, dataString) => {
        console.log(dataString)
        if (dataString === '') {
            this.setState({
                warning: []
            })
        } else {
            this.setState({
                warning: this.state.data.filter((item) => {
                    return item.warntime.split(' ')[0] === dataString
                })
            })
        }
    }
    // 输入设备名查找数据
    onSearch = value => {
        console.log(value)
        if (value === '') {
            this.setState({
                warning: []
            })
        } else {
            this.setState({
                warning: this.state.data.filter((item) => {
                    return item.equipment === value
                })
            })
        }
    }
    // 打开模态框
    openModal = () =>{
        this.setState({
            visible: true
        })
    }
    getDate = () => {
        var time = new Date()
        var year = time.getFullYear()
        var month = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
        var day = time.getDate() > 9 ? time.getDate() : '0' + time.getDate()
        var hour = time.getHours() > 9 ? time.getHours() : '0' + time.getHours()
        var minute = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes()
        var seconds = time.getSeconds() > 9 ? time.getSeconds() : '0' + time.getSeconds()
        time = year + '-' + month + '-' + day + '  ' + hour + ':' + minute + ':' + seconds
        return time
    }
    // 确定(添加)
    handleOk = (e) => {
        var {warnEqu,warnCon,warnLever} = this.state
        console.log(warnEqu,warnCon,warnLever)
        if(warnEqu === '' || warnCon === '' || warnLever === ''){
            message.warning('所有项都不能为空!')
            return
        }
        // 向后台提交数据
        axios.post(window.base_url +'/warnningData/addWarnDataAPI',qs.stringify({
            equipment:warnEqu,    //设备名称
            warncontent: warnCon,   //告警内容
            warnlever: warnLever,  // 告警级别
            warntime: this.getDate()   // 告警时间
        })).then(res=>{
            if(res.status === 200){
                message.success('添加成功，如要在监控页面显示，请在告警推送模块操作')
                this.getData()
            }
            console.log(res)
        }).catch(err=>{
            message.error(err)
            // console.log(err)
        })
        this.setState({
            visible: false
        })
    }
    // 批量删除
    bandDelete = () => {
        // 获取批量删除的id
        var newData = this.state.bandDelete.map(item=>{
            return item
        })
        if(newData.length === 0){
            return message.warning('请先选择要删除的编号！')  
        }
        console.log(newData)
        axios.post(window.base_url +'/warnningData/bandDeleteAPI',qs.stringify({
            ids: JSON.stringify(newData)     //数组需要单独转成json格式
        })).then(res=>{
            message.success('删除成功！')
            this.getData()
        }).catch(err=>{
            message.error(err)
        })
    }
    // 取消
    handleCancel = (e) => {
        this.setState({
            visible: false
        })
    }
    // 告警设备
    warnEquChange = (e) => {
        this.setState({
            warnEqu: e.target.value
        })
    }
    // 告警内容
    warnConChange = (e) => {
        this.setState({
            warnCon : e.target.value
        })
    }
    // 告警级别
    warnleverChange = (value) => {
        this.setState({
            warnLever: value
        })
    }
    getData = () => {
        axios.get(window.base_url+'/WarnningData/getWarnningDataAPI')
            .then(res => {
                res.data.warn_message.map(item => {
                    return item.key = item.id
                })
                const action = getAllDataAction(res.data)
                store.dispatch(action)
                this.setState({
                    dataTotal: res.data.warn_message.length,
                    data: res.data.warn_message,   //  存一份数据用来日期过滤
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    componentDidMount() {
        this.getData()
    }
        // 数组去重
    getWarnningLever = (data) =>{
        var newData = []
        for(var i=0;i<data.length;i++){
            if (newData.indexOf(data[i]) === -1) {
                newData.push(data[i])
            }
        }
        return newData
    }
    componentWillUnmount(){
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        const { dataTotal,warning,data,warnEqu,warnCon} = this.state
        // 找出所有的告警级别
        let warnlever = []
        data.forEach(item=>{
            warnlever.push(item.warnlever)
        })
        // 去重
        warnlever = this.getWarnningLever(warnlever)
        return (
            <div>
                <div className="ws_head">
                    <div className="ws_search">
                        <DatePicker size="large" placeholder="请选择日期" onChange={this.onChange} />
                        <Search placeholder="请输入告警设备" onSearch={this.onSearch} enterButton size="large" style={{ width: '40%', marginLeft: '140px' }} />
                    </div>
                    <div className="ws_title">
                        <Button type="danger" icon="delete" onClick={this.bandDelete}>批量删除</Button>
                        <Button type="primary" icon="plus-circle" onClick={this.openModal} style={{ marginLeft: '5px' }}>添加</Button>
                        <span className="ws_dataTotal">共有数据：{dataTotal}条</span>
                    </div>
                </div>
                <Modal
                title="添加告警"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <div className="inputItem">
                        <Input addonBefore="告警设备" value={warnEqu} onChange={this.warnEquChange} />
                </div>
                <div className="inputItem">
                        <Input addonBefore="告警内容" value={warnCon} onChange={this.warnConChange} />
                </div>
                <div className="inputItem">
                <span className="ant-input-group-wrapper"><span className="ant-input-wrapper ant-input-group"><span className="ant-input-group-addon">告警级别</span>
                    <Select defaultValue="请选择" style={{ width: 390 }} onChange={this.warnleverChange}>
                    {warnlever.map((item,index)=>{
                        return  (
                            <Option key={index} value={item}>{item}</Option>
                        )
                    })}
                    </Select>
                </span></span>
                        
                </div>
                </Modal>
                <div className="ws_table">
                    <MyTable data={warning}/>
                </div>
            </div>
        )
    }
}
