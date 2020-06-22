import React, { Component } from 'react'
import { Table ,Input,Button,message} from 'antd'
// import axios from 'axios'
import sy from '../../utils/syRequest'
// import store from '../../redux/store'
// import {linkDataAction} from '../../redux/actionCreators'
const syRequest = new sy()
const {Search} = Input

export default class SolutionSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchData: [], //存一份用来过滤
            linkData: [],
            dataTotal: ''
        }
    }
    readMsg = async item => {
        console.log(item.id)
        const res = await syRequest.post('/WarnningData/readMsg',{
            id:item.id
        })
        if(res.status===200){
            this.setState({})
            this.getLinkData()
            // this.props.getLinkData()
            window.location.reload()
            message.success('读取成功～')
            
        }
    }
    getLinkData = async () => {
        const res = await syRequest.post('/WarnningData/selectInform',{
            username:sessionStorage.getItem('userKey')
        })
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
        const columns = [
            {
                title: '编号',
                dataIndex: 'id',
                key: 1
            },
            {
                title: '通知内容',
                key: 2,
                dataIndex: 'content',
            },
            {
                title: '通知发起人',
                key: 3,
                dataIndex: 'sender',
            },
            {
                title: '通知时间',
                key: 4,
                dataIndex: 'time',
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                const editable = <Button type={record.read_tag==2?'dashed':'primary'} disabled={record.read_tag==2} onClick={this.readMsg.bind(this,record)}>{record.read_tag==1?'未读':'已读'}</Button>
                    return editable 
                },
            },
        ];
        return (
            <div style={{ width: '95%' }}>
                <div className="ws_head">
                    <div className="ws_search">
                        
                    </div>
                    <div className="ws_title">
                        <span style={{ color: '#fff' }}>共有数据：{dataTotal}条</span>
                        {/* <Search placeholder="请输入操作名称" allowClear onSearch={this.onSearch} enterButton size="default" style={{ width: '28%', marginLeft: '615px' }} /> */}
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
