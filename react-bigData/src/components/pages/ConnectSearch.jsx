import React, { Component } from 'react'
import { Table ,Input} from 'antd'
// import axios from 'axios'
import sy from '../../utils/syRequest'
// import store from '../../redux/store'
// import {linkDataAction} from '../../redux/actionCreators'
const syRequest = new sy()
const {Search} = Input
const columns = [
    {
        title: '编号',
        dataIndex: 'id',
        key: 1
    },
    {
        title: '操作名称',
        key: 2,
        dataIndex: 'action',
    },
    {
        title: '操作人',
        key: 3,
        dataIndex: 'username',
    },
    {
        title: '操作时间',
        key: 4,
        dataIndex: 'time',
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
    }
    getLinkData = async () => {
        const res = await syRequest.get('/WarnningData/selectDielogAPI')
        console.log(res,6677)
        if(res.status===200){
            this.setState({
                linkData: res.data,
                searchData: res.data,
                dataTotal: res.data.length
            })
        }
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
                    return item.action === value
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
                        <Search placeholder="请输入操作名称" allowClear onSearch={this.onSearch} enterButton size="default" style={{ width: '28%', marginLeft: '615px' }} />
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
