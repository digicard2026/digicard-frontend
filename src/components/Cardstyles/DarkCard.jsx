// import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

// const DarkCard = ({ cardData }) => {
//   return (
//     <div className="relative w-[400px] h-[600px] p-6 rounded-2xl text-center shadow-xl bg-gradient-to-br from-slate-900 to-purple-800 text-white overflow-hidden">
      
      
//       <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-purple-900 to-slate-800 rounded-b-[50%] flex items-center justify-center">
//         <div className="absolute w-full h-full bg-opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-denim.png')]"></div>
//       </div>

      
//       {cardData.image && (
//         <div className="relative mt-20">
//           <img
//             src={cardData.image}
//             alt="Profile"
//             className="w-28 h-28 mx-auto rounded-full border-4 border-white shadow-lg object-cover"
//           />
//         </div>
//       )}

     
//       <h3 className="text-2xl font-bold mt-4">{cardData.name}</h3>
//       <p className="text-lg text-gray-300">{cardData.jobTitle}</p>
//       <p className="text-sm text-gray-400">{cardData.company}</p>

      
//       <div className="mt-4 text-gray-300">
//         <p className="text-sm">{cardData.email}</p>
//         <p className="text-sm">{cardData.phone}</p>
//       </div>

  
//       <div className="absolute bottom-6 z-10 left-0 w-full flex justify-center gap-6 text-gray-400">
//         <a href="#" className="hover:text-blue-600 text-2xl"><FaLinkedin /></a>
//         <a href="#" className="hover:text-blue-600 text-2xl"><FaTwitter /></a>
//         <a href="#" className="hover:text-slate-400 text-2xl"><FaGithub /></a>
//       </div>

    
//       <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-r from-purple-900 to-slate-800 rounded-t-[50%]"></div>
//     </div>
//   );
// };

// export default DarkCard;
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
  FaClock,
  FaStar,
  FaArrowRight,
  FaShieldAlt,
  FaRocket,
  FaChartLine,
  FaGem,
  FaCrown,
  FaAward,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaPlay,
  FaUsers,
  FaBuilding,
  FaImages,
  FaFileAlt,
  FaVideo,
  FaQrcode,
  FaShoppingCart,
  FaCalendarAlt,
  FaComments,
  FaCreditCard,
  FaFilePdf,
  FaMusic,
  FaLanguage,
  FaBook,
  FaBox,
  FaTag,
  FaShoppingBag,
  FaWifi,
  FaIdCard
} from "react-icons/fa";
import { FaXTwitter, FaYoutube, FaTiktok, FaGithub, FaDiscord } from "react-icons/fa6";

// Custom Next Arrow Component - Smaller and Transparent
const NextArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white/80 shadow-lg border border-white/20 hover:bg-black/60 hover:text-white transition-all duration-300 z-20"
    >
      <FaChevronRight className="w-3 h-3" />
    </button>
  );
};

// Custom Previous Arrow Component - Smaller and Transparent
const PrevArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-1 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white/80 shadow-lg border border-white/20 hover:bg-black/60 hover:text-white transition-all duration-300 z-20"
    >
      <FaChevronLeft className="w-3 h-3" />
    </button>
  );
};

