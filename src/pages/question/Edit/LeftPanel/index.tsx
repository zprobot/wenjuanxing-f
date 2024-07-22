import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { FC } from "react";
import { ComponentLib } from "./ComponentLib";
import Layer from "./Layer";

export const LeftPanel:FC = ()=>{
    const tabItems = [
        {
            key:'1',
            label: '组件库',
            children:<ComponentLib/>,
            icon: <AppstoreOutlined/>,
        },
        {
            key:'2',
            label: '图层',
            children: <Layer/>,
            icon: <AppstoreOutlined/>,
        }
    ]
    return<Tabs defaultActiveKey="1" items={tabItems}/>
}
