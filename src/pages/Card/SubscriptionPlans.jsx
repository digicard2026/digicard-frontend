// import React, { useState, useEffect } from 'react';
// const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || '';
// import { CHECK_URL, PLAN_URL, PAYMENT_URL } from "../../utility/constants";

// console.log("rozerpay id", RAZORPAY_KEY_ID);

// const SubscriptionPlans = () => {
//   const [plans, setPlans] = useState([]);
//   const [filteredPlans, setFilteredPlans] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [billingCycle, setBillingCycle] = useState('monthly');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [activeSubscription, setActiveSubscription] = useState(null);
//   const [userInfo, setUserInfo] = useState({
//     name: 'John Doe',
//     email: 'john@example.com',
//     contact: '9478548595'
//   });

//   // Load Razorpay script
//   useEffect(() => {
//     const loadRazorpayScript = () => {
//       if (window.Razorpay) return;

//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onerror = () => {
//         console.error('Failed to load Razorpay script');
//       };
//       document.body.appendChild(script);
//     };

//     loadRazorpayScript();
//   }, []);

//   // Load plans and subscription status
//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   // Filter plans when category changes
//   useEffect(() => {
//     filterPlans();
//   }, [selectedCategory, plans]);

//   const loadInitialData = async () => {
//     try {
//       setLoading(true);
//       // Load plans from your existing endpoint
//       const plansRes = await fetch(`${PLAN_URL}/`, {
//         credentials: 'include' // Important: Send cookies
//       });
      
//       if (plansRes.ok) {
//         const plansData = await plansRes.json();
//         setPlans(plansData);
//         setFilteredPlans(plansData);
//       } else {
//         // Fallback to demo data if API fails
//         loadDemoData();
//       }

//       // Load active subscription
//       await checkUserSubscription();
      
//     } catch (error) {
//       console.error('Error loading data:', error);
//       loadDemoData();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadDemoData = () => {
//     // Demo plans data
//     const demoPlans = [
//       {
//         "_id": "6942fdffe68a4733d3db5584",
//         "category": "personal",
//         "duration": "monthly",
//         "durationDays": 30,
//         "price": 500
//       },
//       {
//         "_id": "6942fdffe68a4733d3db5585",
//         "category": "personal",
//         "duration": "six_months",
//         "durationDays": 180,
//         "price": 1500
//       },
//       {
//         "_id": "6942fdffe68a4733d3db5586",
//         "category": "personal",
//         "duration": "yearly",
//         "durationDays": 365,
//         "price": 3500
//       },
//       {
//         "_id": "6942fdffe68a4733d3db5587",
//         "category": "business",
//         "duration": "monthly",
//         "durationDays": 30,
//         "price": 800
//       },
//       {
//         "_id": "6942fdffe68a4733d3db5588",
//         "category": "business",
//         "duration": "six_months",
//         "durationDays": 180,
//         "price": 2800
//       },
//       {
//         "_id": "6942fdffe68a4733d3db5589",
//         "category": "business",
//         "duration": "yearly",
//         "durationDays": 365,
//         "price": 6800
//       },
//       {
//         "_id": "6942fdffe68a4733d3db558a",
//         "category": "business premium",
//         "duration": "monthly",
//         "durationDays": 30,
//         "price": 1200
//       },
//       {
//         "_id": "6942fdffe68a4733d3db558b",
//         "category": "business premium",
//         "duration": "six_months",
//         "durationDays": 180,
//         "price": 4200
//       },
//       {
//         "_id": "6942fdffe68a4733d3db558c",
//         "category": "business premium",
//         "duration": "yearly",
//         "durationDays": 365,
//         "price": 8200
//       }
//     ];
    
//     setPlans(demoPlans);
//     setFilteredPlans(demoPlans);
//     setError('Using demo data. Please connect to backend for real data.');
//   };

//   const filterPlans = () => {
//     if (selectedCategory === 'all') {
//       setFilteredPlans(plans);
//     } else {
//       const filtered = plans.filter(plan => 
//         plan.category.toLowerCase() === selectedCategory.toLowerCase()
//       );
//       setFilteredPlans(filtered);
//     }
//   };

