import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { LuChevronRight, LuChevronDown, } from "react-icons/lu";
import NewTable from '../components/NewTable2';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import Toaster from '../components/Toaster/Toaster';
import { GET_METHOD, REPORT_URL } from '../utility/constants';
import { throwError } from '../utility/errorHandler';



//const apiUrl = import.meta.env.VITE_API_URL;
//const REPORT_URL = `${apiUrl}/api/v1/report`;


const CdirReport = () => {
    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);
    const showToast = (message, type) => {
        setToast({ message, type })
    }




    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`${REPORT_URL}/reports?page=${page+1}&limit=${pageSize}`, GET_METHOD);
                const result = await response.json();
                if (result.message === 'Invalid token'){
                    showToast('Session Expired redirecting to login page', 'error');
                    setTimeout(() => {
                        navigate('/');
                    },3000);
                }
          
               
                if (!response.ok) {
                    throwError(response.status,{404: 'Report not found.',500: 'Something went wrong on our end. Please try again later.',401: 'Session expired. Please log in again.'});
                }

                console.log(result.reports.reports)
                const reports = result.reports.reports;
                setData(reports);
                console.log(reports)

                setTotalItems(result.reports.total);

            } catch (error) {
                console.error('Error fetching data:', error);
                showToast('Session Expired redirecting to login page', 'error');
            }finally {
                setLoading(false);
            }
        };
        fetchData();

    }, [page, setPage, setPageSize]);


    // Table Columns Configuration
    const columns = [
        {
            id: 'select',
            header: ({ table }) => (
                <input type="checkbox" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />
            ),
            cell: ({ row }) => (
                <div className='flex items-center gap-3 ' >
                    <input
                        type="checkbox"
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        onChange={row.getToggleSelectedHandler()}

                    />
                    <button className='p-0.5 bg-gray rounded' onClick={() => row.toggleExpanded()} >

                        <span style={{ cursor: 'pointer' }}>
                            {row.getIsExpanded() ? <LuChevronDown /> : <LuChevronRight />}
                        </span>
                    </button>
                </div>
            ),
        },

        { header: 'Call Type', accessorKey: 'call_type' },
        { header: 'Start Time', accessorKey: 'start_time' },
        { header: 'End Time', accessorKey: 'end_time' },
        { header: 'Source', accessorKey: 'source' },
        { header: 'Destination', accessorKey: 'destination' },
        { header: 'Status', accessorKey: 'status' },
        { header: 'Duration', accessorKey: 'duration' },






        // {
        //     id: 'actions',
        //     header: 'Actions',
        //     cell: ({ row }) => 
        //     (
        //         <div className='flex items-center gap-2'>
        //             {row.original.isBlockedInCart && row.original.blockedBy !== 'currentUserId' ? (
        //                 <button className='flex items-center justify-center rounded bg-gray-500 px-3 py-1.5 text-xs font-medium text-orange-400' disabled>
        //                     Blocked by another user
        //                 </button>
        //             ) : row.original.isBlockedInCart ? (
        //                 <button className='flex items-center justify-center rounded bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 hover:text-white' onClick={() => handleToggleCart(row.original, 'unblock')}>
        //                     remove from cart
        //                 </button>
        //             ) : (
        //                 <button className='flex items-center justify-center rounded bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600 hover:text-white' onClick={() => handleToggleCart(row.original, 'block')}>
        //                     add to cart
        //                 </button>
        //             )}
        //         </div>
        //     ),
        // },
    ];

    // Handle search input from the table component
    //    const handleSearch = (searchValue) => {
    //     setSearchTerm(searchValue);  // Update search term and trigger data fetching
    // };

    // Handle the dynamic button click (could be used for adding a new item, etc.)

    // const handleAddSelectedToCart = (selectedRows) => {
    //     addToCartV2(selectedRows);
    // };

    // const handleAddSelectedToInventroy = (selectedRows) => {

    //     console.log("selected row ",selectedRows)
    //     const selectedIds = selectedRows.map(row => row.inventoryId);
    //     console.log("event id2",selectedIds)
    //     handleSelect(selectedIds);

    // };


    const exportConfig = {
        excludedColumns: ['select', 'actions'], // Columns to exclude during export
        fileName: 'CDR-Report.csv',
    };

    if(loading) {
        return <Spinner />;
    };

    if(data && data.length === 0 || data === null) {
        return (
            <>
                <Breadcrumb pageName="CDR Report" />
                {toast && (
                <Toaster
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
                <div className="flex items-center justify-center pt-4 mt-10">
                    <p className="text-lg text-gray-600">No results found</p>
                </div>
            </>

        );
    };

    return (
        <>
            <Breadcrumb pageName="CDR Report" />
            {toast && (
                <Toaster
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
              <div className="mb-5 rounded-md bg-white dark:bg-zinc-800">
                <div className="p-5">

                    <div className="grid grid-cols-12 lg:grid-cols-12 gap-3">

            <NewTable
                columns={columns}
                data={data}
                totalItems={totalItems}
                page={page}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
                //     topButtonLabel="Add to Cart"
                //   //  onTopButtonClick={handleAddSelectedToInventroy}
                exportConfig={exportConfig}
            //     route={route}
            //     setRoutes={setRoutes}
            //     routes={routes}

            />

                    </div>  
</div>
                </div>
        </>
    );
}

export default CdirReport;
