import React, { useState } from 'react';
import { Link } from 'lucide-react';

interface UrlInputProps {
  onUrlSubmit: (url: string) => void;
  error?: string;
}

export const UrlInput: React.FC<UrlInputProps> = ({ onUrlSubmit, error }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUrlSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <Link className="w-5 h-5 text-gray-400" />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your Google Sheets URL here"
            className="flex-1 outline-none bg-gray-800 text-gray-100 placeholder-gray-500"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Load Data
          </button>
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    </form>
  );
};