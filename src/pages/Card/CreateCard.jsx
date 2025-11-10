import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  FaGlobe, 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaTelegramPlane, 
  FaWhatsapp,
  FaGithub,
  FaYoutube,
  FaCopy,
  FaCheck,
  FaMapMarkerAlt,
  FaVideo,
  FaQrcode,
  FaDownload,
  FaComments,
  FaCalendarAlt,
  FaShoppingCart,
  FaCreditCard,
  FaLanguage,
  FaStar,
  FaPlus,
  FaTrash,
  FaBook,
  FaFilePdf,
  FaUserFriends,
  FaBriefcase,
  FaBuilding,
  FaIdCard,
  FaEnvelope,
  FaPhone
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CARD_URL } from "../../../src/utility/constants";

// Function to optimize form data by removing empty fields
const optimizeFormData = (data) => {
  const optimized = {
    // Personal Info
    ...(data.prefix && { prefix: data.prefix }),
    firstName: data.firstName || "",
    ...(data.lastName && { lastName: data.lastName }),
    ...(data.suffix && { suffix: data.suffix }),
    ...(data.profilePhoto && { profilePhoto: data.profilePhoto }),
    
    // Email
    email: data.email,
    
    // Card Type - DEFAULT TO BUSINESS
    cardType: data.cardType || 'business',
    
    // URL Customization
    ...(data.customUrl && { customUrl: data.customUrl }),
    urlSlug: data.urlSlug,
    isPublic: data.isPublic !== undefined ? data.isPublic : true,
    
    // Company Details
    ...(data.companyName && { companyName: data.companyName }),
    ...(data.department && { department: data.department }),
    ...(data.jobTitle && { jobTitle: data.jobTitle }),
    ...(data.bio && { bio: data.bio }),
    ...(data.companyLogo && { companyLogo: data.companyLogo }),
    logoSize: data.logoSize,
    
    // NEW: Profile Video
    ...(data.profileVideo?.url && { profileVideo: data.profileVideo }),
    
    // NEW: Title Line & Recognition
    ...(data.titleLine && { titleLine: data.titleLine }),
    ...(data.foundedName && { foundedName: data.foundedName }),
    ...(data.organization && { organization: data.organization }),
    ...(data.aboutText && { aboutText: data.aboutText }),
    
    // NEW: Business Details
    ...(data.servicesProducts && { servicesProducts: data.servicesProducts }),
    ...(data.brandLabel && { brandLabel: data.brandLabel }),
    ...(data.productRangeDisplay && { productRangeDisplay: data.productRangeDisplay }),
    ...(data.catalog && { catalog: data.catalog }),
    
    // Contact Details
    phones: data.phones.filter(phone => phone.number && phone.number.trim() !== ""),
    websites: data.websites.filter(website => website.url && website.url.trim() !== ""),
    
    // Address & Location Fields
    addresses: data.addresses
      .filter(address => address.street && address.street.trim() !== "")
      .map(address => ({
        label: address.label,
        street: address.street,
        city: address.city,
        state: address.state,
        country: address.country,
        postalCode: address.postalCode,
        ...(address.fullAddress && { fullAddress: address.fullAddress }),
        ...(address.googleMapsLink && { googleMapsLink: address.googleMapsLink }),
        isPrimary: address.isPrimary
      })),
    
    // Social Media Links
    socialLinks: data.socialLinks.filter(link => link.url && link.url.trim() !== ""),
    
    // Services & Products
    services: data.services
      .filter(service => service.name && service.name.trim() !== "")
      .map(service => ({
        name: service.name,
        ...(service.description && { description: service.description }),
        ...(service.price && { price: service.price }),
        currency: service.currency,
        ...(service.duration && { duration: service.duration }),
        ...(service.category && { category: service.category }),
        ...(service.image && { image: service.image })
      })),
    
    products: data.products
      .filter(product => product.name && product.name.trim() !== "")
      .map(product => ({
        name: product.name,
        ...(product.description && { description: product.description }),
        ...(product.price && { price: product.price }),
        currency: product.currency,
        ...(product.category && { category: product.category }),
        inStock: product.inStock,
        ...(product.image && { image: product.image })
      })),
    
    // NEW: Testimonials
    ...(data.testimonials && data.testimonials.length > 0 && {
      testimonials: data.testimonials
        .filter(testimonial => testimonial.clientName && testimonial.testimonial)
        .map(testimonial => ({
          clientName: testimonial.clientName,
          testimonial: testimonial.testimonial,
          ...(testimonial.rating && { rating: testimonial.rating }),
          ...(testimonial.date && { date: testimonial.date })
        }))
    }),
    
    // NEW: Client List
    ...(data.clientList && data.clientList.length > 0 && {
      clientList: data.clientList.filter(client => client.trim() !== "")
    }),
    
    // NEW: Gallery
    ...(data.gallery && data.gallery.length > 0 && {
      gallery: data.gallery
        .filter(item => item.url && item.url.trim() !== "")
        .map(item => ({
          type: item.type || 'image',
          url: item.url,
          ...(item.thumbnail && { thumbnail: item.thumbnail }),
          ...(item.title && { title: item.title }),
          ...(item.description && { description: item.description }),
          ...(item.category && { category: item.category })
        }))
    }),
    
    // NEW: Interactive Elements
    ...(data.interactiveElements && data.interactiveElements.length > 0 && {
      interactiveElements: data.interactiveElements
        .filter(element => element.type)
        .map(element => ({
          type: element.type,
          ...(element.config && { config: element.config }),
          isActive: element.isActive !== undefined ? element.isActive : true,
          position: element.position || 0
        }))
    }),
    
    // NEW: Dynamic QR Code
    ...(data.dynamicQRCode?.targetUrl && { dynamicQRCode: data.dynamicQRCode }),
    
    // NEW: NFC Settings
    ...(data.nfcSettings && { nfcSettings: data.nfcSettings }),
    
    // NEW: Downloads
    ...(data.downloads && data.downloads.length > 0 && {
      downloads: data.downloads
        .filter(download => download.name && download.fileUrl)
        .map(download => ({
          name: download.name,
          fileUrl: download.fileUrl,
          ...(download.fileType && { fileType: download.fileType }),
          ...(download.fileSize && { fileSize: download.fileSize }),
          downloadCount: download.downloadCount || 0
        }))
    }),
    
    // Design
    design: data.design,
    cardLayout: data.cardLayout
  };

  return optimized;
};

