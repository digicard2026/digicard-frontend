// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { throwError } from "../../utility/errorHandler";
// const apiUrl = import.meta.env.VITE_API_URL;
// const forgotPass_URL = `${apiUrl}/api/v1/user`;

// const ForgotPage = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [message, setMessage] = useState({ text: '', type: '' });
//     const navigate = useNavigate();
//     const formik = useFormik({
//         initialValues: {
//             email: ''
//         },
//         validationSchema: Yup.object({
//             email: Yup.string()
//                 .email('Invalid email address')
//                 .required('Email is required')
//         }),
//         onSubmit: async (values) => {
//             setIsLoading(true);
//             try {

//                 const response = await fetch(`${forgotPass_URL}/sendReSetLink`, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({email:values.email})
//                 });
//               console.log(response)
//                 if (!response.ok) {
//                     // throw new Error('Failed to fetch data');
//                     throwError(response.status, {
//                         400: 'Invalid Email',
//                         401: 'Session expired. Please log in again.',
//                         500: 'Something went wrong on our end. Please try again later.',
//                     })
//                 }
//               const data=response.json();
//               console.log(data)
//                 if (response.ok) {
//                     setMessage({ text: 'email  sent successfully!', type: 'success' });
//                     // setTimeout(() => {
//                     //     navigate('/');
//                     // }, 1000);
//                 } else {
//                     setMessage({ text: data.message, type: 'error' });
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//                 setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
//             }
//             finally {
//                 setIsLoading(false);
//             }
//         },
//     });

//     return (
//         <>


//             <div className="dark:bg-boxdark-2 dark:text-bodydark">
//                 <div className="flex h-screen overflow-hidden">
//                     <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

//                         <main>
//                             {/* <div className="mx-auto  max-w-screen-md px-10 md:px-40 py-1 2xl:px- 40"> */}
//                             <div className="mx-auto max-w-screen-sm px-4 md:px-16 py-2 2xl:px-16">
//                                 <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//                                     <div className="flex flex-wrap items-center">

//                                         <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
//                                             <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
//                                             <h1 className="mb-9 text-2xl font-bold text-blue-500 dark:text-white sm:text-title-xl2">
//                                                     Uconnect
//                                                 </h1>

//                                                 <h1 className="mb-9 text-2xl font-bold text-blue-500 dark:text-white sm:text-title-xl2">
//                                                     Forgot Password
//                                                 </h1>
//                                                 <p className="mb-9 text-xl font-bold text-slate-500 dark:text-white sm:text-title-sm">
//                                                     Reset Your Uconnect Password
//                                                 </p>
//                                                 <p className="mb-9 text-2xl font-bold text-yellow-500 dark:text-white sm:text-title-sm">
//                                                     Provide your email address, and instructions will be sent to you
//                                                 </p>
//                                                 {message.text && (
//                                                     <p className={`mt-4 text-center ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
//                                                         {message.text}
//                                                     </p>
//                                                 )}

//                                                 <form onSubmit={formik.handleSubmit}>
//                                                     <div className="mb-4">
//                                                         <label className="mb-2.5 block font-medium text-black dark:text-white">
//                                                             Email
//                                                         </label>
//                                                         <div className="relative">
//                                                             <input
//                                                                 name="email"
//                                                                 type="email"
//                                                                 placeholder="Enter  email"
//                                                                 className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"

//                                                                 onChange={formik.values.email}
//                                                                 {...formik.getFieldProps('email')}
//                                                             />
//                                                             {formik.touched.email && formik.errors.email ? (
//                                                                 <p className="text-red-500">{formik.errors.email}</p>
//                                                             ) : null}
//                                                             <span className="absolute right-4 top-4">
//                                                                 <svg
//                                                                     className="fill-current"
//                                                                     width="22"
//                                                                     height="22"
//                                                                     viewBox="0 0 22 22"
//                                                                     fill="none"
//                                                                     xmlns="http://www.w3.org/2000/svg"
//                                                                 >
//                                                                     <g opacity="0.5">
//                                                                         <path
//                                                                             d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
//                                                                             fill=""
//                                                                         />
//                                                                     </g>
//                                                                 </svg>
//                                                             </span>
//                                                         </div>
//                                                     </div>



