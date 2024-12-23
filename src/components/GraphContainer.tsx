import React, { useState } from 'react';
import { Graph } from './Graph';
import { GraphControls } from './GraphControls';
import { SpreadsheetPicker } from './SpreadsheetPicker';
import { useSpreadsheetData } from '../hooks/useSpreadsheetData';

export const GraphContainer: React.FC = () => {
  const [graphType, setGraphType] = useState<'line' | 'bar' | 'area'>('line');
  const { data, dataKeys, loading, error } = useSpreadsheetData();

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  return (
    <div className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700">
      <SpreadsheetPicker />
      {data.length > 0 && (
        <>
          <GraphControls graphType={graphType} onTypeChange={setGraphType} />
          <Graph data={data} type={graphType} dataKeys={dataKeys} />
        </>
      )}
    </div>
  );
};