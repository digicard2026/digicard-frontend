// components/PlanSelection.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const cardTypes = [
  {
    id: 'business',
    name: 'Business',
    description: 'Basic digital card for individuals',
    price: '$9.99/month',
    features: [
      'Basic Profile',
      'Contact Info',
      'Social Links',
      'Simple Design'
    ]
  },
  {
    id: 'business-premium',
    name: 'Business Premium',
    description: 'Professional business features',
    price: '$9.990/month',
    features: [
      'Company Details',
      'Services/Products',
      'Business Hours',
      'Professional Design'
    ]
  },
  {
    id: 'business-pro',
    name: 'Business Professional',
    description: 'Enhanced professional features',
    price: '$19.990/month',
    features: [
      'Profile Video',
      'Product Gallery',
      'Testimonials',
      'Interactive Elements',
      'Downloads Section'
    ]
  }
];

const PlanSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmailFromSignIn = location.state?.userEmail || '';
  
  const [selectedPlan, setSelectedPlan] = useState('');

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    if (!selectedPlan) {
      alert("Please select a plan to continue");
      return;
    }
    
    // Navigate to create card form with selected plan
    // navigate('/create', { 
    //   state: { 
    //     selectedPlan: selectedPlan,
    //     userEmail: userEmailFromSignIn
    //   } 
    // });
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Choose Your Card Plan</h2>
      <p className="text-slate-600 mb-6">Select the plan that best fits your needs. You can upgrade later.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cardTypes.map((type) => (
          <div
            key={type.id}
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
              selectedPlan === type.id
                ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                : 'border-slate-300 hover:border-slate-400 hover:shadow-md'
            }`}
            onClick={() => handlePlanSelect(type.id)}
          >
            <div className="text-center">
              <h4 className="font-bold text-lg text-slate-800 mb-2">{type.name}</h4>
              <p className="text-sm text-slate-600 mb-4">{type.description}</p>
              
              <div className="text-2xl font-bold text-blue-600 mb-4">{type.price}</div>
              
              <div className="space-y-2 mb-4">
                {type.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-slate-700">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
              
              <div className={`w-6 h-6 rounded-full border-2 mx-auto ${
                selectedPlan === type.id
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-slate-300'
              } flex items-center justify-center`}>
                {selectedPlan === type.id && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {!selectedPlan && (
        <p className="text-red-500 text-sm text-center mb-4">Please select a card plan to continue</p>
      )}
      
      <div className="flex justify-center">
        <button
          onClick={handleContinue}
          disabled={!selectedPlan}
          className={`px-8 py-3 rounded-lg text-white font-semibold transition-colors ${
            selectedPlan 
              ? 'bg-blue-500 hover:bg-blue-600 shadow-md' 
              : 'bg-slate-300 cursor-not-allowed'
          }`}
        >
          Continue to Create Card
        </button>
      </div>
    </div>
  );
};

export default PlanSelection;