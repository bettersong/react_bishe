import React, { Component } from 'react'
import { DatePicker, Input,Select} from 'antd'
import '../../dist/css/warningSearch.css'
import sy from '../../utils/syRequest'
// import store from '../../redux/store'
// import { getAllDataAction} from '../../redux/actionCreators'
import MyTable from '../bases/SearchTableHouse'
const syRequest = new sy()
const {Search} = Input
const {Option} = Select
export default class bigHouseData extends Component {
    constructor(props){
        super(props)
        this.state = {
            allData:null,
            dataTotal: null,
            data:[],
            warningdata:[],
            dataType:'temp_data'
        }
    }
    // 根据日期查找数据
    onChange = (value,dataString) => {
        const {dataType} = this.state
        console.log(dataString)
        if(dataString === ''){
            this.setState({
                warningdata:this.state.data
            })
        }else{
            if(dataType==='temp_data'){
                this.setState({
                    warningdata: this.state.data.filter((item) => {
                        return item.temp_date.split(' ')[0] === dataString
                    })
                })
            }else if(dataType==='humi_data'){
                this.setState({
                    warningdata: this.state.data.filter((item) => {
                        return item.humi_date.split(' ')[0] === dataString
                    })
                })
            }else if(dataType==='co2_data'){
                this.setState({
                    warningdata: this.state.data.filter((item) => {
                        return item.co2_date.split(' ')[0] === dataString
                    })
                })
            }else if(dataType==='pm_data'){
                this.setState({
                    warningdata: this.state.data.filter((item) => {
                        return item.pm_date.split(' ')[0] === dataString
                    })
                })
            }
            
        }  
    }
    initData = () => {
        syRequest.get('/WarnningData/getWarnningDataAPI')
            .then(res => {
                this.setState({
                    allData:res.data,
                    dataTotal:res.data.temp_data.length,
                    warningdata:res.data.temp_data,
                    data:res.data.temp_data   //  存一份数据用来日期过滤
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    componentDidMount() {
        this.initData()
    }
    handleChange = (val) => {
        const {allData} = this.state
        console.log(val)
        this.setState({
            dataTotal:allData[val].length,
            data:allData[val] ,  //  存一份数据用来日期过滤
            warningdata:allData[val],
            dataType:val
        })
    }
    render() {
        const {dataTotal,warningdata,dataType} = this.state
        // console.log(warningdata)
        return (
            <div>
                <div className="ws_head">
                    <div className="ws_search2">
                    <Select size="large" defaultValue="temp_data" style={{width:'180px'}} onChange={this.handleChange}>
                        <Option value="temp_data">温度</Option>
                        <Option value="humi_data">湿度</Option>
                        <Option value="co2_data">二氧化碳</Option>
                        <Option value="pm_data">土壤水分</Option>
                        {/* <Option value="sun">光照强度</Option> */}
                        </Select>
                    <DatePicker size="large" placeholder="请选择日期" onChange={this.onChange} />
                    {/* <Search placeholder="请输入告警设备" allowClear onSearch={this.onSearch} enterButton size="large" style={{width:'40%',marginLeft:'140px'}} /> */}
                    
                    </div>
                    <div className="ws_title">
                        <span style={{color:'#fff'}}>共有数据：{warningdata.length}条</span>
                    </div>
                </div>
                <div className="ws_table">
                    <MyTable initData={this.initData} data={warningdata} dataType={dataType}/>
                </div>
            </div>
        )
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }
}
