import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../../router/router";
//import { useRequest } from "ahooks";
//import { getUserInfoService } from "../../services/user";
import { UserOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { removeToken } from "../../utils/token";
import { useUserInfo } from "../../hocks/useUserInfo";
import { useDispatch } from "react-redux";
import { logoutReducer } from "../../store/userStore";

const UserInfo:FC = () => {
    const nav = useNavigate()
    const {username,nickname} = useUserInfo()
    const dispatch = useDispatch()
    const logout = () => {
        removeToken()
        dispatch(logoutReducer())
        message.success('退出成功')
        nav(LOGIN_PATHNAME)
    }
    const UserInfo = (
        <>
            <span style={{color: '#e8e8e8'}}>
                <UserOutlined />
                {nickname || username}
            </span>
            <Button type="link" onClick={logout}>退出</Button>
        </>
    )
    const Login = (
        <Link to={LOGIN_PATHNAME}>登录</Link>
    )
    return <div>{username ? UserInfo : Login}</div>
}
export default UserInfo