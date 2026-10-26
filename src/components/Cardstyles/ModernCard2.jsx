import React, { useState } from 'react';
import { 
  Mail, Phone, Globe, MapPin, Linkedin, Twitter, Instagram, 
  Sparkles, Award, ChevronRight, Share2, UserPlus, 
  Facebook, Github, Youtube, MessageCircle, Clock, Download, 
  FileText, Wifi, Video, Briefcase, Building2, CheckCircle2,
  ShieldCheck, ArrowUpRight, Copy, Check, Send, Calendar,
  ExternalLink, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateVCard } from '../../utility/vcard';

// --- HELPER: Social Icons & Brand Colors ---
const getSocialMeta = (platform) => {
  const p = platform?.toLowerCase() || '';
  if (p.includes('linkedin')) {
    return {
      icon: <Linkedin className="w-4 h-4 text-white" />,
      bg: 'bg-[#0A66C2] hover:bg-[#084e96]',
      name: 'LinkedIn'
    };
  }
  if (p.includes('twitter') || p.includes('x')) {
    return {
      icon: <Twitter className="w-4 h-4 text-white" />,
      bg: 'bg-black hover:bg-neutral-800 border border-neutral-700',
      name: 'X (Twitter)'
    };
  }
  if (p.includes('github')) {
    return {
      icon: <Github className="w-4 h-4 text-white" />,
      bg: 'bg-[#24292F] hover:bg-[#1a1e22]',
      name: 'GitHub'
    };
  }
  if (p.includes('instagram')) {
    return {
      icon: <Instagram className="w-4 h-4 text-white" />,
      bg: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
      name: 'Instagram'
    };
  }
  if (p.includes('facebook')) {
    return {
      icon: <Facebook className="w-4 h-4 text-white" />,
      bg: 'bg-[#1877F2] hover:bg-[#0c63d4]',
      name: 'Facebook'
    };
  }
  if (p.includes('youtube')) {
    return {
      icon: <Youtube className="w-4 h-4 text-white" />,
      bg: 'bg-[#FF0000] hover:bg-[#cc0000]',
      name: 'YouTube'
    };
  }
  if (p.includes('whatsapp')) {
    return {
      icon: <MessageCircle className="w-4 h-4 text-white" />,
      bg: 'bg-[#25D366] hover:bg-[#1faa4f]',
      name: 'WhatsApp'
    };
  }
  return {
    icon: <Globe className="w-4 h-4 text-white" />,
    bg: 'bg-slate-700 hover:bg-slate-600',
    name: 'Website'
  };
};

