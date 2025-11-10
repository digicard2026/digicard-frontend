// // import React, { useState, useEffect } from 'react';
// // import { Formik, Form, Field, ErrorMessage } from 'formik';
// // import * as Yup from 'yup';
// // import { useLocation } from "react-router-dom";

// // // -------------------- FIXED validation schemas --------------------
// // const step1Validation = Yup.object({
// //   businessName: Yup.string().required('Business name is required'),
// //   businessType: Yup.string().required('Business type is required'),
// //   email: Yup.string().email('Invalid email address').required('Email is required'),
// //   phone: Yup.string()
// //     .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
// //     .required('Phone number is required'),
// //   role: Yup.string().required('Please select franchise or partner'),
// //   franchiseId: Yup.string().when('role', {
// //     is: 'partner',
// //     then: (schema) => schema.required('Franchise ID is required for partners'),
// //     otherwise: (schema) => schema
// //   })
// // });

// // const step2Validation = Yup.object({
// //   salutation: Yup.string().required('Salutation is required'),
// //   firstName: Yup.string().required('First name is required'),
// //   lastName: Yup.string().required('Last name is required'),
// //   dateOfBirth: Yup.date().required('Date of birth is required'),
// //   gender: Yup.string().required('Gender is required'),
// //   personalContact: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Personal contact is required'),
// //   personalEmail: Yup.string().email('Invalid email address').required('Email is required'),
// //   aadharNumber: Yup.string().matches(/^[0-9]{12}$/, 'Aadhar must be 12 digits').required('Aadhar number is required'),
// //   panNumber: Yup.string().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number').required('PAN number is required'),
// //   addressLine1: Yup.string().required('Address line 1 is required'),
// //   city: Yup.string().required('City is required'),
// //   state: Yup.string().required('State is required'),
// //   pincode: Yup.string().matches(/^[0-9]{6}$/, 'Pincode must be 6 digits').required('Pincode is required'),
// // });

// // const step3Validation = Yup.object({
// //   acceptTerms: Yup.boolean().oneOf([true], 'You must accept terms and conditions'),
// //   acceptPrivacyPolicy: Yup.boolean().oneOf([true], 'You must accept privacy policy'),
// // });

// // const step4Validation = Yup.object({
// //   aadharFront: Yup.mixed().required('Aadhar front is required'),
// //   aadharBack: Yup.mixed().required('Aadhar back is required'),
// //   panCard: Yup.mixed().required('PAN card is required'),
// //   businessProof: Yup.mixed(),
// // });

// // const step6Validation = Yup.object({
// //   signedAgreement: Yup.mixed().required('Signed agreement is required'),
// // });

// // // -------------------- UI Field components --------------------
// // const InputField = ({ label, name, type = 'text', required = false, disabled = false, icon = null, ...props }) => (
// //   <div className="mb-6">
// //     <label htmlFor={name} className={`block text-sm font-semibold mb-3 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
// //       {label} {required && <span className="text-red-500 ml-1">*</span>}
// //     </label>

// //     <Field name={name}>
// //       {({ field, form }) => (
// //         disabled ? (
// //           <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-600 font-medium">
// //             {form.values[name] || <span className="text-gray-400 italic">Not provided</span>}
// //           </div>
// //         ) : (
// //           <div className="relative">
// //             {icon && (
// //               <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
// //                 {icon}
// //               </div>
// //             )}
// //             <input
// //               {...field}
// //               {...props}
// //               id={name}
// //               type={type}
// //               className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 ${
// //                 icon ? 'pl-10' : ''
// //               } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-gray-300'}`}
// //               disabled={disabled}
// //             />
// //           </div>
// //         )
// //       )}
// //     </Field>

// //     <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
// //   </div>
// // );

// // const SelectField = ({ label, name, options, required = false, disabled = false, icon = null }) => (
// //   <div className="mb-6">
// //     <label htmlFor={name} className={`block text-sm font-semibold mb-3 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
// //       {label} {required && <span className="text-red-500 ml-1">*</span>}
// //     </label>

// //     <Field name={name}>
// //       {({ field, form }) => (
// //         disabled ? (
// //           <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-600 font-medium">
// //             {form.values[name] || <span className="text-gray-400 italic">Not selected</span>}
// //           </div>
// //         ) : (
// //           <div className="relative">
// //             {icon && (
// //               <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
// //                 {icon}
// //               </div>
// //             )}
// //             <select
// //               {...field}
// //               id={name}
// //               className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 appearance-none bg-white hover:border-gray-300 ${
// //                 icon ? 'pl-10' : ''
// //               }`}
// //             >
// //               <option value="">Select {label}</option>
// //               {options.map(option => (
// //                 <option key={option.value || option} value={option.value || option}>
// //                   {option.label || option}
// //                 </option>
// //               ))}
// //             </select>
// //             <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
// //               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
// //               </svg>
// //             </div>
// //           </div>
// //         )
// //       )}
// //     </Field>

// //     <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
// //   </div>
// // );

// // const CheckboxField = ({ label, name, required = false, disabled = false, description = null }) => (
// //   <div className="mb-6">
// //     <Field name={name}>
// //       {({ field, form }) => (
// //         <div className={`flex items-start space-x-3 p-4 rounded-xl border-2 ${
// //           disabled ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-gray-300'
// //         } transition-all duration-200`}>
// //           {disabled ? (
// //             <div className="flex items-center">
// //               <div className={`w-6 h-6 rounded-lg border-2 ${form.values[name] ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'}`} />
// //             </div>
// //           ) : (
// //             <input
// //               {...field}
// //               id={name}
// //               type="checkbox"
// //               checked={!!form.values[name]}
// //               className="w-6 h-6 text-blue-600 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1"
// //             />
// //           )}
// //           <div className="flex-1">
// //             <label htmlFor={name} className={`block text-sm font-semibold ${disabled ? 'text-gray-500' : 'text-gray-700'} cursor-pointer`}>
// //               {label} {required && <span className="text-red-500 ml-1">*</span>}
// //             </label>
// //             {description && (
// //               <p className="text-sm text-gray-500 mt-1">{description}</p>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </Field>
// //     <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
// //   </div>
// // );

// // const FileUploadField = ({ label, name, accept, required = false, disabled = false }) => (
// //   <div className="mb-6">
// //     <label className={`block text-sm font-semibold mb-3 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
// //       {label} {required && <span className="text-red-500 ml-1">*</span>}
// //     </label>

// //     <Field name={name}>
// //       {({ field, form }) => (
// //         disabled ? (
// //           <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-600 font-medium">
// //             {form.values[name] ? form.values[name].name || '✓ Uploaded' : <span className="text-gray-400 italic">Not uploaded</span>}
// //           </div>
// //         ) : (
// //           <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
// //             <input
// //               id={name}
// //               type="file"
// //               accept={accept}
// //               onChange={(e) => {
// //                 const file = e.currentTarget.files[0];
// //                 form.setFieldValue(name, file);
// //               }}
// //               className="hidden"
// //             />
// //             <label htmlFor={name} className="cursor-pointer">
// //               <div className="flex flex-col items-center justify-center">
// //                 <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
// //                 </svg>
// //                 <span className="text-gray-600 font-medium">Click to upload {label.toLowerCase()}</span>
// //                 <span className="text-sm text-gray-500 mt-1">Supported formats: JPG, PNG, PDF (Max 2MB)</span>
// //               </div>
// //             </label>
// //           </div>
// //         )
// //       )}
// //     </Field>

// //     <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
// //   </div>
// // );

// // // Section and StepIndicator components
// // const SectionWrapper = ({ title, children, icon = null }) => (
// //   <div className="mb-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
// //     <div className="flex items-center mb-6">
// //       {icon && <div className="mr-3 text-blue-600">{icon}</div>}
// //       <h3 className="text-xl font-bold text-gray-800">{title}</h3>
// //     </div>
// //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{children}</div>
// //   </div>
// // );

// // const StepIndicator = ({ currentStep, steps }) => (
// //   <div className="flex justify-center mb-8">
// //     <div className="flex items-center space-x-8">
// //       {steps.map((step, index) => (
// //         <div key={step.number} className="flex flex-col items-center">
// //           <div className="flex items-center">
// //             <div
// //               className={`flex items-center justify-center w-12 h-12 rounded-full border-4 font-bold text-lg transition-all duration-300 ${
// //                 currentStep >= step.number 
// //                   ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-100 text-white shadow-lg scale-110' 
// //                   : 'border-gray-200 bg-white text-gray-400'
// //               } ${currentStep === step.number ? 'ring-4 ring-blue-200' : ''}`}
// //             >
// //               {currentStep > step.number ? (
// //                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
// //                 </svg>
// //               ) : (
// //                 step.number
// //               )}
// //             </div>
// //             {index < steps.length - 1 && (
// //               <div className={`w-16 h-1 mx-4 transition-all duration-300 ${
// //                 currentStep > step.number ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'
// //               }`} />
// //             )}
// //           </div>
// //           <span className={`text-sm font-semibold mt-3 transition-all duration-300 ${
// //             currentStep >= step.number ? 'text-gray-800' : 'text-gray-400'
// //           }`}>
// //             {step.title}
// //           </span>
// //         </div>
// //       ))}
// //     </div>
// //   </div>
// // );

// // // Icons
// // const BusinessIcon = () => (
// //   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
// //   </svg>
// // );

// // const UserIcon = () => (
// //   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
// //   </svg>
// // );

// // const DocumentIcon = () => (
// //   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// //   </svg>
// // );

// // const ShieldIcon = () => (
// //   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
// //   </svg>
// // );

// // const PaymentIcon = () => (
// //   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
// //   </svg>
// // );

// // const AgreementIcon = () => (
// //   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// //   </svg>
// // );

// // const SuccessIcon = () => (
// //   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// //   </svg>
// // );

// // // -------------------- Main component --------------------
// // const RegistrationPage = () => {
// //   const [currentStep, setCurrentStep] = useState(1);
// //   const [formData, setFormData] = useState({});
// //   const [isSubmitted, setIsSubmitted] = useState(false);
// //   const [disabledSteps, setDisabledSteps] = useState({});
// //   const [franchiseExists, setFranchiseExists] = useState(false);
// //   const [recordId, setRecordId] = useState(null);
// //   const [userContext, setUserContext] = useState({
// //     userId: null,
// //     userEmail: null,
// //     isNewUser: false
// //   });
// //   const [franchiseCreatedBy, setFranchiseCreatedBy] = useState(null);

// //   const location = useLocation();

// //   const steps = [
// //     { number: 1, title: 'Business Info' },
// //     { number: 2, title: 'Personal Details' },
// //     { number: 3, title: 'Terms & Conditions' },
// //     { number: 4, title: 'KYC Documents' },
// //     { number: 5, title: 'Payment' },
// //     { number: 6, title: 'Agreement' },
// //     { number: 7, title: 'Complete' },
// //   ];

// //   const initialValues = {
// //     businessName: '', businessType: '', email: '', phone: '',
// //     salutation: '', firstName: '', middleName: '', lastName: '', dateOfBirth: '', gender: '', personalContact: '', personalEmail: '',
// //     aadharNumber: '', panNumber: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', country: 'India',
// //     acceptTerms: false, acceptPrivacyPolicy: false, acceptCommunication: false,
// //     aadharFront: null, aadharBack: null, panCard: null, businessProof: null,
// //     signedAgreement: null,
// //     role: '',
// //     franchiseId: '',
// //   };

// //   // ✅ FIXED: Proper validation schema function
// //   const getValidationSchema = (step) => {
// //     switch (step) {
// //       case 1: return step1Validation;
// //       case 2: return step2Validation;
// //       case 3: return step3Validation;
// //       case 4: return step4Validation;
// //       case 6: return step6Validation;
// //       default: return Yup.object({});
// //     }
// //   };

// //   // ✅ Check if franchise is creating a partner
// //   useEffect(() => {
// //     const franchiseId = localStorage.getItem('franchise_created_by');
// //     if (franchiseId) {
// //       setFranchiseCreatedBy(franchiseId);
// //       // Auto-set role to partner and franchiseId
// //       setFormData(prev => ({ 
// //         ...prev, 
// //         role: 'partner', 
// //         franchiseId: franchiseId 
// //       }));
// //     }
// //   }, []);

// //   // Update user role and registration status
// //   const updateUserRoleAndComplete = async (userId, role) => {
// //     try {
// //       if (!userId) {
// //         console.error('No user ID found');
// //         return false;
// //       }

// //       console.log('Updating user role:', { userId, role });
      
// //       const response = await fetch(`http://localhost:3000/api/v1/user/${userId}`, {
// //         method: 'PATCH',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ 
// //           role, 
// //           registrationComplete: true 
// //         }),
// //       });

// //       if (response.ok) {
// //         const result = await response.json();
// //         console.log('User role updated successfully:', result);
// //         localStorage.setItem('user_role', role);
// //         localStorage.setItem('registration_complete', 'true');
// //         return true;
// //       } else {
// //         const errorText = await response.text();
// //         console.error('Failed to update user role:', errorText);
// //         return false;
// //       }
// //     } catch (err) {
// //       console.error('Failed to update user role:', err);
// //       return false;
// //     }
// //   };

// //   // Load existing data
// //   useEffect(() => {
// //     const loadExisting = async () => {
// //       try {
// //         const userId = localStorage.getItem('user_id');
// //         const userEmail = localStorage.getItem('user_email');

// //         console.log('🔍 Loading user context:', { userId, userEmail });

// //         if (!userId) {
// //           console.warn('⚠ No user ID found in localStorage');
// //           return;
// //         }

// //         setUserContext({
// //           userId,
// //           userEmail,
// //           isNewUser: true
// //         });

// //         setFormData(prev => ({ 
// //           ...prev, 
// //           email: userEmail || prev.email 
// //         }));

// //         // Fetch existing data based on user ID
// //         const res = await fetch(`http://localhost:3000/api/v1/franchise-partner/franchise/${userId}`);
// //         if (res.ok) {
// //           const body = await res.json();
// //           if (body && body.success && body.data) {
// //             const record = body.data;
// //             console.log('✅ Existing record found:', record);
            
// //             const restored = {
// //               businessName: record.businessName || '',
// //               businessType: record.businessType || '',
// //               email: record.email || (userEmail || ''),
// //               phone: record.phone || '',
// //               role: record.role || '',
// //               franchiseId: record.franchiseId || '',
// //               salutation: record.salutation || '',
// //               firstName: record.firstName || '',
// //               middleName: record.middleName || '',
// //               lastName: record.lastName || '',
// //               dateOfBirth: record.dateOfBirth ? record.dateOfBirth.split('T')[0] : '',
// //               gender: record.gender || '',
// //               personalContact: record.personalContact || '',
// //               personalEmail: record.personalEmail || '',
// //               aadharNumber: record.aadharNumber || '',
// //               panNumber: record.panNumber || '',
// //               addressLine1: record.addressLine1 || '',
// //               addressLine2: record.addressLine2 || '',
// //               city: record.city || '',
// //               state: record.state || '',
// //               pincode: record.pincode || '',
// //               country: record.country || 'India',
// //               acceptTerms: !!record.acceptTerms,
// //               acceptPrivacyPolicy: !!record.acceptPrivacyPolicy,
// //               acceptCommunication: !!record.acceptCommunication,
// //               paymentStatus: record.paymentStatus || 'pending',
// //               signedAgreement: record.signedAgreement || null,
// //             };

// //             setFormData(restored);
// //             setFranchiseExists(true);
// //             setRecordId(record._id || null);
            
// //             if (record.registrationStep) {
// //               const nextStep = record.registrationStep <= 7 ? record.registrationStep : 1;
// //               setCurrentStep(nextStep);
// //               const disabledMap = {};
// //               for (let i = 1; i <= record.registrationStep; i++) disabledMap[i] = true;
// //               setDisabledSteps(disabledMap);
// //             }
// //           } else {
// //             console.log('🆕 No existing record - starting fresh');
// //             setFranchiseExists(false);
// //           }
// //         } else {
// //           console.log('🆕 No existing record - API error');
// //           setFranchiseExists(false);
// //         }
// //       } catch (err) {
// //         console.error('❌ Error loading existing registration', err);
// //         setFranchiseExists(false);
// //       }
// //     };

// //     loadExisting();
// //   }, []);

// //   // ✅ FIXED: Handle step submission with proper data structure
// //   const handleStepSubmit = async (values, { setSubmitting }) => {
// //     try {
// //       const userId = userContext.userId;
// //       const userEmail = userContext.userEmail;

// //       if (!userId) {
// //         alert('❌ User session expired. Please sign up again.');
// //         window.location.href = '/signup';
// //         return;
// //       }

// //       console.log('📤 Submitting with user ID:', userId);

// //       const merged = { 
// //         ...formData, 
// //         ...values,
// //         createdBy: franchiseCreatedBy,
// //         userId: userId,
// //         userEmail: userEmail
// //       };

// //       // Ensure email is set
// //       if (!merged.email && userEmail) {
// //         merged.email = userEmail;
// //       }

// //       console.log('📋 Merged form data:', merged);

// //       // ✅ FIXED: Use JSON format for creation to ensure all data is properly sent
// //       if (!franchiseExists) {
// //         // Create new record using JSON format
// //         let apiUrl;
// //         let requestData = {
// //           userId: userId,
// //           userEmail: userEmail,
// //           businessName: merged.businessName,
// //           businessType: merged.businessType,
// //           email: merged.email,
// //           phone: merged.phone,
// //           role: merged.role,
// //           salutation: merged.salutation,
// //           firstName: merged.firstName,
// //           middleName: merged.middleName,
// //           lastName: merged.lastName,
// //           dateOfBirth: merged.dateOfBirth,
// //           gender: merged.gender,
// //           personalContact: merged.personalContact,
// //           personalEmail: merged.personalEmail,
// //           aadharNumber: merged.aadharNumber,
// //           panNumber: merged.panNumber,
// //           addressLine1: merged.addressLine1,
// //           addressLine2: merged.addressLine2,
// //           city: merged.city,
// //           state: merged.state,
// //           pincode: merged.pincode,
// //           country: merged.country,
// //           acceptTerms: merged.acceptTerms,
// //           acceptPrivacyPolicy: merged.acceptPrivacyPolicy,
// //           acceptCommunication: merged.acceptCommunication,
// //           stepNumber: currentStep
// //         };

// //         if (merged.role === 'franchise') {
// //           apiUrl = 'http://localhost:3000/api/v1/franchise-partner/franchise/create';
// //           console.log('🆕 Creating new franchise with data:', requestData);
// //         } else if (merged.role === 'partner') {
// //           const franchiseId = merged.franchiseId || franchiseCreatedBy;
// //           if (!franchiseId) {
// //             throw new Error('Franchise ID is required for partner registration');
// //           }
// //           apiUrl = `http://localhost:3000/api/v1/franchise-partner/franchise/${franchiseId}/partners`;
// //           requestData.franchiseId = franchiseId;
// //           console.log('🆕 Creating new partner with data:', requestData);
// //         } else {
// //           throw new Error('Please select a role (franchise or partner)');
// //         }

// //         const response = await fetch(apiUrl, {
// //           method: 'PUT',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify(requestData),
// //         });

// //         const responseText = await response.text();
// //         console.log('📥 Response:', responseText);
        
// //         let responseJson;
// //         try {
// //           responseJson = JSON.parse(responseText);
// //         } catch (e) {
// //           throw new Error('Invalid response from server');
// //         }

// //         if (!response.ok) {
// //           throw new Error(responseJson.message || responseJson.error || 'Failed to create record');
// //         }

// //         setFranchiseExists(true);
// //         if (responseJson.data && (responseJson.data._id || responseJson.data.userId)) {
// //           setRecordId(responseJson.data._id || responseJson.data.userId);
// //         }

// //       } else {
// //         // For existing records, we don't need to call save-step API
// //         // Just update the local state and proceed to next step
// //         console.log('📝 Existing record - proceeding to next step without API call');
// //       }

