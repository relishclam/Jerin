import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area
} from 'recharts';

interface GraphProps {
  data: any[];
  type: 'line' | 'bar' | 'area';
  dataKeys: string[];
}

// Vibrant colors that pop on dark backgrounds
const COLORS = [
  '#00ff87',  // Neon Green
  '#ff0099',  // Hot Pink
  '#00ffff',  // Cyan
  '#ff8c00',  // Dark Orange
  '#ff3333',  // Bright Red
  '#9933ff'   // Purple
];

const commonProps = {
  stroke: '#374151', // gray-700
  strokeWidth: 1
};

const tooltipStyle = {
  backgroundColor: '#1f2937', // gray-800
  border: '1px solid #374151', // gray-700
  borderRadius: '0.375rem',
  color: '#f3f4f6' // gray-100
};

export const Graph: React.FC<GraphProps> = ({ data, type, dataKeys }) => {
  const renderGraph = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid {...commonProps} />
            <XAxis 
              dataKey="name" 
              stroke="#9ca3af" 
              tick={{ fill: '#9ca3af' }}
            />
            <YAxis 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />
            <Tooltip 
              contentStyle={tooltipStyle}
              cursor={{ stroke: '#4b5563' }}
            />
            <Legend 
              wrapperStyle={{ color: '#f3f4f6' }}
            />
            {dataKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={3}
                dot={{ r: 6, strokeWidth: 2 }}
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid {...commonProps} />
            <XAxis 
              dataKey="name" 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />
            <YAxis 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />
            <Tooltip 
              contentStyle={tooltipStyle}
              cursor={{ fill: 'rgba(75, 85, 99, 0.2)' }}
            />
            <Legend 
              wrapperStyle={{ color: '#f3f4f6' }}
            />
            {dataKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={COLORS[index % COLORS.length]}
                radius={[4, 4, 0, 0]}
                maxBarSize={60}
              />
            ))}
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid {...commonProps} />
            <XAxis 
              dataKey="name" 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />
            <YAxis 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />
            <Tooltip 
              contentStyle={tooltipStyle}
              cursor={{ stroke: '#4b5563' }}
            />
            <Legend 
              wrapperStyle={{ color: '#f3f4f6' }}
            />
            {dataKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                fill={COLORS[index % COLORS.length]}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={3}
                fillOpacity={0.3}
              />
            ))}
          </AreaChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-[500px]">
      <ResponsiveContainer>{renderGraph()}</ResponsiveContainer>
    </div>
  );
};