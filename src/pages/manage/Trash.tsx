import { FC, useState } from "react";
import {useRequest, useTitle} from 'ahooks'
import style from './Commom.module.scss'
import { Button, Empty, message, Modal, Space, Spin, Table, Tag, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Search from "../../components/Search";
import { useLoadQuestionList } from "../../hocks/useLoadQuestionList";
import ListPagePagination from "../../components/ListPagePagination";
import { deleteQuestionService, updateQuestionService } from "../../services/question";
const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
    useTitle('问卷星 - 回收站')
    const {data={},loading,refresh} = useLoadQuestionList({isDeleted:true})
    const {list:trashList,total} = data
    const [selectedIds,setSelectedIds] = useState<string[]>([])
    const tableColumns = [
          {
            title: '标题',
            dataIndex: 'title',
          },
          {
            title: '是否发布',
            dataIndex: 'isPublished',
            render:(isPublish:boolean) => {
                return isPublish?<Tag color="processing">已发布</Tag>:<Tag>未发布</Tag>
            }
          },
          {
            title: '答卷',
            dataIndex: 'answerCount',
          },
          {
            title: '创建时间',
            dataIndex: 'createdAt',
          },
    ]
    const delItem = () => {
        confirm({
            title:'确定彻底删除吗？',
            icon:<ExclamationCircleOutlined/>,
            content:'删除后不能找回',
            onOk:delQuestions
        })
    }
    const {run:recoverQuestion,loading:recoverLoading} = useRequest(async()=>{
        await Promise.all(selectedIds.map(id=>updateQuestionService(id,{isDeleted:false})))
    },{
        manual: true,
        debounceWait: 500,
        onSuccess(){
            message.success('恢复成功')
            refresh()
            setSelectedIds([])
        }
    })
    const {run:delQuestions,loading:delLoading} = useRequest(async()=>{
        await deleteQuestionService(selectedIds)
    },{
        manual:true,
        onSuccess() {
            message.success('删除成功')
            refresh()
            setSelectedIds([])
        }
    })
    const TableElem = <>
        <div style={{marginBottom:'16px'}}>
            <Space>
                <Button type="primary" onClick={recoverQuestion} disabled={selectedIds.length===0 || recoverLoading}>恢复</Button>
                <Button danger disabled={selectedIds.length===0||delLoading} onClick={delItem}>删除</Button>
            </Space>
        </div>
        <Table 
                    dataSource={trashList} 
                    columns={tableColumns} 
                    pagination={false} 
                    rowKey={q=>q._id}
                    rowSelection={{
                        type:'checkbox',
                        onChange: (selectRowKeys) => {
                            setSelectedIds(selectRowKeys as string[])
                        }
                    }}
                />
    </>
    return (
        <>
            <div className={style.header}>
                <div className={style.left}>
                    <Title level={3}>回收站</Title>
                </div>
                <div className={style.right}>
                    <Search></Search>
                </div>
            </div>
            <div className={style.content}>
                {loading && <div style={{textAlign:'center'}}><Spin /></div>}
                {!loading &&trashList.length===0 && <Empty description="暂无数据"/>}
                {!loading &&trashList.length>0 && TableElem}
            </div>
            <div className={style.footer}>
                <ListPagePagination total={total} />
            </div>
        </>       
    )
}

export default Trash