import React, { Component } from 'react'
import {Table} from 'antd'
// import sy from '../../utils/syRequest'
// const syRequest = new sy()
// const EditableContext = React.createContext();

export default class SearchTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editingKey: '',
        }
    }
    render() {
        const {dataType} = this.props
        let columns
        if(dataType==='temp_data'){
            columns = [
                {
                    title: '编号',
                    dataIndex: 'id',
                    key: 1,
                    render: text => <span>{text}</span>,
                },
                {
                    title: '温度（℃）',
                    dataIndex: `temp`,
                },
                {
                    title: '时间',
                    dataIndex: 'time',
                },
                {
                    title: '日期',
                    dataIndex: 'temp_date',
                },
            ];
        }else if(dataType==='humi_data'){
            columns = [
                {
                    title: '编号',
                    dataIndex: 'id',
                    key: 1,
                    render: text => <span>{text}</span>,
                },
                {
                    title: '湿度（%rh）',
                    dataIndex: `humidity`,
                },
                {
                    title: '时间',
                    dataIndex: 'time',
                },
                {
                    title: '日期',
                    dataIndex: 'humi_date',
                },
            ];
        }else if(dataType==='co2_data'){
            columns = [
                {
                    title: '编号',
                    dataIndex: 'id',
                    key: 1,
                    render: text => <span>{text}</span>,
                },
                {
                    title: '二氧化碳（ppm）',
                    dataIndex: `co2_potency`,
                },
                {
                    title: '时间',
                    dataIndex: 'time',
                },
                {
                    title: '日期',
                    dataIndex: 'co2_date',
                },
            ];
        }else if(dataType==='pm_data'){
            columns = [
                {
                    title: '编号',
                    dataIndex: 'id',
                    key: 1,
                    render: text => <span>{text}</span>,
                },
                {
                    title: '土壤水分（%）',
                    dataIndex: `pm_potency`,
                },
                {
                    title: '时间',
                    dataIndex: 'time',
                },
                {
                    title: '日期',
                    dataIndex: 'pm_date',
                },
            ];
        }
        
        console.log(dataType)
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
