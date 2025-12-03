// import React, { useMemo, useState } from "react";
// import { FiUser, FiUsers, FiSearch, FiBell } from "react-icons/fi";

// const mockCustomers = Array.from({ length: 42 }).map((_, i) => ({
//   id: `CUST-${1000 + i}`,
//   name: [
//     "Aarav Singh",
//     "Maya Patel",
//     "Rohit Sharma",
//     "Neha Gupta",
//     "Sana Khan",
//     "Aditya Verma",
//     "Priya Reddy",
//     "Vikram Das",
//     "Ishita Bose",
//     "Karan Mehra",
//   ][i % 10],
//   email: `customer${i}@example.com`,
//   phone: `+91-9${Math.floor(100000000 + Math.random() * 900000000)}`,
//   joinedAt: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 200))
//     .toISOString()
//     .slice(0, 10),
//   active: Math.random() > 0.35,
// }));

// function Topbar({ onSearch, query, setQuery }) {
//   return (
//     <header className="flex items-center justify-between gap-4 p-4 bg-white shadow-sm rounded-md">
//       <div className="flex items-center gap-3">
//         <div className="relative">
//           <input
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && onSearch && onSearch(query)}
//             placeholder="Search customers by name, email or ID"
//             className="pl-10 pr-4 py-2 border rounded-md w-96 text-sm"
//           />
//           <div className="absolute left-3 top-2 text-slate-400">
//             <FiSearch />
//           </div>
//         </div>

//         <button className="hidden md:inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm">
//           New Customer
//         </button>
//       </div>

//       <div className="flex items-center gap-4">
//         <button className="p-2 rounded-md hover:bg-slate-100">
//           <FiBell />
//         </button>
//         <div className="flex items-center gap-3">
//           <div className="text-right">
//             <div className="text-sm font-medium">Partner Admin</div>
//             <div className="text-xs text-slate-500">partner@co.com</div>
//           </div>
//           <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-semibold">
//             PA
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// function StatCard({ title, value, icon, delta }) {
//   return (
//     <div className="bg-white rounded-lg shadow-sm p-4 w-full">
//       <div className="flex items-start justify-between gap-4">
//         <div>
//           <div className="text-sm text-slate-500">{title}</div>
//           <div className="mt-1 text-2xl font-semibold">{value}</div>
//         </div>
//         <div className="text-3xl text-sky-600">{icon}</div>
//       </div>
//       {delta && <div className="mt-3 text-sm text-slate-500">{delta}</div>}
//     </div>
//   );
// }

// function CustomerTable({ data, page, setPage, pageSize, total, onToggleActive }) {
//   const totalPages = Math.max(1, Math.ceil(total / pageSize));

