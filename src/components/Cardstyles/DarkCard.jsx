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
  FaFileAlt,
  FaInfoCircle,
  FaSuitcase,
  FaUsers,
  FaFileInvoice,
  FaFileVideo,
  FaTags,
  FaClipboardList,
  FaBullhorn,
  FaRobot,
  FaCommentDots,
  FaRegClock,
  FaFileArchive,
  FaShare
} from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";

// ========== COPY THE VIDEOPLAYER COMPONENT FROM MODERNCARD ==========
const VideoPlayer = ({ src, poster, title, className = "" }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Fix S3 video URL for proper playback - THIS IS THE KEY FUNCTION
  const getVideoUrl = (url) => {
    if (!url || typeof url !== 'string') return '';
    
    if (url.includes('amazonaws.com') || url.includes('s3.') || url.includes('.s3.')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}response-content-disposition=inline&response-content-type=video%2Fmp4`;
    }
    
    return url;
  };
  
  const videoSrc = typeof src === 'object' && src !== null && src.url ? src.url : src;
  const videoUrl = getVideoUrl(videoSrc);
  
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
  
  if (!videoUrl) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gray-800 rounded-lg ${className}`}>
        <FaVideo className="w-12 h-12 text-gray-400 mb-2" />
        <p className="text-sm text-gray-400">No video available</p>
        {title && <p className="text-xs text-gray-500 mt-1">{title}</p>}
      </div>
    );
  }
  
  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/20 z-10">
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
          <p className="text-sm text-white">{title}</p>
        </div>
      )}
    </div>
  );
};
// ========== END OF VIDEOPLAYER COMPONENT ==========

const cardFieldsConfig = {
  Personal: {
    name: 'Personal',
    description: 'Basic digital card with essential features',
    allowed: [
      // From Personal column in image
      'profilePhoto',         // Profile /PC/Logo
      'firstName',            // Name / source name
      'lastName',             // Name / source name  
      'tagline',              // Tag line / Slogan
      'profileVideo',         // Profile video
      'aboutText',            // About my self
      
      // Contact management section
      'phones',               // One-tap call, WhatsApp, email
      'emails',               // One-tap call, WhatsApp, email
      'websites',             // website/portfolio link
      'addresses',            // Location [address]
      
      // Social & Digital Hub section
      'socialLinks',          // LinkedIn, Instagram, Facebook, X, YouTube, WhatsApp Business Link, Google Business Page
      
      // Utilities section
      'dynamicQRCode',        // Dynamic QR code
      'shareableUrl',         // Share
      'nfcSettings',          // NFC card developer with Print
      'downloads',            // Downloads
      'videos'                // Videos
    ]
  },

  Business: {
    name: 'Business',
    description: 'Enhanced features for professional presence',
    allowed: [
      // ALL Personal fields
      'profilePhoto',         // Profile /PC/Logo
      'firstName',            // Name / source name
      'lastName',             // Name / source name  
      'tagline',              // Tag line / Slogan
      'profileVideo',         // Profile video
      'aboutText',            // About my self/company/organisation
      'phones',               // One-tap call, WhatsApp, email
      'emails',               // One-tap call, WhatsApp, email
      'websites',             // website/portfolio link
      'addresses',            // Location [address]
      'socialLinks',          // Social & Digital Hub
      'dynamicQRCode',        // Dynamic QR code
      'shareableUrl',         // Share
      'nfcSettings',          // NFC card developer with Print
      'downloads',            // Downloads
      'videos',               // Videos
      
      // PLUS Business-only fields from image
      'companyName',          // Company name / Organisation
      'businessHours',        // Business hours
      'virtualNumber',        // Virtual no integration (Optional @m extra cost)
      
      // Professional/Business Details section
      'services',             // Service/Provision
      'servicesProducts',     // Brief about Product/Services (Only Product name display with general briefing)
      'gallery',              // Product show case / Gallery/Portfolio
      'catalog',              // Product/Catalog [PDF]
      'productVideo',         // Product video
      'testimonials'          // Testimonials
    ]
  },

  BusinessPremium: {
    name: 'BusinessPremium',
    description: 'Advanced features with interactive elements',
    allowed: [
      // ALL Business fields (which includes all Personal fields)
      'profilePhoto',         // Profile /PC/Logo
      'firstName',            // Name / source name
      'lastName',             // Name / source name  
      'tagline',              // Tag line / Slogan
      'profileVideo',         // Profile video
      'aboutText',            // About my self/company/organisation
      'phones',               // One-tap call, WhatsApp, email
      'emails',               // One-tap call, WhatsApp, email
      'websites',             // website/portfolio link
      'addresses',            // Location [address]
      'socialLinks',          // Social & Digital Hub
      'dynamicQRCode',        // Dynamic QR code
      'shareableUrl',         // Share
      'nfcSettings',          // NFC card developer with Print
      'downloads',            // Downloads
      'videos',               // Videos
      'companyName',          // Company name / Organisation
      'businessHours',        // Business hours
      'virtualNumber',        // Virtual no integration (Optional @m extra cost)
      'services',             // Service/Provision
      'servicesProducts',     // Brief about Product/Services (Individual Product display along with official)
      'gallery',              // Product show case / Gallery/Portfolio
      'catalog',              // Product/Catalog [PDF]
      'productVideo',         // Product video
      'testimonials',         // Testimonials
      
      // PLUS BusinessPremium-only fields from image
      'interactiveElements',       // Interactive Elements: Call-to-Action, Live Chat, Appointment scheduler, Digital Payments, Lead form, Chat assistant
      'individualProductDisplay',  // Individual Product display
      'clientList',                // Testimonials / Client list
      'businessCardInstagram',     // Business card/Instagram
      'textbooks'                  // Textbooks
    ]
  }
};

