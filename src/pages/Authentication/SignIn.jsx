import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppleIcon, Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

// blue components from your assets
import ModernImage from "../../assets/images/tailwickComp/ModernImage";
import Modern from "../../assets/images/tailwickComp/Modern";

// Your blue services and utilities
import { verifyUser, resendVerificationEmail } from "../../service/userApi";
import { setRole } from "../../store/RoleStore/roleSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showResend, setShowResend] = useState(false);

  // Formik for login
  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: '',
    },
    validationSchema: Yup.object({
      identifier: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      await handleLogin(values);
    },
  });

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setMessage({ text: '', type: '' });
    setShowResend(false);
    
    try {
      // Prepare data for API call
      const loginData = {
        email: credentials.identifier,
        password: credentials.password
      };
      
      const { response, data } = await verifyUser(loginData);
      
      if (response.ok) {
        setMessage({ text: 'Login successful!', type: 'success' });
        
        // Show success alert
        const successAlert = document.getElementById('successAlert');
        if (successAlert) {
          successAlert.classList.remove('hidden');
        }
        
        dispatch(setRole(data.role));
        // Store user info in localStorage
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('user_email', loginData.email);
        localStorage.setItem('user_role', data.role);
        
        // Navigate based on role
        setTimeout(() => {
          if (data.role === 'customer') {
            navigate('/card-dashbord', { 
              state: { 
                userEmail: loginData.email
              } 
            });
          } else if (data.role === 'admin') {
            navigate('/admin-dashboard');
          } else {
            // Default navigation if role not specified
            navigate('/card-dashbord');
          }
        }, 1000);
        
      } else {
        // Always show resend button on login failure
        setMessage({ text: data.message || 'Login failed. Your email might not be verified.', type: 'error' });
        setShowResend(true);
        
        const successAlert = document.getElementById('successAlert');
        if (successAlert) {
          successAlert.classList.add('hidden');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
      setShowResend(true);
      
      const successAlert = document.getElementById('successAlert');
      if (successAlert) {
        successAlert.classList.add('hidden');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    try {
      setIsLoading(true);
      const email = formik.values.identifier;

      if (!email) {
        setMessage({ text: "Please enter your email first.", type: "error" });
        return;
      }

      const { response, data } = await resendVerificationEmail(email);

      if (response.ok) {
        setMessage({
          text: "Verification email sent successfully. Please check your inbox.",
          type: "success",
        });
        setShowResend(false);
      } else {
        setMessage({
          text: data.message || "Failed to resend verification email.",
          type: "error",
        });
        setShowResend(true);
      }
    } catch (error) {
      console.error(error);
      setMessage({
        text: "Something went wrong while resending the email.",
        type: "error",
      });
      setShowResend(true);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const bodyElement = document.body;
    bodyElement.classList.add('font-public');
    document.title = "Sign In | Digi_card";

    return () => {
      bodyElement.classList.remove('font-public');
    }
  }, []);

  return (
    <React.Fragment>
      {/* Blue overlay background */}
      <div className="absolute inset-0 bg-blue-900 z-0"></div>
      
      <div className="relative flex flex-col w-full overflow-hidden xl:flex-row to-blue-800 bg-gradient-to-r from-blue-900 dark:to-blue-900 dark:from-blue-950">
        <ModernImage />
        <div className="min-h-[calc(100vh_-_theme('spacing.4')_*_2)] mx-3 lg:w-[40rem] shrink-0 px-6 py-6 flex items-center justify-center m-4 bg-white dark:bg-zinc-800 rounded z-10 relative dark:text-zinc-100 md:mx-auto xl:mx-4 dark:border-zinc-700 shadow-md">
          <div className="flex flex-col w-full h-full justify-center">
            <div className="w-full max-w-sm mx-auto mt-20">
              {/* Header */}
              <div className="text-center mb-10">
                <h1 className="text-2xl font-bold text-black dark:text-white">Sign In</h1>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-6 " id="signInForm">
                <div id="successAlert" className={`hidden p-1 mb-3 text-s text-blue-600 rounded-lg bg-slate-100 dark:bg-slate-500/20 dark:border-slate-500/50 dark:text-black`}>
                  You have <b>successfully</b> signed in.
                </div>
                
                {message.text && message.type === 'error' && (
                  <div className="p-3 mb-3 text-xs text-red-800 border border-red-300 rounded-lg bg-red-100 dark:bg-red-500/20 dark:border-red-500/50 dark:text-red-400">
                    {message.text}
                  </div>
                )}
                
                {message.text && message.type === 'success' && (
                  <div className="p-3 mb-3 text-xs text-blue-800 border border-blue-300 rounded-lg bg-blue-100 dark:bg-blue-500/20 dark:border-blue-500/50 dark:text-blue-400">
                    {message.text}
                  </div>
                )}
                
                {/* Resend Verification Button */}
                {showResend && (
                  <div className="mt-2 text-center">
                    <p className="text-xs text-slate-600 dark:text-zinc-300 mb-2">
                      If your email is not verified or the link has expired, you can resend it.
                    </p>
                    <button
                      type="button"
                      onClick={handleResendEmail}
                      disabled={isLoading}
                      className="w-full py-2 text-sm font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 active:bg-orange-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      {isLoading ? "Resending..." : "Resend Verification Email"}
                    </button>
                  </div>
                )}
                
                {/* Email field */}
                <div className="space-y-3">
                  <label htmlFor="identifier" className="block text-sm font-semibold text-black dark:text-white">
                    Username/ Email ID
                  </label>
                  <input
                    type="text"
                    id="identifier"
                    name="identifier"
                    className={`w-full px-4 py-2 text-sm  dark:bg-zinc-700 rounded-md focus:outline-none  focus:border-blue-600  border border-slate-300 dark:border-zinc-800 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:text-slate-500 dark:disabled:text-zinc-300 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-400 ${formik.touched.identifier && formik.errors.identifier ? 'focus:ring-red-400 focus:shadow-red-300' : ''}`}
                    placeholder="Enter Username or email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.identifier}
                    disabled={isLoading}
                  />
                  {formik.touched.identifier && formik.errors.identifier && (
                    <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.identifier}</div>
                  )}
                </div>
                
                {/* Password field */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-semibold text-black dark:text-white">
                      Password
                    </label>
                    <Link to="/forgot" className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                      Forgot Password ?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className={`w-full px-4 py-2 text-sm  dark:bg-zinc-700 rounded-md focus:outline-none  focus:border-blue-600  disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:text-slate-500 border border-slate-300 dark:border-zinc-600 dark:disabled:text-zinc-300 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-400 pr-10 ${formik.touched.password && formik.errors.password ? 'focus:ring-red-400 focus:shadow-red-300' : ''}`}
                      placeholder="Enter Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors p-1"
                      onClick={togglePasswordVisibility}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.password}</div>
                  )}
                </div>
                
                {/* Remember Me checkbox */}
                <div className="flex items-center gap-2 ">
                  <input
                    id="rememberMe"
                    className="size-3 border border-slate-300 rounded focus:ring-1 focus:ring-slate-400 checked:bg-blue-600 checked:border-blue-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:border-zinc-500"
                    type="checkbox"
                    disabled={isLoading}
                  />
                  <label htmlFor="rememberMe" className="text-sm font-medium text-black dark:text-white cursor-pointer">
                    Remember Me
                  </label>
                </div>
                
                {/* Sign In button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 text-sm font-normal text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 active:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg mt-8"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Signing In...
                    </div>
                  ) : "Sign In"}
                </button>
              </form>
              <div className="relative text-center my-8 before:absolute before:top-3 before:left-0 before:right-0 before:border-t before:border-slate-200 dark:before:border-slate-600">
              <span className="inline-block px-4 py-0.5 text-sm font-medium bg-white text-slate-500 dark:bg-slate-800 dark:text-slate-400 relative z-10">
                Sign In with
              </span>
            </div>

            {/* Google & Apple Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors bg-white dark:bg-slate-800">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Google</span>
              </button>

              <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors bg-white dark:bg-slate-800">
                {/* <svg className="w-5 h-5 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.56-2.07-.53-3.15 0-1.09.56-2.2.66-3.13-.25-4.17-4.1-3.47-11.23 1.69-11.45 1.34.06 2.22.75 2.97.75.69 0 1.84-.81 3.19-.69 2.15.19 3.25 1.25 3.91 2.31-3.69 2.25-2.91 7.75 1.13 9.44-.72 1.94-1.81 3.56-3.53 5.34v-.03zM12.03 7.25c-.16-2.53 2.03-4.75 4.53-5 0 2.66-2.38 4.88-4.53 5z"/>
                </svg> */}
<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 384 512"><path d="M319.1 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7-55.8 .9-115.1 44.5-115.1 133.2 0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM262.5 104.5c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>             <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Apple</span>
              </button>
            </div>

              {/* Home link */}
              <div className="text-center pt-8 mt-2">
                <p className="text-slate-700 dark:text-zinc-300 text-sm">
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
    </React.Fragment>
  );
}

