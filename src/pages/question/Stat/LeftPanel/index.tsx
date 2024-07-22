import { FC, useState } from "react";
import {  getComponentConfByType} from "../../../../components/QuestionComponents";
import styles from './index.module.scss'
import { useComponentInfo } from "../../../../hocks/useComponentIInfo";
import classNames from "classnames";

type PropsType = {
    selectedId: string
    setSelectedId: (selectId:string) => void
    setSelectedType: (selectType:string) => void
}

export const ComponentList:FC<PropsType> = ({
    selectedId,
    setSelectedId,
    setSelectedType
}) => {
    const {componentList} = useComponentInfo()

    return(
        <div className={styles.container}>
            {componentList
            .filter(c=>!c.isHidden)
            .map(c=>{
                const {fe_id,props,type} = c
                const componentConf = getComponentConfByType(type)
                if(!componentConf) return null
                const {Component} = componentConf
                const wrapperClassName = classNames({
                    [styles['conponent-wrapper']]: true,
                    [styles.selected]: fe_id  === selectedId
                })
                return (
                    <div
                        className={wrapperClassName}
                        key={fe_id}
                        onClick={()=>{
                            setSelectedId(fe_id)
                            setSelectedType(type)
                        }}
                    >
                        <div className={styles.component}>
                            <Component {...props}></Component>
                        </div>
                    </div>
                )
            })
            }
        </div>
    )
}