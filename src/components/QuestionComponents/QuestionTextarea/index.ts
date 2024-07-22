import Component from './Component'
import { QuestionTextAreaDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'

// 组件的配置
export default {
    title: '输入框',
    type: 'questionTextArea',
    Component, // 画布显示的组件
    PropComponent, //属性修改显示的组件
    defaultProps: QuestionTextAreaDefaultProps
}