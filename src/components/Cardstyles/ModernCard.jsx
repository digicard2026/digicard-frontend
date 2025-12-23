import React, { useState, useEffect } from 'react';
import { 
  FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, 
  FaMapMarkerAlt, FaChevronRight, FaGlobe, 
  FaPhoneAlt, FaWhatsapp, FaUserFriends, 
  FaBuilding, FaVideo, FaImage, FaShoppingCart, 
  FaGem, FaStar, FaDownload, FaQrcode, 
  FaShieldAlt, FaInfoCircle, FaCrown, 
  FaBriefcase, FaCalendarAlt, FaHeadset,
  FaFilePdf, FaIdCard, FaChevronLeft, FaChevronRight as FaChevronRightIcon,
  FaTags, FaFileAlt, FaFileInvoice, FaRegClock,
  FaFileVideo, FaRobot, FaCommentDots, FaBullhorn,
  FaClipboardList, FaSuitcase, FaUsers, FaCogs,
  FaBullseye, FaRocket, FaHandHoldingUsd, FaBook,
  FaHistory, FaCheckCircle, FaLightbulb, FaAward,
  FaHandshake, FaChartLine, FaEllipsisH, FaCreditCard,
  FaLanguage, FaShare
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

// Video player component with S3 fix
const VideoPlayer = ({ src, poster, title, className = "" }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Fix S3 video URL for proper playback
  const getVideoUrl = (url) => {
    if (!url) return '';
    
    // If it's an S3 URL, ensure it has proper content-type headers
    if (url.includes('amazonaws.com') || url.includes('s3.') || url.includes('.s3.')) {
      // Add query parameters to force video/mp4 content type
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}response-content-disposition=inline&response-content-type=video%2Fmp4`;
    }
    
    return url;
  };
  
  const videoUrl = getVideoUrl(src);
  
  const handleError = (e) => {
    console.error('Video playback error:', e);
    setError(true);
    setLoading(false);
  };
  
  const handleLoadStart = () => {
    setLoading(true);
  };
  
  const handleLoadedData = () => {
    setLoading(false);
  };
  
  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gray-800 rounded-lg ${className}`}>
        <FaVideo className="w-12 h-12 text-gray-400 mb-2" />
        <p className="text-sm text-gray-400">Video failed to load</p>
        <p className="text-xs text-gray-500 mt-1">{title}</p>
      </div>
    );
  }
  
  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
        </div>
      )}
      
      <video
        src={videoUrl}
        className="w-full h-full object-contain rounded-lg"
        controls
        playsInline
        preload="metadata"
        poster={poster}
        onError={handleError}
        onLoadStart={handleLoadStart}
        onLoadedData={handleLoadedData}
        onCanPlay={handleLoadedData}
        crossOrigin="anonymous"
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      
      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <p className="casper-font text-sm text-white">{title}</p>
        </div>
      )}
    </div>
  );
};

