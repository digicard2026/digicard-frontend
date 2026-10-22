import React, { useEffect, useRef, useState } from 'react';
import { NavLink as RouterNavLink, useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Home, Settings, User, Zap, HelpCircle, Menu, X } from "lucide-react";

// Tailwind CSS utility function
function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

// Custom NavLink component
const NavLink = ({ to, className, activeClassName, pendingClassName, children, ...props }) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive, isPending }) =>
        cn(className, isActive && activeClassName, isPending && pendingClassName)
      }
      {...props}
    >
      {children}
    </RouterNavLink>
  );
};

// Navigation items
const navItems = [
  { title: "Dashboard", url: "/card-dashbord", icon: Home },
  { title: "My Cards", url: "/cards", icon: CreditCard },
  { title: "Analytics", url: "/analytics", icon: Zap },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

const bottomItems = [
  { title: "Help & Support", url: "/support", icon: HelpCircle },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const trigger = useRef(null);
  const sidebar = useRef(null);

  // Toggle state
  const showText = Boolean(sidebarOpen);

  // Close on click outside (mobile only)
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // Close on Escape key (mobile only)
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen]);

  return (
    <aside
      ref={sidebar}
      className={cn(
        "fixed left-0 top-0 z-999999 border-r border-slate-200 dark:border-slate-800 flex h-screen flex-col overflow-y-auto bg-white dark:bg-slate-900 duration-200 ease-in-out lg:static shrink-0",
        sidebarOpen ? 'translate-x-0 w-48' : '-translate-x-full lg:translate-x-0',
        showText ? 'lg:w-48' : 'lg:w-16'
      )}
    >
      {/* Sidebar Header / Logo */}
      <div className={cn(
        "flex items-center justify-between border-b border-slate-100 dark:border-slate-800 h-[64px]",
        showText ? 'px-3.5 py-2.5' : 'px-2 py-2.5 justify-center'
      )}>
        {showText ? (
          <div className="flex items-center gap-2.5 min-w-0">
            <img 
              src="/src/assets/images/logo-light.png" 
              alt="Digi Card Logo" 
              className="w-7 h-7 object-contain shrink-0"
            />
            <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight truncate">
              Digi Card
            </span>
          </div>
        ) : (
          <img 
            src="/src/assets/images/logo-light.png" 
            alt="Digi Card Logo" 
            className="w-7 h-7 object-contain mx-auto"
          />
        )}
        
        {/* Mobile close button */}
        <button
          ref={window.innerWidth > 1024 ? null : trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="text-slate-400 hover:text-slate-700 dark:hover:text-white lg:hidden p-1"
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className="no-scrollbar flex flex-col overflow-y-auto flex-1">
        <nav className="mt-3 py-2 px-2.5">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.title} className="group relative flex items-center rounded-lg font-medium text-slate-600 dark:text-slate-300">
                <NavLink
                  to={item.url}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                  className={cn(
                    "flex items-center rounded-lg duration-150 transition-colors text-xs font-semibold",
                    pathname === item.url 
                      ? "bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400" 
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
                    showText ? "px-3 py-2 w-full" : "py-2 px-2.5 justify-center w-full"
                  )}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {showText && <span className="ml-2.5 truncate">{item.title}</span>}
                </NavLink>

                {/* Tooltip for collapsed icon-only mode */}
                {!showText && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-slate-900 dark:bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-md">
                    {item.title}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Section */}
        <div className="px-2.5 pb-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <ul className="flex flex-col gap-1">
            {bottomItems.map((item) => (
              <li key={item.title} className="group relative flex items-center rounded-lg font-medium text-slate-600 dark:text-slate-300">
                <NavLink
                  to={item.url}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                  className={cn(
                    "flex items-center rounded-lg duration-150 transition-colors text-xs font-semibold",
                    pathname === item.url 
                      ? "bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400" 
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
                    showText ? "px-3 py-2 w-full" : "py-2 px-2.5 justify-center w-full"
                  )}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {showText && <span className="ml-2.5 truncate">{item.title}</span>}
                </NavLink>

                {/* Tooltip for collapsed icon-only mode */}
                {!showText && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-slate-900 dark:bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-md">
                    {item.title}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;