// --- HELPER: Responsive Video Player ---
const VideoPlayer = ({ src, type, title = "Video" }) => {
  if (!src) return null;
  const videoUrl = typeof src === 'object' && src.url ? src.url : src;
  if (!videoUrl || typeof videoUrl !== 'string') return null;

  if (type === 'youtube' || videoUrl.includes('youtube') || videoUrl.includes('youtu.be')) {
    let videoId = '';
    if (videoUrl.includes('v=')) {
      videoId = videoUrl.split('v=')[1]?.split('&')[0];
    } else if (videoUrl.includes('youtu.be/')) {
      videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
    } else {
      videoId = videoUrl.split('/').pop();
    }

    return (
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/60 aspect-video my-3">
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://www.youtube.com/embed/${videoId}`} 
          frameBorder="0" 
          allowFullScreen 
          title={title}
          className="w-full h-full"
        />
      </div>
    );
  }
  
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black aspect-video my-3">
      <video controls className="w-full h-full object-contain">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// --- HELPER: Live Business Hours Status ---
const getBusinessStatus = (businessHours = []) => {
  if (!businessHours || businessHours.length === 0) return null;
  
  const now = new Date();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDayName = days[now.getDay()];
  
  const todaySchedule = businessHours.find(h => h.day?.toLowerCase() === currentDayName);
  if (!todaySchedule || todaySchedule.isClosed) {
    return { isOpen: false, text: 'Closed Today' };
  }

  if (!todaySchedule.openingTime || !todaySchedule.closingTime) {
    return { isOpen: true, text: 'Open Today' };
  }

  const [openH, openM] = todaySchedule.openingTime.split(':').map(Number);
  const [closeH, closeM] = todaySchedule.closingTime.split(':').map(Number);
  
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  if (currentMinutes >= openMinutes && currentMinutes <= closeMinutes) {
    return { isOpen: true, text: `Open until ${todaySchedule.closingTime}` };
  }
  return { isOpen: false, text: `Closed • Opens ${todaySchedule.openingTime}` };
};

const ModernCard2 = ({ cardData = {}, data = {}, plan = '' }) => {
  const safeData = Object.keys(cardData).length > 0 ? cardData : data;

  // --- STATE FOR INTERACTIVE FEATURES ---
  const [copiedItem, setCopiedItem] = useState(null);
  const [inquiryData, setInquiryData] = useState({
    service: '',
    date: '',
    time: '',
    contact: '',
    submitted: false
  });

  // --- RESILIENT DATA MAPPING ---
  const profile = {
    prefix: safeData.prefix || '',
    firstName: safeData.firstName || 'User',
    lastName: safeData.lastName || '',
    fullName: `${safeData.prefix ? safeData.prefix + ' ' : ''}${safeData.firstName || ''} ${safeData.lastName || ''}`.trim() || 'Professional Contact',
    jobTitle: safeData.jobTitle || '',
    department: safeData.department || '',
    companyName: safeData.companyName || safeData.organization || '',
    companyLogo: safeData.companyLogo,
    profilePhoto: safeData.profilePhoto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    tagline: safeData.tagline || '',
    bio: safeData.bio || '',
    aboutText: safeData.aboutText || '',
    foundedName: safeData.foundedName || '',
    organization: safeData.organization || '',
    
    // Resilient arrays
    phones: Array.isArray(safeData.phones) && safeData.phones.length > 0 
      ? safeData.phones 
      : safeData.phone ? [{ label: 'Work', number: safeData.phone }] : [],
    emails: Array.isArray(safeData.emails) && safeData.emails.length > 0
      ? safeData.emails
      : safeData.email ? [{ label: 'Work', address: safeData.email }] : [],
    websites: Array.isArray(safeData.websites) && safeData.websites.length > 0
      ? safeData.websites
      : safeData.website ? [{ label: 'Website', url: safeData.website }] : [],
    socialLinks: safeData.socialLinks || [],
    addresses: safeData.addresses || [],
    
    services: safeData.services || [],
    products: safeData.products || [],
    businessHours: safeData.businessHours || [],
    downloads: safeData.downloads || [],
    profileVideo: safeData.profileVideo,
    productVideo: safeData.productVideo,
    nfcSettings: safeData.nfcSettings || { isEnabled: false },
    serviceArea: safeData.serviceArea || '',
    serviceAvailability: safeData.serviceAvailability || '',
    cardType: safeData.cardType || plan || 'Business',
    brandLabel: safeData.brandLabel || 'Revayah One Verified'
  };

  const primaryPhone = profile.phones[0]?.number || '';
  const primaryEmail = profile.emails[0]?.address || safeData.email || '';
  const primaryWebsite = profile.websites[0]?.url || '';
  const businessStatus = getBusinessStatus(profile.businessHours);

  // Copy helper
  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedItem(key);
    setTimeout(() => setCopiedItem(null), 2200);
  };

  // Direct action links
  const handleCall = (num) => {
    if (!num) return;
    window.location.href = `tel:${num.replace(/\s+/g, '')}`;
  };

  const handleWhatsApp = (num) => {
    const cleanNum = (num || primaryPhone).replace(/\D/g, '');
    if (!cleanNum) return;
    const greeting = encodeURIComponent(`Hello ${profile.fullName}, I connected with you via your Revayah One digital card.`);
    window.open(`https://wa.me/${cleanNum}?text=${greeting}`, '_blank');
  };

  const handleEmail = (email) => {
    if (!email) return;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Inquiry via Revayah One: ${profile.fullName}`)}`;
  };

  const handleWebsite = (url) => {
    if (!url) return;
    const cleanUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(cleanUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSaveContact = () => {
    generateVCard(safeData);
  };

  const handleNativeShare = () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: `${profile.fullName} | Digital Identity Card`,
      text: `Connect with ${profile.fullName} (${profile.jobTitle || 'Professional'}) on Revayah One:`,
      url: shareUrl
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {
        handleCopy(shareUrl, 'shareUrl');
      });
    } else {
      handleCopy(shareUrl, 'shareUrl');
    }
  };

  const handleSendInquiry = () => {
    if (!inquiryData.service || !inquiryData.contact) {
      alert("Please provide the service required and your contact number.");
      return;
    }
    const cleanPhone = primaryPhone.replace(/\D/g, '');
    const message = `Hello ${profile.fullName}!\n\nI would like to request a consultation via your Revayah One card:\n- Service: ${inquiryData.service}\n- Preferred Date: ${inquiryData.date || 'Flexible'}\n- Preferred Time: ${inquiryData.time || 'Flexible'}\n- Customer Contact: ${inquiryData.contact}`;
    
    setInquiryData(prev => ({ ...prev, submitted: true }));

    if (cleanPhone) {
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
    } else if (primaryEmail) {
      window.location.href = `mailto:${primaryEmail}?subject=${encodeURIComponent(`Service Request: ${inquiryData.service}`)}&body=${encodeURIComponent(message)}`;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col items-center justify-start p-0 font-sans antialiased selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      
      {/* Outer Executive Content Wrapper */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md bg-[#0B0F19] overflow-hidden relative flex flex-col"
      >
        
        {/* Ambient Top Glow Mesh */}
        <div className="absolute top-0 inset-x-0 h-64 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-indigo-600/30 via-violet-600/20 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-bl from-cyan-500/25 via-blue-600/20 to-transparent rounded-full blur-3xl" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* --- TOP BRANDING NAV --- */}
        <div className="relative z-10 px-6 pt-5 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
              {profile.brandLabel}
            </span>
          </div>

          <button 
            type="button"
            onClick={handleNativeShare}
            className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
            title="Share Card"
          >
            {copiedItem === 'shareUrl' ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* --- EXECUTIVE PROFILE HEADER --- */}
        <div className="relative z-10 px-6 pt-4 pb-6 text-center">
          
          {/* Avatar & Badges */}
          <div className="relative inline-block mb-4">
            <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-violet-500 to-cyan-400 shadow-xl shadow-indigo-950/60">
              <img 
                src={profile.profilePhoto} 
                alt={profile.fullName}
                className="w-full h-full object-cover rounded-full bg-slate-900"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600";
                }}
              />
            </div>

            {/* Verified Identity Badge */}
            <div 
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-slate-900 border-2 border-[#0B0F19] flex items-center justify-center shadow-lg"
              title="Verified Identity"
            >
              <CheckCircle2 className="w-5 h-5 text-indigo-400 fill-indigo-500/20" />
            </div>

            {/* Company Logo Top-Right Overlay if provided */}
            {profile.companyLogo && (
              <div className="absolute -top-1 -right-2 w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-700/80 p-1.5 shadow-lg backdrop-blur-md">
                <img 
                  src={profile.companyLogo} 
                  alt="Company Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          {/* Full Name & Title */}
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
            {profile.fullName}
          </h1>

          {profile.jobTitle && (
            <p className="text-sm font-medium text-indigo-300/90 mb-2">
              {profile.jobTitle}
            </p>
          )}

          {profile.companyName && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-medium mb-3">
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>{profile.companyName}</span>
              {profile.department && (
                <>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">{profile.department}</span>
                </>
              )}
            </div>
          )}

          {/* Availability & Location Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
            {businessStatus && (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                businessStatus.isOpen 
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30' 
                  : 'bg-slate-900/80 text-slate-400 border-slate-700/50'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${businessStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                {businessStatus.text}
              </span>
            )}

            {profile.serviceArea && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">
                <MapPin className="w-3 h-3 text-indigo-400" />
                {profile.serviceArea}
              </span>
            )}
          </div>

          {/* Tagline / Value Proposition */}
          {profile.tagline && (
            <div className="mt-4 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-slate-800/80 text-slate-300 text-xs italic">
              "{profile.tagline}"
            </div>
          )}
        </div>

        {/* --- MAIN BODY CONTENT --- */}
        <div className="flex-1 px-6 pb-10 space-y-6">

          {/* PRIMARY ACTION CTA: Save Contact to Phone (RFC 2426 vCard) */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleSaveContact}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 border border-indigo-400/30 transition-all cursor-pointer group"
          >
            <Download className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
            <span>Save Contact to Phone</span>
          </motion.button>

          {/* QUICK ACTION DOCK (Call, WhatsApp, Email, Website) */}
          <div className="grid grid-cols-4 gap-2.5">
            {/* Call */}
            <button
              type="button"
              disabled={!primaryPhone}
              onClick={() => handleCall(primaryPhone)}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition-all active:scale-95 disabled:opacity-40 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-1.5 group-hover:bg-blue-500/20 transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium text-slate-300">Call</span>
            </button>

            {/* WhatsApp */}
            <button
              type="button"
              disabled={!primaryPhone}
              onClick={() => handleWhatsApp(primaryPhone)}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition-all active:scale-95 disabled:opacity-40 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-1.5 group-hover:bg-emerald-500/20 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium text-slate-300">WhatsApp</span>
            </button>

            {/* Email */}
            <button
              type="button"
              disabled={!primaryEmail}
              onClick={() => handleEmail(primaryEmail)}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition-all active:scale-95 disabled:opacity-40 group"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-1.5 group-hover:bg-violet-500/20 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium text-slate-300">Email</span>
            </button>

            {/* Website / Portfolio */}
            <button
              type="button"
              disabled={!primaryWebsite}
              onClick={() => handleWebsite(primaryWebsite)}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition-all active:scale-95 disabled:opacity-40 group"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-1.5 group-hover:bg-cyan-500/20 transition-colors">
                <Globe className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium text-slate-300">Website</span>
            </button>
          </div>

          {/* NFC CARD STATUS (if enabled) */}
          {profile.nfcSettings?.isEnabled && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Wifi className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">NFC Smart Tag Connected</h4>
                  <p className="text-[10px] text-slate-400">Tap physical card to exchange identity</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase tracking-wider">
                Active
              </span>
            </div>
          )}

          {/* DIRECT CUSTOMER INQUIRY & CONSULTATION FUNNEL */}
          <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Send className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Service Inquiry & Consultation
                  </h3>
                  <p className="text-[10px] text-slate-400">Connect directly with {profile.fullName}</p>
                </div>
              </div>

              {profile.serviceAvailability && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-medium">
                  {profile.serviceAvailability}
                </span>
              )}
            </div>

            {inquiryData.submitted ? (
              <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-center space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-emerald-300">Inquiry Transmitted</h4>
                <p className="text-[11px] text-slate-300">
                  Connecting directly with {profile.fullName} via WhatsApp...
                </p>
                <button
                  type="button"
                  onClick={() => setInquiryData(prev => ({ ...prev, submitted: false }))}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 underline pt-1 inline-block"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <div className="space-y-2.5 pt-1">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                    Service Required <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={inquiryData.service}
                    onChange={(e) => setInquiryData(prev => ({ ...prev, service: e.target.value }))}
                    placeholder={profile.services[0]?.name || "e.g. Enterprise Cloud Consulting"}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={inquiryData.date}
                      onChange={(e) => setInquiryData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      value={inquiryData.time}
                      onChange={(e) => setInquiryData(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                    Customer Contact Phone <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={inquiryData.contact}
                    onChange={(e) => setInquiryData(prev => ({ ...prev, contact: e.target.value }))}
                    placeholder="Your phone number or WhatsApp"
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSendInquiry}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs shadow-md shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send Inquiry via WhatsApp</span>
                </button>
              </div>
            )}
          </div>

          {/* PROFESSIONAL SERVICES SHOWCASE */}
          {profile.services.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Services & Solutions ({profile.services.length})
                  </h3>
                </div>
              </div>

              <div className="space-y-2.5">
                {profile.services.map((service, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        {service.category && (
                          <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">
                            {service.category}
                          </span>
                        )}
                        <h4 className="text-sm font-bold text-white leading-snug">
                          {service.name}
                        </h4>
                      </div>

                      {service.price && (
                        <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold whitespace-nowrap">
                          {service.currency === 'EUR' ? '€' : service.currency === 'INR' ? '₹' : '$'}
                          {service.price}
                          {service.duration && <span className="text-[10px] font-normal text-slate-400 ml-1">/ {service.duration}</span>}
                        </span>
                      )}
                    </div>

                    {service.description && (
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {service.description}
                      </p>
                    )}

                    <div className="pt-1 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setInquiryData(prev => ({
                            ...prev,
                            service: service.name,
                            submitted: false
                          }));
                          window.scrollTo({ top: 350, behavior: 'smooth' });
                        }}
                        className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        <span>Inquire About This</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABOUT / COMPANY OVERVIEW */}
          {(profile.aboutText || profile.bio) && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  About & Background
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs leading-relaxed space-y-2.5">
                {profile.bio && (
                  <p>{profile.bio}</p>
                )}
                {profile.aboutText && profile.aboutText !== profile.bio && (
                  <div className="pt-2 border-t border-slate-800/80 text-slate-400">
                    <p className="whitespace-pre-line">{profile.aboutText}</p>
                  </div>
                )}
                {profile.foundedName && (
                  <div className="pt-2 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">Founded by:</span> {profile.foundedName}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CONTACT HUB DETAILS */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4 text-indigo-400" />
              Contact Information
            </h3>

            <div className="space-y-2">
              {/* Phones */}
              {profile.phones.map((phone, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        {phone.label || 'Phone'}
                      </span>
                      <p className="text-xs font-semibold text-white">{phone.number}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleCopy(phone.number, `phone_${idx}`)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                      title="Copy Number"
                    >
                      {copiedItem === `phone_${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCall(phone.number)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                    >
                      Call
                    </button>
                  </div>
                </div>
              ))}

              {/* Emails */}
              {profile.emails.map((email, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        {email.label || 'Email'}
                      </span>
                      <p className="text-xs font-semibold text-white truncate max-w-[190px]">{email.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(email.address, `email_${idx}`)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                      title="Copy Email"
                    >
                      {copiedItem === `email_${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEmail(email.address)}
                      className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold"
                    >
                      Send
                    </button>
                  </div>
                </div>
              ))}

              {/* Websites */}
              {profile.websites.map((web, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        {web.label || 'Portal'}
                      </span>
                      <p className="text-xs font-semibold text-white truncate max-w-[190px]">{web.url}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleWebsite(web.url)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1 shrink-0"
                  >
                    <span>Visit</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* PHYSICAL LOCATION & MAP */}
          {profile.addresses.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400" />
                Office Location
              </h3>

              {profile.addresses.map((addr, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3"
                >
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {addr.label || 'Location'}
                    </span>
                    <p className="text-xs font-semibold text-white mt-0.5">
                      {[addr.street, addr.city, addr.state, addr.postalCode, addr.country].filter(Boolean).join(', ')}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const mapUrl = addr.googleMapsLink || `https://maps.google.com/?q=${encodeURIComponent([addr.street, addr.city, addr.state, addr.country].filter(Boolean).join(' '))}`;
                      window.open(mapUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Open in Google Maps</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* BUSINESS HOURS */}
          {profile.businessHours.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                Business Hours
              </h3>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 divide-y divide-slate-800/80">
                {profile.businessHours.map((h, i) => (
                  <div key={i} className="flex justify-between items-center py-2 text-xs first:pt-0 last:pb-0">
                    <span className="capitalize font-medium text-slate-400">{h.day}</span>
                    <span className={`font-semibold ${h.isClosed ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {h.isClosed ? 'Closed' : `${h.openingTime} - ${h.closingTime}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIDEOS & MEDIA */}
          {(profile.profileVideo?.url || profile.productVideo?.url) && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Video className="w-4 h-4 text-indigo-400" />
                Media & Video Showcase
              </h3>

              {profile.profileVideo?.url && (
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">
                    {profile.profileVideo.title || "Introduction Video"}
                  </p>
                  <VideoPlayer src={profile.profileVideo.url} type={profile.profileVideo.uploadType} title={profile.profileVideo.title} />
                </div>
              )}

              {profile.productVideo?.url && (
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">
                    {profile.productVideo.title || "Product / Service Showcase"}
                  </p>
                  <VideoPlayer src={profile.productVideo.url} type={profile.productVideo.uploadType} title={profile.productVideo.title} />
                </div>
              )}
            </div>
          )}

          {/* SOCIAL CHANNELS */}
          {profile.socialLinks.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Verified Professional Networks
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {profile.socialLinks.map((social, idx) => {
                  const meta = getSocialMeta(social.platform);
                  return (
                    <motion.a
                      key={idx}
                      href={social.url.startsWith('http') ? social.url : `https://${social.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-white shadow-md ${meta.bg} transition-all`}
                    >
                      {meta.icon}
                      <span>{meta.name}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          )}

          {/* DOWNLOADS & BROCHURES */}
          {profile.downloads.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                Documents & Brochures
              </h3>

              <div className="space-y-2">
                {profile.downloads.map((doc, idx) => (
                  <a
                    key={idx}
                    href={doc.fileUrl}
                    download
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">{doc.name || 'Document'}</p>
                        <p className="text-[10px] text-slate-500 uppercase">{doc.fileType || 'PDF'}</p>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* --- EXECUTIVE FOOTER --- */}
        <div className="mt-auto px-6 py-5 bg-[#080B12] border-t border-slate-800/80 text-center space-y-1">
          <p className="text-xs font-semibold text-slate-300 tracking-wide">
            {profile.companyName || 'Revayah One'}
          </p>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">
            Verified Digital Identity • Powered by Revayah One
          </p>
        </div>

      </motion.div>
    </div>
  );
};

export default ModernCard2;