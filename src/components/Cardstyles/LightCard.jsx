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

const LightCard = ({ cardData = {} }) => {
  console.log('🎯 LightCard received data:', cardData);

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

  console.log('🎯 Profile data built:', profileData);

  // NEW: Floating Bubbles Particle Animation
  useEffect(() => {
    const canvas = document.getElementById('particle-canvas-light');
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

    // Bubble class for light theme
    class Bubble {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 40 + 10; // Larger bubbles
        this.speed = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.color = this.getBubbleColor();
        this.wobble = Math.random() * 2;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        this.wobbleOffset = Math.random() * Math.PI * 2;
      }

      getBubbleColor() {
        const colors = [
          'rgba(59, 130, 246, {opacity})', // Blue
          'rgba(96, 165, 250, {opacity})', // Light Blue
          'rgba(147, 197, 253, {opacity})', // Sky Blue
          'rgba(186, 230, 253, {opacity})', // Very Light Blue
          'rgba(219, 234, 254, {opacity})'  // Pale Blue
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y -= this.speed;
        this.wobbleOffset += this.wobbleSpeed;
        this.x += Math.sin(this.wobbleOffset) * this.wobble;

        // Reset bubble when it goes off screen
        if (this.y < -this.size) {
          this.y = canvas.height + this.size;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        const currentColor = this.color.replace('{opacity}', this.opacity);
        
        // Draw bubble
        ctx.fillStyle = currentColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Add bubble highlight
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.2, 0, Math.PI * 2);
        ctx.fill();

        // Add subtle shadow
        ctx.shadowColor = 'rgba(59, 130, 246, 0.3)';
        ctx.shadowBlur = 10;
        ctx.fillStyle = currentColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Sparkle class for added magic
    class Sparkle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 0.5 + 0.1;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.life = Math.random() * 100 + 50;
        this.maxLife = this.life;
      }

      update() {
        this.life--;
        this.opacity = (this.life / this.maxLife) * 0.8;
        
        if (this.life <= 0) {
          this.reset();
        }
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.life = Math.random() * 100 + 50;
        this.maxLife = this.life;
        this.opacity = Math.random() * 0.8 + 0.2;
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Add twinkle effect
        if (Math.random() > 0.7) {
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    // Create bubbles and sparkles
    const bubbles = [];
    const sparkles = [];
    const bubbleCount = 20;
    const sparkleCount = 50;

    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(new Bubble());
    }

    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push(new Sparkle());
    }

    // Animation loop
    const animate = () => {
      // Create light background with gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(219, 234, 254, 0.3)');
      gradient.addColorStop(1, 'rgba(239, 246, 255, 0.5)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw bubbles
      bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw();
      });

      // Update and draw sparkles
      sparkles.forEach(sparkle => {
        sparkle.update();
        sparkle.draw();
      });

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
      <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
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

  // Social media configuration - Light Theme
  const socialMediaConfig = {
    linkedin: { icon: <FaLinkedinIn className="w-4 h-4" />, color: "text-blue-600" },
    twitter: { icon: <FaXTwitter className="w-4 h-4" />, color: "text-blue-600" },
    facebook: { icon: <FaFacebookF className="w-4 h-4" />, color: "text-blue-600" },
    instagram: { icon: <FaInstagram className="w-4 h-4" />, color: "text-blue-600" },
    youtube: { icon: <FaYoutube className="w-4 h-4" />, color: "text-blue-600" },
    github: { icon: <FaGlobe className="w-4 h-4" />, color: "text-blue-600" },
    whatsapp: { icon: <FaWhatsapp className="w-4 h-4" />, color: "text-blue-600" },
    telegram: { icon: <FaTelegramPlane className="w-4 h-4" />, color: "text-blue-600" },
    website: { icon: <FaGlobe className="w-4 h-4" />, color: "text-blue-600" }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 flex justify-center items-start py-8 px-4 relative overflow-hidden">
      {/* NEW: Floating Bubbles Particle Canvas */}
      <canvas 
        id="particle-canvas-light"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-md relative z-10 border border-blue-100">
        
        {/* Header Banner with Light Gradient */}
        <div className="relative h-48 bg-gradient-to-r from-blue-400 to-blue-600">
          {/* Company Logo - DYNAMIC - Made Circular */}
          <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-blue-200">
            {profileData.companyLogo ? (
              <img 
                src={profileData.companyLogo} 
                alt="Company Logo" 
                className="w-10 h-10 object-contain rounded-full" 
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full flex items-center justify-center text-white font-bold text-sm">
                LOGO
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="absolute top-4 right-4">
            <button className="bg-white/80 backdrop-blur-sm text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-blue-200">
              <span>🌐</span>
              English
            </button>
          </div>

          {/* Profile Image - DYNAMIC */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              {profileData.profilePhoto ? (
                <img
                  src={profileData.profilePhoto}
                  alt={profileData.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center text-white text-lg font-bold">
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
                  className={`w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center transition-transform hover:scale-110 hover:bg-blue-600 hover:text-white border border-blue-200`}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Services Section - DYNAMIC */}
        {profileData.services.length > 0 && (
          <div className="px-6 pb-6 bg-gradient-to-br from-blue-50 to-sky-50">
            <h2 className="text-lg font-bold text-center text-blue-600 mb-4">MY SERVICES</h2>
            <div className="overflow-visible -mx-4 px-4">
              <Slider {...BaseSliderSettings}>
                {profileData.services.map((service, i) => (
                  <div key={i} className="px-2">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-md mx-auto border border-blue-100">
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
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold border border-blue-200">
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
                    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden max-w-md mx-auto border border-blue-100">
                      {/* Price Tag - DYNAMIC */}
                      {product.price && (
                        <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-lg z-10 shadow border border-blue-400">
                          {product.price}
                        </div>
                      )}
                      
                      {/* Stock Status - DYNAMIC */}
                      {product.inStock !== undefined && (
                        <div className={`absolute top-4 left-4 text-xs font-bold px-2 py-1 rounded-full z-10 border ${
                          product.inStock 
                            ? "bg-green-100 text-green-800 border-green-300" 
                            : "bg-red-100 text-red-800 border-red-300"
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
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors border border-blue-400">
                  View All Products
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        {(profileData.email || profileData.phones.length > 0 || profileData.address) && (
          <div className="px-6 pb-6 bg-blue-50">
            <h2 className="text-lg font-bold text-center text-gray-900 mb-4">CONTACT ME</h2>
            
            <div className="space-y-4">
              {profileData.email && (
                <div className="bg-white rounded-xl p-4 border border-blue-100">
                  <p className="text-sm text-gray-600 font-semibold">EMAIL</p>
                  <p className="text-gray-900 font-medium">{profileData.email}</p>
                </div>
              )}

              {profileData.phones.map((phone, index) => (
                <div key={index} className="bg-white rounded-xl p-4 border border-blue-100">
                  <p className="text-sm text-gray-600 font-semibold">
                    {phone.label ? phone.label.toUpperCase() : "PHONE NUMBER"}
                  </p>
                  <p className="text-gray-900 font-medium">{phone.number}</p>
                </div>
              ))}

              {profileData.address && (
                <div className="bg-white rounded-xl p-4 border border-blue-100">
                  <p className="text-sm text-gray-600 font-semibold">OFFICE ADDRESS</p>
                  <p className="text-gray-900 font-medium">{profileData.address}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-blue-500 text-white text-center py-6 px-6 border-t border-blue-400">
          <h3 className="text-xl font-bold mb-2">Let's Work Together!</h3>
          <p className="text-blue-100 text-sm mb-4">
            Ready to start your next project? Let's discuss how I can help you achieve your goals.
          </p>
          <button 
            onClick={() => handleContact("email", profileData.email)}
            className="bg-white hover:bg-blue-50 text-blue-600 font-bold py-3 px-8 rounded-xl transition-colors w-full border border-blue-200"
          >
            Get In Touch
          </button>
        </div>
      </div>

      <style>
        {`
          .slick-dots li.slick-active div {
            background-color: #3b82f6;
            width: 30px;
            border-radius: 9999px;
          }
          
          #particle-canvas-light {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
          }

          body {
            overflow-y: auto;
          }
        `}
      </style>
    </div>
  );
};

export default LightCard;