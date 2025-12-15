import React, { useState, useEffect, useRef } from 'react';
import { 
  FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, 
  FaMapMarkerAlt, FaChevronRight, FaGlobe, 
  FaPhoneAlt, FaWhatsapp, FaUserFriends, 
  FaBuilding, FaVideo, FaImage, FaShoppingCart, 
  FaGem, FaStar, FaDownload, FaQrcode, 
  FaShieldAlt, FaInfoCircle, FaCrown, 
  FaBriefcase, FaCalendarAlt, FaHeadset,
  FaFilePdf, FaIdCard, FaChevronLeft, FaChevronRight as FaChevronRightIcon
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const ModernCard = ({ cardData = {}, plan = 'Business Premium' }) => {
  console.log('📱 ModernCard received data:', cardData);
  console.log('📋 Active plan:', plan);
  
  // Plan configuration
  const planConfig = {
    'Personal': {
      allowedSections: ['basicInfo', 'about', 'social'],
      showCheckUsOut: false,
      showBrandLabel: false,
      showVideo: false,
      showGallery: false,
      showServices: false,
      showTestimonials: false,
      showTeam: false,
      showContactIcons: false
    },
    'Business': {
      allowedSections: ['basicInfo', 'about', 'social', 'checkUsOut', 'video', 'gallery', 'testimonials'],
      showCheckUsOut: true,
      showBrandLabel: false,
      showVideo: true,
      showGallery: true,
      showServices: false,
      showTestimonials: true,
      showTeam: false,
      showContactIcons: true
    },
    'Business Premium': {
      allowedSections: ['basicInfo', 'about', 'social', 'checkUsOut', 'brandLabel', 'video', 'gallery', 'services', 'testimonials', 'team'],
      showCheckUsOut: true,
      showBrandLabel: true,
      showVideo: true,
      showGallery: true,
      showServices: true,
      showTestimonials: true,
      showTeam: true,
      showContactIcons: true
    }
  };
  
  const currentPlan = planConfig[plan] || planConfig['Business Premium'];
  
  // Build profileData from cardData with proper fallbacks
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
    websites: cardData?.websites || [{ url: "" }],
    addresses: cardData?.addresses || [{ 
      fullAddress: "",
      isPrimary: true,
      googleMapsLink: "https://maps.google.com"
    }],
   
    // Profile Content
    profileVideo: cardData?.profileVideo,
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
    socialLinks: cardData?.socialLinks || [
      { platform: 'linkedin', url: 'https://linkedin.com/in/lucydiamond' },
      { platform: 'twitter', url: 'https://twitter.com/lucydiamond' },
      { platform: 'instagram', url: 'https://instagram.com/lucydiamond' }
    ],
    profilePhoto: cardData?.profilePhoto || "https://images.unsplash.com/photo-1494790108755-2616b786d4d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80&fit=facearea&facepad=3",
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

    // Additional Fields
    customFields: cardData?.customFields || [],
    dynamicQRCode: cardData?.dynamicQRCode || null,
    nfcSettings: cardData?.nfcSettings || { isEnabled: false },
   
    // Settings
    enableOneTapCall: cardData?.enableOneTapCall !== undefined ? cardData.enableOneTapCall : true,
    enableWhatsApp: cardData?.enableWhatsApp !== undefined ? cardData.enableWhatsApp : true,
    enableEmail: cardData?.enableEmail !== undefined ? cardData.enableEmail : true
  };

  // State for sliders
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentServiceSlide, setCurrentServiceSlide] = useState(0);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);

  // Auto slide intervals
  useEffect(() => {
    const serviceInterval = currentPlan.showServices && profileData.services.length > 1 ? setInterval(() => {
      setCurrentServiceSlide(prev => (prev + 1) % profileData.services.length);
    }, 4000) : null;

    const productInterval = currentPlan.showServices && profileData.products.length > 1 ? setInterval(() => {
      setCurrentProductSlide(prev => (prev + 1) % profileData.products.length);
    }, 4000) : null;

    const testimonialInterval = currentPlan.showTestimonials && profileData.testimonials.length > 1 ? setInterval(() => {
      setCurrentTestimonialSlide(prev => (prev + 1) % profileData.testimonials.length);
    }, 5000) : null;

    return () => {
      if (serviceInterval) clearInterval(serviceInterval);
      if (productInterval) clearInterval(productInterval);
      if (testimonialInterval) clearInterval(testimonialInterval);
    };
  }, [profileData.services.length, profileData.products.length, profileData.testimonials.length, currentPlan]);

  // Contact handlers
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

  // Gallery navigation
  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === Math.ceil(profileData.gallery.length / 3) - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? Math.ceil(profileData.gallery.length / 3) - 1 : prev - 1
    );
  };

  // Helper functions
  const primaryPhone = profileData.phones.find(phone => phone.isPrimary) || profileData.phones[0];
  const primaryAddress = profileData.addresses.find(addr => addr.isPrimary) || profileData.addresses[0];

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'facebook': return <FaLinkedin />;
      case 'instagram': return <FaInstagram />;
      case 'twitter': return <FaXTwitter />;
      case 'linkedin': return <FaLinkedin />;
      case 'whatsapp': return <FaWhatsapp />;
      default: return <FaGlobe />;
    }
  };

  const getCurrentSlideImages = () => {
    const startIndex = currentSlide * 3;
    return profileData.gallery.slice(startIndex, startIndex + 3);
  };

  const getCurrentServiceItem = () => {
    return profileData.services[currentServiceSlide];
  };

  const getCurrentProductItem = () => {
    return profileData.products[currentProductSlide];
  };

  const getCurrentTestimonialItem = () => {
    return profileData.testimonials[currentTestimonialSlide];
  };

  const totalSlides = Math.ceil(profileData.gallery.length / 3);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  return (
    <>
      {/* Global styles */}
      <style jsx global>{`
        /* Import fonts */
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Montserrat:wght@400;500;600;700&display=swap');
        
        /* Rumaila-like font for headings */
        .rumaila-font {
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          color: #000000;
        }
        
        /* Casper-like font for body text */
        .casper-font {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
        }
        
        /* Hide scrollbars */
        ::-webkit-scrollbar {
          width: 0px;
          height: 0px;
          background: transparent;
        }
        
        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        html, body {
          overflow: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div 
        className="min-h-screen flex items-center justify-center p-6 overflow-auto"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontFamily: "'Poppins', sans-serif",
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          height: '100vh',
          width: '100vw',
          overflow: 'auto',
          padding: '20px'
        }}
      >
        {/* Main Card Container */}
        <div 
          className="bg-white rounded-3xl shadow-2xl overflow-hidden relative w-full max-w-[420px]"
          style={{
            height: 'auto',
            minHeight: '680px',
            maxHeight: '90vh',
            fontFamily: "'Poppins', sans-serif",
            WebkitFontSmoothing: 'antialiased',
            overflow: 'hidden',
            margin: 'auto'
          }}
        >
          {/* Scrollable Content Area */}
          <div 
            className="overflow-y-auto"
            style={{
              height: '100%',
              maxHeight: '90vh',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Hide scrollbar */}
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Header with gradient background */}
            <div 
              className="h-60 relative"
              style={{
                background: 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)',
                height: '200px'
              }}
            >
              {/* Company Logo - Only show for Business and Business Premium */}
              {(currentPlan.showCheckUsOut && (profileData.companyLogo || profileData.companyName)) && (
                <div className="absolute top-4 left-0 right-0 text-center">
                  <div className="flex flex-col items-center justify-center">
                    {profileData.companyLogo && (
                      <img
                        src={profileData.companyLogo}
                        alt="Company Logo"
                        className="w-10 h-10 object-contain"
                      />
                    )}
                    {profileData.companyName && (
                      <h3 className="text-xs text-white/70 mt-1">
                        {profileData.companyName}
                      </h3>
                    )}
                  </div>
                </div>
              )}

              {/* Profile Photo with Background Color */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 z-10">
                <div 
                  className="rounded-full border-4 border-white overflow-hidden shadow-2xl relative"
                  style={{
                    width: '140px',
                    height: '140px',
                    backgroundColor: '#ffffff'
                  }}
                >
                  {/* White background layer */}
                  <div className="absolute inset-0 bg-white"></div>
                  
                  {/* Profile image */}
                  <img 
                    src={profileData.profilePhoto}
                    alt={profileData.name}
                    className="w-full h-full object-cover relative z-10"
                    style={{ objectPosition: 'center 20%' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.style.backgroundColor = '#667eea';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div 
              className="pt-20 pb-10 px-8"
              style={{
                position: 'relative',
                paddingTop: '80px'
              }}
            >
              {/* Name and Designation */}
              <div className="text-center mb-8">
                <h1 
                  className="tracking-tight mb-2"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '28px',
                    lineHeight: '1.2',
                    marginBottom: '8px',
                    fontWeight: 500,
                    letterSpacing: '-0.5px',
                    color: '#000000'
                  }}
                >
                  {profileData.name}
                </h1>
                <p 
                  className="mb-3"
                  style={{
                    fontSize: '18px',
                    marginBottom: '8px',
                    fontWeight: 400,
                    letterSpacing: '0.2px',
                    color: '#000000'
                  }}
                >
                  {profileData.jobTitle}
                </p>
                
                {/* Location - Added after designation with margin bottom */}
                {primaryAddress && primaryAddress.fullAddress && (
                  <div className="flex items-center justify-center text-gray-500 mb-12" style={{ 
                    fontSize: '16px', 
                    fontWeight: 400,
                    fontFamily: "'Poppins', sans-serif"
                  }}>
                    <FaMapMarkerAlt className="mr-3" style={{ fontSize: '16px' }} />
                    <span>{primaryAddress.fullAddress}</span>
                  </div>
                )}

                {/* Exchange Contact Button WITHOUT hover options */}
                {/* <div className="flex justify-center mb-8">
                  <button 
                    className="px-14 py-4 text-white rounded-full shadow-lg transition-all duration-300 relative"
                    style={{
                      background: 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)',
                      fontSize: '16px',
                      minWidth: '260px',
                      fontWeight: 400,
                      letterSpacing: '0.3px',
                      fontFamily: "'Poppins', sans-serif"
                    }}
                    onClick={() => {
                      // Default action - open email or primary contact
                      if (profileData.email) {
                        handleContact("email", profileData.email);
                      } else if (primaryPhone?.number) {
                        handleContact("phone", primaryPhone.number);
                      }
                    }}
                  >
                    Exchange Contact
                  </button>
                </div> */}

                {/* Contact Icons - Directly below button (for Business and Business Premium) */}
                {currentPlan.showContactIcons && (
                  <div className="flex justify-center space-x-6 mb-16">
                    {/* WhatsApp Icon */}
                    {primaryPhone && primaryPhone.number && profileData.enableWhatsApp && (
                      <button
                        onClick={() => handleContact("whatsapp", primaryPhone.number)}
                        className="flex flex-col items-center justify-center"
                        title="WhatsApp"
                      >
                        <div 
                          className="rounded-full flex items-center justify-center text-white mb-1"
                          style={{
                            width: '46px',
                            height: '44px',
                            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)'
                          }}
                        >
                          <FaWhatsapp className="w-5 h-5" />
                        </div>
                        <span className="text-xs text-gray-600">WhatsApp</span>
                      </button>
                    )}

                    {/* Call Icon */}
                    {primaryPhone && primaryPhone.number && profileData.enableOneTapCall && (
                      <button
                        onClick={() => handleContact("phone", primaryPhone.number)}
                        className="flex flex-col items-center justify-center"
                        title="Call"
                      >
                        <div 
                          className="rounded-full flex items-center justify-center text-white mb-1"
                          style={{
                            width: '46px',
                            height: '44px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)'
                          }}
                        >
                          <FaPhoneAlt className="w-5 h-5" />
                        </div>
                        <span className="text-xs text-gray-600">Call</span>
                      </button>
                    )}

                    {/* Email Icon */}
                    {profileData.email && profileData.enableEmail && (
                      <button
                        onClick={() => handleContact("email", profileData.email)}
                        className="flex flex-col items-center justify-center"
                        title="Email"
                      >
                        <div 
                          className="rounded-full flex items-center justify-center text-white mb-1"
                          style={{
                            width: '46px',
                            height: '44px',
                            background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)'
                          }}
                        >
                          <FaEnvelope className="w-5 h-5" />
                        </div>
                        <span className="text-xs text-gray-600">Email</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Title Line / Recognition - Only for Business and Business Premium */}
              {currentPlan.showCheckUsOut && profileData.titleLine && (
                <div
                  className="relative rounded-full w-80 h-13 px-6 py-3 flex items-center justify-center mt-0 mx-auto mb-10"
                  style={{
                    fontFamily: "Zona Pro, sans-serif",
                  }}
                >
                  <div className="absolute inset-0 rounded-full w-80 h-13 border-2 border-black"></div>
                  <div className="relative text-center z-10">
                    <FaCrown className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                    <p className="text-black font-semibold text-sm tracking-wide px-3">
                      {profileData.titleLine}
                    </p>
                  </div>
                </div>
              )}

              {/* ABOUT Section - Show for all plans */}
              <div className="mb-16">
                <h2 
                  className="mb-10 text-center"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '22px',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    color: '#000000'
                  }}
                >
                  ABOUT
                </h2>
                
                {/* Display Bio in ABOUT section */}
                {profileData.bio && (
                  <div className="mb-8">
                    <div 
                      className="text-left mx-auto"
                      style={{
                        maxWidth: '340px',
                        padding: '0 10px'
                      }}
                    >
                      <p 
                        style={{ 
                          fontSize: '15px', 
                          lineHeight: '1.7',
                          fontWeight: 400,
                          fontFamily: "'Poppins', sans-serif",
                          color: '#374151',
                          textAlign: 'justify',
                          textAlignLast: 'left',
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word'
                        }}
                      >
                        {profileData.bio}
                      </p>
                    </div>
                  </div>
                )}

                {/* Description text */}
                {profileData.aboutText && profileData.aboutText !== "." && (
                  <div className="mt-6">
                    <div 
                      className="text-left mx-auto"
                      style={{
                        maxWidth: '340px',
                        padding: '0 10px'
                      }}
                    >
                      <p 
                        style={{ 
                          fontSize: '15px', 
                          lineHeight: '1.7',
                          fontWeight: 400,
                          fontFamily: "'Poppins', sans-serif",
                          color: '#374151',
                          textAlign: 'justify',
                          textAlignLast: 'left',
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word'
                        }}
                      >
                        {profileData.aboutText}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* CHECK US OUT Section - Only for Business and Business Premium */}
              {currentPlan.showCheckUsOut && (
                <div className="mb-16">
                  <h2 
                    className="mb-10 text-center"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '22px',
                      fontWeight: 500,
                      letterSpacing: '0.5px',
                      color: '#000000'
                    }}
                  >
                    CHECK US OUT
                  </h2>
                  
                  {/* Learn More button */}
                  <div className="flex justify-center mb-10">
                    <button 
                      className="flex items-center justify-between px-10 py-4 border-2 border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300 group active:scale-95"
                      style={{
                        fontSize: '15px',
                        minWidth: '300px',
                        fontWeight: 400,
                        borderWidth: '2px',
                        fontFamily: "'Poppins', sans-serif"
                      }}
                      onClick={() => {
                        if (profileData.websites[0]?.url) {
                          handleContact("website", profileData.websites[0].url);
                        }
                      }}
                    >
                      <span>Learn More About Our Company</span>
                      <FaChevronRight className="ml-4 group-hover:translate-x-2 transition-transform" style={{ fontSize: '14px' }} />
                    </button>
                  </div>

                  {/* Website link */}
                  {profileData.websites[0]?.url && (
                    <div className="flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors cursor-pointer mb-12" style={{
                      fontFamily: "'Poppins', sans-serif"
                    }}
                    onClick={() => handleContact("website", profileData.websites[0].url)}>
                      <FaGlobe className="mr-3" style={{ fontSize: '16px' }} />
                      <span style={{ fontSize: '16px', fontWeight: 400 }}>
                        {profileData.websites[0]?.url?.replace('https://', '').replace('http://', '').split('/')[0] || 'www.ny-software.co'}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Brand Label - Only for Business Premium */}
              {currentPlan.showBrandLabel && profileData.brandLabel && (
                <div className="text-center mb-16">
                  <h3
                    className="text-base font-semibold text-black flex justify-center items-center mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <FaGem className="w-4 h-4 text-blue-400 mr-2" />
                    Brand Label
                  </h3>
                  <div className="relative rounded-xl w-80 h-14 flex items-center justify-center mt-2 mx-auto">
                    <div className="absolute inset-0 rounded-full border-2 border-gray-300"></div>
                    <div className="relative text-center z-10">
                      <p className="text-black font-semibold text-sm tracking-wide">
                        {profileData.brandLabel}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Video Section - Only for Business and Business Premium */}
              {currentPlan.showVideo && profileData.profileVideo?.url && (
                <div className="text-center mb-16">
                  <h3
                    className="text-base font-semibold text-black flex justify-center items-center mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <FaVideo className="w-4 h-4 text-blue-400 mr-2" />
                    Introduction Video
                  </h3>
                  <div className="relative rounded-lg overflow-hidden h-40 bg-gray-100 flex items-center justify-center">
                    <video
                      src={profileData.profileVideo.url}
                      className="w-full h-full object-contain"
                      controls
                      poster={profileData.profileVideo.thumbnail}
                    />
                  </div>
                </div>
              )}

              {/* Gallery Section - Only for Business and Business Premium */}
              {currentPlan.showGallery && profileData.gallery.length > 0 && (
                <div className="text-center mb-16">
                  <h3
                    className="text-base font-semibold text-black flex justify-center items-center mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <FaImage className="w-4 h-4 text-blue-400 mr-2" />
                    Gallery
                  </h3>
                  <div className="space-y-2">
                    {/* Top Image */}
                    {getCurrentSlideImages()[0] && (
                      <div className="relative rounded-lg overflow-hidden h-40">
                        <img
                          src={getCurrentSlideImages()[0].url}
                          alt={getCurrentSlideImages()[0].title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Bottom 2 Images */}
                    <div className="grid grid-cols-2 gap-2">
                      {getCurrentSlideImages().slice(1, 3).map((item, index) => (
                        <div
                          key={index}
                          className="relative rounded-lg overflow-hidden h-28"
                        >
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  {profileData.gallery.length > 3 && (
                    <div className="flex justify-center items-center space-x-3 mt-2">
                      <button
                        onClick={prevSlide}
                        className="bg-gray-200 hover:bg-gray-300 text-black rounded-full p-1 shadow w-6 h-6 flex items-center justify-center"
                      >
                        <FaChevronLeft className="w-2 h-2" />
                      </button>

                      {/* Slide Indicators */}
                      <div className="flex space-x-1">
                        {Array.from({ length: totalSlides }, (_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full ${
                              index === currentSlide ? 'bg-blue-400' : 'bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={nextSlide}
                        className="bg-gray-200 hover:bg-gray-300 text-black rounded-full p-1 shadow w-6 h-6 flex items-center justify-center"
                      >
                        <FaChevronRightIcon className="w-2 h-2" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Services Section - Only for Business Premium */}
              {currentPlan.showServices && profileData.services.length > 0 && (
                <div className="text-center mb-16">
                  <h3
                    className="text-base font-semibold text-black flex justify-center items-center mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <FaShoppingCart className="w-4 h-4 text-blue-400 mr-2" />
                    Services
                  </h3>
                  {getCurrentServiceItem() && (
                    <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 max-w-[340px] mx-auto">
                      <h4 className="font-medium text-black mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {getCurrentServiceItem().name}
                      </h4>
                      <p className="text-gray-600 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {getCurrentServiceItem().description}
                      </p>
                      {getCurrentServiceItem().price && (
                        <p className="text-black font-bold mt-2">
                          ${getCurrentServiceItem().price}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Testimonials Section - Only for Business and Business Premium */}
              {currentPlan.showTestimonials && profileData.testimonials.length > 0 && (
                <div className="text-center mb-16">
                  <h3
                    className="text-base font-semibold text-black flex justify-center items-center mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <FaStar className="w-4 h-4 text-blue-400 mr-2" />
                    Testimonials
                  </h3>
                  {getCurrentTestimonialItem() && (
                    <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 max-w-[340px] mx-auto">
                      <div className="flex space-x-0.5 mb-2 justify-center">
                        {renderStars(getCurrentTestimonialItem().rating || 5)}
                      </div>
                      <p className="text-gray-600 text-sm italic" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        "{getCurrentTestimonialItem().testimonial}"
                      </p>
                      <p className="text-black font-medium mt-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        - {getCurrentTestimonialItem().clientName}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* GET IN TOUCH Section - Social Media Icons */}
              <div className="mb-16">
                <h2 
                  className="mb-10 text-center"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '22px',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    color: '#000000'
                  }}
                >
                  GET IN TOUCH
                </h2>
                
                {/* Social icons */}
                <div className="flex justify-center space-x-8 mb-12">
                  {profileData.socialLinks
                    .filter(link => link.url)
                    .map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full flex items-center justify-center text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 active:scale-95"
                        style={{
                          width: '55px',
                          height: '55px',
                          background: social.platform === 'linkedin' 
                            ? 'linear-gradient(135deg, #0077b5 0%, #005582 100%)'
                            : social.platform === 'twitter'
                            ? 'linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%)'
                            : social.platform === 'instagram'
                            ? 'linear-gradient(135deg, #e1306c 0%, #c13584 100%)'
                            : 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)'
                        }}
                        aria-label={social.platform}
                      >
                        {getSocialIcon(social.platform)}
                      </a>
                    ))}
                </div>
              </div>

              {/* OUR TEAM Section - Only for Business Premium */}
              {currentPlan.showTeam && profileData.clientList.length > 0 && (
                <div className="pt-8 border-t border-gray-200 pb-12">
                  <h2 
                    className="mb-10 text-center"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '22px',
                      fontWeight: 500,
                      letterSpacing: '0.5px',
                      color: '#000000'
                    }}
                  >
                    OUR TEAM
                  </h2>
                  
                  <div className="flex items-center justify-center">
                    <div className="flex -space-x-4 mr-8">
                      {profileData.clientList.slice(0, 3).map((client, index) => (
                        <div 
                          key={index} 
                          className="rounded-full border-3 border-white overflow-hidden shadow-md"
                          style={{ 
                            width: '55px', 
                            height: '55px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          }}
                        >
                          <div className="w-full h-full flex items-center justify-center text-white text-sm">
                            {(client?.name || client)?.charAt(0)?.toUpperCase() || "T"}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="ml-3">
                      <div 
                        className="rounded-full border-3 border-white shadow-md flex items-center justify-center"
                        style={{
                          width: '55px',
                          height: '55px',
                          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
                        }}
                      >
                        <span 
                          style={{ 
                            fontSize: '14px',
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 400,
                            color: '#6b7280'
                          }}
                        >
                          +{Math.max(0, profileData.clientList.length - 3)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="ml-10">
                      <span 
                        style={{ 
                          fontSize: '20px',
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 500,
                          letterSpacing: '0.3px',
                          color: '#000000'
                        }}
                      >
                        Team
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Decorative bottom border */}
              <div 
                className="h-2 w-full"
                style={{
                  background: 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModernCard;