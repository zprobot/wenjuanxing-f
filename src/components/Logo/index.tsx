import { FormOutlined } from "@ant-design/icons"
import { Space, Typography } from "antd"
import { FC, useEffect, useState } from "react"
import styles from './index.module.scss'
import { Link } from "react-router-dom"
import { useUserInfo } from "../../hocks/useUserInfo"
import { MANAGELIST_PATHNAME } from "../../router/router"
const { Title } = Typography
const Logo:FC = () => {
    const {username} = useUserInfo()
    const [pathname,setPathname] = useState('/')
    useEffect(()=>{
        if(username) setPathname(MANAGELIST_PATHNAME)
    },[username])
    return (
        <div className={styles.container}>
            <Link to={pathname}>
                <Space >
                    <Title>
                        <FormOutlined/>
                    </Title>
                    <Title>
                        问卷星
                    </Title>
                </Space>
            </Link>
        </div>

    )
    
}
export default Logo