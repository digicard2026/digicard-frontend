import React, { useState } from 'react';
import { 
  FaLinkedin, FaInstagram, FaEnvelope, 
  FaMapMarkerAlt, FaChevronRight, FaGlobe, 
  FaPhoneAlt, FaWhatsapp, FaUser, FaStar, 
  FaDownload, FaBriefcase, FaTimes, 
  FaQuoteLeft, FaChartLine, FaPalette, FaHandshake, 
  FaTrophy, FaCheck, FaShareAlt, FaBullhorn, FaShieldAlt
} from 'react-icons/fa';
import { FaYoutube, FaFacebookF } from "react-icons/fa6";
import { generateVCard } from '../../utility/vcard';
import { CARD_URL } from '../../utility/constants';

// --- CONFIG: Plan Features Matrix (Synchronized with Backend Tiers) ---
const personalAllowed = [
  'profilePhoto', 'firstName', 'lastName', 'prefix', 'suffix', 'jobTitle',
  'tagline', 'aboutText', 'bio', 'phones', 'email', 'emails', 'websites',
  'addresses', 'enableOneTapCall', 'enableWhatsApp', 'enableEmail', 'socialLinks',
  'dynamicQRCode', 'shareableUrl', 'shareableLink'
];

const businessAllowed = [
  ...personalAllowed,
  'companyName', 'companyLogo', 'logoSize', 'department', 'organization',
  'businessHours', 'virtualNumber', 'profileVideo', 'services', 'servicesProducts',
  'gallery', 'catalog', 'catalogPDF', 'productVideo', 'nfcSettings', 'downloads'
];

const businessPremiumAllowed = [
  ...businessAllowed,
  'serviceArea', 'serviceAvailability', 'customerInquiry', 'interactiveElements',
  'individualProductDisplay', 'clientList', 'businessCardInstagram', 'textbooks',
  'chatAssistant', 'liveChat', 'foundedName', 'brandLabel', 'productRangeDisplay'
];

const professionalsAllowed = [
  ...businessPremiumAllowed,
  'testimonials', 'videos'
];

const cardFieldsConfig = {
  Personal: personalAllowed,
  Business: businessAllowed,
  BusinessPremium: businessPremiumAllowed,
  Professionals: professionalsAllowed,
  ProfessionalPro: professionalsAllowed,
  Entrepreneurials: professionalsAllowed,
  EntrepreneurialsMulti: professionalsAllowed,
  CorporateBusiness: professionalsAllowed,
  Team: professionalsAllowed,
  MiniWebsite: professionalsAllowed
};

// --- SVG Leaf Branch Motif ---
const LeafBranch = ({ className = "" }) => (
  <svg viewBox="0 0 140 200" fill="currentColor" className={`text-[#0c2340] ${className}`}>
    <path d="M 10 190 Q 70 130 120 20" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.25" />
    <path d="M 120 20 C 125 10 135 15 130 30 C 120 40 110 35 120 20 Z" opacity="0.3" />
    <path d="M 95 60 C 115 50 125 60 115 75 C 100 85 90 75 95 60 Z" opacity="0.3" />
    <path d="M 75 100 C 95 90 105 100 95 115 C 80 125 70 115 75 100 Z" opacity="0.3" />
    <path d="M 50 140 C 70 130 80 140 70 155 C 55 165 45 155 50 140 Z" opacity="0.3" />
    <path d="M 80 65 C 60 55 50 65 60 80 C 75 90 85 80 80 65 Z" opacity="0.25" />
    <path d="M 60 105 C 40 95 30 105 40 120 C 55 130 65 120 60 105 Z" opacity="0.25" />
    <path d="M 35 145 C 15 135 5 145 15 160 C 30 170 40 160 35 145 Z" opacity="0.25" />
  </svg>
);

