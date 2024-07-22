import {Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { getComponentStatService } from "../../../../services/stat";
import { useParams } from "react-router-dom";
import { getComponentConfByType } from "../../../../components/QuestionComponents";
const {Title} = Typography
type PropsType = {
    selectedId: string
    selectedType: string
}
export const ChartStat:FC<PropsType> = ({
    selectedId,
    selectedType
}) => {
    const {id=''} = useParams()
    const [stat,setStat] = useState([])
    const {run} = useRequest(async (questionId:string,componentId:string) => await getComponentStatService(questionId,componentId),{
        manual: true,
        onSuccess(res){
            setStat(res.stat)
        }
    })
    useEffect(()=>{
        if(selectedId) run(id,selectedId)
    },[id,selectedId])
    console.log(stat)
    // 生成图表
    function genStatElem() {
        if(!selectedId) return <div>未选中组件</div>
        const targetComponentConf = getComponentConfByType(selectedType)
        const { StatComponent } = targetComponentConf || {}
        if(!StatComponent) return <div>无统计图表</div>
        return <StatComponent stat={stat}/>
    }
    return (
        <>
            <Title level={3}>图表统计</Title>
            {genStatElem()}
        </>
    )
}