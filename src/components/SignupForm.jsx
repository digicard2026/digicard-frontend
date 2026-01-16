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

// SignupForm.js - Minimal version for dashboard
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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

        if (res.ok) {
          formik.resetForm();
          if (onSuccess) onSuccess(data.data);
          if (onCancel) onCancel();
        } else {
          setError(data.error || 'Failed to create account');
        }
      } catch {
        setError('Network error');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Add Partner</h2>
        {franchiseName && (
          <p className="text-sm text-gray-600 mt-1">
            Adding partner to {franchiseName}
          </p>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded"
            placeholder="partner@example.com"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full px-3 py-2 border rounded pr-10"
              placeholder="••••••••"
              onChange={formik.handleChange}
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {formik.errors.password && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="w-full px-3 py-2 border rounded pr-10"
              placeholder="••••••••"
              onChange={formik.handleChange}
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {formik.errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <input type="checkbox" id="terms" required className="w-4 h-4" />
        <label htmlFor="terms" className="text-sm text-gray-600">
          I agree to Terms & Privacy Policy
        </label>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 border rounded hover:bg-gray-50"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={formik.handleSubmit}
          disabled={isLoading}
          className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Adding..." : "Add Partner"}
        </button>
      </div>
    </div>
  );
};

export default SignupForm;