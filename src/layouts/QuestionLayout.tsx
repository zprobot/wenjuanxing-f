import { FC } from "react";
import { Outlet } from "react-router-dom";
import { useLoadUserInfo } from "../hocks/useLoadUserInfo";
import { Spin } from "antd";
import { useNavPage } from "../hocks/useNavPage";

const QuestionLayout: FC = () => {
    const {waitLoaddingUser} = useLoadUserInfo()
    useNavPage(waitLoaddingUser)
    return (
            <div style={{height:'100vh'}}>
                <div>{waitLoaddingUser ?  <div style={{marginTop:'100px',textAlign:'center'}}><Spin/></div> : <Outlet />}</div>
            </div>
    )
}

export default QuestionLayout