// //       // Update user role when registration is complete
// //       if (currentStep === 7) {
// //         const chosenRole = merged.role || '';
// //         if (userId && chosenRole) {
// //           await updateUserRoleAndComplete(userId, chosenRole);
// //         }
// //       }

// //       setFormData(prev => ({ ...prev, ...values }));
// //       setDisabledSteps(prev => ({ ...prev, [currentStep]: true }));

// //       if (currentStep < 7) {
// //         setCurrentStep(prev => prev + 1);
// //       } else {
// //         // Final step - mark as submitted
// //         setIsSubmitted(true);
        
// //         // Final safety check to ensure user role is updated
// //         const chosenRole = merged.role || '';
// //         if (userId && chosenRole) {
// //           await updateUserRoleAndComplete(userId, chosenRole);
// //         }

// //         // Clear franchise context after successful registration
// //         if (franchiseCreatedBy) {
// //           localStorage.removeItem('franchise_created_by');
// //         }
// //       }
// //     } catch (error) {
// //       console.error('❌ Submission error:', error);
// //       alert(error.message || 'Failed to save step');
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   // Render step content
// //   const renderStepContent = (step, disabled) => {
// //     switch (step) {
// //       case 1:
// //         return (
// //           <SectionWrapper title="Business Information" icon={<BusinessIcon />}>
// //             {/* User Info Banner */}
// //             {userContext.userId && (
// //               <div className="lg:col-span-2 bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
// //                 <div className="flex items-center">
// //                   <div className="bg-blue-100 p-2 rounded-lg mr-3">
// //                     <UserIcon />
// //                   </div>
// //                   <div>
// //                     <p className="text-blue-800 font-semibold">Welcome! {userContext.userEmail}</p>
// //                     <p className="text-blue-600 text-sm">Your User ID: {userContext.userId}</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Franchise Context Banner */}
// //             {franchiseCreatedBy && (
// //               <div className="lg:col-span-2 bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
// //                 <div className="flex items-center">
// //                   <div className="bg-green-100 p-2 rounded-lg mr-3">
// //                     <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                     </svg>
// //                   </div>
// //                   <div>
// //                     <p className="text-green-800 font-semibold">Partner Registration</p>
// //                     <p className="text-green-600 text-sm">This partner account will be linked to franchise</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Role Selection - Auto-set for franchise-created partners */}
// //             <SelectField
// //               label="Register As"
// //               name="role"
// //               options={[
// //                 { value: 'franchise', label: 'Franchise' },
// //                 { value: 'partner', label: 'Partner' }
// //               ]}
// //               required
// //               disabled={franchiseCreatedBy ? true : disabled}
// //             />

// //             {/* Auto-filled Franchise ID for franchise-created partners */}
// //             {franchiseCreatedBy && (
// //               <div className="lg:col-span-2">
// //                 <InputField 
// //                   label="Franchise ID" 
// //                   name="franchiseId" 
// //                   required 
// //                   disabled={true}
// //                   value={franchiseCreatedBy}
// //                 />
// //                 <p className="text-green-600 text-sm mt-2">
// //                   ✓ This partner will be automatically linked to the franchise
// //                 </p>
// //               </div>
// //             )}

// //             {/* Manual Franchise ID field for regular partner registration */}
// //             <Field name="role">
// //               {({ field }) => (
// //                 !franchiseCreatedBy && field.value === 'partner' && (
// //                   <div className="lg:col-span-2">
// //                     <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-4">
// //                       <h4 className="font-bold text-yellow-800 mb-2">Partner Registration</h4>
// //                       <p className="text-yellow-700 text-sm">
// //                         You need a Franchise ID to register as a partner. Get this from your franchise owner.
// //                       </p>
// //                     </div>
                    
// //                     <InputField 
// //                       label="Franchise ID" 
// //                       name="franchiseId" 
// //                       required 
// //                       disabled={disabled} 
// //                       placeholder="Enter Franchise ID"
// //                     />
// //                   </div>
// //                 )
// //               )}
// //             </Field>

// //             {/* Regular Business Fields */}
// //             <InputField 
// //               label="Business Name" 
// //               name="businessName" 
// //               required 
// //               disabled={disabled} 
// //             />
// //             <SelectField 
// //               label="Business Type" 
// //               name="businessType" 
// //               options={['Retail', 'Service', 'Manufacturing', 'Technology', 'Consulting']} 
// //               required 
// //               disabled={disabled} 
// //             />
// //             <div className="lg:col-span-2">
// //               <InputField 
// //                 label="Email Address" 
// //                 name="email" 
// //                 type="email" 
// //                 required 
// //                 disabled={true}
// //               />
// //             </div>
// //             <InputField 
// //               label="Phone Number" 
// //               name="phone" 
// //               type="tel" 
// //               required 
// //               disabled={disabled} 
// //             />
// //           </SectionWrapper>
// //         );

// //       case 2:
// //         return (
// //           <>
// //             <SectionWrapper title="Personal Details" icon={<UserIcon />}>
// //               <SelectField label="Salutation" name="salutation" options={['Mr', 'Mrs', 'Ms', 'Dr']} required disabled={disabled} />
// //               <InputField label="First Name" name="firstName" required disabled={disabled} />
// //               <InputField label="Middle Name" name="middleName" disabled={disabled} />
// //               <InputField label="Last Name" name="lastName" required disabled={disabled} />
// //               <InputField label="Date of Birth" name="dateOfBirth" type="date" required disabled={disabled} />
// //               <SelectField label="Gender" name="gender" options={['Male', 'Female', 'Other']} required disabled={disabled} />
// //               <InputField label="Personal Contact" name="personalContact" required disabled={disabled} />
// //               <InputField label="Personal Email" name="personalEmail" type="email" required disabled={disabled} />
// //               <InputField label="Aadhar Number" name="aadharNumber" required disabled={disabled} />
// //               <InputField label="PAN Number" name="panNumber" required disabled={disabled} />
// //             </SectionWrapper>

// //             <SectionWrapper title="Address Information" icon={<BusinessIcon />}>
// //               <InputField label="Address Line 1" name="addressLine1" required disabled={disabled} />
// //               <InputField label="Address Line 2" name="addressLine2" disabled={disabled} />
// //               <InputField label="City" name="city" required disabled={disabled} />
// //               <InputField label="State" name="state" required disabled={disabled} />
// //               <InputField label="Pincode" name="pincode" required disabled={disabled} />
// //               <InputField label="Country" name="country" disabled={disabled} />
// //             </SectionWrapper>
// //           </>
// //         );

// //       case 3:
// //         return (
// //           <SectionWrapper title="Terms & Conditions" icon={<ShieldIcon />}>
// //             <div className="lg:col-span-2 space-y-4">
// //               <div className="bg-gray-50 rounded-xl p-6 max-h-80 overflow-y-auto">
// //                 <h4 className="font-bold text-lg mb-4 text-gray-800">Digital Card Partner Agreement</h4>
// //                 <div className="space-y-3 text-gray-600">
// //                   <p>1. Partner agrees to comply with all company policies and procedures.</p>
// //                   <p>2. Partner shall maintain the highest standards of service quality.</p>
// //                   <p>3. All transactions must be recorded accurately in the system.</p>
// //                   <p>4. Partner is responsible for maintaining customer data confidentiality.</p>
// //                   <p>5. Company reserves the right to terminate partnership for violations.</p>
// //                   <p>6. Partner fees are non-refundable once paid.</p>
// //                   <p>7. All disputes shall be subject to jurisdiction of local courts.</p>
// //                 </div>
                
// //                 <h4 className="font-bold text-lg mt-6 mb-4 text-gray-800">Privacy Policy</h4>
// //                 <p className="text-gray-600">
// //                   We collect and process your personal information to provide our services. 
// //                   Your data is protected and will not be shared with third parties without consent.
// //                 </p>
// //               </div>

// //               <CheckboxField 
// //                 label="I accept the Terms and Conditions" 
// //                 name="acceptTerms" 
// //                 required 
// //                 disabled={disabled} 
// //                 description="You must accept the terms and conditions to proceed"
// //               />
// //               <CheckboxField 
// //                 label="I accept the Privacy Policy" 
// //                 name="acceptPrivacyPolicy" 
// //                 required 
// //                 disabled={disabled} 
// //                 description="We respect your privacy and protect your personal data"
// //               />
// //               <CheckboxField 
// //                 label="I agree to receive communication via email and SMS" 
// //                 name="acceptCommunication" 
// //                 disabled={disabled} 
// //                 description="Stay updated with important notifications and offers"
// //               />
// //             </div>
// //           </SectionWrapper>
// //         );

// //       case 4:
// //         return (
// //           <SectionWrapper title="KYC Documents Upload" icon={<DocumentIcon />}>
// //             <FileUploadField label="Aadhar Card Front" name="aadharFront" accept=".jpg,.jpeg,.png,.pdf" required disabled={disabled} />
// //             <FileUploadField label="Aadhar Card Back" name="aadharBack" accept=".jpg,.jpeg,.png,.pdf" required disabled={disabled} />
// //             <FileUploadField label="PAN Card" name="panCard" accept=".jpg,.jpeg,.png,.pdf" required disabled={disabled} />
// //             <FileUploadField label="Business Proof (Optional)" name="businessProof" accept=".jpg,.jpeg,.png,.pdf" disabled={disabled} />
// //             <div className="lg:col-span-2 bg-blue-50 border border-blue-200 rounded-xl p-4">
// //               <p className="text-sm text-blue-700 font-medium">
// //                 <strong>📝 Note:</strong> Upload clear images/PDFs of your documents. 
// //                 Maximum file size: 2MB per document. Supported formats: JPG, PNG, PDF.
// //               </p>
// //             </div>
// //           </SectionWrapper>
// //         );

// //       case 5:
// //         return (
// //           <SectionWrapper title="Payment Details" icon={<PaymentIcon />}>
// //             <div className="lg:col-span-2 text-center py-8">
// //               <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 inline-block max-w-md">
// //                 <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
// //                   <PaymentIcon />
// //                 </div>
// //                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Registration Fee</h3>
// //                 <p className="text-3xl font-bold text-blue-600 mb-2">₹4,999</p>
// //                 <p className="text-gray-600 mb-6">One-time registration fee</p>
// //                 <button
// //                   type="button"
// //                   onClick={() => setCurrentStep(prev => prev + 1)}
// //                   className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-semibold text-lg shadow-lg transition-all duration-200 transform hover:scale-105"
// //                 >
// //                   Proceed to Payment
// //                 </button>
// //               </div>
// //             </div>
// //           </SectionWrapper>
// //         );

// //       case 6:
// //         return (
// //           <SectionWrapper title="Partner Agreement" icon={<AgreementIcon />}>
// //             <div className="lg:col-span-2 text-center">
// //               <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 max-w-2xl mx-auto">
// //                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
// //                   <AgreementIcon />
// //                 </div>
// //                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Sign & Upload Agreement</h3>
// //                 <p className="text-gray-600 mb-6 text-lg">
// //                   Please download the agreement, print it, sign it, and upload the signed copy.
// //                 </p>
                
// //                 <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
// //                   <button
// //                     type="button"
// //                     className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-all duration-200 flex items-center justify-center"
// //                   >
// //                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// //                     </svg>
// //                     Download Agreement
// //                   </button>
// //                   <button
// //                     type="button"
// //                     className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 font-semibold transition-all duration-200 flex items-center justify-center"
// //                   >
// //                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
// //                     </svg>
// //                     Print Document
// //                   </button>
// //                 </div>

// //                 <FileUploadField 
// //                   label="Upload Signed Agreement" 
// //                   name="signedAgreement" 
// //                   accept=".pdf,.jpg,.jpeg,.png" 
// //                   required 
// //                   disabled={disabled} 
// //                 />
// //               </div>
// //             </div>
// //           </SectionWrapper>
// //         );

// //       case 7:
// //         return (
// //           <SectionWrapper title="Registration Complete" icon={<SuccessIcon />}>
// //             <div className="lg:col-span-2 text-center py-8">
// //               <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-12 max-w-2xl mx-auto">
// //                 <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
// //                   <SuccessIcon />
// //                 </div>
// //                 <h3 className="text-3xl font-bold text-gray-800 mb-4">🎉 Welcome Aboard!</h3>
// //                 <p className="text-gray-600 mb-8 text-lg">
// //                   Your {formData.role} account has been created successfully. 
// //                   {franchiseCreatedBy && ' You are now linked to your franchise.'}
// //                 </p>
                
// //                 <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
// //                   <h4 className="font-bold text-xl mb-6 text-gray-800 text-center">Your Account Details</h4>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
// //                     <div>
// //                       <label className="text-sm font-semibold text-gray-600">User ID:</label>
// //                       <p className="font-mono bg-gray-100 p-3 rounded-lg font-bold text-gray-800">{userContext.userId}</p>
// //                     </div>
// //                     <div>
// //                       <label className="text-sm font-semibold text-gray-600">Role:</label>
// //                       <p className="font-mono bg-gray-100 p-3 rounded-lg font-bold text-gray-800 capitalize">{formData.role}</p>
// //                     </div>
// //                     {formData.role === 'partner' && formData.franchiseId && (
// //                       <div className="md:col-span-2">
// //                         <label className="text-sm font-semibold text-gray-600">Franchise ID:</label>
// //                         <p className="font-mono bg-gray-100 p-3 rounded-lg font-bold text-gray-800">{formData.franchiseId}</p>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
                
// //                 <button
// //                   type="submit"
// //                   className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold text-lg shadow-lg transition-all duration-200 transform hover:scale-105"
// //                 >
// //                   Access {formData.role === 'franchise' ? 'Franchise' : 'Partner'} Dashboard
// //                 </button>
// //               </div>
// //             </div>
// //           </SectionWrapper>
// //         );

// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
// //       <div className="max-w-6xl mx-auto">
// //         <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
// //           {/* Header Section */}
// //           <div className="text-center pt-8 px-8">
// //             <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
// //               {franchiseCreatedBy ? 'Partner Registration' : 'Franchise/Partner Registration'}
// //             </h1>
// //             <p className="text-xl text-gray-600 mb-6">
// //               {franchiseCreatedBy 
// //                 ? 'Complete your partner profile to join the franchise network' 
// //                 : 'Join our network of successful partners and grow your business with us'
// //               }
// //             </p>
// //           </div>

// //           {/* Progress Section */}
// //           <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-8">
// //             <div className="flex items-center justify-between mb-4">
// //               <div>
// //                 <h2 className="text-2xl font-bold">Complete Your Registration</h2>
// //                 <p className="text-blue-100 mt-2">Step {currentStep} of {steps.length}</p>
// //               </div>
// //               <div className="text-right">
// //                 <div className="text-3xl font-bold">{currentStep}</div>
// //                 <div className="text-blue-100 text-sm">Current Step</div>
// //               </div>
// //             </div>
// //             <div className="w-full bg-blue-500 rounded-full h-2">
// //               <div 
// //                 className="bg-white rounded-full h-2 transition-all duration-500" 
// //                 style={{ width: `${(currentStep / steps.length) * 100}%` }}
// //               ></div>
// //             </div>
// //           </div>

// //           {/* Scrollable Form Content */}
// //           <div className="p-8 max-h-[65vh] overflow-y-auto custom-scrollbar">
// //             <StepIndicator currentStep={currentStep} steps={steps} />

// //             {!isSubmitted && (
// //               <Formik
// //                 initialValues={{ ...initialValues, ...formData }}
// //                 validationSchema={getValidationSchema(currentStep)}
// //                 enableReinitialize
// //                 onSubmit={handleStepSubmit}
// //               >
// //                 {({ isSubmitting, values }) => (
// //                   <Form>
// //                     {renderStepContent(currentStep, !!disabledSteps[currentStep])}

// //                     {/* Navigation Buttons */}
// //                     <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
// //                       {currentStep > 1 ? (
// //                         <button
// //                           type="button"
// //                           onClick={() => setCurrentStep(prev => prev - 1)}
// //                           className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all duration-200 flex items-center"
// //                         >
// //                           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// //                           </svg>
// //                           Previous
// //                         </button>
// //                       ) : <div />}

// //                       <div className="flex items-center gap-4">
// //                         {disabledSteps[currentStep] && (
// //                           <button
// //                             type="button"
// //                             onClick={() => setDisabledSteps(prev => ({ ...prev, [currentStep]: false }))}
// //                             className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 font-semibold transition-all duration-200 flex items-center"
// //                           >
// //                             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
// //                             </svg>
// //                             Edit Step
// //                           </button>
// //                         )}

// //                         <button
// //                           type="submit"
// //                           disabled={isSubmitting || !!disabledSteps[currentStep]}
// //                           className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center ${
// //                             isSubmitting || disabledSteps[currentStep]
// //                               ? 'bg-gray-400 cursor-not-allowed text-white'
// //                               : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
// //                           }`}
// //                         >
// //                           {isSubmitting ? (
// //                             <>
// //                               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
// //                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                               </svg>
// //                               Processing...
// //                             </>
// //                           ) : (
// //                             <>
// //                               {currentStep === steps.length ? 'Complete Registration' : 'Continue'}
// //                               <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// //                               </svg>
// //                             </>
// //                           )}
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </Form>
// //                 )}
// //               </Formik>
// //             )}

// //             {isSubmitted && (
// //               <div className="text-center py-16">
// //                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-12 max-w-2xl mx-auto">
// //                   <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
// //                     <SuccessIcon />
// //                   </div>
// //                   <h3 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h3>
// //                   <p className="text-gray-600 mb-8 text-lg">
// //                     Thank you for completing your registration. Your account is now being processed.
// //                     {franchiseCreatedBy && ' You are now linked to your franchise.'}
// //                   </p>
// //                   <button
// //                     onClick={() => window.location.href = '/signin/franchise'}
// //                     className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold transition-all duration-200"
// //                   >
// //                     Go to Login
// //                   </button>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Footer */}
// //         <div className="text-center mt-8 text-gray-500 text-sm">
// //           <p>Need help? Contact our support team at support@digitalcard.com or call +91 9480 65 1581</p>
// //         </div>
// //       </div>

// //       {/* Custom Scrollbar Styles */}
// //       <style jsx>{`
// //         .custom-scrollbar::-webkit-scrollbar {
// //           width: 8px;
// //         }
// //         .custom-scrollbar::-webkit-scrollbar-track {
// //           background: #f1f5f9;
// //           border-radius: 10px;
// //         }
// //         .custom-scrollbar::-webkit-scrollbar-thumb {
// //           background: #cbd5e1;
// //           border-radius: 10px;
// //         }
// //         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
// //           background: #94a3b8;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default RegistrationPage;
// import React, { useState, useEffect } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useLocation } from "react-router-dom";

// // -------------------- FIXED validation schemas --------------------
// const step1Validation = Yup.object({
//   businessName: Yup.string().required('Business name is required'),
//   businessType: Yup.string().required('Business type is required'),
//   email: Yup.string().email('Invalid email address').required('Email is required'),
//   phone: Yup.string()
//     .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
//     .required('Phone number is required'),
//   role: Yup.string().required('Please select franchise or partner'),
//   franchiseId: Yup.string().when('role', {
//     is: 'partner',
//     then: (schema) => schema.required('Franchise ID is required for partners'),
//     otherwise: (schema) => schema
//   })
// });

// const step2Validation = Yup.object({
//   salutation: Yup.string().required('Salutation is required'),
//   firstName: Yup.string().required('First name is required'),
//   lastName: Yup.string().required('Last name is required'),
//   dateOfBirth: Yup.date().required('Date of birth is required'),
//   gender: Yup.string().required('Gender is required'),
//   personalContact: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Personal contact is required'),
//   personalEmail: Yup.string().email('Invalid email address').required('Email is required'),
//   aadharNumber: Yup.string().matches(/^[0-9]{12}$/, 'Aadhar must be 12 digits').required('Aadhar number is required'),
//   panNumber: Yup.string().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number').required('PAN number is required'),
//   addressLine1: Yup.string().required('Address line 1 is required'),
//   city: Yup.string().required('City is required'),
//   state: Yup.string().required('State is required'),
//   pincode: Yup.string().matches(/^[0-9]{6}$/, 'Pincode must be 6 digits').required('Pincode is required'),
// });

