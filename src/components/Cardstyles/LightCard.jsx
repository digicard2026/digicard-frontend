// import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

// const LightCard = ({ cardData }) => {
//   return (
//     <div className="relative w-[400px] h-[600px] p-6 rounded-3xl text-center shadow-xl bg-gradient-to-br from-white to-blue-100 border border-slate-200 overflow-hidden">
      
     
//       <div className="absolute top-0 left-0 w-full h-36 overflow-hidden bg-gradient-to-r from-blue-400 to-blue-600 rounded-b-[50px] flex justify-center items-center">
        
        
//         <div className="absolute w-full h-full bg-opacity-10 bg-[url('https://www.transparenttextures.com/patterns/shine-dotted.png')]"></div>
//       </div>

      
//       {cardData.image && (
//         <div className="relative mt-14 bg-white bg-opacity-70 backdrop-blur-md shadow-lg p-2 rounded-full border-4 border-blue-300 inline-block">
//           <img
//             src={cardData.image}
//             alt="Profile"
//             className="w-24 h-24 mx-auto rounded-full object-cover"
//           />
//         </div>
//       )}

     
//       <div className="mt-6 p-4 bg-white bg-opacity-80 backdrop-blur-md shadow-md rounded-xl border border-slate-300">
//         <h3 className="text-2xl font-bold text-slate-800">{cardData.name}</h3>
//         <p className="text-lg text-slate-600">{cardData.jobTitle}</p>
//         <p className="text-sm text-slate-500">{cardData.company}</p>
//       </div>

      
//       <div className="mt-4 p-4 bg-gradient-to-r from-blue-200 to-white rounded-lg border-l-4 border-blue-400 shadow-md">
//         <p className="text-sm text-slate-700">{cardData.email}</p>
//         <p className="text-sm text-slate-700">{cardData.phone}</p>
//       </div>

      
//       <div className="absolute bottom-18 left-1/2 z-10 transform -translate-x-1/2 w-4/5 p-2 bg-white bg-opacity-75 backdrop-blur-md rounded-full shadow-md flex justify-center gap-6 text-slate-600 border border-slate-300">
//         <a href="#" className="hover:text-blue-500 text-2xl"><FaLinkedin /></a>
//         <a href="#" className="hover:text-blue-400 text-2xl"><FaTwitter /></a>
//         <a href="#" className="hover:text-pink-500 text-2xl"><FaInstagram /></a>
//       </div>

      
//       <div className="absolute bottom-0 left-0 w-full overflow-hidden h-24 bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-[50px]">
//       <div className="absolute w-full h-full  bg-opacity-10 bg-[url('https://www.transparenttextures.com/patterns/shine-dotted.png')]"></div>
//       </div>
//     </div>
//   );
// };

// export default LightCard;
import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  FaGlobe,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight,
  FaRocket,
  FaGem,
  FaCrown,
  FaAward,
  FaChevronLeft,
  FaChevronRight,
  FaBuilding
} from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";

// Custom Next Arrow Component
const NextArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#05487C] shadow-lg border border-gray-300 hover:bg-white hover:text-[#033057] transition-all duration-300 z-20 hover:scale-110"
    >
      <FaChevronRight className="w-4 h-4" />
    </button>
  );
};

// Custom Previous Arrow Component
const PrevArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#05487C] shadow-lg border border-gray-300 hover:bg-white hover:text-[#033057] transition-all duration-300 z-20 hover:scale-110"
    >
      <FaChevronLeft className="w-4 h-4" />
    </button>
  );
};

