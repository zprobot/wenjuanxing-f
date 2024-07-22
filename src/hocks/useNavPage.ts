import { useLocation, useNavigate } from "react-router-dom";
import { useUserInfo } from "./useUserInfo";
import { useEffect } from "react";
import { isLoginOrRegister, isNoNeedLoginPath, LOGIN_PATHNAME, MANAGELIST_PATHNAME } from "../router/router";

export function useNavPage(waitLoaddingUser:boolean){
    const {username} = useUserInfo()
    const {pathname} =  useLocation()
    const nav = useNavigate()
    useEffect(()=>{
        if(waitLoaddingUser) return
        // 登陆后不准在访问登录页和注册页
        if(username) {
            if(isLoginOrRegister(pathname)) {
                nav(MANAGELIST_PATHNAME)
            }
            return
        }
        // 未登录不需要用户信息跳转
        if(isNoNeedLoginPath(pathname)) {
            return 
        } else {
            // 未登录需要用户信息，跳转到登录页
            nav(LOGIN_PATHNAME)
        }
    },[waitLoaddingUser,username,pathname])
}