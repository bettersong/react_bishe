// import {combineReducers} from 'redux'
import {
    USERNAME_CHANGE,
    PASSWORD_CHANGE,
    GET_ALL_DATA,
    CHANGE_INDEX_FLAG,
    BAND_DELETE,
    USER_INFO,
    LINK_DATA
} from './actionTypes'
const defaultState = {
    warningtitle: ["告警设备", "告警内容", "告警级别", "告警时间"],
    systemState:'正常',
    indexFlag:true,
    username:'',
    password:'',
    warningdata:[],
    co2data:[],
    pmdata:[],
    tempdata:[],
    humidata:[],
    bandDelete: [],
    linkData: []
}
export default(state = defaultState,action)=>{
    if (action.type === USERNAME_CHANGE) {        // 用户名
        let newState = JSON.parse(JSON.stringify(state))  //深度拷贝
        newState.username = action.value
        return newState
    }else if(action.type === PASSWORD_CHANGE){    //密码
        let newState = JSON.parse(JSON.stringify(state))
        newState.password = action.value
        return newState
    }else if(action.type === GET_ALL_DATA){       //监控页面数据
        let newState = JSON.parse(JSON.stringify(state))
        newState.warningdata = action.value.warn_message
        newState.co2data = action.value.co2_data
        newState.pmdata = action.value.pm_data
        newState.tempdata = action.value.temp_data
        newState.humidata = action.value.humi_data
        return newState
    } else if (action.type === CHANGE_INDEX_FLAG) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.indexFlag = action.value
        return newState
    }else if(action.type === BAND_DELETE){    //批量删除
        let newState = JSON.parse(JSON.stringify(state))
        newState.bandDelete = action.value
        return newState
    }else if(action.type === USER_INFO){    // 用户信息
        let newState = JSON.parse(JSON.stringify(state))
        newState.userInfo = action.value
        return newState
    }else if(action.type === LINK_DATA){//联动数据
        let newState = JSON.parse(JSON.stringify(state))
        newState.linkData = action.value
        return newState
    }

    return state
}