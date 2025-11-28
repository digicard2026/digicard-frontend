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
  FaImage
} from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";

const DarkCard = ({ cardData = {} }) => {
  console.log('🎯 DarkCard received data:', cardData);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentServiceSlide, setCurrentServiceSlide] = useState(0);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);

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
      }
      #root {
        min-height: 100%;
        font-family: 'GGX89', 'Outfit', sans-serif;
      }
      * {
        font-family: 'GGX89', 'Outfit', sans-serif;
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
      .font-BankGothicGT {
        font-family: 'Zona', sans-serif;
      }
      .font-BankGothicGT {
        font-family: 'ZonaPro', sans-serif;
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

    return () => {
      document.head.removeChild(style);
      clearInterval(serviceInterval);
      clearInterval(productInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  // Build profileData from cardData with proper fallbacks
  const profileData = {
    // Personal Info
    prefix: cardData?.prefix || "",
    firstName: cardData?.firstName ||"",
    lastName: cardData?.lastName || "",
    suffix: cardData?.suffix || "",
    name: `${cardData?.prefix || ""} ${cardData?.firstName || "Gungn"} ${cardData?.lastName || ""}`.trim(),
   
    // Professional Info
    jobTitle: cardData?.jobTitle || "Service Provider",
    companyName: cardData?.companyName || "",
    department: cardData?.department || "",
    foundedName: cardData?.foundedName || "",
    organization: cardData?.organization || "",
   
    // Contact Info
    email: cardData?.email,
    phones: cardData?.phones || [],
    websites: cardData?.websites || [],
    addresses: cardData?.addresses || [],
   
    // Profile Content
    profileVideo: cardData?.profileVideo,
    titleLine: cardData?.titleLine || "",
    aboutText: cardData?.aboutText || "",
    bio: cardData?.bio || "SDFGHJKERTYUICVBNMDFGHJKWERTYUIOSDFGHJKZXOV",
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

    // NEW FIELDS FROM MODEL
    customFields: cardData?.customFields || [],
    dynamicQRCode: cardData?.dynamicQRCode || null,
    nfcSettings: cardData?.nfcSettings || { isEnabled: false },
    productRangeDisplay: cardData?.productRangeDisplay || 'grid',
    cardType: cardData?.cardType || 'Personal',
    design: cardData?.design || 'default',
    cardLayout: cardData?.cardLayout || 'standard',
    logoSize: cardData?.logoSize || 'medium',
   
    // Settings
    enableOneTapCall: cardData?.enableOneTapCall !== undefined ? cardData.enableOneTapCall : true,
    enableWhatsApp: cardData?.enableWhatsApp !== undefined ? cardData.enableWhatsApp : true,
    enableEmail: cardData?.enableEmail !== undefined ? cardData.enableEmail : true
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
  const primaryAddress = profileData.addresses.find(addr => addr.isPrimary) || profileData.addresses[0];

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'facebook': return <FaFacebookF />;
      case 'instagram': return <FaInstagram />;
      case 'twitter': return <FaXTwitter />;
      case 'youtube': return <FaYoutube />;
      case 'linkedin': return <FaLinkedinIn />;
      case 'whatsapp': return <FaWhatsapp />;
      case 'github': return <FaGlobe />;
      case 'telegram': return <FaGlobe />;
      case 'tiktok': return <FaGlobe />;
      case 'dribbble': return <FaGlobe />;
      case 'behance': return <FaGlobe />;
      case 'pinterest': return <FaGlobe />;
      case 'snapchat': return <FaGlobe />;
      case 'reddit': return <FaGlobe />;
      case 'medium': return <FaGlobe />;
      case 'skype': return <FaGlobe />;
      case 'discord': return <FaGlobe />;
      case 'slack': return <FaGlobe />;
      case 'zoom': return <FaGlobe />;
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
      case 'github': return "text-gray-300";
      case 'telegram': return "text-blue-400";
      case 'tiktok': return "text-white";
      default: return "text-gray-300";
    }
  };

  const formatPersonalHours = (hours) => {
    if (!hours) return "Mon - Sat. 10:00 - 20:00";
   
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const weekdays = days.slice(0, 5);
    const hasSameHours = weekdays.every(day =>
      hours[day]?.open === hours.monday?.open &&
      hours[day]?.close === hours.monday?.close
    );
   
    if (hasSameHours && hours.monday?.open && hours.monday?.close) {
      return `Mon - Fri: ${hours.monday.open} - ${hours.monday.close}`;
    }
   
    return "Mon - Sat. 10:00 - 20:00";
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
      case 'call-to-action': return <FaHeadset className="w-5 h-5" />;
      case 'shop-flow': return <FaShoppingCart className="w-5 h-5" />;
      case 'live-chat': return <FaHeadset className="w-5 h-5" />;
      case 'appointment-scheduler': return <FaCalendarAlt className="w-5 h-5" />;
      case 'digital-payments': return <FaCreditCard className="w-5 h-5" />;
      case 'lead-form': return <FaFilePdf className="w-5 h-5" />;
      case 'contact-form': return <FaEnvelope className="w-5 h-5" />;
      case 'language-switcher': return <FaLanguage className="w-5 h-5" />;
      case 'booking-system': return <FaCalendarAlt className="w-5 h-5" />;
      case 'newsletter-signup': return <FaEnvelope className="w-5 h-5" />;
      case 'file-download': return <FaDownload className="w-5 h-5" />;
      default: return <FaGlobe className="w-5 h-5" />;
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

  const totalSlides = Math.ceil(profileData.gallery.length / 3);

  return (
    <div className="min-h-screen w-full flex justify-center items-center py-6 overflow-y-auto 
      bg-gradient-to-b from-[#000000] via-[#0A0A2A] to-[#1E3A8A] rounded-[40px] relative">
      
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
      
      <div className="w-[450px] rounded-3xl overflow-hidden relative z-10">
        {/* Company Logo & Name Section - Reduced */}
{(profileData.companyLogo || profileData.companyName) && (
  <div className="mx-4 transform transition-transform duration-300 hover:scale-[1.02] min-h-[60px] flex items-center mt-4">
    <div className="flex flex-col items-center justify-center w-full space-y-2 ">
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
        <div className="text-center ">
          <h3 className="text-sm text-white/70 text-center break-words w-full">
            {profileData.companyName}
          </h3>
        </div>
      )}
    </div>
  </div>
)}
        {/* Profile Section - No Box, White Text */}
        <div className="relative h-48 rounded-b-3xl flex flex-col items-center justify-center pt-16 pb-8 mt-26 ">
          {/* Profile Photo */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            {profileData.profilePhoto ? (
              <img
                src={profileData.profilePhoto}
                alt={profileData.name}
                className="w-29 h-29 rounded-full border-2 border-white/90 object-cover shadow-lg"
                onError={(e) => {
                  console.log('Profile photo failed to load:', profileData.profilePhoto);
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            {!profileData.profilePhoto && (
              <div className="w-20 h-20 rounded-full border-4 border-white/20 bg-gradient-to-r from-blue-500 to-purple-500 flex justify-center items-center text-white text-2xl font-bold shadow-lg font-labrador">
                {profileData.name?.charAt(0) || "G"}
              </div>
            )}
          </div>

          {/* Name and Designation - White Text, Labrador Font */}
          <h2 className="text-4xl font-medium text-white mt-12 text-center font-orgon break-words w-full mx-auto px-3" style={{maxWidth: '380px'}}>
  {profileData.name}
</h2>
          <p className="text-lg text-white/90 font-[300] text-center font-orgon break-words w-full px-4 mt-0 mb-2">
  {profileData.jobTitle}
</p>
        </div>

        {/* Main Content Area */}
      <div className="pt-4 pb-6 px-5 space-y-3">



{/* Title Line / Recognition - Neon Style */}
{profileData.titleLine && (
  <div
    className="relative rounded-full w-80 h-13 px-6 py-3 flex items-center justify-center mt-0 ml-12"
    style={{
      fontFamily: "Zona Pro, sans-serif",
    }}
  >
    {/* Neon Glow Border */}
    <div className="absolute inset-0 rounded-full w-80 h-13 border-2 border-[white] "></div>

    {/* Inner Content */}
    <div className="relative text-center z-10">
      <FaCrown className="w-5 h-5 text-yellow-300 mx-auto mb-1 drop-shadow-[0_0_6px_#ffd700]" />
      <p className="text-white font-semibold text-sm tracking-wide px-3 ">
        {profileData.titleLine}
      </p>
    </div>
  </div>
)}


{/* About Section - Cleaned & Centered */}
{profileData.aboutText && (
  <div className="text-center mt-1">
    <h3 className="text-base font-semibold text-white flex justify-center items-center mb-2"
        style={{ fontFamily: "Zona, sans-serif" }}>
      <FaUserFriends className="w-4 h-4 text-blue-400 mr-2" />
      About
    </h3>

    <p className="text-white/90 text-sm leading-relaxed mb-4"
       style={{ fontFamily: "Zona Pro, sans-serif" }}>
      {profileData.aboutText}
    </p>
  </div>
)}


{/* Buttons - Redesigned */}
<div className="flex flex-col items-center space-y-4">

  {primaryPhone && profileData.enableOneTapCall && (
    <button
      onClick={() => handleContact("phone", primaryPhone.number)}
      className="
        flex items-center justify-center
        bg-white text-[#0A1A4B]
        px-6 py-3
        rounded-full w-90 h-11
        shadow-sm hover:shadow-md
        border border-gray-200
        transition-all duration-300
        font-[BankGothicGT] tracking-wide
      "
    >
      <FaPhoneAlt className="w-5 h-5 mr-3 text-[#0A1A4B]" />
      <span className="text-base font-medium">Phone</span>
    </button>
  )}

  {profileData.email && profileData.enableEmail && (
    <button
      onClick={() => handleContact("email", profileData.email)}
      className="
        flex items-center justify-center
        bg-white text-[#0A1A4B]
        px-6 py-3
        rounded-full w-90 h-11
        shadow-sm hover:shadow-md
        border border-gray-200
        transition-all duration-300
        font-[BankGothicGT] tracking-wide
      "
    >
      <FaEnvelope className="w-5 h-5 mr-3 text-[#0A1A4B]" />
      <span className="text-base font-medium">Email</span>
    </button>
  )}

  {primaryPhone && profileData.enableWhatsApp && (
    <button
      onClick={() => handleContact("whatsapp", primaryPhone.number)}
      className="
        flex items-center justify-center
        bg-white text-[#0A1A4B]
        px-6 py-3
        rounded-full w-90 h-11
        shadow-sm hover:shadow-md
        border border-gray-200
        transition-all duration-300
        font-[BankGothicGT] tracking-wide 
      "
    >
      <FaWhatsapp className="w-5 h-5 mr-2 text-[#0A1A4B] ml-7 " />
      <span className="text-base font-medium">Whatsaap</span>
    </button>
  )}

{/* Websites as Buttons */}
{profileData.websites.map((website, index) => (
  <button
    key={index}
    onClick={() => handleContact("website", website.url)}
    className="
      flex items-center justify-center
      bg-white text-[#0A1A4B]
      px-6 py-3
      rounded-full w-90 h-11
      shadow-sm hover:shadow-md
      border border-gray-200
      transition-all duration-300
      font-[BankGothicGT] tracking-wide 
      mb-3
    "
  >
    <FaGlobe className="w-5 h-5 mr-2 text-[#0A1A4B] ml-3" />
    <span className="text-base font-medium">Website</span>
  </button>
))}
</div>
{/* Social Icons */}
{profileData.socialLinks.filter(link => link.url).length > 0 && (
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

 
        

        {/* Profile Video Section - Reduced */}
       {profileData.profileVideo?.url && (
  <div className="text-center mt-8">

    {/* Heading exactly like About */}
    <h3
      className="text-base font-semibold text-white flex justify-center items-center mb-2 mt-10"
      style={{ fontFamily: "Zona, sans-serif" }}
    >
      <FaVideo className="w-4 h-4 text-blue-400 mr-2" />
      Introduction Video
    </h3>

    {/* Video container */}
    <div className="relative rounded-lg overflow-hidden h-40 bg-white/5 flex items-center justify-center">
      <video
        src={profileData.profileVideo.url}
        className="w-full h-full object-contain"
        controls
        poster={profileData.profileVideo.thumbnail}
      />

      {/* Title with Zona Pro font */}
      {profileData.profileVideo.title && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
          <p
            className="text-white/90 text-sm leading-relaxed"
            style={{ fontFamily: "Zona Pro, sans-serif" }}
          >
            {profileData.profileVideo.title}
          </p>
        </div>
      )}
    </div>
  </div>
)}

 
     

   {/* Organization Heading */}
{(profileData.foundedName || profileData.organization) && (
  <div className="text-center mb-5 mt-4">
     <h3
      className="text-base font-semibold text-white flex justify-center items-center mb-1 mt-10"
      style={{ fontFamily: "Zona, sans-serif" }}
    >
      <FaBuilding className="w-4 h-4 text-blue-400 mr-2" />
     Organization Details
    </h3>
  </div>
)}

{/* Organization Box with popup effect */}
{(profileData.foundedName || profileData.organization) && (
  <div
    className="rounded-xl p-3 border border-white shadow-lg text-center transform transition duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:opacity-100 opacity-95 "
  >
    {/* Founded Name */}
    {profileData.foundedName && (
    <p
            className="text-white text-sm leading-relaxed"
            style={{ fontFamily: "Zona Pro, sans-serif" }}
          >
        <span >Founded Name:</span> {profileData.foundedName}
      </p>
    )}

    {/* Organization */}
    {profileData.organization && (
     <p
            className="text-white text-sm leading-relaxed"
            style={{ fontFamily: "Zona Pro, sans-serif" }}
          >
        <span >Organization:</span> {profileData.organization}
      </p>
    )}
  </div>
)}
{/* Brand Label - Neon / Highlight Style */}
{profileData.brandLabel && (
  <div className="text-center mt-19 mb-2"> {/* Added larger top margin */}
    {/* Brand Label Heading */}
    <h3
      className="text-base font-semibold text-white flex justify-center items-center mb-1"
      style={{ fontFamily: "Zona, sans-serif" }}
    >
      <FaGem className="w-4 h-4 text-blue-400 mr-2" />
      Brand Label
    </h3>

    {/* Neon / Highlight Style with popup effect */}
    <div
      className="relative rounded-xl w-80 h-14 flex items-center justify-center mt-2 mx-auto transform transition-transform duration-300 hover:scale-105"
      style={{ fontFamily: "Zona Pro, sans-serif" }}
    >
      {/* Glow Border */}
      <div className="absolute inset-0 rounded-full border-2 border-white"></div>

      {/* Inner Content */}
      <div className="relative text-center z-10 flex items-center space-x-2">
        <p className="text-white font-semibold text-sm tracking-wide">
          {profileData.brandLabel}
        </p>
      </div>
    </div>
  </div>
)}





 
{/* Gallery - Clean Version */}
{profileData.gallery.length > 0 && (
  <div className="p-3 text-center space-y-3">
    {/* Heading */}
    <h3
      className="text-base font-semibold text-white flex justify-center items-center mb-2 mt-10"
      style={{ fontFamily: "Zona, sans-serif" }}
    >
      <FaImage className="w-4 h-4 text-blue-400 mr-2" />
      Gallery
    </h3>

    <div className="space-y-2">
      {/* Top Image */}
      {getCurrentSlideImages()[0] && (
        <div className="relative rounded-lg overflow-hidden h-40 sm:h-48 transform transition-transform duration-300 hover:scale-105">
          <img
            src={getCurrentSlideImages()[0].url}
            alt={getCurrentSlideImages()[0].title}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.log('Gallery image failed to load:', getCurrentSlideImages()[0].url);
              e.target.style.display = 'none';
            }}
          />
          {getCurrentSlideImages()[0].title && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-1">
              <p
                className="text-xs font-medium break-words"
                style={{ fontFamily: "Zona Pro, sans-serif" }}
              >
                {getCurrentSlideImages()[0].title}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Bottom 2 Images */}
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
              onError={(e) => {
                console.log('Gallery image failed to load:', item.url);
                e.target.style.display = 'none';
              }}
            />
            {item.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-1">
                <p
                  className="text-xs font-medium break-words"
                  style={{ fontFamily: "Zona Pro, sans-serif" }}
                >
                  {item.title}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Navigation Arrows */}
    {profileData.gallery.length > 3 && (
      <div className="flex justify-center items-center space-x-3 mt-2">
        <button
          onClick={prevSlide}
          className="bg-white/10 hover:bg-white/20 text-white rounded-full p-1 shadow transform transition-transform duration-300 hover:scale-110 w-6 h-6 flex items-center justify-center"
        >
          <FaChevronLeft className="w-2 h-2" />
        </button>

        {/* Slide Indicators */}
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
    <h3
      className="text-base font-semibold text-white flex justify-center items-center mb-2"
      style={{ fontFamily: "Zona, sans-serif" }}
    >
      <FaBriefcase className="w-4 h-4 text-blue-400 mr-2" />
      Professional Bio
    </h3>
    <p
      className="text-white/90 text-sm leading-relaxed break-words"
      style={{ fontFamily: "Zona Pro, sans-serif" }}
    >
      {profileData.bio}
    </p>
  </div>
)}


{profileData.services.length > 0 && (
  <div className="text-center mt-4">
    {/* Heading */}
    <h3
      className="text-base font-semibold text-white flex justify-center items-center mb-2 mt-12"
      style={{ fontFamily: "Zona, sans-serif" }}
    >
      <FaShoppingCart className="w-4 h-4 text-blue-200 mr-2" />
      Services
    </h3>

    {/* Auto-slider Container */}
    <div className="relative overflow-hidden max-w-xl mx-auto  bg-blue border-1 ">
      <div className="flex flex-col space-y-3">
        {getCurrentServiceItem() && (
          <div className="flex flex-col p-3 rounded-lg bg-black/8 min-h-[120px] w-90 ml-8">
            {/* Description/About at top */}
            {getCurrentServiceItem().description && (
              <div className="text-left mb-3">
                <span
                  className="text-white/90 text-xs block break-words"
                  style={{ fontFamily: "Zona Pro, sans-serif" }}
                >
                  {getCurrentServiceItem().description}
                </span>
              </div>
            )}
            
            {/* Image in middle */}
            <div className="flex justify-center mb-3">
              {getCurrentServiceItem().image && (
                <img
                  src={getCurrentServiceItem().image}
                  alt={getCurrentServiceItem().name}
                  className="w-60 h-28 rounded object-cover"
                  onError={(e) => {
                    console.log('Service image failed to load:', getCurrentServiceItem().image);
                    e.target.style.display = 'none';
                  }}
                />
              )}
            </div>

            {/* Name and Price at bottom */}
            <div className="flex items-center justify-between">
              <span
                className="text-white text-sm font-medium block break-words"
                style={{ fontFamily: "Zona Pro, sans-serif" }}
              >
                {getCurrentServiceItem().name}
              </span>
              
              {getCurrentServiceItem().price && (
                <span
                  className="text-white text-sm font-bold whitespace-nowrap flex-shrink-0 ml-3"
                  style={{ fontFamily: "Zona Pro, sans-serif" }}
                >
                  {getCurrentServiceItem().price} {getCurrentServiceItem().currency}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Service Slide Indicators */}
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


{profileData.products.length > 0 && (
  <div className="text-center mt-4">
    {/* Heading */}
    <h3
      className="text-base font-semibold text-white flex justify-center items-center mb-3 mt-12"
      style={{ fontFamily: "Zona, sans-serif" }}
    >
      <FaGem className="w-4 h-4 text-blue-400 mr-2 " />
      Products
    </h3>

    {/* Auto-slider Container */}
    <div className="relative overflow-hidden max-w-xl mx-auto">
      <div className="flex flex-col space-y-3">
        {getCurrentProductItem() && (
         <div className="flex flex-col p-3 rounded-lg  min-h-[120px] w-90 ml-8">
            {/* Description/About at top */}
            {getCurrentProductItem().description && (
              <div className="text-left mb-3">
                <span
                  className="text-white text-xs block break-words"
                  style={{ fontFamily: "Zona Pro, sans-serif" }}
                >
                  {getCurrentProductItem().description}
                </span>
              </div>
            )}
            
            {/* Image in middle */}
            <div className="flex justify-center mb-3">
              {getCurrentProductItem().image && (
                <img
                  src={getCurrentProductItem().image}
                  alt={getCurrentProductItem().name}
                  className="w-60 h-28 rounded object-cover"
                  onError={(e) => {
                    console.log('Product image failed to load:', getCurrentProductItem().image);
                    e.target.style.display = 'none';
                  }}
                />
              )}
            </div>

            {/* Name and Price at bottom */}
            <div className="flex items-center justify-between">
              <span
                className="text-white text-sm font-medium block break-words"
                style={{ fontFamily: "Zona Pro, sans-serif" }}
              >
                {getCurrentProductItem().name}
              </span>
              
              {getCurrentProductItem().price && (
                <span
                  className="text-white text-sm font-bold whitespace-nowrap flex-shrink-0 ml-3"
                  style={{ fontFamily: "Zona Pro, sans-serif" }}
                >
                  {getCurrentProductItem().price} {getCurrentProductItem().currency}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Product Slide Indicators */}
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


        {/* Testimonials Section - Updated Layout with Auto Slider */}
{profileData.testimonials.length > 0 && (
  <div className="text-center mt-4">
    {/* Heading */}
    <h3
      className="text-base font-semibold text-white flex justify-center items-center mb-3 mt-10"
      style={{ fontFamily: "Zona, sans-serif" }}
    >
      <FaStar className="w-4 h-4 text-blue-400 mr-2 " />
      Testimonials
    </h3>

    {/* Auto-slider Container */}
    <div className="relative overflow-hidden max-w-xl mx-auto">
      <div className="flex flex-col space-y-3">
        {getCurrentTestimonialItem() && (
          <div className="rounded-lg p-4 bg-white/5 w-full">
            {/* Name and Stars centered */}
            <div className="text-center mb-3">
              <span
                className="font-semibold text-white text-sm break-words block"
                style={{ fontFamily: "Zona Pro, sans-serif" }}
              >
                {getCurrentTestimonialItem().clientName}
              </span>
              
              {/* Stars centered under name */}
              {getCurrentTestimonialItem().rating && (
                <div className="flex space-x-0.5 mt-2 justify-center">
                  {renderStars(getCurrentTestimonialItem().rating)}
                </div>
              )}
            </div>

            {/* Testimonial Text */}
            <p
              className="text-white/90 text-sm italic break-words text-center"
              style={{ fontFamily: "Zona Pro, sans-serif" }}
            >
              "{getCurrentTestimonialItem().testimonial}"
            </p>

            {/* Company */}
            {getCurrentTestimonialItem().company && (
              <p
                className="text-white/70 text-sm mt-2 break-words text-center"
                style={{ fontFamily: "Zona Pro, sans-serif" }}
              >
                {getCurrentTestimonialItem().company}
              </p>
            )}
          </div>
        )}
      </div>
    </div>

    {/* Testimonial Slide Indicators */}
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

{/* Client List Section */}
{profileData.clientList.length > 0 && (
  <div className="text-center mt-4">
    {/* Heading */}
    <h3
      className="text-base font-semibold text-white flex justify-center items-center mb-3"
      style={{ fontFamily: "Zona, sans-serif" }}
    >
      <FaUserFriends className="w-4 h-4 text-blue-400 mr-2" />
      Our Clients
    </h3>

    {/* Horizontal Slider */}
    <div className="overflow-x-auto whitespace-nowrap py-2 px-1">
      {profileData.clientList.map((client, index) => (
        <span
          key={index}
          className="inline-block bg-transparent text-white px-3 py-2 rounded-full border border-white text-sm mr-2 transform transition-transform duration-300 hover:scale-105"
          style={{ fontFamily: "Zona Pro, sans-serif" }}
        >
          {client}
        </span>
      ))}
    </div>
  </div>
)}


     
{/* Downloads Section */}
{profileData.downloads.length > 0 && (
  <div className="text-center mt-8">
    {/* Heading */}
    <h3
      className="text-base font-semibold text-white flex justify-center items-center mb-2 mt-10"
      style={{ fontFamily: "Zona, sans-serif" }}
    >
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
          {/* File Info */}
          <div className="flex items-center space-x-3">
            <FaFilePdf className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div className="flex-1 min-w-0 text-left">
              <p
                className="text-white text-sm font-medium break-words"
                style={{ fontFamily: "Zona Pro, sans-serif" }}
              >
                {download.name}
              </p>
              {download.fileSize && (
                <p
                  className="text-white/70 text-xs break-words"
                  style={{ fontFamily: "Zona Pro, sans-serif" }}
                >
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



   {/* Interactive Elements - Clean / Centered */}
{profileData.interactiveElements.length > 0 && (
  <div className="text-center mt-8">
    {/* Heading */}
    <h3
      className="text-base font-semibold text-white flex justify-center items-center mb-4"
      style={{ fontFamily: "Zona, sans-serif" }}
    >
      <FaHeadset className="w-4 h-4 text-blue-400 mr-2" />
      Quick Actions
    </h3>

    {/* Buttons */}
    <div className="flex flex-wrap justify-center gap-4 max-w-xl mx-auto">
      {profileData.interactiveElements
        .filter(element => element.isActive)
        .map((element, index) => (
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
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-white text-white text-sm font-medium cursor-pointer transform transition-transform duration-300 hover:scale-105 min-w-[90px] min-h-[70px]"
            style={{ fontFamily: "Zona Pro, sans-serif" }}
          >
            <div className="text-blue-400 mb-1">
              {getInteractiveElementIcon(element.type)}
            </div>
            <span className="text-xs break-words text-center">
              {element.type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </button>
        ))}
    </div>
  </div>
)}


        {/* QR Code - Reduced */}
      
{profileData.dynamicQRCode?.targetUrl && (
  <div className="text-center mt-12">
    {/* Heading */}
    <h3
      className="text-base font-semibold text-white flex justify-center items-center mb-4 mt-12"
      style={{ fontFamily: "Zona, sans-serif" }}
    >
      <FaQrcode className="w-4 h-4 text-blue-400 mr-2" />
      QR Code
    </h3>

    {/* QR Code Container */}
    <div className="flex justify-center">
      <div className="p-2 rounded-xl border border-white transform transition-transform duration-300 hover:scale-105">
        {profileData.dynamicQRCode.qrImage ? (
          <img
            src={profileData.dynamicQRCode.qrImage}
            alt="QR Code"
            className="w-24 h-24 object-contain"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-800 flex items-center justify-center text-gray-400 rounded-xl">
            QR Code
          </div>
        )}
      </div>
    </div>

    {/* Subtext */}
    <p
      className="text-xs text-white/70 mt-2"
      style={{ fontFamily: "Zona Pro, sans-serif" }}
    >
      Scan to save contact
    </p>
  </div>
)}


       {/* NFC Badge - Clean / Centered */}
{profileData.nfcSettings?.isEnabled && (
  <div className="text-center mt-8">
    {/* Heading */}
    <h3
      className="text-base font-semibold text-white flex justify-center items-center mb-3"
      style={{ fontFamily: "Zona, sans-serif" }}
    >
      <FaShieldAlt className="w-4 h-4 text-blue-400 mr-2" />
      NFC Enabled
    </h3>

    {/* Badge Content */}
    <div className="inline-flex items-center space-x-2 px-4 py-2 border border-white rounded-xl cursor-pointer transform transition-transform duration-300 hover:scale-105">
      <FaIdCard className="w-4 h-4 text-blue-400" />
      <span
        className="text-xs font-medium text-white"
        style={{ fontFamily: "Zona Pro, sans-serif" }}
      >
        Tap to Connect
      </span>
    </div>
  </div>
)}

{/* Custom Fields - Clean / Centered */}
{profileData.customFields.length > 0 && (
  <div className="text-center mt-8">
    {/* Heading */}
    <h3
      className="text-base font-semibold text-white flex justify-center items-center mb-4"
      style={{ fontFamily: "Zona, sans-serif" }}
    >
      <FaInfoCircle className="w-4 h-4 text-blue-400 mr-2" />
      Additional Information
    </h3>

    {/* Fields */}
    <div className="inline-block text-left w-full max-w-md space-y-2">
      {profileData.customFields.map((field, index) => (
        <div
          key={index}
          className="flex justify-between px-3 py-2 border border-white rounded-xl transform transition-transform duration-300 hover:scale-[1.02]"
        >
          <span
            className="text-xs font-medium text-white break-words"
            style={{ fontFamily: "Zona Pro, sans-serif" }}
          >
            {field.label}:
          </span>
          <span
            className="text-xs text-white break-words text-right"
            style={{ fontFamily: "Zona Pro, sans-serif" }}
          >
            {field.value}
          </span>
        </div>
      ))}
    </div>
  </div>
)}

 
       {/* Address Information - Reduced */}
       {profileData.addresses.length > 0 && (
  <div className="text-center mt-8">
    {/* Heading */}
    <h3
      className="text-base font-semibold text-white flex justify-center items-center mb-2 mt-10"
      style={{ fontFamily: "Zona, sans-serif" }}
    >
      <FaMapMarkerAlt className="w-4 h-4 text-red-400 mr-2" />
      Location
    </h3>

    {/* Address List */}
    <div className="space-y-2 max-w-xl mx-auto">
      {profileData.addresses.map((address, index) => (
        <div
          key={index}
          onClick={() => handleContact("map", address.googleMapsLink)}
          className="flex items-start justify-start p-3 rounded-xl hover:scale-105 transform transition-transform duration-300 cursor-pointer bg-black/70"
          style={{ fontFamily: "Zona Pro, sans-serif" }}
        >
          <div className="w-7 h-7 bg-red-500/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <FaMapMarkerAlt className="w-3 h-3 text-red-400" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <span className="text-white text-sm font-semibold block break-words">
              {address.label || "Address"} {address.isPrimary && "(Primary)"}
            </span>
            <span className="text-white/70 text-sm block mt-1 break-words">
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
  );
};
 
export default DarkCard;