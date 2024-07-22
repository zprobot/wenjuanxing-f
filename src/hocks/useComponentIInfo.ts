import { useSelector } from "react-redux"
import { StateType } from "../store"
import { ComponentsStateType } from "../store/componentsStore"

 
export const useComponentInfo = () => {
    const components = useSelector<StateType,ComponentsStateType>(state=>state.components.present)
    const {componentList,selectedId,copiedComponent} = components
    const selectComponent = componentList.find(c=>c.fe_id===selectedId)
    
    return {
        componentList,
        selectedId,
        selectComponent,
        copiedComponent
    }
}