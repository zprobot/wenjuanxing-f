import { useSelector } from "react-redux";
import { StateType } from "../store";
import { PageInfoType } from "../store/pageInfoStore";

export function usePageInfo() {
    const pageInfo = useSelector<StateType,PageInfoType>(state=>state.pageInfo)
    return pageInfo
}