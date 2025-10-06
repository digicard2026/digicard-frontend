import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { POST_METHOD, POST_METHOD_NO_AUTH } from '../../utility/constants';
import Spinner from '../../components/Spinner';
// Access the base API URL from the environment variable
const apiUrl = import.meta.env.VITE_API_URL;

// Define the full API URLs by concatenating apiUrl with the specific endpoint paths
const USER_URL = `${apiUrl}/api/v1/user`;

const EmailVerify = () => {
    const [message, setMessage] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const location = useLocation();
    const [test, setTest] = useState('');
    const [loading, setLoading] = useState(true);
    const hasCalledAPI = useRef(false);

    useEffect(() => {
        if (hasCalledAPI.current) {
            return;
        }
        hasCalledAPI.current = true;
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        console.log('Token from URL:', token); // Debugging line

        if (token) {
            const verifyEmail = async () => {
                try {
                    const response = await fetch(`${USER_URL}/verifyEmail?token=${token}`,POST_METHOD_NO_AUTH );
                    console.log('Response from backend:', response); // Debugging line

                    const data = await response.json();
                    console.log('Response data:', data); // Debugging line

                    if (response.ok) {
                        setMessage(data.message || 'Email verified successfully!');
                        setIsVerified(true);
                    } else {
                        setMessage(data.success || 'Invalid or expired token');
                        setIsVerified(false);
                    }
                } catch (error) {
                    console.log('Error during fetch:', error); // Debugging line
                    setMessage('An error occurred. Please try again.');
                    setIsVerified(false);
                }finally {
                    setLoading(false);
                }
            };

            verifyEmail();
        } else {
            setMessage('Token is required');
            setIsVerified(false);
        }
    }, [test]); // Use location.search as the dependency
if (loading) {
    return <Spinner />;
}

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-slate-400">
                <div className="bg-green-800 text-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
                    <h1 className="text-xl font-bold mb-6">{message}</h1>
                    {isVerified ? (
                    <div className="flex justify-center mb-6">
                        <div className="bg-white rounded-full p-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-green-800"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center mb-6">
                        <div className="bg-white rounded-full p-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-red-800"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                    </div>
                )}
                    {isVerified ? (
                    <p className="text-lg mb-2">You can now log in</p>
                ) : (
                    <p className="text-lg mb-2">Please try again</p>
                )}
                <p className="text-sm">@UConnect</p>
                </div>
            </div>

        </>


    );
};

export default EmailVerify;
