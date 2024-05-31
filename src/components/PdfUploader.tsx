'use client'

import '../../public/css/PdfUploader.css';
import { faFileExcel, faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { useDropzone } from 'react-dropzone';
import * as Papa from 'papaparse';
import * as XLSX from 'xlsx';
import React, { useState } from 'react';

GlobalWorkerOptions.workerSrc = '../../js/pdf.worker.mjs';

const PdfUploader = () => {
  const [data, setData] = useState<string[][]>([]);
  const [csvData, setCsvData] = useState('');

  const onDrop = (acceptedFiles: any[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const buffer = e.target?.result;

      if (buffer) {
        const pdf = await getDocument({ data: buffer }).promise;
        const numPages = pdf.numPages;
        let fullText = '';

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(' ');
          fullText += pageText + '\n';
        }

        const rows = fullText.split('\n').map((row) => row.split(' '));
        setData(rows);

        const csv = Papa.unparse(rows);
        setCsvData(csv);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: `${['application/pdf']}` });

  const exportToExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'data.xlsx');
  };

  const exportToCSV = () => {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4">
      <div {...getRootProps()} className="border-2 border-dashed border-gray-400 p-6 rounded-lg cursor-pointer text-center">
        <input {...getInputProps()} />
        <p>Drag & drop a PDF file here, or click to select one</p>
      </div>
      {data.length > 0 && (
        <>
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Preview Data</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-green-700 py-4">
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index} className="border-b">
                      {row.map((cell, i) => (
                        <td key={i} className="p-2">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4">
            <button onClick={exportToExcel} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
              Export to Excel
            </button>
            <button onClick={exportToCSV} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              <FontAwesomeIcon icon={faFileCsv} className="mr-2" />
              Export to CSV
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PdfUploader;