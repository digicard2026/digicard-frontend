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

  // Clean professional background
  const backgroundImage = "https://images.pexels.com/photos/14321795/pexels-photo-14321795.jpeg";

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
      @import url('https://fonts.cdnfonts.com/css/zona');
      @import url('https://fonts.cdnfonts.com/css/zona-pro');
      
      html, body {
        height: 100%;
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch;
        font-family: 'Outfit', sans-serif;
        background: #f8fafc;
      }
      #root {
        min-height: 100%;
        font-family: 'Outfit', sans-serif;
      }
      * {
        font-family: 'Outfit', sans-serif;
      }
      .font-zona {
        font-family: 'Zona', sans-serif;
      }
      .font-zona-pro {
        font-family: 'Zona Pro', sans-serif;
      }
      .mobile-container {
        width: ${MOBILE_WIDTH}px;
        min-height: ${MOBILE_HEIGHT}px;
        max-height: ${MOBILE_HEIGHT}px;
        overflow-y: auto;
        position: relative;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .mobile-container::-webkit-scrollbar {
        display: none;
      }
      .tab-content {
        height: calc(100% - 180px);
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        padding-bottom: 20px;
      }
      .tab-content::-webkit-scrollbar {
        display: none;
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

    const clientInterval = setInterval(() => {
      setCurrentClientSlide(prev => (prev + 1) % Math.max(1, profileData.clientList.length));
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
    firstName: cardData?.firstName || "Zinu",
    lastName: cardData?.lastName || "Doe",
    suffix: cardData?.suffix || "",
    name: `${cardData?.prefix || ""} ${cardData?.firstName || "Zinu"} ${cardData?.lastName || "Doe"}`.trim(),
   
    // Professional Info
    jobTitle: cardData?.jobTitle || "Developer",
    companyName: cardData?.companyName || "GravityWave Labs",
    department: cardData?.department || "",
    foundedName: cardData?.foundedName || "Zack",
    organization: cardData?.organization || "GWL",
   
    // Contact Info
    email: cardData?.email || "zinu.doe@gravitywavelabs.com",
    phones: cardData?.phones || [{ number: "+1234567890", isPrimary: true }],
    websites: cardData?.websites || [],
    addresses: cardData?.addresses || [],
   
    // Profile Content
    profileVideo: cardData?.profileVideo || { url: "https://example.com/video.mp4", title: "Intro Video" },
    titleLine: cardData?.titleLine || "Employee of the Year",
    aboutText: cardData?.aboutText || "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    bio: cardData?.bio || "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
    services: cardData?.services || [
      { 
        name: "Web Development", 
        description: "Modern web applications", 
        price: "$99", 
        currency: "USD",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400"
      },
      { 
        name: "Mobile Apps", 
        description: "Cross-platform mobile solutions", 
        price: "$149", 
        currency: "USD",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400"
      }
    ],
    products: cardData?.products || [
      { 
        name: "UI Kit", 
        description: "Beautiful design components", 
        price: "$49", 
        currency: "USD",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400"
      },
      { 
        name: "API Service", 
        description: "Robust backend solutions", 
        price: "$79", 
        currency: "USD",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400"
      }
    ],
   
    // Premium Features
    testimonials: cardData?.testimonials || [
      { clientName: "Sarah Johnson", testimonial: "Excellent service and professional approach!", rating: 5, company: "ABC Corp" },
      { clientName: "Mike Chen", testimonial: "Highly recommended for quality work.", rating: 4, company: "XYZ Ltd" }
    ],
    clientList: cardData?.clientList || ["ABC Corp", "XYZ Ltd", "Global Solutions", "Tech Innovators"],
    gallery: cardData?.gallery || [],
    downloads: cardData?.downloads || [],
    interactiveElements: cardData?.interactiveElements || [],

    // NEW FIELDS FROM DARKCARD
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

  // Icon-only tabs with tooltips
  const tabs = [
    { id: 'profile', label: 'Profile', icon: FaUser, tooltip: 'Profile' },
    { id: 'services', label: 'Services', icon: FaShoppingCart, tooltip: 'Services & Products' },
    { id: 'contact', label: 'Contact', icon: FaAddressCard, tooltip: 'Contact Info' },
    { id: 'gallery', label: 'Gallery', icon: FaImages, tooltip: 'Gallery' },
    { id: 'more', label: 'More', icon: FaEllipsisH, tooltip: 'More Info' }
  ];

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
        className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
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

  // Tab Components - Optimized for mobile with ALL fields
  const ProfileTab = () => (
    <div className="space-y-3 px-4 pt-3 pb-4">
      {/* About Section */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-2">
        <h3 className="text-base font-semibold text-gray-800 mb-2 flex items-center justify-center font-zona">
          <FaUser className="w-4 h-4 text-blue-600 mr-2" />
          About Me
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed text-center font-zona-pro">
          {profileData.aboutText}
        </p>
      </div>

      {/* Professional Bio */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-2">
        <h3 className="text-base font-semibold text-gray-800 mb-2 flex items-center justify-center font-zona">
          <FaBriefcase className="w-4 h-4 text-blue-600 mr-2" />
          Professional Bio
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed text-center font-zona-pro">
          {profileData.bio}
        </p>
      </div>

      {/* Organization Details */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-2">
        <h3 className="text-base font-semibold text-gray-800 mb-2 flex items-center justify-center font-zona">
          <FaBuilding className="w-4 h-4 text-blue-600 mr-2" />
          Organization
        </h3>
        <div className="space-y-1 text-center">
          <p className="text-gray-600 text-sm font-zona-pro">
            <span className="font-medium">Founded:</span> {profileData.foundedName}
          </p>
          <p className="text-gray-600 text-sm font-zona-pro">
            <span className="font-medium">Organization:</span> {profileData.organization}
          </p>
        </div>
      </div>

      {/* Working Hours */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-2">
        <h3 className="text-base font-semibold text-gray-800 mb-2 flex items-center justify-center font-zona">
          <FaClock className="w-4 h-4 text-blue-600 mr-2" />
          Working Hours
        </h3>
        <p className="text-gray-600 text-sm text-center font-zona-pro">
          {formatWorkingHours(profileData.workingHours)}
        </p>
      </div>

      {/* Profile Video */}
      {profileData.profileVideo?.url && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-2">
          <h3 className="text-base font-semibold text-gray-800 mb-2 flex items-center justify-center font-zona">
            <FaVideo className="w-4 h-4 text-blue-600 mr-2" />
            Introduction Video
          </h3>
          <div className="relative rounded-lg overflow-hidden h-32 bg-gray-100 flex items-center justify-center">
            <video
              src={profileData.profileVideo.url}
              className="w-full h-full object-cover"
              controls
              poster={profileData.profileVideo.thumbnail}
            />
          </div>
          {profileData.profileVideo.title && (
            <p className="text-gray-600 text-sm mt-2 text-center font-zona-pro">
              {profileData.profileVideo.title}
            </p>
          )}
        </div>
      )}
    </div>
  );

  const ServicesTab = () => (
    <div className="space-y-3 px-4 pt-3 pb-4">
      {/* Services Slider */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-2">
        <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center justify-center font-zona">
          <FaShoppingCart className="w-4 h-4 text-blue-600 mr-2" />
          Services
        </h3>
        
        {/* Services Slider */}
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-300">
            {getCurrentServiceItem() && (
              <div className="w-full flex-shrink-0">
                <div className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow bg-gray-50">
                  {/* Service Image */}
                  {getCurrentServiceItem().image && (
                    <div className="mb-2 rounded-lg overflow-hidden h-32">
                      <img
                        src={getCurrentServiceItem().image}
                        alt={getCurrentServiceItem().name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-gray-800 text-sm font-zona">{getCurrentServiceItem().name}</h4>
                    {getCurrentServiceItem().price && (
                      <span className="text-blue-600 font-bold text-sm bg-blue-50 px-2 py-1 rounded font-zona-pro">
                        {getCurrentServiceItem().price}
                      </span>
                    )}
                  </div>
                  {getCurrentServiceItem().description && (
                    <p className="text-gray-600 text-sm mt-1 font-zona-pro">{getCurrentServiceItem().description}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Service Slide Indicators */}
        {profileData.services.length > 1 && (
          <div className="flex justify-center space-x-2 mt-3">
            {Array.from({ length: profileData.services.length }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentServiceSlide(index)}
                className={`w-2 h-2 rounded-full transition-all transform duration-300 ${
                  index === currentServiceSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Products Slider */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-2">
        <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center justify-center font-zona">
          <FaGem className="w-4 h-4 text-blue-600 mr-2" />
          Products
        </h3>
        
        {/* Products Slider */}
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-300">
            {getCurrentProductItem() && (
              <div className="w-full flex-shrink-0">
                <div className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow bg-gray-50">
                  {/* Product Image */}
                  {getCurrentProductItem().image && (
                    <div className="mb-2 rounded-lg overflow-hidden h-32">
                      <img
                        src={getCurrentProductItem().image}
                        alt={getCurrentProductItem().name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-gray-800 text-sm font-zona">{getCurrentProductItem().name}</h4>
                    {getCurrentProductItem().price && (
                      <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded font-zona-pro">
                        {getCurrentProductItem().price}
                      </span>
                    )}
                  </div>
                  {getCurrentProductItem().description && (
                    <p className="text-gray-600 text-sm mt-1 font-zona-pro">{getCurrentProductItem().description}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Slide Indicators */}
        {profileData.products.length > 1 && (
          <div className="flex justify-center space-x-2 mt-3">
            {Array.from({ length: profileData.products.length }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProductSlide(index)}
                className={`w-2 h-2 rounded-full transition-all transform duration-300 ${
                  index === currentProductSlide ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const ContactTab = () => {
    const primaryPhone = profileData.phones.find(phone => phone.isPrimary) || profileData.phones[0];
    
    return (
      <div className="space-y-3 px-4 pt-3 pb-4">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-2">
          <h3 className="text-base font-semibold text-gray-800 mb-3 text-center font-zona">
            Quick Connect
          </h3>
          <div className="space-y-2">
            {primaryPhone && profileData.enableOneTapCall && (
              <button
                onClick={() => handleContact("phone", primaryPhone.number)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 px-4 flex items-center justify-center shadow-sm hover:shadow-md transition-all text-sm font-zona"
              >
                <FaPhoneAlt className="w-4 h-4 mr-2" />
                <span className="font-medium">Call Now</span>
              </button>
            )}

            {primaryPhone && profileData.enableWhatsApp && (
              <button
                onClick={() => handleContact("whatsapp", primaryPhone.number)}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 px-4 flex items-center justify-center shadow-sm hover:shadow-md transition-all text-sm font-zona"
              >
                <FaWhatsapp className="w-4 h-4 mr-2" />
                <span className="font-medium">WhatsApp</span>
              </button>
            )}

            {profileData.email && profileData.enableEmail && (
              <button
                onClick={() => handleContact("email", profileData.email)}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white rounded-lg py-3 px-4 flex items-center justify-center shadow-sm hover:shadow-md transition-all text-sm font-zona"
              >
                <FaEnvelope className="w-4 h-4 mr-2" />
                <span className="font-medium">Email</span>
              </button>
            )}

            {/* Websites */}
            {profileData.websites.map((website, index) => (
              <button
                key={index}
                onClick={() => handleContact("website", website.url)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3 px-4 flex items-center justify-center shadow-sm hover:shadow-md transition-all text-sm font-zona"
              >
                <FaGlobe className="w-4 h-4 mr-2" />
                <span className="font-medium">Website</span>
              </button>
            ))}
          </div>
        </div>

        {/* Addresses */}
        {profileData.addresses.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-2">
            <h3 className="text-base font-semibold text-gray-800 mb-3 text-center font-zona">
              <FaMapMarkerAlt className="w-4 h-4 text-red-500 mr-2 inline" />
              Locations
            </h3>
            <div className="space-y-2">
              {profileData.addresses.map((address, index) => (
                <div
                  key={index}
                  onClick={() => handleContact("map", address.googleMapsLink)}
                  className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all cursor-pointer bg-gray-50"
                >
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="w-4 h-4 text-red-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800 text-sm font-zona">
                        {address.label} {address.isPrimary && "(Primary)"}
                      </p>
                      <p className="text-gray-600 text-sm mt-1 font-zona-pro">
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
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-2">
            <h3 className="text-base font-semibold text-gray-800 mb-3 text-center font-zona">
              Follow Me
            </h3>
            <div className="flex justify-center space-x-3">
              {profileData.socialLinks
                .filter(link => link.url)
                .map((social, index) => (
                  <button
                    key={index}
                    onClick={() => handleContact("default", social.url)}
                    className="w-12 h-12 rounded-full bg-gray-100 shadow-sm hover:shadow-md transition-all transform hover:scale-110 flex items-center justify-center text-gray-600 hover:text-blue-600"
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

  const GalleryTab = () => (
    <div className="space-y-3 px-4 pt-3 pb-4">
      {profileData.gallery.length > 0 ? (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-2">
          <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center justify-center font-zona">
            <FaImages className="w-4 h-4 text-blue-600 mr-2" />
            Gallery
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {profileData.gallery.map((item, index) => (
              <div key={index} className="aspect-square rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 mb-2">
          <FaImages className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm font-zona-pro">No gallery images available</p>
        </div>
      )}
    </div>
  );

  const MoreTab = () => (
    <div className="space-y-3 px-4 pt-3 pb-4">
      {/* Testimonials Slider */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-2">
        <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center justify-center font-zona">
          <FaStar className="w-4 h-4 text-yellow-500 mr-2" />
          Testimonials
        </h3>
        
        {/* Testimonials Slider */}
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-300">
            {getCurrentTestimonialItem() && (
              <div className="w-full flex-shrink-0">
                <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800 text-sm font-zona">
                      {getCurrentTestimonialItem().clientName}
                    </span>
                    {getCurrentTestimonialItem().rating && (
                      <div className="flex space-x-1">
                        {renderStars(getCurrentTestimonialItem().rating)}
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm italic mb-2 font-zona-pro">
                    "{getCurrentTestimonialItem().testimonial}"
                  </p>
                  {getCurrentTestimonialItem().company && (
                    <p className="text-gray-500 text-sm font-zona-pro">
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
          <div className="flex justify-center space-x-2 mt-3">
            {Array.from({ length: profileData.testimonials.length }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonialSlide(index)}
                className={`w-2 h-2 rounded-full transition-all transform duration-300 ${
                  index === currentTestimonialSlide ? 'bg-yellow-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Client List */}
      {profileData.clientList.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-2">
          <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center justify-center font-zona">
            <FaUserFriends className="w-4 h-4 text-blue-600 mr-2" />
            Our Clients
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {profileData.clientList.map((client, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium font-zona-pro"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Downloads */}
      {profileData.downloads.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-2">
          <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center justify-center font-zona">
            <FaDownload className="w-4 h-4 text-blue-600 mr-2" />
            Downloads
          </h3>
          <div className="space-y-2">
            {profileData.downloads.map((download, index) => (
              <div
                key={index}
                onClick={() => handleContact("default", download.fileUrl)}
                className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all cursor-pointer bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaFilePdf className="w-5 h-5 text-red-500 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800 text-sm font-zona">{download.name}</p>
                      {download.fileSize && (
                        <p className="text-gray-500 text-sm font-zona-pro">{download.fileSize}</p>
                      )}
                    </div>
                  </div>
                  <FaDownload className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Elements */}
      {profileData.interactiveElements.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-2">
          <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center justify-center font-zona">
            <FaHeadset className="w-4 h-4 text-blue-600 mr-2" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
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
                  className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:shadow-md transition-all bg-gray-50"
                >
                  <div className="text-blue-600 mb-2">
                    {getInteractiveElementIcon(element.type)}
                  </div>
                  <span className="text-gray-700 text-sm text-center font-zona-pro">
                    {element.type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Custom Fields */}
      {profileData.customFields.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-2">
          <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center justify-center font-zona">
            <FaInfoCircle className="w-4 h-4 text-blue-600 mr-2" />
            Additional Information
          </h3>
          <div className="space-y-2">
            {profileData.customFields.map((field, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-700 font-zona">{field.label}:</span>
                <span className="text-sm text-gray-600 font-zona-pro">{field.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QR Code */}
      {profileData.dynamicQRCode?.targetUrl && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-2">
          <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center justify-center font-zona">
            <FaQrcode className="w-4 h-4 text-blue-600 mr-2" />
            QR Code
          </h3>
          <div className="flex justify-center">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              {profileData.dynamicQRCode.qrImage ? (
                <img
                  src={profileData.dynamicQRCode.qrImage}
                  alt="QR Code"
                  className="w-32 h-32 object-contain"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg">
                  QR Code
                </div>
              )}
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-2 font-zona-pro">Scan to save contact</p>
        </div>
      )}

      {/* NFC Badge */}
      {profileData.nfcSettings?.isEnabled && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-2">
          <h3 className="text-base font-semibold text-gray-800 mb-2 flex items-center justify-center font-zona">
            <FaShieldAlt className="w-4 h-4 text-blue-600 mr-2" />
            NFC Enabled
          </h3>
          <div className="flex justify-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-zona">
              <FaIdCard className="w-4 h-4" />
              <span className="font-medium">Tap to Connect</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const primaryPhone = profileData.phones.find(phone => phone.isPrimary) || profileData.phones[0];

  return (
    <div 
      className="mobile-container mx-auto shadow-2xl rounded-3xl overflow-hidden relative"
      style={{
        width: `${MOBILE_WIDTH}px`,
        height: `${MOBILE_HEIGHT}px`,
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Subtle overlay for better readability */}
      {/* <div className="absolute inset-0 bg-white/80"></div> */}
      
      {/* Header Section */}
      <div className="relative  rounded-b-3xl pb-4 pt-4 border-b border-gray-200 shadow-sm">
        {/* Company Logo and Name */}
       <div className="flex justify-center items-center mb-3">
  {profileData.companyLogo ? (
    <div className="flex items-center space-x-3  backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
      <div className="bg-white rounded-full p-1.5 shadow-sm">
        <img
          src={profileData.companyLogo}
          alt="Company Logo"
          className="w-10 h-10 object-contain"
          onError={(e) => {
            console.log('Company logo failed to load');
            e.target.style.display = 'none';
          }}
        />
      </div>
      <h3 className="text-white text-base font-bold font-zona">
        {profileData.companyName}
      </h3>
    </div>
  ) : (
    <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 border border-white/30">
      <h3 className="text-white text-base font-bold font-zona">
        {profileData.companyName}
      </h3>
    </div>
  )}
</div>

        {/* Profile Section */}
        <div className="relative flex flex-col items-center justify-center px-4">
          {/* Profile Photo */}
          <div className="mb-3">
            {profileData.profilePhoto ? (
              <img
                src={profileData.profilePhoto}
                alt={profileData.name}
                className="w-16 h-16 rounded-full border-3 border-white shadow-lg object-cover"
                onError={(e) => {
                  console.log('Profile photo failed to load:', profileData.profilePhoto);
                  e.target.style.display = 'none';
                }}
              />
            ) : null}
            {/* Fallback profile picture */}
            {(!profileData.profilePhoto) && (
              <div className="w-16 h-16 rounded-full border-3 border-white bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-lg font-bold shadow-lg font-zona">
                {profileData.name?.charAt(0) || "Z"}
              </div>
            )}
          </div>

          {/* Name and Title */}
          <h2 className="text-lg font-bold text-gray-800 text-center mb-1 font-zona">
            {profileData.name}
          </h2>
          <p className="text-gray-600 text-sm text-center mb-2 font-zona-pro">
            {profileData.jobTitle}
          </p>

          {/* Title Line */}
          <div className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-xs font-medium border border-blue-200 font-zona">
            {profileData.titleLine}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="relative bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="flex justify-between items-center px-4 py-3">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'text-blue-600 transform scale-105' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title={tab.tooltip}
            >
              <tab.icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium truncate max-w-12 font-zona">
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content relative">
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'services' && <ServicesTab />}
        {activeTab === 'contact' && <ContactTab />}
        {activeTab === 'gallery' && <GalleryTab />}
        {activeTab === 'more' && <MoreTab />}
      </div>

      {/* Floating Action Button */}
      {primaryPhone && (
        <div className="absolute bottom-4 right-4 z-20">
          <button
            onClick={() => handleContact("phone", primaryPhone.number)}
            className="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all transform hover:scale-110"
          >
            <FaPhoneAlt className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LightCard;