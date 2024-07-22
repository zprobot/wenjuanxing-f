import { ComponentType } from "../store/componentsStore";

export function getNextSelectedId(fe_id:string,componentList:ComponentType[]):string{
    const visibleComp = componentList.filter(c=>!c.isHidden)
    const index = visibleComp.findIndex(c=>c.fe_id===fe_id)
    if(index<0) return ''
    let newSelectedId = ''
    const len = visibleComp.length
    if(len<=1) {
        newSelectedId = ''
    } else {
        if(index+1 === len) {
            newSelectedId = visibleComp[index-1].fe_id
        } else {
            newSelectedId = visibleComp[index+1].fe_id
        }
    }
    return newSelectedId
}