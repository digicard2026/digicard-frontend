import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
 
const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRegistered, setIsRegistered] = useState(false);
  const [franchiseContext, setFranchiseContext] = useState(null);
 
  // ✅ Check if franchise is creating a partner OR if coming from plan selection
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
        createdBy: franchiseContext?.createdBy,
        selectedPlan: location.state?.selectedPlan
      }),
    });

    const data = await res.json();
    console.log("📨 Signup response:", data);

    if (res.ok) {
      if (data.data && data.data._id) {
        const userId = data.data._id;
        localStorage.setItem('user_id', userId);
        localStorage.setItem('user_email', values.email);
        
        // ✅ ONLY for plan selection customers - update role to 'customer'
        if (location.state?.selectedPlan) {
          try {
            console.log("🔄 Making role update API call for customer...");
            
            const updateRes = await fetch(`http://localhost:3000/api/v1/user/update-role-complete/${userId}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                role: 'customer',
                registrationComplete: false
              }),
            });

            const updateData = await updateRes.json();
            console.log("📡 Role update response:", updateData);
            console.log("📡 Role update status:", updateRes.status);

            if (updateRes.ok) {
              console.log("✅ Customer role set successfully");
              localStorage.setItem('selected_plan', location.state.selectedPlan);
              localStorage.setItem('user_role', 'customer');
            } else {
              console.log("❌ Role update failed:", updateData);
              localStorage.setItem('selected_plan', location.state.selectedPlan);
            }
          } catch (updateError) {
            console.error("🔥 Role update error:", updateError);
            localStorage.setItem('selected_plan', location.state.selectedPlan);
          }
        }
        
        // ✅ Existing franchise logic - NO CHANGES
        if (franchiseContext) {
          localStorage.setItem('franchise_created_by', franchiseContext.createdBy);
          localStorage.setItem('user_role', 'partner');
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
 
  // ✅ Handle navigation after successful registration
  const handleContinue = () => {
    if (franchiseContext) {
      // Existing franchise flow
      navigate("/signin/franchise");
    } else if (location.state?.selectedPlan) {
      // NEW: Plan selection customers go to create card WITH selected plan and email
      navigate("/create", {
        state: {
          selectedPlan: location.state.selectedPlan,
          userEmail: formData?.email || '' // Pass the email for auto-fill
        }
      });
    } else {
      // Existing regular signup flow
      navigate("/signin/franchise");
    }
  };
 
  // Form data state for email tracking
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
 
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
 
  // ✅ Success message with minimal changes
  if (isRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center w-full max-w-md">
          {franchiseContext ? (
            // ✅ Existing franchise success message
            <>
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                ✅ Partner Account Created!
              </h2>
              <p className="text-gray-700 mb-4">
                Partner account has been created successfully.
              </p>
              <p className="text-gray-600 mb-6 text-sm">
                Now complete the partner Personal profile.
              </p>
              <button
                onClick={handleContinue}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Complete Partner Profile
              </button>
            </>
          ) : location.state?.selectedPlan ? (
            // ✅ NEW: Plan selection customer success
            <>
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                🎉 Welcome to Personal Card!
              </h2>
              <p className="text-gray-700 mb-4">
                Your {location.state.selectedPlan.replace('-', ' ')} account is ready!
              </p>
              <p className="text-gray-600 mb-6 text-sm">
                Let's create your digital Personal card.
              </p>
              <button
                onClick={handleContinue}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Create Your Card
              </button>
            </>
          ) : (
            // ✅ Existing regular success message
            <>
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                🎉 Account Created Successfully!
              </h2>
              <p className="text-gray-700 mb-8">
                Your account has been created successfully.
              </p>
              <button
                onClick={handleContinue}
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
        {/* ✅ Show context banner */}
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
 
        {/* ✅ Show plan selection banner */}
        {location.state?.selectedPlan && !franchiseContext && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-green-800 font-semibold capitalize">
                  {location.state.selectedPlan.replace('-', ' ')} Plan Selected
                </p>
                <p className="text-green-600 text-sm">Creating your customer account</p>
              </div>
            </div>
          </div>
        )}
 
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {franchiseContext ? "Create Partner Account" :
           location.state?.selectedPlan ? "Create Your Account" : "Sign Up"}
        </h2>
 
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, handleChange }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Email ID
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder={franchiseContext ? "Enter partner's email" : "Enter your email"}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => {
                    handleChange(e);
                    handleFormChange(e);
                  }}
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
                  onChange={(e) => {
                    handleChange(e);
                    handleFormChange(e);
                  }}
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
                  onChange={(e) => {
                    handleChange(e);
                    handleFormChange(e);
                  }}
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
 
              {!franchiseContext && !location.state?.selectedPlan && (
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
