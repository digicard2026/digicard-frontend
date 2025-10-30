import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from '../../utility/cookies'; 
import { verifyUser } from '../../service/userApi';
import { LuEyeOff,LuEye } from 'react-icons/lu';
import { useKyc } from './KycContext';
import { ProfileContext } from '../ProfileProvider';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from '../../store/Rolestore/roleSlice';

const SignIn = () => {
  const [message, setMessage] = useState({ text: '', type: '' }); // { text: 'Message text', type: 'success' or 'error' }
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { updateKycStatus, updateKycSubmitted,} = useKyc();
  // const { updateRole } = useContext(ProfileContext);  
  const dispatch = useDispatch();

  // const role = useSelector((state) => state.role.role);
  
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/, 'Password must contain at least one capital letter') //
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    }),
   
    onSubmit: async (values) => {
  setIsLoading(true);
  try {
    const { response, data } = await verifyUser(values);

    if (response.ok) {
      setMessage({ text: 'Login successful!', type: 'success' });
      console.log("dataaaaaaaaaaaaaaaaaa",data);
      
      dispatch(setRole(data.role));
      setCookie('user_id', data.user_id, 7);
      console.log('cookie', getCookie('user_id'));

      // Navigate to Create Card page after successful login
   setTimeout(() => {
  if (data.role === 'admin') {
    navigate('/create');
  }
}, 1000);

    } else {
      setMessage({ text: data.message, type: 'error' });
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
              {/* <div className="mx-auto  max-w-screen-md px-10 md:px-40 py-1 2xl:px- 40"> */}
              <div className="mx-auto max-w-screen-sm px-4 md:px-16 py-2 2xl:px-16">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="flex flex-wrap items-center">

                    <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
                      <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            
                        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                          Sign In to Digi_card
                        </h2>
                        {message.text && (
                          <p className={`mt-4 text-center ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                            {message.text}
                          </p>
                        )}

                        <form onSubmit={formik.handleSubmit}>
                          <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                              Enter   Email
                            </label>
                            <div className="relative">
                              <input
                               name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      
                                onChange={formik.values.email}
                                {...formik.getFieldProps('email')}
                              />
                              {formik.touched.email && formik.errors.email ? (
                                <p className="text-red-500">{formik.errors.email}</p>
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
                                      d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                      fill=""
                                    />
                                  </g>
                                </svg>
                              </span>
                            </div>
                          </div>

                          <div className="mb-6">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                              Enter  Password
                            </label>
                            <div className="relative">
                              <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                
                                onChange={formik.values.password}
                                {...formik.getFieldProps('password')}
                              />
                              {formik.touched.password && formik.errors.password ? (
                                <p className="text-red-500">{formik.errors.password}</p>
                              ) : null}
                              <span className="absolute right-4 top-4">
                                 <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              className=" text-slate-400 hover:text-slate-600  "
                            >
                              {showPassword ? <LuEyeOff size={23} strokeWidth={1.5}/> : <LuEye size={23} strokeWidth={1.5} />}
                            </button>
                              </span>
                            </div>
                          </div>
                          <div className="mb-5">
                            <input
                              type="submit"
                              value={isLoading ? "Verifying..." : "Sign In"}
                              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                              disabled={isLoading}
                            />
                          </div>


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
                              <Link to="/auth/signup" className="text-primary">
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

export default SignIn;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { LuEyeOff, LuEye } from 'react-icons/lu';
// import { useDispatch } from 'react-redux';
// import { setRole } from '../../store/Rolestore/roleSlice';
// import { getCookie, setCookie } from '../../utility/cookies';
// import { verifyUser } from '../../service/userApi';
// import { useKyc } from './KycContext';

// const SignIn = () => {
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { updateKycStatus, updateKycSubmitted } = useKyc();

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const formik = useFormik({
//     initialValues: { email: '', password: '' },
//     validationSchema: Yup.object({
//       email: Yup.string().email('Invalid email address').required('Email is required'),
//       password: Yup.string()
//         .matches(
//           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
//           'Password must contain at least one uppercase, one lowercase, one number, and one special character'
//         )
//         .min(8, 'Password must be at least 8 characters')
//         .required('Password is required'),
//     }),
//     onSubmit: async (values) => {
//       setIsLoading(true);
//       try {
//         const { response, data } = await verifyUser(values);

//         if (response.ok) {
//           setMessage({ text: 'Login successful!', type: 'success' });

//           // Set Redux role
//           dispatch(setRole(data.role));

//           // Set cookie
//           setCookie('user_id', data.user_id, 7);

//           // Update KYC
//           updateKycStatus(data.isKYCVerified);
//           updateKycSubmitted(data.kycSubmitted);

//           // Navigate based on KYC & role
//           setTimeout(() => {
//             if (data.isKYCVerified) {
//               if (data.role === 'customer') {
//                 navigate('/customer-dashboard');
//               } else if (data.role === 'agent') {
//                 navigate('/calls');
//               } else if (data.role === 'admin') {
//                 navigate('/purchase');
//               }
//             } else if (data.kycSubmitted) {
//               navigate('/Kycsubmitted');
//             } else {
//               navigate('/KycNotVerified');
//             }
//           }, 1000);
//         } else {
//           setMessage({ text: data.message || 'Invalid credentials', type: 'error' });
//         }
//       } catch (error) {
//         console.error('SignIn Error:', error);
//         setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
//       } finally {
//         setIsLoading(false);
//       }
//     },
//   });

//   return (
//     <div className="dark:bg-boxdark-2 dark:text-bodydark flex h-screen overflow-hidden">
//       <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
//         <main className="mx-auto max-w-screen-sm px-4 md:px-16 py-2 2xl:px-16">
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="flex flex-wrap items-center w-full border-stroke dark:border-strokedark xl:border-l-2">
//               <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
//                 <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
//                   Sign In to UConnect
//                 </h2>

//                 {message.text && (
//                   <p
//                     className={`mt-4 text-center ${
//                       message.type === 'success' ? 'text-green-500' : 'text-red-500'
//                     }`}
//                   >
//                     {message.text}
//                   </p>
//                 )}

//                 <form onSubmit={formik.handleSubmit}>
//                   <div className="mb-4">
//                     <label className="mb-2.5 block font-medium text-black dark:text-white">
//                       Enter Email
//                     </label>
//                     <input
//                       name="email"
//                       type="email"
//                       placeholder="Enter your email"
//                       className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                       {...formik.getFieldProps('email')}
//                     />
//                     {formik.touched.email && formik.errors.email && (
//                       <p className="text-red-500">{formik.errors.email}</p>
//                     )}
//                   </div>

//                   <div className="mb-6">
//                     <label className="mb-2.5 block font-medium text-black dark:text-white">
//                       Enter Password
//                     </label>
//                     <div className="relative">
//                       <input
//                         name="password"
//                         type={showPassword ? 'text' : 'password'}
//                         placeholder="Enter your password"
//                         className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                         {...formik.getFieldProps('password')}
//                       />
//                       {formik.touched.password && formik.errors.password && (
//                         <p className="text-red-500">{formik.errors.password}</p>
//                       )}
//                       <button
//                         type="button"
//                         className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
//                         onClick={togglePasswordVisibility}
//                       >
//                         {showPassword ? <LuEyeOff size={23} /> : <LuEye size={23} />}
//                       </button>
//                     </div>
//                   </div>

//                   <input
//                     type="submit"
//                     value={isLoading ? 'Verifying...' : 'Sign In'}
//                     className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
//                     disabled={isLoading}
//                   />

//                   <div className="mt-6 text-center">
//                     <p>
//                       Forgot Password?{' '}
//                       <Link to="/forgot" className="text-primary">
//                         Click Here
//                       </Link>
//                     </p>
//                   </div>

//                   <div className="mt-6 text-center">
//                     <p>
//                       Don’t have an account?{' '}
//                       <Link to="/auth/signup" className="text-primary">
//                         Sign Up
//                       </Link>
//                     </p>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
