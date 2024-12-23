// Utility functions for Google Sheets API
export const parseGoogleSheetsUrl = (url: string): string | null => {
  try {
    const match = url.match(/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : null;
  } catch (error) {
    return null;
  }
};

export const fetchSheetData = async (sheetId: string) => {
  try {
    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`
    );
    const text = await response.text();
    const jsonString = text.substring(47).slice(0, -2);
    const json = JSON.parse(jsonString);
    
    // Transform data into the format needed for charts
    const headers = json.table.cols.map((col: any) => col.label);
    const rows = json.table.rows.map((row: any) => {
      const rowData: any = { name: row.c[0]?.v || '' };
      headers.slice(1).forEach((header: string, index: number) => {
        rowData[header] = row.c[index + 1]?.v || 0;
      });
      return rowData;
    });

    return { data: rows, headers: headers.slice(1) };
  } catch (error) {
    throw new Error('Failed to fetch Google Sheets data');
  }
};