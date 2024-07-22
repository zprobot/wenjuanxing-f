import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import ManageLayout from '../layouts/ManageLayout';
import QuestionLayout from '../layouts/QuestionLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import List from '../pages/manage/List';
import Trash from '../pages/manage/Trash';
import Star from '../pages/manage/Star';
import Edit from '../pages/question/Edit';
import Stat from '../pages/question/Stat';

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { 
                path: 'manage', 
                element: <ManageLayout />,
                children:[
                    { path: 'list', element: <List /> },
                    { path: 'trash', element: <Trash /> },
                    { path: 'star', element: <Star />}
                ]
            },
        ]
    },
    {
        path: 'question',
        element: <QuestionLayout />,
        children: [
            { path: 'edit/:id', element: <Edit /> },
            { path: 'stat/:id', element: <Stat /> }
        ]
    },
    { path: '*', element: <NotFound /> }
])
export default router

export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const MANAGELIST_PATHNAME = '/manage'

export function isLoginOrRegister(pathname:string) {
    if ([LOGIN_PATHNAME,REGISTER_PATHNAME].includes(pathname)) return true
    return false
}
export function isNoNeedLoginPath(pathname:string){
    if(['/',LOGIN_PATHNAME,REGISTER_PATHNAME].includes(pathname)) return true
    return false
}