import React from "react";
import {useLocation, useNavigate } from 'react-router-dom';
const EmailRegistration=()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || '';
    const handleNavigation = () => {
        navigate('/');
    };
   
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-400">
        <div className="bg-slate-800 text-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">Account Confirmation</h1>
          <p className="text-center mb-6">
            An email with your account confirmation link has been sent to your email:
            <span className="font-medium"> {email}</span>
            <br />
            Check your email and come back to proceed!
          </p>
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 hover:ring-1 hover:ring-blue-300  text-gray-800 px-6 py-2 rounded-2xl hover:bg-gray-300 transition" onClick={handleNavigation}>
              Proceed
            </button>
          </div>
        </div>
      </div>
    );

}

export default EmailRegistration;