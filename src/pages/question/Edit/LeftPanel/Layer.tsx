import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useComponentInfo } from "../../../../hocks/useComponentIInfo";
import styles from './Layer.module.scss'
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { Button, Input, InputRef, message, Space } from "antd";
import { changeComponentHidden, changeComponentTitle, changeSelectedId, moveComponent, toggleComponentLock } from "../../../../store/componentsStore";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import SortableContainer from "../../../../components/DragSortTable";
import SortableItem from "../../../../components/DragSortTable/sortableItem";
const Layer:FC = () => {
    const {componentList,selectedId} = useComponentInfo()
    const inputRef = useRef<InputRef>(null)
    const dispatch = useDispatch()
    // 记录正在修改的组件
    const [changingTitleId,setChangingTitleId] = useState('')
    useEffect(()=>{
        if(!changingTitleId)return
        inputRef.current?.focus({cursor: 'end',})
    },[changingTitleId])
    function handleTitleClick(id:string){
        let curComp = componentList.find(c=>c.fe_id===id)
        if(curComp && curComp.isHidden) {
            message.info('不能选中隐藏的组件')
            return
        }
        if(id !== selectedId) {
            // 切换选中组件，显示标题
            dispatch(changeSelectedId(id))
            setChangingTitleId('')
            return
        }
        // 组件已被选中，点击修改标题，显示input框
        setChangingTitleId(id)
    }
    function changeTitle(e:ChangeEvent<HTMLInputElement>){
        const newTitle = e.target.value.trim()
        if(!newTitle) return
        if(!selectedId) return
        dispatch(changeComponentTitle({newTitle}))
    }
    function toggleHidden(id:string,isHidden:boolean){
        dispatch(changeComponentHidden({id,isHidden}))
    }
    function toggleLock(id:string){
        dispatch(toggleComponentLock({id}))
    }
    // 组件items属性配置id
    const compListIdItem = componentList.map(c=>{return{...c,id:c.fe_id}})
    // 拖拽排序结束
    function handleDragEnd(oldIndex:number,newIndex:number) {
        dispatch(moveComponent({oldIndex,newIndex}))
    }
    return (<SortableContainer items={compListIdItem} onDragEnd={handleDragEnd}>
        {componentList.map(c=>{
            const {fe_id,title,isHidden,isLocked} = c
            const titleClassName = classNames({
                [styles.title]: true,
                [styles.selected]: fe_id  === selectedId
            })
            return (
                <SortableItem key={fe_id} id={fe_id}>
                    <div className={styles.wrapper}>
                        <div className={titleClassName} onClick={()=>handleTitleClick(fe_id)}>
                            {fe_id ===changingTitleId && 
                            <Input value={title} 
                                onPressEnter={()=>setChangingTitleId('')} 
                                onBlur={()=>setChangingTitleId('')}
                                onChange={changeTitle}
                                ref = {inputRef}
                                /> }
                            {fe_id !== changingTitleId && title}
                        </div>
                        <div className={styles.handler}>
                            <Space align="baseline">
                                <Button
                                    size="small"
                                    shape="circle"
                                    className={!isHidden?styles.btn:''}
                                    icon={<EyeInvisibleOutlined />}
                                    type={isHidden?'primary':'text'}
                                    onClick={()=>toggleHidden(fe_id,!isHidden)}
                                />
                                <Button
                                    size="small"
                                    shape="circle"
                                    className={!isLocked?styles.btn:''}
                                    icon={<LockOutlined />}
                                    type={isLocked?'primary':'text'}
                                    onClick={()=>toggleLock(fe_id)}
                                />
                            </Space>
                        </div>
                    </div>
                </SortableItem>

            )
        })}
    </SortableContainer>)
}

export default Layer