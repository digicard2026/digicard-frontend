import React, { useState, useEffect, useRef } from 'react';
import {
  FaLinkedin, FaTwitter, FaInstagram, FaEnvelope,
  FaMapMarkerAlt, FaChevronRight, FaChevronLeft, FaGlobe,
  FaPhoneAlt, FaWhatsapp, FaUserFriends, FaUser,
  FaBuilding, FaVideo, FaImage, FaGem, FaStar,
  FaDownload, FaQrcode, FaShieldAlt, FaInfoCircle,
  FaCrown, FaBriefcase, FaCalendarAlt, FaHeadset,
  FaFilePdf, FaIdCard, FaTags, FaFileAlt,
  FaFileInvoice, FaRegClock, FaFileVideo, FaRobot,
  FaCommentDots, FaBullhorn, FaClipboardList,
  FaSuitcase, FaUsers, FaCogs, FaCheckCircle,
  FaAward, FaPaperPlane, FaExternalLinkAlt, FaClock,
  FaShareAlt, FaCopy, FaCheck, FaTimes, FaQuoteLeft,
  FaLink, FaUserTie, FaSearchPlus, FaExpand
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
        <FaVideo className="w-8 h-8 text-[#D8B48D] mb-2" />
        <p className="text-xs font-semibold text-slate-800 mb-1">{title || "Video Stream"}</p>
        <p className="text-[11px] text-slate-500 mb-3">Playback stream unavailable in this viewer mode.</p>
        {cleanUrl && (
          <a
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B1E36] hover:bg-[#0B1E36]/90 text-white rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-95"
          >
            <span>Watch Video Directly</span>
            <FaExternalLinkAlt className="w-3 h-3 text-[#D8B48D]" />
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
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#D8B48D] border-t-transparent" />
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

const DefaultCard = ({ cardData = {}, plan = 'BusinessPremium', isSnapshot = false, onShare }) => {
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

  // State management
  const [copiedItem, setCopiedItem] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
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

    phones: Array.isArray(cardData?.phones) && cardData.phones.length > 0
      ? cardData.phones
      : cardData?.phone ? [{ label: 'work', number: cardData.phone, isPrimary: true }] : [],
    emails: Array.isArray(cardData?.emails) && cardData.emails.length > 0
      ? cardData.emails
      : cardData?.email ? [{ label: 'work', address: cardData.email, isPrimary: true }] : [],
    websites: Array.isArray(cardData?.websites) && cardData.websites.length > 0
      ? cardData.websites.filter(w => w && (w.url || typeof w === 'string'))
      : cardData?.website ? [{ label: 'company', url: cardData.website }] : [],
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

    virtualNumber: cardData?.virtualNumber || '',
    nfcSettings: cardData?.nfcSettings || { isEnabled: false },
    testimonials: Array.isArray(cardData?.testimonials) ? cardData.testimonials : [],
    clientList: Array.isArray(cardData?.clientList) ? cardData.clientList : [],
    gallery: Array.isArray(cardData?.gallery) ? cardData.gallery : [],

    brandLabel: cardData?.brandLabel || 'REVAYAH ONE',
    enableOneTapCall: cardData?.enableOneTapCall !== undefined ? cardData.enableOneTapCall : true,
    enableWhatsApp: cardData?.enableWhatsApp !== undefined ? cardData.enableWhatsApp : true,
    enableEmail: cardData?.enableEmail !== undefined ? cardData.enableEmail : true
  };

  const primaryPhone = profile.phones.find(p => p.isPrimary)?.number || profile.phones[0]?.number || '';
  const primaryEmail = profile.emails.find(e => e.isPrimary)?.address || profile.emails[0]?.address || cardData.email || '';
  const primaryWebsite = profile.websites[0]?.url || (typeof profile.websites[0] === 'string' ? profile.websites[0] : '');
  const businessStatus = getBusinessStatus(profile.businessHours);

  // Initials for avatar monogram fallback (e.g. "UD" for Umesh Dash)
  const getInitials = () => {
    if (profile.firstName && profile.lastName) {
      return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();
    }
    if (profile.name && profile.name !== 'Professional Contact') {
      const parts = profile.name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
      }
      return parts[0].slice(0, 2).toUpperCase();
    }
    return 'RO';
  };

  // Field permission check: automatically renders content if actively entered by user
  const isFieldAllowed = (field) => {
    const lk = (field || '').toLowerCase();
    if (lk === 'services' && profile.services && profile.services.length > 0) return true;
    if (lk === 'servicesproducts' && profile.servicesProducts) return true;
    if (lk === 'products' && profile.products && profile.products.length > 0) return true;
    if (lk === 'websites' && profile.websites && profile.websites.length > 0) return true;
    if (lk === 'gallery' && profile.gallery && profile.gallery.length > 0) return true;
    if (lk === 'testimonials' && profile.testimonials && profile.testimonials.length > 0) return true;
    if (lk === 'clientlist' && profile.clientList && profile.clientList.length > 0) return true;
    if (lk === 'videos' && profile.videos && profile.videos.length > 0) return true;
    if (lk === 'downloads' && profile.downloads && profile.downloads.length > 0) return true;
    if ((lk === 'catalog' || lk === 'catalogpdf') && (cardData.catalogPDF || cardData.catalog)) return true;
    if (lk === 'nfcsettings' && profile.nfcSettings?.isEnabled) return true;
    if (lk === 'virtualnumber' && profile.virtualNumber) return true;

    if (cardData?.addons) {
      if (lk === 'gallery' && (cardData.addons.gallery || cardData.addons.photogallery)) return true;
      if ((lk === 'catalog' || lk === 'catalogpdf' || lk === 'downloads') &&
        (cardData.addons.docsbuilder || cardData.addons.catalogbuilder || cardData.addons.brochurebuilder || cardData.addons.docsmanager)) return true;
      if ((lk === 'nfcsettings' || lk === 'nfccard') && (cardData.addons.nfccard || cardData.addons.nfc)) return true;
      if ((lk === 'profilevideo' || lk === 'productvideo' || lk === 'videos') && (cardData.addons.profilebuilder || cardData.addons.portfoliobuilder || cardData.addons.videobuilder)) return true;
      if (lk === 'testimonials' && (cardData.addons.testimonials || cardData.addons.portfoliobuilder)) return true;
      if (lk === 'clientlist' && (cardData.addons.clientlist || cardData.addons.portfoliobuilder)) return true;
    }
    const allowed = cardFieldsConfig[currentPlan] || cardFieldsConfig.BusinessPremium;
    return allowed.includes(field);
  };

  // Handle keyboard navigation for full-screen gallery lightbox
  useEffect(() => {
    if (selectedGalleryIdx === null || !profile.gallery || profile.gallery.length === 0) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedGalleryIdx(null);
      if (e.key === 'ArrowRight') setSelectedGalleryIdx(prev => (prev + 1) % profile.gallery.length);
      if (e.key === 'ArrowLeft') setSelectedGalleryIdx(prev => (prev - 1 + profile.gallery.length) % profile.gallery.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGalleryIdx, profile.gallery.length]);

  // Dedicated Rich Snapshot Rendering for WhatsApp and Social Media Preview Unfurls
  if (isSnapshot) {
    const rawPhoto = profile.profilePhoto;
    const photoSrc = (rawPhoto && rawPhoto.startsWith('http') && !rawPhoto.includes('unsplash.com'))
      ? `${CARD_URL}/proxy-image?url=${encodeURIComponent(rawPhoto)}`
      : rawPhoto;

    return (
      <div className="w-[360px] max-w-full bg-white text-slate-800 flex flex-col items-center justify-start p-0 font-sans antialiased overflow-hidden rounded-[28px] border border-slate-200 shadow-xl">
        {/* EXECUTIVE HERO: Deep Midnight Navy Canvas */}
        <div className="relative w-full bg-[#0B1E36] px-5 pt-7 pb-6 text-center overflow-hidden">
          <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D8B48D]/40 to-transparent pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/35 border border-[#D8B48D]/30 backdrop-blur-md">
              <FaShieldAlt className="w-2.5 h-2.5 text-[#D8B48D]" />
              <span className="text-[9px] font-semibold text-white uppercase tracking-wider">
                {profile.brandLabel || 'REVAYAH ONE'}
              </span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-slate-200 text-[9px] font-medium">
              <span>Digital ID Card</span>
            </div>
          </div>

          <div className="relative inline-block mx-auto mb-3">
            <div className="relative w-24 h-24 rounded-full p-1 bg-white/20 shadow-xl backdrop-blur-sm border-2 border-white flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-slate-900">
                {photoSrc ? (
                  <img
                    src={photoSrc}
                    alt={profile.name}
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover rounded-full bg-slate-100 shadow-sm"
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
                  className={`w-full h-full rounded-full bg-[#0B1E36] flex items-center justify-center text-[#E5C39E] font-bold text-xl ${photoSrc ? 'hidden' : 'flex'
                    }`}
                >
                  {getInitials()}
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-xl font-bold tracking-tight text-white mb-0.5">
            {profile.name}
          </h1>
          {profile.jobTitle && (
            <p className="text-xs font-medium text-slate-200 mb-1">
              {profile.jobTitle}
            </p>
          )}
          {profile.companyName && (
            <p className="text-[11px] font-semibold text-[#D8B48D] tracking-wide">
              {profile.companyName} {profile.department ? `• ${profile.department}` : ''}
            </p>
          )}

          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex-1 max-w-[95px] flex items-center justify-center gap-1 py-1.5 px-2 rounded-full bg-[#E5C39E] text-[#0B1E36] font-semibold text-[11px] shadow-sm">
              <FaPhoneAlt className="w-2.5 h-2.5" />
              <span>Call</span>
            </div>
            <div className="flex-1 max-w-[105px] flex items-center justify-center gap-1 py-1.5 px-2 rounded-full bg-[#E5C39E] text-[#0B1E36] font-semibold text-[11px] shadow-sm">
              <FaWhatsapp className="w-3 h-3" />
              <span>WhatsApp</span>
            </div>
            <div className="flex-1 max-w-[95px] flex items-center justify-center gap-1 py-1.5 px-2 rounded-full bg-[#E5C39E] text-[#0B1E36] font-semibold text-[11px] shadow-sm">
              <FaEnvelope className="w-2.5 h-2.5" />
              <span>Email</span>
            </div>
          </div>
        </div>

        {/* DOSSIER BODY: Clean White Canvas */}
        <div className="w-full px-5 py-4 space-y-3.5 bg-white text-left">
          {/* Section: About & Responsibilities */}
          {(profile.aboutText || profile.bio) && (
            <div>
              <h2 className="text-[11px] font-bold text-[#0B1E36] uppercase tracking-wider mb-1 flex items-center gap-1">
                <FaBriefcase className="w-2.5 h-2.5 text-[#D8B48D]" />
                <span>About & Role</span>
              </h2>
              <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                {profile.aboutText || profile.bio}
              </p>
            </div>
          )}

          {/* Section: My Services */}
          {profile.services && profile.services.length > 0 && (
            <div>
              <h2 className="text-[11px] font-bold text-[#0B1E36] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <FaCogs className="w-2.5 h-2.5 text-[#D8B48D]" />
                <span>My Services</span>
              </h2>
              <div className="grid grid-cols-2 gap-1.5">
                {profile.services.slice(0, 4).map((srv, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-1.5">
                    <span className="text-[#0B1E36] text-xs">🎯</span>
                    <span className="text-[10px] font-semibold text-slate-700 truncate">{srv.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Contact Secondary Action */}
          <div className="pt-1">
            <div className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold text-[11px] flex items-center justify-center gap-1.5 shadow-xs">
              <FaDownload className="w-3 h-3 text-slate-500" />
              <span>Save Contact to Phone</span>
            </div>
          </div>
        </div>

        <div className="w-full py-2 text-center border-t border-slate-100 bg-slate-50">
          <span className="text-[9.5px] font-medium text-slate-500">
            Powered by <strong className="text-slate-800">Reva-Yah One</strong> • Smart Digital Identity
          </span>
        </div>
      </div>
    );
  }

  // Copy helper
  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedItem(key);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  // Direct contact actions
  const handleCall = (num) => {
    if (!num) return;
    window.location.href = `tel:${num.replace(/\s+/g, '')}`;
  };

  const handleWhatsApp = (num) => {
    const cleanNum = (num || primaryPhone).replace(/\D/g, '');
    if (!cleanNum) return;
    const greeting = encodeURIComponent(`Hello ${profile.name}, I connected with you via your Revayah One digital card.`);
    window.open(`https://wa.me/${cleanNum}?text=${greeting}`, '_blank');
  };

  const handleEmail = (email) => {
    if (!email) return;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Inquiry via Revayah One: ${profile.name}`)}`;
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
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
    }
  };

  const handleSendInquiry = () => {
    if (!inquiryData.service) {
      alert("Please select a service or consultation topic.");
      return;
    }
    const message = `Hello ${profile.name},\n\nI would like to request a consultation regarding: *${inquiryData.service}*.\n\n*Details:*\n- Preferred Date: ${inquiryData.date || 'Flexible'}\n- Preferred Time: ${inquiryData.time || 'Flexible'}\n- My Contact: ${inquiryData.contact || 'Shared in chat'}\n\nLooking forward to speaking with you.`;

    if (primaryPhone) {
      const cleanNum = primaryPhone.replace(/\D/g, '');
      window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent(message)}`, '_blank');
    } else if (primaryEmail) {
      window.location.href = `mailto:${primaryEmail}?subject=${encodeURIComponent(`Service Request: ${inquiryData.service}`)}&body=${encodeURIComponent(message)}`;
    }
  };

  const getSocialIcon = (platform) => {
    const p = platform?.toLowerCase() || '';
    if (p.includes('linkedin')) return <FaLinkedin className="w-4 h-4" />;
    if (p.includes('twitter') || p.includes('x')) return <FaXTwitter className="w-4 h-4" />;
    if (p.includes('github')) return <FaGithub className="w-4 h-4" />;
    if (p.includes('instagram')) return <FaInstagram className="w-4 h-4" />;
    if (p.includes('facebook')) return <FaFacebookF className="w-4 h-4" />;
    if (p.includes('youtube')) return <FaYoutube className="w-4 h-4" />;
    if (p.includes('whatsapp')) return <FaWhatsapp className="w-4 h-4" />;
    return <FaGlobe className="w-4 h-4" />;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white text-slate-800 flex flex-col relative overflow-hidden min-h-screen font-sans antialiased selection:bg-[#0B1E36] selection:text-white">

      {/* ========================================================
            HERO HEADER: DEEP MIDNIGHT NAVY & CHAMPAGNE GOLD STAGE
            ======================================================== */}
      <div className="relative bg-[#0B1E36] px-6 pt-7 pb-6 text-center overflow-hidden">

        {/* Subtle Champagne Gold Accent Line */}
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D8B48D]/40 to-transparent pointer-events-none" />

        {/* Top Brand Pill & Share */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/35 border border-[#D8B48D]/30 backdrop-blur-md">
            <FaShieldAlt className="w-3 h-3 text-[#D8B48D]" />
            <span className="text-[10px] font-semibold text-white uppercase tracking-wider">
              {isFieldAllowed('brandLabel') && profile.brandLabel ? profile.brandLabel : 'REVAYAH ONE'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="p-2 rounded-full bg-black/35 hover:bg-black/50 border border-white/20 text-white backdrop-blur-md transition-all active:scale-95 shadow-md cursor-pointer"
              title="View QR Code"
            >
              <FaQrcode className="w-3.5 h-3.5 text-[#E5C39E]" />
            </button>

            <button
              type="button"
              onClick={handleNativeShare}
              className="p-2 rounded-full bg-black/35 hover:bg-black/50 border border-white/20 text-white backdrop-blur-md transition-all active:scale-95 shadow-md cursor-pointer"
              title="Share Card"
            >
              {copiedItem === 'shareUrl' ? (
                <FaCheck className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                <FaShareAlt className="w-3.5 h-3.5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Centered Avatar with Crisp White Ring Halo */}
        <div className="relative inline-block mx-auto mb-3">
          <div className="relative w-28 h-28 rounded-full p-1 bg-white/20 shadow-xl backdrop-blur-sm border-2 border-white flex items-center justify-center">
            {/* Inner Avatar Image / Placeholder */}
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-slate-900">
              {profile.profilePhoto ? (
                <img
                  src={profile.profilePhoto}
                  alt={profile.name}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover rounded-full bg-slate-100 shadow-sm"
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
                className={`w-full h-full rounded-full bg-[#0B1E36] flex items-center justify-center text-[#E5C39E] font-bold text-2xl ${profile.profilePhoto ? 'hidden' : 'flex'
                  }`}
              >
                {getInitials()}
              </div>
            </div>

            {/* Company Logo Badge if available */}
            {isFieldAllowed('companyLogo') && profile.companyLogo && (
              <div
                className="absolute -top-1 -right-1 z-20 w-8 h-8 rounded-xl bg-white border border-slate-200 p-1 shadow-md flex items-center justify-center"
                title={profile.companyName || "Company"}
              >
                <img
                  src={profile.companyLogo}
                  alt="Company Logo"
                  crossOrigin="anonymous"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>
        </div>

        {/* Linear Typography Hierarchy */}
        <h1 className="text-2xl font-bold tracking-tight text-white mb-0.5">
          {profile.name}
        </h1>

        {/* Job Title */}
        {profile.jobTitle && (
          <p className="text-sm font-medium text-slate-200 mb-1">
            {profile.jobTitle}
          </p>
        )}

        {/* Company & Department Details */}
        {isFieldAllowed('companyName') && profile.companyName && (
          <p className="text-xs font-semibold text-[#D8B48D] tracking-wide mb-2">
            {profile.companyName}
            {isFieldAllowed('department') && profile.department && (
              <span> • {profile.department}</span>
            )}
          </p>
        )}

        {/* Service Area, Availability & NFC Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
          {isFieldAllowed('businessHours') && businessStatus && (
            <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-medium border ${businessStatus.isOpen
              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
              : 'bg-white/10 text-slate-300 border-white/15'
              }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${businessStatus.isOpen ? 'bg-emerald-400' : 'bg-slate-400'}`} />
              {businessStatus.text}
            </span>
          )}

          {isFieldAllowed('serviceArea') && profile.serviceArea && (
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-medium bg-white/10 text-slate-200 border border-white/15">
              <FaMapMarkerAlt className="w-2.5 h-2.5 text-[#D8B48D]" />
              Serving: {profile.serviceArea}
            </span>
          )}

          {isFieldAllowed('serviceAvailability') && profile.serviceAvailability && (
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-medium bg-white/10 text-slate-200 border border-white/15">
              <FaCheckCircle className="w-2.5 h-2.5 text-emerald-400" />
              {profile.serviceAvailability}
            </span>
          )}

          {isFieldAllowed('nfcSettings') && profile.nfcSettings?.isEnabled && (
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#D8B48D]/20 text-[#E5C39E] border border-[#D8B48D]/40">
              <FaIdCard className="w-2.5 h-2.5 text-[#D8B48D]" />
              NFC Active
            </span>
          )}
        </div>

        {/* Unified Champagne/Gold Quick Action Strip */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {/* Call */}
          {profile.enableOneTapCall && primaryPhone && (
            <button
              type="button"
              onClick={() => handleCall(primaryPhone)}
              className="flex-1 max-w-[105px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#E5C39E] hover:bg-[#d8b48d] text-[#0B1E36] font-semibold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
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
              className="flex-1 max-w-[110px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#E5C39E] hover:bg-[#d8b48d] text-[#0B1E36] font-semibold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
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
              className="flex-1 max-w-[105px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#E5C39E] hover:bg-[#d8b48d] text-[#0B1E36] font-semibold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              <FaEnvelope className="w-3 h-3" />
              <span>Email</span>
            </button>
          )}

          {/* Website / Portal */}
          {primaryWebsite ? (
            <button
              type="button"
              onClick={() => handleWebsite(primaryWebsite)}
              className="flex-1 max-w-[105px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#E5C39E] hover:bg-[#d8b48d] text-[#0B1E36] font-semibold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              <FaGlobe className="w-3 h-3" />
              <span>Portal</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="flex-1 max-w-[105px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#E5C39E] hover:bg-[#d8b48d] text-[#0B1E36] font-semibold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              <FaQrcode className="w-3 h-3" />
              <span>QR Code</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================
            PROFESSIONAL DOSSIER: CRISP WHITE BODY CANVAS
            ======================================================== */}
      <div className="bg-white px-6 py-6 space-y-6 text-left">

        {/* 1. ABOUT & PROFESSIONAL OVERVIEW (Role, Responsibilities & Bio) */}
        {(profile.aboutText || profile.bio || profile.tagline) && (
          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#0B1E36] tracking-tight flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#0B1E36]/5 text-[#D8B48D] flex items-center justify-center text-xs">
                <FaBriefcase className="w-3.5 h-3.5" />
              </span>
              <span>About & Responsibilities</span>
            </h2>

            {/* Tagline / Executive Motto */}
            {profile.tagline && (
              <div className="border-l-2 border-[#D8B48D] pl-3.5 py-0.5">
                <p className="text-xs font-medium italic text-slate-700 leading-relaxed">
                  “{profile.tagline}”
                </p>
              </div>
            )}

            {/* Overview & Responsibilities Content */}
            <div className="space-y-2 text-xs leading-relaxed text-slate-600">
              {profile.aboutText && (
                <div>
                  <p className="font-normal text-slate-600 leading-relaxed">
                    {showAboutMore || profile.aboutText.length <= 160
                      ? profile.aboutText
                      : `${profile.aboutText.slice(0, 160)}...`}
                  </p>
                  {profile.aboutText.length > 160 && (
                    <button
                      type="button"
                      onClick={() => setShowAboutMore(!showAboutMore)}
                      className="mt-1.5 text-[11px] font-semibold text-[#0B1E36] hover:text-[#D8B48D] inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>{showAboutMore ? 'Show Less' : 'Read More'}</span>
                      <FaChevronRight className={`w-2.5 h-2.5 transition-transform ${showAboutMore ? '-rotate-90' : 'rotate-90'}`} />
                    </button>
                  )}
                </div>
              )}

              {profile.bio && profile.bio !== profile.aboutText && (
                <div className={profile.aboutText ? 'pt-2.5 border-t border-slate-100' : ''}>
                  <p className="font-normal text-slate-500 leading-relaxed">
                    {showAboutMore || profile.bio.length <= 140
                      ? profile.bio
                      : `${profile.bio.slice(0, 140)}...`}
                  </p>
                  {!profile.aboutText && profile.bio.length > 140 && (
                    <button
                      type="button"
                      onClick={() => setShowAboutMore(!showAboutMore)}
                      className="mt-1.5 text-[11px] font-semibold text-[#0B1E36] hover:text-[#D8B48D] inline-flex items-center gap-1 transition-colors cursor-pointer"
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

        {/* 2. SERVICES & SOLUTIONS (With Brief Overview if provided) */}
        {((isFieldAllowed('services') && profile.services && profile.services.length > 0) || (isFieldAllowed('servicesProducts') && profile.servicesProducts)) && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#0B1E36] tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#0B1E36]/5 text-[#D8B48D] flex items-center justify-center text-xs">
                  <FaCogs className="w-3.5 h-3.5" />
                </span>
                <span>Products & Services</span>
              </h2>
              {profile.services.length > 0 && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {profile.services.length} Available
                </span>
              )}
            </div>

            {/* High-level Services & Products Summary from Step 2 (servicesProducts) */}
            {profile.servicesProducts && (
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-slate-50 to-amber-50/30 border border-slate-200/80 text-xs">
                <span className="text-[10px] uppercase font-bold text-[#D8B48D] tracking-wider block mb-1">
                  Services & Products Overview
                </span>
                <p className="text-slate-700 leading-relaxed font-normal">
                  {showOverviewMore || profile.servicesProducts.length <= 140
                    ? profile.servicesProducts
                    : `${profile.servicesProducts.slice(0, 140)}...`}
                </p>
                {profile.servicesProducts.length > 140 && (
                  <button
                    type="button"
                    onClick={() => setShowOverviewMore(!showOverviewMore)}
                    className="mt-1 text-[11px] font-semibold text-[#0B1E36] hover:text-[#D8B48D] inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{showOverviewMore ? 'Show Less' : 'Read More'}</span>
                    <FaChevronRight className={`w-2 h-2 transition-transform ${showOverviewMore ? '-rotate-90' : 'rotate-90'}`} />
                  </button>
                )}
              </div>
            )}

            {/* Service Cards (2x2 Grid with View More) */}
            {profile.services && profile.services.length > 0 && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2.5">
                  {(showAllServices ? profile.services : profile.services.slice(0, 4)).map((srv, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-between p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/80 hover:border-[#D8B48D]/60 hover:bg-slate-50 transition-all shadow-xs group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="w-6 h-6 rounded-md bg-[#0B1E36]/10 text-[#0B1E36] flex items-center justify-center text-xs">
                            <FaSuitcase className="w-3 h-3 text-[#D8B48D]" />
                          </div>
                          {srv.price && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                              {srv.currency || '€'}{srv.price}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#0B1E36] line-clamp-1">
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
                            const funnel = document.getElementById('inquiry-funnel');
                            if (funnel) funnel.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-[11px] font-semibold text-[#0B1E36] hover:text-[#D8B48D] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Inquire</span>
                          <FaPaperPlane className="w-2.5 h-2.5 text-[#D8B48D]" />
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

        {/* 3. PRODUCTS & MERCHANDISE */}
        {isFieldAllowed('products') && profile.products && profile.products.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#0B1E36] tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#0B1E36]/5 text-[#D8B48D] flex items-center justify-center text-xs">
                  <FaGem className="w-3.5 h-3.5" />
                </span>
                <span>Products & Solutions</span>
              </h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {profile.products.length} Items
              </span>
            </div>

            <div className="space-y-2.5">
              {(showAllProducts ? profile.products : profile.products.slice(0, 3)).map((item, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex items-start gap-3 hover:border-[#D8B48D]/50 transition-colors">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-slate-200 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-slate-900 text-xs truncate">{item.name}</h3>
                      {item.price && (
                        <span className="text-xs font-bold text-[#0B1E36] flex-shrink-0">{item.currency || '€'} {item.price}</span>
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
                  className="px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{showAllProducts ? 'Show Less' : `View All ${profile.products.length} Products`}</span>
                  <FaChevronRight className={`w-2 h-2 transition-transform ${showAllProducts ? '-rotate-90' : 'rotate-90'}`} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* 4. WEBSITES & DIGITAL PORTFOLIOS (All Websites from Step 1) */}
        {profile.websites && profile.websites.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#0B1E36] tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#0B1E36]/5 text-[#D8B48D] flex items-center justify-center text-xs">
                  <FaGlobe className="w-3.5 h-3.5" />
                </span>
                <span>Websites & Portfolios</span>
              </h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {profile.websites.length} Links
              </span>
            </div>

            <div className="space-y-2">
              {profile.websites.map((site, idx) => {
                const url = typeof site === 'string' ? site : (site?.url || '');
                if (!url) return null;
                const label = (typeof site === 'object' && site?.label) ? site.label : 'Portfolio / Website';
                const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
                const isPortfolio = label.toLowerCase().includes('portfolio');
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
                      <div className="w-8 h-8 rounded-lg bg-[#0B1E36] text-[#E5C39E] flex items-center justify-center shadow-xs flex-shrink-0">
                        {isPortfolio ? (
                          <FaBriefcase className="w-3.5 h-3.5" />
                        ) : (
                          <FaGlobe className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[9.5px] uppercase font-bold text-[#D8B48D] tracking-wider block">
                          {label}
                        </span>
                        <p className="text-xs font-semibold text-slate-800 truncate">{displayUrl}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
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
                        onClick={() => handleWebsite(url)}
                        className="p-1.5 rounded-lg text-[#0B1E36] hover:bg-slate-200 transition-colors cursor-pointer"
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

        {/* 5. CONTACT INFORMATION DIRECTORY */}
        <div className="space-y-3 pt-2">
          <h2 className="text-base font-bold text-[#0B1E36] tracking-tight flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#0B1E36]/5 text-[#D8B48D] flex items-center justify-center text-xs">
              <FaHeadset className="w-3.5 h-3.5" />
            </span>
            <span>Contact Information</span>
          </h2>

          <div className="space-y-2">
            {/* Virtual Number (if configured) */}
            {isFieldAllowed('virtualNumber') && profile.virtualNumber && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0B1E36] text-[#E5C39E] flex items-center justify-center shadow-xs">
                    <FaHeadset className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[9.5px] uppercase font-bold text-[#D8B48D] tracking-wider block">
                      Virtual Business Line
                    </span>
                    <p className="text-xs font-semibold text-slate-800">{profile.virtualNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
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
                    className="p-1.5 rounded-lg text-[#0B1E36] hover:bg-slate-200 transition-colors cursor-pointer"
                    title="Call Direct"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Phone Numbers */}
            {profile.phones.map((p, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0B1E36] text-[#E5C39E] flex items-center justify-center shadow-xs">
                    <FaPhoneAlt className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[9.5px] uppercase font-bold text-slate-400 tracking-wider block">
                      {p.label || 'Direct Phone'}
                    </span>
                    <p className="text-xs font-semibold text-slate-800">{p.number}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
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
                    className="p-1.5 rounded-lg text-[#0B1E36] hover:bg-slate-200 transition-colors cursor-pointer"
                    title="Call Direct"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}

            {/* Email Addresses */}
            {profile.emails.map((e, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0B1E36] text-[#E5C39E] flex items-center justify-center shadow-xs flex-shrink-0">
                    <FaEnvelope className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9.5px] uppercase font-bold text-slate-400 tracking-wider block">
                      {e.label || 'Email Address'}
                    </span>
                    <p className="text-xs font-semibold text-slate-800 truncate">{e.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
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
                    className="p-1.5 rounded-lg text-[#0B1E36] hover:bg-slate-200 transition-colors cursor-pointer"
                    title="Send Email"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}

            {/* Street Addresses */}
            {profile.addresses.map((addr, idx) => {
              const fullText = addr.fullAddress || `${addr.street || ''}, ${addr.city || ''} ${addr.country || ''}`.trim();
              if (!fullText) return null;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0B1E36] text-[#E5C39E] flex items-center justify-center shadow-xs flex-shrink-0">
                      <FaMapMarkerAlt className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9.5px] uppercase font-bold text-slate-400 tracking-wider block">
                        {addr.label || 'Office Location'}
                      </span>
                      <p className="text-xs font-semibold text-slate-800 line-clamp-1">{fullText}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(fullText)}`, '_blank')}
                    className="p-1.5 rounded-lg text-[#0B1E36] hover:bg-slate-200 transition-colors cursor-pointer flex-shrink-0"
                    title="Open Maps"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. OPERATING SCHEDULE / BUSINESS HOURS */}
        {isFieldAllowed('businessHours') && profile.businessHours && profile.businessHours.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#0B1E36] tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#0B1E36]/5 text-[#D8B48D] flex items-center justify-center text-xs">
                  <FaRegClock className="w-3.5 h-3.5" />
                </span>
                <span>Operating Schedule</span>
              </h2>
              {businessStatus && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${businessStatus.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                  {businessStatus.isOpen ? 'Open Now' : 'Closed Today'}
                </span>
              )}
            </div>

            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-xs space-y-1.5">
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
                const sched = profile.businessHours.find(h => h.day?.toLowerCase() === day);
                const isToday = new Date().getDay() === ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(day);
                return (
                  <div
                    key={day}
                    className={`flex justify-between items-center py-1.5 px-2.5 rounded-lg transition-colors ${isToday ? 'bg-[#0B1E36] font-bold text-white shadow-xs' : 'text-slate-600'
                      }`}
                  >
                    <span className="capitalize">{day}</span>
                    <span>
                      {!sched || sched.isClosed ? (
                        <span className={isToday ? 'text-slate-300' : 'text-slate-400'}>Closed</span>
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

        {/* 7. DIRECT LEAD CAPTURE FUNNEL: CONSULTATION & INQUIRY */}
        {isFieldAllowed('customerInquiry') && (
          <div id="inquiry-funnel" className="pt-2">
            <div className="bg-gradient-to-br from-slate-50 to-amber-50/20 rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200/60">
                <span className="w-7 h-7 rounded-lg bg-[#0B1E36]/5 text-[#D8B48D] flex items-center justify-center text-xs">
                  <FaCalendarAlt className="w-3.5 h-3.5" />
                </span>
                <div>
                  <h2 className="text-sm font-bold text-[#0B1E36]">Request a Consultation</h2>
                  <p className="text-[11px] text-slate-500">
                    Schedule direct discussion with {profile.name}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Required Service or Topic
                  </label>
                  <select
                    value={inquiryData.service}
                    onChange={(e) => setInquiryData(prev => ({ ...prev, service: e.target.value }))}
                    className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B1E36]"
                  >
                    <option value="">Select a service / topic...</option>
                    {profile.services.map((s, idx) => (
                      <option key={idx} value={s.name}>{s.name}</option>
                    ))}
                    <option value="General Strategic Consultation">General Strategic Consultation</option>
                    <option value="Enterprise Architecture Review">Enterprise Architecture Review</option>
                    <option value="Other Inquiries">Other Inquiries</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={inquiryData.date}
                      onChange={(e) => setInquiryData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B1E36]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      value={inquiryData.time}
                      onChange={(e) => setInquiryData(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B1E36]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Your Contact Number / WhatsApp
                  </label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={inquiryData.contact}
                    onChange={(e) => setInquiryData(prev => ({ ...prev, contact: e.target.value }))}
                    className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B1E36]"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSendInquiry}
                  className="w-full py-2.5 rounded-xl bg-[#0B1E36] hover:bg-[#132c4d] text-white font-semibold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer active:scale-95"
                >
                  <FaPaperPlane className="w-3 h-3 text-[#D8B48D]" />
                  <span>Submit Consultation Request</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 8. PHOTO GALLERY & SHOWCASE (Collection Showcase with Lightbox) */}
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
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#0B1E36] tracking-tight flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#0B1E36]/5 text-[#D8B48D] flex items-center justify-center text-xs">
                    <FaImage className="w-3.5 h-3.5" />
                  </span>
                  <span>Photo Gallery & Showcase</span>
                </h2>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
                  {validGallery.length} {validGallery.length === 1 ? 'Photo' : 'Photos'}
                </span>
              </div>

              {/* Category Filtering Tabs (when multiple categories exist) */}
              {categories.length > 2 && (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setGalleryCategory(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${galleryCategory === cat
                        ? 'bg-[#0B1E36] text-[#D8B48D] shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              {/* Single Row Photo Gallery Strip with Left/Right Arrow Buttons */}
              <div className="relative group/gallery w-full">
                {/* Left Arrow Button */}
                {displayedItems.length > 3 && (
                  <button
                    type="button"
                    onClick={() => scrollGallery('left')}
                    className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-[#0B1E36] shadow-lg border border-slate-200/90 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                    title="Previous Photos"
                  >
                    <FaChevronLeft className="w-3.5 h-3.5 text-[#0B1E36]" />
                  </button>
                )}

                {/* Horizontal Scrollable Gallery Container */}
                <div
                  ref={galleryScrollRef}
                  className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth w-full py-1 px-0.5"
                >
                  {displayedItems.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedGalleryIdx(item.idx)}
                      className={`shrink-0 aspect-square group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer ${
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

                      {/* Normal Hover Overlay */}
                      <div className="absolute inset-0 bg-[#0B1E36]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                        <span className="w-8 h-8 rounded-full bg-white/95 text-[#0B1E36] shadow-md flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-200">
                          <FaSearchPlus className="w-3.5 h-3.5 text-[#0B1E36]" />
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

                {/* Right Arrow Button */}
                {displayedItems.length > 3 && (
                  <button
                    type="button"
                    onClick={() => scrollGallery('right')}
                    className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-[#0B1E36] shadow-lg border border-slate-200/90 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                    title="Next Photos"
                  >
                    <FaChevronRight className="w-3.5 h-3.5 text-[#0B1E36]" />
                  </button>
                )}
              </div>
            </div>
          );
        })()}

        {/* 9. CLIENT LIST & PARTNERS */}
        {isFieldAllowed('clientList') && profile.clientList && profile.clientList.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#0B1E36] tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#0B1E36]/5 text-[#D8B48D] flex items-center justify-center text-xs">
                  <FaBuilding className="w-3.5 h-3.5" />
                </span>
                <span>Clients & Partners</span>
              </h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {profile.clientList.length} Partners
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {profile.clientList.map((client, idx) => {
                const clientName = typeof client === 'string' ? client : (client?.name || client?.company || '');
                if (!clientName) return null;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-semibold shadow-2xs hover:border-[#D8B48D]/50 transition-colors"
                  >
                    <FaCheckCircle className="w-3 h-3 text-[#D8B48D]" />
                    <span>{clientName}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 10. CLIENT TESTIMONIALS & ENDORSEMENTS */}
        {isFieldAllowed('testimonials') && profile.testimonials && profile.testimonials.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#0B1E36] tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#0B1E36]/5 text-[#D8B48D] flex items-center justify-center text-xs">
                  <FaStar className="w-3.5 h-3.5" />
                </span>
                <span>Client Testimonials</span>
              </h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {profile.testimonials.length} Reviews
              </span>
            </div>

            <div className="space-y-3">
              {profile.testimonials.map((test, idx) => {
                const quote = test.testimonial || test.quote || test.text || '';
                if (!quote && !test.clientName) return null;
                const rating = test.rating || 5;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-amber-50/20 border border-slate-200/80 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(rating)].map((_, i) => (
                          <FaStar key={i} className="w-3 h-3 text-[#D8B48D]" />
                        ))}
                      </div>
                      <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Verified Client
                      </span>
                    </div>

                    {quote && (
                      <p className="text-xs text-slate-700 italic leading-relaxed">
                        "{quote}"
                      </p>
                    )}

                    {(test.clientName || test.company || test.position) && (
                      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-[#0B1E36] block">
                            {test.clientName || 'Valued Client'}
                          </span>
                          {(test.position || test.company) && (
                            <span className="text-[11px] text-slate-500 font-medium">
                              {test.position} {test.position && test.company ? '• ' : ''}{test.company}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 11. MEDIA & VIDEO GALLERY (Introductory Video + Featured Videos List) */}
        {((isFieldAllowed('profileVideo') && profile.profileVideo) || (isFieldAllowed('videos') && profile.videos && profile.videos.length > 0)) && (
          <div className="space-y-4 pt-2">
            {isFieldAllowed('profileVideo') && profile.profileVideo && (
              <div className="space-y-2">
                <h2 className="text-base font-bold text-[#0B1E36] tracking-tight flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#0B1E36]/5 text-[#D8B48D] flex items-center justify-center text-xs">
                    <FaVideo className="w-3.5 h-3.5" />
                  </span>
                  <span>Introductory Video</span>
                </h2>
                <VideoPlayer src={profile.profileVideo} title={`${profile.name} - Introduction`} />
              </div>
            )}

            {isFieldAllowed('videos') && profile.videos && profile.videos.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#0B1E36] tracking-tight flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0B1E36]/5 text-[#D8B48D] flex items-center justify-center text-xs">
                      <FaFileVideo className="w-3.5 h-3.5" />
                    </span>
                    <span>Featured Video Showcase</span>
                  </h3>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {profile.videos.length} Videos
                  </span>
                </div>

                <div className="space-y-3">
                  {profile.videos.map((vid, idx) => {
                    const vidUrl = typeof vid === 'string' ? vid : (vid?.url || '');
                    if (!vidUrl) return null;
                    return (
                      <div key={idx} className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80">
                        {vid.title && (
                          <h4 className="text-xs font-bold text-[#0B1E36] mb-1">
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
          </div>
        )}

        {/* 12. SOCIAL NETWORKS */}
        {profile.socialLinks && profile.socialLinks.length > 0 && (
          <div className="space-y-3 pt-2">
            <h2 className="text-base font-bold text-[#0B1E36] tracking-tight flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#0B1E36]/5 text-[#D8B48D] flex items-center justify-center text-xs">
                <FaUsers className="w-3.5 h-3.5" />
              </span>
              <span>Social Networks</span>
            </h2>

            <div className="flex flex-wrap gap-2">
              {profile.socialLinks.map((s, idx) => {
                if (!s.url) return null;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleWebsite(s.url)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-[#0B1E36]/5 border border-slate-200 hover:border-[#D8B48D]/50 text-slate-700 hover:text-[#0B1E36] transition-all text-xs font-semibold cursor-pointer"
                  >
                    {getSocialIcon(s.platform)}
                    <span className="capitalize">{s.platform}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 13. DOCUMENTS & CATALOGS (Catalog PDF + Downloads Add-On) */}
        {profile.downloads && profile.downloads.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#0B1E36] tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#0B1E36]/5 text-[#D8B48D] flex items-center justify-center text-xs">
                  <FaDownload className="w-3.5 h-3.5" />
                </span>
                <span>Documents & Catalogs</span>
              </h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {profile.downloads.length} Documents
              </span>
            </div>

            <div className="space-y-2">
              {profile.downloads.map((doc, idx) => {
                const docUrl = doc.fileUrl || doc.url;
                if (!docUrl) return null;
                return (
                  <a
                    key={idx}
                    href={docUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors text-xs font-medium text-slate-800 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <FaFilePdf className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-800 group-hover:text-[#0B1E36] block">
                          {doc.title || doc.name || `Document #${idx + 1}`}
                        </span>
                        {doc.isCatalog && (
                          <span className="text-[9.5px] uppercase font-bold text-[#D8B48D] block">
                            Official Business Catalog
                          </span>
                        )}
                      </div>
                    </div>
                    <FaDownload className="w-3 h-3 text-slate-400 group-hover:text-[#0B1E36]" />
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* 14. SECONDARY ACTION: SAVE CONTACT TO PHONE (.vcf) */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleSaveContact}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors shadow-sm cursor-pointer"
          >
            <FaDownload className="w-3.5 h-3.5 text-slate-500" />
            <span>Save Contact to Phone (.vcf)</span>
          </button>
        </div>

        {/* 15. FOOTER: POWERED BY REVAYAH ONE */}
        <div className="pt-4 pb-2 text-center border-t border-slate-100">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-800 mb-1">
            <FaCrown className="w-3.5 h-3.5 text-[#D8B48D]" />
            <span>REVAYAH ONE</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Official Digital Identity & Service Portal
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <button
              type="button"
              onClick={handleNativeShare}
              className="text-xs font-semibold text-slate-700 hover:text-[#0B1E36] flex items-center gap-1 cursor-pointer"
            >
              <FaShareAlt className="w-3 h-3 text-[#D8B48D]" />
              Share
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="text-xs font-semibold text-slate-700 hover:text-[#0B1E36] flex items-center gap-1 cursor-pointer"
            >
              <FaQrcode className="w-3 h-3 text-[#D8B48D]" />
              QR Code
            </button>
          </div>
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
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600"
            >
              <FaTimes className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-[#0B1E36] text-[#E5C39E] flex items-center justify-center mx-auto mb-3">
              <FaQrcode className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Scan & Connect</h3>
            <p className="text-xs text-slate-500 mb-4">
              Point your camera to instantly view and save {profile.name}'s digital card.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 inline-block mb-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(window.location.href)}`}
                alt="QR Code"
                className="w-44 h-44 object-contain rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={() => handleCopy(window.location.href, 'qrModal')}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedItem === 'qrModal' ? (
                <>
                  <FaCheck className="w-3.5 h-3.5 text-emerald-600" />
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
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#D8B48D]/20 text-[#D8B48D] border border-[#D8B48D]/30">
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

            {/* Bottom Bar: Caption & Thumbnails Strip */}
            <div
              className="w-full max-w-3xl mx-auto space-y-3 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {currentItem.description && (
                <p className="text-xs text-slate-300 text-center line-clamp-2 px-4">
                  {currentItem.description}
                </p>
              )}

              {totalItems > 1 && (
                <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 px-2 scrollbar-none max-w-full">
                  {profile.gallery.map((thumbItem, tIdx) => {
                    const thumbUrl = thumbItem.url || thumbItem.image || (typeof thumbItem === 'string' ? thumbItem : '');
                    if (!thumbUrl) return null;
                    const isActive = tIdx === selectedGalleryIdx;
                    return (
                      <button
                        key={tIdx}
                        type="button"
                        onClick={() => setSelectedGalleryIdx(tIdx)}
                        className={`w-12 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${isActive
                          ? 'border-[#D8B48D] scale-110 shadow-lg'
                          : 'border-white/20 opacity-50 hover:opacity-100'
                          }`}
                      >
                        <img
                          src={thumbUrl}
                          alt=""
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

export default DefaultCard;
