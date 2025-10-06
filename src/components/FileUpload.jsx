import React, { useState } from 'react';
import { LISTUPLOAD_URL } from '../utility/constants';
import ExcelJS from 'exceljs';
import Toaster from './Toaster/Toaster';
import Papa from 'papaparse';
import Swal from 'sweetalert2';
import { LuUpload } from "react-icons/lu";
function FileUpload({ listId }) {
    const [file, setFile] = useState(null);
    const [allowDuplicates, setAllowDuplicates] = useState(false); 
    const [toast, setToast] = useState(null);
    // const [uploading, setUploading] = useState(false); 
console.log('list id',listId)
    const showToast = (message, type) => {
        setToast({ message, type });
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            handleFileUpload(selectedFile); // Pass the file directly
        } else {
            showToast('Please select a file first.', 'error');
        }
    };

    const handleFileUpload = async (file) => {
        if (!file) {
            showToast('Please select a file first.', 'error');
            return;
        }

        const MAX_FILE_SIZE = 25 * 1024 * 1024;
        if (file.size > MAX_FILE_SIZE) {
            showToast('File size exceeds 25MB. Please upload a smaller file.', 'error');
            return;
        }

        try {
            const result = await Swal.fire({
                title: 'Allow duplicates?',
                text: 'Do you want to allow duplicate records?',
                icon: 'question',
                iconColor: '#007BFF',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                showCloseButton: true,
                confirmButtonAriaLabel: 'Yes',
                customClass: {
                    confirmButton: 'custom-yes-button',
                    cancelButton: 'custom-no-button',
                },
                buttonsStyling: false,
            });

          
            
            const allowDuplicates = result.isConfirmed;
            setAllowDuplicates(allowDuplicates); 

            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (fileExtension === 'xlsx' || fileExtension === 'xls') {
                await handleExcelFile(file, allowDuplicates); 
            } else if (fileExtension === 'csv') {
                await handleCsvFile(file, allowDuplicates);
            } else {
                showToast('Unsupported file format. Please upload an .xlsx or .csv file.', 'error');
                // setUploading(false);
            }
            // setUploading(false);
        } catch (error) {
            showToast('Error processing the file: ' + error.message, 'error');
            // setUploading(false);
        }
    };

    const handleExcelFile = async (file, allowDuplicates) => {
        const workbook = new ExcelJS.Workbook();
        const reader = new FileReader();

        reader.onload = async (e) => {
            const buffer = e.target.result;
            await workbook.xlsx.load(buffer);

            const worksheet = workbook.getWorksheet(1);
            const jsonData = [];
            const headerRow = worksheet.getRow(1);
            const columnNames = {};
            headerRow.eachCell((cell, colNumber) => {
                columnNames[cell.value] = colNumber;
            });

            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber === 1) return;

                const record = {
                    phone_number: row.getCell(columnNames['phone_number'])?.value,
                    primary_key: row.getCell(columnNames['primary_key'])?.value,
                };

                if (record.phone_number && record.primary_key) {
                    jsonData.push(record);
                }
            });

            await sendDataToBackend(jsonData, allowDuplicates);
        };

        reader.readAsArrayBuffer(file);
    };

    const handleCsvFile = async (file, allowDuplicates) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
            const csvData = e.target.result;
            Papa.parse(csvData, {
                complete: async (result) => {
                    const jsonData = result.data.map(row => ({
                        phone_number: row['phone_number'],
                        primary_key: row['primary_key'],
                    }));
                    await sendDataToBackend(jsonData, allowDuplicates);
                },
                header: true,
                skipEmptyLines: true,
            });
        };

        reader.readAsText(file);
    };

    const sendDataToBackend = async (jsonData, allowDuplicates) => {
        const payload = {
            listId,
            records: jsonData,
            allowDuplicates,
        };

        const response = await fetch(`${LISTUPLOAD_URL}/upload`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            credentials: 'include',
        });

        const result = await response.json();
        showToast(result.message, result.success ? 'success' : 'error');
        resetFileInput();
    };

    const resetFileInput = () => {
        setFile(null);
        const fileInput = document.getElementById(`fileInput-${listId}`);
        if (fileInput) {
            fileInput.value = '';
        }
    };

    return (
        <>
            {toast && (
                <Toaster
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            {/* <div className="flex">
                <input id="fileInput" className="pt-5" type="file" onChange={handleFileChange} />
                <button className="px-2 py-1 bg-slate-300 rounded mt-2" onClick={handleFileUpload}>
                    Upload
                </button>
            </div> */}
              <div className="flex items-center  ">
                <label htmlFor="fileInput" className="cursor-pointer tooltip ">
                   
                </label>
                <input
    id={`fileInput-${listId}`}
    type="file"
    className="hidden"
    onChange={(e) => {
        handleFileChange(e); // Update state with the selected file
    }}
/>
                <button
                     className=" tooltip "
                     onClick={() => {
                        const fileInput = document.getElementById(`fileInput-${listId}`);
                        if (fileInput) {
                            fileInput.click(); // Open file input dialog
                        }
                    }}
                
             
                >
                     <LuUpload  size={17} />
                     <span className='tooltip-text' >Upload</span>
                </button>
                {/* {uploading && (
                <button
                    className="ml-4 top text-red-500 z-999999"
                    onClick={() => {
                        setUploading(false); // Mark the upload as cancelled
                        showToast('Upload cancelled', 'warning');
                    }}
                >
                    Cancel Upload (X)
                </button>
            )} */}
        
            </div>
        </>
    );
}

export default FileUpload;
