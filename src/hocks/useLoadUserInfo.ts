import { useEffect, useState } from "react"
import { useUserInfo } from "./useUserInfo"
import { useRequest } from "ahooks"
import { getUserInfoService } from "../services/user"
import { useDispatch } from "react-redux"
import { loginReducer } from "../store/userStore"

export const useLoadUserInfo = () => {
    // 声明状态信息表明是否正在加载 
    const [waitLoaddingUser,setLoadingUser] = useState(true)
    const {username} = useUserInfo()
    const dispatch = useDispatch()
    const {run} = useRequest(getUserInfoService,{
        manual: true,
        // 成功则存储信息
        onSuccess(res){
            const {username,nickname} = res
            dispatch(loginReducer({username,nickname}))
        },
        // 在加载执行结束后更改状态信息
        onFinally() {
            setLoadingUser(false)
        }
    })

    // 查看状态库是否已经加载，如果已经加载则直接返回，如果没有则发送请求获取信息
    useEffect(()=>{
        if(username) {
            setLoadingUser(false)
            return
        }
        run()
    },[username])

    return {
        waitLoaddingUser
    }
}