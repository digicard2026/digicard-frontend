import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import { getCookie, deleteCookie } from '../../utility/cookies';
import { getUserById, getUserProfile } from '../../service/userApi';
import { ProfileContext } from '../../pages/ProfileProvider';
import { LuUser, LuLogOut, LuLayoutDashboard, LuChevronDown } from 'react-icons/lu';

const DropdownUser = () => {
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uin, setUin] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const navigate = useNavigate();

  const VITE_API_URL = import.meta.env.VITE_API_URL || "";
  const { profileImage, user } = useContext(ProfileContext);

  // Retrieve stored user object from auth
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  })();

  const isAdmin = storedUser?.role === 'admin';
  const displayName = firstName || (isAdmin ? 'Administrator' : 'Account');
  const roleLabel = isAdmin ? 'Super Admin' : (uin ? `UIN: ${uin}` : 'User Profile');
  const avatarInitials = firstName 
    ? firstName.slice(0, 2).toUpperCase() 
    : (isAdmin ? 'AD' : 'DG');

  useEffect(() => {
    const fetchUserData = async () => {
      const user_id = getCookie('user_id');
      if (user_id) {
        try {
          const { data } = await getUserById(user_id);
          if (data) {
            setFirstName(data.name || '');
            setEmail(data.email || '');
            setPhone(data.phoneNumber || '');
            if (data.uin_no) setUin(data.uin_no);
            if (data.profile_url) setImageUrl(data.profile_url);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [profileImage]);

  useEffect(() => {
    const fetchProfile = async () => {
      const user_id = getCookie('user_id');
      if (user_id) {
        try {
          await getUserProfile(user_id);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchProfile();
  }, [profileImage]);

  useEffect(() => {
    if (loggedOut) {
      navigate('/SignIn');
    }
  }, [loggedOut, navigate]);

  const handleLogout = async () => {
    try {
      await fetch(`${VITE_API_URL}/api/v1/user/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      localStorage.clear();
      deleteCookie('user_id');
      deleteCookie('token');
      setLoggedOut(true);
      navigate('/SignIn');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.clear();
      deleteCookie('user_id');
      deleteCookie('token');
      setLoggedOut(true);
      navigate('/SignIn');
    }
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-3 p-1 rounded-xl hover:bg-slate-50 dark:hover:bg-meta-4/50 transition-colors focus:outline-none"
        aria-label="User profile menu"
      >
        {/* User labels (hidden on mobile) */}
        <span className="hidden text-right lg:block">
          <span className="block text-xs font-semibold text-slate-900 dark:text-white leading-tight">
            {displayName}
          </span>
          <span className="block text-[11px] font-medium text-slate-400 dark:text-bodydark leading-tight mt-0.5">
            {roleLabel}
          </span>
        </span>

        {/* Sleek rounded avatar badge */}
        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs ring-1 ring-slate-200 dark:ring-strokedark overflow-hidden shrink-0">
          {user?.profile_url || imageUrl ? (
            <img
              src={user?.profile_url || imageUrl}
              alt={displayName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{avatarInitials}</span>
          )}
        </div>

        <LuChevronDown 
          size={14} 
          className={`text-slate-400 dark:text-bodydark transition-transform duration-200 hidden lg:block ${
            dropdownOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-3 w-56 flex flex-col rounded-2xl border border-stroke bg-white shadow-xl dark:border-strokedark dark:bg-boxdark overflow-hidden p-1.5 z-9999 animate-fade-in">
          {/* User Preview Header */}
          <div className="px-3.5 py-2.5 border-b border-stroke dark:border-strokedark bg-slate-50/60 dark:bg-meta-4/30 rounded-xl mb-1">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {displayName}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-bodydark truncate mt-0.5">
              {email || (isAdmin ? 'admin@digicard.com' : 'user@digicard.com')}
            </p>
          </div>

          <div className="space-y-0.5">
            {isAdmin && (
              <Link
                to="/admin-dashboard"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-meta-4 transition-colors"
              >
                <LuLayoutDashboard size={15} className="text-blue-600 dark:text-blue-400" />
                <span>Admin Dashboard</span>
              </Link>
            )}

            <Link
              to="/MyProfile"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-meta-4 transition-colors"
            >
              <LuUser size={15} className="text-slate-400 dark:text-bodydark" />
              <span>My Profile</span>
            </Link>
          </div>

          <div className="mt-1 pt-1 border-t border-stroke dark:border-strokedark">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <LuLogOut size={15} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
