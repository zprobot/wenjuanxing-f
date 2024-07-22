import { Button } from "antd";
import { FC } from "react";
import { useComponentInfo } from "../../../../hocks/useComponentIInfo";
import { usePageInfo } from "../../../../hocks/usePageInfo";
import { useParams } from "react-router-dom";
import { useDebounceEffect, useKeyPress, useRequest } from "ahooks";
import { updateQuestionService } from "../../../../services/question";
import { LoadingOutlined } from "@ant-design/icons";

export const SaveButton:FC = () => {
    // pageInfo 和 componentList
    const {id} = useParams()
    const {componentList=[]} = useComponentInfo()
    const pageInfo = usePageInfo()
    const {loading,run:save} = useRequest(async()=>{
        if(!id) return
        await updateQuestionService(id,{...pageInfo,componentList})
    },{
        manual:true
    })
    useKeyPress(['ctrl.s','meta.s'],(e:KeyboardEvent)=>{
        e.preventDefault()
        if(!loading) save()  
    })
    // 自动保存 防抖版
    useDebounceEffect(()=>{
        save()
    },[componentList,pageInfo],{
        wait: 1000 // 1s
    })
    return <Button type='primary' icon={loading?<LoadingOutlined/>:null} disabled={loading} onClick={save}>保存</Button>
}