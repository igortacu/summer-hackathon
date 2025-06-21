
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ResultsChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  xLabel: string;
  yLabel: string;
}

const ResultsChart: React.FC<ResultsChartProps> = ({ data, xKey, yKey, xLabel, yLabel }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey={xKey} 
          label={{ value: xLabel, position: 'insideBottom', offset: -10 }} 
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          label={{ value: yLabel, angle: -90, position: 'insideLeft' }} 
          tick={{ fontSize: 12 }}
        />
        <Tooltip 
          formatter={(value: number) => [`${value.toFixed(2)}`, yLabel]}
          labelFormatter={(label) => `${xLabel}: ${label.toFixed(2)}`}
        />
        <Line 
          type="monotone" 
          dataKey={yKey} 
          stroke="#4F9DDE" 
          strokeWidth={2} 
          dot={{ fill: '#4F9DDE', r: 3 }}
          activeDot={{ r: 5 }} 
          animationDuration={1500}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ResultsChart;
