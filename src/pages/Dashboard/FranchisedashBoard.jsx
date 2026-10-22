import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Copy,
  Plus,
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  UserPlus,
  Calendar,
  Building,
  Mail,
  Phone,
  Loader2,
  FileEdit,
  ChevronDown,
  UserCircle,
  ShoppingBag,
  X,
  Download,
  Share2,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Search,
  Filter,
  Check,
  Eye,
  MapPin,
  Briefcase,
  RefreshCw,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import DynamicTable from '../../components/DynamicTable';
import SignupForm from '../../components/SignupForm';
import { register } from '../../service/userApi';

const API_URL = import.meta.env.VITE_API_URL;

const FranchiseDashboard = () => {
  const navigate = useNavigate();

  // Auth headers helper
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  };

  const [partners, setPartners] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [franchiseDataRaw, setFranchiseDataRaw] = useState(null);
  const [franchiseInfo, setFranchiseInfo] = useState({
    franchiseId: '',
    PersonalName: '',
    businessType: '',
    city: '',
    joinDate: ''
  });

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [activeTab, setActiveTab] = useState('partners');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [customerSubmitting, setCustomerSubmitting] = useState(false);

  // Customer Form state
  const [newCustomerForm, setNewCustomerForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  // Modern Toast system
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((current) => (current?.message === message ? null : current));
    }, 3500);
  };

  // Fetch franchise info, partners and customers
  const fetchFranchiseData = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        setLoading(false);
        return;
      }

      // 1. Fetch franchise document
      const franchiseResponse = await fetch(`${API_URL}/api/v1/franchise-partner/franchise/${userId}`, {
        credentials: 'include',
        headers: getAuthHeaders()
      });

      if (!franchiseResponse.ok) {
        throw new Error(`HTTP error! status: ${franchiseResponse.status}`);
      }

      const franchiseData = await franchiseResponse.json();

      if (franchiseData.success && franchiseData.data) {
        const franchise = franchiseData.data;
        setFranchiseDataRaw(franchise);

        const franchiseUserId = franchise.userId || userId;
        const franchiseDocumentId = franchise._id;

        const displayName = franchise.franchiseDetails?.businessName ||
                            franchise.franchiseDetails?.firstName ||
                            'Franchise Partner';

        setFranchiseInfo({
          franchiseId: franchiseUserId,
          PersonalName: displayName,
          businessType: franchise.franchiseDetails?.businessType || 'Digital Commerce',
          city: franchise.franchiseDetails?.city || '',
          joinDate: franchise.createdAt ? new Date(franchise.createdAt).toLocaleDateString() : 'N/A'
        });

        if (franchiseDocumentId) {
          localStorage.setItem('franchise_id', franchiseDocumentId);
        }
        if (franchiseUserId) {
          localStorage.setItem('franchise_user_id', franchiseUserId);
        }

        setPartners(franchise.partners || []);
      }

      // 2. Fetch attributed customers
      try {
        const customerResponse = await fetch(`${API_URL}/api/v1/franchise-partner/${userId}/customers`, {
          credentials: 'include',
          headers: getAuthHeaders()
        });

        if (customerResponse.ok) {
          const custData = await customerResponse.json();
          if (custData.success && custData.data) {
            setCustomers(custData.data.customers || custData.data || []);
          }
        }
      } catch (err) {
        console.warn('Customer query fallback:', err);
      }

    } catch (error) {
      console.error('Error fetching franchise data:', error);
      showToast('Failed to load dashboard data. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFranchiseData();
  }, []);

  const handleCopyFranchiseId = () => {
    const id = franchiseInfo.franchiseId || localStorage.getItem('franchise_user_id') || '';
    if (id) {
      navigator.clipboard.writeText(id);
      showToast('Franchise User ID copied to clipboard!');
    } else {
      showToast('Franchise ID not found.', 'error');
    }
  };

  const handleCopyReferralLink = () => {
    const id = franchiseInfo.franchiseId || localStorage.getItem('franchise_user_id') || '';
    const link = `${window.location.origin}/signup/partner?ref=${id}`;
    navigator.clipboard.writeText(link);
    showToast('Partner referral invitation link copied!');
  };

  const handleShareWhatsApp = () => {
    const id = franchiseInfo.franchiseId || localStorage.getItem('franchise_user_id') || '';
    const link = `${window.location.origin}/signup/partner?ref=${id}`;
    const text = encodeURIComponent(
      `Hello! You have been invited to join our DigiCard Partner Network under franchise ${franchiseInfo.PersonalName}. Register here: ${link}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleSignupSuccess = () => {
    fetchFranchiseData();
    setShowSignupModal(false);
    showToast('Partner added and attributed to your franchise successfully!');
  };

  const handleAddCustomerSubmit = async (e) => {
    e.preventDefault();
    if (!newCustomerForm.email || !newCustomerForm.password) {
      showToast('Please provide email and password for the customer.', 'error');
      return;
    }
    setCustomerSubmitting(true);
    try {
      const payload = {
        name: newCustomerForm.name || newCustomerForm.email.split('@')[0],
        email: newCustomerForm.email,
        phone: newCustomerForm.phone,
        password: newCustomerForm.password,
        role: 'customer',
        createdBy: franchiseInfo.franchiseId || localStorage.getItem('franchise_user_id')
      };

      const { response, data } = await register(payload);
      if (response.ok) {
        showToast('Customer created successfully!');
        setShowCustomerModal(false);
        setNewCustomerForm({ name: '', email: '', phone: '', password: '' });
        fetchFranchiseData();
      } else {
        showToast(data.message || 'Failed to create customer.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('An error occurred while creating customer.', 'error');
    } finally {
      setCustomerSubmitting(false);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const isPartners = activeTab === 'partners';
    const dataToExport = isPartners ? filteredPartners : filteredCustomers;

    if (!dataToExport || dataToExport.length === 0) {
      showToast('No records available to export.', 'error');
      return;
    }

    let headers = [];
    let rows = [];

    if (isPartners) {
      headers = ['Name', 'Email', 'Phone', 'Business Name', 'Business Type', 'Status', 'Join Date'];
      rows = dataToExport.map((p) => [
        `"${(p.firstName ? `${p.salutation || ''} ${p.firstName} ${p.lastName || ''}` : p.PersonalName || 'Partner').replace(/"/g, '""')}"`,
        `"${(p.personalEmail || p.email || '').replace(/"/g, '""')}"`,
        `"${(p.personalContact || p.phone || '').replace(/"/g, '""')}"`,
        `"${(p.PersonalName || 'N/A').replace(/"/g, '""')}"`,
        `"${(p.PersonalType || 'N/A').replace(/"/g, '""')}"`,
        `"${(p.status || 'Active').replace(/"/g, '""')}"`,
        `"${p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'N/A'}"`
      ]);
    } else {
      headers = ['Customer Name', 'Email', 'Phone', 'Status', 'Join Date'];
      rows = dataToExport.map((c) => [
        `"${(c.name || 'Customer').replace(/"/g, '""')}"`,
        `"${(c.email || '').replace(/"/g, '""')}"`,
        `"${(c.phone || '').replace(/"/g, '""')}"`,
        `"${(c.status || 'active').replace(/"/g, '""')}"`,
        `"${c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'N/A'}"`
      ]);
    }

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${isPartners ? 'partners' : 'customers'}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`${isPartners ? 'Partners' : 'Customers'} table exported to CSV!`);
  };

  // Helper avatar styling
  const getProfileInitials = (person) => {
    if (person?.firstName?.trim()) return person.firstName.charAt(0).toUpperCase();
    if (person?.name?.trim()) return person.name.charAt(0).toUpperCase();
    if (person?.PersonalName?.trim()) return person.PersonalName.charAt(0).toUpperCase();
    if (person?.email?.trim()) return person.email.split('@')[0].charAt(0).toUpperCase();
    return 'P';
  };

  const getProfileColor = (person) => {
    const colors = [
      'bg-blue-600', 'bg-emerald-600', 'bg-violet-600',
      'bg-indigo-600', 'bg-teal-600', 'bg-amber-600', 'bg-cyan-600'
    ];
    const str = person?._id || person?.email || person?.PersonalName || 'default';
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getStatusBadge = (status) => {
    const s = (status || 'active').toLowerCase();
    const config = {
      active: {
        bg: 'bg-emerald-50 dark:bg-emerald-950/60',
        color: 'text-emerald-700 dark:text-emerald-400',
        border: 'border-emerald-200 dark:border-emerald-800',
        dot: 'bg-emerald-500',
        label: 'Active'
      },
      pending: {
        bg: 'bg-amber-50 dark:bg-amber-950/60',
        color: 'text-amber-700 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-800',
        dot: 'bg-amber-500',
        label: 'Pending'
      },
      inactive: {
        bg: 'bg-slate-100 dark:bg-slate-800',
        color: 'text-slate-600 dark:text-slate-400',
        border: 'border-slate-200 dark:border-slate-700',
        dot: 'bg-slate-400',
        label: 'Inactive'
      },
      rejected: {
        bg: 'bg-rose-50 dark:bg-rose-950/60',
        color: 'text-rose-700 dark:text-rose-400',
        border: 'border-rose-200 dark:border-rose-800',
        dot: 'bg-rose-500',
        label: 'Rejected'
      }
    };

    const c = config[s] || config.pending;

    return (
      <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium ${c.bg} ${c.color} border ${c.border}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
        {c.label}
      </span>
    );
  };

  // Filtered partners
  const filteredPartners = useMemo(() => {
    return partners.filter((partner) => {
      // Status filter
      if (statusFilter !== 'all') {
        const s = (partner.status || 'active').toLowerCase();
        if (s !== statusFilter) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const fullName = `${partner.firstName || ''} ${partner.lastName || ''} ${partner.PersonalName || ''}`.toLowerCase();
        const email = (partner.personalEmail || partner.email || '').toLowerCase();
        const phone = (partner.personalContact || partner.phone || '').toLowerCase();
        return fullName.includes(q) || email.includes(q) || phone.includes(q);
      }
      return true;
    });
  }, [partners, statusFilter, searchQuery]);

  // Filtered customers
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const name = (customer.name || '').toLowerCase();
        const email = (customer.email || '').toLowerCase();
        const phone = (customer.phone || '').toLowerCase();
        return name.includes(q) || email.includes(q) || phone.includes(q);
      }
      return true;
    });
  }, [customers, searchQuery]);

  // Partner Table Columns
  const partnerColumns = [
    {
      header: 'Partner Details',
      cell: ({ row }) => {
        const partner = row.original;
        if (!partner) return <span>No partner data</span>;

        const fullName = partner.firstName && partner.firstName.trim()
          ? `${partner.salutation || ''} ${partner.firstName} ${partner.lastName || ''}`.trim()
          : partner.PersonalName || 'Partner';

        return (
          <div className="flex items-center gap-3">
            <div className={`flex-shrink-0 h-9 w-9 ${getProfileColor(partner)} rounded-lg flex items-center justify-center text-white font-semibold text-xs shadow-sm`}>
              {getProfileInitials(partner)}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {fullName}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
                <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">{partner.personalEmail || partner.email || 'No email'}</span>
              </div>
            </div>
          </div>
        );
      }
    },
    {
      header: 'Business / Entity',
      cell: ({ row }) => {
        const partner = row.original;
        return (
          <div>
            <div className="text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>{partner.PersonalName || 'Direct Channel'}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {partner.PersonalType || 'Retail Partner'}
            </div>
          </div>
        );
      }
    },
    {
      header: 'Contact',
      cell: ({ row }) => {
        const partner = row.original;
        return (
          <div>
            <div className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-slate-400" />
              {partner.personalContact || partner.phone || 'No phone'}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-400" />
              {partner.city ? `${partner.city}, ${partner.state || ''}` : 'Regional'}
            </div>
          </div>
        );
      }
    },
    {
      header: 'Status',
      cell: ({ row }) => {
        const partner = row.original;
        return getStatusBadge(partner.status);
      }
    },
    {
      header: 'Join Date',
      cell: ({ row }) => {
        const partner = row.original;
        return (
          <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {partner.createdAt ? new Date(partner.createdAt).toLocaleDateString() : 'N/A'}
          </div>
        );
      }
    },
    {
      header: 'Actions',
      cell: ({ row }) => {
        const partner = row.original;
        return (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedPartner(partner)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-400 dark:hover:bg-blue-900/60 transition-colors"
              title="Inspect Partner Details"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect</span>
            </button>
          </div>
        );
      }
    }
  ];

  // Customer Table Columns
  const customerColumns = [
    {
      header: 'Customer Details',
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className={`flex-shrink-0 h-9 w-9 ${getProfileColor(customer)} rounded-lg flex items-center justify-center text-white font-semibold text-xs shadow-sm`}>
              {getProfileInitials(customer)}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {customer.name || 'Customer'}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
                <Mail className="w-3 h-3 text-slate-400" />
                <span className="truncate">{customer.email || 'No email'}</span>
              </div>
            </div>
          </div>
        );
      }
    },
    {
      header: 'Contact',
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <div className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1">
            <Phone className="w-3 h-3 text-slate-400" />
            {customer.phone || 'Not provided'}
          </div>
        );
      }
    },
    {
      header: 'Status',
      cell: ({ row }) => {
        const customer = row.original;
        return getStatusBadge(customer.status || 'active');
      }
    },
    {
      header: 'Attributed Date',
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}
          </div>
        );
      }
    }
  ];

  // Stats calculation
  const totalPartners = partners.length;
  const activePartners = partners.filter((p) => (p.status || '').toLowerCase() === 'active').length;
  const pendingPartners = partners.filter((p) => (p.status || '').toLowerCase() === 'pending').length;
  const totalCustomers = customers.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent mx-auto mb-3" />
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Loading Franchise Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 p-6 lg:p-8 transition-colors">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[100000] flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'error'
            ? 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800'
            : 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800'
        }`}>
          {toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
          ) : (
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
          )}
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Slide-over Partner Detail Drawer */}
      {selectedPartner && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedPartner(null)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Partner Inspection
                    </span>
                    {getStatusBadge(selectedPartner.status)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {selectedPartner.firstName
                      ? `${selectedPartner.salutation || ''} ${selectedPartner.firstName} ${selectedPartner.lastName || ''}`.trim()
                      : selectedPartner.PersonalName || 'Partner'}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedPartner(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Business & Entity Info */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    Business Profile
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-xs text-slate-400">Organization</div>
                      <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                        {selectedPartner.PersonalName || 'Direct Channel'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Business Type</div>
                      <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                        {selectedPartner.PersonalType || 'Retail Partner'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Contact & Communication
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-400" /> Email
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {selectedPartner.personalEmail || selectedPartner.email || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-400" /> Phone
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {selectedPartner.personalContact || selectedPartner.phone || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" /> Location
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white text-right">
                        {[selectedPartner.city, selectedPartner.state].filter(Boolean).join(', ') || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* KYC & Identity Verification */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      KYC Compliance
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      selectedPartner.kycVerified
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {selectedPartner.kycVerified ? 'KYC Verified' : 'KYC Pending'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-400">Aadhaar Reference</div>
                      <div className="font-mono font-semibold text-slate-800 dark:text-slate-200 mt-1">
                        {selectedPartner.aadharNumber
                          ? `XXXX-XXXX-${selectedPartner.aadharNumber.slice(-4)}`
                          : 'Not Provided'}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-400">PAN Reference</div>
                      <div className="font-mono font-semibold text-slate-800 dark:text-slate-200 mt-1">
                        {selectedPartner.panNumber
                          ? `${selectedPartner.panNumber.slice(0, 4)}****`
                          : 'Not Provided'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attribution Metadata */}
                <div className="text-xs text-slate-400 space-y-1">
                  <div>Partner ID: <span className="font-mono text-slate-600 dark:text-slate-300">{selectedPartner._id}</span></div>
                  <div>Attributed On: <span className="text-slate-600 dark:text-slate-300">{selectedPartner.createdAt ? new Date(selectedPartner.createdAt).toLocaleString() : 'N/A'}</span></div>
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedPartner._id);
                    showToast('Partner ID copied!');
                  }}
                  className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy Partner ID
                </button>
                <button
                  onClick={() => setSelectedPartner(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  Close Inspection
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Signup Modal (Add Partner) */}
      {showSignupModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setShowSignupModal(false)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Onboard New Channel Partner
                  </h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Create and attribute a verified channel partner under franchise <span className="font-semibold text-blue-600 dark:text-blue-400">{franchiseInfo.PersonalName}</span>
                  </p>
                </div>
                <button
                  onClick={() => setShowSignupModal(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <SignupForm
                  isFranchiseContext={true}
                  createdBy={franchiseInfo.franchiseId || localStorage.getItem('franchise_user_id')}
                  franchiseName={franchiseInfo.PersonalName}
                  onSuccess={handleSignupSuccess}
                  onCancel={() => setShowSignupModal(false)}
                  showCancelButton={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Modal (Add Customer) */}
      {showCustomerModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setShowCustomerModal(false)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800">
              
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Register Customer
                  </h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Attribute a new digital card customer to your franchise
                  </p>
                </div>
                <button
                  onClick={() => setShowCustomerModal(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddCustomerSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Customer Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={newCustomerForm.name}
                    onChange={(e) => setNewCustomerForm({ ...newCustomerForm, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={newCustomerForm.email}
                    onChange={(e) => setNewCustomerForm({ ...newCustomerForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={newCustomerForm.phone}
                    onChange={(e) => setNewCustomerForm({ ...newCustomerForm, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Temporary Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Minimum 8 characters"
                    value={newCustomerForm.password}
                    onChange={(e) => setNewCustomerForm({ ...newCustomerForm, password: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCustomerModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={customerSubmitting}
                    className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    {customerSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    Create Customer
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}

      {/* Top Header & Context */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <Sparkles className="w-3 h-3 text-blue-500" />
              Regional Franchise Cockpit
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {franchiseInfo.businessType}
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {franchiseInfo.PersonalName}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Manage channel partners, monitor client acquisitions, and track regional operations.
          </p>
        </div>

        {/* Action Center */}
        <div className="flex items-center gap-3">
          <button
            onClick={fetchFranchiseData}
            title="Refresh dashboard data"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Add Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowAddDropdown(!showAddDropdown)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add New</span>
              <ChevronDown className="w-4 h-4 ml-0.5 opacity-80" />
            </button>

            {showAddDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowAddDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 z-20 py-1.5 animate-in fade-in slide-in-from-top-2">
                  <button
                    onClick={() => {
                      setShowAddDropdown(false);
                      setShowSignupModal(true);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
                  >
                    <UserPlus className="w-4 h-4 text-blue-600" />
                    <div>
                      <div>Add Channel Partner</div>
                      <div className="text-[10px] text-slate-400 font-normal">Onboard a sub-partner</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setShowAddDropdown(false);
                      setShowCustomerModal(true);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors border-t border-slate-100 dark:border-slate-800"
                  >
                    <UserCircle className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div>Add Direct Customer</div>
                      <div className="text-[10px] text-slate-400 font-normal">Register card client</div>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Franchise Identifier & Partner Recruitment Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        
        {/* Franchise ID Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 lg:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Franchise ID
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-sm lg:text-base font-bold text-slate-900 dark:text-white truncate">
                {franchiseInfo.franchiseId || 'Not available'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Active since {franchiseInfo.joinDate}
            </p>
          </div>
          <button
            onClick={handleCopyFranchiseId}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors shrink-0"
            title="Copy Franchise User ID"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Recruitment / Referral Link Card */}
        <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 lg:p-5 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white">
                Partner Recruitment
              </span>
              <span className="text-xs text-blue-100">Direct Invitation Link</span>
            </div>
            <p className="text-sm font-semibold text-white mt-1">
              Invite prospective channel partners with automatic franchise attribution.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyReferralLink}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-50 transition-colors shadow-xs"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Invite</span>
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors shadow-xs"
              title="Share on WhatsApp"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-8">
        {[
          {
            title: "Total Channel Partners",
            value: totalPartners,
            subtext: "Registered under franchise",
            icon: Users,
            color: "blue",
            trend: "+2 this month"
          },
          {
            title: "Active Network",
            value: activePartners,
            subtext: `${totalPartners ? Math.round((activePartners / totalPartners) * 100) : 0}% network activity`,
            icon: CheckCircle,
            color: "emerald",
            trend: "Operational"
          },
          {
            title: "Pending KYC / Approval",
            value: pendingPartners,
            subtext: "Awaiting activation",
            icon: Clock,
            color: "amber",
            trend: "Action needed"
          },
          {
            title: "Direct Customers",
            value: totalCustomers,
            subtext: "Digital card accounts",
            icon: ShoppingBag,
            color: "violet",
            trend: "Attributed"
          }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {stat.title}
                </span>
                <div className={`p-2 rounded-xl ${
                  stat.color === 'blue' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400' :
                  stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400' :
                  stat.color === 'amber' ? 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400' :
                  'bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {stat.value}
                </span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  stat.color === 'blue' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300' :
                  stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                  stat.color === 'amber' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                  'bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300'
                }`}>
                  {stat.trend}
                </span>
              </div>

              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                {stat.subtext}
              </p>
            </div>
          );
        })}
      </div>

      {/* Tabs and Management Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        
        {/* Tab Header & Global Actions */}
        <div className="px-6 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Tab Navigation */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setActiveTab('partners');
                setStatusFilter('all');
              }}
              className={`flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'partners'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Channel Partners</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'partners' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {partners.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('customers');
                setStatusFilter('all');
              }}
              className={`flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'customers'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Customers</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'customers' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {customers.length}
              </span>
            </button>
          </div>

          {/* Table Tools: Search, Filter Pills & CSV Export */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={activeTab === 'partners' ? "Search partners..." : "Search customers..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-44 lg:w-56"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Status Filter Pills (Only for Partners tab) */}
            {activeTab === 'partners' && (
              <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {['all', 'active', 'pending'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                      statusFilter === s
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Export CSV Button */}
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              title="Download CSV report"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>

          </div>

        </div>

        {/* Table / Empty State Container */}
        <div className="p-6">
          {activeTab === 'partners' ? (
            filteredPartners.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  No Channel Partners Found
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-5">
                  {searchQuery || statusFilter !== 'all'
                    ? "No partners match your current search or status filter."
                    : "You haven't onboarded any channel partners yet. Start growing your network today."}
                </p>
                <button
                  onClick={() => setShowSignupModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Onboard First Partner</span>
                </button>
              </div>
            ) : (
              <DynamicTable
                columns={partnerColumns}
                data={filteredPartners}
                page={page}
                pageSize={pageSize}
                totalItems={filteredPartners.length}
                onPageChange={(p) => setPage(p)}
                onPageSizeChange={(s) => {
                  setPageSize(s);
                  setPage(0);
                }}
                searchBar={false}
                pagination={true}
              />
            )
          ) : (
            filteredCustomers.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  No Direct Customers Found
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-5">
                  Direct customers registered under your franchise will appear here once registered.
                </p>
                <button
                  onClick={() => setShowCustomerModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Customer</span>
                </button>
              </div>
            ) : (
              <DynamicTable
                columns={customerColumns}
                data={filteredCustomers}
                page={page}
                pageSize={pageSize}
                totalItems={filteredCustomers.length}
                onPageChange={(p) => setPage(p)}
                onPageSizeChange={(s) => {
                  setPageSize(s);
                  setPage(0);
                }}
                searchBar={false}
                pagination={true}
              />
            )
          )}
        </div>

      </div>

    </div>
  );
};

export default FranchiseDashboard;