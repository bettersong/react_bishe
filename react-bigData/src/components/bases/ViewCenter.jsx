import React, { Component } from 'react'
import {Switch,message,Modal} from 'antd'
import axios from 'axios'
import sy from '../../utils/syRequest'
import qs from 'querystring'
import img1 from '../../dist/images/ksh42.png'
import img2 from '../../dist/images/ksh43.png'
import img3 from '../../dist/images/ksh44.png'
import img4 from '../../dist/images/ksh45.png'
const syRequest = new sy()
const {confirm} = Modal
export default class ViewCenter extends Component {
    constructor(props){
        super(props)
        this.state = {
            stream:null,
            mediaRecorder:null,
            chunk:[],
            recorderFile:null,
            username:sessionStorage.getItem('userKey')       
        }
    }
    // 监控start
    switchVideo = (tag) => {
        console.log(tag)
        if(tag){
            this.sendLog('打开监控')
            if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
                //调用用户媒体设备, 访问摄像头和麦克风
                this.getUserMedia({    //获取流
                    video: { width: '100%', height: '400px' },  //摄像头
                    audio:true    //麦克风
                }, this.success, this.error);
                message.success('打开监控成功！')
            }else {
                message.error('不支持访问用户媒体！');
            }
        }else{
            this.sendLog('关闭监控')
            console.log(this.state,777) 
            // return
            // this.state.stream.getTracks()[0].stop();
            // var trackList = this.state.stream.getTracks()    //  遍历关闭视频流
            // trackList.forEach(item=>{
            //     item.stop()
            // })
            // this.state.mediaRecorder.stop()   //关闭录屏
            //let recorderFile = new Blob(this.state.chunk,{'type': this.state.mediaRecorder.mimeType})  //转为blob类型，二进制大对象
            
            this.refs.video.srcObject = null;
            // this.state.stream.stop()
            console.log(this.state.chunk)    //最终视频流
            message.success('视频监控已关闭')
        }
    }
    getUserMedia=(constraints, success, error)=> {   //获取流
    if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
    } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints, success, error)
    } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error);
    } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, success, error);
    }}
    success = stream => {
        let chunkData = []
        console.log(stream,111)
    //TODO 将视频流设置为video元素的源
    this.setState({
        stream
    })
    this.refs.video.srcObject = stream;
    this.refs.video.play();
    // !存储视频流
    var mediaRecorder = new MediaRecorder(stream) 
    // *每3秒调用一次
    mediaRecorder.start(3000)
    mediaRecorder.onstart = (e) => {
        console.log('开始录制')
    }
    mediaRecorder.ondataavailable = e =>{
        // console.log(e.data)
    chunkData.push(e.data)
    console.log(chunkData,999)
    this.setState({
        chunk:chunkData,
        mediaRecorder
    },function(){
        console.log(this.state,'000000')
    })
    //chunk.push(e.data)
    console.log(this.state.chunk)
    // let reader = new FileReader()
    // reader.addEventListener('loadend',function(){
    //     // 将视频流的blob对象，转成ByteBufffer
    //     let videoBlob = new Uint8Array(reader.result)
    //     console.log(videoBlob)
    // })
    }
    mediaRecorder.onstop = e =>{
        // var _that = this
        this.setState({
            recorderFile: new Blob(chunkData, { 'type': mediaRecorder.mimeType })
        })
        // confirm({
        //     title: '是否保存该段监控?',
        //     // content: '',
        //     onOk() {   //确定
        //         // 保存到数据库
        //         console.log(_that.state.recorderFile)
        //         var url = URL.createObjectURL(_that.state.recorderFile)
        //         var data = new FormData()
        //         data.append('videoData', _that.state.recorderFile)
        //         data.append('savetime', new Date().getTime())
        //         console.log(data.get('videoData'))
        //         axios.post(window.base_url +'/Video/saveVideoAPI',qs.stringify({
        //             videoData: _that.state.recorderFile,
        //             savetime: new Date().getTime()
        //         })).then(res=>{
        //             // console.log(time)
        //             // console.log(url,new Date().getTime())
        //             console.log(_that.state.recorderFile)
        //             console.log(res)
        //         }).catch(err=>{
        //             message.error('保存失败！')
        //         })
        //         // console.log(_that.state.recorderFile)
                
        //         _that.refs.video.src = url
        //         // _that.refs.video.play();
        //         console.log(new Blob(chunkData, { 'type': mediaRecorder.mimeType }))
        //     },
        //     onCancel() {
        //         console.log('Cancel');
        //     },
        // });
    }
   }
   error = (error) => {
        message.error(`访问用户媒体设备失败${error.name}, ${error.message}`);
   }
   // 日志
   sendLog = async (action) => {
       try{
        const res = await syRequest.post('/WarnningData/addDielogAPI',{
            action,
            username:this.state.username,
            time:new Date().toLocaleString()
        })
        if(res.status===200){
            console.log('chenggong')
        }
       }catch(err){
           console.log(err)
       }
        
   }
    // 监控end
    // 警报start
    switchBell = async (tag) => {
        if(tag){
            this.sendLog('打开警报')
            message.warning('警报已开启,系统将通知管理员及时处理')
            const res = await syRequest.post('/WarnningData/sendInform',{
                username:this.state.username,
                time:new Date().toLocaleString(),
                content:'系统异常，请尽快处理'
            })
            console.log(res,779900)
        }else{
            this.sendLog('关闭警报')
            message.success('警报已关闭')
        }
        this.props.startSpell(tag)
    }
    // 警报end
    // 加湿器
    switchJsq = (tag) => {
        if(tag){
            this.sendLog('打开加湿器')
            message.warning('室内过于干燥，加湿器已打开')
        }else{
            this.sendLog('关闭加湿器')
            message.warning('加湿器已关闭')
        }
    }
    // 窗帘
    switchCl = (tag) => {
        if(tag) {
            this.sendLog('打开窗帘')
            message.warning('光照强度过强，窗帘已打开')
        }else{
            this.sendLog('关闭窗帘')
            message.success('窗帘已关闭')
        }
    }
    // 风扇
    switchFs = (tag) => {
        if(tag){
            this.sendLog('打开风扇')
            message.warning('温度过高，风扇已开启')
        }else{
            this.sendLog('关闭风扇')
            message.success('风扇已关闭')
        }
    }
    componentWillMount(){
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        return (
            <div style={{height:"100%"}}>
                <div className="videoBox">
                    <img className="img1" src={img1} alt="" />
                    <img className="img2" src={img2} alt="" />
                    <img className="img3" src={img3} alt="" />
                    <img className="img4" src={img4} alt=""/>
                    <video poster="../../dist/images/ksh41.png" className="videoArea" ref="video" width="480" height="320" controls></video>
                </div>
                <div className="bottomBox">
                    <ul>
                        <li>
                            <Switch defaultChecked onChange={this.switchFs}/>
                            <span>风扇</span>
                        </li>
                        <li>
                            <Switch defaultChecked onChange={this.switchCl}/>
                            <span>窗帘</span>
                        </li>
                        <li>
                            <Switch onChange={this.switchJsq}/>
                            <span>加湿器</span>
                        </li>
                        <li>
                            <Switch onChange={this.switchBell} />
                            <span>警报</span>
                        </li>
                        <li>
                            <Switch onChange={this.switchVideo} />
                            <span>监控</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
