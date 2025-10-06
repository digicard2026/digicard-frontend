import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DynamicTable from '../../components/DynamicTable';
import { useCart } from '../../components/Header/CartContext';
import { LuChevronRight, LuChevronDown,LuPackagePlus, LuPackageMinus } from "react-icons/lu";


function Inventory2() {
    const { addToCart, addToCartV2 } = useCart();
    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/inventory?page=${page}&limit=${pageSize}`, GET_METHOD);

                if (!response.ok) throw new Error('Failed to fetch data');

                const result = await response.json();
                console.log(result.data.inventory)
                setData(result.data.inventory);
                setTotalItems(result.data.totalRecords);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [page, pageSize]);
    const handleAddToCart = async (item) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/inventory/block`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ inventoryId: item.DID }),
            });

            if (!response.ok) throw new Error('Failed to block item');

            addToCart(item);
            setData(prevData => prevData.map(d => d.DID === item.DID ? { ...d, blocked: true } : d));
        } catch (error) {
            console.error('Error blocking item:', error);
        }
    };

    const handleRemoveFromCart = async (item) => {
        try {
            const response = await fetch(`http://localhost:3000/api/inventory/checaavailability`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ inventoryId: item.DID }),
            });

            if (!response.ok) throw new Error('Failed to check availability');

            removeFromCart(item);
            setData(prevData => prevData.map(d => d.DID === item.DID ? { ...d, blocked: false } : d));
        } catch (error) {
            console.error('Error checking availability:', error);
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
                    <button className='p-0.5 bg-gray rounded' onClick={() => row.toggleExpanded()} >

                        <span style={{ cursor: 'pointer' }}>
                            {row.getIsExpanded() ? <LuChevronDown /> : <LuChevronRight />}
                        </span>
                    </button>
                </div>
              
            ),
        },
        { header: 'DID', accessorKey: 'DID' },
        { header: 'Provider Name', accessorKey: 'provider' },
        { header: 'Region', accessorKey: 'region' },
        { header: 'Status', accessorKey: 'status' },
        // { header: 'Price', accessorKey: 'price' },
        { header: 'Server IP', accessorKey: 'server_ip' },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className='flex items-center gap-2'>
                    {row.original.blocked ? (
                        <button className='flex items-center justify-center rounded bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 hover:text-white' onClick={() => handleRemoveFromCart(row.original)}>
                            <LuPackageMinus size={15} />
                        </button>
                    ) : (
                        <button className='flex items-center justify-center rounded bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600 hover:text-white' onClick={() => handleAddToCart(row.original)}>
                            <LuPackagePlus size={15} />
                        </button>
                    )}
                </div>
            ),
        },
    ];

    // Dynamic Row Actions
    // const rowActions = [
    //     {
    //         label: 'Add to Cart',
    //         onClick: (rowData) => {
    //             addToCart(rowData);
    //         },
    //     },
    // ];

    // Handle search input from the table component
    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);  // Update search term and trigger data fetching
    };

    // Handle the dynamic button click (could be used for adding a new item, etc.)

    const handleAddSelectedToCart = (selectedRows) => {
        addToCartV2(selectedRows);
    };

    const exportConfig = {
        excludedColumns: ['select','actions' ], // Columns to exclude during export
        fileName: 'user_data.pdf',
      };
   
   

    return (
        <>
            <Breadcrumb pageName="Inventory" />
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
                onTopButtonClick={handleAddSelectedToCart}
                exportConfig={exportConfig}

            />
        </>
    );
}

export default Inventory2;


