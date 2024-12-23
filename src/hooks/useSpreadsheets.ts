import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { listSpreadsheets, Spreadsheet } from '../utils/spreadsheetApi';

export const useSpreadsheets = () => {
  const { accessToken } = useAuth();
  const [spreadsheets, setSpreadsheets] = useState<Spreadsheet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchSpreadsheets = useCallback(async () => {
    if (!accessToken) return;

    try {
      setLoading(true);
      setError(null);
      const sheets = await listSpreadsheets(accessToken);
      setSpreadsheets(sheets);
    } catch (err) {
      setError('Failed to load spreadsheets');
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchSpreadsheets();
  }, [fetchSpreadsheets]);

  const selectSpreadsheet = (id: string) => {
    setSelectedId(id);
  };

  return {
    spreadsheets,
    loading,
    error,
    selectedId,
    refreshSpreadsheets: fetchSpreadsheets,
    selectSpreadsheet,
  };
};