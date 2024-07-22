import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
    username: string,
    nickname: string
}
const INIT_STATE: UserState = {username:'',nickname:''}

const userSlice = createSlice({
    name:'user',
    initialState: INIT_STATE,
    reducers: {
        loginReducer: (state:UserState,action:PayloadAction<UserState>) => {
            return action.payload
        },
        logoutReducer: () => INIT_STATE
    }
})
export const {loginReducer,logoutReducer} = userSlice.actions
export default userSlice.reducer