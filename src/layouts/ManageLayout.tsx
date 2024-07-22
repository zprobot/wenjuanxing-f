import { FC, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./ManageLayout.module.scss";
import { Button, Divider, message, Space } from "antd";
import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons'
import { createQuestionService } from "../services/question";
import { useRequest } from "ahooks";

const ManageLayout: FC = () => {
    const nav = useNavigate()
    const { pathname } = useLocation() // 获取路由路径
/*     const [loading,setLoading] = useState(true)
    // 创建问卷
    const createQuestion = async () => {
        setLoading(false)
        let res = await createQuestionService()
        const { id } = res
        if(id) {
            nav(`/question/edit/${id}`)
            message.success('创建成功')
        }
        setLoading(true)
    } */
    // 使用三方钩子
    const {loading,run:createQuestion} = useRequest(createQuestionService,{
        manual: true, //  手动触发
        onSuccess(res) {
            nav(`/question/edit/${res.id}`)
            message.success('创建成功')
        }
    })
    return (
        <div className={styles.container}>
            <aside className={styles.left}>
                <Space direction="vertical">
                    <Button onClick={createQuestion} disabled={!loading} type='primary' size="large" icon={<PlusOutlined />}>
                        新建问卷
                    </Button>
                    <Divider style={{borderTop: 'transparent'}}/>
                    <Button type={pathname.startsWith('/manage/list')?'default':'text'} size='large' icon={<BarsOutlined />} onClick={()=>nav('/manage/list')}>
                        我的问卷
                    </Button>
                    <Button type={pathname.startsWith('/manage/star')?'default':'text'} size='large' icon={<StarOutlined />} onClick={()=>nav('/manage/star')}>
                        星标问卷
                    </Button>
                    <Button type={pathname.startsWith('/manage/trash')?'default':'text'} size='large' icon={<DeleteOutlined />} onClick={()=>nav('/manage/trash')}>
                        回收站
                    </Button>
                </Space>
            </aside>
            <div className={styles.right}>
                <Outlet />
            </div>
        </div>    
    )
}

export default ManageLayout