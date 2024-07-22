import { FC, useEffect } from "react";
import { OptionType, QuestionRadioPropsType } from "./interface";
import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";

const PropComponent:FC<QuestionRadioPropsType> = ({
    title,
    isVertical,
    value,
    options,
    onChange,
    disabled
})=>{
    const [form] = Form.useForm()
    useEffect(()=>{
        form.setFieldsValue({
            title,
            isVertical,
            value,
            options
        })
    },[title,isVertical,value,options])
    function handleChange() {
        if(onChange){
            onChange(form.getFieldsValue())
        }
    }
    return <Form
        layout="vertical"
        initialValues={{title,value,isVertical,options}}
        onValuesChange={handleChange}
        form={form}
        disabled={disabled}
    >
        <Form.Item label='标题' name='title' rules={[
            {required:true,message:'请输入标题'},
            ]}>
            <Input />
        </Form.Item>
        <Form.Item label='默认选中' name='value'>
            <Select value={value} options={options?.map(({text,value})=>({value,label:text||''}))}></Select>
        </Form.Item>
        <Form.Item label='选项'>
            <Form.List name='options'>
                {(fields,{add,remove})=>(<>
                    {fields.map(({key,name},index)=>{
                        return <Space align="baseline" key={name}>
                            <Form.Item 
                                name={[name,'text']}
                                rules={[
                                    {required:true,message:'选项名称必写'},
                                    {validator:(_,text)=>{
                                        const {options} = form.getFieldsValue()
                                        let num = 0
                                        options.forEach((option:OptionType)=>{
                                            if(option.text===text) num++
                                        })
                                        if(num===1) return Promise.resolve()
                                        return Promise.reject(new Error('和其他选项重复'))
                                    }}
                                ]}
                            >
                                <Input placeholder='请输入选项'></Input>
                            </Form.Item>
                            {index>1 && <MinusCircleOutlined onClick={()=>remove(name)}/>}
                        </Space>
                    })}

                    <Form.Item>
                        <Button type="link" block onClick={()=>add({value:nanoid(5),text:''})} icon={<PlusOutlined/>}>添加选项</Button>
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