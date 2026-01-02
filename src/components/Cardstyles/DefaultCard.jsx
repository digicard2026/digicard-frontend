// import React, { useEffect } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import {
//   FaGlobe,
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaTelegramPlane,
//   FaWhatsapp,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaClock,
//   FaStar,
//   FaUser,
//   FaBriefcase,
//   FaBuilding,
//   FaFilePdf,
//   FaDownload,
//   FaQrcode,
//   FaIdCard,
//   FaVideo,
//   FaImages,
//   FaShoppingCart,
//   FaGem,
//   FaShare,
//   FaFileInvoice,
//   FaFileVideo,
//   FaRobot,
//   FaCommentDots,
//   FaRegClock,
//   FaSuitcase,
//   FaTags,
//   FaUsers
// } from "react-icons/fa";
// import { FaXTwitter, FaYoutube } from "react-icons/fa6";

// // Video player component
// const VideoPlayer = ({ src, poster, title, className = "" }) => {
//   const [error, setError] = React.useState(false);
//   const [loading, setLoading] = React.useState(true);
  
//   const getVideoUrl = (url) => {
//     if (!url) return '';
//     return url;
//   };
  
//   const videoUrl = getVideoUrl(src);
  
//   const handleError = (e) => {
//     console.error('Video playback error:', e);
//     setError(true);
//     setLoading(false);
//   };
  
//   const handleLoadStart = () => {
//     setLoading(true);
//   };
  
//   const handleLoadedData = () => {
//     setLoading(false);
//   };
  
//   if (error) {
//     return (
//       <div className={`flex flex-col items-center justify-center bg-gray-800 rounded-lg ${className}`}>
//         <FaVideo className="w-12 h-12 text-gray-400 mb-2" />
//         <p className="text-sm text-gray-400">Video failed to load</p>
//         <p className="text-xs text-gray-500 mt-1">{title}</p>
//       </div>
//     );
//   }
  
//   return (
//     <div className={`relative ${className}`}>
//       {loading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 z-10">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
//         </div>
//       )}
      
//       <video
//         src={videoUrl}
//         className="w-full h-full object-contain rounded-lg"
//         controls
//         playsInline
//         preload="metadata"
//         poster={poster}
//         onError={handleError}
//         onLoadStart={handleLoadStart}
//         onLoadedData={handleLoadedData}
//         onCanPlay={handleLoadedData}
//       >
//         <source src={videoUrl} type="video/mp4" />
//         <source src={videoUrl} type="video/webm" />
//         Your browser does not support the video tag.
//       </video>
      
//       {title && (
//         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
//           <p className="text-sm text-white">{title}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// // RECEIVE DATA VIA PROPS instead of useLocation
// const DefaultCard = ({ cardData = {} }) => {
//   console.log('🎯 DefaultCard received data:', cardData); // Debug log

//   // Build complete profileData from cardData WITH ALL FIELDS
//   const profileData = {
//     // Personal Info
//     prefix: cardData?.prefix || "",
//     firstName: cardData?.firstName || "",
//     lastName: cardData?.lastName || "",
//     suffix: cardData?.suffix || "",
//     name: `${cardData?.prefix || ""} ${cardData?.firstName || ""} ${cardData?.lastName || ""}`.trim() || "Your Name",
//     jobTitle: cardData?.jobTitle || "Professional",
//     bio: cardData?.bio || "A short bio about yourself that appears below your title.",
//     aboutText: cardData?.aboutText || ".",
//     tagline: cardData?.tagline || "",
    
//     // Professional Info
//     companyName: cardData?.companyName || "",
//     department: cardData?.department || "",
//     organization: cardData?.organization || "",
//     foundedName: cardData?.foundedName || "",
    
//     // Contact Info
//     email: cardData?.email || "",
//     emails: cardData?.emails || [{ address: cardData?.email || "", label: "primary", isPrimary: true }],
//     phones: cardData?.phones || [],
//     addresses: cardData?.addresses || [],
//     websites: cardData?.websites || [],
//     virtualNumber: cardData?.virtualNumber || { number: "", isEnabled: false },
    
//     // Business Hours
//     businessHours: cardData?.businessHours || [],
    
//     // Profile Content
//     profileVideo: cardData?.profileVideo || null,
//     productVideo: cardData?.productVideo || null,
//     videos: cardData?.videos || [],
//     servicesProducts: cardData?.servicesProducts || "",
    
//     // Catalog
//     catalog: cardData?.catalog || cardData?.catalogPDF || "",
//     catalogPDF: cardData?.catalogPDF || "",
    
//     // Images
//     profilePhoto: cardData?.profilePhoto,
//     companyLogo: cardData?.companyLogo,
    
//     // Services & Products
//     services: cardData?.services || [],
//     products: cardData?.products || [],
    
//     // Social Links
//     socialLinks: cardData?.socialLinks || [],
    
//     // Premium Features
//     testimonials: cardData?.testimonials || [],
//     clientList: cardData?.clientList || [],
//     gallery: cardData?.gallery || [],
//     downloads: cardData?.downloads || [],
//     interactiveElements: cardData?.interactiveElements || [],
//     individualProductDisplay: cardData?.individualProductDisplay || false,
//     businessCardInstagram: cardData?.businessCardInstagram || "",
//     textbooks: cardData?.textbooks || [],

//     // Digital Features
//     dynamicQRCode: cardData?.dynamicQRCode || null,
    
//     // Shareable URL
//     shareableUrl: cardData?.shareableUrl || cardData?.shareUrl || "",
    
//     // Brand & Product
//     brandLabel: cardData?.brandLabel || "",
//     productRangeDisplay: cardData?.productRangeDisplay || "grid",
    
//     // NFC Settings
//     nfcSettings: cardData?.nfcSettings || { isEnabled: false },
    
//     // Chat Features
//     chatAssistant: cardData?.chatAssistant || { isEnabled: false, welcomeMessage: "Hello! How can I help you today?" },
//     liveChat: cardData?.liveChat || { isEnabled: false, platform: "whatsapp", phoneNumber: "" },
    
//     // Plan Info
//     cardType: cardData?.cardType || 'Personal',
    
//     // Settings
//     enableOneTapCall: cardData?.enableOneTapCall !== undefined ? cardData.enableOneTapCall : true,
//     enableWhatsApp: cardData?.enableWhatsApp !== undefined ? cardData.enableWhatsApp : true,
//     enableEmail: cardData?.enableEmail !== undefined ? cardData.enableEmail : true
//   };

//   console.log('🎯 Profile data built:', profileData); // Debug log

//   // Get primary contact info
//   const primaryPhone = profileData.phones.find(phone => phone.isPrimary) || profileData.phones[0];
//   const primaryEmail = profileData.emails.find(email => email.isPrimary) || profileData.emails[0];
//   const primaryAddress = profileData.addresses.find(addr => addr.isPrimary) || profileData.addresses[0];

//   // Particle Animation Effect - Faster and Larger
//   useEffect(() => {
//     const canvas = document.getElementById('particle-canvas');
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     let animationFrameId;

//     // Set canvas size
//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     resizeCanvas();
//     window.addEventListener('resize', resizeCanvas);

//     // Particle class with larger and faster particles
//     class Particle {
//       constructor() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.size = Math.random() * 4 + 2;
//         this.speedX = Math.random() * 2 - 1;
//         this.speedY = Math.random() * 2 - 1;
//         this.color = `rgba(105, 83, 243, ${Math.random() * 0.5 + 0.3})`;
//       }

//       update() {
//         this.x += this.speedX;
//         this.y += this.speedY;

//         if (this.x > canvas.width || this.x < 0) {
//           this.speedX = -this.speedX;
//         }
//         if (this.y > canvas.height || this.y < 0) {
//           this.speedY = -this.speedY;
//         }

//         this.x = Math.max(0, Math.min(canvas.width, this.x));
//         this.y = Math.max(0, Math.min(canvas.height, this.y));
//       }

//       draw() {
//         ctx.fillStyle = this.color;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fill();
        
//         ctx.shadowColor = 'rgba(105, 83, 243, 0.8)';
//         ctx.shadowBlur = 10;
//         ctx.fill();
//         ctx.shadowBlur = 0;
//       }
//     }

//     // Create more particles
//     const particles = [];
//     const particleCount = 100;

//     for (let i = 0; i < particleCount; i++) {
//       particles.push(new Particle());
//     }

//     // Animation loop
//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
      
//       particles.forEach(particle => {
//         particle.update();
//         particle.draw();
//       });

//       // Draw connections
//       ctx.strokeStyle = 'rgba(105, 83, 243, 0.2)';
//       ctx.lineWidth = 1.5;
//       ctx.shadowColor = 'rgba(105, 83, 243, 0.3)';
//       ctx.shadowBlur = 5;

//       for (let i = 0; i < particles.length; i++) {
//         for (let j = i + 1; j < particles.length; j++) {
//           const dx = particles[i].x - particles[j].x;
//           const dy = particles[i].y - particles[j].y;
//           const distance = Math.sqrt(dx * dx + dy * dy);

//           if (distance < 200) {
//             const opacity = 1 - (distance / 200);
//             ctx.strokeStyle = `rgba(105, 83, 243, ${opacity * 0.3})`;
            
//             ctx.beginPath();
//             ctx.moveTo(particles[i].x, particles[i].y);
//             ctx.lineTo(particles[j].x, particles[j].y);
//             ctx.stroke();
//           }
//         }
//       }

//       ctx.shadowBlur = 0;
//       animationFrameId = requestAnimationFrame(animate);
//     };

//     animate();

//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', resizeCanvas);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   const BaseSliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 600,
//     centerMode: true,
//     centerPadding: "40px", 
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: false,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           centerPadding: "20px",
//           slidesToShow: 1,
//         },
//       },
//     ],
//     appendDots: (dots) => (
//       <div>
//         <ul className="flex justify-center gap-1 mt-4">{dots}</ul>
//       </div>
//     ),
//     customPaging: () => (
//       <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
//     ),
//     dotsClass: "slick-dots",
//   };

//   const sliderSettingsNoDots = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     centerMode: true,
//     centerPadding: "10px",
//     slidesToShow: 1.5,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           centerPadding: "20px",
//           slidesToShow: 1.5,
//         },
//       },
//     ],
//   };

//   // Social media configuration
//   const socialMediaConfig = {
//     linkedin: { icon: <FaLinkedinIn className="w-4 h-4" />, color: "text-[#311cb4]" },
//     twitter: { icon: <FaXTwitter className="w-4 h-4" />, color: "text-[#311cb4]" },
//     facebook: { icon: <FaFacebookF className="w-4 h-4" />, color: "text-[#311cb4]" },
//     instagram: { icon: <FaInstagram className="w-4 h-4" />, color: "text-[#311cb4]" },
//     youtube: { icon: <FaYoutube className="w-4 h-4" />, color: "text-[#311cb4]" },
//     whatsapp: { icon: <FaWhatsapp className="w-4 h-4" />, color: "text-[#311cb4]" },
//     telegram: { icon: <FaTelegramPlane className="w-4 h-4" />, color: "text-[#311cb4]" },
//     website: { icon: <FaGlobe className="w-4 h-4" />, color: "text-[#311cb4]" }
//   };

//   // Get active social icons from dynamic data
//   const activeSocialIcons = profileData.socialLinks
//     .filter(link => link.url && socialMediaConfig[link.platform])
//     .map(link => ({
//       platform: link.platform,
//       url: link.url,
//       ...socialMediaConfig[link.platform]
//     }));

//   const handleContact = (type, value) => {
//     if (!value) return;
//     switch (type) {
//       case "email":
//         window.open(`mailto:${value}`);
//         break;
//       case "phone":
//         window.open(`tel:${value}`);
//         break;
//       case "whatsapp":
//         window.open(`https://wa.me/${value.replace(/\D/g, "")}`);
//         break;
//       case "map":
//         window.open(value, "_blank");
//         break;
//       case "website":
//         window.open(value, "_blank");
//         break;
//       case "virtualNumber":
//         window.open(`tel:${value}`);
//         break;
//       default:
//         window.open(value, "_blank");
//     }
//   };

//   // NEW: Share functionality
//   const handleShare = () => {
//     const shareUrl = profileData.shareableUrl || window.location.href;
//     const shareText = `Check out ${profileData.name}'s digital card`;
    
//     if (navigator.share) {
//       navigator.share({
//         title: `${profileData.name}'s Digital Card`,
//         text: shareText,
//         url: shareUrl,
//       });
//     } else {
//       navigator.clipboard.writeText(shareUrl).then(() => {
//         alert('Link copied to clipboard!');
//       });
//     }
//   };

//   // ========== NEW COMPONENTS FOR ADDED FIELDS ==========

//   // Share Button Component
//   const renderShareButton = () => {
//     if (!profileData.shareableUrl) return null;
    
//     return (
//       <div className="px-6 pb-4">
//         <button
//           onClick={handleShare}
//           className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-3 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
//         >
//           <FaShare className="w-5 h-5" />
//           Share My Card
//         </button>
//       </div>
//     );
//   };

//   // Business Hours Component
//   const renderBusinessHours = () => {
//     if (!profileData.businessHours || profileData.businessHours.length === 0) return null;
    
//     const formatHours = () => {
//       const hoursArray = Array.isArray(profileData.businessHours) ? profileData.businessHours : [];
//       if (hoursArray.length === 0) return null;
      
//       const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
//       return days.map(day => {
//         const dayData = hoursArray.find(h => h.day === day);
//         if (!dayData || dayData.isClosed || (!dayData.openingTime && !dayData.closingTime)) {
//           return { day, display: `${day.charAt(0).toUpperCase() + day.slice(1)}: Closed` };
//         }
//         return { 
//           day, 
//           display: `${day.charAt(0).toUpperCase() + day.slice(1)}: ${dayData.openingTime || 'N/A'} - ${dayData.closingTime || 'N/A'}`
//         };
//       });
//     };

//     const hours = formatHours();
//     if (!hours) return null;
    
//     return (
//       <div className="px-6 pb-6">
//         <h2 className="text-lg font-bold text-center text-gray-900 mb-4">BUSINESS HOURS</h2>
//         <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
//           <div className="flex items-center justify-center mb-4">
//             <FaRegClock className="w-5 h-5 text-blue-500 mr-2" />
//             <h3 className="text-lg font-bold text-gray-900">Working Hours</h3>
//           </div>
//           <div className="space-y-2">
//             {hours.map((hour, index) => (
//               <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                 <span className="font-medium text-gray-900">{hour.day.charAt(0).toUpperCase() + hour.day.slice(1)}</span>
//                 <span className="text-gray-600">{hour.display.split(': ')[1]}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Virtual Number Component
//   const renderVirtualNumber = () => {
//     if (!profileData.virtualNumber?.number || !profileData.virtualNumber?.isEnabled) return null;
    
//     return (
//       <div className="px-6 pb-4">
//         <h3 className="text-sm font-bold text-gray-700 mb-2 text-center">VIRTUAL NUMBER</h3>
//         <button
//           onClick={() => handleContact("virtualNumber", profileData.virtualNumber.number)}
//           className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 rounded-xl transition-all transform hover:scale-[1.02]"
//         >
//           {profileData.virtualNumber.number}
//         </button>
//       </div>
//     );
//   };

//   // Services/Products Overview Component
//   const renderServicesProductsOverview = () => {
//     if (!profileData.servicesProducts) return null;
    
//     return (
//       <div className="px-6 pb-6">
//         <h2 className="text-lg font-bold text-center text-gray-900 mb-4">SERVICES OVERVIEW</h2>
//         <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 max-w-md mx-auto">
//           <div className="flex items-center justify-center mb-3">
//             <FaSuitcase className="w-5 h-5 text-blue-500 mr-2" />
//             <h3 className="text-lg font-bold text-gray-900">What We Offer</h3>
//           </div>
//           <p className="text-gray-600 text-sm leading-relaxed text-center">
//             {profileData.servicesProducts}
//           </p>
//         </div>
//       </div>
//     );
//   };

//   // Brand Label Component
//   const renderBrandLabel = () => {
//     if (!profileData.brandLabel) return null;
    
//     return (
//       <div className="px-6 pb-6">
//         <h2 className="text-lg font-bold text-center text-gray-900 mb-4">BRAND LABEL</h2>
//         <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 text-white text-center max-w-md mx-auto">
//           <div className="flex items-center justify-center mb-3">
//             <FaTags className="w-5 h-5 text-white mr-2" />
//             <h3 className="text-lg font-bold">Our Brand</h3>
//           </div>
//           <p className="text-sm opacity-90">{profileData.brandLabel}</p>
//         </div>
//       </div>
//     );
//   };

//   // Product Video Component
//   const renderProductVideo = () => {
//     if (!profileData.productVideo?.url) return null;
    
//     return (
//       <div className="px-6 pb-6">
//         <h2 className="text-lg font-bold text-center text-gray-900 mb-4">PRODUCT VIDEO</h2>
//         <div className="bg-white rounded-2xl shadow-lg p-4 max-w-md mx-auto">
//           <div className="flex items-center justify-center mb-3">
//             <FaFileVideo className="w-5 h-5 text-purple-500 mr-2" />
//             <h3 className="text-lg font-bold text-gray-900">Product Showcase</h3>
//           </div>
//           <VideoPlayer
//             src={profileData.productVideo.url}
//             poster={profileData.productVideo.thumbnail}
//             title={profileData.productVideo.title || "Product Video"}
//             className="h-48 rounded-lg"
//           />
//         </div>
//       </div>
//     );
//   };

//   // Videos Slider Component
//   const renderVideosSlider = () => {
//     if (!profileData.videos?.length) return null;
    
//     return (
//       <div className="px-6 pb-6">
//         <h2 className="text-lg font-bold text-center text-gray-900 mb-4">VIDEOS</h2>
//         <div className="overflow-visible -mx-4 px-4">
//           <Slider {...BaseSliderSettings}>
//             {profileData.videos.map((video, i) => (
//               <div key={i} className="px-2">
//                 <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-md mx-auto">
//                   <VideoPlayer
//                     src={video.url}
//                     poster={video.thumbnail}
//                     title={video.title}
//                     className="h-48"
//                   />
//                   <div className="p-4">
//                     <h3 className="text-base font-bold text-gray-900">{video.title}</h3>
//                     {video.description && (
//                       <p className="text-sm text-gray-600 mt-2">{video.description}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>
//     );
//   };

//   // Gallery Component
//   const renderGallery = () => {
//     if (!profileData.gallery?.length) return null;
    
