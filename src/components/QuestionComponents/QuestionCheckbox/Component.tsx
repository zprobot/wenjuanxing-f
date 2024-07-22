import { FC } from "react";
import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from "./interface";
import { Checkbox, Space, Typography } from "antd";

const {Paragraph} = Typography
const QuestionCheckbox:FC<QuestionCheckboxPropsType> = (props) => {
    const {title,list,isVertical} = {...QuestionCheckboxDefaultProps,...props}
    return <div>
        <Paragraph strong>{title}</Paragraph>
        <Space direction={isVertical ? 'vertical' : 'horizontal'} >
            {list?.map((opt=>{
                const {value,text,checked} = opt
                return <Checkbox key={value} value={value} checked={checked}>{text}</Checkbox>
            }))}
        </Space>
    </div>
}
export default QuestionCheckbox