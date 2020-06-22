import React, { Component } from 'react'
import { List, Typography,Input,Radio,Card,Button, message } from 'antd'
import sy from "../../utils/syRequest"
const syRequest = new sy()
export default class AddUser extends Component {
    constructor(props){
        super(props)
        this.state = {
           username: '',
           gender: '男',
           password:'',
           telephone: '',
           permission:'1',
           email: '',
           city: ''
        }
    }
    // 用户名
    userHandle = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    passHandle = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    // 性别
    genderHandle = (e) => {
        this.setState({
            gender: e.target.value
        })
    }
    // 电话
    telHandle = (e) => {
        this.setState({
            telephone: e.target.value
        })
    }
    // 邮箱
    emailHandle = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    // 居住地
    cityHandle = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    // 提交
    submit = async () => {
        try{
            const res = await syRequest.post('/User/addUserAPI',{...this.state})
            console.log(res,9999)
            if(res.status === 200){
                message.success('添加成功')
                this.setState({
                    username: '',
                    gender: '男',
                    password:'',
                    telephone: '',
                    email: '',
                    city: '',
                })
            }
        }catch(err){
            console.log(err)
        }
    }
    render() {
        const { username,password, gender, telephone, email,city } = this.state
       
            return (
                <Card title="添加用户" bordered={false} className="userCard" >
                <List>
                    <List.Item>
                        <Typography.Text mark>姓名</Typography.Text> 
                        <Input value={username} onChange={this.userHandle} placeholder="请输入姓名" />
                    </List.Item>
                    <List.Item>
                        <Typography.Text mark>密码</Typography.Text> 
                        <Input value={password} onChange={this.passHandle} placeholder="请输入密码" />
                    </List.Item>
                    <List.Item>
                        <Typography.Text mark>性别</Typography.Text>
                        <Radio.Group onChange={this.genderHandle} value={gender}>
                            <Radio value="男">男</Radio>
                            <Radio value="女">女</Radio>
                        </Radio.Group>
                    </List.Item>
                    <List.Item>
                        <Typography.Text mark>电话</Typography.Text>
                        <Input value={telephone} onChange={this.telHandle} placeholder="请输入电话" />
                    </List.Item>
                    <List.Item>
                        <Typography.Text mark>邮箱</Typography.Text> 
                        <Input value={email} onChange={this.emailHandle} placeholder="请输入邮箱" />
                    </List.Item>
                    <List.Item>
                        <Typography.Text mark>居住地</Typography.Text>
                        <Input value={city} onChange={this.cityHandle} placeholder="请输入居住地" />
                    </List.Item>
                    <List.Item>
                    <Button type="primary" onClick={this.submit}>确定</Button>
                    </List.Item>
                </List>
                </Card>
            )
       
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }
}
