import React, { useMemo, useState, useEffect } from 'react';
import { LuPlus, LuFileSymlink, LuCross, LuCheck, LuCornerDownRight } from "react-icons/lu";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender, getExpandedRowModel } from '@tanstack/react-table';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function NewTable({
    columns,           // Columns configuration (headers, accessor keys, etc.)
    data,              // Data to display in the table
    // A function passed to handle row actions like "Add to Cart"
    page,              // Current page number
    pageSize,          // Items per page
    totalItems,        // Total number of items (for pagination)
    // Label for the dynamic top button
    onTopButtonClick,

    startDigits,
    endDigits,
    setStartDigits,
    setEndDigits,
    containsValue,
    setContainsValue,
    provider,
    setProvider,
    region,
    setRegion,
    providers,
    regions,
    onFilter,
    fetchinventory,
    handleClearFilters,
    handleRefresh,
    premium,
    setPremium

}) {
    const [expanded, setExpanded] = useState({});
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState([]);


    const [rowSelection, setRowSelection] = useState({});

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



    const handleStart = (event) => {
        const value = event.target.value;
        setStartDigits(value);

    };
    const handleEnd = (event) => {
        const value = event.target.value;
        setEndDigits(value);

    };

    const handleContainsValue = (event) => {
        const value = event.target.value;
        setContainsValue(value);

    };
    const handleRegion = (event) => {
        const value = event.target.value;
        setRegion(value);

    };
    const handleProvider = (event) => {
        const value = event.target.value;
        setProvider(value);

    };
    const handlePremium = (e) => {
        // const value = e.target.value === 'true'; // Convert string to boolean
        const value = e.target.checked;
        setPremium(value);

        console.log("Premium status changed:", value);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({ startDigits, endDigits, containsValue, region, provider, premium });

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

    //     doc.autoTable({ head: [headers], body: rows,});
    //     doc.save(exportConfig.fileName || 'table-data.pdf');
    // };






    return (


        <>

            <div className="mb-5 rounded-md bg-white dark:bg-zinc-800">
                <div className="p-5">
                    <div className="grid grid-cols-12 lg:grid-cols-12 gap-3">

                        <div className="self-center col-span-12 w-full lg:col-span-12 lg:place-self-center">
                            <div id="basic_tables_filter " className="dataTables_filter flex justify-between items-center ">

                                <form className='w-full text-black flex gap-6 justify-around' onSubmit={handleSubmit} action="">
                                    <label >
                                        <p className='px-4 pb-3'>DID start</p>

                                        <input type="search" className="form-input border-slate-200 dark:border-slate-200 focus:outline-none
                                     focus:border-blue-500 disabled:bg-slate-300 border rounded-md py-1
                                      dark:disabled:bg-slate-600 disabled:border-slate-600 dark:disabled:border-slate-800 
                                      dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 
                                      dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200
                                      inline-block w-full lg:w-[100px] px-2.5 " placeholder=" Search" aria-Search aria-controls="basic_tables"
                                            value={startDigits}
                                            onChange={handleStart}></input>
                                    </label>
                                    <label >
                                        <p className='px-4 pb-3' >DID ends</p>

                                        <input type="search" className="form-input border-slate-200 dark:border-slate-200 focus:outline-none
                                     focus:border-blue-500 disabled:bg-slate-300 border rounded-md py-1
                                      dark:disabed:bg-slate-600 disabled:border-slate-600 dark:disabled:border-slate-800 
                                      dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 
                                      dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200
                                      inline-block w-full lg:w-[100px] px-2.5" placeholder=" Search" aria-Search aria-controls="basic_tables"
                                            value={endDigits}
                                            onChange={handleEnd}
                                        ></input>
                                    </label>
                                    <label >
                                        <p className='px-4 pb-3' >DID contains</p>

                                        <input type="search" className="form-input border-slate-200 dark:border-slate-200 focus:outline-none
                                     focus:border-blue-500 disabled:bg-slate-300 border rounded-md py-1
                                      dark:disabed:bg-slate-600 disabled:border-slate-600 dark:disabled:border-slate-800 
                                      dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 
                                      dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200
                                      inline-block w-full lg:w-[100px] px-2.5 " placeholder=" Search" aria-Search aria-controls="basic_tables" value={containsValue}
                                            onChange={handleContainsValue}></input>
                                    </label>

                                    <label>
                                        <p className='px-4 pb-3' >Provider</p>

                                        <select className="form-input border-slate-200 dark:border-slate-200 focus:outline-none
                                     focus:border-blue-500 disabled:bg-slate-300 border rounded-md py-1
                                      dark:disabed:bg-slate-600 disabled:border-slate-600 dark:disabled:border-slate-800 
                                      dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 
                                      dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200
                                      inline-block w-full lg:w-[100px] px-2.5 "  value={provider} onChange={handleProvider} id="">
                                            <option value="">Provider</option>
                                            {providers.map((providerOption, index) => (
                                                <option key={index} value={providerOption}>
                                                    {providerOption}
                                                </option>
                                            ))}


                                        </select>

                                    </label>
                                    <label>
                                        <p className='px-4 pb-3' >Region</p>
                                        <select className="form-input border-slate-200 dark:border-slate-200 focus:outline-none
                                     focus:border-blue-500 disabled:bg-slate-300 border rounded-md py-1
                                      dark:disabed:bg-slate-600 disabled:border-slate-600 dark:disabled:border-slate-800 
                                      dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 
                                      dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200
                                      inline-block w-full lg:w-[100px] px-2.5 "  name="region" id="" value={region} onChange={handleRegion}>
                                            <option value="">Region</option>

                                            {regions.map((regionOption, index) => (
                                                <option key={index} value={regionOption}>
                                                    {regionOption}
                                                </option>
                                            ))}
                                        </select>

                                    </label>
                                    <label >
                                        <p className=' pb-3.5' >Premium</p>
                                        <div className="flex items-center pl-2 space-x-3">


                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={premium}
                                                    onChange={handlePremium}
                                                />
                                                <div
                                                    className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 
                               peer-focus:ring-blue-500 dark:bg-zinc-700 rounded-full peer dark:peer-focus:ring-custom-800
                               peer-checked:bg-blue-500 peer-checked:dark:bg-custom-800 relative"
                                                >
                                                    <span

                                                        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full  transition-transform 
                                    ${premium ? 'translate-x-5' : ''}`}

                                                    >

                                                        {premium && <LuCheck className="w-3 h-3 my-[2.5px] mx-0.5  text-blue-500" />}


                                                    </span>
                                                </div>
                                            </label>
                                            {/* <span className={`text-sm w-10  ${premium ? 'text-blue-500' : 'text-gray-500'}`}>
                {premium ? 'Premium' : 'Standard'}
            </span> */}
                                        </div>

                                    </label>


                                    <label htmlFor="" className=' mx-5 mt-8 h-7  flex gap-3  ' >
                                        {startDigits || endDigits || containsValue || region || provider || premium ?
                                            <>
                                                <button className="text-white  flex btn bg-green-500 border-green-500 hover:text-white hover:bg-green-600 hover:border-green-600 
                             active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/20 items-center gap-1  add-btn" type="submit">Go</button>

                                                <button className="text-white  flex btn bg-red-500 border-red-500 hover:text-white hover:bg-red-600 hover:border-red-600 
                             active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-red-400/20 items-center gap-1  add-btn" type="button" onClick={handleClearFilters}>Clear</button>

                                            </> : null}




                                        <button className="text-white  flex btn bg-blue-500 border-blue-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 
                             active:text-white active:bg-blue-600 active:border-blue-600 active:ring active:ring-blue-100 dark:ring-blue-400/20 items-center gap-1  add-btn" type="submit">Refresh</button>


                                    </label>

                                    {/* 
                                <button className="form-input border-slate-200 dark:border-slate-200 focus:outline-none
                                     focus:border-blue-500 disabled:bg-slate-300 border rounded-md py-1
                                      dark:disabed:bg-slate-600 disabled:border-slate-600 dark:disabled:border-slate-800 
                                      dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 
                                      dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200
                                      inline-block w-full lg:w-[100px] px-2.5 " onClick={handleRefresh}  >Refresh Products</button> */}
                                </form>




                            </div>
                        </div>
                        {/* <div className="self-center col-span-12  flex gap-2 place-self-end lg:col-span-6">
                           {
                            Object.keys(rowSelection).length > 0 && onTopButtonClick ?  <button type="button" onClick={handleTopButtonClick} className="text-white  flex btn bg-blue-500 border-blue-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 
                            active:text-white active:bg-blue-600 active:border-blue-600 active:ring active:ring-blue-100 dark:ring-blue-400/20 items-center gap-1  add-btn" data-bs-toggle="modal" id="create-btn" data-bs-target="#showModal"><LuPlus />{topButtonLabel}</button>
                            : null
                           }
                               
                                <button onClick={Export}  className="text-white  flex btn bg-green-500 border-green-500 hover:text-white hover:bg-green-600 hover:border-green-600 
                             active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/20 items-center gap-1  add-btn" data-bs-toggle="modal" id="create-btn" data-bs-target="#showModal"><LuFileSymlink/> Export</button>         
                       
                       
                        </div> */}
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
                                                <tr >
                                                    <td colSpan={columns.length + 1}>
                                                        <div style={{
                                                            padding: '20px',
                                                            backgroundColor: '#f9f9f9',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '8px',
                                                            marginTop: '10px',
                                                        }}>
                                                            <strong className='text-black  '>Additional Details:</strong>
                                                            <ul className='flex p-2 ' >
                                                                {Object.entries(row.original).map(([key, value]) => (
                                                                    key !== 'id ' && key !== 'isinBlockedInCart' && key !== '_id' && key !== 'slno' && key !== 'customer_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v' && key !== 'isBlockedInCart' && key !== 'blockedBy' && (
                                                                        <li className=' pl-5 dark:border-zink-500' key={key}>
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
                        {/* <div className='self-center col-span-12 lg:col-span-6' >
                            <div>
                                <strong> Showing {''} {table.getState().pagination.pageIndex + 1} of{" "} {table.getPageCount()} {''} Pages </strong>
                            </div>
                        </div> */}
                        <div className="self-center col-span-12 lg:place-self-end lg:col-span-6">

                            {/* <nav >
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
                            </nav> */}





                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default NewTable;