const DarkCard = ({ cardData = {} }) => {
  console.log('🎯 DarkCard received data:', cardData);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentServiceSlide, setCurrentServiceSlide] = useState(0);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
  const [currentVideoSlide, setCurrentVideoSlide] = useState(0);

  // 🔹 Inject global scroll CSS with custom fonts
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
      @import url('https://fonts.cdnfonts.com/css/orgon');
      @import url('https://fonts.cdnfonts.com/css/ggx89');
      
      html, body {
        height: 100%;
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch;
        font-family: 'GGX89', 'Outfit', sans-serif;
        margin: 0;
        padding: 0;
      }
      #root {
        min-height: 100%;
        font-family: 'GGX89', 'Outfit', sans-serif;
      }
      * {
        font-family: 'GGX89', 'Outfit', sans-serif;
        box-sizing: border-box;
      }
      .font-labrador {
        font-family: 'Labrador', serif;
      }
      .font-ggx89 {
        font-family: 'GGX89', sans-serif;
      }
      .font-BankGothicGT {
        font-family: 'BankGothicGT', sans-serif;
      }
      .font-Zona {
        font-family: 'Zona', sans-serif;
      }
      .font-ZonaPro {
        font-family: 'Zona Pro', sans-serif;
      }

      /* ========== DESKTOP VIEW ========== */
      @media (min-width: 641px) {
        .darkcard-container {
          width: 375px;
          height: 667px;
          overflow: hidden;
          position: relative;
          scrollbar-width: none;
          -ms-overflow-style: none;
          background: linear-gradient(to bottom, #000000, #0A0A2A, #1E3A8A);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          margin: 20px auto;
        }
        
        .darkcard-container::-webkit-scrollbar {
          display: none;
        }
        
        .darkcard-content {
          height: 100%;
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding-bottom: 20px;
        }
        
        .darkcard-content::-webkit-scrollbar {
          display: none;
        }
      }

      /* ========== MOBILE VIEW ========== */
      @media (max-width: 640px) {
        html, body {
          background: black !important;
          overflow: hidden;
        }
        
        .darkcard-container {
          width: 100vw !important;
          height: 100vh !important;
          max-width: 100% !important;
          border-radius: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          background: linear-gradient(to bottom, #000000, #0A0A2A, #1E3A8A) !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          overflow: hidden !important;
          box-shadow: none !important;
        }
        
        .darkcard-content {
          height: 100% !important;
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding-bottom: 20px;
        }
        
        .darkcard-content::-webkit-scrollbar {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);

    // Auto slide intervals
    const serviceInterval = setInterval(() => {
      setCurrentServiceSlide(prev => (prev + 1) % Math.max(1, profileData.services.length));
    }, 4000);

    const productInterval = setInterval(() => {
      setCurrentProductSlide(prev => (prev + 1) % Math.max(1, profileData.products.length));
    }, 4000);

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonialSlide(prev => (prev + 1) % Math.max(1, profileData.testimonials.length));
    }, 5000);

    const videoInterval = setInterval(() => {
      setCurrentVideoSlide(prev => (prev + 1) % Math.max(1, profileData.videos.length));
    }, 4000);

    return () => {
      document.head.removeChild(style);
      clearInterval(serviceInterval);
      clearInterval(productInterval);
      clearInterval(testimonialInterval);
      clearInterval(videoInterval);
    };
  }, []);

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
    tagline: cardData?.tagline || "",
    
    // Contact Info
    email: cardData?.email || "",
    emails: cardData?.emails || [{ address: cardData?.email || "", label: "primary", isPrimary: true }],
    phones: cardData?.phones || [],
    websites: cardData?.websites || [],
    addresses: cardData?.addresses || [],
    virtualNumber: cardData?.virtualNumber || "",
    
    // Profile Content
    profileVideo: typeof cardData?.profileVideo === 'string' 
      ? { url: cardData.profileVideo, thumbnail: "", title: "", uploadType: 'url' }
      : cardData?.profileVideo || null,
    
    productVideo: cardData?.productVideo || null,
    titleLine: cardData?.titleLine || "",
    aboutText: cardData?.aboutText || "",
    bio: cardData?.bio || cardData?.aboutText || "",
    servicesProducts: cardData?.servicesProducts || "",
    brandLabel: cardData?.brandLabel || "",
    catalog: cardData?.catalog || cardData?.catalogPDF || "",
    catalogPDF: cardData?.catalogPDF || "",
    
    // Videos array for video slider
    videos: cardData?.videos || [],
    
    // Business Hours - FIXED: Handle different formats
    businessHours: cardData?.businessHours || cardData?.workingHours || [],
    
    // Social & Media
    socialLinks: cardData?.socialLinks || [],
    profilePhoto: cardData?.profilePhoto || "https://images.unsplash.com/photo-1494790108755-2616b786d4d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
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
    individualProductDisplay: cardData?.individualProductDisplay || false,
    businessCardInstagram: cardData?.businessCardInstagram || "",
    textbooks: cardData?.textbooks || [],

    // Digital Features
    dynamicQRCode: cardData?.dynamicQRCode || {
      targetUrl: cardData?.shareableUrl || cardData?.shareUrl || "https://example.com",
      qrImage: cardData?.qrImage || null
    },
    nfcSettings: cardData?.nfcSettings || { isEnabled: false },
    nfcCard: cardData?.nfcCard || null,
    
    // Shareable URL
    shareableUrl: cardData?.shareableUrl || cardData?.shareUrl || "",
    
    // Product Display
    productRangeDisplay: cardData?.productRangeDisplay || 'grid',
    
    // Plan Info
    cardType: cardData?.cardType || 'Personal',
    design: cardData?.design || 'default',
    cardLayout: cardData?.cardLayout || 'standard',
    logoSize: cardData?.logoSize || 'medium',
    
    // Settings
    enableOneTapCall: cardData?.enableOneTapCall !== undefined ? cardData.enableOneTapCall : true,
    enableWhatsApp: cardData?.enableWhatsApp !== undefined ? cardData.enableWhatsApp : true,
    enableEmail: cardData?.enableEmail !== undefined ? cardData.enableEmail : true
  };

  // Get current plan
  const currentPlan = profileData.cardType || 'Personal';

  // Helper to check if a field/feature is allowed for current plan
  const isFieldAllowed = (fieldName) => {
    const planConfig = cardFieldsConfig[currentPlan];
    if (!planConfig) return false;
    
    return planConfig.allowed.includes(fieldName);
  };

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

  const primaryPhone = profileData.phones.find(phone => phone.isPrimary) || profileData.phones[0];
  const primaryEmail = profileData.emails.find(email => email.isPrimary) || profileData.emails[0];

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

  const getSocialColor = (platform) => {
    switch (platform) {
      case 'facebook': return "text-blue-400";
      case 'instagram': return "text-pink-400";
      case 'twitter': return "text-blue-300";
      case 'youtube': return "text-red-400";
      case 'linkedin': return "text-blue-400";
      case 'whatsapp': return "text-green-400";
      default: return "text-gray-300";
    }
  };

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
      case 'booking-system': return <FaCalendarAlt className="w-5 h-5" />;
      case 'newsletter-signup': return <FaEnvelope className="w-5 h-5" />;
      case 'file-download': return <FaDownload className="w-5 h-5" />;
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

  // Get current slide images for gallery (1 top + 2 bottom format)
  const getCurrentSlideImages = () => {
    const startIndex = currentSlide * 3;
    return profileData.gallery.slice(startIndex, startIndex + 3);
  };

  // Get current service item (1 item per slide)
  const getCurrentServiceItem = () => {
    return profileData.services[currentServiceSlide];
  };

  // Get current product item (1 item per slide)
  const getCurrentProductItem = () => {
    return profileData.products[currentProductSlide];
  };

  // Get current testimonial item (1 item per slide)
  const getCurrentTestimonialItem = () => {
    return profileData.testimonials[currentTestimonialSlide];
  };

  // Get current video item
  const getCurrentVideoItem = () => {
    return profileData.videos[currentVideoSlide];
  };

  const totalSlides = Math.ceil(profileData.gallery.length / 3);

  // FIXED: Format business hours - handle both array and object formats
  const formatBusinessHours = () => {
    const hours = profileData.businessHours;
    if (!hours || (Array.isArray(hours) && hours.length === 0)) return null;
    
    if (Array.isArray(hours)) {
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      return days.map(day => {
        const dayData = hours.find(h => 
          h.day && h.day.toLowerCase() === day
        );
        
        if (!dayData || dayData.isClosed) {
          return { 
            day: day.charAt(0).toUpperCase() + day.slice(1), 
            time: 'Closed',
            isClosed: true
          };
        }
        
        // Handle different property names
        const openingTime = dayData.openingTime || dayData.open || dayData.startTime || '';
        const closingTime = dayData.closingTime || dayData.close || dayData.endTime || '';
        
        if (!openingTime && !closingTime) {
          return { 
            day: day.charAt(0).toUpperCase() + day.slice(1), 
            time: 'Closed',
            isClosed: true
          };
        }
        
        return { 
          day: day.charAt(0).toUpperCase() + day.slice(1), 
          time: `${openingTime} - ${closingTime}`,
          isClosed: false
        };
      });
    } else {
      // Legacy object format
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      return days.map(day => {
        const dayHours = hours[day];
        if (!dayHours || dayHours.isClosed || !dayHours.open) {
          return { 
            day: day.charAt(0).toUpperCase() + day.slice(1), 
            time: 'Closed',
            isClosed: true
          };
        }
        
        return { 
          day: day.charAt(0).toUpperCase() + day.slice(1), 
          time: `${dayHours.open} - ${dayHours.close}`,
          isClosed: false
        };
      });
    }
  };

  // FIXED: QR Code component with proper URL handling
  const renderQRCode = () => {
    if (!isFieldAllowed('dynamicQRCode')) return null;
    
    const qrData = profileData.dynamicQRCode;
    if (!qrData || !qrData.targetUrl) return null;
    
    const qrImageUrl = qrData.qrImage || 
      `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData.targetUrl)}`;
    
    return (
      <div className="text-center mt-8 mb-6">
        <h3 className="text-base font-semibold text-white flex justify-center items-center mb-4 font-Zona">
          <FaQrcode className="w-5 h-5 text-blue-400 mr-2" />
          QR Code
        </h3>
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-xl border border-white/30 transform transition-transform duration-300 hover:scale-105">
            <img
              src={qrImageUrl}
              alt="QR Code"
              className="w-40 h-40 object-contain"
              onError={(e) => {
                console.error('QR Code image failed to load:', qrImageUrl);
                e.target.onerror = null;
                e.target.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.className = 'w-40 h-40 bg-gray-800 flex items-center justify-center text-gray-400 rounded-xl';
                placeholder.innerHTML = '<FaQrcode className="w-12 h-12" />';
                e.target.parentElement.appendChild(placeholder);
              }}
            />
          </div>
        </div>
        <p className="text-xs text-white/70 mt-2 font-ZonaPro">
          Scan to save contact
        </p>
        <button
          onClick={() => window.open(qrData.targetUrl, '_blank')}
          className="mt-3 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
        >
          Open Link →
        </button>
      </div>
    );
  };

  return (
    <div className="darkcard-container">
      <div className="darkcard-content">
        {/* Top Wave Pattern */}
        <div className="absolute top-0 left-0 right-0 h-40 opacity-15">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                  fill="currentColor" className="text-blue-400"></path>
          </svg>
        </div>

        {/* Bottom Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-40 opacity-15">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                  fill="currentColor" className="text-blue-500"></path>
          </svg>
        </div>

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,_rgba(59,130,246,0.3)_0%,_transparent_50%),_radial-gradient(circle_at_80%_80%,_rgba(37,99,235,0.2)_0%,_transparent_50%)] rounded-[40px]"></div>
        
        {/* Main Content */}
        <div className="relative z-10">
          {/* Company Logo & Name Section */}
          {(profileData.companyLogo || profileData.companyName) && isFieldAllowed('companyName') && (
            <div className="mx-4 transform transition-transform duration-300 hover:scale-[1.02] min-h-[60px] flex items-center mt-4">
              <div className="flex flex-col items-center justify-center w-full space-y-2">
                {profileData.companyLogo && (
                  <div className="flex items-center">
                    <img
                      src={profileData.companyLogo}
                      alt="Company Logo"
                      className="w-14 h-10 object-contain"
                      onError={(e) => {
                        console.log('Company logo failed to load:', profileData.companyLogo);
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                {profileData.companyName && (
                  <div className="text-center">
                    <h3 className="text-sm text-white/70 text-center break-words w-full font-ZonaPro">
                      {profileData.companyName}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Profile Section - INCREASED PROFILE IMAGE SIZE */}
          <div className="relative h-56 rounded-b-3xl flex flex-col items-center justify-center pt-20 pb-8 mt-26">
            {/* Profile Photo - INCREASED SIZE */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              {profileData.profilePhoto && isFieldAllowed('profilePhoto') ? (
                <img
                  src={profileData.profilePhoto}
                  alt={profileData.name}
                  className="w-40 h-40 rounded-full border-4 border-white/90 object-cover shadow-2xl"
                  onError={(e) => {
                    console.log('Profile photo failed to load:', profileData.profilePhoto);
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              {(!profileData.profilePhoto || !isFieldAllowed('profilePhoto')) && (
                <div className="w-40 h-40 rounded-full border-4 border-white/30 bg-gradient-to-r from-blue-500 to-purple-500 flex justify-center items-center text-white text-4xl font-bold shadow-2xl font-labrador">
                  {profileData.name?.charAt(0) || "G"}
                </div>
              )}
            </div>

            {/* Name and Designation */}
            <h2 className="text-4xl font-medium text-white mt-20 text-center font-orgon break-words w-full mx-auto px-3" style={{maxWidth: '380px'}}>
              {profileData.name}
            </h2>
            <p className="text-lg text-white/90 font-[300] text-center font-orgon break-words w-full px-4 mt-0 mb-2">
              {profileData.jobTitle}
            </p>
          </div>

          {/* Main Content Area - Reduced bottom padding */}
          <div className="pt-4 pb-8 px-5 space-y-3">
            {/* Tagline */}
            {profileData.tagline && isFieldAllowed('tagline') && (
              <div className="text-center mt-6 mb-6">
                <div className="relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-25"></div>
                  <div className="relative px-6 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                    <p
                      className="text-white/90 text-base italic font-medium font-ZonaPro"
                    >
                      "{profileData.tagline}"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Title Line */}
            {profileData.titleLine && (
              <div
                className="relative rounded-full w-80 h-13 px-6 py-3 flex items-center justify-center mt-0 mx-auto"
              >
                <div className="absolute inset-0 rounded-full w-80 h-13 border-2 border-[white]"></div>
                <div className="relative text-center z-10">
                  <FaCrown className="w-5 h-5 text-yellow-300 mx-auto mb-1 drop-shadow-[0_0_6px_#ffd700]" />
                  <p className="text-white font-semibold text-sm tracking-wide px-3 font-ZonaPro">
                    {profileData.titleLine}
                  </p>
                </div>
              </div>
            )}

            {/* About Section */}
            {profileData.aboutText && isFieldAllowed('aboutText') && (
              <div className="text-center mt-1">
                <h3 className="text-base font-semibold text-white flex justify-center items-center mb-2 font-Zona">
                  <FaUserFriends className="w-4 h-4 text-blue-400 mr-2" />
                  About
                </h3>
                <p className="text-white/90 text-sm leading-relaxed mb-4 font-ZonaPro">
                  {profileData.aboutText}
                </p>
              </div>
            )}

            {/* Business Hours - FIXED DISPLAY */}
            {profileData.businessHours && isFieldAllowed('businessHours') && (
              <div className="text-center mt-6">
                <h3
                  className="text-base font-semibold text-white flex justify-center items-center mb-2 font-Zona"
                >
                  <FaRegClock className="w-5 h-5 text-blue-400 mr-2" />
                  Business Hours
                </h3>
                <div className="space-y-2 max-w-md mx-auto">
                  {formatBusinessHours()?.map((hour, index) => {
                    const isClosed = hour.isClosed;
                    
                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transform transition-transform duration-300 hover:scale-105"
                        style={{
                          background: isClosed 
                            ? 'linear-gradient(135deg, rgba(156, 163, 175, 0.1) 0%, rgba(107, 114, 128, 0.1) 100%)'
                            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
                          border: `1px solid ${isClosed ? 'rgba(156, 163, 175, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`
                        }}
                      >
                        <span
                          className="text-white text-sm font-ZonaPro"
                          style={{ fontWeight: 500, color: isClosed ? '#9ca3af' : '#ffffff' }}
                        >
                          {hour.day}
                        </span>
                        <span
                          className="text-sm font-ZonaPro"
                          style={{ color: isClosed ? '#9ca3af' : '#93c5fd', fontWeight: 400 }}
                        >
                          {hour.time}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Emails */}
            {profileData.emails.length > 0 && isFieldAllowed('emails') && (
              <div className="text-center mt-6">
                <h3
                  className="text-base font-semibold text-white flex justify-center items-center mb-2 font-Zona"
                >
                  <FaEnvelope className="w-4 h-4 text-blue-400 mr-2" />
                  Email Addresses
                </h3>
                <div className="space-y-2 max-w-md mx-auto">
                  {profileData.emails.map((email, index) => (
                    <div
                      key={index}
                      onClick={() => handleContact("email", email.address)}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transform transition-transform duration-300 hover:scale-105"
                    >
                      <div className="flex items-center">
                        <FaEnvelope className="w-4 h-4 text-blue-400 mr-2" />
                        <span
                          className="text-white text-sm font-ZonaPro"
                        >
                          {email.label || "Email"}
                        </span>
                      </div>
                      <span
                        className="text-white/70 text-sm truncate ml-2 font-ZonaPro"
                      >
                        {email.address}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Buttons */}
            <div className="flex flex-col items-center space-y-4">
              {primaryPhone && profileData.enableOneTapCall && isFieldAllowed('phones') && (
                <button
                  onClick={() => handleContact("phone", primaryPhone.number)}
                  className="flex items-center justify-center bg-white text-[#0A1A4B] px-6 py-3 rounded-full w-90 h-11 shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300 font-[BankGothicGT] tracking-wide"
                >
                  <FaPhoneAlt className="w-5 h-5 mr-3 text-[#0A1A4B]" />
                  <span className="text-base font-medium">Phone</span>
                </button>
              )}

              {profileData.email && profileData.enableEmail && isFieldAllowed('emails') && (
                <button
                  onClick={() => handleContact("email", profileData.email)}
                  className="flex items-center justify-center bg-white text-[#0A1A4B] px-6 py-3 rounded-full w-90 h-11 shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300 font-[BankGothicGT] tracking-wide"
                >
                  <FaEnvelope className="w-5 h-5 mr-3 text-[#0A1A4B]" />
                  <span className="text-base font-medium">Email</span>
                </button>
              )}

              {primaryPhone && profileData.enableWhatsApp && isFieldAllowed('phones') && (
                <button
                  onClick={() => handleContact("whatsapp", primaryPhone.number)}
                  className="flex items-center justify-center bg-white text-[#0A1A4B] px-6 py-3 rounded-full w-90 h-11 shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300 font-[BankGothicGT] tracking-wide"
                >
                  <FaWhatsapp className="w-5 h-5 mr-2 text-[#0A1A4B] ml-7" />
                  <span className="text-base font-medium">WhatsApp</span>
                </button>
              )}

              {/* Virtual Number Button */}
              {profileData.virtualNumber && isFieldAllowed('virtualNumber') && (
                <button
                  onClick={() => handleContact("virtualNumber", profileData.virtualNumber)}
                  className="flex items-center justify-center bg-white text-[#0A1A4B] px-6 py-3 rounded-full w-90 h-11 shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300 font-[BankGothicGT] tracking-wide"
                >
                  <FaPhoneAlt className="w-5 h-5 mr-3 text-[#0A1A4B]" />
                  <span className="text-base font-medium">Virtual Number</span>
                </button>
              )}

              {/* Websites as Buttons */}
              {profileData.websites.map((website, index) => (
                <button
                  key={index}
                  onClick={() => handleContact("website", website.url)}
                  className="flex items-center justify-center bg-white text-[#0A1A4B] px-6 py-3 rounded-full w-90 h-11 shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300 font-[BankGothicGT] tracking-wide mb-3"
                >
                  <FaGlobe className="w-5 h-5 mr-2 text-[#0A1A4B] ml-3" />
                  <span className="text-base font-medium">Website</span>
                </button>
              ))}
            </div>

            {/* Social Icons */}
            {profileData.socialLinks.filter(link => link.url).length > 0 && isFieldAllowed('socialLinks') && (
              <div className="flex justify-center space-x-4 mb-4">
                {profileData.socialLinks
                  .filter(link => link.url)
                  .map((social, index) => (
                    <div
                      key={index}
                      onClick={() => handleContact("default", social.url)}
                      className="bg-white hover:bg-blue-100 text-[#0A1A4B] shadow-md rounded-full p-1 border border-blue-900 hover:shadow-lg transition-all duration-300 cursor-pointer w-9 h-9 flex items-center justify-center"
                    >
                      {getSocialIcon(social.platform)}
                    </div>
                  ))}
              </div>
            )}

            {/* ========== PROFILE VIDEO - FIXED WITH VIDEOPLAYER COMPONENT ========== */}
            {isFieldAllowed('profileVideo') && (
              <div className="text-center mt-8">
                <h3 className="text-base font-semibold text-white flex justify-center items-center mb-2 mt-10 font-Zona">
                  <FaVideo className="w-4 h-4 text-blue-400 mr-2" />
                  Introduction Video
                </h3>
                <div className="relative rounded-lg overflow-hidden h-40 mx-auto max-w-md">
                  <VideoPlayer
                    src={profileData.profileVideo}
                    poster={profileData.profileVideo?.thumbnail}
                    title={profileData.profileVideo?.title || "Introduction Video"}
                    className="h-full"
                  />
                </div>
              </div>
            )}

            {/* Product Video - ALSO USE VIDEOPLAYER */}
            {profileData.productVideo && isFieldAllowed('productVideo') && (
              <div className="text-center mt-6">
                <h3
                  className="text-base font-semibold text-white flex justify-center items-center mb-2 font-Zona"
                >
                  <FaFileVideo className="w-4 h-4 text-purple-400 mr-2" />
                  Product Video
                </h3>
                <div className="relative rounded-lg overflow-hidden h-40 mx-auto max-w-md">
                  <VideoPlayer
                    src={profileData.productVideo}
                    poster={profileData.productVideo?.thumbnail}
                    title={profileData.productVideo?.title || "Product Video"}
                    className="h-full"
                  />
                </div>
              </div>
            )}

            {/* Videos Slider - USE VIDEOPLAYER */}
            {profileData.videos.length > 0 && isFieldAllowed('videos') && (
              <div className="text-center mt-6">
                <h3
                  className="text-base font-semibold text-white flex justify-center items-center mb-2 font-Zona"
                >
                  <FaVideo className="w-4 h-4 text-blue-400 mr-2" />
                  Videos
                </h3>
                
                <div className="relative overflow-hidden max-w-xl mx-auto">
                  <div className="flex flex-col space-y-3">
                    {getCurrentVideoItem() && (
                      <div className="relative rounded-lg overflow-hidden h-48 mx-auto max-w-md">
                        <VideoPlayer
                          src={getCurrentVideoItem()}
                          poster={getCurrentVideoItem()?.thumbnail}
                          title={getCurrentVideoItem()?.title}
                          className="h-full"
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Video Slide Indicators */}
                  {profileData.videos.length > 1 && (
                    <div className="flex justify-center space-x-1 mt-3">
                      {Array.from({ length: profileData.videos.length }, (_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentVideoSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all transform duration-300 ${
                            index === currentVideoSlide ? 'bg-blue-400' : 'bg-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Organization Details */}
            {(profileData.foundedName || profileData.organization) && (
              <div className="text-center mb-5 mt-4">
                <h3 className="text-base font-semibold text-white flex justify-center items-center mb-1 mt-10 font-Zona">
                  <FaBuilding className="w-4 h-4 text-blue-400 mr-2" />
                  Organization Details
                </h3>
                <div className="rounded-xl p-3 border border-white shadow-lg text-center transform transition duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:opacity-100 opacity-95">
                  {profileData.foundedName && (
                    <p className="text-white text-sm leading-relaxed font-ZonaPro">
                      <span className="font-semibold">Founded Name:</span> {profileData.foundedName}
                    </p>
                  )}
                  {profileData.organization && (
                    <p className="text-white text-sm leading-relaxed font-ZonaPro">
                      <span className="font-semibold">Organization:</span> {profileData.organization}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Brand Label */}
            {profileData.brandLabel && isFieldAllowed('brandLabel') && (
              <div className="text-center mt-6 mb-2">
                <h3
                  className="text-base font-semibold text-white flex justify-center items-center mb-1 font-Zona"
                >
                  <FaGem className="w-4 h-4 text-blue-400 mr-2" />
                  Brand Label
                </h3>
                <div
                  className="relative rounded-xl w-80 h-14 flex items-center justify-center mt-2 mx-auto transform transition-transform duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 rounded-full border-2 border-white"></div>
                  <div className="relative text-center z-10 flex items-center space-x-2">
                    <p className="text-white font-semibold text-sm tracking-wide font-ZonaPro">
                      {profileData.brandLabel}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Services/Products Overview */}
            {profileData.servicesProducts && isFieldAllowed('servicesProducts') && (
              <div className="text-center mt-6">
                <h3
                  className="text-base font-semibold text-white flex justify-center items-center mb-2 font-Zona"
                >
                  <FaSuitcase className="w-4 h-4 text-blue-400 mr-2" />
                  Services & Products Overview
                </h3>
                <div className="rounded-xl p-4 bg-white/5 border border-white/10">
                  <p
                    className="text-white/90 text-sm leading-relaxed font-ZonaPro"
                  >
                    {profileData.servicesProducts}
                  </p>
                </div>
              </div>
            )}

            {/* Catalog PDF */}
            {(profileData.catalog || profileData.catalogPDF) && isFieldAllowed('catalog') && (
              <div className="text-center mt-6">
                <h3
                  className="text-base font-semibold text-white flex justify-center items-center mb-2 font-Zona"
                >
                  <FaFileInvoice className="w-4 h-4 text-red-400 mr-2" />
                  Catalog PDF
                </h3>
                <button
                  onClick={() => window.open(profileData.catalog || profileData.catalogPDF, '_blank')}
                  className="flex items-center justify-center mx-auto bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg border border-red-500/30 transform transition-transform duration-300 hover:scale-105"
                >
                  <FaFilePdf className="w-4 h-4 mr-2" />
                  <span className="font-ZonaPro">
                    Download Catalog
                  </span>
                </button>
              </div>
            )}

            {/* Gallery */}
            {profileData.gallery.length > 0 && isFieldAllowed('gallery') && (
              <div className="p-3 text-center space-y-3">
                <h3 className="text-base font-semibold text-white flex justify-center items-center mb-2 mt-10 font-Zona">
                  <FaImage className="w-4 h-4 text-blue-400 mr-2" />
                  Gallery
                </h3>
                <div className="space-y-2">
                  {getCurrentSlideImages()[0] && (
                    <div className="relative rounded-lg overflow-hidden h-40 sm:h-48 transform transition-transform duration-300 hover:scale-105">
                      <img
                        src={getCurrentSlideImages()[0].url}
                        alt={getCurrentSlideImages()[0].title}
                        className="w-full h-full object-cover"
                      />
                      {getCurrentSlideImages()[0].title && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-1">
                          <p className="text-xs font-medium break-words font-ZonaPro">
                            {getCurrentSlideImages()[0].title}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    {getCurrentSlideImages().slice(1, 3).map((item, index) => (
                      <div
                        key={index}
                        className="relative rounded-lg overflow-hidden h-28 sm:h-32 transform transition-transform duration-300 hover:scale-105"
                      >
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        {item.title && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-1">
                            <p className="text-xs font-medium break-words font-ZonaPro">
                              {item.title}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {profileData.gallery.length > 3 && (
                  <div className="flex justify-center items-center space-x-3 mt-2">
                    <button
                      onClick={prevSlide}
                      className="bg-white/10 hover:bg-white/20 text-white rounded-full p-1 shadow transform transition-transform duration-300 hover:scale-110 w-6 h-6 flex items-center justify-center"
                    >
                      <FaChevronLeft className="w-2 h-2" />
                    </button>
                    <div className="flex space-x-1">
                      {Array.from({ length: totalSlides }, (_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all transform duration-300 hover:scale-110 ${
                            index === currentSlide ? 'bg-blue-400' : 'bg-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={nextSlide}
                      className="bg-white/10 hover:bg-white/20 text-white rounded-full p-1 shadow transform transition-transform duration-300 hover:scale-110 w-6 h-6 flex items-center justify-center"
                    >
                      <FaChevronRight className="w-2 h-2" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Professional Bio */}
            {profileData.bio && (
              <div className="text-center mt-2 mb-4">
                <h3 className="text-base font-semibold text-white flex justify-center items-center mb-2 font-Zona">
                  <FaBriefcase className="w-4 h-4 text-blue-400 mr-2" />
                  Professional Bio
                </h3>
                <p className="text-white/90 text-sm leading-relaxed break-words font-ZonaPro">
                  {profileData.bio}
                </p>
              </div>
            )}

            {/* Services */}
            {profileData.services.length > 0 && isFieldAllowed('services') && (
              <div className="text-center mt-4">
                <h3 className="text-base font-semibold text-white flex justify-center items-center mb-2 mt-12 font-Zona">
                  <FaShoppingCart className="w-4 h-4 text-blue-200 mr-2" />
                  Services
                </h3>
                <div className="relative overflow-hidden max-w-xl mx-auto">
                  <div className="flex flex-col space-y-3">
                    {getCurrentServiceItem() && (
                      <div className="flex flex-col p-3 rounded-lg bg-white/5 min-h-[120px] w-full max-w-md mx-auto">
                        {getCurrentServiceItem().description && (
                          <div className="text-left mb-3">
                            <span className="text-white/90 text-xs block break-words font-ZonaPro">
                              {getCurrentServiceItem().description}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-center mb-3">
                          {getCurrentServiceItem().image && (
                            <img
                              src={getCurrentServiceItem().image}
                              alt={getCurrentServiceItem().name}
                              className="w-60 h-28 rounded object-cover"
                            />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white text-sm font-medium block break-words font-ZonaPro">
                            {getCurrentServiceItem().name}
                          </span>
                          {getCurrentServiceItem().price && (
                            <span className="text-white text-sm font-bold whitespace-nowrap flex-shrink-0 ml-3 font-ZonaPro">
                              {getCurrentServiceItem().price} {getCurrentServiceItem().currency}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {profileData.services.length > 1 && (
                  <div className="flex justify-center space-x-1 mt-3">
                    {Array.from({ length: profileData.services.length }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentServiceSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all transform duration-300 ${
                          index === currentServiceSlide ? 'bg-blue-400' : 'bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Products */}
            {profileData.products.length > 0 && isFieldAllowed('services') && (
              <div className="text-center mt-4">
                <h3 className="text-base font-semibold text-white flex justify-center items-center mb-3 mt-12 font-Zona">
                  <FaGem className="w-4 h-4 text-blue-400 mr-2" />
                  Products
                </h3>
                <div className="relative overflow-hidden max-w-xl mx-auto">
                  <div className="flex flex-col space-y-3">
                    {getCurrentProductItem() && (
                      <div className="flex flex-col p-3 rounded-lg bg-white/5 min-h-[120px] w-full max-w-md mx-auto">
                        {getCurrentProductItem().description && (
                          <div className="text-left mb-3">
                            <span className="text-white text-xs block break-words font-ZonaPro">
                              {getCurrentProductItem().description}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-center mb-3">
                          {getCurrentProductItem().image && (
                            <img
                              src={getCurrentProductItem().image}
                              alt={getCurrentProductItem().name}
                              className="w-60 h-28 rounded object-cover"
                            />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white text-sm font-medium block break-words font-ZonaPro">
                            {getCurrentProductItem().name}
                          </span>
                          {getCurrentProductItem().price && (
                            <span className="text-white text-sm font-bold whitespace-nowrap flex-shrink-0 ml-3 font-ZonaPro">
                              {getCurrentProductItem().price} {getCurrentProductItem().currency}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {profileData.products.length > 1 && (
                  <div className="flex justify-center space-x-1 mt-3">
                    {Array.from({ length: profileData.products.length }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentProductSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all transform duration-300 ${
                          index === currentProductSlide ? 'bg-blue-400' : 'bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Testimonials */}
            {profileData.testimonials.length > 0 && isFieldAllowed('testimonials') && (
              <div className="text-center mt-4">
                <h3 className="text-base font-semibold text-white flex justify-center items-center mb-3 mt-10 font-Zona">
                  <FaStar className="w-4 h-4 text-blue-400 mr-2" />
                  Testimonials
                </h3>
                <div className="relative overflow-hidden max-w-xl mx-auto">
                  <div className="flex flex-col space-y-3">
                    {getCurrentTestimonialItem() && (
                      <div className="rounded-lg p-4 bg-white/5 w-full">
                        <div className="text-center mb-3">
                          <span className="font-semibold text-white text-sm break-words block font-ZonaPro">
                            {getCurrentTestimonialItem().clientName}
                          </span>
                          {getCurrentTestimonialItem().rating && (
                            <div className="flex space-x-0.5 mt-2 justify-center">
                              {renderStars(getCurrentTestimonialItem().rating)}
                            </div>
                          )}
                        </div>
                        <p className="text-white/90 text-sm italic break-words text-center font-ZonaPro">
                          "{getCurrentTestimonialItem().testimonial}"
                        </p>
                        {getCurrentTestimonialItem().company && (
                          <p className="text-white/70 text-sm mt-2 break-words text-center font-ZonaPro">
                            {getCurrentTestimonialItem().company}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {profileData.testimonials.length > 1 && (
                  <div className="flex justify-center space-x-1 mt-3">
                    {Array.from({ length: profileData.testimonials.length }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonialSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all transform duration-300 ${
                          index === currentTestimonialSlide ? 'bg-blue-400' : 'bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Client List */}
            {profileData.clientList.length > 0 && isFieldAllowed('clientList') && (
              <div className="text-center mt-4">
                <h3 className="text-base font-semibold text-white flex justify-center items-center mb-3 font-Zona">
                  <FaUserFriends className="w-4 h-4 text-blue-400 mr-2" />
                  Our Clients
                </h3>
                <div className="overflow-x-auto whitespace-nowrap py-2 px-1">
                  {profileData.clientList.map((client, index) => (
                    <span
                      key={index}
                      className="inline-block bg-transparent text-white px-3 py-2 rounded-full border border-white text-sm mr-2 transform transition-transform duration-300 hover:scale-105 font-ZonaPro"
                    >
                      {client}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Downloads */}
            {profileData.downloads.length > 0 && isFieldAllowed('downloads') && (
              <div className="text-center mt-8">
                <h3 className="text-base font-semibold text-white flex justify-center items-center mb-2 mt-10 font-Zona">
                  <FaDownload className="w-4 h-4 text-blue-400 mr-2" />
                  Downloads
                </h3>
                <div className="space-y-3 max-w-xl mx-auto">
                  {profileData.downloads.map((download, index) => (
                    <div
                      key={index}
                      onClick={() => handleContact("default", download.fileUrl)}
                      className="relative rounded-lg border border-white p-3 cursor-pointer transform transition-transform duration-300 hover:scale-105"
                    >
                      <div className="flex items-center space-x-3">
                        <FaFilePdf className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-white text-sm font-medium break-words font-ZonaPro">
                            {download.name}
                          </p>
                          {download.fileSize && (
                            <p className="text-white/70 text-xs break-words font-ZonaPro">
                              {download.fileSize}
                            </p>
                          )}
                        </div>
                        <FaDownload className="w-5 h-5 text-white/70 flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Elements */}
            {profileData.interactiveElements.length > 0 && isFieldAllowed('interactiveElements') && (
              <div className="text-center mt-8">
                <h3 className="text-base font-semibold text-white flex justify-center items-center mb-4 font-Zona">
                  <FaHeadset className="w-4 h-4 text-blue-400 mr-2" />
                  Quick Actions
                </h3>
                <div className="flex flex-wrap justify-center gap-4 max-w-xl mx-auto">
                  {profileData.interactiveElements
                    .filter(element => element.isActive)
                    .map((element, index) => (
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
                        className="flex flex-col items-center justify-center p-3 rounded-xl border border-white text-white text-sm font-medium cursor-pointer transform transition-transform duration-300 hover:scale-105 min-w-[90px] min-h-[70px]"
                      >
                        <div className="text-blue-400 mb-1">
                          {getInteractiveElementIcon(element.type)}
                        </div>
                        <span className="text-xs break-words text-center font-ZonaPro">
                          {getInteractiveElementLabel(element.type)}
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* QR Code - ADDED BACK WITH PROPER LOGIC */}
            {renderQRCode()}

            {/* NFC Card */}
            {profileData.nfcCard && isFieldAllowed('nfcSettings') && (
              <div className="text-center mt-8">
                <h3
                  className="text-base font-semibold text-white flex justify-center items-center mb-2 font-Zona"
                >
                  <FaIdCard className="w-4 h-4 text-purple-400 mr-2" />
                  NFC Card
                </h3>
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-xl">
                  <FaIdCard className="w-5 h-5 text-purple-400" />
                  <div className="text-left">
                    <p
                      className="text-xs font-medium text-white font-ZonaPro"
                    >
                      NFC Card Available
                    </p>
                    <p
                      className="text-xs text-white/70 font-ZonaPro"
                    >
                      Tap to connect with NFC
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* NFC Settings */}
            {profileData.nfcSettings?.isEnabled && isFieldAllowed('nfcSettings') && (
              <div className="text-center mt-8">
                <h3 className="text-base font-semibold text-white flex justify-center items-center mb-3 font-Zona">
                  <FaShieldAlt className="w-4 h-4 text-blue-400 mr-2" />
                  NFC Enabled
                </h3>
                <div className="inline-flex items-center space-x-2 px-4 py-2 border border-white rounded-xl cursor-pointer transform transition-transform duration-300 hover:scale-105">
                  <FaIdCard className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-medium text-white font-ZonaPro">
                    Tap to Connect
                  </span>
                </div>
              </div>
            )}

            {/* Share Button - Centered and aligned */}
            {profileData.shareableUrl && (
              <div className="text-center mt-8 mb-6">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => {
                      const shareUrl = profileData.shareableUrl || window.location.href;
                      const shareText = `Check out ${profileData.name}'s digital card`;
                      
                      if (navigator.share) {
                        navigator.share({
                          title: `${profileData.name}'s Digital Card`,
                          text: shareText,
                          url: shareUrl,
                        });
                      } else {
                        navigator.clipboard.writeText(shareUrl).then(() => {
                          alert('Link copied to clipboard!');
                        });
                      }
                    }}
                    className="flex items-center justify-center mx-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full transform transition-transform duration-300 hover:scale-105 w-full max-w-xs"
                  >
                    <FaShare className="w-5 h-5 mr-2" />
                    <span className="font-ZonaPro font-medium">Share My Card</span>
                  </button>
                </div>
              </div>
            )}

            {/* Address Information */}
            {profileData.addresses.length > 0 && isFieldAllowed('addresses') && (
              <div className="text-center mt-8">
                <h3 className="text-base font-semibold text-white flex justify-center items-center mb-2 font-Zona">
                  <FaMapMarkerAlt className="w-4 h-4 text-red-400 mr-2" />
                  Location
                </h3>
                <div className="space-y-2 max-w-xl mx-auto">
                  {profileData.addresses.map((address, index) => (
                    <div
                      key={index}
                      onClick={() => handleContact("map", address.googleMapsLink)}
                      className="flex items-start justify-start p-3 rounded-xl hover:scale-105 transform transition-transform duration-300 cursor-pointer bg-white/5"
                    >
                      <div className="w-7 h-7 bg-red-500/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <FaMapMarkerAlt className="w-3 h-3 text-red-400" />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <span className="text-white text-sm font-semibold block break-words font-ZonaPro">
                          {address.label || "Address"} {address.isPrimary && "(Primary)"}
                        </span>
                        <span className="text-white/70 text-sm block mt-1 break-words font-ZonaPro">
                          {address.fullAddress ||
                            `${address.street}, ${address.city}, ${address.state} ${address.postalCode}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkCard;