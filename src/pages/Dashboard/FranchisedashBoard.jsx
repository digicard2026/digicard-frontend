// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const FranchiseDashboard = () => {
//   const navigate = useNavigate();
//   const [partners, setPartners] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [franchiseInfo, setFranchiseInfo] = useState({
//     franchiseId: '', // This will now store the USER ID
//     PersonalName: '',
//     joinDate: ''
//   });

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
//       const franchiseResponse = await fetch(`http://localhost:3000/api/v1/franchise-partner/franchise/${userId}`);
      
//       if (!franchiseResponse.ok) {
//         throw new Error(`HTTP error! status: ${franchiseResponse.status}`);
//       }
      
//       const franchiseData = await franchiseResponse.json();
//       console.log('✅ Franchise data received:', franchiseData);
      
//       if (franchiseData.success && franchiseData.data) {
//         const franchise = franchiseData.data;
        
//         // ✅ FIX: Use the USER ID from franchise document, not the franchise _id
//         const franchiseUserId = franchise.userId; // This is the user ID "690991b6c53064331e4ad1fc"
//         const franchiseDocumentId = franchise._id; // This is the franchise document ID "69099bc0c9ebd9fa03313abc"
        
//         console.log('👤 Franchise User ID:', franchiseUserId);
//         console.log('🏢 Franchise Document ID:', franchiseDocumentId);
        
//         setFranchiseInfo({
//           franchiseId: franchiseUserId, // ✅ Now using USER ID
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
//     const franchiseId = localStorage.getItem('franchise_id');
    
//     if (!franchiseId) {
//       alert('❌ Franchise ID not found. Please refresh the page.');
//       return;
//     }
    
//     navigate('/signup', { 
//       state: { 
//         franchiseContext: true,
//         createdBy: franchiseId,
//         franchiseName: franchiseInfo.PersonalName
//       }
//     });
//   };

//   const handleCopyFranchiseId = () => {
//     // ✅ Now copying the USER ID instead of franchise document ID
//     const franchiseUserId = franchiseInfo.franchiseId || localStorage.getItem('franchise_user_id');
//     if (franchiseUserId) {
//       navigator.clipboard.writeText(franchiseUserId);
//       alert('✅ Franchise User ID copied to clipboard!');
//     } else {
//       alert('❌ Franchise User ID not found!');
//     }
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
//       active: { color: 'text-green-800', bg: 'bg-green-100', border: 'border-green-200', label: 'Active' },
//       pending: { color: 'text-yellow-800', bg: 'bg-yellow-100', border: 'border-yellow-200', label: 'Pending' },
//       inactive: { color: 'text-red-800', bg: 'bg-red-100', border: 'border-red-200', label: 'Inactive' },
//       rejected: { color: 'text-red-800', bg: 'bg-red-100', border: 'border-red-200', label: 'Rejected' }
//     };
    
//     const config = statusConfig[status] || statusConfig.pending;
    
