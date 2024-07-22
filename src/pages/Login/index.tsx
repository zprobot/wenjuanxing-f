import { FC, useEffect } from "react";
import styles from './index.module.scss'
import { Button, Checkbox, Form, Input, message, Space, Typography } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { MANAGELIST_PATHNAME, REGISTER_PATHNAME } from "../../router/router";
import { useRequest } from "ahooks";
import { loginService } from "../../services/user";
import { setToken } from "../../utils/token";
const { Title } = Typography
enum User {
    USERNAME_KEY= 'USERNAME',
    PASSWORD_KEY= 'PASSWORD'
}
function rememberUser(username:string,password:string) {
    localStorage.setItem(User.USERNAME_KEY,username)
    localStorage.setItem(User.PASSWORD_KEY,password)
}
function deleteUser() {
    localStorage.removeItem(User.USERNAME_KEY)
    localStorage.removeItem(User.PASSWORD_KEY)
}
function getUserInfoFromLocalStorage() {
    return{
        username: localStorage.getItem(User.USERNAME_KEY),
        password: localStorage.getItem(User.PASSWORD_KEY)
    }
}

const Login: FC = () => {
    const [form] = Form.useForm()
    const nav = useNavigate()
    useEffect(()=>{
        const {username,password} = getUserInfoFromLocalStorage()
        form.setFieldsValue({
            username,
            password
        })
    },[])
    const {run:login,loading} = useRequest(async (username:string,password:string)=>{
        let data = await loginService({
            username,
            password
        })
        return data
    },{
        manual:true,
        onSuccess(res){
            let {token=''} = res
            setToken(token)
            message.success('登陆成功')
            nav(MANAGELIST_PATHNAME)
        }
    })
    function onFinish(values:any) {
        const {username,password,remember} = values
        if(remember) {
            rememberUser(username,password)
        } else {
            deleteUser()
        }
        login(username,password)
    }
    return (
        <div className={styles.container}>
            <div>
                <Space>
                    <Title level={2}><UserAddOutlined/></Title>
                    <Title level={2}>登录</Title>
                </Space>
            </div> 
            <div>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                initialValues={{ remember: true }}
                form={form}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name = "remember"
                    valuePropName="checked"
                    wrapperCol={{offset:6,span:16}}
                    >
                      <Checkbox>记住我</Checkbox>
                </Form.Item>
                <Form.Item
                        wrapperCol={{offset:6,span:16}}
                    >
                        <Space>
                            <Button type='primary' htmlType="submit">登录</Button>
                            <Link to={REGISTER_PATHNAME}>没有账户，去注册</Link>
                        </Space>
                    </Form.Item>
            </Form>
            </div>
        </div>     
    )
}

export default Login