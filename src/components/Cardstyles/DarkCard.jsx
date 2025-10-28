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

const DarkCard = ({ cardData = {} }) => {
  console.log('🎯 DarkCard received data:', cardData);

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

  // NEW: Galaxy Starfield Particle Animation
  useEffect(() => {
    const canvas = document.getElementById('particle-canvas-dark');
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

    // Star class for galaxy effect
    class Star {
      constructor() {
        this.reset();
        this.z = Math.random() * 2000; // Depth
      }

      reset() {
        this.x = Math.random() * canvas.width - canvas.width / 2;
        this.y = Math.random() * canvas.height - canvas.height / 2;
        this.z = Math.random() * 2000;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.color = this.getStarColor();
      }

      getStarColor() {
        const colors = [
          'rgba(147, 51, 234, {opacity})', // Purple
          'rgba(192, 132, 252, {opacity})', // Light Purple
          'rgba(236, 72, 153, {opacity})', // Pink
          'rgba(59, 130, 246, {opacity})', // Blue
          'rgba(255, 255, 255, {opacity})' // White
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.z -= this.speed;
        
        if (this.z <= 0) {
          this.reset();
          this.z = 2000;
        }

        // Calculate position with perspective
        const scale = 200 / (this.z + 200);
        this.xWithPerspective = this.x * scale + canvas.width / 2;
        this.yWithPerspective = this.y * scale + canvas.height / 2;
        this.sizeWithPerspective = this.size * scale * 2;
      }

      draw() {
        if (this.xWithPerspective < 0 || this.xWithPerspective > canvas.width ||
            this.yWithPerspective < 0 || this.yWithPerspective > canvas.height) {
          return;
        }

        const currentColor = this.color.replace('{opacity}', this.opacity * (1 - this.z / 2000));
        
        ctx.fillStyle = currentColor;
        ctx.beginPath();
        ctx.arc(this.xWithPerspective, this.yWithPerspective, this.sizeWithPerspective, 0, Math.PI * 2);
        ctx.fill();

        // Add twinkling effect
        if (Math.random() > 0.95) {
          ctx.shadowColor = currentColor;
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    // Shooting Star class
    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.3;
        this.speedX = (Math.random() * 10 + 5) * (Math.random() > 0.5 ? 1 : -1);
        this.speedY = Math.random() * 5 + 2;
        this.size = Math.random() * 2 + 1;
        this.opacity = 1;
        this.trail = [];
        this.maxTrailLength = 15;
      }

      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrailLength) {
          this.trail.shift();
        }

        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.02;

        if (this.opacity <= 0 || 
            this.x < 0 || this.x > canvas.width || 
            this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        // Draw trail
        ctx.strokeStyle = `rgba(147, 51, 234, ${this.opacity})`;
        ctx.lineWidth = this.size;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(this.trail[0]?.x || this.x, this.trail[0]?.y || this.y);
        
        for (let i = 1; i < this.trail.length; i++) {
          const point = this.trail[i];
          const trailOpacity = (i / this.trail.length) * this.opacity;
          ctx.strokeStyle = `rgba(147, 51, 234, ${trailOpacity})`;
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
        }

        // Draw star head
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.shadowColor = 'rgba(147, 51, 234, 0.8)';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Create stars and shooting stars
    const stars = [];
    const shootingStars = [];
    const starCount = 300;
    const shootingStarCount = 3;

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    for (let i = 0; i < shootingStarCount; i++) {
      shootingStars.push(new ShootingStar());
    }

    // Animation loop
    const animate = () => {
      // Create dark space background with gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.1)');
      gradient.addColorStop(1, 'rgba(2, 6, 23, 0.8)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach(star => {
        star.update();
        star.draw();
      });

      // Update and draw shooting stars
      shootingStars.forEach(star => {
        star.update();
        star.draw();
      });

      // Add some floating particles/dust
      ctx.fillStyle = 'rgba(192, 132, 252, 0.1)';
      for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1 + 0.3;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

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
      <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
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

  // Social media configuration - Dark Theme
  const socialMediaConfig = {
    linkedin: { icon: <FaLinkedinIn className="w-4 h-4" />, color: "text-purple-400" },
    twitter: { icon: <FaXTwitter className="w-4 h-4" />, color: "text-purple-400" },
    facebook: { icon: <FaFacebookF className="w-4 h-4" />, color: "text-purple-400" },
    instagram: { icon: <FaInstagram className="w-4 h-4" />, color: "text-purple-400" },
    youtube: { icon: <FaYoutube className="w-4 h-4" />, color: "text-purple-400" },
    github: { icon: <FaGlobe className="w-4 h-4" />, color: "text-purple-400" },
    whatsapp: { icon: <FaWhatsapp className="w-4 h-4" />, color: "text-purple-400" },
    telegram: { icon: <FaTelegramPlane className="w-4 h-4" />, color: "text-purple-400" },
    website: { icon: <FaGlobe className="w-4 h-4" />, color: "text-purple-400" }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 flex justify-center items-start py-8 px-4 relative overflow-hidden">
      {/* NEW: Galaxy Starfield Particle Canvas */}
      <canvas 
        id="particle-canvas-dark"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      
      <div className="bg-gray-800 rounded-3xl shadow-2xl overflow-hidden w-full max-w-md relative z-10 border border-gray-700">
        
        {/* Header Banner with Dark Gradient */}
        <div className="relative h-48 bg-gradient-to-r from-purple-900 to-gray-800">
          {/* Company Logo - DYNAMIC - Made Circular */}
          <div className="absolute top-4 left-4 w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center shadow-lg border-2 border-gray-600">
            {profileData.companyLogo ? (
              <img 
                src={profileData.companyLogo} 
                alt="Company Logo" 
                className="w-10 h-10 object-contain rounded-full" 
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                LOGO
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="absolute top-4 right-4">
            <button className="bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-gray-600">
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
                  className="w-24 h-24 rounded-full border-4 border-gray-800 shadow-xl object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-gray-800 shadow-xl bg-gradient-to-r from-purple-600 to-gray-500 flex items-center justify-center text-white text-lg font-bold">
                  {profileData.name?.charAt(0) || "U"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-16 px-6 pb-6 text-center">
          <h1 className="text-2xl font-bold text-white">{profileData.name}</h1>
          <p className="text-purple-400 font-semibold mt-1">{profileData.jobTitle}</p>
          
          {/* Company - DYNAMIC */}
          {profileData.company && (
            <p className="text-gray-400 text-sm mt-1">{profileData.company}</p>
          )}

          {/* Bio - DYNAMIC */}
          {profileData.bio && (
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
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
                  className={`w-12 h-12 rounded-xl bg-gray-700 text-purple-400 flex items-center justify-center transition-transform hover:scale-110 hover:bg-purple-600 hover:text-white border border-gray-600`}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Services Section - DYNAMIC */}
        {profileData.services.length > 0 && (
          <div className="px-6 pb-6 bg-gradient-to-br from-gray-800 to-purple-900">
            <h2 className="text-lg font-bold text-center text-purple-400 mb-4">MY SERVICES</h2>
            <div className="overflow-visible -mx-4 px-4">
              <Slider {...BaseSliderSettings}>
                {profileData.services.map((service, i) => (
                  <div key={i} className="px-2">
                    <div className="bg-gray-700 rounded-2xl shadow-lg overflow-hidden max-w-md mx-auto border border-gray-600">
                      {service.image && (
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-40 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-base font-bold text-white">{service.name}</h3>
                          {service.price && (
                            <span className="bg-purple-900 text-purple-200 px-3 py-1 rounded-full text-sm font-semibold border border-purple-700">
                              {service.price}
                            </span>
                          )}
                        </div>
                        {service.description && (
                          <p className="text-sm text-gray-300 leading-relaxed">{service.description}</p>
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
          <div className="px-6 pb-6 bg-gray-800">
            <h2 className="text-lg font-bold text-center text-white mb-4">PRODUCTS</h2>
            <div className="overflow-visible -mx-4 px-4">
              <Slider {...sliderSettingsNoDots}>
                {profileData.products.map((product, i) => (
                  <div key={i} className="px-2">
                    <div className="relative bg-gray-700 rounded-2xl shadow-lg overflow-hidden max-w-md mx-auto border border-gray-600">
                      {/* Price Tag - DYNAMIC */}
                      {product.price && (
                        <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-lg z-10 shadow border border-purple-500">
                          {product.price}
                        </div>
                      )}
                      
                      {/* Stock Status - DYNAMIC */}
                      {product.inStock !== undefined && (
                        <div className={`absolute top-4 left-4 text-xs font-bold px-2 py-1 rounded-full z-10 border ${
                          product.inStock 
                            ? "bg-green-900 text-green-300 border-green-700" 
                            : "bg-red-900 text-red-300 border-red-700"
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
                        <h3 className="text-base font-bold text-white mb-1">{product.name}</h3>
                        {product.description && (
                          <p className="text-sm text-gray-300">{product.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
              <div className="flex justify-center mt-5">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors border border-purple-500">
                  View All Products
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        {(profileData.email || profileData.phones.length > 0 || profileData.address) && (
          <div className="px-6 pb-6 bg-gray-900">
            <h2 className="text-lg font-bold text-center text-white mb-4">CONTACT ME</h2>
            
            <div className="space-y-4">
              {profileData.email && (
                <div className="bg-gray-700 rounded-xl p-4 border border-gray-600">
                  <p className="text-sm text-gray-400 font-semibold">EMAIL</p>
                  <p className="text-white font-medium">{profileData.email}</p>
                </div>
              )}

              {profileData.phones.map((phone, index) => (
                <div key={index} className="bg-gray-700 rounded-xl p-4 border border-gray-600">
                  <p className="text-sm text-gray-400 font-semibold">
                    {phone.label ? phone.label.toUpperCase() : "PHONE NUMBER"}
                  </p>
                  <p className="text-white font-medium">{phone.number}</p>
                </div>
              ))}

              {profileData.address && (
                <div className="bg-gray-700 rounded-xl p-4 border border-gray-600">
                  <p className="text-sm text-gray-400 font-semibold">OFFICE ADDRESS</p>
                  <p className="text-white font-medium">{profileData.address}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gray-900 text-white text-center py-6 px-6 border-t border-gray-700">
          <h3 className="text-xl font-bold mb-2">Let's Work Together!</h3>
          <p className="text-gray-400 text-sm mb-4">
            Ready to start your next project? Let's discuss how I can help you achieve your goals.
          </p>
          <button 
            onClick={() => handleContact("email", profileData.email)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-colors w-full border border-purple-500"
          >
            Get In Touch
          </button>
        </div>
      </div>

      <style>
        {`
          .slick-dots li.slick-active div {
            background-color: #9333ea;
            width: 30px;
            border-radius: 9999px;
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
          }
        `}
      </style>
    </div>
  );
};

export default DarkCard;
