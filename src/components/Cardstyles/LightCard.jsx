import React, { useState, useEffect, useRef } from 'react';
import {
  FaLinkedin, FaEnvelope,
  FaMapMarkerAlt, FaGlobe,
  FaPhoneAlt, FaWhatsapp, FaUser,
  FaGem, FaDownload, FaQrcode, FaShieldAlt,
  FaBriefcase, FaCalendarAlt, FaHeadset,
  FaFilePdf, FaRegClock, FaVideo,
  FaPaperPlane, FaExternalLinkAlt,
  FaShareAlt, FaCopy, FaCheck, FaTimes,
  FaCheckCircle, FaCogs, FaBuilding,
  FaImage, FaChevronLeft, FaChevronRight, FaSearchPlus,
  FaStar, FaSuitcase, FaUsers, FaFileVideo, FaCrown,
  FaInstagram
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

// --- HELPER: Video Player Component ---
const VideoPlayer = ({ src, poster, title, className = "" }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

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

  // 1. YouTube handling
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
    } else if (cleanUrl.includes('/live/')) {
      videoId = cleanUrl.split('/live/')[1]?.split('?')[0]?.split('&')[0];
    } else if (cleanUrl.includes('/v/')) {
      videoId = cleanUrl.split('/v/')[1]?.split('?')[0]?.split('&')[0];
    }

    if (videoId) {
      return (
        <div className={`relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-slate-200/80 my-3 ${className}`}>
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

  // 2. Vimeo handling
  if (cleanUrl.includes('vimeo.com')) {
    const vimeoMatch = cleanUrl.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return (
        <div className={`relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-slate-200/80 my-3 ${className}`}>
          <iframe
            src={`https://player.vimeo.com/video/${vimeoMatch[1]}`}
            title={title || "Vimeo video"}
            className="w-full h-full border-0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
  }

  // 3. Google Drive preview
  if (cleanUrl.includes('drive.google.com')) {
    const driveMatch = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch && driveMatch[1]) {
      return (
        <div className={`relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-slate-200/80 my-3 ${className}`}>
          <iframe
            src={`https://drive.google.com/file/d/${driveMatch[1]}/preview`}
            title={title || "Google Drive video"}
            className="w-full h-full border-0"
            allow="autoplay"
          />
        </div>
      );
    }
  }

  // 4. Fallback when direct HTML5 video stream fails
  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-slate-900/5 rounded-2xl p-6 text-slate-500 border border-slate-200 my-3 text-center ${className}`}>
        <FaVideo className="w-8 h-8 text-[#0c2340] mb-2" />
        <p className="text-xs font-semibold text-slate-800 mb-1">{title || "Video Stream"}</p>
        <p className="text-[11px] text-slate-500 mb-3">Playback stream unavailable in this viewer mode.</p>
        {cleanUrl && (
          <a
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0c2340] hover:bg-[#0c2340]/90 text-white rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-95"
          >
            <span>Watch Video Directly</span>
            <FaExternalLinkAlt className="w-3 h-3 text-white" />
          </a>
        )}
      </div>
    );
  }

  // 5. Direct Video file (MP4, WebM, Azure Blob URL, Base64)
  return (
    <div className={`relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-slate-200/80 my-3 ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0c2340] border-t-transparent" />
        </div>
      )}
      <video
        src={cleanUrl}
        className="w-full h-full object-contain"
        controls
        playsInline
        preload="metadata"
        poster={poster}
        onError={() => setError(true)}
        onLoadedData={() => setLoading(false)}
      />
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

