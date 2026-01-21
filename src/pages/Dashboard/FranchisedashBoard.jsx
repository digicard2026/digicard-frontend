// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Copy,
//   Plus,
//   Users,
//   CheckCircle,
//   Clock,
//   TrendingUp,
//   UserPlus,
//   Calendar,
//   ChevronLeft,
//   ChevronRight,
//   User,
//   Building,
//   Mail,
//   Phone,
//   Loader2,
//   FileEdit,
//   CalendarPlus
// } from "lucide-react";
// import DynamicTable from '../../components/DynamicTable';
// const API_URL = import.meta.env.VITE_API_URL;
// const FranchiseDashboard = () => {
//   const navigate = useNavigate();
//   const [partners, setPartners] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [franchiseInfo, setFranchiseInfo] = useState({
//     franchiseId: '',
//     PersonalName: '',
//     joinDate: ''
//   });
//   const [totalItems, setTotalItems] = useState(0);
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
 
//   // Fetch franchise info and partners
//   const fetchFranchiseData = async () => {
//     try {
//       const userId = localStorage.getItem('user_id');
//       console.log('🔍 Fetching franchise data for user:', userId);
     
//       if (!userId) {
//         console.error('❌ No user ID found in localStorage');
//         setLoading(false);
//         return;
//       }
     
//       // Fetch franchise document using the user ID
//       const franchiseResponse = await fetch(`${API_URL}/api/v1/franchise-partner/franchise/${userId}`);

//       if (!franchiseResponse.ok) {
//         throw new Error(`HTTP error! status: ${franchiseResponse.status}`);
//       }
     
//       const franchiseData = await franchiseResponse.json();
//       console.log('✅ Franchise data received:', franchiseData);
     
//       if (franchiseData.success && franchiseData.data) {
//         const franchise = franchiseData.data;
       
//         const franchiseUserId = franchise.userId;
//         const franchiseDocumentId = franchise._id;
       
//         console.log('👤 Franchise User ID:', franchiseUserId);
//         console.log('🏢 Franchise Document ID:', franchiseDocumentId);
       
//         setFranchiseInfo({
//           franchiseId: franchiseUserId,
//           PersonalName: franchise.franchiseDetails?.PersonalName || 'Your Personal',
//           joinDate: franchise.createdAt ? new Date(franchise.createdAt).toLocaleDateString() : 'N/A'
//         });
 
//         // Store both IDs for different purposes
//         if (franchiseDocumentId) {
//           localStorage.setItem('franchise_id', franchiseDocumentId);
//         }
//         if (franchiseUserId) {
//           localStorage.setItem('franchise_user_id', franchiseUserId);
//         }
 
//         // Set partners from the franchise data
//         setPartners(franchise.partners || []);
//         setTotalItems(franchise.partners?.length || 0);
//       } else {
//         console.error('❌ No franchise data found in response');
//       }
//     } catch (error) {
//       console.error('💥 Error fetching franchise data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (loading) {
//         console.log('⏰ Loading timeout reached, stopping loader');
//         setLoading(false);
//       }
//     }, 5000);
 
//     fetchFranchiseData();
 
//     return () => clearTimeout(timeoutId);
//   }, []);
 
//   const addPartner = () => {
//     const franchiseUserId = franchiseInfo.franchiseId || localStorage.getItem('franchise_user_id');
   
//     console.log('🆕 Creating partner for franchise user:', franchiseUserId);
   
//     if (!franchiseUserId) {
//       alert('❌ Franchise User ID not found. Please refresh the page.');
//       return;
//     }
   
//     localStorage.setItem('franchise_user_id', franchiseUserId);
   
//     navigate('/signup', {
//       state: {
//         franchiseContext: true,
//         createdBy: franchiseUserId,
//         franchiseName: franchiseInfo.PersonalName
//       }
//     });
//   };
 
//   const handleCopyFranchiseId = () => {
//     const franchiseUserId = franchiseInfo.franchiseId || localStorage.getItem('franchise_user_id');
//     if (franchiseUserId) {
//       navigator.clipboard.writeText(franchiseUserId);
//       alert('✅ Franchise User ID copied to clipboard!');
//     } else {
//       alert('❌ Franchise User ID not found!');
//     }
//   };
 
//   // Action handlers for DynamicTable
//   const handleViewPartner = (partnerId) => {
//     navigate(`/partner-details/${partnerId}`);
//   };
 
//   const handleEditPartner = (partnerId) => {
//     navigate(`/edit-partner/${partnerId}`);
//   };
 
//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };
 
//   const handlePageSizeChange = (newSize) => {
//     setPageSize(newSize);
//     setPage(0);
//   };
 
//   // Get profile initials
//   const getProfileInitials = (partner) => {
//     if (partner.firstName && partner.firstName.trim()) {
//       return partner.firstName.charAt(0).toUpperCase();
//     }
//     if (partner.PersonalName && partner.PersonalName.trim()) {
//       return partner.PersonalName.charAt(0).toUpperCase();
//     }
//     if (partner.email && partner.email.trim()) {
//       return partner.email.split('@')[0].charAt(0).toUpperCase();
//     }
//     return 'P';
//   };
 
//   // Get profile color based on partner data
//   const getProfileColor = (partner) => {
//     const colors = [
//       'bg-blue-500', 'bg-green-500', 'bg-purple-500',
//       'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
//       'bg-orange-500', 'bg-cyan-500'
//     ];
   
//     const str = partner._id || partner.email || partner.PersonalName || 'default';
//     let hash = 0;
//     for (let i = 0; i < str.length; i++) {
//       hash = str.charCodeAt(i) + ((hash << 5) - hash);
//     }
   
//     return colors[Math.abs(hash) % colors.length];
//   };
 
//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       active: { color: 'text-green-800', bg: 'bg-green-100', border: 'border-green-200', label: 'Active', icon: CheckCircle },
//       pending: { color: 'text-yellow-800', bg: 'bg-yellow-100', border: 'border-yellow-200', label: 'Pending', icon: Clock },
//       inactive: { color: 'text-red-800', bg: 'bg-red-100', border: 'border-red-200', label: 'Inactive', icon: Clock },
//       rejected: { color: 'text-red-800', bg: 'bg-red-100', border: 'border-red-200', label: 'Rejected', icon: Clock }
//     };
   
//     const config = statusConfig[status] || statusConfig.pending;
//     const StatusIcon = config.icon;
   
