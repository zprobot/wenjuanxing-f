import { FC } from 'react'
import QuestionInputConf,{QuestionInputPropsType} from './QuestionInput'
import QuestionTextAreaConf,{QuestionTextAreaPropsType} from './QuestionTextarea'
import QuestionTitleConf,{QuestionTitlePropsType} from './QuestionTitle'
import QuestionParagraphConf, {QuestionParagraphPropsType} from './QuestionParagraph'
import QuestionInfoConf,{QuestionInfoPropsType}from './QuestionInfo'
import QuestionRadioConf,{QuestionRadioPropsType,QuestionRadioStatPropsType} from './QuestionRadio'
import QuestionCheckboxConf,{QuestionCheckboxPropsType,QuestionCheckboxStatPropsType} from './QuestionCheckbox'

// 配置组件的同一类型
export type ComponentPropType = QuestionInputPropsType & 
QuestionTitlePropsType & 
QuestionParagraphPropsType & 
QuestionInfoPropsType & QuestionTextAreaPropsType &
QuestionRadioPropsType & QuestionCheckboxPropsType

// 统计组件的同一类型
export type ComponentStatPropType = QuestionRadioStatPropsType & QuestionCheckboxStatPropsType

// 组件配置信息
export type ComponentConfType = {
    title:string
    type:string
    Component: FC<ComponentPropType>
    PropComponent: FC<ComponentPropType>
    StatComponent?: FC<QuestionRadioStatPropsType>
    defaultProps: ComponentPropType
}
// 组件分组信息
export const componentConfGroup = [
    {
        type: 'textGroup',
        groupName: '文本显示',
        components: [QuestionTitleConf,QuestionParagraphConf,QuestionInfoConf]
    },
    {
        type: 'inputGroup',
        groupName: '用户输入',
        components: [QuestionInputConf,QuestionTextAreaConf]
    },
    {
        type: 'selectGroup',
        groupName: '用户选择',
        components: [QuestionRadioConf,QuestionCheckboxConf]
    },
]

const componentConfList:ComponentConfType[] = [
    QuestionInputConf,
    QuestionTitleConf,
    QuestionParagraphConf,
    QuestionInfoConf,
    QuestionTextAreaConf,
    QuestionRadioConf,
    QuestionCheckboxConf
]
export function getComponentConfByType(type:string){
    return componentConfList.find(c=>c.type===type)
}