// import React, { useState } from 'react';
// import { 
//   Building2, 
//   Users, 
//   UserCircle, 
//   CreditCard,
//   Search, 
//   Filter,
//   TrendingUp,
//   Bell,
//   ChevronDown,
//   Plus,
//   Eye,
//   Edit,
//   Trash2,
//   Download,
//   BarChart3,
//   Wallet,
//   CheckCircle,
//   XCircle,
//   Clock,
//   DollarSign,
//   Activity
// } from 'lucide-react';

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('franchise');

//   // Dashboard statistics
//   const dashboardStats = {
//     franchise: {
//       total: 48,
//       active: 42,
//       pending: 6,
//       growth: 83,
//       revenue: '$245230',
//       icon: Building2,
//       color: 'bg-blue-500'
//     },
//     partners: {
//       total: 156,
//       active: 142,
//       newThisMonth: 24,
//       growth: 125,
//       icon: Users,
//       color: 'bg-green-500'
//     },
//     customers: {
//       total: 12456,
//       active: 11890,
//       newToday: 128,
//       growth: 15.2,
//       icon: UserCircle,
//       color: 'bg-purple-500'
//     },
//     transactions: {
//       total: 8942,
//       volume: '$1.2M',
//       successRate: 98.7,
//       growth: 5.3,
//       icon: CreditCard,
//       color: 'bg-orange-500'
//     }
//   };

//   // Franchise data
//   const franchiseData = [
//     { 
//       id: 1, 
//       name: 'Downtown DigiCard Center', 
//       location: 'New York', 
//       status: 'Active', 
//       revenue: '$4230', 
//       customers: 1245,
//       cardsIssued: 2340,
//       manager: 'John Smith',
//       joined: '2023-06-15'
//     },
//     { 
//       id: 2, 
//       name: 'Westside Financial Hub', 
//       location: 'Los Angeles', 
//       status: 'Active', 
//       revenue: '$38450', 
//       customers: 989,
//       cardsIssued: 1850,
//       manager: 'Emma Johnson',
//       joined: '2023-08-22'
//     },
//     { 
//       id: 3, 
//       name: 'North Digital Center', 
//       location: 'Chicago', 
//       status: 'Pending', 
//       revenue: '$22150', 
//       customers: 632,
//       cardsIssued: 1120,
//       manager: 'Michael Brown',
//       joined: '2024-01-10'
//     },
//     { 
//       id: 4, 
//       name: 'South Fintech Hub', 
//       location: 'Houston', 
//       status: 'Active', 
//       revenue: '$51,780', 
//       customers: 1598,
//       cardsIssued: 2980,
//       manager: 'Sarah Davis',
//       joined: '2023-04-05'
//     },
//     { 
//       id: 5, 
//       name: 'East Digital Finance', 
//       location: 'Miami', 
//       status: 'Inactive', 
//       revenue: '$15620', 
//       customers: 387,
//       cardsIssued: 720,
//       manager: 'David Wilson',
//       joined: '2023-11-30'
//     },
//   ];

//   // Partners data (banks, merchants, etc.)
//   const partnersData = [
//     { 
//       id: 1, 
//       name: 'Global Bank Inc.', 
//       type: 'Banking Partner', 
//       status: 'Active', 
//       commissionRate: '2.5%', 
//       totalTransactions: 12450,
//       revenueShare: '$32,580',
//       joined: '2023-01-15'
//     },
//     { 
//       id: 2, 
//       name: 'Tech Retail Group', 
//       type: 'Merchant Partner', 
//       status: 'Active', 
//       commissionRate: '1.8%', 
//       totalTransactions: 8920,
//       revenueShare: '$18,450',
//       joined: '2023-03-22'
//     },
//     { 
//       id: 3, 
//       name: 'QuickPay Solutions', 
//       type: 'Payment Gateway', 
//       status: 'Pending', 
//       commissionRate: '3.2%', 
//       totalTransactions: 0,
//       revenueShare: '$0',
//       joined: '2024-01-05'
//     },
//     { 
//       id: 4, 
//       name: 'Urban Mall Chain', 
//       type: 'Merchant Partner', 
//       status: 'Active', 
//       commissionRate: '2.2%', 
//       totalTransactions: 15230,
//       revenueShare: '$42150',
//       joined: '2022-11-10'
//     },
//     { 
//       id: 5, 
//       name: 'Digital Finance Corp', 
//       type: 'Financial Partner', 
//       status: 'Active', 
//       commissionRate: '2.8%', 
//       totalTransactions: 9870,
//       revenueShare: '$28,760',
//       joined: '2023-07-18'
//     },
//   ];

//   // Customers data
//   const customersData = [
//     { 
//       id: 1, 
//       name: 'Alex Turner', 
//       email: 'alex@example.com', 
//       cardType: 'Platinum', 
//       status: 'Active', 
//       balance: '$2,450',
//       joined: '2024-01-01',
//       lastTransaction: '2024-01-15',
//       totalSpent: '$12,450'
//     },
//     { 
//       id: 2, 
//       name: 'Lisa Wong', 
//       email: 'lisa@example.com', 
//       cardType: 'Gold', 
//       status: 'Active', 
//       balance: '$1280',
//       joined: '2024-01-05',
//       lastTransaction: '2024-01-14',
//       totalSpent: '$8920'
//     },
//     { 
//       id: 3, 
//       name: 'Robert King', 
//       email: 'robert@example.com', 
//       cardType: 'Business', 
//       status: 'Active', 
//       balance: '$5,620',
//       joined: '2023-12-15',
//       lastTransaction: '2024-01-13',
//       totalSpent: '$45,230'
//     },
//     { 
//       id: 4, 
//       name: 'Maria Garcia', 
//       email: 'maria@example.com', 
//       cardType: 'Silver', 
//       status: 'Inactive', 
//       balance: '$0',
//       joined: '2023-11-20',
//       lastTransaction: '2023-12-28',
//       totalSpent: '$3,450'
//     },
//     { 
//       id: 5, 
//       name: 'James Miller', 
//       email: 'james@example.com', 
//       cardType: 'Gold', 
//       status: 'Active', 
//       balance: '$890',
//       joined: '2024-01-10',
//       lastTransaction: '2024-01-12',
//       totalSpent: '$2,150'
//     },
//   ];

