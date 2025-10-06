import React from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";


const Wallet = () => {
  // Dummy data (You can fetch these from an API in a real scenario)
  const prepaidNumbers = [
    { number: "9876543210", balance: "₹500", expiry: "12/12/2024" },
    { number: "9876543210", balance: "₹500", expiry: "12/12/2024" },
    { number: "9876543210", balance: "₹500", expiry: "12/12/2024" },
    { number: "9876543210", balance: "₹500", expiry: "12/12/2024" },
  ];
  
  const postpaidNumbers = [
    { number: "9876543211", due: "₹1000", nextBillDate: "15/10/2024" },
    { number: "9876543211", due: "₹1000", nextBillDate: "15/10/2024" },
    { number: "9876543211", due: "₹1000", nextBillDate: "15/10/2024" },
    { number: "9876543211", due: "₹1000", nextBillDate: "15/10/2024" },
    
  
  ];

  return (
    <div className="container overflow-hidden mx-auto">
      {/* Header */}
      <Breadcrumb pageName="Wallet" />

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Prepaid Section */}
        <div className="bg-white flex items-center flex-col shadow-lg overflow-y-scroll max-h-[500px] min-h-[500px] rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-black">Prepaid</h2>
          
          {/* Prepaid numbers and balance */}
          {prepaidNumbers.map((prepaid, index) => (
            <div key={index} className="mb-4 border-b ">
              <p className="text-slate-600 mb-2">Mobile Number: <strong>{prepaid.number}</strong></p>
              <p className="text-slate-600 mb-2">Available Balance: <strong>{prepaid.balance}</strong></p>
              <p className="text-slate-600 mb-2">Expiry Date: <strong>{prepaid.expiry}</strong></p>
              {/* QR Code */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Recharge QR Code:</h3>
               
              </div>
            </div>
          ))}
        </div>

        {/* Postpaid Section */}
        <div className="bg-white shadow-lg flex items-center flex-col overflow-y-scroll max-h-[500px] min-h-[500px]  rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4  text-black">Postpaid</h2>
          
          {/* Postpaid numbers and due */}
          {postpaidNumbers.map((postpaid, index) => (
            <div key={index} className="mb-4 border-b">
              <p className="text-slate-600 mb-2">Mobile Number: <strong>{postpaid.number}</strong></p>
              <p className="text-slate-600 mb-2">Generated Due: <strong>{postpaid.due}</strong></p>
              <p className="text-slate-600 mb-2">Next Billing Date: <strong>{postpaid.nextBillDate}</strong></p>
            </div>
          ))}
          
          {/* Generate Invoice Button */}
          <div className="mt-6">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Generate Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;