//   // Check user's active subscription
//   const checkUserSubscription = async () => {
//     try {
//       const response = await fetch(`${CHECK_URL}/status`, {
//         credentials: 'include' // Cookies will be sent automatically
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.success && data.data.hasSubscription) {
//           setActiveSubscription(data.data);
//         } else {
//           setActiveSubscription(null);
//         }
//       }
//     } catch (error) {
//       console.error('Error checking subscription:', error);
//     }
//   };

//   // Cancel subscription
//   const cancelSubscription = async () => {
//     if (!window.confirm('Are you sure you want to cancel your subscription?')) return;

//     try {
//       const response = await fetch(`${PAYMENT_URL}/cancel`, {
//         method: 'POST',
//         credentials: 'include', // Send cookies
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         alert('Subscription cancelled successfully');
//         await checkUserSubscription(); // Refresh status
//       } else {
//         alert(`Failed to cancel: ${data.message}`);
//       }
//     } catch (error) {
//       console.error('Error cancelling subscription:', error);
//       alert('Error cancelling subscription');
//     }
//   };

//   // Handle payment
//   const handlePayment = async (plan) => {
//     if (!window.Razorpay) {
//       alert('Payment service is not available. Please try again later.');
//       return;
//     }

//     // Check if key is configured
//     if (RAZORPAY_KEY_ID === 'rzp_test_YOUR_ACTUAL_KEY_HERE') {
//       alert('⚠️ Please configure your Razorpay Key ID!\n\n1. Go to Razorpay Dashboard\n2. Get your Key ID from Settings → API Keys\n3. Replace "rzp_test_YOUR_ACTUAL_KEY_HERE" with your actual key');
//       return;
//     }

//     setIsProcessing(true);

//     try {
//       console.log('Starting payment for plan:', plan);

//       // 1. Create subscription order
//       const orderResponse = await fetch(`${PAYMENT_URL}/create-subscription-order`, {
//         method: 'POST',
//         credentials: 'include', // Send cookies
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           planId: plan._id
//         })
//       });

//       if (!orderResponse.ok) {
//         throw new Error(`Failed to create order: ${orderResponse.status}`);
//       }

//       const orderData = await orderResponse.json();

//       if (!orderData.success) {
//         throw new Error(orderData.message || 'Failed to create order');
//       }

//       console.log('Order created:', orderData.order.id);

//       // 2. Initialize Razorpay
//       const options = {
//         key: RAZORPAY_KEY_ID,
//         amount: orderData.order.amount,
//         currency: orderData.order.currency,
//         name: 'Gravity Wave Labs',
//         description: `${plan.category} - ${formatDuration(plan.duration)} Subscription`,
//         image: 'https://via.placeholder.com/100', // Add your logo
//         order_id: orderData.order.id,
//         handler: async function(response) {
//           setIsProcessing(true);
          
//           try {
//             console.log('Payment response received:', response);

//             // 3. Verify and activate subscription
//             const verifyResponse = await fetch(`${PAYMENT_URL}/verify-and-activate`, {
//               method: 'POST',
//               credentials: 'include', // Send cookies
//               headers: {
//                 'Content-Type': 'application/json'
//               },
//               body: JSON.stringify({
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 planId: plan._id
//               })
//             });

//             const verifyData = await verifyResponse.json();
//             setIsProcessing(false);

//             if (verifyData.success) {
//               console.log('Subscription activated:', verifyData);
              
//               // Show success message with dates
//               const endDate = new Date(verifyData.planDetails.endDate);
//               const formattedEndDate = endDate.toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//               });

//               alert(`🎉 PAYMENT SUCCESSFUL!\n\nYour ${plan.category} ${formatDuration(plan.duration)} subscription is now active.\n\nAmount: ₹${plan.price}\nValid until: ${formattedEndDate}\nPayment ID: ${response.razorpay_payment_id}`);
              
//               // Refresh subscription status
//               await checkUserSubscription();
//             } else {
//               alert(`❌ Payment verification failed: ${verifyData.message}`);
//               console.error('Payment verification failed:', verifyData);
//             }
//           } catch (verifyError) {
//             setIsProcessing(false);
//             console.error('Error verifying payment:', verifyError);
//             alert('⚠️ Error verifying payment. Please contact support with your payment ID.');
//           }
//         },
//         prefill: {
//           name: userInfo.name,
//           email: userInfo.email,
//           contact: userInfo.contact
//         },
//         notes: {
//           planId: plan._id,
//           planName: `${plan.category} - ${formatDuration(plan.duration)}`
//         },
//         theme: {
//           color: '#4F46E5'
//         },
//         modal: {
//           ondismiss: function() {
//             setIsProcessing(false);
//             console.log('Payment modal dismissed by user');
//           }
//         }
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();

//     } catch (error) {
//       setIsProcessing(false);
//       console.error('Error initiating payment:', error);
//       alert(`❌ Failed to initiate payment: ${error.message}\n\nPlease check:\n1. You are logged in\n2. Backend server is running\n3. Razorpay Key is correct`);
//     }
//   };

//   // Helper functions - KEEPING YOUR EXISTING LOGIC
//   const formatDuration = (duration) => {
//     const durationMap = {
//       'monthly': 'Monthly',
//       'six_months': '6 Months',
//       'yearly': 'Yearly'
//     };
//     return durationMap[duration] || duration.replace('_', ' ');
//   };

//   const formatCategory = (category) => {
//     return category
//       .split(' ')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');
//   };

//   const calculateMonthlyPrice = (price, durationDays) => {
//     return Math.round((price / (durationDays / 30)) * 100) / 100;
//   };

//   const calculateYearlyPrice = (price, durationDays) => {
//     return Math.round((price / (durationDays / 365)) * 100) / 100;
//   };

//   // NEW UI FUNCTION: Get billing frequency text
//   const getBillingFrequencyText = (plan) => {
//     const durationMap = {
//       'monthly': 'per month',
//       'six_months': ' 6 months',
//       'yearly': 'per year'
//     };
//     return durationMap[plan.duration] || 'per period';
//   };

//   const getCategoryColor = (category) => {
//     const colors = {
//       'personal': {
//         bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
//         border: 'border-blue-200',
//         text: 'text-blue-700',
//         lightBg: 'bg-blue-50'
//       },
//       'business': {
//         bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
//         border: 'border-purple-200',
//         text: 'text-purple-700',
//         lightBg: 'bg-purple-50'
//       },
//       'business premium': {
//         bg: 'bg-gradient-to-br from-amber-500 to-orange-600',
//         border: 'border-amber-200',
//         text: 'text-amber-700',
//         lightBg: 'bg-amber-50'
//       }
//     };
//     return colors[category] || {
//       bg: 'bg-gradient-to-br from-gray-500 to-gray-600',
//       border: 'border-gray-200',
//       text: 'text-gray-700',
//       lightBg: 'bg-gray-50'
//     };
//   };

//   const getFeaturesForPlan = (category) => {
//     const features = {
//       'personal': [
//         'Up to 5 projects',
//         'Basic analytics',
//         'Email support',
//         '1GB storage',
//         'Community access'
//       ],
//       'business': [
//         'Up to 50 projects',
//         'Advanced analytics',
//         'Priority email support',
//         '50GB storage',
//         'Team collaboration',
//         'Custom branding'
//       ],
//       'business premium': [
//         'Unlimited projects',
//         'Advanced analytics & reports',
//         '24/7 phone & email support',
//         '500GB storage',
//         'Advanced team features',
//         'Custom integrations',
//         'Dedicated account manager',
//         'SLA guarantee'
//       ]
//     };
//     return features[category] || [];
//   };

//   const getSavingsPercentage = (plan) => {
//     const monthlyPlan = plans.find(p => 
//       p.category === plan.category && p.duration === 'monthly'
//     );
    
//     if (!monthlyPlan || plan.duration === 'monthly') return null;
    
//     const monthlyEquivalent = (monthlyPlan.price / monthlyPlan.durationDays) * plan.durationDays;
//     const savings = ((monthlyEquivalent - plan.price) / monthlyEquivalent) * 100;
//     return Math.round(savings);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const categories = ['all', 'personal', 'business', 'business premium'];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
//             <p className="mt-6 text-lg text-gray-600">Loading subscription plans...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header - Using new UI */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
//             Choose Your Perfect Plan
//           </h1>
//           <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
//             Select from our flexible subscription options designed to fit your needs
//           </p>
          
//           {/* Error Message - Using new UI */}
//           {error && (
//             <div className="mb-8 rounded-lg bg-red-50 p-4">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm text-red-700">{error}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Category Filter */}
//         <div className="flex justify-center mb-10">
//           <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
//                   selectedCategory === category
//                     ? 'bg-blue-600 text-white shadow-sm'
//                     : 'text-gray-700 hover:bg-gray-100'
//                 }`}
//               >
//                 {category === 'all' ? 'All Plans' : formatCategory(category)}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Processing Overlay */}
//         {isProcessing && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4">
//               <div className="flex flex-col items-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
//                 <p className="text-lg font-medium text-gray-900">Processing Payment</p>
//                 <p className="text-gray-600 mt-2 text-center">Please wait while we redirect you to the payment gateway...</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Plans Grid - Using new UI */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredPlans.map((plan) => {
//             const categoryColor = getCategoryColor(plan.category);
//             const features = getFeaturesForPlan(plan.category);
//             const savings = getSavingsPercentage(plan);
//             const displayPrice = billingCycle === 'monthly' 
//               ? calculateMonthlyPrice(plan.price, plan.durationDays)
//               : calculateYearlyPrice(plan.price, plan.durationDays);
            
//             return (
//               <div
//                 key={plan._id}
//                 className={`relative rounded-2xl shadow-lg overflow-hidden border ${categoryColor.border} hover:shadow-xl transition-shadow duration-300`}
//               >
//                 {/* Badge for savings */}
//                 {savings && (
//                   <div className="absolute top-4 right-4 z-10">
//                     <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
//                       Save {savings}%
//                     </span>
//                   </div>
//                 )}

//                 {/* Plan Header - Using new UI */}
//                 <div className={`${categoryColor.bg} p-8 text-white`}>
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="text-2xl font-bold">{formatCategory(plan.category)}</h3>
//                       <p className="text-blue-100 mt-1">{formatDuration(plan.duration)} Plan</p>
//                     </div>
//                   </div>
                  
//                   {/* Price - Using new UI: Showing full amount with frequency */}
//                   <div className="mt-6">
//                     <div className="flex items-baseline flex-wrap">
//                       <span className="text-5xl font-extrabold">₹{plan.price}</span>
//                       <div className="flex items-baseline ml-2">
//                         <span className="text-lg text-blue-100">/</span>
//                         <span className="text-base text-blue-100 ml-1 whitespace-nowrap">
//                           {getBillingFrequencyText(plan)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <p className="mt-2 text-blue-100 text-sm">
//                     {plan.duration === 'monthly'
//                       ? 'Billed monthly'
//                       : plan.duration === 'six_months'
//                         ? 'Billed 6 months'
//                         : 'Billed annually'}
//                   </p>
//                 </div>

//                 {/* Plan Body */}
//                 <div className="p-8 bg-white">
//                   {/* Features List */}
//                   <ul className="space-y-4 mb-8">
//                     {features.map((feature, index) => (
//                       <li key={index} className="flex items-start">
//                         <svg
//                           className={`h-6 w-6 flex-shrink-0 ${categoryColor.text}`}
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M5 13l4 4L19 7"
//                           />
//                         </svg>
//                         <span className="ml-3 text-gray-700">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>

//                   {/* Additional Info */}
//                   <div className={`rounded-lg ${categoryColor.lightBg} p-4 mb-6`}>
//                     <div className="flex items-center text-sm">
//                       <svg className={`h-5 w-5 ${categoryColor.text} mr-2`} fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                       </svg>
//                       <span className="text-gray-600">
//                         {plan.durationDays === 30 ? 'Renews monthly' : 
//                          plan.durationDays === 180 ? 'Renews 6 months' : 
//                          'Renews yearly'}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Subscribe Button - KEEPING YOUR LOGIC */}
//                   <button
//                     onClick={() => handlePayment(plan)}
//                     disabled={isProcessing || RAZORPAY_KEY_ID === 'rzp_test_YOUR_ACTUAL_KEY_HERE'}
//                     className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${categoryColor.bg} hover:opacity-90 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
//                   >
//                     {isProcessing ? (
//                       <>
//                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                         Processing...
//                       </>
//                     ) : RAZORPAY_KEY_ID === 'rzp_test_YOUR_ACTUAL_KEY_HERE' ? (
//                       'Configure Payment First'
//                     ) : (
//                       `Pay`
//                     )}
//                   </button>

//                   {/* Additional CTA - Using new UI */}
//                   <p className="text-center text-sm text-gray-500 mt-4">
//                     No credit card required for trial
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Empty State */}
//         {filteredPlans.length === 0 && !loading && (
//           <div className="text-center py-12">
//             <div className="text-gray-400 text-6xl mb-4">📋</div>
//             <h3 className="text-2xl font-semibold text-gray-900">No plans found</h3>
//             <p className="mt-2 text-gray-600">Try selecting a different category</p>
//           </div>
//         )}

//         {/* Footer */}
//         <div className="mt-16 text-center">
//           <div className="inline-grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-600">
//             <div>
//               <p className="font-semibold text-gray-900">✓ Free Trial</p>
//               <p className="mt-1">14 days free on all plans</p>
//             </div>
//             <div>
//               <p className="font-semibold text-gray-900">🔄 Easy Switch</p>
//               <p className="mt-1">Change plans anytime</p>
//             </div>
//             <div>
//               <p className="font-semibold text-gray-900">💳 Secure Payment</p>
//               <p className="mt-1">SSL encrypted payments</p>
//             </div>
//             <div>
//               <p className="font-semibold text-gray-900">❌ No Lock-in</p>
//               <p className="mt-1">Cancel anytime</p>
//             </div>
//           </div>
          
//           {/* Payment Security Info */}
//           <div className="mt-12 pt-8 border-t border-gray-200">
//             <div className="flex items-center justify-center space-x-4">
//               <svg className="h-8 w-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
//               </svg>
//               <p className="text-sm text-gray-600">
//                 Payments securely processed by <span className="font-semibold">Razorpay</span>
//               </p>
//             </div>
//             <p className="text-xs text-gray-500 mt-2">
//               Your payment information is encrypted and secure. We never store your card details.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPlans; 
import React, { useState, useEffect } from 'react';
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || '';
import { CHECK_URL, PLAN_URL, PAYMENT_URL } from "../../utility/constants";
import { useNavigate } from 'react-router-dom'; // Add navigation

