import React, { Component } from 'react'
import {Table,Popconfirm} from 'antd'
const EditableContext = React.createContext();

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
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = '推送'
                    return editable 
                },
            },
        ];
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
