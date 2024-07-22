import { FC, useEffect } from "react";
import { Button, Typography } from 'antd';
import { useNavigate } from "react-router-dom";
import { MANAGELIST_PATHNAME } from "../../router/router";
import styles from './index.module.scss'
import { http } from "../../utils/http";

const  { Title,Paragraph } = Typography
const Home: FC = () => {
    const nav = useNavigate()
    useEffect(()=>{
        const res = http.get('/question/33')
        console.log(res)
    },[])
    return (
        <>
            <div className={styles.container}>
                <Title>问卷调查 | 在线问卷</Title>
                <Paragraph>已累计创建问卷 100 份，发布文件50份，收到答卷1000份</Paragraph>
                <div>
                    <Button type="primary" onClick={()=>nav(MANAGELIST_PATHNAME)}>开始使用</Button>
                </div>
            </div>
        </>       
    )
}

export default Home