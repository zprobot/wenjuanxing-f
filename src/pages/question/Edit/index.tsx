import { FC} from "react";
import styles from './index.module.scss'
import { useLoadQuestionInfo } from "../../../hocks/useLoadQuestionInfo";
import { Canavas } from "./Canavas";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "../../../store/componentsStore";
import { LeftPanel } from "./LeftPanel";
import { RightPanel } from "./RightPanel";
import { Header } from "./Header";
import { usePageInfo } from "../../../hocks/usePageInfo";
import { useTitle } from "ahooks";

const Edit: FC = () => {
    const {loading} = useLoadQuestionInfo()
    const dispatch = useDispatch()
    const clearClick = () => {
        dispatch(changeSelectedId(''))
    }
    const {title} = usePageInfo()
    useTitle('问卷编辑-'+title)
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Header/>
            </header>
            <div className={styles['contaner-wrapper']}>
                <div className={styles.left}>
                    <LeftPanel/>
                </div>
                <div className={styles.center} onClick={clearClick}>
                    <div className={styles['canvas-wrapper']}>
                        <Canavas loading={loading}/>
                    </div>
                </div>
                <div className={styles.right}>
                    <RightPanel />
                </div>
            </div>
        </div>       
    )
}

export default Edit