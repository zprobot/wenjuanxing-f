import { FC, useEffect } from "react";
import { QuestionTextAreaPropsType } from "./interface";
import { Form, Input } from "antd";

const PropComponent:FC<QuestionTextAreaPropsType> = ({
    title,
    placeholder,
    onChange,
    disabled
}) => {
    const [form] = Form.useForm()
    useEffect(()=>{
        form.setFieldsValue({title,placeholder})
    },[title,placeholder])
    function handleChange(){
        if(onChange){
            onChange(form.getFieldsValue())
        }
    }
    return <Form 
        layout="vertical"
        initialValues={{title,placeholder}}
        form={form}
        onValuesChange={handleChange}
        disabled={disabled}
        >
            <Form.Item label='标题' name='title' rules={[{required:true,message:'请输入标题'}]}>
                <Input />
            </Form.Item>
            <Form.Item label='placeholder' name='placeholder'>
                <Input />
            </Form.Item>
        </Form>
}
export default PropComponent