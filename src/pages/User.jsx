import React, { useMemo, useState } from 'react'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, } from '@tanstack/react-table';
import { useEffect } from 'react';
import { LuTrash2 } from "react-icons/lu";
import Toaster from '../components/Toaster/Toaster';
import Spinner from '../components/Spinner';
import { LuFileEdit } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { GoPasskeyFill } from "react-icons/go";
import DynamicTable from '../components/DynamicTable';
import { DELETE_METHOD, DELETE_METHOD_NO_AUTH, USER_URL } from '../utility/constants';
import { GET_METHOD } from '../utility/constants';
import { throwError } from '../utility/errorHandler';


// Access the base API URL from the environment variable
//const apiUrl = import.meta.env.VITE_API_URL;

// Define the full API URLs by concatenating apiUrl with the specific endpoint paths
//const USER_URL = `${apiUrl}/api/v1/user`;

function User() {
    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState([]);
    const[searchBar, setSearchBar] = useState(true);
    const[pagination, setPagination] = useState(true);
    const [isAnySelected, setIsAnySelected] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [toast, setToast] = useState(null);
    const showToast = (message, type) => {
        setToast({ message, type })
    }

    const navigate = useNavigate();

    useEffect(() => {
        fetchData(page);
    }, [pageSize]);
    // Fetch data from API
    const fetchData = async (page) => {
        try {
            const response = await fetch(`${USER_URL}/v2/?page=${page + 1}&limit=10`, GET_METHOD); // Adjust the page parameter if needed
            const result = await response.json();
            if (result.message === 'Invalid token'){
                showToast('Session Expired redirecting to login page', 'error');
                setTimeout(() => {
                navigate('/');
                },3000);
            }
            // if (!response.ok) {
            //     throwError(response.status,{404: 'User not found.',
            //     500: 'Something went wrong on our end. Please try again later.',
            //     401: 'Session expired. Please log in again.'});
            //     throw new Error('Failed to fetch data');
            // }
            if (response.ok) {
                setData(result.users); // Correctly accessing the Users property
                setTotalItems(result.total);
                console.log("pages", result.pages)
                console.log('users', result.users);
            }

            
        } catch (error) {
            showToast('Error while fetching data', 'error');
        }finally{
            setLoading(false);
        }
    }



    const columns = [
        {
            header: 'ID',
            accessorKey: '_id'
        },
        {
            header: 'FirstName',
            accessorKey: 'first_name',
            cell: ({ getValue }) => <span className="font-semibold">{getValue()}</span>,
        },
        {
            header: 'Email',
            accessorKey: 'email'
        },
        {
            header: 'Mobile No.',
            accessorKey: 'phone_number'
        },
        {
            header: 'Action',
            cell: ({ row }) => (
                <div className='flex items-center gap-2 ' >
                    {
                    row.original.primary_user_id && < button className='flex items-center justify-center rounded-md bg-slate-300 px-1 py-0.5 text-xs font-medium text-slate-700 hover:bg-slate-600 hover:text-slate-700 relative tooltip' onClick={() => handleEdit(row.original._id)}> <LuFileEdit  size={17}  />
                    <span className="tooltip-text">Edit User</span> 
                    </button>
                    }
                    
                    < button className='flex items-center justify-center rounded-md bg-slate-300 px-1 py-0.5 text-xs font-medium text-slate-700 hover:bg-slate-600 hover:text-slate-700 relative tooltip' onClick={() => handleApiCredential(row.original._id)} >
                    <GoPasskeyFill size={18}  />
                    <span className="tooltip-text">API Credential</span>
                    </button>
                    {row.original.primary_user_id &&
                    < button className='flex items-center justify-center rounded-md bg-slate-300 px-1 py-0.5 text-xs font-medium text-slate-700 hover:bg-slate-600 hover:text-slate-700 relative tooltip' onClick={() => handleDelete(row.original._id)}> <LuTrash2 size={17}  />
                    <span className="tooltip-text">Delete User</span>
                    </button> 
                    
                    }
                    
                </div>
            )
        }


    ];
  
    const handleButtonClick = () => {
        navigate('/userListForm/add');
    };


    const handleDelete = async (userId) => {
        console.log("User ID to delete:", userId);
        const isConfirmed = window.confirm("Are you sure you want to delete this user?");

        // If the user clicks "Cancel", abort the deletion
        if (!isConfirmed) {
            return;
        }
        try {
            const response = await fetch(`${USER_URL}/${userId}`, DELETE_METHOD_NO_AUTH);

            const data = await response.json();
            if (data.message === 'Invalid token'){
                showToast('Session Expired redirecting to login page', 'error');
                setTimeout(() => {
                navigate('/');
                },3000);
            }

            if (response.ok) {
                showToast('User deleted successfully', 'success');
            } else {
                console.error(`Failed to delete user with ID ${userId}.`);
                showToast(data.message, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast(data.message, 'error');
        }
    };


    const handleEdit = (userId) => {
        navigate(`/userListForm/edit/${userId}`);
    };

    const handleApiCredential = (userId) => {
        navigate(`/apiCredential`);
    };
 

    if(loading ) {
        return <Spinner />;
    };
    
    if(data && data.length === 0 ) {
        return (
            <>
                <Breadcrumb pageName="User List" />
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
            <Breadcrumb pageName="User List" />
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
                            handleUser={handleButtonClick}
                            searchBar={searchBar}
                            pagination={pagination}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default User
