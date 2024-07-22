import { http, ResDataType } from "../utils/http";
enum API {
    GET_USER_INFO = '/user/info',
    RESISTER_USER ='/user/register',
    LOGIN_USER = '/user/login'
}
type User = {
    username: string,
    password: string,
    nickname?: string
} 
export function getUserInfoService(): Promise<ResDataType> {
    return http.get(API.GET_USER_INFO)
}
export function registerService(data:User): Promise<ResDataType> {
    return http.post(API.RESISTER_USER,data)
}
export function loginService(data:User): Promise<ResDataType> {
    return http.post(API.LOGIN_USER,data)
}