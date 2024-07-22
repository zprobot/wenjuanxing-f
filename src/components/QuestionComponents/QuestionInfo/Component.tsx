import { FC } from "react";
import { QuestionInfoDefaultProps, QuestionInfoPropsType } from "./interface";
import { Typography } from "antd";
const {Title,Paragraph} = Typography
const QuestionInfo:FC<QuestionInfoPropsType> = (props) =>{
    const {title,desc} = {...QuestionInfoDefaultProps,...props}
    const tList = desc.split('\n')
    return <div style={{textAlign:'center'}}>
        <Title style={{fontSize:'24px'}}>{title}</Title>
        <Paragraph>
            {tList.map((t,index)=>(<span key={index}>{index>0&&<br/>}{t}</span>))}
        </Paragraph>
    </div>
}
export default QuestionInfo