// const step3Validation = Yup.object({
//   acceptTerms: Yup.boolean().oneOf([true], 'You must accept terms and conditions'),
//   acceptPrivacyPolicy: Yup.boolean().oneOf([true], 'You must accept privacy policy'),
// });

// const step4Validation = Yup.object({
//   aadharFront: Yup.mixed().required('Aadhar front is required'),
//   aadharBack: Yup.mixed().required('Aadhar back is required'),
//   panCard: Yup.mixed().required('PAN card is required'),
//   businessProof: Yup.mixed(),
// });

// const step6Validation = Yup.object({
//   signedAgreement: Yup.mixed().required('Signed agreement is required'),
// });

// // -------------------- UI Field components --------------------
// const InputField = ({ label, name, type = 'text', required = false, disabled = false, icon = null, ...props }) => (
//   <div className="mb-6">
//     <label htmlFor={name} className={`block text-sm font-semibold mb-3 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
//       {label} {required && <span className="text-red-500 ml-1">*</span>}
//     </label>

//     <Field name={name}>
//       {({ field, form }) => (
//         disabled ? (
//           <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-600 font-medium">
//             {form.values[name] || <span className="text-gray-400 italic">Not provided</span>}
//           </div>
//         ) : (
//           <div className="relative">
//             {icon && (
//               <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                 {icon}
//               </div>
//             )}
//             <input
//               {...field}
//               {...props}
//               id={name}
//               type={type}
//               className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 ${
//                 icon ? 'pl-10' : ''
//               } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-gray-300'}`}
//               disabled={disabled}
//             />
//           </div>
//         )
//       )}
//     </Field>

//     <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
//   </div>
// );

// const SelectField = ({ label, name, options, required = false, disabled = false, icon = null }) => (
//   <div className="mb-6">
//     <label htmlFor={name} className={`block text-sm font-semibold mb-3 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
//       {label} {required && <span className="text-red-500 ml-1">*</span>}
//     </label>

//     <Field name={name}>
//       {({ field, form }) => (
//         disabled ? (
//           <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-600 font-medium">
//             {form.values[name] || <span className="text-gray-400 italic">Not selected</span>}
//           </div>
//         ) : (
//           <div className="relative">
//             {icon && (
//               <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                 {icon}
//               </div>
//             )}
//             <select
//               {...field}
//               id={name}
//               className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 appearance-none bg-white hover:border-gray-300 ${
//                 icon ? 'pl-10' : ''
//               }`}
//             >
//               <option value="">Select {label}</option>
//               {options.map(option => (
//                 <option key={option.value || option} value={option.value || option}>
//                   {option.label || option}
//                 </option>
//               ))}
//             </select>
//             <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </div>
//           </div>
//         )
//       )}
//     </Field>

//     <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
//   </div>
// );

// const CheckboxField = ({ label, name, required = false, disabled = false, description = null }) => (
//   <div className="mb-6">
//     <Field name={name}>
//       {({ field, form }) => (
//         <div className={`flex items-start space-x-3 p-4 rounded-xl border-2 ${
//           disabled ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-gray-300'
//         } transition-all duration-200`}>
//           {disabled ? (
//             <div className="flex items-center">
//               <div className={`w-6 h-6 rounded-lg border-2 ${form.values[name] ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'}`} />
//             </div>
//           ) : (
//             <input
//               {...field}
//               id={name}
//               type="checkbox"
//               checked={!!form.values[name]}
//               className="w-6 h-6 text-blue-600 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1"
//             />
//           )}
//           <div className="flex-1">
//             <label htmlFor={name} className={`block text-sm font-semibold ${disabled ? 'text-gray-500' : 'text-gray-700'} cursor-pointer`}>
//               {label} {required && <span className="text-red-500 ml-1">*</span>}
//             </label>
//             {description && (
//               <p className="text-sm text-gray-500 mt-1">{description}</p>
//             )}
//           </div>
//         </div>
//       )}
//     </Field>
//     <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
//   </div>
// );

// const FileUploadField = ({ label, name, accept, required = false, disabled = false }) => (
//   <div className="mb-6">
//     <label className={`block text-sm font-semibold mb-3 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
//       {label} {required && <span className="text-red-500 ml-1">*</span>}
//     </label>

//     <Field name={name}>
//       {({ field, form }) => (
//         disabled ? (
//           <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-600 font-medium">
//             {form.values[name] ? form.values[name].name || '✓ Uploaded' : <span className="text-gray-400 italic">Not uploaded</span>}
//           </div>
//         ) : (
//           <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
//             <input
//               id={name}
//               type="file"
//               accept={accept}
//               onChange={(e) => {
//                 const file = e.currentTarget.files[0];
//                 form.setFieldValue(name, file);
//               }}
//               className="hidden"
//             />
//             <label htmlFor={name} className="cursor-pointer">
//               <div className="flex flex-col items-center justify-center">
//                 <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                 </svg>
//                 <span className="text-gray-600 font-medium">Click to upload {label.toLowerCase()}</span>
//                 <span className="text-sm text-gray-500 mt-1">Supported formats: JPG, PNG, PDF (Max 2MB)</span>
//               </div>
//             </label>
//           </div>
//         )
//       )}
//     </Field>

//     <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
//   </div>
// );

// // Section and StepIndicator components
// const SectionWrapper = ({ title, children, icon = null }) => (
//   <div className="mb-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
//     <div className="flex items-center mb-6">
//       {icon && <div className="mr-3 text-blue-600">{icon}</div>}
//       <h3 className="text-xl font-bold text-gray-800">{title}</h3>
//     </div>
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{children}</div>
//   </div>
// );

// const StepIndicator = ({ currentStep, steps }) => (
//   <div className="flex justify-center mb-8">
//     <div className="flex items-center space-x-8">
//       {steps.map((step, index) => (
//         <div key={step.number} className="flex flex-col items-center">
//           <div className="flex items-center">
//             <div
//               className={`flex items-center justify-center w-12 h-12 rounded-full border-4 font-bold text-lg transition-all duration-300 ${
//                 currentStep >= step.number 
//                   ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-100 text-white shadow-lg scale-110' 
//                   : 'border-gray-200 bg-white text-gray-400'
//               } ${currentStep === step.number ? 'ring-4 ring-blue-200' : ''}`}
//             >
//               {currentStep > step.number ? (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                 </svg>
//               ) : (
//                 step.number
//               )}
//             </div>
//             {index < steps.length - 1 && (
//               <div className={`w-16 h-1 mx-4 transition-all duration-300 ${
//                 currentStep > step.number ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'
//               }`} />
//             )}
//           </div>
//           <span className={`text-sm font-semibold mt-3 transition-all duration-300 ${
//             currentStep >= step.number ? 'text-gray-800' : 'text-gray-400'
//           }`}>
//             {step.title}
//           </span>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// // Icons
// const BusinessIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//   </svg>
// );

// const UserIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//   </svg>
// );

// const DocumentIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//   </svg>
// );

// const ShieldIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//   </svg>
// );

// const PaymentIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
//   </svg>
// );

// const AgreementIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//   </svg>
// );

// const SuccessIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );

// // -------------------- Main component --------------------
// const RegistrationPage = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({});
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [disabledSteps, setDisabledSteps] = useState({});
//   const [franchiseExists, setFranchiseExists] = useState(false);
//   const [recordId, setRecordId] = useState(null);
//   const [userContext, setUserContext] = useState({
//     userId: null,
//     userEmail: null,
//     isNewUser: false
//   });
//   const [franchiseCreatedBy, setFranchiseCreatedBy] = useState(null);

//   const location = useLocation();

//   const steps = [
//     { number: 1, title: 'Business Info' },
//     { number: 2, title: 'Personal Details' },
//     { number: 3, title: 'Terms & Conditions' },
//     { number: 4, title: 'KYC Documents' },
//     { number: 5, title: 'Payment' },
//     { number: 6, title: 'Agreement' },
//     { number: 7, title: 'Complete' },
//   ];

//   const initialValues = {
//     businessName: '', businessType: '', email: '', phone: '',
//     salutation: '', firstName: '', middleName: '', lastName: '', dateOfBirth: '', gender: '', personalContact: '', personalEmail: '',
//     aadharNumber: '', panNumber: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', country: 'India',
//     acceptTerms: false, acceptPrivacyPolicy: false, acceptCommunication: false,
//     aadharFront: null, aadharBack: null, panCard: null, businessProof: null,
//     signedAgreement: null,
//     role: '',
//     franchiseId: '',
//   };

//   // ✅ FIXED: Proper validation schema function
//   const getValidationSchema = (step) => {
//     switch (step) {
//       case 1: return step1Validation;
//       case 2: return step2Validation;
//       case 3: return step3Validation;
//       case 4: return step4Validation;
//       case 6: return step6Validation;
//       default: return Yup.object({});
//     }
//   };

//   // ✅ Check if franchise is creating a partner
//  // ✅ CORRECTED: Check if franchise is creating a partner - use franchise_user_id
// useEffect(() => {
//   const franchiseUserId = localStorage.getItem('franchise_user_id');
//   if (franchiseUserId) {
//     setFranchiseCreatedBy(franchiseUserId);
//     // Auto-set role to partner and franchiseId
//     setFormData(prev => ({ 
//       ...prev, 
//       role: 'partner', 
//       franchiseId: franchiseUserId 
//     }));
//   }
// }, []);
//   // Update user role and registration status
//   const updateUserRoleAndComplete = async (userId, role) => {
//     try {
//       if (!userId) {
//         console.error('No user ID found');
//         return false;
//       }

//       console.log('Updating user role:', { userId, role });
      
//       const response = await fetch(`http://localhost:3000/api/v1/user/${userId}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           role, 
//           registrationComplete: true 
//         }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log('User role updated successfully:', result);
//         localStorage.setItem('user_role', role);
//         localStorage.setItem('registration_complete', 'true');
//         return true;
//       } else {
//         const errorText = await response.text();
//         console.error('Failed to update user role:', errorText);
//         return false;
//       }
//     } catch (err) {
//       console.error('Failed to update user role:', err);
//       return false;
//     }
//   };

//   // Load existing data
//   useEffect(() => {
//     const loadExisting = async () => {
//       try {
//         const userId = localStorage.getItem('user_id');
//         const userEmail = localStorage.getItem('user_email');

//         console.log('🔍 Loading user context:', { userId, userEmail });

//         if (!userId) {
//           console.warn('⚠ No user ID found in localStorage');
//           return;
//         }

//         setUserContext({
//           userId,
//           userEmail,
//           isNewUser: true
//         });

//         setFormData(prev => ({ 
//           ...prev, 
//           email: userEmail || prev.email 
//         }));

//         // Fetch existing data based on user ID
//         const res = await fetch(`http://localhost:3000/api/v1/franchise-partner/franchise/${userId}`);
//         if (res.ok) {
//           const body = await res.json();
//           if (body && body.success && body.data) {
//             const record = body.data;
//             console.log('✅ Existing record found:', record);
            
//             // Check if user is franchise or partner
//             if (record.role === 'franchise') {
//               // User is a franchise - load franchiseDetails
//               const franchiseDetails = record.franchiseDetails || {};
//               const restored = {
//                 businessName: franchiseDetails.businessName || '',
//                 businessType: franchiseDetails.businessType || '',
//                 email: franchiseDetails.email || (userEmail || ''),
//                 phone: franchiseDetails.phone || '',
//                 role: record.role || '',
//                 franchiseId: '', // Franchise doesn't have franchiseId
//                 salutation: franchiseDetails.salutation || '',
//                 firstName: franchiseDetails.firstName || '',
//                 middleName: franchiseDetails.middleName || '',
//                 lastName: franchiseDetails.lastName || '',
//                 dateOfBirth: franchiseDetails.dateOfBirth ? franchiseDetails.dateOfBirth.split('T')[0] : '',
//                 gender: franchiseDetails.gender || '',
//                 personalContact: franchiseDetails.personalContact || '',
//                 personalEmail: franchiseDetails.personalEmail || '',
//                 aadharNumber: franchiseDetails.aadharNumber || '',
//                 panNumber: franchiseDetails.panNumber || '',
//                 addressLine1: franchiseDetails.addressLine1 || '',
//                 addressLine2: franchiseDetails.addressLine2 || '',
//                 city: franchiseDetails.city || '',
//                 state: franchiseDetails.state || '',
//                 pincode: franchiseDetails.pincode || '',
//                 country: franchiseDetails.country || 'India',
//                 acceptTerms: !!franchiseDetails.acceptTerms,
//                 acceptPrivacyPolicy: !!franchiseDetails.acceptPrivacyPolicy,
//                 acceptCommunication: !!franchiseDetails.acceptCommunication,
//                 paymentStatus: franchiseDetails.paymentStatus || 'pending',
//                 signedAgreement: franchiseDetails.signedAgreement || null,
//               };
//               setFormData(restored);
//             } else if (record.role === 'partner') {
//               // User is a partner - find their data in partners array
//               const partnerData = record.partners?.find(partner => 
//                 partner.partnerId === userId || partner.partnerId?._id === userId
//               ) || {};
//               const restored = {
//                 businessName: partnerData.businessName || '',
//                 businessType: partnerData.businessType || '',
//                 email: partnerData.email || (userEmail || ''),
//                 phone: partnerData.phone || '',
//                 role: record.role || '',
//                 franchiseId: record._id || '', // Store franchise document ID as franchiseId
//                 salutation: partnerData.salutation || '',
//                 firstName: partnerData.firstName || '',
//                 middleName: partnerData.middleName || '',
//                 lastName: partnerData.lastName || '',
//                 dateOfBirth: partnerData.dateOfBirth ? partnerData.dateOfBirth.split('T')[0] : '',
//                 gender: partnerData.gender || '',
//                 personalContact: partnerData.personalContact || '',
//                 personalEmail: partnerData.personalEmail || '',
//                 aadharNumber: partnerData.aadharNumber || '',
//                 panNumber: partnerData.panNumber || '',
//                 addressLine1: partnerData.addressLine1 || '',
//                 addressLine2: partnerData.addressLine2 || '',
//                 city: partnerData.city || '',
//                 state: partnerData.state || '',
//                 pincode: partnerData.pincode || '',
//                 country: partnerData.country || 'India',
//                 acceptTerms: !!partnerData.acceptTerms,
//                 acceptPrivacyPolicy: !!partnerData.acceptPrivacyPolicy,
//                 acceptCommunication: !!partnerData.acceptCommunication,
//                 paymentStatus: partnerData.paymentStatus || 'pending',
//                 signedAgreement: partnerData.signedAgreement || null,
//               };
//               setFormData(restored);
//             }

//             setFranchiseExists(true);
//             setRecordId(record._id || null);
            
//             const registrationStep = record.role === 'franchise' 
//               ? record.franchiseDetails?.registrationStep 
//               : record.partners?.find(partner => 
//                   partner.partnerId === userId || partner.partnerId?._id === userId
//                 )?.registrationStep;

//             if (registrationStep) {
//               const nextStep = registrationStep <= 7 ? registrationStep : 1;
//               setCurrentStep(nextStep);
//               const disabledMap = {};
//               for (let i = 1; i <= registrationStep; i++) disabledMap[i] = true;
//               setDisabledSteps(disabledMap);
//             }
//           } else {
//             console.log('🆕 No existing record - starting fresh');
//             setFranchiseExists(false);
//           }
//         } else {
//           console.log('🆕 No existing record - API error');
//           setFranchiseExists(false);
//         }
//       } catch (err) {
//         console.error('❌ Error loading existing registration', err);
//         setFranchiseExists(false);
//       }
//     };

//     loadExisting();
//   }, []);

//   // ✅ FIXED: Handle step submission with proper data structure
//   const handleStepSubmit = async (values, { setSubmitting }) => {
//     try {
//       const userId = userContext.userId;
//       const userEmail = userContext.userEmail;

//       if (!userId) {
//         alert('❌ User session expired. Please sign up again.');
//         window.location.href = '/signup';
//         return;
//       }

//       console.log('📤 Submitting with user ID:', userId);

//       const merged = { 
//         ...formData, 
//         ...values,
//         createdBy: franchiseCreatedBy,
//         userId: userId,
//         userEmail: userEmail
//       };

//       // Ensure email is set
//       if (!merged.email && userEmail) {
//         merged.email = userEmail;
//       }

//       console.log('📋 Merged form data:', merged);

//       // ✅ FIXED: Use JSON format for creation to ensure all data is properly sent
//       if (!franchiseExists) {
//         // Create new record using JSON format
//         let apiUrl;
//         let requestData = {
//           userId: userId,
//           userEmail: userEmail,
//           businessName: merged.businessName,
//           businessType: merged.businessType,
//           email: merged.email,
//           phone: merged.phone,
//           role: merged.role,
//           salutation: merged.salutation,
//           firstName: merged.firstName,
//           middleName: merged.middleName,
//           lastName: merged.lastName,
//           dateOfBirth: merged.dateOfBirth,
//           gender: merged.gender,
//           personalContact: merged.personalContact,
//           personalEmail: merged.personalEmail,
//           aadharNumber: merged.aadharNumber,
//           panNumber: merged.panNumber,
//           addressLine1: merged.addressLine1,
//           addressLine2: merged.addressLine2,
//           city: merged.city,
//           state: merged.state,
//           pincode: merged.pincode,
//           country: merged.country,
//           acceptTerms: merged.acceptTerms,
//           acceptPrivacyPolicy: merged.acceptPrivacyPolicy,
//           acceptCommunication: merged.acceptCommunication,
//           stepNumber: currentStep
//         };

//         if (merged.role === 'franchise') {
//           apiUrl = 'http://localhost:3000/api/v1/franchise-partner/franchise/create';
//           console.log('🆕 Creating new franchise with data:', requestData);
//         } else if (merged.role === 'partner') {
//           const franchiseId = merged.franchiseId || franchiseCreatedBy;
//           if (!franchiseId) {
//             throw new Error('Franchise ID is required for partner registration');
//           }
//           apiUrl = `http://localhost:3000/api/v1/franchise-partner/franchise/${franchiseId}/partners`;
//           requestData.franchiseId = franchiseId;
//           console.log('🆕 Creating new partner with data:', requestData);
//         } else {
//           throw new Error('Please select a role (franchise or partner)');
//         }

//         const response = await fetch(apiUrl, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(requestData),
//         });

//         const responseText = await response.text();
//         console.log('📥 Response:', responseText);
        
//         let responseJson;
//         try {
//           responseJson = JSON.parse(responseText);
//         } catch (e) {
//           throw new Error('Invalid response from server');
//         }

//         if (!response.ok) {
//           throw new Error(responseJson.message || responseJson.error || 'Failed to create record');
//         }

//         setFranchiseExists(true);
//         if (responseJson.data && (responseJson.data._id || responseJson.data.userId)) {
//           setRecordId(responseJson.data._id || responseJson.data.userId);
//         }

//       } else {
//         // For existing records, we don't need to call save-step API
//         // Just update the local state and proceed to next step
//         console.log('📝 Existing record - proceeding to next step without API call');
//       }

//       // Update user role when registration is complete
//       if (currentStep === 7) {
//         const chosenRole = merged.role || '';
//         if (userId && chosenRole) {
//           await updateUserRoleAndComplete(userId, chosenRole);
//         }
//       }

//       setFormData(prev => ({ ...prev, ...values }));
//       setDisabledSteps(prev => ({ ...prev, [currentStep]: true }));

//       if (currentStep < 7) {
//         setCurrentStep(prev => prev + 1);
//       } else {
//         // Final step - mark as submitted
//         setIsSubmitted(true);
        
