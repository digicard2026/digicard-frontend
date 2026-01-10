// PartnerDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Copy,
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
} from "lucide-react";
import DynamicTable from "../../components/DynamicTable";
const API_URL = import.meta.env.VITE_API_URL;

const PartnerDashboard = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [partnerInfo, setPartnerInfo] = useState({
    partnerUserId: "",
    businessName: "",
    joinDate: "N/A",
  });
  const [loading, setLoading] = useState(true);

  // pagination state (passed to DynamicTable)
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch partner profile and customers
  const fetchPartnerAndCustomers = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("user_id"); // partner's USER ID stored at login
      if (!userId) {
        console.error("No user_id in localStorage");
        setLoading(false);
        return;
      }

      // Fetch partner profile by userId (adjust endpoint if your backend differs)
      const partnerRes = await fetch(`${API_URL}/api/v1/franchise-partner/profile/${userId}`

      );
      if (!partnerRes.ok) {
        throw new Error(`Partner profile fetch failed: ${partnerRes.status}`);
      }
      const partnerJson = await partnerRes.json();

      // If API returns structure like { success, data }
      const partner = partnerJson?.data || partnerJson;

      const partnerUserId = partner?.userId || userId;
      const businessName =
        partner?.businessName ||
        partner?.partnerDetails?.businessName ||
        "Your Business";
      const joinDate = partner?.createdAt
        ? new Date(partner.createdAt).toLocaleDateString()
        : "N/A";

      setPartnerInfo({
        partnerUserId,
        businessName,
        joinDate,
      });

      // Try fetch customers list using partner user id endpoint or fallback to partner.customers
      let customersList = [];
      // Preferred endpoint: returns { success, data: { customers: [...], total } }
      const customersRes = await fetch(`${API_URL}/api/v1/franchise-partner/${partnerUserId}/customers`
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
        // fallback: use customers embedded in partner doc
        customersList = partner?.customers || [];
        setTotalItems(customersList.length || 0);
      }

      setCustomers(customersList);
    } catch (err) {
      console.error("Error fetching partner/customers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // small safety timeout to stop loader if fetch hangs
    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 7000);

    fetchPartnerAndCustomers();

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopyPartnerId = () => {
    const id = partnerInfo.partnerUserId || localStorage.getItem("partner_user_id");
    if (id) {
      navigator.clipboard.writeText(id);
      alert("Partner User ID copied to clipboard!");
    } else {
      alert("Partner User ID not found.");
    }
  };

 // In PartnerDashboard.jsx - ensure this is correct
// const handleAddCustomer = () => {
//   navigate("/choose-plan", { 
//     state: { 
//       createdBy: partnerInfo.partnerUserId // This should be passed correctly
//     } 
//   });
// };

// In PartnerDashboard.jsx - update the handleAddCustomer function
const handleAddCustomer = () => {
  navigate("/", { 
    state: { 
      createdBy: partnerInfo.partnerUserId,
      fromPartnerDashboard: true // Add this flag
    } 
  });
};

  const handleViewCustomer = (customerId) => {
    navigate(`/customers/${customerId}`);
  };

  const handleEditCustomer = (customerId) => {
    navigate(`/customers/${customerId}/edit`);
  };

  const handlePageChange = (newPage) => setPage(newPage);
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(0);
  };

  // UI helpers
  const getProfileInitials = (item) => {
    if (!item) return "C";
    if (item.firstName) return item.firstName.charAt(0).toUpperCase();
    if (item.businessName) return item.businessName.charAt(0).toUpperCase();
    if (item.email) return item.email.split("@")[0].charAt(0).toUpperCase();
    return "C";
  };

  const getProfileColor = (item) => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-cyan-400",
      "bg-gradient-to-br from-emerald-500 to-teal-400",
      "bg-gradient-to-br from-violet-500 to-purple-400",
      "bg-gradient-to-br from-rose-500 to-pink-400",
      "bg-gradient-to-br from-amber-500 to-orange-400",
      "bg-gradient-to-br from-indigo-500 to-blue-400",
      "bg-gradient-to-br from-cyan-500 to-blue-400",
      "bg-gradient-to-br from-fuchsia-500 to-purple-400",
    ];
    const str = (item && (item._id || item.email || item.businessName)) || "default";
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", label: "Active", icon: CheckCircle },
      pending: { color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", label: "Pending", icon: Clock },
      inactive: { color: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200", label: "Inactive", icon: Clock },
    };
    const cfg = statusConfig[status] || statusConfig.pending;
    const Icon = cfg.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold ${cfg.bg} ${cfg.color} border ${cfg.border} shadow-sm`}>
        <Icon className="w-3 h-3" />
        {cfg.label}
      </span>
    );
  };

  // DynamicTable columns for customers
  const columns = [
    {
      header: "Customer",
      cell: ({ row }) => {
        const c = row.original;
        const fullName = c.firstName ? `${c.firstName} ${c.lastName || ""}`.trim() : c.businessName || "Unnamed Customer";
        return (
          <div className="flex items-center">
            <div className={`flex-shrink-0 h-11 w-11 ${getProfileColor(c)} rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md`}>
              {getProfileInitials(c)}
            </div>
            <div className="ml-4">
              <div className="text-sm font-bold text-gray-900">{fullName}</div>
              <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <Mail className="w-3 h-3" />
                {c.email || "No email"}
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
            <div className="text-sm text-gray-900 flex items-center gap-1 font-medium">
              <Phone className="w-3 h-3" />
              {c.phones?.[0]?.number || "No phone"}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {c.city || c.state || "-"}
            </div>
          </div>
        );
      },
    },
    {
      header: "Account",
      cell: ({ row }) => {
        const c = row.original;
        return (
          <div>
            <div className="text-sm text-gray-900 flex items-center gap-1 font-medium">
              <Building className="w-3 h-3" />
              {c.accountType || "Individual"}
            </div>
            <div className="text-sm text-gray-500 mt-1">{c.customerId || "-"}</div>
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
          <div>
            <div className="text-sm text-gray-900 font-medium">
              {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A"}
            </div>
            {c.createdAt && <div className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleTimeString()}</div>}
          </div>
        );
      },
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const c = row.original;
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleViewCustomer(c._id)}
              title="View Customer"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 flex items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <User className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleEditCustomer(c._id)}
              title="Edit Customer"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 flex items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <FileEdit className="w-4 h-4" />
            </button>
          </div>
        );
      },
    },
  ];

  // statistics
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const pendingCustomers = customers.filter((c) => c.status === "pending").length;
  const thisMonthCustomers = customers.filter((c) => {
    if (!c.createdAt) return false;
    const created = new Date(c.createdAt);
    const now = new Date();
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  }).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4">
            <Loader2 className="w-8 h-8 mx-auto text-gradient-to-r from-blue-600 to-purple-600" />
          </div>
          <p className="text-gray-700 text-lg font-medium">Loading your partner dashboard...</p>
          <p className="text-gray-500 text-sm mt-2">Getting everything ready for you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Partner Portal
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Welcome back, <span className="font-semibold text-gray-800">{partnerInfo.businessName}</span>! 🎉</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <div className="bg-white/90 backdrop-blur-lg border border-blue-100 rounded-2xl px-5 py-4 shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-sm text-blue-600 font-semibold flex items-center gap-2">
                <Target className="w-4 h-4" />
                Partner User ID
              </p>
              <div className="flex items-center gap-2 mt-2">
                <p className="font-mono text-sm font-bold text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg">
                  {partnerInfo.partnerUserId || "Not available"}
                </p>
                <button
                  onClick={handleCopyPartnerId}
                  className="text-blue-500 hover:text-blue-700 transition-all duration-200 p-2 hover:bg-blue-50 rounded-xl hover:scale-110"
                  title="Copy Partner User ID"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-blue-500 mt-2 font-medium">Use this ID for customer onboarding</p>
            </div>

            <div className="bg-white/90 backdrop-blur-lg border border-gray-100 rounded-2xl px-5 py-4 shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-sm text-gray-600 font-semibold flex items-center gap-2">
                <Award className="w-4 h-4" />
                Member Since
              </p>
              <p className="text-gray-800 font-bold text-lg flex items-center gap-2 mt-2">
                <Calendar className="w-5 h-5 text-purple-500" />
                {partnerInfo.joinDate}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddCustomer}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <UserPlus className="w-5 h-5" />
            Add New Customer
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Customers", value: totalCustomers, color: "blue", icon: Users, description: "Under your partnership", gradient: "from-blue-500 to-cyan-500" },
          { title: "Active", value: activeCustomers, color: "green", icon: CheckCircle, description: "Currently active", gradient: "from-emerald-500 to-teal-500" },
          { title: "Pending", value: pendingCustomers, color: "yellow", icon: Clock, description: "Awaiting activation", gradient: "from-amber-500 to-orange-500" },
          { title: "This Month", value: thisMonthCustomers, color: "purple", icon: TrendingUp, description: "New signups", gradient: "from-purple-500 to-fuchsia-500" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">{stat.title}</p>
                  <p className={`text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-3 font-medium">{stat.description}</p>
                </div>
                <div className={`p-4 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className={`h-1 mt-4 bg-gradient-to-r ${stat.gradient} rounded-full transform origin-left transition-transform duration-500 group-hover:scale-x-100 scale-x-90`}></div>
            </div>
          );
        })}
      </div>

      {/* Customers table */}
      <div className="mb-5 rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Customer Portfolio</h2>
              <p className="text-gray-600 mt-1">Manage your customer relationships</p>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-semibold text-gray-700">{totalCustomers} Customers</span>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-3">
            <DynamicTable
              columns={columns}
              data={customers}
              page={page}
              pageSize={pageSize}
              totalItems={totalItems}
              addItem={handleAddCustomer}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              searchBar={true}
              pagination={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;