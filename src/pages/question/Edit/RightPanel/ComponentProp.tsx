import { FC } from "react";
import { useComponentInfo } from "../../../../hocks/useComponentIInfo";
import { ComponentPropType, getComponentConfByType } from "../../../../components/QuestionComponents";
import { useDispatch } from "react-redux";
import { changeComponentProps } from "../../../../store/componentsStore";
const NoProp:FC = () => {
    return <div style={{textAlign:'center'}}>未选择组件</div>
}
export const ComponentProp:FC = () => {
    const dispatch = useDispatch()
    const {selectComponent} = useComponentInfo()
    if(!selectComponent) return <NoProp/>
    const {type,props,isLocked} = selectComponent
    const selectConf = getComponentConfByType(type)
    if(!selectConf) return <NoProp/>
    function changeProps(newProps:ComponentPropType) {
        if(!selectComponent) return
        const {fe_id} = selectComponent
        dispatch(changeComponentProps({id:fe_id,newProps}))
    }
    const {PropComponent} = selectConf
    return <PropComponent {...props} onChange={changeProps} disabled={isLocked}/>
}