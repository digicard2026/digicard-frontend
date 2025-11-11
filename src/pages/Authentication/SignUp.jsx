// import React from 'react';
// import { Link } from 'react-router-dom';
// import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
// import LogoDark from '../../images/logo/logo-dark.svg';
// import Logo from '../../images/logo/logo.svg';
// import { register } from '../../service/userApi';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { validationSchemaFactory } from './validationSchemaFactory';
// import { signUpFields } from './signUpFields';
// import icons from './svgIconsSignUpFields';
// import { LuEyeOff,LuEye } from 'react-icons/lu';


// const SignUp = () => {
//   const [message, setMessage] = useState({ text: '', type: '' }); // { text: 'Message text', type: 'success' or 'error' }
//   // Generate the validation schema using the factory
//   const [showPassword, setShowPassword] = useState(false);
//   const validationSchema = validationSchemaFactory(signUpFields);
//   const navigate = useNavigate();

  
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
// };


//   const formik = useFormik({
//     initialValues: {
//       first_name: '',
//       phone_number: '',
//       email: '',
//       password: '',
//       confirm_password: ''
//     },
//     validationSchema: validationSchema,  // Use the dynamically generated schema
//     onSubmit: async (values) => {
//       // setIsLoading(true);
//       try {
//         const { response, data } = await register(values);
//         if (response.ok) {
//           setMessage({ text: 'Registeration  successful!', type: 'success' });
//           navigate('/auth/EmailRegistration', { state: { email: values.email } });
//         } else {
//           setMessage({ text: data.message, type: 'error' });
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
//       }
//       finally {
//         // setIsLoading(false);
//       }
//     },
//   });

//   return (
//     <>

//       <div className="dark:bg-boxdark-2 dark:text-bodydark">
//         <div className="flex h-screen overflow-hidden">
//           <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

//             <main>
//               {/* <div className="mx-auto  max-w-screen-2xl px-10 md:px-40 py-1 2xl:px- 40"> */}
//               <div className="mx-auto max-w-screen-sm px-4 md:px-16 py-2 2xl:px-16">

//                 <div className="rounded-sm border  border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
//                   <div className="flex flex-wrap items-center">


//                     <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
//                       <div className="w-full p-4 sm:p-1.5 xl:p-17.5">

//                         <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
//                           Sign Up to UConnect
//                         </h2>
//                         {message.text && (
//                           <p className={`mt-4 text-center ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
//                             {message.text}
//                           </p>
//                         )}
//                         <form onSubmit={formik.handleSubmit}>
//                           <div className="mb-4">
//                             <label className="mb-2.5 block font-medium text-black dark:text-white">
//                               Enter Your Name
//                             </label>
//                             <div className="relative">
//                               <input
//                                 type="first_name"
//                                 placeholder="Enter your full name"
//                                 className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                 {...formik.getFieldProps('first_name')}
//                               />
//                               {formik.touched.first_name && formik.errors.first_name ? (
//                                 <p className="text-red-500">{formik.errors.first_name}</p>
//                               ) : null}

//                               <span className="absolute right-4 top-4">
//                                 {icons["name"]}
//                               </span>
//                             </div>
//                           </div>
//                           <div className="mb-4">
//                             <label className="mb-2.5 block font-medium text-black dark:text-white">
//                               Email
//                             </label>
//                             <div className="relative">
//                               <input
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                 {...formik.getFieldProps('email')}
//                               />
//                               {formik.touched.email && formik.errors.email ? (
//                                 <p className="text-red-500">{formik.errors.email}</p>
//                               ) : null}
//                               <span className="absolute right-4 top-4">
//                                 {icons["email"]}
//                               </span>
//                             </div>
//                           </div>
//                           <div className="mb-4">
//                             <label className="mb-2.5 block font-medium text-black dark:text-white">
//                               Mobile Number
//                             </label>
//                             <div className="relative">
//                               <input
//                                 type="phone_number"
//                                 placeholder="Enter your Mobile"
//                                 className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                 {...formik.getFieldProps('phone_number')}
//                               />
//                               {formik.touched.phone_number && formik.errors.phone_number ? (
//                                 <p className="text-red-500">{formik.errors.phone_number}</p>
//                               ) : null}
//                               <span className="absolute right-4 top-4">
//                                 {icons["mobile"]}
//                               </span>
//                             </div>
//                           </div>
//                           <div className="mb-4">
//                             <label className="mb-2.5 block font-medium text-black dark:text-white">
//                               Company Name
//                             </label>
//                             <div className="relative">
//                               <input
//                                 type="company_name"
//                                 placeholder="Enter Company Name"
//                                 className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                 {...formik.getFieldProps('company_name')}
//                               />
//                               {formik.touched.phone_number && formik.errors.company_name ? (
//                                 <p className="text-red-500">{formik.errors.company_name}</p>
//                               ) : null}
//                               <span className="absolute right-4 top-4">
//                                 {icons["email"]}
//                               </span>
//                             </div>
//                           </div>
//                           <div className="mb-4">
//                             <label className="mb-2.5 block font-medium text-black dark:text-white">
//                               Address
//                             </label>
//                             <div className="relative">
//                               <input
//                                 type="address"
//                                 placeholder="Enter your Address"
//                                 className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                 {...formik.getFieldProps('address')}
//                               />
//                               {formik.touched.phone_number && formik.errors.address ? (
//                                 <p className="text-red-500">{formik.errors.address}</p>
//                               ) : null}
//                               <span className="absolute right-4 top-4">
//                                 {icons["address"]}
//                               </span>
//                             </div>
//                           </div>

