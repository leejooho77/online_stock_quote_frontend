import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const Chart = ({ symbol, data, color }) => {
    return (
        <LineChart
          width={1000}
          height={250}
          data={data}
          margin={{
            top: 10, right: 30, left: 20, bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={symbol} stroke={`#${color}`} activeDot={{ r: 8 }} />
        </LineChart>
    );
}

export default Chart;