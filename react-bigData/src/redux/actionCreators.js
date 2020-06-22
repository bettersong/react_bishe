import {
    USERNAME_CHANGE,
    PASSWORD_CHANGE,
    GET_ALL_DATA,
    CHANGE_INDEX_FLAG,
    BAND_DELETE,
    USER_INFO,
    LINK_DATA
} from './actionTypes'

// 用户名
export const usernameAction = (value) => ({
    type:USERNAME_CHANGE,
    value
})
// 密码
export const passwordAction = (value) => ({
    type: PASSWORD_CHANGE,
    value
})
// 监控页面数据
export const getAllDataAction = (value) => ({
    type: GET_ALL_DATA,
    value
})
export const changeIndexFlagAction = (value) => ({
    type: CHANGE_INDEX_FLAG,
    value
})
// 批量删除
export const bandDeleteAction = (value) => ({
    type: BAND_DELETE,
    value
})
// 用户信息
export const userInfoAction = (value) => ({
    type: USER_INFO,
    value
})
// 联动数据
export const linkDataAction = (value) => ({
    type: LINK_DATA,
    value
})
