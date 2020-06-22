import React, { Component } from 'react'
import { Card, Col, Row, Progress,Table} from 'antd'
import axios from 'axios'
import '../../dist/css/home.css'
const testData = [
    {id:'周一',temp:'30',humidity:'29',co2_potency:'26',pm_potency:'33',sun:'68'},
    {id:'周二',temp:'28',humidity:'28',co2_potency:'27',pm_potency:'28',sun:'62'},
    {id:'周三',temp:'33',humidity:'32',co2_potency:'34',pm_potency:'30',sun:'72'},
    {id:'周四',temp:'26',humidity:'30',co2_potency:'25',pm_potency:'38',sun:'54'},
    {id:'周五',temp:'34',humidity:'24',co2_potency:'29',pm_potency:'33',sun:'63'},
    {id:'周六',temp:'31',humidity:'25',co2_potency:'28',pm_potency:'27',sun:'70'},
    {id:'周日',temp:'29',humidity:'31',co2_potency:'30',pm_potency:'26',sun:'63'},
]
const columns = [
    {
        title: '时间（上一周）',
        dataIndex: 'id',
        key:'id',
        render: text => <span>{text}</span>,
    },
    {
        title: '温度（℃）',
        className: 'column-money',
        dataIndex: 'temp',
        key:'temp'
    },
    {
        title: '湿度（%rh）',
        dataIndex: 'humidity',
    },
    {
        title: '二氧化碳（ppm）',
        dataIndex: 'co2_potency',
    },
    {
        title: '土壤水分（%）',
        dataIndex: 'pm_potency',
    },
    {
        title: '光照（cd）',
        dataIndex: 'sun',
    }
];
export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            timer: null,
            template: 30.1,
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
        function myRandom(data,type){
            if(type==='wendu'){
                return ((Math.random() * 9/10) +data).toFixed(1)
            }else{
                return Math.round(Math.random() * 8 + data)
            }
            
        }
        this.timer = setInterval(() => {
            let newtemplate = myRandom(template,'wendu')
            let newhumi = myRandom(humi)
            let newcoData = myRandom(coData)
            let newpmData = myRandom (pmData)
            let newsunData = myRandom(sunData)
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
                    <legend className="dataLine1"><span>实时数据</span></legend>
                </fieldset>
                <Row gutter={20}>
                    <Col span={4}>
                        <Card title="温度" bordered={false}>
                        <Progress type="circle" percent={+template} format={percent => `${percent} ℃`} />
                        </Card>
                    </Col>
                    <Col span={4} className="humi">
                        <Card title="湿度" bordered={false}>
                        <Progress type="circle" percent={humi} format={percent => `${percent} %rh`} />
                        </Card>
                    </Col>
                    <Col span={4} className="co2_potency">
                        <Card title="二氧化碳" bordered={false}>
                        <Progress type="circle" percent={coData} format={percent => `${percent} ppm`} />
                        </Card>
                    </Col>
                    <Col span={4} className="pm">
                        <Card title="土壤水分" bordered={false}>
                            <Progress type="circle" percent={pmData} format={percent => `${percent} %`} />
                        </Card>
                    </Col>
                    <Col span={4} className="sun">
                        <Card title="光照" bordered={false}>
                            <Progress type="circle" percent={sunData} format={percent => `${percent} cd`} />
                        </Card>
                    </Col>
                </Row>
                <fieldset className="home-field-title">
                    <legend className="dataLine2"><span>数据统计（上一周平均值）</span></legend>
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
