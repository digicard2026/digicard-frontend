import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useLocation } from "react-router-dom";
import FormFields from './FormFields';
const API_URL = import.meta.env.VITE_API_URL;

// -------------------- FIXED validation schemas --------------------
const step1Validation = Yup.object({
  businessName: Yup.string().required('Business name is required'),
  businessType: Yup.string().required('Business type is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  role: Yup.string().required('Please select franchise or partner'),
  franchiseId: Yup.string().when('role', {
    is: 'partner',
    then: (schema) => schema.required('Franchise ID is required for partners'),
    otherwise: (schema) => schema
  })
});

const step2Validation = Yup.object({
  salutation: Yup.string().required('Salutation is required'),
  firstName: Yup.string().required('First name is required'),
  middleName: Yup.string(),
  lastName: Yup.string().required('Last name is required'),
  dateOfBirth: Yup.date().required('Date of birth is required'),
  gender: Yup.string().required('Gender is required'),
  personalContact: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Personal contact is required'),
  personalEmail: Yup.string().email('Invalid email address').required('Email is required'),
  aadharNumber: Yup.string().matches(/^[0-9]{12}$/, 'Aadhar must be 12 digits').required('Aadhar number is required'),
  panNumber: Yup.string().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number').required('PAN number is required'),
  addressLine1: Yup.string().required('Address line 1 is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  pincode: Yup.string().matches(/^[0-9]{6}$/, 'Pincode must be 6 digits').required('Pincode is required'),
});

const step3Validation = Yup.object({
  acceptTerms: Yup.boolean().oneOf([true], 'You must accept terms and conditions'),
  acceptPrivacyPolicy: Yup.boolean().oneOf([true], 'You must accept privacy policy'),
});

const step4Validation = Yup.object({
  aadharFront: Yup.mixed().required('Aadhar front is required'),
  aadharBack: Yup.mixed().required('Aadhar back is required'),
  panCard: Yup.mixed().required('PAN card is required'),
  businessProof: Yup.mixed(),
});

const step6Validation = Yup.object({
  signedAgreement: Yup.mixed().required('Signed agreement is required'),
});

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [disabledSteps, setDisabledSteps] = useState({});
  const [franchiseExists, setFranchiseExists] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [userContext, setUserContext] = useState({
    userId: null,
    userEmail: null,
    isNewUser: false
  });
  const [franchiseCreatedBy, setFranchiseCreatedBy] = useState(null);
  
  // ✅ ADD AUTO-SAVE STATES
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const [lastSaved, setLastSaved] = useState(null);
  const [autoSaveTimeout, setAutoSaveTimeout] = useState(null);

  const location = useLocation();

  const steps = [
    { number: 1, title: 'Business Info' },
    { number: 2, title: 'Personal Details' },
    { number: 3, title: 'Terms & Conditions' },
    { number: 4, title: 'KYC Documents' },
    { number: 5, title: 'Payment' },
    { number: 6, title: 'Agreement' },
    { number: 7, title: 'Complete' },
  ];

  const initialValues = {
    businessName: '', businessType: '', email: '', phone: '',
    salutation: '', firstName: '', middleName: '', lastName: '', dateOfBirth: '', gender: '', personalContact: '', personalEmail: '',
    aadharNumber: '', panNumber: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', country: 'India',
    acceptTerms: false, acceptPrivacyPolicy: false, acceptCommunication: false,
    // ✅ Initialize file fields as null
    aadharFront: null, aadharBack: null, panCard: null, businessProof: null,
    signedAgreement: null,
    role: '',
    franchiseId: '',
  };

  // ✅ FIXED: Proper validation schema function
  const getValidationSchema = (step) => {
    switch (step) {
      case 1: return step1Validation;
      case 2: return step2Validation;
      case 3: return step3Validation;
      case 4: return step4Validation;
      case 6: return step6Validation;
      default: return Yup.object({});
    }
  };

  // ✅ AUTO-SAVE FUNCTION (LocalStorage Only)
  const autoSaveToLocalStorage = (values) => {
    try {
      const userId = userContext.userId;
      if (!userId) return;

      const draftData = {
        ...values,
        userId: userId,
        currentStep: currentStep,
        lastSaved: new Date().toISOString(),
        timestamp: Date.now()
      };

      // Save to localStorage with user-specific key
      localStorage.setItem(`registration_draft_${userId}`, JSON.stringify(draftData));
      
      setAutoSaveStatus('Draft saved locally');
      setLastSaved(new Date());
      
      // Clear status after 2 seconds
      setTimeout(() => {
        setAutoSaveStatus('');
      }, 2000);
      
      console.log('💾 Auto-save successful to localStorage');
    } catch (error) {
      console.error('❌ Auto-save error:', error);
      setAutoSaveStatus('Failed to save draft');
      
      setTimeout(() => {
        setAutoSaveStatus('');
      }, 2000);
    }
  };

  // ✅ DEBOUNCED AUTO-SAVE
  const debouncedAutoSave = (values) => {
    // Clear existing timeout
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }

    // Set new timeout for auto-save (3 seconds after user stops typing)
    const timeout = setTimeout(() => {
      autoSaveToLocalStorage(values);
    }, 3000);

    setAutoSaveTimeout(timeout);
  };

  // ✅ LOAD DRAFT FROM LOCALSTORAGE
  const loadDraftFromLocalStorage = () => {
    try {
      const userId = userContext.userId;
      if (!userId) return null;

      const draftData = localStorage.getItem(`registration_draft_${userId}`);
      if (draftData) {
        const parsed = JSON.parse(draftData);
        console.log('📂 Loaded draft from localStorage:', parsed);
        
        // Update last saved time
        if (parsed.lastSaved) {
          setLastSaved(new Date(parsed.lastSaved));
        }
        
        return parsed;
      }
    } catch (error) {
      console.error('❌ Error loading draft:', error);
    }
    return null;
  };

  // ✅ CLEAR DRAFT AFTER SUCCESSFUL SUBMISSION
  const clearDraftFromLocalStorage = () => {
    try {
      const userId = userContext.userId;
      if (userId) {
        localStorage.removeItem(`registration_draft_${userId}`);
        console.log('🗑️ Draft cleared from localStorage');
      }
    } catch (error) {
      console.error('❌ Error clearing draft:', error);
    }
  };

  // ✅ Check if franchise is creating a partner
  useEffect(() => {
    const franchiseId = localStorage.getItem('franchise_created_by');
    if (franchiseId) {
      setFranchiseCreatedBy(franchiseId);
      // Auto-set role to partner and franchiseId
      setFormData(prev => ({ 
        ...prev, 
        role: 'partner', 
        franchiseId: franchiseId 
      }));
    }
  }, []);

  // ✅ LOAD DRAFT WHEN USER CONTEXT IS AVAILABLE
  useEffect(() => {
    if (userContext.userId) {
      const draft = loadDraftFromLocalStorage();
      if (draft) {
        // Merge draft data with existing formData
        setFormData(prev => ({ ...prev, ...draft }));
        
        // Show draft loaded message
        setAutoSaveStatus('Draft loaded');
        setTimeout(() => setAutoSaveStatus(''), 1000);
      }
    }
  }, [userContext.userId]);

  // ✅ CLEANUP AUTO-SAVE TIMEOUT
  useEffect(() => {
    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
    };
  }, [autoSaveTimeout]);

  // Update user role and registration status
  const updateUserRoleAndComplete = async (userId, role) => {
    try {
      if (!userId) {
        console.error('No user ID found');
        return false;
      }

      console.log('Updating user role:', { userId, role });
      
      const response = await fetch(`${API_URL}/api/v1/user/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          role, 
          registrationComplete: true 
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('User role updated successfully:', result);
        localStorage.setItem('user_role', role);
        localStorage.setItem('registration_complete', 'true');
        return true;
      } else {
        const errorText = await response.text();
        console.error('Failed to update user role:', errorText);
        return false;
      }
    } catch (err) {
      console.error('Failed to update user role:', err);
      return false;
    }
  };

  // ✅ FIXED: Save step data using FormData for file uploads with ROLE validation
  const saveStepData = async (values, stepNumber) => {
    try {
      const userId = userContext.userId;
      const userEmail = userContext.userEmail;

      if (!userId) {
        throw new Error('User session expired. Please sign up again.');
      }

      console.log(`💾 Saving step ${stepNumber} data for user:`, userId);

      const merged = { 
        ...formData, 
        ...values,
        userId: userId,
        userEmail: userEmail,
        stepNumber: stepNumber,
        registrationStep: stepNumber
      };

      // ✅ CRITICAL FIX: Ensure role is always set
      if (!merged.role) {
        merged.role = values.role || formData.role || (franchiseCreatedBy ? 'partner' : 'franchise');
      }

      if (!merged.role) {
        throw new Error('Role is required. Please select Franchise or Partner in step 1.');
      }

      console.log('🔑 Role being saved:', merged.role);

      // ✅ Create FormData object for file uploads
      const formDataToSend = new FormData();
      
      // ✅ Add all regular form fields
      Object.keys(merged).forEach(key => {
        if (merged[key] !== undefined && merged[key] !== null && merged[key] !== '') {
          // Skip file objects - they'll be added separately
          if (!(merged[key] instanceof File)) {
            formDataToSend.append(key, String(merged[key]));
          }
        }
      });

      // ✅ Add file fields separately
      const fileFields = ['aadharFront', 'aadharBack', 'panCard', 'businessProof', 'signedAgreement'];
      fileFields.forEach(fieldName => {
        if (merged[fieldName] instanceof File) {
          formDataToSend.append(fieldName, merged[fieldName]);
          console.log(`📁 Added file: ${fieldName} - ${merged[fieldName].name}`);
        }
      });

      // ✅ Log what we're sending (check if role is included)
      console.log('📤 FormData entries (checking for role):');
      let hasRole = false;
      for (let [key, value] of formDataToSend.entries()) {
        if (key === 'role') {
          hasRole = true;
          console.log(`  ✅ ${key}: ${value}`);
        } else if (value instanceof File) {
          console.log(`  ${key}: [File] ${value.name}`);
        } else {
          console.log(`  ${key}: ${value}`);
        }
      }

      if (!hasRole) {
        console.error('❌ ROLE IS MISSING IN FORM DATA!');
        throw new Error('Role is required but not found in form data');
      }

      // ✅ Use the correct endpoint that has Multer middleware
      const apiUrl = `${API_URL}/api/v1/franchise-partner/save-step`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formDataToSend,
      });

      const responseText = await response.text();
      console.log('📥 Raw response:', responseText);
      
      let responseJson;
      try {
        responseJson = JSON.parse(responseText);
      } catch (e) {
        console.error('❌ Failed to parse response as JSON:', responseText);
        
        // Check if it's an HTML error
        if (responseText.includes('<!DOCTYPE html>') || responseText.includes('<html>')) {
          console.error('❌ Server returned HTML error page');
          const errorMatch = responseText.match(/<pre>(.*?)<\/pre>/);
          const errorMessage = errorMatch ? errorMatch[1] : 'Server endpoint error';
          throw new Error(errorMessage);
        }
        
        throw new Error('Invalid response from server - not valid JSON');
      }

      if (!response.ok) {
        throw new Error(responseJson.message || responseJson.error || `Failed to save step ${stepNumber}`);
      }

      if (!responseJson.success) {
        throw new Error(responseJson.message || 'Server returned unsuccessful response');
      }

      // Update franchise exists flag and record ID
      if (!franchiseExists) {
        setFranchiseExists(true);
      }
      if (responseJson.data && (responseJson.data._id || responseJson.data.userId)) {
        setRecordId(responseJson.data._id || responseJson.data.userId);
      }

      console.log(`✅ Step ${stepNumber} data saved successfully with role: ${merged.role}`);
      return true;

    } catch (error) {
      console.error(`❌ Error saving step ${stepNumber} data:`, error);
      throw error;
    }
  };

  // Load existing data
  useEffect(() => {
    const loadExisting = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        const userEmail = localStorage.getItem('user_email');

        console.log('🔍 Loading user context:', { userId, userEmail });

        if (!userId) {
          console.warn('⚠ No user ID found in localStorage');
          return;
        }

        setUserContext({
          userId,
          userEmail,
          isNewUser: true
        });

        setFormData(prev => ({ 
          ...prev, 
          email: userEmail || prev.email 
        }));

        // ✅ USE CORRECT ENDPOINT: Get franchise by userId
        const res = await fetch(`${API_URL}/api/v1/franchise-partner/franchise/${userId}`);
        if (res.ok) {
          const body = await res.json();
          if (body && body.success && body.data) {
            const record = body.data;
            console.log('✅ Existing record found:', record);
            
            // Extract data from franchiseDetails for franchises
            const franchiseDetails = record.franchiseDetails || {};
            
            const restored = {
              businessName: franchiseDetails.businessName || record.businessName || '',
              businessType: franchiseDetails.businessType || record.businessType || '',
              email: franchiseDetails.email || record.email || (userEmail || ''),
              phone: franchiseDetails.phone || record.phone || '',
              role: record.role || '',
              franchiseId: record.franchiseId || '',
              salutation: franchiseDetails.salutation || '',
              firstName: franchiseDetails.firstName || '',
              middleName: franchiseDetails.middleName || '',
              lastName: franchiseDetails.lastName || '',
              dateOfBirth: franchiseDetails.dateOfBirth ? franchiseDetails.dateOfBirth.split('T')[0] : '',
              gender: franchiseDetails.gender || '',
              personalContact: franchiseDetails.personalContact || '',
              personalEmail: franchiseDetails.personalEmail || '',
              aadharNumber: franchiseDetails.aadharNumber || '',
              panNumber: franchiseDetails.panNumber || '',
              addressLine1: franchiseDetails.addressLine1 || '',
              addressLine2: franchiseDetails.addressLine2 || '',
              city: franchiseDetails.city || '',
              state: franchiseDetails.state || '',
              pincode: franchiseDetails.pincode || '',
              country: franchiseDetails.country || 'India',
              acceptTerms: !!franchiseDetails.acceptTerms,
              acceptPrivacyPolicy: !!franchiseDetails.acceptPrivacyPolicy,
              acceptCommunication: !!franchiseDetails.acceptCommunication,
              paymentStatus: franchiseDetails.paymentStatus || 'pending',
              // File fields - we only store filenames from backend
              aadharFront: franchiseDetails.aadharFront || null,
              aadharBack: franchiseDetails.aadharBack || null,
              panCard: franchiseDetails.panCard || null,
              businessProof: franchiseDetails.businessProof || null,
              signedAgreement: franchiseDetails.signedAgreement || null,
            };

            setFormData(restored);
            setFranchiseExists(true);
            setRecordId(record._id || null);
            
            // Set current step based on registration progress
            const registrationStep = franchiseDetails.registrationStep || record.registrationStep || 1;
            const nextStep = registrationStep <= 7 ? registrationStep : 1;
            setCurrentStep(nextStep);
            
            // Mark previous steps as completed
            const disabledMap = {};
            for (let i = 1; i < nextStep; i++) disabledMap[i] = true;
            setDisabledSteps(disabledMap);
          } else {
            console.log('🆕 No existing record - starting fresh');
            setFranchiseExists(false);
          }
        } else {
          console.log('🆕 No existing record - API error');
          setFranchiseExists(false);
        }
      } catch (err) {
        console.error('❌ Error loading existing registration', err);
        setFranchiseExists(false);
      }
    };

    loadExisting();
  }, []);

  // ✅ FIXED: Handle step submission with FormData
  const handleStepSubmit = async (values, { setSubmitting }) => {
    try {
      console.log(`🚀 Processing step ${currentStep} submission`);

      // Save current step data to API using FormData
      await saveStepData(values, currentStep);

      // Update local state (but exclude File objects from formData state)
      const valuesWithoutFiles = { ...values };
      const fileFields = ['aadharFront', 'aadharBack', 'panCard', 'businessProof', 'signedAgreement'];
      fileFields.forEach(field => {
        if (valuesWithoutFiles[field] instanceof File) {
          // Keep filename for display, but don't store File object in state
          valuesWithoutFiles[field] = valuesWithoutFiles[field].name;
        }
      });

      setFormData(prev => ({ ...prev, ...valuesWithoutFiles }));
      setDisabledSteps(prev => ({ ...prev, [currentStep]: true }));

      // Auto-save to localStorage before moving to next step
      autoSaveToLocalStorage(values);

      // Move to next step or complete registration
      if (currentStep < 7) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Final step - mark as submitted
        setIsSubmitted(true);
        
        // Clear draft from localStorage after successful completion
        clearDraftFromLocalStorage();
        
        // Update user role when registration is complete
        const userId = userContext.userId;
        const chosenRole = values.role || formData.role || '';
        if (userId && chosenRole) {
          await updateUserRoleAndComplete(userId, chosenRole);
        }

        // Clear franchise context after successful registration
        if (franchiseCreatedBy) {
          localStorage.removeItem('franchise_created_by');
        }

        console.log('🎉 Registration completed successfully!');
      }
    } catch (error) {
      console.error('❌ Submission error:', error);
      
      // More user-friendly error message
      if (error.message.includes('duplicate key') || error.message.includes('E11000')) {
        alert('Your registration is already in progress. Please continue with the next step.');
        // Force update the state to reflect that record exists
        setFranchiseExists(true);
        setDisabledSteps(prev => ({ ...prev, [currentStep]: true }));
        if (currentStep < 7) {
          setCurrentStep(prev => prev + 1);
        }
      } else {
        alert(error.message || 'Failed to save step. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Header Section */}
      <div className="text-center pt-8 px-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          {franchiseCreatedBy ? 'Partner Registration' : 'Franchise/Partner Registration'}
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          {franchiseCreatedBy 
            ? 'Complete your partner profile to join the franchise network' 
            : 'Join our network of successful partners and grow your business with us'
          }
        </p>
      </div>

      {/* Progress Section */}
      <div>
        {/* ✅ AUTO-SAVE STATUS INDICATOR */}
        <div className="flex justify-between items-center mt-3">
          <div className="text-blue-100 text-sm">
            {autoSaveStatus && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {autoSaveStatus}
              </div>
            )}
          </div>
          {lastSaved && (
            <div className="text-blue-100 text-sm text-right">
              Last saved: {lastSaved.toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Form Content */}
      <div className="p-8 h-[calc(110vh-250px)] overflow-y-auto custom-scrollbar">
        <FormFields.StepIndicator currentStep={currentStep} steps={steps} />

        {!isSubmitted && (
          <Formik
            initialValues={{ ...initialValues, ...formData }}
            validationSchema={getValidationSchema(currentStep)}
            enableReinitialize
            onSubmit={handleStepSubmit}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <FormFields.StepContent 
                  currentStep={currentStep} 
                  disabled={!!disabledSteps[currentStep]}
                  userContext={userContext}
                  franchiseCreatedBy={franchiseCreatedBy}
                  formData={formData}
                  lastSaved={lastSaved}
                  commonProps={{
                    disabled: !!disabledSteps[currentStep],
                    onAutoSave: disabledSteps[currentStep] ? null : debouncedAutoSave
                  }}
                />

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        // Auto-save before going back
                        autoSaveToLocalStorage(values);
                        setCurrentStep(prev => prev - 1);
                      }}
                      className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all duration-200 flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>
                  ) : <div />}

                  <div className="flex items-center gap-4">
                    {disabledSteps[currentStep] && (
                      <button
                        type="button"
                        onClick={() => setDisabledSteps(prev => ({ ...prev, [currentStep]: false }))}
                        className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 font-semibold transition-all duration-200 flex items-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Step
                      </button>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting || !!disabledSteps[currentStep]}
                      className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center ${
                        isSubmitting || disabledSteps[currentStep]
                          ? 'bg-gray-400 cursor-not-allowed text-white'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          {currentStep === steps.length ? 'Complete Registration' : 'Continue'}
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}

        {isSubmitted && (
          <div className="text-center py-16">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-12 max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FormFields.SuccessIcon />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h3>
              <p className="text-gray-600 mb-8 text-lg">
                Thank you for completing your registration. Your account is now being processed.
                {franchiseCreatedBy && ' You are now linked to your franchise.'}
              </p>
              <button
                onClick={() => window.location.href = '/signin/franchise'}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold transition-all duration-200"
              >
                Go to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;