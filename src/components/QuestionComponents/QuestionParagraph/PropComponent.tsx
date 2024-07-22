import { FC, useEffect } from "react";
import { QuestionParagraphPropsType } from "./interface";
import { Checkbox, Form, Input } from "antd";
const {TextArea} = Input
const PropComponent:FC<QuestionParagraphPropsType> = ({
    text,
    isCenter,
    onChange,
    disabled
}) => {
    const [form] = Form.useForm()
    useEffect(()=>{
        form.setFieldsValue({
            text,
            isCenter
        })
    },[text,isCenter])
    function handleValuesChange() {
        if(onChange){
            onChange(form.getFieldsValue())
        }
    }
    return <Form
        layout="vertical"
        initialValues={{text,isCenter}}
        disabled={disabled}
        form={form}
        onValuesChange={handleValuesChange}
    >
        <Form.Item 
            name='text' 
            label='段落内容' 
            rules={[{required:true,message:'请输入段落内容'}]}
        >
            <TextArea />
        </Form.Item>
        <Form.Item name='isCenter' valuePropName="checked">
                <Checkbox>居中显示</Checkbox>
        </Form.Item>    
    </Form>
}
export default PropComponent