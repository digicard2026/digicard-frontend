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
  RefreshCw,
  X,
  Mail,
  MapPin,
  Calendar,
  Save,
  Check,
  ShieldCheck,
  Layers,
  Sparkles
} from 'lucide-react';
import ClickOutside from '../../components/ClickOutside';
import DynamicTable from '../../components/DynamicTable'; 
import { ADMIN_URL } from "../../utility/constants";

const ENTITY_LABELS = {
  franchise: 'Franchise Center',
  partners: 'Channel Partner',
  customers: 'Customer'
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('franchise');
  const [loading, setLoading] = useState({
    dashboard: true,
    table: true,
    activity: true
  });
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Drawer & Modal States
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState('view'); // 'view' | 'edit'
  const [selectedItem, setSelectedItem] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  // Dashboard Metrics State
  const [dashboardStats, setDashboardStats] = useState({
    franchise: {
      total: 0,
      active: 0,
      pending: 0,
      growth: 12.5,
      revenue: '₹0',
      icon: Building2,
      color: 'bg-blue-600 dark:bg-blue-500'
    },
    partners: {
      total: 0,
      active: 0,
      newThisMonth: 0,
      growth: 18.2,
      icon: Users,
      color: 'bg-emerald-600 dark:bg-emerald-500'
    },
    customers: {
      total: 0,
      active: 0,
      newToday: 0,
      growth: 15.4,
      icon: UserCircle,
      color: 'bg-purple-600 dark:bg-purple-500'
    },
    transactions: {
      total: 0,
      volume: '₹0',
      successRate: 98.4,
      growth: 8.6,
      icon: CreditCard,
      color: 'bg-amber-600 dark:bg-amber-500'
    }
  });

  const [allFranchiseData, setAllFranchiseData] = useState([]);
  const [allPartnersData, setAllPartnersData] = useState([]);
  const [allCustomersData, setAllCustomersData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);

  // Show transient toast notification
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Auth Header Helper
  const getAdminAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  };

  // API Client
  const adminApi = {
    getDashboardStats: async () => {
      const response = await fetch(`${ADMIN_URL}/dashboard-stats`, {
        credentials: 'include',
        headers: getAdminAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch dashboard stats');
      return response.json();
    },

    getFranchises: async () => {
      const response = await fetch(`${ADMIN_URL}/franchises`, {
        credentials: 'include',
        headers: getAdminAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch franchises');
      return response.json();
    },

    getPartners: async () => {
      const response = await fetch(`${ADMIN_URL}/partners`, {
        credentials: 'include',
        headers: getAdminAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch partners');
      return response.json();
    },

    getCustomers: async () => {
      const response = await fetch(`${ADMIN_URL}/customers`, {
        credentials: 'include',
        headers: getAdminAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch customers');
      return response.json();
    },

    getRecentActivity: async () => {
      const response = await fetch(`${ADMIN_URL}/recent-activity`, {
        credentials: 'include',
        headers: getAdminAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch recent activity');
      return response.json();
    },
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${diffInDays}d ago`;
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    if (activeTab === 'franchise') {
      fetchFranchises();
    } else if (activeTab === 'partners') {
      fetchPartners();
    } else if (activeTab === 'customers') {
      fetchCustomers();
    }
    setPage(0);
  }, [activeTab]);

  const fetchAllData = async () => {
    try {
      setLoading(prev => ({ ...prev, dashboard: true, activity: true }));
      setError(null);

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
          successRate: stats.transactions?.successRate || 98.4
        }
      };
      setDashboardStats(formattedStats);

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
      console.error('Error fetching admin data:', err);
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
        commissionRate: '15%',
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

  // Filtered dataset
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

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(item => 
        item.name?.toLowerCase().includes(q) ||
        item.email?.toLowerCase().includes(q) ||
        item.location?.toLowerCase().includes(q) ||
        item.manager?.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'All Status') {
      data = data.filter(item => 
        item.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    return data;
  };

  const getPaginatedData = () => {
    const filteredData = getFilteredData();
    const startIndex = page * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  };

  // CSV Export Action
  const handleExportCSV = () => {
    const currentData = getFilteredData();
    if (!currentData || currentData.length === 0) {
      alert("No data available to export.");
      return;
    }

    let headers = [];
    let rowMapper = (item) => [];

    if (activeTab === 'franchise') {
      headers = ['ID', 'Name', 'Location', 'Status', 'Manager', 'Joined Date', 'Revenue', 'Customers', 'Cards Issued'];
      rowMapper = (f) => [
        f.id || '',
        `"${(f.name || '').replace(/"/g, '""')}"`,
        `"${(f.location || '').replace(/"/g, '""')}"`,
        f.status || '',
        `"${(f.manager || '').replace(/"/g, '""')}"`,
        f.joined || '',
        f.revenue || '₹0',
        f.customers || 0,
        f.cardsIssued || 0
      ];
    } else if (activeTab === 'partners') {
      headers = ['ID', 'Name', 'Email', 'Type', 'Status', 'Commission', 'Joined Date'];
      rowMapper = (p) => [
        p.id || '',
        `"${(p.name || '').replace(/"/g, '""')}"`,
        p.email || '',
        p.type || 'Partner',
        p.status || '',
        p.commissionRate || '15%',
        p.joined || ''
      ];
    } else {
      headers = ['ID', 'Name', 'Email', 'Card Type', 'Status', 'Joined Date'];
      rowMapper = (c) => [
        c.id || '',
        `"${(c.name || '').replace(/"/g, '""')}"`,
        c.email || '',
        c.cardType || 'Standard',
        c.status || '',
        c.joined || ''
      ];
    }

    const csvContent = [
      headers.join(','),
      ...currentData.map(item => rowMapper(item).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `digicard-${activeTab}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Exported ${currentData.length} ${activeTab} records as CSV.`);
  };

  // Open Drawer for View or Edit
  const handleOpenDrawer = (item, mode = 'view') => {
    setSelectedItem(item);
    setDrawerMode(mode);
    setEditFormData({
      name: item.name || '',
      email: item.email || '',
      status: item.status || 'Active',
      location: item.location || '',
      manager: item.manager || '',
      cardType: item.cardType || 'Standard',
      commissionRate: item.commissionRate || '15%'
    });
    setDrawerOpen(true);
  };

  // Save Edits Handler
  const handleSaveEdit = () => {
    if (!selectedItem) return;

    const updater = (prevList) =>
      prevList.map(item =>
        item.id === selectedItem.id ? { ...item, ...editFormData } : item
      );

    if (activeTab === 'franchise') {
      setAllFranchiseData(updater);
    } else if (activeTab === 'partners') {
      setAllPartnersData(updater);
    } else {
      setAllCustomersData(updater);
    }

    setSelectedItem(prev => ({ ...prev, ...editFormData }));
    setDrawerMode('view');
    showToast(`Updated ${editFormData.name || 'record'} successfully!`);
  };

  // Delete Action
  const handleConfirmDelete = (item) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const executeDelete = () => {
    if (!itemToDelete) return;
    const filterOut = (prev) => prev.filter(i => i.id !== itemToDelete.id);

    if (activeTab === 'franchise') setAllFranchiseData(filterOut);
    else if (activeTab === 'partners') setAllPartnersData(filterOut);
    else setAllCustomersData(filterOut);

    setDeleteModalOpen(false);
    setItemToDelete(null);
    if (drawerOpen && selectedItem?.id === itemToDelete.id) {
      setDrawerOpen(false);
    }
    showToast(`Deleted ${itemToDelete.name || 'record'}.`, 'error');
  };

  // Table Columns Definition
  const getColumns = () => {
    const renderStatusBadge = (status) => {
      const normalized = (status || '').toLowerCase();
      const isActive = normalized === 'active';
      const isPending = normalized === 'pending';
      const isInactive = normalized === 'inactive';

      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
          isActive
            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
            : isPending
            ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
            : isInactive
            ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800'
            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${
            isActive ? 'bg-emerald-500 animate-pulse' : isPending ? 'bg-amber-500' : 'bg-rose-500'
          }`} />
          {status || 'Unknown'}
        </span>
      );
    };

    const actionCell = (info) => (
      <div className="flex items-center space-x-1">
        <button 
          onClick={() => handleOpenDrawer(info.row.original, 'view')}
          className="p-1.5 hover:bg-blue-50 dark:hover:bg-boxdark-2 rounded-lg text-blue-600 dark:text-blue-400 transition-colors" 
          title="View Details"
        >
          <Eye size={17} />
        </button>
        <button 
          onClick={() => handleOpenDrawer(info.row.original, 'edit')}
          className="p-1.5 hover:bg-emerald-50 dark:hover:bg-boxdark-2 rounded-lg text-emerald-600 dark:text-emerald-400 transition-colors" 
          title="Edit"
        >
          <Edit size={17} />
        </button>
        <button 
          onClick={() => handleConfirmDelete(info.row.original)}
          className="p-1.5 hover:bg-rose-50 dark:hover:bg-boxdark-2 rounded-lg text-rose-600 dark:text-rose-400 transition-colors" 
          title="Delete"
        >
          <Trash2 size={17} />
        </button>
      </div>
    );

    switch(activeTab) {
      case 'franchise':
        return [
          {
            header: 'Franchise Center',
            accessorKey: 'name',
            cell: (info) => (
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold mr-3 shrink-0">
                  <Building2 size={18} />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">{info.getValue() || 'Unnamed Franchise'}</div>
                  <div className="text-xs text-slate-500 dark:text-bodydark">{info.row.original.manager || 'No manager'}</div>
                </div>
              </div>
            )
          },
          {
            header: 'Location',
            accessorKey: 'location',
            cell: (info) => (
              <span className="text-slate-600 dark:text-bodydark flex items-center gap-1.5">
                <MapPin size={14} className="text-slate-400" />
                {info.getValue() || 'N/A'}
              </span>
            )
          },
          {
            header: 'Status',
            accessorKey: 'status',
            cell: (info) => renderStatusBadge(info.getValue())
          },
          {
            header: 'Revenue',
            accessorKey: 'revenue',
            cell: (info) => (
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{info.getValue()}</span>
            )
          },
          {
            header: 'Customers',
            accessorKey: 'customers',
            cell: (info) => (
              <div className="flex items-center text-slate-700 dark:text-slate-300">
                <Users size={14} className="text-slate-400 mr-1.5" />
                {(info.getValue() || 0).toLocaleString()}
              </div>
            )
          },
          {
            header: 'Cards Issued',
            accessorKey: 'cardsIssued',
            cell: (info) => (
              <div className="flex items-center text-slate-700 dark:text-slate-300">
                <CreditCard size={14} className="text-slate-400 mr-1.5" />
                {(info.getValue() || 0).toLocaleString()}
              </div>
            )
          },
          {
            header: 'Actions',
            accessorKey: 'actions',
            cell: actionCell
          }
        ];
      
      case 'partners':
        return [
          {
            header: 'Partner Name',
            accessorKey: 'name',
            cell: (info) => (
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-semibold mr-3 shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">{info.getValue() || 'Partner'}</div>
                  <div className="text-xs text-slate-500 dark:text-bodydark">{info.row.original.email}</div>
                </div>
              </div>
            )
          },
          {
            header: 'Type',
            accessorKey: 'type',
            cell: (info) => (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                {info.getValue()}
              </span>
            )
          },
          {
            header: 'Status',
            accessorKey: 'status',
            cell: (info) => renderStatusBadge(info.getValue())
          },
          {
            header: 'Commission',
            accessorKey: 'commissionRate',
            cell: (info) => (
              <span className="font-semibold text-slate-900 dark:text-white">{info.getValue()}</span>
            )
          },
          {
            header: 'Joined Date',
            accessorKey: 'joined',
            cell: (info) => (
              <span className="text-xs text-slate-500 dark:text-bodydark flex items-center gap-1">
                <Calendar size={13} className="text-slate-400" />
                {info.getValue()}
              </span>
            )
          },
          {
            header: 'Actions',
            accessorKey: 'actions',
            cell: actionCell
          }
        ];
      
      case 'customers':
        return [
          {
            header: 'Customer',
            accessorKey: 'name',
            cell: (info) => (
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400 font-semibold mr-3 shrink-0">
                  {info.getValue()?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">{info.getValue() || 'Unknown User'}</div>
                  <div className="text-xs text-slate-500 dark:text-bodydark">{info.row.original.email}</div>
                </div>
              </div>
            )
          },
          {
            header: 'Card Type',
            accessorKey: 'cardType',
            cell: (info) => (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-meta-4 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-strokedark">
                {info.getValue()}
              </span>
            )
          },
          {
            header: 'Status',
            accessorKey: 'status',
            cell: (info) => renderStatusBadge(info.getValue())
          },
          {
            header: 'Joined Date',
            accessorKey: 'joined',
            cell: (info) => (
              <span className="text-xs text-slate-500 dark:text-bodydark flex items-center gap-1">
                <Calendar size={13} className="text-slate-400" />
                {info.getValue()}
              </span>
            )
          },
          {
            header: 'Actions',
            accessorKey: 'actions',
            cell: actionCell
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
        <div className="bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded-2xl p-5 shadow-2xs animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 w-28 bg-slate-200 dark:bg-meta-4 rounded"></div>
            <div className="h-8 w-8 rounded-xl bg-slate-200 dark:bg-meta-4"></div>
          </div>
          <div className="h-8 w-24 bg-slate-200 dark:bg-meta-4 rounded mb-3"></div>
          <div className="h-4 w-36 bg-slate-200 dark:bg-meta-4 rounded"></div>
        </div>
      );
    }

    return (
      <div className="bg-white dark:bg-boxdark border border-slate-200/80 dark:border-strokedark rounded-2xl p-5 shadow-2xs hover:shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between">
        <div>
          {/* Card Top: Eyebrow + Neutral Slate Icon */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-bodydark">
              {title}
            </span>
            <div className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-meta-4/80 border border-slate-200/60 dark:border-strokedark text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
              <Icon size={16} />
            </div>
          </div>

          {/* Metric + Growth Pill */}
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
              {typeof data.total === 'number' ? data.total.toLocaleString() : data.total}
            </h3>
            {data.growth !== undefined && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 tabular-nums shrink-0">
                <TrendingUp size={12} />
                +{data.growth}%
              </span>
            )}
          </div>
        </div>

        {/* Status Dots Footer with Tabular Typography */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-strokedark/80 flex items-center justify-between text-xs text-slate-500 dark:text-bodydark">
          <div className="flex items-center gap-3">
            {data.active !== undefined && (
              <div className="flex items-center gap-1.5 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100 dark:ring-emerald-950/50" />
                <span className="tabular-nums font-semibold text-slate-700 dark:text-slate-200">{data.active}</span>
                <span>active</span>
              </div>
            )}
            {data.pending !== undefined && (
              <div className="flex items-center gap-1.5 font-medium">
                <span className="h-2 w-2 rounded-full bg-amber-500 ring-2 ring-amber-100 dark:ring-amber-950/50" />
                <span className="tabular-nums font-semibold text-slate-700 dark:text-slate-200">{data.pending}</span>
                <span>pending</span>
              </div>
            )}
            {data.successRate !== undefined && (
              <div className="flex items-center gap-1.5 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100 dark:ring-emerald-950/50" />
                <span className="tabular-nums font-semibold text-slate-700 dark:text-slate-200">{data.successRate}%</span>
                <span>rate</span>
              </div>
            )}
          </div>

          {data.volume && data.volume !== '₹0' && (
            <span className="font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
              {data.volume}
            </span>
          )}
        </div>
      </div>
    );
  };

  const filteredData = getFilteredData();
  const paginatedData = getPaginatedData();

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="h-16 w-16 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-rose-600 dark:text-rose-400">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Error Loading Dashboard</h2>
          <p className="text-sm text-slate-600 dark:text-bodydark mb-6">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-meta-4 hover:bg-slate-200 dark:hover:bg-opacity-80 text-slate-700 dark:text-white rounded-xl text-sm font-semibold transition-colors"
            >
              Reload
            </button>
            <button
              onClick={fetchAllData}
              className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <RefreshCw size={15} />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-99999 px-4 py-3 rounded-xl shadow-lg border text-sm font-semibold flex items-center gap-2 animate-bounce ${
          toastMessage.type === 'error'
            ? 'bg-rose-50 dark:bg-rose-950 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
            : 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
        }`}>
          <CheckCircle size={16} />
          {toastMessage.message}
        </div>
      )}

      {/* Page Header (No duplicate layout header) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-strokedark">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <ShieldCheck size={18} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Platform Administration
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-bodydark mt-1">
            Overview of franchises, channel partners, user accounts, and billing activity.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center bg-slate-100 dark:bg-meta-4 p-1 rounded-xl self-start sm:self-auto border border-slate-200 dark:border-strokedark">
          {[
            { id: 'franchise', label: 'Franchises', icon: Building2 },
            { id: 'partners', label: 'Partners', icon: Users },
            { id: 'customers', label: 'Customers', icon: UserCircle }
          ].map(tab => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-150 ${
                  isActive
                    ? 'bg-white dark:bg-boxdark text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-bodydark hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <TabIcon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Franchise Centers" data={dashboardStats.franchise} />
        <StatCard title="Channel Partners" data={dashboardStats.partners} />
        <StatCard title="Total Customers" data={dashboardStats.customers} />
        <StatCard title="Payment Volume" data={dashboardStats.transactions} />
      </div>

      {/* Unified Modern Toolbar */}
      <div className="bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded-2xl p-3 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search Input with Clear Button */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder={`Search ${ENTITY_LABELS[activeTab]} by name, email, or city...`}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(0);
                }}
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-meta-4 border border-slate-200 dark:border-strokedark rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white p-0.5"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Custom Modern Status Filter Dropdown */}
            <ClickOutside onClick={() => setStatusDropdownOpen(false)} className="relative">
              <button
                type="button"
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 px-3 py-2 bg-slate-50 dark:bg-meta-4 border border-slate-200 dark:border-strokedark hover:bg-slate-100 dark:hover:bg-meta-4/80 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors shadow-2xs"
              >
                <Filter size={14} className="text-slate-400 shrink-0" />
                <span className="flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${
                    statusFilter === 'Active' ? 'bg-emerald-500' :
                    statusFilter === 'Pending' ? 'bg-amber-500' :
                    statusFilter === 'Inactive' ? 'bg-rose-500' : 'bg-slate-400'
                  }`} />
                  <span>{statusFilter}</span>
                </span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${statusDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {statusDropdownOpen && (
                <div className="absolute left-0 mt-2 w-44 bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded-2xl shadow-xl p-1 z-9999 animate-fade-in">
                  {['All Status', 'Active', 'Pending', 'Inactive'].map((status) => {
                    const isSelected = statusFilter === status;
                    return (
                      <button
                        key={status}
                        onClick={() => {
                          setStatusFilter(status);
                          setStatusDropdownOpen(false);
                          setPage(0);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                          isSelected 
                            ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold' 
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-meta-4'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${
                            status === 'Active' ? 'bg-emerald-500' :
                            status === 'Pending' ? 'bg-amber-500' :
                            status === 'Inactive' ? 'bg-rose-500' : 'bg-slate-400'
                          }`} />
                          <span>{status}</span>
                        </div>
                        {isSelected && <Check size={14} />}
                      </button>
                    );
                  })}
                </div>
              )}
            </ClickOutside>
          </div>

          {/* Action Button Group */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button 
              onClick={fetchAllData}
              className="p-2 border border-slate-200 dark:border-strokedark hover:bg-slate-50 dark:hover:bg-meta-4 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-semibold transition-colors shadow-2xs"
              title="Refresh Data"
            >
              <RefreshCw size={14} className={loading.dashboard || loading.table ? 'animate-spin text-blue-600' : ''} />
            </button>
            <button 
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 dark:border-strokedark hover:bg-slate-50 dark:hover:bg-meta-4 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors shadow-2xs"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
            <button 
              onClick={() => handleOpenDrawer({ name: `New ${ENTITY_LABELS[activeTab] || 'Record'}` }, 'edit')}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
            >
              <Plus size={15} />
              <span>Add {ENTITY_LABELS[activeTab] || 'Record'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Section (No duplicate bottom pagination) */}
      <div className="bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-strokedark flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white capitalize">
            {activeTab} Directory
          </h2>
          <span className="text-xs text-slate-500 dark:text-bodydark">
            Showing {Math.min(pageSize, paginatedData.length)} of {filteredData.length} records
          </span>
        </div>

        <DynamicTable
          columns={getColumns()}
          data={paginatedData}
          page={page}
          pageSize={pageSize}
          totalItems={filteredData.length}
          onPageChange={(newPage) => setPage(newPage)}
          searchBar={false}
          pagination={true}
        />
      </div>

      {/* Recent Activity Card */}
      <div className="bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-strokedark">
          <div className="flex items-center gap-2">
            <Activity size={17} className="text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Platform Activity</h3>
          </div>
          <button 
            onClick={() => showToast("All system logs fetched.")}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Refresh Logs
          </button>
        </div>

        {loading.activity ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-meta-4 animate-pulse">
                <div className="h-4 w-40 bg-slate-200 dark:bg-strokedark rounded"></div>
                <div className="h-3 w-16 bg-slate-200 dark:bg-strokedark rounded"></div>
              </div>
            ))}
          </div>
        ) : recentActivity.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-bodydark py-4 text-center">
            No recent activity logged.
          </p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-strokedark">
            {recentActivity.slice(0, 5).map((act, index) => (
              <div key={index} className="py-2.5 flex items-center justify-between text-xs hover:bg-slate-50 dark:hover:bg-boxdark-2 rounded-lg px-2 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Activity size={14} />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">{act.user}</span>
                    <span className="text-slate-500 dark:text-bodydark ml-2">{act.action}</span>
                  </div>
                </div>
                <span className="text-slate-400 dark:text-bodydark font-medium shrink-0 ml-2">
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* P1 Slide-Over Drawer for View Details & Edit */}
      {drawerOpen && selectedItem && (
        <div className="fixed inset-0 z-99999 flex justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Container */}
          <div className="relative z-10 w-full max-w-md bg-white dark:bg-boxdark shadow-2xl flex flex-col h-full border-l border-stroke dark:border-strokedark animate-slide-left">
            {/* Header */}
            <div className="p-5 border-b border-stroke dark:border-strokedark flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {drawerMode === 'view' ? `${ENTITY_LABELS[activeTab] || 'Record'} Details` : `Edit ${ENTITY_LABELS[activeTab] || 'Record'}`}
                </h3>
                <p className="text-xs text-slate-500 dark:text-bodydark mt-0.5">
                  ID: {selectedItem.id || 'N/A'}
                </p>
              </div>
              <button 
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-meta-4 rounded-xl text-slate-500 dark:text-bodydark transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="px-5 pt-3 flex gap-2">
              <button
                onClick={() => setDrawerMode('view')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  drawerMode === 'view'
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                    : 'text-slate-600 dark:text-bodydark hover:bg-slate-100 dark:hover:bg-meta-4'
                }`}
              >
                View Summary
              </button>
              <button
                onClick={() => setDrawerMode('edit')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  drawerMode === 'edit'
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                    : 'text-slate-600 dark:text-bodydark hover:bg-slate-100 dark:hover:bg-meta-4'
                }`}
              >
                Edit Properties
              </button>
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4 text-sm">
              {drawerMode === 'view' ? (
                <>
                  <div className="bg-slate-50 dark:bg-meta-4 rounded-xl p-4 border border-slate-200 dark:border-strokedark">
                    <p className="text-xs text-slate-400 font-medium">Full Name / Title</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      {selectedItem.name || 'N/A'}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-slate-500 dark:text-bodydark">Status:</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        {selectedItem.status || 'Active'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {selectedItem.email && (
                      <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200">
                        <Mail size={15} className="text-slate-400 shrink-0" />
                        <span>{selectedItem.email}</span>
                      </div>
                    )}
                    {selectedItem.location && (
                      <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200">
                        <MapPin size={15} className="text-slate-400 shrink-0" />
                        <span>{selectedItem.location}</span>
                      </div>
                    )}
                    {selectedItem.manager && (
                      <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200">
                        <UserCircle size={15} className="text-slate-400 shrink-0" />
                        <span>Manager: {selectedItem.manager}</span>
                      </div>
                    )}
                    {selectedItem.joined && (
                      <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200">
                        <Calendar size={15} className="text-slate-400 shrink-0" />
                        <span>Joined: {selectedItem.joined}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-strokedark grid grid-cols-2 gap-3 text-xs">
                    {selectedItem.revenue !== undefined && (
                      <div className="bg-slate-50 dark:bg-meta-4 p-3 rounded-xl border border-slate-200 dark:border-strokedark">
                        <p className="text-slate-400">Total Revenue</p>
                        <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-1">
                          {selectedItem.revenue}
                        </p>
                      </div>
                    )}
                    {selectedItem.customers !== undefined && (
                      <div className="bg-slate-50 dark:bg-meta-4 p-3 rounded-xl border border-slate-200 dark:border-strokedark">
                        <p className="text-slate-400">Customers</p>
                        <p className="font-bold text-slate-900 dark:text-white text-sm mt-1">
                          {selectedItem.customers}
                        </p>
                      </div>
                    )}
                    {selectedItem.cardsIssued !== undefined && (
                      <div className="bg-slate-50 dark:bg-meta-4 p-3 rounded-xl border border-slate-200 dark:border-strokedark">
                        <p className="text-slate-400">Cards Issued</p>
                        <p className="font-bold text-slate-900 dark:text-white text-sm mt-1">
                          {selectedItem.cardsIssued}
                        </p>
                      </div>
                    )}
                    {selectedItem.commissionRate && (
                      <div className="bg-slate-50 dark:bg-meta-4 p-3 rounded-xl border border-slate-200 dark:border-strokedark">
                        <p className="text-slate-400">Commission</p>
                        <p className="font-bold text-slate-900 dark:text-white text-sm mt-1">
                          {selectedItem.commissionRate}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Display Name
                    </label>
                    <input 
                      type="text" 
                      value={editFormData.name} 
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-meta-4 border border-slate-200 dark:border-strokedark rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Status
                    </label>
                    <select
                      value={editFormData.status}
                      onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-meta-4 border border-slate-200 dark:border-strokedark rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  {selectedItem.location !== undefined && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Location / City
                      </label>
                      <input 
                        type="text" 
                        value={editFormData.location} 
                        onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-meta-4 border border-slate-200 dark:border-strokedark rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  )}

                  {selectedItem.manager !== undefined && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Manager In-Charge
                      </label>
                      <input 
                        type="text" 
                        value={editFormData.manager} 
                        onChange={(e) => setEditFormData({ ...editFormData, manager: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-meta-4 border border-slate-200 dark:border-strokedark rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  )}

                  {selectedItem.commissionRate !== undefined && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Commission Rate
                      </label>
                      <input 
                        type="text" 
                        value={editFormData.commissionRate} 
                        onChange={(e) => setEditFormData({ ...editFormData, commissionRate: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-meta-4 border border-slate-200 dark:border-strokedark rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-stroke dark:border-strokedark flex items-center justify-end gap-2">
              {drawerMode === 'view' ? (
                <>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-bodydark hover:bg-slate-100 dark:hover:bg-meta-4 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => setDrawerMode('edit')}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Edit size={14} />
                    Edit Record
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setDrawerMode('view')}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-bodydark hover:bg-slate-100 dark:hover:bg-meta-4 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Save size={14} />
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && itemToDelete && (
        <div className="fixed inset-0 z-99999 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setDeleteModalOpen(false)} />
          <div className="relative z-10 w-full max-w-sm bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded-2xl shadow-xl p-5 text-center">
            <div className="h-12 w-12 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 flex items-center justify-center mx-auto mb-3">
              <Trash2 size={24} />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Delete Record?</h4>
            <p className="text-xs text-slate-500 dark:text-bodydark mt-1">
              Are you sure you want to remove <span className="font-semibold text-slate-700 dark:text-white">{itemToDelete.name || 'this item'}</span>? This action cannot be undone.
            </p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 py-2 text-xs font-semibold text-slate-600 dark:text-bodydark hover:bg-slate-100 dark:hover:bg-meta-4 rounded-xl border border-slate-200 dark:border-strokedark transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;