//     return (
//       <span className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${config.bg} ${config.color} border ${config.border}`}>
//         <StatusIcon className="w-3 h-3" />
//         {config.label}
//       </span>
//     );
//   };
 
//   // DynamicTable columns configuration
//   const columns = [
//     {
//       header: 'Partner Details',
//       cell: ({ row }) => {
//         const partner = row.original;
//         if (!partner) return <span>No partner data</span>;
 
//         const fullName = partner.firstName && partner.firstName.trim()
//           ? `${partner.salutation || ''} ${partner.firstName} ${partner.lastName || ''}`.trim()
//           : partner.PersonalName || 'Unnamed Partner';
 
//         return (
//           <div className="flex items-center">
//             <div className={`flex-shrink-0 h-10 w-10 ${getProfileColor(partner)} rounded-lg flex items-center justify-center text-white font-semibold text-sm`}>
//               {getProfileInitials(partner)}
//             </div>
//             <div className="ml-4">
//               <div className="text-sm font-semibold text-gray-900">
//                 {fullName}
//               </div>
//               <div className="text-sm text-gray-500 flex items-center gap-1">
//                 <Mail className="w-3 h-3" />
//                 {partner.personalEmail || partner.email}
//               </div>
//             </div>
//           </div>
//         );
//       }
//     },
//     {
//       header: 'Personal',
//       cell: ({ row }) => {
//         const partner = row.original;
//         return (
//           <div>
//             <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
//               <Building className="w-3 h-3" />
//               {partner.PersonalName || 'No Personal Name'}
//             </div>
//             <div className="text-sm text-gray-500">
//               {partner.PersonalType || 'Not specified'}
//             </div>
//           </div>
//         );
//       }
//     },
//     {
//       header: 'Contact',
//       cell: ({ row }) => {
//         const partner = row.original;
//         return (
//           <div>
//             <div className="text-sm text-gray-900 flex items-center gap-1">
//               <Mail className="w-3 h-3" />
//               {partner.email}
//             </div>
//             <div className="text-sm text-gray-500 flex items-center gap-1">
//               <Phone className="w-3 h-3" />
//               {partner.phone || 'No phone'}
//             </div>
//           </div>
//         );
//       }
//     },
//     {
//       header: 'Status',
//       cell: ({ row }) => {
//         const partner = row.original;
//         return getStatusBadge(partner.status);
//       }
//     },
//     {
//       header: 'Join Date',
//       cell: ({ row }) => {
//         const partner = row.original;
//         return (
//           <div>
//             <div className="text-sm text-gray-900 flex items-center gap-1">
//               <Calendar className="w-3 h-3" />
//               {partner.createdAt ? new Date(partner.createdAt).toLocaleDateString() : 'N/A'}
//             </div>
//             {partner.createdAt && (
//               <div className="text-xs text-gray-400">
//                 {new Date(partner.createdAt).toLocaleTimeString()}
//               </div>
//             )}
//           </div>
//         );
//       }
//     },
//     {
//       header: 'Actions',
//       cell: ({ row }) => {
//         const partner = row.original;
//         return (
//           <div className="flex items-center gap-2">
//             <button
//               className="bg-blue-500 hover:bg-blue-600 flex items-center justify-center rounded px-3 py-1.5 text-xs font-medium text-white hover:text-white transition-colors"
//               onClick={() => handleViewPartner(partner._id)}
//               title="View Partner"
//             >
//               <User className="w-4 h-4" />
//             </button>
//             <button
//               className="bg-green-500 hover:bg-green-600 flex items-center justify-center rounded px-3 py-1.5 text-xs font-medium text-white hover:text-white transition-colors"
//               onClick={() => handleEditPartner(partner._id)}
//               title="Edit Partner"
//             >
//               <FileEdit className="w-4 h-4" />
//             </button>
//           </div>
//         );
//       }
//     }
//   ];
 
//   // Calculate stats
//   const totalPartners = partners.length;
//   const activePartners = partners.filter(partner => partner.status === 'active').length;
//   const pendingPartners = partners.filter(partner => partner.status === 'pending').length;
//   const thisMonthPartners = partners.filter(partner => {
//     if (!partner.createdAt) return false;
//     const created = new Date(partner.createdAt);
//     const now = new Date();
//     return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
//   }).length;
 
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-8 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4">
//             <Loader2 className="w-6 h-6 mx-auto text-blue-600" />
//           </div>
//           <p className="text-gray-600 text-lg">Loading your dashboard...</p>
//         </div>
//       </div>
//     );
//   }
 
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-8">
//       {/* Header with Franchise ID */}
//       <div className="flex justify-between items-start mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">
//             Franchise Dashboard
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Welcome back, {franchiseInfo.PersonalName}!
//           </p>
//           <div className="flex items-center gap-4 mt-4">
//             <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl px-4 py-3 shadow-sm">
//               <p className="text-sm text-blue-600 font-medium">Franchise User ID</p>
//               <div className="flex items-center gap-2">
//                 <p className="font-mono text-sm font-bold text-blue-800">
//                   {franchiseInfo.franchiseId ? `${franchiseInfo.franchiseId}` : 'Not available'}
//                 </p>
//                 <button
//                   onClick={handleCopyFranchiseId}
//                   className="text-blue-500 hover:text-blue-700 transition-colors p-1 hover:bg-blue-50 rounded"
//                   title="Copy Franchise User ID"
//                 >
//                   <Copy className="w-4 h-4" />
//                 </button>
//               </div>
//               <p className="text-xs text-blue-400 mt-1">Use this User ID to add partners</p>
//             </div>
//             <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
//               <p className="text-sm text-gray-600 font-medium">Member Since</p>
//               <p className="text-gray-800 font-semibold flex items-center gap-2">
//                 <Calendar className="w-4 h-4" />
//                 {franchiseInfo.joinDate}
//               </p>
//             </div>
//           </div>
//         </div>
       
