import { Button, message } from "antd";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useComponentInfo } from "../../../../hocks/useComponentIInfo";
import { usePageInfo } from "../../../../hocks/usePageInfo";
import { useRequest } from "ahooks";
import { updateQuestionService } from "../../../../services/question";

export const PublishButton:FC = () => {
    const {id} = useParams()
    const {componentList=[]} = useComponentInfo()
    const pageInfo = usePageInfo()
    const nav = useNavigate()
    const {loading,run:publish} = useRequest(async()=>{
        if(!id) return
        await updateQuestionService(id,{
            ...pageInfo,
            componentList,
            isPublished:true // 问卷发布
        })
    },{
        manual:true,
        onSuccess(){
            message.success('发布成功')
            nav(`/question/stat/${id}`) // 跳转统计页
        }
    })
    return <Button 
        type="primary" 
        disabled={loading}
        onClick={publish}
        >发布</Button>
}