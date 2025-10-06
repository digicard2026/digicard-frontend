import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DynamicTable from '../../components/DynamicTable';
import { useCart } from '../../components/Header/CartContext';
import { LuChevronRight, LuChevronDown, LuPhoneOff, LuPhone, LuTrash2, LuAlertCircle, LuCheck } from "react-icons/lu";
import { Route } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { useInventory } from './InventoryContext';
import { useNavigate } from 'react-router-dom';
import Toaster from '../../components/Toaster/Toaster';
import { GET_METHOD } from '../../utility/constants';
import { throwError } from '../../utility/errorHandler';
import { ORDER_URL, INVENTORY_URL } from '../../utility/constants';

// Access the base API URL from the environment variable

function Manage() {
    const { addToCart, addToCartV2, removeItem } = useCart();
    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [routes, setRoutes] = useState('');
    const [routeFilter, setRouteFilter] = useState('');
    const [route] = useState(['Set Route', 'Set Failover Route']);
    const { selectedIds, handleSelect, handleOrderDetails } = useInventory();
    // const [message, setMessage] = useState('');
    const [isAnySelected, setIsAnySelected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);

    const [searchBar, setSearchBar] = useState(true);
    const [pagination, setPagination] = useState(true);

    const navigate = useNavigate();
    const showToast = (message, type) => {
        setToast({ message, type })
    }

    useEffect(() => {
        const fetchData = async () => {
            
                setLoading(true);
            

            
            const filterByRoute = routeFilter ? routeFilter : '';

            try {
                const response = await fetch(`${ORDER_URL}/manage?page=${page + 1}&limit=${pageSize}&filterByRoute=${filterByRoute}`, GET_METHOD);
                const result = await response.json();
                if (result.message === 'Invalid token') {
                    showToast('Session Expired redirecting to login page', 'error');
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                }
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                console.log('result ex', result)
                if (result.orders.length === 0 && filterByRoute !== '') {
                    showToast('No non configured DID found', 'warning');
                    setRouteFilter('');
                } else {
                    setData(result.orders);
                    console.log(result)
                    console.log(page)
                    setTotalItems(result.totalRecords);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();

    }, [page, routeFilter, totalItems]);

    const handleRouteChange = (e) => {
        const value = e.target.checked ? "not-configured" : "";
        setRouteFilter(value);
        setPage(0);
        console.log("Route filter changed:", value);
    };

    const changeStatus = async (orderId) => {
        setLoading(true);
        try {
            const response = await fetch(`${ORDER_URL}/changeStatus`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ orderId }),
            });
            const result = await response.json();
            if (result.message === 'Invalid token') {
                showToast('Session Expired redirecting to login page', 'error');
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
            console.log(result);
            if (response.ok) {
                if (result.newStatus === 'Active') {
                    showToast('Number activated successfully.', 'success');
                } else {
                    showToast('Number deactivated successfully.', 'warning');
                }
            }
            return result.newStatus;

        } catch (error) {
            showToast('Failed to change order status', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleChangeStatus = async (order) => {
        try {
            console.log("order", order)
            const newStatus = await changeStatus(order.orderId);
            setData(prevOrders => prevOrders.map(o =>
                o.orderId === order.orderId ? { ...o, inventoryId: { ...o.inventoryId, status: newStatus } } : o
            ))



        } catch (error) {
            showToast(error.message, 'error');

        }
    };

    const handleToggleCart = async (item, action) => {
        try {
            const response = await fetch(`${INVENTORY_URL}/toggleitemblock`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                credentials: 'include',
                body: JSON.stringify({ inventory_id: item, action }),
            });

            const result = await response.json();
            console.log('API Response:', result); // Log the API response

            if (response.ok && result.success) {
                if (action === 'block') {
                    addToCart(item);
                    setData(prevData => {
                        const newData = prevData.map(d => d.did === item.did ? { ...d, isPurchased: true, purchasedBy: 'currentUserId' } : d);
                        console.log('Updated Data after Block:', newData); // Log the updated data
                        return newData;
                    });
                } else if (action === 'unblock') {
                    removeItem(item._id);
                    setData(prevData => {
                        const newData = prevData.map(d => d.did === item.did ? { ...d, isPurchased: false, purchasedBy: null } : d);
                        console.log('Updated Data after Unblock:', newData); // Log the updated data
                        return newData;
                    });
                }
            } else {
                console.error('Error:', result.message);
            }
        } catch (error) {
            console.error(`Error ${action}ing item:`, error);
        }
    };

    const delOrder = async (orderId) => {
        setLoading(true);
        try {
            const response = await fetch(`${ORDER_URL}/delete`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ orderId }),
            });
            const result = await response.json();
            if (result.message === 'Invalid token') {
                showToast('Session Expired redirecting to login page', 'error');
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
            console.log(result.message);
            if (response.ok) {
                showToast('DID deleted successfully.', 'warning');
            }

            return result.order;
        } catch (error) {
            console.error('Delete order error:', error);
            showToast(error.message, 'error');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteOrder = async (order) => {
        try {
            console.log(order)
            await delOrder(order.orderId);

            setData(prevOrders => prevOrders.filter(item => item.orderId !== order.orderId));
            setTotalItems(totalItems => totalItems - 1);
        } catch (error) {
            showToast(error.message, 'error');

        }
    };

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
                    {/* <button className='p-0.5 bg-gray rounded' onClick={() => row.toggleExpanded()} >

                    <span style={{ cursor: 'pointer' }}>
                        {row.getIsExpanded() ? <LuChevronDown /> : <LuChevronRight />}
                    </span>
                </button> */}
                </div>
            ),
        },
        { header: 'DID', accessorKey: 'inventoryId.did', cell: ({ getValue }) => <span className="font-semibold">{getValue()}</span>, },
        { header: 'Region', accessorKey: 'inventoryId.region', cell: ({ getValue }) => <span className={` ${getValue() === 'Delhi' ? 'bg-red-200 text-red-800' : ''} ${getValue() === 'Kolkata' ? 'bg-yellow-200 text-yellow-800' : ''} ${getValue() === 'Cuttack' ? 'bg-blue-200 text-blue-800' : ''}  ${getValue() === 'Bhubaneswar' ? 'bg-orange-200 text-orange-800' : ''} ${getValue() === 'Bangalore' ? 'bg-green-200 text-green-800' : ''} ${getValue() === 'Chennai' ? 'bg-purple-200 text-purple-800' : ''} font-normal text-[13px] px-1 py-0.5 rounded`}>{getValue()}</span>, },
        { header: 'Provider', accessorKey: 'inventoryId.provider', },
        {
            header: 'Status', accessorKey: 'inventoryId.status', cell: ({ row }) => {
                if (!row.original.inventoryId) {
                    return null;
                }
                const status = row.original.inventoryId.status;
                const cellStyle = {
                    backgroundColor: status === 'Active' ? '#c5ebdc' : '#ffcccf',
                    color: status === 'Active' ? '#27a372' : '#fc4c55',

                    borderRadius: '3px',
                    fontSize: '13px', // Slightly smaller font for a compact look
                    display: 'inline-block', // Keeps background close to text size
                    textAlign: 'center',
                    lineHeight: '1',
                    padding: '3px 6px',
                    fontWeight: 'semibold',

                };
                return (
                    <div style={cellStyle}>
                        {status}
                    </div>
                );
            }
        },
        // { header: 'Price', accessorKey: 'Price' },
        { header: 'Route', accessorKey: 'route' },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) =>
            (

                <div className='flex items-center gap-2'>
                    {

                        !row.original.isPrimary ? (
                            <button disabled={isAnySelected} className={`${isAnySelected ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}flex items-center justify-center rounded bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 hover:text-white relative tooltip`} onClick={() => handleDeleteOrder(row.original)}>
                                <LuTrash2 />
                                <span className="tooltip-text">Delete</span>
                            </button>
                        ) : (
                            <span className='flex items-center justify-center rounded-3xl bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600 hover:text-white relative tooltip' >
                                <LuAlertCircle />
                                <span className="tooltip-text">Primary DID</span>
                            </span>
                        )}
                    {
                        row.original.inventoryId.status === 'Active' ? (<button disabled={isAnySelected} className={`${isAnySelected ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}flex items-center justify-center rounded bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 hover:text-white relative tooltip`} onClick={() => handleChangeStatus(row.original)}
                        ><LuPhoneOff />
                            <span className="tooltip-text">Deactivate</span>
                        </button>)
                            : (<button disabled={isAnySelected} className={`${isAnySelected ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}flex items-center justify-center rounded bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600 hover:text-white relative tooltip`} onClick={() => handleChangeStatus(row.original)}>
                                <LuPhone />
                                <span className="tooltip-text">Activate</span>
                            </button>)
                    }
                </div>

            ),
        },
    ];


    // Handle search input from the table component
    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);  // Update search term and trigger data fetching
    };

    // Handle the dynamic button click (could be used for adding a new item, etc.)

    const handleAddSelectedToCart = (selectedRows) => {
        addToCartV2(selectedRows);
    };

    const handleAddSelectedToInventroy = (selectedRows) => {

        console.log("selected row ", selectedRows)
        handleOrderDetails(selectedRows);
        const selectedIds = selectedRows.map(row => row.orderId);
        console.log("event id2", selectedIds)
        handleSelect(selectedIds);
    };
    // const handleAddSelectedToInventroy = (selectedRows) => {

    //     handleSelect(selectedRows);
    // };

    const exportConfig = {

        excludedColumns: ['select', 'actions'], // Columns to exclude during export
        fileName: 'MyData.csv',
    };
    const handleRoute = (event) => {
        const value = event.target.value;
        setRoutes(value);
        if (value === "Set Route") {
            if (selectedIds.length == 0) {
                showToast("Please select at least one DID number", "error");
            }
            else {
                navigate('/setroutes');  // Change this to your desired route
            }
        }
    }

    const handleSelectionChange = (selectedRows) => {
        setIsAnySelected(selectedRows.length > 0);
    };
    //Loading code
    if (loading) {
        return <Spinner />;
    }

    if (!routeFilter && data && data.length === 0) {

        return (
            <>
                <Breadcrumb pageName="Manage" />
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
    }

    return (
        <>
            <Breadcrumb pageName="Manage" />
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

                        <div className="self-center col-span-12 w-full lg:col-span-6 lg:place-self-start pb-3">
                            <div id="basic_tables_filter " className="dataTables_filter   flex absolute ">
                                {route &&
                                    <label >
                                        {/* <p className='px-0.5 pb-3 text-black' >Choose a DID Action</p> */}

                                        <select className="form-input border-slate-200  dark:border-slate-200 focus:outline-none
             focus:border-blue-500 disabled:bg-slate-300 border rounded-md py-1 text-black
              dark:disabed:bg-slate-600 disabled:border-slate-600 dark:disabled:border-slate-800 
              dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 
              dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200
              inline-block w-full lg:w-[180px] px-2.5 hover:cursor-pointer "  value={route} onChange={handleRoute} id="">
                                            <option value="">DID Actions</option>
                                            {route.map((routerOption, index) => (
                                                <option key={index} value={routerOption}>
                                                    {routerOption}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                }
                                <label>
                                    
                                    <div className="flex items-center pl-5 pt-0.5 space-x-3">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={routeFilter}
                                                onChange={handleRouteChange}
                                            />
                                            <div
                                                className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 
                                   peer-focus:ring-blue-500 dark:bg-zinc-700 rounded-full peer dark:peer-focus:ring-custom-800
                                   peer-checked:bg-blue-500 peer-checked:dark:bg-custom-800 relative"
                                            >
                                                <span
                                                    className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform 
                                        ${routeFilter === "not-configured" ? 'translate-x-5' : ''}`}
                                                >
                                                    {routeFilter === "not-configured" && <LuCheck className="w-3 h-3 my-[2.5px] mx-0.5 text-blue-500" />}
                                                </span>
                                            </div>
                                        </label>
                                        {routeFilter === "not-configured" ? <p className="text-black">Non Configured DIDs</p> : <p className="text-black">All DIDs</p>}
                                    </div>
                                </label>
                            </div>
                        </div>

                        <DynamicTable
                            columns={columns}
                            data={data}
                            totalItems={totalItems}
                            page={page}
                            pageSize={pageSize}
                            onPageChange={setPage}
                            onPageSizeChange={setPageSize}
                            // rowActions={rowActions}  // Dynamic row actions
                            topButtonLabel="Add to Cart"
                            // onTopButtonClick={handleAddSelectedToCart}
                            onTopButtonClick2={handleAddSelectedToInventroy}
                            exportConfig={exportConfig}
                            route={route}
                            setRoutes={setRoutes}
                            routes={routes}
                            // Errormessage={message}
                            onSelectionChange={handleSelectionChange}
                            searchBar={searchBar}
                            pagination={pagination}

                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Manage;
