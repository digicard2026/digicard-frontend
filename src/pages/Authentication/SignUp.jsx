import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

// Custom components from your assets
import ModernImage from "../../assets/images/tailwickComp/ModernImage";
import Modern from "../../assets/images/tailwickComp/Modern";

const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isRegistered, setIsRegistered] = useState(false);
  const [franchiseContext, setFranchiseContext] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (location.state?.franchiseContext) {
      setFranchiseContext({
        createdBy: location.state.createdBy,
        franchiseName: location.state.franchiseName,
      });
    }
    
    const bodyElement = document.body;
    bodyElement.classList.add('font-public');
    document.title = "Sign Up | Digi_card";

    return () => {
      bodyElement.classList.remove('font-public');
    }
  }, [location.state]);

  // Formik for signup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      await handleSignup(values);
    },
  });

  const handleSignup = async (values) => {
    setIsLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      const res = await fetch(`${API_URL}/api/v1/user/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          createdBy: franchiseContext?.createdBy,
          selectedPlan: location.state?.selectedPlan,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setUserEmail(values.email);
        setEmailSent(true);
        setMessage({ text: 'Account created successfully!', type: 'success' });
        formik.resetForm();
      } else {
        setMessage({ 
          text: data.error || 'Signup failed. Please try again.', 
          type: 'error' 
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage({ 
        text: 'Something went wrong. Please try again later.', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleContinue = () => {
    if (franchiseContext) {
      navigate("/signin/franchise");
    } else if (location.state?.selectedPlan) {
      navigate("/create", {
        state: {
          selectedPlan: location.state.selectedPlan,
          userEmail,
          createdBy: location.state?.createdBy || "",
          fromPartnerDashboard: location.state?.fromPartnerDashboard || false,
        },
      });
    } else {
      navigate("/signin/franchise");
    }
  };

  if (emailSent) {
    return (
      <React.Fragment>
        {/* Blue overlay background */}
        <div className="absolute inset-0 bg-blue-900 z-0"></div>
        
        <div className="relative flex flex-col w-full overflow-hidden xl:flex-row to-custom-800 bg-gradient-to-r from-custom-900 dark:to-custom-900 dark:from-custom-950">
          <ModernImage />
          <div className="min-h-[calc(100vh_-_theme('spacing.4')_*_2)] mx-3 lg:w-[40rem] shrink-0 px-6 py-6 flex items-center justify-center m-4 bg-white dark:bg-zink-800 rounded-lg z-10 relative dark:text-zink-100 md:mx-auto xl:mx-4 dark:border-zink-700 shadow-lg">
            <div className="flex flex-col w-full h-full justify-center">
              <div className="w-full max-w-xs mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                  <h1 className="text-2xl font-bold text-black dark:text-white">Verify Your Email</h1>
                </div>

                <div id="successAlert" className={`p-3 mb-3 text-sm text-blue-600 rounded-lg bg-gray-100 dark:bg-gray-500/20 dark:border-gray-500/50 dark:text-black`}>
                  A verification link has been sent to <strong className="font-medium">{userEmail}</strong>.
                </div>
                
                {message.text && (
                  <div className={`p-3 mb-3 text-xs rounded-lg ${
                    message.type === 'error' 
                      ? 'text-red-800 border border-red-300 bg-red-100 dark:bg-red-500/20 dark:border-red-500/50 dark:text-red-400'
                      : 'text-green-800 border border-green-300 bg-green-100 dark:bg-green-500/20 dark:border-green-500/50 dark:text-green-400'
                  }`}>
                    {message.text}
                  </div>
                )}

                <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm">
                  Please check your inbox and click the link to verify your email before proceeding.
                </p>

                <button
                  onClick={handleResendEmail}
                  className="w-full py-3 mb-4 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 active:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Resend Verification Email
                </button>

                <button
                  onClick={handleContinue}
                  className="w-full py-3 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500/50 active:bg-green-800 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  I Have Verified My Email
                </button>

                <div className="text-center pt-8 mt-2">
                  <p className="text-gray-700 dark:text-zink-300 text-sm">
                    Already have an account?{" "}
                    <Link to="/signin" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                      Sign In
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

  return (
    <React.Fragment>
      {/* Blue overlay background */}
      <div className="absolute inset-0 bg-blue-900 z-0"></div>
      
      <div className="relative flex flex-col w-full overflow-hidden xl:flex-row to-custom-800 bg-gradient-to-r from-custom-900 dark:to-custom-900 dark:from-custom-950">
        <ModernImage />
        <div className="min-h-[calc(100vh_-_theme('spacing.4')_*_2)] mx-3 lg:w-[40rem] shrink-0 px-6 py-6 flex items-center justify-center m-4 bg-white dark:bg-zink-800 rounded-lg z-10 relative dark:text-zink-100 md:mx-auto xl:mx-4 dark:border-zink-700 shadow-lg">
          <div className="flex flex-col w-full h-full justify-center">
            <div className="w-full max-w-xs mx-auto">
              {/* Header */}
              <div className="text-center mb-10">
                <h1 className="text-2xl font-bold text-black dark:text-white">
                  {franchiseContext ? "Create Partner Account" :
                   location.state?.selectedPlan ? "Create Your Account" : "Sign Up"}
                </h1>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Message Alert */}
                {message.text && (
                  <div className={`p-3 mb-3 text-xs rounded-lg ${
                    message.type === 'error' 
                      ? 'text-red-800 border border-red-300 bg-red-100 dark:bg-red-500/20 dark:border-red-500/50 dark:text-red-400'
                      : 'text-green-800 border border-green-300 bg-green-100 dark:bg-green-500/20 dark:border-green-500/50 dark:text-green-400'
                  }`}>
                    {message.text}
                  </div>
                )}

                {/* Email field */}
                <div className="space-y-3">
                  <label htmlFor="email" className="block text-sm font-semibold text-black dark:text-white">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`w-full px-4 py-3 text-sm bg-gray-50 dark:bg-zink-700 border border-gray-300 dark:border-zink-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:shadow-gray-300 focus:shadow-sm transition-all duration-200 disabled:bg-gray-100 dark:disabled:bg-zink-600 disabled:text-gray-500 dark:disabled:text-zink-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-zink-400 ${formik.touched.email && formik.errors.email ? 'border-red-500 focus:ring-red-400 focus:shadow-red-300' : ''}`}
                    placeholder={franchiseContext ? "Enter partner's email" : "Enter your email"}
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
                  <label htmlFor="password" className="block text-sm font-semibold text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className={`w-full px-4 py-3 text-sm bg-gray-50 dark:bg-zink-700 border border-gray-300 dark:border-zink-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:shadow-gray-300 focus:shadow-sm transition-all duration-200 disabled:bg-gray-100 dark:disabled:bg-zink-600 disabled:text-gray-500 dark:disabled:text-zink-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-zink-400 pr-10 ${formik.touched.password && formik.errors.password ? 'border-red-500 focus:ring-red-400 focus:shadow-red-300' : ''}`}
                      placeholder="Create password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-zink-400 dark:hover:text-zink-200 transition-colors p-1"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.password}</div>
                  )}
                </div>

                {/* Confirm Password field */}
                <div className="space-y-3">
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-black dark:text-white">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      className={`w-full px-4 py-3 text-sm bg-gray-50 dark:bg-zink-700 border border-gray-300 dark:border-zink-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:shadow-gray-300 focus:shadow-sm transition-all duration-200 disabled:bg-gray-100 dark:disabled:bg-zink-600 disabled:text-gray-500 dark:disabled:text-zink-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-zink-400 pr-10 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500 focus:ring-red-400 focus:shadow-red-300' : ''}`}
                      placeholder="Re-enter password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-zink-400 dark:hover:text-zink-200 transition-colors p-1"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.confirmPassword}</div>
                  )}
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-center gap-2 mt-8">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="size-4 border border-gray-300 rounded focus:ring-1 focus:ring-gray-400 checked:bg-blue-600 checked:border-blue-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:border-zink-500"
                    required
                    disabled={isLoading}
                  />
                  <label htmlFor="terms" className="text-sm font-semibold text-black dark:text-white">
                    I agree to the{" "}
                    <Link to="/terms" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Create Account button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 active:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg mt-8"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </div>
                  ) : "Create Account"}
                </button>
              </form>

              {/* Home link */}
              <div className="text-center pt-8 mt-2">
                <p className="text-gray-700 dark:text-zink-300 text-sm">
                  Back To{" "}
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
};

export default Signup;