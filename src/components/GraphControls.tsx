import React from 'react';
import { BarChart3, LineChart, TrendingUp } from 'lucide-react';

interface GraphControlsProps {
  graphType: 'line' | 'bar' | 'area';
  onTypeChange: (type: 'line' | 'bar' | 'area') => void;
}

export const GraphControls: React.FC<GraphControlsProps> = ({
  graphType,
  onTypeChange,
}) => {
  const GraphTypeButton = ({ 
    type, 
    icon: Icon, 
    label 
  }: { 
    type: 'line' | 'bar' | 'area';
    icon: any;
    label: string;
  }) => (
    <button
      onClick={() => onTypeChange(type)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
        graphType === type
          ? 'bg-indigo-600 text-white'
          : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
      } transition-colors`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  return (
    <div className="flex gap-4 mb-6">
      <GraphTypeButton type="line" icon={LineChart} label="Line" />
      <GraphTypeButton type="bar" icon={BarChart3} label="Bar" />
      <GraphTypeButton type="area" icon={TrendingUp} label="Area" />
    </div>
  );
};