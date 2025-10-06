import React from 'react'
import DynamicTable from '../../components/DynamicTable'
import { useState } from 'react'
import { useEffect } from 'react';
import { GET_METHOD } from '../../utility/constants';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import FileUpload from '../../components/FileUpload';
import { TbBrandCampaignmonitor } from 'react-icons/tb';
import { API_URL } from '../../utility/constants';
function VbList() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const [searchBar, setSearchBar] = useState(true);
  const [pagination, setPagination] = useState(true);

       const fetchData = async () => {
        console.log('fetching data');
        try {
          const response = await fetch(`${API_URL}/api/v1/vb-list?page=${page+1}&limit=${pageSize}`,GET_METHOD);
          const result = await response.json();
          console.log('vblist',result);
          setData(result.data);
          setTotalItems(result.totalRecords);
        } catch (error) {
          console.error('Error fetching data:', error);
        };
      };

      useEffect(() => {
        fetchData();
      }, [page, pageSize,totalItems]);
      const handleAddVblist = () => {
        navigate('/addvblist');
      }
      const handleAssociateCampaign = (listId) => {
        navigate(`/associate-campaign/${listId}`);
      };
    
       const columns =[
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
        { accessorKey: 'createdAt', header: 'Created At',cell: ({ getValue }) => {
          const date = new Date(getValue());
          const formattedDate = date.toLocaleDateString('en-GB') + ' ' + date.toLocaleTimeString('en-GB', {
              hour12: true, 
          });
          return formattedDate;
      } },
      {
        accessorKey: 'actions',
        header: 'Actions',
        cell: (data) => (
          console.log('data',data),
            <div className="flex items-center gap-2">
                <FileUpload listId={data.row.original._id} />
                <button
            className='tooltip'
            onClick={() => handleAssociateCampaign(data.row.original._id)}
          >
          <TbBrandCampaignmonitor size={17} strokeWidth={2} />
          <span className='tooltip-text' >Associate Campaign</span>
          </button>
            </div>
        ),
    },
   
       ]

  return (
    <>
    <Breadcrumb pageName="Voice blast List" />
    <div className="mb-5 rounded-md bg-white dark:bg-zinc-800">
      <div className="p-5">
        <div className="grid grid-cols-12 lg:grid-cols-12 gap-3">
        {/* <div className="self-center col-span-12 w-full lg:col-span-6 lg:place-self-start">
        <div id="basic_tables_filter " className="dataTables_filter flex flex-row">
       
        </div> */}
        {/* </div> */}
          <DynamicTable
            pagination={pagination}
            searchBar={searchBar}
            data={data}
            columns={columns}
            page={page}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            handleAddVblist={handleAddVblist}
          />
        </div>
      </div>
    </div>
    </>
  )
};

export default VbList;