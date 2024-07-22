import { useRequest } from "ahooks";
import { useState } from "react";
import { updateQuestionService } from "../../../services/question";

export function useToggleStar(initState:boolean,id:string) {
    const [star,setStar] = useState(initState)
    const {run:changeStar,loading:starLoading} = useRequest(async ()=>{
        await updateQuestionService(id,{isStar:!star})
    },{
        manual: true,
        onSuccess(){
            setStar(!star)
        }
    })
    return {
        star,
        changeStar,
        starLoading
    }
}