//     return (
//       <div className="px-6 pb-6">
//         <h2 className="text-lg font-bold text-center text-gray-900 mb-4">GALLERY</h2>
//         <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
//           {profileData.gallery.slice(0, 4).map((item, index) => (
//             <div key={index} className="aspect-square rounded-xl overflow-hidden shadow-md">
//               <img
//                 src={item.url}
//                 alt={item.title || `Gallery ${index + 1}`}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>
//         {profileData.gallery.length > 4 && (
//           <p className="text-center text-gray-500 text-sm mt-4">
//             +{profileData.gallery.length - 4} more images
//           </p>
//         )}
//       </div>
//     );
//   };

//   // Enhanced Client List Component
//   const renderEnhancedClientList = () => {
//     if (!profileData.clientList?.length) return null;
    
//     return (
//       <div className="px-6 pb-6">
//         <h2 className="text-lg font-bold text-center text-gray-900 mb-4">OUR CLIENTS</h2>
//         <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 max-w-md mx-auto">
//           <div className="flex items-center justify-center mb-4">
//             <FaUsers className="w-5 h-5 text-blue-500 mr-2" />
//             <h3 className="text-lg font-bold text-gray-900">Trusted By</h3>
//           </div>
//           <div className="grid grid-cols-2 gap-3">
//             {profileData.clientList.slice(0, 6).map((client, index) => (
//               <div key={index} className="bg-white rounded-lg p-3 text-center shadow-sm">
//                 <p className="text-sm font-medium text-gray-800 truncate">
//                   {typeof client === 'string' ? client : client.name || client.company || 'Client'}
//                 </p>
//               </div>
//             ))}
//           </div>
//           {profileData.clientList.length > 6 && (
//             <p className="text-center text-gray-500 text-sm mt-3">
//               +{profileData.clientList.length - 6} more clients
//             </p>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Downloads Component
//   const renderDownloads = () => {
//     if (!profileData.downloads?.length) return null;
    
//     return (
//       <div className="px-6 pb-6">
//         <h2 className="text-lg font-bold text-center text-gray-900 mb-4">DOWNLOADS</h2>
//         <div className="space-y-3 max-w-md mx-auto">
//           {profileData.downloads.map((download, index) => (
//             <button
//               key={index}
//               onClick={() => window.open(download.fileUrl, '_blank')}
//               className="w-full bg-white rounded-xl p-4 text-left hover:bg-gray-50 transition-colors shadow-md flex items-center justify-between"
//             >
//               <div className="flex items-center">
//                 <FaFilePdf className="w-6 h-6 text-red-500 mr-3" />
//                 <div>
//                   <p className="font-medium text-gray-900">{download.name}</p>
//                   {download.fileSize && (
//                     <p className="text-sm text-gray-500">{download.fileSize}</p>
//                   )}
//                 </div>
//               </div>
//               <FaDownload className="w-5 h-5 text-gray-400" />
//             </button>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // Interactive Elements Component
//   const renderInteractiveElements = () => {
//     if (!profileData.interactiveElements?.length) return null;
    
//     const getInteractiveIcon = (type) => {
//       switch (type) {
//         case 'call-to-action': return <FaCommentDots className="w-5 h-5" />;
//         case 'shop-flow': return <FaShoppingCart className="w-5 h-5" />;
//         case 'appointment-scheduler': return <FaClock className="w-5 h-5" />;
//         case 'digital-payments': return <FaFileInvoice className="w-5 h-5" />;
//         default: return <FaGlobe className="w-5 h-5" />;
//       }
//     };

//     const getInteractiveLabel = (type) => {
//       switch (type) {
//         case 'call-to-action': return 'Call to Action';
//         case 'shop-flow': return 'Shop Now';
//         case 'appointment-scheduler': return 'Book Appointment';
//         case 'digital-payments': return 'Make Payment';
//         default: return type.replace(/-/g, ' ');
//       }
//     };

//     return (
//       <div className="px-6 pb-6">
//         <h2 className="text-lg font-bold text-center text-gray-900 mb-4">QUICK ACTIONS</h2>
//         <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
//           {profileData.interactiveElements
//             .filter(element => element.isActive)
//             .map((element, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   const primaryPhone = profileData.phones.find(phone => phone.isPrimary) || profileData.phones[0];
//                   switch (element.type) {
//                     case 'call-to-action':
//                     case 'shop-flow':
//                       if (element.config?.redirectUrl) {
//                         window.open(element.config.redirectUrl, '_blank');
//                       }
//                       break;
//                     case 'live-chat':
//                       if (primaryPhone) handleContact("whatsapp", primaryPhone.number);
//                       break;
//                     default:
//                       break;
//                   }
//                 }}
//                 className="bg-white rounded-xl p-4 text-center hover:bg-gray-50 transition-colors shadow-md flex flex-col items-center justify-center"
//               >
//                 <div className="text-blue-500 mb-2">
//                   {getInteractiveIcon(element.type)}
//                 </div>
//                 <span className="text-sm font-medium text-gray-900">
//                   {getInteractiveLabel(element.type)}
//                 </span>
//               </button>
//             ))}
//         </div>
//       </div>
//     );
//   };

//   // Chat Assistant Component
//   const renderChatAssistant = () => {
//     if (!profileData.chatAssistant?.isEnabled) return null;
    
//     return (
//       <div className="px-6 pb-6">
//         <h2 className="text-lg font-bold text-center text-gray-900 mb-4">AI ASSISTANT</h2>
//         <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 text-white text-center max-w-md mx-auto">
//           <FaRobot className="w-10 h-10 text-white mx-auto mb-3" />
//           <p className="text-sm opacity-90 mb-4">{profileData.chatAssistant.welcomeMessage}</p>
//           <button className="bg-white text-purple-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors">
//             Start Chat
//           </button>
//         </div>
//       </div>
//     );
//   };

//   // Tagline Component
//   const renderTagline = () => {
//     if (!profileData.tagline) return null;
    
//     return (
//       <div className="px-6 pb-4">
//         <div className="relative rounded-full bg-gradient-to-r from-purple-100 to-blue-100 p-4 text-center max-w-md mx-auto">
//           <div className="absolute inset-0 rounded-full border-2 border-purple-200"></div>
//           <p className="relative text-purple-700 font-semibold text-sm italic">
//             "{profileData.tagline}"
//           </p>
//         </div>
//       </div>
//     );
//   };

//   // Organization Details Component
//   const renderOrganizationDetails = () => {
//     if (!profileData.organization && !profileData.foundedName) return null;
    
//     return (
//       <div className="px-6 pb-6">
//         <h2 className="text-lg font-bold text-center text-gray-900 mb-4">ORGANIZATION</h2>
//         <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
//           <div className="flex items-center justify-center mb-4">
//             <FaBuilding className="w-5 h-5 text-blue-500 mr-2" />
//             <h3 className="text-lg font-bold text-gray-900">Company Details</h3>
//           </div>
//           <div className="space-y-3">
//             {profileData.organization && (
//               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                 <span className="font-medium text-gray-900">Organization:</span>
//                 <span className="text-gray-600">{profileData.organization}</span>
//               </div>
//             )}
//             {profileData.foundedName && (
//               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                 <span className="font-medium text-gray-900">Founded By:</span>
//                 <span className="text-gray-600">{profileData.foundedName}</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Profile Video Component
//   const renderProfileVideo = () => {
//     if (!profileData.profileVideo?.url) return null;
    
//     return (
//       <div className="px-6 pb-6">
//         <h2 className="text-lg font-bold text-center text-gray-900 mb-4">INTRODUCTION VIDEO</h2>
//         <div className="bg-white rounded-2xl shadow-lg p-4 max-w-md mx-auto">
//           <VideoPlayer
//             src={profileData.profileVideo.url}
//             poster={profileData.profileVideo.thumbnail}
//             title={profileData.profileVideo.title || "Introduction Video"}
//             className="h-48 rounded-lg"
//           />
//           <div className="mt-4 text-center">
//             <h3 className="text-base font-bold text-gray-900">Meet {profileData.name}</h3>
//             <p className="text-sm text-gray-600 mt-1">Watch my introduction video</p>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex justify-center items-start py-8 px-4 relative overflow-hidden">
//       {/* Particle Animation Canvas */}
//       <canvas 
//         id="particle-canvas"
//         className="absolute inset-0 w-full h-full pointer-events-none"
//       />
      
//       {/* MAIN FIX: Remove fixed height and allow natural scrolling */}
//       <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md relative z-10">
        
//         {/* Header Banner with Gradient */}
//         <div className="relative h-48 bg-gradient-to-r from-purple-600 to-blue-500">
//           {/* Company Logo - DYNAMIC - Made Circular */}
//           <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2">
//             {profileData.companyLogo ? (
//               <img 
//                 src={profileData.companyLogo} 
//                 alt="Company Logo" 
//                 className="w-10 h-10 object-contain rounded-full" 
//               />
//             ) : (
//               <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-300 rounded-full flex items-center justify-center text-white font-bold text-sm">
//                 {profileData.companyName?.charAt(0) || "L"}
//               </div>
//             )}
//           </div>

//           {/* Company Name */}
//           {profileData.companyName && (
//             <div className="absolute top-4 left-24 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
//               {profileData.companyName}
//             </div>
//           )}

//           {/* Language Selector */}
//           <div className="absolute top-4 right-4">
//             <button className="bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
//               <span>🌐</span>
//               English
//             </button>
//           </div>

//           {/* Profile Image - DYNAMIC - Green Dot Removed */}
//           <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
//             <div className="relative">
//               {profileData.profilePhoto ? (
//                 <img
//                   src={profileData.profilePhoto}
//                   alt={profileData.name}
//                   className="w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover"
//                 />
//               ) : (
//                 <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl bg-gradient-to-r from-purple-400 to-blue-300 flex items-center justify-center text-white text-lg font-bold">
//                   {profileData.name?.charAt(0) || "U"}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Profile Content */}
//         <div className="pt-16 px-6 pb-6 text-center">
//           <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
//           <p className="text-blue-600 font-semibold mt-1">{profileData.jobTitle}</p>
          
//           {/* Department - DYNAMIC */}
//           {profileData.department && (
//             <p className="text-gray-600 text-sm mt-1">{profileData.department}</p>
//           )}

//           {/* Tagline */}
//           {renderTagline()}

//           {/* About Text - DYNAMIC */}
//           {profileData.aboutText && profileData.aboutText !== "." && (
//             <p className="text-gray-600 text-sm mt-4 leading-relaxed">
//               {profileData.aboutText}
//             </p>
//           )}

//           {/* Bio - DYNAMIC */}
//           {profileData.bio && (
//             <p className="text-gray-600 text-sm mt-4 leading-relaxed">
//               {profileData.bio}
//             </p>
//           )}

//           {/* Social Media Icons - DYNAMIC */}
//           {activeSocialIcons.length > 0 && (
//             <div className="flex justify-center gap-3 mt-6">
//               {activeSocialIcons.map((social, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleContact("default", social.url)}
//                   className={`w-12 h-12 rounded-xl bg-purple-100 text-[#311cb4] flex items-center justify-center transition-transform hover:scale-110 hover:bg-[#311cb4] hover:text-white`}
//                 >
//                   {social.icon}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Share Button */}
//         {renderShareButton()}

//         {/* Virtual Number */}
//         {renderVirtualNumber()}

//         {/* Profile Video */}
//         {renderProfileVideo()}

//         {/* Services/Products Overview */}
//         {renderServicesProductsOverview()}

//         {/* Brand Label */}
//         {renderBrandLabel()}

//         {/* Organization Details */}
//         {renderOrganizationDetails()}

//         {/* Services Section - DYNAMIC */}
//         {profileData.services.length > 0 && (
//           <div className="px-6 pb-6 bg-gradient-to-br from-purple-50 to-blue-50">
//             <h2 className="text-lg font-bold text-center text-[#311cb4] mb-4">MY SERVICES</h2>
//             <div className="overflow-visible -mx-4 px-4">
//               <Slider {...BaseSliderSettings}>
//                 {profileData.services.map((service, i) => (
//                   <div key={i} className="px-2">
//                     <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-md mx-auto border border-gray-100">
//                       {service.image && (
//                         <img
//                           src={service.image}
//                           alt={service.name}
//                           className="w-full h-40 object-cover"
//                         />
//                       )}
//                       <div className="p-4">
//                         <div className="flex justify-between items-start mb-2">
//                           <h3 className="text-base font-bold text-gray-900">{service.name}</h3>
//                           {service.price && (
//                             <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
//                               {service.price}
//                             </span>
//                           )}
//                         </div>
//                         {service.description && (
//                           <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </Slider>
//             </div>  
//           </div>
//         )}

//         {/* Products Section - DYNAMIC */}
//         {profileData.products.length > 0 && (
//           <div className="px-6 pb-6 bg-white">
//             <h2 className="text-lg font-bold text-center text-gray-900 mb-4">PRODUCTS</h2>
//             <div className="overflow-visible -mx-4 px-4">
//               <Slider {...sliderSettingsNoDots}>
//                 {profileData.products.map((product, i) => (
//                   <div key={i} className="px-2">
//                     <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden max-w-md mx-auto border border-gray-100">
//                       {/* Price Tag - DYNAMIC */}
//                       {product.price && (
//                         <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-lg z-10 shadow">
//                           {product.price}
//                         </div>
//                       )}
                      
//                       {/* Stock Status - DYNAMIC */}
//                       {product.inStock !== undefined && (
//                         <div className={`absolute top-4 left-4 text-xs font-bold px-2 py-1 rounded-full z-10 ${
//                           product.inStock 
//                             ? "bg-green-100 text-green-800" 
//                             : "bg-red-100 text-red-800"
//                         }`}>
//                           {product.inStock ? "In Stock" : "Out of Stock"}
//                         </div>
//                       )}
                      
//                       {product.image && (
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="w-full h-32 object-cover"
//                         />
//                       )}
//                       <div className="p-4">
//                         <h3 className="text-base font-bold text-gray-900 mb-1">{product.name}</h3>
//                         {product.description && (
//                           <p className="text-sm text-gray-600">{product.description}</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </Slider>
//               <div className="flex justify-center mt-5">
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors">
//                   View All Products
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Product Video */}
//         {renderProductVideo()}

//         {/* Videos Slider */}
//         {renderVideosSlider()}

//         {/* Gallery */}
//         {renderGallery()}

//         {/* Testimonials Component */}
//         {profileData.testimonials && profileData.testimonials.length > 0 && (
//           <div className="px-6 pb-6 bg-gradient-to-br from-blue-50 to-purple-50">
//             <h2 className="text-lg font-bold text-center text-[#311cb4] mb-4">TESTIMONIALS</h2>
//             <div className="overflow-visible -mx-4 px-4">
//               <Slider {...BaseSliderSettings}>
//                 {profileData.testimonials.map((testimonial, i) => (
//                   <div key={i} className="px-2">
//                     <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-md mx-auto border border-gray-100 p-6">
//                       <div className="flex items-center mb-4">
//                         <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-blue-300 flex items-center justify-center text-white font-bold mr-4">
//                           {testimonial.clientName?.charAt(0) || "C"}
//                         </div>
//                         <div>
//                           <h3 className="font-bold text-gray-900">{testimonial.clientName}</h3>
//                           {testimonial.company && (
//                             <p className="text-sm text-gray-600">{testimonial.company}</p>
//                           )}
//                         </div>
//                       </div>
//                       <div className="flex mb-3">
//                         {Array.from({ length: 5 }, (_, i) => (
//                           <FaStar
//                             key={i}
//                             className={`w-4 h-4 ${i < (testimonial.rating || 5) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//                           />
//                         ))}
//                       </div>
//                       <p className="text-gray-600 text-sm leading-relaxed italic">
//                         "{testimonial.testimonial}"
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </Slider>
//             </div>
//           </div>
//         )}

//         {/* Enhanced Client List */}
//         {renderEnhancedClientList()}

//         {/* Downloads */}
//         {renderDownloads()}

//         {/* Interactive Elements */}
//         {renderInteractiveElements()}

//         {/* Chat Assistant */}
//         {renderChatAssistant()}

//         {/* Business Hours */}
//         {renderBusinessHours()}

//         {/* NFC Card Component */}
//         {profileData.nfcSettings?.isEnabled && (
//           <div className="px-6 pb-6">
//             <h2 className="text-lg font-bold text-center text-gray-900 mb-4">NFC CARD</h2>
//             <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-lg p-6 text-center max-w-md mx-auto text-white">
//               <FaIdCard className="w-12 h-12 text-white mx-auto mb-4" />
//               <h3 className="text-lg font-bold mb-2">NFC Enabled Card</h3>
//               <p className="text-sm opacity-90 mb-4">Tap your NFC-enabled device to connect instantly</p>
//               <div className="bg-white/20 rounded-lg p-3 inline-block">
//                 <p className="text-sm font-semibold">Tap to Connect</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* QR Code Component */}
//         {profileData.dynamicQRCode?.targetUrl && (
//           <div className="px-6 pb-6">
//             <h2 className="text-lg font-bold text-center text-gray-900 mb-4">SCAN TO CONNECT</h2>
//             <div className="bg-white rounded-2xl shadow-lg p-6 text-center max-w-md mx-auto">
//               <FaQrcode className="w-12 h-12 text-blue-500 mx-auto mb-4" />
//               <div className="flex justify-center mb-4">
//                 {profileData.dynamicQRCode.qrImage ? (
//                   <img
//                     src={profileData.dynamicQRCode.qrImage}
//                     alt="QR Code"
//                     className="w-32 h-32 object-contain"
//                   />
//                 ) : (
//                   <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
//                     <span className="text-gray-400 text-sm">QR Code</span>
//                   </div>
//                 )}
//               </div>
//               <p className="text-gray-600 text-sm">Scan this QR code to save my contact info</p>
//             </div>
//           </div>
//         )}

//         {/* Catalog PDF Component */}
//         {profileData.catalog && (
//           <div className="px-6 pb-6">
//             <h2 className="text-lg font-bold text-center text-gray-900 mb-4">CATALOG</h2>
//             <div className="bg-white rounded-2xl shadow-lg p-6 text-center max-w-md mx-auto">
//               <FaFilePdf className="w-12 h-12 text-red-500 mx-auto mb-4" />
//               <h3 className="text-lg font-bold text-gray-900 mb-2">Download Our Catalog</h3>
//               <p className="text-gray-600 text-sm mb-4">Get our complete product catalog in PDF format</p>
//               <button
//                 onClick={() => window.open(profileData.catalog, '_blank')}
//                 className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors flex items-center justify-center mx-auto gap-2"
//               >
//                 <FaDownload className="w-5 h-5" />
//                 Download PDF
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Contact Section - MOVED TO BOTTOM */}
//         {(primaryEmail?.address || profileData.phones.length > 0 || primaryAddress) && (
//           <div className="px-6 pb-6 bg-gray-50">
//             <h2 className="text-lg font-bold text-center text-gray-900 mb-4">CONTACT ME</h2>
            
//             <div className="space-y-4">
//               {primaryEmail?.address && (
//                 <button
//                   onClick={() => handleContact("email", primaryEmail.address)}
//                   className="bg-white rounded-xl p-4 w-full text-left hover:bg-gray-50 transition-colors"
//                 >
//                   <p className="text-sm text-gray-600 font-semibold flex items-center gap-2">
//                     <FaEnvelope className="w-4 h-4" />
//                     EMAIL
//                   </p>
//                   <p className="text-gray-900 font-medium">{primaryEmail.address}</p>
//                 </button>
//               )}

//               {profileData.phones.map((phone, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleContact("phone", phone.number)}
//                   className="bg-white rounded-xl p-4 w-full text-left hover:bg-gray-50 transition-colors"
//                 >
//                   <p className="text-sm text-gray-600 font-semibold flex items-center gap-2">
//                     <FaPhone className="w-4 h-4" />
//                     {phone.label ? phone.label.toUpperCase() : "PHONE NUMBER"}
//                   </p>
//                   <p className="text-gray-900 font-medium">{phone.number}</p>
//                 </button>
//               ))}

//               {primaryAddress && (
//                 <button
//                   onClick={() => handleContact("map", primaryAddress.googleMapsLink)}
//                   className="bg-white rounded-xl p-4 w-full text-left hover:bg-gray-50 transition-colors"
//                 >
//                   <p className="text-sm text-gray-600 font-semibold flex items-center gap-2">
//                     <FaMapMarkerAlt className="w-4 h-4" />
//                     OFFICE ADDRESS
//                   </p>
//                   <p className="text-gray-900 font-medium">
//                     {primaryAddress.fullAddress || `${primaryAddress.street}, ${primaryAddress.city}`}
//                   </p>
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Call to Action */}
//         <div className="bg-gray-900 text-white text-center py-6 px-6">
//           <h3 className="text-xl font-bold mb-2">Let's Work Together!</h3>
//           <p className="text-gray-300 text-sm mb-4">
//             Ready to start your next project? Let's discuss how I can help you achieve your goals.
//           </p>
//           <button 
//             onClick={() => handleContact("email", primaryEmail?.address || profileData.email)}
//             className="bg-white text-gray-900 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors w-full"
//           >
//             Get In Touch
//           </button>
//         </div>
//       </div>

//       <style>
//         {`
//           .slick-dots li.slick-active div {
//             background-color: #6953f3ff;
//             width: 30px;
//             border-radius: 9999px;
//           }
          
//           #particle-canvas {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             z-index: 0;
//           }

//           /* Ensure body allows scrolling */
//           body {
//             overflow-y: auto;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default DefaultCard;


import React, { useEffect } from "react";
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
  FaUser,
  FaBriefcase,
  FaBuilding,
  FaFilePdf,
  FaDownload,
  FaQrcode,
  FaIdCard,
  FaVideo,
  FaImages,
  FaShoppingCart,
  FaGem,
  FaShare,
  FaFileInvoice,
  FaFileVideo,
  FaRobot,
  FaCommentDots,
  FaRegClock,
  FaSuitcase,
  FaTags,
  FaUsers
} from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";

// Video player component
const VideoPlayer = ({ src, poster, title, className = "" }) => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  
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
          <p className="text-sm text-white">{title}</p>
        </div>
      )}
    </div>
  );
};