//                                                     <div className="mb-5">
//                                                         <input
//                                                             type="submit"
//                                                             value={isLoading ? "Sending..." : " Send Reset Link"}
//                                                             className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
//                                                             disabled={isLoading}
//                                                         />
//                                                     </div>


//                                                     <div className="mt-6 text-center">
//                                                         <p>
//                                                             Wait, I Remember My Password?{' '}
//                                                             <Link to="/" className="text-primary">
//                                                                 Click Here
//                                                             </Link>
//                                                         </p>

//                                                     </div>


//                                                 </form>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </main>

//                     </div>

//                 </div>

//             </div>
//         </>
//     );
// }
// export default ForgotPage;

// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { throwError } from "../../utility/errorHandler";

// const apiUrl = import.meta.env.VITE_API_URL;
// const forgotPass_URL = `${apiUrl}/api/v1/user`;

// const ForgotPage = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [message, setMessage] = useState({ text: '', type: '' });
//     const navigate = useNavigate();

//     const formik = useFormik({
//         initialValues: {
//             email: ''
//         },
//         validationSchema: Yup.object({
//             email: Yup.string()
//                 .email('Invalid email address')
//                 .required('Email is required')
//         }),
//         onSubmit: async (values) => {
//             setIsLoading(true);
//             setMessage({ text: '', type: '' });
            
//             try {
//                 console.log("Sending request to:", `${forgotPass_URL}/sendReSetLink`);
                
//                 const response = await fetch(`${forgotPass_URL}/sendReSetLink`, {
//                     method: 'POST',
//                     headers: { 
//                         'Content-Type': 'application/json',
//                         'Accept': 'application/json'
//                     },
//                     body: JSON.stringify({ email: values.email })
//                 });

//                 console.log("Response status:", response.status);
                
//                 const data = await response.json();
//                 console.log("Response data:", data);

//                 if (!response.ok) {
//                     // Use the error message from backend if available
//                     const errorMessage = data.error || data.message || 'Failed to send reset link';
//                     throwError(response.status, {
//                         400: errorMessage,
//                         401: 'Session expired. Please log in again.',
//                         500: data.error || 'Something went wrong on our end. Please try again later.',
//                     });
//                     throw new Error(errorMessage);
//                 }

//                 // Success case
//                 setMessage({ 
//                     text: data.message || 'If your email exists in our system, a reset link has been sent.', 
//                     type: 'success' 
//                 });
                
//                 // Reset form on success
//                 formik.resetForm();
                
//             } catch (error) {
//                 console.error('Full error details:', error);
//                 setMessage({ 
//                     text: error.message || 'An error occurred. Please try again.', 
//                     type: 'error' 
//                 });
//             } finally {
//                 setIsLoading(false);
//             }
//         },
//     });

//     return (
//         <div className="dark:bg-boxdark-2 dark:text-bodydark">
//             <div className="flex h-screen overflow-hidden">
//                 <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
//                     <main>
//                         <div className="mx-auto max-w-screen-sm px-4 md:px-16 py-2 2xl:px-16">
//                             <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//                                 <div className="flex flex-wrap items-center">
//                                     <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
//                                         <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
//                                             <h1 className="mb-4 text-2xl font-bold text-blue-500 dark:text-white sm:text-title-xl2">
//                                                 Uconnect
//                                             </h1>

//                                             <h2 className="mb-4 text-xl font-bold text-black dark:text-white">
//                                                 Forgot Password
//                                             </h2>
//                                             <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
//                                                 Reset Your Uconnect Password
//                                             </p>
//                                             <p className="mb-6 text-sm text-yellow-600 dark:text-yellow-400">
//                                                 Provide your email address, and instructions will be sent to you
//                                             </p>
                                            
//                                             {message.text && (
//                                                 <div className={`mb-4 p-3 rounded ${
//                                                     message.type === 'success' 
//                                                         ? 'bg-green-100 text-green-700 border border-green-300' 
//                                                         : 'bg-red-100 text-red-700 border border-red-300'
//                                                 }`}>
//                                                     {message.text}
//                                                 </div>
//                                             )}

