// import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

// const DefaultCard = ({ cardData }) => {
//   return (
//     <div className="relative w-[400px] h-[600px] p-6 rounded-2xl text-center shadow-lg bg-white overflow-hidden border border-slate-300">
      
      
//       <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-orange-500 to-blue-500 flex items-center justify-center">
//       <div className="absolute w-full h-full bg-opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
//       </div>

      
//       {cardData.image && (
//         <div className="relative mt-20 p-1 bg-white rounded-lg shadow-lg border-2 border-blue-500 inline-block">
//           <img
//             src={cardData.image}
//             alt="Profile"
//             className="w-28 h-28 mx-auto rounded-lg object-cover"
//           />
//         </div>
//       )}

    
//       <div className="mt-6 p-3 bg-slate-100 rounded-lg shadow-sm border border-slate-200">
//         <h3 className="text-2xl font-bold text-slate-800">{cardData.name}</h3>
//         <p className="text-lg text-slate-600">{cardData.jobTitle}</p>
//         <p className="text-sm text-slate-500">{cardData.company}</p>
//       </div>

    
//       <div className="mt-4 p-3 bg-slate-100 rounded-lg shadow-sm border-l-4 border-orange-500">
//         <p className="text-sm text-slate-700">{cardData.email}</p>
//         <p className="text-sm text-slate-700">{cardData.phone}</p>
//       </div>

     
//       <div className="absolute bottom-6 left-0 w-full flex justify-center gap-6 text-slate-500">
//         <a href="#" className="hover:text-orange-500 text-2xl"><FaLinkedin /></a>
//         <a href="#" className="hover:text-blue-500 text-2xl"><FaTwitter /></a>
//         <a href="#" className="hover:text-slate-700 text-2xl"><FaGithub /></a>
//       </div>

      
//       <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-orange-500 to-blue-500"></div>
//     </div>
//   );
// };

// export default DefaultCard;


// import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
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
//   FaStar
// } from "react-icons/fa";
// import { FaXTwitter, FaYoutube } from "react-icons/fa6";

// const ProfilePage = () => {
//   const location = useLocation();
//   const cardData = location.state?.cardData || {};

//   // Build profileData from cardData - ALL DYNAMIC
//   const profileData = {
//     // Personal Info
//     name: `${cardData?.prefix || ""} ${cardData?.firstName || ""} ${cardData?.lastName || ""}`.trim() || "Your Name",
//     jobTitle: cardData?.jobTitle || "Professional",
//     bio: cardData?.bio || "A short bio about yourself that appears below your title.",
    
//     // Contact Info
//     email: cardData?.email,
//     phones: cardData?.phones || [],
//     address: cardData?.address,
    
//     // Company Info
//     company: cardData?.companyName,
//     department: cardData?.department,
    
//     // Images - DYNAMIC
//     profilePhoto: cardData?.profilePhoto,
//     companyLogo: cardData?.companyLogo,
    
//     // Services - DYNAMIC
//     services: cardData?.services || [],
    
//     // Products - DYNAMIC
//     products: cardData?.products || [],
    
//     // Social Links - DYNAMIC
//     socialLinks: cardData?.socialLinks || [],
//     websites: cardData?.websites || []
//   };

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
//         this.size = Math.random() * 4 + 2; // Larger particles: 2-6 pixels
//         this.speedX = Math.random() * 2 - 1; // Much faster horizontal movement
//         this.speedY = Math.random() * 2 - 1; // Much faster vertical movement
//         this.color = `rgba(105, 83, 243, ${Math.random() * 0.5 + 0.3})`; // More visible
//       }

//       update() {
//         this.x += this.speedX;
//         this.y += this.speedY;

//         // Bounce off edges instead of wrapping
//         if (this.x > canvas.width || this.x < 0) {
//           this.speedX = -this.speedX;
//         }
//         if (this.y > canvas.height || this.y < 0) {
//           this.speedY = -this.speedY;
//         }

//         // Keep within bounds
//         this.x = Math.max(0, Math.min(canvas.width, this.x));
//         this.y = Math.max(0, Math.min(canvas.height, this.y));
//       }

//       draw() {
//         ctx.fillStyle = this.color;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fill();
        
//         // Add glow effect
//         ctx.shadowColor = 'rgba(105, 83, 243, 0.8)';
//         ctx.shadowBlur = 10;
//         ctx.fill();
//         ctx.shadowBlur = 0;
//       }
//     }

//     // Create more particles
//     const particles = [];
//     const particleCount = 100; // Increased particle count

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

//       // Draw connections with increased range and visibility
//       ctx.strokeStyle = 'rgba(105, 83, 243, 0.2)';
//       ctx.lineWidth = 1.5;
//       ctx.shadowColor = 'rgba(105, 83, 243, 0.3)';
//       ctx.shadowBlur = 5;

//       for (let i = 0; i < particles.length; i++) {
//         for (let j = i + 1; j < particles.length; j++) {
//           const dx = particles[i].x - particles[j].x;
//           const dy = particles[i].y - particles[j].y;
//           const distance = Math.sqrt(dx * dx + dy * dy);

//           if (distance < 200) { // Increased connection range
//             const opacity = 1 - (distance / 200); // Fade out with distance
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
//     github: { icon: <FaGlobe className="w-4 h-4" />, color: "text-[#311cb4]" },
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
//       default:
//         window.open(value, "_blank");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex justify-center items-start py-8 px-4 relative overflow-hidden">
//       {/* Particle Animation Canvas */}
//       <canvas 
//         id="particle-canvas"
//         className="absolute inset-0 w-full h-full pointer-events-none"
//       />
      
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
//                 LOGO
//               </div>
//             )}
//           </div>

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
          
//           {/* Company - DYNAMIC */}
//           {profileData.company && (
//             <p className="text-gray-600 text-sm mt-1">{profileData.company}</p>
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

//         {/* Contact Section - MOVED TO BOTTOM */}
//         {(profileData.email || profileData.phones.length > 0 || profileData.address) && (
//           <div className="px-6 pb-6 bg-gray-50">
//             <h2 className="text-lg font-bold text-center text-gray-900 mb-4">CONTACT ME</h2>
            
//             <div className="space-y-4">
//               {profileData.email && (
//                 <div className="bg-white rounded-xl p-4">
//                   <p className="text-sm text-gray-600 font-semibold">EMAIL</p>
//                   <p className="text-gray-900 font-medium">{profileData.email}</p>
//                 </div>
//               )}

//               {profileData.phones.map((phone, index) => (
//                 <div key={index} className="bg-white rounded-xl p-4">
//                   <p className="text-sm text-gray-600 font-semibold">
//                     {phone.label ? phone.label.toUpperCase() : "PHONE NUMBER"}
//                   </p>
//                   <p className="text-gray-900 font-medium">{phone.number}</p>
//                 </div>
//               ))}

//               {profileData.address && (
//                 <div className="bg-white rounded-xl p-4">
//                   <p className="text-sm text-gray-600 font-semibold">OFFICE ADDRESS</p>
//                   <p className="text-gray-900 font-medium">{profileData.address}</p>
//                 </div>
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
//             onClick={() => handleContact("email", profileData.email)}
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
//         `}
//       </style>
//     </div>
//   );
// };

// export default ProfilePage;
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
  FaStar
} from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";

// RECEIVE DATA VIA PROPS instead of useLocation
const DefaultCard = ({ cardData = {} }) => {
  console.log('🎯 DefaultCard received data:', cardData); // Debug log

  // Build profileData from cardData - ALL DYNAMIC
  const profileData = {
    // Personal Info
    name: `${cardData?.prefix || ""} ${cardData?.firstName || ""} ${cardData?.lastName || ""}`.trim() || "Your Name",
    jobTitle: cardData?.jobTitle || "Professional",
    bio: cardData?.bio || "A short bio about yourself that appears below your title.",
    
    // Contact Info
    email: cardData?.email,
    phones: cardData?.phones || [],
    address: cardData?.address,
    
    // Company Info
    company: cardData?.companyName,
    department: cardData?.department,
    
    // Images - DYNAMIC
    profilePhoto: cardData?.profilePhoto,
    companyLogo: cardData?.companyLogo,
    
    // Services - DYNAMIC
    services: cardData?.services || [],
    
    // Products - DYNAMIC
    products: cardData?.products || [],
    
    // Social Links - DYNAMIC
    socialLinks: cardData?.socialLinks || [],
    websites: cardData?.websites || []
  };

  console.log('🎯 Profile data built:', profileData); // Debug log

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
        this.size = Math.random() * 4 + 2; // Larger particles: 2-6 pixels
        this.speedX = Math.random() * 2 - 1; // Much faster horizontal movement
        this.speedY = Math.random() * 2 - 1; // Much faster vertical movement
        this.color = `rgba(105, 83, 243, ${Math.random() * 0.5 + 0.3})`; // More visible
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges instead of wrapping
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }

        // Keep within bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowColor = 'rgba(105, 83, 243, 0.8)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Create more particles
    const particles = [];
    const particleCount = 100; // Increased particle count

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

      // Draw connections with increased range and visibility
      ctx.strokeStyle = 'rgba(105, 83, 243, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = 'rgba(105, 83, 243, 0.3)';
      ctx.shadowBlur = 5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) { // Increased connection range
            const opacity = 1 - (distance / 200); // Fade out with distance
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
    github: { icon: <FaGlobe className="w-4 h-4" />, color: "text-[#311cb4]" },
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
      default:
        window.open(value, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex justify-center items-start py-8 px-4 relative overflow-hidden">
      {/* Particle Animation Canvas */}
      <canvas 
        id="particle-canvas"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      
      {/* MAIN FIX: Remove fixed height and allow natural scrolling */}
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
                LOGO
              </div>
            )}
          </div>

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
          
          {/* Company - DYNAMIC */}
          {profileData.company && (
            <p className="text-gray-600 text-sm mt-1">{profileData.company}</p>
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

        {/* Contact Section - MOVED TO BOTTOM */}
        {(profileData.email || profileData.phones.length > 0 || profileData.address) && (
          <div className="px-6 pb-6 bg-gray-50">
            <h2 className="text-lg font-bold text-center text-gray-900 mb-4">CONTACT ME</h2>
            
            <div className="space-y-4">
              {profileData.email && (
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-600 font-semibold">EMAIL</p>
                  <p className="text-gray-900 font-medium">{profileData.email}</p>
                </div>
              )}

              {profileData.phones.map((phone, index) => (
                <div key={index} className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-600 font-semibold">
                    {phone.label ? phone.label.toUpperCase() : "PHONE NUMBER"}
                  </p>
                  <p className="text-gray-900 font-medium">{phone.number}</p>
                </div>
              ))}

              {profileData.address && (
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-600 font-semibold">OFFICE ADDRESS</p>
                  <p className="text-gray-900 font-medium">{profileData.address}</p>
                </div>
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
            onClick={() => handleContact("email", profileData.email)}
            className="bg-white text-gray-900 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors w-full"
          >
            Get In Touch
          </button>
        </div>
      </div>

      <style>
        {`
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
        `}
      </style>
    </div>
  );
};

export default DefaultCard;