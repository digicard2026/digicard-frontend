import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GET_METHOD_NO_AUTH } from '../../utility/constants';
import { throwError } from '../../utility/errorHandler';

const apiUrl = import.meta.env.VITE_API_URL;
const SavePass_URL = `${apiUrl}/api/v1/user`;

const SetNewPassword = () => {
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const resetToken = params.get('resetToken');
    setResetToken(resetToken);

    const verifyLink = async () => {
      try {
        const response = await fetch(`${SavePass_URL}/reset-password/${resetToken}`, GET_METHOD_NO_AUTH);
        const data = await response.json();

        if (!response.ok) {
          throwError(response.status, {
            400: data.message || 'Invalid or expired reset link',
            500: 'Something went wrong on our end. Please try again later.',
            401: 'Session expired. Please log in again.',
          });
          throw new Error(data.message || 'Invalid or expired reset link');
        }

        setValid(true);
      } catch (error) {
        console.error('Error:', error);
        setMessage({ text: error.message || 'Invalid or expired reset link', type: 'error' });
      }
    };

    if (resetToken) verifyLink();
  }, [location]);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .matches(/[A-Z]/, 'Password must contain at least one capital letter')
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),


    onSubmit: async (values) => {
  if (!resetToken) {
    setMessage({ text: 'Invalid reset token', type: 'error' });
    return;
  }

  setIsLoading(true);
  try {
    const response = await fetch(`${SavePass_URL}/saveNewPassword`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        password: values.password, 
        resetToken: resetToken  // Make sure this matches backend expectation
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throwError(response.status, {
        400: data.error || 'Failed to set password', // Changed from data.message to data.error
        500: 'Something went wrong on our end. Please try again later.',
        401: 'Session expired. Please log in again.',
      });
      throw new Error(data.error || 'Failed to reset password'); // Changed from data.message to data.error
    }

    setMessage({ text: data.message || 'Password saved successfully! Redirecting to login...', type: 'success' });
    setTimeout(() => navigate('/'), 3000);
  } catch (error) {
    console.error('Error:', error);
    setMessage({ text: error.message || 'Failed to reset password', type: 'error' });
  } finally {
    setIsLoading(false);
  }
},
  });

  return (
    <>
      {!valid ? (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <div className="flex h-screen overflow-hidden">
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <main>
                <div className="mx-auto max-w-screen-sm px-4 md:px-16 py-2 2xl:px-16">
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-wrap items-center">
                      <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                          <h3 className="mb-9 text-2xl font-bold text-red-500 dark:text-red-400 sm:text-title-xl2">
                            Password Reset Link Has Expired
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      ) : (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <div className="flex h-screen overflow-hidden">
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <main>
                <div className="mx-auto max-w-screen-sm px-4 md:px-16 py-2 2xl:px-16">
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-wrap items-center">
                      <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                          <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                            Set a New Password
                          </h2>
                          <p>Your new password should be distinct from any of your prior passwords.</p>

                          {message.text && (
                            <p className={`mt-4 text-center ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                              {message.text}
                            </p>
                          )}

                          <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                              <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Password
                              </label>
                              <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                              />
                              {formik.touched.password && formik.errors.password ? (
                                <p className="text-red-500">{formik.errors.password}</p>
                              ) : null}
                            </div>

                            <div className="mb-6">
                              <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Confirm Password
                              </label>
                              <input
                                name="confirm_password"
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirm_password}
                              />
                              {formik.touched.confirm_password && formik.errors.confirm_password ? (
                                <p className="text-red-500">{formik.errors.confirm_password}</p>
                              ) : null}
                            </div>

                            <div className="mb-5">
                              <input
                                type="submit"
                                value={isLoading ? 'Saving...' : 'Reset Password'}
                                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                disabled={isLoading}
                              />
                            </div>

                            <div className="mt-6 text-center">
                              <p>
                                Hold on, I’ve got my password?{' '}
                                <Link to="/forgot" className="text-primary">
                                  Click Here
                                </Link>
                              </p>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SetNewPassword;
