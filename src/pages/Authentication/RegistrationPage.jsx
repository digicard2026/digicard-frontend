import React, { useState, useCallback, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// -------------------- validation schemas --------------------
const step1Validation = Yup.object({
  businessName: Yup.string().required('Business name is required'),
  businessType: Yup.string().required('Business type is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
});

const step2Validation = Yup.object({
  salutation: Yup.string().required('Salutation is required'),
  firstName: Yup.string().required('First name is required'),
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

// -------------------- UI Field components with modern design --------------------
const InputField = ({ label, name, type = 'text', required = false, disabled = false, handleAutoSave, icon = null }) => (
  <div className="mb-6">
    <label htmlFor={name} className={`block text-sm font-semibold mb-3 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
      {label} {required && <span className="text-red-500 ml-1">*</span>}
    </label>

    <Field name={name}>
      {({ field, form }) => (
        disabled ? (
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-600 font-medium">
            {form.values[name] || <span className="text-gray-400 italic">Not provided</span>}
          </div>
        ) : (
          <div className="relative">
            {icon && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {icon}
              </div>
            )}
            <input
              {...field}
              id={name}
              type={type}
              className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 ${
                icon ? 'pl-10' : ''
              } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-gray-300'}`}
              onChange={(e) => {
                form.setFieldValue(name, e.target.value);
                if (handleAutoSave) handleAutoSave(name, e.target.value);
              }}
              disabled={disabled}
            />
          </div>
        )
      )}
    </Field>

    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
  </div>
);

const SelectField = ({ label, name, options, required = false, disabled = false, handleAutoSave, icon = null }) => (
  <div className="mb-6">
    <label htmlFor={name} className={`block text-sm font-semibold mb-3 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
      {label} {required && <span className="text-red-500 ml-1">*</span>}
    </label>

    <Field name={name}>
      {({ field, form }) => (
        disabled ? (
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-600 font-medium">
            {form.values[name] || <span className="text-gray-400 italic">Not selected</span>}
          </div>
        ) : (
          <div className="relative">
            {icon && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {icon}
              </div>
            )}
            <select
              {...field}
              id={name}
              className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 appearance-none bg-white hover:border-gray-300 ${
                icon ? 'pl-10' : ''
              }`}
              onChange={(e) => {
                form.setFieldValue(name, e.target.value);
                if (handleAutoSave) handleAutoSave(name, e.target.value);
              }}
            >
              <option value="">Select {label}</option>
              {options.map(option => (
                <option key={option.value || option} value={option.value || option}>
                  {option.label || option}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        )
      )}
    </Field>

    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
  </div>
);

const CheckboxField = ({ label, name, required = false, disabled = false, handleAutoSave, description = null }) => (
  <div className="mb-6">
    <Field name={name}>
      {({ field, form }) => (
        <div className={`flex items-start space-x-3 p-4 rounded-xl border-2 ${
          disabled ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-gray-300'
        } transition-all duration-200`}>
          {disabled ? (
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-lg border-2 ${form.values[name] ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'}`} />
            </div>
          ) : (
            <input
              {...field}
              id={name}
              type="checkbox"
              checked={!!form.values[name]}
              onChange={(e) => {
                form.setFieldValue(name, e.target.checked);
                if (handleAutoSave) handleAutoSave(name, e.target.checked);
              }}
              className="w-6 h-6 text-blue-600 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1"
            />
          )}
          <div className="flex-1">
            <label htmlFor={name} className={`block text-sm font-semibold ${disabled ? 'text-gray-500' : 'text-gray-700'} cursor-pointer`}>
              {label} {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
        </div>
      )}
    </Field>
    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
  </div>
);

const FileUploadField = ({ label, name, accept, required = false, disabled = false, handleAutoSave }) => (
  <div className="mb-6">
    <label className={`block text-sm font-semibold mb-3 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
      {label} {required && <span className="text-red-500 ml-1">*</span>}
    </label>

    <Field name={name}>
      {({ field, form }) => (
        disabled ? (
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-600 font-medium">
            {form.values[name] ? form.values[name].name || '✓ Uploaded' : <span className="text-gray-400 italic">Not uploaded</span>}
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
            <input
              id={name}
              type="file"
              accept={accept}
              onChange={(e) => {
                const file = e.currentTarget.files[0];
                form.setFieldValue(name, file);
                if (handleAutoSave) handleAutoSave(name, file);
              }}
              className="hidden"
            />
            <label htmlFor={name} className="cursor-pointer">
              <div className="flex flex-col items-center justify-center">
                <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-gray-600 font-medium">Click to upload {label.toLowerCase()}</span>
                <span className="text-sm text-gray-500 mt-1">Supported formats: JPG, PNG, PDF (Max 2MB)</span>
              </div>
            </label>
          </div>
        )
      )}
    </Field>

    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
  </div>
);

// Section and StepIndicator components with modern design
const SectionWrapper = ({ title, children, icon = null }) => (
  <div className="mb-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
    <div className="flex items-center mb-6">
      {icon && <div className="mr-3 text-blue-600">{icon}</div>}
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{children}</div>
  </div>
);

const StepIndicator = ({ currentStep, steps }) => (
  <div className="flex justify-center mb-8">
    <div className="flex items-center space-x-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex flex-col items-center">
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full border-4 font-bold text-lg transition-all duration-300 ${
                currentStep >= step.number 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-100 text-white shadow-lg scale-110' 
                  : 'border-gray-200 bg-white text-gray-400'
              } ${currentStep === step.number ? 'ring-4 ring-blue-200' : ''}`}
            >
              {currentStep > step.number ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.number
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-1 mx-4 transition-all duration-300 ${
                currentStep > step.number ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
          <span className={`text-sm font-semibold mt-3 transition-all duration-300 ${
            currentStep >= step.number ? 'text-gray-800' : 'text-gray-400'
          }`}>
            {step.title}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// Icons for different sections
const BusinessIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const PaymentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const AgreementIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const SuccessIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// -------------------- Main component --------------------
const RegistrationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [disabledSteps, setDisabledSteps] = useState({});
  const [savingField, setSavingField] = useState(null);
  const [franchiseExists, setFranchiseExists] = useState(false);
  const [franchiseRecordId, setFranchiseRecordId] = useState(null);

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
    aadharFront: null, aadharBack: null, panCard: null, businessProof: null,
    signedAgreement: null,
    role: '',
  };

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

  // Auto-save function
  const rawAutoSave = async (fieldName, value) => {
    try {
      setSavingField(fieldName);
      setFormData(prev => ({ ...prev, [fieldName]: value }));

      const userId = localStorage.getItem('user_id');
      if (!userId) { setSavingField(null); return; }
      if (!franchiseExists) { setSavingField(null); return; }

      const fd = new FormData();
      if (value instanceof File) fd.append(fieldName, value);
      else fd.append(fieldName, value ?? '');

      fd.append('userId', userId);
      fd.append('stepNumber', currentStep);

      await fetch('http://localhost:3000/api/v1/franchise-partner/save-step', {
        method: 'POST',
        body: fd,
      });

      setSavingField(null);
    } catch (err) {
      console.error('Auto-save error', err);
      setSavingField(null);
    }
  };

  const handleAutoSave = useCallback(debounce(rawAutoSave, 600), [franchiseExists, currentStep]);

  // Load existing data
  useEffect(() => {
    const loadExisting = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        const userEmail = localStorage.getItem('user_email');

        if (!userId) return;

        setFormData(prev => ({ ...prev, email: userEmail || prev.email }));

        // Fetch franchise partner data
        const res = await fetch(`http://localhost:3000/api/v1/franchise-partner/${userId}`);
        if (res.ok) {
          const body = await res.json();
          if (body && body.success && body.data) {
            const partner = body.data;
            
            const restored = {
              businessName: partner.businessName || '',
              businessType: partner.businessType || '',
              email: partner.email || (userEmail || ''),
              phone: partner.phone || '',
              role: partner.role || '',
              salutation: partner.salutation || '',
              firstName: partner.firstName || '',
              middleName: partner.middleName || '',
              lastName: partner.lastName || '',
              dateOfBirth: partner.dateOfBirth ? partner.dateOfBirth.split('T')[0] : '',
              gender: partner.gender || '',
              personalContact: partner.personalContact || '',
              personalEmail: partner.personalEmail || '',
              aadharNumber: partner.aadharNumber || '',
              panNumber: partner.panNumber || '',
              addressLine1: partner.addressLine1 || '',
              addressLine2: partner.addressLine2 || '',
              city: partner.city || '',
              state: partner.state || '',
              pincode: partner.pincode || '',
              country: partner.country || 'India',
              acceptTerms: !!partner.acceptTerms,
              acceptPrivacyPolicy: !!partner.acceptPrivacyPolicy,
              acceptCommunication: !!partner.acceptCommunication,
              paymentStatus: partner.paymentStatus || 'pending',
              signedAgreement: partner.signedAgreement || null,
            };

            setFormData(restored);
            setFranchiseExists(true);
            setFranchiseRecordId(partner._id || null);
            
            if (partner.registrationStep) {
              const nextStep = partner.registrationStep <= 7 ? partner.registrationStep : 1;
              setCurrentStep(nextStep);
              const disabledMap = {};
              for (let i = 1; i <= partner.registrationStep; i++) disabledMap[i] = true;
              setDisabledSteps(disabledMap);
            }
          } else {
            setFranchiseExists(false);
          }
        } else {
          setFranchiseExists(false);
        }
      } catch (err) {
        console.error('Error loading existing registration', err);
      }
    };

    loadExisting();
  }, []);

  // Update user role
  const updateUserRoleAndComplete = async (userId, role) => {
    try {
      if (!userId) return;
      await fetch(`http://localhost:3000/api/v1/user/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, registrationComplete: true }),
      });
      localStorage.setItem('user_role', role);
    } catch (err) {
      console.error('Failed to update user role', err);
    }
  };

  // Handle step submission
  const handleStepSubmit = async (values, { setSubmitting }) => {
    try {
      const userId = localStorage.getItem('user_id');
      const userEmail = localStorage.getItem('user_email');

      const merged = { ...formData, ...values };
      if (!merged.email && userEmail) {
        merged.email = userEmail;
      }

      const fd = new FormData();
      Object.entries(merged).forEach(([key, value]) => {
        if (value instanceof File) {
          fd.append(key, value);
        } else if (value === undefined || value === null) {
          fd.append(key, '');
        } else {
          fd.append(key, value.toString());
        }
      });

      if (!fd.has('email') && userEmail) {
        fd.append('email', userEmail);
      }

      fd.append('stepNumber', currentStep.toString());
      if (userId) fd.append('userId', userId);

      // Create or update franchise partner
      if (!franchiseExists) {
        const createRes = await fetch('http://localhost:3000/api/v1/franchise-partner/create', {
          method: 'POST',
          body: fd,
        });

        const createText = await createRes.text();
        let createJson;
        try {
          createJson = JSON.parse(createText);
        } catch (e) {
          throw new Error('Invalid response from server');
        }

        if (!createRes.ok) {
          throw new Error(createJson.message || createJson.error || 'Failed to create partner');
        }

        setFranchiseExists(true);
        if (createJson.data && (createJson.data._id || createJson.data.userId)) {
          setFranchiseRecordId(createJson.data._id || createJson.data.userId);
        }
      } else {
        const saveRes = await fetch('http://localhost:3000/api/v1/franchise-partner/save-step', {
          method: 'POST',
          body: fd,
        });
        
        const saveText = await saveRes.text();
        let saveJson;
        try {
          saveJson = JSON.parse(saveText);
        } catch (e) {
          throw new Error('Invalid response from server');
        }
        
        if (!saveRes.ok) throw new Error(saveJson.message || saveJson.error || 'Failed to save step');
      }

      // Update user role after step 2
      if (currentStep === 2) {
        const chosenRole = merged.role || '';
        if (userId && chosenRole) {
          await updateUserRoleAndComplete(userId, chosenRole);
        }
      }

      setFormData(prev => ({ ...prev, ...values }));
      setDisabledSteps(prev => ({ ...prev, [currentStep]: true }));

      if (currentStep < 7) setCurrentStep(prev => prev + 1);
      else setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert(error.message || 'Failed to save step');
    } finally {
      setSubmitting(false);
    }
  };

  // Render step content
  const renderStepContent = (step, disabled, handleAutoSaveFn) => {
    switch (step) {
      case 1:
        return (
          <SectionWrapper title="Business Information" icon={<BusinessIcon />}>
            <InputField 
              label="Business Name" 
              name="businessName" 
              required 
              disabled={disabled} 
              handleAutoSave={handleAutoSaveFn}
              icon={<BusinessIcon />}
            />
            <SelectField 
              label="Business Type" 
              name="businessType" 
              options={['Retail', 'Service', 'Manufacturing', 'Technology', 'Consulting']} 
              required 
              disabled={disabled} 
              handleAutoSave={handleAutoSaveFn}
            />
            <div className="lg:col-span-2">
              <InputField 
                label="Email Address" 
                name="email" 
                type="email" 
                required 
                disabled={true}
                handleAutoSave={handleAutoSaveFn}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />
            </div>
            <InputField 
              label="Phone Number" 
              name="phone" 
              type="tel" 
              required 
              disabled={disabled} 
              handleAutoSave={handleAutoSaveFn}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              }
            />
            <SelectField
              label="Register As"
              name="role"
              options={[
                { value: 'franchise', label: 'Franchise' },
                { value: 'partner', label: 'Partner' }
              ]}
              required
              disabled={disabled}
              handleAutoSave={handleAutoSaveFn}
            />
          </SectionWrapper>
        );

      case 2:
        return (
          <>
            <SectionWrapper title="Personal Details" icon={<UserIcon />}>
              <SelectField label="Salutation" name="salutation" options={['Mr', 'Mrs', 'Ms', 'Dr']} required disabled={disabled} handleAutoSave={handleAutoSaveFn} />
              <InputField label="First Name" name="firstName" required disabled={disabled} handleAutoSave={handleAutoSaveFn} />
              <InputField label="Middle Name" name="middleName" disabled={disabled} handleAutoSave={handleAutoSaveFn} />
              <InputField label="Last Name" name="lastName" required disabled={disabled} handleAutoSave={handleAutoSaveFn} />
              <InputField label="Date of Birth" name="dateOfBirth" type="date" required disabled={disabled} handleAutoSave={handleAutoSaveFn} />
              <SelectField label="Gender" name="gender" options={['Male', 'Female', 'Other']} required disabled={disabled} handleAutoSave={handleAutoSaveFn} />
              <InputField label="Personal Contact" name="personalContact" required disabled={disabled} handleAutoSave={handleAutoSaveFn} />
              <InputField label="Personal Email" name="personalEmail" type="email" required disabled={disabled} handleAutoSave={handleAutoSaveFn} />
              <InputField label="Aadhar Number" name="aadharNumber" required disabled={disabled} handleAutoSave={handleAutoSaveFn} />
              <InputField label="PAN Number" name="panNumber" required disabled={disabled} handleAutoSave={handleAutoSaveFn} />
            </SectionWrapper>

            <SectionWrapper title="Address Information" icon={<BusinessIcon />}>
              <InputField label="Address Line 1" name="addressLine1" required disabled={disabled} handleAutoSave={handleAutoSaveFn} />
              <InputField label="Address Line 2" name="addressLine2" disabled={disabled} handleAutoSave={handleAutoSaveFn} />
              <InputField label="City" name="city" required disabled={disabled} handleAutoSave={handleAutoSaveFn} />
              <InputField label="State" name="state" required disabled={disabled} handleAutoSave={handleAutoSaveFn} />
              <InputField label="Pincode" name="pincode" required disabled={disabled} handleAutoSave={handleAutoSaveFn} />
              <InputField label="Country" name="country" disabled={disabled} handleAutoSave={handleAutoSaveFn} />
            </SectionWrapper>
          </>
        );

      case 3:
        return (
          <SectionWrapper title="Terms & Conditions" icon={<ShieldIcon />}>
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-gray-50 rounded-xl p-6 max-h-80 overflow-y-auto">
                <h4 className="font-bold text-lg mb-4 text-gray-800">Digital Card Partner Agreement</h4>
                <div className="space-y-3 text-gray-600">
                  <p>1. Partner agrees to comply with all company policies and procedures.</p>
                  <p>2. Partner shall maintain the highest standards of service quality.</p>
                  <p>3. All transactions must be recorded accurately in the system.</p>
                  <p>4. Partner is responsible for maintaining customer data confidentiality.</p>
                  <p>5. Company reserves the right to terminate partnership for violations.</p>
                  <p>6. Partner fees are non-refundable once paid.</p>
                  <p>7. All disputes shall be subject to jurisdiction of local courts.</p>
                </div>
                
                <h4 className="font-bold text-lg mt-6 mb-4 text-gray-800">Privacy Policy</h4>
                <p className="text-gray-600">
                  We collect and process your personal information to provide our services. 
                  Your data is protected and will not be shared with third parties without consent.
                </p>
              </div>

              <CheckboxField 
                label="I accept the Terms and Conditions" 
                name="acceptTerms" 
                required 
                disabled={disabled} 
                handleAutoSave={handleAutoSaveFn}
                description="You must accept the terms and conditions to proceed"
              />
              <CheckboxField 
                label="I accept the Privacy Policy" 
                name="acceptPrivacyPolicy" 
                required 
                disabled={disabled} 
                handleAutoSave={handleAutoSaveFn}
                description="We respect your privacy and protect your personal data"
              />
              <CheckboxField 
                label="I agree to receive communication via email and SMS" 
                name="acceptCommunication" 
                disabled={disabled} 
                handleAutoSave={handleAutoSaveFn}
                description="Stay updated with important notifications and offers"
              />
            </div>
          </SectionWrapper>
        );

      case 4:
        return (
          <SectionWrapper title="KYC Documents Upload" icon={<DocumentIcon />}>
            <FileUploadField label="Aadhar Card Front" name="aadharFront" accept=".jpg,.jpeg,.png,.pdf" required disabled={disabled} handleAutoSave={handleAutoSaveFn} />
            <FileUploadField label="Aadhar Card Back" name="aadharBack" accept=".jpg,.jpeg,.png,.pdf" required disabled={disabled} handleAutoSave={handleAutoSaveFn} />
            <FileUploadField label="PAN Card" name="panCard" accept=".jpg,.jpeg,.png,.pdf" required disabled={disabled} handleAutoSave={handleAutoSaveFn} />
            <FileUploadField label="Business Proof (Optional)" name="businessProof" accept=".jpg,.jpeg,.png,.pdf" disabled={disabled} handleAutoSave={handleAutoSaveFn} />
            <div className="lg:col-span-2 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-700 font-medium">
                <strong>📝 Note:</strong> Upload clear images/PDFs of your documents. 
                Maximum file size: 2MB per document. Supported formats: JPG, PNG, PDF.
              </p>
            </div>
          </SectionWrapper>
        );

      case 5:
        return (
          <SectionWrapper title="Payment Details" icon={<PaymentIcon />}>
            <div className="lg:col-span-2 text-center py-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 inline-block max-w-md">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PaymentIcon />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Partner Registration Fee</h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">₹4,999</p>
                <p className="text-gray-600 mb-6">One-time registration fee</p>
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-semibold text-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </SectionWrapper>
        );

      case 6:
        return (
          <SectionWrapper title="Partner Agreement" icon={<AgreementIcon />}>
            <div className="lg:col-span-2 text-center">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AgreementIcon />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Sign & Upload Agreement</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Please download the partner agreement, print it, sign it, and upload the signed copy.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <button
                    type="button"
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-all duration-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Agreement
                  </button>
                  <button
                    type="button"
                    className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 font-semibold transition-all duration-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print Document
                  </button>
                </div>

                <FileUploadField 
                  label="Upload Signed Agreement" 
                  name="signedAgreement" 
                  accept=".pdf,.jpg,.jpeg,.png" 
                  required 
                  disabled={disabled} 
                  handleAutoSave={handleAutoSaveFn} 
                />
              </div>
            </div>
          </SectionWrapper>
        );

      case 7:
        return (
          <SectionWrapper title="Registration Complete" icon={<SuccessIcon />}>
            <div className="lg:col-span-2 text-center py-8">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-12 max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <SuccessIcon />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">🎉 Welcome Aboard!</h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Your partner account has been created successfully. You will receive login details via email shortly.
                </p>
                
                <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                  <h4 className="font-bold text-xl mb-6 text-gray-800 text-center">Your Partner Account</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Partner ID:</label>
                      <p className="font-mono bg-gray-100 p-3 rounded-lg font-bold text-gray-800">PART{Date.now().toString().slice(-6)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Username:</label>
                      <p className="font-mono bg-gray-100 p-3 rounded-lg font-bold text-gray-800">{formData.email}</p>
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold text-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Access Partner Dashboard
                </button>
              </div>
            </div>
          </SectionWrapper>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header Section Inside the Form */}
          <div className="text-center pt-8 px-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Registration Franchise/Partner 
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Join our network of successful partners and grow your business with us
            </p>
          </div>

          {/* Progress Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">Complete Your Registration</h2>
                <p className="text-blue-100 mt-2">Step {currentStep} of {steps.length}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{currentStep}</div>
                <div className="text-blue-100 text-sm">Current Step</div>
              </div>
            </div>
            <div className="w-full bg-blue-500 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500" 
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Scrollable Form Content */}
          <div className="p-8 max-h-[65vh] overflow-y-auto custom-scrollbar">
            <StepIndicator currentStep={currentStep} steps={steps} />

            {!isSubmitted && (
              <Formik
                initialValues={{ ...initialValues, ...formData }}
                validationSchema={getValidationSchema(currentStep)}
                enableReinitialize
                onSubmit={handleStepSubmit}
              >
                {({ isSubmitting, values }) => (
                  <Form>
                    {renderStepContent(currentStep, !!disabledSteps[currentStep], handleAutoSave)}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
                      {currentStep > 1 ? (
                        <button
                          type="button"
                          onClick={() => setCurrentStep(prev => prev - 1)}
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
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-12 max-w-2xl mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <SuccessIcon />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h3>
                  <p className="text-gray-600 mb-8 text-lg">
                    Thank you for completing your registration. Your account is now being processed.
                  </p>
                  <button
                    onClick={() => window.location.href = 'signin/franchise'}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold transition-all duration-200"
                  >
                    Go to Login
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Need help? Contact our support team at support@digitalcard.com or call +91 9480 65 1581</p>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

// Debounce helper function
const debounce = (fn, delay = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default RegistrationPage;