//         // Final safety check to ensure user role is updated
//         const chosenRole = merged.role || '';
//         if (userId && chosenRole) {
//           await updateUserRoleAndComplete(userId, chosenRole);
//         }

//         // Clear franchise context after successful registration
//         if (franchiseCreatedBy) {
//           localStorage.removeItem('franchise_created_by');
//         }
//       }
//     } catch (error) {
//       console.error('❌ Submission error:', error);
//       alert(error.message || 'Failed to save step');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Render step content
//   const renderStepContent = (step, disabled) => {
//     switch (step) {
//       case 1:
//         return (
//           <SectionWrapper title="Business Information" icon={<BusinessIcon />}>
//             {/* User Info Banner */}
//             {userContext.userId && (
//               <div className="lg:col-span-2 bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
//                 <div className="flex items-center">
//                   <div className="bg-blue-100 p-2 rounded-lg mr-3">
//                     <UserIcon />
//                   </div>
//                   <div>
//                     <p className="text-blue-800 font-semibold">Welcome! {userContext.userEmail}</p>
//                     <p className="text-blue-600 text-sm">Your User ID: {userContext.userId}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Franchise Context Banner */}
//             {franchiseCreatedBy && (
//               <div className="lg:col-span-2 bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
//                 <div className="flex items-center">
//                   <div className="bg-green-100 p-2 rounded-lg mr-3">
//                     <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-green-800 font-semibold">Partner Registration</p>
//                     <p className="text-green-600 text-sm">This partner account will be linked to franchise</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Role Selection - Auto-set for franchise-created partners */}
//             <SelectField
//               label="Register As"
//               name="role"
//               options={[
//                 { value: 'franchise', label: 'Franchise' },
//                 { value: 'partner', label: 'Partner' }
//               ]}
//               required
//               disabled={franchiseCreatedBy ? true : disabled}
//             />

//             {/* Auto-filled Franchise ID for franchise-created partners */}
//             {franchiseCreatedBy && (
//               <div className="lg:col-span-2">
//                 <InputField 
//                   label="Franchise ID" 
//                   name="franchiseId" 
//                   required 
//                   disabled={true}
//                   value={franchiseCreatedBy}
//                 />
//                 <p className="text-green-600 text-sm mt-2">
//                   ✓ This partner will be automatically linked to the franchise
//                 </p>
//               </div>
//             )}

//             {/* Manual Franchise ID field for regular partner registration */}
//             <Field name="role">
//               {({ field }) => (
//                 !franchiseCreatedBy && field.value === 'partner' && (
//                   <div className="lg:col-span-2">
//                     <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-4">
//                       <h4 className="font-bold text-yellow-800 mb-2">Partner Registration</h4>
//                       <p className="text-yellow-700 text-sm">
//                         You need a Franchise ID to register as a partner. Get this from your franchise owner.
//                       </p>
//                     </div>
                    
//                     <InputField 
//                       label="Franchise ID" 
//                       name="franchiseId" 
//                       required 
//                       disabled={disabled} 
//                       placeholder="Enter Franchise ID"
//                     />
//                   </div>
//                 )
//               )}
//             </Field>

//             {/* Regular Business Fields */}
//             <InputField 
//               label="Business Name" 
//               name="businessName" 
//               required 
//               disabled={disabled} 
//             />
//             <SelectField 
//               label="Business Type" 
//               name="businessType" 
//               options={['Retail', 'Service', 'Manufacturing', 'Technology', 'Consulting']} 
//               required 
//               disabled={disabled} 
//             />
//             <div className="lg:col-span-2">
//               <InputField 
//                 label="Email Address" 
//                 name="email" 
//                 type="email" 
//                 required 
//                 disabled={true}
//               />
//             </div>
//             <InputField 
//               label="Phone Number" 
//               name="phone" 
//               type="tel" 
//               required 
//               disabled={disabled} 
//             />
//           </SectionWrapper>
//         );

//       case 2:
//         return (
//           <>
//             <SectionWrapper title="Personal Details" icon={<UserIcon />}>
//               <SelectField label="Salutation" name="salutation" options={['Mr', 'Mrs', 'Ms', 'Dr']} required disabled={disabled} />
//               <InputField label="First Name" name="firstName" required disabled={disabled} />
//               <InputField label="Middle Name" name="middleName" disabled={disabled} />
//               <InputField label="Last Name" name="lastName" required disabled={disabled} />
//               <InputField label="Date of Birth" name="dateOfBirth" type="date" required disabled={disabled} />
//               <SelectField label="Gender" name="gender" options={['Male', 'Female', 'Other']} required disabled={disabled} />
//               <InputField label="Personal Contact" name="personalContact" required disabled={disabled} />
//               <InputField label="Personal Email" name="personalEmail" type="email" required disabled={disabled} />
//               <InputField label="Aadhar Number" name="aadharNumber" required disabled={disabled} />
//               <InputField label="PAN Number" name="panNumber" required disabled={disabled} />
//             </SectionWrapper>

//             <SectionWrapper title="Address Information" icon={<BusinessIcon />}>
//               <InputField label="Address Line 1" name="addressLine1" required disabled={disabled} />
//               <InputField label="Address Line 2" name="addressLine2" disabled={disabled} />
//               <InputField label="City" name="city" required disabled={disabled} />
//               <InputField label="State" name="state" required disabled={disabled} />
//               <InputField label="Pincode" name="pincode" required disabled={disabled} />
//               <InputField label="Country" name="country" disabled={disabled} />
//             </SectionWrapper>
//           </>
//         );

//       case 3:
//         return (
//           <SectionWrapper title="Terms & Conditions" icon={<ShieldIcon />}>
//             <div className="lg:col-span-2 space-y-4">
//               <div className="bg-gray-50 rounded-xl p-6 max-h-80 overflow-y-auto">
//                 <h4 className="font-bold text-lg mb-4 text-gray-800">Digital Card Partner Agreement</h4>
//                 <div className="space-y-3 text-gray-600">
//                   <p>1. Partner agrees to comply with all company policies and procedures.</p>
//                   <p>2. Partner shall maintain the highest standards of service quality.</p>
//                   <p>3. All transactions must be recorded accurately in the system.</p>
//                   <p>4. Partner is responsible for maintaining customer data confidentiality.</p>
//                   <p>5. Company reserves the right to terminate partnership for violations.</p>
//                   <p>6. Partner fees are non-refundable once paid.</p>
//                   <p>7. All disputes shall be subject to jurisdiction of local courts.</p>
//                 </div>
                
//                 <h4 className="font-bold text-lg mt-6 mb-4 text-gray-800">Privacy Policy</h4>
//                 <p className="text-gray-600">
//                   We collect and process your personal information to provide our services. 
//                   Your data is protected and will not be shared with third parties without consent.
//                 </p>
//               </div>

//               <CheckboxField 
//                 label="I accept the Terms and Conditions" 
//                 name="acceptTerms" 
//                 required 
//                 disabled={disabled} 
//                 description="You must accept the terms and conditions to proceed"
//               />
//               <CheckboxField 
//                 label="I accept the Privacy Policy" 
//                 name="acceptPrivacyPolicy" 
//                 required 
//                 disabled={disabled} 
//                 description="We respect your privacy and protect your personal data"
//               />
//               <CheckboxField 
//                 label="I agree to receive communication via email and SMS" 
//                 name="acceptCommunication" 
//                 disabled={disabled} 
//                 description="Stay updated with important notifications and offers"
//               />
//             </div>
//           </SectionWrapper>
//         );

//       case 4:
//         return (
//           <SectionWrapper title="KYC Documents Upload" icon={<DocumentIcon />}>
//             <FileUploadField label="Aadhar Card Front" name="aadharFront" accept=".jpg,.jpeg,.png,.pdf" required disabled={disabled} />
//             <FileUploadField label="Aadhar Card Back" name="aadharBack" accept=".jpg,.jpeg,.png,.pdf" required disabled={disabled} />
//             <FileUploadField label="PAN Card" name="panCard" accept=".jpg,.jpeg,.png,.pdf" required disabled={disabled} />
//             <FileUploadField label="Business Proof (Optional)" name="businessProof" accept=".jpg,.jpeg,.png,.pdf" disabled={disabled} />
//             <div className="lg:col-span-2 bg-blue-50 border border-blue-200 rounded-xl p-4">
//               <p className="text-sm text-blue-700 font-medium">
//                 <strong>📝 Note:</strong> Upload clear images/PDFs of your documents. 
//                 Maximum file size: 2MB per document. Supported formats: JPG, PNG, PDF.
//               </p>
//             </div>
//           </SectionWrapper>
//         );

//       case 5:
//         return (
//           <SectionWrapper title="Payment Details" icon={<PaymentIcon />}>
//             <div className="lg:col-span-2 text-center py-8">
//               <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 inline-block max-w-md">
//                 <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <PaymentIcon />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Registration Fee</h3>
//                 <p className="text-3xl font-bold text-blue-600 mb-2">₹4,999</p>
//                 <p className="text-gray-600 mb-6">One-time registration fee</p>
//                 <button
//                   type="button"
//                   onClick={() => setCurrentStep(prev => prev + 1)}
//                   className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-semibold text-lg shadow-lg transition-all duration-200 transform hover:scale-105"
//                 >
//                   Proceed to Payment
//                 </button>
//               </div>
//             </div>
//           </SectionWrapper>
//         );

//       case 6:
//         return (
//           <SectionWrapper title="Partner Agreement" icon={<AgreementIcon />}>
//             <div className="lg:col-span-2 text-center">
//               <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 max-w-2xl mx-auto">
//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <AgreementIcon />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Sign & Upload Agreement</h3>
//                 <p className="text-gray-600 mb-6 text-lg">
//                   Please download the agreement, print it, sign it, and upload the signed copy.
//                 </p>
                
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
//                   <button
//                     type="button"
//                     className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-all duration-200 flex items-center justify-center"
//                   >
//                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                     Download Agreement
//                   </button>
//                   <button
//                     type="button"
//                     className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 font-semibold transition-all duration-200 flex items-center justify-center"
//                   >
//                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
//                     </svg>
//                     Print Document
//                   </button>
//                 </div>

//                 <FileUploadField 
//                   label="Upload Signed Agreement" 
//                   name="signedAgreement" 
//                   accept=".pdf,.jpg,.jpeg,.png" 
//                   required 
//                   disabled={disabled} 
//                 />
//               </div>
//             </div>
//           </SectionWrapper>
//         );

//       case 7:
//         return (
//           <SectionWrapper title="Registration Complete" icon={<SuccessIcon />}>
//             <div className="lg:col-span-2 text-center py-8">
//               <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-12 max-w-2xl mx-auto">
//                 <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
//                   <SuccessIcon />
//                 </div>
//                 <h3 className="text-3xl font-bold text-gray-800 mb-4">🎉 Welcome Aboard!</h3>
//                 <p className="text-gray-600 mb-8 text-lg">
//                   Your {formData.role} account has been created successfully. 
//                   {franchiseCreatedBy && ' You are now linked to your franchise.'}
//                 </p>
                
//                 <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
//                   <h4 className="font-bold text-xl mb-6 text-gray-800 text-center">Your Account Details</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
//                     <div>
//                       <label className="text-sm font-semibold text-gray-600">User ID:</label>
//                       <p className="font-mono bg-gray-100 p-3 rounded-lg font-bold text-gray-800">{userContext.userId}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-semibold text-gray-600">Role:</label>
//                       <p className="font-mono bg-gray-100 p-3 rounded-lg font-bold text-gray-800 capitalize">{formData.role}</p>
//                     </div>
//                     {formData.role === 'partner' && formData.franchiseId && (
//                       <div className="md:col-span-2">
//                         <label className="text-sm font-semibold text-gray-600">Franchise ID:</label>
//                         <p className="font-mono bg-gray-100 p-3 rounded-lg font-bold text-gray-800">{formData.franchiseId}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
                
//                 <button
//                   type="submit"
//                   className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold text-lg shadow-lg transition-all duration-200 transform hover:scale-105"
//                 >
//                   Access {formData.role === 'franchise' ? 'Franchise' : 'Partner'} Dashboard
//                 </button>
//               </div>
//             </div>
//           </SectionWrapper>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
//           {/* Header Section */}
//           <div className="text-center pt-8 px-8">
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
//               {franchiseCreatedBy ? 'Partner Registration' : 'Franchise/Partner Registration'}
//             </h1>
//             <p className="text-xl text-gray-600 mb-6">
//               {franchiseCreatedBy 
//                 ? 'Complete your partner profile to join the franchise network' 
//                 : 'Join our network of successful partners and grow your business with us'
//               }
//             </p>
//           </div>

//           {/* Progress Section */}
//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-8">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <h2 className="text-2xl font-bold">Complete Your Registration</h2>
//                 <p className="text-blue-100 mt-2">Step {currentStep} of {steps.length}</p>
//               </div>
//               <div className="text-right">
//                 <div className="text-3xl font-bold">{currentStep}</div>
//                 <div className="text-blue-100 text-sm">Current Step</div>
//               </div>
//             </div>
//             <div className="w-full bg-blue-500 rounded-full h-2">
//               <div 
//                 className="bg-white rounded-full h-2 transition-all duration-500" 
//                 style={{ width: `${(currentStep / steps.length) * 100}%` }}
//               ></div>
//             </div>
//           </div>

//           {/* Scrollable Form Content */}
//           <div className="p-8 max-h-[65vh] overflow-y-auto custom-scrollbar">
//             <StepIndicator currentStep={currentStep} steps={steps} />

//             {!isSubmitted && (
//               <Formik
//                 initialValues={{ ...initialValues, ...formData }}
//                 validationSchema={getValidationSchema(currentStep)}
//                 enableReinitialize
//                 onSubmit={handleStepSubmit}
//               >
//                 {({ isSubmitting, values }) => (
//                   <Form>
//                     {renderStepContent(currentStep, !!disabledSteps[currentStep])}

//                     {/* Navigation Buttons */}
//                     <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
//                       {currentStep > 1 ? (
//                         <button
//                           type="button"
//                           onClick={() => setCurrentStep(prev => prev - 1)}
//                           className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all duration-200 flex items-center"
//                         >
//                           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                           </svg>
//                           Previous
//                         </button>
//                       ) : <div />}

//                       <div className="flex items-center gap-4">
//                         {disabledSteps[currentStep] && (
//                           <button
//                             type="button"
//                             onClick={() => setDisabledSteps(prev => ({ ...prev, [currentStep]: false }))}
//                             className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 font-semibold transition-all duration-200 flex items-center"
//                           >
//                             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                             </svg>
//                             Edit Step
//                           </button>
//                         )}

//                         <button
//                           type="submit"
//                           disabled={isSubmitting || !!disabledSteps[currentStep]}
//                           className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center ${
//                             isSubmitting || disabledSteps[currentStep]
//                               ? 'bg-gray-400 cursor-not-allowed text-white'
//                               : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
//                           }`}
//                         >
//                           {isSubmitting ? (
//                             <>
//                               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                               </svg>
//                               Processing...
//                             </>
//                           ) : (
//                             <>
//                               {currentStep === steps.length ? 'Complete Registration' : 'Continue'}
//                               <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                               </svg>
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </Form>
//                 )}
//               </Formik>
//             )}

//             {isSubmitted && (
//               <div className="text-center py-16">
//                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-12 max-w-2xl mx-auto">
//                   <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <SuccessIcon />
//                   </div>
//                   <h3 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h3>
//                   <p className="text-gray-600 mb-8 text-lg">
//                     Thank you for completing your registration. Your account is now being processed.
//                     {franchiseCreatedBy && ' You are now linked to your franchise.'}
//                   </p>
//                   <button
//                     onClick={() => window.location.href = '/signin/franchise'}
//                     className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold transition-all duration-200"
//                   >
//                     Go to Login
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-8 text-gray-500 text-sm">
//           <p>Need help? Contact our support team at support@digitalcard.com or call +91 9480 65 1581</p>
//         </div>
//       </div>

//       {/* Custom Scrollbar Styles */}
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f1f5f9;
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #cbd5e1;
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #94a3b8;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default RegistrationPage;


// ===========================================================

// import React, { useState, useEffect } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useLocation } from "react-router-dom";

// // -------------------- FIXED validation schemas --------------------
// const step1Validation = Yup.object({
//   businessName: Yup.string().required('Business name is required'),
//   businessType: Yup.string().required('Business type is required'),
//   email: Yup.string().email('Invalid email address').required('Email is required'),
//   phone: Yup.string()
//     .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
//     .required('Phone number is required'),
//   role: Yup.string().required('Please select franchise or partner'),
//   franchiseId: Yup.string().when('role', {
//     is: 'partner',
//     then: (schema) => schema.required('Franchise ID is required for partners'),
//     otherwise: (schema) => schema
//   })
// });

// const step2Validation = Yup.object({
//   salutation: Yup.string().required('Salutation is required'),
//   firstName: Yup.string().required('First name is required'),
//    middleName: Yup.string(),
//   lastName: Yup.string().required('Last name is required'),
//   dateOfBirth: Yup.date().required('Date of birth is required'),
//   gender: Yup.string().required('Gender is required'),
//   personalContact: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Personal contact is required'),
//   personalEmail: Yup.string().email('Invalid email address').required('Email is required'),
//   aadharNumber: Yup.string().matches(/^[0-9]{12}$/, 'Aadhar must be 12 digits').required('Aadhar number is required'),
//   panNumber: Yup.string().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number').required('PAN number is required'),
//   addressLine1: Yup.string().required('Address line 1 is required'),
//   city: Yup.string().required('City is required'),
//   state: Yup.string().required('State is required'),
//   pincode: Yup.string().matches(/^[0-9]{6}$/, 'Pincode must be 6 digits').required('Pincode is required'),
// });

// const step3Validation = Yup.object({
//   acceptTerms: Yup.boolean().oneOf([true], 'You must accept terms and conditions'),
//   acceptPrivacyPolicy: Yup.boolean().oneOf([true], 'You must accept privacy policy'),
// });

// const step4Validation = Yup.object({
//   aadharFront: Yup.string().required('Aadhar front is required'),
//   aadharBack: Yup.string().required('Aadhar back is required'),
//   panCard: Yup.string().required('PAN card is required'),
//   businessProof: Yup.mixed(),
// });

// const step6Validation = Yup.object({
//   signedAgreement: Yup.mixed().required('Signed agreement is required'),
// });

// // -------------------- UI Field components --------------------
// const InputField = ({ label, name, type = 'text', required = false, disabled = false, icon = null, ...props }) => (
//   <div className="mb-6">
//     <label htmlFor={name} className={`block text-sm font-semibold mb-3 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
//       {label} {required && <span className="text-red-500 ml-1">*</span>}
//     </label>

//     <Field name={name}>
//       {({ field, form }) => (
//         disabled ? (
//           <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-600 font-medium">
//             {form.values[name] || <span className="text-gray-400 italic">Not provided</span>}
//           </div>
//         ) : (
//           <div className="relative">
//             {icon && (
//               <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                 {icon}
//               </div>
//             )}
//             <input
//               {...field}
//               {...props}
//               id={name}
//               type={type}
//               className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 ${
//                 icon ? 'pl-10' : ''
//               } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-gray-300'}`}
//               disabled={disabled}
//             />
//           </div>
//         )
//       )}
//     </Field>

//     <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
//   </div>
// );

// const SelectField = ({ label, name, options, required = false, disabled = false, icon = null }) => (
//   <div className="mb-6">
//     <label htmlFor={name} className={`block text-sm font-semibold mb-3 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
//       {label} {required && <span className="text-red-500 ml-1">*</span>}
//     </label>