const LightCard = ({ cardData = {}, plan = 'BusinessPremium', isPreview = false, isSnapshot = false, onShare }) => {
  if (!cardData || typeof cardData !== 'object') return null;

  // Normalize plan
  const normalizePlan = (raw) => {
    if (!raw) return 'Personal';
    if (cardFieldsConfig[raw]) return raw;
    const cleaned = String(raw).replace(/[\s\-_]/g, '').toLowerCase();
    for (const key of Object.keys(cardFieldsConfig)) {
      if (key.toLowerCase() === cleaned) return key;
    }
    return 'BusinessPremium';
  };

  const currentPlan = normalizePlan(cardData?.cardType || plan);

  const isFieldAllowed = (field) => {
    if (!field) return true;
    const lk = field.toLowerCase();
    if (lk === 'gallery' && (cardData?.gallery?.length > 0 || cardData?.addons?.gallery || cardData?.addons?.photogallery)) return true;
    if (cardData?.addons) {
      if ((lk === 'catalog' || lk === 'catalogpdf' || lk === 'downloads') &&
        (cardData.addons.docsbuilder || cardData.addons.catalogbuilder || cardData.addons.brochurebuilder || cardData.addons.docsmanager)) return true;
      if ((lk === 'nfcsettings' || lk === 'nfccard') && (cardData.addons.nfccard || cardData.addons.nfc)) return true;
      if ((lk === 'profilevideo' || lk === 'productvideo') && (cardData.addons.profilebuilder || cardData.addons.portfoliobuilder)) return true;
      if (lk === 'testimonials' && cardData.addons.portfoliobuilder) return true;
    }
    const allowed = cardFieldsConfig[currentPlan] || cardFieldsConfig.Personal;
    return allowed.includes(field);
  };

  // State management
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(null);
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
  const [copiedItem, setCopiedItem] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showAboutMore, setShowAboutMore] = useState(false);
  const [showOverviewMore, setShowOverviewMore] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    service: '',
    date: '',
    time: '',
    contact: '',
    submitted: false
  });

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
      : cardData?.phone ? [{ label: 'Direct', number: cardData.phone, isPrimary: true }] : [],
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
    enableOneTapCall: cardData?.enableOneTapCall !== undefined ? cardData.enableOneTapCall : true,
    enableWhatsApp: cardData?.enableWhatsApp !== undefined ? cardData.enableWhatsApp : true,
    enableEmail: cardData?.enableEmail !== undefined ? cardData.enableEmail : true
  };

  const primaryPhone = profile.phones.find(p => p.isPrimary)?.number || profile.phones[0]?.number || '';
  const primaryEmail = profile.emails.find(e => e.isPrimary)?.address || profile.emails[0]?.address || cardData?.email || '';
  const primaryWebsite = profile.websites[0]?.url || (typeof profile.websites[0] === 'string' ? profile.websites[0] : '');
  const primaryAddress = profile.addresses[0]?.street || profile.addresses[0]?.city || (typeof profile.addresses[0] === 'string' ? profile.addresses[0] : '');
  const linkedinLink = profile.socialLinks.find(s => s.platform?.toLowerCase().includes('linkedin'))?.url || '';
  const businessStatus = getBusinessStatus(profile.businessHours);

  // Copy helper
  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedItem(key);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  // Keyboard navigation for gallery lightbox
  useEffect(() => {
    if (selectedGalleryIdx === null || !profile.gallery || profile.gallery.length === 0) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedGalleryIdx(null);
      if (e.key === 'ArrowRight') setSelectedGalleryIdx(prev => (prev + 1) % profile.gallery.length);
      if (e.key === 'ArrowLeft') setSelectedGalleryIdx(prev => (prev - 1 + profile.gallery.length) % profile.gallery.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGalleryIdx, profile.gallery?.length]);

  // Direct contact actions
  const handleCall = (num) => {
    const target = num || primaryPhone;
    if (!target) return;
    window.location.href = `tel:${target.replace(/\s+/g, '')}`;
  };

  const handleWhatsApp = (num) => {
    const cleanNum = (num || primaryPhone).replace(/\D/g, '');
    if (!cleanNum) return;
    const greeting = encodeURIComponent(`Hello ${profile.name}, I connected with you via your Reva-Yah One digital card.`);
    window.open(`https://wa.me/${cleanNum}?text=${greeting}`, '_blank');
  };

  const handleEmail = (email) => {
    const target = email || primaryEmail;
    if (!target) return;
    window.location.href = `mailto:${target}?subject=${encodeURIComponent(`Inquiry via Reva-Yah One: ${profile.name}`)}`;
  };

  const handleWebsite = (url) => {
    if (!url) return;
    const cleanUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(cleanUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSaveContact = () => {
    generateVCard(cardData);
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
    const shareTitle = `${profile.name} | Digital Identity Card`;
    const shareText = `Hi! Here's my digital identity card. Click to view my profile:\n${shareUrl}`;

    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl
      }).catch((err) => {
        if (err.name !== "AbortError") {
          handleCopy(shareText, 'shareUrl');
        }
      });
    } else {
      handleCopy(shareText, 'shareUrl');
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
    }
  };

  const handleSendInquiry = () => {
    if (!inquiryData.service || !inquiryData.contact) {
      alert("Please provide the service required and your contact number.");
      return;
    }
    const cleanPhone = primaryPhone.replace(/\D/g, '');
    const message = `Hello ${profile.name}!\n\nI would like to request a consultation via your Reva-Yah One card:\n- Service: ${inquiryData.service}\n- Preferred Date: ${inquiryData.date || 'Flexible'}\n- Preferred Time: ${inquiryData.time || 'Flexible'}\n- Customer Contact: ${inquiryData.contact}`;

    setInquiryData(prev => ({ ...prev, submitted: true }));

    if (cleanPhone) {
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
    } else if (primaryEmail) {
      window.location.href = `mailto:${primaryEmail}?subject=${encodeURIComponent(`Service Request: ${inquiryData.service}`)}&body=${encodeURIComponent(message)}`;
    }
  };

  const getSocialIcon = (platform) => {
    const p = platform?.toLowerCase() || '';
    if (p.includes('linkedin')) return <FaLinkedin className="w-4 h-4" />;
    if (p.includes('twitter') || p.includes('x')) return <FaXTwitter className="w-4 h-4" />;
    if (p.includes('github')) return <FaGithub className="w-4 h-4" />;
    if (p.includes('facebook')) return <FaFacebookF className="w-4 h-4" />;
    if (p.includes('youtube')) return <FaYoutube className="w-4 h-4" />;
    if (p.includes('whatsapp')) return <FaWhatsapp className="w-4 h-4" />;
    return <FaGlobe className="w-4 h-4" />;
  };

  // Snapshot view for WhatsApp share image / preview thumbnail
  if (isSnapshot) {
    const rawPhoto = profile.profilePhoto;
    const photoSrc = (rawPhoto && rawPhoto.startsWith('http') && !rawPhoto.includes('unsplash.com'))
      ? `${CARD_URL}/proxy-image?url=${encodeURIComponent(rawPhoto)}`
      : rawPhoto;

    return (
      <div className="w-[380px] max-w-full bg-white text-slate-800 flex flex-col items-center justify-start p-0 font-sans antialiased overflow-hidden rounded-[28px] border border-slate-200 shadow-xl relative">
        <div className="relative w-full bg-white pt-5 pb-3 px-5 text-left">
          {/* Top Bar: REVAYAH ONE Brand Pill (Left) + Share Button (Right) */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c2340] border border-[#c8973b]/50 shadow-sm">
              <FaShieldAlt className="w-3.5 h-3.5 text-[#c8973b]" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                REVAYAH ONE
              </span>
            </div>
            <div className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-[#0c2340] shadow-xs">
              <FaShareAlt className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Hero Identity: Avatar on Left, Text on Right */}
          <div className="flex items-center gap-3.5 mb-3">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full p-[2px] bg-white border-2 border-slate-200 shadow-md overflow-hidden flex items-center justify-center">
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
              {profile.jobTitle && <p className="text-xs font-bold text-[#0c2340] mt-0.5">{profile.jobTitle}</p>}
              {profile.companyName && <p className="text-[11px] font-semibold text-[#0c2340]">{profile.companyName}</p>}
              {profile.tagline && (
                <>
                  <div className="w-full h-[1px] bg-slate-200 my-1.5" />
                  <p className="text-[11px] text-[#0c2340] italic font-medium leading-snug">
                    {profile.tagline}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-2 text-center my-3">
            {primaryPhone && (
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 rounded-full bg-[#0c2340] text-white flex items-center justify-center shadow-md">
                  <FaPhoneAlt className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-semibold text-[#0c2340] mt-1">Call</span>
              </div>
            )}
            {primaryPhone && (
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 rounded-full bg-[#0c2340] text-white flex items-center justify-center shadow-md">
                  <FaWhatsapp className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold text-[#0c2340] mt-1">WhatsApp</span>
              </div>
            )}
            {primaryEmail && (
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 rounded-full bg-[#0c2340] text-white flex items-center justify-center shadow-md">
                  <FaEnvelope className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-semibold text-[#0c2340] mt-1">Email</span>
              </div>
            )}
            {linkedinLink ? (
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 rounded-full bg-[#0c2340] text-white flex items-center justify-center shadow-md">
                  <FaLinkedin className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-semibold text-[#0c2340] mt-1">Linkedin</span>
              </div>
            ) : primaryWebsite ? (
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 rounded-full bg-[#0c2340] text-white flex items-center justify-center shadow-md">
                  <FaGlobe className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-semibold text-[#0c2340] mt-1">Portal</span>
              </div>
            ) : null}
          </div>

          {/* About Text if available */}
          {profile.aboutText && (
            <div className="my-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-left">
              <span className="text-[10px] uppercase font-bold text-[#0c2340] block mb-1">About</span>
              <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed">{profile.aboutText}</p>
            </div>
          )}

          {/* Footer */}
          <div className="pt-2 pb-1 flex items-center justify-center gap-1.5 text-[11px] text-slate-700">
            <FaShieldAlt className="w-3.5 h-3.5 text-[#c8973b]" />
            <span>Powered by <strong className="font-bold text-[#0c2340]">{profile.brandLabel || 'REVAYAH ONE'}</strong></span>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // EXACT MAIN CARD LAYOUT (MATCHING IMAGE SCREENSHOT)
  // ========================================================
  return (
    <div className="w-full max-w-md mx-auto bg-white text-slate-800 flex flex-col relative overflow-hidden min-h-screen font-sans antialiased selection:bg-[#0c2340] selection:text-white">

      {/* ========================================================
            HERO HEADER: REVAYAH ONE BRAND + HAMBURGER MENU / SHARE
            ======================================================== */}
      <div className="w-full bg-white px-5 pt-4 pb-2">
        <div className="flex items-center justify-between">
          {/* User Requested REVAYAH ONE Brand Pill Logo */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c2340] border border-[#c8973b]/50 shadow-sm">
            <FaShieldAlt className="w-3.5 h-3.5 text-[#c8973b]" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">
              {profile.brandLabel || 'REVAYAH ONE'}
            </span>
          </div>

          {/* Share Button (Direct Share & Copy Link) */}
          <button
            type="button"
            onClick={handleNativeShare}
            className="w-8 h-8 rounded-full border border-slate-300 bg-white/95 shadow-xs flex items-center justify-center text-[#0c2340] hover:bg-slate-100 transition-all active:scale-95 cursor-pointer shrink-0"
            title="Share Card"
          >
            {copiedItem === 'shareUrl' ? (
              <FaCheck className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <FaShareAlt className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* ========================================================
            HERO IDENTITY: AVATAR ON LEFT, NAME & DETAILS ON RIGHT
            ======================================================== */}
      <div className="w-full bg-white px-5 py-3">
        <div className="flex items-center gap-4 text-left">

          {/* Left: Avatar with Crisp Clean Border Ring */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-white border-2 border-slate-200 shadow-md overflow-hidden flex items-center justify-center">
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
                <FaUser className="w-12 h-12 text-[#0c2340]/45" />
              </div>
            </div>

            {/* Company Logo Badge if available */}
            {isFieldAllowed('companyLogo') && profile.companyLogo && (
              <div
                className="absolute -top-1 -right-1 w-7 h-7 rounded-lg bg-white border border-slate-200 p-0.5 shadow-md flex items-center justify-center"
                title={profile.companyName || "Company"}
              >
                <img
                  src={profile.companyLogo}
                  alt="Company Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          {/* Right: Profile Details */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0c2340] leading-tight">
              {profile.name}
            </h1>

            {profile.jobTitle && (
              <p className="text-sm font-bold text-[#0c2340] mt-0.5">
                {profile.jobTitle}
              </p>
            )}

            {isFieldAllowed('companyName') && profile.companyName && (
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {profile.companyName}{profile.department ? ` • ${profile.department}` : ''}
              </p>
            )}

            {/* Slogan / Tagline */}
            {profile.tagline && (
              <>
                <div className="w-full h-[1.5px] bg-slate-200 my-2" />
                <p className="text-xs sm:text-sm italic font-medium text-[#0c2340] leading-snug">
                  {profile.tagline}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================
            ACTION BUTTONS: ROUND NAVY CIRCLES WITH NAVY LABELS
            ======================================================== */}
      <div className="w-full px-5 py-3">
        <div className="flex items-center justify-center gap-3 text-center">

          {/* 1. Call */}
          {profile.enableOneTapCall && primaryPhone && (
            <button
              type="button"
              onClick={() => handleCall(primaryPhone)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none flex-1 max-w-[80px]"
              title="Call"
            >
              <div className="w-12 h-12 rounded-full bg-[#0c2340] hover:bg-[#15345c] text-white flex items-center justify-center shadow-md active:scale-95 transition-all">
                <FaPhoneAlt className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-[#0c2340] mt-1.5 tracking-tight">Call</span>
            </button>
          )}

          {/* 2. WhatsApp */}
          {profile.enableWhatsApp && primaryPhone && (
            <button
              type="button"
              onClick={() => handleWhatsApp(primaryPhone)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none flex-1 max-w-[80px]"
              title="WhatsApp"
            >
              <div className="w-12 h-12 rounded-full bg-[#0c2340] hover:bg-[#15345c] text-white flex items-center justify-center shadow-md active:scale-95 transition-all">
                <FaWhatsapp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-semibold text-[#0c2340] mt-1.5 tracking-tight">WhatsApp</span>
            </button>
          )}

          {/* 3. Email */}
          {profile.enableEmail && primaryEmail && (
            <button
              type="button"
              onClick={() => handleEmail(primaryEmail)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none flex-1 max-w-[80px]"
              title="Email"
            >
              <div className="w-12 h-12 rounded-full bg-[#0c2340] hover:bg-[#15345c] text-white flex items-center justify-center shadow-md active:scale-95 transition-all">
                <FaEnvelope className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-[#0c2340] mt-1.5 tracking-tight">Email</span>
            </button>
          )}

          {/* 4. Linkedin / Portal / QR */}
          {linkedinLink ? (
            <button
              type="button"
              onClick={() => handleWebsite(linkedinLink)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none flex-1 max-w-[80px]"
              title="LinkedIn"
            >
              <div className="w-12 h-12 rounded-full bg-[#0c2340] hover:bg-[#15345c] text-white flex items-center justify-center shadow-md active:scale-95 transition-all">
                <FaLinkedin className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-[#0c2340] mt-1.5 tracking-tight">Linkedin</span>
            </button>
          ) : primaryWebsite ? (
            <button
              type="button"
              onClick={() => handleWebsite(primaryWebsite)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none flex-1 max-w-[80px]"
              title="Website"
            >
              <div className="w-12 h-12 rounded-full bg-[#0c2340] hover:bg-[#15345c] text-white flex items-center justify-center shadow-md active:scale-95 transition-all">
                <FaGlobe className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-[#0c2340] mt-1.5 tracking-tight">Portal</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none flex-1 max-w-[80px]"
              title="QR Code"
            >
              <div className="w-12 h-12 rounded-full bg-[#0c2340] hover:bg-[#15345c] text-white flex items-center justify-center shadow-md active:scale-95 transition-all">
                <FaQrcode className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-[#0c2340] mt-1.5 tracking-tight">QR Code</span>
            </button>
          )}

        </div>
      </div>

      {/* Optional User Banner Photo */}
      {(cardData?.bannerPhoto || cardData?.coverPhoto) && (
        <div className="w-full px-5 py-2">
          <div className="w-full aspect-[2.4/1] rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <img
              src={cardData.bannerPhoto || cardData.coverPhoto}
              alt="Banner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* ========================================================
            SAVE CONTACT TO PHONE (vCard CTA)
            ======================================================== */}
      <div className="w-full px-5 pt-3 pb-2">
        <button
          type="button"
          onClick={handleSaveContact}
          className="w-full py-3 px-6 rounded-2xl bg-[#0c2340] hover:bg-[#15345c] text-white font-semibold text-sm tracking-wide shadow-md transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
        >
          <FaDownload className="w-4 h-4 text-white" />
          <span>Save Contact to Phone</span>
        </button>
      </div>

      {/* ========================================================
            ABOUT ME / EXECUTIVE SUMMARY
            ======================================================== */}
      {(profile.aboutText || profile.bio) && (
        <div className="w-full px-5 py-3">
          <div className="bg-[#f8fafc] rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FaBriefcase className="w-3 h-3 text-[#0c2340]" />
              <span>About Me</span>
            </h3>
            {profile.aboutText && (
              <div>
                <p className="text-xs leading-relaxed text-slate-700">
                  {showAboutMore || profile.aboutText.length <= 160
                    ? profile.aboutText
                    : `${profile.aboutText.slice(0, 160)}...`}
                </p>
                {profile.aboutText.length > 160 && (
                  <button
                    type="button"
                    onClick={() => setShowAboutMore(!showAboutMore)}
                    className="mt-1.5 text-[11px] font-semibold text-[#0c2340] hover:text-[#c8973b] inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{showAboutMore ? 'Show Less' : 'Read More'}</span>
                    <FaChevronRight className={`w-2.5 h-2.5 transition-transform ${showAboutMore ? '-rotate-90' : 'rotate-90'}`} />
                  </button>
                )}
              </div>
            )}
            {profile.bio && profile.bio !== profile.aboutText && (
              <div className={profile.aboutText ? 'pt-2 border-t border-slate-100 mt-2' : ''}>
                <p className="text-xs leading-relaxed text-slate-500">
                  {showAboutMore || profile.bio.length <= 140
                    ? profile.bio
                    : `${profile.bio.slice(0, 140)}...`}
                </p>
                {!profile.aboutText && profile.bio.length > 140 && (
                  <button
                    type="button"
                    onClick={() => setShowAboutMore(!showAboutMore)}
                    className="mt-1.5 text-[11px] font-semibold text-[#0c2340] hover:text-[#c8973b] inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{showAboutMore ? 'Show Less' : 'Read More'}</span>
                    <FaChevronRight className={`w-2.5 h-2.5 transition-transform ${showAboutMore ? '-rotate-90' : 'rotate-90'}`} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
            SERVICES & SOLUTIONS (Full Comprehensive Grid)
            ======================================================== */}
      {((isFieldAllowed('services') && profile.services && profile.services.length > 0) || (isFieldAllowed('servicesProducts') && profile.servicesProducts)) && (
        <div className="w-full px-5 py-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
              <FaCogs className="w-4 h-4 text-[#0c2340]" />
              <span>Products & Services</span>
            </h2>
            {profile.services.length > 0 && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#eef5fa] text-[#0c2340]">
                {profile.services.length} Available
              </span>
            )}
          </div>

          {/* High-level Services & Products Summary */}
          {profile.servicesProducts && (
            <div className="p-3.5 mb-3 rounded-2xl bg-[#f8fafc] border border-slate-200/80 text-xs">
              <span className="text-[10px] uppercase font-bold text-[#0c2340] tracking-wider block mb-1">
                Services & Products Overview
              </span>
              <p className="text-slate-600 leading-relaxed font-normal">
                {showOverviewMore || profile.servicesProducts.length <= 140
                  ? profile.servicesProducts
                  : `${profile.servicesProducts.slice(0, 140)}...`}
              </p>
              {profile.servicesProducts.length > 140 && (
                <button
                  type="button"
                  onClick={() => setShowOverviewMore(!showOverviewMore)}
                  className="mt-1 text-[11px] font-semibold text-[#0c2340] hover:text-[#c8973b] inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>{showOverviewMore ? 'Show Less' : 'Read More'}</span>
                  <FaChevronRight className={`w-2 h-2 transition-transform ${showOverviewMore ? '-rotate-90' : 'rotate-90'}`} />
                </button>
              )}
            </div>
          )}

          {/* Service Cards Grid with View More */}
          {profile.services && profile.services.length > 0 && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(showAllServices ? profile.services : profile.services.slice(0, 4)).map((srv, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200/80 hover:border-[#0c2340]/40 transition-all shadow-xs group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="w-6 h-6 rounded-md bg-[#eef5fa] text-[#0c2340] flex items-center justify-center text-xs">
                          <FaSuitcase className="w-3 h-3 text-[#0c2340]" />
                        </div>
                        {srv.price && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#eef5fa] text-[#0c2340] border border-slate-200/60">
                            {srv.currency || '₹'}{srv.price}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#0c2340] line-clamp-1">
                        {srv.name}
                      </h3>
                      {srv.category && (
                        <span className="text-[9.5px] font-medium uppercase tracking-wider text-slate-400 block mt-0.5">
                          {srv.category}
                        </span>
                      )}
                      {srv.description && (
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                          {srv.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 mt-2 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-medium">Direct Advisory</span>
                      <button
                        type="button"
                        onClick={() => {
                          setInquiryData(prev => ({ ...prev, service: srv.name }));
                          const funnel = document.getElementById('light-inquiry-funnel');
                          if (funnel) funnel.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-[11px] font-semibold text-[#0c2340] hover:underline transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Inquire</span>
                        <FaPaperPlane className="w-2.5 h-2.5 text-[#0c2340]" />
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
                    className="px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
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
        <div className="w-full px-5 py-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
              <FaGem className="w-4 h-4 text-[#0c2340]" />
              <span>Products & Solutions</span>
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#eef5fa] text-[#0c2340]">
              {profile.products.length} Items
            </span>
          </div>

          <div className="space-y-2.5">
            {(showAllProducts ? profile.products : profile.products.slice(0, 3)).map((item, idx) => (
              <div key={idx} className="bg-[#f8fafc] rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex items-start gap-3 hover:border-[#0c2340]/40 transition-colors">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-slate-900 text-xs truncate">{item.name}</h3>
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
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setShowAllProducts(!showAllProducts)}
                className="px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{showAllProducts ? 'Show Less' : `View All ${profile.products.length} Products`}</span>
                <FaChevronRight className={`w-2 h-2 transition-transform ${showAllProducts ? '-rotate-90' : 'rotate-90'}`} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
            WEBSITES & DIGITAL PORTFOLIOS
            ======================================================== */}
      {profile.websites && profile.websites.length > 0 && (
        <div className="w-full px-5 py-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
              <FaGlobe className="w-4 h-4 text-[#0c2340]" />
              <span>Websites & Portfolios</span>
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#eef5fa] text-[#0c2340]">
              {profile.websites.length} Links
            </span>
          </div>

          <div className="space-y-2">
            {profile.websites.map((site, idx) => {
              const url = typeof site === 'string' ? site : (site?.url || '');
              if (!url) return null;
              const label = (typeof site === 'object' && site?.label) ? site.label : 'Portfolio / Website';
              const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
              return (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8fafc] hover:bg-slate-100 border border-slate-200/80 transition-colors">
                  <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
                    <div className="w-8 h-8 rounded-full bg-[#0c2340] text-white flex items-center justify-center shrink-0">
                      <FaGlobe className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        {label}
                      </span>
                      <p className="text-xs font-semibold text-slate-800 truncate">{displayUrl}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(url, `site-${idx}`)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                      title="Copy Link"
                    >
                      {copiedItem === `site-${idx}` ? <FaCheck className="w-3 h-3 text-emerald-500" /> : <FaCopy className="w-3 h-3" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => window.open(url, '_blank')}
                      className="p-1.5 rounded-lg text-[#0c2340] hover:bg-sky-50 transition-colors cursor-pointer"
                      title="Open Website"
                    >
                      <FaExternalLinkAlt className="w-3 h-3" />
                    </button>
                  </div>
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
        <div id="light-inquiry-funnel" className="w-full px-5 py-3 border-t border-slate-100">
          <div className="bg-[#f8fafc] rounded-2xl p-4 border border-slate-200/90 shadow-xs">
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
                  placeholder="e.g. Strategic Planning, Growth Consulting"
                  value={inquiryData.service}
                  onChange={(e) => setInquiryData(prev => ({ ...prev, service: e.target.value }))}
                  className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
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
                    className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
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
                    className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Your Contact Number
                </label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={inquiryData.contact}
                  onChange={(e) => setInquiryData(prev => ({ ...prev, contact: e.target.value }))}
                  className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                />
              </div>

              <button
                type="button"
                onClick={handleSendInquiry}
                className="w-full py-2.5 rounded-xl bg-[#0c2340] hover:bg-[#15345c] text-white font-semibold text-xs tracking-wide shadow-sm transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <FaPaperPlane className="w-3 h-3" />
                <span>Submit Consultation Request</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
            PROFILE VIDEO & MEDIA (IF ANY)
            ======================================================== */}
      {isFieldAllowed('profileVideo') && profile.profileVideo && (
        <div className="w-full px-5 py-3 border-t border-slate-100">
          <h3 className="text-sm font-bold text-[#0c2340] mb-2 flex items-center gap-2">
            <FaVideo className="w-4 h-4 text-[#0c2340]" />
            <span>Introductory Video</span>
          </h3>
          <VideoPlayer src={profile.profileVideo} title={`${profile.name} - Introduction`} />
        </div>
      )}

      {/* ========================================================
            OPERATING HOURS / BUSINESS SCHEDULE (IF ANY)
            ======================================================== */}
      {isFieldAllowed('businessHours') && profile.businessHours && profile.businessHours.length > 0 && (
        <div className="w-full px-5 py-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
              <FaRegClock className="w-4 h-4 text-[#0c2340]" />
              <span>Operating Schedule</span>
            </h3>
            {businessStatus && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${businessStatus.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                }`}>
                {businessStatus.isOpen ? 'Open Now' : 'Closed Today'}
              </span>
            )}
          </div>

          <div className="bg-[#f8fafc] rounded-2xl p-3 border border-slate-200 text-xs space-y-1.5">
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
              const sched = profile.businessHours.find(h => h.day?.toLowerCase() === day);
              const isToday = new Date().getDay() === ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(day);
              return (
                <div
                  key={day}
                  className={`flex justify-between items-center py-1 px-2 rounded-lg ${isToday ? 'bg-sky-50 font-semibold text-[#0c2340]' : 'text-slate-600'
                    }`}
                >
                  <span className="capitalize">{day}</span>
                  <span>
                    {!sched || sched.isClosed ? (
                      <span className="text-slate-400">Closed</span>
                    ) : (
                      `${sched.openingTime || '09:00'} - ${sched.closingTime || '18:00'}`
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
            CONTACT DIRECTORY
            ======================================================== */}
      <div className="w-full px-5 py-3 border-t border-slate-100">
        <h3 className="text-sm font-bold text-[#0c2340] mb-2.5 flex items-center gap-2">
          <FaHeadset className="w-4 h-4 text-[#0c2340]" />
          <span>Contact Details</span>
        </h3>

        <div className="space-y-2">
          {/* Virtual Business Line */}
          {isFieldAllowed('virtualNumber') && profile.virtualNumber && (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8fafc] hover:bg-slate-100 border border-slate-200/80 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0c2340] text-white flex items-center justify-center shrink-0">
                  <FaHeadset className="w-3 h-3 text-white" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Virtual Business Line
                  </span>
                  <p className="text-xs font-semibold text-slate-800">{profile.virtualNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleCopy(profile.virtualNumber, 'virtual-number')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  title="Copy Number"
                >
                  {copiedItem === 'virtual-number' ? <FaCheck className="w-3 h-3 text-emerald-500" /> : <FaCopy className="w-3 h-3" />}
                </button>
                <button
                  type="button"
                  onClick={() => handleCall(profile.virtualNumber)}
                  className="p-1.5 rounded-lg text-[#0c2340] hover:bg-sky-50 transition-colors cursor-pointer"
                  title="Call Direct"
                >
                  <FaExternalLinkAlt className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Phone */}
          {profile.phones.map((p, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8fafc] hover:bg-slate-100 border border-slate-200/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0c2340] text-white flex items-center justify-center shrink-0">
                  <FaPhoneAlt className="w-3 h-3 text-white" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {p.label || 'Phone'}
                  </span>
                  <p className="text-xs font-semibold text-slate-800">{p.number}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleCopy(p.number, `phone-${idx}`)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  title="Copy Number"
                >
                  {copiedItem === `phone-${idx}` ? <FaCheck className="w-3 h-3 text-emerald-500" /> : <FaCopy className="w-3 h-3" />}
                </button>
                <button
                  type="button"
                  onClick={() => handleCall(p.number)}
                  className="p-1.5 rounded-lg text-[#0c2340] hover:bg-sky-50 transition-colors cursor-pointer"
                  title="Call"
                >
                  <FaExternalLinkAlt className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}

          {/* Email */}
          {profile.emails.map((e, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8fafc] hover:bg-slate-100 border border-slate-200/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0c2340] text-white flex items-center justify-center shrink-0">
                  <FaEnvelope className="w-3 h-3 text-white" />
                </div>
                <div className="max-w-[200px] truncate">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {e.label || 'Email'}
                  </span>
                  <p className="text-xs font-semibold text-slate-800 truncate">{e.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleCopy(e.address, `email-${idx}`)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  title="Copy Email"
                >
                  {copiedItem === `email-${idx}` ? <FaCheck className="w-3 h-3 text-emerald-500" /> : <FaCopy className="w-3 h-3" />}
                </button>
                <button
                  type="button"
                  onClick={() => handleEmail(e.address)}
                  className="p-1.5 rounded-lg text-[#0c2340] hover:bg-sky-50 transition-colors cursor-pointer"
                  title="Send Email"
                >
                  <FaExternalLinkAlt className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}

          {/* Address */}
          {profile.addresses.map((addr, idx) => {
            const fullText = addr.fullAddress || `${addr.street || ''}, ${addr.city || ''} ${addr.country || ''}`.trim();
            if (!fullText) return null;
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8fafc] hover:bg-slate-100 border border-slate-200/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0c2340] text-white flex items-center justify-center shrink-0">
                    <FaMapMarkerAlt className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {addr.label || 'Office'}
                    </span>
                    <p className="text-xs font-semibold text-slate-800">{fullText}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(fullText)}`, '_blank')}
                  className="p-1.5 rounded-lg text-[#0c2340] hover:bg-sky-50 transition-colors cursor-pointer"
                  title="Open Maps"
                >
                  <FaExternalLinkAlt className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================
            PHOTO GALLERY & SHOWCASE (Single-Row Strip with Count)
            ======================================================== */}
      {isFieldAllowed('gallery') && profile.gallery && profile.gallery.length > 0 && (() => {
        const isValidImageUrl = (str) => {
          if (!str || typeof str !== 'string') return false;
          const trimmed = str.trim();
          if (trimmed === 'SAVED' || trimmed === 'null' || trimmed === 'undefined' || trimmed === '') return false;
          return trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:image/') || trimmed.startsWith('blob:') || trimmed.startsWith('/');
        };

        const validGallery = profile.gallery
          .map((item, idx) => {
            const url = item.url || item.image || (typeof item === 'string' ? item : '');
            if (!isValidImageUrl(url)) return null;
            return {
              url,
              title: item.title || `Photo ${idx + 1}`,
              category: item.category || 'Portfolio',
              description: item.description || '',
              idx
            };
          })
          .filter(Boolean);

        if (validGallery.length === 0) return null;

        const MAX_VISIBLE = 3;
        const totalCount = validGallery.length;
        const hasMore = totalCount > MAX_VISIBLE;
        const visibleList = hasMore ? validGallery.slice(0, MAX_VISIBLE) : validGallery;
        const moreCount = totalCount - (MAX_VISIBLE - 1);

        return (
          <div className="w-full px-5 py-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
                <FaImage className="w-4 h-4 text-[#0c2340]" />
                <span>Photo Gallery & Showcase</span>
              </h3>
              <button
                type="button"
                onClick={() => setSelectedGalleryIdx(0)}
                className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>{validGallery.length} {validGallery.length === 1 ? 'Photo' : 'Photos'}</span>
                {validGallery.length > 1 && <span className="text-[#0c2340] font-bold">›</span>}
              </button>
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
                    onClick={() => setSelectedGalleryIdx(item.idx)}
                    className={`shrink-0 aspect-square group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer ${
                      validGallery.length === 1
                        ? 'w-full aspect-[16/9]'
                        : validGallery.length === 2
                        ? 'w-[calc((100%-0.625rem)/2)]'
                        : 'w-[calc((100%-1.25rem)/3)]'
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        const hasRetried = e.currentTarget.getAttribute('data-proxy-retried');
                        if (!hasRetried && item.url && typeof item.url === 'string' && item.url.startsWith('http')) {
                          e.currentTarget.setAttribute('data-proxy-retried', '1');
                          e.currentTarget.src = `${CARD_URL}/proxy-image?url=${encodeURIComponent(item.url)}`;
                        } else {
                          e.currentTarget.style.display = 'none';
                        }
                      }}
                    />

                    <div className="absolute inset-0 bg-[#0c2340]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                      <span className="w-8 h-8 rounded-full bg-white/95 text-[#0c2340] shadow-md flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-200">
                        <FaSearchPlus className="w-3.5 h-3.5 text-[#0c2340]" />
                      </span>
                    </div>

                    {item.title && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2 text-white pointer-events-none">
                        <p className="text-[11px] font-semibold truncate leading-tight text-slate-200">
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
            DOWNLOADS & CATALOGS (IF ANY)
            ======================================================== */}
      {isFieldAllowed('downloads') && profile.downloads && profile.downloads.length > 0 && (
        <div className="w-full px-5 py-3 border-t border-slate-100">
          <h3 className="text-sm font-bold text-[#0c2340] mb-2.5 flex items-center gap-2">
            <FaDownload className="w-4 h-4 text-[#0c2340]" />
            <span>Documents & Brochures</span>
          </h3>

          <div className="space-y-2">
            {profile.downloads.map((doc, idx) => (
              <a
                key={idx}
                href={doc.fileUrl || doc.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8fafc] hover:bg-slate-100 border border-slate-200 transition-colors text-xs font-medium text-slate-800"
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
            CLIENT LIST & PARTNERS
            ======================================================== */}
      {isFieldAllowed('clientList') && profile.clientList && profile.clientList.length > 0 && (
        <div className="w-full px-5 py-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
              <FaBuilding className="w-4 h-4 text-[#0c2340]" />
              <span>Clients & Partners</span>
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#eef5fa] text-[#0c2340]">
              {profile.clientList.length} Partners
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.clientList.map((client, idx) => {
              const clientName = typeof client === 'string' ? client : (client?.name || client?.company || '');
              if (!clientName) return null;
              return (
                <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#f8fafc] border border-slate-200/90 text-slate-800 text-xs font-semibold shadow-2xs">
                  <FaCheckCircle className="w-3 h-3 text-emerald-500" />
                  <span>{clientName}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
            CLIENT TESTIMONIALS & ENDORSEMENTS
            ======================================================== */}
      {isFieldAllowed('testimonials') && profile.testimonials && profile.testimonials.length > 0 && (
        <div className="w-full px-5 py-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
              <FaStar className="w-4 h-4 text-[#c8973b]" />
              <span>Client Testimonials</span>
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#eef5fa] text-[#0c2340]">
              {profile.testimonials.length} Reviews
            </span>
          </div>

          <div className="space-y-3">
            {profile.testimonials.map((test, idx) => {
              const quote = test.testimonial || test.quote || test.text || '';
              if (!quote && !test.clientName) return null;
              const rating = test.rating || 5;
              return (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(rating)].map((_, i) => (
                        <FaStar key={i} className="w-3 h-3 text-[#c8973b]" />
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
                    <div className="pt-2 border-t border-slate-200/60 text-xs">
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
            FEATURED VIDEOS SHOWCASE (All Videos)
            ======================================================== */}
      {isFieldAllowed('videos') && profile.videos && profile.videos.length > 0 && (
        <div className="w-full px-5 py-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
              <FaFileVideo className="w-4 h-4 text-[#0c2340]" />
              <span>Featured Video Showcase</span>
            </h3>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#eef5fa] text-[#0c2340]">
              {profile.videos.length} Videos
            </span>
          </div>

          <div className="space-y-3">
            {profile.videos.map((vid, idx) => {
              const vidUrl = typeof vid === 'string' ? vid : (vid?.url || '');
              if (!vidUrl) return null;
              return (
                <div key={idx} className="bg-[#f8fafc] rounded-2xl p-3 border border-slate-200/80">
                  {vid.title && (
                    <h4 className="text-xs font-bold text-[#0c2340] mb-1">
                      {vid.title}
                    </h4>
                  )}
                  <VideoPlayer src={vidUrl} title={vid.title || `Video ${idx + 1}`} />
                  {vid.description && (
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                      {vid.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
            SOCIAL NETWORKS
            ======================================================== */}
      {profile.socialLinks && profile.socialLinks.length > 0 && (
        <div className="w-full px-5 py-3 border-t border-slate-100">
          <h3 className="text-sm font-bold text-[#0c2340] mb-2.5 flex items-center gap-2">
            <FaUsers className="w-4 h-4 text-[#0c2340]" />
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
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f8fafc] hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold cursor-pointer shadow-2xs transition-colors"
                >
                  {getSocialIcon(s.platform)}
                  <span className="capitalize">{s.platform}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
            BOTTOM FOOTER: "Powered by REVAYAH ONE" (EXACT MATCH!)
            ======================================================== */}
      <div className="w-full py-5 px-5 bg-white border-t border-slate-100 text-center mt-auto">
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-700">
          <FaShieldAlt className="w-4 h-4 text-[#c8973b]" />
          <span>
            Powered by <strong className="font-bold text-[#0c2340]">REVAYAH ONE</strong>
          </span>
        </div>

        <div className="flex items-center justify-center gap-3 mt-2">
          <button
            type="button"
            onClick={handleNativeShare}
            className="text-xs font-semibold text-[#0c2340] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <FaShareAlt className="w-3 h-3" />
            <span>Share</span>
          </button>
          <span className="text-slate-300">•</span>
          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="text-xs font-semibold text-[#0c2340] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <FaQrcode className="w-3 h-3" />
            <span>QR Code</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          QR CODE MODAL
          ======================================================== */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
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
              onClick={() => handleCopy(window.location.href, 'qrModal')}
              className="w-full py-2.5 rounded-xl bg-[#0c2340] hover:bg-[#15345c] text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
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

      {/* ========================================================
          FULL-SCREEN PHOTO GALLERY LIGHTBOX MODAL
          ======================================================== */}
      {selectedGalleryIdx !== null && profile.gallery && profile.gallery[selectedGalleryIdx] && (() => {
        const currentItem = profile.gallery[selectedGalleryIdx];
        const currentUrl = currentItem.url || currentItem.image || (typeof currentItem === 'string' ? currentItem : '');
        const totalItems = profile.gallery.length;

        const handlePrev = (e) => {
          e.stopPropagation();
          setSelectedGalleryIdx((selectedGalleryIdx - 1 + totalItems) % totalItems);
        };

        const handleNext = (e) => {
          e.stopPropagation();
          setSelectedGalleryIdx((selectedGalleryIdx + 1) % totalItems);
        };

        return (
          <div
            className="fixed inset-0 z-999999 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-6 select-none animate-fade-in"
            onClick={() => setSelectedGalleryIdx(null)}
          >
            {/* Top Bar: Title, Category, Counter & Actions */}
            <div
              className="flex items-center justify-between text-white z-10 w-full max-w-5xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  {currentItem.category || 'Portfolio'}
                </span>
                <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                  {currentItem.title || `Photo ${selectedGalleryIdx + 1}`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-semibold px-2.5 py-1 rounded-full bg-white/10">
                  {selectedGalleryIdx + 1} / {totalItems}
                </span>

                {currentUrl && (
                  <a
                    href={currentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition-colors"
                    title="Open full resolution in new tab"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" />
                    <span className="hidden sm:inline">Open in New Tab</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedGalleryIdx(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-rose-600/80 text-white transition-colors"
                  title="Close (Esc)"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Stage: High-Resolution Photo + Prev / Next Nav */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden w-full max-w-5xl mx-auto">
              {totalItems > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 md:left-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xl"
                  title="Previous (Left Arrow)"
                >
                  <FaChevronLeft className="w-4 h-4" />
                </button>
              )}

              <img
                src={currentUrl}
                alt={currentItem.title || `Gallery image ${selectedGalleryIdx + 1}`}
                className="max-h-[70vh] md:max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-300 pointer-events-auto cursor-zoom-in"
                onClick={(e) => {
                  e.stopPropagation();
                  if (currentUrl) window.open(currentUrl, '_blank');
                }}
                title="Click to view full size in new tab"
              />

              {totalItems > 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 md:right-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xl"
                  title="Next (Right Arrow)"
                >
                  <FaChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Bottom Bar: Caption & Thumbnails Strip */}
            <div
              className="w-full max-w-3xl mx-auto space-y-3 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {(currentItem.title || currentItem.description) && (
                <div className="text-center px-4">
                  {currentItem.title && (
                    <h3 className="text-sm font-bold text-white tracking-wide">
                      {currentItem.title}
                    </h3>
                  )}
                  {currentItem.description && (
                    <p className="text-xs text-slate-300 mt-0.5 line-clamp-2 max-w-xl mx-auto">
                      {currentItem.description}
                    </p>
                  )}
                </div>
              )}

              {/* Bottom Thumbnail Strip */}
              {totalItems > 1 && (
                <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 px-2 scrollbar-none">
                  {profile.gallery.map((thumbItem, tIdx) => {
                    const thumbUrl = thumbItem.url || thumbItem.image || (typeof thumbItem === 'string' ? thumbItem : '');
                    if (!thumbUrl) return null;
                    const isActive = tIdx === selectedGalleryIdx;

                    return (
                      <button
                        key={tIdx}
                        type="button"
                        onClick={() => setSelectedGalleryIdx(tIdx)}
                        className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${isActive
                          ? 'border-sky-400 scale-105 shadow-md ring-2 ring-sky-400/40'
                          : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white/50'
                          }`}
                      >
                        <img
                          src={thumbUrl}
                          alt={`Thumbnail ${tIdx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })()}

    </div>
  );
};

export default LightCard;
