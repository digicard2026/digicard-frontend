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
  FaChevronRight
} from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";

const DarkCard = ({ cardData = {} }) => {
  console.log('🎯 DarkCard received data:', cardData);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🔹 Inject global scroll CSS
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      html, body {
        height: 100%;
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch;
        background-color: #f3f4f6;
      }
      #root {
        min-height: 100%;
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
      default: return <FaGlobe />;
    }
  };

  const getSocialColor = (platform) => {
    switch (platform) {
      case 'facebook': return "text-blue-500";
      case 'instagram': return "text-pink-500";
      case 'twitter': return "text-black";
      case 'youtube': return "text-red-500";
      case 'linkedin': return "text-blue-600";
      case 'whatsapp': return "text-green-500";
      case 'github': return "text-gray-800";
      case 'telegram': return "text-blue-400";
      default: return "text-gray-500";
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
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
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
    <div className="bg-gray-100 min-h-screen w-full flex justify-center py-6 overflow-y-auto">
      <div className="bg-white w-[340px] rounded-3xl shadow-xl overflow-hidden">
        {/* Header gradient */}
        <div className="bg-gradient-to-r from-pink-500 to-blue-500 h-45 rounded-b-3xl relative flex justify-center">
          <div className="absolute bottom-[-60px] w-[85%] bg-white/50 backdrop-blur-lg rounded-2xl shadow-lg flex flex-col items-center pt-16 pb-5"> {/* Increased pt-14 to pt-16 and bottom-[-50px] to bottom-[-60px] */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2"> {/* Increased -top-12 to -top-14 */}
              {profileData.profilePhoto ? (
                <img
                  src={profileData.profilePhoto}
                  alt={profileData.name}
                  className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-md"
                  onError={(e) => {
                    console.log('Profile photo failed to load:', profileData.profilePhoto);
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              {!profileData.profilePhoto && (
                <div className="w-20 h-20 rounded-full border-4 border-white bg-gradient-to-r from-pink-500 to-blue-500 flex justify-center items-center text-white text-3xl font-bold shadow-md">
                  {profileData.name?.charAt(0) || "G"}
                </div>
              )}
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mt-1">{profileData.name}</h2>
            <p className="text-sm text-gray-600">{profileData.jobTitle}</p>
            <p className="text-xs text-gray-500 mt-1">
              Working time: {formatBusinessHours(profileData.workingHours)}
            </p>
          </div>
        </div>

        {/* Company Logo & Name Section - Box style */}
        {(profileData.companyLogo || profileData.companyName) && (
          <div className="mt-20 mb-2 px-10 w-87 h-20"> {/* Increased mt-20 to mt-24 */}
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
              <div className="flex justify-between items-center">
                {profileData.companyLogo && (
                  <div className="flex items-center">
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
                  <div className="flex-1 text-right pl-3">
                    <h3 className="text-md font-semibold text-gray-800">{profileData.companyName}</h3>
                    {/* {profileData.department && (
                      <p className="text-xs text-gray-600 mt-1">{profileData.department}</p>
                    )} */}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Buttons - Smaller and closer together */}
        <div className="flex justify-center space-x-2 px-6 mb-4">
          {primaryPhone && profileData.enableOneTapCall && (
            <button
              onClick={() => handleContact("phone", primaryPhone.number)}
              className="flex items-center bg-gradient-to-r from-purple-100 to-purple-200 text-gray-700 px-3 py-2 rounded-full shadow-md hover:scale-105 transition flex-1 justify-center max-w-24"
            >
              <div className="bg-white p-1.5 rounded-full text-purple-600 shadow mr-1">
                <FaPhoneAlt className="w-3 h-3" />
              </div>
              <span className="text-xs font-medium">Call</span>
            </button>
          )}

          {primaryPhone && profileData.enableWhatsApp && (
            <button
              onClick={() => handleContact("whatsapp", primaryPhone.number)}
              className="flex items-center bg-green-100 text-gray-700 px-3 py-2 rounded-full shadow-md hover:scale-105 transition flex-1 justify-center max-w-24"
            >
              <div className="bg-white p-1.5 rounded-full text-green-600 shadow mr-1">
                <FaWhatsapp className="w-3 h-3" />
              </div>
              <span className="text-xs font-medium">WhatsApp</span>
            </button>
          )}

          {profileData.email && profileData.enableEmail && (
            <button
              onClick={() => handleContact("email", profileData.email)}
              className="flex items-center bg-blue-100 text-gray-700 px-3 py-2 rounded-full shadow-md hover:scale-105 transition flex-1 justify-center max-w-24"
            >
              <div className="bg-white p-1.5 rounded-full text-blue-600 shadow mr-1">
                <FaEnvelope className="w-3 h-3" />
              </div>
              <span className="text-xs font-medium">Email</span>
            </button>
          )}
        </div>

        {/* Social Icons */}
        {profileData.socialLinks.filter(link => link.url).length > 0 ? (
          <div className="flex justify-center space-x-4 mt-2 pb-4">
            {profileData.socialLinks.filter(link => link.url).map((social, index) => (
              <div
                key={index}
                onClick={() => handleContact("default", social.url)}
                className={`bg-white shadow-md rounded-full p-2 ${getSocialColor(social.platform)} hover:scale-110 transition cursor-pointer`}
              >
                {getSocialIcon(social.platform)}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center space-x-4 mt-2 pb-4">
            <div className="bg-white shadow-md rounded-full p-2 text-blue-500 hover:scale-110 transition">
              <FaFacebookF />
            </div>
            <div className="bg-white shadow-md rounded-full p-2 text-red-500 hover:scale-110 transition">
              <FaMapMarkerAlt />
            </div>
            <div className="bg-white shadow-md rounded-full p-2 text-pink-500 hover:scale-110 transition">
              <FaInstagram />
            </div>
          </div>
        )}

        {/* Title Line / Recognition */}
        {profileData.titleLine && (
          <div className="px-6 pb-4">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-100 text-center">
              <FaCrown className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
              <p className="text-gray-800 font-semibold text-sm">{profileData.titleLine}</p>
            </div>
          </div>
        )}

        {/* About Section */}
        {profileData.aboutText && (
          <div className="px-6 pb-4">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4 border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                <FaUserFriends className="w-4 h-4 text-purple-600 mr-2" />
                About
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{profileData.aboutText}</p>
            </div>
          </div>
        )}

        {/* Gallery with original format (1 top + 2 bottom) */}
        {profileData.gallery.length > 0 && (
          <div className="px-4 pb-4">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100">
              {/* Gallery Heading */}
              <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                Gallery
              </h3>
              
              {/* Original Gallery Format: 1 image top + 2 images bottom */}
              <div className="space-y-2">
                {/* Top Image */}
                {getCurrentSlideImages()[0] && (
                  <div className="relative rounded-xl overflow-hidden h-40">
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
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                        <p className="text-sm font-medium">{getCurrentSlideImages()[0].title}</p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Bottom 2 Images */}
                <div className="grid grid-cols-2 gap-2">
                  {getCurrentSlideImages().slice(1, 3).map((item, index) => (
                    <div key={index} className="relative rounded-xl overflow-hidden h-32">
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
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                          <p className="text-xs font-medium">{item.title}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows - Only show if more than 3 images */}
              {profileData.gallery.length > 3 && (
                <div className="flex justify-center items-center space-x-4 mt-3">
                  <button
                    onClick={prevSlide}
                    className="bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
                  >
                    <FaChevronLeft className="w-3 h-3" />
                  </button>
                  
                  {/* Slide Indicators */}
                  <div className="flex space-x-1">
                    {Array.from({ length: totalSlides }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          index === currentSlide ? 'bg-indigo-600' : 'bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextSlide}
                    className="bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
                  >
                    <FaChevronRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Image Counter */}
              {profileData.gallery.length > 3 && (
                <div className="text-center mt-2">
                  <span className="text-xs text-gray-500">
                    {currentSlide + 1} / {totalSlides}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Rest of the sections remain the same */}
        {/* Bio Section */}
        {profileData.bio && (
          <div className="px-6 pb-4">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                <FaBriefcase className="w-4 h-4 text-blue-600 mr-2" />
                Professional Bio
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{profileData.bio}</p>
            </div>
          </div>
        )}

        {/* Services & Products Overview */}
        {profileData.servicesProducts && (
          <div className="px-6 pb-4">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                <FaStore className="w-4 h-4 text-orange-600 mr-2" />
                Services & Products
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{profileData.servicesProducts}</p>
            </div>
          </div>
        )}

        {/* Services */}
        {profileData.services.length > 0 && (
          <div className="px-6 pb-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <FaShoppingCart className="w-4 h-4 text-green-600 mr-2" />
                Services
              </h3>
              <div className="space-y-3">
                {profileData.services.slice(0, 5).map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-green-100">
                    <div className="flex items-center space-x-3">
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
                        <span className="text-gray-700 text-sm font-medium block">{service.name}</span>
                        {service.description && (
                          <span className="text-gray-500 text-xs block">{service.description}</span>
                        )}
                      </div>
                    </div>
                    {service.price && (
                      <span className="text-green-600 text-sm font-bold whitespace-nowrap">
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
          <div className="px-6 pb-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <FaGem className="w-4 h-4 text-blue-600 mr-2" />
                Products
              </h3>
              <div className="space-y-3">
                {profileData.products.slice(0, 5).map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-blue-100">
                    <div className="flex items-center space-x-3">
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
                        <span className="text-gray-700 text-sm font-medium block">{product.name}</span>
                        {product.description && (
                          <span className="text-gray-500 text-xs block">{product.description}</span>
                        )}
                        {!product.inStock && (
                          <span className="text-red-500 text-xs font-medium">Out of Stock</span>
                        )}
                      </div>
                    </div>
                    {product.price && (
                      <span className="text-blue-600 text-sm font-bold whitespace-nowrap">
                        {product.price} {product.currency}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Information - MOVED TO LAST */}
        {(profileData.email || profileData.phones.length > 0 || profileData.websites.length > 0) && (
          <div className="px-6 pb-4">
            <div className="bg-gray-50 rounded-2xl p-4 shadow-inner">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">Contact Info</h3>

              {profileData.email && profileData.enableEmail && (
                <div
                  onClick={() => handleContact("email", profileData.email)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-white cursor-pointer transition-colors mb-2"
                >
                  <div className="flex items-center">
                    <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <FaEnvelope className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-gray-700 text-sm">Email</span>
                  </div>
                  <span className="text-gray-900 text-sm font-medium truncate ml-2">{profileData.email}</span>
                </div>
              )}

              {profileData.phones.map((phone, index) => (
                <div
                  key={index}
                  onClick={() => handleContact("phone", phone.number)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-white cursor-pointer transition-colors mb-2"
                >
                  <div className="flex items-center">
                    <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <FaPhoneAlt className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-gray-700 text-sm">
                      {phone.label || 'Phone'} {phone.isPrimary && '(Primary)'}
                    </span>
                  </div>
                  <span className="text-gray-900 text-sm font-medium">{phone.number}</span>
                </div>
              ))}

              {profileData.websites.map((website, index) => (
                <div
                  key={index}
                  onClick={() => handleContact("website", website.url)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-white cursor-pointer transition-colors mb-2"
                >
                  <div className="flex items-center">
                    <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <FaGlobe className="w-3 h-3 text-purple-600" />
                    </div>
                    <span className="text-gray-700 text-sm">
                      {website.label || 'Website'}
                    </span>
                  </div>
                  <span className="text-gray-900 text-sm font-medium truncate ml-2 max-w-32">
                    {website.url.replace(/^https?:\/\//, '')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Address Information - MOVED TO LAST */}
        {profileData.addresses.length > 0 && (
          <div className="px-6 pb-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center flex items-center justify-center">
                <FaMapMarkerAlt className="w-4 h-4 text-green-600 mr-2" />
                Location
              </h3>
              {profileData.addresses.map((address, index) => (
                <div
                  key={index}
                  onClick={() => handleContact("map", address.googleMapsLink)}
                  className="flex items-start justify-between p-2 rounded-lg hover:bg-white cursor-pointer transition-colors mb-2"
                >
                  <div className="flex items-start">
                    <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <FaMapMarkerAlt className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <span className="text-gray-700 text-sm font-medium block">
                        {address.label || 'Address'} {address.isPrimary && '(Primary)'}
                      </span>
                      <span className="text-gray-600 text-xs block mt-1">
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

export default DarkCard
