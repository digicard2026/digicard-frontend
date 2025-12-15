import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, User } from "lucide-react";
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
      <div className="relative flex flex-col w-full overflow-hidden xl:flex-row to-custom-800 bg-gradient-to-r from-custom-900 dark:to-custom-900 dark:from-custom-950">
        <ModernImage />
        <div className="min-h-[calc(100vh_-_theme('spacing.4')_*_2)] mx-3 lg:w-[40rem] shrink-0 px-4 py-4 flex items-center justify-center m-4 bg-white rounded-xl z-10 relative dark:bg-zink-800 dark:text-zink-100 md:mx-auto xl:mx-4 dark:border-zink-700 shadow-md">
          <div className="flex flex-col w-full h-full justify-center">
            <div className="w-full max-w-sm mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  Verify Your Email
                </h2>
                <p className="text-gray-700 mb-4 text-base">
                  A verification link has been sent to <strong className="font-medium">{userEmail}</strong>.
                </p>
                <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                  Please check your inbox and click the link to verify your email before proceeding.
                </p>
              </div>

              {message.text && (
                <div className={`p-3 mb-4 text-xs rounded-lg ${
                  message.type === 'error' 
                    ? 'text-red-800 border border-red-300 bg-red-100 dark:bg-red-500/20 dark:border-red-500/50 dark:text-red-400'
                    : 'text-green-800 border border-green-300 bg-green-100 dark:bg-green-500/20 dark:border-green-500/50 dark:text-green-400'
                }`}>
                  {message.text}
                </div>
              )}

              <button
                onClick={handleResendEmail}
                className="w-full py-2.5 mb-4 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500/20 dark:text-zink-100 dark:bg-zink-800 dark:border-zink-600 dark:hover:bg-zink-700 transition-all duration-200"
              >
                Resend Verification Email
              </button>

              <button
                onClick={handleContinue}
                className="w-full py-2.5 text-sm font-semibold text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-700 active:bg-blue-800 transition-all duration-200"
              >
                I Have Verified My Email
              </button>

              <div className="text-center pt-6 mt-4 border-t border-gray-200 dark:border-zink-600">
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
    );
  }

  return (
    <React.Fragment>
      <div className="relative flex flex-col w-full overflow-hidden xl:flex-row to-custom-800 bg-gradient-to-r from-custom-900 dark:to-custom-900 dark:from-custom-950">
        <ModernImage />
        <div className="min-h-[calc(100vh_-_theme('spacing.4')_*_2)] mx-3 lg:w-[40rem] shrink-0 px-4 py-4 flex items-center justify-center m-4 bg-white rounded-xl z-10 relative dark:bg-zink-800 dark:text-zink-100 md:mx-auto xl:mx-4 dark:border-zink-700 shadow-md">
          <div className="flex flex-col w-full h-full justify-center">
            <div className="w-full max-w-sm mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-zink-100">
                  {franchiseContext ? "Create Partner Account" :
                   location.state?.selectedPlan ? "Create Your Account" : "Sign Up"}
                </h2>
                <p className="text-gray-600 dark:text-zink-400 mt-2 text-sm">
                  Create your account to get started
                </p>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-4">
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
                  <label htmlFor="email" className="block text-sm font-medium text-black dark:text-black">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-500" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 disabled:bg-gray-50 dark:disabled:bg-zink-700 disabled:border-gray-300 dark:disabled:border-zink-600 dark:disabled:text-zink-300 disabled:text-gray-500 text-gray-900 dark:text-white bg-white dark:bg-zink-800 border-gray-300 dark:border-zink-600 placeholder:text-gray-500 dark:placeholder:text-zink-400 ${
                        formik.touched.email && formik.errors.email ? 'border-red-500 focus:ring-red-500/50' : ''
                      }`}
                      placeholder={franchiseContext ? "Enter partner's email" : "Enter your email"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      disabled={isLoading}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.email}</div>
                  )}
                </div>

                {/* Password field */}
                <div className="space-y-3">
                  <label htmlFor="password" className="block text-sm font-medium text-black dark:text-black">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 disabled:bg-gray-50 dark:disabled:bg-zink-700 disabled:border-gray-300 dark:disabled:border-zink-600 dark:disabled:text-zink-300 disabled:text-gray-500 text-gray-900 dark:text-white bg-white dark:bg-zink-800 border-gray-300 dark:border-zink-600 placeholder:text-gray-500 dark:placeholder:text-zink-400 pr-10 ${
                        formik.touched.password && formik.errors.password ? 'border-red-500 focus:ring-red-500/50' : ''
                      }`}
                      placeholder="Create password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-zink-400 dark:hover:text-zink-200 transition-colors p-1"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.password}</div>
                  )}
                </div>

                {/* Confirm Password field */}
                <div className="space-y-3">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-black dark:text-black">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 disabled:bg-gray-50 dark:disabled:bg-zink-700 disabled:border-gray-300 dark:disabled:border-zink-600 dark:disabled:text-zink-300 disabled:text-gray-500 text-gray-900 dark:text-white bg-white dark:bg-zink-800 border-gray-300 dark:border-zink-600 placeholder:text-gray-500 dark:placeholder:text-zink-400 pr-10 ${
                        formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500 focus:ring-red-500/50' : ''
                      }`}
                      placeholder="Re-enter password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-zink-400 dark:hover:text-zink-200 transition-colors p-1"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.confirmPassword}</div>
                  )}
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-center gap-2 mt-6">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="size-4 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500/50 checked:bg-blue-600 checked:border-blue-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:border-zink-500"
                    required
                    disabled={isLoading}
                  />
                  <label htmlFor="terms" className="text-xs text-gray-700 dark:text-gray-300">
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
                  className="w-full py-2.5 text-sm font-semibold text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-700 active:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 mt-6"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </div>
                  ) : "Create Account"}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-zink-500"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white dark:bg-zink-800 text-gray-500 dark:text-zink-400">
                    Or sign up with
                  </span>
                </div>
              </div>

              {/* Social login buttons */}
              <div className="flex gap-3 mb-6">
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
                  Google
                </button>
                <button 
                  type="button" 
                  className="flex-1 flex items-center justify-center px-3 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500/20 dark:text-zink-100 dark:bg-zink-800 dark:border-zink-600 dark:hover:bg-zink-700 transition-all duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.666-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.787-.94 1.324-2.245 1.171-3.54-1.133.052-2.518.754-3.334 1.701-.735.85-1.389 2.207-1.208 3.514 1.26.091 2.544-.637 3.371-1.675z"/>
                  </svg>
                  Apple
                </button>
              </div>

              {/* Sign in link */}
              <div className="text-center pt-4 border-t border-gray-200 dark:border-zink-600">
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