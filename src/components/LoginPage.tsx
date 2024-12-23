import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../hooks/useAuth';
import { BarChart } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { handleLogin } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BarChart className="w-16 h-16 text-indigo-500" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Jerin's Graph Generator
          </h1>
          <p className="text-gray-400 mb-8">
            Sign in with Google to visualize your spreadsheet data instantly
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-700">
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleLogin}
              onError={() => console.log('Login Failed')}
              useOneTap
              theme="filled_black"
              size="large"
              text="continue_with"
              shape="circle"
              scope="https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets.readonly"
            />
          </div>
          <p className="text-gray-400 text-sm text-center mt-6">
            Your Google account will be used to access your spreadsheets automatically
          </p>
        </div>
      </div>
    </div>
  );
};