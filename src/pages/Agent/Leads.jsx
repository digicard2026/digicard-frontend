import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DynamicTable from '../../components/DynamicTable';
import { API_URL, POST_METHOD } from '../../utility/constants';

function Leads() {
    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const navigate = useNavigate();
     
    const { campaignId } = useParams();

    // Debugging campaignId
    console.log("Campaign ID:", campaignId);
    const handleCall = (_id) => {
        navigate(`/leads/details/${_id}`);
    }

    const fetchData = async () => {
        try {
            console.log('fetching leads');
            console.log('campaignId', campaignId);
            const response = await fetch(
                `${API_URL}/api/v1/campaign/leads/${campaignId}?page=${page + 1}&limit=${pageSize}`,
                POST_METHOD
            );
            const result = await response.json();
            setData(result.data);
            console.log(result.data ,'result.data');
            setTotalItems(result.totalRecords);
        } catch (error) {
            console.error('Error fetching leads:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [campaignId, page, pageSize]);

    const columns = [
        {
            accessorKey: 'sno',
            header: 'S.No.',
            cell: (info) => {
                const rowIndex = info.row.index + 1;
                const pageIndex = info.table.getState().pagination.pageIndex;
                const pageSize = info.table.getState().pagination.pageSize;
                const globalIndex = pageIndex * pageSize + rowIndex;
                return globalIndex.toString().padStart(2, '0');
            },
        },
      
        { accessorKey: 'phone_number', header: 'Phone Number' },
        { accessorKey: 'userId', header: 'User_Id' },
        { accessorKey: 'primary_key', header: 'Primary Key' },
        {
            accessorKey: 'action', header: 'Action', cell: ({ row }) => {

                return (
                    <div className='flex items-center gap-2'>
                        <button
                            onClick={() => handleCall(row.original._id)}
                            className="flex items-center justify-center rounded-md bg-slate-300 px-1 py-0.5 text-xs font-medium text-slate-700 hover:bg-slate-600 hover:text-slate-700 relative tooltip"
                        >
                            Call
                            <span className='tooltip-text' >Call</span>
                        </button>
                    </div>
                );
            },
        }

    ];
  return (
    <>
    <Breadcrumb pageName="Leads" />
    <div className="mb-5 rounded-md bg-white dark:bg-zinc-800">
        <div className="p-5">
            <div className="grid grid-cols-12 lg:grid-cols-12 gap-3">
                <DynamicTable
                    pagination={true}
                    searchBar={true}
                    data={data}
                    columns={columns}
                    page={page}
                    pageSize={pageSize}
                    totalItems={totalItems}
                    onPageChange={setPage}
                    onPageSizeChange={setPageSize}
                />
            </div>
        </div>
    </div>
</>
  )
}

export default Leads