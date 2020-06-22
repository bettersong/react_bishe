import React, { Component } from 'react'
import { List, Typography,Input,Radio } from 'antd'
import store from '../../redux/store'
export default class UserContent extends Component {
    constructor(props){
        super(props)
        this.state = {
           username: '',
           gender: '',
           telephone: '',
           email: '',
           city: '',
           userInfo: {}
        }
        store.subscribe(()=>{
            this.setState(store.getState())
        })
    }
    // 用户名
    userHandle = (e) => {
        const newUserInfo = this.state.userInfo
        newUserInfo.username = e.target.value
        this.setState({
            userInfo: newUserInfo
        })
    }
    // 性别
    genderHandle = (e) => {
        const newUserInfo = this.state.userInfo
        newUserInfo.gender = e.target.value
        this.setState({
            userInfo: newUserInfo
        })
    }
    // 电话
    telHandle = (e) => {
        const newUserInfo = this.state.userInfo
        newUserInfo.telephone = e.target.value
        this.setState({
            userInfo: newUserInfo
        })
    }
    // 邮箱
    emailHandle = (e) => {
        const newUserInfo = this.state.userInfo
        newUserInfo.email = e.target.value
        this.setState({
            userInfo: newUserInfo
        })
    }
    // 居住地
    cityHandle = (e) => {
        const newUserInfo = this.state.userInfo
        newUserInfo.city = e.target.value
        this.setState({
            userInfo: newUserInfo
        })
    }
    render() {
        const {editFlag} = this.props
        const { username, gender, telephone, email,city } = this.state.userInfo
        if(!editFlag){
            return (
                    <List>
                        <List.Item>
                        <Typography.Text mark>姓名</Typography.Text> {username}
                        </List.Item>
                        <List.Item>
                        <Typography.Text mark>性别</Typography.Text> {gender}
                        </List.Item>
                        <List.Item>
                        <Typography.Text mark>电话</Typography.Text> {telephone}
                        </List.Item>
                        <List.Item>
                        <Typography.Text mark>邮箱</Typography.Text> {email}
                        </List.Item>
                    <List.Item>
                        <Typography.Text mark>居住地址</Typography.Text> {city}
                    </List.Item>
                    </List>
            )
        }else{
            return (
                <List>
                    <List.Item>
                        <Typography.Text mark>姓名</Typography.Text> 
                        <Input value={username} onChange={this.userHandle} />
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
                        <Input value={telephone} onChange={this.telHandle} />
                    </List.Item>
                    <List.Item>
                        <Typography.Text mark>邮箱</Typography.Text> 
                        <Input value={email} onChange={this.emailHandle} />
                    </List.Item>
                    <List.Item>
                        <Typography.Text mark>居住地</Typography.Text>
                        <Input value={city} onChange={this.cityHandle} />
                    </List.Item>
                </List>
            )
        }
       
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }
}
