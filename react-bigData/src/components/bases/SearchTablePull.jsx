import React, { Component } from 'react'
import {Table,Button,message} from 'antd'
import sy from '../../utils/syRequest'
const syRequest = new sy()
// const EditableContext = React.createContext();

export default class SearchTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editingKey: '',
        }
        this.columns = [
            {
                title: '编号',
                dataIndex: 'id',
                key: 1,
                render: text => <span>{text}</span>,
            },
            {
                title: '告警设备',
                dataIndex: 'equipment',
            },
            {
                title: '告警内容',
                dataIndex: 'warncontent',
            },
            {
                title: '告警级别',
                dataIndex: 'warnlever',
            },
            {
                title: '告警时间',
                dataIndex: 'warntime',
            },
            {
                title: '当前状态',
                dataIndex: 'warnstate',
            },
            {
                title: '是否推送',
                dataIndex: 'warn_tag',
                render: (text,record) => {
                    return record.warn_tag==1?'是':'否'
                }
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                const editable = <Button type={record.warn_tag==1?'dashed':'primary'} onClick={this.pullData.bind(this,record)}>{record.warn_tag==1?'取消推送':'推送'}</Button>
                    return editable 
                },
            },
        ];
    }
    pullData = async (item) => {
        const res = await syRequest.post('/WarnningData/pullWarningMsgAPI',{
            id:item.id,
            warn_tag:item.warn_tag==1?2:1
        })
        if(res.status === 200){
            if(item.warn_tag==2){
                message.success('推送成功，请前往系统前台查看～')
            }else{
                message.success('已取消该报警推送～')
            }
            this.props.initData()
        }
        console.log(res,777)
        
    }
    render() {
        return (
            <div>
                <Table
                    columns={this.columns}
                    dataSource={this.props.data}
                    bordered
                    rowKey = 'id'
                />
            </div>
        )
    }
}
