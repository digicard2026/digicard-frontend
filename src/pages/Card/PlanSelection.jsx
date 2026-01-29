// // PlanSelection.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaBuilding, FaGem, FaCrown, FaCheck } from "react-icons/fa";

// const PlanSelection = () => {
//   const navigate = useNavigate();
//   const [selectedPlan, setSelectedPlan] = useState('Personal');

//   const cardPlans = {
//     'Personal': {
//       name: 'Personal',
//       description: 'Basic digital card with essential features',
//       icon: <FaBuilding className="w-8 h-8" />,
//       color: 'blue',
//       features: [
//         'Profile Page',
//         'Basic Contact Info',
//         'Social Links',
//         'Custom Design',
//         'Personal Hours',
//         'One-Tap Contact'
//       ],
//       price: '₹500/month'
//     },
//     'Business': {
//       name: 'Business',
//       description: 'Enhanced features for professional presence',
//       icon: <FaGem className="w-8 h-8" />,
//       color: 'purple',
//       features: [
//         'All Personal Features +',
//         'Profile Video',
//         'Professional Details',
//         'Product Gallery',
//         'Dynamic QR Code',
//         'Testimonials',
//         'Downloads Section'
//       ],
//       price: '₹800/month'
//     },
//     'BusinessPremium': { 
//       name: 'BusinessPremium', 
//       description: 'Advanced features for BusinessPremium', 
//       icon: <FaCrown className="w-8 h-8" />,
//       color: 'gold',
//       features: [
//         'All Premium Features +',
//         'Services & Products Catalog',
//         'Interactive Elements',
//         'NFC Card Support',
//         'Client List Display',
//         'Advanced Personal Details',
//         'Brand Label Products'
//       ],
//       price: '₹1200/month'
//     }
//   };

//   const handlePlanSelect = (plan) => {
//     setSelectedPlan(plan);
//   };

//   // const handleContinue = () => {
//   //   // Navigate to signup page with selected plan
//   //   navigate('/signup', { state: { selectedPlan } });
//   // };

//   const handleContinue = () => {
//   navigate('/signup', { 
//     state: { 
//       selectedPlan,
//       createdBy: location.state?.createdBy,// Pass it along
//          fromPartnerDashboard: location.state?.fromPartnerDashboard 
//     } 
//   });
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4" id="plan">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-slate-900 mb-4">
//             Choose Your Plan
//           </h1>
//           <p className="text-xl text-slate-600 max-w-2xl mx-auto">
//             Select the perfect plan for your digital Personal card needs. 
//             Start free and upgrade anytime.
//           </p>
//         </div>

//         {/* Plans Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {Object.entries(cardPlans).map(([key, plan]) => (
//             <div
//               key={key}
//               className={`relative rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
//                 selectedPlan === key
//                   ? `bg-white shadow-2xl border-2 ${
//                       plan.color === 'blue' ? 'border-blue-500' :
//                       plan.color === 'purple' ? 'border-purple-500' :
//                       'border-yellow-500'
//                     } transform scale-105`
//                   : 'bg-white shadow-lg border border-slate-200 hover:shadow-xl'
//               }`}
//               onClick={() => handlePlanSelect(key)}
//             >
//               {/* Popular Badge for Business */}
//               {key === 'Business' && (
//                 <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//                   <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
//                     Most Popular
//                   </span>
//                 </div>
//               )}

//               {/* Selected Indicator */}
//               {selectedPlan === key && (
//                 <div className="absolute -top-2 -right-2">
//                   <div className={`${
//                     plan.color === 'blue' ? 'bg-blue-500' :
//                     plan.color === 'purple' ? 'bg-purple-500' :
//                     'bg-yellow-500'
//                   } text-white rounded-full p-1`}>
//                     <FaCheck className="w-4 h-4" />
//                   </div>
//                 </div>
//               )}

//               {/* Plan Icon */}
//               <div className={`w-16 h-16 rounded-2xl ${
//                 plan.color === 'blue' ? 'bg-blue-100 text-blue-600' :
//                 plan.color === 'purple' ? 'bg-purple-100 text-purple-600' :
//                 'bg-yellow-100 text-yellow-600'
//               } flex items-center justify-center mb-6 mx-auto`}>
//                 {plan.icon}
//               </div>

//               {/* Plan Name & Price */}
//               <div className="text-center mb-6">
//                 <h3 className="text-2xl font-bold text-slate-900 mb-2">
//                   {plan.name}
//                 </h3>
//                 <div className="text-3xl font-bold text-slate-900">
//                   {plan.price}
//                 </div>
//                 {plan.price !== 'Free' && (
//                   <p className="text-slate-500 text-sm mt-1">per month</p>
//                 )}
//               </div>

//               {/* Description */}
//               <p className="text-slate-600 text-center mb-6">
//                 {plan.description}
//               </p>

//               {/* Features List */}
//               <ul className="space-y-3 mb-8">
//                 {plan.features.map((feature, index) => (
//                   <li key={index} className="flex items-center">
//                     <FaCheck className={`w-4 h-4 ${
//                       plan.color === 'blue' ? 'text-blue-500' :
//                       plan.color === 'purple' ? 'text-purple-500' :
//                       'text-yellow-500'
//                     } mr-3 flex-shrink-0`} />
//                     <span className="text-slate-700">{feature}</span>
//                   </li>
//                 ))}
//               </ul>

//               {/* Select Button */}
//               <button
//                 className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
//                   selectedPlan === key
//                     ? `${
//                         plan.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
//                         plan.color === 'purple' ? 'bg-purple-500 hover:bg-purple-600' :
//                         'bg-yellow-500 hover:bg-yellow-600'
//                       } text-white`
//                     : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
//                 }`}
//               >
//                 {selectedPlan === key ? 'Selected' : 'Select Plan'}
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Continue Button */}
//         <div className="text-center mt-12">
//           <button
//             onClick={handleContinue}
//             className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg"
//           >
//             Continue with {cardPlans[selectedPlan]?.name} Plan
//           </button>
          
//           <p className="text-slate-500 mt-4">
//             No credit card required for free plan. Upgrade anytime.
//           </p>
//         </div>

//         {/* Feature Comparison Table */}
//         {/* Plan Comparison Table - Added Here */}
// <div className="mt-16 bg-white rounded-xl shadow dark:bg-zink-700 dark:shadow-zink-500/30 p-6">
//     <h2 className="text-lg font-semibold text-slate-800 dark:text-zink-50 text-center mb-6">
//         Plan Comparison
//     </h2>
//     <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//             <thead>
//                 <tr className="border-b border-slate-200 dark:border-zink-500">
//                     <th className="text-left py-3 font-medium text-slate-700 dark:text-zink-200">Features</th>
//                     {Object.entries(cardPlans).map(([key, plan]) => (
//                         <th key={key} className="text-center py-3 font-medium text-slate-700 dark:text-zink-200">
//                             {plan.name}
//                         </th>
//                     ))}
//                 </tr>
//             </thead>
//             <tbody>
//                 {/* Profile Features */}
//                 <tr className="border-b border-slate-100 dark:border-zink-600">
//                     <td className="py-3 text-slate-600 dark:text-zink-300">Profile Page</td>
//                     <td className="text-center py-3"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td>
//                     <td className="text-center py-3"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td>
//                     <td className="text-center py-3"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td>
//                 </tr>
//                 <tr className="border-b border-slate-100 dark:border-zink-600">
//                     <td className="py-3 text-slate-600 dark:text-zink-300">Profile Video</td>
//                     <td className="text-center py-3"><span className="text-slate-400 dark:text-zink-400 text-sm">—</span></td>
//                     <td className="text-center py-3"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td>
//                     <td className="text-center py-3"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td>
//                 </tr>
                
//                 {/* Personal Features */}
//                 <tr className="border-b border-slate-100 dark:border-zink-600">
//                     <td className="py-3 text-slate-600 dark:text-zink-300">Company Details</td>
//                     <td className="text-center py-3"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td>
//                     <td className="text-center py-3"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td>
//                     <td className="text-center py-3"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td>
//                 </tr>
//                 <tr className="border-b border-slate-100 dark:border-zink-600">
//                     <td className="py-3 text-slate-600 dark:text-zink-300">Services & Products</td>
//                     <td className="text-center py-3"><span className="text-slate-400 dark:text-zink-400 text-sm">—</span></td>
//                     <td className="text-center py-3"><span className="text-slate-400 dark:text-zink-400 text-sm">—</span></td>
//                     <td className="text-center py-3"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td>
//                 </tr>
                
