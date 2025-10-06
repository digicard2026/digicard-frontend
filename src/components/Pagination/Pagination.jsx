import React from 'react'

function Pagination({ table, onPageChange }) {
    return (
        <>
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
        </>
    )
}

export default Pagination