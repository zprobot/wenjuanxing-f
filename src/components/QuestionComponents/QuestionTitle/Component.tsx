import { FC } from "react";
import { QuestionTitleDefaultProps, QuestionTitlePropsType } from "./interface";
import { Typography } from "antd";
const {Title} = Typography

const QuestionTitle:FC<QuestionTitlePropsType> = (props) =>{
    const {text,level,isCenter} = {...QuestionTitleDefaultProps,...props}
    const genFontSize = (level:number)=>{
        switch(level){
            case 1:
                return '24px'
            case 2:
                return '20px'
            case 3:
                return '16px'
            default:
                return '16px'    
        }
    }
    return(
        <div>
            <Title level={level} style={{
                textAlign: isCenter? 'center':'start',
                marginBottom:'0',
                fontSize:genFontSize(level!)}}>
                {text}
            </Title>
        </div>
    )
}
export default QuestionTitle