//                 {/* Contact Features */}
//                 <tr className="border-b border-slate-100 dark:border-zink-600">
//                     <td className="py-3 text-slate-600 dark:text-zink-300">Social Links</td>
//                     <td className="text-center py-3"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td>
//                     <td className="text-center py-3"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td>
//                     <td className="text-center py-3"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td>
//                 </tr>
//                 <tr className="border-b border-slate-100 dark:border-zink-600">
//                     <td className="py-3 text-slate-600 dark:text-zink-300">Multiple Addresses</td>
//                     <td className="text-center py-3"><span className="text-slate-400 dark:text-zink-400 text-sm">—</span></td>
//                     <td className="text-center py-3"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td>
//                     <td className="text-center py-3"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td>
//                 </tr>
                
//                 {/* Premium Features */}
//                 <tr className="border-b border-slate-100 dark:border-zink-600">
//                     <td className="py-3 text-slate-600 dark:text-zink-300">Interactive Elements</td>
//                     <td className="text-center py-3"><span className="text-slate-400 dark:text-zink-400 text-sm">—</span></td>
//                     <td className="text-center py-3"><span className="text-slate-400 dark:text-zink-400 text-sm">—</span></td>
//                     <td className="text-center py-3"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td>
//                 </tr>
//                 <tr className="border-b border-slate-100 dark:border-zink-600">
//                     <td className="py-3 text-slate-600 dark:text-zink-300">NFC Support</td>
//                     <td className="text-center py-3"><span className="text-slate-400 dark:text-zink-400 text-sm">—</span></td>
//                     <td className="text-center py-3"><span className="text-slate-400 dark:text-zink-400 text-sm">—</span></td>
//                     <td className="text-center py-3"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td>
//                 </tr>
//             </tbody>
//         </table>
//     </div>
// </div>
//       </div>
//     </div>
//   );
// };

// export default PlanSelection;
// PlanSelection.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBuilding, FaGem, FaCrown, FaCheck } from "react-icons/fa";

const cardFieldsConfig = {
  Personal: {
    name: 'Personal',
    description: 'Basic digital card with essential features',
    allowed: [
      'profilePhoto',
      'jobTitle',
      'tagline',
      'bio',
      'profileVideo',
      'emails',
      'phones',
      'whatsapp',
      'websites',
      'address',
      'socialLinks',
      'dynamicQRCode',
      'nfcCard',
      'downloads',
      'videos'
    ],
    features: [
      'Profile Page',
      'Profile Photo/Logo',
      'Name/Source Name',
      'Tag Line/Slogan',
      'Profile Video',
      'About Me',
      'Contact Management',
      'One-tap Call, WhatsApp, Email',
      'Website/Portfolio Link',
      'Location [Address]',
      'Social & Digital Hub',
      'Dynamic QR Code',
      'Share',
      'NFC Card Development with Print',
      'Downloads',
      'Videos'
    ]
  },

  Business: {
    name: 'Business',
    description: 'Enhanced features for professional presence',
    allowed: [
      'profilePhoto',
      'companyLogo',
      'jobTitle',
      'tagline',
      'organization',
      'bio',
      'profileVideo',
      'emails',
      'phones',
      'whatsapp',
      'websites',
      'address',
      'virtualNumber',
      'businessHours',
      'socialLinks',
      'servicesProducts',
      'gallery',
      'catalogPDF',
      'productVideo',
      'testimonials',
      'dynamicQRCode',
      'nfcCard',
      'downloads',
      'videos'
    ],
    features: [
      'Profile Page',
      'Profile Photo/Logo',
      'Name/Source Name',
      'Tag Line/Slogan',
      'Company Name/Organization',
      'Profile Video',
      'About Me/Company/Organization',
      'Contact Management',
      'One-tap Call, WhatsApp, Email',
      'Website/Portfolio Link',
      'Location [Address]',
      'Virtual Number Integration (Optional at extra cost)',
      'Business Hours',
      'Professional/Business Details',
      'Services/Provision',
      'Brief about Product/Services',
      'Product Showcase/Gallery/Portfolio',
      'Product/Catalog [PDF]',
      'Product Video',
      'Testimonials',
      'Social & Digital Hub',
      'Dynamic QR Code',
      'Share',
      'NFC Card Development with Print',
      'Downloads',
      'Videos'
    ]
  },

  BusinessPremium: {
    name: 'BusinessPremium',
    description: 'Advanced features with interactive elements',
    allowed: [
      'profilePhoto',
      'companyLogo',
      'jobTitle',
      'tagline',
      'organization',
      'bio',
      'profileVideo',
      'emails',
      'phones',
      'whatsapp',
      'websites',
      'address',
      'virtualNumber',
      'businessHours',
      'socialLinks',
      'servicesProducts',
      'gallery',
      'catalogPDF',
      'productVideo',
      'testimonials',
      'clientList',
      'interactiveElements',
      'dynamicQRCode',
      'nfcCard',
      'downloads',
      'videos'
    ],
    features: [
      'Profile Page',
      'Profile Photo/Logo',
      'Name/Source Name',
      'Tag Line/Slogan',
      'Company Name/Organization',
      'Profile Video',
      'About Me/Company/Organization',
      'Contact Management',
      'One-tap Call, WhatsApp, Email',
      'Website/Portfolio Link',
      'Location [Address]',
      'Virtual Number Integration (Optional at extra cost)',
      'Business Hours',
      'Professional/Business Details',
      'Services/Provision',
      'Individual Product Display',
      'Product Showcase/Gallery/Portfolio',
      'Testimonials / Client List',
      'Product Video',
      'Social & Digital Hub',
      'Interactive Elements',
      'Call-to-Action',
      'Live Chat – WhatsApp / Messages',
      'Appointment Scheduler',
      'Digital Payments',
      'Lead / Contact Form',
      'Chat Assistant',
      'Dynamic QR Code',
      'Share',
      'NFC Card Development with Print',
      'Downloads',
      'Videos'
    ]
  }
};

const PlanSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState('Personal');

  const planPrices = {
    'Personal': '₹500/month',
    'Business': '₹800/month',
    'BusinessPremium': '₹1200/month'
  };

  const planIcons = {
    'Personal': <FaBuilding className="w-8 h-8" />,
    'Business': <FaGem className="w-8 h-8" />,
    'BusinessPremium': <FaCrown className="w-8 h-8" />
  };

  const planColors = {
    'Personal': 'blue',
    'Business': 'purple',
    'BusinessPremium': 'gold'
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleContinue = () => {
    navigate('/signup', { 
      state: { 
        selectedPlan,
        createdBy: location.state?.createdBy,
        fromPartnerDashboard: location.state?.fromPartnerDashboard 
      } 
    });
  };

  // Function to get unique features for comparison table
  const getUniqueFeatures = () => {
    const allFeatures = new Set();
    Object.values(cardFieldsConfig).forEach(plan => {
      plan.features.forEach(feature => allFeatures.add(feature));
    });
    return Array.from(allFeatures);
  };

  // Feature groups for organized comparison table
  const featureGroups = {
    'Profile Features': [
      'Profile Page',
      'Profile Photo/Logo',
      'Name/Source Name',
      'Tag Line/Slogan',
      'Company Name/Organization',
      'Profile Video',
      'About Me',
      'About Me/Company/Organization'
    ],
    'Contact Features': [
      'Contact Management',
      'One-tap Call, WhatsApp, Email',
      'Website/Portfolio Link',
      'Location [Address]',
      'Virtual Number Integration (Optional at extra cost)',
      'Business Hours'
    ],
    'Professional/Business Details': [
      'Professional/Business Details',
      'Services/Provision',
      'Brief about Product/Services',
      'Individual Product Display',
      'Product Showcase/Gallery/Portfolio',
      'Product/Catalog [PDF]',
      'Product Video',
      'Testimonials',
      'Testimonials / Client List'
    ],
    'Social & Digital Hub': [
      'Social & Digital Hub'
    ],
    'Interactive Elements': [
      'Interactive Elements',
      'Call-to-Action',
      'Live Chat – WhatsApp / Messages',
      'Appointment Scheduler',
      'Digital Payments',
      'Lead / Contact Form',
      'Chat Assistant'
    ],
    'Utilities': [
      'Dynamic QR Code',
      'Share',
      'NFC Card Development with Print',
      'Downloads',
      'Videos'
    ]
  };

  // Check if a plan has a feature
  const hasFeature = (planKey, featureName) => {
    const plan = cardFieldsConfig[planKey];
    
    // Special handling for "About Me" vs "About Me/Company/Organization"
    if (featureName === 'About Me' && planKey !== 'Personal') {
      // For Business and BusinessPremium, check for "About Me/Company/Organization"
      return plan.features.includes('About Me/Company/Organization');
    }
    
    // For Personal plan, "About Me/Company/Organization" should show as "About Me"
    if (featureName === 'About Me/Company/Organization' && planKey === 'Personal') {
      return false; // Personal plan doesn't have company/organization about
    }
    
    return plan.features.includes(featureName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4" id="plan">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Select the perfect plan for your digital card needs. 
            Start with a free trial and upgrade anytime.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.entries(cardFieldsConfig).map(([key, plan]) => (
            <div
              key={key}
              className={`relative rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
                selectedPlan === key
                  ? `bg-white shadow-2xl border-2 ${
                      planColors[key] === 'blue' ? 'border-blue-500' :
                      planColors[key] === 'purple' ? 'border-purple-500' :
                      'border-yellow-500'
                    } transform scale-105`
                  : 'bg-white shadow-lg border border-slate-200 hover:shadow-xl'
              }`}
              onClick={() => handlePlanSelect(key)}
            >
              {/* Popular Badge for Business */}
              {key === 'Business' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-rosey-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Selected Indicator */}
              {selectedPlan === key && (
                <div className="absolute -top-2 -right-2">
                  <div className={`${
                    planColors[key] === 'blue' ? 'bg-blue-500' :
                    planColors[key] === 'purple' ? 'bg-purple-500' :
                    'bg-yellow-500'
                  } text-white rounded-full p-1`}>
                    <FaCheck className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* Plan Icon */}
              <div className={`w-16 h-16 rounded-2xl ${
                planColors[key] === 'blue' ? 'bg-blue-100 text-blue-600' :
                planColors[key] === 'purple' ? 'bg-purple-100 text-purple-600' :
                'bg-yellow-100 text-yellow-600'
              } flex items-center justify-center mb-6 mx-auto`}>
                {planIcons[key]}
              </div>

              {/* Plan Name & Price */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {plan.name}
                </h3>
                <div className="text-3xl font-bold text-slate-900">
                  {planPrices[key]}
                </div>
                <p className="text-slate-500 text-sm mt-1">per month</p>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-center mb-6">
                {plan.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3 mb-8 max-h-96 overflow-y-auto pr-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheck className={`w-4 h-4 ${
                      planColors[key] === 'blue' ? 'text-blue-500' :
                      planColors[key] === 'purple' ? 'text-purple-500' :
                      'text-yellow-500'
                    } mr-3 flex-shrink-0 mt-1`} />
                    <span className="text-slate-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Select Button */}
              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  selectedPlan === key
                    ? `${
                        planColors[key] === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                        planColors[key] === 'purple' ? 'bg-purple-500 hover:bg-purple-600' :
                        'bg-yellow-500 hover:bg-yellow-600'
                      } text-white`
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {selectedPlan === key ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center mt-12">
          <button
            onClick={handleContinue}
            className="bg-rosey-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-rose-500 transition-colors shadow-lg"
          >
            Continue with {cardFieldsConfig[selectedPlan]?.name} Plan
          </button>
          
          <p className="text-slate-500 mt-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-16 bg-white rounded-xl shadow dark:bg-zink-700 dark:shadow-zink-500/30 p-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-zink-50 text-center mb-8">
            Detailed Plan Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-zink-500">
                  <th className="text-left py-4 font-semibold text-slate-700 dark:text-zink-200 text-lg">
                    Features
                  </th>
                  {Object.entries(cardFieldsConfig).map(([key, plan]) => (
                    <th key={key} className="text-center py-4 font-semibold text-slate-700 dark:text-zink-200 text-lg">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Profile Features Group */}
                <tr className="bg-slate-100 dark:bg-zink-800">
                  <td colSpan="4" className="py-3 px-4 font-bold text-slate-800 dark:text-zink-100">
                    Profile Features
                  </td>
                </tr>
                {[
                  'Profile Page',
                  'Profile Photo/Logo',
                  'Name/Source Name',
                  'Tag Line/Slogan',
                  'Company Name/Organization',
                  'Profile Video',
                  'About Me'
                ].map((feature, index) => (
                  <tr key={`profile-${index}`} className="border-b border-slate-100 dark:border-zink-600">
                    <td className="py-3 px-4 text-slate-700 dark:text-zink-300 font-medium">
                      {feature}
                    </td>
                    {Object.keys(cardFieldsConfig).map((planKey) => (
                      <td key={`${planKey}-${feature}`} className="text-center py-3">
                        {hasFeature(planKey, feature) ? (
                          <FaCheck className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-slate-400 dark:text-zink-400 text-lg">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Contact Features Group */}
                <tr className="bg-slate-100 dark:bg-zink-800">
                  <td colSpan="4" className="py-3 px-4 font-bold text-slate-800 dark:text-zink-100">
                    Contact Features
                  </td>
                </tr>
                {[
                  'Contact Management',
                  'One-tap Call, WhatsApp, Email',
                  'Website/Portfolio Link',
                  'Location [Address]',
                  'Virtual Number Integration (Optional at extra cost)',
                  'Business Hours'
                ].map((feature, index) => (
                  <tr key={`contact-${index}`} className="border-b border-slate-100 dark:border-zink-600">
                    <td className="py-3 px-4 text-slate-700 dark:text-zink-300 font-medium">
                      {feature}
                    </td>
                    {Object.keys(cardFieldsConfig).map((planKey) => (
                      <td key={`${planKey}-${feature}`} className="text-center py-3">
                        {hasFeature(planKey, feature) ? (
                          <FaCheck className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-slate-400 dark:text-zink-400 text-lg">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Business Details Group */}
                <tr className="bg-slate-100 dark:bg-zink-800">
                  <td colSpan="4" className="py-3 px-4 font-bold text-slate-800 dark:text-zink-100">
                    Professional/Business Details
                  </td>
                </tr>
                {[
                  'Services/Provision',
                  'Brief about Product/Services',
                  'Product Showcase/Gallery/Portfolio',
                  'Product/Catalog [PDF]',
                  'Product Video',
                  'Testimonials',
                  'Testimonials / Client List'
                ].map((feature, index) => (
                  <tr key={`business-${index}`} className="border-b border-slate-100 dark:border-zink-600">
                    <td className="py-3 px-4 text-slate-700 dark:text-zink-300 font-medium">
                      {feature}
                    </td>
                    {Object.keys(cardFieldsConfig).map((planKey) => (
                      <td key={`${planKey}-${feature}`} className="text-center py-3">
                        {hasFeature(planKey, feature) ? (
                          <FaCheck className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-slate-400 dark:text-zink-400 text-lg">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Interactive Elements Group */}
                <tr className="bg-slate-100 dark:bg-zink-800">
                  <td colSpan="4" className="py-3 px-4 font-bold text-slate-800 dark:text-zink-100">
                    Interactive Elements
                  </td>
                </tr>
                {[
                  'Interactive Elements',
                  'Call-to-Action',
                  'Live Chat – WhatsApp / Messages',
                  'Appointment Scheduler',
                  'Digital Payments',
                  'Lead / Contact Form',
                  'Chat Assistant'
                ].map((feature, index) => (
                  <tr key={`interactive-${index}`} className="border-b border-slate-100 dark:border-zink-600">
                    <td className="py-3 px-4 text-slate-700 dark:text-zink-300 font-medium">
                      {feature}
                    </td>
                    {Object.keys(cardFieldsConfig).map((planKey) => (
                      <td key={`${planKey}-${feature}`} className="text-center py-3">
                        {hasFeature(planKey, feature) ? (
                          <FaCheck className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-slate-400 dark:text-zink-400 text-lg">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Utilities Group */}
                <tr className="bg-slate-100 dark:bg-zink-800">
                  <td colSpan="4" className="py-3 px-4 font-bold text-slate-800 dark:text-zink-100">
                    Utilities
                  </td>
                </tr>
                {[
                  'Dynamic QR Code',
                  'Share',
                  'NFC Card Development with Print',
                  'Downloads',
                  'Videos'
                ].map((feature, index) => (
                  <tr key={`utility-${index}`} className="border-b border-slate-100 dark:border-zink-600">
                    <td className="py-3 px-4 text-slate-700 dark:text-zink-300 font-medium">
                      {feature}
                    </td>
                    {Object.keys(cardFieldsConfig).map((planKey) => (
                      <td key={`${planKey}-${feature}`} className="text-center py-3">
                        {hasFeature(planKey, feature) ? (
                          <FaCheck className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-slate-400 dark:text-zink-400 text-lg">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                
                {/* Price Row */}
                <tr className="bg-blue-50 dark:bg-blue-900/20">
                  <td className="py-4 px-4 text-slate-700 dark:text-zink-300 font-bold text-lg">
                    Monthly Price
                  </td>
                  {Object.entries(cardFieldsConfig).map(([key]) => (
                    <td key={key} className="text-center py-4">
                      <span className="font-bold text-slate-900 dark:text-zink-100 text-lg">
                        {planPrices[key]}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center mt-6 pt-6 border-t border-slate-200 dark:border-zink-600 gap-4">
            <div className="flex items-center">
              <FaCheck className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-slate-600 dark:text-zink-300">Feature Included</span>
            </div>
            <div className="flex items-center">
              <span className="text-slate-400 dark:text-zink-400 text-lg mr-2">—</span>
              <span className="text-slate-600 dark:text-zink-300">Feature Not Included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSelection;