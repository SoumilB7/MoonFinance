import React from "react";
import { Chart } from "chart.js";
import '../../app/globals.css'
import { Radar,RadarChart,PolarGrid,PolarAngleAxis,PolarRadiusAxis, ResponsiveContainer } from "recharts";
const Graph = () => {
 
    // Sample data
    const data = [
        { name: 'Risk', y: 2,x:3.84},
        { name: 'Diversity', y: 2,x:3.91},
        { name: 'Stability', y: 3,x:5.05 },
    ];
 
    return (
        <RadarChart width={400} height={400}
            outerRadius="70%" data={data}>
            <PolarGrid strokeOpacity={0.5}/>
            <PolarAngleAxis dataKey="name" strokeOpacity={1}/>
            <Radar dataKey="x" stroke="#FF6384"
                fill="#FF6384" fillOpacity={0.5}/>
            <PolarRadiusAxis domain={[0,6]} strokeOpacity={0} tick={false}/>
        </RadarChart>
    );
}
 
export default Graph;