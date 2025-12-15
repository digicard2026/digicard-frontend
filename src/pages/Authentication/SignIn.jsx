import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Smartphone, Eye, EyeOff } from "lucide-react";
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
  const [loginType, setLoginType] = useState('email'); // 'email' or 'phone'

  // Formik for login
  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: '',
    },
    validationSchema: Yup.object({
      identifier: loginType === 'email' 
        ? Yup.string()
            .email('Invalid email address')
            .required('Username/Email is required')
        : Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
            .required('Phone number is required'),
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
        email: loginType === 'email' ? credentials.identifier : credentials.identifier,
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

  const toggleLoginType = () => {
    const newType = loginType === 'email' ? 'phone' : 'email';
    setLoginType(newType);
    // Clear identifier field when switching
    formik.setFieldValue('identifier', '');
    formik.setFieldTouched('identifier', false);
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
      <div className="relative flex flex-col w-full overflow-hidden xl:flex-row to-custom-800 bg-gradient-to-r from-custom-900 dark:to-custom-900 dark:from-custom-950">
        <ModernImage />
        <div className="min-h-[calc(100vh_-_theme('spacing.4')_*_2)] mx-3 lg:w-[40rem] shrink-0 px-4 py-4 flex items-center justify-center m-4 bg-white rounded-xl z-10 relative dark:bg-zink-800 dark:text-zink-100 md:mx-auto xl:mx-4  dark:border-zink-700 shadow-md">
          <div className="flex flex-col w-full h-full justify-center">
            <div className="w-full max-w-sm mx-auto">
              {/* Login type tabs - More compact */}
              <div className="flex w-80 gap-1 mb-8 ml-12 mt-30">
                <button
                  type="button"
                  onClick={() => setLoginType('email')}
                  className={`flex-1 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center ${loginType === 'email' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800 dark:bg-zink-700 dark:text-zink-300 hover:bg-gray-200 dark:hover:bg-zink-600'}`}
                >
                  <Mail className="size-4 mr-2" />
                  <span className="font-medium text-sm">Email</span>
                </button>
                <button
                    type="button"
                    onClick={() => setLoginType('phone')}
                    className={`flex-1 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center ${loginType === 'phone' 
                      ? 'bg-blue-600 text-white'  
                      : 'bg-gray-900 text-gray-800 dark:bg-zink-700 dark:text-zink-300 hover:bg-gray-600 dark:hover:bg-zink-600'}`}
                  >
                  <Smartphone className="size-4 mr-2" />
                  <span className="font-medium text-sm">Phone</span>
                </button>
              </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4" id="signInForm">
            <div id="successAlert" className={`hidden p-1 mb-3 text-s text-blue-600  rounded-lg bg-gray-100 dark:bg-gray-500/20 dark:border-gray-500/50 dark:text-black`}>
              You have <b>successfully</b> signed in.
            </div>
            
            {message.type === 'error' && message.text && (
              <div className="p-3 mb-3 text-xs text-red-800 border border-red-300 rounded-lg bg-red-100 dark:bg-red-500/20 dark:border-red-500/50 dark:text-red-400">
                {message.text}
              </div>
            )}
            
            {/* Email/Phone field */}
            <div className="space-y-3">
              <label htmlFor="identifier" className="block text-sm font-medium text-black dark:text-black">
                Username/ Email ID
              </label>
              <input
                type={loginType === 'email' ? 'text' : 'tel'}
                id="identifier"
                name="identifier"
                className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 disabled:bg-gray-50 dark:disabled:bg-zink-700 disabled:border-gray-900 dark:disabled:border-zink-600 dark:disabled:text-zink-300 disabled:text-black text-gray-900 dark:text-white bg-white dark:bg-zink-800 border-gray-300 dark:border-zink-600 placeholder:text-gray-500 dark:placeholder:text-zink-400 ${formik.touched.identifier && formik.errors.identifier ? 'border-red-500 focus:ring-red-500/50' : ''}`}
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
                <label htmlFor="password" className="text-sm font-medium text-black dark:text-black">
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
                  className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 disabled:bg-gray-50 dark:disabled:bg-zink-700 disabled:border-gray-300 dark:disabled:border-zink-600 dark:disabled:text-zink-300 disabled:text-gray-500 text-gray-900 dark:text-white bg-white dark:bg-zink-800 border-gray-300 dark:border-zink-600 placeholder:text-gray-500 dark:placeholder:text-zink-400 pr-10 ${formik.touched.password && formik.errors.password ? 'border-red-500 focus:ring-red-500/50' : ''}`}
                  placeholder="Enter Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-zink-400 dark:hover:text-zink-200 transition-colors p-1"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.password}</div>
              )}
            </div>
            
            {/* Remember Me checkbox */}
            <div className="flex items-center gap-2 mt-10 ">
              <input
              id="rememberMe"
              className="size-4 border border-black rounded focus:ring-1 focus:ring-blue-500/50 checked:bg-blue-600 checked:border-blue-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:border-zink-500 mt-4 mb-8"
              type="checkbox"
              disabled={isLoading}
            />
            <label htmlFor="rememberMe" className="text-sm font-medium text-black dark:text-gray-100 cursor-pointer mt-4 mb-8">
              Remember Me
    </label>
  </div>
  
  {/* Sign In button */}
  <button
    type="submit"
    disabled={isLoading}
    className="w-full py-2.5 text-sm font-semibold text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-700 active:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 mt-20"
  >
    {isLoading ? (
      <div className="flex items-center justify-center">
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2 "></div>
        Signing In...
      </div>
    ) : "Sign In"}
  </button>
</form>

              {/* Divider - Cleaner */}
              <div className="relative my-6 mt-10 mb-9">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-zink-500"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white dark:bg-zink-800 text-gray-500 dark:text-zink-400">
                    Sign In with
                  </span>
                </div>
              </div>

              {/* Social login buttons - More compact */}
              <div className="flex gap-3 mb-2">
                <button 
                  type="button" 
                  className="flex-1 flex items-center justify-center px-3 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500/20 dark:text-zink-100 dark:bg-zink-800 dark:border-zink-600 dark:hover:bg-zink-700 transition-all duration-200"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Use Google
                </button>
                <button 
                  type="button" 
                  className="flex-1 flex items-center justify-center px-3 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500/20 dark:text-zink-100 dark:bg-zink-800 dark:border-zink-600 dark:hover:bg-zink-700 transition-all duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.666-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.787-.94 1.324-2.245 1.171-3.54-1.133.052-2.518.754-3.334 1.701-.735.85-1.389 2.207-1.208 3.514 1.26.091 2.544-.637 3.371-1.675z"/>
                  </svg>
                  Use Apple
                </button>
              </div>

              {/* Sign up link */}
              <div className="text-center pt-2  mt-1">
                <p className="text-gray-700 dark:text-zink-300 text-sm">
                  Back to  {" "}
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