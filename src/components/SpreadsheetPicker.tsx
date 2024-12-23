import React, { useState } from 'react';
import { Table, RefreshCw } from 'lucide-react';
import { useSpreadsheets } from '../hooks/useSpreadsheets';

export const SpreadsheetPicker: React.FC = () => {
  const { spreadsheets, loading, error, refreshSpreadsheets, selectSpreadsheet } = useSpreadsheets();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Select Spreadsheet</h3>
        <button
          onClick={refreshSpreadsheets}
          className="p-2 text-gray-400 hover:text-white transition-colors"
          disabled={loading}
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Table className="w-5 h-5" />
            <span>Choose a spreadsheet</span>
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-gray-700 rounded-lg shadow-xl border border-gray-600 max-h-60 overflow-y-auto">
            {error ? (
              <div className="p-4 text-red-400 text-sm">{error}</div>
            ) : spreadsheets.length === 0 ? (
              <div className="p-4 text-gray-400 text-sm">No spreadsheets found</div>
            ) : (
              <div className="py-1">
                {spreadsheets.map((sheet) => (
                  <button
                    key={sheet.id}
                    onClick={() => {
                      selectSpreadsheet(sheet.id);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-200 hover:bg-gray-600 transition-colors"
                  >
                    {sheet.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};