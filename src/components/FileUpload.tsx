import React from 'react';
import { FileUp } from 'lucide-react';
import { read, utils } from 'xlsx';

interface FileUploadProps {
  onDataParsed: (data: any[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onDataParsed }) => {
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = utils.sheet_to_json(worksheet);
      onDataParsed(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="w-full max-w-md">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <FileUp className="w-10 h-10 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">Excel files only</p>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
};