import { FC} from "react"
import styles from './index.module.scss'
import { Button, Space, Typography } from "antd"
import {  LeftOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { ToolBar } from "./ToolBar"

import { TitleElem } from "./TitleElem"
import { SaveButton } from "./SaveButton"
import { PublishButton } from "./PublishButton"
const  {Title} = Typography

export const Header:FC = () => {
    const nav = useNavigate()
    return(
        <div className={styles['header-wrapper']}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Space>
                        <Button type='link' icon={<LeftOutlined/>} onClick={()=>nav(-1)}>
                            返回
                        </Button>
                        <Title>
                          <TitleElem/>
                        </Title>
                    </Space>
                </div>
                <div className={styles.main}>
                    <ToolBar/>
                </div>
                <div className={styles.right}>
                    <Space>
                        <PublishButton/>
                        <SaveButton/>
                    </Space>
                </div>
            </div>
        </div>
    )
} 