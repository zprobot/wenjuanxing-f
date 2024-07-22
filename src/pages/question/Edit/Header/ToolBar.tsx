import { BlockOutlined, CopyOutlined, DeleteOutlined, DownOutlined, EyeInvisibleOutlined, LockOutlined, RedoOutlined, UndoOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { changeComponentHidden, copySelectedComponent, moveComponent, pasteCopiedComponent, removeSeletedComponent, toggleComponentLock } from "../../../../store/componentsStore";
import { useComponentInfo } from "../../../../hocks/useComponentIInfo";
import { ActionCreators } from "redux-undo";

export const ToolBar:FC = () => {
    const dispatch = useDispatch()
    const {selectedId, componentList,selectComponent,copiedComponent} = useComponentInfo()
    let {isLocked} = selectComponent || {}
    const len = componentList.length
    const selectIndex = componentList.findIndex(c=>c.fe_id===selectedId)
    let isFirst = selectIndex <=0 ? true : false
    let isLast = selectIndex === len -1 ? true : false

    function handleDelete(){
        dispatch(removeSeletedComponent())
    }
    function handleHidden(){
        dispatch(changeComponentHidden({
            id:selectedId,
            isHidden: true
        }))
    }
    function handleLock(){
        dispatch(toggleComponentLock({id:selectedId}))
    }
    function copy(){
        dispatch(copySelectedComponent())
    }
    function paste() {
        dispatch(pasteCopiedComponent())
    }
    function up() {
        if(isFirst) return
        dispatch(moveComponent({oldIndex:selectIndex,newIndex:selectIndex-1}))
    }
    function down(){
        if(isLast) return
        dispatch(moveComponent({oldIndex:selectIndex,newIndex:selectIndex+1}))
    }
    function undo(){
        dispatch(ActionCreators.undo())
    }
    function redo(){
        dispatch(ActionCreators.redo())
    }
    return <Space>
        <Tooltip title="删除">
            <Button shape='circle' icon={<DeleteOutlined/>} onClick={handleDelete}></Button>
        </Tooltip>
        <Tooltip title="隐藏">
            <Button shape='circle' icon={<EyeInvisibleOutlined/>} onClick={handleHidden}></Button>
        </Tooltip>
        <Tooltip title="锁定">
            <Button shape='circle' type= {isLocked?'primary':'default'} icon={<LockOutlined/>} onClick={handleLock}></Button>
        </Tooltip>
        <Tooltip title="复制">
            <Button shape='circle' icon={<CopyOutlined/>} onClick={copy}></Button>
        </Tooltip>
        <Tooltip title="粘贴">
            <Button shape='circle' icon={<BlockOutlined/>} onClick={paste} disabled={copiedComponent===null}></Button>
        </Tooltip>
        <Tooltip title="上移">
            <Button shape='circle' icon={<UpOutlined/>} onClick={up} disabled={isFirst}></Button>
        </Tooltip>
        <Tooltip title="下移">
            <Button shape='circle' icon={<DownOutlined/>} onClick={down} disabled={isLast}></Button>
        </Tooltip>
        <Tooltip title="撤销">
            <Button shape='circle' icon={<UndoOutlined/>} onClick={undo} ></Button>
        </Tooltip>
        <Tooltip title="重做">
            <Button shape='circle' icon={<RedoOutlined/>} onClick={redo} ></Button>
        </Tooltip>
    </Space>
}