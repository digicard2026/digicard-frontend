import React, { useState, useRef } from 'react';
import {
  FaLinkedin, FaInstagram, FaEnvelope,
  FaMapMarkerAlt, FaChevronRight, FaChevronLeft, FaGlobe,
  FaPhoneAlt, FaWhatsapp, FaUser, FaStar,
  FaDownload, FaBriefcase, FaTimes,
  FaQuoteLeft, FaChartLine, FaPalette, FaHandshake,
  FaTrophy, FaCheck, FaShareAlt, FaBullhorn, FaShieldAlt,
  FaExternalLinkAlt, FaGem, FaBuilding, FaVideo,
  FaFilePdf, FaRegClock, FaCalendarAlt, FaHeadset,
  FaPaperPlane, FaCheckCircle, FaCogs, FaUsers,
  FaSuitcase, FaFileVideo, FaQrcode, FaCopy, FaSearchPlus
} from 'react-icons/fa';
import { FaXTwitter, FaGithub, FaYoutube, FaFacebookF } from "react-icons/fa6";
import { generateVCard } from '../../utility/vcard';
import { CARD_URL } from '../../utility/constants';

// --- CONFIG: Plan Features Matrix (Synchronized with Backend Tiers) ---
const personalAllowed = [
  'profilePhoto', 'firstName', 'lastName', 'prefix', 'suffix', 'jobTitle',
  'tagline', 'aboutText', 'bio', 'phones', 'email', 'emails', 'websites',
  'addresses', 'enableOneTapCall', 'enableWhatsApp', 'enableEmail', 'socialLinks',
  'dynamicQRCode', 'shareableUrl', 'shareableLink', 'profileVideo', 'videos'
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

// --- HELPER: Video Player Component ---
const VideoPlayer = ({ src, title, className = "" }) => {
  let videoUrl = '';
  if (typeof src === 'string') {
    videoUrl = src;
  } else if (typeof src === 'object' && src !== null) {
    let curr = src.url || src.link || src.src || src;
    while (typeof curr === 'object' && curr !== null && (curr.url || curr.link || curr.src)) {
      curr = curr.url || curr.link || curr.src;
    }
    if (typeof curr === 'string') {
      videoUrl = curr;
    }
  }

  if (!videoUrl || typeof videoUrl !== 'string' || !videoUrl.trim() || videoUrl.trim() === '[object Object]') {
    return null;
  }

  const cleanUrl = videoUrl.trim();
  if (cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be')) {
    let videoId = '';
    if (cleanUrl.includes('youtu.be/')) {
      videoId = cleanUrl.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0];
    } else if (cleanUrl.includes('watch?v=')) {
      videoId = cleanUrl.split('watch?v=')[1]?.split('&')[0]?.split('?')[0];
    } else if (cleanUrl.includes('embed/')) {
      videoId = cleanUrl.split('embed/')[1]?.split('?')[0]?.split('&')[0];
    } else if (cleanUrl.includes('shorts/')) {
      videoId = cleanUrl.split('shorts/')[1]?.split('?')[0]?.split('&')[0];
    }
    if (videoId) {
      return (
        <div className={`relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-slate-200/80 my-2 ${className}`}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
            title={title || "YouTube video"}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-black shadow-lg border border-slate-200/80 my-2 ${className}`}>
      <video src={cleanUrl} controls className="w-full h-auto max-h-[300px]" preload="metadata">
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// --- HELPER: Live Business Status ---
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

const ModernCard = ({ cardData = {}, plan = 'BusinessPremium', isPreview = false, isSnapshot = false, onShare }) => {
  if (!cardData || typeof cardData !== 'object') return null;

  // --- STATE FOR INTERACTIVE FEATURES ---
  const [copiedItem, setCopiedItem] = useState(null);
  const [showAboutMore, setShowAboutMore] = useState(false);
  const [showOverviewMore, setShowOverviewMore] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [selectedPortfolioImg, setSelectedPortfolioImg] = useState(null);
  const galleryScrollRef = useRef(null);
  const scrollGallery = (direction) => {
    if (galleryScrollRef.current) {
      const container = galleryScrollRef.current;
      const step = container.clientWidth * 0.75;
      container.scrollBy({
        left: direction === 'left' ? -step : step,
        behavior: 'smooth'
      });
    }
  };
  const [showQrModal, setShowQrModal] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    service: '',
    date: '',
    time: '',
    contact: '',
    submitted: false
  });

  const normalizePlan = (raw) => {
    if (!raw) return 'Personal';
    if (cardFieldsConfig[raw]) return raw;
    const cleaned = String(raw).replace(/[-\\s_]/g, '').toLowerCase();
    for (const key of Object.keys(cardFieldsConfig)) {
      if (key.toLowerCase() === cleaned) return key;
    }
    return 'BusinessPremium';
  };

  const currentPlan = normalizePlan(cardData?.cardType || plan);

  const isFieldAllowed = (fieldName) => {
    const lk = fieldName.toLowerCase();
    if (lk === 'gallery' && (cardData?.gallery?.length > 0 || cardData?.addons?.gallery || cardData?.addons?.photogallery)) return true;
    if (cardData?.addons) {
      if ((lk === 'catalog' || lk === 'catalogpdf' || lk === 'downloads') &&
        (cardData.addons.docsbuilder || cardData.addons.catalogbuilder || cardData.addons.brochurebuilder || cardData.addons.docsmanager)) return true;
      if ((lk === 'nfcsettings' || lk === 'nfccard') && (cardData.addons.nfccard || cardData.addons.nfc)) return true;
      if ((lk === 'profilevideo' || lk === 'productvideo') && (cardData.addons.profilebuilder || cardData.addons.portfoliobuilder)) return true;
      if (lk === 'testimonials' && cardData.addons.portfoliobuilder) return true;
    }
    const allowed = cardFieldsConfig[currentPlan] || personalAllowed;
    return allowed.includes(fieldName);
  };

  const getSocialIcon = (platform) => {
    const p = platform?.toLowerCase() || '';
    if (p.includes('linkedin')) return <FaLinkedin className="w-4 h-4 text-[#0077b5]" />;
    if (p.includes('twitter') || p.includes('x')) return <FaXTwitter className="w-4 h-4 text-slate-800" />;
    if (p.includes('github')) return <FaGithub className="w-4 h-4 text-slate-900" />;
    if (p.includes('instagram')) return <FaInstagram className="w-4 h-4 text-pink-600" />;
    if (p.includes('facebook')) return <FaFacebookF className="w-4 h-4 text-blue-600" />;
    if (p.includes('youtube')) return <FaYoutube className="w-4 h-4 text-red-600" />;
    if (p.includes('whatsapp')) return <FaWhatsapp className="w-4 h-4 text-emerald-600" />;
    return <FaGlobe className="w-4 h-4 text-[#0c2340]" />;
  };

  const handleSendInquiry = () => {
    if (!inquiryData.contact) {
      alert('Please enter your contact information');
      return;
    }
    const subject = encodeURIComponent(`Consultation Request: ${inquiryData.service || 'General'}`);
    const body = encodeURIComponent(
      `Hello ${profile.name},

I would like to request a consultation regarding: ${inquiryData.service || 'General Inquiry'}.
` +
      (inquiryData.date ? `Preferred Date: ${inquiryData.date}
` : '') +
      (inquiryData.time ? `Preferred Time: ${inquiryData.time}
` : '') +
      `My Contact Info: ${inquiryData.contact}

Thank you!`
    );
    window.location.href = `mailto:${primaryEmail}?subject=${subject}&body=${body}`;
  };

  // --- RESILIENT DATA MAPPING ---
  const rawName = `${cardData?.prefix ? cardData.prefix + ' ' : ''}${cardData?.firstName || ''} ${cardData?.lastName || ''}${cardData?.suffix ? ', ' + cardData.suffix : ''}`.trim() || cardData?.name || (cardData?.email ? cardData.email.split('@')[0] : 'Professional Contact');

  const profile = {
    prefix: cardData?.prefix || '',
    firstName: cardData?.firstName || '',
    lastName: cardData?.lastName || '',
    suffix: cardData?.suffix || '',
    name: rawName,
    jobTitle: cardData?.jobTitle || '',
    department: cardData?.department || '',
    companyName: cardData?.companyName || cardData?.organization || '',
    companyLogo: cardData?.companyLogo || null,
    profilePhoto: cardData?.profilePhoto || null,
    tagline: cardData?.tagline || '',
    bio: cardData?.bio || '',
    aboutText: cardData?.aboutText || cardData?.bio || '',
    foundedName: cardData?.foundedName || '',
    organization: cardData?.organization || '',
    serviceArea: cardData?.serviceArea || '',
    serviceAvailability: cardData?.serviceAvailability || '',
    virtualNumber: cardData?.virtualNumber || '',

    phones: Array.isArray(cardData?.phones) && cardData.phones.length > 0
      ? cardData.phones
      : cardData?.phone ? [{ label: 'Work', number: cardData.phone, isPrimary: true }] : [],
    emails: Array.isArray(cardData?.emails) && cardData.emails.length > 0
      ? cardData.emails
      : cardData?.email ? [{ label: 'Work', address: cardData.email, isPrimary: true }] : [],
    websites: Array.isArray(cardData?.websites) && cardData.websites.length > 0
      ? cardData.websites.filter(w => w && (w.url || typeof w === 'string'))
      : cardData?.website ? [{ label: 'Website', url: cardData.website }] : [],
    addresses: Array.isArray(cardData?.addresses) && cardData.addresses.length > 0
      ? cardData.addresses
      : cardData?.address ? [{ street: cardData.address }] : [],
    socialLinks: Array.isArray(cardData?.socialLinks) ? cardData.socialLinks : [],

    servicesProducts: cardData?.servicesProducts || '',
    services: Array.isArray(cardData?.services) ? cardData.services : [],
    products: Array.isArray(cardData?.products) ? cardData.products : [],
    businessHours: Array.isArray(cardData?.businessHours) ? cardData.businessHours : [],
    downloads: [
      ...(cardData?.catalogPDF || cardData?.catalog ? [{
        title: cardData?.catalogTitle || 'Official Business Catalog & Brochure (PDF)',
        url: typeof cardData?.catalogPDF === 'string' ? cardData.catalogPDF : (cardData?.catalogPDF?.url || cardData?.catalog),
        isCatalog: true
      }] : []),
      ...(Array.isArray(cardData?.downloads) ? cardData.downloads : [])
    ],
    profileVideo: cardData?.profileVideo || null,
    productVideo: cardData?.productVideo || null,
    videos: Array.isArray(cardData?.videos) ? cardData.videos : [],

    nfcSettings: cardData?.nfcSettings || { isEnabled: false },
    testimonials: Array.isArray(cardData?.testimonials) ? cardData.testimonials : [],
    clientList: Array.isArray(cardData?.clientList) ? cardData.clientList : [],
    gallery: Array.isArray(cardData?.gallery) ? cardData.gallery : [],

    customerInquiry: cardData?.customerInquiry || { isEnabled: true, title: 'Request Consultation / Inquiry' },
    brandLabel: cardData?.brandLabel || 'REVAYAH ONE',
    bannerPhoto: cardData?.bannerPhoto || cardData?.coverPhoto || null,
    enableOneTapCall: cardData?.enableOneTapCall !== undefined ? cardData.enableOneTapCall : true,
    enableWhatsApp: cardData?.enableWhatsApp !== undefined ? cardData.enableWhatsApp : true,
    enableEmail: cardData?.enableEmail !== undefined ? cardData.enableEmail : true
  };

  const primaryPhone = profile.phones.find(p => p.isPrimary)?.number || profile.phones[0]?.number || '';
  const primaryEmail = profile.emails.find(e => e.isPrimary)?.address || profile.emails[0]?.address || cardData?.email || '';
  const primaryWebsite = profile.websites[0]?.url || (typeof profile.websites[0] === 'string' ? profile.websites[0] : '');
  const primaryAddress = profile.addresses[0] || null;
  const addressFormatted = primaryAddress ? [primaryAddress.street, primaryAddress.city, primaryAddress.state, primaryAddress.country].filter(Boolean).join(', ') : '';
  const linkedinLink = profile.socialLinks.find(s => s.platform?.toLowerCase().includes('linkedin'))?.url || '';
  const businessStatus = getBusinessStatus(profile.businessHours);

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
                {profile.brandLabel || 'REVAYAH ONE'}
              </span>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#0c2340] text-white flex items-center justify-center shadow-xs">
              <FaShareAlt className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* Hero Identity: Avatar on Left, Text on Right */}
          <div className="flex items-center gap-3 mb-2 text-left">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full p-[2px] bg-white shadow-md border-2 border-[#c8973b] overflow-hidden flex items-center justify-center">
                {photoSrc ? (
                  <img
                    src={photoSrc}
                    alt={profile.name}
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                <div
                  className={`w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-[#0c2340]/45 ${photoSrc ? 'hidden' : 'flex'
                    }`}
                >
                  <FaUser className="w-10 h-10 text-[#0c2340]/45" />
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-[#0c2340] leading-tight">{profile.name}</h1>
              {profile.jobTitle && <p className="text-xs font-bold text-[#0c2340]">{profile.jobTitle}</p>}
              {profile.companyName && <p className="text-[11px] font-medium text-[#0c2340]">{profile.companyName}</p>}
              {profile.tagline && (
                <>
                  <div className="w-8 h-[1px] bg-[#c8973b] my-1" />
                  <p className="text-[10px] text-slate-500 italic leading-snug">"{profile.tagline}"</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full px-5 py-2 flex items-center justify-center gap-2">
          {primaryPhone && (
            <div className="flex-1 py-2 px-3 rounded-full bg-[#0c2340] text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 shadow-sm">
              <FaPhoneAlt className="w-3 h-3" />
              <span>Call</span>
            </div>
          )}
          {primaryPhone && (
            <div className="flex-1 py-2 px-3 rounded-full bg-[#25D366] text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 shadow-sm">
              <FaWhatsapp className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </div>
          )}
          {primaryEmail && (
            <div className="flex-1 py-2 px-3 rounded-full bg-white text-[#0c2340] border border-[#0c2340] text-[11px] font-semibold flex items-center justify-center gap-1.5 shadow-sm">
              <FaEnvelope className="w-3 h-3" />
              <span>Email</span>
            </div>
          )}
        </div>

        {/* Bottom Wave Footer */}
        <div className="w-full mt-3 relative">
          <svg className="w-full h-10 block" viewBox="0 0 400 60" preserveAspectRatio="none" fill="none">
            <path d="M 0 25 Q 150 0 400 20 L 400 60 L 0 60 Z" fill="#0c2340" />
            <path d="M 0 25 Q 150 0 400 20" stroke="#d4a373" strokeWidth="2.5" />
          </svg>
          <div className="bg-[#0c2340] pb-3 px-4 text-center text-white">
            <span className="text-[10px] text-slate-300 font-medium">
              Powered by <strong className="text-amber-400">{profile.brandLabel || 'REVAYAH ONE'}</strong>
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
    <div className="w-full max-w-md mx-auto bg-white text-slate-800 flex flex-col relative overflow-hidden min-h-screen font-sans antialiased selection:bg-[#0c2340] selection:text-white">

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
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[2.5px] bg-white border-2 border-[#c8973b] shadow-xl overflow-hidden flex items-center justify-center">
              {profile.profilePhoto ? (
                <img
                  src={profile.profilePhoto}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />
              ) : null}
              <div
                className={`w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-[#0c2340]/45 ${profile.profilePhoto ? 'hidden' : 'flex'
                  }`}
              >
                <FaUser className="w-14 h-14 text-[#0c2340]/45" />
              </div>
            </div>
          </div>

          {/* Right: Profile Details */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0c2340] leading-tight font-serif sm:font-sans">
              {profile.name}
            </h1>
            {profile.jobTitle && (
              <p className="text-xs sm:text-sm font-bold text-[#0c2340] mt-0.5">
                {profile.jobTitle}
              </p>
            )}
            {isFieldAllowed('companyName') && profile.companyName && (
              <p className="text-[11px] sm:text-xs font-semibold text-[#0c2340] mt-0.5">
                {profile.companyName}{profile.department ? ` • ${profile.department}` : ''}
              </p>
            )}
            {/* Golden Underline Accent Bar */}
            {profile.tagline && (
              <>
                <div className="w-10 h-[1.5px] bg-[#c8973b] my-1.5" />
                <p className="text-[10.5px] sm:text-[11px] text-slate-600 italic leading-snug font-serif sm:font-sans">
                  {profile.tagline}
                </p>
              </>
            )}
          </div>
        </div>

        {/* THREE PILL ACTION BUTTONS: CALL (NAVY), WHATSAPP (GREEN), EMAIL (WHITE) */}
        <div className="relative z-10 flex items-center justify-center gap-2.5 max-w-[360px] mx-auto pt-1 pb-1">
          {/* Call */}
          {profile.enableOneTapCall && primaryPhone && (
            <button
              type="button"
              onClick={() => handleCall(primaryPhone)}
              className="flex-1 py-2.5 px-2 rounded-full bg-[#0c2340] hover:bg-[#07172b] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <FaPhoneAlt className="w-3 h-3" />
              <span>Call</span>
            </button>
          )}

          {/* WhatsApp */}
          {profile.enableWhatsApp && primaryPhone && (
            <button
              type="button"
              onClick={() => handleWhatsApp(primaryPhone)}
              className="flex-1 py-2.5 px-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <FaWhatsapp className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          )}

          {/* Email */}
          {profile.enableEmail && primaryEmail && (
            <button
              type="button"
              onClick={() => handleEmail(primaryEmail)}
              className="flex-1 py-2.5 px-2 rounded-full bg-white hover:bg-slate-50 text-[#0c2340] border border-[#0c2340] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <FaEnvelope className="w-3 h-3" />
              <span>Email</span>
            </button>
          )}
        </div>

      </div>

      {/* ========================================================
            BODY SECTIONS (MATCHES SCREENSHOT ORDER & STYLING)
            ======================================================== */}
      <div className="px-5 py-3 space-y-4 bg-white text-left">

        {/* ========================================================
              SECTION 1: ABOUT ME
              ======================================================== */}
        {(profile.aboutText || profile.bio) && (
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

              {profile.aboutText && (
                <p className="text-xs text-slate-700 leading-relaxed relative z-10 font-normal pr-6">
                  {showAboutMore ? profile.aboutText : (
                    profile.aboutText.length > 130 ? `${profile.aboutText.slice(0, 130)}...` : profile.aboutText
                  )}
                </p>
              )}

              {profile.aboutText && profile.aboutText.length > 130 && (
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
              )}

              {profile.bio && profile.bio !== profile.aboutText && (
                <div className={profile.aboutText ? 'pt-2 border-t border-slate-100 mt-2' : ''}>
                  <p className="text-xs text-slate-500 leading-relaxed relative z-10 font-normal pr-6">
                    {showAboutMore || profile.bio.length <= 140
                      ? profile.bio
                      : `${profile.bio.slice(0, 140)}...`}
                  </p>
                  {!profile.aboutText && profile.bio.length > 140 && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAboutMore(!showAboutMore)}
                        className="px-4 py-1.5 rounded-full bg-[#0c2340] hover:bg-[#07172b] text-white text-[11px] font-semibold inline-flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer relative z-10"
                      >
                        <span>{showAboutMore ? "Show Less" : "Know More"}</span>
                        <FaChevronRight className={`w-2 h-2 transition-transform ${showAboutMore ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
              PRODUCTS & SERVICES (Full Comprehensive Grid)
              ======================================================== */}
        {((isFieldAllowed('services') && profile.services && profile.services.length > 0) || (isFieldAllowed('servicesProducts') && profile.servicesProducts)) && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaCogs className="w-4 h-4 text-[#d4a373]" />
                <h3 className="text-sm font-bold text-[#0c2340]">Products & Services</h3>
              </div>
              {profile.services.length > 0 && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#f0f4f8] text-[#0c2340]">
                  {profile.services.length} Available
                </span>
              )}
            </div>

            {profile.servicesProducts && (
              <div className="p-3.5 rounded-2xl bg-[#eef5fa] border border-blue-100/50 text-xs text-slate-700">
                <span className="text-[10px] uppercase font-bold text-[#0c2340] tracking-wider block mb-1">
                  Services & Products Overview
                </span>
                <p className="leading-relaxed font-normal">
                  {showOverviewMore || profile.servicesProducts.length <= 140
                    ? profile.servicesProducts
                    : `${profile.servicesProducts.slice(0, 140)}...`}
                </p>
                {profile.servicesProducts.length > 140 && (
                  <button
                    type="button"
                    onClick={() => setShowOverviewMore(!showOverviewMore)}
                    className="mt-1 text-[11px] font-semibold text-[#0c2340] hover:text-[#d4a373] inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{showOverviewMore ? 'Show Less' : 'Read More'}</span>
                    <FaChevronRight className={`w-2 h-2 transition-transform ${showOverviewMore ? '-rotate-90' : 'rotate-90'}`} />
                  </button>
                )}
              </div>
            )}

            {profile.services && profile.services.length > 0 && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(showAllServices ? profile.services : profile.services.slice(0, 4)).map((srv, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#0c2340]/40 transition-all shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-xs font-bold text-[#0c2340]">{srv.name || srv.title}</h4>
                          {srv.price && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#eef5fa] text-[#0c2340] border border-blue-100">
                              {srv.currency || '₹'}{srv.price}
                            </span>
                          )}
                        </div>
                        {srv.category && (
                          <span className="text-[9.5px] uppercase font-medium text-slate-400 block mb-1">
                            {srv.category}
                          </span>
                        )}
                        {srv.description && (
                          <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                            {srv.description}
                          </p>
                        )}
                      </div>

                      <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">Direct Advisory</span>
                        <button
                          type="button"
                          onClick={() => {
                            setInquiryData(prev => ({ ...prev, service: srv.name || srv.title }));
                            const funnel = document.getElementById('modern-inquiry-funnel');
                            if (funnel) funnel.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-[11px] font-semibold text-[#0c2340] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Inquire</span>
                          <FaPaperPlane className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {profile.services.length > 4 && (
                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAllServices(!showAllServices)}
                      className="px-4 py-1.5 rounded-full bg-[#f0f4f8] hover:bg-slate-200 text-[#0c2340] text-[11px] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{showAllServices ? 'Show Less' : `View All ${profile.services.length} Services`}</span>
                      <FaChevronRight className={`w-2 h-2 transition-transform ${showAllServices ? '-rotate-90' : 'rotate-90'}`} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================
              PRODUCTS & SOLUTIONS
              ======================================================== */}
        {isFieldAllowed('products') && profile.products && profile.products.length > 0 && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaGem className="w-4 h-4 text-[#d4a373]" />
                <h3 className="text-sm font-bold text-[#0c2340]">Products & Solutions</h3>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#f0f4f8] text-[#0c2340]">
                {profile.products.length} Items
              </span>
            </div>

            <div className="space-y-2.5">
              {(showAllProducts ? profile.products : profile.products.slice(0, 3)).map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3 hover:border-[#0c2340]/40 transition-colors">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-bold text-[#0c2340] text-xs truncate">{item.name}</h4>
                      {item.price && (
                        <span className="text-xs font-bold text-[#0c2340] shrink-0">{item.currency || '₹'} {item.price}</span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {profile.products.length > 3 && (
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setShowAllProducts(!showAllProducts)}
                  className="px-4 py-1.5 rounded-full bg-[#f0f4f8] hover:bg-slate-200 text-[#0c2340] text-[11px] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{showAllProducts ? 'Show Less' : `View All ${profile.products.length} Products`}</span>
                  <FaChevronRight className={`w-2 h-2 transition-transform ${showAllProducts ? '-rotate-90' : 'rotate-90'}`} />
                </button>
              </div>
            )}
          </div>
        )}



        {/* ========================================================
              SECTION 4: MY PORTFOLIO / GALLERY
              ======================================================== */}
        {(() => {
          const isValidImageUrl = (str) => {
            if (!str || typeof str !== 'string') return false;
            const trimmed = str.trim();
            if (trimmed === 'SAVED' || trimmed === 'null' || trimmed === 'undefined' || trimmed === '') return false;
            return trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:image/') || trimmed.startsWith('blob:') || trimmed.startsWith('/');
          };

          const validGallery = (profile.gallery || [])
            .map((item, idx) => {
              const url = item.url || item.image || (typeof item === 'string' ? item : '');
              if (!isValidImageUrl(url)) return null;
              return {
                url,
                title: item.title || `Portfolio ${idx + 1}`,
                category: item.category || 'Portfolio',
                description: item.description || '',
                idx
              };
            })
            .filter(Boolean);

          if (validGallery.length === 0) return null;

          const MAX_DEFAULT = 4;
          const totalCount = validGallery.length;
          const hasMore = totalCount > MAX_DEFAULT;
          const visibleList = (hasMore && !showAllGallery) ? validGallery.slice(0, MAX_DEFAULT) : validGallery;

          return (
            <div id="section-portfolio" className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaBriefcase className="w-4 h-4 text-[#d4a373]" />
                  <h3 className="text-sm font-bold text-[#0c2340]">My Portfolio</h3>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
                  {validGallery.length} {validGallery.length === 1 ? 'Photo' : 'Photos'}
                </span>
              </div>

              {/* Single Row Photo Gallery Strip with Left/Right Arrow Buttons */}
              <div className="relative group/gallery w-full">
                {validGallery.length > 3 && (
                  <button
                    type="button"
                    onClick={() => scrollGallery('left')}
                    className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-[#0c2340] shadow-md border border-slate-200/90 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                    title="Previous Photos"
                  >
                    <FaChevronLeft className="w-3.5 h-3.5 text-[#0c2340]" />
                  </button>
                )}

                <div
                  ref={galleryScrollRef}
                  className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth w-full py-1 px-0.5"
                >
                  {validGallery.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedPortfolioImg(item)}
                      className={`shrink-0 aspect-square group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer ${
                        validGallery.length === 1
                          ? 'w-full aspect-[16/9]'
                          : validGallery.length === 2
                          ? 'w-[calc((100%-0.625rem)/2)]'
                          : 'w-[calc((100%-1.25rem)/3)]'
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.title || `Portfolio ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />

                      {/* Hover Overlay with Search/Zoom icon */}
                      <div className="absolute inset-0 bg-[#0c2340]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                        <span className="w-8 h-8 rounded-full bg-white/95 text-[#0c2340] shadow-md flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-200">
                          <FaSearchPlus className="w-3.5 h-3.5 text-[#0c2340]" />
                        </span>
                      </div>

                      {/* Title pill overlay at bottom */}
                      {item.title && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-white pointer-events-none">
                          <p className="text-[11px] font-semibold truncate leading-tight">
                            {item.title}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {validGallery.length > 3 && (
                  <button
                    type="button"
                    onClick={() => scrollGallery('right')}
                    className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-[#0c2340] shadow-md border border-slate-200/90 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                    title="Next Photos"
                  >
                    <FaChevronRight className="w-3.5 h-3.5 text-[#0c2340]" />
                  </button>
                )}
              </div>
            </div>
          );
        })()}

        {/* ========================================================
              CLIENT TESTIMONIALS & ENDORSEMENTS
              ======================================================== */}
        {isFieldAllowed('testimonials') && profile.testimonials && profile.testimonials.length > 0 && (
          <div id="section-testimonials" className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaQuoteLeft className="w-4 h-4 text-[#d4a373]" />
                <h3 className="text-sm font-bold text-[#0c2340]">Client Testimonials</h3>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#f0f4f8] text-[#0c2340]">
                {profile.testimonials.length} Reviews
              </span>
            </div>

            <div className="space-y-3">
              {profile.testimonials.map((test, idx) => {
                const quote = test.testimonial || test.quote || test.text || '';
                if (!quote && !test.clientName) return null;
                const rating = test.rating || 5;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(rating)].map((_, i) => (
                          <FaStar key={i} className="w-3 h-3 text-[#d4a373]" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Verified Client
                      </span>
                    </div>
                    {quote && (
                      <p className="text-xs text-slate-700 italic leading-relaxed">
                        "{quote}"
                      </p>
                    )}
                    {(test.clientName || test.company || test.position) && (
                      <div className="pt-2 border-t border-slate-100 text-xs">
                        <span className="font-bold text-[#0c2340] block">
                          {test.clientName || 'Valued Client'}
                        </span>
                        {(test.position || test.company) && (
                          <span className="text-[11px] text-slate-500 font-medium">
                            {test.position} {test.position && test.company ? '• ' : ''}{test.company}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
              CLIENT LIST & PARTNERS
              ======================================================== */}
        {isFieldAllowed('clientList') && profile.clientList && profile.clientList.length > 0 && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaBuilding className="w-4 h-4 text-[#d4a373]" />
                <h3 className="text-sm font-bold text-[#0c2340]">Clients & Partners</h3>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#f0f4f8] text-[#0c2340]">
                {profile.clientList.length} Partners
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {profile.clientList.map((client, idx) => {
                const clientName = typeof client === 'string' ? client : (client?.name || client?.company || '');
                if (!clientName) return null;
                return (
                  <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-[#0c2340] text-xs font-semibold shadow-2xs">
                    <FaCheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>{clientName}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
              DIRECT LEAD CAPTURE FUNNEL: CONSULTATION & INQUIRY
              ======================================================== */}
        {isFieldAllowed('customerInquiry') && (
          <div id="modern-inquiry-funnel" className="space-y-2 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-2 mb-1">
                <FaCalendarAlt className="w-4 h-4 text-[#0c2340]" />
                <h3 className="text-sm font-bold text-[#0c2340]">Request a Consultation</h3>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Schedule a direct discussion with {profile.name}.
              </p>

              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Required Topic / Service
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Growth Strategy, Marketing Planning"
                    value={inquiryData.service}
                    onChange={(e) => setInquiryData(prev => ({ ...prev, service: e.target.value }))}
                    className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={inquiryData.date}
                      onChange={(e) => setInquiryData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      value={inquiryData.time}
                      onChange={(e) => setInquiryData(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Your Contact Number / Email
                  </label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210 or email@domain.com"
                    value={inquiryData.contact}
                    onChange={(e) => setInquiryData(prev => ({ ...prev, contact: e.target.value }))}
                    className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSendInquiry}
                  className="w-full py-2.5 rounded-xl bg-[#0c2340] hover:bg-[#07172b] text-white font-semibold text-xs tracking-wide shadow-sm transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                  <FaPaperPlane className="w-3 h-3" />
                  <span>Submit Consultation Request</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
              MEDIA & VIDEO GALLERY
              ======================================================== */}
        {((isFieldAllowed('profileVideo') && profile.profileVideo) || (isFieldAllowed('videos') && profile.videos && profile.videos.length > 0)) && (
          <div className="space-y-3 pt-2">
            {isFieldAllowed('profileVideo') && profile.profileVideo && (
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
                  <FaVideo className="w-4 h-4 text-[#d4a373]" />
                  <span>Introductory Video</span>
                </h3>
                <VideoPlayer src={profile.profileVideo} title={`${profile.name} - Introduction`} />
              </div>
            )}

            {isFieldAllowed('videos') && profile.videos && profile.videos.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
                    <FaFileVideo className="w-4 h-4 text-[#d4a373]" />
                    <span>Featured Video Showcase</span>
                  </h3>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#f0f4f8] text-[#0c2340]">
                    {profile.videos.length} Videos
                  </span>
                </div>

                <div className="space-y-2.5">
                  {profile.videos.map((vid, idx) => {
                    const vidUrl = typeof vid === 'string' ? vid : (vid?.url || '');
                    if (!vidUrl) return null;
                    return (
                      <div key={idx} className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs">
                        {vid.title && (
                          <h4 className="text-xs font-bold text-[#0c2340] mb-1">
                            {vid.title}
                          </h4>
                        )}
                        <VideoPlayer src={vidUrl} title={vid.title || `Video ${idx + 1}`} />
                        {vid.description && (
                          <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                            {vid.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
              OPERATING HOURS / BUSINESS SCHEDULE
              ======================================================== */}
        {isFieldAllowed('businessHours') && profile.businessHours && profile.businessHours.length > 0 && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
                <FaRegClock className="w-4 h-4 text-[#d4a373]" />
                <span>Operating Schedule</span>
              </h3>
            </div>

            <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 text-xs space-y-1.5 shadow-xs">
              {profile.businessHours.map((slot, idx) => (
                <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-100 last:border-0 text-slate-700">
                  <span className="capitalize font-medium">{slot.day}</span>
                  <span>
                    {slot.isClosed ? (
                      <span className="text-rose-500 font-medium">Closed</span>
                    ) : (
                      `${slot.openingTime || '09:00'} - ${slot.closingTime || '18:00'}`
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
              DOCUMENTS & CATALOGS
              ======================================================== */}
        {profile.downloads && profile.downloads.length > 0 && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
                <FaDownload className="w-4 h-4 text-[#d4a373]" />
                <span>Documents & Catalogs</span>
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#f0f4f8] text-[#0c2340]">
                {profile.downloads.length} Documents
              </span>
            </div>

            <div className="space-y-2">
              {profile.downloads.map((doc, idx) => (
                <a
                  key={idx}
                  href={doc.fileUrl || doc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 transition-colors text-xs font-medium text-slate-800 shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <FaFilePdf className="w-4 h-4 text-red-500" />
                    <span>{doc.title || doc.name || `Document #${idx + 1}`}</span>
                  </div>
                  <FaDownload className="w-3 h-3 text-slate-400" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
              SOCIAL NETWORKS
              ======================================================== */}
        {profile.socialLinks && profile.socialLinks.length > 0 && (
          <div className="space-y-2 pt-2">
            <h3 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
              <FaUsers className="w-4 h-4 text-[#d4a373]" />
              <span>Social Networks</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              {profile.socialLinks.map((s, idx) => {
                if (!s.url) return null;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => window.open(s.url, '_blank')}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold cursor-pointer shadow-2xs transition-colors"
                  >
                    {getSocialIcon(s.platform)}
                    <span className="capitalize">{s.platform}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Save Contact to Phone CTA */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleSaveContact}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#0c2340] hover:bg-[#07172b] text-white font-bold text-xs tracking-wide shadow-md transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaDownload className="w-4 h-4 text-white" />
            <span>Save Contact to Phone (.vcf)</span>
          </button>
        </div>

        {/* ========================================================
              SECTION 6: LET'S CONNECT (CONTACT & LOCATION MAP)
              ======================================================== */}
        {(primaryPhone || primaryEmail || addressFormatted || (isFieldAllowed('virtualNumber') && profile.virtualNumber)) && (
          <div id="section-contact" className="space-y-1.5">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="w-4 h-4 text-[#d4a373]" />
              <h3 className="text-sm font-bold text-[#0c2340]">Let's Connect</h3>
            </div>

            <div className={`p-4 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_12px_rgba(12,35,64,0.04)] ${addressFormatted ? 'grid grid-cols-2 gap-3 items-center' : 'space-y-2'}`}>
              <div className="space-y-2">
                {isFieldAllowed('virtualNumber') && profile.virtualNumber && (
                  <div
                    onClick={() => handleCall(profile.virtualNumber)}
                    className="flex items-center gap-2 text-xs text-[#0c2340] cursor-pointer hover:underline group"
                  >
                    <FaHeadset className="w-3.5 h-3.5 text-[#0c2340] shrink-0" />
                    <span className="font-medium truncate">{profile.virtualNumber}</span>
                  </div>
                )}

                {primaryPhone && (
                  <div
                    onClick={() => handleCall(primaryPhone)}
                    className="flex items-center gap-2 text-xs text-[#0c2340] cursor-pointer hover:underline group"
                  >
                    <FaPhoneAlt className="w-3.5 h-3.5 text-[#0c2340] shrink-0" />
                    <span className="font-medium truncate">{primaryPhone}</span>
                  </div>
                )}

                {primaryEmail && (
                  <div
                    onClick={() => handleEmail(primaryEmail)}
                    className="flex items-center gap-2 text-xs text-[#0c2340] cursor-pointer hover:underline group"
                  >
                    <FaEnvelope className="w-3.5 h-3.5 text-[#0c2340] shrink-0" />
                    <span className="font-medium truncate">{primaryEmail}</span>
                  </div>
                )}

                {addressFormatted && (
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
                )}
              </div>

              {/* Mini Map Card with Red Pin (Only if address is available) */}
              {addressFormatted && (
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
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 border border-slate-200 shadow-md text-[9px] font-bold text-slate-800 mb-0.5 max-w-[90%] truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                      <span className="truncate">{primaryAddress?.city || addressFormatted.split(',')[0]}</span>
                    </div>
                    <FaMapMarkerAlt className="w-4 h-4 text-red-600 drop-shadow-md -mt-1" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

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
          </div>

          <div className="flex items-center justify-center gap-4 mt-2">
            <button
              type="button"
              onClick={handleNativeShare}
              className="text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <FaShareAlt className="w-3 h-3 text-[#d4a373]" />
              <span>Share</span>
            </button>
            <span className="text-slate-500">•</span>
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <FaQrcode className="w-3 h-3 text-[#d4a373]" />
              <span>QR Code</span>
            </button>
          </div>
        </div>
      </div>


      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full shadow-2xl text-center relative border border-slate-100">
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <FaTimes className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-[#eef5fa] text-[#0c2340] flex items-center justify-center mx-auto mb-3">
              <FaQrcode className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Scan & Connect</h3>
            <p className="text-xs text-slate-500 mb-4">
              Point your camera to instantly view and save {profile.name}'s digital card.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 inline-block mb-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "https://www.revayah.one")}`}
                alt="QR Code"
                className="w-44 h-44 object-contain rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={() => handleCopy(typeof window !== "undefined" ? window.location.href : "https://www.revayah.one", 'qrModal')}
              className="w-full py-2.5 rounded-xl bg-[#0c2340] hover:bg-[#07172b] text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              {copiedItem === 'qrModal' ? (
                <>
                  <FaCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <FaCopy className="w-3.5 h-3.5" />
                  <span>Copy Card URL</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Portfolio Lightbox Modal */}
      {selectedPortfolioImg && (
        <div
          onClick={() => setSelectedPortfolioImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 cursor-pointer"
        >
          <div className="relative max-w-md w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-2" onClick={e => e.stopPropagation()}>
            <img
              src={selectedPortfolioImg.url}
              alt={selectedPortfolioImg.title}
              className="w-full rounded-xl object-contain max-h-[70vh]"
            />
            <div className="p-3 flex items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-slate-900 truncate">
                {selectedPortfolioImg.title || "Portfolio Project"}
              </h4>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedPortfolioImg(null)}
                  className="p-1 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ModernCard;
