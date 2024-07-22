import { FC, useState } from "react";
import { useLoadQuestionInfo } from "../../../hocks/useLoadQuestionInfo";
import { Button, Result, Spin } from "antd";
import { usePageInfo } from "../../../hocks/usePageInfo";
import { useNavigate } from "react-router-dom";
import { useTitle } from "ahooks";
import styles from './index.module.scss'
import StatHeader from "./Header";
import { ComponentList } from "./LeftPanel";
import PageStat from "./PageStat";
import { ChartStat } from "./ChartStat";
const Stat: FC = () => {
    const {loading} = useLoadQuestionInfo()
    const {title,isPublished} = usePageInfo()
    const nav = useNavigate()
    useTitle('问卷统计-' + title)

    // 状态提升
    const [selectedId,setSelectedId] = useState('')
    const [selectedType,setSelectedType] = useState('')


    const LoadingElem = (
        <div style={{textAlign:'center',marginTop:'100px'}}>
            <Spin />
        </div>
    )
    // content
    function getContentElem()  {
        if(typeof isPublished === 'boolean' && !isPublished) {
            return ( 
                <div style={{flex:1}}>
                    <Result 
                        status="warning"
                        title="问卷尚未发布"
                        extra={<Button type='primary' onClick={()=>nav(-1)}>
                        返回
                        </Button>}
                    >
                    </Result> 
                </div>
            )
        }
        return <>
            <div className={styles.left}>
                <ComponentList
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    setSelectedType={setSelectedType}
                />
            </div>
            <div className={styles.center}>
                <PageStat
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    setSelectedType={setSelectedType}
                />
            </div>
            <div className={styles.right}>
                <ChartStat
                    selectedId={selectedId}
                    selectedType={selectedType}
                />
            </div>
        </>
    }

    return (
        <div className={styles.container}>
            <StatHeader/>
            {loading && LoadingElem}
            {!loading &&  
            <div className={styles['content-wwrapper']}>
                {getContentElem()}
            </div>}
        </div>       
    )
}

export default Stat