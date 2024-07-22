import { FC, useEffect } from "react";
import { QuestionInfoPropsType } from "./interface";
import { Form, Input } from "antd";
const {TextArea} = Input
const PropComponent: FC<QuestionInfoPropsType> = ({
    title,
    desc,
    onChange,
    disabled
}) =>{
    const [form] = Form.useForm()
    useEffect(()=>{
        form.setFieldsValue({title,desc})
    },[title,desc])
    function handleChange(){
        if(onChange) {
            onChange(form.getFieldsValue())
        }
    }
    return <Form
        layout="vertical"
        initialValues={{title,desc}}
        onValuesChange={handleChange}
        disabled={disabled}
        form={form}
        >
        <Form.Item label='标题' name='title' rules={[{required:true,message:'请输入标题'}]}>
            <Input/>
        </Form.Item>
        <Form.Item label='描述' name='desc'>
            <TextArea />
        </Form.Item>
    </Form>
}
export default PropComponent