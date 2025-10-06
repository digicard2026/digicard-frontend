import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import NewTable from '../../components/NewTable';
import { useCart } from '../../components/Header/CartContext';
import { LuChevronRight, LuChevronDown, LuPackagePlus, LuPackageMinus, LuCheck } from "react-icons/lu";
import Spinner from '../../components/Spinner';
import Toaster from '../../components/Toaster/Toaster';
import { useNavigate } from 'react-router-dom';
import { POST_METHOD } from '../../utility/constants';
import { throwError } from '../../utility/errorHandler';
import DynamicTable from '../../components/DynamicTable';

// Access the base API URL from the environment variable
const apiUrl = import.meta.env.VITE_API_URL;

// Define the full API URLs by concatenating apiUrl with the specific endpoint paths
const USER_URL = `${apiUrl}/api/v1/user`;
const INVENTORY_URL = `${apiUrl}/api/v1/inventory`;

const ORDER_URL = `${apiUrl}/api/v1/order`;

function Purchase() {
  const { addToCart, addToCartV2 } = useCart();
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [startDigits, setStartDigits] = useState('');
  const [endDigits, setEndDigits] = useState('');
  const [containsValue, setContainsValue] = useState('');
  const [provider, setProvider] = useState('');
  const [providers, setProviders] = useState(['Airtel', 'Vodafone', 'BSNl', 'JIO', 'TATA']);
  const [region, setRegion] = useState('');
  const [regions, setRegions] = useState(['Bangalore', 'Bhubaneswar', 'Cuttack', 'Chennai', 'Delhi', 'Kolkata']);
  const [premium, setPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const[searchBar, setSearchBar] = useState(false);
  const[pagination, setPagination] = useState(false);

  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handlePurchase = async (item) => {
    console.log('Purchasing item:', item);
    setLoading(true);
    try {
      console.log('Purchasing item:', item);
      const response = await fetch(`${ORDER_URL}/purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId: item._id, amount: item.price, }),

      });
      const products = await response.json();
      console.log(products)

      if (products.message === 'Invalid token') {
        showToast('Session Expired redirecting to login page', 'error');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
      if (products.message === 'Insufficient balance.') {
        showToast('Insufficient balance. Please add funds to your wallet. ', 'error');
      }
      // if (!response.ok) {
      //   showToast('Purchase failed. Insufficient balance.', 'error' );
      //   throwError(response.status, {
      //     400: 'Invalid input provided. Please check your data.',
      //     401: 'Session expired. Please log in again.',
      //     500: 'Something went wrong on our end. Please try again later.',
      //   });
      // }   

      if (response.ok) {
        setData(prev => prev.filter(prevItem => prevItem._id !== item._id));
        setTotalItems(totalItems => totalItems - 1);
        showToast(`Product purchased successfully! Purchased DID: ${item.did}`, 'success');

      }
    } catch (error) {
      showToast('Check your wallet balance or try again later.', 'error');

    } finally {
      setLoading(false);
    }
  };

  // Table Columns Configuration
  const columns = [
    // {
    //     id: 'select',
    //     header: ({ table }) => (
    //         <input type="checkbox" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />
    //     ),
    //     header:' Expand',
    //     cell: ({ row }) => (
    //         <div className='flex items-center gap-3 ' >
    //             <input
    //                 type="checkbox"
    //                 checked={row.getIsSelected()}
    //                 disabled={!row.getCanSelect()}
    //                 onChange={row.getToggleSelectedHandler()}
    //             />
    //             <button className='p-0.5 bg-gray rounded' onClick={() => row.toggleExpanded()} >

    //                 <span style={{ cursor: 'pointer' }}>
    //                     {row.getIsExpanded() ? <LuChevronDown /> : <LuChevronRight />}
    //                 </span>
    //             </button>
    //         </div>

    //     ),
    // },
    { header: 'DID', accessorKey: 'did', cell: ({ getValue }) => <span className="font-semibold">{getValue()}</span>, },
    { header: 'Provider Name', accessorKey: 'provider' },
    { header: 'Region', accessorKey: 'region', cell: ({ getValue }) => <span className={` ${getValue() === 'Delhi' ? 'bg-red-200 text-red-800' : ''} ${getValue() === 'Kolkata' ? 'bg-yellow-200 text-yellow-800' : ''} ${getValue() === 'Cuttack' ? 'bg-blue-200 text-blue-800' : ''}  ${getValue() === 'Bhubaneswar' ? 'bg-orange-200 text-orange-800' : ''} ${getValue() === 'Bangalore' ? 'bg-green-200 text-green-800' : ''} ${getValue() === 'Chennai' ? 'bg-purple-200 text-purple-800' : ''} font-normal text-[13px] px-1 py-0.5 rounded`}>{getValue()}</span>, },
    // { header: 'Status', accessorKey: 'status' },
    { header: 'Price', accessorKey: 'price' },
    // { header: 'Server IP', accessorKey: 'server_ip' },
    // {header:'isBlocked', accessorKey: 'blockedBy'},
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <button className=' tooltip flex items-center justify-center rounded bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600 hover:text-white' onClick={() => handlePurchase(row.original)}>
          <LuPackagePlus size={15} />
          <span className="tooltip-text">Purchase</span>
        </button>
      ),
    },
  ];


  // Handle search input from the table component
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);  // Update search term and trigger data fetching
  };

  const handleAddSelectedToCart = (selectedRows) => {
    addToCartV2(selectedRows);
  };

  const exportConfig = {
    excludedColumns: ['select', 'actions'], // Columns to exclude during export
    fileName: 'user_data.pdf',
  };


  const handleFilter = async (filters) => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      console.log(query)
      const response = await fetch(`${INVENTORY_URL}/?${query}`, POST_METHOD);
      const data = await response.json();
      if (data.message === 'Invalid token') {
        showToast('Session Expired redirecting to login page', 'error');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }

      setData(data);
    } catch (error) {
      showToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }

  };


  const fetchInventory = async () => {
    try {
      let apiUrl = `${INVENTORY_URL}/?`;
      const response = await fetch(apiUrl, POST_METHOD);
      const data = await response.json();
      if (data.message === 'Invalid token') {
        showToast('Session Expired redirecting to login page', 'error');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
      setData(data);
    } catch (err) {
      showToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleClearFilters = () => {
    setRegion('');
    setProvider('');
    setContainsValue('');
    setEndDigits('');
    setStartDigits('');
    setPremium('');
    handleFilter();

  };

  const handleRefresh = () => {
    handleFilter();
  }

  useEffect(() => {
    handleFilter();
  }, [totalItems]);

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


  const handleSubmit = (e) => {
    e.preventDefault();
    handleFilter({ startDigits, endDigits, containsValue, region, provider, premium });

  };


  if (loading) {
    return <Spinner />;
  }

  if (!data) {
    return (

      <>
        <Breadcrumb pageName="DID Purchase" />
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
      <Breadcrumb pageName="DID Purchase" />
      {toast && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {/* <NewTable
        columns={columns}
        data={data}
        totalItems={totalItems}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        // rowActions={rowActions}  // Dynamic row actions
        topButtonLabel="Add to Cart"
        onTopButtonClick={handleAddSelectedToCart}
        exportConfig={exportConfig}
        startDigits={startDigits}
        endDigits={endDigits}
        setStartDigits={setStartDigits}
        setEndDigits={setEndDigits}
        containsValue={containsValue}
        setContainsValue={setContainsValue}
        provider={provider}
        setProvider={setProvider}
        region={region}
        setRegion={setRegion}
        providers={providers}
        regions={regions}
        onFilter={handleFilter}
        fetchInventory={fetchInventory}
        handleClearFilters={handleClearFilters}
        handleRefresh={handleRefresh}
        premium={premium}
        setPremium={setPremium}
      /> */}
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
                </form>
              </div>
            </div>
            <DynamicTable
data={data}
columns={columns}
searchBar={searchBar}
pagination={pagination}
            />
          </div>
        </div>
      </div>


    </>
  );
}

export default Purchase;


