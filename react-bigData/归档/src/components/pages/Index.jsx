import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import '../../dist/css/index.css'
import store from '../../redux/store'
import ViewLeft from '../bases/ViewLeft'
import ViewCenter from '../bases/ViewCenter'
import ViewRight from '../bases/ViewRight'
import { notification,Spin,Alert } from 'antd';
import { getAllDataAction, changeIndexFlagAction} from '../../redux/actionCreators'
export default class Index extends Component {
    constructor(props){
        super(props)
        this.state = store.getState()
        store.subscribe(()=>{
            this.setState(store.getState())
        })
    }
    // 获取时间
    getDate = () => {
        var time = new Date()
        var year = time.getFullYear()
        var month = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
        var day = time.getDate() > 9 ? time.getDate() : '0' + time.getDate()
        var hour = time.getHours() > 9 ? time.getHours() : '0' + time.getHours()
        var minute = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes()
        var seconds = time.getSeconds() > 9 ? time.getSeconds() : '0' + time.getSeconds()
        time = year + '-' + month + '-' + day + '  ' + hour + ':' + minute + ':' + seconds
        this.refs.date.innerHTML = time
    }
    componentWillMount(){
        if(sessionStorage.getItem('userKey') === null){
            this.props.history.push('/login')
        }
        this.setState(()=>{
            return
        })
        
    }
    componentDidMount() {
        this.getDate()   //获取时间
        this.getData()  //获取数据
        this.timer = setInterval(() => {
            this.getDate()
        }, 1000)
        // 监听路由
        if(this.props.location.state){
            notification['success']({
                message: '智能大数据监控系统',
                description: `欢迎${sessionStorage.getItem('userKey')}`
            });
        }
    }
    // 获取数据
    getData = () => {
        axios.get(window.base_url +'/WarnningData/getWarnningDataAPI')
            .then(res=>{
                const action = getAllDataAction(res.data)
                store.dispatch(action)
                const action2 = changeIndexFlagAction(false)
                store.dispatch(action2)
            })
            .catch(err=>{
                console.log(err)
            })
    }
    componentWillUnmount() {
        clearInterval(this.timer)
        // 防止内存泄漏
        this.setState = (state,callback)=>{
            return
        }
    }
    render() {
        const { systemState, warningdata,indexFlag} = this.state
        console.log(indexFlag)
            return (
                <div className="index_body">
                    {indexFlag ? 
                    <Spin tip="Loading...">
                        <Alert
                            message="正在请求数据"
                            description="请稍后..."
                            type="info"
                        />
                    </Spin>
                    : ''}
                    <div className="head_top">
                        <span className="ht_title">智能大数据监控系统</span>
                        <p ref="date" className="time"></p>
                        <div className="warningBox">
                            <ul>
                                <li ref="warningOne"></li>
                                <li ref="warningTow"></li>
                                <li ref="warningThree"></li>
                            </ul>
                            <span>{systemState}</span>
                        </div>
                        <NavLink to="/home" className="backend">进入系统后台</NavLink>
                    </div>
                    <div className="viewBox">
                        <div className="viewLeft">
                            <ViewLeft warningdata={warningdata} />
                        </div>
                        <div className="viewCenter">
                            <ViewCenter />
                        </div>
                        <div className="viewRight">
                            <ViewRight />
                        </div>
                    </div>
                </div>
            )
        
        
    }
}
