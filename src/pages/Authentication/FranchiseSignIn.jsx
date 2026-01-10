// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch } from 'react-redux';
// import { setRole } from '../../store/Rolestore/roleSlice';
// import { getCookie, setCookie } from '../../utility/cookies';
// import { verifyUser } from '../../service/userApi';
// import { LuEyeOff, LuEye } from 'react-icons/lu';
// import { useKyc } from './KycContext';

// const FranchiseSignIn = () => {
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { updateKycStatus, updateKycSubmitted } = useKyc();

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email('Invalid email address').required('Email is required'),
//       password: Yup.string()
//         .matches(
//           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
//           'Password must contain at least one capital letter, one number, and one special character'
//         )
//         .min(8, 'Password must be at least 8 characters')
//         .required('Password is required'),
//     }),

//     onSubmit: async (values) => {
//       setIsLoading(true);
//       try {
//         const { response, data } = await verifyUser(values);

//        if (response.ok) {
//   setMessage({ text: 'Login successful!', type: 'success' });
//   console.log('data:', data);

//   // ✅ Store essential user data for registration page
//   localStorage.setItem('user_id', data.user_id);
//   localStorage.setItem('user_email', values.email); // <-- important line
//   localStorage.setItem('token', data.token || '');

//   // Store role in Redux + cookie
//   dispatch(setRole(data.role || ''));
//   setCookie('user_id', data.user_id, 7);

//   console.log('Saved to localStorage:', {
//     user_id: data.user_id,
//     user_email: values.email,
//     token: data.token,
//   });

//   // ✅ Navigate based on registration completion
//   setTimeout(() => {
//     if (data.registrationComplete) {
//       if (data.role === 'franchise') {
//         navigate('/franchise/dashboard');
//       } else if (data.role === 'partner') {
//         navigate('/partner/dashboard');
//       } else {
//         navigate('/dashboard');
//       }
//     } else {
//       // Incomplete registration → go to registration form
//       navigate('/register');
//     }
//   }, 1000);

//         } else {
//           setMessage({ text: data.message || 'Invalid credentials.', type: 'error' });
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
//       } finally {
//         setIsLoading(false);
//       }
//     },
//   });

//   return (
//     <>
//       <div className="dark:bg-boxdark-2 dark:text-bodydark">
//         <div className="flex h-screen overflow-hidden">
//           <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
//             <main>
//               <div className="mx-auto max-w-screen-sm px-4 md:px-16 py-2 2xl:px-16">
//                 <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//                   <div className="flex flex-wrap items-center">
//                     <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
//                       <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
//                         <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
//                           Sign In to Digi_card
//                         </h2>

//                         {message.text && (
//                           <p
//                             className={`mt-4 text-center ${
//                               message.type === 'success' ? 'text-green-500' : 'text-red-500'
//                             }`}
//                           >
//                             {message.text}
//                           </p>
//                         )}

//                         <form onSubmit={formik.handleSubmit}>
//                           {/* Email Input */}
//                           <div className="mb-4">
//                             <label className="mb-2.5 block font-medium text-black dark:text-white">
//                               Enter Email
//                             </label>
//                             <div className="relative">
//                               <input
//                                 name="email"
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                 {...formik.getFieldProps('email')}
//                               />
//                               {formik.touched.email && formik.errors.email && (
//                                 <p className="text-red-500">{formik.errors.email}</p>
//                               )}
//                             </div>
//                           </div>

//                           {/* Password Input */}
//                           <div className="mb-6">
//                             <label className="mb-2.5 block font-medium text-black dark:text-white">
//                               Enter Password
//                             </label>
//                             <div className="relative">
//                               <input
//                                 name="password"
//                                 type={showPassword ? 'text' : 'password'}
//                                 placeholder="Enter your password"
//                                 className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                 {...formik.getFieldProps('password')}
//                               />
//                               {formik.touched.password && formik.errors.password && (
//                                 <p className="text-red-500">{formik.errors.password}</p>
//                               )}
//                               <button
//                                 type="button"
//                                 onClick={togglePasswordVisibility}
//                                 className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
//                               >
//                                 {showPassword ? (
//                                   <LuEyeOff size={23} strokeWidth={1.5} />
//                                 ) : (
//                                   <LuEye size={23} strokeWidth={1.5} />
//                                 )}
//                               </button>
//                             </div>
//                           </div>

//                           {/* Submit Button */}
//                           <div className="mb-5">
//                             <input
//                               type="submit"
//                               value={isLoading ? 'Verifying...' : 'Sign In'}
//                               className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
//                               disabled={isLoading}
//                             />
//                           </div>

//                           {/* Links */}
//                           <div className="mt-6 text-center">
//                             <p>
//                               Forgot Password?{' '}
//                               <Link to="/forgot" className="text-primary">
//                                 Click Here
//                               </Link>
//                             </p>
//                           </div>

//                           <div className="mt-6 text-center">
//                             <p>
//                               Don’t have any account?{' '}
//                               <Link to="/signup" className="text-primary">
//                                 Sign Up
//                               </Link>
//                             </p>
//                           </div>
//                         </form>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </main>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FranchiseSignIn;


