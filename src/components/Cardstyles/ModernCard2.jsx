import React from 'react';
import { 
  Mail, Phone, Globe, MapPin, Linkedin, Twitter, Instagram, Dribbble, 
  Sparkles, Heart, Star, Award, ChevronRight, Share2, UserPlus, 
  Facebook, Github, Youtube, MessageCircle, Clock, Download, 
  FileText, Wifi, Video, Briefcase, Building2
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- HELPER: Social Icons ---
const getSocialIcon = (platform) => {
  const p = platform?.toLowerCase() || '';
  if (p.includes('linkedin')) return <Linkedin className="w-6 h-6 text-white" />;
  if (p.includes('twitter') || p.includes('x')) return <Twitter className="w-6 h-6 text-white" />;
  if (p.includes('instagram')) return <Instagram className="w-6 h-6 text-white" />;
  if (p.includes('dribbble')) return <Dribbble className="w-6 h-6 text-white" />;
  if (p.includes('facebook')) return <Facebook className="w-6 h-6 text-white" />;
  if (p.includes('github')) return <Github className="w-6 h-6 text-white" />;
  if (p.includes('youtube')) return <Youtube className="w-6 h-6 text-white" />;
  if (p.includes('whatsapp')) return <MessageCircle className="w-6 h-6 text-white" />;
  return <Globe className="w-6 h-6 text-white" />;
};

// --- HELPER: Video Player ---
const VideoPlayer = ({ src, type }) => {
  if (!src) return null;
  
  if (type === 'youtube' || src.includes('youtube') || src.includes('youtu.be')) {
    const videoId = src.split('v=')[1]?.split('&')[0] || src.split('/').pop();
    return (
      <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white mb-6 aspect-video">
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://www.youtube.com/embed/${videoId}`} 
          frameBorder="0" 
          allowFullScreen 
          title="Profile Video"
        />
      </div>
    );
  }
  
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white mb-6 aspect-video bg-black">
      <video controls className="w-full h-full object-contain">
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

const ModernCard2 = ({ cardData = {}, data = {} }) => {
  const safeData = Object.keys(cardData).length > 0 ? cardData : data;

  // --- DATA MAPPING ---
  const profile = {
    firstName: safeData.firstName || "Name",
    lastName: safeData.lastName || "",
    fullName: `${safeData.prefix || ''} ${safeData.firstName || ''} ${safeData.lastName || ''}`.trim(),
    jobTitle: safeData.jobTitle || "",
    companyName: safeData.companyName || "",
    // Use the logo from data, or a placeholder if you want
    companyLogo: safeData.companyLogo, 
    profilePhoto: safeData.profilePhoto || "https://placehold.co/400x400/png?text=User",
    tagline: safeData.tagline || "",
    bio: safeData.bio || "",
    aboutText: safeData.aboutText || "", // About Company
    
    phones: safeData.phones || [],
    emails: safeData.emails || [],
    websites: safeData.websites || [],
    socialLinks: safeData.socialLinks || [],
    addresses: safeData.addresses || [],
    
    services: safeData.services || [],
    products: safeData.products || [],
    
    // Missing fields added
    businessHours: safeData.businessHours || [],
    downloads: safeData.downloads || [],
    profileVideo: safeData.profileVideo, // { url: string, uploadType: string }
    nfcSettings: safeData.nfcSettings || { isEnabled: false },
    
    brandLabel: safeData.brandLabel || "GravityWave Labs"
  };

  const handleLink = (type, value) => {
    if (!value) return;
    switch (type) {
      case 'phone': window.open(`tel:${value}`); break;
      case 'email': window.open(`mailto:${value}`); break;
      case 'web': window.open(value.startsWith('http') ? value : `https://${value}`, '_blank'); break;
      case 'wa': window.open(`https://wa.me/${value.replace(/[^0-9]/g, '')}`); break;
      case 'map': window.open(value.startsWith('http') ? value : `http://googleusercontent.com/maps.google.com/?q=${value}`, '_blank'); break;
      default: break;
    }
  };

  const handleSaveContact = () => {
    // Implement vCard generation logic here
    alert("Downloading Contact...");
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-0 font-sans">
      
      {/* === SCROLL WRAPPER (Exact classes requested) === */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col max-h-[calc(100vh-4rem)] md:max-w-md bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 md:rounded-3xl shadow-none md:shadow-2xl overflow-hidden min-h-screen md:min-h-auto"
      >
        {/* ADDED overflow-y-auto HERE so the inner content scrolls */}
        <div className="flex-1 overflow-x-hidden relative overflow-y-auto scrollbar-hide">
          
          {/* === ARTISTIC HEADER === */}
          <div className="relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 opacity-90"></div>
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
            
            {/* COMPANY LOGO (Top Right) */}
            {/* Even if no logo, we keep the structure, or render nothing */}
            {profile.companyLogo && (
              <div className="absolute top-4 right-4 z-20">
                 <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl shadow-lg border border-white/30">
                    <img src={profile.companyLogo} alt="Logo" className="w-8 h-8 object-contain brightness-0 invert" />
                 </div>
              </div>
            )}

            <div className="relative z-10 p-8 text-center pt-12">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="inline-block mb-4"
              >
                <div className="relative">
                  <div className="absolute -inset-2 bg-white rounded-full animate-ping opacity-20"></div>
                  <div className="relative w-32 h-32 rounded-full bg-white p-2">
                    <img 
                      src={profile.profilePhoto} 
                      alt={profile.fullName}
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-white/90 text-lg mb-3">{profile.jobTitle}</p>
              
              {profile.companyName && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                  <Star className="w-4 h-4 fill-white" />
                  <span>{profile.companyName}</span>
                </div>
              )}
            </div>
          </div>

          {/* === WAVY DIVIDER === */}
          <svg className="w-full -mt-1" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white"/>
          </svg>

          <div className="bg-white px-6 pb-12 -mt-1">
            
            {/* Tagline */}
            {profile.tagline && (
              <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 rounded-full">
                  <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                  <p className="text-slate-700 italic text-sm">"{profile.tagline}"</p>
                  <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                </div>
              </div>
            )}

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {profile.phones[0] && (
                <motion.button onClick={() => handleLink('phone', profile.phones[0].number)} whileHover={{ rotate: 5, scale: 1.1 }} whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-2xl shadow-lg">
                  <Phone className="w-6 h-6" />
                  <span className="text-xs font-bold">Call</span>
                </motion.button>
              )}
              {profile.emails[0] && (
                <motion.button onClick={() => handleLink('email', profile.emails[0].address)}   whileHover={{ rotate: 5, scale: 1.1 }}
            whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-pink-400 to-purple-500 text-white rounded-2xl shadow-lg">
                  <Mail className="w-6 h-6" />
                  <span className="text-xs font-bold">Email</span>
                </motion.button>
              )}
              {profile.websites[0] ? (
                <motion.button onClick={() => handleLink('web', profile.websites[0].url)}  whileHover={{ rotate: 5, scale: 1.1 }}
            whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-purple-400 to-indigo-500 text-white rounded-2xl shadow-lg">
                  <Globe className="w-6 h-6" />
                  <span className="text-xs font-bold">Web</span>
                </motion.button>
              ) : (
                <motion.button onClick={() => { if(navigator.share) navigator.share({title:profile.fullName, url:window.location.href}) }}   whileHover={{ rotate: 5, scale: 1.1 }}
            whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-blue-400 to-cyan-500 text-white rounded-2xl shadow-lg">
                  <Share2 className="w-6 h-6" />
                  <span className="text-xs font-bold">Share</span>
                </motion.button>
              )}
            </div>

            {/* === SAVE CONTACT (In-flow) === */}
            <motion.button
              onClick={handleSaveContact}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center gap-2 p-4 mb-8 bg-slate-900 text-white rounded-2xl shadow-xl shadow-slate-200"
            >
              <UserPlus className="w-5 h-5" />
              <span className="font-bold">Save Contact</span>
            </motion.button>

            {/* === NFC SECTION === */}
            {profile.nfcSettings?.isEnabled && (
              <div className="mb-8 p-1 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl">
                <div className="bg-white rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
                        <Wifi className="w-5 h-5" />
                     </div>
                     <div>
                       <h4 className="font-bold text-slate-800 text-sm">NFC Enabled</h4>
                       <p className="text-xs text-slate-500">Tap card to share</p>
                     </div>
                  </div>
                  <div className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg uppercase">
                    Ready
                  </div>
                </div>
              </div>
            )}

            {/* === INTRO VIDEO === */}
            {profile.profileVideo?.url && (
              <div className="mb-8">
                 <h3 className="text-center text-sm font-bold text-slate-700 mb-4 flex items-center justify-center gap-2">
                    <Video className="w-4 h-4 text-red-500" /> Video Intro
                 </h3>
                 <VideoPlayer src={profile.profileVideo.url} type={profile.profileVideo.uploadType} />
              </div>
            )}

            {/* Bio */}
            {profile.bio && (
              <div className="mb-6 p-6 bg-gradient-to-r from-yellow-50 to-pink-50 rounded-2xl border-2 border-dashed border-pink-300 relative">
                 <div className="absolute -top-3 left-6 bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-bold">Bio</div>
                 <p className="text-slate-700 text-sm leading-relaxed text-center">{profile.bio}</p>
              </div>
            )}

            {/* === ABOUT COMPANY === */}
            {profile.aboutText && (
               <div className="mb-8">
                 <h3 className="text-center text-sm font-bold text-slate-700 mb-4 flex items-center justify-center gap-2">
                   <Building2 className="w-4 h-4 text-purple-500" /> About Company
                 </h3>
                 <div className="p-5 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-indigo-100">
                    <p className="text-slate-700 text-sm leading-relaxed text-center italic">"{profile.aboutText}"</p>
                 </div>
               </div>
            )}

            {/* Contact Cards */}
            <div className="space-y-3 mb-3">
              {profile.phones.map((phone, idx) => (
                <motion.div key={idx} whileHover={{ x: 5 }} onClick={() => handleLink('phone', phone.number)} className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-md">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-orange-600 text-xs font-bold uppercase">{phone.label}</p>
                    <p className="text-slate-900 font-semibold">{phone.number}</p>
                  </div>
                </motion.div>
              ))}
              
              {profile.emails.map((email, idx) => (
                <motion.div key={idx} whileHover={{ x: 5 }} onClick={() => handleLink('email', email.address)} className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-md">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-purple-600 text-xs font-bold uppercase">{email.label}</p>
                    <p className="text-slate-900 font-semibold truncate max-w-[200px]">{email.address}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* === ADDRESSES === */}
            {profile.addresses.length > 0 && (
               <div className="space-y-3 mb-8">
                 {profile.addresses.map((addr, idx) => (
                   <motion.div key={idx} whileHover={{ x: 5 }} onClick={() => handleLink('map', addr.googleMapsLink || `${addr.street} ${addr.city}`)} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl cursor-pointer">
                     <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-md">
                       <MapPin className="w-6 h-6 text-white" />
                     </div>
                     <div className="flex-1">
                       <p className="text-cyan-700 text-xs font-bold uppercase">{addr.label}</p>
                       <p className="text-slate-900 font-semibold text-sm leading-snug">
                         {addr.street}, {addr.city}, {addr.state}
                       </p>
                     </div>
                   </motion.div>
                 ))}
               </div>
            )}

            {/* Social Links */}
            {profile.socialLinks.length > 0 && (
              <div className="mb-8">
                <h3 className="text-center text-sm font-bold text-slate-700 mb-4 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-500" /> Let's Connect <Sparkles className="w-4 h-4 text-yellow-500" />
                </h3>
                <div className="flex justify-center flex-wrap gap-3">
                  {profile.socialLinks.map((social, idx) => {
                    const colors = [
                      'from-blue-400 to-blue-600', 'from-cyan-400 to-cyan-600', 'from-pink-400 to-pink-600', 'from-purple-400 to-purple-600'
                    ];
                    return (
                      <motion.a
                        key={idx}
                        href={social.url}
                        target="_blank"
                        whileHover={{ y: -5, rotate: 360 }}
                        className={`w-14 h-14 rounded-full bg-gradient-to-br ${colors[idx % colors.length]} flex items-center justify-center shadow-lg`}
                      >
                        {getSocialIcon(social.platform)}
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Services */}
            {profile.services.length > 0 && (
              <div className="mb-8">
                <h3 className="text-center text-sm font-bold text-slate-700 mb-4 flex items-center justify-center gap-2">
                  <Award className="w-4 h-4 text-purple-500" /> What I Do <Award className="w-4 h-4 text-pink-500" />
                </h3>
                <div className="space-y-3">
                  {profile.services.map((service, idx) => {
                    const gradients = ['from-yellow-400 to-orange-500', 'from-pink-400 to-purple-500'];
                    return (
                      <motion.div key={idx} whileHover={{ scale: 1.02 }} className="p-4 bg-white rounded-2xl shadow-lg border-2 border-slate-100">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-slate-900">{service.name}</h4>
                          {service.price && <span className={`px-3 py-1 bg-gradient-to-r ${gradients[idx % gradients.length]} text-white text-sm font-bold rounded-full`}>${service.price}</span>}
                        </div>
                        <p className="text-slate-600 text-xs mb-2">{service.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* === BUSINESS HOURS === */}
            {profile.businessHours.length > 0 && (
               <div className="mb-8">
                 <h3 className="text-center text-sm font-bold text-slate-700 mb-4 flex items-center justify-center gap-2">
                   <Clock className="w-4 h-4 text-green-500" /> Opening Hours
                 </h3>
                 <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100">
                    {profile.businessHours.map((h, i) => (
                      <div key={i} className="flex justify-between text-sm py-1 border-b border-slate-50 last:border-0">
                         <span className="capitalize text-slate-500 font-medium">{h.day}</span>
                         <span className={h.isClosed ? "text-red-400 font-bold" : "text-green-600 font-bold"}>
                            {h.isClosed ? "Closed" : `${h.openingTime} - ${h.closingTime}`}
                         </span>
                      </div>
                    ))}
                 </div>
               </div>
            )}

            {/* === DOWNLOADS === */}
            {profile.downloads.length > 0 && (
               <div className="mb-8">
                  <h3 className="text-center text-sm font-bold text-slate-700 mb-4 flex items-center justify-center gap-2">
                    <Download className="w-4 h-4 text-blue-500" /> Documents
                  </h3>
                  <div className="space-y-3">
                     {profile.downloads.map((dl, i) => (
                        <a key={i} href={dl.fileUrl} download className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:bg-slate-100 transition-colors">
                           <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white">
                              <FileText className="w-5 h-5"/>
                           </div>
                           <div className="flex-1">
                              <p className="text-sm font-bold text-slate-800">{dl.name || "File"}</p>
                              <p className="text-xs text-slate-500">{dl.fileType || "PDF"}</p>
                           </div>
                           <Download className="w-4 h-4 text-slate-400"/>
                        </a>
                     ))}
                  </div>
               </div>
            )}

          </div>

          {/* Footer (Simplified) */}
          <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 px-8 py-6 text-center">
             <p className="text-white font-bold text-sm tracking-widest">{profile.brandLabel}</p>
             <p className="text-white/70 text-[10px] uppercase mt-1">Powered by GravityWave</p>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
};

export default ModernCard2;