//                                             <form onSubmit={formik.handleSubmit}>
//                                                 <div className="mb-4">
//                                                     <label className="mb-2.5 block font-medium text-black dark:text-white">
//                                                         Email
//                                                     </label>
//                                                     <div className="relative">
//                                                         <input
//                                                             name="email"
//                                                             type="email"
//                                                             placeholder="Enter your email"
//                                                             className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:bg-form-input dark:text-white dark:focus:border-primary ${
//                                                                 formik.touched.email && formik.errors.email 
//                                                                     ? 'border-red-500' 
//                                                                     : 'border-stroke dark:border-form-strokedark'
//                                                             }`}
//                                                             value={formik.values.email}
//                                                             onChange={formik.handleChange}
//                                                             onBlur={formik.handleBlur}
//                                                             disabled={isLoading}
//                                                         />
//                                                         <span className="absolute right-4 top-4">
//                                                             <svg
//                                                                 className="fill-current"
//                                                                 width="22"
//                                                                 height="22"
//                                                                 viewBox="0 0 22 22"
//                                                                 fill="none"
//                                                                 xmlns="http://www.w3.org/2000/svg"
//                                                             >
//                                                                 <g opacity="0.5">
//                                                                     <path
//                                                                         d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
//                                                                         fill=""
//                                                                     />
//                                                                 </g>
//                                                             </svg>
//                                                         </span>
//                                                     </div>
//                                                     {formik.touched.email && formik.errors.email ? (
//                                                         <p className="mt-1 text-red-500 text-sm">{formik.errors.email}</p>
//                                                     ) : null}
//                                                 </div>

//                                                 <div className="mb-5">
//                                                     <button
//                                                         type="submit"
//                                                         className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
//                                                         disabled={isLoading}
//                                                     >
//                                                         {isLoading ? "Sending..." : "Send Reset Link"}
//                                                     </button>
//                                                 </div>

//                                                 <div className="mt-6 text-center">
//                                                     <p>
//                                                         Remember your password?{' '}
//                                                         <Link to="/" className="text-primary hover:underline">
//                                                             Back to Login
//                                                         </Link>
//                                                     </p>
//                                                 </div>
//                                             </form>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </main>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ForgotPage;

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { throwError } from "../../utility/errorHandler";

// const apiUrl = import.meta.env.VITE_API_URL;
// const forgotPass_URL = `${apiUrl}/api/v1/user`;

// const ForgotPage = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: { email: "" },
//     validationSchema: Yup.object({
//       email: Yup.string()
//         .email("Invalid email address")
//         .required("Email is required"),
//     }),
//     onSubmit: async (values) => {
//       setIsLoading(true);
//       setMessage({ text: "", type: "" });

//       try {
//         console.log("Sending request to:", `${forgotPass_URL}/sendReSetLink`);

//         const response = await fetch(`${forgotPass_URL}/sendReSetLink`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//           body: JSON.stringify({ email: values.email }),
//         });

//         console.log("Response status:", response.status);

//         const data = await response.json();
//         console.log("Response data:", data);

//         if (!response.ok) {
//           const errorMessage =
//             data.error || data.message || "Failed to send reset link";
//           throwError(response.status, {
//             400: errorMessage,
//             401: "Session expired. Please log in again.",
//             500: data.error || "Something went wrong on our end. Please try again later.",
//           });
//           throw new Error(errorMessage);
//         }

//         setMessage({
//           text:
//             data.message ||
//             "If your email exists in our system, a reset link has been sent.",
//           type: "success",
//         });

//         formik.resetForm();
//       } catch (error) {
//         console.error("Full error details:", error);
//         setMessage({
//           text: error.message || "An error occurred. Please try again.",
//           type: "error",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     },
//   });

