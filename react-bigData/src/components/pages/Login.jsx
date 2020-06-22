import React, { Component } from 'react'
import {Form, Icon, Input, Button, message} from 'antd'
import axios from 'axios'
import qs from 'querystring'
import '../../dist/css/login.css'
import store from '../../redux/store'
import {usernameAction,passwordAction} from '../../redux/actionCreators'
export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = store.getState()
        store.subscribe(()=>{
            this.setState(store.getState())
        })
    }
    userNameChange = (e) => {
        let action = usernameAction(e.target.value)
        store.dispatch(action)
    }
    passWordChange = (e) => {
        let action = passwordAction(e.target.value)
        store.dispatch(action)
    }
    // 登录
    loginHandle = () => {
        axios.post(window.base_url +'/Login/login',qs.stringify({
            username:this.state.username,
            password:this.state.password
        })).then(res=>{
            if(res.data === 0){
                message.error('用户名或密码不正确！')   //
            }else{
                // 登陆成功，存储一个用户信息用来判别当前系统是否有用户登陆
                sessionStorage.setItem('userKey',this.state.username)
                this.props.history.push({pathname:'/',state:{oldPath:'/login'}})
            }
        })
        .catch(err=>{
            message.error(err)
        })
    }
    componentWillUnmount() {
        this.setState = (item, callback) =>{
            return
        }
    }
    
    render() {
        const {username,password} = this.state
        return (
            <div className="loginBody">
                <div className="loginBox">
                    <h3>用户登录</h3>
                    <Form className="login-form">
                        <Form.Item>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                value={username}
                                onChange={this.userNameChange}
                                required
                            />
                        </Form.Item>
                        <Form.Item >
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={this.passWordChange}
                                required
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" block className="login-form-button" onClick={this.loginHandle}>
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
