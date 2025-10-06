import React, { useMemo, useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DynamicTable from '../components/DynamicTable';
import Toaster from '../components/Toaster/Toaster';
import { useNavigate } from 'react-router-dom';
import {GET_METHOD, TRANSACTION_URL} from '../utility/constants';
import { WALLET_URL } from '../utility/constants';
//const apiUrl = import.meta.env.VITE_API_URL;
// const transaction_URL = `${apiUrl}/api/v1/transaction`;
// const WALLET_URL = `${apiUrl}/api/v1/wallet`;


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

const Transaction = () => {
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [searchBar, setSearchBar] = useState(true);
    const [pagination, setPagination] = useState(true);
    const [showInput, setShowInput] = useState(false);
    const [rechargeAmount, setRechargeAmount] = useState('');
    const [toast, setToast] = useState(null);

    const navigate = useNavigate();

    const showToast=(message,type)=>{
        setToast({ message, type });
      
    }


    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
           
            try {
                console.log("transaction api call");
                const response = await fetch(`${TRANSACTION_URL}/all?page=${page}&limit=${pageSize}&year=${selectedYear}&month=${selectedMonth}`, GET_METHOD);

                if (!response.ok) throw new Error('Failed to fetch data');

                const result = await response.json();

                console.log(result);
                setData(result.data.transaction);
                setTotalItems(result.data.totalRecords);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (selectedYear && selectedMonth) {
            fetchData();
        }
    }, [page, pageSize, selectedYear, selectedMonth, toast]);

    const fetchBalance = async () => {
        try {
            const response = await fetch(`${WALLET_URL}/`, GET_METHOD);
            const data = await response.json();
            if (response.ok) {
               
                setBalance(data.wallet.balance);
            } else {
                // setErrorMessage(errorData.message || 'Failed to fetch balance');
                showToast(`${data.message }`|| 'Failed to fetch balance', 'error');

                console.log('Token expired',data.message);

                if (data.message === 'Invalid token'){
                    showToast('Session Expired redirecting to login page', 'error');
                    setTimeout(() => {
                        navigate('/');
                    },3000);
                }
            }
        } catch (error) {
            console.error('Error fetching balance:', error);
            // setErrorMessage('An error occurred while fetching the balance');
            showToast(`${error.message}` || 'An error occurred while fetching the balance', 'error');
        }
    };


    useEffect(() => {
        fetchBalance();
    }, []);

    const handleRechargeSubmit = async () => {

        if (rechargeAmount < 100) {
            // setErrorMessage('Recharge amount must be at least ₹100');
            showToast('Recharge amount must be at least ₹100', 'error');
            return;
        }

        try {
            // setErrorMessage('');
            // setSuccessMessage('Processing recharge...');
             showToast('Processing recharge...', 'info');

            const response = await fetch(`${WALLET_URL}/recharge`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: parseFloat(rechargeAmount) }),
                credentials: 'include',
            });

            const result = await response.json();

            if (result.message === 'Invalid token'){
                showToast('Session Expired redirecting to login page', 'error');
                setTimeout(() => {
                    navigate('/');
                },3000);
            }

            if (response.ok) {
                setBalance(result.wallet.balance);
                // setSuccessMessage(`Recharge for ₹${rechargeAmount} successful! New balance: ₹${result.wallet.balance}`);
                showToast(`Recharge for ₹${rechargeAmount} successful!, New balance: ₹${result.wallet.balance}`, 'success');
            }else if(result.message === 'Invalid token'){
                showToast('Session Expired redirecting to login page', 'error');
            } 
            else {
                // setErrorMessage(result.message || 'Failed to recharge wallet');
                // showToast(`${result.message }`|| 'Failed to recharge wallet', 'error');
                showToast(`${result.message }`|| 'Failed to recharge wallet', 'error');
            }
        } catch (error) {
            console.error('Error recharging wallet:', error);
            // setErrorMessage('An error occurred while recharging the wallet');
            showToast(`${error.message}` || 'An error occurred while recharging the wallet', 'error');
        }
        setRechargeAmount('');
        setShowInput(false);
    };


    const years = ['2024', '2023', '2022', '2021', '2020'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const columns = useMemo(() => [
        {
            id: 'select',
            header: ({ table }) => (
                <input type="checkbox" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />
            ),
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onChange={row.getToggleSelectedHandler()}
                />
            ),
        },
        { header: 'Transaction ID', accessorKey: '_id' },
        { header: 'Description', accessorKey: 'description' },
        {
            header: 'Date', accessorKey: 'transactionAt', cell: ({ getValue }) => {
                const date = new Date(getValue());
                const formattedDate = date.toLocaleDateString('en-GB') + ' ' + date.toLocaleTimeString('en-GB', {
                    hour12: true, // Ensures 12-hour format
                });
                return formattedDate;
            },
        },
        { header: 'Total Amount', accessorKey: 'amount' },
        { header: 'Fees', accessorKey: 'fees' },
    ], []);
    const exportConfig = {

        excludedColumns: ['select', 'actions'],
        fileName: 'MyData.csv',
    };


    // useEffect(() => {

    //     const timer = setTimeout(() => {
    //       setErrorMessage("");
    //       setSuccessMessage('');
    //     }, 2000);

    //     return () => clearTimeout(timer);
    //   }, [errorMessage, successMessage]);

    return (
        <>
            <Breadcrumb pageName="Transaction" />
            {toast && (
                <Toaster
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            <div className="mb-4">
                <div className="mb-4 p-4 border border-slate-200 rounded-lg bg-slate-50">
                    {/* Available Funds Section */}
                    <div className="bg-sky-100 px-4 py-2 flex justify-between items-center rounded-lg">
                        <div>
                            <div className="text-lg flex items-center justify-center text-slate-600 font-semibold">Balance
                                <div className="text-sm pl-5 font-bold text-cyan-600">
                                    {balance !== null ? `₹${balance}` : 'Loading...'}
                                </div>
                            </div>
                        </div>
                        {/* Recharge Input */}
                        {!showInput ? (
                            <button
                                onClick={() => setShowInput(true)} // Show the input box when clicked
                                className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-300"
                            >
                                Recharge
                            </button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    value={rechargeAmount}
                                    onChange={(e) => setRechargeAmount(e.target.value)}
                                    placeholder="Enter amount (₹100 - ₹10000)"
                                    className="px-4 py-2 rounded-lg border"
                                />
                                <button
                                    onClick={handleRechargeSubmit}
                                    className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg"
                                >
                                    Enter
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-4 border border-slate-200 p-4 rounded-lg  bg-slate-50 ">
                {/* Year Filter */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-slate-500">Year</label>
                    <div className="flex gap-2 flex-wrap border-spacing-0">
                        {years.map((year) => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`px-4 py-2 text-sm rounded ${selectedYear === year ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-100'}`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Month Filter */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-slate-500">Month</label>
                    <div className="flex gap-2 flex-wrap">
                        {months.map((month) => (
                            <button
                                key={month}
                                onClick={() => setSelectedMonth(month)}
                                className={`px-4 py-2 text-sm rounded ${selectedMonth === month ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-100'}`}
                            >
                                {month}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="mb-5 rounded-md bg-white dark:bg-zinc-800">
                <div className="p-5">

                    <div className="grid grid-cols-12 lg:grid-cols-12 gap-3">

            <ErrorBoundary>
                <DynamicTable
                    columns={columns}
                    data={data}
                    totalItems={totalItems}
                    page={page}
                    pageSize={pageSize}
                    onPageChange={setPage}
                    onPageSizeChange={setPageSize}
                    exportConfig={exportConfig}
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

export default Transaction;
