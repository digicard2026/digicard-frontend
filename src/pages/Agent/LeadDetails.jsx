
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../utility/constants';

function LeadDetails({setPhoneNumber}) {
  const { _id } = useParams();
  const [leadDetails, setLeadDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [callDisposition, setCallDisposition] = useState('');
  const [callReview, setCallReview] = useState('');

  useEffect(() => {
    const fetchLeadDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/vb-list-leads/details`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ _id: _id }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          setLeadDetails(data.data[0]);
          // setInputValue(data.data[0].phone_number);
        } else {
          setError('Failed to fetch lead details.');
        }
      } catch (err) {
        console.error('Error fetching lead details:', err);
        setError('An error occurred while fetching lead details.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeadDetails();
  }, [_id]);

  useEffect(() => {
    if (leadDetails) {
      setPhoneNumber(leadDetails.phone_number);
      console.log(leadDetails.phone_number);
    }
  }, [leadDetails]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="card mb-5 rounded-md bg-white dark:bg-zinc-800">        
        <div className="p-5">
          <div className="mx-auto md:max-w-lg ">
            {/* <h2 className="mb-4 mt-2.5 text-black text-xl font-medium">Profile Details</h2> */}
            <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-2">
              <div className="mb-4">
                <label className="inline-block mb-2 text-black font-normal">First Name:</label>
                <div className="border-slate-200 dark:border-zinc-500 bg-slate-100 dark:bg-zinc-600 text-slate-700 dark:text-zinc-200 rounded-md py-2 px-3">
                  {leadDetails.firstName || 'N/A'}
                </div>
              </div>
              <div className="mb-4">
                <label className="inline-block mb-2 text-black font-normal">Last Name:</label>
                <div className="border-slate-200 dark:border-zinc-500 bg-slate-100 dark:bg-zinc-600 text-slate-700 dark:text-zinc-200 rounded-md py-2 px-3">
                  {leadDetails.lastName || 'N/A'}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="inline-block mb-2 text-black font-normal">Email Address:</label>
              <div className="border-slate-200 dark:border-zinc-500 bg-slate-100 dark:bg-zinc-600 text-slate-700 dark:text-zinc-200 rounded-md py-2 px-3">
                {leadDetails.email || 'N/A'}
              </div>
            </div>
            <div className="mb-4">
              <label className="inline-block mb-2 text-black font-normal">Phone Number:</label>
              <div className="border-slate-200 dark:border-zinc-500 bg-slate-100 dark:bg-zinc-600 text-slate-700 dark:text-zinc-200 rounded-md py-2 px-3">
                {leadDetails.phone_number || 'N/A'}
              </div>
            </div>
            <div className="mb-4">
              <label className="inline-block mb-2 text-black font-normal">Primary Key:</label>
              <div className="border-slate-200 dark:border-zinc-500 bg-slate-100 dark:bg-zinc-600 text-slate-700 dark:text-zinc-200 rounded-md py-2 px-3">
                {leadDetails.primary_key || 'N/A'}
              </div>
            </div>
            <div className="mb-4">
              <label className="inline-block mb-2 text-black font-normal">List ID:</label>
              <div className="border-slate-200 dark:border-zinc-500 bg-slate-100 dark:bg-zinc-600 text-slate-700 dark:text-zinc-200 rounded-md py-2 px-3">
                {leadDetails.listId || 'N/A'}
              </div>
            </div>
            <div className="mb-4">
              <label className="inline-block mb-2 text-black font-normal">Call Disposition:</label>
              <select
                className="border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-600 text-slate-700 dark:text-zinc-200 rounded-md py-2 px-3 w-full focus:outline-none"
                onChange={(e) => setCallDisposition(e.target.value)}
              >
                <option value="">Select Disposition</option>
                <option value="Interested">Interested</option>
                <option value="Not Interested">Not Interested</option>
                <option value="Callback Requested">Callback Requested</option>
                <option value="Wrong Number">Wrong Number</option>
                <option value="No Answer">No Answer</option>
                <option value="Voicemail">Voicemail</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="inline-block mb-2 text-black font-normal">Call Review:</label>
              <textarea
                className="border-slate-400 dark:border-zinc-500 bg-white dark:bg-zinc-600 text-slate-700 dark:text-zinc-200 rounded-md py-2 px-3 w-full "
                rows="4"
                placeholder="Write your review here..."
                onChange={(e) => setCallReview(e.target.value)}
              ></textarea>
            </div>
            {setCallDisposition && setCallReview && (
              <button
              className="mt-4 ml-[430px] px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => console.log({ callDisposition, callReview })}
            >
              Submit
            </button>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
}

export default LeadDetails;