//     <Field name={name}>
//       {({ field, form }) => (
//         disabled ? (
//           <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-600 font-medium">
//             {form.values[name] || <span className="text-gray-400 italic">Not selected</span>}
//           </div>
//         ) : (
//           <div className="relative">
//             {icon && (
//               <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                 {icon}
//               </div>
//             )}
//             <select
//               {...field}
//               id={name}
//               className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 appearance-none bg-white hover:border-gray-300 ${
//                 icon ? 'pl-10' : ''
//               }`}
//             >
//               <option value="">Select {label}</option>
//               {options.map(option => (
//                 <option key={option.value || option} value={option.value || option}>
//                   {option.label || option}
//                 </option>
//               ))}
//             </select>
//             <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </div>
//           </div>
//         )
//       )}
//     </Field>

//     <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
//   </div>
// );

// const CheckboxField = ({ label, name, required = false, disabled = false, description = null }) => (
//   <div className="mb-6">
//     <Field name={name}>
//       {({ field, form }) => (
//         <div className={`flex items-start space-x-3 p-4 rounded-xl border-2 ${
//           disabled ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-gray-300'
//         } transition-all duration-200`}>
//           {disabled ? (
//             <div className="flex items-center">
//               <div className={`w-6 h-6 rounded-lg border-2 ${form.values[name] ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'}`} />
//             </div>
//           ) : (
//             <input
//               {...field}
//               id={name}
//               type="checkbox"
//               checked={!!form.values[name]}
//               className="w-6 h-6 text-blue-600 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1"
//             />
//           )}
//           <div className="flex-1">
//             <label htmlFor={name} className={`block text-sm font-semibold ${disabled ? 'text-gray-500' : 'text-gray-700'} cursor-pointer`}>
//               {label} {required && <span className="text-red-500 ml-1">*</span>}
//             </label>
//             {description && (
//               <p className="text-sm text-gray-500 mt-1">{description}</p>
//             )}
//           </div>
//         </div>
//       )}
//     </Field>
//     <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
//   </div>
// );

// const FileUploadField = ({ label, name, accept, required = false, disabled = false }) => (
//   <div className="mb-6">
//     <label className={`block text-sm font-semibold mb-3 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
//       {label} {required && <span className="text-red-500 ml-1">*</span>}
//     </label>

//     <Field name={name}>
//       {({ field, form }) => (
//         disabled ? (
//           <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-600 font-medium">
//             {form.values[name] ? form.values[name].name || '✓ Uploaded' : <span className="text-gray-400 italic">Not uploaded</span>}
//           </div>
//         ) : (
//           <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
//             <input
//               id={name}
//               type="file"
//               accept={accept}
//               onChange={(e) => {
//                 const file = e.currentTarget.files[0];
//                 form.setFieldValue(name, file);
//               }}
//               className="hidden"
//             />
//             <label htmlFor={name} className="cursor-pointer">
//               <div className="flex flex-col items-center justify-center">
//                 <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                 </svg>
//                 <span className="text-gray-600 font-medium">Click to upload {label.toLowerCase()}</span>
//                 <span className="text-sm text-gray-500 mt-1">Supported formats: JPG, PNG, PDF (Max 2MB)</span>
//               </div>
//             </label>
//           </div>
//         )
//       )}
//     </Field>

//     <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
//   </div>
// );

// // Section and StepIndicator components
// const SectionWrapper = ({ title, children, icon = null }) => (
//   <div className="mb-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
//     <div className="flex items-center mb-6">
//       {icon && <div className="mr-3 text-blue-600">{icon}</div>}
//       <h3 className="text-xl font-bold text-gray-800">{title}</h3>
//     </div>
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{children}</div>
//   </div>
// );

// const StepIndicator = ({ currentStep, steps }) => (
//   <div className="flex justify-center mb-8">
//     <div className="flex items-center space-x-8">
//       {steps.map((step, index) => (
//         <div key={step.number} className="flex flex-col items-center">
//           <div className="flex items-center">
//             <div
//               className={`flex items-center justify-center w-12 h-12 rounded-full border-4 font-bold text-lg transition-all duration-300 ${
//                 currentStep >= step.number 
//                   ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-100 text-white shadow-lg scale-110' 
//                   : 'border-gray-200 bg-white text-gray-400'
//               } ${currentStep === step.number ? 'ring-4 ring-blue-200' : ''}`}
//             >
//               {currentStep > step.number ? (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                 </svg>
//               ) : (
//                 step.number
//               )}
//             </div>
//             {index < steps.length - 1 && (
//               <div className={`w-16 h-1 mx-4 transition-all duration-300 ${
//                 currentStep > step.number ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'
//               }`} />
//             )}
//           </div>
//           <span className={`text-sm font-semibold mt-3 transition-all duration-300 ${
//             currentStep >= step.number ? 'text-gray-800' : 'text-gray-400'
//           }`}>
//             {step.title}
//           </span>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// // Icons
// const BusinessIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//   </svg>
// );

// const UserIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//   </svg>
// );

// const DocumentIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//   </svg>
// );

// const ShieldIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//   </svg>
// );

// const PaymentIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
//   </svg>
// );

// const AgreementIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//   </svg>
// );

// const SuccessIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );

// // -------------------- Main component --------------------
// const RegistrationPage = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({});
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [disabledSteps, setDisabledSteps] = useState({});
//   const [franchiseExists, setFranchiseExists] = useState(false);
//   const [recordId, setRecordId] = useState(null);
//   const [userContext, setUserContext] = useState({
//     userId: null,
//     userEmail: null,
//     isNewUser: false
//   });
//   const [franchiseCreatedBy, setFranchiseCreatedBy] = useState(null);

//   const location = useLocation();

//   const steps = [
//     { number: 1, title: 'Business Info' },
//     { number: 2, title: 'Personal Details' },
//     { number: 3, title: 'Terms & Conditions' },
//     { number: 4, title: 'KYC Documents' },
//     { number: 5, title: 'Payment' },
//     { number: 6, title: 'Agreement' },
//     { number: 7, title: 'Complete' },
//   ];

//   const initialValues = {
//     businessName: '', businessType: '', email: '', phone: '',
//     salutation: '', firstName: '', middleName: '', lastName: '', dateOfBirth: '', gender: '', personalContact: '', personalEmail: '',
//     aadharNumber: '', panNumber: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', country: 'India',
//     acceptTerms: false, acceptPrivacyPolicy: false, acceptCommunication: false,
//     aadharFront: null, aadharBack: null, panCard: null, businessProof: null,
//     signedAgreement: null,
//     role: '',
//     franchiseId: '',
//   };

//   // ✅ FIXED: Proper validation schema function
//   const getValidationSchema = (step) => {
//     switch (step) {
//       case 1: return step1Validation;
//       case 2: return step2Validation;
//       case 3: return step3Validation;
//       case 4: return step4Validation;
//       case 6: return step6Validation;
//       default: return Yup.object({});
//     }
//   };

//   // ✅ Check if franchise is creating a partner
//   useEffect(() => {
//     const franchiseId = localStorage.getItem('franchise_created_by');
//     if (franchiseId) {
//       setFranchiseCreatedBy(franchiseId);
//       // Auto-set role to partner and franchiseId
//       setFormData(prev => ({ 
//         ...prev, 
//         role: 'partner', 
//         franchiseId: franchiseId 
//       }));
//     }
//   }, []);

//   // Update user role and registration status
//   const updateUserRoleAndComplete = async (userId, role) => {
//     try {
//       if (!userId) {
//         console.error('No user ID found');
//         return false;
//       }

//       console.log('Updating user role:', { userId, role });
      
//       const response = await fetch(`http://localhost:3000/api/v1/user/${userId}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           role, 
//           registrationComplete: true 
//         }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log('User role updated successfully:', result);
//         localStorage.setItem('user_role', role);
//         localStorage.setItem('registration_complete', 'true');
//         return true;
//       } else {
//         const errorText = await response.text();
//         console.error('Failed to update user role:', errorText);
//         return false;
//       }
//     } catch (err) {
//       console.error('Failed to update user role:', err);
//       return false;
//     }
//   };

//   // Load existing data
//   useEffect(() => {
//     const loadExisting = async () => {
//       try {
//         const userId = localStorage.getItem('user_id');
//         const userEmail = localStorage.getItem('user_email');

//         console.log('🔍 Loading user context:', { userId, userEmail });

//         if (!userId) {
//           console.warn('⚠ No user ID found in localStorage');
//           return;
//         }

//         setUserContext({
//           userId,
//           userEmail,
//           isNewUser: true
//         });

//         setFormData(prev => ({ 
//           ...prev, 
//           email: userEmail || prev.email 
//         }));

//         // Fetch existing data based on user ID
//         const res = await fetch(`http://localhost:3000/api/v1/franchise-partner/franchise/${userId}`);
//         if (res.ok) {
//           const body = await res.json();
//           if (body && body.success && body.data) {
//             const record = body.data;
//             console.log('✅ Existing record found:', record);
            
//             const restored = {
//               businessName: record.businessName || '',
//               businessType: record.businessType || '',
//               email: record.email || (userEmail || ''),
//               phone: record.phone || '',
//               role: record.role || '',
//               franchiseId: record.franchiseId || '',
//               salutation: record.salutation || '',
//               firstName: record.firstName || '',
//               middleName: record.middleName || '',
//               lastName: record.lastName || '',
//               dateOfBirth: record.dateOfBirth ? record.dateOfBirth.split('T')[0] : '',
//               gender: record.gender || '',
//               personalContact: record.personalContact || '',
//               personalEmail: record.personalEmail || '',
//               aadharNumber: record.aadharNumber || '',
//               panNumber: record.panNumber || '',
//               addressLine1: record.addressLine1 || '',
//               addressLine2: record.addressLine2 || '',
//               city: record.city || '',
//               state: record.state || '',
//               pincode: record.pincode || '',
//               country: record.country || 'India',
//               acceptTerms: !!record.acceptTerms,
//               acceptPrivacyPolicy: !!record.acceptPrivacyPolicy,
//               acceptCommunication: !!record.acceptCommunication,
//               paymentStatus: record.paymentStatus || 'pending',
//               signedAgreement: record.signedAgreement || null,
//             };

//             setFormData(restored);
//             setFranchiseExists(true);
//             setRecordId(record._id || null);
            
//             if (record.registrationStep) {
//               const nextStep = record.registrationStep <= 7 ? record.registrationStep : 1;
//               setCurrentStep(nextStep);
//               const disabledMap = {};
//               for (let i = 1; i <= record.registrationStep; i++) disabledMap[i] = true;
//               setDisabledSteps(disabledMap);
//             }
//           } else {
//             console.log('🆕 No existing record - starting fresh');
//             setFranchiseExists(false);
//           }
//         } else {
//           console.log('🆕 No existing record - API error');
//           setFranchiseExists(false);
//         }
//       } catch (err) {
//         console.error('❌ Error loading existing registration', err);
//         setFranchiseExists(false);
//       }
//     };

//     loadExisting();
//   }, []);

//   // ✅ FIXED: Handle step submission with proper data structure
//   const handleStepSubmit = async (values, { setSubmitting }) => {
//     try {
//       const userId = userContext.userId;
//       const userEmail = userContext.userEmail;

//       if (!userId) {
//         alert('❌ User session expired. Please sign up again.');
//         window.location.href = '/signup';
//         return;
//       }

//       console.log('📤 Submitting with user ID:', userId);

//       const merged = { 
//         ...formData, 
//         ...values,
//         createdBy: franchiseCreatedBy,
//         userId: userId,
//         userEmail: userEmail
//       };

//       // Ensure email is set
//       if (!merged.email && userEmail) {
//         merged.email = userEmail;
//       }

//       console.log('📋 Merged form data:', merged);

//       // ✅ FIXED: Use JSON format for creation to ensure all data is properly sent
//       if (!franchiseExists) {
//         // Create new record using JSON format
//         let apiUrl;
//         let requestData = {
//           userId: userId,
//           userEmail: userEmail,
//           businessName: merged.businessName,
//           businessType: merged.businessType,
//           email: merged.email,
//           phone: merged.phone,
//           role: merged.role,
//           salutation: merged.salutation,
//           firstName: merged.firstName,
//           middleName: merged.middleName,
//           lastName: merged.lastName,
//           dateOfBirth: merged.dateOfBirth,
//           gender: merged.gender,
//           personalContact: merged.personalContact,
//           personalEmail: merged.personalEmail,
//           aadharNumber: merged.aadharNumber,
//           panNumber: merged.panNumber,
//           addressLine1: merged.addressLine1,
//           addressLine2: merged.addressLine2,
//           city: merged.city,
//           state: merged.state,
//           pincode: merged.pincode,
//           country: merged.country,
//           acceptTerms: merged.acceptTerms,
//           acceptPrivacyPolicy: merged.acceptPrivacyPolicy,
//           acceptCommunication: merged.acceptCommunication,
//           stepNumber: currentStep
//         };

//         // Use the correct API endpoints based on your backend
//         if (merged.role === 'franchise') {
//           apiUrl = 'http://localhost:3000/api/v1/franchise-partner/franchise/create';
//           console.log('🆕 Creating new franchise with data:', requestData);
//         } else if (merged.role === 'partner') {
//           const franchiseId = merged.franchiseId || franchiseCreatedBy;
//           if (!franchiseId) {
//             throw new Error('Franchise ID is required for partner registration');
//           }
//           apiUrl = `http://localhost:3000/api/v1/franchise-partner/franchise/${franchiseId}/partners`;
//           requestData.franchiseId = franchiseId;
//           console.log('🆕 Creating new partner with data:', requestData);
//         } else {
//           throw new Error('Please select a role (franchise or partner)');
//         }

//         console.log('📤 Making API call to:', apiUrl);
//         const response = await fetch(apiUrl, {
//           method: 'PUT', // Changed from PUT to POST as that's more standard for creation
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(requestData),
//         });

//         const responseText = await response.text();
//         console.log('📥 Response:', responseText);
        
//         let responseJson;
//         try {
//           responseJson = JSON.parse(responseText);
//         } catch (e) {
//           console.error('❌ Failed to parse response as JSON:', responseText);
//           throw new Error('Invalid response from server - not valid JSON');
//         }

//         if (!response.ok) {
//           throw new Error(responseJson.message || responseJson.error || `Failed to create record: ${response.status} ${response.statusText}`);
//         }

//         if (!responseJson.success) {
//           throw new Error(responseJson.message || 'Server returned unsuccessful response');
//         }

//         setFranchiseExists(true);
//         if (responseJson.data && (responseJson.data._id || responseJson.data.userId)) {
//           setRecordId(responseJson.data._id || responseJson.data.userId);
//         }

//       } else {
//         // For existing records, we don't need to call save-step API
//         // Just update the local state and proceed to next step
//         console.log('📝 Existing record - proceeding to next step without API call');
//       }

//       // Update user role when registration is complete
//       if (currentStep === 7) {
//         const chosenRole = merged.role || '';
//         if (userId && chosenRole) {
//           await updateUserRoleAndComplete(userId, chosenRole);
//         }
//       }

//       setFormData(prev => ({ ...prev, ...values }));
//       setDisabledSteps(prev => ({ ...prev, [currentStep]: true }));

//       if (currentStep < 7) {
//         setCurrentStep(prev => prev + 1);
//       } else {
//         // Final step - mark as submitted
//         setIsSubmitted(true);
        
//         // Final safety check to ensure user role is updated
//         const chosenRole = merged.role || '';
//         if (userId && chosenRole) {
//           await updateUserRoleAndComplete(userId, chosenRole);
//         }

//         // Clear franchise context after successful registration
//         if (franchiseCreatedBy) {
//           localStorage.removeItem('franchise_created_by');
//         }
//       }
//     } catch (error) {
//       console.error('❌ Submission error:', error);
//       alert(error.message || 'Failed to save step. Please check your API endpoints.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Render step content
//   const renderStepContent = (step, disabled) => {
//     switch (step) {
//       case 1:
//         return (
//           <SectionWrapper title="Business Information" icon={<BusinessIcon />}>
//             {/* User Info Banner */}
//             {userContext.userId && (
//               <div className="lg:col-span-2 bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
//                 <div className="flex items-center">
//                   <div className="bg-blue-100 p-2 rounded-lg mr-3">
//                     <UserIcon />
//                   </div>
//                   <div>
//                     <p className="text-blue-800 font-semibold">Welcome! {userContext.userEmail}</p>
//                     <p className="text-blue-600 text-sm">Your User ID: {userContext.userId}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Franchise Context Banner */}
//             {franchiseCreatedBy && (
//               <div className="lg:col-span-2 bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
//                 <div className="flex items-center">
//                   <div className="bg-green-100 p-2 rounded-lg mr-3">
//                     <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-green-800 font-semibold">Partner Registration</p>
//                     <p className="text-green-600 text-sm">This partner account will be linked to franchise</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Role Selection - Auto-set for franchise-created partners */}
//             <SelectField
//               label="Register As"
//               name="role"
//               options={[
//                 { value: 'franchise', label: 'Franchise' },
//                 { value: 'partner', label: 'Partner' }
//               ]}
//               required
//               disabled={franchiseCreatedBy ? true : disabled}
//             />

//             {/* Auto-filled Franchise ID for franchise-created partners */}
//             {franchiseCreatedBy && (
//               <div className="lg:col-span-2">
//                 <InputField 
//                   label="Franchise ID" 
//                   name="franchiseId" 
//                   required 
//                   disabled={true}
//                   value={franchiseCreatedBy}
//                 />
//                 <p className="text-green-600 text-sm mt-2">
//                   ✓ This partner will be automatically linked to the franchise
//                 </p>
//               </div>
//             )}

//             {/* Manual Franchise ID field for regular partner registration */}
//             <Field name="role">
//               {({ field }) => (
//                 !franchiseCreatedBy && field.value === 'partner' && (
//                   <div className="lg:col-span-2">
//                     <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-4">
//                       <h4 className="font-bold text-yellow-800 mb-2">Partner Registration</h4>
//                       <p className="text-yellow-700 text-sm">
//                         You need a Franchise ID to register as a partner. Get this from your franchise owner.
//                       </p>
//                     </div>
                    
//                     <InputField 
//                       label="Franchise ID" 
//                       name="franchiseId" 
//                       required 
//                       disabled={disabled} 
//                       placeholder="Enter Franchise ID"
//                     />
//                   </div>
//                 )
//               )}
//             </Field>

//             {/* Regular Business Fields */}
//             <InputField 
//               label="Business Name" 
//               name="businessName" 
//               required 
//               disabled={disabled} 
//             />
//             <SelectField 
//               label="Business Type" 
//               name="businessType" 
//               options={['Retail', 'Service', 'Manufacturing', 'Technology', 'Consulting']} 
//               required 
//               disabled={disabled} 
//             />
//             <div className="lg:col-span-2">
//               <InputField 
//                 label="Email Address" 
//                 name="email" 
//                 type="email" 
//                 required 
//                 disabled={true}
//               />
//             </div>
//             <InputField 
//               label="Phone Number" 
//               name="phone" 
//               type="tel" 
//               required 
//               disabled={disabled} 
//             />
//           </SectionWrapper>
//         );

//       case 2:
//         return (
//           <>
//             <SectionWrapper title="Personal Details" icon={<UserIcon />}>
//               <SelectField label="Salutation" name="salutation" options={['Mr', 'Mrs', 'Ms', 'Dr']} required disabled={disabled} />
//               <InputField label="First Name" name="firstName" required disabled={disabled} />
//               <InputField label="Middle Name" name="middleName" disabled={disabled} />
//               <InputField label="Last Name" name="lastName" required disabled={disabled} />
//               <InputField label="Date of Birth" name="dateOfBirth" type="date" required disabled={disabled} />
//               <SelectField label="Gender" name="gender" options={['Male', 'Female', 'Other']} required disabled={disabled} />
//               <InputField label="Personal Contact" name="personalContact" required disabled={disabled} />
//               <InputField label="Personal Email" name="personalEmail" type="email" required disabled={disabled} />
//               <InputField label="Aadhar Number" name="aadharNumber" required disabled={disabled} />
//               <InputField label="PAN Number" name="panNumber" required disabled={disabled} />
//             </SectionWrapper>

