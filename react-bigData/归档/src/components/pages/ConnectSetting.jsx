import React, { Component } from 'react'
import {Table, message} from 'antd'
import axios from 'axios'
const columns = [
    {
        title: '编号',
        dataIndex: 'id',
        key: 1
    },
    {
        title: '联动名称',
        key: 2,
        dataIndex: 'link_name',
    },
    {
        title: '联动条件',
        key: 3,
        dataIndex: 'link_condition',
    },
    {
        title: '联动动作',
        key: 4,
        dataIndex: 'link_action',
    }
];
export default class ConnectSetting extends Component {
    constructor(props){
        super(props)
        this.state = {
            linkData: []
        }
    }
    getLinkData = () => {
        axios.get(window.base_url+ '/Link/getLinkDataAPI')
            .then(res => {
                this.setState({
                    linkData: res.data
                })
                console.log(res)
            }).catch(err=>{
                message.error('阿哦，后台出错了')
            })
    }
    componentDidMount(){
        this.getLinkData()   //获取联动数据
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }
    
    render() {
        const {linkData} = this.state
        return (
            <div style={{width:'95%'}}>
                <Table
                    columns={columns}
                    dataSource={linkData}
                    bordered
                    rowKey='id'
                />
            </div>
        )
    }
}
