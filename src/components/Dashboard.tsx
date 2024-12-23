import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Header } from './Header';
import { GraphContainer } from './GraphContainer';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white">
            Welcome, {user?.name}
          </h2>
          <p className="text-gray-400">
            Your spreadsheets are automatically connected
          </p>
        </div>
        <GraphContainer />
      </main>
    </div>
  );
};