export default SignIn;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Eye, EyeOff, Facebook, Mail, Twitter, Github } from "lucide-react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useDispatch } from "react-redux";

// // Custom components
// import ModernImage from "../../assets/images/tailwickComp/ModernImage";
// import Modern from "../../assets/images/tailwickComp/Modern";

// // Services
// import { verifyUser } from "../../service/userApi";
// import { setRole } from "../../store/Rolestore/roleSlice";

// const SignIn = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   // Formik Logic
//   const formik = useFormik({
//     initialValues: {
//       identifier: '',
//       password: '',
//     },
//     validationSchema: Yup.object({
//       identifier: Yup.string().email('Invalid email address').required('Email is required'),
//       password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
//     }),
//     onSubmit: async (values) => {
//       await handleLogin(values);
//     },
//   });

//   const handleLogin = async (credentials) => {
//     setIsLoading(true);
//     setMessage({ text: '', type: '' });
    
//     try {
//       const loginData = { email: credentials.identifier, password: credentials.password };
//       const { response, data } = await verifyUser(loginData);
      
//       if (response.ok) {
//         setMessage({ text: 'Login successful!', type: 'success' });
//         dispatch(setRole(data.role));
//         localStorage.setItem('user_id', data.user_id);
//         localStorage.setItem('user_email', loginData.email);
//         localStorage.setItem('user_role', data.role);
        
