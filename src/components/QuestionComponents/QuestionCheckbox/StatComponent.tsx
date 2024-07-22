import { FC } from "react";
import { Bar, CartesianGrid, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { QuestionCheckboxStatPropsType } from "./interface";

const StatComponent:FC<QuestionCheckboxStatPropsType> = ({
    stat
}) => {

    return (
        <ResponsiveContainer width={400} height={300}>
             <BarChart
                width={400}
                height={300}
                data={stat}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
        </ResponsiveContainer>
    )
}
export default StatComponent