// Interactive Elements Component
const InteractiveElementsSection = ({ interactiveElements = [] }) => {
  if (!interactiveElements.length) return null;

  const getIconForType = (type) => {
    const icons = {
      'call-to-action': <FaArrowRight className="w-5 h-5" />,
      'shop-flow': <FaShoppingCart className="w-5 h-5" />,
      'show-leads': <FaChartLine className="w-5 h-5" />,
      'live-chat': <FaComments className="w-5 h-5" />,
      'appointment-scheduler': <FaCalendarAlt className="w-5 h-5" />,
      'digital-payments': <FaCreditCard className="w-5 h-5" />,
      'lead-form': <FaFileAlt className="w-5 h-5" />,
      'contact-form': <FaEnvelope className="w-5 h-5" />,
      'language-switcher': <FaLanguage className="w-5 h-5" />,
      'booking-system': <FaCalendarAlt className="w-5 h-5" />,
      'newsletter-signup': <FaEnvelope className="w-5 h-5" />,
      'file-download': <FaDownload className="w-5 h-5" />
    };
    return icons[type] || <FaRocket className="w-5 h-5" />;
  };

  const getColorForType = (type) => {
    const colors = {
      'call-to-action': 'from-purple-600 to-pink-600',
      'shop-flow': 'from-green-600 to-emerald-600',
      'show-leads': 'from-blue-600 to-cyan-600',
      'live-chat': 'from-indigo-600 to-purple-600',
      'appointment-scheduler': 'from-orange-600 to-red-600',
      'digital-payments': 'from-teal-600 to-green-600',
      'lead-form': 'from-sky-600 to-blue-600',
      'contact-form': 'from-violet-600 to-purple-600',
      'language-switcher': 'from-amber-600 to-yellow-600',
      'booking-system': 'from-rose-600 to-pink-600',
      'newsletter-signup': 'from-lime-600 to-green-600',
      'file-download': 'from-slate-600 to-gray-600'
    };
    return colors[type] || 'from-gray-600 to-slate-600';
  };

  return (
    <div className="px-8 pb-6 bg-gradient-to-br from-indigo-900/20 to-blue-900/10 border-t border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">
          <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
            Interactive Features
          </span>
        </h2>
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl border border-blue-400/40">
          <FaRocket className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {interactiveElements.map((element, index) => (
          <div 
            key={index}
            className={`bg-gradient-to-br ${getColorForType(element.type)}/20 rounded-2xl p-3 border border-slate-600/30 hover:border-slate-400/50 transition-all duration-300 cursor-pointer backdrop-blur-sm shadow-lg transform hover:scale-105`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${getColorForType(element.type)} rounded-2xl flex items-center justify-center shadow-lg`}>
                {getIconForType(element.type)}
              </div>
              <div>
                <h3 className="text-white font-bold text-sm capitalize">
                  {element.type.replace(/-/g, ' ')}
                </h3>
                <p className="text-slate-300 text-xs">
                  {element.isActive ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Profile Video Component
const ProfileVideoSection = ({ profileVideo }) => {
  if (!profileVideo) return null;

  return (
    <div className="px-8 pb-6 bg-gradient-to-br from-red-900/20 to-orange-900/10 border-t border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">
          <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Profile Video
          </span>
        </h2>
        <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl border border-orange-400/40">
          <FaVideo className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-900/40 to-orange-900/30 rounded-2xl p-4 border border-red-500/30 backdrop-blur-sm shadow-lg">
        <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden mb-3 relative">
          {profileVideo.thumbnail ? (
            <img 
              src={profileVideo.thumbnail} 
              alt={profileVideo.title || "Profile Video"} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FaPlay className="w-16 h-16 text-white/60" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <button 
              onClick={() => window.open(profileVideo.url, '_blank')}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <FaPlay className="w-4 h-4" />
              Watch Profile Video
            </button>
          </div>
        </div>
        {profileVideo.title && (
          <h3 className="text-white font-bold text-lg text-center">{profileVideo.title}</h3>
        )}
      </div>
    </div>
  );
};

// NFC & QR Code Section
const TechFeaturesSection = ({ dynamicQRCode, nfcSettings }) => {
  const hasQRCode = dynamicQRCode && dynamicQRCode.targetUrl;
  const hasNFC = nfcSettings && nfcSettings.isEnabled;

  if (!hasQRCode && !hasNFC) return null;

  return (
    <div className="px-8 pb-6 bg-gradient-to-br from-teal-900/20 to-emerald-900/10 border-t border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">
          <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Tech Features
          </span>
        </h2>
        <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl border border-emerald-400/40">
          <FaQrcode className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {hasQRCode && (
          <div className="bg-gradient-to-br from-teal-900/40 to-emerald-900/30 rounded-2xl p-4 border border-teal-500/30 backdrop-blur-sm shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaQrcode className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Dynamic QR Code</h3>
                <p className="text-teal-300 text-xs">
                  {dynamicQRCode.scans || 0} scans
                </p>
              </div>
            </div>
            <button 
              onClick={() => window.open(dynamicQRCode.targetUrl, '_blank')}
              className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-sm font-bold py-2 rounded-xl transition-all duration-300"
            >
              Scan QR Code
            </button>
          </div>
        )}

        {hasNFC && (
          <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/30 rounded-2xl p-4 border border-blue-500/30 backdrop-blur-sm shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaIdCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">NFC Enabled</h3>
                <p className="text-blue-300 text-xs">
                  {nfcSettings.lastUsed ? 'Active' : 'Ready'}
                </p>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-sm font-bold py-2 rounded-xl transition-all duration-300">
              Tap to Connect
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Custom Fields Section
const CustomFieldsSection = ({ customFields = [] }) => {
  if (!customFields.length) return null;

  return (
    <div className="px-8 pb-6 bg-gradient-to-br from-purple-900/20 to-pink-900/10 border-t border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Additional Information
          </span>
        </h2>
        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl border border-pink-400/40">
          <FaTag className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {customFields.map((field, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-purple-900/40 to-pink-900/30 rounded-2xl p-3 border border-purple-500/30 backdrop-blur-sm shadow-lg"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-purple-400 text-xs font-semibold mb-1">
                  {field.label.toUpperCase()}
                </p>
                <p className="text-white font-medium text-sm">{field.value}</p>
              </div>
              <span className="text-pink-400 text-xs bg-pink-900/50 px-2 py-1 rounded-lg border border-pink-500/50">
                {field.fieldType}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Multiple Emails Section
const EmailsSection = ({ emails = [] }) => {
  if (!emails.length) return null;

  return (
    <div className="px-8 pb-6 bg-gradient-to-br from-amber-900/20 to-yellow-900/10 border-t border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">
          <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
            Email Addresses
          </span>
        </h2>
        <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-2xl flex items-center justify-center shadow-2xl border border-yellow-400/40">
          <FaEnvelope className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="space-y-2">
        {emails.map((email, index) => (
          <div 
            key={index}
            onClick={() => window.open(`mailto:${email.address}`)}
            className="bg-gradient-to-br from-amber-900/40 to-yellow-900/30 rounded-2xl p-3 border border-amber-500/30 hover:border-amber-400/60 transition-all duration-300 cursor-pointer group backdrop-blur-sm shadow-lg transform hover:scale-105 hover:-translate-y-1"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-amber-400 text-xs font-semibold mb-1">
                  {email.label.toUpperCase()}
                </p>
                <p className="text-white font-medium text-sm group-hover:text-amber-300 transition-colors">
                  {email.address}
                </p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaEnvelope className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Updated Gallery Section to handle all media types
const GallerySection = ({ gallery = [] }) => {
  if (!gallery.length) return null;

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
  };

  const getMediaIcon = (type) => {
    const icons = {
      'image': <FaImages className="w-5 h-5" />,
      'video': <FaVideo className="w-5 h-5" />,
      'document': <FaFileAlt className="w-5 h-5" />,
      'audio': <FaMusic className="w-5 h-5" />,
      'pdf': <FaFilePdf className="w-5 h-5" />
    };
    return icons[type] || <FaImages className="w-5 h-5" />;
  };

  return (
    <div className="px-8 pb-6 bg-gradient-to-br from-indigo-900/20 to-purple-900/10 border-t border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Media Gallery
          </span>
        </h2>
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl border border-purple-400/40">
          <FaImages className="w-5 h-5 text-white" />
        </div>
      </div>

      <Slider {...sliderSettings}>
        {gallery.map((item, index) => (
          <div key={index} className="px-1">
            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/30 rounded-3xl p-4 border border-indigo-500/30 backdrop-blur-sm shadow-2xl">
              <div className="relative rounded-2xl overflow-hidden mb-3">
                {item.type === 'video' ? (
                  <div className="aspect-video bg-slate-800 flex items-center justify-center">
                    {item.thumbnail ? (
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <FaVideo className="w-12 h-12 text-white/60 mx-auto mb-2" />
                        <p className="text-white/80 font-medium">{item.title || 'Video'}</p>
                      </div>
                    )}
                  </div>
                ) : item.type === 'image' ? (
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="aspect-video bg-slate-800 flex items-center justify-center">
                    <div className="text-center">
                      {getMediaIcon(item.type)}
                      <p className="text-white/80 font-medium mt-2">{item.title || item.type}</p>
                      <p className="text-white/60 text-sm">{item.description}</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute top-3 right-3">
                  <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm border border-white/20">
                    {item.type}
                  </span>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                {item.description && (
                  <p className="text-slate-300 text-sm">{item.description}</p>
                )}
                {item.category && (
                  <span className="inline-block bg-indigo-500/50 text-indigo-200 text-xs px-2 py-1 rounded-lg mt-2 border border-indigo-400/50">
                    {item.category}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Testimonials Component
const TestimonialsSection = ({ testimonials = [] }) => {
  if (!testimonials.length) return null;

  return (
    <div className="px-8 pb-6 bg-gradient-to-br from-amber-900/20 to-yellow-900/10 border-t border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">
          <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
            Client Testimonials
          </span>
        </h2>
        <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-2xl flex items-center justify-center shadow-2xl border border-yellow-400/40">
          <FaStar className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="space-y-4">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-amber-900/40 to-yellow-900/30 rounded-2xl p-4 border border-amber-500/30 backdrop-blur-sm shadow-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white font-bold text-lg">{testimonial.clientName}</h3>
                {testimonial.date && (
                  <p className="text-amber-300 text-xs">
                    {new Date(testimonial.date).toLocaleDateString()}
                  </p>
                )}
              </div>
              {testimonial.rating && (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-slate-500'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            <p className="text-slate-200 text-sm leading-relaxed italic">
              "{testimonial.testimonial}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Downloads Component
const DownloadsSection = ({ downloads = [] }) => {
  if (!downloads.length) return null;

  const handleDownload = (download) => {
    window.open(download.fileUrl, '_blank');
  };

  return (
    <div className="px-8 pb-6 bg-gradient-to-br from-teal-900/20 to-emerald-900/10 border-t border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">
          <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Download Resources
          </span>
        </h2>
        <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl border border-emerald-400/40">
          <FaDownload className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="grid gap-3">
        {downloads.map((download, index) => (
          <div 
            key={index}
            onClick={() => handleDownload(download)}
            className="bg-gradient-to-br from-teal-900/40 to-emerald-900/30 rounded-2xl p-4 border border-teal-500/30 hover:border-teal-400/60 transition-all duration-300 cursor-pointer group backdrop-blur-sm shadow-lg transform hover:scale-105 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaFileAlt className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">{download.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {download.fileType && (
                      <span className="text-teal-300 text-xs bg-teal-900/50 px-2 py-1 rounded-lg border border-teal-500/50">
                        {download.fileType}
                      </span>
                    )}
                    {download.fileSize && (
                      <span className="text-slate-400 text-xs">
                        {download.fileSize}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaDownload className="w-4 h-4 text-white" />
                </div>
                {download.downloadCount > 0 && (
                  <p className="text-slate-400 text-xs mt-1">
                    {download.downloadCount} downloads
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Client List Component
const ClientListSection = ({ clientList = [] }) => {
  if (!clientList.length) return null;

  return (
    <div className="px-8 pb-6 bg-gradient-to-br from-rose-900/20 to-pink-900/10 border-t border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">
          <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
            Our Clients
          </span>
        </h2>
        <div className="w-10 h-10 bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl border border-pink-400/40">
          <FaUsers className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-rose-900/40 to-pink-900/30 rounded-2xl p-4 border border-rose-500/30 backdrop-blur-sm shadow-lg">
        <div className="grid grid-cols-2 gap-2">
          {clientList.map((client, index) => (
            <div 
              key={index}
              className="text-slate-200 text-sm p-2 rounded-lg bg-rose-800/20 border border-rose-500/20 hover:border-rose-400/50 transition-colors"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple Map Component using Google Maps iframe (no dependencies required)
const LocationMap = ({ addresses = [] }) => {
  const mapRef = useRef(null);

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
      const encodedAddress = encodeURIComponent(addressString);
      const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&z=15&output=embed&t=m`;
      
      mapRef.current.innerHTML = `
        <div class="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-600/50 shadow-2xl">
          <div class="bg-slate-900/80 border-b border-slate-600/50 p-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="text-white font-bold text-sm">Google Maps</span>
              </div>
              <div class="text-slate-400 text-xs">google.com</div>
            </div>
          </div>
          
          <div class="relative h-48 bg-slate-700">
            <iframe 
              src="${mapUrl}"
              width="100%" 
              height="100%" 
              style="border:0; filter: grayscale(1) invert(0.9) hue-rotate(180deg);" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
              class="rounded-b-2xl"
            ></iframe>
            <div class="absolute inset-0 pointer-events-none border border-slate-600/50 rounded-b-2xl"></div>
          </div>
          
          <div class="p-4 border-t border-slate-600/50">
            <div class="mb-3">
              <div class="text-slate-400 text-xs font-medium mb-1">ADDRESS</div>
              <div class="text-white text-sm font-semibold leading-tight">${addressString}</div>
            </div>
            
            <a 
              href="${primaryAddress.googleMapsLink || `https://maps.google.com/?q=${encodedAddress}`}"
              target="_blank" 
              rel="noopener noreferrer"
              class="block w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-center py-3 rounded-xl font-bold transition-all duration-300 border border-red-400/50 shadow-lg transform hover:scale-105"
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
      className="w-full rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600/50 overflow-hidden shadow-2xl"
    >
      <div className="w-full flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaMapMarkerAlt className="w-6 h-6 text-white" />
          </div>
          <p className="text-white font-bold text-lg mb-2">Location Preview</p>
          <p className="text-slate-300 text-sm">Interactive map will appear here</p>
        </div>
      </div>
    </div>
  );
};

// Updated social media config with new platforms
const socialMediaConfig = {
  linkedin: { icon: <FaLinkedinIn className="w-4 h-4" />, color: "hover:bg-blue-600" },
  twitter: { icon: <FaXTwitter className="w-4 h-4" />, color: "hover:bg-black" },
  facebook: { icon: <FaFacebookF className="w-4 h-4" />, color: "hover:bg-blue-500" },
  instagram: { icon: <FaInstagram className="w-4 h-4" />, color: "hover:bg-pink-600" },
  youtube: { icon: <FaYoutube className="w-4 h-4" />, color: "hover:bg-red-600" },
  tiktok: { icon: <FaTiktok className="w-4 h-4" />, color: "hover:bg-black" },
  github: { icon: <FaGithub className="w-4 h-4" />, color: "hover:bg-gray-800" },
  whatsapp: { icon: <FaWhatsapp className="w-4 h-4" />, color: "hover:bg-green-500" },
  telegram: { icon: <FaTelegramPlane className="w-4 h-4" />, color: "hover:bg-blue-400" },
  discord: { icon: <FaDiscord className="w-4 h-4" />, color: "hover:bg-indigo-600" },
  website: { icon: <FaGlobe className="w-4 h-4" />, color: "hover:bg-green-600" }
};

const DarkCard = ({ cardData = {} }) => {
  console.log('🎯 DarkCard received data:', cardData);

  const servicesSliderRef = useRef(null);
  const productsSliderRef = useRef(null);

  // Build profileData from cardData - ALL DYNAMIC with new fields
  const profileData = {
    // Personal Info
    name: `${cardData?.prefix || ""} ${cardData?.firstName || ""} ${cardData?.lastName || ""}`.trim() || "Alexander Carter",
    jobTitle: cardData?.jobTitle || "Web3 Strategy Director",
    bio: cardData?.bio || "Building bridges to a digital future with innovative Web3 solutions and strategic crypto marketing expertise.",
    
    // NEW FIELDS FROM SCHEMA
    titleLine: cardData?.titleLine,
    foundedName: cardData?.foundedName,
    organization: cardData?.organization,
    aboutText: cardData?.aboutText,
    servicesProducts: cardData?.servicesProducts,
    brandLabel: cardData?.brandLabel,
    catalog: cardData?.catalog,
    
    // Contact Info
    email: cardData?.email,
    emails: cardData?.emails || [],
    phones: cardData?.phones || [],
    
    // Addresses
    addresses: cardData?.addresses || [],
    
    // Company Info
    company: cardData?.companyName,
    department: cardData?.department,
    
    // Images & Media
    profilePhoto: cardData?.profilePhoto,
    companyLogo: cardData?.companyLogo,
    profileVideo: cardData?.profileVideo,
    
    // NEW ARRAYS FROM SCHEMA
    testimonials: cardData?.testimonials || [],
    clientList: cardData?.clientList || [],
    gallery: cardData?.gallery || [],
    downloads: cardData?.downloads || [],
    customFields: cardData?.customFields || [],
    
    // Services & Products
    services: cardData?.services || [],
    products: cardData?.products || [],
    
    // Social Links
    socialLinks: cardData?.socialLinks || [],
    websites: cardData?.websites || [],
    
    // Tech Features
    dynamicQRCode: cardData?.dynamicQRCode,
    nfcSettings: cardData?.nfcSettings,
    interactiveElements: cardData?.interactiveElements || [],

    // Card Type & Design
    cardType: cardData?.cardType || 'business',
    design: cardData?.design || 'dark',
    cardLayout: cardData?.cardLayout || 'standard'
  };

  // Filter active social icons with new platforms
  const activeSocialIcons = profileData.socialLinks
    .filter(link => link.url && socialMediaConfig[link.platform])
    .map(link => ({
      platform: link.platform,
      url: link.url,
      ...socialMediaConfig[link.platform]
    }));

  // Handle contact actions
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

  // Handle address click
  const handleAddressClick = (address) => {
    if (address.googleMapsLink) {
      handleContact("maps", address.googleMapsLink);
    } else if (address.fullAddress) {
      const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address.fullAddress)}`;
      handleContact("maps", mapsUrl);
    }
  };

  const primaryAddress = profileData.addresses.find(addr => addr.isPrimary) || profileData.addresses[0];

  // Premium Galaxy Animation
  useEffect(() => {
    const canvas = document.getElementById('particle-canvas-dark');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
        this.z = Math.random() * 1500;
      }

      reset() {
        this.x = (Math.random() - 0.5) * canvas.width * 1.5;
        this.y = (Math.random() - 0.5) * canvas.height * 1.5;
        this.z = Math.random() * 1500;
        this.size = Math.random() * 1.2 + 0.3;
        this.speed = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.color = this.getColor();
      }

      getColor() {
        const colors = [
          'rgba(139, 92, 246, {opacity})',
          'rgba(124, 58, 237, {opacity})',
          'rgba(99, 102, 241, {opacity})',
          'rgba(14, 165, 233, {opacity})',
          'rgba(255, 215, 0, {opacity})',
          'rgba(255, 255, 255, {opacity})'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.z -= this.speed;
        if (this.z <= 0) {
          this.reset();
          this.z = 1500;
        }

        const scale = 100 / (this.z + 100);
        this.xWithPerspective = this.x * scale + canvas.width / 2;
        this.yWithPerspective = this.y * scale + canvas.height / 2;
        this.sizeWithPerspective = this.size * scale * 1.5;
      }

      draw() {
        if (!this.xWithPerspective || !this.yWithPerspective) return;
        
        const currentOpacity = this.opacity * (1 - this.z / 1500);
        const currentColor = this.color.replace('{opacity}', currentOpacity);
        
        ctx.fillStyle = currentColor;
        ctx.beginPath();
        ctx.arc(this.xWithPerspective, this.yWithPerspective, this.sizeWithPerspective, 0, Math.PI * 2);
        ctx.fill();

        if (this.size > 0.8) {
          ctx.shadowColor = currentColor;
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    const particles = [];
    const particleCount = 250;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.fillStyle = 'rgb(8, 12, 28)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 1.2
      );
      gradient.addColorStop(0, 'rgba(88, 28, 135, 0.15)');
      gradient.addColorStop(0.5, 'rgba(30, 58, 138, 0.1)');
      gradient.addColorStop(1, 'rgba(8, 12, 28, 0.3)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
      <div className="mt-3">
        <ul className="flex justify-center gap-1">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-1.5 h-1.5 bg-gray-600 rounded-full transition-all duration-300"></div>
    ),
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-start py-8 px-4 relative overflow-hidden">
      {/* Premium Galaxy Background */}
      <canvas 
        id="particle-canvas-dark"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      
      {/* Main Card Container */}
      <div className="w-full max-w-lg relative z-10">
        
        {/* Unified Main Card with Modern Professional Design */}
        <div className="bg-gradient-to-br from-slate-900/95 via-purple-900/20 to-blue-900/10 rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm">
          
          {/* Premium Header Section */}
          <div className="relative h-40 bg-gradient-to-br from-slate-900 via-purple-900/80 to-slate-800 border-b border-slate-600/50">
            {/* Modern Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-xl"></div>
              <div className="absolute top-5 right-16 w-16 h-16 bg-purple-500 rounded-full blur-lg"></div>
              <div className="absolute bottom-8 left-20 w-24 h-24 bg-cyan-500 rounded-full blur-2xl"></div>
            </div>
            
            <div className="absolute top-6 left-6 flex items-center gap-4">
              {profileData.companyLogo ? (
                <img 
                  src={profileData.companyLogo} 
                  alt="Company Logo" 
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-500/50 shadow-lg" 
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-slate-600 to-slate-700 flex items-center justify-center text-white font-bold text-lg border-2 border-slate-500/50 shadow-lg">
                  {profileData.company?.charAt(0) || "P"}
                </div>
              )}
              <div>
                <h2 className="text-white font-bold text-xl">{profileData.company}</h2>
                <p className="text-slate-300 text-sm font-light">Digital Solutions</p>
              </div>
            </div>

            <div className="absolute top-6 right-6">
              <button className="bg-slate-800/80 backdrop-blur-sm text-slate-300 px-4 py-2 rounded-xl text-sm border border-slate-600/50 hover:border-slate-400/70 transition-all duration-300 hover:bg-slate-700/60 shadow-lg">
                🌐 English
              </button>
            </div>

            {/* Profile Image with Modern Effect */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl blur-md opacity-60 transform translate-y-1 scale-105"></div>
                {profileData.profilePhoto ? (
                  <img
                    src={profileData.profilePhoto}
                    alt={profileData.name}
                    className="w-28 h-28 rounded-2xl border-4 border-slate-900 shadow-2xl object-cover relative z-10"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-2xl border-4 border-slate-900 shadow-2xl bg-gradient-to-r from-slate-600 to-slate-700 flex items-center justify-center text-white text-2xl font-bold relative z-10">
                    {profileData.name?.charAt(0) || "A"}
                  </div>
                )}
                {/* Modern Status Badge */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full border-2 border-slate-900 flex items-center justify-center shadow-lg z-20">
                  <FaAward className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content Section */}
          <div className="pt-20 px-8 pb-6 bg-gradient-to-br from-slate-800/90 via-purple-900/20 to-blue-900/10">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                {profileData.name}
              </h1>
              
              {/* Title Line */}
              {profileData.titleLine && (
                <p className="text-amber-400 font-semibold text-sm mb-2 bg-amber-900/30 px-3 py-1 rounded-xl border border-amber-500/30 inline-block">
                  {profileData.titleLine}
                </p>
              )}
              
              <p className="text-blue-400 font-semibold text-lg mb-3 bg-gradient-to-r from-slate-800/80 to-slate-700/80 px-4 py-2 rounded-2xl border border-slate-600/50 shadow-lg inline-block">
                {profileData.jobTitle}
              </p>
              
              {/* Organization */}
              {profileData.organization && (
                <p className="text-emerald-400 text-sm mb-3 font-medium">
                  {profileData.organization}
                </p>
              )}
              
              {/* About Text */}
              {profileData.aboutText && (
                <div className="bg-gradient-to-br from-slate-800/70 to-slate-700/60 rounded-2xl p-5 border border-slate-600/50 shadow-lg backdrop-blur-sm">
                  <p className="text-slate-200 leading-relaxed text-base font-light">
                    {profileData.aboutText}
                  </p>
                </div>
              )}
            </div>

            {/* Social Links */}
            {activeSocialIcons.length > 0 && (
              <div className="flex justify-center gap-4 mb-6">
                {activeSocialIcons.map((social, index) => (
                  <button
                    key={index}
                    onClick={() => handleContact("default", social.url)}
                    className={`w-12 h-12 rounded-2xl bg-slate-700/80 text-slate-300 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-slate-600/50 shadow-lg backdrop-blur-sm ${social.color} hover:text-white hover:shadow-2xl transform hover:-translate-y-1`}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* NEW SECTIONS - Add all the new components in logical order */}

          {/* Profile Video Section */}
          <ProfileVideoSection profileVideo={profileData.profileVideo} />

          {/* Tech Features Section */}
          <TechFeaturesSection 
            dynamicQRCode={profileData.dynamicQRCode}
            nfcSettings={profileData.nfcSettings}
          />

          {/* Interactive Elements Section */}
          <InteractiveElementsSection interactiveElements={profileData.interactiveElements} />

          {/* Multiple Emails Section */}
          <EmailsSection emails={profileData.emails} />

          {/* Custom Fields Section */}
          <CustomFieldsSection customFields={profileData.customFields} />

          {/* Services & Products Overview */}
          {profileData.servicesProducts && (
            <div className="px-8 pb-6 bg-gradient-to-br from-violet-900/20 to-fuchsia-900/10 border-t border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">
                  <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    Services & Products
                  </span>
                </h2>
                <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-2xl border border-fuchsia-400/40">
                  <FaBuilding className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-violet-900/40 to-fuchsia-900/30 rounded-2xl p-5 border border-violet-500/30 backdrop-blur-sm shadow-lg">
                <p className="text-slate-200 leading-relaxed text-sm">
                  {profileData.servicesProducts}
                </p>
                
                {/* Brand Label */}
                {profileData.brandLabel && (
                  <div className="mt-4 pt-3 border-t border-violet-500/20">
                    <p className="text-violet-300 text-xs font-semibold mb-1">BRAND LABEL</p>
                    <p className="text-white font-bold">{profileData.brandLabel}</p>
                  </div>
                )}
                
                {/* Catalog */}
                {profileData.catalog && (
                  <div className="mt-3">
                    <p className="text-violet-300 text-xs font-semibold mb-1">CATALOG</p>
                    <p className="text-slate-300 text-sm">{profileData.catalog}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Services Section */}
          {profileData.services.length > 0 && (
            <div className="px-8 pb-6 bg-gradient-to-br from-blue-900/20 to-cyan-900/10 border-t border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Premium Services
                  </span>
                </h2>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl border border-cyan-400/40">
                  <FaRocket className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="relative">
                <Slider ref={servicesSliderRef} {...sliderSettings}>
                  {profileData.services.map((service, i) => (
                    <div key={i} className="px-1">
                      <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/30 rounded-3xl p-5 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 backdrop-blur-sm shadow-2xl transform hover:-translate-y-2">
                        {service.image && (
                          <div className="relative h-48 rounded-2xl overflow-hidden mb-4 shadow-lg">
                            <img
                              src={service.image}
                              alt={service.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold text-white">{service.name}</h3>
                          {service.price && (
                            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-xl text-sm font-bold shadow-lg border border-cyan-400/50">
                              {service.price}
                            </span>
                          )}
                        </div>
                        {service.description && (
                          <p className="text-slate-300 text-sm leading-relaxed mb-4 font-light">
                            {service.description}
                          </p>
                        )}
                        <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 group border border-cyan-400/40">
                          Explore Service
                          <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          )}

          {/* Products Section */}
          {profileData.products.length > 0 && (
            <div className="px-8 pb-4 bg-gradient-to-br from-purple-900/20 to-pink-900/10 border-t border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Featured Products
                  </span>
                </h2>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl border border-pink-400/40">
                  <FaGem className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="relative">
                <Slider ref={productsSliderRef} {...sliderSettings}>
                  {profileData.products.map((product, i) => (
                    <div key={i} className="px-1">
                      <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/30 rounded-3xl p-5 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 backdrop-blur-sm shadow-2xl transform hover:-translate-y-2">
                        {product.image && (
                          <div className="relative h-48 rounded-2xl overflow-hidden mb-4 shadow-lg">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                            
                            {/* Status Badges */}
                            <div className="absolute top-3 left-3 flex gap-1">
                              {product.inStock !== undefined && (
                                <span className={`px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm border ${
                                  product.inStock 
                                    ? "bg-green-500/50 text-green-200 border-green-400/60" 
                                    : "bg-red-500/50 text-red-200 border-red-400/60"
                                }`}>
                                  {product.inStock ? "In Stock" : "Out of Stock"}
                                </span>
                              )}
                            </div>
                            
                            {product.price && (
                              <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-lg text-sm font-bold backdrop-blur-sm border border-pink-400/50 shadow-lg">
                                {product.price}
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold text-white">{product.name}</h3>
                        </div>
                        {product.description && (
                          <p className="text-slate-300 text-sm leading-relaxed mb-4 font-light">
                            {product.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl mt-3 flex items-center justify-center gap-3 group border border-pink-400/50">
                View All Products
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* Gallery Section */}
          <GallerySection gallery={profileData.gallery} />

          {/* Testimonials Section */}
          <TestimonialsSection testimonials={profileData.testimonials} />

          {/* Client List Section */}
          <ClientListSection clientList={profileData.clientList} />

          {/* Downloads Section */}
          <DownloadsSection downloads={profileData.downloads} />

          {/* Contact Section */}
          {(profileData.email || profileData.phones.length > 0) && (
            <div className="px-8 pb-6 bg-gradient-to-br from-emerald-900/20 to-green-900/10 border-t border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">
                  <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                    Contact Information
                  </span>
                </h2>
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl border border-green-400/40">
                  <FaEnvelope className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                {profileData.email && (
                  <div 
                    onClick={() => handleContact("email", profileData.email)}
                    className="bg-gradient-to-br from-emerald-900/40 to-green-900/30 rounded-2xl p-3 border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300 cursor-pointer group backdrop-blur-sm shadow-lg transform hover:scale-105 hover:-translate-y-1"
                  >
                    <p className="text-emerald-400 text-xs font-semibold mb-1">EMAIL</p>
                    <p className="text-white font-medium text-sm group-hover:text-emerald-300 transition-colors">{profileData.email}</p>
                  </div>
                )}

                {profileData.phones.map((phone, index) => (
                  <div 
                    key={index}
                    onClick={() => handleContact("phone", phone.number)}
                    className="bg-gradient-to-br from-blue-900/40 to-cyan-900/30 rounded-2xl p-3 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 cursor-pointer group backdrop-blur-sm shadow-lg transform hover:scale-105 hover:-translate-y-1"
                  >
                    <p className="text-blue-400 text-xs font-semibold mb-1">
                      {phone.label ? phone.label.toUpperCase() : "PHONE"}
                    </p>
                    <p className="text-white font-medium text-sm group-hover:text-blue-300 transition-colors">{phone.number}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Location Map Section */}
          {primaryAddress && (
            <div className="px-8 pb-6 bg-gradient-to-br from-red-900/20 to-orange-900/10 border-t border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">
                  <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                    Our Location
                  </span>
                </h2>
                <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl border border-orange-400/40">
                  <FaMapMarkerAlt className="w-5 h-5 text-white" />
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
                    className={`bg-gradient-to-br from-red-900/40 to-orange-900/30 rounded-2xl p-4 border transition-all duration-300 cursor-pointer group backdrop-blur-sm shadow-lg transform hover:scale-105 hover:-translate-y-1 ${
                      address.isPrimary 
                        ? 'border-orange-400/60 hover:border-orange-300/80' 
                        : 'border-red-500/30 hover:border-red-400/60'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                          address.isPrimary 
                            ? 'bg-orange-500/50 text-orange-200 border border-orange-400/60' 
                            : 'bg-red-500/50 text-red-200 border border-red-400/60'
                        }`}>
                          {address.label?.toUpperCase() || 'OFFICE'}
                        </span>
                        {address.isPrimary && (
                          <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs px-2 py-1 rounded-lg font-bold border border-orange-400/50">
                            PRIMARY
                          </span>
                        )}
                      </div>
                      <FaMapMarkerAlt className={`w-4 h-4 ${
                        address.isPrimary ? 'text-orange-400' : 'text-red-400'
                      }`} />
                    </div>
                    
                    <div className="space-y-1">
                      {address.street && (
                        <p className="text-white font-medium text-sm">{address.street}</p>
                      )}
                      <p className="text-slate-300 text-sm">
                        {[
                          address.city,
                          address.state,
                          address.postalCode,
                          address.country
                        ].filter(part => part && part.trim() !== "").join(', ')}
                      </p>
                      
                      {address.fullAddress && (
                        <p className="text-slate-400 text-xs mt-2 font-light">
                          {address.fullAddress}
                        </p>
                      )}
                    </div>
                    
                    <div className="mt-3 pt-2 border-t border-orange-500/20">
                      <p className="text-orange-400 text-xs font-semibold group-hover:text-orange-300 transition-colors">
                        📍 Click to open in Google Maps
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 border-t border-slate-600/50 p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <FaCrown className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3">
              <span className="bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                Let's Build Together
              </span>
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light max-w-md mx-auto">
               Digital connections start here. Let's turn your vision into groundbreaking digital experiences.
            </p>
            
            <button 
              onClick={() => handleContact("email", profileData.email)}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl text-base border border-cyan-400/40"
            >
              Start Your Project
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          .slick-dots li.slick-active div {
            background: linear-gradient(to right, #3b82f6, #06b6d4);
            width: 20px;
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          }
          
          #particle-canvas-dark {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
          }

          body {
            overflow-y: auto;
            background: #020617;
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 6px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(15, 23, 42, 0.5);
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #3b82f6, #06b6d4);
            border-radius: 3px;
          }

          /* Slider arrow positioning */
          .slick-prev, .slick-next {
            width: 32px;
            height: 32px;
          }
        `}
      </style>
    </div>
  );
};

export default DarkCard;