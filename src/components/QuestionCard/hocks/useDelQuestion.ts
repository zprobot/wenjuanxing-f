import { useRequest } from "ahooks"
import { message, Modal } from "antd"
import { useState } from "react"
import { updateQuestionService } from "../../../services/question"

export function useDelQuestion(id:string,icon:any) {
    const [isDel,setDel] = useState(false)
    const {confirm} = Modal

    const {run:delQuestion,loading:delLoading} = useRequest(async()=>await updateQuestionService(id,{
        isDeleted: true
    }),{
        manual: true,
        onSuccess() {
            message.success('删除成功')
            setDel(true)
        }
    })
    const del = () => {
        confirm({
            title:'确认删除吗？',
            onOk: delQuestion,
            icon,
        })
    }
    return {
        del,
        isDel,
        delLoading
    }

}


