import Component from './Component'
import { QuestionInputDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'

// 组件的配置
export default {
    title: '输入框',
    type: 'questionInput',
    Component, // 画布显示的组件
    PropComponent, //属性修改显示的组件
    defaultProps: QuestionInputDefaultProps
}