//         setTimeout(() => {
//           if (data.role === 'customer') navigate('/card-dashbord', { state: { userEmail: loginData.email } });
//           else if (data.role === 'admin') navigate('/admin-dashboard');
//           else navigate('/card-dashbord');
//         }, 1000);
//       } else {
//         setMessage({ text: data.message || 'Login failed', type: 'error' });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     document.title = "Sign In | Digi_card";
//     document.body.classList.add('font-public');
//     return () => {
//       document.body.classList.remove('font-public');
//     }
//   }, []);

//   return (
//     <React.Fragment>
//       <div className="relative flex flex-col w-full overflow-hidden xl:flex-row bg-gradient-to-r from-blue-900 to-blue-800 dark:to-slate-900 dark:from-slate-950">
        
//         {/* Left Side Image */}
//         <ModernImage />

//         {/* Right Side Form Container - Exact Ref Dimensions (lg:w-[40rem], px-10 py-14) */}
//         <div className="min-h-[calc(100vh_-_theme('spacing.4')_*_2)] mx-3 lg:w-[40rem] shrink-0 px-10 py-14 flex items-center justify-center m-4 bg-white rounded z-10 relative dark:bg-slate-700 dark:text-slate-100 md:mx-auto xl:mx-4">
//           <div className="flex flex-col h-full">
            
//             {/* Header - Improved Meaningful Text & Padding */}
//             <div className="text-center mb-10 mt-4">
//                <h5 className="text-2xl font-bold text-slate-800 dark:text-white">Login to your Account</h5>
//                <p className="text-slate-500 dark:text-slate-400 mt-2">Get in touch with your digital identity.</p>
//             </div>

//             {/* Alert Messages */}
//             {message.text && (
//               <div className={`p-3 mb-6 text-sm rounded-md border ${
//                 message.type === 'success' 
//                   ? 'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400' 
//                   : 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
//               }`}>
//                 {message.text}
//               </div>
//             )}

//             {/* Form */}
//             <form onSubmit={formik.handleSubmit} className="mt-4">
              
//               {/* Email Input */}
//               <div className="mb-4">
//                 <label htmlFor="identifier" className="inline-block mb-2 text-base font-medium text-slate-700 dark:text-slate-200">
//                   Username / Email ID
//                 </label>
//                 <input
//                   type="text"
//                   id="identifier"
//                   name="identifier"
//                   className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 disabled:bg-slate-100 dark:disabled:bg-slate-600 disabled:border-slate-300 dark:disabled:border-slate-500 dark:disabled:text-slate-200 disabled:text-slate-500 dark:text-slate-100 dark:bg-slate-700 dark:focus:border-blue-800 placeholder:text-slate-400 dark:placeholder:text-slate-200 ${
//                     formik.touched.identifier && formik.errors.identifier ? 'border-red-500' : 'border-slate-200 dark:border-slate-500'
//                   }`}
//                   placeholder="Enter username or email"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.identifier}
//                   disabled={isLoading}
//                 />
//                 {formik.touched.identifier && formik.errors.identifier && (
//                   <div className="mt-1 text-sm text-red-500">{formik.errors.identifier}</div>
//                 )}
//               </div>

//               {/* Password Input */}
//               <div className="mb-4">
//                 <label htmlFor="password" className="inline-block mb-2 text-base font-medium text-slate-700 dark:text-slate-200">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     name="password"
//                     className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 disabled:bg-slate-100 dark:disabled:bg-slate-600 disabled:border-slate-300 dark:disabled:border-slate-500 dark:disabled:text-slate-200 disabled:text-slate-500 dark:text-slate-100 dark:bg-slate-700 dark:focus:border-blue-800 placeholder:text-slate-400 dark:placeholder:text-slate-200 pr-10 ${
//                       formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-slate-200 dark:border-slate-500'
//                     }`}
//                     placeholder="Enter password"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.password}
//                     disabled={isLoading}
//                   />
//                   <button
//                     type="button"
//                     className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//                 {formik.touched.password && formik.errors.password && (
//                   <div className="mt-1 text-sm text-red-500">{formik.errors.password}</div>
//                 )}
//               </div>