// Simple Map Component using Google Maps iframe (no dependencies required)
const LocationMap = ({ addresses = [] }) => {
  const mapRef = useRef(null);

  // Format address from individual fields
  const formatAddress = (address) => {
    const parts = [
      address.street,
      address.city,
      address.state,
      address.postalCode,
      address.country
    ].filter(part => part && part.trim() !== "");
    
    return parts.join(', ');
  };

  useEffect(() => {
    if (!addresses.length || !mapRef.current) return;

    const primaryAddress = addresses.find(addr => addr.isPrimary) || addresses[0];
    const addressString = formatAddress(primaryAddress);
    
    if (addressString) {
      // Create Google Maps embed URL
      const encodedAddress = encodeURIComponent(addressString);
      const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&z=15&output=embed&t=m`;
      
      mapRef.current.innerHTML = `
        <div class="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl overflow-hidden border border-blue-200 shadow-lg">
          <!-- Map Header -->
          <div class="bg-gradient-to-r from-blue-600 to-cyan-600 border-b border-blue-500/50 p-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="text-white font-bold text-sm">Google Maps</span>
              </div>
              <div class="text-white/80 text-xs">google.com</div>
            </div>
          </div>
          
          <!-- Map Container -->
          <div class="relative h-48 bg-blue-100">
            <iframe 
              src="${mapUrl}"
              width="100%" 
              height="100%" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
              class="rounded-b-2xl"
            ></iframe>
            <div class="absolute inset-0 pointer-events-none border border-blue-200 rounded-b-2xl"></div>
          </div>
          
          <!-- Address & Action Section -->
          <div class="p-4 border-t border-blue-200">
            <div class="mb-3">
              <div class="text-blue-600 text-xs font-medium mb-1">ADDRESS</div>
              <div class="text-gray-800 text-sm font-semibold leading-tight">${addressString}</div>
            </div>
            
            <!-- Action Button -->
            <a 
              href="${primaryAddress.googleMapsLink || `https://maps.google.com/?q=${encodedAddress}`}"
              target="_blank" 
              rel="noopener noreferrer"
              class="block w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-center py-3 rounded-xl font-bold transition-all duration-300 border border-blue-400 shadow-lg transform hover:scale-105"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      `;
    }
  }, [addresses]);

  return (
    <div 
      ref={mapRef}
      className="w-full rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 overflow-hidden shadow-lg"
    >
      {/* Fallback content */}
      <div className="w-full flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaMapMarkerAlt className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-800 font-bold text-lg mb-2">Location Preview</p>
          <p className="text-gray-600 text-sm">Interactive map will appear here</p>
        </div>
      </div>
    </div>
  );
};

const LightCard = ({ cardData = {} }) => {
  console.log('🎯 LightCard received data:', cardData);

  const servicesSliderRef = useRef(null);
  const productsSliderRef = useRef(null);

  // Dynamic data from cardData
  const profileData = {
    name: `${cardData?.prefix || ""} ${cardData?.firstName || ""} ${cardData?.lastName || ""}`.trim(),
    jobTitle: cardData?.jobTitle || "",
    bio: cardData?.bio || "",
    email: cardData?.email || "",
    phones: cardData?.phones || [],
    addresses: cardData?.addresses || [],
    company: cardData?.companyName || "",
    department: cardData?.department || "",
    profilePhoto: cardData?.profilePhoto,
    companyLogo: cardData?.companyLogo,
    services: cardData?.services || [],
    products: cardData?.products || [],
    socialLinks: cardData?.socialLinks || [],
    websites: cardData?.websites || []
  };

  // Get primary address
  const getPrimaryAddress = () => {
    if (!profileData.addresses || profileData.addresses.length === 0) {
      return null;
    }
    
    const primaryAddress = profileData.addresses.find(addr => addr.isPrimary);
    if (primaryAddress) {
      return primaryAddress;
    }
    
    return profileData.addresses[0];
  };

  // Format address for display
  const formatAddress = (address) => {
    if (address.fullAddress) {
      return address.fullAddress;
    }
    
    const parts = [
      address.street,
      address.city,
      address.state,
      address.postalCode,
      address.country
    ].filter(part => part && part.trim() !== "");
    
    return parts.join(', ');
  };

  // Handle address click - opens Google Maps
  const handleAddressClick = (address) => {
    if (address.googleMapsLink) {
      window.open(address.googleMapsLink, "_blank");
    } else if (address.fullAddress) {
      const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address.fullAddress)}`;
      window.open(mapsUrl, "_blank");
    }
  };

  // Gradient background effect with new colors
  useEffect(() => {
    const canvas = document.getElementById('bank-card-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawGradientBackground = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      // New gradient background with provided colors
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#05487C'); // Deep blue
      gradient.addColorStop(0.3, '#01A293'); // Teal
      gradient.addColorStop(0.6, '#8890BE'); // Lavender blue
      gradient.addColorStop(1, '#F4F6F8'); // Light smoke
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle floating particles for depth
      const time = Date.now() * 0.001;
      for (let i = 0; i < 8; i++) {
        const x = (Math.sin(time * 0.2 + i * 0.8) * 0.5 + 0.5) * width;
        const y = (Math.cos(time * 0.3 + i * 0.6) * 0.5 + 0.5) * height;
        const radius = Math.sin(time + i) * 3 + 8;
        
        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        particleGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        particleGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      drawGradientBackground();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div className="mt-4 mb-2">
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 bg-gray-300 rounded-full transition-all duration-300 hover:bg-[#05487C]"></div>
    ),
  };

  const socialMediaConfig = {
    linkedin: { icon: <FaLinkedinIn className="w-4 h-4" />, color: "hover:bg-[#0077B5]" },
    twitter: { icon: <FaXTwitter className="w-4 h-4" />, color: "hover:bg-black" },
    facebook: { icon: <FaFacebookF className="w-4 h-4" />, color: "hover:bg-[#1877F2]" },
    instagram: { icon: <FaInstagram className="w-4 h-4" />, color: "hover:bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]" },
    youtube: { icon: <FaYoutube className="w-4 h-4" />, color: "hover:bg-[#FF0000]" },
    website: { icon: <FaGlobe className="w-4 h-4" />, color: "hover:bg-[#01A293]" },
    whatsapp: { icon: <FaWhatsapp className="w-4 h-4" />, color: "hover:bg-[#25D366]" },
    telegram: { icon: <FaTelegramPlane className="w-4 h-4" />, color: "hover:bg-[#0088CC]" }
  };

  const activeSocialIcons = profileData.socialLinks
    .filter(link => link.url && socialMediaConfig[link.platform])
    .map(link => ({
      platform: link.platform,
      url: link.url,
      ...socialMediaConfig[link.platform]
    }));

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
      case "maps":
        window.open(value, "_blank");
        break;
      default:
        window.open(value, "_blank");
    }
  };

  const primaryAddress = getPrimaryAddress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05487C] via-[#01A293] to-[#8890BE] flex justify-center items-start py-8 px-4 relative overflow-hidden">
      {/* Gradient Background */}
      <canvas 
        id="bank-card-bg"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      
      {/* Main Card Container */}
      <div className="w-full max-w-md relative z-10">
        
        {/* Profile Card - Light card with gradient sections */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          
          {/* Profile Header Section - Blue Gradient */}
          <div className="relative p-8 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 border-b border-blue-200/50">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-5 left-5 w-16 h-16 bg-blue-400 rounded-full blur-lg"></div>
              <div className="absolute bottom-5 right-8 w-12 h-12 bg-cyan-400 rounded-full blur-md"></div>
            </div>
            
            <div className="relative z-10">
              {/* Main header with profile photo, name, and logo */}
              <div className="flex items-start justify-between gap-6">
                
                {/* Left side - Profile photo and name details */}
                <div className="flex items-start gap-6 flex-1">
                  {/* Profile Photo */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl blur-md transform scale-105"></div>
                      {profileData.profilePhoto ? (
                        <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-2xl overflow-hidden relative z-10">
                          <img
                            src={profileData.profilePhoto}
                            alt={profileData.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white text-xl font-bold hidden">
                            {profileData.name?.charAt(0) || "U"}
                          </div>
                        </div>
                      ) : (
                        <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white text-xl font-bold relative z-10">
                          {profileData.name?.charAt(0) || "U"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name and Details */}
                  <div className="flex-1 min-w-0">
                    {/* Name as heading */}
                    <h1 className="text-2xl font-bold text-gray-800 mb-2 font-sans">
                      {profileData.name || "No Name Provided"}
                    </h1>
                    
                    {/* Job Title as bold text */}
                    {profileData.jobTitle && (
                      <p className="text-gray-700 font-semibold text-base mb-3 font-sans">
                        {profileData.jobTitle}
                      </p>
                    )}
                    
                    {/* Address */}
                    {primaryAddress && (
                      <p className="text-gray-600 text-sm font-sans">
                        {formatAddress(primaryAddress)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right side - Company Logo */}
                {profileData.companyLogo && (
                  <div className="flex-shrink-0">
                    <div className="bg-white rounded-xl p-2 shadow-lg border border-gray-200">
                      <img
                        src={profileData.companyLogo}
                        alt="Company Logo"
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-12 h-12 flex items-center justify-center text-gray-500 text-sm hidden">
                        <FaBuilding className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Company name - below the main header */}
              {profileData.company && (
                <div className="mt-6 pt-6 border-t border-blue-200/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-sm border border-blue-200">
                      <FaBuilding className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold text-lg font-sans">{profileData.company}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social Links - Purple Gradient */}
          {activeSocialIcons.length > 0 && (
            <div className="px-8 py-6 border-b border-purple-200/50 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex justify-center gap-4">
                {activeSocialIcons.map((social, index) => (
                  <button
                    key={index}
                    onClick={() => handleContact("default", social.url)}
                    className={`w-12 h-12 rounded-2xl bg-white text-gray-600 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-purple-200 shadow-sm ${social.color} hover:text-white hover:shadow-xl transform hover:-translate-y-1`}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information - Green Gradient */}
          {(profileData.email || profileData.phones.length > 0) && (
            <div className="p-8 border-b border-emerald-200/50 bg-gradient-to-r from-emerald-50 to-green-50">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center font-sans">
                Contact Information
              </h3>

              <div className="space-y-4">
                {profileData.email && (
                  <div 
                    onClick={() => handleContact("email", profileData.email)}
                    className="bg-white rounded-2xl p-4 border border-emerald-200 hover:border-emerald-300 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                        <FaEnvelope className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-gray-600 text-xs font-semibold mb-1 font-sans">EMAIL</p>
                        <p className="text-gray-800 font-medium text-sm group-hover:text-emerald-600 transition-colors font-sans">{profileData.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {profileData.phones.map((phone, index) => (
                  <div 
                    key={index}
                    onClick={() => handleContact("phone", phone.number)}
                    className="bg-white rounded-2xl p-4 border border-emerald-200 hover:border-emerald-300 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                        <FaPhone className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-gray-600 text-xs font-semibold mb-1 font-sans">
                          {phone.label ? phone.label.toUpperCase() : "PHONE"}
                        </p>
                        <p className="text-gray-800 font-medium text-sm group-hover:text-emerald-600 transition-colors font-sans">{phone.number}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bio Section - Orange Gradient */}
          {profileData.bio && (
            <div className="p-8 border-b border-orange-200/50 bg-gradient-to-r from-orange-50 to-amber-50">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center font-sans">
                About Me
              </h3>
              <div className="bg-white rounded-2xl p-4 border border-orange-200">
                <p className="text-gray-700 leading-relaxed text-sm font-light font-sans text-center">
                  {profileData.bio}
                </p>
              </div>
            </div>
          )}

          {/* Services Section - Blue Gradient */}
          {profileData.services.length > 0 && (
            <div className="p-8 border-b border-blue-200/50 bg-gradient-to-r from-blue-50 to-cyan-50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 font-sans">Services</h3>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-sm border border-blue-200">
                  <FaRocket className="w-5 h-5 text-blue-600" />
                </div>
              </div>

              <div className="relative">
                <Slider ref={servicesSliderRef} {...sliderSettings}>
                  {profileData.services.map((service, i) => (
                    <div key={i} className="px-1">
                      <div className="bg-white rounded-2xl p-4 border border-blue-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md">
                        {service.image && (
                          <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-gray-100 to-gray-200">
                            <img
                              src={service.image}
                              alt={service.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm hidden">
                              <div className="text-center">
                                <FaRocket className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p>No Image Available</p>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-bold text-gray-800 font-sans">{service.name}</h4>
                          {service.price && (
                            <span className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-sm font-sans">
                              {service.price}
                            </span>
                          )}
                        </div>
                        {service.description && (
                          <p className="text-gray-600 text-sm leading-relaxed mb-3 font-sans line-clamp-3">
                            {service.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          )}

          {/* Products Section - Purple Gradient */}
          {profileData.products.length > 0 && (
            <div className="p-8 border-b border-purple-200/50 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 font-sans">Products</h3>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-200 rounded-2xl flex items-center justify-center shadow-sm border border-purple-200">
                  <FaGem className="w-5 h-5 text-purple-600" />
                </div>
              </div>

              <div className="relative">
                <Slider ref={productsSliderRef} {...sliderSettings}>
                  {profileData.products.map((product, i) => (
                    <div key={i} className="px-1">
                      <div className="bg-white rounded-2xl p-4 border border-purple-200 hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-md">
                        {product.image && (
                          <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-gray-100 to-gray-200">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm hidden">
                              <div className="text-center">
                                <FaGem className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p>No Image Available</p>
                              </div>
                            </div>
                            {product.inStock !== undefined && (
                              <span className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-bold border backdrop-blur-sm font-sans ${
                                product.inStock 
                                  ? "bg-green-500/90 text-white border-green-600" 
                                  : "bg-red-500/90 text-white border-red-600"
                              }`}>
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </span>
                            )}
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-bold text-gray-800 font-sans">{product.name}</h4>
                          {product.price && (
                            <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-sm font-sans">
                              {product.price}
                            </span>
                          )}
                        </div>
                        {product.description && (
                          <p className="text-gray-600 text-sm leading-relaxed font-sans line-clamp-3">
                            {product.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          )}

          {/* Map Section - Cyan Gradient */}
          {primaryAddress && (
            <div className="p-8 border-b border-cyan-200/50 bg-gradient-to-r from-cyan-50 to-blue-50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 font-sans">Location</h3>
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-sm border border-cyan-200">
                  <FaMapMarkerAlt className="w-5 h-5 text-cyan-600" />
                </div>
              </div>

              {/* Interactive Map */}
              <LocationMap addresses={profileData.addresses} />

              {/* Address Details */}
              <div className="mt-4 space-y-3">
                {profileData.addresses.map((address, index) => (
                  <div 
                    key={index}
                    onClick={() => handleAddressClick(address)}
                    className={`bg-white rounded-2xl p-4 border transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md transform hover:scale-105 ${
                      address.isPrimary 
                        ? 'border-cyan-300 hover:border-cyan-400' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                          address.isPrimary 
                            ? 'bg-cyan-500 text-white' 
                            : 'bg-gray-500 text-white'
                        }`}>
                          {address.label?.toUpperCase() || 'OFFICE'}
                        </span>
                        {address.isPrimary && (
                          <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-2 py-1 rounded-lg font-bold">
                            PRIMARY
                          </span>
                        )}
                      </div>
                      <FaMapMarkerAlt className={`w-4 h-4 ${
                        address.isPrimary ? 'text-cyan-500' : 'text-gray-500'
                      }`} />
                    </div>
                    
                    <div className="space-y-1">
                      {address.street && (
                        <p className="text-gray-800 font-medium text-sm">{address.street}</p>
                      )}
                      <p className="text-gray-600 text-sm">
                        {[
                          address.city,
                          address.state,
                          address.postalCode,
                          address.country
                        ].filter(part => part && part.trim() !== "").join(', ')}
                      </p>
                      
                      {address.fullAddress && (
                        <p className="text-gray-500 text-xs mt-2 font-light">
                          {address.fullAddress}
                        </p>
                      )}
                    </div>
                    
                    <div className="mt-3 pt-2 border-t border-cyan-200">
                      <p className="text-cyan-600 text-xs font-semibold group-hover:text-cyan-700 transition-colors">
                        📍 Click to open in Google Maps
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer CTA Section - Multi-color Gradient */}
          <div className="bg-gradient-to-r from-[#05487C] via-[#01A293] to-[#8890BE] p-8 text-center">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <FaCrown className="w-6 h-6 text-[#05487C]" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3 font-sans">
              Let's Work Together
            </h3>
            <p className="text-white/90 text-sm leading-relaxed mb-6 font-sans">
              Ready to bring your ideas to life? Let's discuss your project.
            </p>
            
            <button 
              onClick={() => handleContact("email", profileData.email)}
              className="w-full bg-white hover:bg-gray-100 text-[#05487C] font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg text-sm font-sans"
            >
              {profileData.email ? "Get In Touch" : "Start Project"}
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          .slick-dots li.slick-active div {
            background: #05487C;
            width: 20px;
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(5, 72, 124, 0.3);
          }
          
          .slick-dots {
            bottom: -10px;
          }
          
          .slick-slider {
            margin-bottom: 20px;
          }
          
          #bank-card-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
          }

          body {
            overflow-y: auto;
            background: linear-gradient(135deg, #05487C, #01A293, #8890BE, #F4F6F8);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 6px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(5, 72, 124, 0.3);
          }

          ::-webkit-scrollbar-thumb {
            background: rgba(120, 144, 156, 0.4);
            border-radius: 3px;
          }

          /* Slider arrow positioning */
          .slick-prev, .slick-next {
            width: 40px;
            height: 40px;
          }

          .slick-prev {
            left: -45px;
          }

          .slick-next {
            right: -45px;
          }

          /* Font family for all text */
          .font-sans {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          }

          /* Line clamp for text */
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          /* Ensure images don't overflow and fit properly */
          img {
            max-width: 100%;
            height: auto;
            object-fit: cover;
          }

          /* Smooth animations */
          * {
            transition: all 0.3s ease;
          }
        `}
      </style>
    </div>
  );
};

export default LightCard;