import { useRequest } from "ahooks"
import { getQuestionListService, SearchOption } from "../services/question"
import { LIST_PAGE_PARAAM_KEY, LIST_PAGE_SIZE_PARAM_KEY, LIST_SEARCH_PARAM_KEY } from "../constant"
import { useSearchParams } from "react-router-dom"
type OptionType = Pick<SearchOption,'isStar' | 'isDeleted' | 'page' | 'pageSize'>
export const useLoadQuestionList= (options:Partial<OptionType>={}) => {
    const [searchParams] = useSearchParams()
    const {isStar,isDeleted} = options
    const { data,loading,error,refresh} = useRequest(async () => {
        const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
        const page = parseInt(searchParams.get(LIST_PAGE_PARAAM_KEY) || '') || 1
        const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || 10
        const data =  await getQuestionListService({
            keyword,
            isStar,
            isDeleted,
            page,
            pageSize
        })
        return data
    },{
        refreshDeps: [searchParams] // 依赖项，默认只执行一次
    })
    return {
        data,
        loading,
        error,
        refresh
    }
}