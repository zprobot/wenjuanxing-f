import { useParams} from "react-router-dom"
import {  getQuestionService } from "../services/question"
import { useRequest } from "ahooks"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { changeSelectedId, resetComponents } from "../store/componentsStore"
import { resetPageInfo } from "../store/pageInfoStore"


export const useLoadQuestionInfo = () => {
    const {id=''} = useParams()
    const dispatch = useDispatch()
    const {run,data,loading,error} = useRequest(async(id:string)=>{
        if(!id) throw new Error('没有id')
        const data = await getQuestionService(id)
        return data
    },{
        manual: true
    })
    useEffect(()=>{
        if(!data) return
        const {title='',componentList=[],desc='',js='',css='',isPublished=false} = data
        dispatch(resetComponents(componentList))
        dispatch(changeSelectedId(componentList.length>0?componentList[0].fe_id:''))
        // 重pageInfo
        dispatch(resetPageInfo({title,desc,js,css,isPublished}))
    },[data])
    useEffect(()=>{
        run(id)
    },[id])
    return {
        loading,
        error
    }
}
