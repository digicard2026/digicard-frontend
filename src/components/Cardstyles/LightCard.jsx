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
  FaAddressCard,
  FaTags,
  FaFileAlt,
  FaFileInvoice,
  FaRegClock,
  FaFileVideo,
  FaRobot,
  FaCommentDots,
  FaBullhorn,
  FaClipboardList,
  FaSuitcase,
  FaHistory,
  FaCheckCircle,
  FaLightbulb,
  FaAward,
  FaHandshake,
  FaChartLine,
  FaUsers,
  FaCogs,
  FaBullseye,
  FaRocket,
  FaHandHoldingUsd,
  FaShare
} from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";

// Video player component with better S3 handling
const VideoPlayer = ({ src, poster, title, className = "" }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const getVideoUrl = (url) => {
    if (!url) return '';
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

const LightCard = ({ cardData = {} }) => {
  console.log('🎯 LightTabCard received data:', cardData);
  const [activeTab, setActiveTab] = useState('profile');
  const [currentServiceSlide, setCurrentServiceSlide] = useState(0);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
  const [currentClientSlide, setCurrentClientSlide] = useState(0);
  const [currentVideoSlide, setCurrentVideoSlide] = useState(0);
  const [showAllClients, setShowAllClients] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  // Updated background image
  const backgroundImage = "https://images.pexels.com/photos/1257860/pexels-photo-1257860.jpeg";

  // Get current plan from cardData
  const currentPlan = cardData?.cardType || 'Personal';

  // Helper to check if a feature is allowed for current plan
  const isFeatureAllowed = (featureName) => {
    // All plans get basic features
    const basicFeatures = [
      'Profile Photo/Logo',
      'Name/Source Name',
      'Tag Line/Slogan',
      'Profile Video',
      'About Me',
      'Contact Management',
      'One-tap Call, WhatsApp, Email',
      'Website/Portfolio Link',
      'Location [Address]',
      'Social & Digital Hub',
      'Dynamic QR Code',
      'Share',
      'Downloads',
      'Videos'
    ];
    
    if (basicFeatures.includes(featureName)) {
      return true;
    }
    
    // Business and BusinessPremium features
    const businessFeatures = [
      'About Me/Company/Organization',
      'Virtual Number Integration',
      'Business Hours',
      'Professional/Business Details',
      'Services/Provision',
      'Brief about Product/Services',
      'Product Showcase/Gallery/Portfolio',
      'Product/Catalog [PDF]',
      'Product Video',
      'Testimonials'
    ];
    
    if (businessFeatures.includes(featureName)) {
      return currentPlan === 'Business' || currentPlan === 'BusinessPremium';
    }
    
    // BusinessPremium only features
    const premiumFeatures = [
      'Individual Product Display',
      'Testimonials / Client List',
      'Interactive Elements',
      'Call-to-Action',
      'Live Chat – WhatsApp / Messages',
      'Appointment Scheduler',
      'Digital Payments',
      'Lead / Contact Form',
      'Chat Assistant',
      'Brand Label Product/Services',
      'Product Range Display',
      'NFC Card Development with Print'
    ];
    
    if (premiumFeatures.includes(featureName)) {
      return currentPlan === 'BusinessPremium';
    }
    
    // Default fallback
    return true;
  };

  // Build complete profileData from cardData WITH ALL FIELDS
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
    emails: cardData?.emails || [
      { 
        address: cardData?.email || "", 
        label: "primary", 
        isPrimary: true 
      }
    ],
    phones: cardData?.phones || [{ number: "", isPrimary: true }],
    websites: cardData?.websites || [],
    addresses: cardData?.addresses || [],
    virtualNumber: cardData?.virtualNumber || { number: "", isEnabled: false },
    
    // Profile Content
    profileVideo: cardData?.profileVideo || { url: "", title: "Intro Video" },
    productVideo: cardData?.productVideo || null,
    videos: cardData?.videos || [],
    aboutText: cardData?.aboutText || ".",
    bio: cardData?.bio || cardData?.aboutText || "",
    servicesProducts: cardData?.servicesProducts || "",
    
    // Catalog
    catalog: cardData?.catalog || cardData?.catalogPDF || "",
    
    // Business Hours
    businessHours: cardData?.businessHours || [],
    
    // Social & Media
    socialLinks: cardData?.socialLinks || [],
    profilePhoto: cardData?.profilePhoto,
    companyLogo: cardData?.companyLogo,
    logoSize: cardData?.logoSize || "medium",
    
    // Services & Products
    services: cardData?.services || [],
    products: cardData?.products || [],
    
    // Premium Features
    testimonials: cardData?.testimonials || [],
    clientList: cardData?.clientList || [],
    gallery: cardData?.gallery || [],
    downloads: cardData?.downloads || [],
    interactiveElements: cardData?.interactiveElements || [],
    individualProductDisplay: cardData?.individualProductDisplay || false,
    businessCardInstagram: cardData?.businessCardInstagram || "",
    textbooks: cardData?.textbooks || [],

    // Digital Features
    dynamicQRCode: cardData?.dynamicQRCode || null,
    
    // Shareable URL
    shareableUrl: cardData?.shareableUrl || cardData?.shareUrl || "",
    
    // Brand & Product
    brandLabel: cardData?.brandLabel || "",
    productRangeDisplay: cardData?.productRangeDisplay || "grid",
    
    nfcSettings: cardData?.nfcSettings || { isEnabled: false },
    
    // Chat Features
    chatAssistant: cardData?.chatAssistant || { isEnabled: false, welcomeMessage: "Hello! How can I help you today?" },
    liveChat: cardData?.liveChat || { isEnabled: false, platform: "whatsapp", phoneNumber: "" },
    
    // Plan Info
    cardType: currentPlan,
    
    // Settings
    enableOneTapCall: cardData?.enableOneTapCall !== undefined ? cardData.enableOneTapCall : true,
    enableWhatsApp: cardData?.enableWhatsApp !== undefined ? cardData.enableWhatsApp : true,
    enableEmail: cardData?.enableEmail !== undefined ? cardData.enableEmail : true
  };

  // Feature to actual field mapping
  const featureToFieldMap = {
    // Personal Plan Features
    'Profile Photo/Logo': ['profilePhoto'],
    'Name/Source Name': ['firstName', 'lastName', 'name'],
    'Tag Line/Slogan': ['tagline'],
    'Profile Video': ['profileVideo'],
    'About Me': ['aboutText'],
    'Contact Management': ['emails', 'phones'],
    'One-tap Call, WhatsApp, Email': ['phones', 'emails'],
    'Website/Portfolio Link': ['websites'],
    'Location [Address]': ['addresses'],
    'Social & Digital Hub': ['socialLinks'],
    'Dynamic QR Code': ['dynamicQRCode'],
    'Share': ['shareableUrl'],
    'Downloads': ['downloads'],
    'Videos': ['videos'],
    
    // Business Plan Additional Features
    'About Me/Company/Organization': ['aboutText', 'companyName'],
    'Virtual Number Integration': ['virtualNumber'],
    'Business Hours': ['businessHours'],
    'Professional/Business Details': ['companyName', 'department'],
    'Services/Provision': ['services'],
    'Brief about Product/Services': ['servicesProducts'],
    'Product Showcase/Gallery/Portfolio': ['gallery'],
    'Product/Catalog [PDF]': ['catalog'],
    'Product Video': ['productVideo'],
    'Testimonials': ['testimonials'],
    
    // BusinessPremium Additional Features
    'Individual Product Display': ['services', 'individualProductDisplay'],
    'Testimonials / Client List': ['testimonials', 'clientList'],
    'Interactive Elements': ['interactiveElements'],
    'Call-to-Action': ['interactiveElements'],
    'Live Chat – WhatsApp / Messages': ['liveChat'],
    'Appointment Scheduler': ['interactiveElements'],
    'Digital Payments': ['interactiveElements'],
    'Lead / Contact Form': ['interactiveElements'],
    'Chat Assistant': ['chatAssistant'],
    'Brand Label Product/Services': ['brandLabel'],
    'Product Range Display': ['productRangeDisplay'],
    'NFC Card Development with Print': ['nfcSettings']
  };

  // Helper to check if a feature should be shown (both allowed by plan AND has data)
  const shouldShowFeature = (featureName, profileData) => {
    // First check if feature is allowed for current plan
    if (!isFeatureAllowed(featureName)) {
      return false;
    }
    
    // Then check if there's data for this feature
    const fields = featureToFieldMap[featureName] || [];
    return fields.some(field => {
      const data = profileData[field];
      if (Array.isArray(data)) {
        return data.length > 0;
      } else if (typeof data === 'object' && data !== null) {
        if (field === 'profileVideo' || field === 'productVideo') {
          return data?.url;
        }
        if (field === 'dynamicQRCode') {
          return data?.targetUrl || data?.qrImage;
        }
        if (field === 'nfcSettings') {
          return data?.isEnabled;
        }
        if (field === 'virtualNumber') {
          return data?.number || data?.isEnabled;
        }
        if (field === 'chatAssistant') {
          return data?.isEnabled;
        }
        if (field === 'liveChat') {
          return data?.isEnabled;
        }
        return Object.keys(data).length > 0;
      } else {
        return !!data && data !== '.';
      }
    });
  };

  // Helper to check if a feature should be shown for current user
  const checkFeature = (featureName) => {
    return shouldShowFeature(featureName, profileData);
  };

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
        color: white!important;
      }
      
      /* Casper-like font for body text - using Poppins as fallback */
      .casper-font {
        font-family: 'Poppins', sans-serif;
        font-weight: 200 !important;
        color: white !important;
      }
      
      html, body {
        height: 100%;
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch;
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding: 0;
      }
      #root {
        min-height: 100%;
        font-family: 'Poppins', sans-serif;
      }
      * {
        font-family: 'Poppins', sans-serif;
        box-sizing: border-box;
      }
      
      /* ========== DESKTOP VIEW ========== */
      @media (min-width: 641px) {
        .mobile-container {
          width: 375px;
          height: 667px;
          overflow: hidden;
          position: relative;
          scrollbar-width: none;
          -ms-overflow-style: none;
          background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('${backgroundImage}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          margin: 20px auto;
        }
        
        .mobile-container::-webkit-scrollbar {
          display: none;
        }
        
        .tab-content-wrapper {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
      }
      
      /* ========== MOBILE VIEW ========== */
      @media (max-width: 640px) {
        html, body {
          background: black !important;
          overflow: hidden;
        }
        
        .mobile-container {
          width: 100vw !important;
          height: 100vh !important;
          max-width: 100% !important;
          border-radius: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('${backgroundImage}') !important;
          background-size: cover !important;
          background-position: center !important;
          background-repeat: no-repeat !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          overflow: hidden !important;
          box-shadow: none !important;
        }
        
        .tab-content-wrapper {
          height: 100% !important;
          display: flex;
          flex-direction: column;
        }
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
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
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
      
      /* Video player styles */
      video {
        max-width: 100%;
        height: auto;
      }
      
      /* Tagline special styling */
      .tagline-container {
        position: relative;
        padding: 10px 20px;
        margin: 10px auto;
        max-width: 90%;
      }
      .tagline-text {
        font-style: italic;
        text-align: center;
        position: relative;
        z-index: 1;
        padding: 0 10px;
      }
      .tagline-glow {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
        border-radius: 10px;
        z-index: 0;
      }
      
      /* Business Hours Grid */
      .hours-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }
      
      /* Client List with toggle */
      .client-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 10px;
      }
      
      /* Interactive Elements Grid */
      .interactive-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 10px;
      }
      
      /* Share button styles */
      .share-button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      
      /* QR Code Modal */
      .qr-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
      }
      
      .qr-modal-content {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 30px;
        max-width: 300px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      }
      
      .qr-image {
        width: 200px;
        height: 200px;
        object-fit: contain;
        margin: 0 auto 20px;
        border-radius: 10px;
        background: white;
        padding: 10px;
      }
      
      /* Mobile-specific adjustments */
      @media (max-width: 640px) {
        .social-icon-large {
          width: 56px !important;
          height: 56px !important;
        }
        .social-icon-large svg {
          width: 24px !important;
          height: 24px !important;
        }
        
        .tab-content {
          padding: 0 16px 80px 16px !important;
        }
        
        .sticky-bottom-nav {
          border-top: 1px solid rgba(255,255,255,0.1);
          background: rgba(0, 0, 0, 0.9);
        }
        
        /* Safe area for notched phones */
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom, 20px);
        }
        
        /* Better touch targets */
        button, [role="button"] {
          min-height: 44px;
          min-width: 44px;
        }
      }
    `;
    document.head.appendChild(style);

    // Auto slide intervals
    const serviceInterval = setInterval(() => {
      if (profileData.services?.length > 0) {
        setCurrentServiceSlide(prev => (prev + 1) % Math.max(1, profileData.services.length));
      }
    }, 4000);

    const productInterval = setInterval(() => {
      if (profileData.products?.length > 0) {
        setCurrentProductSlide(prev => (prev + 1) % Math.max(1, profileData.products.length));
      }
    }, 4000);

    const testimonialInterval = setInterval(() => {
      if (profileData.testimonials?.length > 0) {
        setCurrentTestimonialSlide(prev => (prev + 1) % Math.max(1, profileData.testimonials.length));
      }
    }, 5000);

    const videoInterval = setInterval(() => {
      if (profileData.videos?.length > 0) {
        setCurrentVideoSlide(prev => (prev + 1) % Math.max(1, profileData.videos.length));
      }
    }, 4000);

    const clientInterval = setInterval(() => {
      if (profileData.clientList?.length > 0) {
        setCurrentClientSlide(prev => (prev + 1) % Math.max(1, profileData.clientList.length));
      }
    }, 3000);

    return () => {
      document.head.removeChild(style);
      clearInterval(serviceInterval);
      clearInterval(productInterval);
      clearInterval(testimonialInterval);
      clearInterval(videoInterval);
      clearInterval(clientInterval);
    };
  }, []);

  // Format business hours
  const formatBusinessHours = () => {
    const hours = profileData.businessHours;
    if (!hours || (Array.isArray(hours) && hours.length === 0)) return null;
    
    const hoursArray = Array.isArray(hours) ? hours : [];
    if (hoursArray.length === 0) return null;
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    return days.map(day => {
      const dayData = hoursArray.find(h => h.day === day);
      if (!dayData || dayData.isClosed || (!dayData.openingTime && !dayData.closingTime)) {
        return { day, display: `${day.charAt(0).toUpperCase() + day.slice(1)}: Closed` };
      }
      return { 
        day, 
        display: `${day.charAt(0).toUpperCase() + day.slice(1)}: ${dayData.openingTime || 'N/A'} - ${dayData.closingTime || 'N/A'}`,
        openingTime: dayData.openingTime,
        closingTime: dayData.closingTime
      };
    });
  };

  // Bottom navbar tabs - show based on plan and data availability
  const getAvailableTabs = () => {
    const allTabs = [
      { 
        id: 'profile', 
        label: 'Profile', 
        icon: FaUser, 
        tooltip: 'Profile',
        show: true // Always show profile tab
      },
      { 
        id: 'services', 
        label: 'Services', 
        icon: FaShoppingCart, 
        tooltip: 'Services & Products',
        show: checkFeature('Services/Provision') || 
              checkFeature('Brief about Product/Services') ||
              checkFeature('Product/Catalog [PDF]') ||
              checkFeature('Product Video') ||
              checkFeature('Individual Product Display')
      },
      { 
        id: 'contact', 
        label: 'Contact', 
        icon: FaAddressCard, 
        tooltip: 'Contact Info',
        show: checkFeature('Contact Management') || 
              checkFeature('Website/Portfolio Link') ||
              checkFeature('Location [Address]') ||
              checkFeature('Virtual Number Integration') ||
              checkFeature('Business Hours') ||
              checkFeature('Social & Digital Hub')
      },
      { 
        id: 'gallery', 
        label: 'Gallery', 
        icon: FaImages, 
        tooltip: 'Gallery',
        show: checkFeature('Product Showcase/Gallery/Portfolio') || 
              checkFeature('Videos')
      },
      { 
        id: 'more', 
        label: 'More', 
        icon: FaEllipsisH, 
        tooltip: 'More Info',
        show: checkFeature('Testimonials') || 
              checkFeature('Testimonials / Client List') ||
              checkFeature('Downloads') ||
              checkFeature('Interactive Elements') ||
              checkFeature('Dynamic QR Code') ||
              checkFeature('NFC Card Development with Print') ||
              checkFeature('Share') ||
              checkFeature('Chat Assistant') ||
              checkFeature('Brand Label Product/Services')
      }
    ];

    return allTabs.filter(tab => tab.show);
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
      case "virtualNumber":
        window.open(`tel:${value}`);
        break;
      default:
        window.open(value, "_blank");
    }
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

  // QR Code functionality
  const renderQRCodeModal = () => {
    if (!showQRCode || !profileData.dynamicQRCode) return null;
    
    const qrData = profileData.dynamicQRCode;
    const qrImageUrl = qrData.qrImage || 
      `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData.targetUrl || profileData.shareableUrl || window.location.href)}`;
    
    return (
      <div className="qr-modal-overlay" onClick={() => setShowQRCode(false)}>
        <div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
          <h3 className="rumaila-font text-xl mb-4">Scan QR Code</h3>
          <img 
            src={qrImageUrl} 
            alt="QR Code" 
            className="qr-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              const placeholder = document.createElement('div');
              placeholder.className = 'qr-image flex items-center justify-center bg-white';
              placeholder.innerHTML = '<FaQrcode className="w-16 h-16 text-gray-400" />';
              e.target.parentElement.appendChild(placeholder);
            }}
          />
          <p className="casper-font text-sm mb-4">Scan to save contact or visit profile</p>
          <button
            onClick={() => setShowQRCode(false)}
            className="casper-font bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-lg transition-all"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const getSocialIcon = (platform) => {
    const platformLower = platform.toLowerCase();
    switch (platformLower) {
      case 'facebook': return <FaFacebookF />;
      case 'instagram': return <FaInstagram />;
      case 'twitter': return <FaXTwitter />;
      case 'x': return <FaXTwitter />;
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
      case 'call-to-action': return <FaBullhorn className="w-4 h-4" />;
      case 'shop-flow': return <FaShoppingCart className="w-4 h-4" />;
      case 'live-chat': return <FaCommentDots className="w-4 h-4" />;
      case 'appointment-scheduler': return <FaCalendarAlt className="w-4 h-4" />;
      case 'digital-payments': return <FaCreditCard className="w-4 h-4" />;
      case 'lead-form': return <FaClipboardList className="w-4 h-4" />;
      case 'contact-form': return <FaEnvelope className="w-4 h-4" />;
      case 'language-switcher': return <FaLanguage className="w-4 h-4" />;
      case 'chat-assistant': return <FaRobot className="w-4 h-4" />;
      case 'booking-system': return <FaCalendarAlt className="w-4 h-4" />;
      case 'newsletter-signup': return <FaEnvelope className="w-4 h-4" />;
      case 'file-download': return <FaDownload className="w-4 h-4" />;
      default: return <FaGlobe className="w-4 h-4" />;
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

  // Get current service item
  const getCurrentServiceItem = () => {
    return profileData.services[currentServiceSlide];
  };

  // Get current product item
  const getCurrentProductItem = () => {
    return profileData.products[currentProductSlide];
  };

  // Get current testimonial item
  const getCurrentTestimonialItem = () => {
    return profileData.testimonials[currentTestimonialSlide];
  };

  // Get current video item
  const getCurrentVideoItem = () => {
    return profileData.videos[currentVideoSlide];
  };

  // Tagline Component
  const renderTagline = () => {
    if (!profileData.tagline) return null;
    
    return (
      <div className="tagline-container">
        <div className="tagline-glow"></div>
        <p className="casper-font text-center text-sm tagline-text">
          "{profileData.tagline}"
        </p>
      </div>
    );
  };

  // Services/Products Overview
  const renderServicesProductsOverview = () => {
    if (!profileData.servicesProducts) return null;
    
    return (
      <div className="mb-4">
        <div className="flex items-center justify-center mb-2">
          <FaSuitcase className="w-5 h-5 text-blue-400 mr-2" />
          <h3 className="rumaila-font text-lg">Services & Products Overview</h3>
        </div>
        <div className="rounded-xl p-4 bg-white/5">
          <p className="casper-font text-sm text-justify">{profileData.servicesProducts}</p>
        </div>
      </div>
    );
  };

  // Business Hours Component
  const renderBusinessHours = () => {
    if (!checkFeature('Business Hours')) return null;
    
    const hours = formatBusinessHours();
    if (!hours) return null;
    
    return (
      <div className="mb-4">
        <div className="flex items-center justify-center mb-2">
          <FaRegClock className="w-5 h-5 text-yellow-400 mr-2" />
          <h3 className="rumaila-font text-lg">Business Hours</h3>
        </div>
        <div className="space-y-2">
          {hours.map((hour, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <p className="rumaila-font text-xs">{hour.day.charAt(0).toUpperCase() + hour.day.slice(1)}</p>
              <p className="casper-font text-xs">
                {hour.openingTime && hour.closingTime 
                  ? `${hour.openingTime} - ${hour.closingTime}`
                  : 'Closed'
                }
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Virtual Number Component
  const renderVirtualNumber = () => {
    if (!checkFeature('Virtual Number Integration')) return null;
    if (!profileData.virtualNumber?.number || !profileData.virtualNumber?.isEnabled) return null;
    
    return (
      <div className="mb-4">
        <div className="flex items-center justify-center mb-2">
          <FaPhoneAlt className="w-5 h-5 text-green-400 mr-2" />
          <h3 className="rumaila-font text-lg">Virtual Number</h3>
        </div>
        <button
          onClick={() => handleContact("virtualNumber", profileData.virtualNumber.number)}
          className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 py-3 rounded-xl border border-green-500/30 transition-all transform hover:scale-[1.02]"
        >
          <span className="casper-font">{profileData.virtualNumber.number}</span>
        </button>
      </div>
    );
  };

  // Catalog Component
  const renderCatalog = () => {
    if (!checkFeature('Product/Catalog [PDF]')) return null;
    
    const catalog = profileData.catalog;
    if (!catalog) return null;
    
    // Handle both string URL and object format
    const catalogUrl = typeof catalog === 'string' ? catalog : catalog?.url || catalog?.fileUrl;
    const catalogName = catalog?.name || "Catalog";
    const catalogSize = catalog?.fileSize || "";
    
    if (!catalogUrl) return null;
    
    return (
      <div className="mb-4">
        <div className="flex items-center justify-center mb-2">
          <FaFileInvoice className="w-5 h-5 text-red-400 mr-2" />
          <h3 className="rumaila-font text-lg">Catalog</h3>
        </div>
        <button
          onClick={() => window.open(catalogUrl, '_blank')}
          className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 rounded-xl border border-red-500/30 transition-all transform hover:scale-[1.02] flex items-center justify-center"
        >
          <FaFilePdf className="w-5 h-5 mr-2" />
          <span className="casper-font">Download {catalogName}</span>
          {catalogSize && <span className="casper-font text-xs ml-2">({catalogSize})</span>}
        </button>
      </div>
    );
  };

  // Brand Label Component
  const renderBrandLabel = () => {
    if (!checkFeature('Brand Label Product/Services')) return null;
    if (!profileData.brandLabel) return null;
    
    return (
      <div className="mb-4">
        <div className="flex items-center justify-center mb-2">
          <FaTags className="w-5 h-5 text-purple-400 mr-2" />
          <h3 className="rumaila-font text-lg">Brand Label</h3>
        </div>
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <p className="casper-font text-sm">{profileData.brandLabel}</p>
        </div>
      </div>
    );
  };

  // Product Video Component
  const renderProductVideo = () => {
    if (!checkFeature('Product Video')) return null;
    if (!profileData.productVideo?.url) return null;
    
    return (
      <div className="mb-4">
        <div className="flex items-center justify-center mb-2">
          <FaFileVideo className="w-5 h-5 text-purple-400 mr-2" />
          <h3 className="rumaila-font text-lg">Product Video</h3>
        </div>
        <VideoPlayer
          src={profileData.productVideo.url}
          poster={profileData.productVideo.thumbnail}
          title={profileData.productVideo.title || "Product Video"}
          className="h-40"
        />
      </div>
    );
  };

  // Videos Slider Component
  const renderVideosSlider = () => {
    if (!profileData.videos?.length) return null;
    
    return (
      <div className="mb-4">
        <div className="flex items-center justify-center mb-2">
          <FaVideo className="w-5 h-5 text-blue-400 mr-2" />
          <h3 className="rumaila-font text-lg">Videos</h3>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-white/5 p-4">
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
                    index === currentVideoSlide ? 'bg-blue-400 scale-110' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Share Button Component
  const renderShareButton = () => {
    if (!profileData.shareableUrl) return null;
    
    return (
      <div className="mb-4 mt-5">
        <button
          onClick={handleShare}
          className="w-full share-button hover:opacity-90 text-white py-3 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center"
        >
          <FaShare className="w-5 h-5 mr-2" />
          <span className="casper-font font-medium">Share My Card</span>
        </button>
      </div>
    );
  };

  // QR Code Component
  const renderQRCode = () => {
    if (!profileData.dynamicQRCode) return null;
    
    const qrData = profileData.dynamicQRCode;
    const qrImageUrl = qrData.qrImage || 
      `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData.targetUrl || profileData.shareableUrl || window.location.href)}`;
    
    return (
      <div className="mb-4">
        <div className="flex items-center justify-center mb-2">
          <FaQrcode className="w-5 h-5 text-blue-400 mr-2" />
          <h3 className="rumaila-font text-lg">QR Code</h3>
        </div>
        <div className="flex flex-col items-center">
          <div 
            className="bg-white/10 rounded-xl p-4 cursor-pointer transform transition-transform duration-300 hover:scale-105"
            onClick={() => setShowQRCode(true)}
          >
            <img
              src={qrImageUrl}
              alt="QR Code"
              className="w-32 h-32 object-contain rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.className = 'w-32 h-32 flex items-center justify-center bg-white/10 rounded-lg';
                placeholder.innerHTML = '<FaQrcode className="w-12 h-12 text-gray-400" />';
                e.target.parentElement.appendChild(placeholder);
              }}
            />
          </div>
          <p className="casper-font text-sm mt-3 text-center">Tap to enlarge QR Code</p>
          <button
            onClick={() => setShowQRCode(true)}
            className="mt-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            View Full Size
          </button>
        </div>
      </div>
    );
  };

  // NFC Card Component
  const renderNFCCard = () => {
    if (!checkFeature('NFC Card Development with Print')) return null;
    
    return (
      <div className="mb-4">
        <div className="flex items-center justify-center mb-2">
          <FaIdCard className="w-5 h-5 text-purple-400 mr-2" />
          <h3 className="rumaila-font text-lg">NFC Card</h3>
        </div>
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 rounded-xl p-4 flex items-center justify-center">
          <FaIdCard className="w-8 h-8 text-purple-400 mr-3" />
          <div>
            <p className="rumaila-font text-sm">NFC Card Available</p>
            <p className="casper-font text-xs">Tap to connect with NFC</p>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Client List with toggle
  const renderEnhancedClientList = () => {
    if (!profileData.clientList?.length) return null;
    
    const displayClients = showAllClients ? profileData.clientList : profileData.clientList.slice(0, 6);
    
    return (
      <div className="mb-4">
        <div className="flex items-center justify-center mb-2">
          <FaUsers className="w-5 h-5 text-blue-400 mr-2" />
          <h3 className="rumaila-font text-lg">Our Clients</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {displayClients.map((client, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-3 text-center">
              <p className="casper-font text-sm truncate">
                {typeof client === 'string' ? client : client.name || client.company || 'Client'}
              </p>
            </div>
          ))}
        </div>
        {profileData.clientList.length > 6 && (
          <button
            onClick={() => setShowAllClients(!showAllClients)}
            className="w-full mt-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2 rounded-xl transition-all"
          >
            <span className="casper-font text-sm">
              {showAllClients ? 'Show Less' : `Show All (${profileData.clientList.length})`}
            </span>
          </button>
        )}
      </div>
    );
  };

  // Chat Assistant Component
  const renderChatAssistant = () => {
    if (!checkFeature('Chat Assistant')) return null;
    
    return (
      <div className="mb-4">
        <div className="flex items-center justify-center mb-2">
          <FaRobot className="w-5 h-5 text-blue-400 mr-2" />
          <h3 className="rumaila-font text-lg">Chat Assistant</h3>
        </div>
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <p className="casper-font text-sm mb-2">{profileData.chatAssistant.welcomeMessage}</p>
          <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2 px-4 rounded-lg transition-all">
            Start Chat
          </button>
        </div>
      </div>
    );
  };

  // Live Chat Component
  const renderLiveChat = () => {
    if (!checkFeature('Live Chat – WhatsApp / Messages')) return null;
    
    return (
      <div className="mb-4">
        <div className="flex items-center justify-center mb-2">
          <FaCommentDots className="w-5 h-5 text-green-400 mr-2" />
          <h3 className="rumaila-font text-lg">Live Chat</h3>
        </div>
        <button
          onClick={() => handleContact("whatsapp", profileData.liveChat.phoneNumber)}
          className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 py-3 rounded-xl border border-green-500/30 transition-all transform hover:scale-[1.02] flex items-center justify-center"
        >
          <FaWhatsapp className="w-5 h-5 mr-2" />
          <span className="casper-font">Chat on {profileData.liveChat.platform}</span>
        </button>
      </div>
    );
  };

  // ========== MAIN COMPONENT RENDERING ==========

  // Profile Header Component
  const ProfileHeader = () => {
    // Check if profile photo feature is allowed
    if (!checkFeature('Profile Photo/Logo')) {
      return (
        <div className="pb-4 pt-6 no-bg-border">
          {checkFeature('Name/Source Name') && (
            <h1 className="rumaila-font text-4xl font-bold text-center mb-1">
              {profileData.name}
            </h1>
          )}
          {(currentPlan === 'Business' || currentPlan === 'BusinessPremium') && profileData.jobTitle && (
            <div className="mb-2">
              <p className="rumaila-font text-center text-m">
                {profileData.jobTitle}
              </p>
            </div>
          )}
          {checkFeature('Tag Line/Slogan') && renderTagline()}
        </div>
      );
    }
    
    return (
      <div className="pb-4 pt-6 no-bg-border">
        {/* Company Logo and Name - Only show if Business/BusinessPremium */}
        {profileData.companyLogo && (currentPlan === 'Business' || currentPlan === 'BusinessPremium') && (
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
              {profileData.companyName && (
                <h4 className="rumaila-font text-sm">
                  {profileData.companyName}
                </h4>
              )}
            </div>
          </div>
        )}

        {/* Profile Section */}
        <div className="relative flex flex-col items-center justify-center px-4">
          {/* Profile Photo - INCREASED SIZE to w-40 h-40 */}
          <div className="mb-3">
            {profileData.profilePhoto ? (
              <img
                src={profileData.profilePhoto}
                alt={profileData.name}
                className="w-40 h-40 rounded-full border-4 border-white/20 shadow-lg object-cover"
                onError={(e) => {
                  console.log('Profile photo failed to load:', profileData.profilePhoto);
                  e.target.style.display = 'none';
                }}
              />
            ) : null}
            {/* Fallback profile picture - SAME SIZE w-40 h-40 */}
            {!profileData.profilePhoto && (
              <div className="w-40 h-40 rounded-full border-4 border-white/20 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {profileData.name?.charAt(0) || "Z"}
              </div>
            )}
          </div>

          {/* Name - Only show if feature allowed */}
          {checkFeature('Name/Source Name') && (
            <h1 className="rumaila-font text-4xl font-bold text-center mb-1">
              {profileData.name}
            </h1>
          )}

          {/* Designation Box - Only for Business/BusinessPremium */}
          {(currentPlan === 'Business' || currentPlan === 'BusinessPremium') && profileData.jobTitle && (
            <div className="mb-2">
              <p className="rumaila-font text-center text-m">
                {profileData.jobTitle}
              </p>
            </div>
          )}

          {/* Tagline Box - Only show if feature allowed */}
          {checkFeature('Tag Line/Slogan') && renderTagline()}
        </div>
      </div>
    );
  };

  // Profile Tab
  const ProfileTab = () => (
    <div className="space-y-6 px-4 pb-4">
      <ProfileHeader />

      {/* About Section - Only show if feature allowed */}
      {checkFeature('About Me') && profileData.aboutText && profileData.aboutText !== "." && (
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

      {/* Professional Bio - Only for Business/BusinessPremium */}
      {(currentPlan === 'Business' || currentPlan === 'BusinessPremium') && profileData.bio && (
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

      {/* Services/Products Overview - Only for Business/BusinessPremium */}
      {checkFeature('Brief about Product/Services') && renderServicesProductsOverview()}

      {/* Organization Details - Only for Business/BusinessPremium */}
      {(currentPlan === 'Business' || currentPlan === 'BusinessPremium') && 
       (profileData.organization || profileData.foundedName) && (
        <div>
          <div className="mb-3 no-bg-border">
            <h3 className="rumaila-font text-xl flex items-center justify-center">
              <FaBuilding className="w-5 h-5 text-green-400 mr-2" />
              Organization Details
            </h3>
          </div>
          <div className="space-y-2 text-center bg-white/5 rounded-xl p-4">
            {profileData.organization && (
              <p className="casper-font text-sm">
                <span className="rumaila-font">Organization:</span> {profileData.organization}
              </p>
            )}
            {profileData.foundedName && (
              <p className="casper-font text-sm mt-2">
                <span className="rumaila-font">Founded By:</span> {profileData.foundedName}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Brand Label - Only for BusinessPremium */}
      {renderBrandLabel()}

      {/* Profile Video - Only show if feature allowed */}
      {checkFeature('Profile Video') && profileData.profileVideo?.url && (
        <div>
          <div className="mb-3 no-bg-border">
            <h3 className="rumaila-font text-xl flex items-center justify-center">
              <FaVideo className="w-5 h-5 text-red-400 mr-2" />
              Introduction Video
            </h3>
          </div>
          <VideoPlayer
            src={profileData.profileVideo.url}
            poster={profileData.profileVideo.thumbnail}
            title={profileData.profileVideo.title || "Introduction Video"}
            className="h-40"
          />
        </div>
      )}
    </div>
  );

  // ServicesTab Component
  const ServicesTab = () => {
    const hasServices = checkFeature('Services/Provision') && profileData.services?.length > 0;
    const hasProducts = checkFeature('Services/Provision') && profileData.products?.length > 0;
    const hasCatalog = checkFeature('Product/Catalog [PDF]') && !!profileData.catalog;
    const hasProductVideo = checkFeature('Product Video') && !!profileData.productVideo?.url;
    const hasIndividualDisplay = checkFeature('Individual Product Display');

    if (!hasServices && !hasProducts && !hasCatalog && !hasProductVideo) {
      return (
        <div className="flex flex-col items-center justify-center h-full px-4 pt-20">
          <FaShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
          <p className="casper-font text-center text-sm">No services or products available</p>
        </div>
      );
    }

    return (
      <div className="space-y-6 px-4 pt-4 pb-4 mt-5">
        {/* Catalog */}
        {hasCatalog && renderCatalog()}

        {/* Product Video */}
        {hasProductVideo && renderProductVideo()}

        {/* Services Slider */}
        {hasServices && (
          <div>
            <div className="mb-9 no-bg-border mt-4">
              <h3 className="rumaila-font text-xl flex items-center justify-center">
                <FaShoppingCart className="w-5 h-5 text-blue-400 mr-2" />
                Services
              </h3>
            </div>
            
            <div className="relative overflow-hidden">
              <div className="flex transition-transform duration-300">
                {getCurrentServiceItem() && (
                  <div className="w-full flex-shrink-0">
                    <div className="hover:shadow-2xl transition-all rounded-xl overflow-hidden">
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

        {/* Products Slider */}
        {hasProducts && (
          <div>
            <div className="mb-4 no-bg-border">
              <h3 className="rumaila-font text-xl flex items-center justify-center">
                <FaGem className="w-5 h-5 text-purple-400 mr-2" />
                Products
              </h3>
            </div>
            
            <div className="relative overflow-hidden">
              <div className="flex transition-transform duration-300">
                {getCurrentProductItem() && (
                  <div className="w-full flex-shrink-0">
                    <div className="hover:shadow-2xl transition-all rounded-xl overflow-hidden">
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

  // ContactTab Component
  const ContactTab = () => {
    const primaryPhone = profileData.phones.find(phone => phone.isPrimary) || profileData.phones[0];
    const primaryEmail = profileData.emails.find(email => email.isPrimary) || profileData.emails[0];
    
    return (  
      <div className="space-y-6 px-4 pt-4 pb-4">
        {/* Email Section */}
        {profileData.email && (
          <div className="mb-4 mt-5">
            <div className="flex items-center justify-center mb-2">
              <FaEnvelope className="w-5 h-5 text-blue-400 mr-2" />
              <h3 className="rumaila-font text-lg">Email</h3>
            </div>
            <button
              onClick={() => handleContact("email", profileData.email)}
              className="w-full bg-white/5 hover:bg-white/10 text-left p-3 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-between"
            >
              <div className="flex items-center">
                <FaEnvelope className="w-4 h-4 text-blue-400 mr-2" />
                <span className="casper-font text-sm">Primary Email</span>
              </div>
              <span className="casper-font text-sm truncate ml-2">{profileData.email}</span>
            </button>
          </div>
        )}

        {/* Multiple Emails */}
        {profileData.emails.length > 0 && profileData.emails.some(email => email.address && email.address.trim()) && (
          <div className="mb-4">
            <div className="flex items-center justify-center mb-2">
              <FaEnvelope className="w-5 h-5 text-blue-400 mr-2" />
              <h3 className="rumaila-font text-lg">Email Addresses</h3>
            </div>
            <div className="space-y-2">
              {profileData.emails
                .filter(email => email.address && email.address.trim())
                .map((email, index) => (
                  <button
                    key={index}
                    onClick={() => handleContact("email", email.address)}
                    className="w-full bg-white/5 hover:bg-white/10 text-left p-3 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <FaEnvelope className="w-4 h-4 text-blue-400 mr-2" />
                      <span className="casper-font text-sm">
                        {email.label || (email.isPrimary ? "Primary" : `Email ${index + 1}`)}
                      </span>
                    </div>
                    <span className="casper-font text-sm truncate ml-2">{email.address}</span>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Virtual Number */}
        {renderVirtualNumber()}

        {/* Business Hours */}
        {renderBusinessHours()}

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
            {primaryEmail?.address && profileData.enableEmail && (
              <button
                onClick={() => handleContact("email", primaryEmail.address)}
                className="flex-1 bg-gray-800 hover:bg-gray-900 text-white rounded-xl py-4 px-4 flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-sm"
              >
                <FaEnvelope className="w-5 h-5 mr-2" />
                <span className="casper-font font-medium">Email</span>
              </button>
            )}

            {/* Website Button */}
            {profileData.websites.length > 0 && profileData.websites[0].url && (
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

        {/* Addresses */}
        {profileData.addresses.length > 0 && (
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

        {/* Social Links */}
        {profileData.socialLinks.filter(link => link.url).length > 0 && (
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

  // GalleryTab Component
  const GalleryTab = () => {
    const hasGallery = checkFeature('Product Showcase/Gallery/Portfolio') && profileData.gallery.length > 0;
    const hasVideos = checkFeature('Videos') && profileData.videos.length > 0;
    
    if (!hasGallery && !hasVideos) {
      return (
        <div className="flex flex-col items-center justify-center h-full px-4 pt-20">
          <FaImages className="w-16 h-16 text-gray-400 mb-4" />
          <p className="casper-font text-center text-sm">No gallery or videos available</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4 px-4 pt-4 pb-4 mt-5">
        <div>
          <div className="mb-4 no-bg-border">
            <h3 className="rumaila-font text-xl flex items-center justify-center">
              <FaImages className="w-5 h-5 text-blue-400 mr-2 mt-4" />
              Gallery
            </h3>
          </div>
          
          {/* Image Gallery */}
          {hasGallery && (
            <div className="grid grid-cols-2 gap-4 mb-6">
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
          )}
          
          {/* Videos */}
          {hasVideos && renderVideosSlider()}
        </div>
      </div>
    );
  };

  // MoreTab Component
  const MoreTab = () => {
    const hasTestimonials = checkFeature('Testimonials') && profileData.testimonials.length > 0;
    const hasClientList = checkFeature('Testimonials / Client List') && profileData.clientList.length > 0;
    const hasDownloads = checkFeature('Downloads') && profileData.downloads.length > 0;
    const hasInteractiveElements = checkFeature('Interactive Elements') && profileData.interactiveElements.length > 0;
    const hasQRCode = checkFeature('Dynamic QR Code') && !!profileData.dynamicQRCode;
    const hasNFC = checkFeature('NFC Card Development with Print') && !!profileData.nfcSettings?.isEnabled;
    const hasShare = checkFeature('Share') && !!profileData.shareableUrl;
    const hasChatAssistant = checkFeature('Chat Assistant') && !!profileData.chatAssistant?.isEnabled;
    const hasLiveChat = checkFeature('Live Chat – WhatsApp / Messages') && !!profileData.liveChat?.isEnabled;

    const hasContent = hasTestimonials || hasClientList || hasDownloads || 
                      hasInteractiveElements || hasQRCode || hasNFC || hasShare ||
                      hasChatAssistant || hasLiveChat;

    if (!hasContent) {
      return (
        <div className="flex flex-col items-center justify-center h-full px-4 pt-20">
          <FaEllipsisH className="w-16 h-16 text-gray-400 mb-4" />
          <p className="casper-font text-center text-sm">No additional features available</p>
        </div>
      );
    }

    return (
      <div className="space-y-6 px-4 pt-4 pb-4">
        {/* Share Button */}
        {hasShare && renderShareButton()}

        {/* QR Code */}
        {hasQRCode && renderQRCode()}

        {/* Chat Assistant */}
        {hasChatAssistant && renderChatAssistant()}

        {/* Live Chat */}
        {hasLiveChat && renderLiveChat()}

        {/* Testimonials Slider */}
        {hasTestimonials && (
          <div>
            <div className="mb-4 no-bg-border">
              <h3 className="rumaila-font text-xl flex items-center justify-center">
                <FaStar className="w-5 h-5 text-yellow-400 mr-2 mt-4" />
                Testimonials
              </h3>
            </div>
            
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

        {/* Enhanced Client List */}
        {renderEnhancedClientList()}

        {/* Downloads */}
        {hasDownloads && (
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

        {/* Interactive Elements */}
        {hasInteractiveElements && (
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
                      className="flex flex-col items-center justify-center p-4 rounded-xl hover:shadow-xl transition-all transform hover:scale-105 bg-gray-50/10"
                    >
                      <div className="text-blue-400 mb-3">
                        {getInteractiveElementIcon(element.type)}
                      </div>
                      <span className="casper-font text-sm text-center">
                        {getInteractiveElementLabel(element.type)}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>
        )}

        {/* NFC Card */}
        {hasNFC && renderNFCCard()}
      </div>
    );
  };

  const primaryPhone = profileData.phones.find(phone => phone.isPrimary) || profileData.phones[0];
  const primaryEmail = profileData.emails.find(email => email.isPrimary) || profileData.emails[0];

  return (
    <>
      {/* QR Code Modal */}
      {renderQRCodeModal()}
      
      <div className="mobile-container">
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
          <div className="sticky-bottom-nav safe-area-bottom">
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

          {/* Fixed Contact Buttons - INCREASED SIZE to w-12 h-12 */}
          <div className="absolute bottom-24 right-4 z-20 flex flex-col space-y-3">
            {/* Call Button */}
            {primaryPhone && profileData.enableOneTapCall && (
              <button
                onClick={() => handleContact("phone", primaryPhone.number)}
                className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all transform hover:scale-110 border border-green-400/30"
              >
                <FaPhoneAlt className="w-4 h-4" />
              </button>
            )}
            
            {/* Email Button */}
            {(primaryEmail?.address || profileData.email) && profileData.enableEmail && (
              <button
                onClick={() => handleContact("email", primaryEmail?.address || profileData.email)}
                className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all transform hover:scale-110 border border-red-400/30"
              >
                <FaEnvelope className="w-4 h-4" />
              </button>
            )}
            
            {/* WhatsApp Button */}
            {primaryPhone && profileData.enableWhatsApp && (
              <button
                onClick={() => handleContact("whatsapp", primaryPhone.number)}
                className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all transform hover:scale-110 border border-green-400/30"
              >
                <FaWhatsapp className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LightCard;