//                           <div className="mb-4">
//                             <label className="mb-2.5 block font-medium text-black dark:text-white">
//                               Landline number
//                             </label>
//                             <div className="relative">
//                               <input
//                                 type="landline_number"
//                                 placeholder="Enter Landline Number"
//                                 className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                 {...formik.getFieldProps('landline_number')}
//                               />
//                               {formik.touched.phone_number && formik.errors.landline_number ? (
//                                 <p className="text-red-500">{formik.errors.landline_number}</p>
//                               ) : null}
//                               <span className="absolute right-4 top-4">
//                                 {icons["landLine"]}
//                               </span>
//                             </div>
//                           </div>


//                           <div className="mb-4">
//                             <label className="mb-2.5 block font-medium text-black dark:text-white">
//                               Password
//                             </label>
//                             <div className="relative">
//                               <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 placeholder="Enter your password"
//                                 className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                 {...formik.getFieldProps('password')}
//                               />
//                               {formik.touched.password && formik.errors.password ? (
//                                 <p className="text-red-500">{formik.errors.password}</p>
//                               ) : null}
//                               <span className="absolute right-4 top-4">
//                               <button
//                               type="button"
//                               onClick={togglePasswordVisibility}
//                               className=" text-slate-600 hover:text-slate-700  "
//                             >
//                              {showPassword ? <LuEyeOff size={23} strokeWidth={1.5}/> : <LuEye size={23} strokeWidth={1.5} />}
//                             </button>
                                

//                               </span>
//                             </div>
//                           </div>

//                           <div className="mb-6">
//                             <label className="mb-2.5 block font-medium text-black dark:text-white">
//                               Confirm  Password
//                             </label>
//                             <div className="relative">
//                               <input
//                                 type="confirm_password"
//                                 placeholder="Enter confirm password"
//                                 className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                 {...formik.getFieldProps('confirm_password')}
//                               />
//                               {formik.touched.confirm_password && formik.errors.confirm_password ? (
//                                 <p className="text-red-500">{formik.errors.confirm_password}</p>
//                               ) : null}
//                               <span className="absolute right-4 top-4">
//                                 {icons["password"]}
//                               </span>
//                             </div>
//                           </div>

//                           <div className="mb-5">
//                             <input
//                               type="submit"
//                               value="Create account"
//                               className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
//                             />
//                           </div>
//                           <div className="mt-6 text-center">
//                             <p>
//                               Already have an account?{' '}
//                               <Link to="/" className="text-primary">
//                                 Sign in
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

// export default SignUp;
// +++++++++++++++++++++++++++
// import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [isRegistered, setIsRegistered] = useState(false); // <-- new state


//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .email("Invalid email format")
//       .required("Email is required"),
//     password: Yup.string()
//       .min(8, "Password must be at least 8 characters")
//       .matches(/[A-Z]/, "Must include at least one uppercase letter")
//       .matches(/[a-z]/, "Must include at least one lowercase letter")
//       .matches(/\d/, "Must include at least one number")
//       .matches(
//         /[!@#$%^&*(),.?\":{}|<>]/,
//         "Must include at least one special character"
//       )
//       .required("Password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password"), null], "Passwords must match")
//       .required("Confirm Password is required"),
//   });


//   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//     try {
//       const res = await fetch("http://localhost:3000/api/v1/user/sign-up", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: values.email,
//           password: values.password,
//           confirmPassword: values.confirmPassword,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
     
