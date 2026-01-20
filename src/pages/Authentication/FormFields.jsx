import React from 'react';
import { Field, ErrorMessage } from 'formik';

// -------------------- UI Field components --------------------
export const InputField = ({ label, name, type = 'text', required = false, disabled = false, icon = null, onAutoSave = null, ...props }) => (
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

export const SelectField = ({ label, name, options, required = false, disabled = false, icon = null, onAutoSave = null }) => (
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

export const CheckboxField = ({ label, name, required = false, disabled = false, description = null, onAutoSave = null }) => (
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
export const FileUploadField = ({ label, name, accept, required = false, disabled = false, onAutoSave = null }) => (
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

// Section and StepIndicator components - REMOVED BORDERS
export const SectionWrapper = ({ title, children, icon = null }) => (
  <div className="mb-8 bg-white p-8 rounded-2xl">
    <div className="flex items-center mb-6">
      {icon && <div className="mr-3 text-blue-600">{icon}</div>}
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{children}</div>
  </div>
);


export const StepIndicator = ({ currentStep, steps }) => (
  <div className="flex justify-center mb-8 px-8"> 
    <div className="flex items-center justify-between w-full max-w-4xl"> 
      {steps.map((step, index) => (
        <div key={step.number} className="flex flex-col items-center flex-1"> 
          <div className="flex items-center w-full justify-center"> 
            
            {index > 0 && (
              <div className={`flex-1 h-1 transition-all duration-300 ${
                currentStep > step.number ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'
              }`} />
            )}
            
            {/* Step Circle */}
            <div className="flex flex-col items-center mx-2"> 
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
              {/* Step Title - Centered below circle */}
              <span className={`text-sm font-semibold mt-3 transition-all duration-300 text-center w-24 ${
                currentStep >= step.number ? 'text-gray-800' : 'text-gray-400'
              }`}>
                {step.title}
              </span>
            </div>

            {/* Connector Line (except for last step) */}
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 transition-all duration-300 ${
                currentStep > step.number ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Icons
export const BusinessIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

export const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export const DocumentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export const PaymentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

export const AgreementIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const SuccessIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const agreementUrl = "https://digicard-backend.s3.eu-north-1.amazonaws.com/cards/Partner+agreement.pdf";

  const handleDownloadAgreement = () => {
    const link = document.createElement("a");
    link.href = agreementUrl;
    link.download = "Partner_Agreement.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

// Step Content Component
export const StepContent = ({ currentStep, disabled, userContext, franchiseCreatedBy, formData, lastSaved, commonProps }) => {
  switch (currentStep) {
    case 1:
      return (
        <SectionWrapper title="Business Information" icon={<BusinessIcon />}>
          {/* User Info Banner */}
          {userContext.userId && (
            <div className="lg:col-span-2 bg-blue-50 rounded-xl p-4 mb-6">
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
            <div className="lg:col-span-2 bg-green-50 rounded-xl p-4 mb-6">
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
            onAutoSave={franchiseCreatedBy ? null : commonProps.onAutoSave}
          />

          {/* Auto-filled Franchise ID for franchise-created partners */}
          {franchiseCreatedBy && (
            <div >
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

         

          {/* Regular Business Fields - FIXED: Email field now takes half width */}
          <InputField 
            label="Business Name" 
            name="businessName" 
            required 
            {...commonProps}
          />
           {/* Manual Franchise ID field for regular partner registration */}
          <Field name="role">
            {({ field }) => (
              !franchiseCreatedBy && field.value === 'partner' && (
                <div >
                  <div className="bg-yellow-50 rounded-xl p-4 mb-4">
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
                    onAutoSave={commonProps.onAutoSave}
                  />
                </div>
              )
            )}
          </Field>
          <SelectField 
            label="Business Type" 
            name="businessType" 
            options={['Retail', 'Service', 'Manufacturing', 'Technology', 'Consulting']} 
            required 
            {...commonProps}
          />
          <InputField 
            label="Email Address" 
            name="email" 
            type="email" 
            required 
            disabled={true}
          />
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

    // case 3:
    //   return (
    //     <SectionWrapper title="Terms & Conditions" icon={<ShieldIcon />}>
    //       <div className="lg:col-span-2 space-y-4">
    //         <div className="bg-gray-50 rounded-xl p-6 max-h-80 overflow-y-auto">
    //           <h4 className="font-bold text-lg mb-4 text-gray-800">Digital Card Partner Agreement</h4>
    //           <div className="space-y-3 text-gray-600">
    //             <p>1. Partner agrees to comply with all company policies and procedures.</p>
    //             <p>2. Partner shall maintain the highest standards of service quality.</p>
    //             <p>3. All transactions must be recorded accurately in the system.</p>
    //             <p>4. Partner is responsible for maintaining customer data confidentiality.</p>
    //             <p>5. Company reserves the right to terminate partnership for violations.</p>
    //             <p>6. Partner fees are non-refundable once paid.</p>
    //             <p>7. All disputes shall be subject to jurisdiction of local courts.</p>
    //           </div>
              
    //           <h4 className="font-bold text-lg mt-6 mb-4 text-gray-800">Privacy Policy</h4>
    //           <p className="text-gray-600">
    //             We collect and process your personal information to provide our services. 
    //             Your data is protected and will not be shared with third parties without consent.
    //           </p>
    //         </div>

    //         <CheckboxField 
    //           label="I accept the Terms and Conditions" 
    //           name="acceptTerms" 
    //           required 
    //           {...commonProps}
    //           description="You must accept the terms and conditions to proceed"
    //         />
    //         <CheckboxField 
    //           label="I accept the Privacy Policy" 
    //           name="acceptPrivacyPolicy" 
    //           required 
    //           {...commonProps}
    //           description="We respect your privacy and protect your personal data"
    //         />
    //         <CheckboxField 
    //           label="I agree to receive communication via email and SMS" 
    //           name="acceptCommunication" 
    //           {...commonProps}
    //           description="Stay updated with important notifications and offers"
    //         />
    //       </div>
    //     </SectionWrapper>
    //   );

case 3:
  return (
    <SectionWrapper title="Terms & Conditions" icon={<ShieldIcon />}>
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gray-50 rounded-xl p-6 max-h-96 overflow-y-auto">
          <h4 className="font-bold text-lg mb-4 text-gray-800">REVA-YAH PARTNER PROGRAM (RPP) CUSTOMER AGREEMENT</h4>
          <div className="space-y-4 text-gray-600 text-sm">
            <p>This Agreement is between STAN INITIATIVES PVT LTD (also referred to as "Reva-Yah", "RH," "we," "us," or "our") and the PARTNER ("Franchisee/ Channel Partner/ Referral Partner"), establishing the terms and conditions for the Partner's participation in the Reva-Yah Partners Program (the "Program"). This Agreement contains the terms and conditions that govern your access to and use of the Service Offerings and is effective on the date you click "I Accept" or first use any Service Offering (the "Effective Date").</p>

            <p><strong>1. Use of the Service Offerings.</strong></p>
            <p>1.1. You may access and use the Service Offerings in accordance with this Agreement. Service Level Agreements and Service Terms apply to certain Service Offerings. You will comply with the terms of this Agreement and all laws, rules and regulations applicable to your use of the Service Offerings.</p>
            <p>1.2. To access the Services, you must have an RPP account associated with a valid email address and a valid form of payment. Unless explicitly permitted by the Service Terms, you will only create one account per email address.</p>
            <p>1.3. Third-Party Content may be used by you at your election. Third-Party Content is governed by this Agreement and, if applicable, separate terms and conditions accompanying such Third-Party Content, which terms and conditions may include separate fees and charges.</p>

            <p><strong>2. Relationships</strong></p>
            <p>2.1. Partner is an independent contractor engaged in marketing Reva-Yah services /products to its customers. Partner is not an agent or legal representative of Reva-Yah for any purpose, and has no authority to act for, bind or commit Reva-Yah.</p>
            <p>2.2. Partner has no authority to make any commitment on behalf of Reva-Yah with respect to service, delivery, modifications, interfacing capability, suitability of software or suitability in specific applications. Partner has no authority to modify the warranty offered with Reva-Yah service & products. Partner will indemnify Reva-yah from liability for any modified warranty or other commitment by Partner not specifically authorized by Reva-Yah.</p>
            <p>2.3. Partner will not represent itself in any way that implies Partner is an agent or branch of Reva-Yah. Partner will immediately change or discontinue any representation or business practice found to be misleading or deceptive by Reva-Yah immediately upon notice from Reva-Yah.</p>

            <p><strong>3. Term, Limitations, Termination</strong></p>
            <p>3.1. The term of this Agreement is twelve (12) months from the date of acceptance by Partner and Reva-Yah. This Agreement shall automatically renew on each subsequent year for a one-year term, unless it is terminated earlier in accordance with this Agreement.</p>
            <p>3.2. Reva-Yah or Partner may terminate this Agreement without cause at any time upon thirty (30) days written notice or with cause at any time upon fifteen (15) days written notice, except that neither the expiration nor earlier termination of this Agreement shall release either party from any obligation which has accrued as of the date of termination.</p>
            <p>3.3. Reva-Yah may, from time to time, give Partner written notice of amendments to this Agreement. Any such amendment will automatically become a part of this Agreement thirty (30) days from the date of the notice, unless otherwise specified in the notice.</p>
            <p>3.4. Upon expiration, non-renewal or terminations of this Agreement, all interests in accrued marketing funds (if any) will automatically lapse–it does not affect any existing outstanding amounts due.</p>

            <p><strong>4. Partner Programs</strong></p>
            <p>4.1. Reva-Yah Partner program will contain various participation levels. Reva-Yah will invite Partner from time to time to participate in the co-operative advertising, market development and promotional programs offered by Reva-yah. Partner may, at its option, participate in such programs during the term of this Agreement. Reva-Yah reserves the right to terminate or modify such programs at any time at its sole discretion.</p>
            <p>4.2. Reva-Yah shall exert best efforts to market Reva-Yah services & products, and is able to use promotional materials supplied by Reva-Yah.</p>
            <p>4.3. Partner shall have sufficient technical knowledge of the Reva-Yah services & products in general, and will have access to appropriate Reva-Yah sales and technical training.</p>
            <p>4.4. Reva-Yah does not represent that it will continue to develop any particular item or model of product /service indefinitely or even for any specific period. Reva-Yah specifically reserves the right to modify any of the specifications or characteristics of its products/services, to remove any product /service from the market, and/or to cease manufacturing or supporting it.</p>
            <p>4.5. Partner is expected and encouraged to advertise and promote the sales of Reva-yah services & products through all appropriate media including trade show exhibits, catalogs and direct mailings, space advertising, educational meetings, sales aids, etc. Reva-Yah must approve all original materials that use Reva-Yah name or trademarks (aside from modifying existing Reva-Yah supplied template materials). Reva-yah will assist Partner in advertising and promoting Reva-Yah services & products in accordance with Reva-Yah policy.</p>

            <p><strong>5. Limitation of Liability</strong></p>
            <p>UNDER NO CIRCUMSTANCES, INCLUDING ANY INFRINGEMENT CLAIMS, SHALL REVA-YAH BE LIABLE TO PARTNERS OR ANY OTHER PARTY FOR ANY RE-PROCUREMENT COSTS, LOST REVENUE OR PROFITS OR FOR ANY OTHER SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES, EVEN IF COMPANY HAS BEEN INFORMED OF SUCH POTENTIAL LOSS OR DAMAGE.</p>
            <p>WE AND OUR AFFILIATES WILL NOT BE LIABLE TO YOU FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES, OR FOR ANY LOSS OF REVENUE, PROFITS, OR GOODWILL, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, ARISING IN CONNECTION WITH: (A) YOUR PARTICIPATION IN THE PROGRAM; (B) YOUR USE OF MATERIALS; OR (C) ANY INVESTMENTS, EXPENDITURES, OR COMMITMENTS BY YOU IN CONNECTION WITH THESE TERMS, THE PROGRAM, OR YOUR USE OF OR ACCESS TO MATERIALS. THE AGGREGATE LIABILITY OF AWS AND OUR AFFILIATES ARISING IN CONNECTION WITH THE PROGRAM AND MATERIALS WILL BE LIMITED TO A REFUND OF THE FEES REFERRED TO IN SECTION 1.4 PAID OR PAYABLE IN THE 12 MONTH PERIOD BEFORE THE LATEST CLAIM. THE LIMITATIONS AND EXCLUSIONS IN THIS SECTION 7 APPLY ONLY TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW.</p>

            <p><strong>6. Use of Reva-Yah Trademarks</strong></p>
            <p>6.1. Reseller acknowledges the following:</p>
            <p>6.1.a. Reva-Yah owns all right, title and interest in the Reva-Yah names and logotypes.</p>
            <p>6.1.b. Reva-Yah is the owner of certain other trademarks and tradenames used in connection with certain product lines and software.</p>
            <p>6.1.c. Partner will acquire no interest in any such trademarks or tradenames by virtue of this Agreement, its activities under it, or any relationship with Reva-yah.</p>
            <p>6.2. During the term of this Agreement, Partner may indicate to the trade and to the public that it is an Authorized Partner of the Reva-Yah services/ products. Partner may also use the Reva-Yah trademarks and trade names to promote and solicit sales or licensing of Reva-Yah services products if done so in strict accordance with Reva-Yah guidelines. Partner will not adopt or use such trademarks or tradenames, or any confusingly word or symbol, as part of its company name or allow such marks or names to be used by others.</p>
            <p>6.3. At the expiration or termination of this Agreement, Partner shall immediately discontinue any use of the Reva-Yah and Reva-Yah names or trademarks or any other combination of words, designs, trademarks or tradenames that would indicate that it is or was a Partner of the Reva-Yah products.</p>

            <p><strong>7. Proprietary Information</strong></p>
            <p>7.1 Reva-Yah and Partner shall each exercise due diligence to maintain in confidence and not disclose to any third party any proprietary information furnished by the other to it on a confidential basis and identified as such when furnished. Except in accordance with this Agreement, neither party shall use such information without permission of the party that furnished it. As used in this paragraph, "due diligence" means the same precaution and standard of care which that party uses to safeguard its own proprietary data, but in no event less than reasonable care. The provisions of this Section shall survive for three (3) years beyond the expiration, non-renewal or termination of this Agreement.</p>
            <p>7.2 This Agreement does not grant any license under any patents or other intellectual property rights owned or controlled by or licensed to Reva-Yah. Partner shall not have any right to develop /manufacture Reva-Yah services/ products.</p>

            <p><strong>8. Export Controls</strong></p>
            <p>Regardless of any disclosure made by Partner to Reva-Yah or Distributor of an ultimate destination of Reva-Yah services/ products, Partner shall not export, either directly or indirectly, any documentation, Reva-Yah services/ products, or system incorporating such Reva-Yah services/ products to any locations on the excluded export list. Following are the locations: None at present.</p>

            <p><strong>9. Compliance with Laws</strong></p>
            <p>Partner agrees to comply with all laws and regulations that are applicable to the business that Partner transacts. Partner agrees to indemnify and hold Reva-Yah harmless for all liability or damages caused by Partners failure to comply with the terms of this provision.</p>

            <p><strong>10. Government Contract Conditions</strong></p>
            <p>In the event that Partner elects to sell Reva-Yah products or services to the Government (national, regional or local), Partner does so solely at its own option and risk, and agrees not to obligate Reva-Yah as a subcontractor or otherwise to the Government. Partner remains solely and exclusively responsible for compliance with all statutes and regulations governing sales to the Government. Reva-Yah makes no representations, certifications or warranties whatsoever with respect to the ability of its goods, services or prices to satisfy any such statutes and regulations.</p>

            <p><strong>11. Miscellaneous</strong></p>
            <p>Notices under this Agreement must be sent by telegram, telecopy, registered or certified mail, or e-mail if receipt of e-mail is acknowledged to the appropriate party at its location submitted during the Partners application (or to a new address if the other has been properly notified of the change). A notice will not be effective until the addressee actually receives it.</p>
            <p>This Agreement and its schedules represent the entire agreement between the parties regarding this subject. This Agreement supersedes all previous oral or written communications between the parties regarding the subject, and it may not be modified or waived except in writing and signed by an officer or other authorized representative of each party. Neither party will be liable to the other for any delay or failure to perform if that delay or failure results from a cause beyond its reasonable control. If any provision is held invalid, all other provisions shall remain valid, unless such invalidity would frustrate the purpose of this Agreement. The laws of INDIA govern this Agreement without consideration to that body of law referred to as "conflicts of laws". Reva-Yah and Partner will attempt to settle any claim or controversy arising out of it through consultation and negotiation in good faith and a spirit of mutual cooperation. Any dispute which cannot be resolved through negotiation or mediation may be submitted to the courts of appropriate jurisdiction.</p>
          </div>
          
          <h4 className="font-bold text-lg mt-8 mb-4 text-gray-800">Privacy Policy</h4>
          <p className="text-gray-600 text-sm">
            We collect and process your personal information to provide our services. 
            Your data is protected and will not be shared with third parties without consent.
          </p>
        </div>

        <CheckboxField 
          label="I accept the Terms and Conditions" 
          name="acceptTerms" 
          required 
          {...commonProps}
          description="You must accept all terms and conditions to proceed"
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
          <div className="lg:col-span-2 bg-blue-50 rounded-xl p-4">
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
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 inline-block max-w-md">
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
            <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AgreementIcon />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Sign & Upload Agreement</h3>
              <p className="text-gray-600 mb-6 text-lg">
                Please download the agreement, print it, sign it, and upload the signed copy.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center ml-45 mb-8">
                <button onClick={handleDownloadAgreement}
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
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-12 max-w-2xl mx-auto">
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

// Export all components as named exports
export default {
  InputField,
  SelectField,
  CheckboxField,
  FileUploadField,
  SectionWrapper,
  StepIndicator,
  StepContent,
  BusinessIcon,
  UserIcon,
  DocumentIcon,
  ShieldIcon,
  PaymentIcon,
  AgreementIcon,
  SuccessIcon
};