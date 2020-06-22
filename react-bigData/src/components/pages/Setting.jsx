import React, { Component } from 'react'
import {Table,Input,Button,Modal, message} from 'antd'
import sy from "../../utils/syRequest"
const syRequest = new sy()
const {Search} = Input

export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: null,
            data:[],
            oldData:[],
            modalFlag:false,
            editName:null,
            id:null
        }
        this.columns = [
            {
                title: '编号',
                dataIndex: 'id',
                key: 1,
                render: text => <span>{text}</span>,
            },
            {
                title: '用户名',
                dataIndex: 'username',
            },
            {
                title: '性别',
                dataIndex: 'gender',
            },
            {
                title: '手机号',
                dataIndex: 'telephone',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '地址',
                dataIndex: 'city',
            },
            {
                title: '权限',
                dataIndex: 'permission',
                render: text => text==2?'管理员':'普通用户'
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    const editable1 = 
                    <span>
                        <Button type="primary" onClick={this.edit.bind(this,record)}>权限分配</Button> 
                        <Button type="danger" onClick={this.deleteUser.bind(this,record)}>删除</Button>
                    </span>
                    const editable2 = 
                    <span>
                        <Button type="primary" onClick={this.edit.bind(this,record)}>权限分配</Button>
                    </span>
                    // <Button type="primary" onClick={this.edit.bind(this,record)}>权限分配</Button>
                    return record.permission == 2?editable2:editable1
                },
            },
        ];
    }
    edit = async (item) => {
        if(item.permission == 2){
            return message.warning('该用户已经是最高权限啦！')
        }
        this.setState({
            modalFlag:true,
            editName:item.username,
            id:item.id
        })
        console.log(item)

    }
    deleteUser = async (item) => {
        const res = await syRequest.post('/User/deleteUserAPI',{
            id:item.id
        })
        if(res.status===200){
            message.success('该用户已删除～')
            this.initData()
        }else{
            message.error('网络错误，请稍后再试～')
        }
    }
    // 权限分配
    handleOk = async () => {
        const {id} = this.state
        try{
            const res = await syRequest.post('/User/editPermissionAPI',{
                id,
                permission:2
            })
            if(res.status === 200){
                this.setState({
                    modalFlag:false
                })
                message.success('权限分配成功')
                this.initData()
            }
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }
    // 查询
    onSearch = v => {
        if (v === '') {
            this.setState({
                data: this.state.oldData
            })
        } else {
            this.setState({
                data: this.state.oldData.filter((item) => {
                    return item.username === v
                })
            })
        }
    }
    handleCancel = () => {
        this.setState({
            modalFlag:false
        })
    }
    initData = async () => {
        try{
            const res = await syRequest.get('/User/selectUserAPI')
            if(res.status === 200) {
                console.log(res,88)
                this.setState({
                    data:res.data,
                    oldData:res.data,
                    total:res.data.length
                })
            }
        }catch(err) {
            console.log(err)
        }
    }
    componentDidMount(){
        this.initData()
    }
    render() {
        const {data,modalFlag,editName} = this.state
        return (
            <div>
                <div className="ws_head" style={{marginBottom:'20px'}}>
                    <div className="ws_search">
                        
                    </div>
                    <div className="ws_title">
                        <span style={{ color: '#fff' }}>共有数据：{this.state.total}条</span>
                        <Search placeholder="请输入用户名" allowClear onSearch={this.onSearch} enterButton size="default" style={{ width: '28%', marginLeft: '615px' }} />
                    </div>
                </div>
                <Table
                    columns={this.columns}
                    dataSource={data}
                    bordered
                    rowKey = 'id'
                />
                <Modal
                title="权限分配"
                visible={modalFlag}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <p>确定将<span style={{color:'red',fontSize:'20px'}}>{editName}</span>的权限修改为管理员权限吗？</p>
                </Modal>
            </div>
        )
    }
}