//   const StatCard = ({ title, data }) => {
//     const Icon = data.icon;
//     return (
//       <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
//         <div className="flex items-center justify-between mb-4">
//           <div className={`p-3 rounded-lg ${data.color} text-white`}>
//             <Icon size={24} />
//           </div>
//           <div className="flex items-center text-green-500 text-sm">
//             <TrendingUp size={16} className="mr-1" />
//             {data.growth}%
//           </div>
//         </div>
//         <h3 className="text-2xl font-bold text-gray-800">
//           {typeof data.total === 'number' ? data.total.toLocaleString() : data.total}
//         </h3>
//         <p className="text-gray-600 mt-2">{title}</p>
//         <div className="mt-4 text-sm text-gray-500 space-y-1">
//           {data.active && (
//             <div className="flex items-center">
//               <CheckCircle size={14} className="text-green-500 mr-2" />
//               {data.active} active
//             </div>
//           )}
//           {data.revenue && (
//             <div className="flex items-center">
//               <DollarSign size={14} className="text-blue-500 mr-2" />
//               Revenue: {data.revenue}
//             </div>
//           )}
//           {data.newToday && (
//             <div className="flex items-center">
//               <Activity size={14} className="text-orange-500 mr-2" />
//               {data.newToday} new today
//             </div>
//           )}
//           {data.pending && (
//             <div className="flex items-center">
//               <Clock size={14} className="text-yellow-500 mr-2" />
//               {data.pending} pending
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const Table = ({ data, type }) => {
//     const columns = {
//       franchise: ['Name', 'Location', 'Status', 'Revenue', 'Customers', 'Cards Issued', 'Actions'],
//       partners: ['Partner Name', 'Type', 'Status', 'Commission', 'Transactions', 'Revenue Share', 'Actions'],
//       customers: ['Name', 'Email', 'Card Type', 'Status', 'Balance', 'Total Spent', 'Actions']
//     };

//     const renderRow = (item) => {
//       switch(type) {
//         case 'franchise':
//           return (
//             <>
//               <td className="py-4 px-4">
//                 <div className="flex items-center">
//                   <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-3">
//                     <Building2 size={20} />
//                   </div>
//                   <div>
//                     <div className="font-medium">{item.name}</div>
//                     <div className="text-sm text-gray-500">{item.manager}</div>
//                   </div>
//                 </div>
//               </td>
//               <td className="py-4 px-4">{item.location}</td>
//               <td className="py-4 px-4">
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   item.status === 'Active' ? 'bg-green-100 text-green-800' : 
//                   item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
//                 }`}>
//                   {item.status}
//                 </span>
//               </td>
//               <td className="py-4 px-4 font-semibold text-green-600">{item.revenue}</td>
//               <td className="py-4 px-4">
//                 <div className="flex items-center">
//                   <Users size={16} className="text-gray-400 mr-2" />
//                   {item.customers.toLocaleString()}
//                 </div>
//               </td>
//               <td className="py-4 px-4">
//                 <div className="flex items-center">
//                   <CreditCard size={16} className="text-gray-400 mr-2" />
//                   {item.cardsIssued.toLocaleString()}
//                 </div>
//               </td>
//             </>
//           );
//         case 'partners':
//           return (
//             <>
//               <td className="py-4 px-4 font-medium">{item.name}</td>
//               <td className="py-4 px-4">
//                 <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                   {item.type}
//                 </span>
//               </td>
//               <td className="py-4 px-4">
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   item.status === 'Active' ? 'bg-green-100 text-green-800' : 
//                   item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
//                 }`}>
//                   {item.status}
//                 </span>
//               </td>
//               <td className="py-4 px-4 font-semibold">{item.commissionRate}</td>
//               <td className="py-4 px-4">{item.totalTransactions.toLocaleString()}</td>
//               <td className="py-4 px-4 font-semibold text-green-600">{item.revenueShare}</td>
//             </>
//           );
//         case 'customers':
//           return (
//             <>
//               <td className="py-4 px-4">
//                 <div className="flex items-center">
//                   <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold mr-3">
//                     {item.name.charAt(0)}
//                   </div>
//                   <span className="font-medium">{item.name}</span>
//                 </div>
//               </td>
//               <td className="py-4 px-4">{item.email}</td>
//               <td className="py-4 px-4">
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   item.cardType === 'Platinum' ? 'bg-gradient-to-r from-gray-800 to-gray-600 text-white' :
//                   item.cardType === 'Gold' ? 'bg-gradient-to-r from-yellow-500 to-yellow-300 text-white' :
//                   item.cardType === 'Business' ? 'bg-gradient-to-r from-blue-500 to-blue-300 text-white' : 
//                   'bg-gradient-to-r from-gray-400 to-gray-200 text-white'
//                 }`}>
//                   {item.cardType}
//                 </span>
//               </td>
//               <td className="py-4 px-4">
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                 }`}>
//                   {item.status}
//                 </span>
//               </td>
//               <td className="py-4 px-4 font-semibold">
//                 <div className="flex items-center">
//                   <Wallet size={16} className="text-gray-400 mr-2" />
//                   {item.balance}
//                 </div>
//               </td>
//               <td className="py-4 px-4 font-semibold text-green-600">{item.totalSpent}</td>
//             </>
//           );
//         default:
//           return null;
//       }
//     };

//     return (
//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 {columns[type].map((column, index) => (
//                   <th key={index} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     {column}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {data.map((item) => (
//                 <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
//                   {renderRow(item)}
//                   <td className="py-4 px-4">
//                     <div className="flex space-x-2">
//                       <button className="p-2 hover:bg-blue-50 rounded-lg" title="View Details">
//                         <Eye size={18} className="text-blue-600" />
//                       </button>
//                       <button className="p-2 hover:bg-green-50 rounded-lg" title="Edit">
//                         <Edit size={18} className="text-green-600" />
//                       </button>
//                       <button className="p-2 hover:bg-red-50 rounded-lg" title="Delete">
//                         <Trash2 size={18} className="text-red-600" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
//                 <CreditCard size={24} className="text-white" />
//               </div>
//               <h1 className="text-2xl font-bold text-gray-800">DigiCard Admin</h1>
//               <div className="ml-8 flex space-x-1">
//                 {['franchise', 'partners', 'customers'].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`px-4 py-2 rounded-lg font-medium capitalize transition-all duration-200 ${
//                       activeTab === tab 
//                         ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
//                         : 'text-gray-600 hover:bg-gray-100'
//                     }`}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="p-2 hover:bg-gray-100 rounded-full relative">
//                 <Bell size={20} className="text-gray-600" />
//                 <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
//               </button>
//               <button className="p-2 hover:bg-gray-100 rounded-full">
//                 <BarChart3 size={20} className="text-gray-600" />
//               </button>
//               <div className="flex items-center space-x-2 border-l pl-4">
//                 <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
//                   AD
//                 </div>
//                 <div>
//                   <div className="font-medium">Admin User</div>
//                   <div className="text-xs text-gray-500">Super Admin</div>
//                 </div>
//                 <ChevronDown size={18} className="text-gray-400" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="p-6">
//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard title="Franchise Centers" data={dashboardStats.franchise} />
//           <StatCard title="Partners" data={dashboardStats.partners} />
//           <StatCard title="Customers" data={dashboardStats.customers} />
//           <StatCard title="Transactions" data={dashboardStats.transactions} />
//         </div>

//         {/* Search and Filter Bar */}
//         <div className="bg-white rounded-xl shadow-md p-4 mb-6">
//           <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
//             <div className="flex items-center space-x-4">
//               <div className="relative flex-1 max-w-md">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                 <input
//                   type="text"
//                   placeholder={`Search ${activeTab}...`}
//                   className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                 />
//               </div>
//               <button className="flex items-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
//                 <Filter size={18} className="mr-2" />
//                 Filter
//               </button>
//               <select className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
//                 <option>All Status</option>
//                 <option>Active</option>
//                 <option>Pending</option>
//                 <option>Inactive</option>
//               </select>
//             </div>
//             <div className="flex space-x-3">
//               <button className="flex items-center px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
//                 <Download size={18} className="mr-2" />
//                 Export
//               </button>
//               <button className="flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all">
//                 <Plus size={18} className="mr-2" />
//                 Add {activeTab.slice(0, -1)}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="mb-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold text-gray-800 capitalize">{activeTab} Management</h2>
//             <div className="text-sm text-gray-500">
//               Showing 5 of {dashboardStats[activeTab].total.toLocaleString()} {activeTab}
//             </div>
//           </div>
//           {activeTab === 'franchise' && <Table data={franchiseData} type="franchise" />}
//           {activeTab === 'partners' && <Table data={partnersData} type="partners" />}
//           {activeTab === 'customers' && <Table data={customersData} type="customers" />}
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
//             <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">
//               View All
//             </button>
//           </div>
//           <div className="space-y-4">
//             {[
//               { user: 'Downtown Center', action: 'issued 150 new cards', time: '5 min ago', type: 'franchise', status: 'success' },
//               { user: 'Global Bank Inc.', action: 'processed 250 transactions', time: '15 min ago', type: 'partner', status: 'success' },
//               { user: 'New franchise application', action: 'from Miami waiting review', time: '1 hour ago', type: 'system', status: 'pending' },
//               { user: 'Alex Turner', action: 'upgraded to Platinum card', time: '2 hours ago', type: 'customer', status: 'success' },
//               { user: 'System Alert', action: 'unusual transaction pattern detected', time: '3 hours ago', type: 'alert', status: 'warning' },
//             ].map((activity, index) => (
//               <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
//                 <div className="flex items-center">
//                   <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
//                     activity.type === 'franchise' ? 'bg-blue-100 text-blue-600' :
//                     activity.type === 'partner' ? 'bg-green-100 text-green-600' :
//                     activity.type === 'customer' ? 'bg-purple-100 text-purple-600' :
//                     activity.type === 'alert' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
//                   }`}>
//                     {activity.type === 'franchise' && <Building2 size={20} />}
//                     {activity.type === 'partner' && <Users size={20} />}
//                     {activity.type === 'customer' && <UserCircle size={20} />}
//                     {activity.type === 'alert' && <Bell size={20} />}
//                     {activity.type === 'system' && <Activity size={20} />}
//                   </div>
//                   <div>
//                     <p className="font-medium">{activity.user}</p>
//                     <p className="text-sm text-gray-600">{activity.action}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   {activity.status === 'success' && (
//                     <CheckCircle size={16} className="text-green-500 mr-2" />
//                   )}
//                   {activity.status === 'warning' && (
//                     <XCircle size={16} className="text-yellow-500 mr-2" />
//                   )}
//                   {activity.status === 'pending' && (
//                     <Clock size={16} className="text-blue-500 mr-2" />
//                   )}
//                   <span className="text-sm text-gray-500">{activity.time}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;


// import React, { useState, useEffect } from 'react';
// import { 
//   Building2, 
//   Users, 
//   UserCircle, 
//   CreditCard,
//   Search, 
//   Filter,
//   TrendingUp,
//   Bell,
//   ChevronDown,
//   Plus,
//   Eye,
//   Edit,
//   Trash2,
//   Download,
//   BarChart3,
//   Wallet,
//   CheckCircle,
//   XCircle,
//   Clock,
//   DollarSign,
//   Activity,
//   AlertCircle,
//   RefreshCw
// } from 'lucide-react';

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('franchise');
//   const [loading, setLoading] = useState({
//     dashboard: true,
//     table: true,
//     activity: true
//   });
//   const [error, setError] = useState(null);
  
//   // State for dynamic data
//   const [dashboardStats, setDashboardStats] = useState({
//     franchise: {
//       total: 0,
//       active: 0,
//       pending: 0,
//       growth: 0,
//       revenue: '₹0',
//       icon: Building2,
//       color: 'bg-blue-500'
//     },
//     partners: {
//       total: 0,
//       active: 0,
//       newThisMonth: 24,
//       growth: 125,
//       icon: Users,
//       color: 'bg-green-500'
//     },
//     customers: {
//       total: 0,
//       active: 0,
//       newToday: 128,
//       growth: 15.2,
//       icon: UserCircle,
//       color: 'bg-purple-500'
//     },
//     transactions: {
//       total: 0,
//       volume: '₹0',
//       successRate: 0,
//       growth: 5.3,
//       icon: CreditCard,
//       color: 'bg-orange-500'
//     }
//   });

//   const [franchiseData, setFranchiseData] = useState([]);
//   const [partnersData, setPartnersData] = useState([]);
//   const [customersData, setCustomersData] = useState([]);
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All Status');

//   // API Base URL - Update this to your backend URL
//   const API_BASE_URL = 'http://localhost:3000/api/v1/admin';

//   // API Functions using fetch
//   const adminApi = {
//     getDashboardStats: async () => {
//       const response = await fetch(`${API_BASE_URL}/dashboard-stats`);
//       if (!response.ok) throw new Error('Failed to fetch dashboard stats');
//       return response.json();
//     },

//     getFranchises: async () => {
//       const response = await fetch(`${API_BASE_URL}/franchises`);
//       if (!response.ok) throw new Error('Failed to fetch franchises');
//       return response.json();
//     },

//     getPartners: async () => {
//       const response = await fetch(`${API_BASE_URL}/partners`);
//       if (!response.ok) throw new Error('Failed to fetch partners');
//       return response.json();
//     },

//     getCustomers: async () => {
//       const response = await fetch(`${API_BASE_URL}/customers`);
//       if (!response.ok) throw new Error('Failed to fetch customers');
//       return response.json();
//     },

//     getRecentActivity: async () => {
//       const response = await fetch(`${API_BASE_URL}/recent-activity`);
//       if (!response.ok) throw new Error('Failed to fetch recent activity');
//       return response.json();
//     },
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // Calculate time ago for recent activity
//   const getTimeAgo = (dateString) => {
//     if (!dateString) return 'Just now';
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInMs = now - date;
//     const diffInMins = Math.floor(diffInMs / (1000 * 60));
//     const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
//     const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

//     if (diffInMins < 1) return 'Just now';
//     if (diffInMins < 60) return `${diffInMins} min ago`;
//     if (diffInHours < 24) return `${diffInHours} hours ago`;
//     return `${diffInDays} days ago`;
//   };

//   // Fetch all data on component mount
//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   // Fetch data when tab changes
//   useEffect(() => {
//     if (activeTab === 'franchise') {
//       fetchFranchises();
//     } else if (activeTab === 'partners') {
//       fetchPartners();
//     } else if (activeTab === 'customers') {
//       fetchCustomers();
//     }
//   }, [activeTab]);

//   const fetchAllData = async () => {
//     try {
//       setLoading(prev => ({ ...prev, dashboard: true, activity: true }));
//       setError(null);

//       // Fetch dashboard stats
//       const stats = await adminApi.getDashboardStats();
//       const formattedStats = {
//         franchise: {
//           ...dashboardStats.franchise,
//           total: stats.franchise?.total || 0,
//           active: stats.franchise?.active || 0,
//           pending: stats.franchise?.pending || 0,
//           revenue: stats.franchise?.revenue || '₹0'
//         },
//         partners: {
//           ...dashboardStats.partners,
//           total: stats.partners?.total || 0,
//           active: stats.partners?.active || 0
//         },
//         customers: {
//           ...dashboardStats.customers,
//           total: stats.customers?.total || 0,
//           active: stats.customers?.active || 0
//         },
//         transactions: {
//           ...dashboardStats.transactions,
//           total: stats.transactions?.total || 0,
//           volume: stats.transactions?.volume || '₹0',
//           successRate: stats.transactions?.successRate || 0
//         }
//       };
//       setDashboardStats(formattedStats);

//       // Fetch recent activity
//       const activity = await adminApi.getRecentActivity();
//       const formattedActivity = activity.map(item => ({
//         ...item,
//         time: getTimeAgo(item.time),
//         type: item.type || 'system',
//         status: item.status || 'success'
//       }));
//       setRecentActivity(formattedActivity);

//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching data:', err);
//     } finally {
//       setLoading(prev => ({ ...prev, dashboard: false, activity: false }));
//     }
//   };

//   const fetchFranchises = async () => {
//     try {
//       setLoading(prev => ({ ...prev, table: true }));
//       const data = await adminApi.getFranchises();
//       setFranchiseData(data.map(franchise => ({
//         ...franchise,
//         revenue: franchise.revenue || '₹0',
//         customers: franchise.customers || 0,
//         cardsIssued: franchise.cardsIssued || 0,
//         joined: formatDate(franchise.joined),
//         status: franchise.status?.charAt(0).toUpperCase() + franchise.status?.slice(1) || 'Active'
//       })));
//     } catch (err) {
//       console.error('Error fetching franchises:', err);
//     } finally {
//       setLoading(prev => ({ ...prev, table: false }));
//     }
//   };

//   const fetchPartners = async () => {
//     try {
//       setLoading(prev => ({ ...prev, table: true }));
//       const data = await adminApi.getPartners();
//       setPartnersData(data.map(partner => ({
//         ...partner,
//         type: partner.type || 'Partner',
//         commissionRate: '2.5%',
//         totalTransactions: 0,
//         revenueShare: '₹0',
//         joined: formatDate(partner.joined),
//         status: partner.isActive ? 'Active' : 'Inactive'
//       })));
//     } catch (err) {
//       console.error('Error fetching partners:', err);
//     } finally {
//       setLoading(prev => ({ ...prev, table: false }));
//     }
//   };

//   const fetchCustomers = async () => {
//     try {
//       setLoading(prev => ({ ...prev, table: true }));
//       const data = await adminApi.getCustomers();
//       setCustomersData(data.map(customer => ({
//         ...customer,
//         cardType: customer.cardType || 'Standard',
//         balance: '₹0',
//         totalSpent: '₹0',
//         lastTransaction: 'No transactions',
//         joined: formatDate(customer.joined),
//         status: customer.isActive ? 'Active' : 'Inactive'
//       })));
//     } catch (err) {
//       console.error('Error fetching customers:', err);
//     } finally {
//       setLoading(prev => ({ ...prev, table: false }));
//     }
//   };

//   // Filter data based on search and status
//   const getFilteredData = () => {
//     let data = [];
//     switch (activeTab) {
//       case 'franchise':
//         data = franchiseData;
//         break;
//       case 'partners':
//         data = partnersData;
//         break;
//       case 'customers':
//         data = customersData;
//         break;
//       default:
//         return [];
//     }

//     // Apply search filter
//     if (searchQuery) {
//       data = data.filter(item => 
//         item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.manager?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Apply status filter
//     if (statusFilter !== 'All Status') {
//       data = data.filter(item => 
//         item.status?.toLowerCase() === statusFilter.toLowerCase()
//       );
//     }

//     return data;
//   };

//   const StatCard = ({ title, data }) => {
//     const Icon = data.icon;
    
//     if (loading.dashboard) {
//       return (
//         <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
//           <div className="flex items-center justify-between mb-4">
//             <div className={`p-3 rounded-lg ${data.color} opacity-50`}>
//               <Icon size={24} className="text-white" />
//             </div>
//             <div className="h-6 w-16 bg-gray-200 rounded"></div>
//           </div>
//           <div className="h-8 w-24 bg-gray-200 rounded mb-2"></div>
//           <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
//           <div className="space-y-2">
//             <div className="h-4 w-full bg-gray-200 rounded"></div>
//             <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
//         <div className="flex items-center justify-between mb-4">
//           <div className={`p-3 rounded-lg ${data.color} text-white`}>
//             <Icon size={24} />
//           </div>
//           <div className="flex items-center text-green-500 text-sm">
//             <TrendingUp size={16} className="mr-1" />
//             {data.growth}%
//           </div>
//         </div>
//         <h3 className="text-2xl font-bold text-gray-800">
//           {typeof data.total === 'number' ? data.total.toLocaleString() : data.total}
//         </h3>
//         <p className="text-gray-600 mt-2">{title}</p>
//         <div className="mt-4 text-sm text-gray-500 space-y-1">
//           {data.active !== undefined && (
//             <div className="flex items-center">
//               <CheckCircle size={14} className="text-green-500 mr-2" />
//               {data.active} active
//             </div>
//           )}
//           {data.revenue && data.revenue !== '₹0' && (
//             <div className="flex items-center">
//               <DollarSign size={14} className="text-blue-500 mr-2" />
//               Revenue: {data.revenue}
//             </div>
//           )}
//           {data.pending !== undefined && data.pending > 0 && (
//             <div className="flex items-center">
//               <Clock size={14} className="text-yellow-500 mr-2" />
//               {data.pending} pending
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const Table = ({ data, type, isLoading }) => {
//     const columns = {
//       franchise: ['Name', 'Location', 'Status', 'Revenue', 'Customers', 'Cards Issued', 'Actions'],
//       partners: ['Partner Name', 'Type', 'Status', 'Commission', 'Transactions', 'Revenue Share', 'Actions'],
//       customers: ['Name', 'Email', 'Card Type', 'Status', 'Balance', 'Total Spent', 'Actions']
//     };

//     if (isLoading) {
//       return (
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="animate-pulse">
//             <div className="h-8 bg-gray-200 rounded mb-4"></div>
//             {[...Array(5)].map((_, i) => (
//               <div key={i} className="h-16 bg-gray-100 rounded mb-2"></div>
//             ))}
//           </div>
//         </div>
//       );
//     }

//     const renderRow = (item) => {
//       switch(type) {
//         case 'franchise':
//           return (
//             <>
//               <td className="py-4 px-4">
//                 <div className="flex items-center">
//                   <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-3">
//                     <Building2 size={20} />
//                   </div>
//                   <div>
//                     <div className="font-medium">{item.name || 'Unnamed Franchise'}</div>
//                     <div className="text-sm text-gray-500">{item.manager || 'No manager'}</div>
//                   </div>
//                 </div>
//               </td>
//               <td className="py-4 px-4">{item.location || 'N/A'}</td>
//               <td className="py-4 px-4">
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   item.status === 'active' || item.status === 'Active' ? 'bg-green-100 text-green-800' : 
//                   item.status === 'pending' || item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
//                   item.status === 'inactive' || item.status === 'Inactive' ? 'bg-red-100 text-red-800' :
//                   'bg-gray-100 text-gray-800'
//                 }`}>
//                   {item.status || 'N/A'}
//                 </span>
//               </td>
//               <td className="py-4 px-4 font-semibold text-green-600">{item.revenue}</td>
//               <td className="py-4 px-4">
//                 <div className="flex items-center">
//                   <Users size={16} className="text-gray-400 mr-2" />
//                   {item.customers?.toLocaleString() || '0'}
//                 </div>
//               </td>
//               <td className="py-4 px-4">
//                 <div className="flex items-center">
//                   <CreditCard size={16} className="text-gray-400 mr-2" />
//                   {item.cardsIssued?.toLocaleString() || '0'}
//                 </div>
//               </td>
//             </>
//           );
//         case 'partners':
//           return (
//             <>
//               <td className="py-4 px-4 font-medium">{item.name || 'Unnamed Partner'}</td>
//               <td className="py-4 px-4">
//                 <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                   {item.type}
//                 </span>
//               </td>
//               <td className="py-4 px-4">
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   item.status === 'active' || item.status === 'Active' ? 'bg-green-100 text-green-800' : 
//                   item.status === 'pending' || item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
//                   item.status === 'inactive' || item.status === 'Inactive' ? 'bg-red-100 text-red-800' :
//                   'bg-gray-100 text-gray-800'
//                 }`}>
//                   {item.status || 'N/A'}
//                 </span>
//               </td>
//               <td className="py-4 px-4 font-semibold">{item.commissionRate}</td>
//               <td className="py-4 px-4">{item.totalTransactions?.toLocaleString() || '0'}</td>
//               <td className="py-4 px-4 font-semibold text-green-600">{item.revenueShare}</td>
//             </>
//           );
//         case 'customers':
//           return (
//             <>
//               <td className="py-4 px-4">
//                 <div className="flex items-center">
//                   <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold mr-3">
//                     {item.name?.charAt(0) || 'U'}
//                   </div>
//                   <span className="font-medium">{item.name || 'Unknown User'}</span>
//                 </div>
//               </td>
//               <td className="py-4 px-4">{item.email || 'No email'}</td>
//               <td className="py-4 px-4">
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   item.cardType === 'Platinum' ? 'bg-gradient-to-r from-gray-800 to-gray-600 text-white' :
//                   item.cardType === 'Gold' ? 'bg-gradient-to-r from-yellow-500 to-yellow-300 text-white' :
//                   item.cardType === 'Business' ? 'bg-gradient-to-r from-blue-500 to-blue-300 text-white' : 
//                   'bg-gradient-to-r from-gray-400 to-gray-200 text-white'
//                 }`}>
//                   {item.cardType}
//                 </span>
//               </td>
//               <td className="py-4 px-4">
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   item.status === 'active' || item.status === 'Active' ? 'bg-green-100 text-green-800' : 
//                   'bg-red-100 text-red-800'
//                 }`}>
//                   {item.status || 'Inactive'}
//                 </span>
//               </td>
//               <td className="py-4 px-4 font-semibold">
//                 <div className="flex items-center">
//                   <Wallet size={16} className="text-gray-400 mr-2" />
//                   {item.balance}
//                 </div>
//               </td>
//               <td className="py-4 px-4 font-semibold text-green-600">{item.totalSpent}</td>
//             </>
//           );
//         default:
//           return null;
//       }
//     };

//     if (!data || data.length === 0) {
//       return (
//         <div className="bg-white rounded-xl shadow-md p-6 text-center">
//           <p className="text-gray-500">No data available</p>
//         </div>
//       );
//     }

//     return (
//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 {columns[type].map((column, index) => (
//                   <th key={index} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     {column}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {data.slice(0, 5).map((item) => (
//                 <tr key={item.id || item._id} className="hover:bg-gray-50 transition-colors duration-150">
//                   {renderRow(item)}
//                   <td className="py-4 px-4">
//                     <div className="flex space-x-2">
//                       <button className="p-2 hover:bg-blue-50 rounded-lg" title="View Details">
//                         <Eye size={18} className="text-blue-600" />
//                       </button>
//                       <button className="p-2 hover:bg-green-50 rounded-lg" title="Edit">
//                         <Edit size={18} className="text-green-600" />
//                       </button>
//                       <button className="p-2 hover:bg-red-50 rounded-lg" title="Delete">
//                         <Trash2 size={18} className="text-red-600" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   };

//   // Error display component
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
//           <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Dashboard</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <p className="text-sm text-gray-500 mb-6">
//             Make sure your backend server is running on http://localhost:5000
//           </p>
//           <div className="flex space-x-4">
//             <button
//               onClick={() => window.location.reload()}
//               className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
//             >
//               Reload Page
//             </button>
//             <button
//               onClick={fetchAllData}
//               className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center"
//             >
//               <RefreshCw size={16} className="mr-2" />
//               Retry
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const filteredData = getFilteredData();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
//                 <CreditCard size={24} className="text-white" />
//               </div>
//               <h1 className="text-2xl font-bold text-gray-800">DigiCard Admin</h1>
//               <div className="ml-8 flex space-x-1">
//                 {['franchise', 'partners', 'customers'].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`px-4 py-2 rounded-lg font-medium capitalize transition-all duration-200 ${
//                       activeTab === tab 
//                         ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
//                         : 'text-gray-600 hover:bg-gray-100'
//                     }`}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="p-2 hover:bg-gray-100 rounded-full relative">
//                 <Bell size={20} className="text-gray-600" />
//                 <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
//               </button>
//               <button className="p-2 hover:bg-gray-100 rounded-full">
//                 <BarChart3 size={20} className="text-gray-600" />
//               </button>
//               <div className="flex items-center space-x-2 border-l pl-4">
//                 <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
//                   AD
//                 </div>
//                 <div>
//                   <div className="font-medium">Admin User</div>
//                   <div className="text-xs text-gray-500">Super Admin</div>
//                 </div>
//                 <ChevronDown size={18} className="text-gray-400" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="p-6">
//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard title="Franchise Centers" data={dashboardStats.franchise} />
//           <StatCard title="Partners" data={dashboardStats.partners} />
//           <StatCard title="Customers" data={dashboardStats.customers} />
//           <StatCard title="Transactions" data={dashboardStats.transactions} />
//         </div>

//         {/* Search and Filter Bar */}
//         <div className="bg-white rounded-xl shadow-md p-4 mb-6">
//           <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
//             <div className="flex items-center space-x-4">
//               <div className="relative flex-1 max-w-md">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                 <input
//                   type="text"
//                   placeholder={`Search ${activeTab}...`}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                 />
//               </div>
//               <button className="flex items-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
//                 <Filter size={18} className="mr-2" />
//                 Filter
//               </button>
//               <select 
//                 className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <option>All Status</option>
//                 <option>Active</option>
//                 <option>Pending</option>
//                 <option>Inactive</option>
//               </select>
//             </div>
//             <div className="flex space-x-3">
//               <button className="flex items-center px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
//                 <Download size={18} className="mr-2" />
//                 Export
//               </button>
//               <button 
//                 onClick={fetchAllData}
//                 className="flex items-center px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
//               >
//                 <RefreshCw size={18} className="mr-2" />
//                 Refresh
//               </button>
//               <button className="flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all">
//                 <Plus size={18} className="mr-2" />
//                 Add {activeTab.slice(0, -1)}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="mb-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold text-gray-800 capitalize">{activeTab} Management</h2>
//             <div className="text-sm text-gray-500">
//               Showing {filteredData.length} of {dashboardStats[activeTab]?.total?.toLocaleString() || 0} {activeTab}
//             </div>
//           </div>
//           {activeTab === 'franchise' && <Table data={filteredData} type="franchise" isLoading={loading.table} />}
//           {activeTab === 'partners' && <Table data={filteredData} type="partners" isLoading={loading.table} />}
//           {activeTab === 'customers' && <Table data={filteredData} type="customers" isLoading={loading.table} />}
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
//             <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">
//               View All
//             </button>
//           </div>
//           {loading.activity ? (
//             <div className="space-y-4">
//               {[...Array(5)].map((_, i) => (
//                 <div key={i} className="flex items-center justify-between p-3 animate-pulse">
//                   <div className="flex items-center">
//                     <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
//                     <div>
//                       <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
//                       <div className="h-3 w-48 bg-gray-100 rounded"></div>
//                     </div>
//                   </div>
//                   <div className="h-3 w-16 bg-gray-200 rounded"></div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {recentActivity.slice(0, 5).map((activity, index) => (
//                 <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
//                   <div className="flex items-center">
//                     <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
//                       activity.type === 'franchise' ? 'bg-blue-100 text-blue-600' :
//                       activity.type === 'partner' ? 'bg-green-100 text-green-600' :
//                       activity.type === 'customer' ? 'bg-purple-100 text-purple-600' :
//                       activity.type === 'transaction' ? 'bg-orange-100 text-orange-600' :
//                       activity.type === 'alert' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
//                     }`}>
//                       {activity.type === 'franchise' && <Building2 size={20} />}
//                       {activity.type === 'partner' && <Users size={20} />}
//                       {activity.type === 'customer' && <UserCircle size={20} />}
//                       {activity.type === 'transaction' && <CreditCard size={20} />}
//                       {activity.type === 'alert' && <Bell size={20} />}
//                       {activity.type === 'system' && <Activity size={20} />}
//                     </div>
//                     <div>
//                       <p className="font-medium">{activity.user}</p>
//                       <p className="text-sm text-gray-600">{activity.action}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center">
//                     {activity.status === 'success' && (
//                       <CheckCircle size={16} className="text-green-500 mr-2" />
//                     )}
//                     {activity.status === 'warning' && (
//                       <XCircle size={16} className="text-yellow-500 mr-2" />
//                     )}
//                     {activity.status === 'pending' && (
//                       <Clock size={16} className="text-blue-500 mr-2" />
//                     )}
//                     <span className="text-sm text-gray-500">{activity.time}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;



// import React, { useState, useEffect, useMemo } from 'react';
// import { 
//   Building2, 
//   Users, 
//   UserCircle, 
//   CreditCard,
//   Search, 
//   Filter,
//   TrendingUp,
//   Bell,
//   ChevronDown,
//   Plus,
//   Eye,
//   Edit,
//   Trash2,
//   Download,
//   BarChart3,
//   Wallet,
//   CheckCircle,
//   XCircle,
//   Clock,
//   DollarSign,
//   Activity,
//   AlertCircle,
//   RefreshCw
// } from 'lucide-react';
// import DynamicTable from '../../components/DynamicTable'; // Import your DynamicTable component

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('franchise');
//   const [loading, setLoading] = useState({
//     dashboard: true,
//     table: true,
//     activity: true
//   });
//   const [error, setError] = useState(null);
  
//   // State for dynamic data
//   const [dashboardStats, setDashboardStats] = useState({
//     franchise: {
//       total: 0,
//       active: 0,
//       pending: 0,
//       growth: 0,
//       revenue: '₹0',
//       icon: Building2,
//       color: 'bg-blue-500'
//     },
//     partners: {
//       total: 0,
//       active: 0,
//       newThisMonth: 24,
//       growth: 125,
//       icon: Users,
//       color: 'bg-green-500'
//     },
//     customers: {
//       total: 0,
//       active: 0,
//       newToday: 128,
//       growth: 15.2,
//       icon: UserCircle,
//       color: 'bg-purple-500'
//     },
//     transactions: {
//       total: 0,
//       volume: '₹0',
//       successRate: 0,
//       growth: 5.3,
//       icon: CreditCard,
//       color: 'bg-orange-500'
//     }
//   });

//   const [franchiseData, setFranchiseData] = useState([]);
//   const [partnersData, setPartnersData] = useState([]);
//   const [customersData, setCustomersData] = useState([]);
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All Status');
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);

//   // API Base URL - Update this to your backend URL
//   const API_BASE_URL = 'http://localhost:3000/api/v1/admin';

//   // API Functions using fetch
//   const adminApi = {
//     getDashboardStats: async () => {
//       const response = await fetch(`${API_BASE_URL}/dashboard-stats`);
//       if (!response.ok) throw new Error('Failed to fetch dashboard stats');
//       return response.json();
//     },

//     getFranchises: async () => {
//       const response = await fetch(`${API_BASE_URL}/franchises`);
//       if (!response.ok) throw new Error('Failed to fetch franchises');
//       return response.json();
//     },

//     getPartners: async () => {
//       const response = await fetch(`${API_BASE_URL}/partners`);
//       if (!response.ok) throw new Error('Failed to fetch partners');
//       return response.json();
//     },

//     getCustomers: async () => {
//       const response = await fetch(`${API_BASE_URL}/customers`);
//       if (!response.ok) throw new Error('Failed to fetch customers');
//       return response.json();
//     },

//     getRecentActivity: async () => {
//       const response = await fetch(`${API_BASE_URL}/recent-activity`);
//       if (!response.ok) throw new Error('Failed to fetch recent activity');
//       return response.json();
//     },
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // Calculate time ago for recent activity
//   const getTimeAgo = (dateString) => {
//     if (!dateString) return 'Just now';
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInMs = now - date;
//     const diffInMins = Math.floor(diffInMs / (1000 * 60));
//     const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
//     const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

//     if (diffInMins < 1) return 'Just now';
//     if (diffInMins < 60) return `${diffInMins} min ago`;
//     if (diffInHours < 24) return `${diffInHours} hours ago`;
//     return `${diffInDays} days ago`;
//   };

//   // Fetch all data on component mount
//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   // Fetch data when tab changes
//   useEffect(() => {
//     if (activeTab === 'franchise') {
//       fetchFranchises();
//     } else if (activeTab === 'partners') {
//       fetchPartners();
//     } else if (activeTab === 'customers') {
//       fetchCustomers();
//     }
//   }, [activeTab]);

//   const fetchAllData = async () => {
//     try {
//       setLoading(prev => ({ ...prev, dashboard: true, activity: true }));
//       setError(null);

//       // Fetch dashboard stats
//       const stats = await adminApi.getDashboardStats();
//       const formattedStats = {
//         franchise: {
//           ...dashboardStats.franchise,
//           total: stats.franchise?.total || 0,
//           active: stats.franchise?.active || 0,
//           pending: stats.franchise?.pending || 0,
//           revenue: stats.franchise?.revenue || '₹0'
//         },
//         partners: {
//           ...dashboardStats.partners,
//           total: stats.partners?.total || 0,
//           active: stats.partners?.active || 0
//         },
//         customers: {
//           ...dashboardStats.customers,
//           total: stats.customers?.total || 0,
//           active: stats.customers?.active || 0
//         },
//         transactions: {
//           ...dashboardStats.transactions,
//           total: stats.transactions?.total || 0,
//           volume: stats.transactions?.volume || '₹0',
//           successRate: stats.transactions?.successRate || 0
//         }
//       };
//       setDashboardStats(formattedStats);

//       // Fetch recent activity
//       const activity = await adminApi.getRecentActivity();
//       const formattedActivity = activity.map(item => ({
//         ...item,
//         time: getTimeAgo(item.time),
//         type: item.type || 'system',
//         status: item.status || 'success'
//       }));
//       setRecentActivity(formattedActivity);

//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching data:', err);
//     } finally {
//       setLoading(prev => ({ ...prev, dashboard: false, activity: false }));
//     }
//   };

//   const fetchFranchises = async () => {
//     try {
//       setLoading(prev => ({ ...prev, table: true }));
//       const data = await adminApi.getFranchises();
//       setFranchiseData(data.map(franchise => ({
//         ...franchise,
//         revenue: franchise.revenue || '₹0',
//         customers: franchise.customers || 0,
//         cardsIssued: franchise.cardsIssued || 0,
//         joined: formatDate(franchise.joined),
//         status: franchise.status?.charAt(0).toUpperCase() + franchise.status?.slice(1) || 'Active'
//       })));
//     } catch (err) {
//       console.error('Error fetching franchises:', err);
//     } finally {
//       setLoading(prev => ({ ...prev, table: false }));
//     }
//   };

//   const fetchPartners = async () => {
//     try {
//       setLoading(prev => ({ ...prev, table: true }));
//       const data = await adminApi.getPartners();
//       setPartnersData(data.map(partner => ({
//         ...partner,
//         type: partner.type || 'Partner',
//         commissionRate: '2.5%',
//         totalTransactions: 0,
//         revenueShare: '₹0',
//         joined: formatDate(partner.joined),
//         status: partner.isActive ? 'Active' : 'Inactive'
//       })));
//     } catch (err) {
//       console.error('Error fetching partners:', err);
//     } finally {
//       setLoading(prev => ({ ...prev, table: false }));
//     }
//   };

//   const fetchCustomers = async () => {
//     try {
//       setLoading(prev => ({ ...prev, table: true }));
//       const data = await adminApi.getCustomers();
//       setCustomersData(data.map(customer => ({
//         ...customer,
//         cardType: customer.cardType || 'Standard',
//         balance: '₹0',
//         totalSpent: '₹0',
//         lastTransaction: 'No transactions',
//         joined: formatDate(customer.joined),
//         status: customer.isActive ? 'Active' : 'Inactive'
//       })));
//     } catch (err) {
//       console.error('Error fetching customers:', err);
//     } finally {
//       setLoading(prev => ({ ...prev, table: false }));
//     }
//   };

//   // Define columns for DynamicTable based on active tab
//   const getColumns = () => {
//     switch(activeTab) {
//       case 'franchise':
//         return [
//           {
//             header: 'Name',
//             accessorKey: 'name',
//             cell: (info) => (
//               <div className="flex items-center">
//                 <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-3">
//                   <Building2 size={20} />
//                 </div>
//                 <div>
//                   <div className="font-medium">{info.getValue() || 'Unnamed Franchise'}</div>
//                   <div className="text-sm text-gray-500">{info.row.original.manager || 'No manager'}</div>
//                 </div>
//               </div>
//             )
//           },
//           {
//             header: 'Location',
//             accessorKey: 'location',
//             cell: (info) => info.getValue() || 'N/A'
//           },
//           {
//             header: 'Status',
//             accessorKey: 'status',
//             cell: (info) => {
//               const status = info.getValue();
//               return (
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   status === 'active' || status === 'Active' ? 'bg-green-100 text-green-800' : 
//                   status === 'pending' || status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
//                   status === 'inactive' || status === 'Inactive' ? 'bg-red-100 text-red-800' :
//                   'bg-gray-100 text-gray-800'
//                 }`}>
//                   {status || 'N/A'}
//                 </span>
//               );
//             }
//           },
//           {
//             header: 'Revenue',
//             accessorKey: 'revenue',
//             cell: (info) => (
//               <span className="font-semibold text-green-600">{info.getValue()}</span>
//             )
//           },
//           {
//             header: 'Customers',
//             accessorKey: 'customers',
//             cell: (info) => (
//               <div className="flex items-center">
//                 <Users size={16} className="text-gray-400 mr-2" />
//                 {(info.getValue() || 0).toLocaleString()}
//               </div>
//             )
//           },
//           {
//             header: 'Cards Issued',
//             accessorKey: 'cardsIssued',
//             cell: (info) => (
//               <div className="flex items-center">
//                 <CreditCard size={16} className="text-gray-400 mr-2" />
//                 {(info.getValue() || 0).toLocaleString()}
//               </div>
//             )
//           },
//           {
//             header: 'Actions',
//             accessorKey: 'actions',
//             cell: () => (
//               <div className="flex space-x-2">
//                 <button className="p-2 hover:bg-blue-50 rounded-lg" title="View Details">
//                   <Eye size={18} className="text-blue-600" />
//                 </button>
//                 <button className="p-2 hover:bg-green-50 rounded-lg" title="Edit">
//                   <Edit size={18} className="text-green-600" />
//                 </button>
//                 <button className="p-2 hover:bg-red-50 rounded-lg" title="Delete">
//                   <Trash2 size={18} className="text-red-600" />
//                 </button>
//               </div>
//             )
//           }
//         ];
      
//       case 'partners':
//         return [
//           {
//             header: 'Partner Name',
//             accessorKey: 'name',
//             cell: (info) => (
//               <span className="font-medium">{info.getValue() || 'Unnamed Partner'}</span>
//             )
//           },
//           {
//             header: 'Type',
//             accessorKey: 'type',
//             cell: (info) => (
//               <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                 {info.getValue()}
//               </span>
//             )
//           },
//           {
//             header: 'Status',
//             accessorKey: 'status',
//             cell: (info) => {
//               const status = info.getValue();
//               return (
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   status === 'active' || status === 'Active' ? 'bg-green-100 text-green-800' : 
//                   status === 'pending' || status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
//                   status === 'inactive' || status === 'Inactive' ? 'bg-red-100 text-red-800' :
//                   'bg-gray-100 text-gray-800'
//                 }`}>
//                   {status || 'N/A'}
//                 </span>
//               );
//             }
//           },
//           {
//             header: 'Commission',
//             accessorKey: 'commissionRate',
//             cell: (info) => (
//               <span className="font-semibold">{info.getValue()}</span>
//             )
//           },
//           {
//             header: 'Transactions',
//             accessorKey: 'totalTransactions',
//             cell: (info) => (info.getValue() || 0).toLocaleString()
//           },
//           {
//             header: 'Revenue Share',
//             accessorKey: 'revenueShare',
//             cell: (info) => (
//               <span className="font-semibold text-green-600">{info.getValue()}</span>
//             )
//           },
//           {
//             header: 'Actions',
//             accessorKey: 'actions',
//             cell: () => (
//               <div className="flex space-x-2">
//                 <button className="p-2 hover:bg-blue-50 rounded-lg" title="View Details">
//                   <Eye size={18} className="text-blue-600" />
//                 </button>
//                 <button className="p-2 hover:bg-green-50 rounded-lg" title="Edit">
//                   <Edit size={18} className="text-green-600" />
//                 </button>
//                 <button className="p-2 hover:bg-red-50 rounded-lg" title="Delete">
//                   <Trash2 size={18} className="text-red-600" />
//                 </button>
//               </div>
//             )
//           }
//         ];
      
//       case 'customers':
//         return [
//           {
//             header: 'Name',
//             accessorKey: 'name',
//             cell: (info) => (
//               <div className="flex items-center">
//                 <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold mr-3">
//                   {info.getValue()?.charAt(0) || 'U'}
//                 </div>
//                 <span className="font-medium">{info.getValue() || 'Unknown User'}</span>
//               </div>
//             )
//           },
//           {
//             header: 'Email',
//             accessorKey: 'email',
//             cell: (info) => info.getValue() || 'No email'
//           },
//           {
//             header: 'Card Type',
//             accessorKey: 'cardType',
//             cell: (info) => {
//               const cardType = info.getValue();
//               return (
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   cardType === 'Platinum' ? 'bg-gradient-to-r from-gray-800 to-gray-600 text-white' :
//                   cardType === 'Gold' ? 'bg-gradient-to-r from-yellow-500 to-yellow-300 text-white' :
//                   cardType === 'Business' ? 'bg-gradient-to-r from-blue-500 to-blue-300 text-white' : 
//                   'bg-gradient-to-r from-gray-400 to-gray-200 text-white'
//                 }`}>
//                   {cardType}
//                 </span>
//               );
//             }
//           },
//           {
//             header: 'Status',
//             accessorKey: 'status',
//             cell: (info) => {
//               const status = info.getValue();
//               return (
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   status === 'active' || status === 'Active' ? 'bg-green-100 text-green-800' : 
//                   'bg-red-100 text-red-800'
//                 }`}>
//                   {status || 'Inactive'}
//                 </span>
//               );
//             }
//           },
//           {
//             header: 'Balance',
//             accessorKey: 'balance',
//             cell: (info) => (
//               <div className="flex items-center">
//                 <Wallet size={16} className="text-gray-400 mr-2" />
//                 {info.getValue()}
//               </div>
//             )
//           },
//           {
//             header: 'Total Spent',
//             accessorKey: 'totalSpent',
//             cell: (info) => (
//               <span className="font-semibold text-green-600">{info.getValue()}</span>
//             )
//           },
//           {
//             header: 'Actions',
//             accessorKey: 'actions',
//             cell: () => (
//               <div className="flex space-x-2">
//                 <button className="p-2 hover:bg-blue-50 rounded-lg" title="View Details">
//                   <Eye size={18} className="text-blue-600" />
//                 </button>
//                 <button className="p-2 hover:bg-green-50 rounded-lg" title="Edit">
//                   <Edit size={18} className="text-green-600" />
//                 </button>
//                 <button className="p-2 hover:bg-red-50 rounded-lg" title="Delete">
//                   <Trash2 size={18} className="text-red-600" />
//                 </button>
//               </div>
//             )
//           }
//         ];
      
//       default:
//         return [];
//     }
//   };

//   // Get current data based on active tab
//   const getCurrentData = () => {
//     let data = [];
//     switch(activeTab) {
//       case 'franchise':
//         data = franchiseData;
//         break;
//       case 'partners':
//         data = partnersData;
//         break;
//       case 'customers':
//         data = customersData;
//         break;
//       default:
//         return [];
//     }

//     // Apply search filter
//     if (searchQuery) {
//       data = data.filter(item => 
//         item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.manager?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Apply status filter
//     if (statusFilter !== 'All Status') {
//       data = data.filter(item => 
//         item.status?.toLowerCase() === statusFilter.toLowerCase()
//       );
//     }

//     return data;
//   };

//   const StatCard = ({ title, data }) => {
//     const Icon = data.icon;
    
//     if (loading.dashboard) {
//       return (
//         <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
//           <div className="flex items-center justify-between mb-4">
//             <div className={`p-3 rounded-lg ${data.color} opacity-50`}>
//               <Icon size={24} className="text-white" />
//             </div>
//             <div className="h-6 w-16 bg-gray-200 rounded"></div>
//           </div>
//           <div className="h-8 w-24 bg-gray-200 rounded mb-2"></div>
//           <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
//           <div className="space-y-2">
//             <div className="h-4 w-full bg-gray-200 rounded"></div>
//             <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
//         <div className="flex items-center justify-between mb-4">
//           <div className={`p-3 rounded-lg ${data.color} text-white`}>
//             <Icon size={24} />
//           </div>
//           <div className="flex items-center text-green-500 text-sm">
//             <TrendingUp size={16} className="mr-1" />
//             {data.growth}%
//           </div>
//         </div>
//         <h3 className="text-2xl font-bold text-gray-800">
//           {typeof data.total === 'number' ? data.total.toLocaleString() : data.total}
//         </h3>
//         <p className="text-gray-600 mt-2">{title}</p>
//         <div className="mt-4 text-sm text-gray-500 space-y-1">
//           {data.active !== undefined && (
//             <div className="flex items-center">
//               <CheckCircle size={14} className="text-green-500 mr-2" />
//               {data.active} active
//             </div>
//           )}
//           {data.revenue && data.revenue !== '₹0' && (
//             <div className="flex items-center">
//               <DollarSign size={14} className="text-blue-500 mr-2" />
//               Revenue: {data.revenue}
//             </div>
//           )}
//           {data.pending !== undefined && data.pending > 0 && (
//             <div className="flex items-center">
//               <Clock size={14} className="text-yellow-500 mr-2" />
//               {data.pending} pending
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Error display component
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
//           <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Dashboard</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <p className="text-sm text-gray-500 mb-6">
//             Make sure your backend server is running on http://localhost:3000
//           </p>
//           <div className="flex space-x-4">
//             <button
//               onClick={() => window.location.reload()}
//               className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
//             >
//               Reload Page
//             </button>
//             <button
//               onClick={fetchAllData}
//               className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center"
//             >
//               <RefreshCw size={16} className="mr-2" />
//               Retry
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const currentData = getCurrentData();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
//                 <CreditCard size={24} className="text-white" />
//               </div>
//               <h1 className="text-2xl font-bold text-gray-800">DigiCard Admin</h1>
//               <div className="ml-8 flex space-x-1">
//                 {['franchise', 'partners', 'customers'].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`px-4 py-2 rounded-lg font-medium capitalize transition-all duration-200 ${
//                       activeTab === tab 
//                         ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
//                         : 'text-gray-600 hover:bg-gray-100'
//                     }`}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="p-2 hover:bg-gray-100 rounded-full relative">
//                 <Bell size={20} className="text-gray-600" />
//                 <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
//               </button>
//               <button className="p-2 hover:bg-gray-100 rounded-full">
//                 <BarChart3 size={20} className="text-gray-600" />
//               </button>
//               <div className="flex items-center space-x-2 border-l pl-4">
//                 <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
//                   AD
//                 </div>
//                 <div>
//                   <div className="font-medium">Admin User</div>
//                   <div className="text-xs text-gray-500">Super Admin</div>
//                 </div>
//                 <ChevronDown size={18} className="text-gray-400" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="p-6">
//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard title="Franchise Centers" data={dashboardStats.franchise} />
//           <StatCard title="Partners" data={dashboardStats.partners} />
//           <StatCard title="Customers" data={dashboardStats.customers} />
//           <StatCard title="Transactions" data={dashboardStats.transactions} />
//         </div>

//         {/* Search and Filter Bar */}
//         <div className="bg-white rounded-xl shadow-md p-4 mb-6">
//           <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
//             <div className="flex items-center space-x-4">
//               <div className="relative flex-1 max-w-md">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                 <input
//                   type="text"
//                   placeholder={`Search ${activeTab}...`}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                 />
//               </div>
//               <button className="flex items-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
//                 <Filter size={18} className="mr-2" />
//                 Filter
//               </button>
//               <select 
//                 className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <option>All Status</option>
//                 <option>Active</option>
//                 <option>Pending</option>
//                 <option>Inactive</option>
//               </select>
//             </div>
//             <div className="flex space-x-3">
//               <button className="flex items-center px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
//                 <Download size={18} className="mr-2" />
//                 Export
//               </button>
//               <button 
//                 onClick={fetchAllData}
//                 className="flex items-center px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
//               >
//                 <RefreshCw size={18} className="mr-2" />
//                 Refresh
//               </button>
//               <button className="flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all">
//                 <Plus size={18} className="mr-2" />
//                 Add {activeTab.slice(0, -1)}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="mb-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold text-gray-800 capitalize">{activeTab} Management</h2>
//             <div className="text-sm text-gray-500">
//               Showing {currentData.length} of {dashboardStats[activeTab]?.total?.toLocaleString() || 0} {activeTab}
//             </div>
//           </div>
          
//           {/* Use DynamicTable component */}
//           <div className="bg-white rounded-xl shadow-md overflow-hidden">
//             <DynamicTable
//               columns={getColumns()}
//               data={currentData}
//               page={page}
//               pageSize={pageSize}
//               totalItems={currentData.length}
//               onPageChange={setPage}
//               onPageSizeChange={setPageSize}
//               onSearch={(value) => setSearchQuery(value)}
//               searchBar={true}
//               pagination={true}
//               exportConfig={{
//                 fileName: `${activeTab}-data.csv`,
//                 excludedColumns: ['actions']
//               }}
//               // Add any other props your DynamicTable needs
//             />
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
//             <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">
//               View All
//             </button>
//           </div>
//           {loading.activity ? (
//             <div className="space-y-4">
//               {[...Array(5)].map((_, i) => (
//                 <div key={i} className="flex items-center justify-between p-3 animate-pulse">
//                   <div className="flex items-center">
//                     <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
//                     <div>
//                       <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
//                       <div className="h-3 w-48 bg-gray-100 rounded"></div>
//                     </div>
//                   </div>
//                   <div className="h-3 w-16 bg-gray-200 rounded"></div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {recentActivity.slice(0, 5).map((activity, index) => (
//                 <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
//                   <div className="flex items-center">
//                     <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
//                       activity.type === 'franchise' ? 'bg-blue-100 text-blue-600' :
//                       activity.type === 'partner' ? 'bg-green-100 text-green-600' :
//                       activity.type === 'customer' ? 'bg-purple-100 text-purple-600' :
//                       activity.type === 'transaction' ? 'bg-orange-100 text-orange-600' :
//                       activity.type === 'alert' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
//                     }`}>
//                       {activity.type === 'franchise' && <Building2 size={20} />}
//                       {activity.type === 'partner' && <Users size={20} />}
//                       {activity.type === 'customer' && <UserCircle size={20} />}
//                       {activity.type === 'transaction' && <CreditCard size={20} />}
//                       {activity.type === 'alert' && <Bell size={20} />}
//                       {activity.type === 'system' && <Activity size={20} />}
//                     </div>
//                     <div>
//                       <p className="font-medium">{activity.user}</p>
//                       <p className="text-sm text-gray-600">{activity.action}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center">
//                     {activity.status === 'success' && (
//                       <CheckCircle size={16} className="text-green-500 mr-2" />
//                     )}
//                     {activity.status === 'warning' && (
//                       <XCircle size={16} className="text-yellow-500 mr-2" />
//                     )}
//                     {activity.status === 'pending' && (
//                       <Clock size={16} className="text-blue-500 mr-2" />
//                     )}
//                     <span className="text-sm text-gray-500">{activity.time}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  Users, 
  UserCircle, 
  CreditCard,
  Search, 
  Filter,
  TrendingUp,
  Bell,
  ChevronDown,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  BarChart3,
  Wallet,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Activity,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import DynamicTable from '../../components/DynamicTable'; 
import { ADMIN_URL } from "../../utility/constants";
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('franchise');
  const [loading, setLoading] = useState({
    dashboard: true,
    table: true,
    activity: true
  });
  const [error, setError] = useState(null);
  
  // State for dynamic data
  const [dashboardStats, setDashboardStats] = useState({
    franchise: {
      total: 0,
      active: 0,
      pending: 0,
      growth: 0,
      revenue: '₹0',
      icon: Building2,
      color: 'bg-blue-500'
    },
    partners: {
      total: 0,
      active: 0,
      newThisMonth: 24,
      growth: 125,
      icon: Users,
      color: 'bg-green-500'
    },
    customers: {
      total: 0,
      active: 0,
      newToday: 128,
      growth: 15.2,
      icon: UserCircle,
      color: 'bg-purple-500'
    },
    transactions: {
      total: 0,
      volume: '₹0',
      successRate: 0,
      growth: 5.3,
      icon: CreditCard,
      color: 'bg-orange-500'
    }
  });

  const [allFranchiseData, setAllFranchiseData] = useState([]);
  const [allPartnersData, setAllPartnersData] = useState([]);
  const [allCustomersData, setAllCustomersData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10); // Fixed page size of 10

  // API Base URL - Update this to your backend URL
  // const API_BASE_URL = 'http://localhost:3000/api/v1/admin';

  // API Functions using fetch
  const adminApi = {
    getDashboardStats: async () => {
      const response = await fetch(`${ADMIN_URL}/dashboard-stats`);
      if (!response.ok) throw new Error('Failed to fetch dashboard stats');
      return response.json();
    },

    getFranchises: async () => {
      const response = await fetch(`${ADMIN_URL}/franchises`);
      if (!response.ok) throw new Error('Failed to fetch franchises');
      return response.json();
    },

    getPartners: async () => {
      const response = await fetch(`${ADMIN_URL}/partners`);
      if (!response.ok) throw new Error('Failed to fetch partners');
      return response.json();
    },

    getCustomers: async () => {
      const response = await fetch(`${ADMIN_URL}/customers`);
      if (!response.ok) throw new Error('Failed to fetch customers');
      return response.json();
    },

    getRecentActivity: async () => {
      const response = await fetch(`${ADMIN_URL}/recent-activity`);
      if (!response.ok) throw new Error('Failed to fetch recent activity');
      return response.json();
    },
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate time ago for recent activity
  const getTimeAgo = (dateString) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins} min ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${diffInDays} days ago`;
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  // Fetch data when tab changes
  useEffect(() => {
    if (activeTab === 'franchise') {
      fetchFranchises();
    } else if (activeTab === 'partners') {
      fetchPartners();
    } else if (activeTab === 'customers') {
      fetchCustomers();
    }
    // Reset to first page when tab changes
    setPage(0);
  }, [activeTab]);

  const fetchAllData = async () => {
    try {
      setLoading(prev => ({ ...prev, dashboard: true, activity: true }));
      setError(null);

      // Fetch dashboard stats
      const stats = await adminApi.getDashboardStats();
      const formattedStats = {
        franchise: {
          ...dashboardStats.franchise,
          total: stats.franchise?.total || 0,
          active: stats.franchise?.active || 0,
          pending: stats.franchise?.pending || 0,
          revenue: stats.franchise?.revenue || '₹0'
        },
        partners: {
          ...dashboardStats.partners,
          total: stats.partners?.total || 0,
          active: stats.partners?.active || 0
        },
        customers: {
          ...dashboardStats.customers,
          total: stats.customers?.total || 0,
          active: stats.customers?.active || 0
        },
        transactions: {
          ...dashboardStats.transactions,
          total: stats.transactions?.total || 0,
          volume: stats.transactions?.volume || '₹0',
          successRate: stats.transactions?.successRate || 0
        }
      };
      setDashboardStats(formattedStats);

      // Fetch recent activity
      const activity = await adminApi.getRecentActivity();
      const formattedActivity = activity.map(item => ({
        ...item,
        time: getTimeAgo(item.time),
        type: item.type || 'system',
        status: item.status || 'success'
      }));
      setRecentActivity(formattedActivity);

    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(prev => ({ ...prev, dashboard: false, activity: false }));
    }
  };

  const fetchFranchises = async () => {
    try {
      setLoading(prev => ({ ...prev, table: true }));
      const data = await adminApi.getFranchises();
      const formattedData = data.map(franchise => ({
        ...franchise,
        revenue: franchise.revenue || '₹0',
        customers: franchise.customers || 0,
        cardsIssued: franchise.cardsIssued || 0,
        joined: formatDate(franchise.joined),
        status: franchise.status?.charAt(0).toUpperCase() + franchise.status?.slice(1) || 'Active'
      }));
      setAllFranchiseData(formattedData);
    } catch (err) {
      console.error('Error fetching franchises:', err);
    } finally {
      setLoading(prev => ({ ...prev, table: false }));
    }
  };

  const fetchPartners = async () => {
    try {
      setLoading(prev => ({ ...prev, table: true }));
      const data = await adminApi.getPartners();
      const formattedData = data.map(partner => ({
        ...partner,
        type: partner.type || 'Partner',
        commissionRate: '2.5%',
        totalTransactions: 0,
        revenueShare: '₹0',
        joined: formatDate(partner.joined),
        status: partner.isActive ? 'Active' : 'Inactive'
      }));
      setAllPartnersData(formattedData);
    } catch (err) {
      console.error('Error fetching partners:', err);
    } finally {
      setLoading(prev => ({ ...prev, table: false }));
    }
  };

  const fetchCustomers = async () => {
    try {
      setLoading(prev => ({ ...prev, table: true }));
      const data = await adminApi.getCustomers();
      const formattedData = data.map(customer => ({
        ...customer,
        cardType: customer.cardType || 'Standard',
        balance: '₹0',
        totalSpent: '₹0',
        lastTransaction: 'No transactions',
        joined: formatDate(customer.joined),
        status: customer.isActive ? 'Active' : 'Inactive'
      }));
      setAllCustomersData(formattedData);
    } catch (err) {
      console.error('Error fetching customers:', err);
    } finally {
      setLoading(prev => ({ ...prev, table: false }));
    }
  };

  // Get filtered data based on search and status
  const getFilteredData = () => {
    let data = [];
    switch (activeTab) {
      case 'franchise':
        data = allFranchiseData;
        break;
      case 'partners':
        data = allPartnersData;
        break;
      case 'customers':
        data = allCustomersData;
        break;
      default:
        return [];
    }

    // Apply search filter
    if (searchQuery) {
      data = data.filter(item => 
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.manager?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'All Status') {
      data = data.filter(item => 
        item.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    return data;
  };

  // Get paginated data (10 items per page)
  const getPaginatedData = () => {
    const filteredData = getFilteredData();
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  };

  // Define columns for DynamicTable based on active tab
  const getColumns = () => {
    switch(activeTab) {
      case 'franchise':
        return [
          {
            header: 'Name',
            accessorKey: 'name',
            cell: (info) => (
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-3">
                  <Building2 size={20} />
                </div>
                <div>
                  <div className="font-medium">{info.getValue() || 'Unnamed Franchise'}</div>
                  <div className="text-sm text-gray-500">{info.row.original.manager || 'No manager'}</div>
                </div>
              </div>
            )
          },
          {
            header: 'Location',
            accessorKey: 'location',
            cell: (info) => info.getValue() || 'N/A'
          },
          {
            header: 'Status',
            accessorKey: 'status',
            cell: (info) => {
              const status = info.getValue();
              return (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  status === 'active' || status === 'Active' ? 'bg-green-100 text-green-800' : 
                  status === 'pending' || status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                  status === 'inactive' || status === 'Inactive' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {status || 'N/A'}
                </span>
              );
            }
          },
          {
            header: 'Revenue',
            accessorKey: 'revenue',
            cell: (info) => (
              <span className="font-semibold text-green-600">{info.getValue()}</span>
            )
          },
          {
            header: 'Customers',
            accessorKey: 'customers',
            cell: (info) => (
              <div className="flex items-center">
                <Users size={16} className="text-gray-400 mr-2" />
                {(info.getValue() || 0).toLocaleString()}
              </div>
            )
          },
          {
            header: 'Cards Issued',
            accessorKey: 'cardsIssued',
            cell: (info) => (
              <div className="flex items-center">
                <CreditCard size={16} className="text-gray-400 mr-2" />
                {(info.getValue() || 0).toLocaleString()}
              </div>
            )
          },
          {
            header: 'Actions',
            accessorKey: 'actions',
            cell: () => (
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-blue-50 rounded-lg" title="View Details">
                  <Eye size={18} className="text-blue-600" />
                </button>
                <button className="p-2 hover:bg-green-50 rounded-lg" title="Edit">
                  <Edit size={18} className="text-green-600" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg" title="Delete">
                  <Trash2 size={18} className="text-red-600" />
                </button>
              </div>
            )
          }
        ];
      
      case 'partners':
        return [
          {
            header: 'Partner Name',
            accessorKey: 'name',
            cell: (info) => (
              <span className="font-medium">{info.getValue() || 'Unnamed Partner'}</span>
            )
          },
          {
            header: 'Type',
            accessorKey: 'type',
            cell: (info) => (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {info.getValue()}
              </span>
            )
          },
          {
            header: 'Status',
            accessorKey: 'status',
            cell: (info) => {
              const status = info.getValue();
              return (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  status === 'active' || status === 'Active' ? 'bg-green-100 text-green-800' : 
                  status === 'pending' || status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                  status === 'inactive' || status === 'Inactive' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {status || 'N/A'}
                </span>
              );
            }
          },
          {
            header: 'Commission',
            accessorKey: 'commissionRate',
            cell: (info) => (
              <span className="font-semibold">{info.getValue()}</span>
            )
          },
          {
            header: 'Transactions',
            accessorKey: 'totalTransactions',
            cell: (info) => (info.getValue() || 0).toLocaleString()
          },
          {
            header: 'Revenue Share',
            accessorKey: 'revenueShare',
            cell: (info) => (
              <span className="font-semibold text-green-600">{info.getValue()}</span>
            )
          },
          {
            header: 'Actions',
            accessorKey: 'actions',
            cell: () => (
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-blue-50 rounded-lg" title="View Details">
                  <Eye size={18} className="text-blue-600" />
                </button>
                <button className="p-2 hover:bg-green-50 rounded-lg" title="Edit">
                  <Edit size={18} className="text-green-600" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg" title="Delete">
                  <Trash2 size={18} className="text-red-600" />
                </button>
              </div>
            )
          }
        ];
      
      case 'customers':
        return [
          {
            header: 'Name',
            accessorKey: 'name',
            cell: (info) => (
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold mr-3">
                  {info.getValue()?.charAt(0) || 'U'}
                </div>
                <span className="font-medium">{info.getValue() || 'Unknown User'}</span>
              </div>
            )
          },
          {
            header: 'Email',
            accessorKey: 'email',
            cell: (info) => info.getValue() || 'No email'
          },
          {
            header: 'Card Type',
            accessorKey: 'cardType',
            cell: (info) => {
              const cardType = info.getValue();
              return (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  cardType === 'Platinum' ? 'bg-gradient-to-r from-gray-800 to-gray-600 text-white' :
                  cardType === 'Gold' ? 'bg-gradient-to-r from-yellow-500 to-yellow-300 text-white' :
                  cardType === 'Business' ? 'bg-gradient-to-r from-blue-500 to-blue-300 text-white' : 
                  'bg-gradient-to-r from-gray-400 to-gray-200 text-white'
                }`}>
                  {cardType}
                </span>
              );
            }
          },
          {
            header: 'Status',
            accessorKey: 'status',
            cell: (info) => {
              const status = info.getValue();
              return (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  status === 'active' || status === 'Active' ? 'bg-green-100 text-green-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {status || 'Inactive'}
                </span>
              );
            }
          },
          {
            header: 'Balance',
            accessorKey: 'balance',
            cell: (info) => (
              <div className="flex items-center">
                <Wallet size={16} className="text-gray-400 mr-2" />
                {info.getValue()}
              </div>
            )
          },
          {
            header: 'Total Spent',
            accessorKey: 'totalSpent',
            cell: (info) => (
              <span className="font-semibold text-green-600">{info.getValue()}</span>
            )
          },
          {
            header: 'Actions',
            accessorKey: 'actions',
            cell: () => (
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-blue-50 rounded-lg" title="View Details">
                  <Eye size={18} className="text-blue-600" />
                </button>
                <button className="p-2 hover:bg-green-50 rounded-lg" title="Edit">
                  <Edit size={18} className="text-green-600" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg" title="Delete">
                  <Trash2 size={18} className="text-red-600" />
                </button>
              </div>
            )
          }
        ];
      
      default:
        return [];
    }
  };

  const StatCard = ({ title, data }) => {
    const Icon = data.icon;
    
    if (loading.dashboard) {
      return (
        <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${data.color} opacity-50`}>
              <Icon size={24} className="text-white" />
            </div>
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="h-8 w-24 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${data.color} text-white`}>
            <Icon size={24} />
          </div>
          <div className="flex items-center text-green-500 text-sm">
            <TrendingUp size={16} className="mr-1" />
            {data.growth}%
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">
          {typeof data.total === 'number' ? data.total.toLocaleString() : data.total}
        </h3>
        <p className="text-gray-600 mt-2">{title}</p>
        <div className="mt-4 text-sm text-gray-500 space-y-1">
          {data.active !== undefined && (
            <div className="flex items-center">
              <CheckCircle size={14} className="text-green-500 mr-2" />
              {data.active} active
            </div>
          )}
          {data.revenue && data.revenue !== '₹0' && (
            <div className="flex items-center">
              <DollarSign size={14} className="text-blue-500 mr-2" />
              Revenue: {data.revenue}
            </div>
          )}
          {data.pending !== undefined && data.pending > 0 && (
            <div className="flex items-center">
              <Clock size={14} className="text-yellow-500 mr-2" />
              {data.pending} pending
            </div>
          )}
        </div>
      </div>
    );
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Handle page size change (optional, if you want to allow changing page size)
  const handlePageSizeChange = (newPageSize) => {
    // If you want to allow changing page size, uncomment below
    // setPageSize(newPageSize);
    // setPage(0); // Reset to first page when changing page size
  };

  // Error display component
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500 mb-6">
            Make sure your backend server is running on http://localhost:3000
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Reload Page
            </button>
            <button
              onClick={fetchAllData}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center"
            >
              <RefreshCw size={16} className="mr-2" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredData = getFilteredData();
  const paginatedData = getPaginatedData();
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                <CreditCard size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">DigiCard Admin</h1>
              <div className="ml-8 flex space-x-1">
                {['franchise', 'partners', 'customers'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg font-medium capitalize transition-all duration-200 ${
                      activeTab === tab 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <BarChart3 size={20} className="text-gray-600" />
              </button>
              <div className="flex items-center space-x-2 border-l pl-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  AD
                </div>
                <div>
                  <div className="font-medium">Admin User</div>
                  <div className="text-xs text-gray-500">Super Admin</div>
                </div>
                <ChevronDown size={18} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Franchise Centers" data={dashboardStats.franchise} />
          <StatCard title="Partners" data={dashboardStats.partners} />
          <StatCard title="Customers" data={dashboardStats.customers} />
          <StatCard title="Transactions" data={dashboardStats.transactions} />
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(0); // Reset to first page when searching
                  }}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <button className="flex items-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                <Filter size={18} className="mr-2" />
                Filter
              </button>
              <select 
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(0); // Reset to first page when filtering
                }}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
                <Download size={18} className="mr-2" />
                Export
              </button>
              <button 
                onClick={fetchAllData}
                className="flex items-center px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                <RefreshCw size={18} className="mr-2" />
                Refresh
              </button>
              <button className="flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all">
                <Plus size={18} className="mr-2" />
                Add {activeTab.slice(0, -1)}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 capitalize">{activeTab} Management</h2>
            <div className="text-sm text-gray-500">
              Showing {Math.min(pageSize, paginatedData.length)} of {filteredData.length} {activeTab} 
              {totalPages > 1 && ` (Page ${page + 1} of ${totalPages})`}
            </div>
          </div>
          
          {/* Use DynamicTable component */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <DynamicTable
              columns={getColumns()}
              data={paginatedData}
              page={page}
              pageSize={pageSize}
              totalItems={filteredData.length}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              onSearch={(value) => {
                setSearchQuery(value);
                setPage(0);
              }}
              searchBar={false} // We already have search bar above
              pagination={true}
              exportConfig={{
                fileName: `${activeTab}-data.csv`,
                excludedColumns: ['actions']
              }}
              // Add row actions if needed
              rowActions={[
                {
                  label: 'View',
                  onClick: (row) => console.log('View', row)
                },
                {
                  label: 'Edit',
                  onClick: (row) => console.log('Edit', row)
                }
              ]}
            />
          </div>

          {/* Custom pagination info (optional, DynamicTable has its own) */}
          {filteredData.length > pageSize && (
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <div>
                Showing {page * pageSize + 1} to {Math.min((page + 1) * pageSize, filteredData.length)} of {filteredData.length} entries
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 0}
                  className={`px-3 py-1 rounded-lg ${page === 0 ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={(page + 1) * pageSize >= filteredData.length}
                  className={`px-3 py-1 rounded-lg ${(page + 1) * pageSize >= filteredData.length ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
            <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">
              View All
            </button>
          </div>
          {loading.activity ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 animate-pulse">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                    <div>
                      <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 w-48 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                  <div className="h-3 w-16 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.slice(0, 5).map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                      activity.type === 'franchise' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'partner' ? 'bg-green-100 text-green-600' :
                      activity.type === 'customer' ? 'bg-purple-100 text-purple-600' :
                      activity.type === 'transaction' ? 'bg-orange-100 text-orange-600' :
                      activity.type === 'alert' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {activity.type === 'franchise' && <Building2 size={20} />}
                      {activity.type === 'partner' && <Users size={20} />}
                      {activity.type === 'customer' && <UserCircle size={20} />}
                      {activity.type === 'transaction' && <CreditCard size={20} />}
                      {activity.type === 'alert' && <Bell size={20} />}
                      {activity.type === 'system' && <Activity size={20} />}
                    </div>
                    <div>
                      <p className="font-medium">{activity.user}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {activity.status === 'success' && (
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                    )}
                    {activity.status === 'warning' && (
                      <XCircle size={16} className="text-yellow-500 mr-2" />
                    )}
                    {activity.status === 'pending' && (
                      <Clock size={16} className="text-blue-500 mr-2" />
                    )}
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;