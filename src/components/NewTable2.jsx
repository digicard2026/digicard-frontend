import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuPlus, LuFileSymlink } from "react-icons/lu";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender, getExpandedRowModel } from '@tanstack/react-table';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CSVLink } from 'react-csv';
import { useInventory } from '../pages/Inventory/InventoryContext';
function NewTable({
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
    onTopButtonClick,
    exportConfig,
    route,
    setRoutes,
    routes,


}) {
    const [expanded, setExpanded] = useState({});
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const navigate = useNavigate();

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

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setFiltering(value);
        onSearch(value);  // Notify parent component of search input
    };

    const handleTopButtonClick = () => {
        const selectedRows = Object.keys(rowSelection).map(rowId => table.getRow(rowId).original);
        if (onTopButtonClick) {
            onTopButtonClick(selectedRows);
        }
    };

    const handleExpandRow = (rowId) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [rowId]: !prevExpanded[rowId],
        }));



    };
    const handleRoutes = (event) => {
        const value = event.target.value;
        setRoutes(value);
        if (onTopButtonClick) {
            onTopButtonClick(selectedRows);
        }
        if (value === "Set Route") {
            // Navigate to a specific page, e.g., "/provider"
            navigate('/setroutes');  // Change this to your desired route
        }

    };
    const Export = () => {
        const doc = new jsPDF();
        const columnsToExport = columns.filter(col => !exportConfig.excludedColumns.includes(col.id));
        const headers = columnsToExport.map(col => col.header);
        let rowsExport = table.getRowModel().rows.map(row => {
            return columnsToExport.map(col => row.original?.[col.accessorKey] || '');
        });

        const rowsToExport = Object.keys(rowSelection).length > 0 ? Object.keys(rowSelection).map(rowId =>
            columnsToExport.map(col => table.getRow(rowId).original[col.accessorKey])
        ) : null;
        const rows = rowsToExport || rowsExport;

        doc.autoTable({ head: [headers], body: rows, });
        doc.save(exportConfig.fileName || 'table-data.pdf');
    };

    
    const columnsToExport = columns.filter(col => !exportConfig.excludedColumns.includes(col.id));

    const headers = columnsToExport.map(col => ({ label: col.header, key: col.accessorKey }));
    let rowsExport = table.getRowModel().rows.map(row => {
        return columnsToExport.map(col => row.original?.[col.accessorKey] || '');
    });

    const rowsToExport = Object.keys(rowSelection).length > 0 ? Object.keys(rowSelection).map(rowId =>
        columnsToExport.map(col => table.getRow(rowId).original[col.accessorKey])
    ) : rowsExport;

    // const csvData = rowsToExport.map(row => {
    //     let rowData = [];
    //     row.forEach((cell, index) => { rowData[headers[index].key] = cell; });
    // })
    
    const csvData = rowsToExport.map(row => {
        let rowData = {};
        row.forEach((cell, index) => {
            rowData[headers[index].key] = cell;
        });
        return rowData;
    });


    const ExportToCSV = () => {
        const columnsToExport = columns.filter(col => !exportConfig.excludedColumns.includes(col.id));
        const headers = columnsToExport.map(col => ({ label: col.header, key: col.accessorKey }));

        let rowsExport = table.getRowModel().rows.map(row => {
            return columnsToExport.map(col => row.original?.[col.accessorKey] || '');
        });

        const rowsToExport = Object.keys(rowSelection).length > 0 ? Object.keys(rowSelection).map(rowId =>
            columnsToExport.map(col => table.getRow(rowId).original[col.accessorKey])
        ) : rowsExport;

        const csvData = rowsToExport.map(row => {
            let rowData = {};
            row.forEach((cell, index) => {
                rowData[headers[index].key] = cell;
            });
            return rowData;
        });
        const csvLink = document.createElement('a');
        csvLink.href = URL.createObjectURL(new Blob([csvData], { type: 'text/csv;charset=utf-8;' }));
        csvLink.download = exportConfig.fileName || 'table-data.csv';
        csvLink.click();


    }



    return (


        <>

            <div className="mb-5 rounded-md bg-white dark:bg-zinc-800">
                <div className="p-5">
                    <div className="grid grid-cols-12 lg:grid-cols-12 gap-3">

                        <div className="self-center col-span-12 w-full lg:col-span-6 lg:place-self-start">
                            <div id="basic_tables_filter " className="dataTables_filter flex  ">
                                {route ?
                                    <label >
                                        {/* <p className='px-0.5 pb-3 text-black' >Choose a DID Action</p> */}

                                        <select className="form-input border-slate-200 dark:border-slate-200 focus:outline-none
                                     focus:border-blue-500 disabled:bg-slate-300 border rounded-md py-1 text-black
                                      dark:disabed:bg-slate-600 disabled:border-slate-600 dark:disabled:border-slate-800 
                                      dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 
                                      dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200
                                      inline-block w-full lg:w-[180px] px-2.5 hover:cursor-pointer "  value={route} onChange={handleRoutes} id="">
                                            <option value="">Choose a DID Action</option>
                                            {route.map((routerOption, index) => (
                                                <option key={index} value={routerOption}>
                                                    {routerOption}
                                                </option>
                                            ))}
                                        </select>

                                    </label> : <label>
                                        <input type="search" className="form-input border-slate-200 dark:border-slate-200 focus:outline-none focus:border-blue-500 disabled:bg-slate-300 border rounded-md py-2 dark:disabled:bg-slate-600 disabled:border-slate-600 dark:disabled:border-slate-800 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 inline-block w-full lg:w-[291px] px-2.5 " placeholder=" Search" aria-Search aria-controls="basic_tables" value={filtering}
                                            onChange={handleSearchChange}></input>
                                    </label>

                                }

                            </div>
                        </div>
                        <div className="self-center col-span-12  flex gap-2 place-self-end lg:col-span-6">
                            {/* {
                                Object.keys(rowSelection).length > 0 && onTopButtonClick ? <button type="button" onClick={handleTopButtonClick} className="text-white  flex btn bg-blue-500 border-blue-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 
                            active:text-white active:bg-blue-600 active:border-blue-600 active:ring active:ring-blue-100 dark:ring-blue-400/20 items-center gap-1  add-btn" data-bs-toggle="modal" id="create-btn" data-bs-target="#showModal"><LuPlus />{topButtonLabel}</button>
                                    : null
                            } */}

                            {/* <button onClick={Export} className="text-white  flex btn bg-green-500 border-green-500 hover:text-white hover:bg-green-600 hover:border-green-600 
                             active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/20 items-center gap-1  add-btn" data-bs-toggle="modal" id="create-btn" data-bs-target="#showModal"><LuFileSymlink />
                            Export</button> */}

                            <CSVLink data={csvData} headers={headers} filename={exportConfig.fileName || 'table-data.csv'}>
                                <button
                                    className="text-white flex btn bg-green-500 border-green-500 hover:text-white hover:bg-green-600 hover:border-green-600 
               active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/20 
               items-center gap-1 add-btn"
                                    data-bs-toggle="modal"
                                    id="create-btn"
                                    data-bs-target="#showModal"
                                >
                                    Export To CSV
                                </button>

                            </CSVLink>


                        </div>
                        <div className="my-2 col-span-12 overflow-x-auto lg:col-span-12">
                            <table id="basic_tables" className="display  stripe group datatables min-w-full table-auto text-sm align-middle whitespace-nowrap" style={{ width: '100% ' }} aria-describedby="basic_tables_info">
                                <thead className="border-b border-slate-200 dark:border-zink-500">

                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <tr key={headerGroup.id}>
                                            {headerGroup.headers.map(header =>
                                                <th className="   
                                group-[.bordered]:border group-[.bordered]:border-slate-200 group-[.bordered]:dark:border-zink-500 sorting px-2.5 py-2.5
                                 text-black bg-slate-200/50 font-semibold font-public text-left dark:text-zink-50 dark:bg-zink-600 dark:group-[.bordered]:border-zink-500 
                                 sorting_asc  "  key={header.id} onClick={header.column.getToggleSortingHandler()}>

                                                    <div className='flex items-center '>
                                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}

                                                        <span className='material-symbols-outlined' style={{ cursor: 'pointer', paddingTop: '0px', paddingLeft: '5px' }} >
                                                            unfold_more

                                                            {
                                                                { asc: ' ', desc: '  ', }
                                                                [header.column.getIsSorted() ?? null]
                                                            }
                                                        </span>


                                                    </div>

                                                </th>
                                            )}

                                        </tr>


                                    ))}


                                </thead>
                                <tbody>


                                    {table.getRowModel().rows.map(row => (
                                        <React.Fragment key={row.id}>
                                            <tr className="group-[.stripe]:even:bg-slate-50 group-[.stripe]:dark:even:bg-zink-600 transition-all duration-150 ease-linear group-[.hover]:hover:bg-slate-50 dark:group-[.hover]:hover:bg-zink-600 [&amp;.selected]:bg-custom-500 dark:[&amp;.selected]:bg-custom-500 [&amp;.selected]:text-custom-50 dark:[&amp;.selected]:text-custom-50">
                                                {row.getVisibleCells().map(cell => (



                                                    <td key={cell.id} className="p-2 group-[.bordered]:border group-[.bordered]:border-slate-200 group-[.bordered]:dark:border-zink-500 sorting_1">
                                                        <p className="font-normal text-black dark:text-white" >{flexRender(cell.column.columnDef.cell, cell.getContext())} </p>

                                                    </td>

                                                ))}



                                            </tr>

                                            {expanded[row.id] && (
                                                <tr>
                                                    <td colSpan={columns.length + 1}>
                                                        <div style={{
                                                            padding: '20px',
                                                            backgroundColor: '#f9f9f9',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '8px',
                                                            marginTop: '10px',
                                                        }}>
                                                            <strong className='text-black'>Additional Details:</strong>
                                                            <ul className='flex p-2'>
                                                                {Object.entries(row.original).map(([key, value]) => (
                                                                    (key === 'region' || key === 'server_ip' || key === 'recording_link') && (
                                                                        <li className='pl-5 dark:border-zink-500' key={key}>
                                                                            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                                                                            <p>{Array.isArray(value) ? value.join(', ') : value}</p>
                                                                        </li>
                                                                    )
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}

                                        </React.Fragment>

                                    ))}


                                </tbody>

                            </table>
                        </div>
                        <div className='self-center col-span-12 lg:col-span-6' >
                            <div>
                                <strong> Showing {''} {table.getState().pagination.pageIndex + 1} of{" "} {table.getPageCount()} {''} Pages </strong>
                            </div>
                        </div>
                        <div className="self-center col-span-12 lg:place-self-end lg:col-span-6">

                            <nav >
                                <ul className="flex flex-wrap items-center gap-2 ">
                                    <li>
                                        <button className={!table.getCanPreviousPage() ? ' flex items-center ring-1 ring-blue-100  justify-center rounded  px-3 py-1.5 text-xs font-medium text-black' : 'flex items-center justify-center rounded bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600 hover:text-white dark:bg-graydark dark:text-white dark:hover:bg-blue-600 dark:hover:text-white  active:text-white active:bg-blue-600 active:border-blue-600 active:ring active:ring-blue-100'} disabled={!table.getCanPreviousPage()} onClick={() => onPageChange(0)} >First</button>
                                    </li>
                                    <li>
                                        <button className={!table.getCanPreviousPage() ? ' flex items-center ring-1 ring-blue-100 justify-center rounded px-3 py-1.5 text-xs font-medium text-black' : 'flex items-center justify-center rounded  bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600 hover:text-white dark:bg-graydark dark:text-white dark:hover:bg-blue-600 dark:hover:text-white  active:text-white active:bg-blue-600 active:border-blue-600 active:ring active:ring-blue-100'} disabled={!table.getCanPreviousPage()} onClick={() => onPageChange(table.getState().pagination.pageIndex - 1)} >Previous</button>
                                    </li>

                                    <li>
                                        <button className={!table.getCanNextPage() ? ' flex items-center ring-1 ring-blue-100  justify-center rounded px-3 py-1.5 text-xs font-medium text-black' : 'flex items-center justify-center rounded  bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600 hover:text-white dark:bg-graydark dark:text-white dark:hover:bg-blue-600 dark:hover:text-white  active:text-white active:bg-blue-600 active:border-blue-600 active:ring active:ring-blue-100'} disabled={!table.getCanNextPage()} onClick={() => onPageChange(table.getState().pagination.pageIndex + 1)} >Next</button>
                                    </li>
                                    <li>
                                        <button className={!table.getCanNextPage() ? ' flex items-center ring-1 ring-blue-100  justify-center rounded px-3 py-1.5 text-xs font-medium text-black' : 'flex items-center justify-center rounded  bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600 hover:text-white dark:bg-graydark dark:text-white dark:hover:bg-primary dark:hover:text-white  active:text-white active:bg-blue-600 active:border-blue-600 active:ring active:ring-blue-100'} disabled={!table.getCanNextPage()} onClick={() => onPageChange(table.getPageCount() - 1)}>Last</button>
                                    </li>
                                    <li className='ml-2' >
                                        <span className='flex items-center'>
                                            Go to page:
                                            <input
                                                className="ml-2 border border-gray-400 p-0.5 h-6 w-10 text-center rounded"
                                                type="number"
                                                min={1}
                                                max={table.getPageCount()}
                                                // value={table.getState().pagination.pageIndex + 1}
                                                defaultValue={table.getState().pagination.pageIndex + 1} // Display current page
                                                onChange={(e) => {

                                                    const pageIndex = e.target.value ? Number(e.target.value) - 1 : 0;
                                                    if (pageIndex >= 0 && pageIndex < table.getPageCount()) {
                                                        onPageChange(pageIndex); // Jump to the entered page
                                                    }

                                                }}
                                            />
                                        </span>

                                    </li>
                                </ul>
                            </nav>





                        </div>
                    </div>
                </div>

            </div>
        </>




    );
}

export default NewTable;
