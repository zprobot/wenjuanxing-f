import { FC, useEffect, useRef, useState} from "react";
import QuestionCard from '../../components/QuestionCard/QuestionCard'
import style from "./Commom.module.scss"
import { Empty, Spin, Typography } from "antd";
import { useSearchParams } from "react-router-dom";
import { useDebounceFn, useRequest, useTitle } from "ahooks";
import { getQuestionListService } from "../../services/question";
import { LIST_SEARCH_PARAM_KEY } from "../../constant";
import Search from "../../components/Search";

const {Title} = Typography
const List:FC = () => {
    useTitle('我的问卷')
    const [page,setPage] = useState(1)
    const [questions,setQuestions] = useState([])
    const [total,setTotal] = useState(0)
    const [start,setStart] = useState(false) // 标记是否已经开始
    const [searchP] = useSearchParams()
    const keyword = searchP.get(LIST_SEARCH_PARAM_KEY) || ''
    const haveMoreData = total > questions.length ? true : false
    const containerRef = useRef<HTMLDivElement>(null)
    const {run: load,loading} = useRequest(async ()=> {
        let data = await getQuestionListService({
            keyword,
            page,
            pageSize: 10   
        })
        return data
    },{
        manual: true,
        onSuccess(res) {
            const {list=[],total=0} = res
            setQuestions(questions.concat(list))
            setTotal(total)
            setPage(page+1)
        }
    })
    // 防抖
    const {run:tryLoadMore} = useDebounceFn(()=>{
        const elem = containerRef.current
        if(elem === null) return
        const domRect = elem.getBoundingClientRect()
        if (domRect === null) return
        const { bottom } = domRect
        if(bottom <= document.body.clientHeight) {
            load()
            setStart(true)
        }
    },{
        wait: 1000
    })
    // 监听第一次
    useEffect(()=>{
        tryLoadMore()
    },[searchP])
    // 监听搜索
    useEffect(()=>{
        setStart(false)
        setPage(1)
        setQuestions([])
        setTotal(0)
    },[keyword])
    // 监听滚动
    useEffect(()=>{
        if(haveMoreData) {
            window.addEventListener('scroll',tryLoadMore)
        }
        return () => {
            window.removeEventListener('scroll',tryLoadMore)
        }
    },[searchP,haveMoreData])
    const loadMoreContentElem = () => {
        if (!start || loading) return <Spin />
        if (total === 0) return <Empty description="暂无数据"/>
        if(!haveMoreData) return <span>没有更多了</span>
        return <span>正在加载</span>
    }
    return (
        <>
            <div className={style.header}>
                <div className={style.left}>
                    <Title level={3}>我的问卷</Title>
                </div>
                <div className={style.right}>
                    <Search></Search>
                </div>
            </div>
            <div className={style.content}>
                {
                    questions.length>0 && questions.map((item:any)=>{
                        const {_id} = item
                        return <QuestionCard key={_id} {...item}/>
                    })
                }
            </div>
            <div className={style.footer} ref={containerRef}>
                {loadMoreContentElem()}
            </div>
        </>
    )
}
export default List