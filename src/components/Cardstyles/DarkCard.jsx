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
  FaSuitcase, FaFileVideo
} from 'react-icons/fa';
import { FaXTwitter, FaGithub, FaYoutube, FaFacebookF } from "react-icons/fa6";
import { generateVCard } from '../../utility/vcard';
import { CARD_URL } from '../../utility/constants';
import defaultCityBanner from '../../assets/images/city_skyline_banner.png';

// High clarity images
const HD_CITY_BANNER = "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=1200";

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
        <div className={`relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-teal-500/20 my-3 ${className}`}>
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
        <div className={`relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-teal-500/20 my-3 ${className}`}>
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
        <div className={`relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-teal-500/20 my-3 ${className}`}>
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
      <div className={`flex flex-col items-center justify-center bg-[#001f35] rounded-2xl p-6 text-slate-400 border border-teal-500/20 my-3 text-center ${className}`}>
        <FaVideo className="w-8 h-8 text-teal-400/60 mb-2" />
        <p className="text-xs font-semibold text-slate-200 mb-1">{title || "Video Stream"}</p>
        <p className="text-[11px] text-slate-400 mb-3">Playback stream unavailable in this viewer mode.</p>
        {cleanUrl && (
          <a
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#38c1c4] hover:bg-[#38c1c4]/90 text-slate-950 rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-95"
          >
            <span>Watch Video Directly</span>
            <FaExternalLinkAlt className="w-3 h-3" />
          </a>
        )}
      </div>
    );
  }

  // 5. Direct Video file (MP4, WebM, Azure Blob URL, Base64)
  return (
    <div className={`relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-teal-500/20 my-3 ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#38c1c4] border-t-transparent" />
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

const DarkCard = ({ cardData = {}, plan = 'BusinessPremium', isPreview = false, isSnapshot = false, onShare }) => {
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

  const currentPlan = normalizePlan(cardData?.cardType || plan);

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
  const primaryEmail = profile.emails.find(e => e.isPrimary)?.address || profile.emails[0]?.address || cardData?.email || '';
  const portfolioLink = profile.websites[0]?.url || (typeof profile.websites[0] === 'string' ? profile.websites[0] : '');
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
    window.open(`https://wa.me/${clean}?text=${encodeURIComponent(`Hi ${profile.name}, I am contacting you via your Reva-Yah One card.`)}`, '_blank');
  };

  const handleEmail = (mail) => {
    if (!mail) return;
    window.location.href = `mailto:${mail}?subject=${encodeURIComponent(`Connecting from Reva-Yah One: ${profile.name}`)}`;
  };

  const handlePortfolio = (url) => {
    if (!url) return;
    window.open(url.startsWith('http') ? url : `https://${url}`, '_blank');
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
      <div className="dark-card-root w-[380px] max-w-full bg-[#001428] text-white flex flex-col items-center justify-start p-0 font-sans antialiased overflow-hidden rounded-[28px] border border-teal-500/20 shadow-2xl relative">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Playfair+Display:ital,wght@1,500;1,600;1,700&display=swap');
          .dark-card-root { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          .dark-card-tagline { font-family: 'Playfair Display', Georgia, serif; font-style: italic; }
        `}</style>

        {/* Ambient Teal/Cyan and Emerald Curves */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 380 700" fill="none" preserveAspectRatio="none">
            <path d="M 380 40 Q 240 120 180 260 T 380 500 Z" fill="#075b73" opacity="0.45" />
            <path d="M 380 260 Q 180 420 220 620 T 380 700 Z" fill="#008770" opacity="0.35" />
          </svg>
        </div>

        <div className="relative z-10 w-full pt-5 pb-4 px-5 text-left">
          {/* Top Bar: REVAYAH ONE Brand Pill (Left) + Share Button (Right) */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#002f4a] border border-teal-400/40 shadow-sm">
              <FaShieldAlt className="w-3.5 h-3.5 text-teal-300" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                REVAYAH ONE
              </span>
            </div>
            <div className="w-8 h-8 rounded-full border border-teal-400/40 bg-[#002f4a]/80 flex items-center justify-center text-teal-200 shadow-sm">
              <FaShareAlt className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Hero Identity: Avatar on Left with Glowing Rim, Text on Right */}
          <div className="flex items-center gap-3.5 mb-4">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-[#38c1c4] via-[#d6d7db] to-[#38b556] shadow-[0_0_18px_rgba(56,193,196,0.45)] overflow-hidden flex items-center justify-center">
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
                  className={`w-full h-full rounded-full bg-[#002f4a] flex items-center justify-center text-teal-300/80 ${photoSrc ? 'hidden' : 'flex'
                    }`}
                >
                  <FaUser className="w-10 h-10 text-teal-300/80 drop-shadow-sm" />
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-white leading-tight tracking-tight">{profile.name}</h1>
              {profile.jobTitle && <p className="text-xs font-semibold text-slate-200 mt-0.5">{profile.jobTitle}</p>}
              {profile.companyName && <p className="text-[11px] font-semibold text-slate-300">{profile.companyName}</p>}
              {profile.tagline && (
                <>
                  <div className="w-full h-[1px] bg-teal-500/25 my-1.5" />
                  <p className="dark-card-tagline text-[12px] text-slate-300 font-medium leading-snug">
                    {profile.tagline}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Neon Glowing Action Buttons */}
          <div className="flex items-center justify-center gap-2 text-center my-3">
            {primaryPhone && (
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 rounded-full bg-[#031d33] border-2 border-[#38b556] text-white flex items-center justify-center shadow-[0_0_12px_rgba(56,181,86,0.6)]">
                  <FaPhoneAlt className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[10px] font-semibold text-white mt-1">Call</span>
              </div>
            )}
            {primaryPhone && (
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 rounded-full bg-[#031d33] border-2 border-[#32a852] text-white flex items-center justify-center shadow-[0_0_12px_rgba(50,168,82,0.6)]">
                  <FaWhatsapp className="w-4 h-4 text-white" />
                </div>
                <span className="text-[10px] font-semibold text-white mt-1">WhatsApp</span>
              </div>
            )}
            {primaryEmail && (
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 rounded-full bg-[#031d33] border-2 border-[#38c1c4] text-white flex items-center justify-center shadow-[0_0_12px_rgba(56,193,196,0.6)]">
                  <FaEnvelope className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[10px] font-semibold text-white mt-1">Email</span>
              </div>
            )}
            {portfolioLink ? (
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 rounded-full bg-[#031d33] border-2 border-[#38b5ca] text-white flex items-center justify-center shadow-[0_0_12px_rgba(56,181,202,0.6)]">
                  <FaBriefcase className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[10px] font-semibold text-white mt-1">Portfolio</span>
              </div>
            ) : null}
          </div>

          {/* About Me if available */}
          {profile.aboutText && (
            <div className="my-3 p-3.5 rounded-2xl bg-[#001e35]/80 border border-teal-500/25 backdrop-blur-md">
              <div className="flex items-center gap-1.5 mb-1.5">
                <FaBriefcase className="w-3.5 h-3.5 text-teal-300" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">About Me</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {profile.aboutText}
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="pt-2 pb-1 flex items-center justify-center gap-1.5 text-xs text-slate-300">
            <FaShieldAlt className="w-3.5 h-3.5 text-teal-300" />
            <span>Powered by <strong className="font-bold text-white">{profile.brandLabel || 'REVAYAH ONE'}</strong></span>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // EXACT MAIN CARD LAYOUT (MATCHING DARK THEME REFERENCE IMAGE)
  // ========================================================
  return (
    <div className="dark-card-root w-full max-w-md mx-auto bg-[#00162b] text-white flex flex-col relative overflow-hidden min-h-screen antialiased selection:bg-[#38c1c4] selection:text-[#001428]">

      {/* Dynamic Font Styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Playfair+Display:ital,wght@1,500;1,600;1,700&display=swap');
        .dark-card-root {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .dark-card-tagline {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
        }
      `}</style>

      {/* Ambient Teal/Cyan and Emerald Curves (Matching exact sample colors) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial ambient highlights */}
        <div className="absolute top-1/4 right-0 w-80 h-96 bg-[#008770]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#053b5d]/35 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-12 right-0 w-80 h-80 bg-[#00b894]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Organic Wave Graphic (Flowing Teal/Emerald Ribbons) */}
        <svg className="w-full h-full" viewBox="0 0 400 900" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveDeepNavy" x1="1" y1="0" x2="0.2" y2="1">
              <stop offset="0%" stopColor="#075b73" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#024f63" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#001832" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="waveEmeraldGlow" x1="1" y1="0.3" x2="0.1" y2="1">
              <stop offset="0%" stopColor="#00b894" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#008770" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#001428" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="waveStrokeTop" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38c1c4" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#38b556" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#001832" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Top right wave flowing down */}
          <path d="M 400 40 Q 250 120 190 270 T 400 520 Z" fill="url(#waveDeepNavy)" />
          <path d="M 400 40 Q 250 120 190 270 T 400 520" stroke="url(#waveStrokeTop)" strokeWidth="1.5" opacity="0.6" />

          {/* Bottom right wave flowing up */}
          <path d="M 400 280 Q 190 440 240 660 T 400 870 Z" fill="url(#waveEmeraldGlow)" />
          <path d="M 400 280 Q 190 440 240 660 T 400 870" stroke="#00e699" strokeWidth="1.2" opacity="0.4" />
        </svg>
      </div>

      {/* ========================================================
            TOP BAR: REVAYAH ONE BRAND PILL + SHARE BUTTON
            ======================================================== */}
      <div className="relative z-10 w-full px-5 pt-4 pb-2">
        <div className="flex items-center justify-between">

          {/* User Requested REVAYAH ONE Brand Pill Logo */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#002f4a] border border-teal-400/40 shadow-sm">
            <FaShieldAlt className="w-3.5 h-3.5 text-teal-300" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">
              {profile.brandLabel || 'REVAYAH ONE'}
            </span>
          </div>

          {/* Share Button (Direct Share & Copy Link) */}
          <button
            type="button"
            onClick={handleNativeShare}
            className="w-8 h-8 rounded-full border border-teal-400/40 bg-[#002f4a]/80 hover:bg-[#003d61] text-teal-200 shadow-[0_0_10px_rgba(56,193,196,0.25)] flex items-center justify-center transition-all active:scale-95 cursor-pointer shrink-0"
            title="Share Card"
          >
            {copiedItem === 'shareUrl' ? (
              <FaCheck className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <FaShareAlt className="w-3.5 h-3.5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* ========================================================
            HERO IDENTITY: AVATAR ON LEFT, NAME & DETAILS ON RIGHT
            ======================================================== */}
      <div className="relative z-10 w-full px-5 py-3">
        <div className="flex items-center gap-4 text-left">

          {/* Left: Avatar with Glowing Ring Border */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[2.5px] bg-gradient-to-tr from-[#38c1c4] via-[#d6d7db] to-[#38b556] shadow-[0_0_20px_rgba(56,193,196,0.45)] overflow-hidden flex items-center justify-center">
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
                className={`w-full h-full rounded-full bg-[#002f4a] flex items-center justify-center text-teal-300/80 ${profile.profilePhoto ? 'hidden' : 'flex'
                  }`}
              >
                <FaUser className="w-12 h-12 text-teal-300/80 drop-shadow-sm" />
              </div>
            </div>

            {/* Company Logo Badge if available */}
            {isFieldAllowed('companyLogo') && profile.companyLogo && (
              <div
                className="absolute -top-1 -right-1 w-7 h-7 rounded-lg bg-[#001f35] border border-teal-400/40 p-0.5 shadow-md flex items-center justify-center"
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
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
              {profile.name}
            </h1>

            {profile.jobTitle && (
              <p className="text-sm sm:text-base font-semibold text-slate-200 mt-0.5">
                {profile.jobTitle}
              </p>
            )}

            {isFieldAllowed('companyName') && profile.companyName && (
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {profile.companyName}{profile.department ? ` • ${profile.department}` : ''}
              </p>
            )}

            {/* Slogan / Tagline */}
            {profile.tagline && (
              <>
                <div className="w-full h-[1px] bg-teal-500/25 my-2" />
                <p className="dark-card-tagline text-xs sm:text-sm text-slate-300 font-medium leading-snug tracking-wide">
                  {profile.tagline}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================
            ACTION BUTTONS: ROUND BUTTONS WITH NEON GLOWING RINGS
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
              <div className="w-12 h-12 rounded-full bg-[#031d33] border-2 border-[#38b556] text-white flex items-center justify-center shadow-[0_0_15px_rgba(56,181,86,0.65)] group-hover:scale-105 active:scale-95 transition-all">
                <FaPhoneAlt className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-white mt-1.5 tracking-tight">Call</span>
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
              <div className="w-12 h-12 rounded-full bg-[#031d33] border-2 border-[#32a852] text-white flex items-center justify-center shadow-[0_0_15px_rgba(50,168,82,0.65)] group-hover:scale-105 active:scale-95 transition-all">
                <FaWhatsapp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-semibold text-white mt-1.5 tracking-tight">WhatsApp</span>
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
              <div className="w-12 h-12 rounded-full bg-[#031d33] border-2 border-[#38c1c4] text-white flex items-center justify-center shadow-[0_0_15px_rgba(56,193,196,0.65)] group-hover:scale-105 active:scale-95 transition-all">
                <FaEnvelope className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-white mt-1.5 tracking-tight">Email</span>
            </button>
          )}

          {/* 4. Portfolio / Website / QR */}
          {portfolioLink ? (
            <button
              type="button"
              onClick={() => handlePortfolio(portfolioLink)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none flex-1 max-w-[80px]"
              title="Portfolio"
            >
              <div className="w-12 h-12 rounded-full bg-[#031d33] border-2 border-[#38b5ca] text-white flex items-center justify-center shadow-[0_0_15px_rgba(56,181,202,0.65)] group-hover:scale-105 active:scale-95 transition-all">
                <FaBriefcase className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-white mt-1.5 tracking-tight">Portfolio</span>
            </button>
          ) : linkedinLink ? (
            <button
              type="button"
              onClick={() => handlePortfolio(linkedinLink)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none flex-1 max-w-[80px]"
              title="LinkedIn"
            >
              <div className="w-12 h-12 rounded-full bg-[#031d33] border-2 border-[#38b5ca] text-white flex items-center justify-center shadow-[0_0_15px_rgba(56,181,202,0.65)] group-hover:scale-105 active:scale-95 transition-all">
                <FaLinkedin className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-white mt-1.5 tracking-tight">LinkedIn</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none flex-1 max-w-[80px]"
              title="QR Code"
            >
              <div className="w-12 h-12 rounded-full bg-[#031d33] border-2 border-[#38b5ca] text-white flex items-center justify-center shadow-[0_0_15px_rgba(56,181,202,0.65)] group-hover:scale-105 active:scale-95 transition-all">
                <FaQrcode className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-white mt-1.5 tracking-tight">QR Code</span>
            </button>
          )}

        </div>
      </div>

      {/* ========================================================
            ABOUT ME: DARK GLASS CARD
            ======================================================== */}
      {(profile.aboutText || profile.bio) && (
        <div className="relative z-10 w-full px-5 py-3">
          <div className="bg-[#001f35]/80 backdrop-blur-md rounded-2xl p-4 border border-teal-500/20 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <FaBriefcase className="w-4 h-4 text-teal-300" />
              <h3 className="text-sm font-bold text-white tracking-tight">
                About Me
              </h3>
            </div>
            {profile.aboutText && (
              <div>
                <p className="text-xs sm:text-[13px] leading-relaxed text-slate-200">
                  {showAboutMore || profile.aboutText.length <= 160
                    ? profile.aboutText
                    : `${profile.aboutText.slice(0, 160)}...`}
                </p>
                {profile.aboutText.length > 160 && (
                  <button
                    type="button"
                    onClick={() => setShowAboutMore(!showAboutMore)}
                    className="mt-1.5 text-[11px] font-semibold text-[#38c1c4] hover:text-white inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{showAboutMore ? 'Show Less' : 'Read More'}</span>
                    <FaChevronRight className={`w-2.5 h-2.5 transition-transform ${showAboutMore ? '-rotate-90' : 'rotate-90'}`} />
                  </button>
                )}
              </div>
            )}
            {profile.bio && profile.bio !== profile.aboutText && (
              <div className={profile.aboutText ? 'pt-2 border-t border-teal-500/20 mt-2' : ''}>
                <p className="text-xs sm:text-[13px] leading-relaxed text-slate-400">
                  {showAboutMore || profile.bio.length <= 140
                    ? profile.bio
                    : `${profile.bio.slice(0, 140)}...`}
                </p>
                {!profile.aboutText && profile.bio.length > 140 && (
                  <button
                    type="button"
                    onClick={() => setShowAboutMore(!showAboutMore)}
                    className="mt-1.5 text-[11px] font-semibold text-[#38c1c4] hover:text-white inline-flex items-center gap-1 transition-colors cursor-pointer"
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
          <div className="w-full aspect-[2.4/1] rounded-2xl overflow-hidden shadow-lg border border-teal-500/20 relative">
            <img
              src={cardData.bannerPhoto || cardData.coverPhoto}
              alt="Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001428]/70 via-transparent to-transparent pointer-events-none" />
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
          className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-[#38b556] via-[#38c1c4] to-[#38b5ca] hover:opacity-95 text-[#001428] font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(56,193,196,0.35)] transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
        >
          <FaDownload className="w-4 h-4 text-[#001428]" />
          <span>Save Contact to Phone</span>
        </button>
      </div>

      {/* ========================================================
            SERVICES SHOWCASE (Comprehensive Grid in Dark Theme)
            ======================================================== */}
      {((isFieldAllowed('services') && profile.services && profile.services.length > 0) || (isFieldAllowed('servicesProducts') && profile.servicesProducts)) && (
        <div className="relative z-10 w-full px-5 py-4 border-t border-teal-500/20 mt-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FaCogs className="w-4 h-4 text-[#38c1c4]" />
              <span>Products & Services</span>
            </h2>
            {profile.services.length > 0 && (
              <span className="text-[11px] text-[#38c1c4] font-medium">
                {profile.services.length} available
              </span>
            )}
          </div>

          {/* High-level summary */}
          {profile.servicesProducts && (
            <div className="p-3.5 mb-3 rounded-2xl bg-[#001f35]/80 border border-teal-500/25 text-xs text-slate-300">
              <span className="text-[10px] uppercase font-bold text-[#38c1c4] tracking-wider block mb-1">
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
                  className="mt-1 text-[11px] font-semibold text-[#38c1c4] hover:text-white inline-flex items-center gap-1 transition-colors cursor-pointer"
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
                    className="p-3.5 rounded-2xl bg-[#001f35]/70 border border-teal-500/20 backdrop-blur-md hover:bg-[#00263f] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#38c1c4]" />
                          <h4 className="text-xs font-bold text-white">{service.name || service.title}</h4>
                        </div>
                        {service.price && (
                          <span className="text-[11px] font-bold text-[#38b556] shrink-0">
                            {service.currency || '₹'}{service.price}
                          </span>
                        )}
                      </div>
                      {service.category && (
                        <span className="text-[9.5px] uppercase font-medium text-teal-400/80 block pl-4 mb-1">
                          {service.category}
                        </span>
                      )}
                      {service.description && (
                        <p className="text-[11px] text-slate-300 leading-relaxed pl-4 line-clamp-2">
                          {service.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 mt-2 border-t border-white/10 flex items-center justify-between pl-4">
                      <span className="text-[10px] text-slate-400">Direct Advisory</span>
                      <button
                        type="button"
                        onClick={() => {
                          setInquiryData(prev => ({ ...prev, service: service.name || service.title }));
                        }}
                        className="text-[11px] font-semibold text-[#38c1c4] hover:text-white flex items-center gap-1 cursor-pointer"
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
                    className="px-4 py-1.5 rounded-full bg-[#001f35] border border-teal-500/30 text-[#38c1c4] hover:text-white text-[11px] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
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
            PRODUCTS & SOLUTIONS (Dark Theme)
            ======================================================== */}
      {isFieldAllowed('products') && profile.products && profile.products.length > 0 && (
        <div className="relative z-10 w-full px-5 py-4 border-t border-teal-500/20">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FaGem className="w-4 h-4 text-[#38c1c4]" />
              <span>Products & Solutions</span>
            </h2>
            <span className="text-[11px] text-[#38c1c4] font-medium">
              {profile.products.length} items
            </span>
          </div>

          <div className="space-y-2.5">
            {(showAllProducts ? profile.products : profile.products.slice(0, 3)).map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#001f35]/70 border border-teal-500/20 flex items-start gap-3 hover:bg-[#00263f] transition-all">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-teal-500/30 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-white text-xs truncate">{item.name}</h4>
                    {item.price && (
                      <span className="text-xs font-bold text-[#38b556] shrink-0">{item.currency || '₹'} {item.price}</span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
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
                className="px-4 py-1.5 rounded-full bg-[#001f35] border border-teal-500/30 text-[#38c1c4] hover:text-white text-[11px] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{showAllProducts ? 'Show Less' : `View All ${profile.products.length} Products`}</span>
                <FaChevronRight className={`w-2 h-2 transition-transform ${showAllProducts ? '-rotate-90' : 'rotate-90'}`} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
            WEBSITES & DIGITAL PORTFOLIOS (Dark Theme)
            ======================================================== */}
      {profile.websites && profile.websites.length > 0 && (
        <div className="relative z-10 w-full px-5 py-4 border-t border-teal-500/20">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FaGlobe className="w-4 h-4 text-[#38c1c4]" />
              <span>Websites & Portfolios</span>
            </h2>
            <span className="text-[11px] text-[#38c1c4] font-medium">
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
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#001f35]/70 border border-teal-500/20 hover:bg-[#00263f] transition-colors">
                  <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
                    <div className="w-8 h-8 rounded-full bg-[#031d33] border border-[#38c1c4]/40 text-[#38c1c4] flex items-center justify-center shrink-0">
                      <FaGlobe className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] uppercase font-bold text-[#38c1c4] tracking-wider block">
                        {label}
                      </span>
                      <p className="text-xs font-semibold text-white truncate">{displayUrl}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(url, `site-${idx}`)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy Link"
                    >
                      {copiedItem === `site-${idx}` ? <FaCheck className="w-3 h-3 text-emerald-400" /> : <FaCopy className="w-3 h-3" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => window.open(url, '_blank')}
                      className="p-1.5 rounded-lg text-[#38c1c4] hover:bg-teal-500/20 transition-colors cursor-pointer"
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
        <div className="relative z-10 w-full px-5 py-4 border-t border-teal-500/20">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#001f35]/90 to-[#001628]/90 border border-[#38c1c4]/30 backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <FaCalendarAlt className="w-4 h-4 text-[#38c1c4]" />
              <h3 className="text-sm font-bold text-white">
                {profile.customerInquiry?.title || 'Book a Consultation'}
              </h3>
            </div>
            <p className="text-xs text-slate-300 mb-3">
              Select your required service and preferred time to connect directly with {profile.name}.
            </p>

            <div className="space-y-2.5">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 mb-1 block">
                  Service Required *
                </label>
                <select
                  value={inquiryData.service}
                  onChange={(e) => setInquiryData({ ...inquiryData, service: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl bg-[#001628] border border-teal-500/30 text-white focus:outline-none focus:border-[#38c1c4] cursor-pointer"
                >
                  <option value="" className="bg-[#001628] text-slate-300">Select a service...</option>
                  {profile.services.map((s, idx) => (
                    <option key={idx} value={s.title} className="bg-[#001628] text-white">
                      {s.title}
                    </option>
                  ))}
                  <option value="General Consultation" className="bg-[#001628] text-white">General Consultation</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 mb-1 block">Preferred Date</label>
                  <input
                    type="date"
                    value={inquiryData.date}
                    onChange={(e) => setInquiryData({ ...inquiryData, date: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl bg-[#001628] border border-teal-500/30 text-white focus:outline-none focus:border-[#38c1c4]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 mb-1 block">Preferred Time</label>
                  <input
                    type="time"
                    value={inquiryData.time}
                    onChange={(e) => setInquiryData({ ...inquiryData, time: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl bg-[#001628] border border-teal-500/30 text-white focus:outline-none focus:border-[#38c1c4]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 mb-1 block">
                  Your Contact (Phone or Email) *
                </label>
                <input
                  type="text"
                  placeholder="+91 98765 43210 or name@example.com"
                  value={inquiryData.contact}
                  onChange={(e) => setInquiryData({ ...inquiryData, contact: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl bg-[#001628] border border-teal-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-[#38c1c4]"
                />
              </div>

              <button
                type="button"
                onClick={handleSendInquiry}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#38b556] to-[#38c1c4] hover:opacity-95 text-[#001428] font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer mt-1"
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
        <div className="relative z-10 w-full px-5 py-4 border-t border-teal-500/20">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
            <FaVideo className="w-4 h-4 text-[#38c1c4]" />
            <span>Video Presentation</span>
          </h2>
          <VideoPlayer src={profile.profileVideo} title={`${profile.name} Presentation`} />
        </div>
      )}

      {/* ========================================================
            BUSINESS HOURS (IF CONFIGURED)
            ======================================================== */}
      {isFieldAllowed('businessHours') && profile.businessHours && profile.businessHours.length > 0 && (
        <div className="relative z-10 w-full px-5 py-4 border-t border-teal-500/20">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FaRegClock className="w-4 h-4 text-[#38c1c4]" />
              <span>Working Hours</span>
            </h2>
            {businessStatus && (
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${businessStatus.isOpen
                ? 'bg-emerald-500/20 text-[#38b556] border border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                }`}>
                {businessStatus.text}
              </span>
            )}
          </div>

          <div className="p-3.5 rounded-2xl bg-[#001f35]/70 border border-teal-500/20 space-y-1.5">
            {profile.businessHours.map((slot, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
                <span className="font-medium text-slate-300 capitalize">{slot.day}</span>
                <span className="text-slate-400">
                  {slot.isClosed ? (
                    <span className="text-rose-400 font-medium">Closed</span>
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
      <div className="relative z-10 w-full px-5 py-4 border-t border-teal-500/20 space-y-3">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <FaHeadset className="w-4 h-4 text-[#38c1c4]" />
          <span>Contact Directory</span>
        </h2>

        <div className="space-y-2">
          {/* Virtual Business Line */}
          {isFieldAllowed('virtualNumber') && profile.virtualNumber && (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#001f35]/70 border border-teal-500/20">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#031d33] border border-[#38c1c4]/40 text-[#38c1c4] flex items-center justify-center shrink-0">
                  <FaHeadset className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-teal-300 font-bold uppercase tracking-wider block">Virtual Line</span>
                  <span className="text-xs text-white font-medium">{profile.virtualNumber}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleCopy(profile.virtualNumber, 'virtual-number')}
                  className="p-2 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy Number"
                >
                  {copiedItem === 'virtual-number' ? <FaCheck className="w-3.5 h-3.5 text-emerald-400" /> : <FaCopy className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => handleCall(profile.virtualNumber)}
                  className="p-2 rounded-xl text-[#38c1c4] hover:bg-teal-500/20 transition-colors cursor-pointer"
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
              className="flex items-center justify-between p-3 rounded-2xl bg-[#001f35]/70 border border-teal-500/20 hover:bg-[#002844] cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-[#38b556]/40 text-[#38b556] flex items-center justify-center">
                  <FaPhoneAlt className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{p.number}</p>
                  <p className="text-[10px] text-slate-400 capitalize">{p.label || 'Direct Phone'}</p>
                </div>
              </div>
              <FaExternalLinkAlt className="w-3 h-3 text-slate-500" />
            </div>
          ))}

          {/* Emails */}
          {profile.emails.map((e, idx) => (
            <div
              key={idx}
              onClick={() => handleEmail(e.address)}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#001f35]/70 border border-teal-500/20 hover:bg-[#002844] cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-[#38c1c4]/40 text-[#38c1c4] flex items-center justify-center">
                  <FaEnvelope className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{e.address}</p>
                  <p className="text-[10px] text-slate-400 capitalize">{e.label || 'Email Address'}</p>
                </div>
              </div>
              <FaExternalLinkAlt className="w-3 h-3 text-slate-500 shrink-0" />
            </div>
          ))}

          {/* Addresses */}
          {profile.addresses && profile.addresses.map((addr, idx) => (
            <div
              key={idx}
              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(`${addr.street || ''} ${addr.city || ''} ${addr.state || ''}`)}`, '_blank')}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#001f35]/70 border border-teal-500/20 hover:bg-[#002844] cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center">
                  <FaMapMarkerAlt className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">
                    {[addr.street, addr.city, addr.state, addr.country].filter(Boolean).join(', ') || 'Office Location'}
                  </p>
                  <p className="text-[10px] text-slate-400 capitalize">{addr.label || 'Address'}</p>
                </div>
              </div>
              <FaExternalLinkAlt className="w-3 h-3 text-slate-500" />
            </div>
          ))}
        </div>

        {/* Social Links Icons */}
        {profile.socialLinks && profile.socialLinks.length > 0 && (
          <div className="pt-2">
            <p className="text-[11px] font-semibold text-slate-400 mb-2">Connect Across Platforms</p>
            <div className="flex flex-wrap gap-2">
              {profile.socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/15 flex items-center justify-center text-slate-200 hover:text-white hover:bg-teal-500/20 hover:border-[#38c1c4] transition-all shadow-xs"
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
          <div className="relative z-10 w-full px-5 py-4 border-t border-teal-500/20">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FaImage className="w-4 h-4 text-[#38c1c4]" />
                <span>Photo Gallery & Showcase</span>
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-[#38c1c4] border border-teal-500/40">
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
                      ? 'bg-gradient-to-r from-[#38b556] to-[#38c1c4] text-[#001428] shadow-sm'
                      : 'bg-[#001f35]/90 hover:bg-[#002844] text-slate-300 border border-teal-500/20'
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
                  className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#001f35] hover:bg-[#002844] text-[#38c1c4] shadow-md border border-teal-500/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  title="Previous Photos"
                >
                  <FaChevronLeft className="w-3.5 h-3.5 text-[#38c1c4]" />
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
                    className={`shrink-0 aspect-square group relative rounded-2xl overflow-hidden bg-[#001f35] border border-teal-500/25 shadow-xs hover:shadow-md transition-all cursor-pointer ${
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

                    <div className="absolute inset-0 bg-[#001428]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                      <span className="w-8 h-8 rounded-full bg-white/95 text-[#001428] shadow-md flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-200">
                        <FaSearchPlus className="w-3.5 h-3.5 text-[#001428]" />
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

              {displayedItems.length > 3 && (
                <button
                  type="button"
                  onClick={() => scrollGallery('right')}
                  className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#001f35] hover:bg-[#002844] text-[#38c1c4] shadow-md border border-teal-500/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  title="Next Photos"
                >
                  <FaChevronRight className="w-3.5 h-3.5 text-[#38c1c4]" />
                </button>
              )}
            </div>
            </div>
          );
        })()}

{/* ========================================================
            DOWNLOADS & BROCHURES (IF AVAILABLE)
            ======================================================== */}
{
  isFieldAllowed('downloads') && profile.downloads && profile.downloads.length > 0 && (
    <div className="relative z-10 w-full px-5 py-4 border-t border-teal-500/20">
      <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
        <FaFilePdf className="w-4 h-4 text-rose-400" />
        <span>Brochures & Resources</span>
      </h2>

      <div className="space-y-2">
        {profile.downloads.map((doc, idx) => (
          <a
            key={idx}
            href={doc.url || doc.fileUrl}
            target="_blank"
            rel="noreferrer"
            download
            className="flex items-center justify-between p-3 rounded-2xl bg-[#001f35]/70 border border-teal-500/20 hover:bg-[#002844] transition-all"
          >
            <div className="flex items-center gap-2.5">
              <FaFilePdf className="w-4 h-4 text-rose-400" />
              <span className="text-xs text-white font-medium">{doc.title || doc.name || `Document #${idx + 1}`}</span>
            </div>
            <FaDownload className="w-3 h-3 text-slate-400" />
          </a>
        ))}
      </div>
    </div>
  )
}

{/* ========================================================
            CLIENT LIST & PARTNERS (Dark Theme)
            ======================================================== */}
{
  isFieldAllowed('clientList') && profile.clientList && profile.clientList.length > 0 && (
    <div className="relative z-10 w-full px-5 py-4 border-t border-teal-500/20">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <FaBuilding className="w-4 h-4 text-[#38c1c4]" />
          <span>Clients & Partners</span>
        </h2>
        <span className="text-[11px] text-[#38c1c4] font-medium">
          {profile.clientList.length} partners
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {profile.clientList.map((client, idx) => {
          const clientName = typeof client === 'string' ? client : (client?.name || client?.company || '');
          if (!clientName) return null;
          return (
            <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#001f35]/80 border border-teal-500/20 text-slate-200 text-xs font-semibold">
              <FaCheckCircle className="w-3 h-3 text-[#38b556]" />
              <span>{clientName}</span>
            </div>
          );
        })}
      </div>
    </div>
  )
}

{/* ========================================================
            CLIENT TESTIMONIALS & ENDORSEMENTS (Dark Theme)
            ======================================================== */}
{
  isFieldAllowed('testimonials') && profile.testimonials && profile.testimonials.length > 0 && (
    <div className="relative z-10 w-full px-5 py-4 border-t border-teal-500/20">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <FaStar className="w-4 h-4 text-[#38c1c4]" />
          <span>Client Testimonials</span>
        </h2>
        <span className="text-[11px] text-[#38c1c4] font-medium">
          {profile.testimonials.length} reviews
        </span>
      </div>

      <div className="space-y-3">
        {profile.testimonials.map((test, idx) => {
          const quote = test.testimonial || test.quote || test.text || '';
          if (!quote && !test.clientName) return null;
          const rating = test.rating || 5;
          return (
            <div key={idx} className="p-3.5 rounded-2xl bg-[#001f35]/70 border border-teal-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(rating)].map((_, i) => (
                    <FaStar key={i} className="w-3 h-3 text-[#38c1c4]" />
                  ))}
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-[#38b556] border border-emerald-500/30">
                  Verified Client
                </span>
              </div>

              {quote && (
                <p className="text-xs text-slate-200 italic leading-relaxed">
                  "{quote}"
                </p>
              )}

              {(test.clientName || test.company || test.position) && (
                <div className="pt-2 border-t border-white/10 text-xs">
                  <span className="font-bold text-white block">
                    {test.clientName || 'Valued Client'}
                  </span>
                  {(test.position || test.company) && (
                    <span className="text-[11px] text-slate-400 font-medium">
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
  )
}

{/* ========================================================
            FEATURED VIDEO SHOWCASE (Dark Theme)
            ======================================================== */}
{
  isFieldAllowed('videos') && profile.videos && profile.videos.length > 0 && (
    <div className="relative z-10 w-full px-5 py-4 border-t border-teal-500/20">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <FaFileVideo className="w-4 h-4 text-[#38c1c4]" />
          <span>Featured Video Showcase</span>
        </h2>
        <span className="text-[11px] text-[#38c1c4] font-medium">
          {profile.videos.length} videos
        </span>
      </div>

      <div className="space-y-3">
        {profile.videos.map((vid, idx) => {
          const vidUrl = typeof vid === 'string' ? vid : (vid?.url || '');
          if (!vidUrl) return null;
          return (
            <div key={idx} className="bg-[#001f35]/70 rounded-2xl p-3 border border-teal-500/20">
              {vid.title && (
                <h4 className="text-xs font-bold text-white mb-1">
                  {vid.title}
                </h4>
              )}
              <VideoPlayer src={vidUrl} title={vid.title || `Video ${idx + 1}`} />
              {vid.description && (
                <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
                  {vid.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  )
}

{/* ========================================================
            BOTTOM FOOTER: "Powered by REVAYAH ONE"
            ======================================================== */}
<div className="relative z-10 w-full py-6 px-5 border-t border-teal-500/20 text-center mt-auto bg-[#001122]">
  <div className="flex items-center justify-center gap-1.5 text-xs text-slate-300">
    <FaShieldAlt className="w-4 h-4 text-teal-300" />
    <span>
      Powered by <strong className="font-bold text-white">REVAYAH ONE</strong>
    </span>
  </div>

  <div className="flex items-center justify-center gap-3 mt-2.5">
    <button
      type="button"
      onClick={handleNativeShare}
      className="text-xs font-semibold text-[#38c1c4] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
    >
      <FaShareAlt className="w-3 h-3" />
      <span>Share</span>
    </button>
    <span className="text-slate-600">•</span>
    <button
      type="button"
      onClick={() => setShowQrModal(true)}
      className="text-xs font-semibold text-[#38c1c4] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
    >
      <FaQrcode className="w-3 h-3" />
      <span>QR Code</span>
    </button>
  </div>
</div>

{/* ========================================================
          QR CODE MODAL (DARK THEME)
          ======================================================== */}
{
  showQrModal && (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#001f35] border border-teal-500/30 rounded-3xl p-6 max-w-xs w-full shadow-2xl text-center relative text-white">
        <button
          type="button"
          onClick={() => setShowQrModal(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white cursor-pointer"
        >
          <FaTimes className="w-4 h-4" />
        </button>
        <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-[#38c1c4]/40 text-[#38c1c4] flex items-center justify-center mx-auto mb-3">
          <FaQrcode className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-white mb-1">Scan & Connect</h3>
        <p className="text-xs text-slate-400 mb-4">
          Point your camera to instantly view and save {profile.name}'s digital card.
        </p>
        <div className="bg-white p-3 rounded-2xl inline-block mb-4 shadow-lg">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "https://www.revayah.one")}`}
            alt="QR Code"
            className="w-44 h-44 object-contain rounded-lg"
          />
        </div>
        <button
          type="button"
          onClick={() => handleCopy(window.location.href, 'qrModal')}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#38b556] to-[#38c1c4] hover:opacity-95 text-[#001428] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          {copiedItem === 'qrModal' ? (
            <>
              <FaCheck className="w-3.5 h-3.5" />
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
  )
}

{/* Full-Screen Photo Showcase Lightbox Modal */ }
{
  selectedGalleryIdx !== null && profile.gallery && profile.gallery[selectedGalleryIdx] && (() => {
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
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-teal-500/20 text-[#38c1c4] border border-teal-500/40">
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
              className="p-2 rounded-full bg-white/10 hover:bg-rose-600/80 text-white transition-colors"
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
                      ? 'border-[#38c1c4] scale-105 opacity-100 shadow-md ring-2 ring-[#38c1c4]/40'
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
  })()
}

    </div >
  );
};

export default DarkCard;
