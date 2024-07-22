import { Input } from "antd";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LIST_SEARCH_PARAM_KEY } from "../../constant";
const { Search } = Input

const ListSearch: FC = () => {
    const [value,setValue] = useState('')
    const {pathname} = useLocation()
    const nav = useNavigate()
    const [searchParams] = useSearchParams()
    useEffect(()=>{
        const newV = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
        setValue(newV)
    },[searchParams])
    function handleChange(event:ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
    }
    function handleSearch(val:string) {
        nav({
            pathname,
            search: `${LIST_SEARCH_PARAM_KEY}=${val}`
        })
    }  
    return <Search placeholder="输入" value={value} allowClear={true} onSearch={handleSearch} onChange={handleChange} style={{width:'200px'}}/>
}
export default ListSearch