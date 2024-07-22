import { http, ResDataType } from "../utils/http";

enum API {
    BASE = '/stat/'
}

export const getQuestionStatListService = (
    questionId: string,
    opt: {page:number;pageSize:number}
):Promise<ResDataType> => {
    const url = API.BASE + questionId
    return http.get(url,{params:opt})
}

export const getComponentStatService = (questionId:string,componentId:string):Promise<ResDataType> => {
    const url = API.BASE + questionId + '/' + componentId
    return http.get(url)
} 