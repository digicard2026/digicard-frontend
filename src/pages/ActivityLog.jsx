import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import React, { useMemo, useState, useEffect } from 'react';
import DynamicTable from '../components/DynamicTable';
import { useNavigate } from 'react-router-dom';
import Toaster from '../components/Toaster/Toaster';
import Spinner from '../components/Spinner';
import { ACTIVITYLOG_URL, GET_METHOD } from '../utility/constants';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by ErrorBoundary: ", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

const ActivityLog = () => {

    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchBar, setSearchBar] = useState(true);
    const [pagination, setPagination] = useState(true);
    const [pageSize, setPageSize] = useState(10);
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    const showToast = (message, type) => {
        setToast({ message, type })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${ACTIVITYLOG_URL}/activity/?page=${page + 1}&limit=${pageSize}`, GET_METHOD);

                const data = await response.json();
                if (data.message === 'Invalid token') {
                    showToast('Session Expired redirecting to login page', 'error');
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                }
                console.log('activity', data.data.activity)
                console.log(data.data.totalRecords)

                if (data.message) {
                    setData(data.data.activity);
                    setTotalItems(data.data.totalRecords);
                }




            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, pageSize]);

    const columns = useMemo(() => [
        // {
        //     id: 'select',
        //     header: ({ table }) => (
        //         <input type="checkbox" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />
        //     ),
        //     cell: ({ row }) => (
        //         <input
        //             type="checkbox"
        //             checked={row.getIsSelected()}
        //             disabled={!row.getCanSelect()}
        //             onChange={row.getToggleSelectedHandler()}
        //         />
        //     ),
        // },
        { header: ' Activity ID', accessorKey: '_id' },
        { header: 'IP Address', accessorKey: 'ipAddress', cell: ({ getValue }) => <span className="font-semibold">{getValue()}</span>, },
        { header: 'Action', accessorKey: 'action' },
        { header: 'Description', accessorKey: 'description' },
        {
            header: 'Created At', accessorKey: 'createdAt', cell: ({ getValue }) => {
                const date = new Date(getValue());
                const formattedDate = date.toLocaleDateString('en-GB') + ' ' + date.toLocaleTimeString('en-GB', {
                    hour12: true, // Ensures 12-hour format
                });
                return formattedDate;
            },
        },
        // {
        //     id: 'actions',
        //     header: 'Actions',
        //     cell: ({ row }) => (
        //         <button className='flex items-center justify-center rounded bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600 hover:text-white dark:bg-graydark dark:text-white dark:hover:bg-blue-500 dark:hover:text-white active:text-white active:bg-blue-600 active:border-blue-600 active:ring active:ring-blue-100' onClick={() => handleDownloadInvoice(row.original._id)} >
        //             Download Invoice
        //         </button>
        //     ),
        // },
    ], []);

    if (loading) {
        return <Spinner />;
    };

    if (data && data.length === 0 || data === null) {
        return (
            <>
                <Breadcrumb pageName="Activity Log" />
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
            <Breadcrumb pageName="Activity Log" />
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
                        <ErrorBoundary>
                            <DynamicTable
                                data={data}
                                columns={columns}
                                totalItems={totalItems}
                                page={page}
                                pageSize={pageSize}
                                onPageChange={setPage}
                                onPageSizeChange={setPageSize}
                                searchBar={searchBar}
                                pagination={pagination}
                            />
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ActivityLog;