const ModernCard = ({ cardData = {}, plan = 'BusinessPremium', isPreview = false, isSnapshot = false, onShare }) => {
  if (!cardData || typeof cardData !== 'object') return null;

  // --- STATE FOR INTERACTIVE FEATURES ---
  const [copiedItem, setCopiedItem] = useState(null);
  const [showAboutMore, setShowAboutMore] = useState(false);
  const [selectedPortfolioImg, setSelectedPortfolioImg] = useState(null);

  // --- RESILIENT DATA MAPPING ---
  const profile = {
    name: `${cardData.prefix ? cardData.prefix + ' ' : ''}${cardData.firstName || ''} ${cardData.lastName || ''}`.trim() || 'Priya Sharma',
    jobTitle: cardData.jobTitle || 'Marketing Manager',
    companyName: cardData.companyName || cardData.organization || 'BrightPath Solutions',
    slogan: cardData.tagline && cardData.tagline.length < 35 ? cardData.tagline : 'Innovate • Grow • Excel',
    companyLogo: cardData.companyLogo,
    profilePhoto: cardData.profilePhoto || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    tagline: cardData.tagline || 'Helping businesses grow with innovative digital solutions.',
    aboutText: cardData.aboutText || cardData.bio || 'I am a Marketing Manager with over 10 years of experience in brand strategy, digital marketing and business growth.',
    
    phones: Array.isArray(cardData.phones) && cardData.phones.length > 0 
      ? cardData.phones 
      : cardData.phone ? [{ number: cardData.phone }] : [{ number: '+91 98765 43210' }],
    emails: Array.isArray(cardData.emails) && cardData.emails.length > 0 
      ? cardData.emails 
      : cardData.email ? [{ address: cardData.email }] : [{ address: 'priya@brightpath.in' }],
    addresses: Array.isArray(cardData.addresses) && cardData.addresses.length > 0
      ? cardData.addresses
      : [{ city: 'Bengaluru', country: 'India' }],
    socialLinks: cardData.socialLinks || [
      { platform: 'linkedin', url: 'https://linkedin.com' },
      { platform: 'facebook', url: 'https://facebook.com' },
      { platform: 'youtube', url: 'https://youtube.com' },
      { platform: 'instagram', url: 'https://instagram.com' }
    ],

    services: cardData.services || [],
    businessHours: cardData.businessHours || [],
    downloads: cardData.downloads || [],
    testimonials: Array.isArray(cardData.testimonials) && cardData.testimonials.length > 0
      ? cardData.testimonials
      : [
          {
            clientName: 'Rahul Mehta',
            position: 'CEO',
            company: 'Growth Plus',
            testimonial: "Priya's strategic approach and dedication helped our brand grow significantly.",
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
          }
        ],
    gallery: Array.isArray(cardData.gallery) && cardData.gallery.length > 0
      ? cardData.gallery
      : [
          {
            title: 'Analytics Dashboard',
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400'
          },
          {
            title: 'DIGITAL MARKETING',
            url: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=400'
          },
          {
            title: 'City Architecture',
            url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400'
          }
        ]
  };

  const primaryPhone = profile.phones[0]?.number || '+91 98765 43210';
  const primaryEmail = profile.emails[0]?.address || 'priya@brightpath.in';
  const primaryAddress = profile.addresses[0] || { city: 'Bengaluru', country: 'India' };
  const addressFormatted = [primaryAddress.city, primaryAddress.country].filter(Boolean).join(', ') || 'Bengaluru, India';

  // --- ACTIONS ---
  const handleCall = (num) => {
    if (!num) return;
    window.location.href = `tel:${num.replace(/\s+/g, '')}`;
  };

  const handleWhatsApp = (num) => {
    const cleanNum = (num || primaryPhone).replace(/\D/g, '');
    if (!cleanNum) return;
    const greeting = encodeURIComponent(`Hello ${profile.name}, I connected with you via your digital business card.`);
    window.open(`https://wa.me/${cleanNum}?text=${greeting}`, '_blank');
  };

  const handleEmail = (email) => {
    if (!email) return;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Inquiry for ${profile.name}`)}`;
  };

  const handleSaveContact = () => {
    generateVCard(cardData);
  };

  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedItem(key);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleNativeShare = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (onShare) {
      onShare();
      return;
    }

    const isLocal = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
    const origin = isLocal ? "https://www.revayah.one" : (typeof window !== "undefined" ? window.location.origin : "https://www.revayah.one");
    const slug = cardData?.urlSlug || cardData?.shareableUrl || "";
    const shareUrl = slug ? `${origin}/preview/${slug}` : (typeof window !== "undefined" ? window.location.href : "https://www.revayah.one");
    const shareTitle = `${profile.name} | Digital Card`;
    const shareText = `Hi! Here's my digital business card:\n${shareUrl}`;

    if (navigator.share) {
      navigator.share({ title: shareTitle, text: shareText, url: shareUrl }).catch((err) => {
        if (err.name !== "AbortError") {
          handleCopy(shareUrl, 'shareUrl');
        }
      });
    } else {
      handleCopy(shareUrl, 'shareUrl');
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
    }
  };

  // Expertise Items: Exactly 4 items in a 1-row grid matching the screenshot
  const defaultExpertise = [
    { title: "Digital\nMarketing", icon: <FaBullhorn className="w-5 h-5" /> },
    { title: "Brand\nStrategy", icon: <FaPalette className="w-5 h-5" /> },
    { title: "Content\nCreation", icon: <FaChartLine className="w-5 h-5" /> },
    { title: "Business\nConsulting", icon: <FaHandshake className="w-5 h-5" /> }
  ];

  const expertiseItems = profile.services && profile.services.length >= 4
    ? profile.services.slice(0, 4).map((s, idx) => {
        const icons = [
          <FaBullhorn className="w-5 h-5" />, 
          <FaPalette className="w-5 h-5" />, 
          <FaChartLine className="w-5 h-5" />, 
          <FaHandshake className="w-5 h-5" />
        ];
        return { title: s.name, icon: icons[idx] };
      })
    : defaultExpertise;

  // Snapshot view for WhatsApp share image
  if (isSnapshot) {
    const rawPhoto = profile.profilePhoto;
    const photoSrc = (rawPhoto && rawPhoto.startsWith('http') && !rawPhoto.includes('unsplash.com'))
      ? `${CARD_URL}/proxy-image?url=${encodeURIComponent(rawPhoto)}`
      : rawPhoto;

    return (
      <div className="w-[380px] max-w-full bg-white text-slate-800 flex flex-col items-center justify-start p-0 font-sans antialiased overflow-hidden rounded-[28px] border border-slate-200 shadow-xl relative">
        <div className="relative w-full bg-white pt-5 pb-3 px-5 text-center">
          {/* Top Bar: Brand Pill (Left) + Share Indicator (Right) */}
          <div className="flex items-center justify-between mb-3 text-left">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c2340] border border-[#c8973b]/50 shadow-sm">
              <FaShieldAlt className="w-3.5 h-3.5 text-[#c8973b]" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                REVAYAH ONE
              </span>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#0c2340] text-white flex items-center justify-center shadow-xs">
              <FaShareAlt className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* Hero Identity: Avatar on Left, Text on Right */}
          <div className="flex items-center gap-3 mb-2 text-left">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full p-[2px] bg-white shadow-md border-2 border-[#c8973b] overflow-hidden">
                <img
                  src={photoSrc}
                  alt={profile.name}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600";
                  }}
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-[#0c2340] leading-tight">{profile.name}</h1>
              <p className="text-xs font-bold text-[#0c2340]">{profile.jobTitle}</p>
              <p className="text-[11px] font-medium text-[#0c2340]">{profile.companyName}</p>
              <div className="w-8 h-[1px] bg-[#c8973b] my-1" />
              <p className="text-[10px] text-slate-500 italic leading-snug">"{profile.tagline}"</p>
            </div>
          </div>
        </div>

        {/* Action Buttons Mock */}
        <div className="w-full px-5 py-2 flex items-center justify-center gap-2">
          <div className="flex-1 py-2 px-3 rounded-full bg-[#0c2340] text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 shadow-sm">
            <FaPhoneAlt className="w-3 h-3" />
            <span>Call</span>
          </div>
          <div className="flex-1 py-2 px-3 rounded-full bg-[#25D366] text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 shadow-sm">
            <FaWhatsapp className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </div>
          <div className="flex-1 py-2 px-3 rounded-full bg-white text-[#0c2340] border border-[#0c2340] text-[11px] font-semibold flex items-center justify-center gap-1.5 shadow-sm">
            <FaEnvelope className="w-3 h-3" />
            <span>Email</span>
          </div>
        </div>

        {/* Bottom Wave Footer */}
        <div className="w-full mt-3 relative">
          <svg className="w-full h-10 block" viewBox="0 0 400 60" preserveAspectRatio="none" fill="none">
            <path d="M 0 25 Q 150 0 400 20 L 400 60 L 0 60 Z" fill="#0c2340" />
            <path d="M 0 25 Q 150 0 400 20" stroke="#d4a373" strokeWidth="2.5" />
          </svg>
          <div className="bg-[#0c2340] pb-3 px-4 text-center text-white">
            <span className="text-[10px] text-slate-300 font-medium">
              Powered by <strong className="text-amber-400">Reva-Yah One</strong> • One Link. Endless Possibilities.
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // EXACT MAIN CARD LAYOUT (MATCHING LEFT HALF OF SCREENSHOT)
  // ========================================================
  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-start p-0 font-sans antialiased selection:bg-[#0c2340] selection:text-white relative overflow-x-hidden">
      
      {/* Edge-to-Edge Container (Aligned with DefaultCard.jsx) */}
      <div className="w-full max-w-md bg-white flex flex-col relative overflow-hidden min-h-screen shadow-xl">

        {/* ========================================================
            HERO HEADER: LOGO, HAMBURGER, AVATAR (LEFT) & INFO (RIGHT)
            ======================================================== */}
        <div className="relative w-full bg-gradient-to-b from-slate-50/90 via-white to-white px-5 pt-4 pb-3 overflow-hidden text-center">

          {/* Soft background blurred office image */}
          <div className="absolute inset-0 z-0 opacity-20 overflow-hidden pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800" 
              alt="" 
              className="w-full h-full object-cover blur-[1.5px]"
            />
          </div>

          {/* Top-Right Gold & Navy Corner Wave Accent */}
          <svg className="absolute -top-1 -right-1 w-32 h-24 pointer-events-none z-0" viewBox="0 0 140 100" fill="none">
            <path d="M 20 0 Q 65 48 140 40 L 140 0 Z" fill="#0c2340" />
            <path d="M 15 0 Q 62 50 140 42" stroke="#c8973b" strokeWidth="3" fill="none" />
          </svg>

          {/* Left Mid-Wave Swoosh behind Avatar */}
          <svg className="absolute -left-2 top-20 w-28 h-36 pointer-events-none z-0" viewBox="0 0 120 140" fill="none">
            <path d="M 0 35 Q 65 75 120 55 L 120 140 L 0 140 Z" fill="#0c2340" opacity="0.95" />
            <path d="M 0 33 Q 67 73 120 53" stroke="#c8973b" strokeWidth="3" fill="none" />
          </svg>

          {/* TOP BAR: REVAYAH ONE BRAND PILL (LEFT) + SHARE BUTTON ONLY (RIGHT) */}
          <div className="relative z-10 flex items-center justify-between mb-3 text-left">
            {/* User Requested REVAYAH ONE Brand Pill Logo */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c2340] border border-[#c8973b]/50 shadow-sm">
              <FaShieldAlt className="w-3.5 h-3.5 text-[#c8973b]" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                REVAYAH ONE
              </span>
            </div>

            {/* Share Button Only (Matching other card styles) */}
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-9 h-9 rounded-full bg-[#0c2340] hover:bg-slate-900 border border-[#c8973b]/40 text-white flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
              title="Share Card"
            >
              {copiedItem === 'shareUrl' ? (
                <FaCheck className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                <FaShareAlt className="w-3.5 h-3.5 text-white" />
              )}
            </button>
          </div>

          {/* HERO IDENTITY: AVATAR ON LEFT, NAME & INFO ON RIGHT (EXACT MATCH!) */}
          <div className="relative z-10 flex items-center gap-3.5 mt-2 mb-3 px-1 text-left">
            {/* Left: Avatar with Gold Border Ring */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[2.5px] bg-white border-2 border-[#c8973b] shadow-xl overflow-hidden">
                <img
                  src={profile.profilePhoto}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600";
                  }}
                />
              </div>
            </div>

            {/* Right: Profile Details */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0c2340] leading-tight font-serif sm:font-sans">
                {profile.name}
              </h1>
              <p className="text-xs sm:text-sm font-bold text-[#0c2340] mt-0.5">
                {profile.jobTitle}
              </p>
              <p className="text-[11px] sm:text-xs font-semibold text-[#0c2340] mt-0.5">
                {profile.companyName}
              </p>
              {/* Golden Underline Accent Bar */}
              <div className="w-10 h-[1.5px] bg-[#c8973b] my-1.5" />
              <p className="text-[10.5px] sm:text-[11px] text-slate-600 italic leading-snug font-serif sm:font-sans">
                {profile.tagline}
              </p>
            </div>
          </div>

          {/* THREE PILL ACTION BUTTONS: CALL (NAVY), WHATSAPP (GREEN), EMAIL (WHITE) */}
          <div className="relative z-10 grid grid-cols-3 gap-2.5 max-w-[360px] mx-auto pt-1 pb-1">
            {/* Call */}
            <button
              type="button"
              onClick={() => handleCall(primaryPhone)}
              className="py-2.5 px-2 rounded-full bg-[#0c2340] hover:bg-[#07172b] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <FaPhoneAlt className="w-3 h-3" />
              <span>Call</span>
            </button>

            {/* WhatsApp */}
            <button
              type="button"
              onClick={() => handleWhatsApp(primaryPhone)}
              className="py-2.5 px-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <FaWhatsapp className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            {/* Email */}
            <button
              type="button"
              onClick={() => handleEmail(primaryEmail)}
              className="py-2.5 px-2 rounded-full bg-white hover:bg-slate-50 text-[#0c2340] border border-[#0c2340] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <FaEnvelope className="w-3 h-3" />
              <span>Email</span>
            </button>
          </div>

        </div>

        {/* ========================================================
            BODY SECTIONS (MATCHES SCREENSHOT ORDER & STYLING)
            ======================================================== */}
        <div className="px-5 py-3 space-y-4 bg-white text-left">

          {/* ========================================================
              SECTION 1: ABOUT ME
              ======================================================== */}
          <div id="section-about" className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#0c2340] text-white flex items-center justify-center">
                <FaUser className="w-2.5 h-2.5" />
              </div>
              <h3 className="text-sm font-bold text-[#0c2340]">About Me</h3>
            </div>

            <div className="relative p-4 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_12px_rgba(12,35,64,0.04)] overflow-hidden">
              {/* Botanical Leaf Branch on Right */}
              <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none opacity-25">
                <LeafBranch className="w-full h-full text-slate-400" />
              </div>

              <p className="text-xs text-slate-700 leading-relaxed relative z-10 font-normal pr-6">
                {showAboutMore ? profile.aboutText : (
                  profile.aboutText.length > 130 ? `${profile.aboutText.slice(0, 130)}...` : profile.aboutText
                )}
              </p>

              <div className="pt-2.5">
                <button
                  type="button"
                  onClick={() => setShowAboutMore(!showAboutMore)}
                  className="px-4 py-1.5 rounded-full bg-[#0c2340] hover:bg-[#07172b] text-white text-[11px] font-semibold inline-flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer relative z-10"
                >
                  <span>{showAboutMore ? "Show Less" : "Know More"}</span>
                  <FaChevronRight className={`w-2 h-2 transition-transform ${showAboutMore ? 'rotate-90' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================
              SECTION 2: MY EXPERTISE (EXACT 4 CARDS IN 1 ROW AS IN IMAGE)
              ======================================================== */}
          <div id="section-services" className="space-y-1.5">
            <div className="flex items-center gap-2">
              <FaStar className="w-4 h-4 text-[#d4a373]" />
              <h3 className="text-sm font-bold text-[#0c2340]">My Expertise</h3>
            </div>

            {/* Exactly 4 Cards in 1 Row */}
            <div className="grid grid-cols-4 gap-2">
              {expertiseItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setShowDrawer(true)}
                  className="p-2 rounded-2xl bg-[#f0f4f8] hover:bg-[#e4ebf2] border border-blue-100/40 shadow-xs flex flex-col items-center justify-center text-center transition-all cursor-pointer min-h-[78px] group"
                >
                  <div className="text-[#0c2340] mb-1 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-[#0c2340] leading-tight whitespace-pre-line">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================
              SECTION 3: EXPERIENCE & ACHIEVEMENTS
              ======================================================== */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <FaTrophy className="w-4 h-4 text-[#d4a373]" />
              <h3 className="text-sm font-bold text-[#0c2340]">Experience & Achievements</h3>
            </div>

            <div className="p-4 rounded-2xl bg-[#eef5fa] border border-blue-100/50 shadow-xs flex items-center justify-between gap-3">
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
                    <FaCheck className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-[11.5px] font-medium text-[#0c2340] leading-tight">
                    10+ Years in Marketing & Communications
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
                    <FaCheck className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-[11.5px] font-medium text-[#0c2340] leading-tight">
                    Led successful campaigns for global brands
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
                    <FaCheck className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-[11.5px] font-medium text-[#0c2340] leading-tight">
                    Helping 100+ businesses grow
                  </span>
                </div>
              </div>

              {/* Laurel Wreath Badge */}
              <div className="shrink-0 pl-1">
                <div className="relative flex items-center justify-center">
                  <svg viewBox="0 0 140 110" className="w-20 h-16 text-[#c8973b]" fill="currentColor">
                    <path d="M 58 92 C 40 88 24 72 20 50 C 18 34 26 20 38 12 C 37 18 39 24 43 28 C 34 30 30 40 32 50 C 34 58 40 68 50 74 C 47 70 48 64 53 60 C 47 70 51 80 58 92 Z" opacity="0.95" />
                    <path d="M 82 92 C 100 88 116 72 120 50 C 122 34 114 20 102 12 C 103 18 101 24 97 28 C 106 30 110 40 108 50 C 106 58 100 68 90 74 C 93 70 92 64 87 60 C 93 70 89 80 82 92 Z" opacity="0.95" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-base font-black text-[#0c2340] leading-none">10+</span>
                    <span className="text-[10px] font-bold text-[#0c2340] mt-0.5">Years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              SECTION 4: MY PORTFOLIO
              ======================================================== */}
          <div id="section-portfolio" className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaBriefcase className="w-4 h-4 text-[#d4a373]" />
                <h3 className="text-sm font-bold text-[#0c2340]">My Portfolio</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPortfolioImg(profile.gallery[0])}
                className="text-xs font-semibold text-[#0c2340] hover:text-blue-900 flex items-center gap-1 cursor-pointer"
              >
                <span>View More</span>
                <FaChevronRight className="w-2.5 h-2.5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {profile.gallery.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPortfolioImg(item)}
                  className="rounded-xl overflow-hidden aspect-[1.3/1] bg-slate-100 border border-slate-200/80 shadow-xs cursor-pointer group relative"
                >
                  <img
                    src={item.url}
                    alt={item.title || `Portfolio ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================
              SECTION 5: TESTIMONIALS
              ======================================================== */}
          <div id="section-testimonials" className="space-y-1.5">
            <div className="flex items-center gap-2">
              <FaQuoteLeft className="w-4 h-4 text-[#d4a373]" />
              <h3 className="text-sm font-bold text-[#0c2340]">Testimonials</h3>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_12px_rgba(12,35,64,0.04)] relative flex items-start gap-3">
              <img
                src={profile.testimonials[0].avatar}
                alt={profile.testimonials[0].clientName}
                className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200"
              />
              <div className="flex-1 min-w-0 pr-8">
                <p className="text-xs text-slate-600 italic leading-snug">
                  "{profile.testimonials[0].testimonial}"
                </p>
                <p className="text-xs font-bold text-[#0c2340] mt-1">
                  {profile.testimonials[0].clientName}
                  <span className="font-normal text-slate-500"> – CEO, Growth Plus</span>
                </p>
              </div>

              <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0c2340]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              </div>
            </div>
          </div>

          {/* ========================================================
              SECTION 6: LET'S CONNECT (CONTACT & LOCATION MAP)
              ======================================================== */}
          <div id="section-contact" className="space-y-1.5">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="w-4 h-4 text-[#d4a373]" />
              <h3 className="text-sm font-bold text-[#0c2340]">Let's Connect</h3>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_12px_rgba(12,35,64,0.04)] grid grid-cols-2 gap-3 items-center">
              <div className="space-y-2">
                <div 
                  onClick={() => {
                    const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(addressFormatted)}`;
                    window.open(mapUrl, '_blank', 'noopener,noreferrer');
                  }}
                  className="flex items-center gap-2 text-xs text-[#0c2340] cursor-pointer hover:underline group"
                >
                  <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#0c2340] shrink-0" />
                  <span className="font-medium truncate">{addressFormatted}</span>
                </div>

                <div 
                  onClick={() => handleCall(primaryPhone)}
                  className="flex items-center gap-2 text-xs text-[#0c2340] cursor-pointer hover:underline group"
                >
                  <FaPhoneAlt className="w-3.5 h-3.5 text-[#0c2340] shrink-0" />
                  <span className="font-medium truncate">{primaryPhone}</span>
                </div>

                <div 
                  onClick={() => handleEmail(primaryEmail)}
                  className="flex items-center gap-2 text-xs text-[#0c2340] cursor-pointer hover:underline group"
                >
                  <FaEnvelope className="w-3.5 h-3.5 text-[#0c2340] shrink-0" />
                  <span className="font-medium truncate">{primaryEmail}</span>
                </div>
              </div>

              {/* Mini Map Card with Red Pin */}
              <div 
                onClick={() => {
                  const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(addressFormatted)}`;
                  window.open(mapUrl, '_blank', 'noopener,noreferrer');
                }}
                className="relative h-22 rounded-xl overflow-hidden border border-slate-200 shadow-xs cursor-pointer group hover:shadow-md transition-all bg-[#e5ebf0]"
              >
                <svg className="absolute inset-0 w-full h-full object-cover" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice">
                  <rect width="200" height="120" fill="#e8edf2" />
                  <path d="M 0 0 L 80 0 L 60 70 L 0 50 Z" fill="#d4e8d4" opacity="0.7" />
                  <path d="M 120 70 L 200 40 L 200 120 L 100 120 Z" fill="#d4e8d4" opacity="0.6" />
                  <path d="M 140 0 L 180 0 L 160 50 L 120 40 Z" fill="#f5ede0" opacity="0.6" />
                  <path d="M -10 30 Q 80 50 210 20" stroke="#ffffff" strokeWidth="9" fill="none" />
                  <path d="M -10 30 Q 80 50 210 20" stroke="#fde047" strokeWidth="4" fill="none" />
                  <path d="M 60 -10 L 80 130" stroke="#ffffff" strokeWidth="8" fill="none" />
                  <path d="M 60 -10 L 80 130" stroke="#cbd5e1" strokeWidth="4" fill="none" />
                  <path d="M 140 -10 Q 110 60 160 130" stroke="#ffffff" strokeWidth="7" fill="none" />
                  <path d="M 140 -10 Q 110 60 160 130" stroke="#fde047" strokeWidth="3" fill="none" />
                  <path d="M 0 90 L 200 80" stroke="#ffffff" strokeWidth="6" fill="none" />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none group-hover:scale-105 transition-transform">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 border border-slate-200 shadow-md text-[9px] font-bold text-slate-800 mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span>{primaryAddress.city || 'Bengaluru'}</span>
                  </div>
                  <FaMapMarkerAlt className="w-4 h-4 text-red-600 drop-shadow-md -mt-1" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================
            BOTTOM WAVE FOOTER (NAVY WAVE + GOLD ACCENT)
            ======================================================== */}
        <div className="relative w-full mt-auto">
          <svg className="w-full h-12 block" viewBox="0 0 400 60" preserveAspectRatio="none" fill="none">
            <path d="M 0 25 Q 160 0 400 20 L 400 60 L 0 60 Z" fill="#0c2340" />
            <path d="M 0 25 Q 160 0 400 20" stroke="#d4a373" strokeWidth="2.5" />
          </svg>
          <div className="bg-[#0c2340] pb-5 px-4 text-center text-white -mt-[1px]">
            <div className="flex items-center justify-center gap-2 text-[11px] font-medium text-slate-300">
              <span>Powered by</span>
              <div className="flex items-center gap-1 font-bold text-white tracking-wide">
                <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                <span className="text-white font-bold">Reva-Yah One</span>
              </div>
              <span className="text-slate-500">|</span>
              <span className="text-[10px] text-slate-300 font-normal">One Link. Endless Possibilities.</span>
            </div>
          </div>
        </div>

      </div>

            {/* Portfolio Lightbox Modal */}
      {selectedPortfolioImg && (
        <div 
          onClick={() => setSelectedPortfolioImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 cursor-pointer"
        >
          <div className="relative max-w-md w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-2" onClick={e => e.stopPropagation()}>
            <img src={selectedPortfolioImg.url} alt={selectedPortfolioImg.title} className="w-full rounded-xl object-contain max-h-[70vh]" />
            <div className="p-3 flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">{selectedPortfolioImg.title || "Portfolio Project"}</h4>
              <button 
                type="button" 
                onClick={() => setSelectedPortfolioImg(null)}
                className="p-1 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ModernCard;