// Function to populate form with existing card data
const populateFormWithExistingData = (cardData, setFormData, setSaveStatus, navigate) => {
  console.log('Populating form with existing data:', cardData);
  
  const populatedFormData = {
    // Personal Info
    prefix: cardData.prefix || "",
    firstName: cardData.firstName || "",
    lastName: cardData.lastName || "",
    suffix: cardData.suffix || "",
    profilePhoto: cardData.profilePhoto || null,
    
    // Email
    email: cardData.email || "",
    
    // Card Type
    cardType: cardData.cardType || 'business',
    
    // URL Customization
    customUrl: cardData.customUrl || "",
    urlSlug: cardData.urlSlug || "",
    isPublic: cardData.isPublic !== undefined ? cardData.isPublic : true,
    
    // Company Details
    companyName: cardData.companyName || "",
    department: cardData.department || "",
    jobTitle: cardData.jobTitle || "",
    bio: cardData.bio || "",
    companyLogo: cardData.companyLogo || null,
    logoSize: cardData.logoSize || "medium",
    
    // NEW: Profile Video
    profileVideo: cardData.profileVideo || {
      url: "",
      thumbnail: "",
      title: ""
    },
    
    // NEW: Title Line & Recognition
    titleLine: cardData.titleLine || "",
    foundedName: cardData.foundedName || "",
    organization: cardData.organization || "",
    aboutText: cardData.aboutText || "",
    
    // NEW: Business Details
    servicesProducts: cardData.servicesProducts || "",
    brandLabel: cardData.brandLabel || "",
    productRangeDisplay: cardData.productRangeDisplay || "grid",
    catalog: cardData.catalog || "",
    
    // Contact Details
    phones: Array.isArray(cardData.phones) && cardData.phones.length > 0 
      ? cardData.phones.map(phone => ({
          label: phone.label || "work",
          number: phone.number || ""
        }))
      : [{ label: "work", number: "" }],
    
    websites: Array.isArray(cardData.websites) && cardData.websites.length > 0 
      ? cardData.websites.map(website => ({
          label: website.label || "personal",
          url: website.url || ""
        }))
      : [{ label: "personal", url: "" }],
    
    // Address & Location Fields
    addresses: Array.isArray(cardData.addresses) && cardData.addresses.length > 0 
      ? cardData.addresses.map(address => ({
          label: address.label || "office",
          street: address.street || "",
          city: address.city || "",
          state: address.state || "",
          country: address.country || "",
          postalCode: address.postalCode || "",
          fullAddress: address.fullAddress || "",
          googleMapsLink: address.googleMapsLink || "",
          isPrimary: address.isPrimary !== undefined ? address.isPrimary : true
        }))
      : [{
          label: "office",
          street: "",
          city: "",
          state: "",
          country: "",
          postalCode: "",
          fullAddress: "",
          googleMapsLink: "",
          isPrimary: true
        }],
    
    // Social Media Links
    socialLinks: [
      { platform: "linkedin", url: cardData.socialLinks?.find(link => link.platform === "linkedin")?.url || "" },
      { platform: "twitter", url: cardData.socialLinks?.find(link => link.platform === "twitter")?.url || "" },
      { platform: "facebook", url: cardData.socialLinks?.find(link => link.platform === "facebook")?.url || "" },
      { platform: "instagram", url: cardData.socialLinks?.find(link => link.platform === "instagram")?.url || "" },
      { platform: "youtube", url: cardData.socialLinks?.find(link => link.platform === "youtube")?.url || "" },
      { platform: "github", url: cardData.socialLinks?.find(link => link.platform === "github")?.url || "" },
      { platform: "whatsapp", url: cardData.socialLinks?.find(link => link.platform === "whatsapp")?.url || "" },
      { platform: "telegram", url: cardData.socialLinks?.find(link => link.platform === "telegram")?.url || "" },
      { platform: "website", url: cardData.socialLinks?.find(link => link.platform === "website")?.url || "" }
    ],
    
    // Services & Products
    services: Array.isArray(cardData.services) && cardData.services.length > 0 
      ? cardData.services.map(service => ({
          name: service.name || "",
          description: service.description || "",
          price: service.price || "",
          currency: service.currency || "USD",
          duration: service.duration || "",
          category: service.category || "",
          image: service.image || null
        }))
      : [{
          name: "",
          description: "",
          price: "",
          currency: "USD",
          duration: "",
          category: "",
          image: null
        }],
    
    products: Array.isArray(cardData.products) && cardData.products.length > 0 
      ? cardData.products.map(product => ({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          currency: product.currency || "USD",
          category: product.category || "",
          image: product.image || null,
          inStock: product.inStock !== undefined ? product.inStock : true
        }))
      : [{
          name: "",
          description: "",
          price: "",
          currency: "USD",
          category: "",
          image: null,
          inStock: true
        }],
    
    // NEW: Testimonials
    testimonials: Array.isArray(cardData.testimonials) && cardData.testimonials.length > 0 
      ? cardData.testimonials.map(testimonial => ({
          clientName: testimonial.clientName || "",
          testimonial: testimonial.testimonial || "",
          rating: testimonial.rating || 5,
          date: testimonial.date || new Date().toISOString().split('T')[0]
        }))
      : [],
    
    // NEW: Client List
    clientList: Array.isArray(cardData.clientList) && cardData.clientList.length > 0 
      ? cardData.clientList 
      : [],
    
    // NEW: Gallery
    gallery: Array.isArray(cardData.gallery) && cardData.gallery.length > 0 
      ? cardData.gallery.map(item => ({
          type: item.type || 'image',
          url: item.url || "",
          thumbnail: item.thumbnail || "",
          title: item.title || "",
          description: item.description || "",
          category: item.category || ""
        }))
      : [],
    
    // NEW: Interactive Elements
    interactiveElements: Array.isArray(cardData.interactiveElements) && cardData.interactiveElements.length > 0 
      ? cardData.interactiveElements.map(element => ({
          type: element.type || 'call-to-action',
          config: element.config || {},
          isActive: element.isActive !== undefined ? element.isActive : true,
          position: element.position || 0
        }))
      : [],
    
    // NEW: Dynamic QR Code
    dynamicQRCode: cardData.dynamicQRCode || {
      type: "dynamic",
      targetUrl: "",
      qrImage: "",
      scans: 0
    },
    
    // NEW: NFC Settings
    nfcSettings: cardData.nfcSettings || {
      isEnabled: false,
      nfcId: "",
      lastUsed: null
    },
    
    // NEW: Downloads
    downloads: Array.isArray(cardData.downloads) && cardData.downloads.length > 0 
      ? cardData.downloads.map(download => ({
          name: download.name || "",
          fileUrl: download.fileUrl || "",
          fileType: download.fileType || "",
          fileSize: download.fileSize || "",
          downloadCount: download.downloadCount || 0
        }))
      : [],
    
    // Design
    design: cardData.design || "",
    cardLayout: cardData.cardLayout || "standard"
  };
  
  console.log('Populated form data:', populatedFormData);
  setFormData(populatedFormData);
  
  navigate('.', { 
    state: { card: { ...populatedFormData, _id: cardData._id } },
    replace: true 
  });
  
  setSaveStatus("Existing card data loaded successfully!");
  setTimeout(() => setSaveStatus(""), 3000);
};

// Design templates configuration
const designTemplates = [
  {
    id: "default",
    name: "Default",
    gradient: "from-orange-300 to-blue-400",
    description: "Clean and professional design",
    preview: "bg-gradient-to-r from-orange-300 to-blue-400"
  },
  {
    id: "modern",
    name: "Modern",
    gradient: "from-blue-500 to-purple-600",
    description: "Sleek and contemporary look",
    preview: "bg-gradient-to-r from-blue-500 to-purple-600"
  },
  {
    id: "dark",
    name: "Dark",
    gradient: "from-slate-900 to-purple-800",
    description: "Elegant dark theme",
    preview: "bg-gradient-to-r from-slate-900 to-purple-800"
  },
  {
    id: "light",
    name: "Light",
    gradient: "from-blue-500 to-sky-300",
    description: "Bright and airy design",
    preview: "bg-gradient-to-r from-blue-500 to-sky-300"
  }
];

// Social Media Icons Configuration
const socialMediaConfig = {
  linkedin: {
    icon: <FaLinkedinIn className="w-5 h-5" />,
    name: "LinkedIn",
    color: "bg-blue-600 hover:bg-blue-700",
    placeholder: "https://linkedin.com/in/yourusername"
  },
  twitter: {
    icon: <FaXTwitter className="w-5 h-5" />,
    name: "Twitter",
    color: "bg-black hover:bg-gray-800",
    placeholder: "https://twitter.com/yourusername"
  },
  facebook: {
    icon: <FaFacebookF className="w-5 h-5" />,
    name: "Facebook",
    color: "bg-blue-500 hover:bg-blue-600",
    placeholder: "https://facebook.com/yourusername"
  },
  instagram: {
    icon: <FaInstagram className="w-5 h-5" />,
    name: "Instagram",
    color: "bg-pink-500 hover:bg-pink-600",
    placeholder: "https://instagram.com/yourusername"
  },
  youtube: {
    icon: <FaYoutube className="w-5 h-5" />,
    name: "YouTube",
    color: "bg-red-600 hover:bg-red-700",
    placeholder: "https://youtube.com/yourchannel"
  },
  github: {
    icon: <FaGithub className="w-5 h-5" />,
    name: "GitHub",
    color: "bg-gray-800 hover:bg-gray-900",
    placeholder: "https://github.com/yourusername"
  },
  whatsapp: {
    icon: <FaWhatsapp className="w-5 h-5" />,
    name: "WhatsApp",
    color: "bg-green-500 hover:bg-green-600",
    placeholder: "https://wa.me/yournumber"
  },
  telegram: {
    icon: <FaTelegramPlane className="w-5 h-5" />,
    name: "Telegram",
    color: "bg-blue-400 hover:bg-blue-500",
    placeholder: "https://t.me/yourusername"
  },
  website: {
    icon: <FaGlobe className="w-5 h-5" />,
    name: "Website",
    color: "bg-purple-500 hover:bg-purple-600",
    placeholder: "https://yourwebsite.com"
  }
};

const CreateCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingCard = location.state?.card || null;
  const userEmailFromSignIn = location.state?.userEmail || '';

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [activeSocialPlatform, setActiveSocialPlatform] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [showDesignSelection, setShowDesignSelection] = useState(false);
  const [sizeWarning, setSizeWarning] = useState("");
  const [showSizeWarning, setShowSizeWarning] = useState(false);
  const [pendingImageUpload, setPendingImageUpload] = useState(null);
  
  // URL Slug States
  const [checkingUrl, setCheckingUrl] = useState(false);
  const [urlAvailable, setUrlAvailable] = useState(null);
  const [copied, setCopied] = useState(false);
  const [generatedSlug, setGeneratedSlug] = useState("");

  // Track if user is coming from login (auto-filled email)
  const [isFromLogin, setIsFromLogin] = useState(false);

  // INITIALIZE FORM DATA WITH ALL NEW FIELDS
  const [formData, setFormData] = useState({
    // Personal Info
    prefix: "",
    firstName: "",
    lastName: "",
    suffix: "",
    profilePhoto: null,
    
    // Email
    email: userEmailFromSignIn || "",
    
    // Card Type - DEFAULT TO BUSINESS
    cardType: 'business',
    
    // URL Customization
    customUrl: "",
    urlSlug: "",
    isPublic: true,
    
    // Company Details
    companyName: "",
    department: "",
    jobTitle: "",
    bio: "",
    companyLogo: null,
    logoSize: "medium",
    
    // NEW: Profile Video
    profileVideo: {
      url: "",
      thumbnail: "",
      title: ""
    },
    
    // NEW: Title Line & Recognition
    titleLine: "",
    foundedName: "",
    organization: "",
    aboutText: "",
    
    // NEW: Business Details
    servicesProducts: "",
    brandLabel: "",
    productRangeDisplay: "grid",
    catalog: "",
    
    // Contact Details
    phones: [{ label: "work", number: "" }],
    websites: [{ label: "personal", url: "" }],
    
    // Address & Location Fields
    addresses: [{
      label: "office",
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      fullAddress: "",
      googleMapsLink: "",
      isPrimary: true
    }],
    
    // Social Media Links
    socialLinks: [
      { platform: "linkedin", url: "" },
      { platform: "twitter", url: "" },
      { platform: "facebook", url: "" },
      { platform: "instagram", url: "" },
      { platform: "youtube", url: "" },
      { platform: "github", url: "" },
      { platform: "whatsapp", url: "" },
      { platform: "telegram", url: "" },
      { platform: "website", url: "" }
    ],
    
    // Services & Products
    services: [{
      name: "",
      description: "",
      price: "",
      currency: "USD",
      duration: "",
      category: "",
      image: null
    }],
    products: [{
      name: "",
      description: "",
      price: "",
      currency: "USD",
      category: "",
      image: null,
      inStock: true
    }],
    
    // NEW: Testimonials
    testimonials: [],
    
    // NEW: Client List
    clientList: [],
    
    // NEW: Gallery
    gallery: [],
    
    // NEW: Interactive Elements
    interactiveElements: [],
    
    // NEW: Dynamic QR Code
    dynamicQRCode: {
      type: "dynamic",
      targetUrl: "",
      qrImage: "",
      scans: 0
    },
    
    // NEW: NFC Settings
    nfcSettings: {
      isEnabled: false,
      nfcId: "",
      lastUsed: null
    },
    
    // NEW: Downloads
    downloads: [],
    
    // Design
    design: "",
    cardLayout: "standard"
  });

  // Field visibility check based on card type
  const isFieldVisible = (fieldName) => {
    const fieldPlanMap = {
      // Business plan fields (Free)
      'profilePhoto': ['business', 'business-premium', 'business-pro'],
      'firstName': ['business', 'business-premium', 'business-pro'],
      'lastName': ['business', 'business-premium', 'business-pro'],
      'email': ['business', 'business-premium', 'business-pro'],
      'socialLinks': ['business', 'business-premium', 'business-pro'],
      
      // Business Premium plan fields
      'companyName': ['business-premium', 'business-pro'],
      'jobTitle': ['business-premium', 'business-pro'],
      'companyLogo': ['business-premium', 'business-pro'],
      'services': ['business-premium', 'business-pro'],
      'products': ['business-premium', 'business-pro'],
      'addresses': ['business-premium', 'business-pro'],
      'phones': ['business-premium', 'business-pro'],
      'websites': ['business-premium', 'business-pro'],
      'foundedName': ['business-premium', 'business-pro'],
      'organization': ['business-premium', 'business-pro'],
      'servicesProducts': ['business-premium', 'business-pro'],
      'brandLabel': ['business-premium', 'business-pro'],
      'catalog': ['business-premium', 'business-pro'],
      
      // Business Pro plan fields
      'profileVideo': ['business-pro'],
      'titleLine': ['business-pro'],
      'aboutText': ['business-pro'],
      'testimonials': ['business-pro'],
      'clientList': ['business-pro'],
      'gallery': ['business-pro'],
      'interactiveElements': ['business-pro'],
      'dynamicQRCode': ['business-pro'],
      'downloads': ['business-pro'],
      'nfcSettings': ['business-pro']
    };

    const allowedPlans = fieldPlanMap[fieldName] || [];
    return allowedPlans.includes(formData.cardType);
  };

  // Fetch card data by email
  const fetchCardByEmail = async (email) => {
    if (!email || !validateEmail(email)) return null;
    
    try {
      const response = await fetch(`${CARD_URL}/email/${encodeURIComponent(email)}`);
      if (response.ok) {
        const data = await response.json();
        return data.card || data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching card by email:', error);
      return null;
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check email existence
  const checkEmailExistence = async (email) => {
    try {
      setCheckingEmail(true);
      
      const checkResponse = await fetch(`${CARD_URL}/check-email?email=${encodeURIComponent(email)}`);
      const checkData = await checkResponse.json();
      setEmailExists(checkData.exists);
      
      if (checkData.exists && (!editingCard || editingCard.email !== email)) {
        const existingCard = await fetchCardByEmail(email);
        if (existingCard) {
          setTimeout(() => {
            if (window.confirm(
              `We found an existing business card for ${email}. Would you like to load the existing data to edit it?`
            )) {
              populateFormWithExistingData(existingCard, setFormData, setSaveStatus, navigate);
            }
          }, 500);
        }
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setEmailExists(false);
    } finally {
      setCheckingEmail(false);
    }
  };

  // Handle email change
  const handleEmailChange = async (e) => {
    const email = e.target.value;
    
    if (!email || email.trim() === "") {
      setFormData({
        ...formData,
        email: "",
        prefix: "",
        firstName: "",
        lastName: "",
        suffix: "",
        profilePhoto: null,
        customUrl: "",
        urlSlug: "",
        companyName: "",
        department: "",
        jobTitle: "",
        bio: "",
        companyLogo: null
      });
      setGeneratedSlug("");
      setIsFromLogin(false);
      return;
    }
    
    setFormData({ ...formData, email });
    setEmailError("");
    setEmailExists(false);
    
    if (email && !validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    if (email && validateEmail(email)) {
      await checkEmailExistence(email);
    }
  };

  // URL Availability Check Function
  const checkUrlAvailability = async (url) => {
    if (!url || url.length < 3) {
      setUrlAvailable(null);
      return;
    }

    try {
      setCheckingUrl(true);
      const response = await fetch(`${CARD_URL}/check-url?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      setUrlAvailable(data.available);
    } catch (error) {
      console.error('Error checking URL:', error);
      setUrlAvailable(null);
    } finally {
      setCheckingUrl(false);
    }
  };

  // Handle Custom URL Change
  const handleCustomUrlChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setFormData({ ...formData, customUrl: value, urlSlug: value });
  };

  // Copy to Clipboard Function
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Generate Shareable URL
  const getShareableUrl = () => {
    const slug = formData.urlSlug || generatedSlug;
    if (!slug) return "";
    return `http://localhost:5173/preview/${slug}`;
  };

  // Warning Popup Component
  const WarningPopup = () => {
    if (!showWarning) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 backdrop-blur-md">
        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <span className="text-2xl mr-2">⚠️</span>
              <h3 className="text-lg font-semibold text-slate-800">Required Field</h3>
            </div>
            <button
              onClick={() => setShowWarning(false)}
              className="text-slate-500 hover:text-slate-700 transition-colors duration-200 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100"
            >
              ×
            </button>
          </div>
          
          <div className="text-center py-4">
            <p className="text-slate-700 text-lg leading-relaxed">
              {warningMessage}
            </p>
          </div>
          
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowWarning(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 shadow-md"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Handle change for basic fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle array field changes
  const handleArrayFieldChange = (field, index, subField, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = { ...updatedArray[index], [subField]: value };
    setFormData({ ...formData, [field]: updatedArray });
  };

  // Handle social link change
  const handleSocialLinkChange = (platform, url) => {
    const updatedSocialLinks = formData.socialLinks.map(link => 
      link.platform === platform 
        ? { ...link, url }
        : link
    );
    setFormData({ ...formData, socialLinks: updatedSocialLinks });
    setActiveSocialPlatform("");
  };

  // Add array field
  const addArrayField = (field, defaultItem) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], defaultItem]
    });
  };

  // Remove array field
  const removeArrayField = (field, index) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
  };

  // Handle image upload for services and products
  const handleServiceProductImageUpload = async (field, index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target.result;
      const updatedArray = [...formData[field]];
      updatedArray[index] = { ...updatedArray[index], image: base64Image };
      setFormData({ ...formData, [field]: updatedArray });
    };
    reader.readAsDataURL(file);
  };

  // Handle main image upload
  const handleMainImageUpload = async (field, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target.result;
      setFormData({ ...formData, [field]: base64Image });
    };
    reader.readAsDataURL(file);
  };

  // Address Field Handlers
  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...formData.addresses];
    updatedAddresses[index] = { ...updatedAddresses[index], [field]: value };
    setFormData({ ...formData, addresses: updatedAddresses });
  };

  const addAddress = () => {
    setFormData({
      ...formData,
      addresses: [
        ...formData.addresses,
        {
          label: "office",
          street: "",
          city: "",
          state: "",
          country: "",
          postalCode: "",
          fullAddress: "",
          googleMapsLink: "",
          isPrimary: false
        }
      ]
    });
  };

  const removeAddress = (index) => {
    const updatedAddresses = formData.addresses.filter((_, i) => i !== index);
    setFormData({ ...formData, addresses: updatedAddresses });
  };

  const setPrimaryAddress = (index) => {
    const updatedAddresses = formData.addresses.map((address, i) => ({
      ...address,
      isPrimary: i === index
    }));
    setFormData({ ...formData, addresses: updatedAddresses });
  };

  const generateFullAddress = (index) => {
    const address = formData.addresses[index];
    const parts = [
      address.street,
      address.city,
      address.state,
      address.postalCode,
      address.country
    ].filter(part => part && part.trim() !== "");
    
    const fullAddress = parts.join(', ');
    handleAddressChange(index, 'fullAddress', fullAddress);
    
    if (address.street && address.city) {
      const mapsQuery = encodeURIComponent(fullAddress);
      handleAddressChange(index, 'googleMapsLink', `https://maps.google.com/?q=${mapsQuery}`);
    }
  };

  // Handlers for new fields
  const handleTestimonialChange = (index, field, value) => {
    const updatedTestimonials = [...formData.testimonials];
    updatedTestimonials[index] = { ...updatedTestimonials[index], [field]: value };
    setFormData({ ...formData, testimonials: updatedTestimonials });
  };

  const handleGalleryChange = (index, field, value) => {
    const updatedGallery = [...formData.gallery];
    updatedGallery[index] = { ...updatedGallery[index], [field]: value };
    setFormData({ ...formData, gallery: updatedGallery });
  };

  const handleInteractiveElementChange = (index, field, value) => {
    const updatedElements = [...formData.interactiveElements];
    updatedElements[index] = { ...updatedElements[index], [field]: value };
    setFormData({ ...formData, interactiveElements: updatedElements });
  };

  const handleDownloadChange = (index, field, value) => {
    const updatedDownloads = [...formData.downloads];
    updatedDownloads[index] = { ...updatedDownloads[index], [field]: value };
    setFormData({ ...formData, downloads: updatedDownloads });
  };

  // Add new array items
  const addTestimonial = () => {
    setFormData({
      ...formData,
      testimonials: [
        ...formData.testimonials,
        {
          clientName: "",
          testimonial: "",
          rating: 5,
          date: new Date().toISOString().split('T')[0]
        }
      ]
    });
  };

  const addGalleryItem = () => {
    setFormData({
      ...formData,
      gallery: [
        ...formData.gallery,
        {
          type: "image",
          url: "",
          thumbnail: "",
          title: "",
          description: "",
          category: ""
        }
      ]
    });
  };

  const addInteractiveElement = () => {
    setFormData({
      ...formData,
      interactiveElements: [
        ...formData.interactiveElements,
        {
          type: "call-to-action",
          config: {},
          isActive: true,
          position: formData.interactiveElements.length
        }
      ]
    });
  };

  const addDownload = () => {
    setFormData({
      ...formData,
      downloads: [
        ...formData.downloads,
        {
          name: "",
          fileUrl: "",
          fileType: "",
          fileSize: "",
          downloadCount: 0
        }
      ]
    });
  };

  // Remove array items
  const removeTestimonial = (index) => {
    const updatedTestimonials = formData.testimonials.filter((_, i) => i !== index);
    setFormData({ ...formData, testimonials: updatedTestimonials });
  };

  const removeGalleryItem = (index) => {
    const updatedGallery = formData.gallery.filter((_, i) => i !== index);
    setFormData({ ...formData, gallery: updatedGallery });
  };

  const removeInteractiveElement = (index) => {
    const updatedElements = formData.interactiveElements.filter((_, i) => i !== index);
    setFormData({ ...formData, interactiveElements: updatedElements });
  };

  const removeDownload = (index) => {
    const updatedDownloads = formData.downloads.filter((_, i) => i !== index);
    setFormData({ ...formData, downloads: updatedDownloads });
  };

  // Validate current step
  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.email?.trim()) {
          setWarningMessage("Please fill in your Email Address before moving to the next step!");
          return false;
        }
        if (!validateEmail(formData.email)) {
          setWarningMessage("Please enter a valid email address before moving to the next step!");
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const nextStep = () => {
    console.log('Current step:', currentStep);
    console.log('Form data for current step:', formData);
    
    if (!validateCurrentStep()) {
      setShowWarning(true);
      return;
    }
    
    if (currentStep === 5) {
      setShowDesignSelection(true);
    } else {
      setCurrentStep(prev => {
        const nextStep = Math.min(prev + 1, 5);
        console.log('Moving to step:', nextStep);
        return nextStep;
      });
    }
  };

  const prevStep = () => {
    if (showDesignSelection) {
      setShowDesignSelection(false);
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
  };

  const cleanFormData = (data) => {
    const cleanedData = optimizeFormData(data);
    const payloadSize = JSON.stringify(cleanedData).length;
    console.log(`📤 Final payload size: ${payloadSize} bytes (${(payloadSize / 1024 / 1024).toFixed(2)} MB)`);
    return cleanedData;
  };

  const saveCardToBackend = async (cardData) => {
    try {
      setLoading(true);
      setSaveStatus("Saving...");
      
      const cleanedData = cleanFormData(cardData);
      
      let url, method;
      
      if (editingCard && editingCard._id) {
        if (cardData.email) {
          url = `${CARD_URL}/update-by-email/${encodeURIComponent(cardData.email)}`;
        } else {
          url = `${CARD_URL}/update-card/${editingCard._id}`;
        }
        method = "PUT";
      } else {
        url = `${CARD_URL}/create-card`;
        method = "POST";
      }
      
      console.log("Saving data to backend:", cleanedData);
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData)
      });
      
      if (!response.ok) {
        if (response.status === 413) {
          throw new Error('The total size of all images is too large. Please remove some images or use smaller files to continue.');
        }
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
      
      const responseData = await response.json();
      
      setSaveStatus("Saved successfully!");
      console.log("Save successful:", responseData);
      return responseData.card || responseData;
      
    } catch (error) {
      console.error('Error saving card:', error);
      setSaveStatus(`Error: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleDesignSelect = (designId) => {
    setFormData({ ...formData, design: designId });
  };

  const handleFinalSubmit = async () => {
    try {
      const savedCard = await saveCardToBackend(formData);
      
      const shareUrl = `http://localhost:5173/preview/${savedCard.urlSlug || formData.urlSlug}`;
      
      alert(`🎉 Card ${editingCard ? 'updated' : 'created'} successfully!\n\n🔗 Your shareable URL:\n${shareUrl}`);
      
      navigator.clipboard.writeText(shareUrl);
      
      navigate(`/preview/${savedCard.urlSlug || formData.urlSlug}`);
      
    } catch (error) {
      alert(`Failed to ${editingCard ? 'update' : 'create'} card: ${error.message}`);
    }
  };

  // UseEffects
  useEffect(() => {
    if (userEmailFromSignIn && validateEmail(userEmailFromSignIn) && !editingCard) {
      console.log('Auto-filled email detected, triggering verification:', userEmailFromSignIn);
      setIsFromLogin(true);
      checkEmailExistence(userEmailFromSignIn);
    }
  }, [userEmailFromSignIn, editingCard]);

  useEffect(() => {
    if (editingCard) {
      console.log('Editing card data:', editingCard);
      setFormData(editingCard);
      if (editingCard.urlSlug) {
        setGeneratedSlug(editingCard.urlSlug);
      }
      setIsFromLogin(true);
    }
  }, [editingCard]);

  useEffect(() => {
    if (formData.email && !editingCard && !formData.customUrl) {
      const emailSlug = formData.email.split('@')[0].toLowerCase();
      const cleanSlug = emailSlug.replace(/[^a-z0-9]/g, '-');
      setGeneratedSlug(cleanSlug);
      setFormData(prev => ({ ...prev, urlSlug: cleanSlug }));
    }
  }, [formData.email, editingCard, formData.customUrl]);

  useEffect(() => {
    if (formData.customUrl && formData.customUrl.trim()) {
      checkUrlAvailability(formData.customUrl);
    } else if (formData.urlSlug && formData.urlSlug.trim()) {
      checkUrlAvailability(formData.urlSlug);
    } else {
      setUrlAvailable(null);
    }
  }, [formData.customUrl, formData.urlSlug]);

  // Render Functions
  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">Personal Information</h3>
      
      {editingCard && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <span className="text-blue-600 text-lg mr-2">✏️</span>
            <div>
              <p className="text-blue-800 font-medium">Editing Existing Card</p>
              <p className="text-blue-700 text-sm">
                You are editing an existing business card. Changes will be saved to the existing card.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <label className="block font-semibold text-slate-700 mb-2">Profile Photo</label>
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
          {formData.profilePhoto ? (
            <div className="flex flex-col items-center">
              <img src={formData.profilePhoto} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-2" />
              <button 
                type="button"
                onClick={() => setFormData({...formData, profilePhoto: null})}
                className="text-red-500 text-sm hover:text-red-700"
              >
                Remove Photo
              </button>
            </div>
          ) : (
            <>
              <p className="text-slate-500 mb-2">Drag file here or upload file</p>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleMainImageUpload("profilePhoto", e)}
                className="hidden" 
                id="profilePhoto"
              />
              <label 
                htmlFor="profilePhoto"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors"
              >
                Upload Photo
              </label>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-700 mb-1">Prefix</label>
          <select 
            name="prefix"
            value={formData.prefix || ""}
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="Mr.">Mr.</option>
            <option value="Ms.">Ms.</option>
            <option value="Dr.">Dr.</option>
            <option value="Prof.">Prof.</option>
          </select>
        </div>
        
        <div>
          <label className="block text-slate-700 mb-1">Suffix</label>
          <input 
            type="text" 
            name="suffix"
            placeholder="e.g., Jr., Sr., PhD"
            value={formData.suffix || ""}
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-700 mb-1">First Name</label>
          <input 
            type="text" 
            name="firstName"
            placeholder="First name"
            value={formData.firstName || ""}
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-slate-700 mb-1">Last Name</label>
          <input 
            type="text" 
            name="lastName"
            placeholder="Last name"
            value={formData.lastName || ""}
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-slate-700 mb-1">Email Address *</label>
        <div className="relative">
          <input 
            type="email" 
            name="email"
            placeholder="your.email@example.com"
            required
            value={formData.email || ""}
            onChange={handleEmailChange}
            className={`w-full p-2 border rounded pr-10 focus:ring-1 focus:ring-blue-500 ${
              emailError 
                ? 'border-red-500 bg-red-50' 
                : emailExists 
                ? 'border-orange-500 bg-orange-50' 
                : formData.email && !checkingEmail && validateEmail(formData.email)
                ? 'border-green-500 bg-green-50'
                : 'border-slate-300'
            }`}
          />
          {checkingEmail && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            </div>
          )}
          {emailExists && !checkingEmail && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500">
              ⚠️
            </div>
          )}
          {formData.email && !emailExists && !checkingEmail && validateEmail(formData.email) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
              ✓
            </div>
          )}
        </div>
        {emailError && (
          <p className="text-red-600 text-sm mt-1">{emailError}</p>
        )}
        {emailExists && (
          <p className="text-orange-600 text-sm mt-1">
            This email is already registered. You can still proceed, but please use a different email if this isn't you.
          </p>
        )}
      </div>

      {/* URL Customization Section */}
      <div className="border-t pt-6 mt-6">
        <h4 className="text-lg font-semibold text-slate-800 mb-4">Your Shareable Card URL</h4>
        
        <div className="space-y-4">
          {(formData.urlSlug || generatedSlug) && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <label className="block text-slate-700 mb-2 font-medium">Your Card URL:</label>
              <div className="flex items-center space-x-2">
                <code className="flex-1 bg-white border border-slate-300 rounded px-3 py-2 text-sm font-mono text-slate-800">
                  {getShareableUrl()}
                </code>
                <button
                  type="button"
                  onClick={() => copyToClipboard(getShareableUrl())}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? <FaCheck className="w-4 h-4" /> : <FaCopy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Share this URL to let people view your digital business card
              </p>
            </div>
          )}

          {/* Custom URL Input */}
          <div>
            <label className="block text-slate-700 mb-2 font-medium">Custom URL (Optional)</label>
            <p className="text-sm text-slate-600 mb-3">
              Customize the last part of your URL. If left empty, it will be generated from your email.
            </p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-slate-500">http://localhost:5173/preview/</span>
              </div>
              <input 
                type="text"
                placeholder={generatedSlug || "your-custom-url"}
                value={formData.customUrl || ""}
                onChange={handleCustomUrlChange}
                className="w-full pl-64 pr-24 py-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {checkingUrl ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                ) : urlAvailable === true ? (
                  <span className="text-green-600 text-sm font-medium">✓ Available</span>
                ) : urlAvailable === false ? (
                  <span className="text-red-600 text-sm font-medium">✗ Taken</span>
                ) : null}
              </div>
            </div>
            
            {urlAvailable === false && !isFromLogin && (
              <p className="text-red-600 text-sm mt-2">
                This URL is already taken. Please choose a different one.
              </p>
            )}
            {urlAvailable === true && (
              <p className="text-green-600 text-sm mt-2">
                This URL is available! You can use it for your card.
              </p>
            )}
            
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Tips:</strong> Use letters, numbers, and hyphens only. No spaces or special characters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">Company & Organization Details</h3>
      
      <div>
        <label className="block text-slate-700 mb-1">Company Name</label>
        <input 
          type="text" 
          name="companyName"
          placeholder="Company name"
          value={formData.companyName || ""}
          onChange={handleChange}
          className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-700 mb-1">Department</label>
          <input 
            type="text" 
            name="department"
            placeholder="Department"
            value={formData.department || ""}
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-slate-700 mb-1">Job Title</label>
          <input 
            type="text" 
            name="jobTitle"
            placeholder="Job title"
            value={formData.jobTitle || ""}
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* NEW: Organization Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-700 mb-1">Founded Name</label>
          <input 
            type="text" 
            name="foundedName"
            placeholder="Name / found name"
            value={formData.foundedName || ""}
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-slate-700 mb-1">Organization</label>
          <input 
            type="text" 
            name="organization"
            placeholder="Contact/voice/Organization"
            value={formData.organization || ""}
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* NEW: Title Line */}
      <div>
        <label className="block text-slate-700 mb-1">Professional Title Line</label>
        <input 
          type="text" 
          name="titleLine"
          placeholder="e.g., Award-Winning Digital Marketer"
          value={formData.titleLine || ""}
          onChange={handleChange}
          className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-slate-700 mb-1">Bio</label>
        <textarea 
          name="bio"
          placeholder="Tell us about yourself..."
          value={formData.bio || ""}
          onChange={handleChange}
          rows="4"
          className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* NEW: About Text */}
      <div>
        <label className="block text-slate-700 mb-1">About Text</label>
        <textarea 
          name="aboutText"
          placeholder="Detailed information about you/your company"
          value={formData.aboutText || ""}
          onChange={handleChange}
          rows="4"
          className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* NEW: Services & Products Overview */}
      <div>
        <label className="block text-slate-700 mb-1">Services & Products Overview</label>
        <textarea 
          name="servicesProducts"
          placeholder="Brief description of your services and products"
          value={formData.servicesProducts || ""}
          onChange={handleChange}
          rows="3"
          className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* NEW: Brand Label */}
      <div>
        <label className="block text-slate-700 mb-1">Brand Label</label>
        <input 
          type="text" 
          name="brandLabel"
          placeholder="Bird Label Product/Services"
          value={formData.brandLabel || ""}
          onChange={handleChange}
          className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* NEW: Catalog */}
      <div>
        <label className="block text-slate-700 mb-1">Catalog</label>
        <input 
          type="text" 
          name="catalog"
          placeholder="Resolving/Catalog information"
          value={formData.catalog || ""}
          onChange={handleChange}
          className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Company Logo */}
      <div>
        <label className="block font-semibold text-slate-700 mb-2">Company Logo</label>
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
          {formData.companyLogo ? (
            <div className="flex flex-col items-center">
              <img src={formData.companyLogo} alt="Company Logo" className="max-w-32 max-h-32 object-contain mb-2" />
              <button 
                type="button"
                onClick={() => setFormData({...formData, companyLogo: null})}
                className="text-red-500 text-sm hover:text-red-700"
              >
                Remove Logo
              </button>
            </div>
          ) : (
            <>
              <p className="text-slate-500 mb-2">Drag file here or upload file</p>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleMainImageUpload("companyLogo", e)}
                className="hidden" 
                id="companyLogo"
              />
              <label 
                htmlFor="companyLogo"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors"
              >
                Upload Logo
              </label>
            </>
          )}
        </div>
        
        <div className="mt-4">
          <label className="block text-slate-700 mb-1">Logo Size</label>
          <select 
            name="logoSize"
            value={formData.logoSize || "medium"}
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">Services & Products</h3>
      
      {/* Services Section */}
      <div className="border border-slate-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-slate-800 mb-4">Services</h4>
        
        {(formData.services || []).map((service, index) => (
          <div key={index} className="border border-slate-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-medium text-slate-700">Service {index + 1}</h5>
              {formData.services.length > 1 && (
                <button 
                  type="button"
                  onClick={() => removeArrayField("services", index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove Service
                </button>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-slate-700 mb-2">Service Image</label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                {service.image ? (
                  <div className="flex flex-col items-center">
                    <img src={service.image} alt="Service" className="max-w-32 max-h-32 object-contain mb-2" />
                    <button 
                      type="button"
                      onClick={() => handleArrayFieldChange("services", index, "image", null)}
                      className="text-red-500 text-sm hover:text-red-700"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-slate-500 mb-2">Upload service image</p>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleServiceProductImageUpload("services", index, e)}
                      className="hidden" 
                      id={`service-image-${index}`}
                    />
                    <label 
                      htmlFor={`service-image-${index}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors"
                    >
                      Upload Image
                    </label>
                  </>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-slate-700 mb-1">Service Name</label>
                <input 
                  type="text"
                  placeholder="e.g., Web Development"
                  value={service.name || ""}
                  onChange={(e) => handleArrayFieldChange("services", index, "name", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-slate-700 mb-1">Category</label>
                <select 
                  value={service.category || ""}
                  onChange={(e) => handleArrayFieldChange("services", index, "category", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="design">Design</option>
                  <option value="development">Development</option>
                  <option value="consulting">Consulting</option>
                  <option value="marketing">Marketing</option>
                  <option value="training">Training</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-slate-700 mb-1">Description</label>
              <textarea 
                placeholder="Describe your service..."
                value={service.description || ""}
                onChange={(e) => handleArrayFieldChange("services", index, "description", e.target.value)}
                rows="3"
                className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-slate-700 mb-1">Price</label>
                <input 
                  type="number"
                  placeholder="0.00"
                  value={service.price || ""}
                  onChange={(e) => handleArrayFieldChange("services", index, "price", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-slate-700 mb-1">Currency</label>
                <select 
                  value={service.currency || "USD"}
                  onChange={(e) => handleArrayFieldChange("services", index, "currency", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="CAD">CAD (C$)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-slate-700 mb-1">Duration</label>
                <input 
                  type="text"
                  placeholder="e.g., 2 weeks, 1 hour"
                  value={service.duration || ""}
                  onChange={(e) => handleArrayFieldChange("services", index, "duration", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
        
        <button 
          type="button"
          onClick={() => addArrayField("services", {
            name: "",
            description: "",
            price: "",
            currency: "USD",
            duration: "",
            category: "",
            image: null
          })}
          className="w-full border-2 border-dashed border-slate-300 rounded-lg p-4 text-slate-500 hover:text-slate-700 hover:border-slate-400 transition-colors duration-200"
        >
          + Add Another Service
        </button>
      </div>

      {/* Products Section */}
      <div className="border border-slate-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-slate-800 mb-4">Products</h4>
        
        {(formData.products || []).map((product, index) => (
          <div key={index} className="border border-slate-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-medium text-slate-700">Product {index + 1}</h5>
              {formData.products.length > 1 && (
                <button 
                  type="button"
                  onClick={() => removeArrayField("products", index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove Product
                </button>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-slate-700 mb-2">Product Image</label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                {product.image ? (
                  <div className="flex flex-col items-center">
                    <img src={product.image} alt="Product" className="max-w-32 max-h-32 object-contain mb-2" />
                    <button 
                      type="button"
                      onClick={() => handleArrayFieldChange("products", index, "image", null)}
                      className="text-red-500 text-sm hover:text-red-700"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-slate-500 mb-2">Upload product image</p>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleServiceProductImageUpload("products", index, e)}
                      className="hidden" 
                      id={`product-image-${index}`}
                    />
                    <label 
                      htmlFor={`product-image-${index}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors"
                    >
                      Upload Image
                    </label>
                  </>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-slate-700 mb-1">Product Name</label>
                <input 
                  type="text"
                  placeholder="e.g., E-book, Software License"
                  value={product.name || ""}
                  onChange={(e) => handleArrayFieldChange("products", index, "name", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-slate-700 mb-1">Category</label>
                <select 
                  value={product.category || ""}
                  onChange={(e) => handleArrayFieldChange("products", index, "category", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="digital">Digital Product</option>
                  <option value="physical">Physical Product</option>
                  <option value="software">Software</option>
                  <option value="book">Book/E-book</option>
                  <option value="course">Online Course</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-slate-700 mb-1">Description</label>
              <textarea 
                placeholder="Describe your product..."
                value={product.description || ""}
                onChange={(e) => handleArrayFieldChange("products", index, "description", e.target.value)}
                rows="3"
                className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-slate-700 mb-1">Price</label>
                <input 
                  type="number"
                  placeholder="0.00"
                  value={product.price || ""}
                  onChange={(e) => handleArrayFieldChange("products", index, "price", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-slate-700 mb-1">Currency</label>
                <select 
                  value={product.currency || "USD"}
                  onChange={(e) => handleArrayFieldChange("products", index, "currency", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="CAD">CAD (C$)</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <label className="flex items-center text-slate-700">
                  <input 
                    type="checkbox"
                    checked={product.inStock !== undefined ? product.inStock : true}
                    onChange={(e) => handleArrayFieldChange("products", index, "inStock", e.target.checked)}
                    className="mr-2"
                  />
                  In Stock
                </label>
              </div>
            </div>
          </div>
        ))}
        
        <button 
          type="button"
          onClick={() => addArrayField("products", {
            name: "",
            description: "",
            price: "",
            currency: "USD",
            category: "",
            image: null,
            inStock: true
          })}
          className="w-full border-2 border-dashed border-slate-300 rounded-lg p-4 text-slate-500 hover:text-slate-700 hover:border-slate-400 transition-colors duration-200"
        >
          + Add Another Product
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">Contact Details</h3>
      
      {/* Address Section */}
      <div className="border border-slate-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-slate-800 mb-4">Addresses</h4>
        
        {(formData.addresses || []).map((address, index) => (
          <div key={index} className="border border-slate-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-medium text-slate-700">
                {address.isPrimary ? "📍 Primary Address" : `Address ${index + 1}`}
              </h5>
              <div className="flex gap-2">
                {!address.isPrimary && (
                  <button 
                    type="button"
                    onClick={() => setPrimaryAddress(index)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Set Primary
                  </button>
                )}
                {(formData.addresses || []).length > 1 && (
                  <button 
                    type="button"
                    onClick={() => removeAddress(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-slate-700 mb-1">Label</label>
                <select 
                  value={address.label || "office"}
                  onChange={(e) => handleAddressChange(index, "label", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="office">Office</option>
                  <option value="home">Home</option>
                  <option value="headquarters">Headquarters</option>
                  <option value="branch">Branch</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-slate-700 mb-1">Street Address</label>
                <input 
                  type="text"
                  placeholder="123 Main Street"
                  value={address.street || ""}
                  onChange={(e) => handleAddressChange(index, "street", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-slate-700 mb-1">City</label>
                <input 
                  type="text"
                  placeholder="City"
                  value={address.city || ""}
                  onChange={(e) => handleAddressChange(index, "city", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-slate-700 mb-1">State</label>
                <input 
                  type="text"
                  placeholder="State"
                  value={address.state || ""}
                  onChange={(e) => handleAddressChange(index, "state", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-slate-700 mb-1">Postal Code</label>
                <input 
                  type="text"
                  placeholder="ZIP/Postal Code"
                  value={address.postalCode || ""}
                  onChange={(e) => handleAddressChange(index, "postalCode", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-slate-700 mb-1">Country</label>
                <input 
                  type="text"
                  placeholder="Country"
                  value={address.country || ""}
                  onChange={(e) => handleAddressChange(index, "country", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-slate-700 mb-1">Full Address (Auto-generated)</label>
              <textarea 
                placeholder="Full address will be generated automatically"
                value={address.fullAddress || ""}
                onChange={(e) => handleAddressChange(index, 'fullAddress', e.target.value)}
                rows="2"
                className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button 
                type="button"
                onClick={() => generateFullAddress(index)}
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
              >
                Generate Full Address
              </button>
            </div>
            
            <div>
              <label className="block text-slate-700 mb-1">Google Maps Link</label>
              <input 
                type="url"
                placeholder="https://maps.google.com/?q=..."
                value={address.googleMapsLink || ""}
                onChange={(e) => handleAddressChange(index, "googleMapsLink", e.target.value)}
                className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}
        
        <button 
          type="button"
          onClick={addAddress}
          className="w-full border-2 border-dashed border-slate-300 rounded-lg p-4 text-slate-500 hover:text-slate-700 hover:border-slate-400 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <FaMapMarkerAlt className="w-4 h-4" />
          + Add Another Address
        </button>
      </div>

      {/* Phones */}
      <div>
        <label className="block font-semibold text-slate-700 mb-2">Phone Numbers</label>
        {(formData.phones || []).map((phone, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <select 
              value={phone.label || "work"}
              onChange={(e) => handleArrayFieldChange("phones", index, "label", e.target.value)}
              className="p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="mobile">Mobile</option>
              <option value="other">Other</option>
            </select>
            <input 
              type="tel"
              placeholder="Phone number"
              value={phone.number || ""}
              onChange={(e) => handleArrayFieldChange("phones", index, "number", e.target.value)}
              className="flex-1 p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {(formData.phones || []).length > 1 && (
              <button 
                type="button"
                onClick={() => removeArrayField("phones", index)}
                className="bg-red-500 text-white px-3 rounded hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button 
          type="button"
          onClick={() => addArrayField("phones", { label: "work", number: "" })}
          className="text-blue-500 text-sm hover:text-blue-700"
        >
          + Add Phone Number
        </button>
      </div>

      {/* Websites */}
      <div>
        <label className="block font-semibold text-slate-700 mb-2">Websites</label>
        {(formData.websites || []).map((website, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <select 
              value={website.label || "personal"}
              onChange={(e) => handleArrayFieldChange("websites", index, "label", e.target.value)}
              className="p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="portfolio">Portfolio</option>
              <option value="other">Other</option>
            </select>
            <input 
              type="url"
              placeholder="Website URL"
              value={website.url || ""}
              onChange={(e) => handleArrayFieldChange("websites", index, "url", e.target.value)}
              className="flex-1 p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {(formData.websites || []).length > 1 && (
              <button 
                type="button"
                onClick={() => removeArrayField("websites", index)}
                className="bg-red-500 text-white px-3 rounded hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button 
          type="button"
          onClick={() => addArrayField("websites", { label: "personal", url: "" })}
          className="text-blue-500 text-sm hover:text-blue-700"
        >
          + Add Website
        </button>
      </div>

      {/* Social Media Links */}
      <div>
        <label className="block font-semibold text-slate-700 mb-4">Social Media Links</label>
        <p className="text-slate-600 text-sm mb-4">Click on any social media icon to add your profile link</p>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
          {Object.entries(socialMediaConfig).map(([platform, config]) => {
            const socialLink = (formData.socialLinks || []).find(link => link.platform === platform);
            const hasUrl = socialLink && socialLink.url;
            
            return (
              <div key={platform} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => {
                    setActiveSocialPlatform(activeSocialPlatform === platform ? "" : platform);
                  }}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 ${
                    hasUrl 
                      ? `${config.color} text-white shadow-md` 
                      : 'bg-slate-100 text-slate-400 hover:bg-slate-200 border-2 border-dashed border-slate-300'
                  } ${
                    activeSocialPlatform === platform ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                  }`}
                >
                  {config.icon}
                </button>
                <span className="mt-2 text-xs text-slate-600 font-medium">
                  {config.name}
                </span>
                {hasUrl && (
                  <div className="mt-1 w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Input box that appears under the active social media platform */}
        {activeSocialPlatform && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${socialMediaConfig[activeSocialPlatform].color}`}>
                  {socialMediaConfig[activeSocialPlatform].icon}
                </div>
                <span className="font-semibold text-slate-800">
                  Add {socialMediaConfig[activeSocialPlatform].name} Link
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveSocialPlatform("")}
                className="text-slate-500 hover:text-slate-700"
              >
                ×
              </button>
            </div>
            <div className="flex space-x-2">
              <input
                type="url"
                placeholder={socialMediaConfig[activeSocialPlatform].placeholder}
                defaultValue={(formData.socialLinks || []).find(link => link.platform === activeSocialPlatform)?.url || ""}
                className="flex-1 p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSocialLinkChange(activeSocialPlatform, e.target.value);
                  }
                }}
              />
              <button
                type="button"
                onClick={(e) => {
                  const input = e.target.previousElementSibling;
                  handleSocialLinkChange(activeSocialPlatform, input.value);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        )}
        
        {/* Show added links */}
        <div className="mt-6">
          {(formData.socialLinks || []).filter(link => link.url).length > 0 && (
            <>
              <h4 className="font-semibold text-slate-700 mb-3">Added Social Links:</h4>
              <div className="space-y-2">
                {(formData.socialLinks || [])
                  .filter(link => link.url)
                  .map((link) => (
                    <div key={link.platform} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${socialMediaConfig[link.platform].color}`}>
                          {socialMediaConfig[link.platform].icon}
                        </div>
                        <span className="font-medium text-slate-700">
                          {socialMediaConfig[link.platform].name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-500 truncate max-w-40">
                          {link.url}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleSocialLinkChange(link.platform, "")}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">Premium Features</h3>
      
      {/* Profile Video */}
      <div className="border border-slate-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-slate-800 mb-4">Profile Video</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-slate-700 mb-1">Video URL</label>
            <input 
              type="url"
              placeholder="https://youtube.com/your-video or direct video link"
              value={formData.profileVideo?.url || ""}
              onChange={(e) => setFormData({
                ...formData, 
                profileVideo: { ...formData.profileVideo, url: e.target.value }
              })}
              className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 mb-1">Video Title</label>
              <input 
                type="text"
                placeholder="Introduction Video"
                value={formData.profileVideo?.title || ""}
                onChange={(e) => setFormData({
                  ...formData, 
                  profileVideo: { ...formData.profileVideo, title: e.target.value }
                })}
                className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-slate-700 mb-1">Thumbnail URL</label>
              <input 
                type="url"
                placeholder="https://example.com/thumbnail.jpg"
                value={formData.profileVideo?.thumbnail || ""}
                onChange={(e) => setFormData({
                  ...formData, 
                  profileVideo: { ...formData.profileVideo, thumbnail: e.target.value }
                })}
                className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="border border-slate-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-slate-800 mb-4">Testimonials</h4>
        
        {formData.testimonials.map((testimonial, index) => (
          <div key={index} className="border border-slate-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-medium text-slate-700">Testimonial {index + 1}</h5>
              {formData.testimonials.length > 1 && (
                <button 
                  type="button"
                  onClick={() => removeTestimonial(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-slate-700 mb-1">Client Name</label>
                <input 
                  type="text"
                  placeholder="Client Name"
                  value={testimonial.clientName || ""}
                  onChange={(e) => handleTestimonialChange(index, "clientName", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-slate-700 mb-1">Rating</label>
                <select 
                  value={testimonial.rating || 5}
                  onChange={(e) => handleTestimonialChange(index, "rating", parseInt(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-slate-700 mb-1">Testimonial</label>
              <textarea 
                placeholder="What did the client say?"
                value={testimonial.testimonial || ""}
                onChange={(e) => handleTestimonialChange(index, "testimonial", e.target.value)}
                rows="3"
                className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-slate-700 mb-1">Date</label>
              <input 
                type="date"
                value={testimonial.date || ""}
                onChange={(e) => handleTestimonialChange(index, "date", e.target.value)}
                className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}
        
        <button 
          type="button"
          onClick={addTestimonial}
          className="w-full border-2 border-dashed border-slate-300 rounded-lg p-4 text-slate-500 hover:text-slate-700 hover:border-slate-400 transition-colors duration-200"
        >
          + Add Testimonial
        </button>
      </div>

      {/* Client List */}
      <div className="border border-slate-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-slate-800 mb-4">Client List</h4>
        
        <div className="space-y-3">
          {formData.clientList.map((client, index) => (
            <div key={index} className="flex items-center gap-2">
              <input 
                type="text"
                placeholder="Client company name"
                value={client || ""}
                onChange={(e) => {
                  const updatedList = [...formData.clientList];
                  updatedList[index] = e.target.value;
                  setFormData({ ...formData, clientList: updatedList });
                }}
                className="flex-1 p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button 
                type="button"
                onClick={() => {
                  const updatedList = formData.clientList.filter((_, i) => i !== index);
                  setFormData({ ...formData, clientList: updatedList });
                }}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        
        <button 
          type="button"
          onClick={() => setFormData({
            ...formData,
            clientList: [...formData.clientList, ""]
          })}
          className="w-full border-2 border-dashed border-slate-300 rounded-lg p-4 text-slate-500 hover:text-slate-700 hover:border-slate-400 transition-colors duration-200 mt-4"
        >
          + Add Client
        </button>
      </div>

      {/* Downloads */}
      <div className="border border-slate-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-slate-800 mb-4">Downloads</h4>
        
        {formData.downloads.map((download, index) => (
          <div key={index} className="border border-slate-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-medium text-slate-700">Download {index + 1}</h5>
              {formData.downloads.length > 1 && (
                <button 
                  type="button"
                  onClick={() => removeDownload(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-slate-700 mb-1">File Name</label>
                <input 
                  type="text"
                  placeholder="e.g., Company Brochure"
                  value={download.name || ""}
                  onChange={(e) => handleDownloadChange(index, "name", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-slate-700 mb-1">File URL</label>
                <input 
                  type="url"
                  placeholder="https://example.com/file.pdf"
                  value={download.fileUrl || ""}
                  onChange={(e) => handleDownloadChange(index, "fileUrl", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 mb-1">File Type</label>
                <input 
                  type="text"
                  placeholder="e.g., PDF, DOCX, ZIP"
                  value={download.fileType || ""}
                  onChange={(e) => handleDownloadChange(index, "fileType", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-slate-700 mb-1">File Size</label>
                <input 
                  type="text"
                  placeholder="e.g., 2.5 MB"
                  value={download.fileSize || ""}
                  onChange={(e) => handleDownloadChange(index, "fileSize", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
        
        <button 
          type="button"
          onClick={addDownload}
          className="w-full border-2 border-dashed border-slate-300 rounded-lg p-4 text-slate-500 hover:text-slate-700 hover:border-slate-400 transition-colors duration-200"
        >
          + Add Download
        </button>
      </div>

      {/* Interactive Elements */}
      <div className="border border-slate-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-slate-800 mb-4">Interactive Elements</h4>
        
        {formData.interactiveElements.map((element, index) => (
          <div key={index} className="border border-slate-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-medium text-slate-700">Element {index + 1}</h5>
              {formData.interactiveElements.length > 1 && (
                <button 
                  type="button"
                  onClick={() => removeInteractiveElement(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                  >
                  Remove
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-slate-700 mb-1">Type</label>
                <select 
                  value={element.type || "call-to-action"}
                  onChange={(e) => handleInteractiveElementChange(index, "type", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="call-to-action">Call to Action</option>
                  <option value="live-chat">Live Chat</option>
                  <option value="appointment-scheduler">Appointment Scheduler</option>
                  <option value="digital-payments">Digital Payments</option>
                  <option value="shop-flow">Shop Flow</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <label className="flex items-center text-slate-700">
                  <input 
                    type="checkbox"
                    checked={element.isActive !== undefined ? element.isActive : true}
                    onChange={(e) => handleInteractiveElementChange(index, "isActive", e.target.checked)}
                    className="mr-2"
                  />
                  Active
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-slate-700 mb-1">Configuration (JSON)</label>
              <textarea 
                placeholder='{"buttonText": "Book Now", "redirectUrl": "https://..."}'
                value={JSON.stringify(element.config || {}, null, 2)}
                onChange={(e) => {
                  try {
                    const config = JSON.parse(e.target.value);
                    handleInteractiveElementChange(index, "config", config);
                  } catch (error) {
                    // Invalid JSON, don't update
                  }
                }}
                rows="4"
                className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono text-sm"
              />
            </div>
          </div>
        ))}
        
        <button 
          type="button"
          onClick={addInteractiveElement}
          className="w-full border-2 border-dashed border-slate-300 rounded-lg p-4 text-slate-500 hover:text-slate-700 hover:border-slate-400 transition-colors duration-200"
        >
          + Add Interactive Element
        </button>
      </div>
    </div>
  );

  const renderDesignSelection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">Choose Your Card Design</h3>
      <p className="text-slate-600 mb-6">Select a design template for your digital business card</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {designTemplates.map((template) => (
          <div
            key={template.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              formData.design === template.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-slate-300 hover:border-slate-400 hover:shadow-md'
            }`}
            onClick={() => handleDesignSelect(template.id)}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-lg ${template.preview} flex items-center justify-center text-white font-bold text-sm`}>
                Preview
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800">{template.name}</h4>
                <p className="text-sm text-slate-600">{template.description}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 ${
                formData.design === template.id
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-slate-300'
              } flex items-center justify-center`}>
                {formData.design === template.id && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {!formData.design && (
        <p className="text-red-500 text-sm mt-2">Please select a design theme</p>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <WarningPopup />
      
      <h2 className="text-2xl font-bold mb-6 text-slate-800">
        {editingCard ? "Edit Business Card" : "Create Business Card"}
      </h2>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -z-10"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-blue-500 -z-10 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
        ></div>
        
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                currentStep >= step 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              {step}
            </div>
            <span className="mt-2 text-sm font-medium text-slate-700">
              {step === 1 ? 'PERSONAL' : 
               step === 2 ? 'COMPANY' : 
               step === 3 ? 'SERVICES' : 
               step === 4 ? 'CONTACT' : 
               'PREMIUM'}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-6 min-h-96">
          {showDesignSelection ? (
            renderDesignSelection()
          ) : (
            <>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}
            </>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={prevStep}
            disabled={(currentStep === 1 && !showDesignSelection) || loading}
            className={`px-6 py-2 rounded transition-colors ${
              (currentStep === 1 && !showDesignSelection) 
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                : 'bg-slate-500 text-white hover:bg-slate-600'
            }`}
          >
            BACK
          </button>

          <div className="flex flex-col items-center">
            <div className={`text-sm ${
              saveStatus.includes("Saving") ? "text-blue-500" : 
              saveStatus.includes("success") ? "text-green-500" : 
              saveStatus.includes("Error") ? "text-red-500" : "text-gray-500"
            }`}>
              {saveStatus}
            </div>
          </div>

          {showDesignSelection ? (
            <button
              type="button"
              onClick={handleFinalSubmit}
              disabled={loading || !formData.design}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded shadow-md hover:from-blue-600 hover:to-purple-700 disabled:from-blue-300 disabled:to-purple-400 transition-colors"
            >
              {loading ? "Creating..." : `${editingCard ? 'Update' : 'Create'} Card`}
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
            >
              {currentStep === 5 ? "CHOOSE DESIGN" : "NEXT"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateCard;