import { FC } from "react";
import { componentConfGroup, ComponentConfType} from "../../../../components/QuestionComponents";
import { Typography } from "antd";
import styles from './Component.module.scss'
import { useDispatch } from "react-redux";
import { addComponent } from "../../../../store/componentsStore";
import { nanoid } from "nanoid";
const {Title} = Typography
function genComp(c:ComponentConfType){
    const {title,type,Component,defaultProps} = c
    const dispatch = useDispatch()
    function handleChick() {
        dispatch(addComponent({
            fe_id: nanoid(),
            title,
            type,
            props: defaultProps
        }))
    }
    return <div key={type} className={styles.wrapper} onClick={handleChick}>
                <div className={styles.component}>
                    <Component/>
                </div>
           </div>
}
export const ComponentLib:FC = () => {
    return(<>
        {componentConfGroup.map((group,index)=>{
            return <div key={group.type}>
                <Title level={3} style={{fontSize:'16px',marginTop: index>0 ? '20px': 0}}>
                    {group.groupName}
                </Title>
                <div>
                    {group.components.map(c=>genComp(c))}
                </div>
            </div>
        })}
    </>)
}