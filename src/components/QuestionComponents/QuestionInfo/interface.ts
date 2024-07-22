export type QuestionInfoPropsType = {
    title?: string
    desc?:string

    onChange?: (newProps:QuestionInfoPropsType) => void
    disabled?: boolean
}

export const QuestionInfoDefaultProps = {
    title: '问卷标题',
    desc: '描述'
}