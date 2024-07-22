import { message } from "antd"
import { duplicateQuestionService } from "../../../services/question"
import { useNavigate } from "react-router-dom"
import { useRequest } from "ahooks"

export function useDuplicateQuestion(id:string) {
    const nav = useNavigate()
    const {run:duplicate,loading:dupLoading} = useRequest(async()=>{
        const data = await duplicateQuestionService(id)
        return data
    },{
        manual: true,
        onSuccess(res){
            const {id} = res
            message.success('复制成功')
            nav(`/question/edit/${id}`)
        }
    })
    return {
        duplicate,
        dupLoading
    }
}
