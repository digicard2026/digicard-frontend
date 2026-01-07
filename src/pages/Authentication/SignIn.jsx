import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

// Custom components from your assets
import ModernImage from "../../assets/images/tailwickComp/ModernImage";
import Modern from "../../assets/images/tailwickComp/Modern";

// Your custom services and utilities
import { verifyUser } from "../../service/userApi";
import { setRole } from "../../store/Rolestore/roleSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        setMessage({ text: data.message || 'Login failed', type: 'error' });
        const successAlert = document.getElementById('successAlert');
        if (successAlert) {
          successAlert.classList.add('hidden');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
      const successAlert = document.getElementById('successAlert');
      if (successAlert) {
        successAlert.classList.add('hidden');
      }
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
      
      <div className="relative flex flex-col w-full overflow-hidden xl:flex-row to-custom-800 bg-gradient-to-r from-custom-900 dark:to-custom-900 dark:from-custom-950">
        <ModernImage />
        <div className="min-h-[calc(100vh_-_theme('spacing.4')_*_2)] mx-3 lg:w-[35rem] shrink-0 px-6 py-6 flex items-center justify-center m-4 bg-white dark:bg-zink-800 rounded-lg z-10 relative dark:text-zink-100 md:mx-auto xl:mx-4 dark:border-zink-700 shadow-lg">
          <div className="flex flex-col w-full h-full justify-center">
            <div className="w-full max-w-xs mx-auto">
              {/* Header */}
              <div className="text-center mb-10">
                <h1 className="text-2xl font-bold text-black dark:text-white">Sign In</h1>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-6" id="signInForm">
                <div id="successAlert" className={`hidden p-1 mb-3 text-s text-blue-600 rounded-lg bg-gray-100 dark:bg-gray-500/20 dark:border-gray-500/50 dark:text-black`}>
                  You have <b>successfully</b> signed in.
                </div>
                
                {message.type === 'error' && message.text && (
                  <div className="p-3 mb-3 text-xs text-red-800 border border-red-300 rounded-lg bg-red-100 dark:bg-red-500/20 dark:border-red-500/50 dark:text-red-400">
                    {message.text}
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
                    className={`w-full px-4 py-3 text-sm bg-gray-50 dark:bg-zink-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:shadow-gray-300 focus:shadow-sm transition-all duration-200 border border-gray-800 dark:border-zink-800 disabled:bg-gray-100 dark:disabled:bg-zink-600 disabled:text-gray-500 dark:disabled:text-zink-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-zink-400 ${formik.touched.identifier && formik.errors.identifier ? 'focus:ring-red-400 focus:shadow-red-300' : ''}`}
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
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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

              {/* Home link */}
              <div className="text-center pt-8 mt-2">
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
    </React.Fragment>
  );
}

export default SignIn;