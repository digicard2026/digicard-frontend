import React, { useState, useEffect, useRef, useCallback } from "react";
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
  FaPhone,
  FaClock,
  FaStore,
  FaHeadset,
  FaCreditCard as FaCard,
  FaFileAlt,
  FaShieldAlt,
  FaCrown,
  FaGem,
  FaTimes,
  FaUserTie,
  FaArrowLeft
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CARD_URL } from "../../../src/utility/constants";
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || "";
const VITE_API_URL = import.meta.env.VITE_API_URL || "";

// Card plans configuration
const cardPlans = {
  'Personal': {
    name: 'Personal',
    description: 'Basic digital card with essential features',
    icon: <FaBuilding className="w-5 h-5" />,
    color: 'blue',
    features: [
      'Profile Page',
      'Profile Photo/Logo',
      'Name/Source Name',
      'Tag Line/Slogan',
      'Profile Video',
      'About Myself',
      'Contact Management',
      'One-tap Call, WhatsApp, Email',
      'Website/Portfolio Link',
      'Location [Address]',
      'Social & Digital Hub',
      'Dynamic QR Code',
      'Share',
      'NFC Card Development with Print',
      'Downloads',
      'Videos'
    ],
    price: 'Free'
  },
  'Business': {
    name: 'Business',
    description: 'Enhanced features for professional presence',
    icon: <FaGem className="w-5 h-5" />,
    color: 'purple',
    features: [
      'Profile Page',
      'Profile Photo/Logo',
      'Name/Source Name',
      'Tag Line/Slogan',
      'Company Name/Organization',
      'Profile Video',
      'About Myself/Company/Organization',
      'Contact Management',
      'One-tap Call, WhatsApp, Email',
      'Website/Portfolio Link',
      'Location [Address]',
      'Virtual Number Integration (Optional at extra cost)',
      'Business Hours',
      'Professional/Business Details',
      'Services/Provision',
      'Brief about Product/Services',
      'Product Showcase/Gallery/Portfolio',
      'Product/Catalog [PDF]',
      'Product Video',
      'Testimonials',
      'Social & Digital Hub',
      'Dynamic QR Code',
      'Share',
      'NFC Card Development with Print',
      'Downloads',
      'Videos'
    ],
    price: '$9.99/month'
  },
  'Business Premium': {
    name: 'Business Premium',
    description: 'Advanced features with interactive elements',
    icon: <FaCrown className="w-5 h-5" />,
    color: 'gold',
    features: [
      'Profile Page',
      'Profile Photo/Logo',
      'Name/Source Name',
      'Tag Line/Slogan',
      'Company Name/Organization',
      'Profile Video',
      'About Myself/Company/Organization',
      'Contact Management',
      'One-tap Call, WhatsApp, Email',
      'Website/Portfolio Link',
      'Location [Address]',
      'Virtual Number Integration (Optional at extra cost)',
      'Business Hours',
      'Professional/Business Details',
      'Services/Provision',
      'Individual Product Display',
      'Product Showcase/Gallery/Portfolio',
      'Testimonials / Client List',
      'Product Video',
      'Social & Digital Hub',
      'Interactive Elements',
      'Call-to-Action',
      'Live Chat – WhatsApp / Messages',
      'Appointment Scheduler',
      'Digital Payments',
      'Lead / Contact Form',
      'Chat Assistant',
      'Dynamic QR Code',
      'Share',
      'NFC Card Development with Print',
      'Downloads',
      'Videos'
    ],
    price: '$19.99/month'
  }
};

// Field visibility configuration based on plans
const fieldPlanMap = {
  // Personal Info Fields
  'prefix': ['Personal', 'Business', 'Business Premium'],
  'firstName': ['Personal', 'Business', 'Business Premium'],
  'lastName': ['Personal', 'Business', 'Business Premium'],
  'suffix': ['Personal', 'Business', 'Business Premium'],
  'profilePhoto': ['Personal', 'Business', 'Business Premium'],
  
  // Profile Page Fields
  'profileVideo': ['Personal', 'Business', 'Business Premium'],
  'titleLine': ['Personal', 'Business', 'Business Premium'],
  'aboutText': ['Personal', 'Business', 'Business Premium'],
  
  // Professional/Personal Details
  'companyName': ['Business', 'Business Premium'],
  'department': ['Business', 'Business Premium'],
  'jobTitle': ['Personal', 'Business', 'Business Premium'],
  'bio': ['Personal', 'Business', 'Business Premium'],
  'companyLogo': ['Business', 'Business Premium'],
  'logoSize': ['Business', 'Business Premium'],
  'foundedName': ['Business Premium'],
  'organization': ['Business', 'Business Premium'],
  'servicesProducts': ['Business', 'Business Premium'],
  'brandLabel': ['Business Premium'],
  'productRangeDisplay': ['Business Premium'],
  'catalog': ['Business', 'Business Premium'],
  'catalogPDF': ['Business', 'Business Premium'],
  'productVideo': ['Business', 'Business Premium'],
  
  // Contact Details
  'phones': ['Personal', 'Business', 'Business Premium'],
  'websites': ['Personal', 'Business', 'Business Premium'],
  'addresses': ['Personal', 'Business', 'Business Premium'],
  'virtualNumber': ['Business', 'Business Premium'],
  
  // Services & Products
  'services': ['Business Premium'],
  'products': ['Business Premium'],
  
  // Interactive Elements
  'interactiveElements': ['Business Premium'],
  
  // Premium Features
  'testimonials': ['Business', 'Business Premium'],
  'clientList': ['Business Premium'],
  'gallery': ['Business', 'Business Premium'],
  'dynamicQRCode': ['Personal', 'Business', 'Business Premium'],
  'nfcSettings': ['Personal', 'Business', 'Business Premium'],
  'downloads': ['Personal', 'Business', 'Business Premium'],
  'videos': ['Personal', 'Business', 'Business Premium'],
  
  // New Contact Management Fields
  'enableOneTapCall': ['Personal', 'Business', 'Business Premium'],
  'enableWhatsApp': ['Personal', 'Business', 'Business Premium'],
  'enableEmail': ['Personal', 'Business', 'Business Premium'],
  'businessHours': ['Business', 'Business Premium'],
  
  // Chat & Assistant Fields
  'chatAssistant': ['Business Premium'],
  'liveChat': ['Business Premium']
};

