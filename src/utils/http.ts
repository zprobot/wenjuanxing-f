import { message } from "antd";
import axios from "axios";
import { getToken } from "./token";

export const http = axios.create({
    baseURL: '/api',
    timeout: 5000
})
export type ResType = {
    errno: number
    data?: ResDataType
    msg?: string
}
export type ResDataType = {
    [key:string]: any
}
http.interceptors.request.use((config)=>{
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
},error=> Promise.reject(error));

http.interceptors.response.use(
    res => {
        const resData = (res.data || {}) as ResType
        const {errno, data, msg} = resData
        if(errno !==0) {
            if(msg) {
                message.error(msg)
            }
            throw new Error(msg)
        }
        return data as any
    },
)