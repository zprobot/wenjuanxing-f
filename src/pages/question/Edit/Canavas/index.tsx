import {  FC, MouseEvent } from "react";
import styles from './index.module.scss'
import { Spin } from "antd";
import { useComponentInfo } from "../../../../hocks/useComponentIInfo";
import { changeSelectedId, ComponentType, moveComponent } from "../../../../store/componentsStore";
import { getComponentConfByType } from "../../../../components/QuestionComponents";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { useCanvasKeyPress } from "../../../../hocks/useCanvasKeyPress";
import SortableContainer from "../../../../components/DragSortTable";
import SortableItem from "../../../../components/DragSortTable/sortableItem";
function genComp(compInfo:ComponentType){
    const {type,props} = compInfo
    const compConf = getComponentConfByType(type)
    if(!compConf) return null
    const {Component} = compConf
    return <Component {...props}/>
}
export const Canavas:FC<{
    loading: boolean
}> = ({loading}) => {
    const {componentList,selectedId} = useComponentInfo()
    const dispatch = useDispatch()
    useCanvasKeyPress()
    function handleClick(e:MouseEvent,id:string) {
        e.stopPropagation() // 阻止向上冒泡
        dispatch(changeSelectedId(id))
    }

    if(loading) {
        return <div style={{textAlign:'center',marginTop:'24px'}}>
            <Spin/>
        </div>
    }
    const compListIdItem = componentList.map(c=>{return{...c,id:c.fe_id}})
    // 拖拽排序结束
    function handleDragEnd(oldIndex:number,newIndex:number) {
            dispatch(moveComponent({oldIndex,newIndex}))
    }
    return <SortableContainer items={compListIdItem} onDragEnd={handleDragEnd}>
            <div className={styles.canvas}>
            {
                componentList
                    .filter(c=>!c.isHidden)
                    .map(c=>{
                    const {fe_id,isLocked} = c
                    const wrapper = classNames({
                        [styles['conponent-wrapper']]:true,
                        [styles.selected]: fe_id === selectedId,
                        [styles.locked]: isLocked
                    })
                    return (
                        <SortableItem key={fe_id} id={fe_id}>
                            <div className={wrapper} onClick={(e)=>handleClick(e,fe_id)}>
                                <div className={styles.component}>
                                    {genComp(c)}
                                </div>
                            </div>
                        </SortableItem>
                    )
                })
            }
            </div>
    </SortableContainer>

}