// Function to clean form data by removing empty fields
const cleanFormData = (data) => {
  const optimized = {
    // Personal Info
    ...(data.prefix && { prefix: data.prefix }),
    firstName: data.firstName || "",
    ...(data.lastName && { lastName: data.lastName }),
    ...(data.suffix && { suffix: data.suffix }),
    ...(data.profilePhoto && { profilePhoto: data.profilePhoto }),
    
    // Email
    email: data.email,
    
    // Card Type
    cardType: data.cardType || 'Personal',
    
    // Include createdBy field
    ...(data.createdBy && { createdBy: data.createdBy }),
    
    // URL Customization
    ...(data.customUrl && { customUrl: data.customUrl }),
    urlSlug: data.urlSlug,
    isPublic: data.isPublic !== undefined ? data.isPublic : true,
    
    // Profile Page Fields
    ...(data.profileVideo?.url && { profileVideo: data.profileVideo }),
    ...(data.titleLine && { titleLine: data.titleLine }),
    ...(data.aboutText && { aboutText: data.aboutText }),
    
    // Professional/Personal Details
    ...(data.companyName && { companyName: data.companyName }),
    ...(data.department && { department: data.department }),
    ...(data.jobTitle && { jobTitle: data.jobTitle }),
    ...(data.bio && { bio: data.bio }),
    ...(data.companyLogo && { companyLogo: data.companyLogo }),
    logoSize: data.logoSize,
    ...(data.foundedName && { foundedName: data.foundedName }),
    ...(data.organization && { organization: data.organization }),
    ...(data.servicesProducts && { servicesProducts: data.servicesProducts }),
    ...(data.brandLabel && { brandLabel: data.brandLabel }),
    ...(data.productRangeDisplay && { productRangeDisplay: data.productRangeDisplay }),
    ...(data.catalog && { catalog: data.catalog }),
    ...(data.catalogPDF && { catalogPDF: data.catalogPDF }),
    ...(data.productVideo?.url && { productVideo: data.productVideo }),
    ...(data.virtualNumber && { virtualNumber: data.virtualNumber }),
    
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
    
    // Interactive Elements
    interactiveElements: data.interactiveElements
      .filter(element => element.type)
      .map(element => ({
        type: element.type,
        ...(element.config && { config: element.config }),
        isActive: element.isActive !== undefined ? element.isActive : true,
        position: element.position || 0
      })),
    
    // Premium Features
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
    
    ...(data.clientList && data.clientList.length > 0 && {
      clientList: data.clientList.filter(client => client.trim() !== "")
    }),
    
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
    
    ...(data.dynamicQRCode?.targetUrl && { dynamicQRCode: data.dynamicQRCode }),
    
    ...(data.nfcSettings && { nfcSettings: data.nfcSettings }),
    
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

    // Videos
    ...(data.videos && data.videos.length > 0 && {
      videos: data.videos
        .filter(video => video.url && video.url.trim() !== "")
        .map(video => ({
          type: video.type || 'youtube',
          url: video.url,
          ...(video.thumbnail && { thumbnail: video.thumbnail }),
          ...(video.title && { title: video.title }),
          ...(video.description && { description: video.description })
        }))
    }),

    // Chat Features
    ...(data.chatAssistant && { chatAssistant: data.chatAssistant }),
    ...(data.liveChat && { liveChat: data.liveChat }),

    // Contact Management
    enableOneTapCall: data.enableOneTapCall !== undefined ? data.enableOneTapCall : true,
    enableWhatsApp: data.enableWhatsApp !== undefined ? data.enableWhatsApp : true,
    enableEmail: data.enableEmail !== undefined ? data.enableEmail : true,
    
    // Business Hours
    ...(data.businessHours && { businessHours: data.businessHours }),
    
    // Design
    design: data.design,
    cardLayout: data.cardLayout
  };

  console.log(`📤 Final payload size: ${JSON.stringify(optimized).length} bytes`);
  
  return optimized;
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

// Interactive Elements Configuration
const interactiveElementsConfig = {
  'call-to-action': {
    name: 'Call to Action',
    icon: <FaComments className="w-5 h-5" />,
    description: 'Schedule meetings and calls'
  },
  'shop-flow': {
    name: 'Shop Now',
    icon: <FaShoppingCart className="w-5 h-5" />,
    description: 'E-commerce integration'
  },
  'live-chat': {
    name: 'Live Chat',
    icon: <FaHeadset className="w-5 h-5" />,
    description: 'WhatsApp/Messages integration'
  },
  'appointment-scheduler': {
    name: 'Appointment Scheduler',
    icon: <FaCalendarAlt className="w-5 h-5" />,
    description: 'Book appointments directly'
  },
  'digital-payments': {
    name: 'Digital Payments',
    icon: <FaCreditCard className="w-5 h-5" />,
    description: 'Accept payments online'
  },
  'lead-form': {
    name: 'Lead Form',
    icon: <FaFileAlt className="w-5 h-5" />,
    description: 'Capture lead information'
  },
  'contact-form': {
    name: 'Contact Form',
    icon: <FaEnvelope className="w-5 h-5" />,
    description: 'Direct contact form'
  },
  'language-switcher': {
    name: 'Language Switcher',
    icon: <FaLanguage className="w-5 h-5" />,
    description: 'Multi-language support'
  }
};

const CreateCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get plan from navigation state
  const selectedPlanFromState = location.state?.selectedPlan || 'Personal';
  const userEmailFromSignIn = location.state?.userEmail || '';
  const editingCard = location.state?.card || null;
  const partnerIdFromState = location.state?.createdBy || '';

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
  
  // URL Slug States
  const [checkingUrl, setCheckingUrl] = useState(false);
  const [urlAvailable, setUrlAvailable] = useState(null);
  const [copied, setCopied] = useState(false);
  const [generatedSlug, setGeneratedSlug] = useState("");

  // Partner ID state
  const [partnerId, setPartnerId] = useState(partnerIdFromState || "");
  const [isPartnerFlow, setIsPartnerFlow] = useState(!!partnerIdFromState);
  const [showPartnerIdField, setShowPartnerIdField] = useState(!partnerIdFromState);

  // Auto-save states
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const autoSaveTimeoutRef = useRef(null);
  const formDataRef = useRef(null);
  const [changeCount, setChangeCount] = useState(0);
  const [isFromLogin, setIsFromLogin] = useState(false);

  // Field visibility based on selected plan
  const isFieldVisible = (fieldName) => {
    const allowedPlans = fieldPlanMap[fieldName] || [];
    return allowedPlans.includes(formData.cardType);
  };

  // Helper function to check if any field in a section is visible
  const isSectionVisible = (fieldNames) => {
    return fieldNames.some(fieldName => isFieldVisible(fieldName));
  };

  // Get available steps based on plan
  const getAvailableSteps = () => {
    const steps = [1]; // Step 1 is always available
    
    // Check Step 2
    const step2Fields = ['companyName', 'department', 'jobTitle', 'bio', 'companyLogo', 'logoSize', 'foundedName', 'organization', 'servicesProducts', 'brandLabel', 'catalog', 'businessHours', 'virtualNumber', 'catalogPDF', 'productVideo'];
    if (isSectionVisible(step2Fields)) {
      steps.push(2);
    }
    
    // Step 3 is always available (has social links)
    steps.push(3);
    
    // Check Step 4
    const step4Fields = ['interactiveElements', 'testimonials', 'gallery', 'dynamicQRCode', 'nfcSettings', 'downloads', 'videos', 'chatAssistant', 'liveChat'];
    if (isSectionVisible(step4Fields)) {
      steps.push(4);
    }
    
    // Step 5 is always DESIGN SELECTION
    steps.push(5);
    
    return steps;
  };

  // Check if current step is the design step
  const isDesignStep = () => {
    return currentStep === 5;
  };

  // Check if current step is the last content step before design
  const isLastContentStep = () => {
    const availableSteps = getAvailableSteps();
    // Find the last step before design (step 5)
    const contentSteps = availableSteps.filter(step => step < 5);
    return currentStep === Math.max(...contentSteps);
  };

  // INITIAL FORM STATE
  const initialFormState = {
    // Personal Info
    prefix: "",
    firstName: "",
    lastName: "",
    suffix: "",
    profilePhoto: null,
    
    // Email
    email: userEmailFromSignIn || "",
    
    // Card Type
    cardType: selectedPlanFromState,
    
    // Partner ID field
    createdBy: partnerIdFromState || "",
    
    // URL Customization
    customUrl: "",
    urlSlug: "",
    isPublic: true,
    
    // Profile Page Fields
    profileVideo: {
      url: "",
      thumbnail: "",
      title: ""
    },
    titleLine: "",
    aboutText: "",
    
    // Professional/Personal Details
    companyName: "",
    department: "",
    jobTitle: "",
    bio: "",
    companyLogo: null,
    logoSize: "medium",
    foundedName: "",
    organization: "",
    servicesProducts: "",
    brandLabel: "",
    productRangeDisplay: "grid",
    catalog: "",
    catalogPDF: null,
    productVideo: {
      url: "",
      thumbnail: "",
      title: ""
    },
    virtualNumber: "",
    
    // Contact Details
    phones: [{ label: "work", number: "" }],
    websites: [{ label: "personal", url: "" }],
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
    
    // Interactive Elements
    interactiveElements: [],
    
    // Premium Features
    testimonials: [],
    clientList: [],
    gallery: [],
    dynamicQRCode: {
      type: "dynamic",
      targetUrl: "",
      qrImage: "",
      scans: 0
    },
    nfcSettings: {
      isEnabled: false,
      nfcId: "",
      lastUsed: null
    },
    downloads: [],
    videos: [],
    
    // Chat Features
    chatAssistant: {
      isEnabled: false,
      welcomeMessage: "Hello! How can I help you today?",
      responses: []
    },
    liveChat: {
      isEnabled: false,
      platform: "whatsapp",
      phoneNumber: ""
    },

    // Contact Management
    enableOneTapCall: true,
    enableWhatsApp: true,
    enableEmail: true,
    
    // Business Hours
    businessHours: {
      monday: { open: '09:00', close: '17:00' },
      tuesday: { open: '09:00', close: '17:00' },
      wednesday: { open: '09:00', close: '17:00' },
      thursday: { open: '09:00', close: '17:00' },
      friday: { open: '09:00', close: '17:00' },
      saturday: { open: '', close: '' },
      sunday: { open: '', close: '' }
    },
    
    // Design
    design: "",
    cardLayout: "standard"
  };

  // INITIALIZE FORM DATA
  const [formData, setFormData] = useState(initialFormState);

  // Initialize ref
  useEffect(() => {
    formDataRef.current = formData;
  }, []);

  // Handle partner ID change
  const handlePartnerIdChange = (e) => {
    const value = e.target.value;
    setPartnerId(value);
    const updatedData = { ...formData, createdBy: value };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    autoSaveToLocalStorage(updatedData);
  };

  // Toggle partner ID field
  const togglePartnerIdField = () => {
    setShowPartnerIdField(!showPartnerIdField);
    if (showPartnerIdField) {
      setPartnerId("");
      const updatedData = { ...formData, createdBy: "" };
      setFormData(updatedData);
      formDataRef.current = updatedData;
      setHasUnsavedChanges(true);
      setChangeCount(prev => prev + 1);
      autoSaveToLocalStorage(updatedData);
    }
  };

  // Ensure cardType is set from navigation state
  useEffect(() => {
    if (selectedPlanFromState && !editingCard) {
      setFormData(prev => ({
        ...prev,
        cardType: selectedPlanFromState,
        createdBy: partnerIdFromState || ""
      }));
    }
  }, [selectedPlanFromState, editingCard, partnerIdFromState]);

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email change
  const handleEmailChange = async (e) => {
    const email = e.target.value;
    const updatedData = { ...formData, email };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    setEmailError("");
    
    if (email && !validateEmail(email)) {
      setEmailError("Please enter a valid email address");
    }
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    autoSaveToLocalStorage(updatedData);
  };

  // ✅ LOCAL STORAGE AUTO-SAVE FUNCTION
  const autoSaveToLocalStorage = useCallback((data) => {
    if (editingCard) return; // Don't auto-save when editing
    
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    
    autoSaveTimeoutRef.current = setTimeout(() => {
      try {
        const storageData = {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          cardType: data.cardType,
          customUrl: data.customUrl,
          urlSlug: data.urlSlug,
          createdBy: data.createdBy,
          design: data.design,
          formData: {
            ...data,
            profilePhoto: data.profilePhoto ? 'SAVED' : null,
            companyLogo: data.companyLogo ? 'SAVED' : null,
            catalogPDF: data.catalogPDF ? 'SAVED' : null,
            services: data.services?.map(service => ({
              ...service,
              image: service.image ? 'SAVED' : null
            })),
            products: data.products?.map(product => ({
              ...product,
              image: product.image ? 'SAVED' : null
            })),
            gallery: data.gallery?.map(item => ({
              ...item,
              url: item.url ? 'SAVED' : null,
              thumbnail: item.thumbnail ? 'SAVED' : null
            }))
          },
          timestamp: new Date().toISOString(),
          step: currentStep,
          plan: data.cardType
        };
        
        localStorage.setItem(`card_draft_${data.email || 'anonymous'}`, JSON.stringify(storageData));
        localStorage.setItem(`card_draft_form_${data.email || 'anonymous'}`, JSON.stringify(data));
        
        setHasUnsavedChanges(false);
        
        console.log('💾 Auto-saved to localStorage');
      } catch (error) {
        console.error('LocalStorage save error:', error);
      }
    }, 1500);
  }, [currentStep, editingCard]);

  // ✅ LOAD DRAFT FROM LOCALSTORAGE
  const loadDraftFromLocalStorage = useCallback(() => {
    try {
      const email = userEmailFromSignIn || formData.email || 'anonymous';
      const savedFormData = localStorage.getItem(`card_draft_form_${email}`);
      
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        
        setFormData(prev => {
          const merged = {
            ...prev,
            ...parsedData,
            phones: parsedData.phones || prev.phones,
            websites: parsedData.websites || prev.websites,
            addresses: parsedData.addresses || prev.addresses,
            socialLinks: parsedData.socialLinks || prev.socialLinks,
            services: parsedData.services || prev.services,
            products: parsedData.products || prev.products,
            testimonials: parsedData.testimonials || prev.testimonials,
            gallery: parsedData.gallery || prev.gallery,
            interactiveElements: parsedData.interactiveElements || prev.interactiveElements,
            downloads: parsedData.downloads || prev.downloads,
            videos: parsedData.videos || prev.videos,
            chatAssistant: parsedData.chatAssistant || prev.chatAssistant,
            liveChat: parsedData.liveChat || prev.liveChat
          };
          
          formDataRef.current = merged;
          return merged;
        });
        
        const draftInfo = localStorage.getItem(`card_draft_${email}`);
        if (draftInfo) {
          const info = JSON.parse(draftInfo);
          if (info.step) setCurrentStep(info.step);
          if (info.createdBy) setPartnerId(info.createdBy);
        }
        
        setHasUnsavedChanges(false);
        console.log('✅ Draft loaded from localStorage');
      }
    } catch (error) {
      console.error('Error loading draft:', error);
    }
  }, [userEmailFromSignIn, formData.email]);

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
    const updatedData = { ...formData, customUrl: value, urlSlug: value };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
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
    return `${FRONTEND_URL}/preview/${slug}`;
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
    const updatedData = { ...formData, [name]: value };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  // Handle array field changes
  const handleArrayFieldChange = (field, index, subField, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = { ...updatedArray[index], [subField]: value };
    const updatedData = { ...formData, [field]: updatedArray };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  // Handle social link change
  const handleSocialLinkChange = (platform, url) => {
    const updatedSocialLinks = formData.socialLinks.map(link => 
      link.platform === platform 
        ? { ...link, url }
        : link
    );
    const updatedData = { ...formData, socialLinks: updatedSocialLinks };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
    
    setActiveSocialPlatform("");
  };

  // Add array field
  const addArrayField = (field, defaultItem) => {
    const updatedData = {
      ...formData,
      [field]: [...formData[field], defaultItem]
    };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  // Remove array field
  const removeArrayField = (field, index) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    const updatedData = { ...formData, [field]: updatedArray };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
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
      const updatedData = { ...formData, [field]: updatedArray };
      
      setFormData(updatedData);
      formDataRef.current = updatedData;
      
      setHasUnsavedChanges(true);
      setChangeCount(prev => prev + 1);
      
      autoSaveToLocalStorage(updatedData);
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
      const updatedData = { ...formData, [field]: base64Image };
      
      setFormData(updatedData);
      formDataRef.current = updatedData;
      
      setHasUnsavedChanges(true);
      setChangeCount(prev => prev + 1);
      
      autoSaveToLocalStorage(updatedData);
    };
    reader.readAsDataURL(file);
  };

  // Handle PDF upload
  const handleCatalogPDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64PDF = e.target.result;
      const updatedData = { ...formData, catalogPDF: base64PDF };
      
      setFormData(updatedData);
      formDataRef.current = updatedData;
      
      setHasUnsavedChanges(true);
      setChangeCount(prev => prev + 1);
      
      autoSaveToLocalStorage(updatedData);
    };
    reader.readAsDataURL(file);
  };

  // Address Field Handlers
  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...formData.addresses];
    updatedAddresses[index] = { ...updatedAddresses[index], [field]: value };
    const updatedData = { ...formData, addresses: updatedAddresses };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  const addAddress = () => {
    const updatedData = {
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
    };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  const removeAddress = (index) => {
    const updatedAddresses = formData.addresses.filter((_, i) => i !== index);
    const updatedData = { ...formData, addresses: updatedAddresses };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  const setPrimaryAddress = (index) => {
    const updatedAddresses = formData.addresses.map((address, i) => ({
      ...address,
      isPrimary: i === index
    }));
    const updatedData = { ...formData, addresses: updatedAddresses };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
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
    const updatedData = { ...formData, testimonials: updatedTestimonials };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  const handleGalleryChange = (index, field, value) => {
    const updatedGallery = [...formData.gallery];
    updatedGallery[index] = { ...updatedGallery[index], [field]: value };
    const updatedData = { ...formData, gallery: updatedGallery };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  const handleInteractiveElementChange = (index, field, value) => {
    const updatedElements = [...formData.interactiveElements];
    updatedElements[index] = { ...updatedElements[index], [field]: value };
    const updatedData = { ...formData, interactiveElements: updatedElements };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  const handleDownloadChange = (index, field, value) => {
    const updatedDownloads = [...formData.downloads];
    updatedDownloads[index] = { ...updatedDownloads[index], [field]: value };
    const updatedData = { ...formData, downloads: updatedDownloads };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  // Handle virtual number change
  const handleVirtualNumberChange = (e) => {
    const updatedData = { ...formData, virtualNumber: e.target.value };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  // Handle product video change
  const handleProductVideoChange = (field, value) => {
    const updatedData = {
      ...formData,
      productVideo: { ...formData.productVideo, [field]: value }
    };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  // Handle video change
  const handleVideoChange = (index, field, value) => {
    const updatedVideos = [...formData.videos];
    updatedVideos[index] = { ...updatedVideos[index], [field]: value };
    const updatedData = { ...formData, videos: updatedVideos };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  // Handle chat assistant toggle
  const handleChatAssistantToggle = (e) => {
    const updatedData = {
      ...formData,
      chatAssistant: {
        ...formData.chatAssistant,
        isEnabled: e.target.checked
      }
    };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  // Handle live chat change
  const handleLiveChatChange = (field, value) => {
    const updatedData = {
      ...formData,
      liveChat: { ...formData.liveChat, [field]: value }
    };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  // Add new array items
  const addTestimonial = () => {
    const updatedData = {
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
    };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  const addGalleryItem = () => {
    const updatedData = {
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
    };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  const addInteractiveElement = (type) => {
    const updatedData = {
      ...formData,
      interactiveElements: [
        ...formData.interactiveElements,
        {
          type: type,
          config: {},
          isActive: true,
          position: formData.interactiveElements.length
        }
      ]
    };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  const addDownload = () => {
    const updatedData = {
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
    };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  const addVideo = () => {
    const updatedData = {
      ...formData,
      videos: [
        ...formData.videos,
        {
          type: 'youtube',
          url: "",
          thumbnail: "",
          title: "",
          description: ""
        }
      ]
    };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  // Remove array items
  const removeTestimonial = (index) => {
    const updatedTestimonials = formData.testimonials.filter((_, i) => i !== index);
    const updatedData = { ...formData, testimonials: updatedTestimonials };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  const removeGalleryItem = (index) => {
    const updatedGallery = formData.gallery.filter((_, i) => i !== index);
    const updatedData = { ...formData, gallery: updatedGallery };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  const removeInteractiveElement = (index) => {
    const updatedElements = formData.interactiveElements.filter((_, i) => i !== index);
    const updatedData = { ...formData, interactiveElements: updatedElements };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  const removeDownload = (index) => {
    const updatedDownloads = formData.downloads.filter((_, i) => i !== index);
    const updatedData = { ...formData, downloads: updatedDownloads };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  const removeVideo = (index) => {
    const updatedVideos = formData.videos.filter((_, i) => i !== index);
    const updatedData = { ...formData, videos: updatedVideos };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  // Validate current step
  const validateCurrentStep = () => {
    if (isDesignStep()) {
      if (!formData.design?.trim()) {
        setWarningMessage("Please select a design theme before creating your card!");
        return false;
      }
      return true;
    }
    
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
        if (!formData.firstName?.trim()) {
          setWarningMessage("Please fill in your First Name before moving to the next step!");
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const nextStep = () => {
    if (!validateCurrentStep()) {
      setShowWarning(true);
      return;
    }
    
    const availableSteps = getAvailableSteps();
    const currentIndex = availableSteps.indexOf(currentStep);
    
    if (currentIndex < availableSteps.length - 1) {
      const nextStepIndex = availableSteps[currentIndex + 1];
      setCurrentStep(nextStepIndex);
      
      if (nextStepIndex === 5) {
        setShowDesignSelection(true);
      }
    }
  };

  const prevStep = () => {
    const availableSteps = getAvailableSteps();
    const currentIndex = availableSteps.indexOf(currentStep);
    
    if (currentIndex > 0) {
      const prevStepIndex = availableSteps[currentIndex - 1];
      setCurrentStep(prevStepIndex);
      
      if (currentStep === 5) {
        setShowDesignSelection(false);
      }
    }
  };

  // ✅ FIXED: Updated saveCardToBackend function for editing
  const saveCardToBackend = async (cardData) => {
    try {
      setLoading(true);
      setSaveStatus("Saving card...");
      
      const cleanedData = cleanFormData(cardData);
      
      console.log("📤 Saving card data:", {
        editing: !!editingCard,
        email: cleanedData.email,
        firstName: cleanedData.firstName,
        design: cleanedData.design,
        createdBy: cleanedData.createdBy,
        urlSlug: cleanedData.urlSlug
      });
      
      // For editing: preserve the existing URL slug
      if (editingCard && editingCard._id) {
        // Keep the original URL slug when editing
        cleanedData.urlSlug = editingCard.urlSlug || cleanedData.urlSlug;
        
        // Use the update endpoint
        const url = `${CARD_URL}/update-card/${editingCard._id}`;
        console.log("🔄 Updating existing card at:", url);
        
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cleanedData)
        });
        
        const responseText = await response.text();
        console.log("📨 Update response:", responseText.substring(0, 200));
        
        if (!response.ok) {
          console.error('❌ Update error status:', response.status);
          
          if (responseText.includes('duplicate') && responseText.includes('urlSlug')) {
            throw new Error('This URL is already taken by another card.');
          }
          
          if (responseText.includes('Card not found')) {
            throw new Error('Card not found. It may have been deleted.');
          }
          
          throw new Error(`Update failed (${response.status}): ${responseText.substring(0, 100)}`);
        }
        
        const responseData = JSON.parse(responseText);
        setSaveStatus("🎉 Card updated successfully!");
        console.log("✅ Update successful:", responseData);
        
        return responseData.card || responseData;
      } else {
        // For new cards
        console.log("🆕 Creating new card");
        
        const response = await fetch(`${CARD_URL}/create-card`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cleanedData)
        });
        
        const responseText = await response.text();
        
        if (!response.ok) {
          console.error('❌ Create error:', response.status, responseText);
          
          if (responseText.includes('Email already has')) {
            throw new Error('A card already exists for this email. Please login to edit your existing card.');
          }
          
          throw new Error(`Creation failed (${response.status}): ${responseText.substring(0, 100)}`);
        }
        
        const responseData = JSON.parse(responseText);
        setSaveStatus("🎉 Card created successfully!");
        console.log("✅ Creation successful:", responseData);
        
        return responseData.card || responseData;
      }
      
    } catch (error) {
      console.error('❌ Error saving card:', error);
      setSaveStatus(`Error: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleDesignSelect = (designId) => {
    const updatedData = { ...formData, design: designId };
    
    setFormData(updatedData);
    formDataRef.current = updatedData;
    
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
    
    autoSaveToLocalStorage(updatedData);
  };

  // ✅ FIXED: handleFinalSubmit function
  const handleFinalSubmit = async () => {
    try {
      setLoading(true);
      
      // Validate design is selected
      if (!formData.design || formData.design.trim() === "") {
        setWarningMessage("Please select a design theme before creating your card!");
        setShowWarning(true);
        setLoading(false);
        return;
      }
      
      // Validate required fields
      if (!formData.email || !validateEmail(formData.email)) {
        setWarningMessage("Please enter a valid email address!");
        setShowWarning(true);
        setLoading(false);
        return;
      }
      
      if (!formData.firstName || formData.firstName.trim() === "") {
        setWarningMessage("Please enter your first name!");
        setShowWarning(true);
        setLoading(false);
        return;
      }
      
      console.log("🚀 Final submit - Editing mode:", !!editingCard);
      
      // Save the card
      const result = await saveCardToBackend(formData);
      
      // Get the URL
      const shareUrl = `${FRONTEND_URL}/preview/${result.urlSlug || formData.urlSlug}`;
      
      // Show success message
      alert(`🎉 Card ${editingCard ? 'updated' : 'created'} successfully!\n\n🔗 Your shareable URL:\n${shareUrl}`);
      
      // Copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      
      // Clear local storage if this was a new card
      if (!editingCard && formData.email) {
        localStorage.removeItem(`card_draft_${formData.email}`);
        localStorage.removeItem(`card_draft_form_${formData.email}`);
      }
      
      // Navigate to preview
      navigate(`/preview/${result.urlSlug || formData.urlSlug}`);
      
    } catch (error) {
      console.error('❌ Final submit error:', error);
      setSaveStatus(`Error: ${error.message}`);
      alert(`Failed to ${editingCard ? 'update' : 'create'} card: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Go Back to Dashboard
  const handleGoBackDashboard = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      );
      if (!confirmLeave) return;
    }
    navigate('/card-dashbord');
  };

  // UseEffects
  useEffect(() => {
    if (userEmailFromSignIn && validateEmail(userEmailFromSignIn) && !editingCard) {
      setIsFromLogin(true);
    }
  }, [userEmailFromSignIn, editingCard]);

  // ✅ FIXED: Load editing card data properly
  useEffect(() => {
    if (editingCard) {
      console.log("📝 Loading editing card data:", editingCard._id);
      
      // Ensure all fields are properly loaded
      const loadedData = {
        ...initialFormState,
        ...editingCard,
        // Ensure arrays are properly set
        phones: editingCard.phones || initialFormState.phones,
        websites: editingCard.websites || initialFormState.websites,
        addresses: editingCard.addresses || initialFormState.addresses,
        socialLinks: editingCard.socialLinks || initialFormState.socialLinks,
        services: editingCard.services || initialFormState.services,
        products: editingCard.products || initialFormState.products,
        testimonials: editingCard.testimonials || initialFormState.testimonials,
        gallery: editingCard.gallery || initialFormState.gallery,
        interactiveElements: editingCard.interactiveElements || initialFormState.interactiveElements,
        downloads: editingCard.downloads || initialFormState.downloads,
        videos: editingCard.videos || initialFormState.videos,
        // Ensure design is set
        design: editingCard.design || "",
        // Ensure createdBy is set
        createdBy: editingCard.createdBy || ""
      };
      
      setFormData(loadedData);
      formDataRef.current = loadedData;
      
      if (editingCard.urlSlug) {
        setGeneratedSlug(editingCard.urlSlug);
      }
      
      // Always go to design step when editing
      setTimeout(() => {
        const availableSteps = getAvailableSteps();
        if (availableSteps.includes(5)) {
          setCurrentStep(5);
          setShowDesignSelection(true);
        }
      }, 300);
      
      setIsFromLogin(true);
      setHasUnsavedChanges(false);
    }
  }, [editingCard]);

  useEffect(() => {
    if (formData.email && !editingCard && !formData.customUrl) {
      const emailSlug = formData.email.split('@')[0].toLowerCase();
      const cleanSlug = emailSlug.replace(/[^a-z0-9]/g, '-');
      setGeneratedSlug(cleanSlug);
      const updatedData = { ...formData, urlSlug: cleanSlug };
      setFormData(updatedData);
      formDataRef.current = updatedData;
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

  // ✅ LOAD DRAFT ON MOUNT
  useEffect(() => {
    if (editingCard) {
      // Don't load drafts for editing
      console.log("Editing mode - skipping draft load");
      return;
    }
    
    const timeoutId = setTimeout(() => {
      loadDraftFromLocalStorage();
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [editingCard, loadDraftFromLocalStorage]);

  // ✅ BROWSER WARNING FOR UNSAVED CHANGES
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        const message = 'You have unsaved changes. Are you sure you want to leave?';
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [hasUnsavedChanges]);

  // ✅ SAVE TO LOCALSTORAGE ON FORM CHANGES
  useEffect(() => {
    if (changeCount > 0 && !editingCard) {
      autoSaveToLocalStorage(formData);
    }
  }, [changeCount, formData, editingCard, autoSaveToLocalStorage]);

  // RENDER FUNCTIONS

  // Step 1: Profile Page
  const renderProfilePage = () => {
    const profileSectionFields = ['prefix', 'firstName', 'lastName', 'suffix', 'profilePhoto', 'profileVideo', 'titleLine', 'aboutText'];
    const urlSectionFields = ['customUrl', 'urlSlug'];
    
    const shouldShowProfileSection = isSectionVisible(profileSectionFields);
    const shouldShowUrlSection = isSectionVisible(urlSectionFields);

    if (!shouldShowProfileSection && !shouldShowUrlSection) {
      return (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">
            No profile fields available for your current plan ({formData.cardType}).
          </p>
          <p className="text-slate-400 text-sm mt-2">
            Upgrade your plan to access more features.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Profile Photo */}
        {isFieldVisible('profilePhoto') && (
          <div className="mb-6">
            <label className="block font-semibold text-slate-700 mb-2">Profile Photo</label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
              {formData.profilePhoto ? (
                <div className="flex flex-col items-center">
                  <img src={formData.profilePhoto} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-2" />
                  <button 
                    type="button"
                    onClick={() => {
                      const updatedData = { ...formData, profilePhoto: null };
                      setFormData(updatedData);
                      formDataRef.current = updatedData;
                      setHasUnsavedChanges(true);
                      setChangeCount(prev => prev + 1);
                      autoSaveToLocalStorage(updatedData);
                    }}
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
        )}

        {/* Personal Info */}
        {(isFieldVisible('prefix') || isFieldVisible('firstName') || isFieldVisible('lastName') || isFieldVisible('suffix')) && (
          <>
            {isFieldVisible('prefix') && (
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
            )}

            {isFieldVisible('firstName') && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-1">First Name *</label>
                  <input 
                    type="text" 
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                
                {isFieldVisible('lastName') && (
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
                )}
              </div>
            )}
          </>
        )}

        {/* Email Field */}
        <div>
          <label className="block text-slate-700 mb-1">Email Address *</label>
          <input 
            type="email" 
            name="email"
            placeholder="your.email@example.com"
            required
            value={formData.email || ""}
            onChange={handleEmailChange}
            className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50"
            readOnly={editingCard} // Make email read-only when editing
          />
          {userEmailFromSignIn && (
            <p className="text-green-600 text-sm mt-1">✓ Email auto-filled from your account</p>
          )}
          {editingCard && (
            <p className="text-blue-600 text-sm mt-1">Email cannot be changed when editing</p>
          )}
        </div>

        {/* Profile Video */}
        {isFieldVisible('profileVideo') && (
          <div className="border border-slate-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
              <FaVideo className="w-5 h-5 text-blue-500 mr-2" />
              Profile Video
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-700 mb-1">Video URL</label>
                <input 
                  type="url"
                  placeholder="https://youtube.com/your-video or direct video link"
                  value={formData.profileVideo?.url || ""}
                  onChange={(e) => {
                    const updatedData = {
                      ...formData, 
                      profileVideo: { ...formData.profileVideo, url: e.target.value }
                    };
                    setFormData(updatedData);
                    formDataRef.current = updatedData;
                    setHasUnsavedChanges(true);
                    setChangeCount(prev => prev + 1);
                    autoSaveToLocalStorage(updatedData);
                  }}
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
                    onChange={(e) => {
                      const updatedData = {
                        ...formData, 
                        profileVideo: { ...formData.profileVideo, title: e.target.value }
                      };
                      setFormData(updatedData);
                      formDataRef.current = updatedData;
                      setHasUnsavedChanges(true);
                      setChangeCount(prev => prev + 1);
                      autoSaveToLocalStorage(updatedData);
                    }}
                    className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-slate-700 mb-1">Thumbnail URL</label>
                  <input 
                    type="url"
                    placeholder="https://example.com/thumbnail.jpg"
                    value={formData.profileVideo?.thumbnail || ""}
                    onChange={(e) => {
                      const updatedData = {
                        ...formData, 
                        profileVideo: { ...formData.profileVideo, thumbnail: e.target.value }
                      };
                      setFormData(updatedData);
                      formDataRef.current = updatedData;
                      setHasUnsavedChanges(true);
                      setChangeCount(prev => prev + 1);
                      autoSaveToLocalStorage(updatedData);
                    }}
                    className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Title Line */}
        {isFieldVisible('titleLine') && (
          <div>
            <label className="block text-slate-700 mb-1">Tag Line / Recognition</label>
            <input 
              type="text" 
              name="titleLine"
              placeholder="e.g., Award-Winning Digital Marketer"
              value={formData.titleLine || ""}
              onChange={handleChange}
              className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        )}

        {/* About Text */}
        {isFieldVisible('aboutText') && (
          <div>
            <label className="block text-slate-700 mb-1">About Myself / Company / Organisation</label>
            <textarea 
              name="aboutText"
              placeholder="Tell us about yourself, your company, or organization..."
              value={formData.aboutText || ""}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        )}

        {/* URL Customization Section */}
        {shouldShowUrlSection && (
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
                    Share this URL to let people view your digital card
                  </p>
                </div>
              )}

              {/* Custom URL Input - Disabled when editing */}
              <div>
                <label className="block text-slate-700 mb-2 font-medium">Custom URL {editingCard ? '(Cannot change when editing)' : '(Optional)'}</label>
                <p className="text-sm text-slate-600 mb-3">
                  {editingCard 
                    ? 'URL cannot be changed after card creation.' 
                    : 'Customize the last part of your URL. If left empty, it will be generated from your email.'}
                </p>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-500">www.reveya.com/preview/</span>
                  </div>
                  <input 
                    type="text"
                    placeholder={generatedSlug || "your-custom-url"}
                    value={formData.customUrl || ""}
                    onChange={handleCustomUrlChange}
                    className="w-full pl-64 pr-24 py-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    disabled={editingCard} // Disable when editing
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
                
                {!editingCard && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Tips:</strong> Use letters, numbers, and hyphens only. No spaces or special characters.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Step 2: Professional/Personal Details
  const renderProfessionalDetails = () => {
    const professionalFields = [
      'companyName', 'department', 'jobTitle', 'bio', 'companyLogo', 'logoSize',
      'foundedName', 'organization', 'servicesProducts', 'brandLabel', 'catalog', 'businessHours',
      'virtualNumber', 'catalogPDF', 'productVideo'
    ];
    
    const shouldShowProfessionalSection = isSectionVisible(professionalFields);

    if (!shouldShowProfessionalSection) {
      return (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">
            No professional details available for your current plan ({formData.cardType}).
          </p>
          <p className="text-slate-400 text-sm mt-2">
            Upgrade to Business or Business Premium plan for professional features.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Company Details */}
        {isFieldVisible('companyName') && (
          <div>
            <label className="block text-slate-700 mb-1">Company Name / Organisation</label>
            <input 
              type="text" 
              name="companyName"
              placeholder="Company name"
              value={formData.companyName || ""}
              onChange={handleChange}
              className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        )}

        {(isFieldVisible('department') || isFieldVisible('jobTitle')) && (
          <div className="grid grid-cols-2 gap-4">
            {isFieldVisible('department') && (
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
            )}
            
            {isFieldVisible('jobTitle') && (
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
            )}
          </div>
        )}

        {/* Organization Fields */}
        {(isFieldVisible('foundedName') || isFieldVisible('organization')) && (
          <div className="grid grid-cols-2 gap-4">
            {isFieldVisible('foundedName') && (
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
            )}
            
            {isFieldVisible('organization') && (
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
            )}
          </div>
        )}

        {isFieldVisible('bio') && (
          <div>
            <label className="block text-slate-700 mb-1">Bio</label>
            <textarea 
              name="bio"
              placeholder="Professional biography..."
              value={formData.bio || ""}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Services & Products Overview */}
        {isFieldVisible('servicesProducts') && (
          <div>
            <label className="block text-slate-700 mb-1">Brief about Products/Services</label>
            <textarea 
              name="servicesProducts"
              placeholder="Brief description of your services and products"
              value={formData.servicesProducts || ""}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Brand Label */}
        {isFieldVisible('brandLabel') && (
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
        )}

        {/* Catalog */}
        {isFieldVisible('catalog') && (
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
        )}

        {/* Virtual Number */}
        {isFieldVisible('virtualNumber') && (
          <div>
            <label className="block text-slate-700 mb-1">Virtual Number (Optional)</label>
            <input 
              type="tel" 
              placeholder="+1 (555) 123-4567"
              value={formData.virtualNumber || ""}
              onChange={handleVirtualNumberChange}
              className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <p className="text-sm text-slate-500 mt-1">Optional virtual number at extra cost</p>
          </div>
        )}

        {/* Company Logo */}
        {isFieldVisible('companyLogo') && (
          <div>
            <label className="block font-semibold text-slate-700 mb-2">Company Logo</label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
              {formData.companyLogo ? (
                <div className="flex flex-col items-center">
                  <img src={formData.companyLogo} alt="Company Logo" className="max-w-32 max-h-32 object-contain mb-2" />
                  <button 
                    type="button"
                    onClick={() => {
                      const updatedData = { ...formData, companyLogo: null };
                      setFormData(updatedData);
                      formDataRef.current = updatedData;
                      setHasUnsavedChanges(true);
                      setChangeCount(prev => prev + 1);
                      autoSaveToLocalStorage(updatedData);
                    }}
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
            
            {isFieldVisible('logoSize') && (
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
            )}
          </div>
        )}

        {/* Catalog PDF */}
        {isFieldVisible('catalogPDF') && (
          <div>
            <label className="block font-semibold text-slate-700 mb-2">Product Catalog PDF</label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
              {formData.catalogPDF ? (
                <div className="flex flex-col items-center">
                  <FaFilePdf className="w-12 h-12 text-red-500 mb-2" />
                  <p className="text-sm text-slate-600 mb-2">Catalog PDF uploaded</p>
                  <button 
                    type="button"
                    onClick={() => {
                      const updatedData = { ...formData, catalogPDF: null };
                      setFormData(updatedData);
                      formDataRef.current = updatedData;
                      setHasUnsavedChanges(true);
                      setChangeCount(prev => prev + 1);
                      autoSaveToLocalStorage(updatedData);
                    }}
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Remove PDF
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-slate-500 mb-2">Upload PDF catalog</p>
                  <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={handleCatalogPDFUpload}
                    className="hidden" 
                    id="catalogPDF"
                  />
                  <label 
                    htmlFor="catalogPDF"
                    className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors"
                  >
                    Upload PDF
                  </label>
                </>
              )}
            </div>
          </div>
        )}

        {/* Product Video */}
        {isFieldVisible('productVideo') && (
          <div className="border border-slate-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
              <FaVideo className="w-5 h-5 text-red-500 mr-2" />
              Product/Service Video
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-700 mb-1">Video URL</label>
                <input 
                  type="url"
                  placeholder="https://youtube.com/your-product-video"
                  value={formData.productVideo?.url || ""}
                  onChange={(e) => handleProductVideoChange('url', e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-1">Video Title</label>
                  <input 
                    type="text"
                    placeholder="Product Demonstration"
                    value={formData.productVideo?.title || ""}
                    onChange={(e) => handleProductVideoChange('title', e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-slate-700 mb-1">Thumbnail URL</label>
                  <input 
                    type="url"
                    placeholder="https://example.com/thumbnail.jpg"
                    value={formData.productVideo?.thumbnail || ""}
                    onChange={(e) => handleProductVideoChange('thumbnail', e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Business Hours */}
        {isFieldVisible('businessHours') && (
          <div className="border border-slate-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <FaClock className="w-5 h-5 text-blue-500 mr-2" />
              Business Hours
            </h4>
            
            <div className="space-y-4">
              {[
                { day: 'Monday', key: 'monday' },
                { day: 'Tuesday', key: 'tuesday' },
                { day: 'Wednesday', key: 'wednesday' },
                { day: 'Thursday', key: 'thursday' },
                { day: 'Friday', key: 'friday' },
                { day: 'Saturday', key: 'saturday' },
                { day: 'Sunday', key: 'sunday' }
              ].map(({ day, key }) => (
                <div key={key} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700 w-24">{day}</span>
                  <div className="flex items-center space-x-4 flex-1 max-w-md">
                    <select 
                      value={formData.businessHours?.[key]?.open || ''}
                      onChange={(e) => {
                        const updatedData = {
                          ...formData,
                          businessHours: {
                            ...formData.businessHours,
                            [key]: {
                              ...formData.businessHours?.[key],
                              open: e.target.value
                            }
                          }
                        };
                        setFormData(updatedData);
                        formDataRef.current = updatedData;
                        setHasUnsavedChanges(true);
                        setChangeCount(prev => prev + 1);
                        autoSaveToLocalStorage(updatedData);
                      }}
                      className="p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Closed</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                    </select>
                    <span className="text-slate-500">to</span>
                    <select 
                      value={formData.businessHours?.[key]?.close || ''}
                      onChange={(e) => {
                        const updatedData = {
                          ...formData,
                          businessHours: {
                            ...formData.businessHours,
                            [key]: {
                              ...formData.businessHours?.[key],
                              close: e.target.value
                            }
                          }
                        };
                        setFormData(updatedData);
                        formDataRef.current = updatedData;
                        setHasUnsavedChanges(true);
                        setChangeCount(prev => prev + 1);
                        autoSaveToLocalStorage(updatedData);
                      }}
                      className="p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Closed</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="20:00">8:00 PM</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Step 3: Contact Management & Social Hub
  const renderContactAndSocial = () => {
    const contactFields = [
      'enableOneTapCall', 'enableWhatsApp', 'enableEmail', 'phones', 'websites', 'addresses'
    ];
    
    const shouldShowContactSection = isSectionVisible(contactFields);

    return (
      <div className="space-y-6">
        {/* Contact Management Section */}
        {isFieldVisible('enableOneTapCall') && (
          <div className="border border-slate-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <FaComments className="w-5 h-5 text-green-500 mr-2" />
              One-Tap Contact
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Call */}
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mr-3">
                    <FaPhone className="w-5 h-5" />
                  </div>
                  <h5 className="font-semibold text-slate-800">Call</h5>
                </div>
                <p className="text-sm text-slate-600 mb-3">Enable one-tap calling</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Status:</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={formData.enableOneTapCall || false}
                      onChange={(e) => {
                        const updatedData = { ...formData, enableOneTapCall: e.target.checked };
                        setFormData(updatedData);
                        formDataRef.current = updatedData;
                        setHasUnsavedChanges(true);
                        setChangeCount(prev => prev + 1);
                        autoSaveToLocalStorage(updatedData);
                      }}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mr-3">
                    <FaWhatsapp className="w-5 h-5" />
                  </div>
                  <h5 className="font-semibold text-slate-800">WhatsApp</h5>
                </div>
                <p className="text-sm text-slate-600 mb-3">Enable WhatsApp chat</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Status:</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={formData.enableWhatsApp || false}
                      onChange={(e) => {
                        const updatedData = { ...formData, enableWhatsApp: e.target.checked };
                        setFormData(updatedData);
                        formDataRef.current = updatedData;
                        setHasUnsavedChanges(true);
                        setChangeCount(prev => prev + 1);
                        autoSaveToLocalStorage(updatedData);
                      }}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
              </div>

              {/* Email */}
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-3">
                    <FaEnvelope className="w-5 h-5" />
                  </div>
                  <h5 className="font-semibold text-slate-800">Email</h5>
                </div>
                <p className="text-sm text-slate-600 mb-3">Enable email contact</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Status:</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={formData.enableEmail !== undefined ? formData.enableEmail : true}
                      onChange={(e) => {
                        const updatedData = { ...formData, enableEmail: e.target.checked };
                        setFormData(updatedData);
                        formDataRef.current = updatedData;
                        setHasUnsavedChanges(true);
                        setChangeCount(prev => prev + 1);
                        autoSaveToLocalStorage(updatedData);
                      }}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phones */}
        {isFieldVisible('phones') && (
          <div className="border border-slate-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <FaPhone className="w-5 h-5 text-blue-500 mr-2" />
              Phone Numbers
            </h4>
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
        )}

        {/* Websites */}
        {isFieldVisible('websites') && (
          <div className="border border-slate-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <FaGlobe className="w-5 h-5 text-blue-500 mr-2" />
              Websites & Portfolio Links
            </h4>
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
        )}

        {/* Address Section */}
        {isFieldVisible('addresses') && (
          <div className="border border-slate-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <FaMapMarkerAlt className="w-5 h-5 text-blue-500 mr-2" />
              Location & Addresses
            </h4>
            
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
        )}

        {/* Social & Digital Hub Section */}
        <div className="border border-slate-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">Social Media Links</h4>
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
  };

  // Step 4: Interactive Elements & Premium Features
  const renderInteractiveAndPremium = () => {
    const premiumFields = [
      'interactiveElements', 'testimonials', 'gallery', 'dynamicQRCode', 'nfcSettings', 'downloads',
      'videos', 'chatAssistant', 'liveChat'
    ];
    
    const shouldShowPremiumSection = isSectionVisible(premiumFields);

    if (!shouldShowPremiumSection) {
      return (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">
            No premium features available for your current plan ({formData.cardType}).
          </p>
          <p className="text-slate-400 text-sm mt-2">
            Upgrade to Business or Business Premium plan for premium features.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Interactive Elements Section */}
        {isFieldVisible('interactiveElements') && (
          <>
            <div className="border border-slate-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">Available Interactive Elements</h4>
              <p className="text-slate-600 text-sm mb-6">Click on any element to add it to your card</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {Object.entries(interactiveElementsConfig).map(([type, config]) => (
                  <div
                    key={type}
                    className="border border-slate-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all duration-200"
                    onClick={() => addInteractiveElement(type)}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        {config.icon}
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-800">{config.name}</h5>
                        <p className="text-xs text-slate-500">{config.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-blue-500 text-sm font-medium">+ Add</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Configured Interactive Elements */}
              {formData.interactiveElements.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">Configured Elements</h4>
                  {formData.interactiveElements.map((element, index) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                            {interactiveElementsConfig[element.type]?.icon}
                          </div>
                          <h5 className="font-medium text-slate-700">
                            {interactiveElementsConfig[element.type]?.name || element.type}
                          </h5>
                        </div>
                        <div className="flex items-center space-x-2">
                          <label className="flex items-center text-slate-700 text-sm">
                            <input 
                              type="checkbox"
                              checked={element.isActive !== undefined ? element.isActive : true}
                              onChange={(e) => handleInteractiveElementChange(index, "isActive", e.target.checked)}
                              className="mr-2"
                            />
                            Active
                          </label>
                          <button 
                            type="button"
                            onClick={() => removeInteractiveElement(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
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
                </div>
              )}
            </div>
          </>
        )}

        {/* Premium Features Section */}
        {(isFieldVisible('testimonials') || isFieldVisible('gallery') || isFieldVisible('downloads') || isFieldVisible('dynamicQRCode') || isFieldVisible('nfcSettings')) && (
          <>
            {/* Testimonials */}
            {isFieldVisible('testimonials') && (
              <div className="border border-slate-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-4">Testimonials & Client List</h4>
                
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
            )}

            {/* Gallery */}
            {isFieldVisible('gallery') && (
              <div className="border border-slate-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-4">Product Gallery & Portfolio</h4>
                
                {formData.gallery.map((item, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="font-medium text-slate-700">Gallery Item {index + 1}</h5>
                      {formData.gallery.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => removeGalleryItem(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    {/* Enhanced Image Upload Section */}
                    <div className="mb-4">
                      <label className="block text-slate-700 mb-2">Gallery Image</label>
                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                        {item.url ? (
                          <div className="flex flex-col items-center">
                            <img src={item.url} alt="Gallery" className="max-w-48 max-h-48 object-contain mb-2 rounded-lg" />
                            <div className="flex space-x-2">
                              <button 
                                type="button"
                                onClick={() => {
                                  const input = document.createElement('input');
                                  input.type = 'file';
                                  input.accept = 'image/*';
                                  input.onchange = (e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (e) => {
                                        handleGalleryChange(index, "url", e.target.result);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  };
                                  input.click();
                                }}
                                className="text-blue-500 text-sm hover:text-blue-700"
                              >
                                Change Image
                              </button>
                              <button 
                                type="button"
                                onClick={() => handleGalleryChange(index, "url", "")}
                                className="text-red-500 text-sm hover:text-red-700"
                              >
                                Remove Image
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-slate-500 mb-2">Drag and drop image or click to upload</p>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    handleGalleryChange(index, "url", e.target.result);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden" 
                              id={`gallery-image-${index}`}
                            />
                            <label 
                              htmlFor={`gallery-image-${index}`}
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
                        <label className="block text-slate-700 mb-1">Type</label>
                        <select 
                          value={item.type || "image"}
                          onChange={(e) => handleGalleryChange(index, "type", e.target.value)}
                          className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                          <option value="document">Document</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-slate-700 mb-1">Category</label>
                        <input 
                          type="text"
                          placeholder="e.g., Portfolio, Products, Team"
                          value={item.category || ""}
                          onChange={(e) => handleGalleryChange(index, "category", e.target.value)}
                          className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-slate-700 mb-1">Title</label>
                      <input 
                        type="text"
                        placeholder="Item title"
                        value={item.title || ""}
                        onChange={(e) => handleGalleryChange(index, "title", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-slate-700 mb-1">Description</label>
                      <textarea 
                        placeholder="Item description"
                        value={item.description || ""}
                        onChange={(e) => handleGalleryChange(index, "description", e.target.value)}
                        rows="2"
                        className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
                
                <button 
                  type="button"
                  onClick={addGalleryItem}
                  className="w-full border-2 border-dashed border-slate-300 rounded-lg p-4 text-slate-500 hover:text-slate-700 hover:border-slate-400 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FaPlus className="w-4 h-4" />
                  Add Gallery Item
                </button>
              </div>
            )}

            {/* Downloads */}
            {isFieldVisible('downloads') && (
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
            )}

            {/* Videos Section */}
            {isFieldVisible('videos') && (
              <div className="border border-slate-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-4">Videos</h4>
                
                {formData.videos.map((video, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="font-medium text-slate-700">Video {index + 1}</h5>
                      {formData.videos.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => removeVideo(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-slate-700 mb-1">Video Type</label>
                        <select 
                          value={video.type || "youtube"}
                          onChange={(e) => handleVideoChange(index, "type", e.target.value)}
                          className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="youtube">YouTube</option>
                          <option value="vimeo">Vimeo</option>
                          <option value="direct">Direct Link</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-slate-700 mb-1">Video URL</label>
                        <input 
                          type="url"
                          placeholder="https://youtube.com/watch?v=..."
                          value={video.url || ""}
                          onChange={(e) => handleVideoChange(index, "url", e.target.value)}
                          className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-slate-700 mb-1">Video Title</label>
                        <input 
                          type="text"
                          placeholder="Video title"
                          value={video.title || ""}
                          onChange={(e) => handleVideoChange(index, "title", e.target.value)}
                          className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-slate-700 mb-1">Thumbnail URL</label>
                        <input 
                          type="url"
                          placeholder="https://example.com/thumbnail.jpg"
                          value={video.thumbnail || ""}
                          onChange={(e) => handleVideoChange(index, "thumbnail", e.target.value)}
                          className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-slate-700 mb-1">Description</label>
                      <textarea 
                        placeholder="Video description"
                        value={video.description || ""}
                        onChange={(e) => handleVideoChange(index, "description", e.target.value)}
                        rows="2"
                        className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
                
                <button 
                  type="button"
                  onClick={addVideo}
                  className="w-full border-2 border-dashed border-slate-300 rounded-lg p-4 text-slate-500 hover:text-slate-700 hover:border-slate-400 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FaVideo className="w-4 h-4" />
                  Add Video
                </button>
              </div>
            )}

            {/* Chat Assistant */}
            {isFieldVisible('chatAssistant') && (
              <div className="border border-slate-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <FaComments className="w-5 h-5 text-blue-500 mr-2" />
                  Chat Assistant
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <label className="flex items-center text-slate-700">
                      <input 
                        type="checkbox"
                        checked={formData.chatAssistant?.isEnabled || false}
                        onChange={handleChatAssistantToggle}
                        className="mr-2"
                      />
                      Enable Chat Assistant
                    </label>
                  </div>
                  
                  {formData.chatAssistant?.isEnabled && (
                    <>
                      <div>
                        <label className="block text-slate-700 mb-1">Welcome Message</label>
                        <textarea 
                          placeholder="Hello! How can I help you today?"
                          value={formData.chatAssistant?.welcomeMessage || ""}
                          onChange={(e) => {
                            const updatedData = {
                              ...formData,
                              chatAssistant: {
                                ...formData.chatAssistant,
                                welcomeMessage: e.target.value
                              }
                            };
                            setFormData(updatedData);
                            formDataRef.current = updatedData;
                            setHasUnsavedChanges(true);
                            setChangeCount(prev => prev + 1);
                            autoSaveToLocalStorage(updatedData);
                          }}
                          rows="2"
                          className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Live Chat */}
            {isFieldVisible('liveChat') && (
              <div className="border border-slate-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <FaWhatsapp className="w-5 h-5 text-green-500 mr-2" />
                  Live Chat Integration
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <label className="flex items-center text-slate-700">
                      <input 
                        type="checkbox"
                        checked={formData.liveChat?.isEnabled || false}
                        onChange={(e) => handleLiveChatChange('isEnabled', e.target.checked)}
                        className="mr-2"
                      />
                      Enable Live Chat (WhatsApp/Messages)
                    </label>
                  </div>
                  
                  {formData.liveChat?.isEnabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 mb-1">Platform</label>
                        <select 
                          value={formData.liveChat?.platform || "whatsapp"}
                          onChange={(e) => handleLiveChatChange('platform', e.target.value)}
                          className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="whatsapp">WhatsApp</option>
                          <option value="messenger">Messenger</option>
                          <option value="telegram">Telegram</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-slate-700 mb-1">Phone Number</label>
                        <input 
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.liveChat?.phoneNumber || ""}
                          onChange={(e) => handleLiveChatChange('phoneNumber', e.target.value)}
                          className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* QR Code Settings */}
            {isFieldVisible('dynamicQRCode') && (
              <div className="border border-slate-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <FaQrcode className="w-5 h-5 text-blue-500 mr-2" />
                  Dynamic QR Code
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-700 mb-1">QR Code Type</label>
                    <select 
                      value={formData.dynamicQRCode?.type || "dynamic"}
                      onChange={(e) => {
                        const updatedData = {
                          ...formData,
                          dynamicQRCode: { ...formData.dynamicQRCode, type: e.target.value }
                        };
                        setFormData(updatedData);
                        formDataRef.current = updatedData;
                        setHasUnsavedChanges(true);
                        setChangeCount(prev => prev + 1);
                        autoSaveToLocalStorage(updatedData);
                      }}
                      className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="dynamic">Dynamic</option>
                      <option value="static">Static</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-slate-700 mb-1">Target URL</label>
                    <input 
                      type="url"
                      placeholder="https://your-card-url.com"
                      value={formData.dynamicQRCode?.targetUrl || ""}
                      onChange={(e) => {
                        const updatedData = {
                          ...formData,
                          dynamicQRCode: { ...formData.dynamicQRCode, targetUrl: e.target.value }
                        };
                        setFormData(updatedData);
                        formDataRef.current = updatedData;
                        setHasUnsavedChanges(true);
                        setChangeCount(prev => prev + 1);
                        autoSaveToLocalStorage(updatedData);
                      }}
                      className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* NFC Settings */}
            {isFieldVisible('nfcSettings') && (
              <div className="border border-slate-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <FaShieldAlt className="w-5 h-5 text-blue-500 mr-2" />
                  NFC Settings
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <label className="flex items-center text-slate-700">
                      <input 
                        type="checkbox"
                        checked={formData.nfcSettings?.isEnabled || false}
                        onChange={(e) => {
                          const updatedData = {
                            ...formData,
                            nfcSettings: { ...formData.nfcSettings, isEnabled: e.target.checked }
                          };
                          setFormData(updatedData);
                          formDataRef.current = updatedData;
                          setHasUnsavedChanges(true);
                          setChangeCount(prev => prev + 1);
                          autoSaveToLocalStorage(updatedData);
                        }}
                        className="mr-2"
                      />
                      Enable NFC
                    </label>
                  </div>
                  
                  {formData.nfcSettings?.isEnabled && (
                    <div>
                      <label className="block text-slate-700 mb-1">NFC ID</label>
                      <input 
                        type="text"
                        placeholder="NFC identifier"
                        value={formData.nfcSettings?.nfcId || ""}
                        onChange={(e) => {
                          const updatedData = {
                            ...formData,
                            nfcSettings: { ...formData.nfcSettings, nfcId: e.target.value }
                          };
                          setFormData(updatedData);
                          formDataRef.current = updatedData;
                          setHasUnsavedChanges(true);
                          setChangeCount(prev => prev + 1);
                          autoSaveToLocalStorage(updatedData);
                        }}
                        className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  // Design Selection Component
  const renderDesignSelection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">Choose Your Card Design</h3>
      <p className="text-slate-600 mb-6">Select a design template for your digital card</p>
      
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
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">⚠️ Please select a design theme before proceeding</p>
        </div>
      )}
    </div>
  );

  // Main render function
  const renderCurrentStep = () => {
    if (isDesignStep()) {
      return renderDesignSelection();
    }
    
    switch (currentStep) {
      case 1:
        return renderProfilePage();
      case 2:
        return renderProfessionalDetails();
      case 3:
        return renderContactAndSocial();
      case 4:
        return renderInteractiveAndPremium();
      default:
        return renderProfilePage();
    }
  };

  // Progress Steps Component
  const ProgressSteps = () => {
    const availableSteps = getAvailableSteps();
    const stepLabels = {
      1: 'PROFILE',
      2: 'BUSINESS', 
      3: 'CONTACT',
      4: 'FEATURES',
      5: 'DESIGN'
    };
    
    return (
      <div className="flex justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -z-10"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-blue-500 -z-10 transition-all duration-300"
          style={{ width: `${((availableSteps.indexOf(currentStep)) / (availableSteps.length - 1)) * 100}%` }}
        ></div>
        
        {availableSteps.map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                currentStep >= step 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'bg-slate-200 text-slate-500'
              } ${currentStep === step ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
            >
              {index + 1}
            </div>
            <span className="mt-2 text-sm font-medium text-slate-700">
              {stepLabels[step]}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <WarningPopup />
      
      {/* Back to Dashboard Button */}
      <button
        onClick={handleGoBackDashboard}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        title="Go back to dashboard"
      >
        <FaArrowLeft className="w-4 h-4 mr-2" />
        <span className="font-medium">Back to Dashboard</span>
      </button>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-800 text-center">
          {editingCard ? "Edit Your Card" : "Create Your Card"}
        </h2>

        {editingCard && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <FaCheck className="w-5 h-5 text-blue-500 mr-2" />
              <p className="text-blue-700">
                <strong>Editing Mode:</strong> You are editing an existing card. 
                {formData.design && " You can change the design or any other details."}
              </p>
            </div>
          </div>
        )}

        <ProgressSteps />

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-8 min-h-[400px]">
            {renderCurrentStep()}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <button
              type="button"
              onClick={prevStep}
              disabled={(currentStep === 1) || loading}
              className={`px-6 py-3 rounded-lg transition-colors w-full md:w-auto ${
                (currentStep === 1) 
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                  : 'bg-slate-500 text-white hover:bg-slate-600'
              }`}
            >
              BACK
            </button>

            <div className={`text-sm text-center ${
              saveStatus.includes("Saving") ? "text-blue-500" : 
              saveStatus.includes("success") ? "text-green-500" : 
              saveStatus.includes("Error") ? "text-red-500" : "text-gray-500"
            }`}>
              {saveStatus}
            </div>

            {isDesignStep() ? (
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={loading || !formData.design}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 disabled:from-blue-300 disabled:to-purple-400 transition-colors w-full md:w-auto"
              >
                {loading ? (editingCard ? "Updating..." : "Creating...") : `${editingCard ? 'Update' : 'Create'} Card`}
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                disabled={loading}
                className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors w-full md:w-auto"
              >
                {isLastContentStep() ? "CHOOSE DESIGN" : "NEXT"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCard;