import { Empty, Spin, Typography } from "antd";
import { FC } from "react";
import style from './Commom.module.scss'
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import ListPagePagination from '../../components/ListPagePagination'
import Search from "../../components/Search";
import { useLoadQuestionList } from "../../hocks/useLoadQuestionList";
const {Title} = Typography

const Star: FC = () => {
    const {data={},loading,error} = useLoadQuestionList({isStar:true})
    const {list:starList,total} = data
    return (
        <>
            <div className={style.header}>
                <div className={style.left}>
                    <Title level={3}>星标问卷</Title>
                </div>
                <div className={style.right}>
                    <Search></Search>
                </div>
            </div>
            <div className={style.content}>
                {
                    loading && <div style={{textAlign:'center'}}><Spin /></div>
                }
                {
                    !loading && starList.length === 0 &&  <Empty description="暂无数据"/>
                }
                {
                    !loading && starList.length !== 0 && starList.map((item:any)=>{
                        const {_id} = item
                        return <QuestionCard key={_id} {...item}/>
                    })
                }
            </div>
            <div className={style.footer}>
                <ListPagePagination total={total}/>
            </div>
        </>       
    )
}

export default Star