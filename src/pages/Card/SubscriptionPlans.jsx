import React, { useState, useEffect } from 'react';
import { PLAN_URL } from "../../utility/constants";

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    filterPlans();
  }, [selectedCategory, plans]);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${PLAN_URL}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPlans(data);
      setFilteredPlans(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching plans:', err);
      setError('Failed to load subscription plans. Please try again later.');
      // Fallback to the provided data if API fails
      const fallbackData = [
        {
          "_id": "6942fdffe68a4733d3db5584",
          "category": "personal",
          "duration": "monthly",
          "durationDays": 30,
          "price": 500,
          "__v": 0
        },
        {
          "_id": "6942fdffe68a4733d3db5585",
          "category": "personal",
          "duration": "six_months",
          "durationDays": 180,
          "price": 1500,
          "__v": 0
        },
        {
          "_id": "6942fdffe68a4733d3db5586",
          "category": "personal",
          "duration": "yearly",
          "durationDays": 365,
          "price": 3500,
          "__v": 0
        },
        {
          "_id": "6942fdffe68a4733d3db5587",
          "category": "business",
          "duration": "monthly",
          "durationDays": 30,
          "price": 800,
          "__v": 0
        },
        {
          "_id": "6942fdffe68a4733d3db5588",
          "category": "business",
          "duration": "six_months",
          "durationDays": 180,
          "price": 2800,
          "__v": 0
        },
        {
          "_id": "6942fdffe68a4733d3db5589",
          "category": "business",
          "duration": "yearly",
          "durationDays": 365,
          "price": 6800,
          "__v": 0
        },
        {
          "_id": "6942fdffe68a4733d3db558a",
          "category": "business premium",
          "duration": "monthly",
          "durationDays": 30,
          "price": 1200,
          "__v": 0
        },
        {
          "_id": "6942fdffe68a4733d3db558b",
          "category": "business premium",
          "duration": "six_months",
          "durationDays": 180,
          "price": 4200,
          "__v": 0
        },
        {
          "_id": "6942fdffe68a4733d3db558c",
          "category": "business premium",
          "duration": "yearly",
          "durationDays": 365,
          "price": 8200,
          "__v": 0
        }
      ];
      setPlans(fallbackData);
      setFilteredPlans(fallbackData);
    } finally {
      setLoading(false);
    }
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

  const getDisplayPrice = (plan) => {
    return plan.price;
  };

  const getBillingFrequencyText = (plan) => {
    const durationMap = {
      'monthly': 'per month',
      'six_months': 'every 6 months',
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
        'Community access'
      ],
      'business': [
        'Up to 50 projects',
        'Advanced analytics',
        'Priority email support',
        '50GB storage',
        'Team collaboration',
        'Custom branding'
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
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Choose Your Perfect Plan
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Select from our flexible subscription options designed to fit your needs
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category === 'all' ? 'All Plans' : formatCategory(category)}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 rounded-lg bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlans.map((plan) => {
            const categoryColor = getCategoryColor(plan.category);
            const features = getFeaturesForPlan(plan.category);
            const savings = getSavingsPercentage(plan);
            const displayPrice = getDisplayPrice(plan);
            
            return (
              <div
                key={plan._id}
                className={`relative rounded-2xl shadow-lg overflow-hidden border ${categoryColor.border} hover:shadow-xl transition-shadow duration-300`}
              >
                {/* Badge for savings */}
                {savings && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                      Save {savings}%
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className={`${categoryColor.bg} p-8 text-white`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold">{formatCategory(plan.category)}</h3>
                      <p className="text-blue-100 mt-1">{formatDuration(plan.duration)} Plan</p>
                    </div>
                  </div>
                  
                  {/* Price - Showing full amount with smaller frequency text */}
                  <div className="mt-6">
                    <div className="flex items-baseline flex-wrap">
                      <span className="text-5xl font-extrabold">₹{displayPrice}</span>
                      <div className="flex items-baseline ml-2">
                        <span className="text-lg text-blue-100">/</span>
                        <span className="text-base text-blue-100 ml-1 whitespace-nowrap">
                          {getBillingFrequencyText(plan)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="mt-2 text-blue-100 text-sm">
                    {plan.duration === 'monthly' 
                      ? 'Billed monthly' 
                      : plan.duration === 'six_months' 
                        ? 'Billed every 6 months' 
                        : 'Billed annually'}
                  </p>
                </div>

                {/* Plan Body */}
                <div className="p-8 bg-white">
                  {/* Features List */}
                  <ul className="space-y-4 mb-8">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className={`h-6 w-6 flex-shrink-0 ${categoryColor.text}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="ml-3 text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Additional Info */}
                  <div className={`rounded-lg ${categoryColor.lightBg} p-4 mb-6`}>
                    <div className="flex items-center text-sm">
                      <svg className={`h-5 w-5 ${categoryColor.text} mr-2`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">
                        {plan.durationDays === 30 ? 'Renews monthly' : 
                         plan.durationDays === 180 ? 'Renews every 6 months' : 
                         'Renews yearly'}
                      </span>
                    </div>
                  </div>

                  {/* Pay Button */}
                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${categoryColor.bg} hover:opacity-90 hover:shadow-md`}
                  >
                    Pay 
                  </button>

                  {/* Additional CTA */}
                  <p className="text-center text-sm text-gray-500 mt-4">
                    No credit card required for trial
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredPlans.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-semibold text-gray-900">No plans found</h3>
            <p className="mt-2 text-gray-600">Try selecting a different category</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-600">
            <div>
              <p className="font-semibold text-gray-900">✓ Free Trial</p>
              <p className="mt-1">14 days free on all plans</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">🔄 Easy Switch</p>
              <p className="mt-1">Change plans anytime</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">💳 Secure Payment</p>
              <p className="mt-1">SSL encrypted payments</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">❌ No Lock-in</p>
              <p className="mt-1">Cancel anytime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;