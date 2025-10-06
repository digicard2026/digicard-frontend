import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { FiClipboard } from "react-icons/fi";
import { registerForm, updateUserById } from '../service/userApi';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../utility/cookies';
import { getUserById } from '../service/userApi';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import Toaster from '../components/Toaster/Toaster';
import { POST_METHOD, USER_URL } from '../utility/constants';
import { API_URL } from '../utility/constants';
import { throwError } from '../utility/errorHandler';

// const apiUrl = import.meta.env.VITE_API_URL;
// const USER_URL = `${apiUrl}/api/v1/user`;


const ApiCredential = () => {
  // const [message, setMessage] = useState({ text: '', type: '' });
  const [toast, setToast] = useState(null); // { text: 'Message text', type: 'success' or 'error' }
  const navigate = useNavigate();
  const [user_name, setuser_name] = useState('')
  const [password, setpassword] = useState('')
  const [copied, setCopied] = useState(false);

  const showToast = (message, type) => {
    setToast({ message, type })
  }


  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const copyPasswordToClipboard = (password) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(password)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          fallbackCopyTextToClipboard(password);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
    } else {
      fallbackCopyTextToClipboard(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      console.log("Fallback: Text copied to clipboard");
    } catch (err) {
      console.error("Fallback: Unable to copy text", err);
    }
    document.body.removeChild(textArea);
  };

  useEffect(() => {

    const fetchUserData = async () => {
      const user_id = getCookie('user_id');
      console.log('user id from cookie:', user_id); // Log email
      if (user_id) {
        try {
          const { data } = await getUserById(user_id);
          
          if (data.message === 'Invalid token') {
            showToast('Session Expired redirecting to login page', 'error');
            setTimeout(() => {
              navigate('/');
            }, 3000);
          }

          console.log('User data:', data); // Log user data
          setuser_name(data.uin_no)
          setpassword(data.api_key)
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);
  const resetPassword = async () => {
    try {
      const response = await fetch(`${USER_URL}/reset_pass`,POST_METHOD);
      const result = await response.json();
      if (result.message === 'Invalid token'){
        showToast('Session Expired redirecting to login page', 'error');
        setTimeout(() => {
            navigate('/');
        },3000);
    }
      // if (!response.ok) {
      //   showToast('API Key Update failed!', 'error');

      //   // setMessage({ text: `API Key Update failed!`, type: 'error' });
      //   throwError(response.status, {
      //     400: 'Invalid input provided. Please check your data.',
      //     401: 'Session expired. Please log in again.',
      //     500: 'Something went wrong on our end. Please try again later.',
      //   });
      // }

    //   if (!response.ok) {
    //     // Pass custom messages for specific status codes
    //     throwError(response.status, {
    //         400: 'Invalid input provided. Please check your data.',
    //         401: 'Session expired. Please log in again.',
    //         500: 'Something went wrong on our end. Please try again later.',
    //     });
    // }
    if(response.ok){
      setpassword(result.reset_pass.password);
      // setMessage({ text: `API Key Update successful!`, type: 'success' });
      showToast('API Key Update successful!', 'success');
    }
      
      
    } catch (error) {
      console.error('Error resetting password:', error);
      // setMessage({ text: `API Key Update failed!`, type: 'error' });
      showToast('API Key Update failed!', 'error');
    }
    // setTimeout(() => {
    //     setMessage({ text: '', type: '' });
    //   }, 1000);
  };


  return (
    <>
      <Breadcrumb pageName="API Credential" />
      <div className="dark:bg-boxdark-2 dark:text-bodydark  flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-md shadow-md border border-slate-300 dark:border-slate-700 p-8">
          {/* {message.text && (
          <p className={`mb-6 text-center text-sm font-medium ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {message.text}
          </p>
        )} */}
          {toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
          {/* UserName Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-black dark:text-white mb-2">
              User ID
            </label>
            <div className="relative bg-slate-100 border border-slate-300 dark:border-slate-700 p-3 rounded-lg text-sm text-black dark:bg-slate-800 dark:text-white transition-all focus-within:ring-2 focus-within:ring-blue-500">
              {user_name}
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-black dark:text-white mb-2">
              API Key
            </label>
            <div className="relative bg-slate-100 border border-slate-300 dark:border-slate-700 p-3 rounded-lg text-sm text-black dark:bg-slate-800 dark:text-white transition-all focus-within:ring-2 focus-within:ring-blue-500 flex items-center">
              {/* API Key Field */}
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                readOnly
                className="w-full bg-transparent text-black dark:text-white border-transparent focus:outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-10 text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-100 tooltip"
              >
                {passwordVisible ?  <LuEyeOff size={17}></LuEyeOff> :<LuEye size={19}></LuEye> }
                <span className="tooltip-text">{passwordVisible ? "Hide" : "Show"}</span>
              </button>
              {/* Copy Button */}
              <button
                type="button"
                onClick={() => copyPasswordToClipboard(password)}
                className="absolute right-7 text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-100 tooltip"
              >
                <span className="tooltip-text">{copied ? "Copied" : "Copy"}</span>
                <FiClipboard size={17} />
              </button>

              {/* Show/Hide Button */}


              {/* Reset Button */}
              <button
                className="absolute right-4 bg-blue-500 hover:bg-blue-600 hover:ring-1 hover:ring-blue-300  px-2 py-0.5 rounded-md text-white text-sm font-semibold focus:outline-none dark:bg-blue-500 dark:text-white hover:text-slate-200 dark:hover:text-slate-100 tooltip "
                onClick={resetPassword}
              >
                <span className="tooltip-text">Reset API Key</span>
                Reset
              </button>
            </div>

            {/* Show copied message */}
            {copied && (
              <p className="absolute mt-2 text-xs text-green-500 z-999999">Copied to clipboard!</p>
            )}
          </div>
          <div className="p-4 ">
            <p className='text-sm font-bold text-slate-700 '>Please do not share your API key with anyone. <br />
              <br />
            </p>
            <p>
              To generate API Token use the following link:<br />
              <b>{API_URL}/api/v1/user/set-token </b> <br />
            </p >

            <p className='text-sm font-normal text-slate-500 '>
              body:<br />

            </p>

            <pre>
              {`{
"user_id":"********",
"api_key": "************"
}`}
            </pre>






          </div>

        </div>
      </div>

    </>
  );
};

export default ApiCredential;