// =============================================

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setRole } from '../../store/Rolestore/roleSlice';
import { getCookie, setCookie } from '../../utility/cookies';
import { verifyUser } from '../../service/userApi';
import { LuEyeOff, LuEye } from 'react-icons/lu';
import { useKyc } from './KycContext';

// Custom components from your assets (you'll need to create/import these)
import ModernImage from "../../assets/images/tailwickComp/ModernImage";
import Modern from "../../assets/images/tailwickComp/Modern";

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
          localStorage.setItem('user_email', values.email);
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
                navigate('/partner/dashboard');
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

  useEffect(() => {
    const bodyElement = document.body;
    bodyElement.classList.add('font-public');
    document.title = "Sign In | Digi_card";

    return () => {
      bodyElement.classList.remove('font-public');
    }
  }, []);

  return (
    <>
      {/* Blue overlay background */}
      <div className="absolute inset-0 bg-blue-900 z-0"></div>
      
      <div className="relative flex flex-col w-full overflow-hidden xl:flex-row to-custom-800 bg-gradient-to-r from-custom-900 dark:to-custom-900 dark:from-custom-950">
        <ModernImage />
        <div className="min-h-[calc(100vh_-_theme('spacing.4')_*_2)] mx-3 lg:w-[35rem] shrink-0 px-6 py-6 flex items-center justify-center m-4 bg-white dark:bg-zink-800 rounded-lg z-10 relative dark:text-zink-100 md:mx-auto xl:mx-4 dark:border-zink-700 shadow-lg">
          <div className="flex flex-col w-full h-full justify-center">
            <div className="w-full max-w-xs mx-auto">
              {/* Header */}
              <div className="text-center mb-10">
                <h1 className="text-2xl font-bold text-black dark:text-white">Sign In to Digi_card</h1>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Success Alert */}
                {message.type === 'success' && message.text && (
                  <div id="successAlert" className="p-3 text-xs text-blue-800 rounded-lg bg-blue-100 dark:bg-blue-500/20 dark:border-blue-500/50 dark:text-blue-400">
                    {message.text}
                  </div>
                )}
                
                {/* Error Alert */}
                {message.type === 'error' && message.text && (
                  <div className="p-3 mb-3 text-xs text-red-800 border border-red-300 rounded-lg bg-red-100 dark:bg-red-500/20 dark:border-red-500/50 dark:text-red-400">
                    {message.text}
                  </div>
                )}
                
                {/* Email field */}
                <div className="space-y-3">
                  <label htmlFor="email" className="block text-sm font-semibold text-black dark:text-white">
                    Email ID
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`w-full px-4 py-3 text-sm bg-gray-50 dark:bg-zink-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:shadow-gray-300 focus:shadow-sm transition-all duration-200 border border-gray-300 dark:border-zink-600 disabled:bg-gray-100 dark:disabled:bg-zink-600 disabled:text-gray-500 dark:disabled:text-zink-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-zink-400 ${formik.touched.email && formik.errors.email ? 'focus:ring-red-400 focus:shadow-red-300' : ''}`}
                    placeholder="Enter your email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    disabled={isLoading}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.email}</div>
                  )}
                </div>
                
                {/* Password field */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-semibold text-black dark:text-white">
                      Password
                    </label>
                    <Link to="/forgot" className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                      Forgot Password ?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className={`w-full px-4 py-3 text-sm bg-gray-50 dark:bg-zink-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:shadow-gray-300 focus:shadow-sm transition-all duration-200 disabled:bg-gray-100 dark:disabled:bg-zink-600 disabled:text-gray-500 border border-gray-300 dark:border-zink-600 dark:disabled:text-zink-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-zink-400 pr-10 ${formik.touched.password && formik.errors.password ? 'focus:ring-red-400 focus:shadow-red-300' : ''}`}
                      placeholder="Enter Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-zink-400 dark:hover:text-zink-200 transition-colors p-1"
                      onClick={togglePasswordVisibility}
                      disabled={isLoading}
                    >
                      {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.password}</div>
                  )}
                </div>
                
                {/* Remember Me checkbox */}
                <div className="flex items-center gap-2 mt-8">
                  <input
                    id="rememberMe"
                    className="size-4 border border-gray-300 rounded focus:ring-1 focus:ring-gray-400 checked:bg-blue-600 checked:border-blue-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:border-zink-500"
                    type="checkbox"
                    disabled={isLoading}
                  />
                  <label htmlFor="rememberMe" className="text-sm font-semibold text-black dark:text-white cursor-pointer">
                    Remember Me
                  </label>
                </div>
                
                {/* Sign In button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 active:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg mt-8"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Signing In...
                    </div>
                  ) : "Sign In"}
                </button>
              </form>

              {/* Sign Up link */}
              <div className="text-center pt-8 mt-2">
                <p className="text-gray-700 dark:text-zink-300 text-sm">
                  Don't have any account?{" "}
                  <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                    Sign Up
                  </Link>
                </p>
              </div>

              {/* Home link */}
              <div className="text-center pt-4">
                <p className="text-gray-700 dark:text-zink-300 text-sm">
                  Back to {" "}
                  <Link to="/" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                    Home
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Modern />
      </div>
    </>
  );
};

export default FranchiseSignIn;

