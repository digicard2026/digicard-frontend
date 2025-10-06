import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import LeadDetails from './LeadDetails';
import CallHistory from './CallHistory';
import CallControls from './CallControls';

function LeadTabs() {
  const [activeTab, setActiveTab] = useState('leadDetails'); 
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <>
      <Breadcrumb pageName="Lead Details" />
      <CallControls phoneNumber={phoneNumber}/> 
      <div className="card mb-5 rounded-md bg-white dark:bg-zinc-800">
     
        <div className="bg-white border-b  border-zinc-200 px-5 py-3">
          <div className="flex space-x-4">
            <button
              className={` py-1 px-2 rounded-md ${activeTab === 'leadDetails'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              onClick={() => setActiveTab('leadDetails')}
            >
              Lead Details
            </button>
            <button
              className={`py-1 px-2 rounded-md ${activeTab === 'callHistory'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              onClick={() => setActiveTab('callHistory')}
            >
              Call History
            </button>
          </div>
        </div>
        <div className="p-5">
          {activeTab === 'leadDetails' && <LeadDetails setPhoneNumber={setPhoneNumber} />}
          {activeTab === 'callHistory' && <CallHistory />}
        </div>
      </div>
    </>
  );
}

export default LeadTabs;
