import React, { useState, useEffect } from 'react';
import DynamicTable from '../../components/DynamicTable';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import {API_URL, GET_METHOD } from '../../utility/constants';
import { RiContactsLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
function Calls() {

      const [data, setData] = useState([]);
      const [totalItems, setTotalItems] = useState(0);
      const [page, setPage] = useState(0);
      const [pageSize, setPageSize] = useState(10);
      const navigate = useNavigate();
    const fetchData = async () => {
        try {
            const response = await fetch(
                `${API_URL}/api/v1/campaign?page=${page + 1}&limit=${pageSize}`,
                GET_METHOD
            );
            const result = await response.json();
            setData(result.data);
            setTotalItems(result.totalRecords);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, pageSize]);

    const handleNavigateToLeads = (campaignId) => {
      navigate(`/leads/${campaignId}`);
    };

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
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'description', header: 'Description' },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ getValue }) => {

            const date = new Date(getValue());
            const formattedDate = date.toLocaleDateString('en-GB') + ' ' + date.toLocaleTimeString('en-GB', {
                hour12: true,
            });
            return formattedDate;

        },
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => {
        console.log("row",row);
          const campaignId = row.original._id;
          return (
            <div className='flex items-center gap-2'>
              <button
                onClick={() => handleNavigateToLeads(campaignId)}
                className="flex items-center justify-center rounded-md bg-slate-300 px-1 py-0.5 text-xs font-medium text-slate-700 hover:bg-slate-600 hover:text-slate-700 relative tooltip"
              >
                <RiContactsLine  size={17} />
                <span className='tooltip-text' >Leads</span>
              </button>
            </div>
          );
      },
  },
];


  return (
    <>
            <Breadcrumb pageName="Calls" />
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
  );
}

export default Calls