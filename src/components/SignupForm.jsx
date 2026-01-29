// // SignupForm.js - Exact dimensions for modal
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Eye, EyeOff, X } from "lucide-react";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const API_URL = import.meta.env.VITE_API_URL;

// const SignupForm = ({ 
//   isFranchiseContext = false,
//   createdBy = null,
//   franchiseName = '',
//   selectedPlan = null,
//   onSuccess = null,
//   onCancel = null,
//   isModal = false,
//   showModalHeader = false
// }) => {
//   const [emailSent, setEmailSent] = useState(false);
//   const [userEmail, setUserEmail] = useState("");
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Formik for signup
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//       confirmPassword: '',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string()
//         .email('Invalid email address')
//         .required('Email is required'),
//       password: Yup.string()
//         .min(8, 'Password must be at least 8 characters')
//         .required('Password is required'),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref('password'), null], 'Passwords must match')
//         .required('Confirm Password is required'),
//     }),
//     onSubmit: async (values) => {
//       await handleSignup(values);
//     },
//   });

//   const handleSignup = async (values) => {
//     setIsLoading(true);
//     setMessage({ text: '', type: '' });
    
//     try {
//       const res = await fetch(`${API_URL}/api/v1/user/sign-up`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: values.email,
//           password: values.password,
//           confirmPassword: values.confirmPassword,
//           createdBy: createdBy,
//           selectedPlan: selectedPlan,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setUserEmail(values.email);
//         setEmailSent(true);
//         setMessage({ text: 'Account created successfully!', type: 'success' });
//         formik.resetForm();
        