//     return (
//       <span className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${config.bg} ${config.color} border ${config.border}`}>
//         <span className={`w-1.5 h-1.5 rounded-full ${config.color.replace('text-', 'bg-')}`}></span>
//         {config.label}
//       </span>
//     );
//   };

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
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
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
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                   </svg>
//                 </button>
//               </div>
//               <p className="text-xs text-blue-400 mt-1">Use this User ID to add partners</p>
//             </div>
//             <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
//               <p className="text-sm text-gray-600 font-medium">Member Since</p>
//               <p className="text-gray-800 font-semibold">{franchiseInfo.joinDate}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         {[
//           { 
//             title: "Total Partners", 
//             value: totalPartners, 
//             color: "blue",
//             icon: "👥",
//             description: "Under your franchise"
//           },
//           { 
//             title: "Active Partners", 
//             value: activePartners, 
//             color: "green",
//             icon: "✅",
//             description: "Currently active"
//           },
//           { 
//             title: "Pending Approval", 
//             value: pendingPartners, 
//             color: "yellow",
//             icon: "⏳",
//             description: "Awaiting activation"
//           },
//           { 
//             title: "This Month", 
//             value: thisMonthPartners, 
//             color: "purple",
//             icon: "📈",
//             description: "New additions"
//           }
//         ].map((stat, index) => (
//           <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">{stat.title}</p>
//                 <p className={`text-3xl font-bold ${
//                   stat.color === 'blue' ? 'text-blue-600' :
//                   stat.color === 'green' ? 'text-green-600' :
//                   stat.color === 'yellow' ? 'text-yellow-600' :
//                   'text-purple-600'
//                 } mt-2`}>{stat.value}</p>
//                 <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
//               </div>
//               <div className="text-2xl">{stat.icon}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Partner Management */}
//       <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
//         {/* Header */}
//         <div className="px-6 py-4 border-b border-gray-200/60 bg-gradient-to-r from-gray-50 to-white">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h5 className="text-xl font-semibold text-gray-800">Partner Management</h5>
//               <p className="text-sm text-gray-600 mt-1">Manage all your franchise partners</p>
//             </div>
//             <div className="mt-4 sm:mt-0">
//               <button
//                 onClick={addPartner}
//                 className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                 </svg>
//                 Add New Partner
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm">
//               <tr className="border-b border-gray-200/60">
//                 <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
//                   Partner
//                 </th>
//                 <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
//                   Personal
//                 </th>
//                 <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
//                   Contact
//                 </th>
//                 <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
//                   Join Date
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200/60">
//               {partners.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-12 text-center">
//                     <div className="flex flex-col items-center justify-center text-gray-500">
//                       <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                         <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                         </svg>
//                       </div>
//                       <p className="text-lg font-medium text-gray-400">No partners found</p>
//                       <p className="text-sm mt-1 text-gray-500">Get started by adding your first partner</p>
//                       <button
//                         onClick={addPartner}
//                         className="mt-4 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-lg hover:shadow-xl"
//                       >
//                         Add First Partner
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 partners.map((partner, index) => (
//                   <tr 
//                     key={partner._id || index} 
//                     className="hover:bg-blue-50/30 transition-colors duration-150 group"
//                   >
//                     <td className="py-4 px-6">
//                       <div className="flex items-center">
//                         <div className={`flex-shrink-0 h-12 w-12 ${getProfileColor(partner)} rounded-xl flex items-center justify-center text-white font-semibold text-lg group-hover:scale-105 transition-transform duration-200`}>
//                           {getProfileInitials(partner)}
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
//                             {partner.firstName && partner.firstName.trim() 
//                               ? `${partner.salutation || ''} ${partner.firstName} ${partner.lastName || ''}`.trim()
//                               : partner.PersonalName || 'Unnamed Partner'
//                             }
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {partner.personalEmail || partner.email}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="py-4 px-6">
//                       <div>
//                         <div className="text-sm font-medium text-gray-900">
//                           {partner.PersonalName || 'No Personal Name'}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {partner.PersonalType || 'Not specified'}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="py-4 px-6">
//                       <div className="text-sm text-gray-900">{partner.email}</div>
//                       <div className="text-sm text-gray-500">{partner.phone}</div>
//                     </td>
//                     <td className="py-4 px-6">
//                       {getStatusBadge(partner.status)}
//                     </td>
//                     <td className="py-4 px-6">
//                       <div className="text-sm text-gray-900">
//                         {partner.createdAt ? new Date(partner.createdAt).toLocaleDateString() : 'N/A'}
//                       </div>
//                       {partner.createdAt && (
//                         <div className="text-xs text-gray-400">
//                           {new Date(partner.createdAt).toLocaleTimeString()}
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Table Footer */}
//         {partners.length > 0 && (
//           <div className="px-6 py-4 border-t border-gray-200/60 bg-gradient-to-r from-gray-50/80 to-white">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//               <div className="text-sm text-gray-600 mb-4 sm:mb-0">
//                 Showing <span className="font-semibold text-gray-800">{partners.length}</span> partners
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
//                   Previous
//                 </button>
//                 <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
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
  CalendarPlus
} from "lucide-react";
import DynamicTable from '../../components/DynamicTable';
const API_URL = import.meta.env.VITE_API_URL;
const FranchiseDashboard = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [franchiseInfo, setFranchiseInfo] = useState({
    franchiseId: '',
    PersonalName: '',
    joinDate: ''
  });
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
 
  // Fetch franchise info and partners
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
          PersonalName: franchise.franchiseDetails?.PersonalName || 'Your Personal',
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
   
    navigate('/signup', {
      state: {
        franchiseContext: true,
        createdBy: franchiseUserId,
        franchiseName: franchiseInfo.PersonalName
      }
    });
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
 
  // Action handlers for DynamicTable
  const handleViewPartner = (partnerId) => {
    navigate(`/partner-details/${partnerId}`);
  };
 
  const handleEditPartner = (partnerId) => {
    navigate(`/edit-partner/${partnerId}`);
  };
 
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
 
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(0);
  };
 
  // Get profile initials
  const getProfileInitials = (partner) => {
    if (partner.firstName && partner.firstName.trim()) {
      return partner.firstName.charAt(0).toUpperCase();
    }
    if (partner.PersonalName && partner.PersonalName.trim()) {
      return partner.PersonalName.charAt(0).toUpperCase();
    }
    if (partner.email && partner.email.trim()) {
      return partner.email.split('@')[0].charAt(0).toUpperCase();
    }
    return 'P';
  };
 
  // Get profile color based on partner data
  const getProfileColor = (partner) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500',
      'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
      'bg-orange-500', 'bg-cyan-500'
    ];
   
    const str = partner._id || partner.email || partner.PersonalName || 'default';
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
 
  // DynamicTable columns configuration
  const columns = [
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
 
  // Calculate stats
  const totalPartners = partners.length;
  const activePartners = partners.filter(partner => partner.status === 'active').length;
  const pendingPartners = partners.filter(partner => partner.status === 'pending').length;
  const thisMonthPartners = partners.filter(partner => {
    if (!partner.createdAt) return false;
    const created = new Date(partner.createdAt);
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
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-8">
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
              <p className="text-xs text-blue-400 mt-1">Use this User ID to add partners</p>
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
       
        {/* Add Partner Button - Keeping the original button style */}
        <button
          onClick={addPartner}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <UserPlus className="w-4 h-4" />
          Add New Partner
        </button>
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
            title: "This Month",
            value: thisMonthPartners,
            color: "purple",
            icon: TrendingUp,
            description: "New additions"
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
 
      {/* Partner Management with DynamicTable */}
      <div className="mb-5 rounded-md bg-white dark:bg-zinc-800">
        <div className="p-5 pt-7">
          <div className="grid grid-cols-12 lg:grid-cols-12 gap-3">
            <DynamicTable
              columns={columns}
              data={partners}
              page={page}
              pageSize={pageSize}
              totalItems={totalItems}
              addPatient={addPartner}
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
 
export default FranchiseDashboard;
 