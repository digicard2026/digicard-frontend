import React from 'react'
import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DynamicTable from '../components/DynamicTable';
import { LuArchiveRestore } from "react-icons/lu";
import Spinner from '../components/Spinner';
import Toaster from '../components/Toaster/Toaster';
import { useNavigate } from 'react-router-dom';
import { GET_METHOD, ORDER_URL } from '../utility/constants';
import { INVENTORY_URL } from '../utility/constants';
import { throwError } from '../utility/errorHandler';
// Access the base API URL from the environment variable
//const apiUrl = import.meta.env.VITE_API_URL;

// Define the full API URLs by concatenating apiUrl with the specific endpoint paths
// const ORDER_URL = `${apiUrl}/api/v1/order`;
// const INVENTORY_URL = `${apiUrl}/api/v1/inventory`;

function Archive() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isAnySelected, setIsAnySelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [selected, setSelected] = useState([]);
  const [searchBar, setSearchBar] = useState(true);
  const [pagination, setPagination] = useState(true);
  const navigate = useNavigate();
  const showToast = (message, type) => {
    setToast({ message, type });
  };


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`${ORDER_URL}/deletedOrder?page=${page + 1}&limit=${pageSize}`, GET_METHOD);
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

        console.log(result)

        setData(result.orders);

        setTotalItems(result.totalRecords);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setLoading(false);
      }
    };
    fetchData();

  }, [page, setPage, setPageSize, pageSize, totalItems ]);

  const restoreOrder = async (orderId) => {
    setLoading(true);
    try {
      const response = await fetch(`${ORDER_URL}/restore`, {
        method: 'POST',
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

      // if (!response.ok) {
      //   throwError(response.status, { 404: 'Order not found.', 500: 'Failed to restore order', 401: 'Session expired. Please log in again.' });
      // }
      if (response.ok) {
        showToast("Order restored successfully.", "success");
      }
      return result.order;
    } catch (error) {
      console.error('restore order error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (order) => {
    try {
      console.log(order)

      await restoreOrder(order.orderId);

      setData(prevOrders => prevOrders.filter(item => item.orderId !== order.orderId));
      setTotalItems(totalItems => totalItems - 1);
    } catch (error) {
      // alert(error.message);
      showToast(error.message, "error")
      // setMessage(error.message);
    }
  };
  const handleRestoreAll = async () => {
    setLoading(true);
    try {

      const orderIds = selected.map(row => row);
      console.log('Selected row', orderIds);

      const response = await fetch(`${ORDER_URL}/restoreAll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ orderIds }),
      });

      const result = await response.json();

      if (result.message === 'Invalid token') {
        showToast('Session Expired, redirecting to login page', 'error');
        setTimeout(() => {
          navigate('/');
        }, 3000);
        return;
      }

      const restoredIds = orderIds;
      setData(prevData => prevData.filter(item => !restoredIds.includes(item.orderId)));
      setTotalItems(prevTotal => prevTotal - restoredIds.length);
      showToast("Selected DIDs restored successfully.", "success");
    } catch (error) {
      console.error('Error restoring orders:', error);
      showToast("Error restoring orders", "error");
    } finally {
      setLoading(false);
    }
  };


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


        </div>
      ),
    },
    { header: 'DID', accessorKey: 'inventoryId.did', cell: ({ getValue }) => <span className="font-semibold">{getValue()}</span>, },

    { header: 'Region', accessorKey: 'inventoryId.region', cell: ({ getValue }) => <span className={` ${getValue() === 'Delhi' ? 'bg-red-200 text-red-800' : ''} ${getValue() === 'Kolkata' ? 'bg-yellow-200 text-yellow-800' : ''} ${getValue() === 'Cuttack' ? 'bg-blue-200 text-blue-800' : ''}  ${getValue() === 'Bhubaneswar' ? 'bg-orange-200 text-orange-800' : ''} ${getValue() === 'Bangalore' ? 'bg-green-200 text-green-800' : ''} ${getValue() === 'Chennai' ? 'bg-purple-200 text-purple-800' : ''} font-normal text-[13px] px-1 py-0.5 rounded`}>{getValue()}</span>, },
    { header: 'Provider', accessorKey: 'inventoryId.provider' },

    { header: 'Route', accessorKey: 'route' },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) =>
      (
        <div className='flex items-center gap-2'>
          {row.original.inventoryId ? (
            <button disabled={isAnySelected} className={`${isAnySelected ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}flex items-center justify-center rounded bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600 hover:text-white  relative tooltip`} onClick={() => handleRestore(row.original)}>
              <LuArchiveRestore />
              <span className="tooltip-text">Restore</span>
            </button>

          ) : (
            <button className='flex items-center justify-center rounded bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 hover:text-white'>
              something went wrong
            </button>
          )}
        </div>
      ),
    },
  ];



  const exportConfig = {

    excludedColumns: ['select', 'actions'],
    fileName: 'MyData.csv',
  };


  const handleSelectionChange = (selectedRows) => {
    setSelected(selectedRows);
    setIsAnySelected(selectedRows.length > 0);
  };

  const headerActions = (
    <button
      className={`bg-green-500 text-white text-[13px] px-4 py-2 rounded hover:bg-green-600${selected.length === 0 ? ' hidden cursor-not-allowed' : ''} `}
      disabled={selected.length === 0}
      onClick={handleRestoreAll}
    >
      Restore All
    </button>
  );

  if (loading) {
    return <Spinner />;
  }

  if (data && data.length === 0) {
    return (
      <>
        <Breadcrumb pageName="Released " />
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
      <Breadcrumb pageName="Released" />
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
            <DynamicTable
              columns={columns}
              data={data}
              totalItems={totalItems}
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
              exportConfig={exportConfig}
              onSelectionChange={handleSelectionChange}
              headerActions={headerActions}
              searchBar={searchBar}
              pagination={pagination}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Archive