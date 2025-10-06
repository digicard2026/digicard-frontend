import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { registerForm, updateUserById, getUserById } from '../service/userApi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Toaster from '../components/Toaster/Toaster';
import { GET_METHOD, GET_METHOD_NO_AUTH, USER_URL } from '../utility/constants';
import { throwError } from '../utility/errorHandler';
// Access the base API URL from the environment variable
//const apiUrl = import.meta.env.VITE_API_URL;

// Define the full API URLs by concatenating apiUrl with the specific endpoint paths
//const USER_URL = `${apiUrl}/api/v1/user`;



const UserListForm = () => {
  const [message, setMessage] = useState({ text: '', type: '' }); // { text: 'Message text', type: 'success' or 'error' }
  const navigate = useNavigate();
  const { action, user_id } = useParams();
  const [buttonText, setButtonText] = useState('');
  const [heading, setHeading] = useState('');
  const [userData, setUserData] = useState({});
  const [pageName, setPageName] = useState('User Form');
  const [toast, setToast] = useState(null);
  const showToast = (message, type) => {
    setToast({ message, type })
  }

  useEffect(() => {
    if (action === 'edit') {
      setButtonText('Save Changes');
      setHeading('Edit User');
      fetchUserData(user_id);
      setPageName("Edit User")
    } else if (action === 'add') {
      setButtonText('Add User');
      setHeading('Add New User');
      setPageName("Add New User")
    }
  }, [action, user_id]);

  const fetchUserData = async (user_id) => {
    try {
      const response = await fetch(`${USER_URL}/${user_id}`, GET_METHOD_NO_AUTH);
      const data = await response.json();
      if (data.message === 'Invalid token') {
        showToast('Session Expired redirecting to login page', 'error');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }



      if (!response.ok) {
        throwError(response.status, { 404: 'User not found.', 500: 'Something went wrong on our end. Please try again later.', 401: 'Session expired. Please log in again.' });
      }


      formik.setValues(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: '',
      phone_number: '',
      email: '',
      password: '',
      confirm_password: ''
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
      phone_number: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),
      email: Yup.string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'email must be a valid email address')
        .email('Invalid email address')
        .required('Email is required'),
    }),

    onSubmit: async (values) => {
      try {

        let response, data;
        if (action === 'edit') {
          ({ response, data } = await updateUserById(user_id, values));
        } else if (action === 'add') {
          ({ response, data } = await registerForm(values));
        }

        if (data.message === 'Invalid token') {
          showToast('Session Expired redirecting to login page', 'error');
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }

        if (response.ok) {
          showToast(`${action === 'edit' ? 'Update' : 'Registration'} successful!`, 'success');
          setTimeout(() => {
            navigate('/user');
          }, 1000);
        } else {
          showToast(data.message, 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('An error occurred. Please try again.', 'error');

      }
    },
  });

  return (
    <>
      <Breadcrumb pageName={pageName} />
      <div className="dark:bg-boxdark-2 dark:text-bodydark flex items-center justify-center">
        <div className="w-full max-w-lg px-6">
          <div className="rounded-md border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark">
            <div className="p-6 sm:p-8">

              {toast && (
                <Toaster
                  message={toast.message}
                  type={toast.type}
                  onClose={() => setToast(null)}
                />
              )}
              <form onSubmit={formik.handleSubmit}>
                {/* Full Name Field */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Enter Your Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-4 pr-10 text-black outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 dark:border-form-strokedark dark:bg-form-input dark:text-white"
                      {...formik.getFieldProps('first_name')}
                    />
                    {formik.touched.first_name && formik.errors.first_name && (
                      <p className="mt-1 text-sm text-red-500">{formik.errors.first_name}</p>
                    )}
                  </div>
                </div>
                {/* Mobile Number Field */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-4 pr-10 text-black outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 dark:border-form-strokedark dark:bg-form-input dark:text-white"
                      {...formik.getFieldProps('phone_number')}
                    />
                    {formik.touched.phone_number && formik.errors.phone_number && (
                      <p className="mt-1 text-sm text-red-500">{formik.errors.phone_number}</p>
                    )}
                  </div>
                </div>
                {/* Email Field */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      disabled={action === 'edit'}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-4 pr-10 text-black outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 dark:border-form-strokedark dark:bg-form-input dark:text-white"
                      {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
                    )}
                  </div>
                </div>
                {/* Buttons */}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="text-red-500 bg-white hover:text-red-600 hover:bg-red-100 focus:ring-2 focus:ring-red-200 active:bg-red-200 rounded-lg px-5 py-2.5 border dark:bg-zinc-800 dark:border-red-500 dark:hover:bg-red-500/10"
                  >
                    <span>Cancel</span>
                  </button>
                  <button
                    type="submit"
                    className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-200 active:bg-blue-700 rounded-lg px-5 py-2.5"
                  >
                    {buttonText || "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>



    </>
  );
};

export default UserListForm;
