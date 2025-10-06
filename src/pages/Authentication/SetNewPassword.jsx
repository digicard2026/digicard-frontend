import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { GET_METHOD_NO_AUTH } from '../../utility/constants';
import { throwError } from '../../utility/errorHandler';
const apiUrl = import.meta.env.VITE_API_URL;
const SavePass_URL = `${apiUrl}/api/v1/user`;

const SetNewPassword = () => {
    const [message, setMessage] = useState({ text: '', type: '' }); // { text: 'Message text', type: 'success' or 'error' }
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [resetToken, setResetToken] = useState('');
    const [valid, setValid] = useState(false)

    console.log("resettoken", resetToken)
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const resetToken = params.get('resetToken');
        setResetToken(resetToken);
        const verifyLink = async () => {
            try {

                const response = await fetch(`${SavePass_URL}/verifyLink?resetToken=${resetToken}`,GET_METHOD_NO_AUTH);
                const data = await response.json();

                if (!response.ok) {
                    throwError(response.status, { 400:data.message ||  'Invalid or expired reset link', 500: 'Something went wrong on our end. Please try again later.',401: 'Session expired. Please log in again.' });
                    throw new Error(data.message || 'Invalid or expired reset link');
                }

                setValid(true);
            } catch (error) {
                console.error('Error:', error);
                setMessage(error.message || 'Invalid or expired reset link');
            }
        };

        verifyLink();
    }, [location]);
    console.log("vlid ", valid)

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
                .matches(/[A-Z]/, 'Password must contain at least one capital letter')
                .min(8, 'Password must be at least 8 characters')
                .required('Confirm Password is required')
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            try {

                const response = await fetch(`${SavePass_URL}/saveNewPassword`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password: values.password, resetToken })
                });
                console.log(response)
                if (!response.ok) {
                    throwError(response.status, { 400: 'failed to set password' , 500: 'Something went wrong on our end. Please try again later.',401: 'Session expired. Please log in again.' });
                    throw new Error('Failed to fetch data');
                }
                const data = response.json();
                console.log(data)
                if (response.ok) {
                    setMessage({ text: 'password saved successfully!', type: 'success' });
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                } else {
                    setMessage({ text: "invalid or expired token", type: 'error' });
                }
            } catch (error) {
                console.error('Error:', error);
                setMessage({ text: 'invalid or expired token', type: 'error' });
            }
            finally {
                setIsLoading(false);
            }
        },
    });

    // if (!valid) {
    //     return (
    //      <>
    //      <p>Link Or Password is already set for link</p>
    //      </>
    //     );
    //   }

    return (
        <>
            {
                !valid ? (


                    <>
                      <div className="dark:bg-boxdark-2 dark:text-bodydark">
                        <div className="flex h-screen overflow-hidden">
                            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

                                <main>
                                    {/* <div className="mx-auto  max-w-screen-md px-10 md:px-40 py-1 2xl:px- 40"> */}
                                    <div className="mx-auto max-w-screen-sm px-4 md:px-16 py-2 2xl:px-16">
                                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                            <div className="flex flex-wrap items-center">

                                                <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
                                                    <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                                                        {/* <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                                            Uconnect
                                                        </h2> */}
                                                        <h3 className="mb-9 text-2xl font-bold text-red-500 dark:text-red-400 sm:text-title-xl2">
                                                            Password Reset Link Has  Expired
                                                        </h3>
                                                        {/* <div className="mt-6 text-center">
                                                                <p>
                                                                    Do You Want To Reset Password?{' '}
                                                                    <Link to="/forgot" className="text-primary">
                                                                        Click Here
                                                                    </Link>
                                                                </p>
                                                            </div> */}
                                                        {/* <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                                            Set a New Password
                                                        </h2>
                                                        <p className="">
                                                            Your new password should be distinct from any of your prior passwords
                                                        </p>
                                                        {message.text && (
                                                            <p className={`mt-4 text-center ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                                                {message.text}
                                                            </p>
                                                        )} */}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </main>

                            </div>

                        </div>

                    </div>  
                    </>


                ) : (
                    <div className="dark:bg-boxdark-2 dark:text-bodydark">
                        <div className="flex h-screen overflow-hidden">
                            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

                                <main>
                                    {/* <div className="mx-auto  max-w-screen-md px-10 md:px-40 py-1 2xl:px- 40"> */}
                                    <div className="mx-auto max-w-screen-sm px-4 md:px-16 py-2 2xl:px-16">
                                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                            <div className="flex flex-wrap items-center">

                                                <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
                                                    <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                                                        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                                            Uconnect
                                                        </h2>
                                                        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                                            Set a New Password
                                                        </h2>
                                                        <p className="">
                                                            Your new password should be distinct from any of your prior passwords
                                                        </p>
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
                                                                <div className="relative">
                                                                    <input
                                                                        name="password"
                                                                        type="password"
                                                                        placeholder="Password"
                                                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"

                                                                        onChange={formik.values.password}
                                                                        {...formik.getFieldProps('password')}
                                                                    />
                                                                    {formik.touched.password && formik.errors.password ? (
                                                                        <p className="text-red-500">{formik.errors.password}</p>
                                                                    ) : null}
                                                                    <span className="absolute right-4 top-4">
                                                                        <svg
                                                                            className="fill-current"
                                                                            width="22"
                                                                            height="22"
                                                                            viewBox="0 0 22 22"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <g opacity="0.5">
                                                                                <path
                                                                                    d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                                                                    fill=""
                                                                                />
                                                                                <path
                                                                                    d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                                                                    fill=""
                                                                                />
                                                                            </g>
                                                                        </svg>
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="mb-6">
                                                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                                                    Confirm Password
                                                                </label>
                                                                <div className="relative">
                                                                    <input
                                                                        name="confirm_password"
                                                                        type="confirm_password"
                                                                        placeholder=" Confirm password"
                                                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"

                                                                        onChange={formik.values.confirm_password}
                                                                        {...formik.getFieldProps('confirm_password')}
                                                                    />
                                                                    {formik.touched.confirm_password && formik.errors.confirm_password ? (
                                                                        <p className="text-red-500">{formik.errors.confirm_password}</p>
                                                                    ) : null}
                                                                    <span className="absolute right-4 top-4">
                                                                        <svg
                                                                            className="fill-current"
                                                                            width="22"
                                                                            height="22"
                                                                            viewBox="0 0 22 22"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <g opacity="0.5">
                                                                                <path
                                                                                    d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                                                                    fill=""
                                                                                />
                                                                                <path
                                                                                    d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                                                                    fill=""
                                                                                />
                                                                            </g>
                                                                        </svg>
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="mb-5">
                                                                <input
                                                                    type="submit"
                                                                    value={isLoading ? "Saving..." : "Reset Password"}
                                                                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                                                    disabled={isLoading}
                                                                />
                                                            </div>


                                                            <div className="mt-6 text-center">
                                                                <p>
                                                                    Hold on, I've got my password...?{' '}
                                                                    <Link to="/forgot" className="text-primary">
                                                                        Click Here
                                                                    </Link>
                                                                </p>
                                                            </div>

                                                            {/* <div className="mt-6 text-center">
                            <p>
                              Don’t have any account?{' '}
                              <Link to="/auth/signup" className="text-primary">
                                Sign Up
                              </Link>
                            </p>
                          </div> */}
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
