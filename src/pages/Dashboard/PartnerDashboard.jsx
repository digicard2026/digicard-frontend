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
  Mail,
  Phone,
  Loader2,
  FileEdit,
  User,
  Building,
  Star,
  Target,
  Award,
  Sparkles,
  X,
  Download,
  Share2,
  Search,
  AlertCircle,
  RefreshCw,
  Eye,
  MapPin,
  Briefcase
} from "lucide-react";
import DynamicTable from "../../components/DynamicTable";
import { register } from "../../service/userApi";

const API_URL = import.meta.env.VITE_API_URL;

const PartnerDashboard = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [partnerInfo, setPartnerInfo] = useState({
    partnerUserId: "",
    businessName: "",
    businessType: "Channel Partner",
    city: "",
    joinDate: "N/A",
  });
  const [loading, setLoading] = useState(true);

  // Pagination & Filtering state
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modals & Drawers
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerSubmitting, setCustomerSubmitting] = useState(false);

  // Customer Form state
  const [newCustomerForm, setNewCustomerForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // Modern Toast system
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((current) => (current?.message === message ? null : current));
    }, 3500);
  };

  // Auth headers helper
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  // Fetch partner profile and customers
  const fetchPartnerAndCustomers = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        setLoading(false);
        return;
      }

      // 1. Fetch partner profile
      const partnerRes = await fetch(`${API_URL}/api/v1/franchise-partner/profile/${userId}`, {
        credentials: "include",
        headers: getAuthHeaders(),
      });

      if (!partnerRes.ok) {
        throw new Error(`Partner profile fetch failed: ${partnerRes.status}`);
      }
      const partnerJson = await partnerRes.json();
      const partner = partnerJson?.data || partnerJson;

      const partnerUserId = partner?.userId || userId;
      const businessName =
        partner?.businessName ||
        partner?.partnerDetails?.businessName ||
        partner?.firstName ||
        "Channel Partner";
      const joinDate = partner?.createdAt
        ? new Date(partner.createdAt).toLocaleDateString()
        : "N/A";

      setPartnerInfo({
        partnerUserId,
        businessName,
        businessType: partner?.partnerDetails?.businessType || "Channel Partner",
        city: partner?.partnerDetails?.city || "",
        joinDate,
      });

      // 2. Fetch attributed customers
      let customersList = [];
      const customersRes = await fetch(
        `${API_URL}/api/v1/franchise-partner/${partnerUserId}/customers`,
        {
          credentials: "include",
          headers: getAuthHeaders(),
        }
      );

      if (customersRes.ok) {
        const customersJson = await customersRes.json();
        customersList =
          customersJson?.data?.customers ||
          customersJson?.data ||
          customersJson ||
          [];
        const total = customersJson?.data?.total || customersList.length || 0;
        setTotalItems(total);
      } else {
        customersList = partner?.customers || [];
        setTotalItems(customersList.length || 0);
      }

      setCustomers(customersList);
    } catch (err) {
      console.error("Error fetching partner/customers:", err);
      showToast("Could not load partner data. Please refresh.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerAndCustomers();
  }, []);

  const handleCopyPartnerId = () => {
    const id = partnerInfo.partnerUserId || localStorage.getItem("partner_user_id");
    if (id) {
      navigator.clipboard.writeText(id);
      showToast("Partner Code copied to clipboard!");
    } else {
      showToast("Partner Code not found.", "error");
    }
  };

  const handleCopyReferralLink = () => {
    const id = partnerInfo.partnerUserId || localStorage.getItem("partner_user_id") || "";
    const link = `${window.location.origin}/choose-plan?ref=${id}`;
    navigator.clipboard.writeText(link);
    showToast("Customer referral link copied!");
  };

  const handleShareWhatsApp = () => {
    const id = partnerInfo.partnerUserId || localStorage.getItem("partner_user_id") || "";
    const link = `${window.location.origin}/choose-plan?ref=${id}`;
    const text = encodeURIComponent(
      `Hello! You can create your verified DigiCard digital business card with our accredited channel partnership (${partnerInfo.businessName}) here: ${link}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleAddCustomerSubmit = async (e) => {
    e.preventDefault();
    if (!newCustomerForm.email || !newCustomerForm.password) {
      showToast("Email and temporary password are required.", "error");
      return;
    }
    setCustomerSubmitting(true);
    try {
      const payload = {
        name: newCustomerForm.name || newCustomerForm.email.split("@")[0],
        email: newCustomerForm.email,
        phone: newCustomerForm.phone,
        password: newCustomerForm.password,
        role: "customer",
        createdBy: partnerInfo.partnerUserId || localStorage.getItem("partner_user_id"),
      };

      const { response, data } = await register(payload);
      if (response.ok) {
        showToast("Customer registered and attributed successfully!");
        setShowCustomerModal(false);
        setNewCustomerForm({ name: "", email: "", phone: "", password: "" });
        fetchPartnerAndCustomers();
      } else {
        showToast(data.message || "Failed to register customer.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("An error occurred during customer registration.", "error");
    } finally {
      setCustomerSubmitting(false);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (!filteredCustomers || filteredCustomers.length === 0) {
      showToast("No customer records to export.", "error");
      return;
    }

    const headers = ["Customer Name", "Email", "Phone", "Status", "Attributed Date"];
    const rows = filteredCustomers.map((c) => [
      `"${(c.name || c.firstName ? `${c.firstName || ""} ${c.lastName || ""}`.trim() : "Customer").replace(/"/g, '""')}"`,
      `"${(c.email || "").replace(/"/g, '""')}"`,
      `"${(c.phone || c.phones?.[0]?.number || "").replace(/"/g, '""')}"`,
      `"${(c.status || "active").replace(/"/g, '""')}"`,
      `"${c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A"}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `partner_customers_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Customer portfolio exported to CSV!");
  };

  const getProfileInitials = (item) => {
    if (!item) return "C";
    if (item.name?.trim()) return item.name.charAt(0).toUpperCase();
    if (item.firstName?.trim()) return item.firstName.charAt(0).toUpperCase();
    if (item.businessName?.trim()) return item.businessName.charAt(0).toUpperCase();
    if (item.email?.trim()) return item.email.split("@")[0].charAt(0).toUpperCase();
    return "C";
  };

  const getProfileColor = (item) => {
    const colors = [
      "bg-blue-600",
      "bg-emerald-600",
      "bg-violet-600",
      "bg-indigo-600",
      "bg-teal-600",
      "bg-amber-600",
    ];
    const str = (item && (item._id || item.email || item.name)) || "default";
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getStatusBadge = (status) => {
    const s = (status || "active").toLowerCase();
    const config = {
      active: {
        bg: "bg-emerald-50 dark:bg-emerald-950/60",
        color: "text-emerald-700 dark:text-emerald-400",
        border: "border-emerald-200 dark:border-emerald-800",
        dot: "bg-emerald-500",
        label: "Active",
      },
      pending: {
        bg: "bg-amber-50 dark:bg-amber-950/60",
        color: "text-amber-700 dark:text-amber-400",
        border: "border-amber-200 dark:border-amber-800",
        dot: "bg-amber-500",
        label: "Pending",
      },
      inactive: {
        bg: "bg-slate-100 dark:bg-slate-800",
        color: "text-slate-600 dark:text-slate-400",
        border: "border-slate-200 dark:border-slate-700",
        dot: "bg-slate-400",
        label: "Inactive",
      },
    };
    const c = config[s] || config.pending;

    return (
      <span
        className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium ${c.bg} ${c.color} border ${c.border}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
        {c.label}
      </span>
    );
  };

  // Filtered customer list
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      if (statusFilter !== "all") {
        const s = (c.status || "active").toLowerCase();
        if (s !== statusFilter) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const name = (c.name || `${c.firstName || ""} ${c.lastName || ""}` || "").toLowerCase();
        const email = (c.email || "").toLowerCase();
        const phone = (c.phone || c.phones?.[0]?.number || "").toLowerCase();
        return name.includes(q) || email.includes(q) || phone.includes(q);
      }
      return true;
    });
  }, [customers, statusFilter, searchQuery]);

  // DynamicTable columns configuration
  const columns = [
    {
      header: "Customer Details",
      cell: ({ row }) => {
        const c = row.original;
        const fullName = c.name
          ? c.name
          : c.firstName
          ? `${c.firstName} ${c.lastName || ""}`.trim()
          : c.businessName || "Customer";

        return (
          <div className="flex items-center gap-3">
            <div
              className={`flex-shrink-0 h-9 w-9 ${getProfileColor(
                c
              )} rounded-lg flex items-center justify-center text-white font-semibold text-xs shadow-sm`}
            >
              {getProfileInitials(c)}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {fullName}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
                <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">{c.email || "No email"}</span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      header: "Contact",
      cell: ({ row }) => {
        const c = row.original;
        return (
          <div>
            <div className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-slate-400" />
              {c.phone || c.phones?.[0]?.number || "No phone"}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-400" />
              {c.city || c.state || "Regional"}
            </div>
          </div>
        );
      },
    },
    {
      header: "Account Type",
      cell: ({ row }) => {
        const c = row.original;
        return (
          <div className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-slate-400" />
            <span>{c.accountType || "Digital Card"}</span>
          </div>
        );
      },
    },
    {
      header: "Status",
      cell: ({ row }) => {
        const c = row.original;
        return getStatusBadge(c.status);
      },
    },
    {
      header: "Joined",
      cell: ({ row }) => {
        const c = row.original;
        return (
          <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A"}
          </div>
        );
      },
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const c = row.original;
        return (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedCustomer(c)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-400 dark:hover:bg-blue-900/60 transition-colors"
              title="Inspect Customer Details"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect</span>
            </button>
          </div>
        );
      },
    },
  ];

  // Statistics
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(
    (c) => (c.status || "active").toLowerCase() === "active"
  ).length;
  const pendingCustomers = customers.filter(
    (c) => (c.status || "").toLowerCase() === "pending"
  ).length;
  const thisMonthCustomers = customers.filter((c) => {
    if (!c.createdAt) return false;
    const created = new Date(c.createdAt);
    const now = new Date();
    return (
      created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
    );
  }).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent mx-auto mb-3" />
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            Loading Partner Portal...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 p-6 lg:p-8 transition-colors">
      
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-[100000] flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${
            toast.type === "error"
              ? "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800"
              : "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800"
          }`}
        >
          {toast.type === "error" ? (
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

      {/* Slide-over Customer Inspection Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedCustomer(null)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Customer Profile
                    </span>
                    {getStatusBadge(selectedCustomer.status)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {selectedCustomer.name ||
                      (selectedCustomer.firstName
                        ? `${selectedCustomer.firstName} ${selectedCustomer.lastName || ""}`.trim()
                        : selectedCustomer.businessName || "Customer")}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Account Details */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    Subscription & Account
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-xs text-slate-400">Account Type</div>
                      <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                        {selectedCustomer.accountType || "Digital Card"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Attribution Status</div>
                      <div className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        Direct Client
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Contact Details
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-400" /> Email
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {selectedCustomer.email || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-400" /> Phone
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {selectedCustomer.phone || selectedCustomer.phones?.[0]?.number || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" /> Location
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white text-right">
                        {[selectedCustomer.city, selectedCustomer.state].filter(Boolean).join(", ") ||
                          "Regional Client"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Attribution Info */}
                <div className="text-xs text-slate-400 space-y-1">
                  <div>Customer ID: <span className="font-mono text-slate-600 dark:text-slate-300">{selectedCustomer._id}</span></div>
                  <div>Registered On: <span className="text-slate-600 dark:text-slate-300">{selectedCustomer.createdAt ? new Date(selectedCustomer.createdAt).toLocaleString() : "N/A"}</span></div>
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedCustomer.email || selectedCustomer._id);
                    showToast("Customer reference copied!");
                  }}
                  className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy Reference
                </button>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  Close Inspection
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Customer Registration Modal */}
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
                    Attribute a new digital card customer under channel partnership <span className="font-semibold text-blue-600 dark:text-blue-400">{partnerInfo.businessName}</span>
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
                    placeholder="e.g. Ramesh Chandra"
                    value={newCustomerForm.name}
                    onChange={(e) =>
                      setNewCustomerForm({ ...newCustomerForm, name: e.target.value })
                    }
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
                    placeholder="client@example.com"
                    value={newCustomerForm.email}
                    onChange={(e) =>
                      setNewCustomerForm({ ...newCustomerForm, email: e.target.value })
                    }
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
                    onChange={(e) =>
                      setNewCustomerForm({ ...newCustomerForm, phone: e.target.value })
                    }
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
                    onChange={(e) =>
                      setNewCustomerForm({ ...newCustomerForm, password: e.target.value })
                    }
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
                    Register Customer
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}

      {/* Header & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Channel Partner Portal
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800">
              <Building className="w-3.5 h-3.5 text-blue-500" />
              {partnerInfo.businessName}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {partnerInfo.businessType || "Channel Partner"} • Member since {partnerInfo.joinDate}
          </p>
        </div>

        {/* Action Center */}
        <div className="flex items-center gap-2">
          <button
            onClick={fetchPartnerAndCustomers}
            title="Refresh dashboard data"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowCustomerModal(true)}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-3.5 rounded-lg transition-all shadow-2xs hover:shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Partner Identifier & Referral Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-2xs mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Partner Identifier */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Partner Code
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {partnerInfo.partnerUserId
                    ? `PT-${partnerInfo.partnerUserId.slice(-8).toUpperCase()}`
                    : "N/A"}
                </span>
                <button
                  onClick={handleCopyPartnerId}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Copy full Partner User ID"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Referral Link & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:border-l lg:border-slate-200/80 lg:dark:border-slate-800 lg:pl-6">
            <div className="min-w-0">
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Customer Onboarding Link
              </div>
              <div className="font-mono text-xs text-slate-600 dark:text-slate-400 truncate max-w-sm mt-0.5">
                {window.location.origin}/choose-plan?ref={partnerInfo.partnerUserId || ""}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyReferralLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Link</span>
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-2xs"
                title="Share on WhatsApp"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            title: "Total Clients",
            value: totalCustomers,
            subtext: "Attributed to your partnership",
            icon: Users,
            color: "blue",
            badge: totalCustomers > 0 ? `${totalCustomers} clients` : "No clients yet",
          },
          {
            title: "Active Accounts",
            value: activeCustomers,
            subtext:
              totalCustomers > 0
                ? `${Math.round((activeCustomers / totalCustomers) * 100)}% active rate`
                : "Portfolio idle",
            icon: CheckCircle,
            color: "emerald",
            badge: activeCustomers > 0 ? "Operational" : "0 active",
          },
          {
            title: "Pending Setup",
            value: pendingCustomers,
            subtext: pendingCustomers > 0 ? "Awaiting activation" : "All accounts verified",
            icon: Clock,
            color: "amber",
            badge: pendingCustomers > 0 ? `${pendingCustomers} pending` : "Clear",
          },
          {
            title: "This Month Signups",
            value: thisMonthCustomers,
            subtext: "Recent customer volume",
            icon: TrendingUp,
            color: "violet",
            badge: thisMonthCustomers > 0 ? `+${thisMonthCustomers} new` : "0 this month",
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-xs transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div
                  className={`p-1.5 rounded-lg ${
                    stat.color === "blue"
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                      : stat.color === "emerald"
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                      : stat.color === "amber"
                      ? "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
                      : "bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {stat.badge}
                </span>
              </div>

              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                {stat.subtext}
              </p>
            </div>
          );
        })}
      </div>

      {/* Customers Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs overflow-hidden">
        
        {/* Table Header & Toolbar */}
        <div className="px-5 pt-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Customer Portfolio
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage client accounts and card subscriptions
            </p>
          </div>

          {/* Tools: Search, Status Filter & CSV Export */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-44 lg:w-52"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
              {["all", "active", "pending"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-2 py-1 rounded-md text-[11px] font-semibold capitalize transition-colors ${
                    statusFilter === s
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Export CSV Button */}
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              title="Download CSV report"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>

          </div>

        </div>

        {/* Table / Empty State Container */}
        <div className="p-6">
          {filteredCustomers.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No Attributed Customers Found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-5">
                {searchQuery || statusFilter !== "all"
                  ? "No customers match your current search or status filter."
                  : "Share your customer onboarding link or register a client directly to start building your portfolio."}
              </p>
              <button
                onClick={() => setShowCustomerModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Register First Customer</span>
              </button>
            </div>
          ) : (
            <DynamicTable
              columns={columns}
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
          )}
        </div>

      </div>

    </div>
  );
};

export default PartnerDashboard;