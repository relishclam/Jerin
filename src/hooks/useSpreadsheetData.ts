import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useSpreadsheets } from './useSpreadsheets';
import { fetchSpreadsheetData } from '../utils/spreadsheetApi';

export const useSpreadsheetData = () => {
  const { accessToken } = useAuth();
  const { selectedId } = useSpreadsheets();
  const [data, setData] = useState<any[]>([]);
  const [dataKeys, setDataKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (accessToken && selectedId) {
      loadSpreadsheetData();
    }
  }, [accessToken, selectedId]);

  const loadSpreadsheetData = async () => {
    if (!selectedId) return;

    try {
      setLoading(true);
      setError(null);
      const { data: sheetData, headers } = await fetchSpreadsheetData(accessToken!, selectedId);
      setData(sheetData);
      setDataKeys(headers);
    } catch (err) {
      setError('Failed to load spreadsheet data');
    } finally {
      setLoading(false);
    }
  };

  return { data, dataKeys, loading, error, refreshData: loadSpreadsheetData };
};