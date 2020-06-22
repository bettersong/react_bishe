import React, { Component } from 'react'
import axios from 'axios'
import {Row,Col} from 'antd'
export default class Video extends Component {
    constructor(props){
        super(props)
        this.state = {
            flag:false,
            movieList:[
                {id:1,name:'监控1',src:''},
                {id:2,name:'监控2',src:''},
                {id:3,name:'监控3',src:''},
                {id:4,name:'监控4',src:''},
                {id:5,name:'监控5',src:''},
                {id:6,name:'监控6',src:''},
            ]
        }
    }

    componentWillMount(){
        axios.get(window.base_url + '/Video/getVideoAPI').then(res=>{
            console.log(res)
            this.setState({
                flag:true,
                // movieList:res.data
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    setControls = () => {
        this.refs.video.setAttribute('controls',true)
    }
    render() {
        const {flag,movieList} = this.state
        console.log(flag,movieList,99)
        if(flag){
            return (
                 <div >
                    <Row>
                    <Col className="videobox" span={16} onMouseOver={this.setControls}>
                            <video ref="video" src="" className="video" controls></video>
                    </Col>
                    <Col className="videoDiv videoList" push={1} span={6}>
                        {movieList.map(item => {
                            return <div className="videoItem" key={item.id}>{item.name}</div> 
                        })}   
                    </Col>
                    </Row>
                </div>
            )
        }else{
            return (
                <div>正在请求数据</div>
            )
        }
        
    }
}
