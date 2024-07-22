import { useSelector } from "react-redux"
import { StateType } from "../store"
import { UserState } from "../store/userStore"

export const useUserInfo = () => {
    const {username,nickname}= useSelector<StateType>(state => state.user) as UserState
    return {username,nickname}
}