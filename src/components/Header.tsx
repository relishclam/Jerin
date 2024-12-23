import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { LogOut, BarChart } from 'lucide-react';

export const Header: React.FC = () => {
  const { handleLogout, user } = useAuth();

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BarChart className="w-8 h-8 text-indigo-500" />
          <h1 className="text-xl font-bold text-white">
            Jerin's Graph Generator
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <img
            src={user?.picture}
            alt={user?.name}
            className="w-8 h-8 rounded-full"
          />
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};