import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuPlus, LuFileSymlink } from "react-icons/lu";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender, getExpandedRowModel } from '@tanstack/react-table';
import jsPDF from 'jspdf';
import Toaster from '../components/Toaster/Toaster';
import { CSVLink } from 'react-csv';
import 'jspdf-autotable';
import { LuUserPlus } from "react-icons/lu";
import { useInventory } from '../pages/Inventory/InventoryContext';
import Pagination from './Pagination/Pagination';
import DynamicTableBody from './TableParts/DynamicTableBody';
import DynamicTableHead from './TableParts/DynamicTableHead';
import HeaderUtility from './TableParts/HeaderUtility';
import { RiPlayListAddLine } from 'react-icons/ri';
import { GiSandsOfTime } from "react-icons/gi";
import { BsFiletypeMp3 } from "react-icons/bs";
function DynamicTable({
    columns,           // Columns configuration (headers, accessor keys, etc.)
    data,              // Data to display in the table
    // A function passed to handle row actions like "Add to Cart"
    page,              // Current page number
    pageSize,          // Items per page
    totalItems,        // Total number of items (for pagination)
    onPageChange,      // Function to handle page changes
    onPageSizeChange,  // Function to handle page size changes
    rowActions,        // Dynamic row actions like buttons
    onSearch,
    topButtonLabel,    // Label for the dynamic top button
    onTopButtonClick2,
    exportConfig,
    route,
    setRoutes,
    searchBar,
    pagination,
    onSelectionChange,
    handleUser,
    headerActions,
    handleAddVblist,
    handleAddCampaign,
    handleAddAudio,
    isUploading


}) {
    const [expanded, setExpanded] = useState({});
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const navigate = useNavigate();

    const { selectedIds, handleSelect } = useInventory();
    const [toast, setToast] = useState(null);
    const showToast = (message, type) => {
        setToast({ message, type });
    }


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            expanded,
            rowSelection,
            sorting,
            globalFilter: filtering,
            pagination: { pageIndex: page, pageSize: pageSize },
        },
        manualPagination: true,
        pageCount: Math.ceil(totalItems / pageSize),
        onSortingChange: setSorting,
        getExpandedRowModel: getExpandedRowModel(),
        onGlobalFilterChange: setFiltering,
        onExpandedChange: setExpanded,

    });

    // const handleSearchChange = (event) => {
    //     const value = event.target.value;
    //     setFiltering(value);
    //     onSearch(value);  // Notify parent component of search input
    // };

    // const handleTopButtonClick = () => {
    //     const selectedRows = Object.keys(rowSelection).map(rowId => table.getRow(rowId).original);
    //     if (onTopButtonClick) {
    //         onTopButtonClick(selectedRows);
    //     }
    // };

    const handleExpandRow = (rowId) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [rowId]: !prevExpanded[rowId],
        }));
    };

    const handleRoutes = (event) => {
        const value = event.target.value;
        console.log("set routes value", event.target)
        setRoutes(value);
        const selectedRows = Object.keys(rowSelection).map(rowId => table.getRow(rowId).original);
        const selectedIds = selectedRows.map(row => row.inventoryId);
        console.log("event id", selectedIds)
        handleSelect(selectedIds);
        if (onTopButtonClick2) {
            onTopButtonClick2(selectedRows);
        }

        if (value === "Set Route") {
            if (selectedIds.length == 0) {
                console.log("please select one DID number at least")
                showToast("Please Select One DID Number At Least", "error");
            }
            
            else {
                navigate('/setroutes');  // Change this to your desired route
            }
        }

    };
    // const Export = () => {
    //     const doc = new jsPDF();
    //     const columnsToExport = columns.filter(col => !exportConfig.excludedColumns.includes(col.id));
    //     const headers = columnsToExport.map(col => col.header);


    //     let rowsExport = table.getRowModel().rows.map(row => {
    //         return columnsToExport.map(col => row.original?.[col.accessorKey] || '');
    //     });

    //     const rowsToExport = Object.keys(rowSelection).length > 0 ? Object.keys(rowSelection).map(rowId =>
    //         columnsToExport.map(col => table.getRow(rowId).original[col.accessorKey])
    //     ) : null;
    //     const rows = rowsToExport || rowsExport;

    //     doc.autoTable({ head: [headers], body: rows, });
    //     doc.save(exportConfig.fileName || 'table-data.pdf');
    // };


    // const columnsToExport = columns.filter(col => !exportConfig.excludedColumns.includes(col.id));

    // const headers = columnsToExport.map(col => ({ label: col.header, key: col.accessorKey }));
    // let rowsExport = table.getRowModel().rows.map(row => {
    //     return columnsToExport.map(col => row.original?.[col.accessorKey] || '');
    // });

    // const rowsToExport = Object.keys(rowSelection).length > 0 ? Object.keys(rowSelection).map(rowId =>
    //     columnsToExport.map(col => table.getRow(rowId).original[col.accessorKey])
    // ) : rowsExport;
    // const csvData = rowsToExport.map(row => {
    //     let rowData = {};
    //     row.forEach((cell, index) => {
    //         rowData[headers[index].key] = cell;
    //     });
    //     return rowData;
    // });

    // const ExportToCSV = () => {
    //     const columnsToExport = columns.filter(col => !exportConfig.excludedColumns.includes(col.id));
    //     const headers = columnsToExport.map(col => ({ label: col.header, key: col.accessorKey }));

    //     let rowsExport = table.getRowModel().rows.map(row => {
    //         return columnsToExport.map(col => row.original?.[col.accessorKey] || '');
    //     });

    //     const rowsToExport = Object.keys(rowSelection).length > 0 ? Object.keys(rowSelection).map(rowId =>
    //         columnsToExport.map(col => table.getRow(rowId).original[col.accessorKey])
    //     ) : rowsExport;

    //     const csvData = rowsToExport.map(row => {
    //         let rowData = {};
    //         row.forEach((cell, index) => {
    //             rowData[headers[index].key] = cell;
    //         });
    //         return rowData;
    //     });
    //     const csvLink = document.createElement('a');
    //     csvLink.href = URL.createObjectURL(new Blob([csvData], { type: 'text/csv;charset=utf-8;' }));
    //     csvLink.download = exportConfig.fileName || 'table-data.csv';
    //     csvLink.click();


    // }


    useEffect(() => {
        const selected = table.getSelectedRowModel().flatRows;
        if (onSelectionChange) {
            onSelectionChange(selected.map(row => row.original.orderId));
            handleSelect(selected.map(row => row.original.inventoryId));
            if (onTopButtonClick2) {
                onTopButtonClick2(selected.map(row => row.original));
            }
            console.log("selected", selected.map(row => row.original.orderId));
        }

    }, [table.getSelectedRowModel().flatRows]);



    return (


        <>
            {toast && (
                <Toaster
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            {/* <div className="mb-5 rounded-md bg-white dark:bg-zinc-800">
                <div className="p-5">

                    <div className="grid grid-cols-12 lg:grid-cols-12 gap-3"> */}
{                      searchBar &&  <HeaderUtility route={route} filtering={filtering}  handleRoutes={handleRoutes} setFiltering={setFiltering} onSearch={onSearch} ></HeaderUtility>
}                        <div className="self-center col-span-12  flex gap-2 place-self-end lg:col-span-6">
                            {/* {
                                Object.keys(rowSelection).length > 0 && onTopButtonClick ? <button type="button" onClick={handleTopButtonClick} className="text-white  flex btn bg-blue-500 border-blue-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 
                            active:text-white active:bg-blue-600 active:border-blue-600 active:ring active:ring-blue-100 dark:ring-blue-400/20 items-center gap-1  add-btn" data-bs-toggle="modal" id="create-btn" data-bs-target="#showModal"><LuPlus />{topButtonLabel}</button>
                                    : null
                            } */}

                            {/* <button onClick={Export} className="text-white  flex btn bg-green-500 border-green-500 hover:text-white hover:bg-green-600 hover:border-green-600 
                             active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/20 items-center gap-1  add-btn" data-bs-toggle="modal" id="create-btn" data-bs-target="#showModal"><LuFileSymlink /> Export</button> */}
                            {/* 
                             <CSVLink data={csvData} headers={headers} filename={exportConfig.fileName || 'table-data.csv'}>
                                <button
                                    type='button'
                                    className="text-white flex btn bg-green-500 border-green-500 hover:text-white hover:bg-green-600 hover:border-green-600 
               active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/20 
               items-center gap-1 add-btn"
                                    data-bs-toggle="modal"
                                    id="create-btn"
                                    data-bs-target="#showModal"
                                    
                                >
                                <LuFileSymlink /> Export
                                </button>

                            </CSVLink>   */}
                            {handleUser && <button type="button" onClick={handleUser} className="text-white  flex btn bg-green-500 border-green-500 hover:text-white hover:bg-green-600 hover:border-green-600 tooltip"><LuUserPlus size={15} />  <span className="tooltip-text">Add New User</span> </button>}
                            {headerActions && <div className="table-header-actions mb-4">{headerActions}</div>}
                            {handleAddVblist && <button type="button" onClick={handleAddVblist} className="text-white  flex btn bg-green-500 border-green-500 hover:text-white hover:bg-green-600 hover:border-green-600 tooltip"><LuFileSymlink size={15} />  <span className="tooltip-text">Add New List</span> </button>
                           
                            }
                            {handleAddCampaign && <button type="button" onClick={handleAddCampaign} className="text-white  flex btn bg-green-500 border-green-500 hover:text-white hover:bg-green-600 hover:border-green-600 tooltip"> <RiPlayListAddLine  size={14} />  <span className="tooltip-text">Add Campaign</span> </button>}
                             {handleAddAudio && <button  type="button" onClick={handleAddAudio} className="text-white  flex btn bg-green-500 border-green-500 hover:text-white hover:bg-green-600 hover:border-green-600 tooltip"> {isUploading ? <GiSandsOfTime size={15} /> : <BsFiletypeMp3 size={15} />  } <span className="tooltip-text"> {isUploading ? "Uploading..." : "Add Audio"}</span> </button>}
                        </div>
                        <div className="my-2 col-span-12 overflow-x-auto lg:col-span-12">
                            <table id="basic_tables" className="display  stripe group datatables min-w-full table-auto text-sm align-middle whitespace-nowrap" style={{ width: '100% ' }} aria-describedby="basic_tables_info">
                                <DynamicTableHead table={table} flexRender={flexRender} />
                                <DynamicTableBody table={table} expanded={expanded} columns={columns} flexRender={flexRender} />
                            </table>
                        </div>
                        { pagination && <Pagination table={table} onPageChange={onPageChange} />}
                    {/* </div>
                </div>

            </div> */}
        </>
    );
}

export default DynamicTable;

// <div className="my-2 overflow-x-auto">
//     <div className="flex justify-between items-center mb-4">
//         <input
//             type="text"
//             placeholder="Search..."
//             className="px-3 py-2 border border-gray-300 rounded"
//             value={filtering}
//             onChange={handleSearchChange}
//         />
//         {topButtonLabel && (
//             <button
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
//                 onClick={handleTopButtonClick}
//             >
//                 {topButtonLabel}
//             </button>
//         )}
//     </div>
//     <table className="min-w-full table-auto text-sm align-middle">
//         <thead>
//             {table.getHeaderGroups().map(headerGroup => (
//                 <tr key={headerGroup.id}>
//                     {headerGroup.headers.map(header => (
//                         <th key={header.id} className="p-2">
//                             {header.isPlaceholder
//                                 ? null
//                                 : flexRender(header.column.columnDef.header, header.getContext())}
//                         </th>
//                     ))}
//                 </tr>
//             ))}
//         </thead>
//         <tbody>
//             {table.getRowModel().rows.map(row => (
//                 <tr key={row.id}>
//                     {row.getVisibleCells().map(cell => (
//                         <td key={cell.id} className="p-2">
//                             {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                         </td>
//                     ))}
//                     {/* Render dynamic actions for each row */}
//                     {rowActions && (
//                         <td>
//                             {rowActions.map((action, index) => (
//                                 <button
//                                     key={index}
//                                     className="mx-1 px-2 py-1 bg-blue-500 text-white rounded"
//                                     onClick={() => action.onClick(row.original)}
//                                 >
//                                     {action.label}
//                                 </button>
//                             ))}
//                         </td>
//                     )}
//                 </tr>
//             ))}
//         </tbody>
//     </table>
//     {/* Pagination */}
//     <div className="flex justify-between items-center mt-4">
//         <div>
//             <strong>
//                 Showing {page + 1} of {Math.ceil(totalItems / pageSize)} Pages
//             </strong>
//         </div>
//         <div>
//             <button
//                 className="px-3 py-1 bg-gray-300 rounded"
//                 disabled={!table.getCanPreviousPage()}
//                 onClick={() => onPageChange(0)}
//             >
//                 First
//             </button>
//             <button
//                 className="px-3 py-1 bg-gray-300 rounded mx-1"
//                 disabled={!table.getCanPreviousPage()}
//                 onClick={() => onPageChange(table.getState().pagination.pageIndex - 1)}
//             >
//                 Previous
//             </button>
//             <button
//                 className="px-3 py-1 bg-gray-300 rounded mx-1"
//                 disabled={!table.getCanNextPage()}
//                 onClick={() =>  onPageChange(table.getState().pagination.pageIndex + 1)}
//             >
//                 Next
//             </button>
//             <button
//                 className="px-3 py-1 bg-gray-300 rounded"
//                 disabled={!table.getCanNextPage()}
//                 onClick={() =>  onPageChange(table.getPageCount() - 1)}
//             >
//                 Last
//             </button>
//         </div>
//     </div>
// </div>