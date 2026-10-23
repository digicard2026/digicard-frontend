import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DropdownUser from './DropdownUser';
import DarkModeSwitcher from './DarkModeSwitcher';
import { LuChevronsLeft, LuChevronsRight } from "react-icons/lu";

const Header = (props) => {
  const location = useLocation();

  // Generate readable breadcrumb items based on current route
  const getBreadcrumbTitle = () => {
    const path = location.pathname;
    if (path === '/admin-dashboard') return 'Platform Dashboard';
    if (path === '/franchise/dashboard') return 'Franchise Dashboard';
    if (path === '/partner/dashboard') return 'Partner Dashboard';
    if (path === '/card-dashbord') return 'Digital Cards';
    if (path === '/cards') return 'My Cards';
    if (path === '/analytics') return 'Analytics & Telemetry';
    if (path === '/profile') return 'Account Profile';
    if (path === '/settings') return 'Settings & Preferences';
    if (path === '/support') return 'Help & Support';
    if (path.startsWith('/admin')) {
      const sub = path.replace('/admin-', '').replace('/', '');
      return sub.charAt(0).toUpperCase() + sub.slice(1);
    }
    const clean = path.replace('/', '').replace(/-/g, ' ');
    return clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : 'Overview';
  };

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white/95 dark:bg-boxdark/95 backdrop-blur-md border-b border-stroke dark:border-strokedark transition-colors">
      <div className="flex flex-grow items-center justify-between px-4 h-16 md:px-6 2xl:px-8">
        {/* Left Side: Sidebar Toggle & Sleek Breadcrumbs */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-meta-4 transition-colors border border-slate-200/80 dark:border-strokedark shadow-2xs"
            title={props.sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {props.sidebarOpen ? <LuChevronsLeft size={18} /> : <LuChevronsRight size={18} />}
          </button>

          {/* Sleek Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-bodydark">
            <Link to="/" className="text-slate-400 hover:text-slate-700 dark:text-bodydark dark:hover:text-white transition-colors">
              DigiCard
            </Link>
            <span className="text-slate-300 dark:text-strokedark">/</span>
            {location.pathname.startsWith('/admin') && (
              <>
                <span className="text-slate-500 dark:text-slate-400">Admin</span>
                <span className="text-slate-300 dark:text-strokedark">/</span>
              </>
            )}
            <span className="text-slate-900 dark:text-white font-semibold">
              {getBreadcrumbTitle()}
            </span>
          </nav>
        </div>

        {/* Right Side: Theme switcher & Refined User Dropdown */}
        <div className="flex items-center gap-3 sm:gap-4">
          <ul className="flex items-center gap-2">
            <DarkModeSwitcher />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
