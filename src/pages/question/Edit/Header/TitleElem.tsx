import { Button, Input, InputRef, Space, Typography } from "antd"
import { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import { usePageInfo } from "../../../../hocks/usePageInfo"
import { useDispatch } from "react-redux"
import { changePageTitle } from "../../../../store/pageInfoStore"
import { EditOutlined } from "@ant-design/icons"

const {Title} = Typography
export const TitleElem: FC = () => {
    const {title} = usePageInfo()
    const dispatch = useDispatch()
    const inputRef = useRef<InputRef>(null)
    const [editState,setEditState] = useState(false)
    useEffect(()=>{
        if(!editState) return
        inputRef.current?.focus()
    },[editState])
    function handleChange(e:ChangeEvent<HTMLInputElement>){
        let newTitle = e.target.value.trim()
        if(!newTitle) return
        dispatch(changePageTitle(newTitle))
    }
    if(editState){
        return <Input 
            value={title}
            ref={inputRef}
            onPressEnter={()=>setEditState(false)}
            onBlur={()=>setEditState(false)}
            onChange={handleChange}
        />
    }
    return <Space>
        <Title>{title}</Title>
        <Button icon={<EditOutlined/>} type='text' onClick={() =>setEditState(true)}/>
    </Space>
}