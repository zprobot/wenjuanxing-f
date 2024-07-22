import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import { copySelectedComponent, pasteCopiedComponent, removeSeletedComponent, selectNextComponent, selectPrevComponent } from "../store/componentsStore";
import { ActionCreators } from "redux-undo";

function isActiveElementValid() {
    const activeElem = document.activeElement // 获取当前点击的元素
    // 没有输入的元素都是document.body类型
    if(activeElem === document.body) return true
    if(activeElem?.matches('div')) return true // 增加dnd-kit后，元素变为了div
    return false  // imput组件
}

export function useCanvasKeyPress() {
    const dispatch = useDispatch()
    // 删除
    useKeyPress(['backspace','delete'],()=>{
        if(!isActiveElementValid()) return // 如果光标聚焦于input框，按删除键时不会删除组件 
        dispatch(removeSeletedComponent())
    })
    // 复制
    useKeyPress(['ctrl.c','meta.c'],()=>{
        if(!isActiveElementValid()) return
        dispatch(copySelectedComponent())
    })
    // 粘贴
    useKeyPress(['ctrl.v','meta.v'],()=>{
        if(!isActiveElementValid()) return
        dispatch(pasteCopiedComponent())
    })
    // 选中上一个
    useKeyPress(['uparrow'],()=>{
        if(!isActiveElementValid()) return
        dispatch(selectPrevComponent())
    })
    // 选中下一个
    useKeyPress(['downarrow'],()=>{
        if(!isActiveElementValid()) return
        dispatch(selectNextComponent())
    })
    // 撤销
    useKeyPress(['ctrl.z','meta.z'],()=>{
        dispatch(ActionCreators.undo())
    },{
        exactMatch: true // 严格匹配 只能按下ctrl.z触发
    })
    // 重做
    useKeyPress(['ctrl.shift.z','meta.shift.z'],()=>{
        dispatch(ActionCreators.redo())
    },{
        exactMatch: true // 严格匹配 
    })
}