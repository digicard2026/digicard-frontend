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
  FaIdCard
} from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";

const DarkCard = ({ cardData = {} }) => {
  console.log('🎯 DarkCard received data:', cardData);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🔹 Inject global scroll CSS with Poppins font
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
      html, body {
        height: 100%;
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch;
        background-color: #f3f4f6;
        font-family: 'Poppins', sans-serif;
      }
      #root {
        min-height: 100%;
        font-family: 'Poppins', sans-serif;
      }
      * {
        font-family: 'Poppins', sans-serif;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Build profileData from cardData with proper fallbacks
  const profileData = {
    // Personal Info
    prefix: cardData?.prefix || "",
    firstName: cardData?.firstName || "Gungun",
    lastName: cardData?.lastName || "",
    suffix: cardData?.suffix || "",
    name: `${cardData?.prefix || ""} ${cardData?.firstName || "Gungun"} ${cardData?.lastName || ""}`.trim(),
   
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
    gallery: cardData?.gallery || [
      {
        url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        title: "Work Environment",
        type: "image"
      },
      {
        url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
        title: "Team Collaboration",
        type: "image"
      },
      {
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        title: "Project Showcase",
        type: "image"
      }
    ],
    downloads: cardData?.downloads || [],
    interactiveElements: cardData?.interactiveElements || [],

    // NEW FIELDS FROM MODEL
    customFields: cardData?.customFields || [],
    dynamicQRCode: cardData?.dynamicQRCode || null,
    nfcSettings: cardData?.nfcSettings || { isEnabled: false },
    productRangeDisplay: cardData?.productRangeDisplay || 'grid',
    cardType: cardData?.cardType || 'business',
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
      case 'twitter': return "text-white";
      case 'youtube': return "text-red-400";
      case 'linkedin': return "text-blue-400";
      case 'whatsapp': return "text-green-400";
      case 'github': return "text-white";
      case 'telegram': return "text-blue-400";
      case 'tiktok': return "text-white";
      default: return "text-white";
    }
  };

  const formatBusinessHours = (hours) => {
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
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-500'}`}
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

  const totalSlides = Math.ceil(profileData.gallery.length / 3);

  return (
    <div className="bg-gray-100 min-h-screen w-full flex justify-center py-6 overflow-y-auto font-['Poppins']">
     <div
  className="w-[420px] rounded-3xl shadow-xl overflow-hidden bg-cover bg-center bg-no-repeat font-['Poppins']"
  style={{
    backgroundImage: `url("https://wallpapers-max.b-cdn.net/wallpapers/17jul2023/hd/dark-purple-abstract-shapes-wallpaper.jpg")`
  }}
>
 
        {/* Header gradient */}
        <div className="bg-gradient-to-r from-pink-500 to-blue-500 h-45 rounded-b-3xl relative flex justify-center font-['Poppins']">
          <div className="absolute bottom-[-60px] w-[85%] bg-white/40 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col items-center pt-16 pb-5 font-['Poppins'] transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 font-['Poppins']">
              {profileData.profilePhoto ? (
                <img
                  src={profileData.profilePhoto}
                  alt={profileData.name}
                  className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-lg transform transition-transform duration-300 hover:scale-110"
                  onError={(e) => {
                    console.log('Profile photo failed to load:', profileData.profilePhoto);
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              {!profileData.profilePhoto && (
                <div className="w-20 h-20 rounded-full border-4 border-white bg-gradient-to-r from-pink-500 to-blue-500 flex justify-center items-center text-white text-3xl font-bold shadow-lg transform transition-transform duration-300 hover:scale-110 font-['Poppins']">
                  {profileData.name?.charAt(0) || "G"}
                </div>
              )}
            </div>
 
            <h2 className="text-lg font-semibold text-black mt-1 font-['Poppins']">{profileData.name}</h2>
            <p className="text-sm text-gray-800  text-black font-['Poppins']">{profileData.jobTitle}</p>
            <p className="text-xs text-gray-700  text-black mt-1 font-['Poppins']">
              Working time: {formatBusinessHours(profileData.workingHours)}
            </p>
          </div>
        </div>
 
        {/* Company Logo & Name Section - Box style */}
        {(profileData.companyLogo || profileData.companyName) && (
          <div className="mt-20 mb-2 px-10 w-87 h-20 font-['Poppins']">
            <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-2 shadow-2xl border border-white/30 font-['Poppins'] transform transition-transform duration-300 hover:scale-105">
              <div className="flex justify-between items-center font-['Poppins']">
                {profileData.companyLogo && (
                  <div className="flex items-center font-['Poppins']">
                    <img
                      src={profileData.companyLogo}
                      alt="Company Logo"
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        console.log('Company logo failed to load:', profileData.companyLogo);
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                {profileData.companyName && (
                  <div className="flex-1 text-right pl-3 font-['Poppins']">
                    <h3 className="text-md font-semibold text-black font-['Poppins']">{profileData.companyName}</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
 
        {/* Buttons - Smaller and closer together */}
        <div className="flex justify-center space-x-2 px-6 mb-4 font-['Poppins']">
          {primaryPhone && profileData.enableOneTapCall && (
            <button
              onClick={() => handleContact("phone", primaryPhone.number)}
              className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-full shadow-lg hover:scale-105 transition flex-1 justify-center max-w-24 border-0 transform transition-transform duration-300 hover:shadow-xl font-['Poppins']"
            >
              <div className="bg-white/20 p-1.5 rounded-full text-white shadow mr-1 font-['Poppins']">
                <FaPhoneAlt className="w-3 h-3" />
              </div>
              <span className="text-xs font-medium font-['Poppins']">Call</span>
            </button>
          )}
 
          {primaryPhone && profileData.enableWhatsApp && (
            <button
              onClick={() => handleContact("whatsapp", primaryPhone.number)}
              className="flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-2 rounded-full shadow-lg hover:scale-105 transition flex-1 justify-center max-w-24 border-0 transform transition-transform duration-300 hover:shadow-xl font-['Poppins']"
            >
              <div className="bg-white/20 p-1.5 rounded-full text-white shadow mr-1 font-['Poppins']">
                <FaWhatsapp className="w-3 h-3" />
              </div>
              <span className="text-xs font-medium font-['Poppins']">WhatsApp</span>
            </button>
          )}
 
          {profileData.email && profileData.enableEmail && (
            <button
              onClick={() => handleContact("email", profileData.email)}
              className="flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-2 rounded-full shadow-lg hover:scale-105 transition flex-1 justify-center max-w-24 border-0 transform transition-transform duration-300 hover:shadow-xl font-['Poppins']"
            >
              <div className="bg-white/20 p-1.5 rounded-full text-white shadow mr-1 font-['Poppins']">
                <FaEnvelope className="w-3 h-3" />
              </div>
              <span className="text-xs font-medium font-['Poppins']">Email</span>
            </button>
          )}
        </div>
 
        {/* Social Icons */}
        {profileData.socialLinks.filter(link => link.url).length > 0 ? (
          <div className="flex justify-center space-x-4 mt-2 pb-4 font-['Poppins']">
            {profileData.socialLinks.filter(link => link.url).map((social, index) => (
              <div
                key={index}
                onClick={() => handleContact("default", social.url)}
                className={`bg-white/20 backdrop-blur-lg shadow-lg rounded-full p-2 ${getSocialColor(social.platform)} hover:scale-110 transition cursor-pointer border border-white/30 transform transition-transform duration-300 hover:shadow-xl font-['Poppins']`}
              >
                {getSocialIcon(social.platform)}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center space-x-4 mt-2 pb-4 font-['Poppins']">
            <div className="bg-white/20 backdrop-blur-lg shadow-lg rounded-full p-2 text-white hover:scale-110 transition border border-white/30 transform transition-transform duration-300 hover:shadow-xl font-['Poppins']">
              <FaFacebookF />
            </div>
            <div className="bg-white/20 backdrop-blur-lg shadow-lg rounded-full p-2 text-white hover:scale-110 transition border border-white/30 transform transition-transform duration-300 hover:shadow-xl font-['Poppins']">
              <FaMapMarkerAlt />
            </div>
            <div className="bg-white/20 backdrop-blur-lg shadow-lg rounded-full p-2 text-white hover:scale-110 transition border border-white/30 transform transition-transform duration-300 hover:shadow-xl font-['Poppins']">
              <FaInstagram />
            </div>
          </div>
        )}
 
        {/* Title Line / Recognition */}
        {profileData.titleLine && (
          <div className="px-6 pb-4 font-['Poppins']">
            <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-4 border border-white/40 shadow-2xl transform transition-transform duration-300 hover:scale-105 font-['Poppins']">
              <FaCrown className="w-5 h-5 text-yellow-400 mx-auto mb-1 font-['Poppins']" />
              <p className="text-black font-semibold text-sm text-center font-['Poppins']">{profileData.titleLine}</p>
            </div>
          </div>
        )}

        {/* Profile Video Section */}
        {profileData.profileVideo?.url && (
          <div className="px-6 pb-4 font-['Poppins']">
            <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-4 border border-white/40 shadow-2xl transform transition-transform duration-300 hover:scale-105 font-['Poppins']">
              <h3 className="text-lg font-semibold text-black mb-2 flex items-center font-['Poppins']">
                <FaVideo className="w-4 h-4 text-black mr-2" />
                Introduction Video
              </h3>
              <div className="relative rounded-xl overflow-hidden h-48 bg-black/50 font-['Poppins']">
                <video
                  src={profileData.profileVideo.url}
                  className="w-full h-full object-cover"
                  controls
                  poster={profileData.profileVideo.thumbnail}
                />
                {profileData.profileVideo.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 font-['Poppins']">
                    <p className="text-sm font-medium font-['Poppins']">{profileData.profileVideo.title}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
 
        {/* About Section */}
        {profileData.aboutText && (
          <div className="px-6 pb-4 font-['Poppins']">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/50 shadow-2xl transform transition-transform duration-300 hover:scale-105 font-['Poppins']">
              <h3 className="text-lg font-semibold text-black mb-2 flex items-center font-['Poppins']">
                <FaUserFriends className="w-4 h-4 text-black mr-2" />
                About
              </h3>
              <p className="text-black text-sm leading-relaxed font-['Poppins']">{profileData.aboutText}</p>
            </div>
          </div>
        )}

        {/* Founded Name & Organization */}
        {(profileData.foundedName || profileData.organization) && (
          <div className="px-6 pb-4 font-['Poppins']">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/40 shadow-2xl transform transition-transform duration-300 hover:scale-105 font-['Poppins']">
              <h3 className="text-lg font-semibold text-black mb-2 flex items-center font-['Poppins']">
                <FaBuilding className="w-4 h-4 text-black mr-2" />
                Organization Details
              </h3>
              {profileData.foundedName && (
                <p className="text-black text-sm mb-2 font-['Poppins']">
                  <span className="font-medium font-['Poppins']">Founded Name:</span> {profileData.foundedName}
                </p>
              )}
              {profileData.organization && (
                <p className="text-black text-sm font-['Poppins']">
                  <span className="font-medium font-['Poppins']">Organization:</span> {profileData.organization}
                </p>
              )}
            </div>
          </div>
        )}
 
        {/* Gallery with original format (1 top + 2 bottom) */}
        {profileData.gallery.length > 0 && (
          <div className="px-4 pb-4 font-['Poppins']">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/40 shadow-2xl transform transition-transform duration-300 hover:scale-105 font-['Poppins']">
              {/* Gallery Heading */}
              <h3 className="text-lg font-semibold text-black mb-3 text-center font-['Poppins']">
                Gallery
              </h3>
             
              {/* Original Gallery Format: 1 image top + 2 images bottom */}
              <div className="space-y-2 font-['Poppins']">
                {/* Top Image */}
                {getCurrentSlideImages()[0] && (
                  <div className="relative rounded-xl overflow-hidden h-40 font-['Poppins'] transform transition-transform duration-300 hover:scale-105">
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
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 font-['Poppins']">
                        <p className="text-sm font-medium font-['Poppins']">{getCurrentSlideImages()[0].title}</p>
                      </div>
                    )}
                  </div>
                )}
               
                {/* Bottom 2 Images */}
                <div className="grid grid-cols-2 gap-2 font-['Poppins']">
                  {getCurrentSlideImages().slice(1, 3).map((item, index) => (
                    <div key={index} className="relative rounded-xl overflow-hidden h-32 font-['Poppins'] transform transition-transform duration-300 hover:scale-105">
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
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 font-['Poppins']">
                          <p className="text-xs font-medium font-['Poppins']">{item.title}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
 
              {/* Navigation Arrows - Only show if more than 3 images */}
              {profileData.gallery.length > 3 && (
                <div className="flex justify-center items-center space-x-4 mt-3 font-['Poppins']">
                  <button
                    onClick={prevSlide}
                    className="bg-white/30 backdrop-blur-lg hover:bg-white/40 text-black rounded-full p-2 shadow-lg transition-all border border-white/40 transform transition-transform duration-300 hover:scale-110 font-['Poppins']"
                  >
                    <FaChevronLeft className="w-3 h-3" />
                  </button>
                 
                  {/* Slide Indicators */}
                  <div className="flex space-x-1 font-['Poppins']">
                    {Array.from({ length: totalSlides }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-1.5 h-1.5 rounded-full transition-all transform transition-transform duration-300 hover:scale-110 ${
                          index === currentSlide ? 'bg-black' : 'bg-black/50'
                        }`}
                      />
                    ))}
                  </div>
 
                  <button
                    onClick={nextSlide}
                    className="bg-white/30 backdrop-blur-lg hover:bg-white/40 text-black rounded-full p-2 shadow-lg transition-all border border-white/40 transform transition-transform duration-300 hover:scale-110 font-['Poppins']"
                  >
                    <FaChevronRight className="w-3 h-3" />
                  </button>
                </div>
              )}
 
              {/* Image Counter */}
              {profileData.gallery.length > 3 && (
                <div className="text-center mt-2 font-['Poppins']">
                  <span className="text-xs text-black/80 font-['Poppins']">
                    {currentSlide + 1} / {totalSlides}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
 
        {/* Bio Section */}
        {profileData.bio && (
          <div className="px-6 pb-4 font-['Poppins']">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/50 shadow-2xl transform transition-transform duration-300 hover:scale-105 font-['Poppins']">
              <h3 className="text-lg font-semibold text-black mb-2 flex items-center font-['Poppins']">
                <FaBriefcase className="w-4 h-4 text-black mr-2" />
                Professional Bio
              </h3>
              <p className="text-black text-sm leading-relaxed font-['Poppins']">{profileData.bio}</p>
            </div>
          </div>
        )}
 
        {/* Services & Products Overview */}
        {profileData.servicesProducts && (
          <div className="px-6 pb-4 font-['Poppins']">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/50 shadow-2xl transform transition-transform duration-300 hover:scale-105 font-['Poppins']">
              <h3 className="text-lg font-semibold text-black mb-2 flex items-center font-['Poppins']">
                <FaStore className="w-4 h-4 text-black mr-2" />
                Services & Products
              </h3>
              <p className="text-black text-sm leading-relaxed font-['Poppins']">{profileData.servicesProducts}</p>
            </div>
          </div>
        )}

        {/* Brand Label */}
        {profileData.brandLabel && (
          <div className="px-6 pb-4 font-['Poppins']">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/40 shadow-2xl transform transition-transform duration-300 hover:scale-105 font-['Poppins']">
              <h3 className="text-lg font-semibold text-black mb-2 flex items-center font-['Poppins']">
                <FaGem className="w-4 h-4 text-black mr-2" />
                Brand Label
              </h3>
              <p className="text-black text-sm leading-relaxed font-['Poppins']">{profileData.brandLabel}</p>
            </div>
          </div>
        )}

        {/* Catalog */}
        {profileData.catalog && (
          <div className="px-6 pb-4 font-['Poppins']">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/40 shadow-2xl transform transition-transform duration-300 hover:scale-105 font-['Poppins']">
              <h3 className="text-lg font-semibold text-black mb-2 flex items-center font-['Poppins']">
                <FaBook className="w-4 h-4 text-black mr-2" />
                Catalog
              </h3>
              <p className="text-black text-sm leading-relaxed font-['Poppins']">{profileData.catalog}</p>
            </div>
          </div>
        )}
 
        {/* Services */}
        {profileData.services.length > 0 && (
          <div className="px-6 pb-4 font-['Poppins']">
            <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-4 border border-white/40 shadow-2xl transform transition-transform duration-300 hover:scale-105 font-['Poppins']">
              <h3 className="text-lg font-semibold text-black mb-3 flex items-center font-['Poppins']">
                <FaShoppingCart className="w-4 h-4 text-black mr-2" />
                Services
              </h3>
              <div className="space-y-3 font-['Poppins']">
                {profileData.services.slice(0, 5).map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/20 rounded-lg shadow-lg border border-white/30 font-['Poppins'] transform transition-transform duration-300 hover:scale-105">
                    <div className="flex items-center space-x-3 font-['Poppins']">
                      {service.image && (
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-8 h-8 rounded-lg object-cover"
                          onError={(e) => {
                            console.log('Service image failed to load:', service.image);
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                      <div>
                        <span className="text-black text-sm font-medium block font-['Poppins']">{service.name}</span>
                        {service.description && (
                          <span className="text-black/80 text-xs block font-['Poppins']">{service.description}</span>
                        )}
                        {service.duration && (
                          <span className="text-black/60 text-xs block font-['Poppins']">{service.duration}</span>
                        )}
                      </div>
                    </div>
                    {service.price && (
                      <span className="text-black text-sm font-bold whitespace-nowrap font-['Poppins']">
                        {service.price} {service.currency}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
 
        {/* Products */}
        {profileData.products.length > 0 && (
          <div className="px-6 pb-4 font-['Poppins']">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/40 shadow-2xl transform transition-transform duration-300 hover:scale-105 font-['Poppins']">
              <h3 className="text-lg font-semibold text-black mb-3 flex items-center font-['Poppins']">
                <FaGem className="w-4 h-4 text-black mr-2" />
                Products
              </h3>
              <div className="space-y-3 font-['Poppins']">
                {profileData.products.slice(0, 5).map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/20 rounded-lg shadow-lg border border-white/30 font-['Poppins'] transform transition-transform duration-300 hover:scale-105">
                    <div className="flex items-center space-x-3 font-['Poppins']">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-8 h-8 rounded-lg object-cover"
                          onError={(e) => {
                            console.log('Product image failed to load:', product.image);
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                      <div>
                        <span className="text-black text-sm font-medium block font-['Poppins']">{product.name}</span>
                        {product.description && (
                          <span className="text-black/80 text-xs block font-['Poppins']">{product.description}</span>
                        )}
                        {!product.inStock && (
                          <span className="text-red-600 text-xs font-medium font-['Poppins']">Out of Stock</span>
                        )}
                      </div>
                    </div>
                    {product.price && (
                      <span className="text-black text-sm font-bold whitespace-nowrap font-['Poppins']">
                        {product.price} {product.currency}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Testimonials */}
        {profileData.testimonials.length > 0 && (
          <div className="px-6 pb-4 font-['Poppins']">
            <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-4 border border-white/40 shadow-2xl transform transition-transform duration-300 hover:scale-105 font-['Poppins']">
              <h3 className="text-lg font-semibold text-black mb-3 flex items-center font-['Poppins']">
                <FaStar className="w-4 h-4 text-black mr-2" />
                Testimonials
              </h3>
              <div className="space-y-4 font-['Poppins']">
                {profileData.testimonials.slice(0, 3).map((testimonial, index) => (
                  <div key={index} className="bg-white/20 rounded-lg p-4 shadow-lg border border-white/30 font-['Poppins'] transform transition-transform duration-300 hover:scale-105">
                    <div className="flex items-center justify-between mb-2 font-['Poppins']">
                      <span className="font-semibold text-black text-sm font-['Poppins']">{testimonial.clientName}</span>
                      {testimonial.rating && (
                        <div className="flex space-x-1 font-['Poppins']">
                          {renderStars(testimonial.rating)}
                        </div>
                      )}
                    </div>
                    <p className="text-black/90 text-sm italic font-['Poppins']">"{testimonial.testimonial}"</p>
                    {testimonial.company && (
                      <p className="text-black/70 text-xs mt-2 font-['Poppins']">{testimonial.company}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Client List */}
        {profileData.clientList.length > 0 && (
          <div className="px-6 pb-4 font-['Poppins']">
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-4 border border-white/40 shadow-2xl transform transition-transform duration-300 hover:scale-105 font-['Poppins']">
              <h3 className="text-lg font-semibold text-black mb-3 flex items-center font-['Poppins']">
                <FaUserFriends className="w-4 h-4 text-black mr-2" />
                Our Clients
              </h3>
              <div className="flex flex-wrap gap-2 font-['Poppins']">
                {profileData.clientList.slice(0, 8).map((client, index) => (
                  <span key={index} className="bg-white/30 text-black px-3 py-1 rounded-full text-xs border border-white/40 font-['Poppins'] transform transition-transform duration-300 hover:scale-110">
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Downloads */}
        {profileData.downloads.length > 0 && (
          <div className="px-6 pb-4 font-['Poppins']">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/40 shadow-2xl transform transition-transform duration-300 hover:scale-105 font-['Poppins']">
              <h3 className="text-lg font-semibold text-black mb-3 flex items-center font-['Poppins']">
                <FaDownload className="w-4 h-4 text-black mr-2" />
                Downloads
              </h3>
              <div className="space-y-2 font-['Poppins']">
                {profileData.downloads.map((download, index) => (
                  <div 
                    key={index}
                    onClick={() => handleContact("default", download.fileUrl)}
                    className="flex items-center justify-between p-3 bg-white/20 rounded-lg shadow-lg border border-white/30 hover:bg-white/30 cursor-pointer transition-colors font-['Poppins'] transform transition-transform duration-300 hover:scale-105"
                  >
                    <div className="flex items-center space-x-3 font-['Poppins']">
                      <FaFilePdf className="w-4 h-4 text-black" />
                      <div>
                        <span className="text-black text-sm font-medium block font-['Poppins']">{download.name}</span>
                        {download.fileSize && (
                          <span className="text-black/80 text-xs font-['Poppins']">{download.fileSize}</span>
                        )}
                      </div>
                    </div>
                    <FaDownload className="w-4 h-4 text-black/70" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Interactive Elements */}
        {profileData.interactiveElements.length > 0 && (
          <div className="px-6 pb-4 font-['Poppins']">
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-4 border border-white/40 shadow-2xl transform transition-transform duration-300 hover:scale-105 font-['Poppins']">
              <h3 className="text-lg font-semibold text-black mb-3 flex items-center font-['Poppins']">
                <FaHeadset className="w-4 h-4 text-black mr-2" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3 font-['Poppins']">
                {profileData.interactiveElements
                  .filter(element => element.isActive)
                  .map((element, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        // Handle interactive element action based on type
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
                            // Handle other interactive elements
                            break;
                        }
                      }}
                      className="flex flex-col items-center justify-center p-3 bg-white/20 rounded-xl shadow-lg border border-white/30 hover:bg-white/30 transition-colors font-['Poppins'] transform transition-transform duration-300 hover:scale-105"
                    >
                      <div className="text-black mb-1 font-['Poppins']">
                        {getInteractiveElementIcon(element.type)}
                      </div>
                      <span className="text-xs text-black font-medium text-center font-['Poppins']">
                        {element.type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* QR Code */}
        {profileData.dynamicQRCode?.targetUrl && (
          <div className="px-6 pb-4 font-['Poppins']">
            <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-4 border border-white/40 shadow-2xl transform transition-transform duration-300 hover:scale-105 font-['Poppins']">
              <h3 className="text-lg font-semibold text-black mb-3 flex items-center font-['Poppins']">
                <FaQrcode className="w-4 h-4 text-black mr-2" />
                QR Code
              </h3>
              <div className="flex justify-center font-['Poppins']">
                <div className="bg-white p-4 rounded-lg shadow-lg font-['Poppins'] transform transition-transform duration-300 hover:scale-105">
                  {profileData.dynamicQRCode.qrImage ? (
                    <img 
                      src={profileData.dynamicQRCode.qrImage} 
                      alt="QR Code" 
                      className="w-32 h-32"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-gray-400 font-['Poppins']">
                      QR Code
                    </div>
                  )}
                </div>
              </div>
              <p className="text-center text-xs text-black/80 mt-2 font-['Poppins']">
                Scan to save contact
              </p>
            </div>
          </div>
        )}

        {/* NFC Badge */}
        {profileData.nfcSettings?.isEnabled && (
          <div className="px-6 pb-4 font-['Poppins']">
            <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-4 border border-white/40 shadow-2xl transform transition-transform duration-300 hover:scale-105 font-['Poppins']">
              <h3 className="text-lg font-semibold text-black mb-3 flex items-center font-['Poppins']">
                <FaShieldAlt className="w-4 h-4 text-black mr-2" />
                NFC Enabled
              </h3>
              <div className="flex items-center justify-center space-x-2 text-black font-['Poppins']">
                <FaIdCard className="w-5 h-5" />
                <span className="text-sm font-medium font-['Poppins']">Tap to Connect</span>
              </div>
            </div>
          </div>
        )}

        {/* Custom Fields */}
        {profileData.customFields.length > 0 && (
          <div className="px-6 pb-4 font-['Poppins']">
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-4 border border-white/40 shadow-2xl transform transition-transform duration-300 hover:scale-105 font-['Poppins']">
              <h3 className="text-lg font-semibold text-black mb-3 text-center font-['Poppins']">
                Additional Information
              </h3>
              <div className="space-y-2 font-['Poppins']">
                {profileData.customFields.map((field, index) => (
                  <div key={index} className="flex justify-between p-2 bg-white/20 rounded-lg font-['Poppins'] transform transition-transform duration-300 hover:scale-105">
                    <span className="text-black text-sm font-medium font-['Poppins']">{field.label}:</span>
                    <span className="text-black text-sm font-['Poppins']">{field.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
 
        {/* Contact Information - MOVED TO LAST */}
        {(profileData.email || profileData.phones.length > 0 || profileData.websites.length > 0) && (
          <div className="px-6 pb-4 font-['Poppins']">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/40 shadow-2xl transform transition-transform duration-300 hover:scale-105 font-['Poppins']">
              <h3 className="text-lg font-semibold text-black mb-3 text-center font-['Poppins']">Contact Info</h3>
 
              {profileData.email && profileData.enableEmail && (
                <div
                  onClick={() => handleContact("email", profileData.email)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-white/20 cursor-pointer transition-colors mb-2 font-['Poppins'] transform transition-transform duration-300 hover:scale-105"
                >
                  <div className="flex items-center font-['Poppins']">
                    <div className="w-7 h-7 bg-white/30 rounded-full flex items-center justify-center mr-3 font-['Poppins']">
                      <FaEnvelope className="w-3 h-3 text-black" />
                    </div>
                    <span className="text-black text-sm font-['Poppins']">Email</span>
                  </div>
                  <span className="text-black text-sm font-medium truncate ml-2 font-['Poppins']">{profileData.email}</span>
                </div>
              )}
 
              {profileData.phones.map((phone, index) => (
                <div
                  key={index}
                  onClick={() => handleContact("phone", phone.number)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-white/20 cursor-pointer transition-colors mb-2 font-['Poppins'] transform transition-transform duration-300 hover:scale-105"
                >
                  <div className="flex items-center font-['Poppins']">
                    <div className="w-7 h-7 bg-white/30 rounded-full flex items-center justify-center mr-3 font-['Poppins']">
                      <FaPhoneAlt className="w-3 h-3 text-black" />
                    </div>
                    <span className="text-black text-sm font-['Poppins']">
                      {phone.label || 'Phone'} {phone.isPrimary && '(Primary)'}
                    </span>
                  </div>
                  <span className="text-black text-sm font-medium font-['Poppins']">{phone.number}</span>
                </div>
              ))}
 
              {profileData.websites.map((website, index) => (
                <div
                  key={index}
                  onClick={() => handleContact("website", website.url)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-white/20 cursor-pointer transition-colors mb-2 font-['Poppins'] transform transition-transform duration-300 hover:scale-105"
                >
                  <div className="flex items-center font-['Poppins']">
                    <div className="w-7 h-7 bg-white/30 rounded-full flex items-center justify-center mr-3 font-['Poppins']">
                      <FaGlobe className="w-3 h-3 text-black" />
                    </div>
                    <span className="text-black text-sm font-['Poppins']">
                      {website.label || 'Website'}
                    </span>
                  </div>
                  <span className="text-black text-sm font-medium truncate ml-2 max-w-32 font-['Poppins']">
                    {website.url.replace(/^https?:\/\//, '')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
 
        {/* Address Information - MOVED TO LAST */}
        {profileData.addresses.length > 0 && (
          <div className="px-6 pb-6 font-['Poppins']">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/40 shadow-2xl transform transition-transform duration-300 hover:scale-105 font-['Poppins']">
              <h3 className="text-lg font-semibold text-black mb-3 text-center flex items-center justify-center font-['Poppins']">
                <FaMapMarkerAlt className="w-4 h-4 text-black mr-2" />
                Location
              </h3>
              {profileData.addresses.map((address, index) => (
                <div
                  key={index}
                  onClick={() => handleContact("map", address.googleMapsLink)}
                  className="flex items-start justify-between p-2 rounded-lg hover:bg-white/20 cursor-pointer transition-colors mb-2 font-['Poppins'] transform transition-transform duration-300 hover:scale-105"
                >
                  <div className="flex items-start font-['Poppins']">
                    <div className="w-7 h-7 bg-white/30 rounded-full flex items-center justify-center mr-3 mt-1 font-['Poppins']">
                      <FaMapMarkerAlt className="w-3 h-3 text-black" />
                    </div>
                    <div>
                      <span className="text-black text-sm font-medium block font-['Poppins']">
                        {address.label || 'Address'} {address.isPrimary && '(Primary)'}
                      </span>
                      <span className="text-black/80 text-xs block mt-1 font-['Poppins']">
                        {address.fullAddress || `${address.street}, ${address.city}, ${address.state} ${address.postalCode}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default DarkCard;