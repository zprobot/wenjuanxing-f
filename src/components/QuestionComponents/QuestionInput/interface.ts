export type QuestionInputPropsType = {
    title?: string
    placeholder?: string

    onChange?: (props:QuestionInputPropsType)=>void
    disabled?:boolean
}
export const QuestionInputDefaultProps: QuestionInputPropsType = {
    title: '输入框标题',
    placeholder: '请输入'
}