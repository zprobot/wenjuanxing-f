import { useParams} from "react-router-dom"
import {  getQuestionService } from "../services/question"
import { useRequest } from "ahooks"


export const useLoadQuestionInfo = () => {
    const {id} = useParams()
    async function load() {
        const data = await getQuestionService(id!)
        return data
    }
    const {loading,data,error} = useRequest(load)
    return {
        loading,
        data,
        error
    }
}
