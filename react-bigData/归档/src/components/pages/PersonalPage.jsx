import React, { Component } from 'react'
import {Card,Avatar,message,Button,Upload} from 'antd'
import sy from '../../utils/syRequest'
import UserContent from '../bases/UserContent'
import store from '../../redux/store'
import {userInfoAction} from '../../redux/actionCreators'
const syRequest = new sy()

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
export default class PersonalPage extends Component {
    constructor(props){       
        super(props)
        this.state = {
            userInfo: {},
            baseHeadContent: <Button onClick={this.editInfo}>编辑</Button>,
            editFlag: false,
            loading: false,
        }
        store.subscribe(()=>{
            this.setState(store.getState())
        })
    }
    // 获取用户信息
    getUserMsg = async () => {
        try{
        const res = await syRequest.post('/Login/getUserMsgAPI',{
            username: sessionStorage.getItem('userKey')
        })
        const action = userInfoAction(res.data)
        store.dispatch(action)
        }catch(err){
        message.error('网络错误，请稍后再试')
        }
    }
    // 编辑用户信息
    editInfo = () => {
        // console.log(111)
        this.setState({
            baseHeadContent: <div><Button type="ghost" style={{color:'#fff'}} onClick={this.cancleEdit}>取消</Button> <Button type="primary" onClick={this.saveEdit}>保存</Button></div>,
            editFlag: true
        })
    }
    // 取消
    cancleEdit = () => {
        this.setState({
            baseHeadContent: <Button onClick={this.editInfo}>编辑</Button>,
            editFlag: false
        })
    }
    // 保存修改
    saveEdit = async () => {
        sessionStorage.setItem('userKey',this.state.userInfo.username)
        try{
        const res = await syRequest.post('/Login/updateUserMsgAPI',{
            userInfo: JSON.stringify(this.state.userInfo)
        })
        if(res.status === 200){
            message.success('修改成功')
            this.setState({
                baseHeadContent: <Button onClick={this.editInfo}>编辑</Button>,
                editFlag: false
            })
        const action = userInfoAction(this.state.userInfo)  //分发action
        store.dispatch(action)
        }
        }catch(err){
            message.error(err)
        }
    }
    // 上传头像
    handleChange = async (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, async imageUrl =>{
                const newUserInfo = this.state.userInfo
                newUserInfo.photo = imageUrl
                try{
                const res = await syRequest.post('/Login/updateUserMsgAPI',{
                    userInfo: JSON.stringify(newUserInfo)
                })
                if(res.status === 200){
                    message.success('上传成功')
                    this.setState({
                        userInfo: newUserInfo
                    })
                    const action = userInfoAction(newUserInfo)
                    store.dispatch(action)
                }
                }catch(err){
                    message.error(err)
                }
            });
        }
    };
    
    componentDidMount() {
        this.getUserMsg()
    }
    componentWillUnmount(){
        this.setState = () =>{
            return
        }
    }
    render() {
        const { username, gender, photo, permission,email,city} = this.state.userInfo
        const { baseHeadContent, editFlag} = this.state
        return (
            <div>
                <Card className="userCard" bordered={false}>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={window.base_url +"/Login/updateUserMsgAPI"}
                        onChange={this.handleChange}
                    >
                    <Avatar style={{width:'60px',height:'60px'}} src={photo} />
                    </Upload>
                    <div className="personMsg">
                        <p>
                        {username}
                        {gender === '男' ? 
                            <i className="iconfont icon-nan" style={{ color:'deepskyblue',marginLeft:'5px'}}></i> : 
                            <i className="iconfont icon-nv" style={{ color:'orangered',marginLeft:'5px'}}></i>
                        }
                        </p>
                        <p className="cecLine">
                            <span><i className="iconfont icon-dingwei"></i>{city}</span>
                            <span><i className="iconfont icon-youxiang"></i>{email}</span>
                            <span><i className="iconfont icon-position"></i>
                            {permission === '2' ? '系统管理员' : '普通用户'}
                            </span>
                        </p>
                    </div>
                    <div className="btnGroup">
                        <Button type="dashed" icon="form" onClick={this.editInfo}>编辑</Button>
                    </div>
                </Card>
                <Card title="基本信息" bordered={false} className="userCard" style={{marginTop:'20px'}} extra={baseHeadContent}>
                    <UserContent userdata={this.state.userInfo} editFlag={editFlag} />
                </Card>
            </div>
        )
    }
}
