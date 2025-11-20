// PlanSelection.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBuilding, FaGem, FaCrown, FaCheck } from "react-icons/fa";

const PlanSelection = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('Personal');

  const cardPlans = {
    'Personal': {
      name: 'Personal',
      description: 'Basic digital card with essential features',
      icon: <FaBuilding className="w-8 h-8" />,
      color: 'blue',
      features: [
        'Profile Page',
        'Basic Contact Info',
        'Social Links',
        'Custom Design',
        'Personal Hours',
        'One-Tap Contact'
      ],
      price: '₹500/month'
    },
    'Business': {
      name: 'Business',
      description: 'Enhanced features for professional presence',
      icon: <FaGem className="w-8 h-8" />,
      color: 'purple',
      features: [
        'All Personal Features +',
        'Profile Video',
        'Professional Details',
        'Product Gallery',
        'Dynamic QR Code',
        'Testimonials',
        'Downloads Section'
      ],
      price: '₹800/month'
    },
    'Business-premium': {
      name: 'Business-premium',
      description: 'Advanced features for Business-premiums',
      icon: <FaCrown className="w-8 h-8" />,
      color: 'gold',
      features: [
        'All Premium Features +',
        'Services & Products Catalog',
        'Interactive Elements',
        'NFC Card Support',
        'Client List Display',
        'Advanced Personal Details',
        'Brand Label Products'
      ],
      price: '₹1200/month'
    }
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleContinue = () => {
    // Navigate to signup page with selected plan
    navigate('/signup', { state: { selectedPlan } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Select the perfect plan for your digital Personal card needs. 
            Start free and upgrade anytime.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.entries(cardPlans).map(([key, plan]) => (
            <div
              key={key}
              className={`relative rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
                selectedPlan === key
                  ? `bg-white shadow-2xl border-2 border-${plan.color}-500 transform scale-105`
                  : 'bg-white shadow-lg border border-slate-200 hover:shadow-xl'
              }`}
              onClick={() => handlePlanSelect(key)}
            >
              {/* Popular Badge for Premium */}
              {key === 'Business' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Selected Indicator */}
              {selectedPlan === key && (
                <div className="absolute -top-2 -right-2">
                  <div className={`bg-${plan.color}-500 text-white rounded-full p-1`}>
                    <FaCheck className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* Plan Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-${plan.color}-100 text-${plan.color}-600 flex items-center justify-center mb-6 mx-auto`}>
                {plan.icon}
              </div>

              {/* Plan Name & Price */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {plan.name}
                </h3>
                <div className="text-3xl font-bold text-slate-900">
                  {plan.price}
                </div>
                {plan.price !== 'Free' && (
                  <p className="text-slate-500 text-sm mt-1">per month</p>
                )}
              </div>

              {/* Description */}
              <p className="text-slate-600 text-center mb-6">
                {plan.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheck className={`w-4 h-4 text-${plan.color}-500 mr-3 flex-shrink-0`} />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Select Button */}
              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  selectedPlan === key
                    ? `bg-${plan.color}-500 text-white hover:bg-${plan.color}-600`
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
            className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg"
          >
            Continue with {cardPlans[selectedPlan]?.name} Plan
          </button>
          
          <p className="text-slate-500 mt-4">
            No credit card required for free plan. Upgrade anytime.
          </p>
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Plan Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 font-semibold text-slate-900">Features</th>
                  {Object.entries(cardPlans).map(([key, plan]) => (
                    <th key={key} className="text-center py-4 font-semibold text-slate-900">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Profile Features */}
                <tr className="border-b border-slate-100">
                  <td className="py-4 font-medium text-slate-700">Profile Page</td>
                  <td className="text-center py-4"><FaCheck className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4"><FaCheck className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4"><FaCheck className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 font-medium text-slate-700">Profile Video</td>
                  <td className="text-center py-4"><span className="text-slate-400">—</span></td>
                  <td className="text-center py-4"><FaCheck className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4"><FaCheck className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                
                {/* Personal Features */}
                <tr className="border-b border-slate-100">
                  <td className="py-4 font-medium text-slate-700">Company Details</td>
                  <td className="text-center py-4"><FaCheck className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4"><FaCheck className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4"><FaCheck className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 font-medium text-slate-700">Services & Products</td>
                  <td className="text-center py-4"><span className="text-slate-400">—</span></td>
                  <td className="text-center py-4"><span className="text-slate-400">—</span></td>
                  <td className="text-center py-4"><FaCheck className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                
                {/* Contact Features */}
                <tr className="border-b border-slate-100">
                  <td className="py-4 font-medium text-slate-700">Social Links</td>
                  <td className="text-center py-4"><FaCheck className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4"><FaCheck className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4"><FaCheck className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 font-medium text-slate-700">Multiple Addresses</td>
                  <td className="text-center py-4"><span className="text-slate-400">—</span></td>
                  <td className="text-center py-4"><FaCheck className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4"><FaCheck className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                
                {/* Premium Features */}
                <tr className="border-b border-slate-100">
                  <td className="py-4 font-medium text-slate-700">Interactive Elements</td>
                  <td className="text-center py-4"><span className="text-slate-400">—</span></td>
                  <td className="text-center py-4"><span className="text-slate-400">—</span></td>
                  <td className="text-center py-4"><FaCheck className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 font-medium text-slate-700">NFC Support</td>
                  <td className="text-center py-4"><span className="text-slate-400">—</span></td>
                  <td className="text-center py-4"><span className="text-slate-400">—</span></td>
                  <td className="text-center py-4"><FaCheck className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSelection;