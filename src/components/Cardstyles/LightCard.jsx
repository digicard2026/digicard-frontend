import React, { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaFacebookF,
  FaMapMarkerAlt,
  FaInstagram,
  FaGlobe,
  FaEnvelope,
  FaLinkedinIn,
  FaDownload,
  FaCalendarAlt,
  FaShoppingCart,
  FaCreditCard,
  FaLanguage,
  FaStar,
  FaFilePdf,
  FaUserFriends,
  FaBriefcase,
  FaBuilding,
  FaClock,
  FaStore,
  FaHeadset,
  FaCrown,
  FaGem,
  FaChevronLeft,
  FaChevronRight,
  FaVideo,
  FaQrcode,
  FaShieldAlt,
  FaBook,
  FaIdCard,
  FaImages,
  FaImage,
  FaUser,
  FaEllipsisH,
  FaInfoCircle,
  FaAddressCard
} from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";

// Card Fields Configuration
const cardFieldsConfig = {
  'Personal': {
    name: 'Personal',
    description: 'Basic digital card with essential features',
    required: ['firstName', 'email', 'jobTitle'],
    allowed: [
      'prefix', 'lastName', 'suffix', 'profilePhoto',
      'companyName', 'department', 'bio', 'companyLogo',
      'emails', 'phones', 'websites', 'socialLinks', 'customFields',
      'design', 'cardLayout'
    ],
    features: [
      'Profile Page',
      'Basic Contact Info',
      'Social Links',
      'Custom Design'
    ]
  },
  'Business': {
    name: 'Business',
    description: 'Enhanced features for professional presence',
    required: ['firstName', 'email', 'jobTitle', 'companyName'],
    allowed: [
      'prefix', 'lastName', 'suffix', 'profilePhoto', 'profileVideo',
      'titleLine', 'organization', 'aboutText',
      'companyName', 'department', 'bio', 'companyLogo',
      'emails', 'phones', 'websites', 'socialLinks', 'addresses', 'customFields',
      'servicesProducts', 'gallery', 'testimonials',
      'dynamicQRCode', 'downloads',
      'design', 'cardLayout'
    ],
    features: [
      'Profile Page with Video',
      'Professional/Personal Details',
      'Product Showcase/Gallery',
      'Dynamic QR Code',
      'Downloads Section',
      'Testimonials'
    ]
  },
  'Business Premium': {
    name: 'Business Premium',
    description: 'Advanced features for Business Premium',
    required: ['firstName', 'email', 'jobTitle', 'companyName', 'organization'],
    allowed: [
      'prefix', 'lastName', 'suffix', 'profilePhoto', 'profileVideo',
      'titleLine', 'foundedName', 'organization', 'aboutText',
      'companyName', 'department', 'bio', 'companyLogo',
      'emails', 'phones', 'websites', 'socialLinks', 'addresses', 'customFields',
      'servicesProducts', 'brandLabel', 'gallery', 'testimonials', 'clientList',
      'services', 'products', 'catalog',
      'interactiveElements', 'dynamicQRCode', 'nfcSettings', 'downloads',
      'design', 'cardLayout'
    ],
    features: [
      'All Premium Features +',
      'Brand Label Products/Services',
      'Interactive Elements',
      'NFC Card Support',
      'Services & Products Catalog',
      'Client List Display'
    ]
  }
};

// Helper function to check if a field is allowed for the current plan
const isFieldAllowed = (plan, fieldName) => {
  if (!plan || !cardFieldsConfig[plan]) return true; // Default to true if plan not found
  return cardFieldsConfig[plan].allowed.includes(fieldName);
};

const LightCard = ({ cardData = {} }) => {
  console.log('🎯 LightTabCard received data:', cardData);
  const [activeTab, setActiveTab] = useState('profile');
  const [currentServiceSlide, setCurrentServiceSlide] = useState(0);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
  const [currentClientSlide, setCurrentClientSlide] = useState(0);

  // Mobile dimensions - standard phone size
  const MOBILE_WIDTH = 375;
  const MOBILE_HEIGHT = 667;

  // Updated background image
  const backgroundImage = "https://images.pexels.com/photos/1257860/pexels-photo-1257860.jpeg";

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      /* Import Google Fonts as fallbacks */
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
      
      /* Rumaila-like font for headings - using Montserrat as fallback */
      .rumaila-font {
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
        color: white!important; /* Black color for headings */
      }
      
      /* Casper-like font for body text - using Poppins as fallback */
      .casper-font {
        font-family: 'Poppins', sans-serif;
        font-weight: 200 !important; /* Normal weight, not bold */
        color: white !important; /* Dark gray for body text */
      }
      
      html, body {
        height: 100%;
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch;
        font-family: 'Poppins', sans-serif; /* Casper font for body */
      }
      #root {
        min-height: 100%;
        font-family: 'Poppins', sans-serif; /* Casper font for body */
      }
      * {
        font-family: 'Poppins', sans-serif; /* Casper font for body */
      }
      .mobile-container {
        width: ${MOBILE_WIDTH}px;
        height: ${MOBILE_HEIGHT}px;
        overflow: hidden;
        position: relative;
        scrollbar-width: none;
        -ms-overflow-style: none;
        background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('${backgroundImage}');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }
      .mobile-container::-webkit-scrollbar {
        display: none;
      }
      .tab-content-wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .tab-content {
        flex: 1;
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        padding-bottom: 70px;
      }
      .tab-content::-webkit-scrollbar {
        display: none;
      }
      .sticky-bottom-nav {
        position: sticky;
        bottom: 0;
        width: 100%;
        z-index: 50;
        margin-top: auto;
      }
      
      /* Remove all box backgrounds and borders */
      .no-bg-border {
        background: transparent !important;
        border: none !important;
        backdrop-filter: none !important;
        box-shadow: none !important;
      }
      
      /* Social Media Icons - Larger Size */
      .social-icon-large {
        width: 60px !important;
        height: 60px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .social-icon-large svg {
        width: 28px !important;
        height: 28px !important;
      }
      
      /* Professional Bio Fix - Prevent text overlap */
      .bio-text-container {
        max-width: 100%;
        word-wrap: break-word;
        overflow-wrap: break-word;
        hyphens: auto;
      }
      .bio-text {
        text-align: justify;
        text-justify: inter-word;
        line-height: 1.6;
      }
      
      /* Media Queries */
      @media (max-width: 640px) {
        .mobile-container {
          width: 100vw;
          max-width: 100%;
          height: 100vh;
          border-radius: 0;
        }
        .social-icon-large {
          width: 56px !important;
          height: 56px !important;
        }
        .social-icon-large svg {
          width: 24px !important;
          height: 24px !important;
        }
      }
      
      @media (min-width: 641px) and (max-width: 768px) {
        .mobile-container {
          width: 420px;
          height: 720px;
        }
      }
      
      @media (min-width: 769px) {
        .mobile-container {
          width: 450px;
          height: 750px;
        }
      }
    `;
    document.head.appendChild(style);

    // Auto slide intervals
    const serviceInterval = setInterval(() => {
      if (isFieldAllowed(profileData.cardType, 'services')) {
        setCurrentServiceSlide(prev => (prev + 1) % Math.max(1, profileData.services.length));
      }
    }, 4000);

    const productInterval = setInterval(() => {
      if (isFieldAllowed(profileData.cardType, 'products')) {
        setCurrentProductSlide(prev => (prev + 1) % Math.max(1, profileData.products.length));
      }
    }, 4000);

    const testimonialInterval = setInterval(() => {
      if (isFieldAllowed(profileData.cardType, 'testimonials')) {
        setCurrentTestimonialSlide(prev => (prev + 1) % Math.max(1, profileData.testimonials.length));
      }
    }, 5000);

    const clientInterval = setInterval(() => {
      if (isFieldAllowed(profileData.cardType, 'clientList')) {
        setCurrentClientSlide(prev => (prev + 1) % Math.max(1, profileData.clientList.length));
      }
    }, 3000);

    return () => {
      document.head.removeChild(style);
      clearInterval(serviceInterval);
      clearInterval(productInterval);
      clearInterval(testimonialInterval);
      clearInterval(clientInterval);
    };
  }, []);

  // Build complete profileData from cardData with ALL fields
  const profileData = {
    // Personal Info
    prefix: cardData?.prefix || "",
    firstName: cardData?.firstName || "",
    lastName: cardData?.lastName || "",
    suffix: cardData?.suffix || "",
    name: `${cardData?.prefix || ""} ${cardData?.firstName || ""} ${cardData?.lastName || ""}`.trim(),
   
    // Professional Info
    jobTitle: cardData?.jobTitle || "",
    companyName: cardData?.companyName || "",
    department: cardData?.department || "",
    foundedName: cardData?.foundedName || "",
    organization: cardData?.organization || "",
   
    // Contact Info
    email: cardData?.email || "",
    phones: cardData?.phones || [{ number: "", isPrimary: true }],
    websites: cardData?.websites || [],
    addresses: cardData?.addresses || [],
   
    // Profile Content
    profileVideo: cardData?.profileVideo || { url: "", title: "Intro Video" },
    titleLine: cardData?.titleLine || "",
    aboutText: cardData?.aboutText || ".",
    bio: cardData?.bio || "",
    servicesProducts: cardData?.servicesProducts || "",
    brandLabel: cardData?.brandLabel || "",
    catalog: cardData?.catalog || "",
   
    // Working Hours
    workingHours: cardData?.workingHours || {
      monday: { open: '09:00', close: '17:00' },
      tuesday: { open: '09:00', close: '17:00' },
      wednesday: { open: '09:00', close: '17:00' },
      thursday: { open: '09:00', close: '17:00' },
      friday: { open: '09:00', close: '17:00' },
      saturday: { open: '', close: '' },
      sunday: { open: '', close: '' }
    },
   
    // Social & Media
    socialLinks: cardData?.socialLinks || [],
    profilePhoto: cardData?.profilePhoto,
    companyLogo: cardData?.companyLogo,
   
    // Services & Products
    services: cardData?.services || [],
    products: cardData?.products || [],
   
    // Premium Features
    testimonials: cardData?.testimonials || [],
    clientList: cardData?.clientList || [],
    gallery: cardData?.gallery || [],
    downloads: cardData?.downloads || [],
    interactiveElements: cardData?.interactiveElements || [],

    // NEW FIELDS FROM DARKCARD
    customFields: cardData?.customFields || [],
    dynamicQRCode: cardData?.dynamicQRCode || null,
    nfcSettings: cardData?.nfcSettings || { isEnabled: false },
    productRangeDisplay: cardData?.productRangeDisplay || '',
    cardType: cardData?.cardType || 'Personal', // Default to Personal
    design: cardData?.design || '',
    cardLayout: cardData?.cardLayout || '',
    logoSize: cardData?.logoSize || '',
   
    // Settings
    enableOneTapCall: cardData?.enableOneTapCall !== undefined ? cardData.enableOneTapCall : true,
    enableWhatsApp: cardData?.enableWhatsApp !== undefined ? cardData.enableWhatsApp : true,
    enableEmail: cardData?.enableEmail !== undefined ? cardData.enableEmail : true
  };

  // Get current plan configuration
  const currentPlan = profileData.cardType || 'Personal';
  const planConfig = cardFieldsConfig[currentPlan] || cardFieldsConfig['Personal'];

  // Bottom navbar tabs - show based on plan
  const getAvailableTabs = () => {
    const allTabs = [
      { id: 'profile', label: 'Profile', icon: FaUser, tooltip: 'Profile' },
      { 
        id: 'services', 
        label: 'Services', 
        icon: FaShoppingCart, 
        tooltip: 'Services & Products',
        allowed: isFieldAllowed(currentPlan, 'services') || isFieldAllowed(currentPlan, 'products')
      },
      { id: 'contact', label: 'Contact', icon: FaAddressCard, tooltip: 'Contact Info' },
      { 
        id: 'gallery', 
        label: 'Gallery', 
        icon: FaImages, 
        tooltip: 'Gallery',
        allowed: isFieldAllowed(currentPlan, 'gallery')
      },
      { 
        id: 'more', 
        label: 'More', 
        icon: FaEllipsisH, 
        tooltip: 'More Info',
        allowed: isFieldAllowed(currentPlan, 'testimonials') || 
                isFieldAllowed(currentPlan, 'clientList') || 
                isFieldAllowed(currentPlan, 'downloads') ||
                isFieldAllowed(currentPlan, 'interactiveElements')
      }
    ];

    // Filter tabs based on plan allowances
    return allTabs.filter(tab => {
      if (tab.id === 'profile' || tab.id === 'contact') return true; // Always show profile and contact
      if (tab.allowed === undefined) return true; // Show if no specific allowance check
      return tab.allowed;
    });
  };

  const tabs = getAvailableTabs();

  const handleContact = (type, value) => {
    if (!value) return;
    switch (type) {
      case "email":
        window.open(`mailto:${value}`);
        break;
      case "phone":
        window.open(`tel:${value}`);
        break;
      case "whatsapp":
        window.open(`https://wa.me/${value.replace(/\D/g, "")}`);
        break;
      case "map":
        window.open(value, "_blank");
        break;
      case "website":
        window.open(value, "_blank");
        break;
      default:
        window.open(value, "_blank");
    }
  };

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'facebook': return <FaFacebookF />;
      case 'instagram': return <FaInstagram />;
      case 'twitter': return <FaXTwitter />;
      case 'youtube': return <FaYoutube />;
      case 'linkedin': return <FaLinkedinIn />;
      case 'whatsapp': return <FaWhatsapp />;
      default: return <FaGlobe />;
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  const getInteractiveElementIcon = (type) => {
    switch (type) {
      case 'call-to-action': return <FaHeadset className="w-4 h-4" />;
      case 'shop-flow': return <FaShoppingCart className="w-4 h-4" />;
      case 'live-chat': return <FaHeadset className="w-4 h-4" />;
      case 'appointment-scheduler': return <FaCalendarAlt className="w-4 h-4" />;
      case 'digital-payments': return <FaCreditCard className="w-4 h-4" />;
      case 'lead-form': return <FaFilePdf className="w-4 h-4" />;
      case 'contact-form': return <FaEnvelope className="w-4 h-4" />;
      case 'language-switcher': return <FaLanguage className="w-4 h-4" />;
      case 'booking-system': return <FaCalendarAlt className="w-4 h-4" />;
      case 'newsletter-signup': return <FaEnvelope className="w-4 h-4" />;
      case 'file-download': return <FaDownload className="w-4 h-4" />;
      default: return <FaGlobe className="w-4 h-4" />;
    }
  };

  // Get current service item (slider)
  const getCurrentServiceItem = () => {
    return profileData.services[currentServiceSlide];
  };

  // Get current product item (slider)
  const getCurrentProductItem = () => {
    return profileData.products[currentProductSlide];
  };

  // Get current testimonial item (slider)
  const getCurrentTestimonialItem = () => {
    return profileData.testimonials[currentTestimonialSlide];
  };

  // Format working hours
  const formatWorkingHours = (hours) => {
    if (!hours) return "Mon - Fri: 9:00 - 17:00";
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const weekdays = days.slice(0, 5);
    const hasSameHours = weekdays.every(day =>
      hours[day]?.open === hours.monday?.open &&
      hours[day]?.close === hours.monday?.close
    );
    
    if (hasSameHours && hours.monday?.open && hours.monday?.close) {
      return `Mon - Fri: ${hours.monday.open} - ${hours.monday.close}`;
    }
    
    return "Mon - Fri: 9:00 - 17:00";
  };

  // Profile Header Component (Only for Profile Tab)
  const ProfileHeader = () => (
    <div className="pb-4 pt-6 no-bg-border">
      {/* Company Logo and Name */}
      {isFieldAllowed(currentPlan, 'companyLogo') && profileData.companyLogo && (
        <div className="flex justify-center items-center mb-3">
          <div className="flex items-center space-x-2">
            <div className="bg-white rounded-full p-1 shadow-sm">
              <img
                src={profileData.companyLogo}
                alt="Company Logo"
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  console.log('Company logo failed to load');
                  e.target.style.display = 'none';
                }}
              />
            </div>
            {isFieldAllowed(currentPlan, 'companyName') && profileData.companyName && (
              <h4 className="rumaila-font text-sm">
                {profileData.companyName}
              </h4>
            )}
          </div>
        </div>
      )}

      {/* Profile Section */}
      <div className="relative flex flex-col items-center justify-center px-4">
        {/* Profile Photo */}
        <div className="mb-3">
          {isFieldAllowed(currentPlan, 'profilePhoto') && profileData.profilePhoto ? (
            <img
              src={profileData.profilePhoto}
              alt={profileData.name}
              className="w-30 h-30 rounded-full border-3 border-white/20 shadow-lg object-cover"
              onError={(e) => {
                console.log('Profile photo failed to load:', profileData.profilePhoto);
                e.target.style.display = 'none';
              }}
            />
          ) : null}
          {/* Fallback profile picture */}
          {(!profileData.profilePhoto || !isFieldAllowed(currentPlan, 'profilePhoto')) && (
            <div className="w-16 h-16 rounded-full border-3 border-white/20 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold shadow-lg">
              {profileData.name?.charAt(0) || "Z"}
            </div>
          )}
        </div>

        {/* Name */}
        <h1 className="rumaila-font text-4xl font-bold text-center mb-1">
          {profileData.name}
        </h1>

        {/* Designation Box */}
        <div className="mb-2">
          <p className="rumaila-font text-center text-m ">
            {profileData.jobTitle}
          </p>
        </div>

        {/* Tagline Box - Only show if allowed by plan */}
        {isFieldAllowed(currentPlan, 'titleLine') && profileData.titleLine && (
          <div>
            <p className="casper-font text-center text-sm">
              {profileData.titleLine}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // Enhanced UI Components with Rumaila and Casper fonts
  const ProfileTab = () => (
    <div className="space-y-6 px-4 pb-4">
      {/* Profile Header included in scrollable content */}
      <ProfileHeader />

      {/* About Section - Only show if allowed by plan */}
      {isFieldAllowed(currentPlan, 'aboutText') && profileData.aboutText && profileData.aboutText !== "." && (
        <div>
          <div className="mb-3 no-bg-border">
            <h3 className="rumaila-font text-xl flex items-center justify-center">
              <FaUser className="w-5 h-5 text-blue-400 mr-2" />
              About Me
            </h3>
          </div>
          <p className="casper-font text-sm text-justify text-left-last hyphens-auto">
            {profileData.aboutText}
          </p>
        </div>
      )}

      {/* Professional Bio - Fixed text alignment */}
      {isFieldAllowed(currentPlan, 'bio') && profileData.bio && (
        <div>
          <div className="mb-3 no-bg-border">
            <h3 className="rumaila-font text-xl flex items-center justify-center">
              <FaBriefcase className="w-5 h-5 text-purple-400 mr-2" />
              Professional Bio
            </h3>
          </div>
          <div className="bio-text-container">
            <p className="casper-font text-sm bio-text">
              {profileData.bio}
            </p>
          </div>
        </div>
      )}

      {/* Organization Details - Only show if allowed by plan */}
      {(isFieldAllowed(currentPlan, 'foundedName') || isFieldAllowed(currentPlan, 'organization')) && 
       (profileData.foundedName || profileData.organization) && (
        <div>
          <div className="mb-3 no-bg-border">
            <h3 className="rumaila-font text-xl flex items-center justify-center">
              <FaBuilding className="w-5 h-5 text-green-400 mr-2" />
              Organization
            </h3>
          </div>
          <div className="space-y-2 text-center">
            {isFieldAllowed(currentPlan, 'foundedName') && profileData.foundedName && (
              <p className="casper-font text-sm">
                <span className="rumaila-font">Founded:</span> {profileData.foundedName}
              </p>
            )}
            {isFieldAllowed(currentPlan, 'organization') && profileData.organization && (
              <p className="casper-font text-sm">
                <span className="rumaila-font">Organization:</span> {profileData.organization}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Working Hours - Show for all plans */}
      <div>
        <div className="mb-3 no-bg-border">
          <h3 className="rumaila-font text-xl flex items-center justify-center">
            <FaClock className="w-5 h-5 text-yellow-400 mr-2" />
            Working Hours
          </h3>
        </div>
        <p className="casper-font text-sm text-center">
          {formatWorkingHours(profileData.workingHours)}
        </p>
      </div>

      {/* Profile Video - Only show if allowed by plan */}
      {isFieldAllowed(currentPlan, 'profileVideo') && profileData.profileVideo?.url && (
        <div>
          <div className="mb-3 no-bg-border">
            <h3 className="rumaila-font text-xl flex items-center justify-center">
              <FaVideo className="w-5 h-5 text-red-400 mr-2" />
              Introduction Video
            </h3>
          </div>
          <div className="relative rounded-xl overflow-hidden h-40 flex items-center justify-center">
            <video
              src={profileData.profileVideo.url}
              className="w-full h-full object-cover rounded-lg"
              controls
              poster={profileData.profileVideo.thumbnail}
            />
          </div>
          {profileData.profileVideo.title && (
            <p className="casper-font text-sm mt-3 text-center">
              {profileData.profileVideo.title}
            </p>
          )}
        </div>
      )}
    </div>
  );

  const ServicesTab = () => {
    // Check if services or products are allowed for this plan
    const showServices = isFieldAllowed(currentPlan, 'services') && profileData.services.length > 0;
    const showProducts = isFieldAllowed(currentPlan, 'products') && profileData.products.length > 0;

    if (!showServices && !showProducts) {
      return (
        <div className="flex flex-col items-center justify-center h-full px-4 pt-20">
          <FaShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
          <p className="casper-font text-center text-sm">Services & Products not available for your plan</p>
        </div>
      );
    }

    return (
      <div className="space-y-6 px-4 pt-4 pb-4">
        {/* Services Slider - Only show if allowed by plan */}
        {showServices && (
          <div>
            <div className="mb-9 no-bg-border mt-4">
              <h3 className="rumaila-font text-xl flex items-center justify-center">
                <FaShoppingCart className="w-5 h-5 text-blue-400 mr-2" />
                Services
              </h3>
            </div>
            
            {/* Services Slider */}
            <div className="relative overflow-hidden">
              <div className="flex transition-transform duration-300">
                {getCurrentServiceItem() && (
                  <div className="w-full flex-shrink-0">
                    <div className="hover:shadow-2xl transition-all rounded-xl overflow-hidden">
                      {/* Service Image */}
                      {getCurrentServiceItem().image && (
                        <div className="mb-3 rounded-xl overflow-hidden h-36">
                          <img
                            src={getCurrentServiceItem().image}
                            alt={getCurrentServiceItem().name}
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="rumaila-font text-lg">{getCurrentServiceItem().name}</h4>
                          {getCurrentServiceItem().price && (
                            <span className="casper-font text-sm text-blue-600">
                              {getCurrentServiceItem().price}
                            </span>
                          )}
                        </div>
                        {getCurrentServiceItem().description && (
                          <p className="casper-font text-sm mt-2">{getCurrentServiceItem().description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Service Slide Indicators */}
            {profileData.services.length > 1 && (
              <div className="flex justify-center space-x-2 mt-4">
                {Array.from({ length: profileData.services.length }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentServiceSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all transform duration-300 ${
                      index === currentServiceSlide ? 'bg-blue-400 scale-110' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Products Slider - Only show if allowed by plan */}
        {showProducts && (
          <div>
            <div className="mb-4 no-bg-border">
              <h3 className="rumaila-font text-xl flex items-center justify-center">
                <FaGem className="w-5 h-5 text-purple-400 mr-2" />
                Products
              </h3>
            </div>
            
            {/* Products Slider */}
            <div className="relative overflow-hidden">
              <div className="flex transition-transform duration-300">
                {getCurrentProductItem() && (
                  <div className="w-full flex-shrink-0">
                    <div className="hover:shadow-2xl transition-all rounded-xl overflow-hidden">
                      {/* Product Image */}
                      {getCurrentProductItem().image && (
                        <div className="mb-3 rounded-xl overflow-hidden h-36">
                          <img
                            src={getCurrentProductItem().image}
                            alt={getCurrentProductItem().name}
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="rumaila-font text-lg">{getCurrentProductItem().name}</h4>
                          {getCurrentProductItem().price && (
                            <span className="casper-font text-sm text-green-600">
                              {getCurrentProductItem().price}
                            </span>
                          )}
                        </div>
                        {getCurrentProductItem().description && (
                          <p className="casper-font text-sm mt-2">{getCurrentProductItem().description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Product Slide Indicators */}
            {profileData.products.length > 1 && (
              <div className="flex justify-center space-x-2 mt-4">
                {Array.from({ length: profileData.products.length }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProductSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all transform duration-300 ${
                      index === currentProductSlide ? 'bg-purple-400 scale-110' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const ContactTab = () => {
    const primaryPhone = profileData.phones.find(phone => phone.isPrimary) || profileData.phones[0];
    
    return (  
      <div className="space-y-6 px-4 pt-4 pb-4">
        {/* Quick Actions */}
        <div>
          <div className="mb-4 no-bg-border">
            <h3 className="rumaila-font text-xl text-center mt-4">
              <FaPhoneAlt className="w-5 h-5 text-green-400 mr-2 inline" />
              Quick Contact
            </h3>
          </div>
          <div className="flex space-x-2">
            {/* WhatsApp Button */}
            {primaryPhone && profileData.enableWhatsApp && (
              <button
                onClick={() => handleContact("whatsapp", primaryPhone.number)}
                className="flex-1 bg-gray-800 hover:bg-gray-900 text-white rounded-xl py-4 px-4 flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-sm"
              >
                <FaWhatsapp className="w-5 h-5 mr-2" />
                <span className="casper-font font-medium">WhatsApp</span>
              </button>
            )}

            {/* Email Button */}
            {profileData.email && profileData.enableEmail && (
              <button
                onClick={() => handleContact("email", profileData.email)}
                className="flex-1 bg-gray-800 hover:bg-gray-900 text-white rounded-xl py-4 px-4 flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-sm"
              >
                <FaEnvelope className="w-5 h-5 mr-2" />
                <span className="casper-font font-medium">Email</span>
              </button>
            )}

            {/* Websites - For multiple websites, you might want to show only the first one or use a dropdown */}
            {profileData.websites.length > 0 && (
              <button
                onClick={() => handleContact("website", profileData.websites[0].url)}
                className="flex-1 bg-gray-800 hover:bg-gray-900 text-white rounded-xl py-4 px-4 flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-sm"
              >
                <FaGlobe className="w-5 h-5 mr-2" />
                <span className="casper-font font-medium">Website</span>
              </button>
            )}
          </div>
        </div>

        {/* Addresses - Only show if allowed by plan */}
        {isFieldAllowed(currentPlan, 'addresses') && profileData.addresses.length > 0 && (
          <div>
            <div className="mb-4 no-bg-border">
              <h3 className="rumaila-font text-xl text-center">
                <FaMapMarkerAlt className="w-5 h-5 text-red-400 mr-2 inline" />
                Locations
              </h3>
            </div>
            <div className="space-y-3">
              {profileData.addresses.map((address, index) => (
                <div
                  key={index}
                  onClick={() => handleContact("map", address.googleMapsLink)}
                  className="rounded-xl p-4 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 bg-gray-50/10"
                >
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="w-5 h-5 text-red-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="rumaila-font text-sm">
                        {address.label} {address.isPrimary && <span className="text-blue-400">(Primary)</span>}
                      </p>
                      <p className="casper-font text-sm mt-2">
                        {address.fullAddress || `${address.street}, ${address.city}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Links - Increased icon size */}
        {isFieldAllowed(currentPlan, 'socialLinks') && profileData.socialLinks.filter(link => link.url).length > 0 && (
          <div>
            <div className="mb-4 no-bg-border">
              <h3 className="rumaila-font text-xl text-center">
                Follow Me
              </h3>
            </div>
            <div className="flex justify-center space-x-4 flex-wrap">
              {profileData.socialLinks
                .filter(link => link.url)
                .map((social, index) => (
                  <button
                    key={index}
                    onClick={() => handleContact("default", social.url)}
                    className="social-icon-large rounded-full bg-gray-800 shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center text-white hover:text-blue-400 mb-2"
                    title={social.platform}
                  >
                    {getSocialIcon(social.platform)}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const GalleryTab = () => {
    const showGallery = isFieldAllowed(currentPlan, 'gallery') && profileData.gallery.length > 0;
    
    if (!showGallery) {
      return (
        <div className="flex flex-col items-center justify-center h-full px-4 pt-20">
          <FaImages className="w-16 h-16 text-gray-400 mb-4" />
          <p className="casper-font text-center text-sm">Gallery not available for your plan</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4 px-4 pt-4 pb-4">
        <div>
          <div className="mb-4 no-bg-border">
            <h3 className="rumaila-font text-xl flex items-center justify-center">
              <FaImages className="w-5 h-5 text-blue-400 mr-2 mt-4" />
              Gallery
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {profileData.gallery.map((item, index) => (
              <div key={index} className="aspect-square rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <img
                  src={item.url}
                  alt={item.title || `Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const MoreTab = () => {
    // Check what features are available for this plan
    const showTestimonials = isFieldAllowed(currentPlan, 'testimonials') && profileData.testimonials.length > 0;
    const showClientList = isFieldAllowed(currentPlan, 'clientList') && profileData.clientList.length > 0;
    const showDownloads = isFieldAllowed(currentPlan, 'downloads') && profileData.downloads.length > 0;
    const showInteractive = isFieldAllowed(currentPlan, 'interactiveElements') && profileData.interactiveElements.length > 0;
    const showCustomFields = profileData.customFields.length > 0;
    const showQRCode = isFieldAllowed(currentPlan, 'dynamicQRCode') && profileData.dynamicQRCode?.targetUrl;
    const showNFC = isFieldAllowed(currentPlan, 'nfcSettings') && profileData.nfcSettings?.isEnabled;

    const hasContent = showTestimonials || showClientList || showDownloads || showInteractive || 
                      showCustomFields || showQRCode || showNFC;

    if (!hasContent) {
      return (
        <div className="flex flex-col items-center justify-center h-full px-4 pt-20">
          <FaEllipsisH className="w-16 h-16 text-gray-400 mb-4" />
          <p className="casper-font text-center text-sm">No additional features available for your plan</p>
        </div>
      );
    }

    return (
      <div className="space-y-6 px-4 pt-4 pb-4">
        {/* Testimonials Slider - Only show if allowed by plan */}
        {showTestimonials && (
          <div>
            <div className="mb-4 no-bg-border">
              <h3 className="rumaila-font text-xl flex items-center justify-center">
                <FaStar className="w-5 h-5 text-yellow-400 mr-2 mt-4" />
                Testimonials
              </h3>
            </div>
            
            {/* Testimonials Slider */}
            <div className="relative overflow-hidden">
              <div className="flex transition-transform duration-300">
                {getCurrentTestimonialItem() && (
                  <div className="w-full flex-shrink-0">
                    <div className="rounded-xl p-4 bg-gray-50/10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="rumaila-font text-lg">
                          {getCurrentTestimonialItem().clientName}
                        </span>
                        {getCurrentTestimonialItem().rating && (
                          <div className="flex space-x-1">
                            {renderStars(getCurrentTestimonialItem().rating)}
                          </div>
                        )}
                      </div>
                      <p className="casper-font text-sm italic mb-3">
                        "{getCurrentTestimonialItem().testimonial}"
                      </p>
                      {getCurrentTestimonialItem().company && (
                        <p className="casper-font text-sm">
                          {getCurrentTestimonialItem().company}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Testimonial Slide Indicators */}
            {profileData.testimonials.length > 1 && (
              <div className="flex justify-center space-x-2 mt-4">
                {Array.from({ length: profileData.testimonials.length }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonialSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all transform duration-300 ${
                      index === currentTestimonialSlide ? 'bg-yellow-400 scale-110' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Client List - Only show if allowed by plan */}
        {showClientList && (
          <div>
            <div className="mb-4 no-bg-border">
              <h3 className="rumaila-font text-xl flex items-center justify-center">
                <FaUserFriends className="w-5 h-5 text-blue-400 mr-2 " />
                Our Clients
              </h3>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {profileData.clientList.map((client, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Downloads - Only show if allowed by plan */}
        {showDownloads && (
          <div>
            <div className="mb-4 no-bg-border">
              <h3 className="rumaila-font text-xl flex items-center justify-center">
                <FaDownload className="w-5 h-5 text-green-400 mr-2" />
                Downloads
              </h3>
            </div>
            <div className="space-y-3">
              {profileData.downloads.map((download, index) => (
                <div
                  key={index}
                  onClick={() => handleContact("default", download.fileUrl)}
                  className="rounded-xl p-4 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 bg-gray-50/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaFilePdf className="w-6 h-6 text-red-400 mr-4" />
                      <div>
                        <p className="rumaila-font text-sm">{download.name}</p>
                        {download.fileSize && (
                          <p className="casper-font text-sm mt-1">{download.fileSize}</p>
                        )}
                      </div>
                    </div>
                    <FaDownload className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Elements - Only show if allowed by plan */}
        {showInteractive && (
          <div>
            <div className="mb-4 no-bg-border">
              <h3 className="rumaila-font text-xl flex items-center justify-center">
                <FaHeadset className="w-5 h-5 text-purple-400 mr-2" />
                Quick Actions
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {profileData.interactiveElements
                .filter(element => element.isActive)
                .map((element, index) => {
                  const primaryPhone = profileData.phones.find(phone => phone.isPrimary) || profileData.phones[0];
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        switch (element.type) {
                          case 'call-to-action':
                            if (primaryPhone) handleContact("phone", primaryPhone.number);
                            break;
                          case 'live-chat':
                            if (primaryPhone) handleContact("whatsapp", primaryPhone.number);
                            break;
                          case 'contact-form':
                            if (profileData.email) handleContact("email", profileData.email);
                            break;
                          default:
                            break;
                        }
                      }}
                      className="flex flex-col items-center justify-center p-4 rounded-xl hover:shadow-xl transition-all transform hover:scale-105 bg-gray-50/10"
                    >
                      <div className="text-blue-400 mb-3">
                        {getInteractiveElementIcon(element.type)}
                      </div>
                      <span className="casper-font text-sm text-center">
                        {element.type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>
        )}

        {/* Custom Fields - Show for all if they exist */}
        {showCustomFields && (
          <div>
            <div className="mb-4 no-bg-border">
              <h3 className="rumaila-font text-xl flex items-center justify-center">
                <FaInfoCircle className="w-5 h-5 text-green-400 mr-2" />
                Additional Information
              </h3>
            </div>
            <div className="space-y-3">
              {profileData.customFields.map((field, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-300/20">
                  <span className="rumaila-font text-sm">{field.label}:</span>
                  <span className="casper-font text-sm">{field.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QR Code - Only show if allowed by plan */}
        {showQRCode && (
          <div>
            <div className="mb-4 no-bg-border">
              <h3 className="rumaila-font text-xl flex items-center justify-center">
                <FaQrcode className="w-5 h-5 text-blue-400 mr-2" />
                QR Code
              </h3>
            </div>
            <div className="flex justify-center">
              <div className="p-4 bg-white/10 rounded-xl">
                {profileData.dynamicQRCode.qrImage ? (
                  <img
                    src={profileData.dynamicQRCode.qrImage}
                    alt="QR Code"
                    className="w-32 h-32 object-contain"
                  />
                ) : (
                  <div className="w-32 h-32 bg-white/10 flex items-center justify-center text-gray-400 rounded-lg">
                    QR Code
                  </div>
                )}
              </div>
            </div>
            <p className="casper-font text-center text-sm mt-3">Scan to save contact</p>
          </div>
        )}

        {/* NFC Badge - Only show if allowed by plan */}
        {showNFC && (
          <div>
            <div className="mb-3 no-bg-border">
              <h3 className="rumaila-font text-xl flex items-center justify-center">
                <FaShieldAlt className="w-5 h-5 text-blue-400 mr-2" />
                NFC Enabled
              </h3>
            </div>
            <div className="flex justify-center">
              <div className="inline-flex items-center space-x-3 px-6 py-3 bg-blue-600 text-white rounded-full text-sm">
                <FaIdCard className="w-5 h-5" />
                <span className="rumaila-font">Tap to Connect</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const primaryPhone = profileData.phones.find(phone => phone.isPrimary) || profileData.phones[0];

  return (
    <div className="mobile-container mx-auto shadow-2xl rounded-3xl overflow-hidden relative">
      <div className="tab-content-wrapper h-full">
        {/* Tab Content - Scrollable with specific content for each tab */}
        <div className="tab-content relative">
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'services' && <ServicesTab />}
          {activeTab === 'contact' && <ContactTab />}
          {activeTab === 'gallery' && <GalleryTab />}
          {activeTab === 'more' && <MoreTab />}
        </div>

        {/* Bottom Navigation Bar - Sticky inside container */}
        <div className="sticky-bottom-nav">
          <div className="backdrop-blur-xl border-t border-white/10">
            <div className="flex justify-between items-center px-4 py-3">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'text-blue-400 transform scale-110' 
                      : 'text-white/60 hover:text-white'
                  }`}
                  title={tab.tooltip}
                >
                  <tab.icon className="w-5 h-5 mb-1" />
                  <span className="text-[10px] truncate max-w-12 casper-font">
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Call Button - Inside container at fixed position */}
        {primaryPhone && (
          <div className="absolute bottom-20 right-4 z-20">
            <button
              onClick={() => handleContact("phone", primaryPhone.number)}
              className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all transform hover:scale-110 border border-green-400/30"
            >
              <FaPhoneAlt className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LightCard;