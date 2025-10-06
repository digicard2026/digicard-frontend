import React from 'react';
import { Link } from 'react-router-dom';
import { FaIdCard } from "react-icons/fa";

import { useKyc } from './Authentication/KycContext';
import { useNavigate } from 'react-router-dom';

const KycNotVerified = () => {
    const { isKycVerified,kycSubmitted } = useKyc(); 
    const navigate = useNavigate();
    if (isKycVerified) {
             
        setTimeout(() => {
          
          navigate('/purchase');
        }, );
      }  
      else if(kycSubmitted){
        setTimeout(()=>{
          navigate('/Kycsubmitted'); 
        },)
       }
        

    return (
        <>
            
            <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
            <FaIdCard size={50} />
                <div className="text-center p-6 max-w-md">

                    <h1 className="text-2xl font-bold mb-4">KYC Verification Pending</h1>
                    <p className="mb-6">
                        Please verify your KYC to access all features.
                    </p>
                    <Link
                        to="/kycVerification"
                        className="text-blue-600 font-medium underline hover:text-blue-800"
                    >
                        Go to KYC Verification
                    </Link>
                </div>
            </div>
        </>

    );
};

export default KycNotVerified;