//         setIsRegistered(true);
//         resetForm();
//       } else {
//         alert(data.error || "Signup failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Signup error:", error);
//       alert("Something went wrong. Please try again later.");
//     } finally {
//       setSubmitting(false);
//     }
//   };


//   if (isRegistered) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="bg-white p-10 rounded-2xl shadow-lg text-center w-full max-w-md">
//           <h2 className="text-3xl font-bold text-green-600 mb-4">
//             🎉 Account Created Successfully!
//           </h2>
//           <p className="text-gray-700 mb-8">
//             Your account has been created successfully. You can now sign in to continue.
//           </p>
//           <button
//             onClick={() => navigate("/signin/franchise")}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
//           >
//             Sign In
//           </button>
//         </div>
//       </div>
//     );
//   }


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           Create Your Account
//         </h2>

//         <Formik
//           initialValues={{ email: "", password: "", confirmPassword: "" }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-1">
//                   Email ID
//                 </label>
//                 <Field
//                   type="email"
//                   name="email"
//                   placeholder="Enter your email"
//                   className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-1">
//                   Password
//                 </label>
//                 <Field
//                   type="password"
//                   name="password"
//                   placeholder="Enter your password"
//                   className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />
//               </div>

//               <div className="mb-6">
//                 <label className="block text-gray-700 font-medium mb-1">
//                   Confirm Password
//                 </label>
//                 <Field
//                   type="password"
//                   name="confirmPassword"
//                   placeholder="Re-enter your password"
//                   className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <ErrorMessage
//                   name="confirmPassword"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
//               >
//                 {isSubmitting ? "Registering..." : "Sign Up"}
//               </button>

//               <p className="text-center text-gray-600 mt-4">
//                 Already have an account?{" "}
//                 <span
//                   onClick={() => navigate("/signin/franchise")}
//                   className="text-blue-600 font-semibold cursor-pointer hover:underline"
//                 >
//                   Sign in
//                 </span>
//               </p>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default Signup;





// Signup.jsx - UPDATED
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRegistered, setIsRegistered] = useState(false);
  const [franchiseContext, setFranchiseContext] = useState(null);

  // ✅ Check if franchise is creating a partner
  useEffect(() => {
    if (location.state?.franchiseContext) {
      setFranchiseContext({
        createdBy: location.state.createdBy,
        franchiseName: location.state.franchiseName
      });
    }
  }, [location.state]);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/user/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          // ✅ Include franchise context if available
          createdBy: franchiseContext?.createdBy,
          role: franchiseContext ? 'partner' : '' // Auto-set role for franchise-created partners
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Store user ID and franchise context
        if (data.data && data.data._id) {
          localStorage.setItem('user_id', data.data._id);
          localStorage.setItem('user_email', values.email);
          
          // ✅ If franchise created this partner, store franchise info too
          if (franchiseContext) {
            localStorage.setItem('franchise_created_by', franchiseContext.createdBy);
          }
        }
        
        setIsRegistered(true);
        resetForm();
      } else {
        alert(data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Different success message for franchise-created partners
  if (isRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center w-full max-w-md">
          {franchiseContext ? (
            // Franchise-created partner success
            <>
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                ✅ Partner Account Created!
              </h2>
              <p className="text-gray-700 mb-4">
                Partner account has been created successfully.
              </p>
              <p className="text-gray-600 mb-6 text-sm">
                Now complete the partner business profile.
              </p>
              <button
                onClick={() => navigate("/signin/franchise")}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Complete Partner Profile
              </button>
            </>
          ) : (
            // Regular user success
            <>
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                🎉 Account Created Successfully!
              </h2>
              <p className="text-gray-700 mb-8">
                Your account has been created successfully.
              </p>
              <button
                onClick={() => navigate("/signin/franchise")}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Continue to Registration
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* ✅ Show franchise context banner */}
        {franchiseContext && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="text-blue-800 font-semibold">Creating Partner Account</p>
                <p className="text-blue-600 text-sm">This account will be linked to your franchise</p>
              </div>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {franchiseContext ? "Create Partner Account" : "Create Your Account"}
        </h2>

        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Email ID
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter partner's email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Create password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-1">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>

              {!franchiseContext && (
                <p className="text-center text-gray-600 mt-4">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/signin/franchise")}
                    className="text-blue-600 font-semibold cursor-pointer hover:underline"
                  >
                    Sign in
                  </span>
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
