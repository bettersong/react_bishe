import React, { Component } from 'react'
import { Card, Col, Row, Progress,Table} from 'antd'
import axios from 'axios'
import '../../dist/css/home.css'
const testData = [
    {id:1,temp:'30',humidity:'40',co2_potency:'20',pm_potency:'33',sun:'28'},
    {id:2,temp:'28',humidity:'28',co2_potency:'23',pm_potency:'28',sun:'22'},
    {id:3,temp:'33',humidity:'32',co2_potency:'34',pm_potency:'30',sun:'32'},
    {id:4,temp:'26',humidity:'30',co2_potency:'25',pm_potency:'38',sun:'34'},
    {id:5,temp:'34',humidity:'44',co2_potency:'29',pm_potency:'33',sun:'43'},
    {id:6,temp:'31',humidity:'25',co2_potency:'19',pm_potency:'21',sun:'20'},
    {id:7,temp:'29',humidity:'31',co2_potency:'22',pm_potency:'26',sun:'23'},
    {id:8,temp:'30',humidity:'43',co2_potency:'32',pm_potency:'33',sun:'28'},
]
const columns = [
    {
        title: '统计',
        dataIndex: 'id',
        key:'id',
        render: text => <span>{text}</span>,
    },
    {
        title: '温度',
        className: 'column-money',
        dataIndex: 'temp',
        key:'temp'
    },
    {
        title: '湿度',
        dataIndex: 'humidity',
    },
    {
        title: '二氧化碳',
        dataIndex: 'co2_potency',
    },
    {
        title: 'PM2.5',
        dataIndex: 'pm_potency',
    },
    {
        title: '光照',
        dataIndex: 'sun',
    }
];
export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            timer: null,
            template: 30,
            humi: 20,
            coData: 28,
            pmData: 26,
            sunData: 70
        }
    }
    getDataStatic = () => {
        axios.get(window.base_url + '/WarnningData/getDataByDateAPI')
            .then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
    }
    componentDidMount() {
        this.getDataStatic()
        this.dataRandom()
    }
    dataRandom = () => {
        const { template, humi, coData, pmData, sunData } = this.state
        function myRandom(data){
            return Math.round(Math.random() * 8 + data)
        }
        this.timer = setInterval(() => {
            var newtemplate = myRandom(template)
            var newhumi = myRandom(humi)
            var newcoData = myRandom(coData)
            var newpmData = myRandom (pmData)
            var newsunData = myRandom(sunData)
            this.setState({
                template: newtemplate,
                humi: newhumi,
                coData: newcoData,
                pmData: newpmData,
                sunData: newsunData
            })
        }, 2000);
           
    }
    componentWillUnmount(){
        clearInterval(this.timer)
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        const {template,humi,coData,pmData,sunData} = this.state
        return (
            <div className="home">
                <fieldset className="home-field-title">
                    <legend><span>实时数据</span></legend>
                </fieldset>
                <Row gutter={20}>
                    <Col span={4}>
                        <Card title="温度" bordered={false}>
                        <Progress type="circle" percent={template} format={percent => `${percent} ℃`} />
                        </Card>
                    </Col>
                    <Col span={4} className="humi">
                        <Card title="湿度" bordered={false}>
                        <Progress type="circle" percent={humi} format={percent => `${percent} %`} />
                        </Card>
                    </Col>
                    <Col span={4} className="co2_potency">
                        <Card title="二氧化碳" bordered={false}>
                        <Progress type="circle" percent={coData} format={percent => `${percent} %`} />
                        </Card>
                    </Col>
                    <Col span={4} className="pm">
                        <Card title="PM2.5" bordered={false}>
                            <Progress type="circle" percent={pmData} format={percent => `${percent} %`} />
                        </Card>
                    </Col>
                    <Col span={4} className="sun">
                        <Card title="光照" bordered={false}>
                            <Progress type="circle" percent={sunData} format={percent => `${percent} %`} />
                        </Card>
                    </Col>
                </Row>
                <fieldset className="home-field-title">
                    <legend><span>数据统计</span></legend>
                </fieldset>
                <Table
                    columns={columns}
                    dataSource={testData}
                    bordered
                    style={{marginBottom: '60px'}}
                    rowKey = 'id'
                />
            </div>
        )
    }
}
