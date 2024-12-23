export interface Spreadsheet {
  id: string;
  name: string;
  lastModified: string;
}

export const listSpreadsheets = async (accessToken: string): Promise<Spreadsheet[]> => {
  try {
    const response = await fetch(
      'https://www.googleapis.com/drive/v3/files?' +
      new URLSearchParams({
        q: "mimeType='application/vnd.google-apps.spreadsheet'",
        fields: 'files(id,name,modifiedTime)',
        orderBy: 'modifiedTime desc'
      }),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch spreadsheets');
    }

    const data = await response.json();
    
    return data.files.map((file: any) => ({
      id: file.id,
      name: file.name,
      lastModified: file.modifiedTime,
    }));
  } catch (error) {
    throw new Error('Failed to fetch spreadsheets list');
  }
};

export const fetchSpreadsheetData = async (accessToken: string, spreadsheetId: string) => {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch spreadsheet data');
    }

    const data = await response.json();
    
    if (!data.values || data.values.length < 2) {
      throw new Error('Spreadsheet is empty or has insufficient data');
    }

    // Transform the data for the charts
    const headers = data.values[0];
    const rows = data.values.slice(1).map((row: any[]) => {
      const rowData: any = { name: row[0] || '' };
      headers.slice(1).forEach((header: string, index: number) => {
        rowData[header] = parseFloat(row[index + 1]) || 0;
      });
      return rowData;
    });

    return { data: rows, headers: headers.slice(1) };
  } catch (error) {
    throw new Error('Failed to fetch spreadsheet data');
  }
};