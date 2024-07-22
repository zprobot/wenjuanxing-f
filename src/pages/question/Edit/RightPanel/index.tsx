import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { ComponentProp } from "./ComponentProp";
import PageSetting from "./PageSetting";
import { useComponentInfo } from "../../../../hocks/useComponentIInfo";

enum TAB_KEYS{
    PROP_KEY = 'prop',
    SETTING_KEY = 'setting'
}
export const RightPanel:FC = () =>{
    const [activeKey,setActiveKey] = useState(TAB_KEYS.PROP_KEY)
    const {selectedId} = useComponentInfo()
    useEffect(()=>{
        if(selectedId) {
            setActiveKey(TAB_KEYS.PROP_KEY)
        }else{
            setActiveKey(TAB_KEYS.SETTING_KEY)
        }
    },[selectedId])
    const tabItems = [
        {
            key:TAB_KEYS.PROP_KEY,
            label: '属性',
            children:<ComponentProp/>,
            icon: <FileTextOutlined/>,
        },
        {
            key:TAB_KEYS.SETTING_KEY,
            label: '设置',
            children: <PageSetting/>,
            icon: <SettingOutlined/>,
        }
    ]
    return<Tabs activeKey={activeKey} items={tabItems}/>
}