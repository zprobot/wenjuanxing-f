import { FC, useRef } from "react"
import styles from './index.module.scss'
import { useNavigate, useParams } from "react-router-dom"
import { Button, Input, InputRef, message, Popover, QRCode, Space, Tooltip, Typography } from "antd"
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from "@ant-design/icons"
import { usePageInfo } from "../../../../hocks/usePageInfo"
const {Title} = Typography
const StatHeader:FC = ()=>{
    const nav = useNavigate()
    const {title,isPublished} = usePageInfo()
    const {id} = useParams()
    const inputRef = useRef<InputRef>(null)
    function copyLink() {
        const elem = inputRef.current
        if(!elem) return
        elem.select() // 选中元素值
        document.execCommand('copy') // 拷贝到剪切板
        message.success('拷贝成功')
    }
    function genLinkAndQRCodeElem() {
        if(!isPublished) return null
        const url = 'http://localhost:5173/question/stat/' +  id

        const QRCodeElem = (<div style={{textAlign:'center'}}>
            <QRCode value={url} size={150}/>
            </div>)
        return (
            <Space>
                <Input value={url} style={{width:'300px'}} ref={inputRef}/>
                <Tooltip title='拷贝链接'>
                    <Button icon={<CopyOutlined/>} onClick={copyLink}/>
                </Tooltip>
                <Popover content={QRCodeElem}>
                    <Button icon={<QrcodeOutlined/>}/>
                </Popover>
            </Space>
        )
    }
    return <div className={styles['header-wrapper']}>
        <div className={styles.left}>
            <Space>
                <Button type='link' icon={<LeftOutlined/>} onClick={()=>nav(-1)}></Button>
                <Title>{title}</Title>
            </Space>
        </div>
        <div className={styles.center}>{genLinkAndQRCodeElem()}</div>
        <div className={styles.right}>
            <Button type='primary' onClick={()=>nav('/question/edit/'+id)}>编辑问卷</Button>
        </div>
    </div>
}

export default StatHeader