//         // Call onSuccess callback if provided
//         if (onSuccess) {
//           onSuccess(data.data);
//         }
//       } else {
//         setMessage({ 
//           text: data.error || 'Signup failed. Please try again.', 
//           type: 'error' 
//         });
//       }
//     } catch (error) {
//       console.error('Signup error:', error);
//       setMessage({ 
//         text: 'Something went wrong. Please try again later.', 
//         type: 'error' 
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResendEmail = async () => {
//     try {
//       const res = await fetch(`${API_URL}/api/v1/user/resend-verification`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: userEmail }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setMessage({ text: 'Verification email resent!', type: 'success' });
//       } else {
//         setMessage({ text: data.error || 'Failed to resend email.', type: 'error' });
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage({ text: 'Something went wrong.', type: 'error' });
//     }
//   };

//   // Calculate if we need scrolling based on content height
//   const emailSentContent = (
//     <div className="flex flex-col h-full">
//       <div className="text-center mb-6">
//         <h2 className="text-xl font-bold text-gray-800 dark:text-white">
//           Verify Your Email
//         </h2>
//         {franchiseName && (
//           <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//             Partner for {franchiseName}
//           </p>
//         )}
//       </div>

//       <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400">
//         A verification link has been sent to <strong className="font-semibold">{userEmail}</strong>.
//       </div>
      
//       {message.text && (
//         <div className={`p-3 mb-4 text-sm rounded-lg ${
//           message.type === 'error' 
//             ? 'text-red-800 bg-red-50 dark:bg-red-900/30 dark:text-red-400'
//             : 'text-green-800 bg-green-50 dark:bg-green-900/30 dark:text-green-400'
//         }`}>
//           {message.text}
//         </div>
//       )}

//       <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
//         Please check your inbox and click the link to verify your email before proceeding.
//       </p>

//       <div className="mt-auto space-y-3">
//         <button
//           onClick={handleResendEmail}
//           className="w-full py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Resend Verification Email
//         </button>
        
//         <button
//           onClick={() => {
//             if (onSuccess) onSuccess({ email: userEmail });
//             if (onCancel) onCancel();
//           }}
//           className="w-full py-3 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
//         >
//           Continue
//         </button>
        
//         {onCancel && (
//           <button
//             onClick={onCancel}
//             className="w-full py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
//           >
//             Close
//           </button>
//         )}
//       </div>
//     </div>
//   );

//   const mainFormContent = (
//     <div className="flex flex-col h-full">
//       <div className="text-center mb-8">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//           {isFranchiseContext ? "Add Partner" : "Create Account"}
//         </h1>
//         {franchiseName && (
//           <p className="text-gray-600 dark:text-gray-400 mt-2">
//             Adding partner to <span className="font-semibold">{franchiseName}</span>
//           </p>
//         )}
//       </div>

//       <form onSubmit={formik.handleSubmit} className="space-y-6 flex-1 flex flex-col">
//         {/* Message Alert */}
//         {message.text && (
//           <div className={`p-4 text-sm rounded-lg ${
//             message.type === 'error' 
//               ? 'text-red-800 bg-red-50 dark:bg-red-900/30 dark:text-red-400'
//               : 'text-green-800 bg-green-50 dark:bg-green-900/30 dark:text-green-400'
//           }`}>
//             {message.text}
//           </div>
//         )}

//         <div className="space-y-6 flex-1">
//           {/* Email field */}
//           <div className="space-y-2">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className={`w-full px-4 py-3 text-sm bg-white dark:bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                 formik.touched.email && formik.errors.email 
//                   ? 'border-red-500 focus:ring-red-500' 
//                   : 'border-gray-300 dark:border-gray-600'
//               }`}
//               placeholder="Enter email address"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.email}
//               disabled={isLoading}
//             />
//             {formik.touched.email && formik.errors.email && (
//               <div className="text-sm text-red-600 dark:text-red-400">{formik.errors.email}</div>
//             )}
//           </div>

//           {/* Password fields */}
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   className={`w-full px-4 py-3 text-sm bg-white dark:bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-10 ${
//                     formik.touched.password && formik.errors.password 
//                       ? 'border-red-500 focus:ring-red-500' 
//                       : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   placeholder="Create password"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.password}
//                   disabled={isLoading}
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               {formik.touched.password && formik.errors.password && (
//                 <div className="text-sm text-red-600 dark:text-red-400">{formik.errors.password}</div>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   className={`w-full px-4 py-3 text-sm bg-white dark:bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-10 ${
//                     formik.touched.confirmPassword && formik.errors.confirmPassword 
//                       ? 'border-red-500 focus:ring-red-500' 
//                       : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   placeholder="Re-enter password"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.confirmPassword}
//                   disabled={isLoading}
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//                 <div className="text-sm text-red-600 dark:text-red-400">{formik.errors.confirmPassword}</div>
//               )}
//             </div>
//           </div>

//           {/* Terms */}
//           <div className="flex items-start gap-3">
//             <input
//               id="terms"
//               name="terms"
//               type="checkbox"
//               className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               required
//               disabled={isLoading}
//             />
//             <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
//               I agree to the{" "}
//               <Link to="/terms" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Terms</Link>{" "}
//               and{" "}
//               <Link to="/privacy" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Privacy Policy</Link>
//             </label>
//           </div>
//         </div>

//         {/* Buttons at bottom */}
//         <div className="space-y-3 pt-4 mt-auto">
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {isLoading ? (
//               <div className="flex items-center justify-center">
//                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
//                 Creating Account...
//               </div>
//             ) : isFranchiseContext ? "Add Partner" : "Create Account"}
//           </button>
          
//           {onCancel && (
//             <button
//               type="button"
//               onClick={onCancel}
//               className="w-full py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-70 disabled:cursor-not-allowed"
//               disabled={isLoading}
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );

//   // Main container with exact dimensions
//   return (
//     <div className="w-[480px] h-[854px] flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
//       {/* Modal header if needed */}
//       {showModalHeader && (
//         <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 {isFranchiseContext ? "Add New Partner" : "Create Account"}
//               </h3>
//               {franchiseName && (
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                   Franchise: {franchiseName}
//                 </p>
//               )}
//             </div>
//             {onCancel && (
//               <button
//                 onClick={onCancel}
//                 className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
//               </button>
//             )}
//           </div>
//         </div>
//       )}
      
//       {/* Scrollable content area */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="p-6 h-full">
//           {emailSent ? emailSentContent : mainFormContent}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;

// // SignupForm.js - Minimal version for dashboard
// import React, { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const API_URL = import.meta.env.VITE_API_URL;

// const SignupForm = ({ 
//   createdBy = null,
//   franchiseName = '',
//   onSuccess = null,
//   onCancel = null
// }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState("");

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//       confirmPassword: '',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email('Invalid email').required('Required'),
//       password: Yup.string().min(8, 'Min 8 characters').required('Required'),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref('password'), null], 'Passwords must match')
//         .required('Required'),
//     }),
//     onSubmit: async (values) => {
//       setIsLoading(true);
//       setError("");

//       try {
//         const res = await fetch(`${API_URL}/api/v1/user/sign-up`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: values.email,
//             password: values.password,
//             confirmPassword: values.confirmPassword,
//             createdBy: createdBy,
//           }),
//         });

//         const data = await res.json();

//         if (res.ok) {
//           formik.resetForm();
//           if (onSuccess) onSuccess(data.data);
//           if (onCancel) onCancel();
//         } else {
//           setError(data.error || 'Failed to create account');
//         }
//       } catch {
//         setError('Network error');
//       } finally {
//         setIsLoading(false);
//       }
//     },
//   });

//   return (
//     <div className="space-y-4">
//       <div className="text-center mb-4">
//         <h2 className="text-xl font-bold text-gray-800">Add Partner</h2>
//         {franchiseName && (
//           <p className="text-sm text-gray-600 mt-1">
//             Adding partner to {franchiseName}
//           </p>
//         )}
//       </div>

//       {error && (
//         <div className="p-3 bg-red-50 text-red-600 text-sm rounded">
//           {error}
//         </div>
//       )}

//       <div className="space-y-3">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Email Address
//           </label>
//           <input
//             type="email"
//             name="email"
//             className="w-full px-3 py-2 border rounded"
//             placeholder="partner@example.com"
//             onChange={formik.handleChange}
//             value={formik.values.email}
//           />
//           {formik.errors.email && (
//             <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Password
//           </label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               className="w-full px-3 py-2 border rounded pr-10"
//               placeholder="••••••••"
//               onChange={formik.handleChange}
//             />
//             <button
//               type="button"
//               className="absolute right-2 top-2 text-gray-500"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//             </button>
//           </div>
//           {formik.errors.password && (
//             <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Confirm Password
//           </label>
//           <div className="relative">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               name="confirmPassword"
//               className="w-full px-3 py-2 border rounded pr-10"
//               placeholder="••••••••"
//               onChange={formik.handleChange}
//             />
//             <button
//               type="button"
//               className="absolute right-2 top-2 text-gray-500"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             >
//               {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//             </button>
//           </div>
//           {formik.errors.confirmPassword && (
//             <p className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</p>
//           )}
//         </div>
//       </div>

//       <div className="flex items-center gap-2 mt-4">
//         <input type="checkbox" id="terms" required className="w-4 h-4" />
//         <label htmlFor="terms" className="text-sm text-gray-600">
//           I agree to Terms & Privacy Policy
//         </label>
//       </div>

//       <div className="flex gap-3 mt-6">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="flex-1 py-2 border rounded hover:bg-gray-50"
//           disabled={isLoading}
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           onClick={formik.handleSubmit}
//           disabled={isLoading}
//           className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//         >
//           {isLoading ? "Adding..." : "Add Partner"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;

// SignupForm.js - Directly includes the registration steps
// import React, { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const API_URL = import.meta.env.VITE_API_URL;

// const SignupForm = ({ 
//   createdBy = null,
//   franchiseName = '',
//   onSuccess = null,
//   onCancel = null
// }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [showRegistration, setShowRegistration] = useState(false);
//   const [userData, setUserData] = useState(null);

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//       confirmPassword: '',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email('Invalid email').required('Required'),
//       password: Yup.string().min(8, 'Min 8 characters').required('Required'),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref('password'), null], 'Passwords must match')
//         .required('Required'),
//     }),
//     onSubmit: async (values) => {
//       setIsLoading(true);
//       setError("");

//       try {
//         const res = await fetch(`${API_URL}/api/v1/user/sign-up`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: values.email,
//             password: values.password,
//             confirmPassword: values.confirmPassword,
//             createdBy: createdBy,
//           }),
//         });

//         const data = await res.json();

//         if (res.ok) {
//           console.log('✅ Signup successful:', data);
          
//           // Store user data
//           setUserData(data.data);
          
//           if (data.data && data.data._id) {
//             localStorage.setItem('user_id', data.data._id);
//             localStorage.setItem('user_email', values.email);
            
//             if (createdBy) {
//               localStorage.setItem('franchise_created_by', createdBy);
//             }
//           }
          
//           formik.resetForm();
          
//           // ✅ Show registration form immediately
//           setShowRegistration(true);
          
//           if (onSuccess) onSuccess(data.data);
          
//         } else {
//           setError(data.error || 'Failed to create account');
//         }
//       } catch (err) {
//         console.error('Signup error:', err);
//         setError('Network error. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     },
//   });

//   // Simple signup form
//   if (!showRegistration) {
//     return (
//       <div className="space-y-6 p-6 max-w-md mx-auto">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800">Add New Partner</h2>
//           {franchiseName && (
//             <p className="text-sm text-gray-600 mt-2">
//               Adding partner to: <span className="font-semibold">{franchiseName}</span>
//             </p>
//           )}
//         </div>

//         {error && (
//           <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
//             {error}
//           </div>
//         )}

//         <form onSubmit={formik.handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               className={`w-full px-4 py-3 border rounded-lg ${
//                 formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="partner@example.com"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.email}
//             />
//             {formik.errors.email && formik.touched.email && (
//               <p className="text-red-500 text-xs mt-2">{formik.errors.email}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 className={`w-full px-4 py-3 border rounded-lg pr-12 ${
//                   formik.errors.password && formik.touched.password ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="••••••••"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.password}
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//             {formik.errors.password && formik.touched.password && (
//               <p className="text-red-500 text-xs mt-2">{formik.errors.password}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Confirm Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 className={`w-full px-4 py-3 border rounded-lg pr-12 ${
//                   formik.errors.confirmPassword && formik.touched.confirmPassword ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="••••••••"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.confirmPassword}
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//             {formik.errors.confirmPassword && formik.touched.confirmPassword && (
//               <p className="text-red-500 text-xs mt-2">{formik.errors.confirmPassword}</p>
//             )}
//           </div>

//           <div className="flex items-start pt-2">
//             <input 
//               type="checkbox" 
//               id="terms" 
//               required 
//               className="w-4 h-4 mt-1" 
//             />
//             <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
//               I agree to Terms & Privacy Policy
//             </label>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50"
//           >
//             {isLoading ? "Creating Account..." : "Create Account & Register"}
//           </button>
          
//           {onCancel && (
//             <button
//               type="button"
//               onClick={onCancel}
//               className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 mt-3"
//             >
//               Cancel
//             </button>
//           )}
//         </form>
//       </div>
//     );
//   }

//   // Registration form (using your existing component)
//   return (
//     <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
//       {/* Header Section */}
//       <div className="text-center pt-8 px-8">
//         <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
//           Complete Partner Registration
//         </h1>
//         <p className="text-xl text-gray-600 mb-6">
//           Account created! Please complete your profile
//         </p>
//       </div>

//       {/* Registration Steps Placeholder - You can integrate your FormFields component here */}
//       <div className="p-8">
//         <div className="text-center mb-8">
//           <h3 className="text-2xl font-bold text-gray-800">Step 1: Business Information</h3>
//           <p className="text-gray-600 mt-2">Please provide your business details</p>
//         </div>

//         {/* Simple form for testing - Replace with your FormFields */}
//         <div className="space-y-6 max-w-2xl mx-auto">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Business Name
//             </label>
//             <input
//               type="text"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//               placeholder="Enter business name"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Business Type
//             </label>
//             <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
//               <option value="">Select business type</option>
//               <option value="retail">Retail</option>
//               <option value="service">Service</option>
//               <option value="manufacturing">Manufacturing</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email (pre-filled)
//             </label>
//             <input
//               type="email"
//               value={localStorage.getItem('user_email') || ''}
//               readOnly
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//               placeholder="Enter 10-digit phone number"
//             />
//           </div>

//           <div className="pt-6 border-t">
//             <button
//               onClick={() => {
//                 // You can implement the complete registration flow here
//                 if (onSuccess) onSuccess(userData);
//                 if (onCancel) onCancel();
//               }}
//               className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
//             >
//               Complete Registration
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;


// // SignupForm.js - Exact dimensions for modal
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Eye, EyeOff, X } from "lucide-react";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const API_URL = import.meta.env.VITE_API_URL;

// const SignupForm = ({ 
//   isFranchiseContext = false,
//   createdBy = null,
//   franchiseName = '',
//   selectedPlan = null,
//   onSuccess = null,
//   onCancel = null,
//   isModal = false,
//   showModalHeader = false
// }) => {
//   const [emailSent, setEmailSent] = useState(false);
//   const [userEmail, setUserEmail] = useState("");
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showRegistrationForm, setShowRegistrationForm] = useState(false);
//   const [signupData, setSignupData] = useState(null);

//   // Formik for signup
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//       confirmPassword: '',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string()
//         .email('Invalid email address')
//         .required('Email is required'),
//       password: Yup.string()
//         .min(8, 'Password must be at least 8 characters')
//         .required('Password is required'),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref('password'), null], 'Passwords must match')
//         .required('Confirm Password is required'),
//     }),
//     onSubmit: async (values) => {
//       await handleSignup(values);
//     },
//   });

//   const handleSignup = async (values) => {
//     setIsLoading(true);
//     setMessage({ text: '', type: '' });
    
//     try {
//       const res = await fetch(`${API_URL}/api/v1/user/sign-up`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: values.email,
//           password: values.password,
//           confirmPassword: values.confirmPassword,
//           createdBy: createdBy,
//           selectedPlan: selectedPlan,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setUserEmail(values.email);
//         setSignupData(data.data);
        
//         // Store user data for registration form
//         localStorage.setItem('user_id', data.data._id);
//         localStorage.setItem('user_email', values.email);
//         if (createdBy) {
//           localStorage.setItem('franchise_created_by', createdBy);
//         }
        
//         // Show registration form immediately
//         setShowRegistrationForm(true);
        
//         // Call onSuccess callback if provided
//         if (onSuccess) {
//           onSuccess(data.data);
//         }
//       } else {
//         setMessage({ 
//           text: data.error || 'Signup failed. Please try again.', 
//           type: 'error' 
//         });
//       }
//     } catch (error) {
//       console.error('Signup error:', error);
//       setMessage({ 
//         text: 'Something went wrong. Please try again later.', 
//         type: 'error' 
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Show PartnerRegistrationForm instead of email sent message
//   if (showRegistrationForm) {
//     return <PartnerRegistrationForm />;
//   }

//   // Calculate if we need scrolling based on content height
//   const mainFormContent = (
//     <div className="flex flex-col h-full">
//       <div className="text-center mb-8">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//           {isFranchiseContext ? "Add Partner" : "Create Account"}
//         </h1>
//         {franchiseName && (
//           <p className="text-gray-600 dark:text-gray-400 mt-2">
//             Adding partner to <span className="font-semibold">{franchiseName}</span>
//           </p>
//         )}
//       </div>

//       <form onSubmit={formik.handleSubmit} className="space-y-6 flex-1 flex flex-col">
//         {/* Message Alert */}
//         {message.text && (
//           <div className={`p-4 text-sm rounded-lg ${
//             message.type === 'error' 
//               ? 'text-red-800 bg-red-50 dark:bg-red-900/30 dark:text-red-400'
//               : 'text-green-800 bg-green-50 dark:bg-green-900/30 dark:text-green-400'
//           }`}>
//             {message.text}
//           </div>
//         )}

//         <div className="space-y-6 flex-1">
//           {/* Email field */}
//           <div className="space-y-2">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className={`w-full px-4 py-3 text-sm bg-white dark:bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                 formik.touched.email && formik.errors.email 
//                   ? 'border-red-500 focus:ring-red-500' 
//                   : 'border-gray-300 dark:border-gray-600'
//               }`}
//               placeholder="Enter email address"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.email}
//               disabled={isLoading}
//             />
//             {formik.touched.email && formik.errors.email && (
//               <div className="text-sm text-red-600 dark:text-red-400">{formik.errors.email}</div>
//             )}
//           </div>

//           {/* Password fields */}
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   className={`w-full px-4 py-3 text-sm bg-white dark:bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-10 ${
//                     formik.touched.password && formik.errors.password 
//                       ? 'border-red-500 focus:ring-red-500' 
//                       : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   placeholder="Create password"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.password}
//                   disabled={isLoading}
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               {formik.touched.password && formik.errors.password && (
//                 <div className="text-sm text-red-600 dark:text-red-400">{formik.errors.password}</div>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   className={`w-full px-4 py-3 text-sm bg-white dark:bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-10 ${
//                     formik.touched.confirmPassword && formik.errors.confirmPassword 
//                       ? 'border-red-500 focus:ring-red-500' 
//                       : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   placeholder="Re-enter password"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.confirmPassword}
//                   disabled={isLoading}
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//                 <div className="text-sm text-red-600 dark:text-red-400">{formik.errors.confirmPassword}</div>
//               )}
//             </div>
//           </div>

//           {/* Terms */}
//           <div className="flex items-start gap-3">
//             <input
//               id="terms"
//               name="terms"
//               type="checkbox"
//               className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               required
//               disabled={isLoading}
//             />
//             <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
//               I agree to the{" "}
//               <Link to="/terms" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Terms</Link>{" "}
//               and{" "}
//               <Link to="/privacy" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Privacy Policy</Link>
//             </label>
//           </div>
//         </div>

//         {/* Buttons at bottom */}
//         <div className="space-y-3 pt-4 mt-auto">
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {isLoading ? (
//               <div className="flex items-center justify-center">
//                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
//                 Creating Account...
//               </div>
//             ) : isFranchiseContext ? "Add Partner" : "Create Account"}
//           </button>
          
//           {onCancel && (
//             <button
//               type="button"
//               onClick={onCancel}
//               className="w-full py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-70 disabled:cursor-not-allowed"
//               disabled={isLoading}
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );

//   // Main container with exact dimensions
//   return (
//     <div className="w-[480px] h-[854px] flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
//       {/* Modal header if needed */}
//       {showModalHeader && (
//         <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 {isFranchiseContext ? "Add New Partner" : "Create Account"}
//               </h3>
//               {franchiseName && (
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                   Franchise: {franchiseName}
//                 </p>
//               )}
//             </div>
//             {onCancel && (
//               <button
//                 onClick={onCancel}
//                 className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
//               </button>
//             )}
//           </div>
//         </div>
//       )}
      
//       {/* Scrollable content area */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="p-6 h-full">
//           {mainFormContent}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const API_URL = import.meta.env.VITE_API_URL;

// const SignupForm = ({ 
//   createdBy = null,
//   franchiseName = '',
//   onSuccess = null,
//   onCancel = null
// }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//       confirmPassword: '',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email('Invalid email').required('Required'),
//       password: Yup.string().min(8, 'Min 8 characters').required('Required'),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref('password'), null], 'Passwords must match')
//         .required('Required'),
//     }),
//     onSubmit: async (values) => {
//       setIsLoading(true);
//       setError("");

//       try {
//         const res = await fetch(`${API_URL}/api/v1/user/sign-up`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: values.email,
//             password: values.password,
//             confirmPassword: values.confirmPassword,
//             createdBy: createdBy,
//           }),
//         });

//         const data = await res.json();

//         if (res.ok && data.success) {
//           console.log('✅ Signup successful:', data);
          
//           // Store user data for later use
//           // This is for the registration form that will come AFTER email verification
//           if (data.data?._id) {
//             // Store in sessionStorage instead of localStorage to avoid persistence issues
//             sessionStorage.setItem('pending_user_id', data.data._id);
//             sessionStorage.setItem('pending_user_email', values.email);
            
//             if (createdBy) {
//               sessionStorage.setItem('pending_franchise_created_by', createdBy);
//             }
//           }
          
//           formik.resetForm();
          
//           // Navigate to your existing EmailRegistration page
//           navigate('/email-registration', { 
//             state: { email: values.email } 
//           });
          
//           if (onSuccess) onSuccess(data.data);
          
//         } else {
//           setError(data.error || data.message || 'Failed to create account');
//         }
//       } catch (err) {
//         console.error('Signup error:', err);
//         setError('Network error. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     },
//   });

//   return (
//     <div className="space-y-6 p-6 max-w-md mx-auto">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold text-gray-800">Add New Partner</h2>
//         {franchiseName && (
//           <p className="text-sm text-gray-600 mt-2">
//             Adding partner to: <span className="font-semibold">{franchiseName}</span>
//           </p>
//         )}
//       </div>

//       {error && (
//         <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
//           {error}
//         </div>
//       )}

//       <form onSubmit={formik.handleSubmit} className="space-y-5">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Email Address
//           </label>
//           <input
//             type="email"
//             name="email"
//             className={`w-full px-4 py-3 border rounded-lg ${
//               formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'
//             }`}
//             placeholder="partner@example.com"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.email}
//           />
//           {formik.errors.email && formik.touched.email && (
//             <p className="text-red-500 text-xs mt-2">{formik.errors.email}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Password
//           </label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               className={`w-full px-4 py-3 border rounded-lg pr-12 ${
//                 formik.errors.password && formik.touched.password ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="••••••••"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.password}
//             />
//             <button
//               type="button"
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//           {formik.errors.password && formik.touched.password && (
//             <p className="text-red-500 text-xs mt-2">{formik.errors.password}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Confirm Password
//           </label>
//           <div className="relative">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               name="confirmPassword"
//               className={`w-full px-4 py-3 border rounded-lg pr-12 ${
//                 formik.errors.confirmPassword && formik.touched.confirmPassword ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="••••••••"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.confirmPassword}
//             />
//             <button
//               type="button"
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             >
//               {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//           {formik.errors.confirmPassword && formik.touched.confirmPassword && (
//             <p className="text-red-500 text-xs mt-2">{formik.errors.confirmPassword}</p>
//           )}
//         </div>

//         <div className="flex items-start pt-2">
//           <input 
//             type="checkbox" 
//             id="terms" 
//             required 
//             className="w-4 h-4 mt-1" 
//           />
//           <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
//             I agree to Terms & Privacy Policy
//           </label>
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50"
//         >
//           {isLoading ? (
//             <div className="flex items-center justify-center">
//               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
//               Creating Account...
//             </div>
//           ) : "Create Account"}
//         </button>
        
//         {onCancel && (
//           <button
//             type="button"
//             onClick={onCancel}
//             className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 mt-3"
//           >
//             Cancel
//           </button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default SignupForm;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const API_URL = import.meta.env.VITE_API_URL;

// const SignupForm = ({ 
//   createdBy = null,
//   franchiseName = '',
//   onSuccess = null,
//   onCancel = null
// }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [emailSent, setEmailSent] = useState(false);
//   const [userEmail, setUserEmail] = useState("");
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//       confirmPassword: '',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email('Invalid email').required('Required'),
//       password: Yup.string().min(8, 'Min 8 characters').required('Required'),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref('password'), null], 'Passwords must match')
//         .required('Required'),
//     }),
//     onSubmit: async (values) => {
//       setIsLoading(true);
//       setError("");

//       try {
//         const res = await fetch(`${API_URL}/api/v1/user/sign-up`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: values.email,
//             password: values.password,
//             confirmPassword: values.confirmPassword,
//             createdBy: createdBy,
//           }),
//         });

//         const data = await res.json();

//         if (res.ok && data.success) {
//           console.log('✅ Signup successful:', data);
//           setUserEmail(values.email);
//           setEmailSent(true);
//           setMessage({ 
//             text: 'Account created successfully! Please verify your email.', 
//             type: 'success' 
//           });
          
//           // Store user data temporarily for partner registration
//           if (data.data?._id) {
//             localStorage.setItem('pending_user_id', data.data._id);
//             localStorage.setItem('pending_user_email', values.email);
            
//             if (createdBy) {
//               localStorage.setItem('pending_franchise_created_by', createdBy);
//             }
//           }
          
//           formik.resetForm();
          
//           if (onSuccess) onSuccess(data.data);
          
//         } else {
//           setError(data.error || data.message || 'Failed to create account');
//         }
//       } catch (err) {
//         console.error('Signup error:', err);
//         setError('Network error. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     },
//   });

//   const handleResendEmail = async () => {
//     try {
//       const res = await fetch(`${API_URL}/api/v1/user/resend-verification`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: userEmail }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setMessage({ text: 'Verification email resent!', type: 'success' });
//       } else {
//         setMessage({ text: data.error || 'Failed to resend email.', type: 'error' });
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage({ text: 'Something went wrong.', type: 'error' });
//     }
//   };

//   const handleContinueToRegistration = () => {
//     // Check if email is verified
//     const emailVerified = localStorage.getItem('email_verified') === 'true';
    
//     if (emailVerified) {
//       // Move pending data to actual storage
//       const pendingUserId = localStorage.getItem('pending_user_id');
//       const pendingUserEmail = localStorage.getItem('pending_user_email');
//       const pendingFranchiseCreatedBy = localStorage.getItem('pending_franchise_created_by');
      
//       if (pendingUserId && pendingUserEmail) {
//         localStorage.setItem('user_id', pendingUserId);
//         localStorage.setItem('user_email', pendingUserEmail);
        
//         if (pendingFranchiseCreatedBy) {
//           localStorage.setItem('franchise_created_by', pendingFranchiseCreatedBy);
//         }
        
//         // Clear pending data
//         localStorage.removeItem('pending_user_id');
//         localStorage.removeItem('pending_user_email');
//         localStorage.removeItem('pending_franchise_created_by');
//         localStorage.removeItem('email_verified');
//       }
      
//       // Navigate to partner registration
//       navigate('/partner-registration');
//     } else {
//       // Navigate to EmailRegistration page to check email
//       navigate('/email-registration', { 
//         state: { email: userEmail } 
//       });
//     }
//   };

//   // Show email verification message
//   if (emailSent) {
//     return (
//       <div className="space-y-6 p-6 max-w-md mx-auto">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
//           {franchiseName && (
//             <p className="text-sm text-gray-600 mt-2">
//               Partner for <span className="font-semibold">{franchiseName}</span>
//             </p>
//           )}
//         </div>

//         <div className="p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg">
//           <p className="font-medium">Verification email sent!</p>
//           <p className="text-sm mt-1">
//             A verification link has been sent to <span className="font-semibold">{userEmail}</span>.
//           </p>
//         </div>

//         {message.text && (
//           <div className={`p-3 rounded-lg ${
//             message.type === 'error' 
//               ? 'bg-red-50 border border-red-200 text-red-600'
//               : 'bg-green-50 border border-green-200 text-green-600'
//           }`}>
//             {message.text}
//           </div>
//         )}

//         <p className="text-gray-600 text-sm">
//           Please check your email and click the verification link before proceeding.
//         </p>

//         <div className="space-y-3">
//           <button
//             onClick={handleResendEmail}
//             className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
//           >
//             Resend Verification Email
//           </button>
          
//           <button
//             onClick={handleContinueToRegistration}
//             className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
//           >
//             Continue to Partner Registration
//           </button>
          
//           {onCancel && (
//             <button
//               onClick={onCancel}
//               className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   }

//   // Original signup form UI
//   return (
//     <div className="space-y-6 p-6 max-w-md mx-auto">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold text-gray-800">Add New Partner</h2>
//         {franchiseName && (
//           <p className="text-sm text-gray-600 mt-2">
//             Adding partner to: <span className="font-semibold">{franchiseName}</span>
//           </p>
//         )}
//       </div>

//       {error && (
//         <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
//           {error}
//         </div>
//       )}

//       <form onSubmit={formik.handleSubmit} className="space-y-5">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Email Address
//           </label>
//           <input
//             type="email"
//             name="email"
//             className={`w-full px-4 py-3 border rounded-lg ${
//               formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'
//             }`}
//             placeholder="partner@example.com"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.email}
//           />
//           {formik.errors.email && formik.touched.email && (
//             <p className="text-red-500 text-xs mt-2">{formik.errors.email}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Password
//           </label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               className={`w-full px-4 py-3 border rounded-lg pr-12 ${
//                 formik.errors.password && formik.touched.password ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="••••••••"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.password}
//             />
//             <button
//               type="button"
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//           {formik.errors.password && formik.touched.password && (
//             <p className="text-red-500 text-xs mt-2">{formik.errors.password}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Confirm Password
//           </label>
//           <div className="relative">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               name="confirmPassword"
//               className={`w-full px-4 py-3 border rounded-lg pr-12 ${
//                 formik.errors.confirmPassword && formik.touched.confirmPassword ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="••••••••"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.confirmPassword}
//             />
//             <button
//               type="button"
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             >
//               {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//           {formik.errors.confirmPassword && formik.touched.confirmPassword && (
//             <p className="text-red-500 text-xs mt-2">{formik.errors.confirmPassword}</p>
//           )}
//         </div>

//         <div className="flex items-start pt-2">
//           <input 
//             type="checkbox" 
//             id="terms" 
//             required 
//             className="w-4 h-4 mt-1" 
//           />
//           <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
//             I agree to Terms & Privacy Policy
//           </label>
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50"
//         >
//           {isLoading ? (
//             <div className="flex items-center justify-center">
//               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
//               Creating Account...
//             </div>
//           ) : "Create Account"}
//         </button>
        
//         {onCancel && (
//           <button
//             type="button"
//             onClick={onCancel}
//             className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 mt-3"
//           >
//             Cancel
//           </button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default SignupForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, CheckCircle, Mail } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

const API_URL = import.meta.env.VITE_API_URL;

const SignupForm = ({ 
  createdBy = null,
  franchiseName = '',
  onSuccess = null,
  onCancel = null
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(8, 'Min 8 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setError("");

      try {
        const res = await fetch(`${API_URL}/api/v1/user/sign-up`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            createdBy: createdBy,
          }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          console.log('✅ Signup successful:', data);
          setUserEmail(values.email);
          setUserPassword(values.password); // Store password for display
          setSignupSuccess(true);
          setMessage({ 
            text: 'User registered successfully. Please check your email to verify your account.', 
            type: 'success' 
          });
          
          // Store user data temporarily for partner registration
          if (data.data?._id) {
            localStorage.setItem('pending_user_id', data.data._id);
            localStorage.setItem('pending_user_email', values.email);
            
            if (createdBy) {
              localStorage.setItem('pending_franchise_created_by', createdBy);
            }
          }
          
          if (onSuccess) onSuccess(data.data);
          
        } else {
          setError(data.error || data.message || 'Failed to create account');
        }
      } catch (err) {
        console.error('Signup error:', err);
        setError('Network error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleResendEmail = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/user/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ text: 'Verification email resent!', type: 'success' });
      } else {
        setMessage({ text: data.error || 'Failed to resend email.', type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: 'Something went wrong.', type: 'error' });
    }
  };

  const handleVerifyEmailClick = () => {
    // Simulate email verification (in real app, this would check with backend)
    setIsEmailVerified(true);
    localStorage.setItem('email_verified', 'true');
    
    // Move pending data to actual storage
    const pendingUserId = localStorage.getItem('pending_user_id');
    const pendingUserEmail = localStorage.getItem('pending_user_email');
    const pendingFranchiseCreatedBy = localStorage.getItem('pending_franchise_created_by');
    
    if (pendingUserId && pendingUserEmail) {
      localStorage.setItem('user_id', pendingUserId);
      localStorage.setItem('user_email', pendingUserEmail);
      
      if (pendingFranchiseCreatedBy) {
        localStorage.setItem('franchise_created_by', pendingFranchiseCreatedBy);
      }
      
      // Clear pending data
      localStorage.removeItem('pending_user_id');
      localStorage.removeItem('pending_user_email');
      localStorage.removeItem('pending_franchise_created_by');
    }
    
    // Navigate to partner registration
    setTimeout(() => {
      navigate('/partner-registration');
    }, 1500);
  };

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleBackToSignup = () => {
    setSignupSuccess(false);
    setUserEmail("");
    setUserPassword("");
    formik.resetForm();
  };

  // Show the success message with user credentials (MATCHING YOUR IMAGE)
  if (signupSuccess) {
    return (
      <div className="space-y-6 p-6 max-w-md mx-auto bg-white rounded-lg shadow-sm">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
          {franchiseName && (
            <p className="text-sm text-gray-600 mt-2">
              Partner for <span className="font-semibold">{franchiseName}</span>
            </p>
          )}
        </div>

        {/* Success message at the top */}
        {message.text && (
          <div className={`p-4 rounded-lg border ${
            message.type === 'error' 
              ? 'bg-red-50 border-red-200 text-red-700'
              : 'bg-green-50 border-green-200 text-green-700'
          }`}>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">{message.text}</p>
              </div>
            </div>
          </div>
        )}

        {/* Email display */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="flex items-center p-3 border border-gray-300 rounded-lg bg-gray-50">
              <Mail className="h-5 w-5 text-gray-500 mr-3" />
              <span className="text-gray-800 font-medium">{userEmail}</span>
            </div>
          </div>

          {/* Password display (masked) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
              <div className="flex items-center">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(userPassword.length, 10) }).map((_, i) => (
                    <div key={i} className="w-2 h-4 bg-gray-700 rounded-sm"></div>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {userPassword.length > 10 ? '••••••••••' + userPassword.substring(10) : userPassword}
                </span>
              </div>
            </div>
          </div>

          {/* Confirm Password display (masked with asterisks) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
              <div className="flex items-center">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="text-2xl text-gray-700">*</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terms checkbox (already checked) */}
        <div className="flex items-center p-3 border border-gray-300 rounded-lg bg-gray-50">
          <div className="w-5 h-5 flex items-center justify-center bg-green-500 rounded mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <label className="text-gray-800 font-medium">
            I agree to Terms & Privacy Policy
          </label>
        </div>

        {/* Action buttons */}
        <div className="space-y-4 pt-4">
          <button
            onClick={handleResendEmail}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center"
          >
            <Mail className="h-5 w-5 mr-2" />
            Resend Verification Email
          </button>
          
          <button
            onClick={handleVerifyEmailClick}
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 flex items-center justify-center"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            I Have Verified My Email
          </button>
          
          {/* Already have an account? */}
          <div className="pt-4 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={handleSignInClick}
                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
          
          {/* Cancel button */}
          {onCancel && (
            <button
              onClick={onCancel}
              className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Success message after verification */}
        {isEmailVerified && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-auto shadow-xl">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Email Verified!</h3>
                <p className="text-gray-600 mb-6">Redirecting to registration...</p>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-600 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Original signup form UI
  return (
    <div className="space-y-6 p-6 max-w-md mx-auto bg-white rounded-lg shadow-sm">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Add New Partner</h2>
        {franchiseName && (
          <p className="text-sm text-gray-600 mt-2">
            Adding partner to: <span className="font-semibold">{franchiseName}</span>
          </p>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className={`w-full px-4 py-3 border rounded-lg ${
              formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200`}
            placeholder="partner@example.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-xs mt-2">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={`w-full px-4 py-3 border rounded-lg pr-12 ${
                formik.errors.password && formik.touched.password ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200`}
              placeholder="••••••••"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 text-xs mt-2">{formik.errors.password}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className={`w-full px-4 py-3 border rounded-lg pr-12 ${
                formik.errors.confirmPassword && formik.touched.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200`}
              placeholder="••••••••"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <p className="text-red-500 text-xs mt-2">{formik.errors.confirmPassword}</p>
          )}
        </div>

        <div className="flex items-start pt-2">
          <input 
            type="checkbox" 
            id="terms" 
            required 
            className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
          />
          <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
            I agree to Terms & Privacy Policy
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition duration-200 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
              Creating Account...
            </>
          ) : "Create Account"}
        </button>
        
        {/* Sign in link for signup form */}
        <div className="pt-4 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={handleSignInClick}
              className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default SignupForm;