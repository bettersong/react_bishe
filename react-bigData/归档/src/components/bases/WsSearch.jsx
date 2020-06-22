import React, { Component } from 'react'
import {DatePicker,Input} from 'antd'
import store from '../../redux/store'
const {Search} = Input
export default class WsSearch extends Component {
    constructor(props){
        super(props)
        this.state = store.getState()
        store.subscribe(()=>{
            this.setState(store.getState())
        })
    }
    // 根据日期查找数据
    onChange = (value, dataString) => {
        console.log(dataString)
        if (dataString === '') {
            this.setState({
                warningdata: this.state.data
            })
        } else {
            this.setState({
                warningdata: this.state.data.filter((item) => {
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
    render() {
        return (
            <div className="ws_search">
                <DatePicker size="large" placeholder="请选择日期" onChange={this.onChange} />
                <Search placeholder="请输入告警设备" onSearch={this.onSearch} enterButton size="large" style={{ width: '40%', marginLeft: '140px' }} />
            </div>
        )
    }
}