const ModernCard = ({ cardData = {}, plan = 'BusinessPremium' }) => {
  console.log('📱 ModernCard received data:', cardData);
  console.log('📋 Active plan:', plan);
  
  // Enhanced Plan configuration with ALL FIELDS from config
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
      showContactIcons: false,
      showBusinessHours: false,
      showVirtualNumber: false,
      showCatalogPDF: false,
      showProductVideo: false,
      showVideos: false,
      showMultipleEmails: false,
      showNFCCard: false,
      showDownloads: false,
      showInteractive: false,
      showCustomFields: false,
      showQRCode: false,
      showOrganization: false,
      showServicesProducts: false,
      showShareableUrl: false,
      showNfcSettings: false,
      showProductRangeDisplay: false,
      showBusinessCardInstagram: false,
      showTextbooks: false,
      showChatAssistant: false
    },
    'Business': {
      allowedSections: ['basicInfo', 'about', 'social', 'checkUsOut', 'video', 'gallery', 'testimonials', 'organization', 'servicesProducts', 'businessHours', 'catalogPDF', 'productVideo', 'videos', 'multipleEmails', 'downloads', 'qrCode'],
      showCheckUsOut: true,
      showBrandLabel: false,
      showVideo: true,
      showGallery: true,
      showServices: false,
      showTestimonials: true,
      showTeam: false,
      showContactIcons: true,
      showBusinessHours: true,
      showVirtualNumber: true,
      showCatalogPDF: true,
      showProductVideo: true,
      showVideos: true,
      showMultipleEmails: true,
      showNFCCard: false,
      showDownloads: true,
      showInteractive: false,
      showCustomFields: true,
      showQRCode: true,
      showOrganization: true,
      showServicesProducts: true,
      showShareableUrl: true,
      showNfcSettings: false,
      showProductRangeDisplay: true,
      showBusinessCardInstagram: true,
      showTextbooks: true,
      showChatAssistant: false
    },
    'BusinessPremium': {
      allowedSections: ['basicInfo', 'about', 'social', 'checkUsOut', 'brandLabel', 'video', 'gallery', 'services', 'testimonials', 'team', 'organization', 'servicesProducts', 'businessHours', 'catalogPDF', 'productVideo', 'videos', 'multipleEmails', 'nfcCard', 'downloads', 'interactive', 'customFields', 'qrCode'],
      showCheckUsOut: true,
      showBrandLabel: true,
      showVideo: true,
      showGallery: true,
      showServices: true,
      showTestimonials: true,
      showTeam: true,
      showContactIcons: true,
      showBusinessHours: true,
      showVirtualNumber: true,
      showCatalogPDF: true,
      showProductVideo: true,
      showVideos: true,
      showMultipleEmails: true,
      showNFCCard: true,
      showDownloads: true,
      showInteractive: true,
      showCustomFields: true,
      showQRCode: true,
      showOrganization: true,
      showServicesProducts: true,
      showShareableUrl: true,
      showNfcSettings: true,
      showProductRangeDisplay: true,
      showBusinessCardInstagram: true,
      showTextbooks: true,
      showChatAssistant: true
    }
  };
  
  const currentPlan = planConfig[plan] || planConfig['BusinessPremium'];
  
  // Build profileData from cardData with ALL fields using MODEL FIELD NAMES
  const profileData = {
    // Personal Info
    prefix: cardData?.prefix || "",
    firstName: cardData?.firstName || "",
    lastName: cardData?.lastName || "",
    suffix: cardData?.suffix || "",
    name: `${cardData?.prefix || ""} ${cardData?.firstName || ""} ${cardData?.lastName || ""}`.trim(),
    tagline: cardData?.tagline || "",
    
    // Professional Info
    jobTitle: cardData?.jobTitle || "",
    companyName: cardData?.companyName || "",
    department: cardData?.department || "",
    foundedName: cardData?.foundedName || "",
    organization: cardData?.organization || "",
    
    // Contact Info
    email: cardData?.email || "",
    emails: cardData?.emails || [{ address: cardData?.email || "", label: "primary", isPrimary: true }],
    phones: cardData?.phones || [{ number: "", isPrimary: true }],
    websites: cardData?.websites || [{ url: "" }],
    addresses: cardData?.addresses || [{ 
      fullAddress: "",
      isPrimary: true,
      googleMapsLink: "https://maps.google.com"
    }],
    virtualNumber: cardData?.virtualNumber || { number: "", isEnabled: false },
    
    // Profile Content
    profileVideo: cardData?.profileVideo || null,
    productVideo: cardData?.productVideo || null,
    videos: cardData?.videos || [],
    aboutText: cardData?.aboutText || ".",
    bio: cardData?.bio || "",
    servicesProducts: cardData?.servicesProducts || "",
    brandLabel: cardData?.brandLabel || "",
    catalogPDF: cardData?.catalogPDF || "",
    catalog: cardData?.catalog || cardData?.catalogPDF || "",
    
    // Business Hours - FIXED: Ensure proper data structure
    businessHours: cardData?.businessHours || [],
    
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

    // Additional Fields from config
    customFields: cardData?.customFields || [],
    dynamicQRCode: cardData?.dynamicQRCode || null,
    shareableUrl: cardData?.shareableUrl || cardData?.shareUrl || "",
    individualProductDisplay: cardData?.individualProductDisplay || false,
    businessCardInstagram: cardData?.businessCardInstagram || "",
    textbooks: cardData?.textbooks || [],
    
    // NFC Settings
    nfcSettings: cardData?.nfcSettings || { isEnabled: false },
    
    // ========== ADDED: Missing Fields from Schema ==========
    // Chat features
    chatAssistant: cardData?.chatAssistant || { isEnabled: false, welcomeMessage: 'Hello! How can I help you today?' },
    liveChat: cardData?.liveChat || { isEnabled: false, platform: 'whatsapp' },
    
    // Design & Layout
    design: cardData?.design || 'default',
    cardLayout: cardData?.cardLayout || 'standard',
    logoSize: cardData?.logoSize || 'medium',
    productRangeDisplay: cardData?.productRangeDisplay || 'grid',
    
    // Contact Management Toggles
    enableOneTapCall: cardData?.enableOneTapCall !== undefined ? cardData.enableOneTapCall : true,
    enableWhatsApp: cardData?.enableWhatsApp !== undefined ? cardData.enableWhatsApp : true,
    enableEmail: cardData?.enableEmail !== undefined ? cardData.enableEmail : true,
    
    // Card Type/Plan
    cardType: cardData?.cardType || 'Personal',
    
    // Status & Metadata
    isPublished: cardData?.isPublished || false,
    isPublic: cardData?.isPublic !== undefined ? cardData.isPublic : true,
    
    // Analytics (read-only)
    views: cardData?.views || 0,
    qrScans: cardData?.qrScans || 0,
    nfcTaps: cardData?.nfcTaps || 0,
    contactDownloads: cardData?.contactDownloads || 0,
    
    // URL fields
    customUrl: cardData?.customUrl || '',
    urlSlug: cardData?.urlSlug || '',
    shareableLink: cardData?.shareableLink || '',
    
    // Created By
    createdBy: cardData?.createdBy || null,
  };

  // State for sliders and toggles
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentServiceSlide, setCurrentServiceSlide] = useState(0);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
  const [currentVideoSlide, setCurrentVideoSlide] = useState(0);
  const [showAllClients, setShowAllClients] = useState(false);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState('all');

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

    const videoInterval = currentPlan.showVideos && profileData.videos.length > 1 ? setInterval(() => {
      setCurrentVideoSlide(prev => (prev + 1) % profileData.videos.length);
    }, 4000) : null;

    return () => {
      if (serviceInterval) clearInterval(serviceInterval);
      if (productInterval) clearInterval(productInterval);
      if (testimonialInterval) clearInterval(testimonialInterval);
      if (videoInterval) clearInterval(videoInterval);
    };
  }, [profileData.services.length, profileData.products.length, profileData.testimonials.length, profileData.videos.length, currentPlan]);

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
      case "virtualNumber":
        window.open(`tel:${value}`);
        break;
      default:
        window.open(value, "_blank");
    }
  };

  // Helper functions
  const primaryPhone = profileData.phones.find(phone => phone.isPrimary) || profileData.phones[0];
  const primaryEmail = profileData.emails.find(email => email.isPrimary) || profileData.emails[0];
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

  const getCurrentVideoItem = () => {
    return profileData.videos[currentVideoSlide];
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

  const getInteractiveElementIcon = (type) => {
    switch (type) {
      case 'call-to-action': return <FaBullhorn className="w-5 h-5" />;
      case 'shop-flow': return <FaShoppingCart className="w-5 h-5" />;
      case 'live-chat': return <FaCommentDots className="w-5 h-5" />;
      case 'appointment-scheduler': return <FaCalendarAlt className="w-5 h-5" />;
      case 'digital-payments': return <FaCreditCard className="w-5 h-5" />;
      case 'lead-form': return <FaClipboardList className="w-5 h-5" />;
      case 'contact-form': return <FaEnvelope className="w-5 h-5" />;
      case 'language-switcher': return <FaLanguage className="w-5 h-5" />;
      case 'chat-assistant': return <FaRobot className="w-5 h-5" />;
      default: return <FaGlobe className="w-5 h-5" />;
    }
  };

  const getInteractiveElementLabel = (type) => {
    switch (type) {
      case 'call-to-action': return 'Call to Action';
      case 'shop-flow': return 'Shop Now';
      case 'live-chat': return 'Live Chat';
      case 'appointment-scheduler': return 'Book Appointment';
      case 'digital-payments': return 'Make Payment';
      case 'lead-form': return 'Get Quote';
      case 'contact-form': return 'Contact Us';
      case 'language-switcher': return 'Language';
      case 'chat-assistant': return 'Chat Assistant';
      default: return type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  // ✅ FIXED: Business Hours Format - Now shows "09:00 - 17:00" format properly
  const formatBusinessHours = () => {
    const hours = profileData.businessHours;
    if (!hours || (Array.isArray(hours) && hours.length === 0)) return null;
    
    // Check if business hours should be shown for this plan
    if (!currentPlan.showBusinessHours) return null;
    
    let hoursObj = {};
    if (Array.isArray(hours)) {
      hours.forEach(item => {
        if (item.day) {
          const dayKey = item.day.toLowerCase();
          hoursObj[dayKey] = {
            open: item.openingTime || item.open || '',
            close: item.closingTime || item.close || '',
            isClosed: item.isClosed || false
          };
        }
      });
    } else {
      // Already in object format
      hoursObj = hours;
    }
    
    if (Object.keys(hoursObj).length === 0) return null;
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    return days.map(day => {
      const dayHours = hoursObj[day];
      if (!dayHours || dayHours.isClosed || (!dayHours.open && !dayHours.close)) {
        return { day: `${day.charAt(0).toUpperCase() + day.slice(1)}`, time: 'Closed', isClosed: true };
      }
      // ✅ FIXED: Format as "09:00 - 17:00" when both times are available
      if (dayHours.open && dayHours.close) {
        return { day: `${day.charAt(0).toUpperCase() + day.slice(1)}`, time: `${dayHours.open} - ${dayHours.close}`, isClosed: false };
      }
      // Fallback if only one time is available
      return { day: `${day.charAt(0).toUpperCase() + day.slice(1)}`, time: `${dayHours.open || dayHours.close || 'N/A'}`, isClosed: false };
    });
  };

  // Share functionality
  const handleShare = () => {
    const shareUrl = profileData.shareableUrl || window.location.href;
    const shareText = `Check out ${profileData.name}'s digital card`;
    
    if (navigator.share) {
      navigator.share({
        title: `${profileData.name}'s Digital Card`,
        text: shareText,
        url: shareUrl,
      });
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Link copied to clipboard!');
      });
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

  // ========== COMPONENT FUNCTIONS ==========

  // Share Button Component
  const renderShareButton = () => {
    if (!profileData.shareableUrl) return null;
    
    return (
      <div className="mb-12">
        <h3 
          className="mb-6 text-center"
          style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '20px',
            fontWeight: 500,
            color: '#000000'
          }}
        >
          <FaShare className="inline w-5 h-5 text-purple-500 mr-2 mb-1" />
          Share Card
        </h3>
        <button
          onClick={handleShare}
          className="mx-auto flex items-center justify-center px-6 py-3 rounded-full border-2 border-purple-500 text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 active:scale-95"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '15px',
            fontWeight: 500
          }}
        >
          <FaShare className="w-5 h-5 mr-2" />
          Share My Card
        </button>
      </div>
    );
  };

  // Brand Label Component
  const renderBrandLabel = () => {
    if (!currentPlan.showBrandLabel || !profileData.brandLabel) return null;
    
    return (
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-3">
          <FaTags className="w-5 h-5 text-purple-500 mr-2" />
          <h3 
            className="text-lg"
            style={{ 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              color: '#000000'
            }}
          >
            Brand Label
          </h3>
        </div>
        <div className="relative rounded-2xl p-5 mx-auto max-w-[320px]">
          <div 
            className="absolute inset-0 rounded-2xl border-2 border-purple-300"
            style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)' }}
          ></div>
          <div className="relative z-10">
            <p 
              style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                color: '#000000',
                fontSize: '15px'
              }}
            >
              {profileData.brandLabel}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Business Hours Component - ✅ FIXED: Now shows both start and end times
  const renderBusinessHours = () => {
    if (!currentPlan.showBusinessHours) return null;
    
    const hours = formatBusinessHours();
    if (!hours) return null;
    
    return (
      <div className="mb-12">
        <h3 
          className="mb-6 text-center"
          style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '20px',
            fontWeight: 500,
            color: '#000000'
          }}
        >
          <FaRegClock className="inline w-5 h-5 text-yellow-500 mr-2 mb-1" />
          Business Hours
        </h3>
        <div className="space-y-2 max-w-[340px] mx-auto">
          {hours.map((hour, index) => {
            const isClosed = hour.isClosed;
            
            return (
              <div 
                key={index}
                className="flex justify-between items-center p-3 rounded-lg"
                style={{ 
                  background: isClosed 
                    ? 'linear-gradient(135deg, rgba(156, 163, 175, 0.05) 0%, rgba(107, 114, 128, 0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
                  border: `1px solid ${isClosed ? 'rgba(156, 163, 175, 0.2)' : 'rgba(251, 191, 36, 0.2)'}`
                }}
              >
                <span 
                  style={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    color: isClosed ? '#6b7280' : '#000000',
                    fontSize: '14px'
                  }}
                >
                  {hour.day}
                </span>
                <span 
                  style={{ 
                    fontFamily: "'Poppins', sans-serif",
                    color: isClosed ? '#9ca3af' : '#374151',
                    fontSize: '14px'
                  }}
                >
                  {hour.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Virtual Number Component
  const renderVirtualNumber = () => {
    if (!currentPlan.showVirtualNumber) return null;
    if (!profileData.virtualNumber?.number || !profileData.virtualNumber?.isEnabled) return null;
    
    return (
      <div className="mb-12">
        <h3 
          className="mb-6 text-center"
          style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '20px',
            fontWeight: 500,
            color: '#000000'
          }}
        >
          <FaPhoneAlt className="inline w-5 h-5 text-green-500 mr-2 mb-1" />
          Virtual Number
        </h3>
        <button
          onClick={() => handleContact("virtualNumber", profileData.virtualNumber.number)}
          className="mx-auto block px-6 py-3 rounded-full border-2 border-green-500 text-green-600 hover:bg-green-50 transition-all duration-300 transform hover:scale-105 active:scale-95"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '15px',
            fontWeight: 500
          }}
        >
          {profileData.virtualNumber.number}
        </button>
      </div>
    );
  };

  // Catalog PDF Component
  const renderCatalogPDF = () => {
    if (!currentPlan.showCatalogPDF) return null;
    
    // Use either catalogPDF or catalog field
    const catalog = profileData.catalogPDF || profileData.catalog;
    if (!catalog) return null;
    
    const catalogUrl = typeof catalog === 'string' ? catalog : catalog?.url || catalog?.fileUrl;
    const catalogName = catalog?.name || "Catalog";
    
    if (!catalogUrl) return null;
    
    return (
      <div className="mb-8">
        <h3
          className="text-base font-semibold text-black flex justify-center items-center mb-2"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <FaFileInvoice className="w-4 h-4 text-red-500 mr-2" />
          Catalog PDF
        </h3>
        <button
          onClick={() => window.open(catalogUrl, '_blank')}
          className="mx-auto flex items-center justify-center px-6 py-3 rounded-full border-2 border-red-500 text-red-600 hover:bg-red-50 transition-all duration-300 transform hover:scale-105 active:scale-95"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '15px',
            fontWeight: 500
          }}
        >
          <FaFilePdf className="w-5 h-5 mr-2" />
          Download {catalogName}
        </button>
      </div>
    );
  };

  // Product Video Component
  const renderProductVideo = () => {
    if (!profileData.productVideo?.url) return null;
    
    return (
      <div className="mb-8">
        <h3
          className="text-base font-semibold text-black flex justify-center items-center mb-2"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <FaFileVideo className="w-4 h-4 text-purple-500 mr-2" />
          Product Video
        </h3>
        <div className="relative rounded-xl overflow-hidden h-48 mx-auto max-w-[340px]">
          <VideoPlayer
            src={profileData.productVideo.url}
            poster={profileData.productVideo.thumbnail}
            title={profileData.productVideo.title || "Product Video"}
            className="h-full"
          />
        </div>
      </div>
    );
  };

  // Videos Slider Component
  const renderVideosSlider = () => {
    if (!currentPlan.showVideos || profileData.videos.length === 0) return null;
    
    return (
      <div className="mb-8">
        <h3
          className="text-base font-semibold text-black flex justify-center items-center mb-2"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <FaVideo className="w-4 h-4 text-blue-500 mr-2" />
          Videos
        </h3>
        <div className="relative overflow-hidden rounded-xl mx-auto max-w-[340px] p-4">
          {getCurrentVideoItem() && (
            <VideoPlayer
              src={getCurrentVideoItem().url}
              poster={getCurrentVideoItem().thumbnail}
              title={getCurrentVideoItem().title}
              className="h-40"
            />
          )}
          
          {profileData.videos.length > 1 && (
            <div className="flex justify-center space-x-2 mt-3">
              {Array.from({ length: profileData.videos.length }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideoSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all transform duration-300 ${
                    index === currentVideoSlide ? 'bg-blue-500 scale-110' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Multiple Emails Component
  const renderMultipleEmails = () => {
    if (!currentPlan.showMultipleEmails) return null;
    if (profileData.emails.length <= 1) return null;
    
    return (
      <div className="mb-12">
        <h3 
          className="mb-6 text-center"
          style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '20px',
            fontWeight: 500,
            color: '#000000'
          }}
        >
          <FaEnvelope className="inline w-5 h-5 text-blue-500 mr-2 mb-1" />
          Email Addresses
        </h3>
        <div className="space-y-3 max-w-[340px] mx-auto">
          {profileData.emails.map((email, index) => (
            <button
              key={index}
              onClick={() => handleContact("email", email.address)}
              className="w-full p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 text-left flex items-center justify-between"
              style={{
                background: email.isPrimary 
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%)'
                  : 'linear-gradient(135deg, rgba(249, 250, 251, 1) 0%, rgba(243, 244, 246, 1) 100%)'
              }}
            >
              <div className="flex items-center">
                <FaEnvelope className="w-4 h-4 text-blue-500 mr-3" />
                <span 
                  style={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    color: email.isPrimary ? '#1d4ed8' : '#000000',
                    fontSize: '14px'
                  }}
                >
                  {email.label || "Email"}
                </span>
              </div>
              <span 
                style={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '13px',
                  color: '#6b7280'
                }}
                className="truncate ml-2"
              >
                {email.address}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // NFC Card Component
  const renderNFCCard = () => {
    if (!currentPlan.showNfcSettings) return null;
    if (!profileData.nfcSettings?.isEnabled) return null;
    
    return (
      <div className="mb-12">
        <h3 
          className="mb-6 text-center"
          style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '20px',
            fontWeight: 500,
            color: '#000000'
          }}
        >
          <FaIdCard className="inline w-5 h-5 text-purple-500 mr-2 mb-1" />
          NFC Card
        </h3>
        <div 
          className="rounded-2xl p-6 mx-auto max-w-[340px] flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.3)'
          }}
        >
          <FaIdCard className="w-10 h-10 text-purple-500 mr-4" />
          <div>
            <p 
              style={{ 
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                color: '#000000',
                fontSize: '16px'
              }}
            >
              NFC Card Available
            </p>
            <p 
              style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '13px',
                color: '#6b7280',
                marginTop: '4px'
              }}
            >
              Tap to connect with NFC
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Client List Component
  const renderEnhancedClientList = () => {
    if (!profileData.clientList || profileData.clientList.length === 0) return null;
    
    const displayClients = showAllClients ? profileData.clientList : profileData.clientList.slice(0, 6);
    
    return (
      <div className="mb-8">
        <h3
          className="text-base font-semibold text-black flex justify-center items-center mb-2"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <FaUsers className="w-4 h-4 text-blue-500 mr-2" />
          Our Clients
        </h3>
        <div className="grid grid-cols-3 gap-3 max-w-[340px] mx-auto">
          {displayClients.map((client, index) => (
            <div 
              key={index} 
              className="rounded-xl p-3 text-center"
              style={{ 
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%)',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}
            >
              <p 
                style={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '12px',
                  color: '#374151',
                  fontWeight: 500
                }}
                className="truncate"
              >
                {client}
              </p>
            </div>
          ))}
        </div>
        {profileData.clientList.length > 6 && (
          <button
            onClick={() => setShowAllClients(!showAllClients)}
            className="mx-auto block mt-4 px-4 py-2 text-blue-500 hover:text-blue-600 transition-colors"
            style={{ 
              fontFamily: "'Poppins', sans-serif",
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            {showAllClients ? 'Show Less' : `Show All (${profileData.clientList.length})`}
          </button>
        )}
      </div>
    );
  };

  // Downloads Component
  const renderDownloads = () => {
    if (!currentPlan.showDownloads || profileData.downloads.length === 0) return null;
    
    return (
      <div className="mb-12">
        <h3 
          className="mb-6 text-center"
          style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '20px',
            fontWeight: 500,
            color: '#000000'
          }}
        >
          <FaDownload className="inline w-5 h-5 text-green-500 mr-2 mb-1" />
          Downloads
        </h3>
        <div className="space-y-3 max-w-[340px] mx-auto">
          {profileData.downloads.map((download, index) => (
            <button
              key={index}
              onClick={() => window.open(download.fileUrl, '_blank')}
              className="w-full p-4 rounded-xl border border-gray-200 hover:border-green-300 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-between"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)'
              }}
            >
              <div className="flex items-center">
                <FaFilePdf className="w-5 h-5 text-red-500 mr-3" />
                <div className="text-left">
                  <p 
                    style={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      color: '#000000',
                      fontSize: '14px'
                    }}
                  >
                    {download.name}
                  </p>
                  {download.fileSize && (
                    <p 
                      style={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '12px',
                        color: '#6b7280',
                        marginTop: '2px'
                      }}
                    >
                      {download.fileSize}
                    </p>
                  )}
                </div>
              </div>
              <FaDownload className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Interactive Elements Component
  const renderInteractiveElements = () => {
    if (!currentPlan.showInteractive || profileData.interactiveElements.length === 0) return null;
    
    // Group interactive elements by category
    const categories = {
      'communication': ['call-to-action', 'live-chat', 'contact-form', 'chat-assistant'],
      'business': ['shop-flow', 'digital-payments', 'lead-form'],
      'utility': ['appointment-scheduler', 'language-switcher', 'booking-system', 'newsletter-signup', 'file-download']
    };
    
    const filteredElements = activeInteractiveTab === 'all' 
      ? profileData.interactiveElements
      : profileData.interactiveElements.filter(el => categories[activeInteractiveTab]?.includes(el.type));
    
    return (
      <div className="mb-12">
        <h3 
          className="mb-6 text-center"
          style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '20px',
            fontWeight: 500,
            color: '#000000'
          }}
        >
          <FaHeadset className="inline w-5 h-5 text-purple-500 mr-2 mb-1" />
          Quick Actions
        </h3>
        
        {/* Category Tabs */}
        <div className="flex justify-center space-x-2 mb-6">
          {['all', 'communication', 'business', 'utility'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveInteractiveTab(tab)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                activeInteractiveTab === tab
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4 max-w-[340px] mx-auto">
          {filteredElements
            .filter(element => element.isActive)
            .map((element, index) => (
              <button
                key={index}
                onClick={() => {
                  const primaryPhone = profileData.phones.find(phone => phone.isPrimary) || profileData.phones[0];
                  switch (element.type) {
                    case 'call-to-action':
                    case 'shop-flow':
                    case 'lead-form':
                    case 'contact-form':
                    case 'booking-system':
                    case 'newsletter-signup':
                      if (element.config?.redirectUrl) {
                        window.open(element.config.redirectUrl, '_blank');
                      }
                      break;
                    case 'live-chat':
                      if (primaryPhone) handleContact("whatsapp", primaryPhone.number);
                      break;
                    case 'appointment-scheduler':
                      window.open('https://calendly.com', '_blank');
                      break;
                    case 'digital-payments':
                      window.open('https://paypal.com', '_blank');
                      break;
                    default:
                      break;
                  }
                }}
                className="p-4 rounded-xl border border-gray-200 hover:border-purple-300 transition-all duration-300 transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)'
                }}
              >
                <div className="text-purple-500 mb-2">
                  {getInteractiveElementIcon(element.type)}
                </div>
                <span 
                  style={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#000000',
                    textAlign: 'center'
                  }}
                >
                  {getInteractiveElementLabel(element.type)}
                </span>
              </button>
            ))}
        </div>
      </div>
    );
  };

  // Custom Fields Component
  const renderCustomFields = () => {
    if (!currentPlan.showCustomFields || profileData.customFields.length === 0) return null;
    
    return (
      <div className="mb-12">
        <h3 
          className="mb-6 text-center"
          style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '20px',
            fontWeight: 500,
            color: '#000000'
          }}
        >
          <FaInfoCircle className="inline w-5 h-5 text-blue-500 mr-2 mb-1" />
          Additional Information
        </h3>
        <div className="space-y-3 max-w-[340px] mx-auto">
          {profileData.customFields.map((field, index) => (
            <div 
              key={index}
              className="flex justify-between items-center p-4 rounded-xl"
              style={{ 
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%)',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}
            >
              <span 
                style={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  color: '#000000',
                  fontSize: '14px'
                }}
              >
                {field.label}:
              </span>
              <span 
                style={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '14px',
                  color: '#374151'
                }}
                className="text-right"
              >
                {field.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // QR Code Component
  const renderQRCode = () => {
    if (!currentPlan.showQRCode || !profileData.dynamicQRCode?.targetUrl) return null;
    
    return (
      <div className="mb-12">
        <h3 
          className="mb-6 text-center"
          style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '20px',
            fontWeight: 500,
            color: '#000000'
          }}
        >
          <FaQrcode className="inline w-5 h-5 text-blue-500 mr-2 mb-1" />
          QR Code
        </h3>
        <div className="flex justify-center">
          <div 
            className="p-4 rounded-xl"
            style={{ 
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}
          >
            {profileData.dynamicQRCode.qrImage ? (
              <img
                src={profileData.dynamicQRCode.qrImage}
                alt="QR Code"
                className="w-32 h-32 object-contain"
              />
            ) : (
              <div 
                className="w-32 h-32 flex items-center justify-center rounded-lg"
                style={{ background: 'rgba(59, 130, 246, 0.1)' }}
              >
                <span 
                  style={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '12px',
                    color: '#6b7280'
                  }}
                >
                  QR Code
                </span>
              </div>
            )}
          </div>
        </div>
        <p 
          className="text-center mt-3"
          style={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '13px',
            color: '#6b7280'
          }}
        >
          Scan to save contact
        </p>
      </div>
    );
  };

  // Organization Component
  const renderOrganization = () => {
    if (!currentPlan.showOrganization) return null;
    if (!profileData.foundedName && !profileData.organization) return null;
    
    return (
      <div className="mb-12">
        <h3 
          className="mb-6 text-center"
          style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '20px',
            fontWeight: 500,
            color: '#000000'
          }}
        >
          <FaBuilding className="inline w-5 h-5 text-green-500 mr-2 mb-1" />
          Organization
        </h3>
        <div className="space-y-4 max-w-[340px] mx-auto">
          {profileData.foundedName && (
            <div 
              className="p-4 rounded-xl text-center"
              style={{ 
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}
            >
              <p 
                style={{ 
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500,
                  color: '#000000',
                  fontSize: '15px',
                  marginBottom: '4px'
                }}
              >
                Founded
              </p>
              <p 
                style={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '14px',
                  color: '#374151'
                }}
              >
                {profileData.foundedName}
              </p>
            </div>
          )}
          
          {profileData.organization && (
            <div 
              className="p-4 rounded-xl text-center"
              style={{ 
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%)',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}
            >
              <p 
                style={{ 
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500,
                  color: '#000000',
                  fontSize: '15px',
                  marginBottom: '4px'
                }}
              >
                Organization
              </p>
              <p 
                style={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '14px',
                  color: '#374151'
                }}
              >
                {profileData.organization}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Profile Video Section
  const renderProfileVideo = () => {
    if (!currentPlan.showVideo) return null;
    if (!profileData.profileVideo?.url) return null;
    
    return (
      <div className="text-center mb-16">
        <h3
          className="text-base font-semibold text-black flex justify-center items-center mb-2"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <FaVideo className="w-4 h-4 text-blue-400 mr-2" />
          Introduction Video
        </h3>
        <div className="relative rounded-lg overflow-hidden h-40 mx-auto max-w-[340px]">
          <VideoPlayer
            src={profileData.profileVideo.url}
            poster={profileData.profileVideo.thumbnail}
            title={profileData.profileVideo.title || "Introduction Video"}
            className="h-full"
          />
        </div>
      </div>
    );
  };

  // ========== NEW COMPONENTS FOR ADDED FIELDS ==========

  // Product Range Display Component
  const renderProductRangeDisplay = () => {
    if (!profileData.individualProductDisplay) return null;
    if (!currentPlan.showProductRangeDisplay) return null;
    
    return (
      <div className="mb-12">
        <h3 
          className="mb-6 text-center"
          style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '20px',
            fontWeight: 500,
            color: '#000000'
          }}
        >
          <FaShoppingCart className="inline w-5 h-5 text-blue-500 mr-2 mb-1" />
          Product Display: {profileData.productRangeDisplay}
        </h3>
        <div className="text-center">
          <span 
            style={{ 
              fontFamily: "'Poppins', sans-serif",
              fontSize: '14px',
              color: '#6b7280'
            }}
          >
            Products shown as {profileData.productRangeDisplay === 'grid' ? 'Grid View' : 
                            profileData.productRangeDisplay === 'list' ? 'List View' : 'Carousel'}
          </span>
        </div>
      </div>
    );
  };

  // Business Card Instagram Component
  const renderBusinessCardInstagram = () => {
    if (!profileData.businessCardInstagram) return null;
    if (!currentPlan.showBusinessCardInstagram) return null;
    
    return (
      <div className="mb-12">
        <h3 
          className="mb-6 text-center"
          style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '20px',
            fontWeight: 500,
            color: '#000000'
          }}
        >
          <FaInstagram className="inline w-5 h-5 text-pink-500 mr-2 mb-1" />
          Instagram
        </h3>
        <div className="text-center">
          <a
            href={`https://instagram.com/${profileData.businessCardInstagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
            style={{ 
              fontFamily: "'Poppins', sans-serif",
              fontSize: '16px'
            }}
          >
            @{profileData.businessCardInstagram.replace('@', '')}
          </a>
        </div>
      </div>
    );
  };

  // Textbooks Component
  const renderTextbooks = () => {
    if (!profileData.textbooks) return null;
    if (!currentPlan.showTextbooks) return null;
    
    return (
      <div className="mb-12">
        <h3 
          className="mb-6 text-center"
          style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '20px',
            fontWeight: 500,
            color: '#000000'
          }}
        >
          <FaBook className="inline w-5 h-5 text-green-500 mr-2 mb-1" />
          Textbooks & Resources
        </h3>
        <div 
          className="rounded-xl p-5 mx-auto max-w-[340px]"
          style={{ 
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}
        >
          <p 
            style={{ 
              fontFamily: "'Poppins', sans-serif",
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#374151',
              textAlign: 'center'
            }}
          >
            {profileData.textbooks}
          </p>
        </div>
      </div>
    );
  };

  // Chat Assistant Component
  const renderChatAssistant = () => {
    if (!profileData.chatAssistant?.isEnabled) return null;
    if (!currentPlan.showChatAssistant) return null;
    
    return (
      <div className="mb-12">
        <h3 
          className="mb-6 text-center"
          style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '20px',
            fontWeight: 500,
            color: '#000000'
          }}
        >
          <FaRobot className="inline w-5 h-5 text-purple-500 mr-2 mb-1" />
          AI Assistant
        </h3>
        <div 
          className="rounded-xl p-5 mx-auto max-w-[340px] text-center"
          style={{ 
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.2)'
          }}
        >
          <FaRobot className="w-10 h-10 text-purple-500 mx-auto mb-3" />
          <p 
            style={{ 
              fontFamily: "'Poppins', sans-serif",
              fontSize: '14px',
              color: '#374151',
              marginBottom: '10px'
            }}
          >
            {profileData.chatAssistant.welcomeMessage}
          </p>
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
            style={{ 
              fontFamily: "'Poppins', sans-serif",
              fontSize: '14px'
            }}
            onClick={() => alert('Chat assistant would open here')}
          >
            Start Chat
          </button>
        </div>
      </div>
    );
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
          box-sizing: border-box;
        }
        
        html, body {
          overflow: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
        }
        
        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          display: none;
        }

        /* Mobile-specific styles */
        @media (max-width: 767px) {
          body {
            overflow: hidden;
          }
        }
      `}</style>

      {/* Mobile View - Full screen card without blue background */}
      <div 
        className="min-h-screen md:hidden"
        style={{
          background: 'white',
          fontFamily: "'Poppins', sans-serif",
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          height: '100vh',
          width: '100vw',
          margin: 0,
          padding: 0,
          overflow: 'hidden'
        }}
      >
        {/* Mobile Card Container - Takes full screen */}
        <div 
          className="bg-white overflow-hidden relative w-full h-full"
          style={{
            height: '100vh',
            fontFamily: "'Poppins', sans-serif",
            WebkitFontSmoothing: 'antialiased',
            overflow: 'hidden',
            margin: 0,
            width: '100%'
          }}
        >
          {/* Scrollable Content Area */}
          <div 
            className="overflow-y-auto h-full"
            style={{
              height: '100vh',
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
              className="h-48 relative"
              style={{
                background: 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)',
                height: '180px'
              }}
            >
              {/* Company Logo */}
              {(currentPlan.showCheckUsOut && (profileData.companyLogo || profileData.companyName)) && (
                <div className="absolute top-4 left-0 right-0 text-center">
                  <div className="flex flex-col items-center justify-center">
                    {profileData.companyLogo && (
                      <img
                        src={profileData.companyLogo}
                        alt="Company Logo"
                        className="w-8 h-8 object-contain"
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

              {/* Profile Photo with Background Color - ✅ FIXED: Mobile responsive */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 z-10">
                <div 
                  className="rounded-full border-4 border-white overflow-hidden shadow-2xl relative"
                  style={{
                    width: '120px',
                    height: '120px',
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

            {/* Main Content Area - ✅ FIXED: Better padding for mobile */}
            <div 
              className="pt-16 pb-8 px-4"
              style={{
                position: 'relative',
                paddingTop: '70px'
              }}
            >
              {/* Name and Designation - ✅ FIXED: Mobile text sizing */}
              <div className="text-center mb-6">
                <h1 
                  className="tracking-tight mb-2 px-2"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '24px',
                    lineHeight: '1.2',
                    marginBottom: '6px',
                    fontWeight: 500,
                    letterSpacing: '-0.3px',
                    color: '#000000'
                  }}
                >
                  {profileData.name}
                </h1>
                <p 
                  className="mb-3 px-2"
                  style={{
                    fontSize: '16px',
                    marginBottom: '6px',
                    fontWeight: 400,
                    letterSpacing: '0.1px',
                    color: '#000000'
                  }}
                >
                  {profileData.jobTitle}
                </p>
                
                {/* Location */}
                {primaryAddress && primaryAddress.fullAddress && (
                  <div className="flex items-center justify-center text-gray-500 mb-8 px-2" style={{ 
                    fontSize: '14px', 
                    fontWeight: 400,
                    fontFamily: "'Poppins', sans-serif"
                  }}>
                    <FaMapMarkerAlt className="mr-2" style={{ fontSize: '14px' }} />
                    <span className="truncate">{primaryAddress.fullAddress}</span>
                  </div>
                )}

                {/* Contact Icons - ✅ FIXED: Better mobile spacing */}
                {currentPlan.showContactIcons && (
                  <div className="flex justify-center space-x-6 mb-12 px-2">
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
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                            boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)'
                          }}
                        >
                          <FaWhatsapp className="w-4 h-4" />
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
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)'
                          }}
                        >
                          <FaPhoneAlt className="w-4 h-4" />
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
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                            boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)'
                          }}
                        >
                          <FaEnvelope className="w-4 h-4" />
                        </div>
                        <span className="text-xs text-gray-600">Email</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* ========== Multiple Emails ========== */}
              {renderMultipleEmails()}

              {/* ========== Virtual Number ========== */}
              {renderVirtualNumber()}

              {/* Tagline / Recognition - ✅ FIXED: Mobile responsive */}
              {currentPlan.showCheckUsOut && profileData.tagline && (
                <div
                  className="relative rounded-full w-full max-w-[300px] h-12 px-4 py-2 flex items-center justify-center mt-0 mx-auto mb-8"
                  style={{
                    fontFamily: "Zona Pro, sans-serif",
                  }}
                >
                  <div className="absolute inset-0 rounded-full w-full h-12 border-2 border-black"></div>
                  <div className="relative text-center z-10 px-2">
                    <FaCrown className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
                    <p className="text-black font-semibold text-xs tracking-wide">
                      {profileData.tagline}
                    </p>
                  </div>
                </div>
              )}

              {/* ========== Brand Label ========== */}
              {renderBrandLabel()}

              {/* ========== Share Button ========== */}
              {renderShareButton()}

              {/* ========== Product Display Setting ========== */}
              {renderProductRangeDisplay()}

              {/* ========== Instagram Link ========== */}
              {renderBusinessCardInstagram()}

              {/* ========== Textbooks ========== */}
              {renderTextbooks()}

              {/* ========== Chat Assistant ========== */}
              {renderChatAssistant()}

              {/* ABOUT Section - ✅ FIXED: Mobile spacing */}
              <div className="mb-12">
                <h2 
                  className="mb-6 text-center"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '20px',
                    fontWeight: 500,
                    letterSpacing: '0.3px',
                    color: '#000000'
                  }}
                >
                  ABOUT
                </h2>
                
                {/* Display Bio in ABOUT section */}
                {profileData.bio && (
                  <div className="mb-6 px-2">
                    <div 
                      className="text-left mx-auto"
                      style={{
                        maxWidth: '100%',
                        padding: '0'
                      }}
                    >
                      <p 
                        style={{ 
                          fontSize: '14px', 
                          lineHeight: '1.6',
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
                <h2 
                    className="mb-6 text-center"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '20px',
                      fontWeight: 500,
                      letterSpacing: '0.3px',
                      color: '#000000'
                    }}
                  >
                    PROFESSIONAL DETAILS
                  </h2>
                {profileData.aboutText && profileData.aboutText !== "." && (
                  <div className="mt-4 px-2">
                    <div 
                      className="text-left mx-auto"
                      style={{
                        maxWidth: '100%',
                        padding: '0'
                      }}
                    >
                      <p 
                        style={{ 
                          fontSize: '14px', 
                          lineHeight: '1.6',
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

              {/* ========== PROFESSIONAL DETAILS Section ========== */}
              {currentPlan.showServicesProducts && (
                <div className="mb-12">
                  
                  {/* Services/Products Overview */}
                  {profileData.servicesProducts && (
                    <div className="mb-6 px-2">
                      <div 
                        className="text-left mx-auto rounded-xl p-4"
                        style={{
                          maxWidth: '100%',
                          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%)',
                          border: '1px solid rgba(59, 130, 246, 0.2)'
                        }}
                      >
                        <h3 
                          className="mb-2 flex items-center"
                          style={{ 
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: '16px',
                            fontWeight: 500,
                            color: '#000000'
                          }}
                        >
                          <FaSuitcase className="w-4 h-4 text-blue-500 mr-2" />
                          Services & Products
                        </h3>
                        <p 
                          style={{ 
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '13px',
                            lineHeight: '1.6',
                            color: '#374151',
                            textAlign: 'left'
                          }}
                        >
                          {profileData.servicesProducts}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Catalog PDF */}
                  {renderCatalogPDF()}
                  
                  {/* Product Video */}
                  {renderProductVideo()}
                  
                  {/* Videos Slider */}
                  {renderVideosSlider()}
                  
                  {/* Gallery */}
                  {currentPlan.showGallery && profileData.gallery.length > 0 && (
                    <div className="text-center mb-6 px-2">
                      <h3
                        className="text-base font-semibold text-black flex justify-center items-center mb-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <FaImage className="w-4 h-4 text-blue-400 mr-2" />
                        Gallery / Portfolio
                      </h3>
                      <div className="space-y-2">
                        {/* Top Image */}
                        {getCurrentSlideImages()[0] && (
                          <div className="relative rounded-lg overflow-hidden h-32">
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
                              className="relative rounded-lg overflow-hidden h-24"
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
                  
                  {/* Services (if available) */}
                  {currentPlan.showServices && profileData.services.length > 0 && (
                    <div className="text-center mb-6 px-2">
                      <h3
                        className="text-base font-semibold text-black flex justify-center items-center mb-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <FaShoppingCart className="w-4 h-4 text-blue-400 mr-2" />
                        Services
                      </h3>
                      {getCurrentServiceItem() && (
                        <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 max-w-[100%] mx-auto">
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
                  
                  {/* Testimonials */}
                  {currentPlan.showTestimonials && profileData.testimonials.length > 0 && (
                    <div className="text-center mb-6 px-2">
                      <h3
                        className="text-base font-semibold text-black flex justify-center items-center mb-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <FaStar className="w-4 h-4 text-blue-400 mr-2" />
                        Testimonials
                      </h3>
                      {getCurrentTestimonialItem() && (
                        <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 max-w-[100%] mx-auto">
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
                  
                  {/* Enhanced Client List */}
                  {renderEnhancedClientList()}
                </div>
              )}

              {/* ========== Organization ========== */}
              {renderOrganization()}

              {/* ========== Business Hours ========== */}
              {renderBusinessHours()}

              {/* CHECK US OUT Section - ✅ FIXED: Mobile responsive */}
              {currentPlan.showCheckUsOut && (
                <div className="mb-12">
                  <h2 
                    className="mb-6 text-center"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '20px',
                      fontWeight: 500,
                      letterSpacing: '0.3px',
                      color: '#000000'
                    }}
                  >
                    CHECK US OUT
                  </h2>
                  
                  {/* Learn More button */}
                  <div className="flex justify-center mb-8 px-2">
                    <button 
                      className="flex items-center justify-between px-6 py-3 border-2 border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300 group active:scale-95"
                      style={{
                        fontSize: '14px',
                        minWidth: '250px',
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
                      <FaChevronRight className="ml-3 group-hover:translate-x-2 transition-transform" style={{ fontSize: '12px' }} />
                    </button>
                  </div>

                  {/* Website link */}
                  {profileData.websites[0]?.url && (
                    <div className="flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors cursor-pointer mb-8 px-2" style={{
                      fontFamily: "'Poppins', sans-serif"
                    }}
                    onClick={() => handleContact("website", profileData.websites[0].url)}>
                      <FaGlobe className="mr-2" style={{ fontSize: '14px' }} />
                      <span style={{ fontSize: '14px', fontWeight: 400 }} className="truncate">
                        {profileData.websites[0]?.url?.replace('https://', '').replace('http://', '').split('/')[0] || 'www.ny-software.co'}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Profile Video Section */}
              {renderProfileVideo()}

              {/* ========== Downloads ========== */}
              {renderDownloads()}

              {/* ========== Custom Fields ========== */}
              {renderCustomFields()}

              {/* ========== QR Code ========== */}
              {renderQRCode()}

              {/* ========== NFC Card ========== */}
              {renderNFCCard()}

              {/* ========== Interactive Elements ========== */}
              {renderInteractiveElements()}

              {/* GET IN TOUCH Section - Social Media Icons - ✅ FIXED: Mobile responsive */}
              <div className="mb-12">
                <h2 
                  className="mb-6 text-center"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '20px',
                    fontWeight: 500,
                    letterSpacing: '0.3px',
                    color: '#000000'
                  }}
                >
                  GET IN TOUCH
                </h2>
                
                {/* Social icons */}
                <div className="flex justify-center space-x-4 mb-8 px-2">
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
                          width: '45px',
                          height: '45px',
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

              {/* OUR TEAM Section - ✅ FIXED: Mobile responsive */}
              {currentPlan.showTeam && profileData.clientList.length > 0 && (
                <div className="pt-6 border-t border-gray-200 pb-8 px-2">
                  <h2 
                    className="mb-6 text-center"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '20px',
                      fontWeight: 500,
                      letterSpacing: '0.3px',
                      color: '#000000'
                    }}
                  >
                    OUR TEAM
                  </h2>
                  
                  <div className="flex items-center justify-center">
                    <div className="flex -space-x-3 mr-4">
                      {profileData.clientList.slice(0, 3).map((client, index) => (
                        <div 
                          key={index} 
                          className="rounded-full border-2 border-white overflow-hidden shadow-md"
                          style={{ 
                            width: '45px', 
                            height: '45px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          }}
                        >
                          <div className="w-full h-full flex items-center justify-center text-white text-xs">
                            {(client?.name || client)?.charAt(0)?.toUpperCase() || "T"}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="ml-2">
                      <div 
                        className="rounded-full border-2 border-white shadow-md flex items-center justify-center"
                        style={{
                          width: '45px',
                          height: '45px',
                          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
                        }}
                      >
                        <span 
                          style={{ 
                            fontSize: '12px',
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 400,
                            color: '#6b7280'
                          }}
                        >
                          +{Math.max(0, profileData.clientList.length - 3)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="ml-6">
                      <span 
                        style={{ 
                          fontSize: '18px',
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 500,
                          letterSpacing: '0.2px',
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

      {/* Desktop View - Centered card with blue gradient background */}
      <div 
        className="min-h-screen hidden md:flex items-center justify-center p-6 overflow-auto"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontFamily: "'Poppins', sans-serif",
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          height: '100vh',
          width: '100vw',
          overflow: 'auto'
        }}
      >
        {/* Main Card Container - Desktop */}
        <div 
          className="bg-white rounded-3xl shadow-2xl overflow-hidden relative w-full max-w-[420px]"
          style={{
            height: 'auto',
            minHeight: '600px',
            maxHeight: '85vh',
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
              maxHeight: '85vh',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Header with gradient background */}
            <div 
              className="h-60 relative"
              style={{
                background: 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)',
                height: '180px'
              }}
            >
              {/* Company Logo */}
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
                    width: '120px',
                    height: '120px',
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

            {/* Main Content Area - Desktop */}
            <div 
              className="pt-20 pb-10 px-8"
              style={{
                position: 'relative',
                paddingTop: '70px'
              }}
            >
              {/* Name and Designation */}
              <div className="text-center mb-8">
                <h1 
                  className="tracking-tight mb-2 px-2"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '24px',
                    lineHeight: '1.2',
                    marginBottom: '6px',
                    fontWeight: 500,
                    letterSpacing: '-0.3px',
                    color: '#000000'
                  }}
                >
                  {profileData.name}
                </h1>
                <p 
                  className="mb-3 px-2"
                  style={{
                    fontSize: '16px',
                    marginBottom: '6px',
                    fontWeight: 400,
                    letterSpacing: '0.1px',
                    color: '#000000'
                  }}
                >
                  {profileData.jobTitle}
                </p>
                
                {/* Location */}
                {primaryAddress && primaryAddress.fullAddress && (
                  <div className="flex items-center justify-center text-gray-500 mb-12 px-2" style={{ 
                    fontSize: '14px', 
                    fontWeight: 400,
                    fontFamily: "'Poppins', sans-serif"
                  }}>
                    <FaMapMarkerAlt className="mr-2" style={{ fontSize: '14px' }} />
                    <span className="truncate">{primaryAddress.fullAddress}</span>
                  </div>
                )}

                {/* Contact Icons */}
                {currentPlan.showContactIcons && (
                  <div className="flex justify-center space-x-6 mb-16 px-2">
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
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                            boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)'
                          }}
                        >
                          <FaWhatsapp className="w-4 h-4" />
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
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)'
                          }}
                        >
                          <FaPhoneAlt className="w-4 h-4" />
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
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                            boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)'
                          }}
                        >
                          <FaEnvelope className="w-4 h-4" />
                        </div>
                        <span className="text-xs text-gray-600">Email</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* ========== Multiple Emails ========== */}
              {renderMultipleEmails()}

              {/* ========== Virtual Number ========== */}
              {renderVirtualNumber()}

              {/* Tagline / Recognition */}
              {currentPlan.showCheckUsOut && profileData.tagline && (
                <div
                  className="relative rounded-full w-full max-w-[300px] h-12 px-4 py-2 flex items-center justify-center mt-0 mx-auto mb-8"
                  style={{
                    fontFamily: "Zona Pro, sans-serif",
                  }}
                >
                  <div className="absolute inset-0 rounded-full w-full h-12 border-2 border-black"></div>
                  <div className="relative text-center z-10 px-2">
                    <FaCrown className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
                    <p className="text-black font-semibold text-xs tracking-wide">
                      {profileData.tagline}
                    </p>
                  </div>
                </div>
              )}

              {/* ========== Brand Label ========== */}
              {renderBrandLabel()}

              {/* ========== Share Button ========== */}
              {renderShareButton()}

              {/* ========== Product Display Setting ========== */}
              {renderProductRangeDisplay()}

              {/* ========== Instagram Link ========== */}
              {renderBusinessCardInstagram()}

              {/* ========== Textbooks ========== */}
              {renderTextbooks()}

              {/* ========== Chat Assistant ========== */}
              {renderChatAssistant()}

              {/* ABOUT Section */}
              <div className="mb-16">
                <h2 
                  className="mb-10 text-center"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '20px',
                    fontWeight: 500,
                    letterSpacing: '0.3px',
                    color: '#000000'
                  }}
                >
                  ABOUT
                </h2>
                
                {/* Display Bio in ABOUT section */}
                {profileData.bio && (
                  <div className="mb-8 px-2">
                    <div 
                      className="text-left mx-auto"
                      style={{
                        maxWidth: '100%',
                        padding: '0'
                      }}
                    >
                      <p 
                        style={{ 
                          fontSize: '14px', 
                          lineHeight: '1.6',
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
                <h2 
                    className="mb-10 text-center"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '20px',
                      fontWeight: 500,
                      letterSpacing: '0.3px',
                      color: '#000000'
                    }}
                  >
                    PROFESSIONAL DETAILS
                  </h2>
                {profileData.aboutText && profileData.aboutText !== "." && (
                  <div className="mt-6 px-2">
                    <div 
                      className="text-left mx-auto"
                      style={{
                        maxWidth: '100%',
                        padding: '0'
                      }}
                    >
                      <p 
                        style={{ 
                          fontSize: '14px', 
                          lineHeight: '1.6',
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

              {/* ========== PROFESSIONAL DETAILS Section ========== */}
              {currentPlan.showServicesProducts && (
                <div className="mb-16">
                  
                  {/* Services/Products Overview */}
                  {profileData.servicesProducts && (
                    <div className="mb-8 px-2">
                      <div 
                        className="text-left mx-auto rounded-xl p-4"
                        style={{
                          maxWidth: '100%',
                          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%)',
                          border: '1px solid rgba(59, 130, 246, 0.2)'
                        }}
                      >
                        <h3 
                          className="mb-2 flex items-center"
                          style={{ 
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: '16px',
                            fontWeight: 500,
                            color: '#000000'
                          }}
                        >
                          <FaSuitcase className="w-4 h-4 text-blue-500 mr-2" />
                          Services & Products
                        </h3>
                        <p 
                          style={{ 
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '13px',
                            lineHeight: '1.6',
                            color: '#374151',
                            textAlign: 'left'
                          }}
                        >
                          {profileData.servicesProducts}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Catalog PDF */}
                  {renderCatalogPDF()}
                  
                  {/* Product Video */}
                  {renderProductVideo()}
                  
                  {/* Videos Slider */}
                  {renderVideosSlider()}
                  
                  {/* Gallery */}
                  {currentPlan.showGallery && profileData.gallery.length > 0 && (
                    <div className="text-center mb-8 px-2">
                      <h3
                        className="text-base font-semibold text-black flex justify-center items-center mb-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <FaImage className="w-4 h-4 text-blue-400 mr-2" />
                        Gallery / Portfolio
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
                  
                  {/* Services (if available) */}
                  {currentPlan.showServices && profileData.services.length > 0 && (
                    <div className="text-center mb-8 px-2">
                      <h3
                        className="text-base font-semibold text-black flex justify-center items-center mb-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <FaShoppingCart className="w-4 h-4 text-blue-400 mr-2" />
                        Services
                      </h3>
                      {getCurrentServiceItem() && (
                        <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 max-w-[100%] mx-auto">
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
                  
                  {/* Testimonials */}
                  {currentPlan.showTestimonials && profileData.testimonials.length > 0 && (
                    <div className="text-center mb-8 px-2">
                      <h3
                        className="text-base font-semibold text-black flex justify-center items-center mb-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <FaStar className="w-4 h-4 text-blue-400 mr-2" />
                        Testimonials
                      </h3>
                      {getCurrentTestimonialItem() && (
                        <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 max-w-[100%] mx-auto">
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
                  
                  {/* Enhanced Client List */}
                  {renderEnhancedClientList()}
                </div>
              )}

              {/* ========== Organization ========== */}
              {renderOrganization()}

              {/* ========== Business Hours ========== */}
              {renderBusinessHours()}

              {/* CHECK US OUT Section */}
              {currentPlan.showCheckUsOut && (
                <div className="mb-16">
                  <h2 
                    className="mb-10 text-center"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '20px',
                      fontWeight: 500,
                      letterSpacing: '0.3px',
                      color: '#000000'
                    }}
                  >
                    CHECK US OUT
                  </h2>
                  
                  {/* Learn More button */}
                  <div className="flex justify-center mb-10 px-2">
                    <button 
                      className="flex items-center justify-between px-10 py-4 border-2 border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300 group active:scale-95"
                      style={{
                        fontSize: '14px',
                        minWidth: '250px',
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
                      <FaChevronRight className="ml-3 group-hover:translate-x-2 transition-transform" style={{ fontSize: '12px' }} />
                    </button>
                  </div>

                  {/* Website link */}
                  {profileData.websites[0]?.url && (
                    <div className="flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors cursor-pointer mb-12 px-2" style={{
                      fontFamily: "'Poppins', sans-serif"
                    }}
                    onClick={() => handleContact("website", profileData.websites[0].url)}>
                      <FaGlobe className="mr-2" style={{ fontSize: '14px' }} />
                      <span style={{ fontSize: '14px', fontWeight: 400 }} className="truncate">
                        {profileData.websites[0]?.url?.replace('https://', '').replace('http://', '').split('/')[0] || 'www.ny-software.co'}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Profile Video Section */}
              {renderProfileVideo()}

              {/* ========== Downloads ========== */}
              {renderDownloads()}

              {/* ========== Custom Fields ========== */}
              {renderCustomFields()}

              {/* ========== QR Code ========== */}
              {renderQRCode()}

              {/* ========== NFC Card ========== */}
              {renderNFCCard()}

              {/* ========== Interactive Elements ========== */}
              {renderInteractiveElements()}

              {/* GET IN TOUCH Section - Social Media Icons */}
              <div className="mb-16">
                <h2 
                  className="mb-10 text-center"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '20px',
                    fontWeight: 500,
                    letterSpacing: '0.3px',
                    color: '#000000'
                  }}
                >
                  GET IN TOUCH
                </h2>
                
                {/* Social icons */}
                <div className="flex justify-center space-x-8 mb-12 px-2">
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
                          width: '45px',
                          height: '45px',
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

              {/* OUR TEAM Section */}
              {currentPlan.showTeam && profileData.clientList.length > 0 && (
                <div className="pt-8 border-t border-gray-200 pb-12 px-2">
                  <h2 
                    className="mb-10 text-center"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '20px',
                      fontWeight: 500,
                      letterSpacing: '0.3px',
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
                            width: '45px', 
                            height: '45px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          }}
                        >
                          <div className="w-full h-full flex items-center justify-center text-white text-xs">
                            {(client?.name || client)?.charAt(0)?.toUpperCase() || "T"}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="ml-3">
                      <div 
                        className="rounded-full border-3 border-white shadow-md flex items-center justify-center"
                        style={{
                          width: '45px',
                          height: '45px',
                          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
                        }}
                      >
                        <span 
                          style={{ 
                            fontSize: '12px',
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
                          fontSize: '18px',
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 500,
                          letterSpacing: '0.2px',
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