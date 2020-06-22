import React, { Component } from 'react'
import { Table, message ,Input} from 'antd'
import axios from 'axios'
import store from '../../redux/store'
import {linkDataAction} from '../../redux/actionCreators'
const {Search} = Input
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
export default class ConnectSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchData: [], //存一份用来过滤
            linkData: [],
            dataTotal: ''
        }
         store.subscribe(()=>{
            this.setState(store.getState())
        })
    }
    getLinkData = () => {
        axios.get(window.base_url + '/Link/getLinkDataAPI')
            .then(res => {
                const action = linkDataAction(res.data)
                store.dispatch(action)
                this.setState({
                    linkData: res.data,
                    searchData: res.data,
                    dataTotal: res.data.length
                })
                console.log(res)
            }).catch(err => {
                message.error('后台崩溃')
            })
    }
    componentDidMount() {
        this.getLinkData()   //获取数据
    }
    onSearch = (value) => {
        if(value === ''){
            this.setState({
                linkData: this.state.searchData
            })
        }else{
            
            this.setState({
                linkData: this.state.searchData.filter(item=>{
                    return item.link_name === value
                }),
                dataTotal: this.state.linkData.length
        })
    }
}
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }

    render() {
        const { linkData, dataTotal } = this.state
        return (
            <div style={{ width: '95%' }}>
                <div className="ws_head">
                    <div className="ws_search">
                        
                    </div>
                    <div className="ws_title">
                        <span style={{ color: '#fff' }}>共有数据：{dataTotal}条</span>
                        <Search placeholder="请输入联动名称" onSearch={this.onSearch} enterButton size="default" style={{ width: '28%', marginLeft: '615px' }} />
                    </div>
                </div>
                <div className="ws_table">
                <Table
                    columns={columns}
                    dataSource={linkData}
                    bordered
                    rowKey='id'
                />
                </div>
            </div>
        )
    }
}