//   return (
//     <div className="bg-white shadow-sm rounded-md overflow-hidden">
//       <table className="min-w-full text-sm">
//         <thead className="bg-slate-50">
//           <tr>
//             <th className="px-4 py-3 text-left">ID</th>
//             <th className="px-4 py-3 text-left">Name</th>
//             <th className="px-4 py-3 text-left">Email</th>
//             <th className="px-4 py-3 text-left">Phone</th>
//             <th className="px-4 py-3 text-left">Joined</th>
//             <th className="px-4 py-3 text-left">Status</th>
//             <th className="px-4 py-3 text-right">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((c) => (
//             <tr key={c.id} className="border-b last:border-b-0 hover:bg-slate-50">
//               <td className="px-4 py-3 font-mono text-xs text-slate-600">{c.id}</td>
//               <td className="px-4 py-3 font-medium">{c.name}</td>
//               <td className="px-4 py-3">{c.email}</td>
//               <td className="px-4 py-3">{c.phone}</td>
//               <td className="px-4 py-3">{c.joinedAt}</td>
//               <td className="px-4 py-3">
//                 <span
//                   className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${
//                     c.active
//                       ? "bg-emerald-100 text-emerald-700"
//                       : "bg-rose-100 text-rose-700"
//                   }`}
//                 >
//                   {c.active ? "Active" : "Inactive"}
//                 </span>
//               </td>
//               <td className="px-4 py-3 text-right">
//                 <button
//                   onClick={() => onToggleActive(c.id)}
//                   className="px-3 py-1 text-sm rounded-md border"
//                 >
//                   {c.active ? "Deactivate" : "Activate"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="flex items-center justify-between p-3 border-t bg-slate-50">
//         <div className="text-sm text-slate-600">
//           Showing page {page} of {totalPages}
//         </div>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => setPage(1)}
//             disabled={page === 1}
//             className="px-3 py-1 border rounded-md text-sm"
//           >
//             First
//           </button>
//           <button
//             onClick={() => setPage(Math.max(1, page - 1))}
//             disabled={page === 1}
//             className="px-3 py-1 border rounded-md text-sm"
//           >
//             Prev
//           </button>
//           <button
//             onClick={() => setPage(Math.min(totalPages, page + 1))}
//             disabled={page === totalPages}
//             className="px-3 py-1 border rounded-md text-sm"
//           >
//             Next
//           </button>
//           <button
//             onClick={() => setPage(totalPages)}
//             disabled={page === totalPages}
//             className="px-3 py-1 border rounded-md text-sm"
//           >
//             Last
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function PartnerDashboard() {
//   const [customers, setCustomers] = useState(mockCustomers);
//   const [query, setQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const pageSize = 10;

//   const totalCustomers = customers.length;
//   const activeCustomers = customers.filter((c) => c.active).length;

//   const filtered = useMemo(() => {
//     if (!query) return customers;
//     const q = query.toLowerCase();
//     return customers.filter(
//       (c) =>
//         c.name.toLowerCase().includes(q) ||
//         c.email.toLowerCase().includes(q) ||
//         c.id.toLowerCase().includes(q)
//     );
//   }, [customers, query]);

//   const total = filtered.length;
//   const paginated = useMemo(() => {
//     const start = (page - 1) * pageSize;
//     return filtered.slice(start, start + pageSize);
//   }, [filtered, page]);

//   function handleSearch(q) {
//     setPage(1);
//     setQuery(q);
//   }

//   function handleToggleActive(id) {
//     setCustomers((prev) =>
//       prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-800 p-6">
//       <div className="mb-6">
//         <Topbar onSearch={handleSearch} query={query} setQuery={setQuery} />
//       </div>

//       <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <StatCard
//           title="Total Customers"
//           value={totalCustomers}
//           icon={<FiUsers />}
//           delta={`Active: ${activeCustomers}`}
//         />
//         <StatCard
//           title="Active Customers"
//           value={activeCustomers}
//           icon={<FiUser />}
//           delta={`${Math.round(
//             (activeCustomers / Math.max(1, totalCustomers)) * 100
//           )}% of total`}
//         />
//         <div className="bg-white rounded-lg shadow-sm p-4">
//           <h3 className="text-sm text-slate-500">Quick Actions</h3>
//           <div className="mt-3 flex flex-col gap-2">
//             <button className="w-full text-left px-3 py-2 border rounded-md">
//               Invite Customer
//             </button>
//             <button className="w-full text-left px-3 py-2 border rounded-md">
//               Export CSV
//             </button>
//             <button className="w-full text-left px-3 py-2 border rounded-md">
//               Settings
//             </button>
//           </div>
//         </div>
//       </section>

//       <section>
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-semibold">Customers</h2>
//           <div className="text-sm text-slate-500">{total} customers found</div>
//         </div>

//         <CustomerTable
//           data={paginated}
//           page={page}
//           setPage={setPage}
//           pageSize={pageSize}
//           total={total}
//           onToggleActive={handleToggleActive}
//         />
//       </section>
//     </div>
//   );
// }





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
      const partnerRes = await fetch(
        `${API_URL}/api/v1/partner/profile/${userId}`
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
      const customersRes = await fetch(
        `${API_URL}/api/v1/partner/${partnerUserId}/customers`
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

  const handleAddCustomer = () => {
    // route to create new customer page (adjust as needed)
    navigate("/choose-plan", {
      state: { createdBy: partnerInfo.partnerUserId, partnerName: partnerInfo.businessName },
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
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-orange-500",
      "bg-cyan-500",
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
      active: { color: "text-green-800", bg: "bg-green-100", border: "border-green-200", label: "Active", icon: CheckCircle },
      pending: { color: "text-yellow-800", bg: "bg-yellow-100", border: "border-yellow-200", label: "Pending", icon: Clock },
      inactive: { color: "text-red-800", bg: "bg-red-100", border: "border-red-200", label: "Inactive", icon: Clock },
    };
    const cfg = statusConfig[status] || statusConfig.pending;
    const Icon = cfg.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 py-1 px-2 rounded-full text-xs font-medium ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
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
            <div className={`flex-shrink-0 h-10 w-10 ${getProfileColor(c)} rounded-lg flex items-center justify-center text-white font-semibold text-sm`}>
              {getProfileInitials(c)}
            </div>
            <div className="ml-4">
              <div className="text-sm font-semibold text-gray-900">{fullName}</div>
              <div className="text-sm text-gray-500 flex items-center gap-1">
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
            <div className="text-sm text-gray-900 flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {c.phone || "No phone"}
            </div>
            <div className="text-sm text-gray-500">{c.city || c.state || "-"}</div>
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
            <div className="text-sm text-gray-900 flex items-center gap-1">
              <Building className="w-3 h-3" />
              {c.accountType || "Individual"}
            </div>
            <div className="text-sm text-gray-500">{c.customerId || "-"}</div>
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
            <div className="text-sm text-gray-900">
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
              className="bg-blue-500 hover:bg-blue-600 flex items-center justify-center rounded px-3 py-1.5 text-xs font-medium text-white transition-colors"
            >
              <User className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleEditCustomer(c._id)}
              title="Edit Customer"
              className="bg-green-500 hover:bg-green-600 flex items-center justify-center rounded px-3 py-1.5 text-xs font-medium text-white transition-colors"
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4">
            <Loader2 className="w-6 h-6 mx-auto text-blue-600" />
          </div>
          <p className="text-gray-600 text-lg">Loading your partner dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Partner Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {partnerInfo.businessName}!</p>

          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl px-4 py-3 shadow-sm">
              <p className="text-sm text-blue-600 font-medium">Partner User ID</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-sm font-bold text-blue-800">
                  {partnerInfo.partnerUserId || "Not available"}
                </p>
                <button
                  onClick={handleCopyPartnerId}
                  className="text-blue-500 hover:text-blue-700 transition-colors p-1 hover:bg-blue-50 rounded"
                  title="Copy Partner User ID"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-blue-400 mt-1">Use this User ID for customer onboarding</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
              <p className="text-sm text-gray-600 font-medium">Member Since</p>
              <p className="text-gray-800 font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {partnerInfo.joinDate}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddCustomer}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <UserPlus className="w-4 h-4" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Customers", value: totalCustomers, color: "blue", icon: Users, description: "Under your account" },
          { title: "Active", value: activeCustomers, color: "green", icon: CheckCircle, description: "Currently active" },
          { title: "Pending", value: pendingCustomers, color: "yellow", icon: Clock, description: "Awaiting activation" },
          { title: "This Month", value: thisMonthCustomers, color: "purple", icon: TrendingUp, description: "New signups" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.color === "blue" ? "text-blue-600" : stat.color === "green" ? "text-green-600" : stat.color === "yellow" ? "text-yellow-600" : "text-purple-600"} mt-2`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color === "blue" ? "bg-blue-50 text-blue-600" : stat.color === "green" ? "bg-green-50 text-green-600" : stat.color === "yellow" ? "bg-yellow-50 text-yellow-600" : "bg-purple-50 text-purple-600"}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Customers table */}
      <div className="mb-5 rounded-md bg-white">
        <div className="p-5 pt-7">
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