//               {/* Remember Me & Forgot Password */}
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center gap-2">
//                   <input
//                     id="rememberMe"
//                     type="checkbox"
//                     className="size-4 border rounded-sm appearance-none bg-slate-100 border-slate-200 dark:bg-slate-600 dark:border-slate-500 checked:bg-blue-500 checked:border-blue-500 dark:checked:bg-blue-500 dark:checked:border-blue-500"
//                   />
//                   <label htmlFor="rememberMe" className="inline-block text-base font-medium align-middle cursor-pointer text-slate-700 dark:text-slate-200">
//                     Remember me
//                   </label>
//                 </div>
//                 <div id="remember-error" className="hidden mt-1 text-sm text-red-500">Please check the "Remember me" before submitting the form.</div>
//               </div>

//               {/* Submit Button */}
//               <div className="mt-8">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full py-2 px-4 text-base font-medium text-white uppercase transition-all duration-200 ease-linear rounded-md bg-blue-500 border border-blue-500 hover:bg-blue-600 hover:border-blue-600 focus:ring focus:ring-blue-100 disabled:opacity-70 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? 'Signing In...' : 'Sign In'}
//                 </button>
//               </div>
//             </form>

//             {/* Social Divider */}
//             <div className="relative text-center my-9 before:absolute before:top-3 before:left-0 before:right-0 before:border-t before:border-slate-200 dark:before:border-slate-500">
//               <span className="inline-block px-4 py-0.5 text-sm font-medium bg-white text-slate-500 dark:bg-slate-700 dark:text-slate-200 rounded relative">
//                 Sign In with
//               </span>
//             </div>

//             {/* 4 Login Options (Square Buttons) */}
//             <div className="flex flex-wrap justify-center gap-2">
//               {/* Facebook */}
//               <button type="button" className="flex items-center justify-center size-[37.5px] transition-all duration-200 ease-linear p-0 text-blue-500 btn bg-blue-100 border-blue-100 hover:text-white hover:bg-blue-600 hover:border-blue-600 focus:text-white focus:bg-blue-600 focus:border-blue-600 active:text-white active:bg-blue-600 active:border-blue-600 rounded">
//                 <Facebook className="size-4" />
//               </button>

//               {/* Google (Mail Icon) */}
//               <button type="button" className="flex items-center justify-center size-[37.5px] transition-all duration-200 ease-linear p-0 text-orange-500 btn bg-orange-100 border-orange-100 hover:text-white hover:bg-orange-600 hover:border-orange-600 focus:text-white focus:bg-orange-600 focus:border-orange-600 active:text-white active:bg-orange-600 active:border-orange-600 rounded">
//                 <Mail className="size-4" />
//               </button>

//               {/* Twitter */}
//               <button type="button" className="flex items-center justify-center size-[37.5px] transition-all duration-200 ease-linear p-0 text-sky-500 btn bg-sky-100 border-sky-100 hover:text-white hover:bg-sky-600 hover:border-sky-600 focus:text-white focus:bg-sky-600 focus:border-sky-600 active:text-white active:bg-sky-600 active:border-sky-600 rounded">
//                 <Twitter className="size-4" />
//               </button>

//               {/* Apple (Using Github as placeholder/style) */}
//               <button type="button" className="flex items-center justify-center size-[37.5px] transition-all duration-200 ease-linear p-0 text-slate-500 btn bg-slate-200 border-slate-200 hover:text-white hover:bg-slate-600 hover:border-slate-600 focus:text-white focus:bg-slate-600 focus:border-slate-600 active:text-white active:bg-slate-600 active:border-slate-600 rounded">
//                 <Github className="size-4" />
//               </button>
//             </div>

//             {/* Footer */}
//             <div className="mt-10 text-center">
//               <p className="mb-0 text-slate-500 dark:text-slate-200">
//                 Don't have an account?{" "}
//                 <Link to="/signup" className="font-semibold underline transition-all duration-150 ease-linear text-slate-500 dark:text-slate-200 hover:text-blue-500">
//                   SignUp
//                 </Link>
//               </p>
//             </div>

//             <div className="mt-5 text-center">
//               <p className="mb-0 text-[15px] text-slate-500 dark:text-slate-200">
//                 © {new Date().getFullYear()} Revayah One. Crafted with <i className="text-red-500 ri-heart-fill">♥</i> by Themesdesign
//               </p>
//             </div>

//           </div>
//         </div>
        
//         <Modern />
//       </div>
//     </React.Fragment>
//   );
// }

// export default SignIn;