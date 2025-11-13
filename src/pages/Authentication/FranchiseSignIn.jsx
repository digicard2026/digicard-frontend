import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setRole } from '../../store/Rolestore/roleSlice';
import { getCookie, setCookie } from '../../utility/cookies';
import { verifyUser } from '../../service/userApi';
import { LuEyeOff, LuEye } from 'react-icons/lu';
import { useKyc } from './KycContext';

const FranchiseSignIn = () => {
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { updateKycStatus, updateKycSubmitted } = useKyc();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
          'Password must contain at least one capital letter, one number, and one special character'
        )
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    }),

    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const { response, data } = await verifyUser(values);

       if (response.ok) {
  setMessage({ text: 'Login successful!', type: 'success' });
  console.log('data:', data);

  // ✅ Store essential user data for registration page
  localStorage.setItem('user_id', data.user_id);
  localStorage.setItem('user_email', values.email); // <-- important line
  localStorage.setItem('token', data.token || '');

  // Store role in Redux + cookie
  dispatch(setRole(data.role || ''));
  setCookie('user_id', data.user_id, 7);

  console.log('Saved to localStorage:', {
    user_id: data.user_id,
    user_email: values.email,
    token: data.token,
  });

  // ✅ Navigate based on registration completion
  setTimeout(() => {
    if (data.registrationComplete) {
      if (data.role === 'franchise') {
        navigate('/franchise/dashboard');
      } else if (data.role === 'partner') {
        navigate('/Partner/dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      // Incomplete registration → go to registration form
      navigate('/register');
    }
  }, 1000);

        } else {
          setMessage({ text: data.message || 'Invalid credentials.', type: 'error' });
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
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
                          Sign In to Digi_card
                        </h2>

                        {message.text && (
                          <p
                            className={`mt-4 text-center ${
                              message.type === 'success' ? 'text-green-500' : 'text-red-500'
                            }`}
                          >
                            {message.text}
                          </p>
                        )}

                        <form onSubmit={formik.handleSubmit}>
                          {/* Email Input */}
                          <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                              Enter Email
                            </label>
                            <div className="relative">
                              <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                {...formik.getFieldProps('email')}
                              />
                              {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500">{formik.errors.email}</p>
                              )}
                            </div>
                          </div>

                          {/* Password Input */}
                          <div className="mb-6">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                              Enter Password
                            </label>
                            <div className="relative">
                              <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                {...formik.getFieldProps('password')}
                              />
                              {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500">{formik.errors.password}</p>
                              )}
                              <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
                              >
                                {showPassword ? (
                                  <LuEyeOff size={23} strokeWidth={1.5} />
                                ) : (
                                  <LuEye size={23} strokeWidth={1.5} />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Submit Button */}
                          <div className="mb-5">
                            <input
                              type="submit"
                              value={isLoading ? 'Verifying...' : 'Sign In'}
                              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                              disabled={isLoading}
                            />
                          </div>

                          {/* Links */}
                          <div className="mt-6 text-center">
                            <p>
                              Forgot Password?{' '}
                              <Link to="/forgot" className="text-primary">
                                Click Here
                              </Link>
                            </p>
                          </div>

                          <div className="mt-6 text-center">
                            <p>
                              Don’t have any account?{' '}
                              <Link to="/signup" className="text-primary">
                                Sign Up
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
    </>
  );
};

export default FranchiseSignIn;
