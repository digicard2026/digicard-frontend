import React from 'react';
import RegistrationForm from './PartnerRegistrationForm';

const  PartnerRegistationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <RegistrationForm />
        
        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Need help? Contact our support team at support@digitalcard.com or call +91 9480 65 1581</p>
          <p className="mt-2 text-xs text-gray-400">
            ✨ Auto-save: Your progress is automatically saved locally every 3 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnerRegistationPage;