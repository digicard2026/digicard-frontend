import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Toaster from '../../components/Toaster/Toaster';
import { API_URL, GET_METHOD } from '../../utility/constants';

function AssociateCampaign() {
    const { listId } = useParams();
    const navigate = useNavigate();
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaigns, setSelectedCampaigns] = useState([]);
    const [toast, setToast] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
  
    const showToast = (message, type) => {
      setToast({ message, type });
    };
  
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/campaign?page=${page}&limit=10`,
          GET_METHOD
        );
        const result = await response.json();
        if (page === 1) {
            setCampaigns(result.data);
          } else {
            setCampaigns((prevCampaigns) => [...prevCampaigns, ...result.data]);
          }
          if(result){
            if (result.data.length < 10) {
                setHasMore(false);
              }
          }
         
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };
  
    const handleSave = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/campaign/add-lists`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ campaignId: selectedCampaigns, listIds: [listId] }),
          credentials: 'include',
        });
        const result = await response.json();
        if (response.ok) {
          showToast('List associated with campaigns successfully.', 'success');
          setTimeout(() => navigate('/vblist'), 3000);
        } else {
          showToast(result.message || 'Failed to associate list.', 'error');
        }
      } catch (error) {
        console.error('Error associating list:', error);
        showToast('An error occurred. Please try again.', 'error');
      }
    };
  
    const handleSelectCampaign = (campaignId) => {
        setSelectedCampaigns((prev) =>
          prev.includes(campaignId) ? [] : [campaignId] // Allow only one selection
        );
      };
      
  
    const handleShowMore = () => {
      setPage((prevPage) => prevPage + 1);
    };
  
    useEffect(() => {
      fetchCampaigns();
    }, [page]);
  
    return (
        <>
        {toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <Breadcrumb pageName="Associate Campaign" />
        <div className="dark:bg-boxdark-2 dark:text-bodydark flex items-center justify-center">
          <div className="w-full max-w-lg px-6">
            <div className="rounded-md border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark">
              <div className="p-6 sm:p-8">
                <h2 className="text-lg font-bold mb-4">Select Campaigns</h2>
                <div className="h-60 overflow-y-auto text-slate-900 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                  {campaigns && campaigns.length > 0 ? (
                    <ul>
                      {campaigns.map((campaign) => (
                        <li key={campaign._id} className="mb-2">
                          <label>
                            <input
                              type="checkbox"
                              value={campaign._id}
                              onChange={() => handleSelectCampaign(campaign._id)}
                              checked={selectedCampaigns.includes(campaign._id)}
                              disabled={selectedCampaigns.length > 0 && !selectedCampaigns.includes(campaign._id)}
                            />
                            <span className="ml-2">{campaign.title}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-gray-500">No campaigns available.</p>
                  )}
                  {hasMore && (
                    <div className="text-center mt-3">
                      <button
                        onClick={handleShowMore}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        Show More
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => navigate('/vblist')}
                    className="text-red-500 bg-white hover:text-red-600 hover:bg-red-100 px-4 py-2 rounded mr-3"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
export default AssociateCampaign;