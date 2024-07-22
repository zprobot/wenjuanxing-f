import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropType } from "../components/QuestionComponents";
import { produce } from "immer";
import { getNextSelectedId } from "../utils/component";
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from "nanoid";
import { arrayMove } from "@dnd-kit/sortable";
export type ComponentType = {
     fe_id:string
     type:string
     title:string
     isHidden?: boolean
     isLocked?: boolean
     props: ComponentPropType
}
export type ComponentsStateType = {
    selectedId: string
    componentList: ComponentType[]
    copiedComponent: ComponentType | null
}
const INIT_STATE: ComponentsStateType = {
    selectedId: '',
    componentList: [],
    copiedComponent: null
}
export const componentsSlice = createSlice({
    name: 'components',
    initialState: INIT_STATE,
    reducers: {
        // 重置组件
        resetComponents: produce((draft:ComponentsStateType,action:PayloadAction<ComponentType[]>)=>{
            draft.componentList = action.payload
        }),
        // 
        changeSelectedId: produce((draft:ComponentsStateType,action:PayloadAction<string>) => {
            draft.selectedId = action.payload // 使用immer仿声明式修改
        }),
        //
        addComponent: produce((draft:ComponentsStateType,action:PayloadAction<ComponentType>)=>{
            let newC = action.payload
            const {selectedId,componentList} = draft
            const index = componentList.findIndex(c=>c.fe_id===selectedId)
            if(index<0){
                draft.componentList.push(newC)
            }else{
                draft.componentList.splice(index+1,0,newC)
            }
            draft.selectedId = newC.fe_id
        }),
        // 
        changeComponentProps: produce(
            (draft:ComponentsStateType,action:PayloadAction<{id:string,newProps:ComponentPropType}>)=>{
                const {id,newProps} = action.payload
                const targetComp = draft.componentList.find(c=>c.fe_id===id)
                if(targetComp){
                    targetComp.props = {...targetComp.props,...newProps}
                }
        }),
        // 删除组件
        removeSeletedComponent: produce((draft:ComponentsStateType)=>{
            let {componentList,selectedId} = draft
            if(selectedId){
                let index = componentList.findIndex(c=>c.fe_id===selectedId)
                let newSelectedId = getNextSelectedId(selectedId,componentList)
                draft.selectedId = newSelectedId
                componentList.splice(index,1)
            }
        }),
        // 隐藏与显示组件
        changeComponentHidden: produce((draft:ComponentsStateType,action:PayloadAction<{id:string,isHidden:boolean}>)=>{
            let { componentList } = draft
            let {id,isHidden} = action.payload
            let newSelectedId = ''
            if(isHidden) {
                // 隐藏
                newSelectedId = getNextSelectedId(id,componentList)
            } else {
                // 显示
                newSelectedId = id
            }
            draft.selectedId = newSelectedId
            let targetComp = componentList.find(c=>c.fe_id===id)
            if(targetComp) {
                targetComp.isHidden = isHidden
            }
        }),
        // 锁定
        toggleComponentLock: produce((draft:ComponentsStateType,action:PayloadAction<{id:string}>)=>{
            const {id} = action.payload
            let { componentList } = draft
            let targetComp = componentList.find(c=>c.fe_id===id)
            if(targetComp){
                targetComp.isLocked = !targetComp.isLocked
            }
        }),
        // 复制
        copySelectedComponent: produce((draft:ComponentsStateType)=>{
            let {componentList,selectedId} = draft
            if (!selectedId) return
            let targetComp = componentList.find(c=>c.fe_id===selectedId)
            if(!targetComp) return
            draft.copiedComponent = cloneDeep(targetComp)//深拷贝
            
        }),
        // 粘贴
        pasteCopiedComponent: produce((draft:ComponentsStateType)=>{
            const {componentList,copiedComponent,selectedId} = draft
            if(!copiedComponent) return
            const index = componentList.findIndex(c=>c.fe_id===selectedId)
            let newC = {...copiedComponent,fe_id:nanoid()}
            if(index<0){
                componentList.push(newC)
            }else{
                componentList.splice(index+1,0,newC)
            }
        }),
        // 上一个
        selectPrevComponent: produce((draft:ComponentsStateType)=>{
            const {componentList,selectedId} = draft
            if(!selectedId) return
            let targetIndex = componentList.findIndex(c=>c.fe_id===selectedId)
            if(targetIndex>-1) {
                if(targetIndex>=1){
                    draft.selectedId = componentList[targetIndex-1].fe_id
                }else {
                    draft.selectedId = componentList[componentList.length-1].fe_id
                }
            } 
        }),
        // 下一个
        selectNextComponent: produce((draft:ComponentsStateType)=>{
            const {componentList,selectedId} = draft
            if(!selectedId) return
            let targetIndex = componentList.findIndex(c=>c.fe_id === selectedId)
            if(targetIndex>-1){
                if(targetIndex===componentList.length-1) {
                    draft.selectedId = componentList[0].fe_id
                }else{
                    draft.selectedId = componentList[targetIndex+1].fe_id
                }
            }
        }),
        // 修改标题
        changeComponentTitle: produce((draft:ComponentsStateType,action:PayloadAction<{newTitle:string}>)=>{
            let {newTitle} = action.payload
            const {componentList,selectedId} = draft
            let targetComp = componentList.find(c=>c.fe_id===selectedId)
            if(!targetComp)return
            targetComp.title = newTitle
        }),
        // 移动
        moveComponent: produce((draft:ComponentsStateType,action:PayloadAction<{oldIndex:number;newIndex:number}>)=>{
            const {componentList} = draft
            const {oldIndex,newIndex} = action.payload
            draft.componentList = arrayMove(componentList,oldIndex,newIndex)
        })
    }
}) 
export const {
    resetComponents,
    changeSelectedId,
    addComponent,
    changeComponentProps,
    removeSeletedComponent,
    changeComponentHidden,
    toggleComponentLock,
    copySelectedComponent,
    pasteCopiedComponent,
    selectPrevComponent,
    selectNextComponent,
    changeComponentTitle,
    moveComponent
} = componentsSlice.actions
export default componentsSlice.reducer