//             <SectionWrapper title="Address Information" icon={<BusinessIcon />}>
//               <InputField label="Address Line 1" name="addressLine1" required disabled={disabled} />
//               <InputField label="Address Line 2" name="addressLine2" disabled={disabled} />
//               <InputField label="City" name="city" required disabled={disabled} />
//               <InputField label="State" name="state" required disabled={disabled} />
//               <InputField label="Pincode" name="pincode" required disabled={disabled} />
//               <InputField label="Country" name="country" disabled={disabled} />
//             </SectionWrapper>
//           </>
//         );

//       case 3:
//         return (
//           <SectionWrapper title="Terms & Conditions" icon={<ShieldIcon />}>
//             <div className="lg:col-span-2 space-y-4">
//               <div className="bg-gray-50 rounded-xl p-6 max-h-80 overflow-y-auto">
//                 <h4 className="font-bold text-lg mb-4 text-gray-800">Digital Card Partner Agreement</h4>
//                 <div className="space-y-3 text-gray-600">
//                   <p>1. Partner agrees to comply with all company policies and procedures.</p>
//                   <p>2. Partner shall maintain the highest standards of service quality.</p>
//                   <p>3. All transactions must be recorded accurately in the system.</p>
//                   <p>4. Partner is responsible for maintaining customer data confidentiality.</p>
//                   <p>5. Company reserves the right to terminate partnership for violations.</p>
//                   <p>6. Partner fees are non-refundable once paid.</p>
//                   <p>7. All disputes shall be subject to jurisdiction of local courts.</p>
//                 </div>
                
//                 <h4 className="font-bold text-lg mt-6 mb-4 text-gray-800">Privacy Policy</h4>
//                 <p className="text-gray-600">
//                   We collect and process your personal information to provide our services. 
//                   Your data is protected and will not be shared with third parties without consent.
//                 </p>
//               </div>

//               <CheckboxField 
//                 label="I accept the Terms and Conditions" 
//                 name="acceptTerms" 
//                 required 
//                 disabled={disabled} 
//                 description="You must accept the terms and conditions to proceed"
//               />
//               <CheckboxField 
//                 label="I accept the Privacy Policy" 
//                 name="acceptPrivacyPolicy" 
//                 required 
//                 disabled={disabled} 
//                 description="We respect your privacy and protect your personal data"
//               />
//               <CheckboxField 
//                 label="I agree to receive communication via email and SMS" 
//                 name="acceptCommunication" 
//                 disabled={disabled} 
//                 description="Stay updated with important notifications and offers"
//               />
//             </div>
//           </SectionWrapper>
//         );

//       case 4:
//         return (
//           <SectionWrapper title="KYC Documents Upload" icon={<DocumentIcon />}>
//             <FileUploadField label="Aadhar Card Front" name="aadharFront" accept=".jpg,.jpeg,.png,.pdf" required disabled={disabled} />
//             <FileUploadField label="Aadhar Card Back" name="aadharBack" accept=".jpg,.jpeg,.png,.pdf" required disabled={disabled} />
//             <FileUploadField label="PAN Card" name="panCard" accept=".jpg,.jpeg,.png,.pdf" required disabled={disabled} />
//             <FileUploadField label="Business Proof (Optional)" name="businessProof" accept=".jpg,.jpeg,.png,.pdf" disabled={disabled} />
//             <div className="lg:col-span-2 bg-blue-50 border border-blue-200 rounded-xl p-4">
//               <p className="text-sm text-blue-700 font-medium">
//                 <strong>📝 Note:</strong> Upload clear images/PDFs of your documents. 
//                 Maximum file size: 2MB per document. Supported formats: JPG, PNG, PDF.
//               </p>
//             </div>
//           </SectionWrapper>
//         );

//       case 5:
//         return (
//           <SectionWrapper title="Payment Details" icon={<PaymentIcon />}>
//             <div className="lg:col-span-2 text-center py-8">
//               <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 inline-block max-w-md">
//                 <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <PaymentIcon />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Registration Fee</h3>
//                 <p className="text-3xl font-bold text-blue-600 mb-2">₹4,999</p>
//                 <p className="text-gray-600 mb-6">One-time registration fee</p>
//                 <button
//                   type="button"
//                   onClick={() => setCurrentStep(prev => prev + 1)}
//                   className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-semibold text-lg shadow-lg transition-all duration-200 transform hover:scale-105"
//                 >
//                   Proceed to Payment
//                 </button>
//               </div>
//             </div>
//           </SectionWrapper>
//         );

//       case 6:
//         return (
//           <SectionWrapper title="Partner Agreement" icon={<AgreementIcon />}>
//             <div className="lg:col-span-2 text-center">
//               <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 max-w-2xl mx-auto">
//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <AgreementIcon />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Sign & Upload Agreement</h3>
//                 <p className="text-gray-600 mb-6 text-lg">
//                   Please download the agreement, print it, sign it, and upload the signed copy.
//                 </p>
                
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
//                   <button
//                     type="button"
//                     className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-all duration-200 flex items-center justify-center"
//                   >
//                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                     Download Agreement
//                   </button>
//                   <button
//                     type="button"
//                     className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 font-semibold transition-all duration-200 flex items-center justify-center"
//                   >
//                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
//                     </svg>
//                     Print Document
//                   </button>
//                 </div>

//                 <FileUploadField 
//                   label="Upload Signed Agreement" 
//                   name="signedAgreement" 
//                   accept=".pdf,.jpg,.jpeg,.png" 
//                   required 
//                   disabled={disabled} 
//                 />
//               </div>
//             </div>
//           </SectionWrapper>
//         );

//       case 7:
//         return (
//           <SectionWrapper title="Registration Complete" icon={<SuccessIcon />}>
//             <div className="lg:col-span-2 text-center py-8">
//               <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-12 max-w-2xl mx-auto">
//                 <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
//                   <SuccessIcon />
//                 </div>
//                 <h3 className="text-3xl font-bold text-gray-800 mb-4">🎉 Welcome Aboard!</h3>
//                 <p className="text-gray-600 mb-8 text-lg">
//                   Your {formData.role} account has been created successfully. 
//                   {franchiseCreatedBy && ' You are now linked to your franchise.'}
//                 </p>
                
//                 <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
//                   <h4 className="font-bold text-xl mb-6 text-gray-800 text-center">Your Account Details</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
//                     <div>
//                       <label className="text-sm font-semibold text-gray-600">User ID:</label>
//                       <p className="font-mono bg-gray-100 p-3 rounded-lg font-bold text-gray-800">{userContext.userId}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-semibold text-gray-600">Role:</label>
//                       <p className="font-mono bg-gray-100 p-3 rounded-lg font-bold text-gray-800 capitalize">{formData.role}</p>
//                     </div>
//                     {formData.role === 'partner' && formData.franchiseId && (
//                       <div className="md:col-span-2">
//                         <label className="text-sm font-semibold text-gray-600">Franchise ID:</label>
//                         <p className="font-mono bg-gray-100 p-3 rounded-lg font-bold text-gray-800">{formData.franchiseId}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
                
//                 <button
//                   type="submit"
//                   className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold text-lg shadow-lg transition-all duration-200 transform hover:scale-105"
//                 >
//                   Access {formData.role === 'franchise' ? 'Franchise' : 'Partner'} Dashboard
//                 </button>
//               </div>
//             </div>
//           </SectionWrapper>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
//           {/* Header Section */}
//           <div className="text-center pt-8 px-8">
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
//               {franchiseCreatedBy ? 'Partner Registration' : 'Franchise/Partner Registration'}
//             </h1>
//             <p className="text-xl text-gray-600 mb-6">
//               {franchiseCreatedBy 
//                 ? 'Complete your partner profile to join the franchise network' 
//                 : 'Join our network of successful partners and grow your business with us'
//               }
//             </p>
//           </div>

//           {/* Progress Section */}
//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-8">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <h2 className="text-2xl font-bold">Complete Your Registration</h2>
//                 <p className="text-blue-100 mt-2">Step {currentStep} of {steps.length}</p>
//               </div>
//               <div className="text-right">
//                 <div className="text-3xl font-bold">{currentStep}</div>
//                 <div className="text-blue-100 text-sm">Current Step</div>
//               </div>
//             </div>
//             <div className="w-full bg-blue-500 rounded-full h-2">
//               <div 
//                 className="bg-white rounded-full h-2 transition-all duration-500" 
//                 style={{ width: `${(currentStep / steps.length) * 100}%` }}
//               ></div>
//             </div>
//           </div>

//           {/* Scrollable Form Content */}
//           <div className="p-8 max-h-[65vh] overflow-y-auto custom-scrollbar">
//             <StepIndicator currentStep={currentStep} steps={steps} />

//             {!isSubmitted && (
//               <Formik
//                 initialValues={{ ...initialValues, ...formData }}
//                 validationSchema={getValidationSchema(currentStep)}
//                 enableReinitialize
//                 onSubmit={handleStepSubmit}
//               >
//                 {({ isSubmitting, values }) => (
//                   <Form>
//                     {renderStepContent(currentStep, !!disabledSteps[currentStep])}

//                     {/* Navigation Buttons */}
//                     <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
//                       {currentStep > 1 ? (
//                         <button
//                           type="button"
//                           onClick={() => setCurrentStep(prev => prev - 1)}
//                           className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all duration-200 flex items-center"
//                         >
//                           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                           </svg>
//                           Previous
//                         </button>
//                       ) : <div />}

//                       <div className="flex items-center gap-4">
//                         {disabledSteps[currentStep] && (
//                           <button
//                             type="button"
//                             onClick={() => setDisabledSteps(prev => ({ ...prev, [currentStep]: false }))}
//                             className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 font-semibold transition-all duration-200 flex items-center"
//                           >
//                             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                             </svg>
//                             Edit Step
//                           </button>
//                         )}

//                         <button
//                           type="submit"
//                           disabled={isSubmitting || !!disabledSteps[currentStep]}
//                           className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center ${
//                             isSubmitting || disabledSteps[currentStep]
//                               ? 'bg-gray-400 cursor-not-allowed text-white'
//                               : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
//                           }`}
//                         >
//                           {isSubmitting ? (
//                             <>
//                               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                               </svg>
//                               Processing...
//                             </>
//                           ) : (
//                             <>
//                               {currentStep === steps.length ? 'Complete Registration' : 'Continue'}
//                               <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                               </svg>
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </Form>
//                 )}
//               </Formik>
//             )}

//             {isSubmitted && (
//               <div className="text-center py-16">
//                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-12 max-w-2xl mx-auto">
//                   <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <SuccessIcon />
//                   </div>
//                   <h3 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h3>
//                   <p className="text-gray-600 mb-8 text-lg">
//                     Thank you for completing your registration. Your account is now being processed.
//                     {franchiseCreatedBy && ' You are now linked to your franchise.'}
//                   </p>
//                   <button
//                     onClick={() => window.location.href = '/signin/franchise'}
//                     className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold transition-all duration-200"
//                   >
//                     Go to Login
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-8 text-gray-500 text-sm">
//           <p>Need help? Contact our support team at support@digitalcard.com or call +91 9480 65 1581</p>
//         </div>
//       </div>

//       {/* Custom Scrollbar Styles */}
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f1f5f9;
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #cbd5e1;
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #94a3b8;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default RegistrationPage;





// =============================================================================================================================


// import React, { useState, useEffect } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useLocation } from "react-router-dom";

// // -------------------- FIXED validation schemas --------------------
// const step1Validation = Yup.object({
//   businessName: Yup.string().required('Business name is required'),
//   businessType: Yup.string().required('Business type is required'),
//   email: Yup.string().email('Invalid email address').required('Email is required'),
//   phone: Yup.string()
//     .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
//     .required('Phone number is required'),
//   role: Yup.string().required('Please select franchise or partner'),
//   franchiseId: Yup.string().when('role', {
//     is: 'partner',
//     then: (schema) => schema.required('Franchise ID is required for partners'),
//     otherwise: (schema) => schema
//   })
// });

// const step2Validation = Yup.object({
//   salutation: Yup.string().required('Salutation is required'),
//   firstName: Yup.string().required('First name is required'),
//   middleName: Yup.string(),
//   lastName: Yup.string().required('Last name is required'),
//   dateOfBirth: Yup.date().required('Date of birth is required'),
//   gender: Yup.string().required('Gender is required'),
//   personalContact: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Personal contact is required'),
//   personalEmail: Yup.string().email('Invalid email address').required('Email is required'),
//   aadharNumber: Yup.string().matches(/^[0-9]{12}$/, 'Aadhar must be 12 digits').required('Aadhar number is required'),
//   panNumber: Yup.string().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number').required('PAN number is required'),
//   addressLine1: Yup.string().required('Address line 1 is required'),
//   city: Yup.string().required('City is required'),
//   state: Yup.string().required('State is required'),
//   pincode: Yup.string().matches(/^[0-9]{6}$/, 'Pincode must be 6 digits').required('Pincode is required'),
// });

// const step3Validation = Yup.object({
//   acceptTerms: Yup.boolean().oneOf([true], 'You must accept terms and conditions'),
//   acceptPrivacyPolicy: Yup.boolean().oneOf([true], 'You must accept privacy policy'),
// });

// const step4Validation = Yup.object({
//   aadharFront: Yup.mixed().required('Aadhar front is required'),
//   aadharBack: Yup.mixed().required('Aadhar back is required'),
//   panCard: Yup.mixed().required('PAN card is required'),
//   businessProof: Yup.mixed(),
// });

// const step6Validation = Yup.object({
//   signedAgreement: Yup.mixed().required('Signed agreement is required'),
// });

// // -------------------- UI Field components --------------------
// const InputField = ({ label, name, type = 'text', required = false, disabled = false, icon = null, ...props }) => (
//   <div className="mb-6">
//     <label htmlFor={name} className={`block text-sm font-semibold mb-3 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
//       {label} {required && <span className="text-red-500 ml-1">*</span>}
//     </label>

//     <Field name={name}>
//       {({ field, form }) => (
//         disabled ? (
//           <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-600 font-medium">
//             {form.values[name] || <span className="text-gray-400 italic">Not provided</span>}
//           </div>
//         ) : (
//           <div className="relative">
//             {icon && (
//               <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                 {icon}
//               </div>
//             )}
//             <input
//               {...field}
//               {...props}
//               id={name}
//               type={type}
//               className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 ${
//                 icon ? 'pl-10' : ''
//               } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-gray-300'}`}
//               disabled={disabled}
//             />
//           </div>
//         )
//       )}
//     </Field>

//     <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
//   </div>
// );

// const SelectField = ({ label, name, options, required = false, disabled = false, icon = null }) => (
//   <div className="mb-6">
//     <label htmlFor={name} className={`block text-sm font-semibold mb-3 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
//       {label} {required && <span className="text-red-500 ml-1">*</span>}
//     </label>

//     <Field name={name}>
//       {({ field, form }) => (
//         disabled ? (
//           <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-600 font-medium">
//             {form.values[name] || <span className="text-gray-400 italic">Not selected</span>}
//           </div>
//         ) : (
//           <div className="relative">
//             {icon && (
//               <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                 {icon}
//               </div>
//             )}
//             <select
//               {...field}
//               id={name}
//               className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 appearance-none bg-white hover:border-gray-300 ${
//                 icon ? 'pl-10' : ''
//               }`}
//             >
//               <option value="">Select {label}</option>
//               {options.map(option => (
//                 <option key={option.value || option} value={option.value || option}>
//                   {option.label || option}
//                 </option>
//               ))}
//             </select>
//             <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </div>
//           </div>
//         )
//       )}
//     </Field>

//     <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
//   </div>
// );

// const CheckboxField = ({ label, name, required = false, disabled = false, description = null }) => (
//   <div className="mb-6">
//     <Field name={name}>
//       {({ field, form }) => (
//         <div className={`flex items-start space-x-3 p-4 rounded-xl border-2 ${
//           disabled ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-gray-300'
//         } transition-all duration-200`}>
//           {disabled ? (
//             <div className="flex items-center">
//               <div className={`w-6 h-6 rounded-lg border-2 ${form.values[name] ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'}`} />
//             </div>
//           ) : (
//             <input
//               {...field}
//               id={name}
//               type="checkbox"
//               checked={!!form.values[name]}
//               className="w-6 h-6 text-blue-600 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1"
//             />
//           )}
//           <div className="flex-1">
//             <label htmlFor={name} className={`block text-sm font-semibold ${disabled ? 'text-gray-500' : 'text-gray-700'} cursor-pointer`}>
//               {label} {required && <span className="text-red-500 ml-1">*</span>}
//             </label>
//             {description && (
//               <p className="text-sm text-gray-500 mt-1">{description}</p>
//             )}
//           </div>
//         </div>
//       )}
//     </Field>
//     <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
//   </div>
// );

// // ✅ FIXED FileUploadField - Properly handles File objects
// const FileUploadField = ({ label, name, accept, required = false, disabled = false }) => (
//   <div className="mb-6">
//     <label className={`block text-sm font-semibold mb-3 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
//       {label} {required && <span className="text-red-500 ml-1">*</span>}
//     </label>

//     <Field name={name}>
//       {({ field, form }) => (
//         disabled ? (
//           <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-600 font-medium">
//             {form.values[name] ? '✓ Uploaded' : <span className="text-gray-400 italic">Not uploaded</span>}
//           </div>
//         ) : (
//           <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
//             <input
//               id={name}
//               name={name}
//               type="file"
//               accept={accept}
//               onChange={(e) => {
//                 const file = e.currentTarget.files[0];
//                 if (file) {
//                   // ✅ Store the actual File object
//                   form.setFieldValue(name, file);
                  
//                   // Validate file size (2MB)
//                   if (file.size > 2 * 1024 * 1024) {
//                     alert('File size must be less than 2MB');
//                     form.setFieldValue(name, null);
//                     e.target.value = '';
//                     return;
//                   }
                  
//                   console.log(`File selected for ${name}:`, file.name, file);
//                 } else {
//                   form.setFieldValue(name, null);
//                 }
//               }}
//               className="hidden"
//             />
//             <label htmlFor={name} className="cursor-pointer">
//               <div className="flex flex-col items-center justify-center">
//                 <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                 </svg>
//                 <span className="text-gray-600 font-medium">Click to upload {label.toLowerCase()}</span>
//                 <span className="text-sm text-gray-500 mt-1">Supported formats: JPG, PNG, PDF (Max 2MB)</span>
//                 {form.values[name] && (
//                   <span className="text-green-600 text-sm mt-2">✓ {form.values[name].name}</span>
//                 )}
//               </div>
//             </label>
//           </div>
//         )
//       )}
//     </Field>

//     <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
//   </div>
// );

// // Section and StepIndicator components
// const SectionWrapper = ({ title, children, icon = null }) => (
//   <div className="mb-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
//     <div className="flex items-center mb-6">
//       {icon && <div className="mr-3 text-blue-600">{icon}</div>}
//       <h3 className="text-xl font-bold text-gray-800">{title}</h3>
//     </div>
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{children}</div>
//   </div>
// );

// const StepIndicator = ({ currentStep, steps }) => (
//   <div className="flex justify-center mb-8">
//     <div className="flex items-center space-x-8">
//       {steps.map((step, index) => (
//         <div key={step.number} className="flex flex-col items-center">
//           <div className="flex items-center">
//             <div
//               className={`flex items-center justify-center w-12 h-12 rounded-full border-4 font-bold text-lg transition-all duration-300 ${
//                 currentStep >= step.number 
//                   ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-100 text-white shadow-lg scale-110' 
//                   : 'border-gray-200 bg-white text-gray-400'
//               } ${currentStep === step.number ? 'ring-4 ring-blue-200' : ''}`}
//             >
//               {currentStep > step.number ? (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                 </svg>
//               ) : (
//                 step.number
//               )}
//             </div>
//             {index < steps.length - 1 && (
//               <div className={`w-16 h-1 mx-4 transition-all duration-300 ${
//                 currentStep > step.number ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'
//               }`} />
//             )}
//           </div>
//           <span className={`text-sm font-semibold mt-3 transition-all duration-300 ${
//             currentStep >= step.number ? 'text-gray-800' : 'text-gray-400'
//           }`}>
//             {step.title}
//           </span>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// // Icons
// const BusinessIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//   </svg>
// );

// const UserIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//   </svg>
// );

// const DocumentIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//   </svg>
// );

// const ShieldIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//   </svg>
// );

// const PaymentIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
//   </svg>
// );

// const AgreementIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//   </svg>
// );

// const SuccessIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );

// // -------------------- Main component --------------------
// const RegistrationPage = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({});
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [disabledSteps, setDisabledSteps] = useState({});
//   const [franchiseExists, setFranchiseExists] = useState(false);
//   const [recordId, setRecordId] = useState(null);
//   const [userContext, setUserContext] = useState({
//     userId: null,
//     userEmail: null,
//     isNewUser: false
//   });
//   const [franchiseCreatedBy, setFranchiseCreatedBy] = useState(null);

//   const location = useLocation();

//   const steps = [
//     { number: 1, title: 'Business Info' },
//     { number: 2, title: 'Personal Details' },
//     { number: 3, title: 'Terms & Conditions' },
//     { number: 4, title: 'KYC Documents' },
//     { number: 5, title: 'Payment' },
//     { number: 6, title: 'Agreement' },
//     { number: 7, title: 'Complete' },
//   ];

//   const initialValues = {
//     businessName: '', businessType: '', email: '', phone: '',
//     salutation: '', firstName: '', middleName: '', lastName: '', dateOfBirth: '', gender: '', personalContact: '', personalEmail: '',
//     aadharNumber: '', panNumber: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', country: 'India',
//     acceptTerms: false, acceptPrivacyPolicy: false, acceptCommunication: false,
//     // ✅ Initialize file fields as null
//     aadharFront: null, aadharBack: null, panCard: null, businessProof: null,
//     signedAgreement: null,
//     role: '',
//     franchiseId: '',
//   };

//   // ✅ FIXED: Proper validation schema function
//   const getValidationSchema = (step) => {
//     switch (step) {
//       case 1: return step1Validation;
//       case 2: return step2Validation;
//       case 3: return step3Validation;
//       case 4: return step4Validation;
//       case 6: return step6Validation;
//       default: return Yup.object({});
//     }
//   };

//   // ✅ Check if franchise is creating a partner
//   useEffect(() => {
//     const franchiseId = localStorage.getItem('franchise_created_by');
//     if (franchiseId) {
//       setFranchiseCreatedBy(franchiseId);
//       // Auto-set role to partner and franchiseId
//       setFormData(prev => ({ 
//         ...prev, 
//         role: 'partner', 
//         franchiseId: franchiseId 
//       }));
//     }
//   }, []);

//   // Update user role and registration status
//   const updateUserRoleAndComplete = async (userId, role) => {
//     try {
//       if (!userId) {
//         console.error('No user ID found');
//         return false;
//       }

//       console.log('Updating user role:', { userId, role });
      
//       const response = await fetch(`http://localhost:3000/api/v1/user/${userId}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           role, 
//           registrationComplete: true 
//         }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log('User role updated successfully:', result);
//         localStorage.setItem('user_role', role);
//         localStorage.setItem('registration_complete', 'true');
//         return true;
//       } else {
//         const errorText = await response.text();
//         console.error('Failed to update user role:', errorText);
//         return false;
//       }
//     } catch (err) {
//       console.error('Failed to update user role:', err);
//       return false;
//     }
//   };

//   // ✅ FIXED: Save step data using FormData for file uploads with ROLE validation
//   const saveStepData = async (values, stepNumber) => {
//     try {
//       const userId = userContext.userId;
//       const userEmail = userContext.userEmail;

//       if (!userId) {
//         throw new Error('User session expired. Please sign up again.');
//       }

//       console.log(`💾 Saving step ${stepNumber} data for user:`, userId);

//       const merged = { 
//         ...formData, 
//         ...values,
//         userId: userId,
//         userEmail: userEmail,
//         stepNumber: stepNumber,
//         registrationStep: stepNumber
//       };

//       // ✅ CRITICAL FIX: Ensure role is always set
//       if (!merged.role) {
//         merged.role = values.role || formData.role || (franchiseCreatedBy ? 'partner' : 'franchise');
//       }

//       if (!merged.role) {
//         throw new Error('Role is required. Please select Franchise or Partner in step 1.');
//       }

//       console.log('🔑 Role being saved:', merged.role);

//       // ✅ Create FormData object for file uploads
//       const formDataToSend = new FormData();
      
//       // ✅ Add all regular form fields
//       Object.keys(merged).forEach(key => {
//         if (merged[key] !== undefined && merged[key] !== null && merged[key] !== '') {
//           // Skip file objects - they'll be added separately
//           if (!(merged[key] instanceof File)) {
//             formDataToSend.append(key, String(merged[key]));
//           }
//         }
//       });

//       // ✅ Add file fields separately
//       const fileFields = ['aadharFront', 'aadharBack', 'panCard', 'businessProof', 'signedAgreement'];
//       fileFields.forEach(fieldName => {
//         if (merged[fieldName] instanceof File) {
//           formDataToSend.append(fieldName, merged[fieldName]);
//           console.log(`📁 Added file: ${fieldName} - ${merged[fieldName].name}`);
//         }
//       });

//       // ✅ Log what we're sending (check if role is included)
//       console.log('📤 FormData entries (checking for role):');
//       let hasRole = false;
//       for (let [key, value] of formDataToSend.entries()) {
//         if (key === 'role') {
//           hasRole = true;
//           console.log(`  ✅ ${key}: ${value}`);
//         } else if (value instanceof File) {
//           console.log(`  ${key}: [File] ${value.name}`);
//         } else {
//           console.log(`  ${key}: ${value}`);
//         }
//       }

//       if (!hasRole) {
//         console.error('❌ ROLE IS MISSING IN FORM DATA!');
//         throw new Error('Role is required but not found in form data');
//       }

//       // ✅ Use the correct endpoint that has Multer middleware
//       const apiUrl = 'http://localhost:3000/api/v1/franchise-partner/save-step';

//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         body: formDataToSend,
//       });

//       const responseText = await response.text();
//       console.log('📥 Raw response:', responseText);
      
//       let responseJson;
//       try {
//         responseJson = JSON.parse(responseText);
//       } catch (e) {
//         console.error('❌ Failed to parse response as JSON:', responseText);
        
//         // Check if it's an HTML error
//         if (responseText.includes('<!DOCTYPE html>') || responseText.includes('<html>')) {
//           console.error('❌ Server returned HTML error page');
//           const errorMatch = responseText.match(/<pre>(.*?)<\/pre>/);
//           const errorMessage = errorMatch ? errorMatch[1] : 'Server endpoint error';
//           throw new Error(errorMessage);
//         }
        
//         throw new Error('Invalid response from server - not valid JSON');
//       }

//       if (!response.ok) {
//         throw new Error(responseJson.message || responseJson.error || `Failed to save step ${stepNumber}`);
//       }

//       if (!responseJson.success) {
//         throw new Error(responseJson.message || 'Server returned unsuccessful response');
//       }

//       // Update franchise exists flag and record ID
//       if (!franchiseExists) {
//         setFranchiseExists(true);
//       }
//       if (responseJson.data && (responseJson.data._id || responseJson.data.userId)) {
//         setRecordId(responseJson.data._id || responseJson.data.userId);
//       }

//       console.log(`✅ Step ${stepNumber} data saved successfully with role: ${merged.role}`);
//       return true;

//     } catch (error) {
//       console.error(`❌ Error saving step ${stepNumber} data:`, error);
//       throw error;
//     }
//   };

//   // Load existing data
//   useEffect(() => {
//     const loadExisting = async () => {
//       try {
//         const userId = localStorage.getItem('user_id');
//         const userEmail = localStorage.getItem('user_email');

//         console.log('🔍 Loading user context:', { userId, userEmail });

//         if (!userId) {
//           console.warn('⚠ No user ID found in localStorage');
//           return;
//         }

//         setUserContext({
//           userId,
//           userEmail,
//           isNewUser: true
//         });

//         setFormData(prev => ({ 
//           ...prev, 
//           email: userEmail || prev.email 
//         }));

//         // ✅ USE CORRECT ENDPOINT: Get franchise by userId
//         const res = await fetch(`http://localhost:3000/api/v1/franchise-partner/franchise/${userId}`);
//         if (res.ok) {
//           const body = await res.json();
//           if (body && body.success && body.data) {
//             const record = body.data;
//             console.log('✅ Existing record found:', record);
            
//             // Extract data from franchiseDetails for franchises
//             const franchiseDetails = record.franchiseDetails || {};
            
//             const restored = {
//               businessName: franchiseDetails.businessName || record.businessName || '',
//               businessType: franchiseDetails.businessType || record.businessType || '',
//               email: franchiseDetails.email || record.email || (userEmail || ''),
//               phone: franchiseDetails.phone || record.phone || '',
//               role: record.role || '',
//               franchiseId: record.franchiseId || '',
//               salutation: franchiseDetails.salutation || '',
//               firstName: franchiseDetails.firstName || '',
//               middleName: franchiseDetails.middleName || '',
//               lastName: franchiseDetails.lastName || '',
//               dateOfBirth: franchiseDetails.dateOfBirth ? franchiseDetails.dateOfBirth.split('T')[0] : '',
//               gender: franchiseDetails.gender || '',
//               personalContact: franchiseDetails.personalContact || '',
//               personalEmail: franchiseDetails.personalEmail || '',
//               aadharNumber: franchiseDetails.aadharNumber || '',
//               panNumber: franchiseDetails.panNumber || '',
//               addressLine1: franchiseDetails.addressLine1 || '',
//               addressLine2: franchiseDetails.addressLine2 || '',
//               city: franchiseDetails.city || '',
//               state: franchiseDetails.state || '',
//               pincode: franchiseDetails.pincode || '',
//               country: franchiseDetails.country || 'India',
//               acceptTerms: !!franchiseDetails.acceptTerms,
//               acceptPrivacyPolicy: !!franchiseDetails.acceptPrivacyPolicy,
//               acceptCommunication: !!franchiseDetails.acceptCommunication,
//               paymentStatus: franchiseDetails.paymentStatus || 'pending',
//               // File fields - we only store filenames from backend
//               aadharFront: franchiseDetails.aadharFront || null,
//               aadharBack: franchiseDetails.aadharBack || null,
//               panCard: franchiseDetails.panCard || null,
//               businessProof: franchiseDetails.businessProof || null,
//               signedAgreement: franchiseDetails.signedAgreement || null,
//             };

//             setFormData(restored);
//             setFranchiseExists(true);
//             setRecordId(record._id || null);
            
//             // Set current step based on registration progress
//             const registrationStep = franchiseDetails.registrationStep || record.registrationStep || 1;
//             const nextStep = registrationStep <= 7 ? registrationStep : 1;
//             setCurrentStep(nextStep);
            
//             // Mark previous steps as completed
//             const disabledMap = {};
//             for (let i = 1; i < nextStep; i++) disabledMap[i] = true;
//             setDisabledSteps(disabledMap);
//           } else {
//             console.log('🆕 No existing record - starting fresh');
//             setFranchiseExists(false);
//           }
//         } else {
//           console.log('🆕 No existing record - API error');
//           setFranchiseExists(false);
//         }
//       } catch (err) {
//         console.error('❌ Error loading existing registration', err);
//         setFranchiseExists(false);
//       }
//     };

//     loadExisting();
//   }, []);

//   // ✅ FIXED: Handle step submission with FormData
//   const handleStepSubmit = async (values, { setSubmitting }) => {
//     try {
//       console.log(`🚀 Processing step ${currentStep} submission`);

//       // Save current step data to API using FormData
//       await saveStepData(values, currentStep);

//       // Update local state (but exclude File objects from formData state)
//       const valuesWithoutFiles = { ...values };
//       const fileFields = ['aadharFront', 'aadharBack', 'panCard', 'businessProof', 'signedAgreement'];
//       fileFields.forEach(field => {
//         if (valuesWithoutFiles[field] instanceof File) {
//           // Keep filename for display, but don't store File object in state
//           valuesWithoutFiles[field] = valuesWithoutFiles[field].name;
//         }
//       });

//       setFormData(prev => ({ ...prev, ...valuesWithoutFiles }));
//       setDisabledSteps(prev => ({ ...prev, [currentStep]: true }));

//       // Move to next step or complete registration
//       if (currentStep < 7) {
//         setCurrentStep(prev => prev + 1);
//       } else {
//         // Final step - mark as submitted
//         setIsSubmitted(true);
        
//         // Update user role when registration is complete
//         const userId = userContext.userId;
//         const chosenRole = values.role || formData.role || '';
//         if (userId && chosenRole) {
//           await updateUserRoleAndComplete(userId, chosenRole);
//         }

//         // Clear franchise context after successful registration
//         if (franchiseCreatedBy) {
//           localStorage.removeItem('franchise_created_by');
//         }

//         console.log('🎉 Registration completed successfully!');
//       }
//     } catch (error) {
//       console.error('❌ Submission error:', error);
      
//       // More user-friendly error message
//       if (error.message.includes('duplicate key') || error.message.includes('E11000')) {
//         alert('Your registration is already in progress. Please continue with the next step.');
//         // Force update the state to reflect that record exists
//         setFranchiseExists(true);
//         setDisabledSteps(prev => ({ ...prev, [currentStep]: true }));
//         if (currentStep < 7) {
//           setCurrentStep(prev => prev + 1);
//         }
//       } else {
//         alert(error.message || 'Failed to save step. Please try again.');
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Render step content
//   const renderStepContent = (step, disabled) => {
//     switch (step) {
//       case 1:
//         return (
//           <SectionWrapper title="Business Information" icon={<BusinessIcon />}>
//             {/* User Info Banner */}
//             {userContext.userId && (
//               <div className="lg:col-span-2 bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
//                 <div className="flex items-center">
//                   <div className="bg-blue-100 p-2 rounded-lg mr-3">
//                     <UserIcon />
//                   </div>
//                   <div>
//                     <p className="text-blue-800 font-semibold">Welcome! {userContext.userEmail}</p>
//                     <p className="text-blue-600 text-sm">Your User ID: {userContext.userId}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Franchise Context Banner */}
//             {franchiseCreatedBy && (
//               <div className="lg:col-span-2 bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
//                 <div className="flex items-center">
//                   <div className="bg-green-100 p-2 rounded-lg mr-3">
//                     <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-green-800 font-semibold">Partner Registration</p>
//                     <p className="text-green-600 text-sm">This partner account will be linked to franchise</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Role Selection - Auto-set for franchise-created partners */}
//             <SelectField
//               label="Register As"
//               name="role"
//               options={[
//                 { value: 'franchise', label: 'Franchise' },
//                 { value: 'partner', label: 'Partner' }
//               ]}
//               required
//               disabled={franchiseCreatedBy ? true : disabled}
//             />

//             {/* Auto-filled Franchise ID for franchise-created partners */}
//             {franchiseCreatedBy && (
//               <div className="lg:col-span-2">
//                 <InputField 
//                   label="Franchise ID" 
//                   name="franchiseId" 
//                   required 
//                   disabled={true}
//                   value={franchiseCreatedBy}
//                 />
//                 <p className="text-green-600 text-sm mt-2">
//                   ✓ This partner will be automatically linked to the franchise
//                 </p>
//               </div>
//             )}

//             {/* Manual Franchise ID field for regular partner registration */}
//             <Field name="role">
//               {({ field }) => (
//                 !franchiseCreatedBy && field.value === 'partner' && (
//                   <div className="lg:col-span-2">
//                     <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-4">
//                       <h4 className="font-bold text-yellow-800 mb-2">Partner Registration</h4>
//                       <p className="text-yellow-700 text-sm">
//                         You need a Franchise ID to register as a partner. Get this from your franchise owner.
//                       </p>
//                     </div>
                    
//                     <InputField 
//                       label="Franchise ID" 
//                       name="franchiseId" 
//                       required 
//                       disabled={disabled} 
//                       placeholder="Enter Franchise ID"
//                     />
//                   </div>
//                 )
//               )}
//             </Field>

//             {/* Regular Business Fields */}
//             <InputField 
//               label="Business Name" 
//               name="businessName" 
//               required 
//               disabled={disabled} 
//             />
//             <SelectField 
//               label="Business Type" 
//               name="businessType" 
//               options={['Retail', 'Service', 'Manufacturing', 'Technology', 'Consulting']} 
//               required 
//               disabled={disabled} 
//             />
//             <div className="lg:col-span-2">
//               <InputField 
//                 label="Email Address" 
//                 name="email" 
//                 type="email" 
//                 required 
//                 disabled={true}
//               />
//             </div>
//             <InputField 
//               label="Phone Number" 
//               name="phone" 
//               type="tel" 
//               required 
//               disabled={disabled} 
//             />
//           </SectionWrapper>
//         );

//       case 2:
//         return (
//           <>
//             <SectionWrapper title="Personal Details" icon={<UserIcon />}>
//               <SelectField label="Salutation" name="salutation" options={['Mr', 'Mrs', 'Ms', 'Dr']} required disabled={disabled} />
//               <InputField label="First Name" name="firstName" required disabled={disabled} />
//               <InputField label="Middle Name" name="middleName" disabled={disabled} />
//               <InputField label="Last Name" name="lastName" required disabled={disabled} />
//               <InputField label="Date of Birth" name="dateOfBirth" type="date" required disabled={disabled} />
//               <SelectField label="Gender" name="gender" options={['Male', 'Female', 'Other']} required disabled={disabled} />
//               <InputField label="Personal Contact" name="personalContact" required disabled={disabled} />
//               <InputField label="Personal Email" name="personalEmail" type="email" required disabled={disabled} />
//               <InputField label="Aadhar Number" name="aadharNumber" required disabled={disabled} />
//               <InputField label="PAN Number" name="panNumber" required disabled={disabled} />
//             </SectionWrapper>

//             <SectionWrapper title="Address Information" icon={<BusinessIcon />}>
//               <InputField label="Address Line 1" name="addressLine1" required disabled={disabled} />
//               <InputField label="Address Line 2" name="addressLine2" disabled={disabled} />
//               <InputField label="City" name="city" required disabled={disabled} />
//               <InputField label="State" name="state" required disabled={disabled} />
//               <InputField label="Pincode" name="pincode" required disabled={disabled} />
//               <InputField label="Country" name="country" disabled={disabled} />
//             </SectionWrapper>
//           </>
//         );

//       case 3:
//         return (
//           <SectionWrapper title="Terms & Conditions" icon={<ShieldIcon />}>
//             <div className="lg:col-span-2 space-y-4">
//               <div className="bg-gray-50 rounded-xl p-6 max-h-80 overflow-y-auto">
//                 <h4 className="font-bold text-lg mb-4 text-gray-800">Digital Card Partner Agreement</h4>
//                 <div className="space-y-3 text-gray-600">
//                   <p>1. Partner agrees to comply with all company policies and procedures.</p>
//                   <p>2. Partner shall maintain the highest standards of service quality.</p>
//                   <p>3. All transactions must be recorded accurately in the system.</p>
//                   <p>4. Partner is responsible for maintaining customer data confidentiality.</p>
//                   <p>5. Company reserves the right to terminate partnership for violations.</p>
//                   <p>6. Partner fees are non-refundable once paid.</p>
//                   <p>7. All disputes shall be subject to jurisdiction of local courts.</p>
//                 </div>
                
//                 <h4 className="font-bold text-lg mt-6 mb-4 text-gray-800">Privacy Policy</h4>
//                 <p className="text-gray-600">
//                   We collect and process your personal information to provide our services. 
//                   Your data is protected and will not be shared with third parties without consent.
//                 </p>
//               </div>

