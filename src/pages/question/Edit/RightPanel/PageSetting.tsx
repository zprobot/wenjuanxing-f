import { FC, useEffect } from "react";
import { usePageInfo } from "../../../../hocks/usePageInfo";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { resetPageInfo } from "../../../../store/pageInfoStore";
const {TextArea}= Input 
const PageSetting:FC = () => {
    const pageInfo = usePageInfo()
    const dispatch = useDispatch()
    const [form] =  Form.useForm()
    useEffect(()=>{
        form.setFieldsValue(pageInfo)
    },[pageInfo])
    function handleChange(){
        dispatch(resetPageInfo(form.getFieldsValue()))
    }
    return <Form
        layout="vertical"
        initialValues={pageInfo}
        onValuesChange={handleChange}
        form={form}
        >
        <Form.Item label='问卷标题' name='title' rules={[{required:true,message:'请输入标题'}]}>
            <Input placeholder="请输入标题"/>
        </Form.Item>
        <Form.Item label='问卷描述' name='desc'>
            <TextArea placeholder="问卷描述"/>
        </Form.Item>
        <Form.Item label='样式代码' name='css'>
            <TextArea placeholder="css样式代码"/>
        </Form.Item>
        <Form.Item label='脚本代码' name='js'>
            <TextArea placeholder="js脚本代码"/>
        </Form.Item>
    </Form>
}

export default PageSetting