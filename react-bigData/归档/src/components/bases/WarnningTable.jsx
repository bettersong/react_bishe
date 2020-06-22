import React from 'react'
import { Table, Input, Popconfirm, Form,message } from 'antd';
import axios from 'axios'
import qs from 'querystring'
import store from '../../redux/store'
import {bandDeleteAction} from '../../redux/actionCreators'
const EditableContext = React.createContext();
// 多选框
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        const action = bandDeleteAction(selectedRowKeys)
        store.dispatch(action)
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};
class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'disabled') {
            return <Input disabled />;
        }
        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            inputType,
            dataIndex,
            title,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `请输入 ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                        children
                    )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingKey: '',
        }
        store.subscribe(()=>{
            this.setState(store.getState())
        })
        this.columns = [
            {
                title: '编号',
                dataIndex: 'id',
                width: '8%',
                disabled: true,
                editable: true,
            },
            {
                title: '告警设备',
                dataIndex: 'equipment',
                width: '15%',
                disabled: true,
                editable: true,
            },
            {
                title: '告警内容',
                dataIndex: 'warncontent',
                width: '25%',
                disabled: false,
                editable: true,
            },
            {
                title: '告警级别',
                dataIndex: 'warnlever',
                width: '8%',
                disabled: true,
                editable: true,
            },
            {
                title: '告警时间',
                dataIndex: 'warntime',
                width: '20%',
                disabled: true,
                editable: true,
            },
            {
                title: '当前状态',
                dataIndex: 'warnstate',
                width: '10%',
                disabled: false,
                editable: true,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
                            <EditableContext.Consumer>
                                {form => (
                                    <span
                                        onClick={() => this.save(form, record.key)}
                                        style={{ marginRight: 8 }}
                                    >
                                        保存
                                    </span>
                                )}
                            </EditableContext.Consumer>
                            <Popconfirm title="确定取消吗?" onConfirm={() => this.cancel(record.key)}>
                                <span>取消</span>
                            </Popconfirm>
                        </span>
                    ) : (
                            <span disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                                编辑
            </span>
                        );
                },
            },
        ];
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        console.log(form)
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.warningdata];
            console.log(newData)   //警告数据
            const index = newData.findIndex(item => key === item.key);
            console.log(index)
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ warningdata: newData, editingKey: '' });
                // 保存编辑
                axios.post(window.base_url +'/warnningData/saveEditAPI',qs.stringify({
                    id: newData[index].id,
                    warncontent: newData[index].warncontent,
                    warnstate: newData[index].warnstate
                })).then(res=>{
                    if(res.status === 200){
                        message.success('修改成功')
                    }
                }).catch(err=>{
                    message.error(err)
                })
            } else {
                newData.push(row);
                this.setState({ warningdata: newData, editingKey: '' });
            }
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.disabled === true ? 'disabled' : '',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <EditableContext.Provider value={this.props.form}>
                <Table
                    rowSelection={rowSelection}
                    components={components}
                    bordered
                    dataSource={this.props.data.length === 0 ? this.state.warningdata : this.props.data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: this.cancel,
                    }}
                />
            </EditableContext.Provider>
        );
    }
}

const EditableFormTable = Form.create()(EditableTable);
export default EditableFormTable