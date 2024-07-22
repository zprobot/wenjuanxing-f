import { useRequest } from "ahooks";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionStatListService } from "../../../../services/stat";
import { Pagination, Spin, Table, Typography } from "antd";
import { useComponentInfo } from "../../../../hocks/useComponentIInfo";
const {Title} = Typography
type PropsType = {
    selectedId: string
    setSelectedId: (selectId:string) => void
    setSelectedType: (selectType:string) => void
}

const PageStat:FC<PropsType> = ({
    selectedId,
    setSelectedId,
    setSelectedType
}) => {
    const {id=''} = useParams()
    const [total,setTotal] = useState(0)
    const [list,setList] = useState<{_id:string}[]>([])
    const [page,setPage] = useState(1)
    const [pageSize,setPageSize] = useState(10)

    const {loading} = useRequest(async()=>{
        const res =  await getQuestionStatListService(id,{page,pageSize})
        return res
    },{
        refreshDeps:[page,pageSize,id],
        onSuccess(res) {
            const {total,list} = res
            setTotal(total)
            setList(list)
        }
    })
    const { componentList } = useComponentInfo()
    const colums = componentList.map(c=>{
        let {fe_id,title,props,type} = c
        let colTitle = props.title || title
        return {
            title:(
                <div style={{cursor:'pointer'}}
                    onClick={()=>{
                        setSelectedId(fe_id)
                        setSelectedType(type)
                    }}
                >
                    {<span style={{color: fe_id === selectedId ?'#1890ff':''}}>{colTitle}</span>}
                </div>
            ),
            dataIndex: fe_id
        }
    })
    const TableElem = (
        <>
            <Table 
                dataSource={list} 
                columns={colums} 
                pagination={false} 
                rowKey={q=>q._id}
            />
            <div style={{marginTop: '20px'}}>
                <Pagination
                    align="center"
                    total={total}
                    pageSize={pageSize}
                    current={page}
                    onChange={page=>setPage(page)}
                    onShowSizeChange={(page,pageSize)=>{
                        setPage(page)
                        setPageSize(pageSize)
                    }}
                />
            </div>
        </>
    )
    return <div>
        <Title level={3}>答卷数量：{!loading && total}</Title>
        {loading && <div style={{textAlign:'center',marginTop:'100px'}}><Spin/></div>}
        {!loading && TableElem}
    </div>
}
export default PageStat