import React from 'react';
import { Link } from 'react-router-dom';
import { FaIdCard } from "react-icons/fa";

const KycSubmitted = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
                <FaIdCard size={50} />
                <div className="text-center p-6 max-w-md">
                    <h1 className="text-2xl font-bold mb-4">Thanks for Submitting Your Documents!</h1>
                    <p className="mb-6">
                        Your KYC documents have been submitted successfully. Once we verify your documents, you will be able to access all features of the application.
                    </p>
                </div>
            </div>
        </>
    );
};

export default KycSubmitted;
