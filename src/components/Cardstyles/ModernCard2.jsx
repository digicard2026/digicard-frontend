import React, { useState, useEffect, useRef } from 'react';
import {
  FaLinkedin, FaTwitter, FaInstagram, FaEnvelope,
  FaMapMarkerAlt, FaGlobe,
  FaPhoneAlt, FaWhatsapp, FaUser,
  FaBuilding, FaVideo, FaGem, FaStar,
  FaDownload, FaQrcode, FaShieldAlt,
  FaBriefcase, FaCalendarAlt, FaHeadset,
  FaFilePdf, FaRegClock, FaImage, FaSearchPlus,
  FaChevronLeft, FaChevronRight,
  FaUsers, FaCogs, FaCheckCircle,
  FaPaperPlane, FaExternalLinkAlt,
  FaShareAlt, FaCopy, FaCheck, FaTimes,
  FaHome, FaSuitcase, FaFileVideo
} from 'react-icons/fa';
import { FaXTwitter, FaGithub, FaYoutube, FaFacebookF } from "react-icons/fa6";
import { generateVCard } from '../../utility/vcard';
import { CARD_URL } from '../../utility/constants';
import defaultCityBanner from '../../assets/images/city_skyline_banner.png';

// High clarity images
const HD_ARCH_BANNER = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200";