console.log("rozerpay id", RAZORPAY_KEY_ID);

const SubscriptionPlans = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    contact: '9478548595'
  });

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      if (window.Razorpay) return;

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
      };
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  // Load plans and subscription status
  useEffect(() => {
    loadInitialData();
  }, []);

  // Filter plans when category changes
  useEffect(() => {
    filterPlans();
  }, [selectedCategory, plans]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      // Load plans from your existing endpoint
      const plansRes = await fetch(`${PLAN_URL}/`, {
        credentials: 'include' // Important: Send cookies
      });
      
      if (plansRes.ok) {
        const plansData = await plansRes.json();
        // Filter to show only yearly plans
        const yearlyPlans = plansData.filter(plan => plan.duration === 'yearly');
        setPlans(yearlyPlans);
        setFilteredPlans(yearlyPlans);
      } else {
        // Fallback to demo data if API fails
        loadDemoData();
      }

      // Load active subscription
      await checkUserSubscription();
      
    } catch (error) {
      console.error('Error loading data:', error);
      loadDemoData();
    } finally {
      setLoading(false);
    }
  };

  const loadDemoData = () => {
    // DEMO DATA - ONLY YEARLY PLANS FOR NOW
    const demoPlans = [
      {
        "_id": "6942fdffe68a4733d3db5586",
        "category": "personal",
        "duration": "yearly",
        "durationDays": 365,
        "price": 3500
      },
      {
        "_id": "6942fdffe68a4733d3db5589",
        "category": "business",
        "duration": "yearly",
        "durationDays": 365,
        "price": 6800
      },
      {
        "_id": "6942fdffe68a4733d3db558c",
        "category": "business premium",
        "duration": "yearly",
        "durationDays": 365,
        "price": 8200
      }
    ];
    
    setPlans(demoPlans);
    setFilteredPlans(demoPlans);
    setError('Using demo data. Please connect to backend for real data.');
  };

  const filterPlans = () => {
    if (selectedCategory === 'all') {
      setFilteredPlans(plans);
    } else {
      const filtered = plans.filter(plan => 
        plan.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredPlans(filtered);
    }
  };

  // Check user's active subscription
  const checkUserSubscription = async () => {
    try {
      const response = await fetch(`${CHECK_URL}/status`, {
        credentials: 'include' // Cookies will be sent automatically
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data.hasSubscription) {
          setActiveSubscription(data.data);
        } else {
          setActiveSubscription(null);
        }
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  // Cancel subscription
  const cancelSubscription = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription?')) return;

    try {
      const response = await fetch(`${PAYMENT_URL}/cancel`, {
        method: 'POST',
        credentials: 'include', // Send cookies
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Subscription cancelled successfully');
        await checkUserSubscription(); // Refresh status
      } else {
        alert(`Failed to cancel: ${data.message}`);
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      alert('Error cancelling subscription');
    }
  };

  // Handle payment
  const handlePayment = async (plan) => {
    if (!window.Razorpay) {
      alert('Payment service is not available. Please try again later.');
      return;
    }

    // Check if key is configured
    if (RAZORPAY_KEY_ID === 'rzp_test_YOUR_ACTUAL_KEY_HERE') {
      alert('⚠️ Please configure your Razorpay Key ID!\n\n1. Go to Razorpay Dashboard\n2. Get your Key ID from Settings → API Keys\n3. Replace "rzp_test_YOUR_ACTUAL_KEY_HERE" with your actual key');
      return;
    }

    setIsProcessing(true);

    try {
      console.log('Starting payment for plan:', plan);

      // 1. Create subscription order
      const orderResponse = await fetch(`${PAYMENT_URL}/create-subscription-order`, {
        method: 'POST',
        credentials: 'include', // Send cookies
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          planId: plan._id
        })
      });

      if (!orderResponse.ok) {
        throw new Error(`Failed to create order: ${orderResponse.status}`);
      }

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create order');
      }

      console.log('Order created:', orderData.order.id);

      // 2. Initialize Razorpay
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Gravity Wave Labs',
        description: `${plan.category} - ${formatDuration(plan.duration)} Subscription`,
        image: 'https://via.placeholder.com/100', // Add your logo
        order_id: orderData.order.id,
        handler: async function(response) {
          setIsProcessing(true);
          
          try {
            console.log('Payment response received:', response);

            // 3. Verify and activate subscription
            const verifyResponse = await fetch(`${PAYMENT_URL}/verify-and-activate`, {
              method: 'POST',
              credentials: 'include', // Send cookies
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planId: plan._id
              })
            });

            const verifyData = await verifyResponse.json();
            setIsProcessing(false);

            if (verifyData.success) {
              console.log('Subscription activated:', verifyData);
              
              // Show success message with dates
              const endDate = new Date(verifyData.planDetails.endDate);
              const formattedEndDate = endDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });

              alert(`🎉 PAYMENT SUCCESSFUL!\n\nYour ${plan.category} ${formatDuration(plan.duration)} subscription is now active.\n\nAmount: ₹${plan.price}\nValid until: ${formattedEndDate}\nPayment ID: ${response.razorpay_payment_id}`);
              
              // Navigate to dashboard after successful payment
              navigate('/card-dashbord');
              
              // Refresh subscription status
              await checkUserSubscription();
            } else {
              alert(`❌ Payment verification failed: ${verifyData.message}`);
              console.error('Payment verification failed:', verifyData);
            }
          } catch (verifyError) {
            setIsProcessing(false);
            console.error('Error verifying payment:', verifyError);
            alert('⚠️ Error verifying payment. Please contact support with your payment ID.');
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: userInfo.contact
        },
        notes: {
          planId: plan._id,
          planName: `${plan.category} - ${formatDuration(plan.duration)}`
        },
        theme: {
          color: '#4F46E5'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            console.log('Payment modal dismissed by user');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      setIsProcessing(false);
      console.error('Error initiating payment:', error);
      alert(`❌ Failed to initiate payment: ${error.message}\n\nPlease check:\n1. You are logged in\n2. Backend server is running\n3. Razorpay Key is correct`);
    }
  };

  // Helper functions
  const formatDuration = (duration) => {
    const durationMap = {
      'monthly': 'Monthly',
      'six_months': '6 Months',
      'yearly': 'Yearly'
    };
    return durationMap[duration] || duration.replace('_', ' ');
  };

  const formatCategory = (category) => {
    return category
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const calculateMonthlyPrice = (price, durationDays) => {
    return Math.round((price / (durationDays / 30)) * 100) / 100;
  };

  const calculateYearlyPrice = (price, durationDays) => {
    return Math.round((price / (durationDays / 365)) * 100) / 100;
  };

  // NEW UI FUNCTION: Get billing frequency text
  const getBillingFrequencyText = (plan) => {
    const durationMap = {
      'monthly': 'per month',
      'six_months': 'per 6 months',
      'yearly': 'per year'
    };
    return durationMap[plan.duration] || 'per period';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'personal': {
        bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
        border: 'border-blue-200',
        text: 'text-blue-700',
        lightBg: 'bg-blue-50'
      },
      'business': {
        bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
        border: 'border-purple-200',
        text: 'text-purple-700',
        lightBg: 'bg-purple-50'
      },
      'business premium': {
        bg: 'bg-gradient-to-br from-amber-500 to-orange-600',
        border: 'border-amber-200',
        text: 'text-amber-700',
        lightBg: 'bg-amber-50'
      }
    };
    return colors[category] || {
      bg: 'bg-gradient-to-br from-gray-500 to-gray-600',
      border: 'border-gray-200',
      text: 'text-gray-700',
      lightBg: 'bg-gray-50'
    };
  };

  const getFeaturesForPlan = (category) => {
    const features = {
      'personal': [
        'Up to 5 projects',
        'Basic analytics',
        'Email support',
        '1GB storage',
        'Community access',
         'Custom branding',
        'Dedicated account manager',
        'SLA guarantee'
      ],
      'business': [
        'Up to 50 projects',
        'Advanced analytics',
        'Priority email support',
        '50GB storage',
        'Team collaboration',
        'Custom branding',
        'Dedicated account manager',
        'SLA guarantee'
      ],
      'business premium': [
        'Unlimited projects',
        'Advanced analytics & reports',
        '24/7 phone & email support',
        '500GB storage',
        'Advanced team features',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantee'
      ]
    };
    return features[category] || [];
  };

  const getSavingsPercentage = (plan) => {
    const monthlyPlan = plans.find(p => 
      p.category === plan.category && p.duration === 'monthly'
    );
    
    if (!monthlyPlan || plan.duration === 'monthly') return null;
    
    const monthlyEquivalent = (monthlyPlan.price / monthlyPlan.durationDays) * plan.durationDays;
    const savings = ((monthlyEquivalent - plan.price) / monthlyEquivalent) * 100;
    return Math.round(savings);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const categories = ['all', 'personal', 'business', 'business premium'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-600">Loading subscription plans...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/card-dashbord')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Dashboard
          </button>
        </div>

        {/* Header - Slightly smaller */}
        <div className="text-center mb-14">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-3">
            Choose Your Perfect Plan
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-normal">
            Select from our flexible yearly subscription options designed to fit your needs
          </p>
          
          {/* Error Message */}
          {error && (
            <div className="mt-6 rounded-lg bg-red-50 p-3 max-w-2xl mx-auto">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-4 w-4 text-red-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white shadow-sm">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {category === 'all' ? 'All Plans' : formatCategory(category)}
              </button>
            ))}
          </div>
        </div>

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent mb-4"></div>
                <p className="text-lg font-semibold text-gray-900 mb-1">Processing Payment</p>
                <p className="text-gray-600 text-center text-sm">
                  Please wait while we redirect you to the payment gateway...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Plans Grid - Slightly smaller font sizes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredPlans.map((plan) => {
            const categoryColor = getCategoryColor(plan.category);
            const features = getFeaturesForPlan(plan.category);
            const savings = getSavingsPercentage(plan);
            
            return (
              <div
                key={plan._id}
                className={`relative rounded-xl shadow-lg overflow-hidden border ${categoryColor.border} hover:shadow-xl transition-all duration-300`}
              >
                {/* Badge for savings */}
                {savings && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800">
                      Save {savings}%
                    </span>
                  </div>
                )}

                {/* Plan Header - Smaller font sizes */}
                <div className={`${categoryColor.bg} px-6 py-7 text-white`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        {formatCategory(plan.category)}
                      </h3>
                      <p className="text-blue-100 text-sm opacity-90">
                        {formatDuration(plan.duration)} Plan
                      </p>
                    </div>
                  </div>
                  
                  {/* Price with smaller font */}
                  <div className="mt-6">
                    <div className="flex items-baseline flex-wrap">
                      <span className="text-3xl font-bold">₹{plan.price}</span>
                      <div className="flex items-baseline ml-2">
                        <span className="text-sm font-medium text-blue-100 opacity-90">/</span>
                        <span className="text-xs font-medium text-blue-100 opacity-90 ml-1 whitespace-nowrap">
                          {getBillingFrequencyText(plan)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="mt-2 text-blue-100 text-xs opacity-90">
                    Billed annually
                  </p>
                </div>

                {/* Plan Body */}
                <div className="px-6 py-7 bg-white">
                  {/* Features List with smaller font */}
                  <ul className="space-y-2.5 mb-6">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className={`h-4 w-4 flex-shrink-0 mt-0.5 ${categoryColor.text}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="ml-3 text-gray-700 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Additional Info */}
                  <div className={`rounded-lg ${categoryColor.lightBg} px-3 py-3 mb-6`}>
                    <div className="flex items-center">
                      <svg className={`h-4 w-4 ${categoryColor.text} mr-2 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600 text-xs">
                        Renews yearly • {plan.durationDays} days access
                      </span>
                    </div>
                  </div>

                  {/* Subscribe Button */}
                  <button
                    onClick={() => handlePayment(plan)}
                    disabled={isProcessing || RAZORPAY_KEY_ID === 'rzp_test_YOUR_ACTUAL_KEY_HERE'}
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${categoryColor.bg} hover:opacity-95 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Processing...
                      </>
                    ) : RAZORPAY_KEY_ID === 'rzp_test_YOUR_ACTUAL_KEY_HERE' ? (
                      'Configure Payment First'
                    ) : (
                      `Subscribe Now`
                    )}
                  </button>

                  {/* Additional CTA */}
                  <p className="text-center text-xs text-gray-500 mt-3">
                    Start your yearly subscription today
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredPlans.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-300 text-5xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No plans found</h3>
            <p className="text-gray-600 text-sm">Try selecting a different category</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-gray-600 max-w-5xl mx-auto">
            <div>
              <p className="font-bold text-gray-900 text-sm mb-1">✓ Secure Payment</p>
              <p className="text-gray-600">SSL encrypted payments</p>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm mb-1">🔄 Easy Management</p>
              <p className="text-gray-600">Manage subscription anytime</p>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm mb-1">📈 Best Value</p>
              <p className="text-gray-600">Yearly plans offer best savings</p>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm mb-1">❌ Cancel Anytime</p>
              <p className="text-gray-600">No long-term commitment</p>
            </div>
          </div>
          
          {/* Payment Security Info */}
          <div className="mt-12 pt-8 border-t border-gray-200 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <svg className="h-7 w-7 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <p className="text-sm font-semibold text-gray-700">
                Payments securely processed by <span className="text-blue-600">Razorpay</span>
              </p>
            </div>
            <p className="text-xs text-gray-500 max-w-2xl mx-auto">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;