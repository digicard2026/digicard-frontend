import React, { useState } from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import { useInventory } from "./Inventory/InventoryContext";
import { useNavigate } from 'react-router-dom';
import Toaster from '../components/Toaster/Toaster';
import { ORDER_URL } from "../utility/constants";
import { throwError } from "../utility/errorHandler";

// const apiUrl = import.meta.env.VITE_API_URL;
// const ORDER_URL = `${apiUrl}/api/v1/order`;

function SetRoute() {
  const { selectedIds, DID } = useInventory();
  const [inputValue, setInputValue] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [message, setMessage] = useState({ text: '', type: '' });
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const showToast=(message,type)=>{
    setToast({ message, type });
  
}


  console.log(selectedIds);
  const handleSubmit = async () => {
    if (inputValue.trim() === "") return;
    
    if (!selectedRoute) {
      setMessage({ text: 'Please select a route option.', type: 'error' });
      return;
    }
    if (selectedRoute === "Forward to mobile" && inputValue.trim() === "") {
      setMessage({ text: 'Please enter a mobile number.', type: 'error' });
      return;
    }
    const route = selectedRoute === "Forward to mobile" 
      ? `Forward to mobile: ${inputValue.trim()}` 
      : inputValue.trim();

    try {
      const response = await fetch(`${ORDER_URL}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ selectedIds, route }),
      });
      const result = await response.json();
      if (result.message === 'Invalid token'){
          showToast('Session Expired redirecting to login page', 'error');
          setTimeout(() => {
              navigate('/');
          },3000);
      }

      if (!response.ok) {
        throwError(response.status, { 404: 'DID not found.', 500: 'Failed to update Route', 401: 'Session expired. Please log in again.' });
      }

      
      console.log("update response api", result);

      if (result.message === "Order updated successfully" && result.order.success) {
        console.log("Order updated successfully");
        setMessage({ text: `Update successful!`, type: 'success' });
        navigate('/manage');
      } else {
        console.log("Order update failed:", result.order.message);
        setMessage({ text: `Update failed!`, type: 'error' });
      }
    } catch (error) {
      console.error("Error updating order:", error);
      setMessage({ text: `Update failed!`, type: 'error' });
    }

    // Clear the input field
    setInputValue("");
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 1000);
  };

  return (
    <>
   
      <Breadcrumb pageName="Set Routes" />
      {toast && (
                <Toaster
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
      <div className=" flex flex-col items-center justify-center bg-white rounded-md p-10">
        <div className="w-full max-w-md">
          <h1 className="text-5xl mb-4 text-slate-700">Set Routes</h1>
          <h5 className="text-md mb-4">Selected DID:</h5>
          <ul className="bg-white rounded-lg shadow-md p-4">
            {DID.length > 0 ? (
              DID.map((id, index) => (
                <li key={index} className="bg-blue-100 text-blue-900 rounded-md p-2 my-1">
                  {id}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No items selected yet.</li>
            )}
          </ul>
        </div>
        {message.text && (
          <p className={`mt-4 text-center ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {message.text}
          </p>
        )}
        <div className="w-full max-w-md mt-6">
          <h5 className="text-md mb-4">Add Route:</h5>
          {/* <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full border rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a route..."
          /> */}
           <select
            value={selectedRoute}
            onChange={(e) => {
              setSelectedRoute(e.target.value);
              if (e.target.value !== "Forward to mobile") {
                setInputValue(e.target.value); 
              } else {
                setInputValue(""); 
              }
            }}
            className="w-full border rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a route...</option>
            <option value="Forward to mobile">Forward to mobile</option>
            <option value="Missed call">Missed call</option>
            <option value="IVR">IVR</option>
          </select>
          
        
          {selectedRoute === "Forward to mobile" && (
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full border rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a mobile number..."
            />
          )}
          
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white rounded-md py-2"
          >
            Submit Route
          </button>
        </div>
      </div>
   
</>

  );
}

export default SetRoute;