//   return (
    // <div className="dark:bg-boxdark-2 dark:text-bodydark">
    //   <div className="flex h-screen overflow-hidden">
    //     <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
    //       <main>
    //         <div className="mx-auto max-w-screen-sm px-4 md:px-16 py-2 2xl:px-16">
    //           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    //             <div className="flex flex-wrap items-center">
    //               <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
    //                 <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
    //                   <h1 className="mb-9 text-2xl font-bold text-blue-500 dark:text-white sm:text-title-xl2">
    //                     Uconnect
    //                   </h1>

    //                   <h1 className="mb-9 text-2xl font-bold text-blue-500 dark:text-white sm:text-title-xl2">
    //                     Forgot Password
    //                   </h1>

    //                   <p className="mb-9 text-xl font-bold text-slate-500 dark:text-white sm:text-title-sm">
    //                     Reset Your Uconnect Password
    //                   </p>

    //                   <p className="mb-9 text-2xl font-bold text-yellow-500 dark:text-white sm:text-title-sm">
    //                     Provide your email address, and instructions will be sent to you
    //                   </p>

    //                   {message.text && (
    //                     <p
    //                       className={`mt-4 text-center ${
    //                         message.type === "success"
    //                           ? "text-green-500"
    //                           : "text-red-500"
    //                       }`}
    //                     >
    //                       {message.text}
    //                     </p>
    //                   )}

    //                   <form onSubmit={formik.handleSubmit}>
    //                     <div className="mb-4">
    //                       <label className="mb-2.5 block font-medium text-black dark:text-white">
    //                         Email
    //                       </label>
    //                       <div className="relative">
    //                         <input
    //                           name="email"
    //                           type="email"
    //                           placeholder="Enter email"
    //                           className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:bg-form-input dark:text-white dark:focus:border-primary ${
    //                             formik.touched.email && formik.errors.email
    //                               ? "border-red-500"
    //                               : "border-stroke dark:border-form-strokedark"
    //                           }`}
    //                           value={formik.values.email}
    //                           onChange={formik.handleChange}
    //                           onBlur={formik.handleBlur}
    //                           disabled={isLoading}
    //                         />
    //                         {formik.touched.email && formik.errors.email ? (
    //                           <p className="mt-1 text-red-500 text-sm">
    //                             {formik.errors.email}
    //                           </p>
    //                         ) : null}

    //                         <span className="absolute right-4 top-4">
    //                           <svg
    //                             className="fill-current"
    //                             width="22"
    //                             height="22"
    //                             viewBox="0 0 22 22"
    //                             fill="none"
    //                             xmlns="http://www.w3.org/2000/svg"
    //                           >
    //                             <g opacity="0.5">
    //                               <path
    //                                 d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
    //                                 fill=""
    //                               />
    //                             </g>
    //                           </svg>
    //                         </span>
    //                       </div>
    //                     </div>

    //                     <div className="mb-5">
    //                       <button
    //                         type="submit"
    //                         className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
    //                         disabled={isLoading}
    //                       >
    //                         {isLoading ? "Sending..." : "Send Reset Link"}
    //                       </button>
    //                     </div>

    //                     <div className="mt-6 text-center">
    //                       <p>
    //                         Wait, I remember my password?{" "}
    //                         <Link to="/" className="text-primary hover:underline">
    //                           Click Here
    //                         </Link>
    //                       </p>
    //                     </div>
    //                   </form>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </main>
    //     </div>
    //   </div>
    // </div>
//   );
// };

// export default ForgotPage;
// ====================================>
 import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { throwError } from "../../utility/errorHandler";

const apiUrl = import.meta.env.VITE_API_URL;
const forgotPass_URL = `${apiUrl}/api/v1/user`;

const ForgotPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [emailSent, setEmailSent] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required')
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            setMessage({ text: '', type: '' });
            setEmailSent(false);
            
            try {
                console.log("Sending request to:", `${forgotPass_URL}/send-reset-link`);
                
                const response = await fetch(`${forgotPass_URL}/send-reset-link`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ email: values.email })
                });

                console.log("Response status:", response.status);
                
                const data = await response.json();
                console.log("Response data:", data);

                if (!response.ok) {
                    const errorMessage = data.error || data.message || 'Failed to send reset link';
                    throwError(response.status, {
                        400: errorMessage,
                        401: 'Session expired. Please log in again.',
                        500: data.error || 'Something went wrong on our end. Please try again later.',
                    });
                    throw new Error(errorMessage);
                }

                // Success case
                setMessage({ 
                    text: data.message || 'If your email exists in our system, a reset link has been sent to your email.', 
                    type: 'success' 
                });
                setEmailSent(true);
                
                // Reset form on success
                formik.resetForm();
                
            } catch (error) {
                console.error('Full error details:', error);
                setMessage({ 
                    text: error.message || 'An error occurred. Please try again.', 
                    type: 'error' 
                });
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <div className="flex h-screen overflow-hidden">
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <main>
                        <div className="mx-auto max-w-screen-sm px-4 md:px-16 py-2 2xl:px-16">
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="flex flex-wrap items-center">
                                    <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
                                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                                            {/* <h1 className="mb-4 text-2xl font-bold text-blue-500 dark:text-white sm:text-title-xl2">
                                                Digi_card
                                            </h1>

                                            <h2 className="mb-4 text-xl font-bold text-black dark:text-white">
                                                Forgot Password
                                            </h2>
                                            
                                            {!emailSent ? (
                                                <>
                                                    <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
                                                        Reset Your Digi_card Password
                                                    </p>
                                                    <p className="mb-6 text-sm text-yellow-600 dark:text-yellow-400">
                                                        Provide your email address, and we'll send you a reset link
                                                    </p>
                                                     */}
                                                     <h1 className="mb-9 text-2xl font-bold text-blue-500 dark:text-white sm:text-title-xl2">
                                                Digi_card
                                            </h1>

                                            <h1 className="mb-9 text-xl font-bold text-black dark:text-white">
                                                Forgot Password
                                            </h1>
                                            
                                            {!emailSent ? (
                                                <>
                                                    <p className="mb-9 text-xl font-bold text-slate-500 dark:text-white sm:text-title-sm">
                                                        Reset Your Digi_card Password
                                                    </p>
                                                    <p className="mb-9 text-2xl text-yellow-500 dark:text-white- sm:text-title-sm">
                                                        Provide your email address, and we'll send you a reset link
                                                    </p>
                                                    
                                                    {message.text && (
                                                        <div className={`mb-4 p-3 rounded ${
                                                            message.type === 'success' 
                                                                ? 'bg-green-100 text-green-700 border border-green-300' 
                                                                : 'bg-red-100 text-red-700 border border-red-300'
                                                        }`}>
                                                            {message.text}
                                                        </div>
                                                    )}

                                                    <form onSubmit={formik.handleSubmit}>
                                                        <div className="mb-4">
                                                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                                                Email
                                                            </label>
                                                            <div className="relative">
                                                                <input
                                                                    name="email"
                                                                    type="email"
                                                                    placeholder="Enter your email"
                                                                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:bg-form-input dark:text-white dark:focus:border-primary ${
                                                                        formik.touched.email && formik.errors.email 
                                                                            ? 'border-red-500' 
                                                                            : 'border-stroke dark:border-form-strokedark'
                                                                    }`}
                                                                    value={formik.values.email}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    disabled={isLoading}
                                                                />
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
                                                            {formik.touched.email && formik.errors.email ? (
                                                                <p className="mt-1 text-red-500 text-sm">{formik.errors.email}</p>
                                                            ) : null}
                                                        </div>

                                                        <div className="mb-5">
                                                            <button
                                                                type="submit"
                                                                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                disabled={isLoading}
                                                            >
                                                                {isLoading ? "Sending..." : "Send Reset Link"}
                                                            </button>
                                                        </div>
                                                    </form>
                                                </>
                                            ) : (
                                                <div className="text-center">
                                                    <div className="mb-4 text-green-500">
                                                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                    </div>
                                                    <h3 className="mb-4 text-xl font-bold text-green-600">Check Your Email</h3>
                                                    <p className="mb-4 text-gray-600">
                                                        We've sent a password reset link to your email address.
                                                    </p>
                                                    <p className="mb-4 text-sm text-gray-500">
                                                        The link will expire in 1 hour.
                                                    </p>
                                                    <button
                                                        onClick={() => setEmailSent(false)}
                                                        className="text-primary hover:underline"
                                                    >
                                                        Send another reset link
                                                    </button>
                                                </div>
                                            )}

                                            <div className="mt-6 text-center">
                                                <p>
                                                    Remember your password?{' '}
                                                    <Link to="/signin" className="text-primary hover:underline">
                                                        Back to Login
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default ForgotPage;