// RECEIVE DATA VIA PROPS instead of useLocation
const DefaultCard = ({ cardData = {} }) => {
  console.log('🎯 DefaultCard received data:', cardData); // Debug log

  // Build complete profileData from cardData WITH ALL FIELDS
  const profileData = {
    // Personal Info
    prefix: cardData?.prefix || "",
    firstName: cardData?.firstName || "",
    lastName: cardData?.lastName || "",
    suffix: cardData?.suffix || "",
    name: `${cardData?.prefix || ""} ${cardData?.firstName || ""} ${cardData?.lastName || ""}`.trim() || "Your Name",
    jobTitle: cardData?.jobTitle || "Professional",
    bio: cardData?.bio || "A short bio about yourself that appears below your title.",
    aboutText: cardData?.aboutText || ".",
    tagline: cardData?.tagline || "",
    
    // Professional Info
    companyName: cardData?.companyName || "",
    department: cardData?.department || "",
    organization: cardData?.organization || "",
    foundedName: cardData?.foundedName || "",
    
    // Contact Info
    email: cardData?.email || "",
    emails: cardData?.emails || [{ address: cardData?.email || "", label: "primary", isPrimary: true }],
    phones: cardData?.phones || [],
    addresses: cardData?.addresses || [],
    websites: cardData?.websites || [],
    virtualNumber: cardData?.virtualNumber || { number: "", isEnabled: false },
    
    // Business Hours
    businessHours: cardData?.businessHours || [],
    
    // Profile Content
    profileVideo: cardData?.profileVideo || null,
    productVideo: cardData?.productVideo || null,
    videos: cardData?.videos || [],
    servicesProducts: cardData?.servicesProducts || "",
    
    // Catalog
    catalog: cardData?.catalog || cardData?.catalogPDF || "",
    catalogPDF: cardData?.catalogPDF || "",
    
    // Images
    profilePhoto: cardData?.profilePhoto,
    companyLogo: cardData?.companyLogo,
    
    // Services & Products
    services: cardData?.services || [],
    products: cardData?.products || [],
    
    // Social Links
    socialLinks: cardData?.socialLinks || [],
    
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
    
    // NFC Settings
    nfcSettings: cardData?.nfcSettings || { isEnabled: false },
    
    // Chat Features
    chatAssistant: cardData?.chatAssistant || { isEnabled: false, welcomeMessage: "Hello! How can I help you today?" },
    liveChat: cardData?.liveChat || { isEnabled: false, platform: "whatsapp", phoneNumber: "" },
    
    // Plan Info
    cardType: cardData?.cardType || 'Personal',
    
    // Settings
    enableOneTapCall: cardData?.enableOneTapCall !== undefined ? cardData.enableOneTapCall : true,
    enableWhatsApp: cardData?.enableWhatsApp !== undefined ? cardData.enableWhatsApp : true,
    enableEmail: cardData?.enableEmail !== undefined ? cardData.enableEmail : true
  };

  console.log('🎯 Profile data built:', profileData); // Debug log

  // Get primary contact info
  const primaryPhone = profileData.phones.find(phone => phone.isPrimary) || profileData.phones[0];
  const primaryEmail = profileData.emails.find(email => email.isPrimary) || profileData.emails[0];
  const primaryAddress = profileData.addresses.find(addr => addr.isPrimary) || profileData.addresses[0];

  // Particle Animation Effect - Faster and Larger
  useEffect(() => {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class with larger and faster particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `rgba(105, 83, 243, ${Math.random() * 0.5 + 0.3})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }

        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowColor = 'rgba(105, 83, 243, 0.8)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Create more particles
    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(105, 83, 243, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = 'rgba(105, 83, 243, 0.3)';
      ctx.shadowBlur = 5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const opacity = 1 - (distance / 200);
            ctx.strokeStyle = `rgba(105, 83, 243, ${opacity * 0.3})`;
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const BaseSliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    centerMode: true,
    centerPadding: "40px", 
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "20px",
          slidesToShow: 1,
        },
      },
    ],
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center gap-1 mt-4">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
    ),
    dotsClass: "slick-dots",
  };

  const sliderSettingsNoDots = {
    dots: false,
    infinite: true,
    speed: 500,
    centerMode: true,
    centerPadding: "10px",
    slidesToShow: 1.5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "20px",
          slidesToShow: 1.5,
        },
      },
    ],
  };

  // Social media configuration
  const socialMediaConfig = {
    linkedin: { icon: <FaLinkedinIn className="w-4 h-4" />, color: "text-[#311cb4]" },
    twitter: { icon: <FaXTwitter className="w-4 h-4" />, color: "text-[#311cb4]" },
    facebook: { icon: <FaFacebookF className="w-4 h-4" />, color: "text-[#311cb4]" },
    instagram: { icon: <FaInstagram className="w-4 h-4" />, color: "text-[#311cb4]" },
    youtube: { icon: <FaYoutube className="w-4 h-4" />, color: "text-[#311cb4]" },
    whatsapp: { icon: <FaWhatsapp className="w-4 h-4" />, color: "text-[#311cb4]" },
    telegram: { icon: <FaTelegramPlane className="w-4 h-4" />, color: "text-[#311cb4]" },
    website: { icon: <FaGlobe className="w-4 h-4" />, color: "text-[#311cb4]" }
  };

  // Get active social icons from dynamic data
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

  // UPDATED: Share functionality with better URL handling
  const handleShare = () => {
    // Use shareable URL or generate one
    let shareUrl = profileData.shareableUrl;
    
    // If no shareable URL or it's an invalid API URL, create a fallback
    if (!shareUrl || shareUrl.includes('api.revayahone.com') || shareUrl === 'https://api.revayahone.com') {
      // Create a temporary share URL based on the current page
      shareUrl = window.location.origin + window.location.pathname;
      
      // If we're in development/localhost, create a simpler URL
      if (shareUrl.includes('localhost')) {
        // Create a preview URL - just show the domain and name
        const previewUrl = `https://revayahone.com/preview/${profileData.firstName}-${profileData.lastName || 'card'}`;
        shareUrl = previewUrl;
      }
    }
    
    const shareText = `Check out ${profileData.name}'s digital card`;
    const shareTitle = `${profileData.name}'s Digital Card`;
    
    // For mobile devices with share API
    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      }).catch(err => {
        console.log('Share failed:', err);
        fallbackShare(shareUrl, shareText);
      });
    } else {
      fallbackShare(shareUrl, shareText);
    }
  };

  // Fallback share function
  const fallbackShare = (url, text) => {
    navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
      alert('Link copied to clipboard! You can now paste and share it.');
    }).catch(() => {
      // Last resort fallback - show the URL in a prompt
      prompt('Copy this link to share:', `${text}\n${url}`);
    });
  };

  // ========== UPDATED COMPONENTS ==========

  // Share Button Component
  const renderShareButton = () => {
    if (!profileData.shareableUrl && !profileData.name) return null;
    
    return (
      <div className="px-6 pb-4">
        <button
          onClick={handleShare}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-3 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <FaShare className="w-5 h-5" />
          Share My Card
        </button>
        <p className="text-center text-gray-500 text-xs mt-2">
          Share link: revayahone.com/preview/{profileData.firstName?.toLowerCase() || 'name'}
        </p>
      </div>
    );
  };

  // UPDATED: Business Hours Component - Only shows for Business cards with valid hours
  const renderBusinessHours = () => {
    // Only show if:
    // 1. The card is a business card (not personal)
    // 2. Business hours data exists and is not empty
    // 3. The user has specifically provided business hours
    if (profileData.cardType !== 'Business' || 
        !profileData.businessHours || 
        profileData.businessHours.length === 0) {
      return null;
    }
    
    // Filter out empty/closed hours
    const validHours = profileData.businessHours.filter(hour => 
      hour && (!hour.isClosed) && (hour.openingTime || hour.closingTime)
    );
    
    if (validHours.length === 0) return null;
    
    const formatHours = () => {
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      return days.map(day => {
        const dayData = validHours.find(h => h.day === day);
        if (!dayData || dayData.isClosed || (!dayData.openingTime && !dayData.closingTime)) {
          return { day, display: `${day.charAt(0).toUpperCase() + day.slice(1)}: Closed` };
        }
        return { 
          day, 
          display: `${day.charAt(0).toUpperCase() + day.slice(1)}: ${dayData.openingTime || 'N/A'} - ${dayData.closingTime || 'N/A'}`
        };
      });
    };

    const hours = formatHours();
    if (!hours || hours.length === 0) return null;
    
    return (
      <div className="px-6 pb-6">
        <h2 className="text-lg font-bold text-center text-gray-900 mb-4">BUSINESS HOURS</h2>
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
          <div className="flex items-center justify-center mb-4">
            <FaRegClock className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-bold text-gray-900">Working Hours</h3>
          </div>
          <div className="space-y-2">
            {hours.map((hour, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{hour.day.charAt(0).toUpperCase() + hour.day.slice(1)}</span>
                <span className="text-gray-600">{hour.display.split(': ')[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Virtual Number Component
  const renderVirtualNumber = () => {
    if (!profileData.virtualNumber?.number || !profileData.virtualNumber?.isEnabled) return null;
    
    return (
      <div className="px-6 pb-4">
        <h3 className="text-sm font-bold text-gray-700 mb-2 text-center">VIRTUAL NUMBER</h3>
        <button
          onClick={() => handleContact("virtualNumber", profileData.virtualNumber.number)}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 rounded-xl transition-all transform hover:scale-[1.02]"
        >
          {profileData.virtualNumber.number}
        </button>
      </div>
    );
  };

  // Services/Products Overview Component
  const renderServicesProductsOverview = () => {
    if (!profileData.servicesProducts) return null;
    
    return (
      <div className="px-6 pb-6">
        <h2 className="text-lg font-bold text-center text-gray-900 mb-4">SERVICES OVERVIEW</h2>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 max-w-md mx-auto">
          <div className="flex items-center justify-center mb-3">
            <FaSuitcase className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-bold text-gray-900">What We Offer</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed text-center">
            {profileData.servicesProducts}
          </p>
        </div>
      </div>
    );
  };

  // Brand Label Component
  const renderBrandLabel = () => {
    if (!profileData.brandLabel) return null;
    
    return (
      <div className="px-6 pb-6">
        <h2 className="text-lg font-bold text-center text-gray-900 mb-4">BRAND LABEL</h2>
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 text-white text-center max-w-md mx-auto">
          <div className="flex items-center justify-center mb-3">
            <FaTags className="w-5 h-5 text-white mr-2" />
            <h3 className="text-lg font-bold">Our Brand</h3>
          </div>
          <p className="text-sm opacity-90">{profileData.brandLabel}</p>
        </div>
      </div>
    );
  };

  // Product Video Component
  const renderProductVideo = () => {
    if (!profileData.productVideo?.url) return null;
    
    return (
      <div className="px-6 pb-6">
        <h2 className="text-lg font-bold text-center text-gray-900 mb-4">PRODUCT VIDEO</h2>
        <div className="bg-white rounded-2xl shadow-lg p-4 max-w-md mx-auto">
          <div className="flex items-center justify-center mb-3">
            <FaFileVideo className="w-5 h-5 text-purple-500 mr-2" />
            <h3 className="text-lg font-bold text-gray-900">Product Showcase</h3>
          </div>
          <VideoPlayer
            src={profileData.productVideo.url}
            poster={profileData.productVideo.thumbnail}
            title={profileData.productVideo.title || "Product Video"}
            className="h-48 rounded-lg"
          />
        </div>
      </div>
    );
  };

  // Videos Slider Component
  const renderVideosSlider = () => {
    if (!profileData.videos?.length) return null;
    
    return (
      <div className="px-6 pb-6">
        <h2 className="text-lg font-bold text-center text-gray-900 mb-4">VIDEOS</h2>
        <div className="overflow-visible -mx-4 px-4">
          <Slider {...BaseSliderSettings}>
            {profileData.videos.map((video, i) => (
              <div key={i} className="px-2">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-md mx-auto">
                  <VideoPlayer
                    src={video.url}
                    poster={video.thumbnail}
                    title={video.title}
                    className="h-48"
                  />
                  <div className="p-4">
                    <h3 className="text-base font-bold text-gray-900">{video.title}</h3>
                    {video.description && (
                      <p className="text-sm text-gray-600 mt-2">{video.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  };

  // Gallery Component
  const renderGallery = () => {
    if (!profileData.gallery?.length) return null;
    
    return (
      <div className="px-6 pb-6">
        <h2 className="text-lg font-bold text-center text-gray-900 mb-4">GALLERY</h2>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {profileData.gallery.slice(0, 4).map((item, index) => (
            <div key={index} className="aspect-square rounded-xl overflow-hidden shadow-md">
              <img
                src={item.url}
                alt={item.title || `Gallery ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        {profileData.gallery.length > 4 && (
          <p className="text-center text-gray-500 text-sm mt-4">
            +{profileData.gallery.length - 4} more images
          </p>
        )}
      </div>
    );
  };

  // Enhanced Client List Component
  const renderEnhancedClientList = () => {
    if (!profileData.clientList?.length) return null;
    
    return (
      <div className="px-6 pb-6">
        <h2 className="text-lg font-bold text-center text-gray-900 mb-4">OUR CLIENTS</h2>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 max-w-md mx-auto">
          <div className="flex items-center justify-center mb-4">
            <FaUsers className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-bold text-gray-900">Trusted By</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {profileData.clientList.slice(0, 6).map((client, index) => (
              <div key={index} className="bg-white rounded-lg p-3 text-center shadow-sm">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {typeof client === 'string' ? client : client.name || client.company || 'Client'}
                </p>
              </div>
            ))}
          </div>
          {profileData.clientList.length > 6 && (
            <p className="text-center text-gray-500 text-sm mt-3">
              +{profileData.clientList.length - 6} more clients
            </p>
          )}
        </div>
      </div>
    );
  };

  // Downloads Component
  const renderDownloads = () => {
    if (!profileData.downloads?.length) return null;
    
    return (
      <div className="px-6 pb-6">
        <h2 className="text-lg font-bold text-center text-gray-900 mb-4">DOWNLOADS</h2>
        <div className="space-y-3 max-w-md mx-auto">
          {profileData.downloads.map((download, index) => (
            <button
              key={index}
              onClick={() => window.open(download.fileUrl, '_blank')}
              className="w-full bg-white rounded-xl p-4 text-left hover:bg-gray-50 transition-colors shadow-md flex items-center justify-between"
            >
              <div className="flex items-center">
                <FaFilePdf className="w-6 h-6 text-red-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{download.name}</p>
                  {download.fileSize && (
                    <p className="text-sm text-gray-500">{download.fileSize}</p>
                  )}
                </div>
              </div>
              <FaDownload className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Interactive Elements Component
  const renderInteractiveElements = () => {
    if (!profileData.interactiveElements?.length) return null;
    
    const getInteractiveIcon = (type) => {
      switch (type) {
        case 'call-to-action': return <FaCommentDots className="w-5 h-5" />;
        case 'shop-flow': return <FaShoppingCart className="w-5 h-5" />;
        case 'appointment-scheduler': return <FaClock className="w-5 h-5" />;
        case 'digital-payments': return <FaFileInvoice className="w-5 h-5" />;
        default: return <FaGlobe className="w-5 h-5" />;
      }
    };

    const getInteractiveLabel = (type) => {
      switch (type) {
        case 'call-to-action': return 'Call to Action';
        case 'shop-flow': return 'Shop Now';
        case 'appointment-scheduler': return 'Book Appointment';
        case 'digital-payments': return 'Make Payment';
        default: return type.replace(/-/g, ' ');
      }
    };

    return (
      <div className="px-6 pb-6">
        <h2 className="text-lg font-bold text-center text-gray-900 mb-4">QUICK ACTIONS</h2>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {profileData.interactiveElements
            .filter(element => element.isActive)
            .map((element, index) => (
              <button
                key={index}
                onClick={() => {
                  const primaryPhone = profileData.phones.find(phone => phone.isPrimary) || profileData.phones[0];
                  switch (element.type) {
                    case 'call-to-action':
                    case 'shop-flow':
                      if (element.config?.redirectUrl) {
                        window.open(element.config.redirectUrl, '_blank');
                      }
                      break;
                    case 'live-chat':
                      if (primaryPhone) handleContact("whatsapp", primaryPhone.number);
                      break;
                    default:
                      break;
                  }
                }}
                className="bg-white rounded-xl p-4 text-center hover:bg-gray-50 transition-colors shadow-md flex flex-col items-center justify-center"
              >
                <div className="text-blue-500 mb-2">
                  {getInteractiveIcon(element.type)}
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {getInteractiveLabel(element.type)}
                </span>
              </button>
            ))}
        </div>
      </div>
    );
  };

  // Chat Assistant Component
  const renderChatAssistant = () => {
    if (!profileData.chatAssistant?.isEnabled) return null;
    
    return (
      <div className="px-6 pb-6">
        <h2 className="text-lg font-bold text-center text-gray-900 mb-4">AI ASSISTANT</h2>
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 text-white text-center max-w-md mx-auto">
          <FaRobot className="w-10 h-10 text-white mx-auto mb-3" />
          <p className="text-sm opacity-90 mb-4">{profileData.chatAssistant.welcomeMessage}</p>
          <button className="bg-white text-purple-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors">
            Start Chat
          </button>
        </div>
      </div>
    );
  };

  // Tagline Component
  const renderTagline = () => {
    if (!profileData.tagline) return null;
    
    return (
      <div className="px-6 pb-4">
        <div className="relative rounded-full bg-gradient-to-r from-purple-100 to-blue-100 p-4 text-center max-w-md mx-auto">
          <div className="absolute inset-0 rounded-full border-2 border-purple-200"></div>
          <p className="relative text-purple-700 font-semibold text-sm italic">
            "{profileData.tagline}"
          </p>
        </div>
      </div>
    );
  };

  // Organization Details Component
  const renderOrganizationDetails = () => {
    if (!profileData.organization && !profileData.foundedName) return null;
    
    return (
      <div className="px-6 pb-6">
        <h2 className="text-lg font-bold text-center text-gray-900 mb-4">ORGANIZATION</h2>
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
          <div className="flex items-center justify-center mb-4">
            <FaBuilding className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-bold text-gray-900">Company Details</h3>
          </div>
          <div className="space-y-3">
            {profileData.organization && (
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Organization:</span>
                <span className="text-gray-600">{profileData.organization}</span>
              </div>
            )}
            {profileData.foundedName && (
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Founded By:</span>
                <span className="text-gray-600">{profileData.foundedName}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Profile Video Component
  const renderProfileVideo = () => {
    if (!profileData.profileVideo?.url) return null;
    
    return (
      <div className="px-6 pb-6">
        <h2 className="text-lg font-bold text-center text-gray-900 mb-4">INTRODUCTION VIDEO</h2>
        <div className="bg-white rounded-2xl shadow-lg p-4 max-w-md mx-auto">
          <VideoPlayer
            src={profileData.profileVideo.url}
            poster={profileData.profileVideo.thumbnail}
            title={profileData.profileVideo.title || "Introduction Video"}
            className="h-48 rounded-lg"
          />
          <div className="mt-4 text-center">
            <h3 className="text-base font-bold text-gray-900">Meet {profileData.name}</h3>
            <p className="text-sm text-gray-600 mt-1">Watch my introduction video</p>
          </div>
        </div>
      </div>
    );
  };

  // UPDATED: QR Code Component with better fallback handling
  const renderQRCode = () => {
    if (!profileData.dynamicQRCode?.targetUrl) return null;
    
    // Function to generate QR code URL that works everywhere
    const generateQRCodeUrl = (targetUrl) => {
      // If we have a pre-generated QR image, use it
      if (profileData.dynamicQRCode.qrImage && 
          !profileData.dynamicQRCode.qrImage.includes('api.revayahone.com')) {
        return profileData.dynamicQRCode.qrImage;
      }
      
      // For revayahone.com URLs, use a simple preview
      if (targetUrl.includes('revayahone.com')) {
        const encodedUrl = encodeURIComponent(targetUrl);
        // Use a reliable free QR code API
        return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUrl}&format=png&margin=10`;
      }
      
      // For any other URLs
      const encodedUrl = encodeURIComponent(targetUrl);
      return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUrl}`;
    };
    
    const qrImageUrl = generateQRCodeUrl(profileData.dynamicQRCode.targetUrl);
    const displayUrl = profileData.dynamicQRCode.targetUrl
      .replace('https://api.revayahone.com', 'revayahone.com')
      .replace('api.', '');
    
    return (
      <div className="px-6 pb-6">
        <h2 className="text-lg font-bold text-center text-gray-900 mb-4">SCAN TO CONNECT</h2>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center max-w-md mx-auto">
          <FaQrcode className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <div className="flex justify-center mb-4">
            <img
              src={qrImageUrl}
              alt="QR Code"
              className="w-32 h-32 object-contain border border-gray-200 rounded-lg"
              onError={(e) => {
                // Fallback if QR code fails to load
                console.error('QR code failed to load');
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `
                  <div class="w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center flex-col">
                    <div class="text-gray-400 text-sm mb-2">QR Code</div>
                    <div class="text-blue-500 font-bold text-lg">${profileData.firstName?.charAt(0) || 'R'}</div>
                    <div class="text-xs text-gray-500 mt-1">revayahone.com</div>
                  </div>
                `;
              }}
            />
          </div>
          <p className="text-gray-600 text-sm mb-2">Scan to save contact info</p>
          <div className="bg-gray-50 rounded-lg p-3 mt-2">
            <p className="text-gray-700 text-xs font-medium">Preview URL:</p>
            <p className="text-blue-500 text-sm truncate">{displayUrl}</p>
            <p className="text-gray-400 text-xs mt-1">
              Name: <span className="font-medium">{profileData.name}</span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Mobile container class based on screen size
  const mobileContainerClass = "mobile-container";

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex justify-center items-start py-8 px-4 relative overflow-hidden ${mobileContainerClass}`}>
      {/* Particle Animation Canvas */}
      <canvas 
        id="particle-canvas"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      
      {/* Mobile container styling applied here */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md relative z-10">
        
        {/* Header Banner with Gradient */}
        <div className="relative h-48 bg-gradient-to-r from-purple-600 to-blue-500">
          {/* Company Logo - DYNAMIC - Made Circular */}
          <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2">
            {profileData.companyLogo ? (
              <img 
                src={profileData.companyLogo} 
                alt="Company Logo" 
                className="w-10 h-10 object-contain rounded-full" 
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-300 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {profileData.companyName?.charAt(0) || "L"}
              </div>
            )}
          </div>

          {/* Company Name */}
          {profileData.companyName && (
            <div className="absolute top-4 left-24 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              {profileData.companyName}
            </div>
          )}

          {/* Language Selector */}
          <div className="absolute top-4 right-4">
            <button className="bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
              <span>🌐</span>
              English
            </button>
          </div>

          {/* Profile Image - DYNAMIC - Green Dot Removed */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              {profileData.profilePhoto ? (
                <img
                  src={profileData.profilePhoto}
                  alt={profileData.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl bg-gradient-to-r from-purple-400 to-blue-300 flex items-center justify-center text-white text-lg font-bold">
                  {profileData.name?.charAt(0) || "U"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-16 px-6 pb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
          <p className="text-blue-600 font-semibold mt-1">{profileData.jobTitle}</p>
          
          {/* Department - DYNAMIC */}
          {profileData.department && (
            <p className="text-gray-600 text-sm mt-1">{profileData.department}</p>
          )}

          {/* Tagline */}
          {renderTagline()}

          {/* About Text - DYNAMIC */}
          {profileData.aboutText && profileData.aboutText !== "." && (
            <p className="text-gray-600 text-sm mt-4 leading-relaxed">
              {profileData.aboutText}
            </p>
          )}

          {/* Bio - DYNAMIC */}
          {profileData.bio && (
            <p className="text-gray-600 text-sm mt-4 leading-relaxed">
              {profileData.bio}
            </p>
          )}

          {/* Social Media Icons - DYNAMIC */}
          {activeSocialIcons.length > 0 && (
            <div className="flex justify-center gap-3 mt-6">
              {activeSocialIcons.map((social, index) => (
                <button
                  key={index}
                  onClick={() => handleContact("default", social.url)}
                  className={`w-12 h-12 rounded-xl bg-purple-100 text-[#311cb4] flex items-center justify-center transition-transform hover:scale-110 hover:bg-[#311cb4] hover:text-white`}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Share Button */}
        {renderShareButton()}

        {/* Virtual Number */}
        {renderVirtualNumber()}

        {/* Profile Video */}
        {renderProfileVideo()}

        {/* Services/Products Overview */}
        {renderServicesProductsOverview()}

        {/* Brand Label */}
        {renderBrandLabel()}

        {/* Organization Details */}
        {renderOrganizationDetails()}

        {/* Services Section - DYNAMIC */}
        {profileData.services.length > 0 && (
          <div className="px-6 pb-6 bg-gradient-to-br from-purple-50 to-blue-50">
            <h2 className="text-lg font-bold text-center text-[#311cb4] mb-4">MY SERVICES</h2>
            <div className="overflow-visible -mx-4 px-4">
              <Slider {...BaseSliderSettings}>
                {profileData.services.map((service, i) => (
                  <div key={i} className="px-2">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-md mx-auto border border-gray-100">
                      {service.image && (
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-40 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-base font-bold text-gray-900">{service.name}</h3>
                          {service.price && (
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                              {service.price}
                            </span>
                          )}
                        </div>
                        {service.description && (
                          <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>  
          </div>
        )}

        {/* Products Section - DYNAMIC */}
        {profileData.products.length > 0 && (
          <div className="px-6 pb-6 bg-white">
            <h2 className="text-lg font-bold text-center text-gray-900 mb-4">PRODUCTS</h2>
            <div className="overflow-visible -mx-4 px-4">
              <Slider {...sliderSettingsNoDots}>
                {profileData.products.map((product, i) => (
                  <div key={i} className="px-2">
                    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden max-w-md mx-auto border border-gray-100">
                      {/* Price Tag - DYNAMIC */}
                      {product.price && (
                        <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-lg z-10 shadow">
                          {product.price}
                        </div>
                      )}
                      
                      {/* Stock Status - DYNAMIC */}
                      {product.inStock !== undefined && (
                        <div className={`absolute top-4 left-4 text-xs font-bold px-2 py-1 rounded-full z-10 ${
                          product.inStock 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </div>
                      )}
                      
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="text-base font-bold text-gray-900 mb-1">{product.name}</h3>
                        {product.description && (
                          <p className="text-sm text-gray-600">{product.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
              <div className="flex justify-center mt-5">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors">
                  View All Products
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Video */}
        {renderProductVideo()}

        {/* Videos Slider */}
        {renderVideosSlider()}

        {/* Gallery */}
        {renderGallery()}

        {/* Testimonials Component */}
        {profileData.testimonials && profileData.testimonials.length > 0 && (
          <div className="px-6 pb-6 bg-gradient-to-br from-blue-50 to-purple-50">
            <h2 className="text-lg font-bold text-center text-[#311cb4] mb-4">TESTIMONIALS</h2>
            <div className="overflow-visible -mx-4 px-4">
              <Slider {...BaseSliderSettings}>
                {profileData.testimonials.map((testimonial, i) => (
                  <div key={i} className="px-2">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-md mx-auto border border-gray-100 p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-blue-300 flex items-center justify-center text-white font-bold mr-4">
                          {testimonial.clientName?.charAt(0) || "C"}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{testimonial.clientName}</h3>
                          {testimonial.company && (
                            <p className="text-sm text-gray-600">{testimonial.company}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex mb-3">
                        {Array.from({ length: 5 }, (_, i) => (
                          <FaStar
                            key={i}
                            className={`w-4 h-4 ${i < (testimonial.rating || 5) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed italic">
                        "{testimonial.testimonial}"
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        )}

        {/* Enhanced Client List */}
        {renderEnhancedClientList()}

        {/* Downloads */}
        {renderDownloads()}

        {/* Interactive Elements */}
        {renderInteractiveElements()}

        {/* Chat Assistant */}
        {renderChatAssistant()}

        {/* Business Hours - NOW ONLY SHOWS FOR BUSINESS CARDS */}
        {renderBusinessHours()}

        {/* NFC Card Component */}
        {profileData.nfcSettings?.isEnabled && (
          <div className="px-6 pb-6">
            <h2 className="text-lg font-bold text-center text-gray-900 mb-4">NFC CARD</h2>
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-lg p-6 text-center max-w-md mx-auto text-white">
              <FaIdCard className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">NFC Enabled Card</h3>
              <p className="text-sm opacity-90 mb-4">Tap your NFC-enabled device to connect instantly</p>
              <div className="bg-white/20 rounded-lg p-3 inline-block">
                <p className="text-sm font-semibold">Tap to Connect</p>
              </div>
            </div>
          </div>
        )}

        {/* QR Code Component - UPDATED */}
        {renderQRCode()}

        {/* Catalog PDF Component */}
        {profileData.catalog && (
          <div className="px-6 pb-6">
            <h2 className="text-lg font-bold text-center text-gray-900 mb-4">CATALOG</h2>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center max-w-md mx-auto">
              <FaFilePdf className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Download Our Catalog</h3>
              <p className="text-gray-600 text-sm mb-4">Get our complete product catalog in PDF format</p>
              <button
                onClick={() => window.open(profileData.catalog, '_blank')}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors flex items-center justify-center mx-auto gap-2"
              >
                <FaDownload className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>
        )}

        {/* Contact Section - MOVED TO BOTTOM */}
        {(primaryEmail?.address || profileData.phones.length > 0 || primaryAddress) && (
          <div className="px-6 pb-6 bg-gray-50">
            <h2 className="text-lg font-bold text-center text-gray-900 mb-4">CONTACT ME</h2>
            
            <div className="space-y-4">
              {primaryEmail?.address && (
                <button
                  onClick={() => handleContact("email", primaryEmail.address)}
                  className="bg-white rounded-xl p-4 w-full text-left hover:bg-gray-50 transition-colors"
                >
                  <p className="text-sm text-gray-600 font-semibold flex items-center gap-2">
                    <FaEnvelope className="w-4 h-4" />
                    EMAIL
                  </p>
                  <p className="text-gray-900 font-medium">{primaryEmail.address}</p>
                </button>
              )}

              {profileData.phones.map((phone, index) => (
                <button
                  key={index}
                  onClick={() => handleContact("phone", phone.number)}
                  className="bg-white rounded-xl p-4 w-full text-left hover:bg-gray-50 transition-colors"
                >
                  <p className="text-sm text-gray-600 font-semibold flex items-center gap-2">
                    <FaPhone className="w-4 h-4" />
                    {phone.label ? phone.label.toUpperCase() : "PHONE NUMBER"}
                  </p>
                  <p className="text-gray-900 font-medium">{phone.number}</p>
                </button>
              ))}

              {primaryAddress && (
                <button
                  onClick={() => handleContact("map", primaryAddress.googleMapsLink)}
                  className="bg-white rounded-xl p-4 w-full text-left hover:bg-gray-50 transition-colors"
                >
                  <p className="text-sm text-gray-600 font-semibold flex items-center gap-2">
                    <FaMapMarkerAlt className="w-4 h-4" />
                    OFFICE ADDRESS
                  </p>
                  <p className="text-gray-900 font-medium">
                    {primaryAddress.fullAddress || `${primaryAddress.street}, ${primaryAddress.city}`}
                  </p>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gray-900 text-white text-center py-6 px-6">
          <h3 className="text-xl font-bold mb-2">Let's Work Together!</h3>
          <p className="text-gray-300 text-sm mb-4">
            Ready to start your next project? Let's discuss how I can help you achieve your goals.
          </p>
          <button 
            onClick={() => handleContact("email", primaryEmail?.address || profileData.email)}
            className="bg-white text-gray-900 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors w-full"
          >
            Get In Touch
          </button>
        </div>
      </div>

      <style>
        {`
          /* Mobile responsive styles */
          @media (min-width: 641px) {
            .mobile-container {
              width: 375px;
              height: 667px;
              margin: 20px auto;
              overflow-y: auto;
              border-radius: 20px;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
          }
          
          @media (max-width: 640px) {
            .mobile-container {
              width: 100vw !important;
              height: 100vh !important;
              margin: 0 !important;
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              border-radius: 0 !important;
              overflow-y: auto;
            }
          }
          
          .slick-dots li.slick-active div {
            background-color: #6953f3ff;
            width: 30px;
            border-radius: 9999px;
          }
          
          #particle-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
          }

          /* Ensure body allows scrolling */
          body {
            overflow-y: auto;
          }
          
          /* Custom scrollbar for mobile container */
          .mobile-container::-webkit-scrollbar {
            width: 6px;
          }
          
          .mobile-container::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          
          .mobile-container::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
          }
          
          .mobile-container::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>
    </div>
  );
};

export default DefaultCard;