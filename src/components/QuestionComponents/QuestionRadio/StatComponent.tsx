import { FC, useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { QuestionRadioStatPropsType } from "./interface";

const StatComponent:FC<QuestionRadioStatPropsType> = ({
    stat
}) => {
    console.log(stat)
    const sum = useMemo(()=>{
        return stat.reduce((pre,next)=>pre+next.count,0)
    },[stat])
    return (
        <ResponsiveContainer width={400} height="80%">
            <PieChart width={400} height={400}>
                <Pie data={stat} 
                        dataKey="count" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={60} 
                        fill="#8884d8" 
                        label={i=>`${i.name}: ${(i.count / sum * 100).toFixed(2)}%`} 
                >
                    {stat.map((c,index)=>{
                        return <Cell key={index}/>
                    })}
                </Pie>
                    <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}
export default StatComponent