//               <CheckboxField 
//                 label="I accept the Terms and Conditions" 
//                 name="acceptTerms" 
//                 required 
//                 disabled={disabled} 
//                 description="You must accept the terms and conditions to proceed"
//               />
//               <CheckboxField 
//                 label="I accept the Privacy Policy" 
//                 name="acceptPrivacyPolicy" 
//                 required 
//                 disabled={disabled} 
//                 description="We respect your privacy and protect your personal data"
//               />
//               <CheckboxField 
//                 label="I agree to receive communication via email and SMS" 
//                 name="acceptCommunication" 
//                 disabled={disabled} 
//                 description="Stay updated with important notifications and offers"
//               />
//             </div>
//           </SectionWrapper>
//         );

//       case 4:
//         return (
//           <SectionWrapper title="KYC Documents Upload" icon={<DocumentIcon />}>
//             <FileUploadField label="Aadhar Card Front" name="aadharFront" accept=".jpg,.jpeg,.png,.pdf" required disabled={disabled} />
//             <FileUploadField label="Aadhar Card Back" name="aadharBack" accept=".jpg,.jpeg,.png,.pdf" required disabled={disabled} />
//             <FileUploadField label="PAN Card" name="panCard" accept=".jpg,.jpeg,.png,.pdf" required disabled={disabled} />
//             <FileUploadField label="Business Proof (Optional)" name="businessProof" accept=".jpg,.jpeg,.png,.pdf" disabled={disabled} />
//             <div className="lg:col-span-2 bg-blue-50 border border-blue-200 rounded-xl p-4">
//               <p className="text-sm text-blue-700 font-medium">
//                 <strong>📝 Note:</strong> Upload clear images/PDFs of your documents. 
//                 Maximum file size: 2MB per document. Supported formats: JPG, PNG, PDF.
//               </p>
//             </div>
//           </SectionWrapper>
//         );

//       case 5:
//         return (
//           <SectionWrapper title="Payment Details" icon={<PaymentIcon />}>
//             <div className="lg:col-span-2 text-center py-8">
//               <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 inline-block max-w-md">
//                 <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <PaymentIcon />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Registration Fee</h3>
//                 <p className="text-3xl font-bold text-blue-600 mb-2">₹4,999</p>
//                 <p className="text-gray-600 mb-6">One-time registration fee</p>
//                 <button
//                   type="button"
//                   onClick={() => setCurrentStep(prev => prev + 1)}
//                   className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-semibold text-lg shadow-lg transition-all duration-200 transform hover:scale-105"
//                 >
//                   Proceed to Payment
//                 </button>
//               </div>
//             </div>
//           </SectionWrapper>
//         );

//       case 6:
//         return (
//           <SectionWrapper title="Partner Agreement" icon={<AgreementIcon />}>
//             <div className="lg:col-span-2 text-center">
//               <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 max-w-2xl mx-auto">
//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <AgreementIcon />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Sign & Upload Agreement</h3>
//                 <p className="text-gray-600 mb-6 text-lg">
//                   Please download the agreement, print it, sign it, and upload the signed copy.
//                 </p>
                
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
//                   <button
//                     type="button"
//                     className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-all duration-200 flex items-center justify-center"
//                   >
//                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                     Download Agreement
//                   </button>
//                   <button
//                     type="button"
//                     className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 font-semibold transition-all duration-200 flex items-center justify-center"
//                   >
//                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
//                     </svg>
//                     Print Document
//                   </button>
//                 </div>

//                 <FileUploadField 
//                   label="Upload Signed Agreement" 
//                   name="signedAgreement" 
//                   accept=".pdf,.jpg,.jpeg,.png" 
//                   required 
//                   disabled={disabled} 
//                 />
//               </div>
//             </div>
//           </SectionWrapper>
//         );

//       case 7:
//         return (
//           <SectionWrapper title="Registration Complete" icon={<SuccessIcon />}>
//             <div className="lg:col-span-2 text-center py-8">
//               <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-12 max-w-2xl mx-auto">
//                 <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
//                   <SuccessIcon />
//                 </div>
//                 <h3 className="text-3xl font-bold text-gray-800 mb-4">🎉 Welcome Aboard!</h3>
//                 <p className="text-gray-600 mb-8 text-lg">
//                   Your {formData.role} account has been created successfully. 
//                   {franchiseCreatedBy && ' You are now linked to your franchise.'}
//                 </p>
                
//                 <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
//                   <h4 className="font-bold text-xl mb-6 text-gray-800 text-center">Your Account Details</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
//                     <div>
//                       <label className="text-sm font-semibold text-gray-600">User ID:</label>
//                       <p className="font-mono bg-gray-100 p-3 rounded-lg font-bold text-gray-800">{userContext.userId}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-semibold text-gray-600">Role:</label>
//                       <p className="font-mono bg-gray-100 p-3 rounded-lg font-bold text-gray-800 capitalize">{formData.role}</p>
//                     </div>
//                     {formData.role === 'partner' && formData.franchiseId && (
//                       <div className="md:col-span-2">
//                         <label className="text-sm font-semibold text-gray-600">Franchise ID:</label>
//                         <p className="font-mono bg-gray-100 p-3 rounded-lg font-bold text-gray-800">{formData.franchiseId}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
                
//                 <button
//                   type="submit"
//                   className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold text-lg shadow-lg transition-all duration-200 transform hover:scale-105"
//                 >
//                   Access {formData.role === 'franchise' ? 'Franchise' : 'Partner'} Dashboard
//                 </button>
//               </div>
//             </div>
//           </SectionWrapper>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
//           {/* Header Section */}
//           <div className="text-center pt-8 px-8">
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
//               {franchiseCreatedBy ? 'Partner Registration' : 'Franchise/Partner Registration'}
//             </h1>
//             <p className="text-xl text-gray-600 mb-6">
//               {franchiseCreatedBy 
//                 ? 'Complete your partner profile to join the franchise network' 
//                 : 'Join our network of successful partners and grow your business with us'
//               }
//             </p>
//           </div>

//           {/* Progress Section */}
//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-8">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <h2 className="text-2xl font-bold">Complete Your Registration</h2>
//                 <p className="text-blue-100 mt-2">Step {currentStep} of {steps.length}</p>
//               </div>
//               <div className="text-right">
//                 <div className="text-3xl font-bold">{currentStep}</div>
//                 <div className="text-blue-100 text-sm">Current Step</div>
//               </div>
//             </div>
//             <div className="w-full bg-blue-500 rounded-full h-2">
//               <div 
//                 className="bg-white rounded-full h-2 transition-all duration-500" 
//                 style={{ width: `${(currentStep / steps.length) * 100}%` }}
//               ></div>
//             </div>
//           </div>

//           {/* Scrollable Form Content */}
//           <div className="p-8 max-h-[65vh] overflow-y-auto custom-scrollbar">
//             <StepIndicator currentStep={currentStep} steps={steps} />

//             {!isSubmitted && (
//               <Formik
//                 initialValues={{ ...initialValues, ...formData }}
//                 validationSchema={getValidationSchema(currentStep)}
//                 enableReinitialize
//                 onSubmit={handleStepSubmit}
//               >
//                 {({ isSubmitting, values }) => (
//                   <Form>
//                     {renderStepContent(currentStep, !!disabledSteps[currentStep])}

//                     {/* Navigation Buttons */}
//                     <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
//                       {currentStep > 1 ? (
//                         <button
//                           type="button"
//                           onClick={() => setCurrentStep(prev => prev - 1)}
//                           className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all duration-200 flex items-center"
//                         >
//                           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                           </svg>
//                           Previous
//                         </button>
//                       ) : <div />}

//                       <div className="flex items-center gap-4">
//                         {disabledSteps[currentStep] && (
//                           <button
//                             type="button"
//                             onClick={() => setDisabledSteps(prev => ({ ...prev, [currentStep]: false }))}
//                             className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 font-semibold transition-all duration-200 flex items-center"
//                           >
//                             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                             </svg>
//                             Edit Step
//                           </button>
//                         )}

//                         <button
//                           type="submit"
//                           disabled={isSubmitting || !!disabledSteps[currentStep]}
//                           className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center ${
//                             isSubmitting || disabledSteps[currentStep]
//                               ? 'bg-gray-400 cursor-not-allowed text-white'
//                               : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
//                           }`}
//                         >
//                           {isSubmitting ? (
//                             <>
//                               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                               </svg>
//                               Processing...
//                             </>
//                           ) : (
//                             <>
//                               {currentStep === steps.length ? 'Complete Registration' : 'Continue'}
//                               <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                               </svg>
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </Form>
//                 )}
//               </Formik>
//             )}

//             {isSubmitted && (
//               <div className="text-center py-16">
//                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-12 max-w-2xl mx-auto">
//                   <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <SuccessIcon />
//                   </div>
//                   <h3 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h3>
//                   <p className="text-gray-600 mb-8 text-lg">
//                     Thank you for completing your registration. Your account is now being processed.
//                     {franchiseCreatedBy && ' You are now linked to your franchise.'}
//                   </p>
//                   <button
//                     onClick={() => window.location.href = '/signin/franchise'}
//                     className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold transition-all duration-200"
//                   >
//                     Go to Login
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-8 text-gray-500 text-sm">
//           <p>Need help? Contact our support team at support@digitalcard.com or call +91 9480 65 1581</p>
//         </div>
//       </div>

//       {/* Custom Scrollbar Styles */}
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f1f5f9;
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #cbd5e1;
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #94a3b8;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default RegistrationPage;

//====================================================================================================================
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLocation } from "react-router-dom";

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

// -------------------- UI Field components --------------------
const InputField = ({ label, name, type = 'text', required = false, disabled = false, icon = null, onAutoSave = null, ...props }) => (
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
              {...props}
              id={name}
              type={type}
              onChange={(e) => {
                field.onChange(e);
                if (onAutoSave) {
                  onAutoSave(form.values);
                }
              }}
              className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 ${
                icon ? 'pl-10' : ''
              } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-gray-300'}`}
              disabled={disabled}
            />
          </div>
        )
      )}
    </Field>

    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
  </div>
);

const SelectField = ({ label, name, options, required = false, disabled = false, icon = null, onAutoSave = null }) => (
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
              onChange={(e) => {
                field.onChange(e);
                if (onAutoSave) {
                  onAutoSave(form.values);
                }
              }}
              className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 appearance-none bg-white hover:border-gray-300 ${
                icon ? 'pl-10' : ''
              }`}
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

const CheckboxField = ({ label, name, required = false, disabled = false, description = null, onAutoSave = null }) => (
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
                field.onChange(e);
                if (onAutoSave) {
                  onAutoSave(form.values);
                }
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

// ✅ FIXED FileUploadField - Properly handles File objects
const FileUploadField = ({ label, name, accept, required = false, disabled = false, onAutoSave = null }) => (
  <div className="mb-6">
    <label className={`block text-sm font-semibold mb-3 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
      {label} {required && <span className="text-red-500 ml-1">*</span>}
    </label>

    <Field name={name}>
      {({ field, form }) => (
        disabled ? (
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-600 font-medium">
            {form.values[name] ? '✓ Uploaded' : <span className="text-gray-400 italic">Not uploaded</span>}
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
            <input
              id={name}
              name={name}
              type="file"
              accept={accept}
              onChange={(e) => {
                const file = e.currentTarget.files[0];
                if (file) {
                  // ✅ Store the actual File object
                  form.setFieldValue(name, file);
                  
                  // Validate file size (2MB)
                  if (file.size > 2 * 1024 * 1024) {
                    alert('File size must be less than 2MB');
                    form.setFieldValue(name, null);
                    e.target.value = '';
                    return;
                  }
                  
                  console.log(`File selected for ${name}:`, file.name, file);
                  
                  // Trigger auto-save
                  if (onAutoSave) {
                    onAutoSave(form.values);
                  }
                } else {
                  form.setFieldValue(name, null);
                }
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
                {form.values[name] && (
                  <span className="text-green-600 text-sm mt-2">✓ {form.values[name].name}</span>
                )}
              </div>
            </label>
          </div>
        )
      )}
    </Field>

    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2 font-medium" />
  </div>
);

// Section and StepIndicator components
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

// Icons
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
      
      const response = await fetch(`http://localhost:3000/api/v1/user/${userId}`, {
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
      const apiUrl = 'http://localhost:3000/api/v1/franchise-partner/save-step';

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
        const res = await fetch(`http://localhost:3000/api/v1/franchise-partner/franchise/${userId}`);
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

  // Render step content with auto-save integration
  const renderStepContent = (step, disabled) => {
    const commonProps = {
      disabled: disabled,
      onAutoSave: disabled ? null : debouncedAutoSave
    };

    switch (step) {
      case 1:
        return (
          <SectionWrapper title="Business Information" icon={<BusinessIcon />}>
            {/* User Info Banner */}
            {userContext.userId && (
              <div className="lg:col-span-2 bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <UserIcon />
                  </div>
                  <div>
                    <p className="text-blue-800 font-semibold">Welcome! {userContext.userEmail}</p>
                    <p className="text-blue-600 text-sm">Your User ID: {userContext.userId}</p>
                    {lastSaved && (
                      <p className="text-blue-500 text-xs mt-1">
                        Draft last saved: {lastSaved.toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Franchise Context Banner */}
            {franchiseCreatedBy && (
              <div className="lg:col-span-2 bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-green-800 font-semibold">Partner Registration</p>
                    <p className="text-green-600 text-sm">This partner account will be linked to franchise</p>
                  </div>
                </div>
              </div>
            )}

            {/* Role Selection - Auto-set for franchise-created partners */}
            <SelectField
              label="Register As"
              name="role"
              options={[
                { value: 'franchise', label: 'Franchise' },
                { value: 'partner', label: 'Partner' }
              ]}
              required
              disabled={franchiseCreatedBy ? true : disabled}
              onAutoSave={franchiseCreatedBy ? null : debouncedAutoSave}
            />

            {/* Auto-filled Franchise ID for franchise-created partners */}
            {franchiseCreatedBy && (
              <div className="lg:col-span-2">
                <InputField 
                  label="Franchise ID" 
                  name="franchiseId" 
                  required 
                  disabled={true}
                  value={franchiseCreatedBy}
                />
                <p className="text-green-600 text-sm mt-2">
                  ✓ This partner will be automatically linked to the franchise
                </p>
              </div>
            )}

            {/* Manual Franchise ID field for regular partner registration */}
            <Field name="role">
              {({ field }) => (
                !franchiseCreatedBy && field.value === 'partner' && (
                  <div className="lg:col-span-2">
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-4">
                      <h4 className="font-bold text-yellow-800 mb-2">Partner Registration</h4>
                      <p className="text-yellow-700 text-sm">
                        You need a Franchise ID to register as a partner. Get this from your franchise owner.
                      </p>
                    </div>
                    
                    <InputField 
                      label="Franchise ID" 
                      name="franchiseId" 
                      required 
                      disabled={disabled} 
                      placeholder="Enter Franchise ID"
                      onAutoSave={debouncedAutoSave}
                    />
                  </div>
                )
              )}
            </Field>

            {/* Regular Business Fields */}
            <InputField 
              label="Business Name" 
              name="businessName" 
              required 
              {...commonProps}
            />
            <SelectField 
              label="Business Type" 
              name="businessType" 
              options={['Retail', 'Service', 'Manufacturing', 'Technology', 'Consulting']} 
              required 
              {...commonProps}
            />
            <div className="lg:col-span-2">
              <InputField 
                label="Email Address" 
                name="email" 
                type="email" 
                required 
                disabled={true}
              />
            </div>
            <InputField 
              label="Phone Number" 
              name="phone" 
              type="tel" 
              required 
              {...commonProps}
            />
          </SectionWrapper>
        );

      case 2:
        return (
          <>
            <SectionWrapper title="Personal Details" icon={<UserIcon />}>
              <SelectField label="Salutation" name="salutation" options={['Mr', 'Mrs', 'Ms', 'Dr']} required {...commonProps} />
              <InputField label="First Name" name="firstName" required {...commonProps} />
              <InputField label="Middle Name" name="middleName" {...commonProps} />
              <InputField label="Last Name" name="lastName" required {...commonProps} />
              <InputField label="Date of Birth" name="dateOfBirth" type="date" required {...commonProps} />
              <SelectField label="Gender" name="gender" options={['Male', 'Female', 'Other']} required {...commonProps} />
              <InputField label="Personal Contact" name="personalContact" required {...commonProps} />
              <InputField label="Personal Email" name="personalEmail" type="email" required {...commonProps} />
              <InputField label="Aadhar Number" name="aadharNumber" required {...commonProps} />
              <InputField label="PAN Number" name="panNumber" required {...commonProps} />
            </SectionWrapper>

            <SectionWrapper title="Address Information" icon={<BusinessIcon />}>
              <InputField label="Address Line 1" name="addressLine1" required {...commonProps} />
              <InputField label="Address Line 2" name="addressLine2" {...commonProps} />
              <InputField label="City" name="city" required {...commonProps} />
              <InputField label="State" name="state" required {...commonProps} />
              <InputField label="Pincode" name="pincode" required {...commonProps} />
              <InputField label="Country" name="country" {...commonProps} />
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
                {...commonProps}
                description="You must accept the terms and conditions to proceed"
              />
              <CheckboxField 
                label="I accept the Privacy Policy" 
                name="acceptPrivacyPolicy" 
                required 
                {...commonProps}
                description="We respect your privacy and protect your personal data"
              />
              <CheckboxField 
                label="I agree to receive communication via email and SMS" 
                name="acceptCommunication" 
                {...commonProps}
                description="Stay updated with important notifications and offers"
              />
            </div>
          </SectionWrapper>
        );

      case 4:
        return (
          <SectionWrapper title="KYC Documents Upload" icon={<DocumentIcon />}>
            <FileUploadField label="Aadhar Card Front" name="aadharFront" accept=".jpg,.jpeg,.png,.pdf" required {...commonProps} />
            <FileUploadField label="Aadhar Card Back" name="aadharBack" accept=".jpg,.jpeg,.png,.pdf" required {...commonProps} />
            <FileUploadField label="PAN Card" name="panCard" accept=".jpg,.jpeg,.png,.pdf" required {...commonProps} />
            <FileUploadField label="Business Proof (Optional)" name="businessProof" accept=".jpg,.jpeg,.png,.pdf" {...commonProps} />
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
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Registration Fee</h3>
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
                  Please download the agreement, print it, sign it, and upload the signed copy.
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
                  {...commonProps}
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
                  Your {formData.role} account has been created successfully. 
                  {franchiseCreatedBy && ' You are now linked to your franchise.'}
                </p>
                
                <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                  <h4 className="font-bold text-xl mb-6 text-gray-800 text-center">Your Account Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div>
                      <label className="text-sm font-semibold text-gray-600">User ID:</label>
                      <p className="font-mono bg-gray-100 p-3 rounded-lg font-bold text-gray-800">{userContext.userId}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Role:</label>
                      <p className="font-mono bg-gray-100 p-3 rounded-lg font-bold text-gray-800 capitalize">{formData.role}</p>
                    </div>
                    {formData.role === 'partner' && formData.franchiseId && (
                      <div className="md:col-span-2">
                        <label className="text-sm font-semibold text-gray-600">Franchise ID:</label>
                        <p className="font-mono bg-gray-100 p-3 rounded-lg font-bold text-gray-800">{formData.franchiseId}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold text-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Access {formData.role === 'franchise' ? 'Franchise' : 'Partner'} Dashboard
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
                    {renderStepContent(currentStep, !!disabledSteps[currentStep])}

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
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-12 max-w-2xl mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <SuccessIcon />
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

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Need help? Contact our support team at support@digitalcard.com or call +91 9480 65 1581</p>
          <p className="mt-2 text-xs text-gray-400">
            ✨ Auto-save: Your progress is automatically saved locally every 3 seconds
          </p>
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

export default RegistrationPage;