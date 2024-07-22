import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from './userStore'
import componentsReducer, { ComponentsStateType } from './componentsStore'
import pageInfoReducer, { PageInfoType } from "./pageInfoStore";
import undoable, { excludeAction, StateWithHistory } from "redux-undo";
export type StateType = {
    user: UserState,
    components: StateWithHistory<ComponentsStateType>, // 增加undo的类型
    pageInfo: PageInfoType
}

export default configureStore({
    reducer: {
        user: userReducer,
        components: undoable(componentsReducer,{
            limit: 20, // 限制撤销20步
            filter: excludeAction(
                ['components/resetComponents',
                'components/changeSelectedId',
                'components/selectPrevComponent',
                'components/selectNextComponent']) // 屏蔽一些组件操作
        }), //增加撤销回改
        pageInfo:  pageInfoReducer
    }
})