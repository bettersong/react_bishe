import React, { Component } from 'react'
import {Table} from 'antd'
const columns = [
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
    }
];
export default class SearchTable extends Component {
    render() {
        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={this.props.data}
                    bordered
                    rowKey = 'id'
                />
            </div>
        )
    }
}
