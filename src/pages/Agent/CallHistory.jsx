import React, { useState, useEffect } from 'react';

function CallHistory() {
    const [callHistory] = useState([
        {
          callerName: 'John Doe',
          timestamp: '2025-01-21 14:32',
          duration: '00:12:34',
          status: 'Completed',
        },
        {
          callerName: 'Jane Smith',
          timestamp: '2025-01-20 16:45',
          duration: '00:08:20',
          status: 'Missed',
        },
        {
          callerName: 'Mark Wilson',
          timestamp: '2025-01-19 10:15',
          duration: '00:15:42',
          status: 'Completed',
        },
      ]);  
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCallHistory = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/api/v1/call-history', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         if (data.success) {
//           setCallHistory(data.history);
//         } else {
//           setError('Failed to fetch call history.');
//         }
//       } catch (err) {
//         console.error('Error fetching call history:', err);
//         setError('An error occurred while fetching call history.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCallHistory();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }
return(
<div className="bg-white dark:bg-zinc-800 p-6">
{/* <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-5">Call History</h2> */}
<ul className="space-y-4">
  {callHistory.map((call, index) => (
    <li
      key={index}
      className="border border-slate-200 dark:border-zinc-700 rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-zinc-700 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
          <strong>Caller:</strong> {call.callerName}
        </p>
        <span
          className={`px-3 py-1 text-sm rounded-md font-medium ${
            call.status === 'Completed'
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {call.status}
        </span>
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-400">
        <p>
          <strong>Time:</strong> {call.timestamp}
        </p>
        <p>
          <strong>Duration:</strong> {call.duration}
        </p>
      </div>
    </li>
  ))}
</ul>
</div>
);
}

export default CallHistory;
