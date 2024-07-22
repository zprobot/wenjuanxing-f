import { FC} from "react";
import styles from "./QuestionCard.module.scss";
import { Button, Divider, message, Modal, Popconfirm, Space, Tag } from "antd";
import { CopyOutlined, DeleteOutlined, EditOutlined, ExclamationOutlined, LineChartOutlined, StarOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useToggleStar } from "./hocks/useToggleStar";
import { useDuplicateQuestion } from "./hocks/useDuplicateQuestion";
import { useDelQuestion } from "./hocks/useDelQuestion";
const List: FC<{
    _id:string,
    title:string,
    isPublish:boolean,
    isStar:boolean,
    answerCount:number,
    createdAt:string}> 
    = (props) => {
        const {
            _id,
            title,
            isPublish,
            isStar,
            answerCount,
            createdAt
        } = props
        const nav= useNavigate() 
        const {star,changeStar,starLoading} = useToggleStar(isStar,_id)
        const {duplicate,dupLoading} = useDuplicateQuestion(_id)
        const {del,isDel,delLoading} = useDelQuestion(_id,<ExclamationOutlined/>)
        if(isDel) return null
        return (
            
            <div className={styles.container}>
                <div className={styles.top}>
                    <label>
                        <Link to={isPublish?`question/stat/${_id}`:`question/edit/${_id}`}>
                            <Space>
                                {star && <StarOutlined style={{color:'red'}}/>}
                                {title}
                            </Space>
                        </Link>
                    </label>
                    <div>
                        <Space>
                            {isPublish?<Tag color="processing">已发布</Tag>:<Tag>未发布</Tag>}
                            <span>答卷:{answerCount}</span>
                            <span>{createdAt}</span>
                        </Space>
                    </div>
                </div>
                <Divider style={{ margin: '12px 0'}}/>
                <div className={styles.bottom}>
                    <div>
                        <Space>
                            <Button 
                                onClick={()=>{nav(`/question/edit/${_id}`)}} 
                                icon={<EditOutlined/>} 
                                type='text' 
                                size='small'>
                                编辑问卷
                            </Button>
                            <Button 
                                onClick={()=>{nav(`/question/stat/${_id}`)}} 
                                icon={<LineChartOutlined/>} 
                                type='text' 
                                size='small'
                                disabled={!isPublish}
                                >
                                问卷统计
                            </Button>                          
                        </Space>
                    </div>
                    <div>
                        <Space>
                            <Button onClick={changeStar} disabled={starLoading} type='text' icon={<StarOutlined/>} size='small'>
                                {star?'取消标星':'标星'}
                            </Button>
                            <Popconfirm 
                                title='确定复制该问卷？'
                                okText='确定'
                                cancelText='取消'
                                onConfirm={duplicate}
                            >
                                <Button type='text' icon={<CopyOutlined/>} size='small' disabled={dupLoading}>
                                    复制
                                </Button>
                            </Popconfirm>
                            <Button type='text' icon={<DeleteOutlined/>} size='small' onClick={del} disabled={delLoading}>
                                删除
                            </Button>
                        </Space>
                    </div>
                </div>
            </div>
       )
}

export default List