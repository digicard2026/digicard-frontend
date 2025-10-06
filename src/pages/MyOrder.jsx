import React, { useMemo, useState, useEffect } from 'react';
import DynamicTable from '../components/DynamicTable';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useCart } from '../components/Header/CartContext';
import { useParams } from 'react-router-dom';
import { GET_METHOD, GET_METHOD_NO_AUTH } from '../utility/constants';
//import jsPDF from 'jspdf';

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

function MyOrder() {
    const { cart } = useCart();
    const { order_id } = useParams();
    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
   // const { order_id } = useParams();
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    };

   
    const TAX_RATE = 18; 

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
              
    //             const response = await fetch(`http://localhost:3000/api/v1/order/orderByUserId/?page=${page}&limit=${pageSize}`, {
    //                 method: 'GET',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 credentials: 'include',
    //             });
           

    //             if (!response.ok) throw new Error('Failed to fetch data');

    //             const result = await response.json();
    //             console.log(result)
    //             const ordersWithTotals = result.data.response.Orders.map(order => {
    //                 let totalAmount = 0;
    //                 let totalTax=0;
    //                 order.forEach(item => {
    //                     const price = parseFloat(item.Price);
    //                     if ((price)) {
    //                         totalAmount+= price;
    //                     }
    //                     const tax = parseFloat(item.tax);
    //                     console.log(tax,price)
    //                       //totalTax=tax;
    //                       totalTax+=(tax*price)/100;
                        
                        
    //                 });
                    

    //                 // let  totalTax=0;
    //                 // order.itemdetails.forEach(item => {
    //                 //     const tax = parseFloat(item.tax);
    //                 //       totalTax=tax;
                        
    //                 // });
                    
    //               let userName=result.data.response.userName;
                  
    //               console.log(totalTax)
    //                 return { ...order, userName,totalAmount: totalAmount.toFixed(2), totalTax: totalTax, formattedDate: formatDate(order.createdAt) };
    //             });
    //             setData(ordersWithTotals);
    //             setTotalItems(result.data.totalRecords);


    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, [page, pageSize]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/order/orderByUserId/?page=${page}&limit=${pageSize}`,GET_METHOD);
    
                if (!response.ok) throw new Error('Failed to fetch data');
    
                const result = await response.json();
                console.log(result);
   
                const ordersWithTotals = result.data.response.Orders.map(order => {
                    let totalAmount = 0;
                    let totalTax = 0;
    
                    const price = parseFloat(order.price);
                    if (!isNaN(price)) {
                        totalAmount = price;
                    }
    
                    const taxPercentage = parseFloat(order.Tax);
                    if (!isNaN(taxPercentage)) {
                        totalTax = (taxPercentage * price) / 100;
                    }
    
                    const userName = result.data.response.userName;
                    return {
                        ...order,
                        userName,
                        totalAmount: totalAmount.toFixed(2),
                        totalTax: totalTax.toFixed(2),
                        createdAt: format(order.createdAt)
                    };
                });
    
                setData(ordersWithTotals);
                setTotalItems(result.data.totalRecords);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [page, pageSize]);
    
   
    const format = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    


    const handleDownloadInvoice = async (orderId) => {
        console.log(order_id)
        try {
          const response = await fetch(`http://localhost:3000/api/v1/order/${orderId}/invoice`, GET_METHOD_NO_AUTH);
      
          if (!response.ok) {
            throw new Error('Failed to download invoice');
          }
      
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `invoice_${orderId}.pdf`);
          document.body.appendChild(link);
          link.click();
          link.remove();
        } catch (error) {
          console.error('Error downloading invoice:', error);
        }
      };
      
  


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
        { header: 'Order ID', accessorKey: '_id' },
        // { header: 'User ID', accessorKey: 'user_id' },
        { header: 'User Name', accessorKey: 'userName' },
        { header: 'Order Date', accessorKey: 'createdAt' },
       // { header: 'Payment ID', accessorKey: 'payment_id' },
        {header :'Total Amount',accessorKey:'totalAmount'},
        { header: 'Tax', accessorKey: 'totalTax' },

        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <button className='flex items-center justify-center rounded bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600 hover:text-white dark:bg-graydark dark:text-white dark:hover:bg-blue-500 dark:hover:text-white active:text-white active:bg-blue-600 active:border-blue-600 active:ring active:ring-blue-100' onClick={() => handleDownloadInvoice(row.original._id)} >
                    Download Invoice
                </button>
            ),
        },
    ], []);
   
   

    return (
        <>
            <Breadcrumb pageName="My Order" />
            <ErrorBoundary>
                <DynamicTable
                    columns={columns}
                    data={data}
                    totalItems={totalItems}
                    page={page}
                    pageSize={pageSize}
                    onPageChange={setPage}
                    onPageSizeChange={setPageSize}
                   // rowActions={rowActions}  // Dynamic row actions
                    //topButtonLabel="Download Invoice"
                   // onTopButtonClick={handleAddSelectedToCart}
                />
            </ErrorBoundary>
        </>
    );
}

export default MyOrder;
