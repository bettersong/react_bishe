import React, { Component } from 'react'
import {Table, Input} from 'antd'
import store from '../../redux/store'
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
export default class ConnectManage extends Component {
    constructor(props){
        super(props)
        this.state = store.getState()
        store.subscribe(()=>{
            this.setState(store.getState())
        })
    }
    render() {
        const {linkData} = this.state
        return (
            <div style={{ width: '95%' }}>
                <div className="ws_head">
                    <div className="ws_search">

                    </div>
                    <div className="ws_title">
                        {/* <span style={{ color: '#fff' }}>共有数据：{dataTotal}条</span> */}
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
    componentWillUnmount(){
        this.setState = () => {
            return
        }
    }
}