// --- CONFIG: Plan Features Matrix ---
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
        <div className={`relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-[#e2cca4] my-3 ${className}`}>
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
        <div className={`relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-[#e2cca4] my-3 ${className}`}>
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
        <div className={`relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-[#e2cca4] my-3 ${className}`}>
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
      <div className={`flex flex-col items-center justify-center bg-[#f5ecdc] rounded-2xl p-6 text-slate-500 border border-[#e2cca4] my-3 text-center ${className}`}>
        <FaVideo className="w-8 h-8 text-[#c8973b] mb-2" />
        <p className="text-xs font-semibold text-slate-800 mb-1">{title || "Video Stream"}</p>
        <p className="text-[11px] text-slate-500 mb-3">Playback stream unavailable in this viewer mode.</p>
        {cleanUrl && (
          <a
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#c8973b] hover:bg-[#c8973b]/90 text-white rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-95"
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
    <div className={`relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-[#e2cca4] my-3 ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#c8973b] border-t-transparent" />
        </div>
      )}
      <video
        key={cleanUrl}
        src={cleanUrl}
        className="w-full h-full object-contain"
        controls
        playsInline
        preload="metadata"
        poster={poster}
        onError={() => {
          console.warn("Video failed to play:", cleanUrl);
          setError(true);
        }}
        onLoadedData={() => setLoading(false)}
      >
        <source src={cleanUrl} type="video/mp4" />
        <source src={cleanUrl} type="video/webm" />
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

const ModernCard2 = ({ cardData = {}, data = {}, plan = '', isPreview = false, isSnapshot = false, onShare }) => {
  const safeData = Object.keys(cardData).length > 0 ? cardData : data;

  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedItem, setCopiedItem] = useState(null);
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

  // Normalization
  const normalizePlan = (raw) => {
    if (!raw) return 'Personal';
    if (cardFieldsConfig[raw]) return raw;
    const cleaned = String(raw).replace(/[\s\-_]/g, '').toLowerCase();
    for (const key of Object.keys(cardFieldsConfig)) {
      if (key.toLowerCase() === cleaned) return key;
    }
    return 'BusinessPremium';
  };

  const currentPlan = normalizePlan(safeData?.cardType || plan);

  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(null);
  const [galleryCategory, setGalleryCategory] = useState('All');
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

  const isFieldAllowed = (fieldName) => {
    const lk = fieldName.toLowerCase();
    if (lk === 'gallery' && (safeData?.gallery?.length > 0 || safeData?.addons?.gallery || safeData?.addons?.photogallery)) return true;
    if (safeData?.addons) {
      if ((lk === 'catalog' || lk === 'catalogpdf' || lk === 'downloads') &&
        (safeData.addons.docsbuilder || safeData.addons.catalogbuilder || safeData.addons.brochurebuilder || safeData.addons.docsmanager)) return true;
      if ((lk === 'nfcsettings' || lk === 'nfccard') && (safeData.addons.nfccard || safeData.addons.nfc)) return true;
      if ((lk === 'profilevideo' || lk === 'productvideo') && (safeData.addons.profilebuilder || safeData.addons.portfoliobuilder)) return true;
      if (lk === 'testimonials' && safeData.addons.portfoliobuilder) return true;
    }
    const allowed = cardFieldsConfig[currentPlan] || personalAllowed;
    return allowed.includes(fieldName);
  };

  // --- RESILIENT DATA MAPPING ---
  const rawName = `${safeData?.prefix ? safeData.prefix + ' ' : ''}${safeData?.firstName || ''} ${safeData?.lastName || ''}${safeData?.suffix ? ', ' + safeData.suffix : ''}`.trim() || safeData?.name || (safeData?.email ? safeData.email.split('@')[0] : 'Professional Contact');

  const profile = {
    prefix: safeData?.prefix || '',
    firstName: safeData?.firstName || '',
    lastName: safeData?.lastName || '',
    suffix: safeData?.suffix || '',
    name: rawName,
    jobTitle: safeData?.jobTitle || '',
    department: safeData?.department || '',
    companyName: safeData?.companyName || safeData?.organization || '',
    companyLogo: safeData?.companyLogo || null,
    profilePhoto: safeData?.profilePhoto || null,
    tagline: safeData?.tagline || '',
    bio: safeData?.bio || '',
    aboutText: safeData?.aboutText || safeData?.bio || '',
    foundedName: safeData?.foundedName || '',
    organization: safeData?.organization || '',
    serviceArea: safeData?.serviceArea || '',
    serviceAvailability: safeData?.serviceAvailability || '',
    virtualNumber: safeData?.virtualNumber || '',

    phones: Array.isArray(safeData?.phones) && safeData.phones.length > 0
      ? safeData.phones
      : safeData?.phone ? [{ label: 'Work', number: safeData.phone, isPrimary: true }] : [],
    emails: Array.isArray(safeData?.emails) && safeData.emails.length > 0
      ? safeData.emails
      : safeData?.email ? [{ label: 'Work', address: safeData.email, isPrimary: true }] : [],
    websites: Array.isArray(safeData?.websites) && safeData.websites.length > 0
      ? safeData.websites.filter(w => w && (w.url || typeof w === 'string'))
      : safeData?.website ? [{ label: 'Website', url: safeData.website }] : [],
    addresses: Array.isArray(safeData?.addresses) && safeData.addresses.length > 0
      ? safeData.addresses
      : safeData?.address ? [{ street: safeData.address }] : [],
    socialLinks: Array.isArray(safeData?.socialLinks) ? safeData.socialLinks : [],

    servicesProducts: safeData?.servicesProducts || '',
    services: Array.isArray(safeData?.services) ? safeData.services : [],
    products: Array.isArray(safeData?.products) ? safeData.products : [],
    businessHours: Array.isArray(safeData?.businessHours) ? safeData.businessHours : [],
    downloads: [
      ...(safeData?.catalogPDF || safeData?.catalog ? [{
        title: safeData?.catalogTitle || 'Official Business Catalog & Brochure (PDF)',
        url: typeof safeData?.catalogPDF === 'string' ? safeData.catalogPDF : (safeData?.catalogPDF?.url || safeData?.catalog),
        isCatalog: true
      }] : []),
      ...(Array.isArray(safeData?.downloads) ? safeData.downloads : [])
    ],
    profileVideo: safeData?.profileVideo || null,
    productVideo: safeData?.productVideo || null,
    videos: Array.isArray(safeData?.videos) ? safeData.videos : [],

    nfcSettings: safeData?.nfcSettings || { isEnabled: false },
    testimonials: Array.isArray(safeData?.testimonials) ? safeData.testimonials : [],
    clientList: Array.isArray(safeData?.clientList) ? safeData.clientList : [],
    gallery: Array.isArray(safeData?.gallery) ? safeData.gallery : [],

    customerInquiry: safeData?.customerInquiry || { isEnabled: true, title: 'Request Consultation / Inquiry' },
    brandLabel: safeData?.brandLabel || 'REVAYAH ONE',
    bannerPhoto: safeData?.bannerPhoto || safeData?.coverPhoto || null,
    enableOneTapCall: safeData?.enableOneTapCall !== undefined ? safeData.enableOneTapCall : true,
    enableWhatsApp: safeData?.enableWhatsApp !== undefined ? safeData.enableWhatsApp : true,
    enableEmail: safeData?.enableEmail !== undefined ? safeData.enableEmail : true
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

  const primaryPhone = profile.phones.find(p => p.isPrimary)?.number || profile.phones[0]?.number || '';
  const primaryEmail = profile.emails.find(e => e.isPrimary)?.address || profile.emails[0]?.address || safeData?.email || '';
  const primaryAddress = profile.addresses[0]?.street || profile.addresses[0]?.city || (typeof profile.addresses[0] === 'string' ? profile.addresses[0] : '');
  const linkedinLink = profile.socialLinks.find(s => s.platform?.toLowerCase().includes('linkedin'))?.url || '';
  const businessStatus = getBusinessStatus(profile.businessHours);

  // Actions
  const handleCall = (num) => {
    if (!num) return;
    window.location.href = `tel:${num.replace(/[^\d+]/g, '')}`;
  };

  const handleWhatsApp = (num) => {
    if (!num) return;
    const clean = num.replace(/\D/g, '');
    window.open(`https://wa.me/${clean}?text=${encodeURIComponent(`Hi ${profile.name}, I am contacting you via your Reva-Yah One Creative card.`)}`, '_blank');
  };

  const handleEmail = (mail) => {
    if (!mail) return;
    window.location.href = `mailto:${mail}?subject=${encodeURIComponent(`Architecture Inquiry: ${profile.name}`)}`;
  };

  const handleLocation = (addr) => {
    if (!addr) return;
    window.open(`https://maps.google.com/?q=${encodeURIComponent(addr)}`, '_blank');
  };

  const handleCopy = (text, type) => {
    if (!text) return;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedItem(type);
      setTimeout(() => setCopiedItem(null), 2000);
    }
  };

  const handleSaveContact = () => {
    generateVCard(safeData);
  };

  const handleNativeShare = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (onShare) {
      onShare();
      return;
    }

    const isLocal = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
    const origin = isLocal ? "https://www.revayah.one" : (typeof window !== "undefined" ? window.location.origin : "https://www.revayah.one");
    const slug = safeData?.urlSlug || safeData?.shareableUrl || "";
    const shareUrl = slug ? `${origin}/preview/${slug}` : (typeof window !== "undefined" ? window.location.href : "https://www.revayah.one");
    const shareTitle = `${profile.name} | Creative Digital Identity`;
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
    const message = `Hello ${profile.name}!\n\nI would like to request an architectural consultation via your Reva-Yah One card:\n- Service: ${inquiryData.service}\n- Preferred Date: ${inquiryData.date || 'Flexible'}\n- Preferred Time: ${inquiryData.time || 'Flexible'}\n- Customer Contact: ${inquiryData.contact}`;

    setInquiryData(prev => ({ ...prev, submitted: true }));

    if (cleanPhone) {
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
    } else if (primaryEmail) {
      window.location.href = `mailto:${primaryEmail}?subject=${encodeURIComponent(`Consultation Request: ${inquiryData.service}`)}&body=${encodeURIComponent(message)}`;
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

  // Dedicated Snapshot View for WhatsApp / OG Previews
  if (isSnapshot) {
    const rawPhoto = profile.profilePhoto;
    const photoSrc = (rawPhoto && rawPhoto.startsWith('http') && !rawPhoto.includes('unsplash.com'))
      ? `${CARD_URL}/proxy-image?url=${encodeURIComponent(rawPhoto)}`
      : rawPhoto;

    return (
      <div className="w-[380px] max-w-full bg-[#fbf8f2] text-[#2c2013] flex flex-col items-center justify-start p-0 font-sans antialiased overflow-hidden rounded-[28px] border border-[#e2cca4] shadow-xl relative">
        {/* Top Right Botanical Contour Graphic */}
        <div className="absolute top-0 right-0 w-36 h-36 pointer-events-none opacity-50">
          <svg viewBox="0 0 140 140" fill="none" className="w-full h-full">
            <path d="M140 0 C100 20 80 60 70 120 C110 90 130 50 140 0 Z" fill="#e8cca4" />
            <path d="M140 40 C110 60 95 90 90 140 C120 120 135 90 140 40 Z" fill="#ecdab8" opacity="0.8" />
          </svg>
        </div>

        <div className="relative z-10 w-full pt-5 pb-3 px-5 text-left">
          {/* Top Bar: REVAYAH ONE Brand Pill (Left) + Share Button (Right) */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2c2013] border border-[#d8be92]/50 shadow-sm">
              <FaShieldAlt className="w-3.5 h-3.5 text-[#d8be92]" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                REVAYAH ONE
              </span>
            </div>
            <div className="w-8 h-8 rounded-full border border-[#d8be92] bg-[#f5e9d3] flex items-center justify-center text-[#2c2013] shadow-xs">
              <FaShareAlt className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Hero Identity: Avatar on Left, Details on Right */}
          <div className="flex items-center gap-3.5 mb-3">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full p-1 bg-white border-2 border-[#d8be92] shadow-sm overflow-hidden flex items-center justify-center">
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
                  className={`w-full h-full rounded-full bg-[#fcf9f2] flex items-center justify-center text-[#8c6b38]/70 ${photoSrc ? 'hidden' : 'flex'
                    }`}
                >
                  <FaUser className="w-10 h-10 text-[#8c6b38]/70" />
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-[#0c2340] leading-tight">{profile.name}</h1>
              {profile.jobTitle && <p className="text-xs font-bold text-[#0c2340] mt-0.5">{profile.jobTitle}</p>}
              {profile.companyName && <p className="text-[11px] font-semibold text-[#8c6b38]">{profile.companyName}</p>}
              {profile.tagline && (
                <>
                  <div className="w-full h-[1.5px] bg-[#e4cca3] my-1.5" />
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
                <div className="w-10 h-10 rounded-full bg-[#f3e1c3] border border-[#d8be92] text-[#2c2013] flex items-center justify-center shadow-sm">
                  <FaPhoneAlt className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-semibold text-[#0c2340] mt-1">Call</span>
              </div>
            )}
            {primaryPhone && (
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 rounded-full bg-[#f3e1c3] border border-[#d8be92] text-[#2c2013] flex items-center justify-center shadow-sm">
                  <FaWhatsapp className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold text-[#0c2340] mt-1">WhatsApp</span>
              </div>
            )}
            {primaryEmail && (
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 rounded-full bg-[#f3e1c3] border border-[#d8be92] text-[#2c2013] flex items-center justify-center shadow-sm">
                  <FaEnvelope className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-semibold text-[#0c2340] mt-1">Email</span>
              </div>
            )}
            {primaryAddress ? (
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 rounded-full bg-[#f3e1c3] border border-[#d8be92] text-[#2c2013] flex items-center justify-center shadow-sm">
                  <FaMapMarkerAlt className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-semibold text-[#0c2340] mt-1">Location</span>
              </div>
            ) : null}
          </div>

          {/* About Me Section */}
          {profile.aboutText && (
            <div className="my-2.5 p-3 rounded-2xl bg-white border border-[#e2cca4] text-left">
              <div className="flex items-center gap-1.5 mb-1">
                <FaBuilding className="w-3.5 h-3.5 text-[#0c2340]" />
                <span className="text-xs font-bold text-[#0c2340] uppercase tracking-wider">About Me</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {profile.aboutText}
              </p>
            </div>
          )}

          {/* Footer Bar */}
          <div className="mt-3 -mx-5 -mb-3 bg-gradient-to-r from-[#e8cc96] via-[#dfbe7e] to-[#cfa761] py-2 px-4 flex items-center justify-center gap-1.5 text-xs text-[#2c2013]">
            <FaShieldAlt className="w-3.5 h-3.5 text-[#3d2711]" />
            <span>Powered by <strong className="font-bold text-[#2c2013]">{profile.brandLabel || 'REVAYAH ONE'}</strong></span>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // EXACT MAIN CARD LAYOUT (MATCHING CREATIVE CARD ARCHITECTURAL REFERENCE)
  // ========================================================
  return (
    <div className="w-full max-w-md mx-auto bg-[#fbf8f2] text-[#2c2013] flex flex-col relative overflow-hidden min-h-screen font-sans antialiased selection:bg-[#c8973b] selection:text-white">

      {/* Top Right Botanical Contour Graphic (Exact match from screenshot) */}
      <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none opacity-60">
        <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
          <path d="M160 0 C110 30 90 80 80 160 C130 120 150 70 160 0 Z" fill="#e8cca4" />
          <path d="M160 50 C125 75 110 115 105 160 C140 135 155 100 160 50 Z" fill="#ecdab8" opacity="0.85" />
          <path d="M160 100 C140 115 130 140 125 160 C150 145 158 125 160 100 Z" fill="#dfbe7e" opacity="0.6" />
        </svg>
      </div>

      {/* ========================================================
            TOP BAR: REVAYAH ONE BRAND PILL + SHARE BUTTON
            ======================================================== */}
      <div className="relative z-10 w-full px-4 pt-3 pb-1.5">
        <div className="flex items-center justify-between">

          {/* User Requested REVAYAH ONE Brand Pill Logo */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2c2013] border border-[#d8be92]/50 shadow-sm">
            <FaShieldAlt className="w-3.5 h-3.5 text-[#d8be92]" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">
              {profile.brandLabel || 'REVAYAH ONE'}
            </span>
          </div>

          {/* User Requested REVAYAH ONE Brand Pill Logo */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2c2013] border border-[#d8be92]/50 shadow-sm">
            <FaShieldAlt className="w-3.5 h-3.5 text-[#d8be92]" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">
              {profile.brandLabel || 'REVAYAH ONE'}
            </span>
          </div>

          {/* Share Button (Direct Share & Copy Link) */}
          <button
            type="button"
            onClick={handleNativeShare}
            className="w-8 h-8 rounded-full border border-[#d8be92] bg-[#f5e9d3] hover:bg-[#ebd8b7] text-[#2c2013] shadow-xs flex items-center justify-center transition-all active:scale-95 cursor-pointer shrink-0"
            title="Share Card"
          >
            {copiedItem === 'shareUrl' ? (
              <FaCheck className="w-3.5 h-3.5 text-emerald-700" />
            ) : (
              <FaShareAlt className="w-3.5 h-3.5 text-[#2c2013]" />
            )}
          </button>
        </div>
      </div>

      {/* ========================================================
            HERO IDENTITY: AVATAR ON LEFT, NAME & DETAILS ON RIGHT
            ======================================================== */}
      <div className="relative z-10 w-full px-4 py-2">
        <div className="flex items-center gap-4 text-left">

          {/* Left: Avatar with Warm Gold/Sand Border Ring */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-white border-2 border-[#d8be92] shadow-md overflow-hidden flex items-center justify-center">
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
                className={`w-full h-full rounded-full bg-[#fcf9f2] flex items-center justify-center text-[#8c6b38]/70 ${profile.profilePhoto ? 'hidden' : 'flex'
                  }`}
              >
                <FaUser className="w-12 h-12 text-[#8c6b38]/70" />
              </div>
            </div>

            {/* Company Logo Badge if available */}
            {isFieldAllowed('companyLogo') && profile.companyLogo && (
              <div
                className="absolute -top-1 -right-1 w-7 h-7 rounded-lg bg-white border border-[#d8be92] p-0.5 shadow-md flex items-center justify-center"
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
              <p className="text-sm sm:text-base font-bold text-[#0c2340] mt-0.5">
                {profile.jobTitle}
              </p>
            )}

            {isFieldAllowed('companyName') && profile.companyName && (
              <p className="text-xs text-[#8c6b38] font-semibold mt-0.5">
                {profile.companyName}{profile.department ? ` • ${profile.department}` : ''}
              </p>
            )}

            {/* Slogan / Tagline */}
            {profile.tagline && (
              <>
                <div className="w-full h-[1.5px] bg-[#e4cca3] my-2" />
                <p className="text-xs sm:text-sm italic font-medium text-[#0c2340] leading-snug">
                  {profile.tagline}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================
            ACTION BUTTONS: WARM SAND / GOLD PILL BUTTONS
            ======================================================== */}
      <div className="relative z-10 w-full px-5 py-3">
        <div className="flex items-center justify-center gap-3 text-center">

          {/* 1. Call */}
          {profile.enableOneTapCall && primaryPhone && (
            <button
              type="button"
              onClick={() => handleCall(primaryPhone)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none flex-1 max-w-[80px]"
              title="Call"
            >
              <div className="w-12 h-12 rounded-full bg-[#f3e1c3] hover:bg-[#ebd2a8] border border-[#d8be92] text-[#2c2013] flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
                <FaPhoneAlt className="w-4 h-4" />
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
              <div className="w-12 h-12 rounded-full bg-[#f3e1c3] hover:bg-[#ebd2a8] border border-[#d8be92] text-[#2c2013] flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
                <FaWhatsapp className="w-5 h-5" />
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
              <div className="w-12 h-12 rounded-full bg-[#f3e1c3] hover:bg-[#ebd2a8] border border-[#d8be92] text-[#2c2013] flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
                <FaEnvelope className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-[#0c2340] mt-1.5 tracking-tight">Email</span>
            </button>
          )}

          {/* 4. Location / Website / QR */}
          {primaryAddress ? (
            <button
              type="button"
              onClick={() => handleLocation(primaryAddress)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none flex-1 max-w-[80px]"
              title="Location"
            >
              <div className="w-12 h-12 rounded-full bg-[#f3e1c3] hover:bg-[#ebd2a8] border border-[#d8be92] text-[#2c2013] flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
                <FaMapMarkerAlt className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-[#0c2340] mt-1.5 tracking-tight">Location</span>
            </button>
          ) : linkedinLink ? (
            <button
              type="button"
              onClick={() => window.open(linkedinLink, '_blank')}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none flex-1 max-w-[80px]"
              title="LinkedIn"
            >
              <div className="w-12 h-12 rounded-full bg-[#f3e1c3] hover:bg-[#ebd2a8] border border-[#d8be92] text-[#2c2013] flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
                <FaLinkedin className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-[#0c2340] mt-1.5 tracking-tight">LinkedIn</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none flex-1 max-w-[80px]"
              title="QR Code"
            >
              <div className="w-12 h-12 rounded-full bg-[#f3e1c3] hover:bg-[#ebd2a8] border border-[#d8be92] text-[#2c2013] flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
                <FaQrcode className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-[#0c2340] mt-1.5 tracking-tight">QR Code</span>
            </button>
          )}

        </div>
      </div>

      {/* ========================================================
            ABOUT ME / EXECUTIVE SUMMARY
            ======================================================== */}
      {(profile.aboutText || profile.bio) && (
        <div className="relative z-10 w-full px-5 py-3">
          <div className="bg-white rounded-2xl p-4 border border-[#e2cca4] shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <FaBuilding className="w-4 h-4 text-[#0c2340]" />
              <h3 className="text-sm font-bold text-[#0c2340] tracking-tight">
                About Me
              </h3>
            </div>
            {profile.aboutText && (
              <div>
                <p className="text-xs sm:text-[13px] leading-relaxed text-slate-700">
                  {showAboutMore || profile.aboutText.length <= 160
                    ? profile.aboutText
                    : `${profile.aboutText.slice(0, 160)}...`}
                </p>
                {profile.aboutText.length > 160 && (
                  <button
                    type="button"
                    onClick={() => setShowAboutMore(!showAboutMore)}
                    className="mt-1.5 text-[11px] font-semibold text-[#c8973b] hover:text-[#0c2340] inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{showAboutMore ? 'Show Less' : 'Read More'}</span>
                    <FaChevronRight className={`w-2.5 h-2.5 transition-transform ${showAboutMore ? '-rotate-90' : 'rotate-90'}`} />
                  </button>
                )}
              </div>
            )}
            {profile.bio && profile.bio !== profile.aboutText && (
              <div className={profile.aboutText ? 'pt-2 border-t border-[#e2cca4]/40 mt-2' : ''}>
                <p className="text-xs sm:text-[13px] leading-relaxed text-slate-500">
                  {showAboutMore || profile.bio.length <= 140
                    ? profile.bio
                    : `${profile.bio.slice(0, 140)}...`}
                </p>
                {!profile.aboutText && profile.bio.length > 140 && (
                  <button
                    type="button"
                    onClick={() => setShowAboutMore(!showAboutMore)}
                    className="mt-1.5 text-[11px] font-semibold text-[#c8973b] hover:text-[#0c2340] inline-flex items-center gap-1 transition-colors cursor-pointer"
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

      {/* Optional User Banner Photo */}
      {(cardData?.bannerPhoto || cardData?.coverPhoto) && (
        <div className="relative z-10 w-full px-5 py-2">
          <div className="w-full aspect-[2.4/1] rounded-2xl overflow-hidden shadow-sm border border-[#e2cca4] relative">
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
      <div className="relative z-10 w-full px-5 pt-3 pb-2">
        <button
          type="button"
          onClick={handleSaveContact}
          className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-[#e8cc96] via-[#dfbe7e] to-[#cfa761] hover:opacity-95 text-[#2c2013] font-bold text-sm tracking-wide shadow-md transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
        >
          <FaDownload className="w-4 h-4 text-[#2c2013]" />
          <span>Save Contact to Phone</span>
        </button>
      </div>

      {/* ========================================================
            SERVICES SHOWCASE (Comprehensive Grid in Creative Theme)
            ======================================================== */}
      {((isFieldAllowed('services') && profile.services && profile.services.length > 0) || (isFieldAllowed('servicesProducts') && profile.servicesProducts)) && (
        <div className="relative z-10 w-full px-5 py-4 border-t border-[#e2cca4] mt-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
              <FaCogs className="w-4 h-4 text-[#c8973b]" />
              <span>Products & Services</span>
            </h2>
            {profile.services.length > 0 && (
              <span className="text-[11px] text-[#c8973b] font-semibold">
                {profile.services.length} available
              </span>
            )}
          </div>

          {/* High-level summary */}
          {profile.servicesProducts && (
            <div className="p-3.5 mb-3 rounded-2xl bg-[#faf4e8] border border-[#e2cca4] text-xs text-slate-800">
              <span className="text-[10px] uppercase font-bold text-[#c8973b] tracking-wider block mb-1">
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
                  className="mt-1 text-[11px] font-semibold text-[#c8973b] hover:text-[#0c2340] inline-flex items-center gap-1 transition-colors cursor-pointer"
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
                {(showAllServices ? profile.services : profile.services.slice(0, 4)).map((service, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white border border-[#e2cca4] hover:bg-[#faf4e8] transition-all shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#c8973b]" />
                          <h4 className="text-xs font-bold text-[#0c2340]">{service.name || service.title}</h4>
                        </div>
                        {service.price && (
                          <span className="text-[11px] font-bold text-[#c8973b] shrink-0">
                            {service.currency || '₹'}{service.price}
                          </span>
                        )}
                      </div>
                      {service.category && (
                        <span className="text-[9.5px] uppercase font-medium text-slate-400 block pl-4 mb-1">
                          {service.category}
                        </span>
                      )}
                      {service.description && (
                        <p className="text-[11px] text-slate-700 leading-relaxed pl-4 line-clamp-2">
                          {service.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between pl-4">
                      <span className="text-[10px] text-slate-400">Direct Advisory</span>
                      <button
                        type="button"
                        onClick={() => {
                          setInquiryData(prev => ({ ...prev, service: service.name || service.title }));
                        }}
                        className="text-[11px] font-semibold text-[#c8973b] hover:text-[#0c2340] flex items-center gap-1 cursor-pointer"
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
                    className="px-4 py-1.5 rounded-full bg-[#faf4e8] border border-[#e2cca4] text-[#c8973b] hover:text-[#0c2340] text-[11px] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
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
            PRODUCTS & SOLUTIONS (Creative Theme)
            ======================================================== */}
      {isFieldAllowed('products') && profile.products && profile.products.length > 0 && (
        <div className="relative z-10 w-full px-5 py-4 border-t border-[#e2cca4]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
              <FaGem className="w-4 h-4 text-[#c8973b]" />
              <span>Products & Solutions</span>
            </h2>
            <span className="text-[11px] text-[#c8973b] font-semibold">
              {profile.products.length} items
            </span>
          </div>

          <div className="space-y-2.5">
            {(showAllProducts ? profile.products : profile.products.slice(0, 3)).map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white border border-[#e2cca4] flex items-start gap-3 hover:bg-[#faf4e8] transition-all shadow-xs">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-[#e2cca4] shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-[#0c2340] text-xs truncate">{item.name}</h4>
                    {item.price && (
                      <span className="text-xs font-bold text-[#c8973b] shrink-0">{item.currency || '₹'} {item.price}</span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
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
                className="px-4 py-1.5 rounded-full bg-[#faf4e8] border border-[#e2cca4] text-[#c8973b] hover:text-[#0c2340] text-[11px] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{showAllProducts ? 'Show Less' : `View All ${profile.products.length} Products`}</span>
                <FaChevronRight className={`w-2 h-2 transition-transform ${showAllProducts ? '-rotate-90' : 'rotate-90'}`} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
            WEBSITES & DIGITAL PORTFOLIOS (Creative Theme)
            ======================================================== */}
      {profile.websites && profile.websites.length > 0 && (
        <div className="relative z-10 w-full px-5 py-4 border-t border-[#e2cca4]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
              <FaGlobe className="w-4 h-4 text-[#c8973b]" />
              <span>Websites & Portfolios</span>
            </h2>
            <span className="text-[11px] text-[#c8973b] font-semibold">
              {profile.websites.length} links
            </span>
          </div>

          <div className="space-y-2">
            {profile.websites.map((site, idx) => {
              const url = typeof site === 'string' ? site : (site?.url || '');
              if (!url) return null;
              const label = (typeof site === 'object' && site?.label) ? site.label : 'Website / Portfolio';
              const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
              return (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e2cca4] hover:bg-[#faf4e8] transition-colors">
                  <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
                    <div className="w-8 h-8 rounded-full bg-[#fbf8f2] border border-[#e2cca4] text-[#c8973b] flex items-center justify-center shrink-0">
                      <FaGlobe className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] uppercase font-bold text-[#c8973b] tracking-wider block">
                        {label}
                      </span>
                      <p className="text-xs font-semibold text-[#0c2340] truncate">{displayUrl}</p>
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
                      className="p-1.5 rounded-lg text-[#c8973b] hover:bg-[#faf4e8] transition-colors cursor-pointer"
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
            DIRECT CONSULTATION / INQUIRY BOOKING FUNNEL
            ======================================================== */}
      {isFieldAllowed('customerInquiry') && profile.customerInquiry?.isEnabled !== false && (
        <div className="relative z-10 w-full px-5 py-4 border-t border-[#e2cca4]">
          <div className="p-4 rounded-2xl bg-white border border-[#d8be92] shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FaCalendarAlt className="w-4 h-4 text-[#c8973b]" />
              <h3 className="text-sm font-bold text-[#0c2340]">
                {profile.customerInquiry?.title || 'Book an Architecture Consultation'}
              </h3>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Select your service requirement and schedule directly with {profile.name}.
            </p>

            <div className="space-y-2.5">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 mb-1 block">
                  Service Required *
                </label>
                <select
                  value={inquiryData.service}
                  onChange={(e) => setInquiryData({ ...inquiryData, service: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl bg-[#fbf8f2] border border-[#d8be92] text-[#0c2340] focus:outline-none focus:border-[#c8973b] cursor-pointer"
                >
                  <option value="" className="bg-white text-slate-700">Select an architectural service...</option>
                  {profile.services.map((s, idx) => (
                    <option key={idx} value={s.title} className="bg-white text-[#0c2340]">
                      {s.title}
                    </option>
                  ))}
                  <option value="General Architecture Consultation" className="bg-white text-[#0c2340]">General Architecture Consultation</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 mb-1 block">Preferred Date</label>
                  <input
                    type="date"
                    value={inquiryData.date}
                    onChange={(e) => setInquiryData({ ...inquiryData, date: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl bg-[#fbf8f2] border border-[#d8be92] text-[#0c2340] focus:outline-none focus:border-[#c8973b]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 mb-1 block">Preferred Time</label>
                  <input
                    type="time"
                    value={inquiryData.time}
                    onChange={(e) => setInquiryData({ ...inquiryData, time: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl bg-[#fbf8f2] border border-[#d8be92] text-[#0c2340] focus:outline-none focus:border-[#c8973b]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 mb-1 block">
                  Your Contact (Phone or Email) *
                </label>
                <input
                  type="text"
                  placeholder="+91 98765 43210 or name@example.com"
                  value={inquiryData.contact}
                  onChange={(e) => setInquiryData({ ...inquiryData, contact: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl bg-[#fbf8f2] border border-[#d8be92] text-[#0c2340] placeholder-slate-400 focus:outline-none focus:border-[#c8973b]"
                />
              </div>

              <button
                type="button"
                onClick={handleSendInquiry}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#e8cc96] to-[#dfbe7e] hover:opacity-95 text-[#2c2013] font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer mt-1"
              >
                <FaPaperPlane className="w-3.5 h-3.5" />
                <span>Send Consultation Request</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
            PROFILE VIDEO PLAYER (IF CONFIGURED)
            ======================================================== */}
      {isFieldAllowed('profileVideo') && profile.profileVideo && (
        <div className="relative z-10 w-full px-5 py-4 border-t border-[#e2cca4]">
          <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2 mb-2">
            <FaVideo className="w-4 h-4 text-[#c8973b]" />
            <span>Introduction Video</span>
          </h2>
          <VideoPlayer src={profile.profileVideo} title={`${profile.name} - Introduction`} />
        </div>
      )}

      {/* ========================================================
            BUSINESS HOURS (IF CONFIGURED)
            ======================================================== */}
      {isFieldAllowed('businessHours') && profile.businessHours && profile.businessHours.length > 0 && (
        <div className="relative z-10 w-full px-5 py-4 border-t border-[#e2cca4]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
              <FaRegClock className="w-4 h-4 text-[#c8973b]" />
              <span>Studio Hours</span>
            </h2>
            {businessStatus && (
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${businessStatus.isOpen
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-rose-100 text-rose-800 border border-rose-300'
                }`}>
                {businessStatus.text}
              </span>
            )}
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#e2cca4] space-y-1.5">
            {profile.businessHours.map((slot, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-0">
                <span className="font-semibold text-slate-700 capitalize">{slot.day}</span>
                <span className="text-slate-500">
                  {slot.isClosed ? (
                    <span className="text-rose-600 font-semibold">Closed</span>
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
            CONTACT DIRECTORY: ADDRESSES, PHONES, EMAILS, SOCIAL
            ======================================================== */}
      <div className="relative z-10 w-full px-5 py-4 border-t border-[#e2cca4] space-y-3">
        <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
          <FaHeadset className="w-4 h-4 text-[#c8973b]" />
          <span>Studio Directory</span>
        </h2>

        <div className="space-y-2">
          {/* Virtual Business Line */}
          {isFieldAllowed('virtualNumber') && profile.virtualNumber && (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#e2cca4] shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#fbf8f2] border border-[#e2cca4] text-[#c8973b] flex items-center justify-center shrink-0">
                  <FaHeadset className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[#c8973b] font-bold uppercase tracking-wider block">Virtual Line</span>
                  <span className="text-xs text-[#0c2340] font-semibold">{profile.virtualNumber}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleCopy(profile.virtualNumber, 'virtual-number')}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  title="Copy Number"
                >
                  {copiedItem === 'virtual-number' ? <FaCheck className="w-3.5 h-3.5 text-emerald-500" /> : <FaCopy className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => handleCall(profile.virtualNumber)}
                  className="p-2 rounded-xl text-[#c8973b] hover:bg-[#faf4e8] transition-colors cursor-pointer"
                  title="Call"
                >
                  <FaExternalLinkAlt className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Phones */}
          {profile.phones.map((p, idx) => (
            <div
              key={idx}
              onClick={() => handleCall(p.number)}
              className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#e2cca4] hover:bg-[#faf4e8] cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f3e1c3] border border-[#d8be92] text-[#2c2013] flex items-center justify-center">
                  <FaPhoneAlt className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0c2340]">{p.number}</p>
                  <p className="text-[10px] text-slate-500 capitalize">{p.label || 'Direct Phone'}</p>
                </div>
              </div>
              <FaExternalLinkAlt className="w-3 h-3 text-slate-400" />
            </div>
          ))}

          {/* Emails */}
          {profile.emails.map((e, idx) => (
            <div
              key={idx}
              onClick={() => handleEmail(e.address)}
              className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#e2cca4] hover:bg-[#faf4e8] cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f3e1c3] border border-[#d8be92] text-[#2c2013] flex items-center justify-center">
                  <FaEnvelope className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#0c2340] truncate">{e.address}</p>
                  <p className="text-[10px] text-slate-500 capitalize">{e.label || 'Email Address'}</p>
                </div>
              </div>
              <FaExternalLinkAlt className="w-3 h-3 text-slate-400 shrink-0" />
            </div>
          ))}

          {/* Addresses */}
          {profile.addresses && profile.addresses.map((addr, idx) => (
            <div
              key={idx}
              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(`${addr.street || ''} ${addr.city || ''} ${addr.state || ''}`)}`, '_blank')}
              className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#e2cca4] hover:bg-[#faf4e8] cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f3e1c3] border border-[#d8be92] text-[#2c2013] flex items-center justify-center">
                  <FaMapMarkerAlt className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0c2340]">
                    {[addr.street, addr.city, addr.state, addr.country].filter(Boolean).join(', ') || 'Studio Location'}
                  </p>
                  <p className="text-[10px] text-slate-500 capitalize">{addr.label || 'Address'}</p>
                </div>
              </div>
              <FaExternalLinkAlt className="w-3 h-3 text-slate-400" />
            </div>
          ))}
        </div>

        {/* Social Links Icons */}
        {profile.socialLinks && profile.socialLinks.length > 0 && (
          <div className="pt-2">
            <p className="text-[11px] font-semibold text-slate-600 mb-2">Connect Across Networks</p>
            <div className="flex flex-wrap gap-2">
              {profile.socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-[#d8be92] flex items-center justify-center text-[#0c2340] hover:bg-[#f3e1c3] transition-all shadow-xs"
                  title={s.platform}
                >
                  {getSocialIcon(s.platform)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
            PHOTO GALLERY & SHOWCASE (IF AVAILABLE)
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

        const categories = ['All', ...new Set(validGallery.map(i => i.category).filter(Boolean))];
        const displayedItems = galleryCategory === 'All'
          ? validGallery
          : validGallery.filter(i => i.category === galleryCategory);

        return (
          <div className="relative z-10 w-full px-5 py-4 border-t border-[#e2cca4]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
                <FaImage className="w-4 h-4 text-[#cfa761]" />
                <span>Photo Gallery & Showcase</span>
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f3e1c3] text-[#2c2013] border border-[#d8be92]">
                {validGallery.length} {validGallery.length === 1 ? 'Photo' : 'Photos'}
              </span>
            </div>

            {/* Category tabs */}
            {categories.length > 2 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setGalleryCategory(cat)}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${galleryCategory === cat
                      ? 'bg-[#0c2340] text-[#dfbe7e] shadow-xs'
                      : 'bg-white hover:bg-[#faf4e8] text-slate-700 border border-[#e2cca4]'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Single Row Photo Gallery Strip with Left/Right Arrow Buttons */}
            <div className="relative group/gallery w-full">
              {displayedItems.length > 3 && (
                <button
                  type="button"
                  onClick={() => scrollGallery('left')}
                  className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#f5e9d3] hover:bg-[#ebd8b7] text-[#2c2013] shadow-md border border-[#d8be92] flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  title="Previous Photos"
                >
                  <FaChevronLeft className="w-3.5 h-3.5 text-[#2c2013]" />
                </button>
              )}

              <div
                ref={galleryScrollRef}
                className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth w-full py-1 px-0.5"
              >
                {displayedItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedGalleryIdx(item.idx)}
                    className={`shrink-0 aspect-square group relative rounded-2xl overflow-hidden bg-white border border-[#e2cca4] shadow-xs hover:shadow-md transition-all cursor-pointer ${
                      displayedItems.length === 1
                        ? 'w-full aspect-[16/9]'
                        : displayedItems.length === 2
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
                      <span className="w-8 h-8 rounded-full bg-white text-[#0c2340] shadow-md flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-200">
                        <FaSearchPlus className="w-3.5 h-3.5 text-[#0c2340]" />
                      </span>
                    </div>

                    {item.title && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2 text-white pointer-events-none">
                        <p className="text-[11px] font-semibold truncate leading-tight text-[#2c2013]">
                          {item.title}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {displayedItems.length > 3 && (
                <button
                  type="button"
                  onClick={() => scrollGallery('right')}
                  className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#f5e9d3] hover:bg-[#ebd8b7] text-[#2c2013] shadow-md border border-[#d8be92] flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  title="Next Photos"
                >
                  <FaChevronRight className="w-3.5 h-3.5 text-[#2c2013]" />
                </button>
              )}
            </div>
          </div>
        );
      })()}

      {/* ========================================================
            DOWNLOADS & BROCHURES (IF AVAILABLE)
            ======================================================== */}
      {isFieldAllowed('downloads') && profile.downloads && profile.downloads.length > 0 && (
        <div className="relative z-10 w-full px-5 py-4 border-t border-[#e2cca4]">
          <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2 mb-3">
            <FaFilePdf className="w-4 h-4 text-rose-500" />
            <span>Portfolios & Drawings</span>
          </h2>

          <div className="space-y-2">
            {profile.downloads.map((doc, idx) => (
              <a
                key={idx}
                href={doc.url || doc.fileUrl}
                target="_blank"
                rel="noreferrer"
                download
                className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#e2cca4] hover:bg-[#faf4e8] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <FaFilePdf className="w-4 h-4 text-rose-500" />
                  <span className="text-xs text-[#0c2340] font-semibold">{doc.title || doc.name || `Document #${idx + 1}`}</span>
                </div>
                <FaDownload className="w-3 h-3 text-slate-400" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
            CLIENT LIST & PARTNERS (Creative Theme)
            ======================================================== */}
      {isFieldAllowed('clientList') && profile.clientList && profile.clientList.length > 0 && (
        <div className="relative z-10 w-full px-5 py-4 border-t border-[#e2cca4]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
              <FaBuilding className="w-4 h-4 text-[#c8973b]" />
              <span>Clients & Partners</span>
            </h2>
            <span className="text-[11px] text-[#c8973b] font-semibold">
              {profile.clientList.length} partners
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.clientList.map((client, idx) => {
              const clientName = typeof client === 'string' ? client : (client?.name || client?.company || '');
              if (!clientName) return null;
              return (
                <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#e2cca4] text-[#0c2340] text-xs font-semibold shadow-2xs">
                  <FaCheckCircle className="w-3 h-3 text-[#c8973b]" />
                  <span>{clientName}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
            CLIENT TESTIMONIALS & ENDORSEMENTS (Creative Theme)
            ======================================================== */}
      {isFieldAllowed('testimonials') && profile.testimonials && profile.testimonials.length > 0 && (
        <div className="relative z-10 w-full px-5 py-4 border-t border-[#e2cca4]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
              <FaStar className="w-4 h-4 text-[#c8973b]" />
              <span>Client Testimonials</span>
            </h2>
            <span className="text-[11px] text-[#c8973b] font-semibold">
              {profile.testimonials.length} reviews
            </span>
          </div>

          <div className="space-y-3">
            {profile.testimonials.map((test, idx) => {
              const quote = test.testimonial || test.quote || test.text || '';
              if (!quote && !test.clientName) return null;
              const rating = test.rating || 5;
              return (
                <div key={idx} className="p-3.5 rounded-2xl bg-white border border-[#e2cca4] space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(rating)].map((_, i) => (
                        <FaStar key={i} className="w-3 h-3 text-[#c8973b]" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#faf4e8] text-[#c8973b] border border-[#e2cca4]">
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
            FEATURED VIDEO SHOWCASE (Creative Theme)
            ======================================================== */}
      {isFieldAllowed('videos') && profile.videos && profile.videos.length > 0 && (
        <div className="relative z-10 w-full px-5 py-4 border-t border-[#e2cca4]">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
              <FaFileVideo className="w-4 h-4 text-[#c8973b]" />
              <span>Featured Video Showcase</span>
            </h2>
            <span className="text-[11px] text-[#c8973b] font-semibold">
              {profile.videos.length} videos
            </span>
          </div>

          <div className="space-y-3">
            {profile.videos.map((vid, idx) => {
              const vidUrl = typeof vid === 'string' ? vid : (vid?.url || '');
              if (!vidUrl) return null;
              return (
                <div key={idx} className="bg-white rounded-2xl p-3 border border-[#e2cca4] shadow-xs">
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

      {/* ========================================================
            BOTTOM FOOTER: WARM GOLD BAR (EXACT SCREENSHOT FEATURE!)
            ======================================================== */}
      <div className="relative z-10 w-full py-5 px-5 bg-gradient-to-r from-[#e8cc96] via-[#dfbe7e] to-[#cfa761] border-t border-[#d8be92] text-center mt-auto text-[#2c2013]">
        <div className="flex items-center justify-center gap-1.5 text-xs">
          <FaShieldAlt className="w-4 h-4 text-[#3d2711]" />
          <span>
            Powered by <strong className="font-bold text-[#2c2013]">REVAYAH ONE</strong>
          </span>
        </div>

        <div className="flex items-center justify-center gap-3 mt-2 text-xs font-bold text-[#2c2013]">
          <button
            type="button"
            onClick={handleNativeShare}
            className="hover:underline flex items-center gap-1 cursor-pointer"
          >
            <FaShareAlt className="w-3 h-3" />
            <span>Share</span>
          </button>
          <span className="opacity-40">•</span>
          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="hover:underline flex items-center gap-1 cursor-pointer"
          >
            <FaQrcode className="w-3 h-3" />
            <span>QR Code</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          QR CODE MODAL (WARM CHAMPAGNE THEME)
          ======================================================== */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fbf8f2] border border-[#d8be92] rounded-3xl p-6 max-w-xs w-full shadow-2xl text-center relative text-[#2c2013]">
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-[#0c2340] cursor-pointer"
            >
              <FaTimes className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-[#f3e1c3] border border-[#d8be92] text-[#2c2013] flex items-center justify-center mx-auto mb-3">
              <FaQrcode className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0c2340] mb-1">Scan & Connect</h3>
            <p className="text-xs text-slate-600 mb-4">
              Point your camera to instantly view and save {profile.name}'s creative digital card.
            </p>
            <div className="bg-white p-3 rounded-2xl inline-block mb-4 shadow-sm border border-[#e2cca4]">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "https://www.revayah.one")}`}
                alt="QR Code"
                className="w-44 h-44 object-contain rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={() => handleCopy(window.location.href, 'qrModal')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#e8cc96] to-[#dfbe7e] hover:opacity-95 text-[#2c2013] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              {copiedItem === 'qrModal' ? (
                <>
                  <FaCheck className="w-3.5 h-3.5 text-emerald-800" />
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

      {/* Full-Screen Photo Showcase Lightbox Modal */}
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
            {/* Top Bar */}
            <div
              className="flex items-center justify-between text-white z-10 w-full max-w-5xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#dfbe7e]/20 text-[#dfbe7e] border border-[#dfbe7e]/30">
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

                <button
                  type="button"
                  onClick={() => setSelectedGalleryIdx(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-rose-600/80 text-white transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Stage */}
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
                className="max-h-[70vh] md:max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-300 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
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

            {/* Bottom Bar: Title, Description & Thumbnails */}
            <div
              className="w-full max-w-2xl mx-auto space-y-2 z-10 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {currentItem.title && (
                <h4 className="text-sm font-bold text-white tracking-wide">
                  {currentItem.title}
                </h4>
              )}
              {currentItem.description && (
                <p className="text-xs text-slate-300 max-w-lg mx-auto line-clamp-2">
                  {currentItem.description}
                </p>
              )}

              {/* Thumbnail Strip */}
              {totalItems > 1 && (
                <div className="flex items-center justify-center gap-2 pt-1 overflow-x-auto max-w-full py-1 scrollbar-none">
                  {profile.gallery.map((thumbItem, tIdx) => {
                    const thumbUrl = thumbItem.url || thumbItem.image || (typeof thumbItem === 'string' ? thumbItem : '');
                    if (!thumbUrl) return null;
                    const isActive = tIdx === selectedGalleryIdx;
                    return (
                      <button
                        key={tIdx}
                        type="button"
                        onClick={() => setSelectedGalleryIdx(tIdx)}
                        className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${isActive
                          ? 'border-[#dfbe7e] scale-105 opacity-100 shadow-md ring-2 ring-[#dfbe7e]/40'
                          : 'border-transparent opacity-50 hover:opacity-80'
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

export default ModernCard2;
