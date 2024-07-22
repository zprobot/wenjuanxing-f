import { http, ResDataType } from "../utils/http";

enum API {
    QUESTION= '/question/',
    DUPLICATE = '/question/duplicate/'
}
export type SearchOption = {
    keyword: string
    isStar: boolean
    isDeleted: boolean
    page: number
    pageSize: number
}
// 单个问卷信息1
export function getQuestionService(id:string): Promise<ResDataType> {
    const url = API.QUESTION + id
    return http.get(url)
}
// 创建问卷
export function createQuestionService(): Promise<ResDataType> {
    return http.post(API.QUESTION)
}
// 获取问卷列表
export function getQuestionListService(options:Partial<SearchOption>={}): Promise<ResDataType> {
    return http.get(API.QUESTION,{params:options})
}

// 更新问卷
export function updateQuestionService(id:string,options:{[key:string]:any}): Promise<ResDataType> {
    const url = API.QUESTION + id
    return http.patch(url,options)
}
// 复制问卷
export function duplicateQuestionService(id:string):Promise<ResDataType> {
    const url = API.DUPLICATE + id
    return http.post(url)
}
// 删除问卷
export function deleteQuestionService(ids:string[]):Promise<ResDataType>{
    return http.delete(API.QUESTION,{
        data:{
            ids
        }
    })
}