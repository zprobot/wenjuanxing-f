import { FC, useEffect } from "react";
import { OptionType, QuestionCheckboxPropsType } from "./interface";
import { Button, Checkbox, Form, Input, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";

const PropComponent:FC<QuestionCheckboxPropsType> = ({
    title,
    isVertical,
    list,
    onChange,
    disabled
}) =>{
    const [form] = Form.useForm()
    useEffect(()=>{
        form.setFieldsValue({
            title,
            isVertical,
            list
        })
    },[title,isVertical,list])
    function handleChange(){
        if(onChange){
            onChange(form.getFieldsValue())
        }
    }
    return <Form
        layout="vertical"
        initialValues={{title,isVertical,list}}
        disabled={disabled}
        onValuesChange={handleChange}
        form={form}
    >
        <Form.Item label='标题' name='title' rules={[{required:true,message:'请输入标题'}]}>
            <Input />
        </Form.Item>
        <Form.Item label='选项'>
            <Form.List name='list'>
                {(fields,{add,remove})=>(<>
                    {fields.map(({key,name},index)=>{
                        return <Space align="baseline" key={name}>
                            <Form.Item name={[name,'checked']} valuePropName="checked">
                                <Checkbox />
                            </Form.Item>
                            <Form.Item 
                                name={[name,'text']}
                                rules={[
                                    {required:true,message:'选项名称必写'},
                                    {validator:(_,text)=>{
                                        const {list} = form.getFieldsValue()
                                        let num = 0
                                        list.forEach((option:OptionType)=>{
                                            if(option.text===text) num++
                                        })
                                        if(num===1) return Promise.resolve()
                                        return Promise.reject(new Error('和其他选项重复'))
                                    }}
                                ]}
                            >
                                <Input placeholder='请输入选项'></Input>
                            </Form.Item>
                            {index>0 && <MinusCircleOutlined onClick={()=>remove(name)}/>}
                        </Space>
                    })}
                    <Form.Item>
                        <Button type="link" block onClick={()=>add({value:nanoid(5),text:'',checked:false})} icon={<PlusOutlined/>}>添加选项</Button>
                    </Form.Item>
                </>)}
            </Form.List>
        </Form.Item>
        <Form.Item name='isVertical' valuePropName="checked">
            <Checkbox>竖向排列</Checkbox>
        </Form.Item>
    </Form>
}
export default PropComponent