export type QuestionTitlePropsType = {
    text?: string
    level?: 1 | 2 | 3 | 4 | 5
    isCenter?: boolean
    onChange?: (props:QuestionTitlePropsType) => void
    disabled?:boolean
}
export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
    text: '标题1',
    level: 1,
    isCenter: false
}