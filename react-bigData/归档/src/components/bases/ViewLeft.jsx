import React, { Component } from 'react'
// import axios from 'axios'
// import {message} from 'antd'
import leftImg from '../../dist/images/ksh33.png'
import LeftChart from './LeftChart'
import store from '../../redux/store'
// import { useAllDataAction } from '../../redux/actionCreators'
export default class ViewLeft extends Component {
    constructor(props){
        super(props)
        this.state = store.getState()
        store.subscribe(() => {
            this.setState(store.getState())
        })
    }
    scollNews = () => {
        let height = this.refs.newsBox.offsetHeight  //信息框高度
        //console.log(height)    //140
        let [newsBox,news] = [this.refs.newsBox,this.refs.news]
        //console.log(news.scrollTop)    //0
        //console.log(news.offsetHeight-height)   //-140
        this.timer = setInterval(() => {
            if (newsBox.scrollTop > news.offsetHeight - height-4){
                newsBox.scrollTop = 0
            }else{
                newsBox.scrollTop++
            }
        }, 300);
    }
    componentDidMount() {
        this.scollNews()  //消息滚动
    }
    componentWillUnmount() {
        this.scollNews = null     //回收
        clearInterval(this.timer)
        this.setState = (state,callback)=>{
            return
        }
    }
    render() {
        const { warningdata, warningtitle} = this.state
        return (
            <div style={{height: "100%"}}>
                <div className="visual_box">
                    <div className="left_title">
                        <span>系统信息</span>
                        <img src={leftImg} alt="" />
                    </div>
                    <div className="left_main">
                        <p>
                            {warningtitle.map((item, index) => {
                                return <span key={index}>{item}</span>
                            })}
                        </p>
                        <div ref="newsBox" className="left_news">
                            <ul ref="news" id="news">
                                {warningdata.map((item,index)=>{
                                    return <li key={index}>
                                        <span>{item.equipment}</span>
                                        <span className="contSpan">{item.warncontent}</span>
                                        <span className={'stateSpan '+item.warnclass}>{item.warnlever}</span>
                                        <span>{item.warntime.split(' ')[1]}</span>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="visual_box" style={{height: "42%"}}>
                    <div className="left_title">
                        <span>二氧化碳监测</span>
                        <img src={leftImg} alt="" />
                    </div>
                    <LeftChart/>
                </div>
                <div className="last_box">
                    <div className="squer" key="1">
                        <span className="yellow">0%</span>
                        <p>甲烷</p>
                    </div>
                    <div className="squer" key="2">
                        <span className="blue">0%</span>
                        <p>烟雾</p>
                    </div>
                    <div className="squer" key="3">
                        <span className="red">0%</span>
                        <p>火光</p>
                    </div>
                </div>
            </div>
        )
    }
}
