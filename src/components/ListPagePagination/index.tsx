import { Pagination } from "antd";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LIST_PAGE_PARAAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from "../../constant";

const ListPagePagination: FC<{
    total: number
}> = (props) => {
    const {total} = props
    const [searchP,setP] = useSearchParams()
    const [current,setCurrent] = useState(1)
    const [pageSize,setPageSize] = useState(10)
    useEffect(()=>{
        const page = parseInt(searchP.get(LIST_PAGE_PARAAM_KEY) || '') || 1
        setCurrent(page)
        const pageSize = parseInt(searchP.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || 10
        setPageSize(pageSize)
    },[searchP])
    const handleChange = (page:number,pageSize:number) => {
        setP({
            ...Object.fromEntries(searchP.entries()),
            pageSize: pageSize.toString(),
            page: page.toString()
        })
    }
    return <Pagination align='center' current={current} pageSize={pageSize} total={total} onChange={handleChange}/>
}
export default ListPagePagination