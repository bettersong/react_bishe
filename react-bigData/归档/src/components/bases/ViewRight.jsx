import React, { Component } from 'react'
import rightImg from '../../dist/images/ksh33.png'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line} from 'recharts';
import store from '../../redux/store'
export default class ViewRight extends Component {
    constructor(props){
        super(props)
        this.state = store.getState()
        store.subscribe(()=>{
            this.setState(store.getState())
        })
    }
    componentWillUnmount(){
        this.getDate = null
        this.setState = (state,callback)=>{
            return
        }
    }
    render() {
        const {pmdata,tempdata} = this.state
        return (
            <div>
                <div className="visual_box">
                    <div className="left_title">
                        <span>PM2.5监测</span>
                        <img src={rightImg} alt="" />
                    </div>
                    <BarChart
                        width={500}
                        height={300}
                        data={pmdata}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pm_potency" fill="#F9972F" />
                    </BarChart>
                </div>
                <div className="visual_box">
                    <div className="left_title">
                        <span>温度,湿度监测</span>
                        <img src={rightImg} alt="" />
                    </div>
                    <LineChart
                        width={500}
                        height={300}
                        data={tempdata}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="temp" stroke="rgb(214, 39, 40)" activeDot={{ r: 8 }} />
                        <Line yAxisId="right" type="monotone" dataKey="humi" stroke="#3AFA04" />
                    </LineChart>
                </div>
            </div>
        )
    }
}
