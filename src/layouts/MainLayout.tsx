import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Layout, Spin } from 'antd';
import styles from './MainLayout.module.scss'
import Logo from "../components/Logo";
import UserInfo from "../components/UserInfo";
import { useLoadUserInfo } from "../hocks/useLoadUserInfo";
import { useNavPage } from "../hocks/useNavPage";
const { Header, Footer, Content } = Layout;

const MainLayout: FC = () => {
    const {waitLoaddingUser} = useLoadUserInfo()
    useNavPage(waitLoaddingUser)
    return (
        <Layout>
            <Header className={styles.header}>
                <div className={styles.left}>
                    <Logo />
                </div>
                <div className={styles.right}>
                    <UserInfo />
                </div>
            </Header>
            <Content className={styles.main}>
                {waitLoaddingUser ?  <div style={{marginTop:'100px',textAlign:'center'}}><Spin/></div> 
                                  : <Outlet />}
            </Content>
            <Footer className={styles.footer}>
                问卷星&copy;2023 -present. Created by zhengping
            </Footer>
        </Layout>       
    )
}

export default MainLayout