//         {/* Add Partner Button - Keeping the original button style */}
//         <button
//           onClick={addPartner}
//           className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
//         >
//           <UserPlus className="w-4 h-4" />
//           Add New Partner
//         </button>
//       </div>
 
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         {[
//           {
//             title: "Total Partners",
//             value: totalPartners,
//             color: "blue",
//             icon: Users,
//             description: "Under your franchise"
//           },
//           {
//             title: "Active Partners",
//             value: activePartners,
//             color: "green",
//             icon: CheckCircle,
//             description: "Currently active"
//           },
//           {
//             title: "Pending Approval",
//             value: pendingPartners,
//             color: "yellow",
//             icon: Clock,
//             description: "Awaiting activation"
//           },
//           {
//             title: "This Month",
//             value: thisMonthPartners,
//             color: "purple",
//             icon: TrendingUp,
//             description: "New additions"
//           }
//         ].map((stat, index) => {
//           const IconComponent = stat.icon;
//           return (
//             <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">{stat.title}</p>
//                   <p className={`text-3xl font-bold ${
//                     stat.color === 'blue' ? 'text-blue-600' :
//                     stat.color === 'green' ? 'text-green-600' :
//                     stat.color === 'yellow' ? 'text-yellow-600' :
//                     'text-purple-600'
//                   } mt-2`}>{stat.value}</p>
//                   <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
//                 </div>
//                 <div className={`p-3 rounded-xl ${
//                   stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
//                   stat.color === 'green' ? 'bg-green-50 text-green-600' :
//                   stat.color === 'yellow' ? 'bg-yellow-50 text-yellow-600' :
//                   'bg-purple-50 text-purple-600'
//                 }`}>
//                   <IconComponent className="w-6 h-6" />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
 
//       {/* Partner Management with DynamicTable */}
//       <div className="mb-5 rounded-md bg-white dark:bg-zinc-800">
//         <div className="p-5 pt-7">
//           <div className="grid grid-cols-12 lg:grid-cols-12 gap-3">
//             <DynamicTable
//               columns={columns}
//               data={partners}
//               page={page}
//               pageSize={pageSize}
//               totalItems={totalItems}
//               addPatient={addPartner}
//               onPageChange={handlePageChange}
//               onPageSizeChange={handlePageSizeChange}
//               searchBar={true}
//               pagination={true}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default FranchiseDashboard;
 
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Copy,
//   Plus,
//   Users,
//   CheckCircle,
//   Clock,
//   TrendingUp,
//   UserPlus,
//   Calendar,
//   ChevronLeft,
//   ChevronRight,
//   User,
//   Building,
//   Mail,
//   Phone,
//   Loader2,
//   FileEdit,
//   CalendarPlus,
//   ChevronDown,
//   UserCircle,
//   ShoppingBag
// } from "lucide-react";
// import DynamicTable from '../../components/DynamicTable';

// const API_URL = import.meta.env.VITE_API_URL;

// const FranchiseDashboard = () => {
//   const navigate = useNavigate();
//   const [partners, setPartners] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [franchiseInfo, setFranchiseInfo] = useState({
//     franchiseId: '',
//     PersonalName: '',
//     joinDate: ''
//   });
//   const [totalItems, setTotalItems] = useState(0);
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [activeTab, setActiveTab] = useState('partners'); // 'partners' or 'customers'
//   const [showAddDropdown, setShowAddDropdown] = useState(false);

//   // Fetch franchise info, partners and customers
//   const fetchFranchiseData = async () => {
//     try {
//       const userId = localStorage.getItem('user_id');
//       console.log('🔍 Fetching franchise data for user:', userId);
     
//       if (!userId) {
//         console.error('❌ No user ID found in localStorage');
//         setLoading(false);
//         return;
//       }
     
//       // Fetch franchise document using the user ID
//       const franchiseResponse = await fetch(`${API_URL}/api/v1/franchise-partner/franchise/${userId}`);

//       if (!franchiseResponse.ok) {
//         throw new Error(`HTTP error! status: ${franchiseResponse.status}`);
//       }
     
//       const franchiseData = await franchiseResponse.json();
//       console.log('✅ Franchise data received:', franchiseData);
     
//       if (franchiseData.success && franchiseData.data) {
//         const franchise = franchiseData.data;
       
//         const franchiseUserId = franchise.userId;
//         const franchiseDocumentId = franchise._id;
       
//         console.log('👤 Franchise User ID:', franchiseUserId);
//         console.log('🏢 Franchise Document ID:', franchiseDocumentId);
       
//         setFranchiseInfo({
//           franchiseId: franchiseUserId,
//           PersonalName: franchise.franchiseDetails?.PersonalName || 'Your Personal',
//           joinDate: franchise.createdAt ? new Date(franchise.createdAt).toLocaleDateString() : 'N/A'
//         });

//         // Store both IDs for different purposes
//         if (franchiseDocumentId) {
//           localStorage.setItem('franchise_id', franchiseDocumentId);
//         }
//         if (franchiseUserId) {
//           localStorage.setItem('franchise_user_id', franchiseUserId);
//         }

//         // Set partners from the franchise data
//         setPartners(franchise.partners || []);
//         setTotalItems(franchise.partners?.length || 0);

//         // TODO: Fetch customers data for this franchise
//         // This would be a separate API call
//         // For now, we'll simulate empty customers array
//         setCustomers([]);
        
//       } else {
//         console.error('❌ No franchise data found in response');
//       }
//     } catch (error) {
//       console.error('💥 Error fetching franchise data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (loading) {
//         console.log('⏰ Loading timeout reached, stopping loader');
//         setLoading(false);
//       }
//     }, 5000);
 
//     fetchFranchiseData();
 
//     return () => clearTimeout(timeoutId);
//   }, []);

//   const addPartner = () => {
//     const franchiseUserId = franchiseInfo.franchiseId || localStorage.getItem('franchise_user_id');
   
//     console.log('🆕 Creating partner for franchise user:', franchiseUserId);
   
//     if (!franchiseUserId) {
//       alert('❌ Franchise User ID not found. Please refresh the page.');
//       return;
//     }
   
//     localStorage.setItem('franchise_user_id', franchiseUserId);
   
//     navigate('/signup', {
//       state: {
//         franchiseContext: true,
//         createdBy: franchiseUserId,
//         franchiseName: franchiseInfo.PersonalName
//       }
//     });
//   };

//   const addCustomer = () => {
//     const franchiseUserId = franchiseInfo.franchiseId || localStorage.getItem('franchise_user_id');
   
//     console.log('🆕 Creating customer for franchise user:', franchiseUserId);
   
//     if (!franchiseUserId) {
//       alert('❌ Franchise User ID not found. Please refresh the page.');
//       return;
//     }
   
//     localStorage.setItem('franchise_user_id', franchiseUserId);
   
//     // TODO: Navigate to customer creation page
//     // For now, we'll show an alert
//     alert('Customer creation functionality will be implemented here');
//     // navigate('/add-customer', {
//     //   state: {
//     //     franchiseContext: true,
//     //     createdBy: franchiseUserId,
//     //     franchiseName: franchiseInfo.PersonalName
//     //   }
//     // });
//   };
 
//   const handleCopyFranchiseId = () => {
//     const franchiseUserId = franchiseInfo.franchiseId || localStorage.getItem('franchise_user_id');
//     if (franchiseUserId) {
//       navigator.clipboard.writeText(franchiseUserId);
//       alert('✅ Franchise User ID copied to clipboard!');
//     } else {
//       alert('❌ Franchise User ID not found!');
//     }
//   };
 
//   // Action handlers for DynamicTable - Partners
//   const handleViewPartner = (partnerId) => {
//     navigate(`/partner-details/${partnerId}`);
//   };
 
//   const handleEditPartner = (partnerId) => {
//     navigate(`/edit-partner/${partnerId}`);
//   };

//   // Action handlers for DynamicTable - Customers
//   const handleViewCustomer = (customerId) => {
//     // TODO: Navigate to customer details page
//     console.log('View customer:', customerId);
//   };

//   const handleEditCustomer = (customerId) => {
//     // TODO: Navigate to customer edit page
//     console.log('Edit customer:', customerId);
//   };
 
//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };
 
//   const handlePageSizeChange = (newSize) => {
//     setPageSize(newSize);
//     setPage(0);
//   };
 
//   // Get profile initials
//   const getProfileInitials = (person) => {
//     if (person.firstName && person.firstName.trim()) {
//       return person.firstName.charAt(0).toUpperCase();
//     }
//     if (person.name && person.name.trim()) {
//       return person.name.charAt(0).toUpperCase();
//     }
//     if (person.PersonalName && person.PersonalName.trim()) {
//       return person.PersonalName.charAt(0).toUpperCase();
//     }
//     if (person.email && person.email.trim()) {
//       return person.email.split('@')[0].charAt(0).toUpperCase();
//     }
//     return 'P';
//   };
 
//   // Get profile color based on data
//   const getProfileColor = (person) => {
//     const colors = [
//       'bg-blue-500', 'bg-green-500', 'bg-purple-500',
//       'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
//       'bg-orange-500', 'bg-cyan-500'
//     ];
   
//     const str = person._id || person.email || person.PersonalName || person.name || 'default';
//     let hash = 0;
//     for (let i = 0; i < str.length; i++) {
//       hash = str.charCodeAt(i) + ((hash << 5) - hash);
//     }
   
//     return colors[Math.abs(hash) % colors.length];
//   };
 
//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       active: { color: 'text-green-800', bg: 'bg-green-100', border: 'border-green-200', label: 'Active', icon: CheckCircle },
//       pending: { color: 'text-yellow-800', bg: 'bg-yellow-100', border: 'border-yellow-200', label: 'Pending', icon: Clock },
//       inactive: { color: 'text-red-800', bg: 'bg-red-100', border: 'border-red-200', label: 'Inactive', icon: Clock },
//       rejected: { color: 'text-red-800', bg: 'bg-red-100', border: 'border-red-200', label: 'Rejected', icon: Clock }
//     };
   
//     const config = statusConfig[status] || statusConfig.pending;
//     const StatusIcon = config.icon;
   
//     return (
//       <span className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${config.bg} ${config.color} border ${config.border}`}>
//         <StatusIcon className="w-3 h-3" />
//         {config.label}
//       </span>
//     );
//   };
 
//   // DynamicTable columns configuration for Partners
//   const partnerColumns = [
//     {
//       header: 'Partner Details',
//       cell: ({ row }) => {
//         const partner = row.original;
//         if (!partner) return <span>No partner data</span>;
 
//         const fullName = partner.firstName && partner.firstName.trim()
//           ? `${partner.salutation || ''} ${partner.firstName} ${partner.lastName || ''}`.trim()
//           : partner.PersonalName || 'Unnamed Partner';
 
//         return (
//           <div className="flex items-center">
//             <div className={`flex-shrink-0 h-10 w-10 ${getProfileColor(partner)} rounded-lg flex items-center justify-center text-white font-semibold text-sm`}>
//               {getProfileInitials(partner)}
//             </div>
//             <div className="ml-4">
//               <div className="text-sm font-semibold text-gray-900">
//                 {fullName}
//               </div>
//               <div className="text-sm text-gray-500 flex items-center gap-1">
//                 <Mail className="w-3 h-3" />
//                 {partner.personalEmail || partner.email}
//               </div>
//             </div>
//           </div>
//         );
//       }
//     },
//     {
//       header: 'Personal',
//       cell: ({ row }) => {
//         const partner = row.original;
//         return (
//           <div>
//             <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
//               <Building className="w-3 h-3" />
//               {partner.PersonalName || 'No Personal Name'}
//             </div>
//             <div className="text-sm text-gray-500">
//               {partner.PersonalType || 'Not specified'}
//             </div>
//           </div>
//         );
//       }
//     },
//     {
//       header: 'Contact',
//       cell: ({ row }) => {
//         const partner = row.original;
//         return (
//           <div>
//             <div className="text-sm text-gray-900 flex items-center gap-1">
//               <Mail className="w-3 h-3" />
//               {partner.email}
//             </div>
//             <div className="text-sm text-gray-500 flex items-center gap-1">
//               <Phone className="w-3 h-3" />
//               {partner.phone || 'No phone'}
//             </div>
//           </div>
//         );
//       }
//     },
//     {
//       header: 'Status',
//       cell: ({ row }) => {
//         const partner = row.original;
//         return getStatusBadge(partner.status);
//       }
//     },
//     {
//       header: 'Join Date',
//       cell: ({ row }) => {
//         const partner = row.original;
//         return (
//           <div>
//             <div className="text-sm text-gray-900 flex items-center gap-1">
//               <Calendar className="w-3 h-3" />
//               {partner.createdAt ? new Date(partner.createdAt).toLocaleDateString() : 'N/A'}
//             </div>
//             {partner.createdAt && (
//               <div className="text-xs text-gray-400">
//                 {new Date(partner.createdAt).toLocaleTimeString()}
//               </div>
//             )}
//           </div>
//         );
//       }
//     },
//     {
//       header: 'Actions',
//       cell: ({ row }) => {
//         const partner = row.original;
//         return (
//           <div className="flex items-center gap-2">
//             <button
//               className="bg-blue-500 hover:bg-blue-600 flex items-center justify-center rounded px-3 py-1.5 text-xs font-medium text-white hover:text-white transition-colors"
//               onClick={() => handleViewPartner(partner._id)}
//               title="View Partner"
//             >
//               <User className="w-4 h-4" />
//             </button>
//             <button
//               className="bg-green-500 hover:bg-green-600 flex items-center justify-center rounded px-3 py-1.5 text-xs font-medium text-white hover:text-white transition-colors"
//               onClick={() => handleEditPartner(partner._id)}
//               title="Edit Partner"
//             >
//               <FileEdit className="w-4 h-4" />
//             </button>
//           </div>
//         );
//       }
//     }
//   ];

//   // DynamicTable columns configuration for Customers
//   const customerColumns = [
//     {
//       header: 'Customer Details',
//       cell: ({ row }) => {
//         const customer = row.original;
//         if (!customer) return <span>No customer data</span>;
 
//         const fullName = customer.name || 'Unnamed Customer';
 
//         return (
//           <div className="flex items-center">
//             <div className={`flex-shrink-0 h-10 w-10 ${getProfileColor(customer)} rounded-lg flex items-center justify-center text-white font-semibold text-sm`}>
//               {getProfileInitials(customer)}
//             </div>
//             <div className="ml-4">
//               <div className="text-sm font-semibold text-gray-900">
//                 {fullName}
//               </div>
//               <div className="text-sm text-gray-500 flex items-center gap-1">
//                 <Mail className="w-3 h-3" />
//                 {customer.email || 'No email'}
//               </div>
//             </div>
//           </div>
//         );
//       }
//     },
//     {
//       header: 'Contact',
//       cell: ({ row }) => {
//         const customer = row.original;
//         return (
//           <div>
//             <div className="text-sm text-gray-900 flex items-center gap-1">
//               <Phone className="w-3 h-3" />
//               {customer.phone || 'No phone'}
//             </div>
//             <div className="text-sm text-gray-500">
//               {customer.address || 'No address'}
//             </div>
//           </div>
//         );
//       }
//     },
//     {
//       header: 'Status',
//       cell: ({ row }) => {
//         const customer = row.original;
//         return getStatusBadge(customer.status || 'active');
//       }
//     },
//     {
//       header: 'Join Date',
//       cell: ({ row }) => {
//         const customer = row.original;
//         return (
//           <div>
//             <div className="text-sm text-gray-900 flex items-center gap-1">
//               <Calendar className="w-3 h-3" />
//               {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}
//             </div>
//           </div>
//         );
//       }
//     },
//     {
//       header: 'Total Orders',
//       cell: ({ row }) => {
//         const customer = row.original;
//         return (
//           <div className="text-sm font-semibold text-gray-900">
//             {customer.totalOrders || 0}
//           </div>
//         );
//       }
//     },
//     {
//       header: 'Actions',
//       cell: ({ row }) => {
//         const customer = row.original;
//         return (
//           <div className="flex items-center gap-2">
//             <button
//               className="bg-blue-500 hover:bg-blue-600 flex items-center justify-center rounded px-3 py-1.5 text-xs font-medium text-white hover:text-white transition-colors"
//               onClick={() => handleViewCustomer(customer._id)}
//               title="View Customer"
//             >
//               <User className="w-4 h-4" />
//             </button>
//             <button
//               className="bg-green-500 hover:bg-green-600 flex items-center justify-center rounded px-3 py-1.5 text-xs font-medium text-white hover:text-white transition-colors"
//               onClick={() => handleEditCustomer(customer._id)}
//               title="Edit Customer"
//             >
//               <FileEdit className="w-4 h-4" />
//             </button>
//           </div>
//         );
//       }
//     }
//   ];
 
//   // Calculate stats - updated to include customers
//   const totalPartners = partners.length;
//   const activePartners = partners.filter(partner => partner.status === 'active').length;
//   const pendingPartners = partners.filter(partner => partner.status === 'pending').length;
//   const thisMonthPartners = partners.filter(partner => {
//     if (!partner.createdAt) return false;
//     const created = new Date(partner.createdAt);
//     const now = new Date();
//     return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
//   }).length;

//   // For now, using dummy data for customer stats
//   const totalCustomers = customers.length;
//   const activeCustomers = customers.filter(customer => customer.status === 'active').length;
 
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-8 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4">
//             <Loader2 className="w-6 h-6 mx-auto text-blue-600" />
//           </div>
//           <p className="text-gray-600 text-lg">Loading your dashboard...</p>
//         </div>
//       </div>
//     );
//   }
 
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-8">
//       {/* Header with Franchise ID */}
//       <div className="flex justify-between items-start mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">
//             Franchise Dashboard
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Welcome back, {franchiseInfo.PersonalName}!
//           </p>
//           <div className="flex items-center gap-4 mt-4">
//             <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl px-4 py-3 shadow-sm">
//               <p className="text-sm text-blue-600 font-medium">Franchise User ID</p>
//               <div className="flex items-center gap-2">
//                 <p className="font-mono text-sm font-bold text-blue-800">
//                   {franchiseInfo.franchiseId ? `${franchiseInfo.franchiseId}` : 'Not available'}
//                 </p>
//                 <button
//                   onClick={handleCopyFranchiseId}
//                   className="text-blue-500 hover:text-blue-700 transition-colors p-1 hover:bg-blue-50 rounded"
//                   title="Copy Franchise User ID"
//                 >
//                   <Copy className="w-4 h-4" />
//                 </button>
//               </div>
//               <p className="text-xs text-blue-400 mt-1">Use this User ID to add partners/customers</p>
//             </div>
//             <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
//               <p className="text-sm text-gray-600 font-medium">Member Since</p>
//               <p className="text-gray-800 font-semibold flex items-center gap-2">
//                 <Calendar className="w-4 h-4" />
//                 {franchiseInfo.joinDate}
//               </p>
//             </div>
//           </div>
//         </div>
       
//         {/* Add Dropdown Button */}
//         <div className="relative">
//           <button
//             onClick={() => setShowAddDropdown(!showAddDropdown)}
//             className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
//           >
//             <Plus className="w-4 h-4" />
//             Add New
//             <ChevronDown className="w-4 h-4" />
//           </button>
          
//           {showAddDropdown && (
//             <>
//               <div 
//                 className="fixed inset-0 z-10" 
//                 onClick={() => setShowAddDropdown(false)}
//               />
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
//                 <button
//                   onClick={() => {
//                     addPartner();
//                     setShowAddDropdown(false);
//                   }}
//                   className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
//                 >
//                   <UserPlus className="w-4 h-4" />
//                   <div>
//                     <div className="font-medium">Add Partner</div>
//                     <div className="text-xs text-gray-500">Add a new partner</div>
//                   </div>
//                 </button>
//                 <button
//                   onClick={() => {
//                     addCustomer();
//                     setShowAddDropdown(false);
//                   }}
//                   className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors border-t border-gray-100"
//                 >
//                   <UserCircle className="w-4 h-4" />
//                   <div>
//                     <div className="font-medium">Add Customer</div>
//                     <div className="text-xs text-gray-500">Add a new customer</div>
//                   </div>
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
 
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         {[
//           {
//             title: "Total Partners",
//             value: totalPartners,
//             color: "blue",
//             icon: Users,
//             description: "Under your franchise"
//           },
//           {
//             title: "Active Partners",
//             value: activePartners,
//             color: "green",
//             icon: CheckCircle,
//             description: "Currently active"
//           },
//           {
//             title: "Pending Approval",
//             value: pendingPartners,
//             color: "yellow",
//             icon: Clock,
//             description: "Awaiting activation"
//           },
//           {
//             title: "Total Customers",
//             value: totalCustomers,
//             color: "purple",
//             icon: ShoppingBag,
//             description: "Customer base"
//           }
//         ].map((stat, index) => {
//           const IconComponent = stat.icon;
//           return (
//             <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">{stat.title}</p>
//                   <p className={`text-3xl font-bold ${
//                     stat.color === 'blue' ? 'text-blue-600' :
//                     stat.color === 'green' ? 'text-green-600' :
//                     stat.color === 'yellow' ? 'text-yellow-600' :
//                     'text-purple-600'
//                   } mt-2`}>{stat.value}</p>
//                   <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
//                 </div>
//                 <div className={`p-3 rounded-xl ${
//                   stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
//                   stat.color === 'green' ? 'bg-green-50 text-green-600' :
//                   stat.color === 'yellow' ? 'bg-yellow-50 text-yellow-600' :
//                   'bg-purple-50 text-purple-600'
//                 }`}>
//                   <IconComponent className="w-6 h-6" />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Tab Navigation */}
//       <div className="mb-6 border-b border-gray-200">
//         <nav className="flex space-x-8">
//           <button
//             onClick={() => setActiveTab('partners')}
//             className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
//               activeTab === 'partners'
//                 ? 'border-blue-600 text-blue-600'
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <div className="flex items-center gap-2">
//               <Users className="w-4 h-4" />
//               Partners
//               <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full ml-2">
//                 {partners.length}
//               </span>
//             </div>
//           </button>
//           <button
//             onClick={() => setActiveTab('customers')}
//             className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
//               activeTab === 'customers'
//                 ? 'border-blue-600 text-blue-600'
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <div className="flex items-center gap-2">
//               <ShoppingBag className="w-4 h-4" />
//               Customers
//               <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full ml-2">
//                 {customers.length}
//               </span>
//             </div>
//           </button>
//         </nav>
//       </div>
 
//       {/* Management Tables */}
//       <div className="mb-5 rounded-md bg-white dark:bg-zinc-800">
//         <div className="p-5 pt-7">
//           <div className="grid grid-cols-12 lg:grid-cols-12 gap-3">
//             {activeTab === 'partners' ? (
//               <DynamicTable
//                 columns={partnerColumns}
//                 data={partners}
//                 page={page}
//                 pageSize={pageSize}
//                 totalItems={partners.length}
//                 addPatient={addPartner}
//                 onPageChange={handlePageChange}
//                 onPageSizeChange={handlePageSizeChange}
//                 searchBar={true}
//                 pagination={true}
//               />
//             ) : (
//               <DynamicTable
//                 columns={customerColumns}
//                 data={customers}
//                 page={page}
//                 pageSize={pageSize}
//                 totalItems={customers.length}
//                 addPatient={addCustomer}
//                 onPageChange={handlePageChange}
//                 onPageSizeChange={handlePageSizeChange}
//                 searchBar={true}
//                 pagination={true}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default FranchiseDashboard;



import React, { useState, useEffect } from "react";
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
  ChevronLeft,
  ChevronRight,
  User,
  Building,
  Mail,
  Phone,
  Loader2,
  FileEdit,
  CalendarPlus,
  ChevronDown,
  UserCircle,
  ShoppingBag,
  X
} from "lucide-react";
import DynamicTable from '../../components/DynamicTable';
import SignupForm from '../../components/SignupForm'; // Assuming you have this component

const API_URL = import.meta.env.VITE_API_URL;

const FranchiseDashboard = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [franchiseInfo, setFranchiseInfo] = useState({
    franchiseId: '',
    PersonalName: '',
    joinDate: ''
  });
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [activeTab, setActiveTab] = useState('partners');
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [isCreatingPartner, setIsCreatingPartner] = useState(false);

  // Fetch franchise info, partners and customers
  const fetchFranchiseData = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      console.log('🔍 Fetching franchise data for user:', userId);
     
      if (!userId) {
        console.error('❌ No user ID found in localStorage');
        setLoading(false);
        return;
      }
     
      // Fetch franchise document using the user ID
      const franchiseResponse = await fetch(`${API_URL}/api/v1/franchise-partner/franchise/${userId}`);

      if (!franchiseResponse.ok) {
        throw new Error(`HTTP error! status: ${franchiseResponse.status}`);
      }
     
      const franchiseData = await franchiseResponse.json();
      console.log('✅ Franchise data received:', franchiseData);
     
      if (franchiseData.success && franchiseData.data) {
        const franchise = franchiseData.data;
       
        const franchiseUserId = franchise.userId;
        const franchiseDocumentId = franchise._id;
       
        console.log('👤 Franchise User ID:', franchiseUserId);
        console.log('🏢 Franchise Document ID:', franchiseDocumentId);
       
        setFranchiseInfo({
          franchiseId: franchiseUserId,
          PersonalName: franchise.franchiseDetails?.firstName || 'Your Personal',
          joinDate: franchise.createdAt ? new Date(franchise.createdAt).toLocaleDateString() : 'N/A'
        });

        // Store both IDs for different purposes
        if (franchiseDocumentId) {
          localStorage.setItem('franchise_id', franchiseDocumentId);
        }
        if (franchiseUserId) {
          localStorage.setItem('franchise_user_id', franchiseUserId);
        }

        // Set partners from the franchise data
        setPartners(franchise.partners || []);
        setTotalItems(franchise.partners?.length || 0);

        // TODO: Fetch customers data for this franchise
        setCustomers([]);
        
      } else {
        console.error('❌ No franchise data found in response');
      }
    } catch (error) {
      console.error('💥 Error fetching franchise data:', error);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.log('⏰ Loading timeout reached, stopping loader');
        setLoading(false);
      }
    }, 5000);
 
    fetchFranchiseData();
 
    return () => clearTimeout(timeoutId);
  }, []);

  const addPartner = () => {
    const franchiseUserId = franchiseInfo.franchiseId || localStorage.getItem('franchise_user_id');
   
    console.log('🆕 Creating partner for franchise user:', franchiseUserId);
   
    if (!franchiseUserId) {
      alert('❌ Franchise User ID not found. Please refresh the page.');
      return;
    }
   
    localStorage.setItem('franchise_user_id', franchiseUserId);
    setIsCreatingPartner(true);
    setShowSignupModal(true);
    setShowAddDropdown(false);
  };

  const addCustomer = () => {
    const franchiseUserId = franchiseInfo.franchiseId || localStorage.getItem('franchise_user_id');
   
    console.log('🆕 Creating customer for franchise user:', franchiseUserId);
   
    if (!franchiseUserId) {
      alert('❌ Franchise User ID not found. Please refresh the page.');
      return;
    }
   
    localStorage.setItem('franchise_user_id', franchiseUserId);
    setIsCreatingPartner(false);
    setShowCustomerModal(true);
    setShowAddDropdown(false);
  };
 
  const handleCopyFranchiseId = () => {
    const franchiseUserId = franchiseInfo.franchiseId || localStorage.getItem('franchise_user_id');
    if (franchiseUserId) {
      navigator.clipboard.writeText(franchiseUserId);
      alert('✅ Franchise User ID copied to clipboard!');
    } else {
      alert('❌ Franchise User ID not found!');
    }
  };

  const handleSignupSuccess = (newPartner) => {
    // Refresh partners list
    fetchFranchiseData();
    setShowSignupModal(false);
    alert('✅ Partner added successfully!');
  };

  const handleCustomerSuccess = (newCustomer) => {
    // Refresh customers list
    // You'll need to implement this based on your API
    setShowCustomerModal(false);
    alert('✅ Customer added successfully!');
  };
 
  // Action handlers for DynamicTable - Partners
  const handleViewPartner = (partnerId) => {
    navigate(`/partner-details/${partnerId}`);
  };
 
  const handleEditPartner = (partnerId) => {
    navigate(`/edit-partner/${partnerId}`);
  };

  // Action handlers for DynamicTable - Customers
  const handleViewCustomer = (customerId) => {
    console.log('View customer:', customerId);
  };

  const handleEditCustomer = (customerId) => {
    console.log('Edit customer:', customerId);
  };
 
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
 
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(0);
  };
 
  // Get profile initials
  const getProfileInitials = (person) => {
    if (person.firstName && person.firstName.trim()) {
      return person.firstName.charAt(0).toUpperCase();
    }
    if (person.name && person.name.trim()) {
      return person.name.charAt(0).toUpperCase();
    }
    if (person.PersonalName && person.PersonalName.trim()) {
      return person.PersonalName.charAt(0).toUpperCase();
    }
    if (person.email && person.email.trim()) {
      return person.email.split('@')[0].charAt(0).toUpperCase();
    }
    return 'P';
  };
 
  // Get profile color based on data
  const getProfileColor = (person) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500',
      'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
      'bg-orange-500', 'bg-cyan-500'
    ];
   
    const str = person._id || person.email || person.PersonalName || person.name || 'default';
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
   
    return colors[Math.abs(hash) % colors.length];
  };
 
  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'text-green-800', bg: 'bg-green-100', border: 'border-green-200', label: 'Active', icon: CheckCircle },
      pending: { color: 'text-yellow-800', bg: 'bg-yellow-100', border: 'border-yellow-200', label: 'Pending', icon: Clock },
      inactive: { color: 'text-red-800', bg: 'bg-red-100', border: 'border-red-200', label: 'Inactive', icon: Clock },
      rejected: { color: 'text-red-800', bg: 'bg-red-100', border: 'border-red-200', label: 'Rejected', icon: Clock }
    };
   
    const config = statusConfig[status] || statusConfig.pending;
    const StatusIcon = config.icon;
   
    return (
      <span className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${config.bg} ${config.color} border ${config.border}`}>
        <StatusIcon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };
 
  // DynamicTable columns configuration for Partners
  const partnerColumns = [
    {
      header: 'Partner Details',
      cell: ({ row }) => {
        const partner = row.original;
        if (!partner) return <span>No partner data</span>;
 
        const fullName = partner.firstName && partner.firstName.trim()
          ? `${partner.salutation || ''} ${partner.firstName} ${partner.lastName || ''}`.trim()
          : partner.PersonalName || 'Unnamed Partner';
 
        return (
          <div className="flex items-center">
            <div className={`flex-shrink-0 h-10 w-10 ${getProfileColor(partner)} rounded-lg flex items-center justify-center text-white font-semibold text-sm`}>
              {getProfileInitials(partner)}
            </div>
            <div className="ml-4">
              <div className="text-sm font-semibold text-gray-900">
                {fullName}
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {partner.personalEmail || partner.email}
              </div>
            </div>
          </div>
        );
      }
    },
    {
      header: 'Personal',
      cell: ({ row }) => {
        const partner = row.original;
        return (
          <div>
            <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
              <Building className="w-3 h-3" />
              {partner.PersonalName || 'No Personal Name'}
            </div>
            <div className="text-sm text-gray-500">
              {partner.PersonalType || 'Not specified'}
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
            <div className="text-sm text-gray-900 flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {partner.email}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {partner.phone || 'No phone'}
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
          <div>
            <div className="text-sm text-gray-900 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {partner.createdAt ? new Date(partner.createdAt).toLocaleDateString() : 'N/A'}
            </div>
            {partner.createdAt && (
              <div className="text-xs text-gray-400">
                {new Date(partner.createdAt).toLocaleTimeString()}
              </div>
            )}
          </div>
        );
      }
    },
    {
      header: 'Actions',
      cell: ({ row }) => {
        const partner = row.original;
        return (
          <div className="flex items-center gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 flex items-center justify-center rounded px-3 py-1.5 text-xs font-medium text-white hover:text-white transition-colors"
              onClick={() => handleViewPartner(partner._id)}
              title="View Partner"
            >
              <User className="w-4 h-4" />
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 flex items-center justify-center rounded px-3 py-1.5 text-xs font-medium text-white hover:text-white transition-colors"
              onClick={() => handleEditPartner(partner._id)}
              title="Edit Partner"
            >
              <FileEdit className="w-4 h-4" />
            </button>
          </div>
        );
      }
    }
  ];

  // DynamicTable columns configuration for Customers
  const customerColumns = [
    {
      header: 'Customer Details',
      cell: ({ row }) => {
        const customer = row.original;
        if (!customer) return <span>No customer data</span>;
 
        const fullName = customer.name || 'Unnamed Customer';
 
        return (
          <div className="flex items-center">
            <div className={`flex-shrink-0 h-10 w-10 ${getProfileColor(customer)} rounded-lg flex items-center justify-center text-white font-semibold text-sm`}>
              {getProfileInitials(customer)}
            </div>
            <div className="ml-4">
              <div className="text-sm font-semibold text-gray-900">
                {fullName}
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {customer.email || 'No email'}
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
          <div>
            <div className="text-sm text-gray-900 flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {customer.phone || 'No phone'}
            </div>
            <div className="text-sm text-gray-500">
              {customer.address || 'No address'}
            </div>
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
      header: 'Join Date',
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <div>
            <div className="text-sm text-gray-900 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}
            </div>
          </div>
        );
      }
    },
    {
      header: 'Total Orders',
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <div className="text-sm font-semibold text-gray-900">
            {customer.totalOrders || 0}
          </div>
        );
      }
    },
    {
      header: 'Actions',
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <div className="flex items-center gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 flex items-center justify-center rounded px-3 py-1.5 text-xs font-medium text-white hover:text-white transition-colors"
              onClick={() => handleViewCustomer(customer._id)}
              title="View Customer"
            >
              <User className="w-4 h-4" />
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 flex items-center justify-center rounded px-3 py-1.5 text-xs font-medium text-white hover:text-white transition-colors"
              onClick={() => handleEditCustomer(customer._id)}
              title="Edit Customer"
            >
              <FileEdit className="w-4 h-4" />
            </button>
          </div>
        );
      }
    }
  ];
 
  // Calculate stats
  const totalPartners = partners.length;
  const activePartners = partners.filter(partner => partner.status === 'active').length;
  const pendingPartners = partners.filter(partner => partner.status === 'pending').length;
  const totalCustomers = customers.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4">
            <Loader2 className="w-6 h-6 mx-auto text-blue-600" />
          </div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-8">
      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowSignupModal(false)} />
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Add New Partner
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Create a new partner account under your franchise
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      Franchise: {franchiseInfo.PersonalName}
                    </div>
                    <div className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">
                      ID: {franchiseInfo.franchiseId?.substring(0, 8)}...
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowSignupModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Body - Reusing your existing signup form */}
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

      {/* Customer Modal - You'll need to create this similarly */}
      {showCustomerModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowCustomerModal(false)} />
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl">
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Add New Customer
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Add a new customer to your franchise
                  </p>
                </div>
                <button
                  onClick={() => setShowCustomerModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                {/* TODO: Create or reuse a CustomerForm component */}
                <div className="text-center py-12">
                  <UserCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Customer Form
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Customer form will be implemented here
                  </p>
                  <button
                    onClick={() => setShowCustomerModal(false)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Header with Franchise ID */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Franchise Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {franchiseInfo.PersonalName}!
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl px-4 py-3 shadow-sm">
              <p className="text-sm text-blue-600 font-medium">Franchise User ID</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-sm font-bold text-blue-800">
                  {franchiseInfo.franchiseId ? `${franchiseInfo.franchiseId}` : 'Not available'}
                </p>
                <button
                  onClick={handleCopyFranchiseId}
                  className="text-blue-500 hover:text-blue-700 transition-colors p-1 hover:bg-blue-50 rounded"
                  title="Copy Franchise User ID"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-blue-400 mt-1">Use this User ID to add partners/customers</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
              <p className="text-sm text-gray-600 font-medium">Member Since</p>
              <p className="text-gray-800 font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {franchiseInfo.joinDate}
              </p>
            </div>
          </div>
        </div>
       
        {/* Add Dropdown Button */}
        <div className="relative">
          <button
            onClick={() => setShowAddDropdown(!showAddDropdown)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            Add New
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {showAddDropdown && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowAddDropdown(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                <button
                  onClick={addPartner}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <div>
                    <div className="font-medium">Add Partner</div>
                    <div className="text-xs text-gray-500">Add a new partner</div>
                  </div>
                </button>
                <button
                  onClick={addCustomer}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors border-t border-gray-100"
                >
                  <UserCircle className="w-4 h-4" />
                  <div>
                    <div className="font-medium">Add Customer</div>
                    <div className="text-xs text-gray-500">Add a new customer</div>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
 
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            title: "Total Partners",
            value: totalPartners,
            color: "blue",
            icon: Users,
            description: "Under your franchise"
          },
          {
            title: "Active Partners",
            value: activePartners,
            color: "green",
            icon: CheckCircle,
            description: "Currently active"
          },
          {
            title: "Pending Approval",
            value: pendingPartners,
            color: "yellow",
            icon: Clock,
            description: "Awaiting activation"
          },
          {
            title: "Total Customers",
            value: totalCustomers,
            color: "purple",
            icon: ShoppingBag,
            description: "Customer base"
          }
        ].map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-3xl font-bold ${
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'yellow' ? 'text-yellow-600' :
                    'text-purple-600'
                  } mt-2`}>{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-xl ${
                  stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                  stat.color === 'green' ? 'bg-green-50 text-green-600' :
                  stat.color === 'yellow' ? 'bg-yellow-50 text-yellow-600' :
                  'bg-purple-50 text-purple-600'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('partners')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'partners'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Partners
              <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full ml-2">
                {partners.length}
              </span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'customers'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Customers
              <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full ml-2">
                {customers.length}
              </span>
            </div>
          </button>
        </nav>
      </div>
 
      {/* Management Tables */}
      <div className="mb-5 rounded-md bg-white dark:bg-zinc-800">
        <div className="p-5 pt-7">
          <div className="grid grid-cols-12 lg:grid-cols-12 gap-3">
            {activeTab === 'partners' ? (
              <DynamicTable
                columns={partnerColumns}
                data={partners}
                page={page}
                pageSize={pageSize}
                totalItems={partners.length}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                searchBar={true}
                pagination={true}
              />
            ) : (
              <DynamicTable
                columns={customerColumns}
                data={customers}
                page={page}
                pageSize={pageSize}
                totalItems={customers.length}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                searchBar={true}
                pagination={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default FranchiseDashboard;