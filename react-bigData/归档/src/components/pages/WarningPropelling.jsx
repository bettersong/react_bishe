import React, { Component } from 'react'
import { DatePicker, Input} from 'antd'
import '../../dist/css/warningSearch.css'
import axios from 'axios'
import store from '../../redux/store'
import { getAllDataAction} from '../../redux/actionCreators'
import MyTable from '../bases/SearchTablePull'
const {Search} = Input
export default class WarningPropelling extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataTotal: 10,
            data:[]
        }
        store.subscribe(()=>{
            this.setState(store.getState())
        })
    }
    // 根据日期查找数据
    onChange = (value,dataString) => {
        console.log(dataString)
        if(dataString === ''){
            this.setState({
                warningdata:this.state.data
            })
        }else{
            this.setState({
            warningdata: this.state.data.filter((item) => {
                return item.warntime.split(' ')[0] === dataString
            })
        })
        }  
    }
    // 输入设备名查找数据
    onSearch = value =>{
        console.log(value)
        if (value === '') {
            this.setState({
                warningdata: this.state.data
            })
        } else {
            this.setState({
                warningdata: this.state.data.filter((item) => {
                    return item.equipment === value
                })
            })
        }  
    }
    componentDidMount() {
        axios.get(window.base_url +'/WarnningData/getWarnningDataAPI')
            .then(res => {
                res.data.warn_message.map(item => {
                    return item.key = item.id
                })
                const action = getAllDataAction(res.data)
                store.dispatch(action)
                this.setState({
                    dataTotal:res.data.warn_message.length,
                    data:res.data.warn_message   //  存一份数据用来日期过滤
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    render() {
        const {dataTotal,warningdata} = this.state
        // console.log(warningdata)
        return (
            <div>
                <div className="ws_head">
                    <div className="ws_search">
                    <DatePicker size="large" placeholder="请选择日期" onChange={this.onChange} />
                    <Search placeholder="请输入告警设备" onSearch={this.onSearch} enterButton size="large" style={{width:'40%',marginLeft:'140px'}} />
                    </div>
                    <div className="ws_title">
                        <span style={{color:'#fff'}}>共有数据：{dataTotal}条</span>
                    </div>
                </div>
                <div className="ws_table">
                    <MyTable data={warningdata}/>
                </div>
            </div>
        )
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }
}
