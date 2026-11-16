import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import { getCookie, deleteCookie } from '../../utility/cookies';
import { getUserById } from '../../service/userApi';
import { ProfileContext } from '../../pages/ProfileProvider';
import { LuUser, LuLogOut, LuLayoutDashboard, LuChevronDown } from 'react-icons/lu';

// Consonant clusters that cannot begin a syllable/word, used to detect natural name boundaries in handles
const INVALID_INITIAL = [
  'ms', 'nd', 'lk', 'ld', 'shd', 'rd', 'rk', 'rt', 'nt', 'nk', 'mp', 'mb', 
  'lt', 'lp', 'ng', 'rn', 'rm', 'rl', 'rb', 'rp', 'rc', 'rf', 'rg', 'rj',
  'hd', 'hs', 'hk', 'hm', 'hn', 'hl', 'hr', 'hb', 'hp',
  'ts', 'tk', 'tm', 'tn', 'tl', 'tb', 'tp',
  'ds', 'dk', 'dm', 'dn', 'dl', 'db', 'dp',
  'ks', 'kt', 'km', 'kn', 'kp',
  'gs', 'gt', 'gm', 'gn', 'gp',
  'bs', 'bt', 'bk', 'bm', 'bn',
  'ps', 'pt', 'pk', 'pm', 'pn',
  'ss', 'mm', 'nn', 'll', 'tt', 'dd', 'kk', 'pp', 'bb', 'rr'
];
const DIGRAPHS = ['sh', 'ch', 'th', 'ph', 'kh', 'gh', 'dh', 'bh', 'jh', 'wh', 'ck', 'qu'];

/**
 * Dynamically splits a continuous handle (e.g. "satyamsahoo" -> ["satyam", "sahoo"])
 * using syllable and consonant-cluster boundaries without storing any surname lists.
 */
export const splitContinuousHandle = (str) => {
  const s = (str || '').toLowerCase().replace(/[^a-z]/g, '');
  if (s.length < 6) return null;

  const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'y']);
  const hasVowel = (sub) => [...sub].some(c => VOWELS.has(c));

  let bestSplit = null;
  let bestScore = -999;

  for (let i = 3; i <= s.length - 3; i++) {
    const left = s.slice(0, i);
    const right = s.slice(i);

    if (!hasVowel(left) || !hasVowel(right)) continue;

    // Boundary cannot split across a digraph (e.g. 's' on left, 'h' on right)
    const boundary = left.slice(-1) + right.slice(0, 1);
    if (DIGRAPHS.includes(boundary)) continue;

    // Right side cannot start with an invalid consonant cluster
    const r2 = right.slice(0, 2);
    const r3 = right.slice(0, 3);
    if (INVALID_INITIAL.includes(r2) || INVALID_INITIAL.includes(r3)) continue;

    let score = 0;
    const junc = left.slice(-1) + right.slice(0, 1);
    const junc3 = left.slice(-2) + right.slice(0, 1);
    if (INVALID_INITIAL.includes(junc) || INVALID_INITIAL.includes(junc3)) {
      score += 50;
    }

    if (DIGRAPHS.includes(r2)) {
      score += 25;
    }

    const leftEndsConsonant = !VOWELS.has(left.slice(-1));
    const rightStartsConsonant = !VOWELS.has(right.slice(0, 1));
    if (leftEndsConsonant && rightStartsConsonant) {
      score += 20;
    }

    const leftEndsVowel = VOWELS.has(left.slice(-1));
    if (leftEndsVowel && rightStartsConsonant) {
      score += 15;
    }

    score -= Math.abs(left.length - right.length);

    if (score > bestScore) {
      bestScore = score;
      bestSplit = [left, right];
    }
  }

  return bestSplit;
};

/**
 * Checks if a string looks like a raw username or email handle (e.g. "satyamsahoo123", "umeshdas123", "umeshdas")
 */
export const isRawHandle = (val) => {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (trimmed.includes('@')) return true;
  if (/\d/.test(trimmed)) return true;
  // If single continuous handle without spaces (e.g. "umeshdas", "satyamsahoo")
  if (!trimmed.includes(' ') && trimmed.length >= 5 && trimmed === trimmed.toLowerCase()) return true;
  return false;
};

/**
 * Parses an email address or username (e.g. "satyamsahoo123@gmail.com" or "satyamsahoo123")
 * directly from the mail into a clean full name ("Satyam Sahoo") and 2-letter initials ("SS").
 */
export const parseEmailToNameAndInitials = (input) => {
  if (!input) {
    return { name: '', initials: 'DG', firstName: '', lastName: '' };
  }

  const rawUsername = (input.includes('@') ? input.split('@')[0] : input).trim();
  // Strip numbers and non-letter symbols
  const noNums = rawUsername.replace(/[0-9]+/g, ' ').trim();
  const parts = noNums.split(/[\._\-\s]+/).filter(Boolean);

  // 1. Explicit delimiter in handle (e.g. "satyam.sahoo" or "satyam_sahoo")
  if (parts.length >= 2) {
    const first = parts[0];
    const last = parts[parts.length - 1];
    const capFirst = first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
    const capLast = last.charAt(0).toUpperCase() + last.slice(1).toLowerCase();
    return {
      name: `${capFirst} ${capLast}`,
      initials: (first[0] + last[0]).toUpperCase(),
      firstName: capFirst,
      lastName: capLast
    };
  }

  // 2. Single continuous chunk without delimiters (e.g. "satyamsahoo" or "umeshdas")
  const singleChunk = (parts[0] || rawUsername.replace(/[^a-zA-Z]/g, '')).toLowerCase();
  if (!singleChunk) {
    return { name: 'Account', initials: 'DG', firstName: '', lastName: '' };
  }

  // Algorithmic syllable/boundary detection from email handle
  const split = splitContinuousHandle(singleChunk);
  if (split) {
    const [left, right] = split;
    const capFirst = left.charAt(0).toUpperCase() + left.slice(1).toLowerCase();
    const capLast = right.charAt(0).toUpperCase() + right.slice(1).toLowerCase();
    return {
      name: `${capFirst} ${capLast}`,
      initials: (capFirst[0] + capLast[0]).toUpperCase(),
      firstName: capFirst,
      lastName: capLast
    };
  }

  // Fallback single name without numbers
  const capSingle = singleChunk.charAt(0).toUpperCase() + singleChunk.slice(1);
  const initials = singleChunk.length >= 2
    ? (singleChunk[0] + singleChunk[singleChunk.length - 1]).toUpperCase()
    : singleChunk[0].toUpperCase();

  return {
    name: capSingle,
    initials: initials,
    firstName: capSingle,
    lastName: ''
  };
};

/**
 * Computes 2-letter avatar initials:
 * 1. If firstName and lastName are present: first letter of firstName + first letter of lastName
 * 2. If raw handle (e.g. "satyamsahoo123"): parses into "Satyam Sahoo" and returns "SS"
 * 3. If single word: first letter of first name and last letter of the name (stripping digits)
 * 4. Fallback to smart email parsing
 * 5. Default fallback to 'DG'
 */
export const getAvatarInitials = (firstName = '', lastName = '', fullName = '', email = '') => {
  const cleanFirst = (firstName || '').trim();
  const cleanLast = (lastName || '').trim();
  const cleanFull = (fullName || '').trim();

  // If handle contains numbers or matches continuous handle like satyamsahoo123
  if (isRawHandle(cleanFirst) || isRawHandle(cleanFull)) {
    const parsed = parseEmailToNameAndInitials(cleanFirst || cleanFull || email);
    if (parsed.initials) return parsed.initials;
  }

  // 1. Both first name and last name
  if (cleanFirst && cleanLast) {
    return (cleanFirst[0] + cleanLast[0]).toUpperCase();
  }

  // 2. Full name or single field with multiple words
  const nameToSplit = cleanFull || cleanFirst;
  if (nameToSplit) {
    const words = nameToSplit.split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
    // Check if the single word can be split into <first><surname> (e.g. satyamsahoo -> SS, umeshdas -> UD)
    const parsed = parseEmailToNameAndInitials(words[0]);
    if (parsed && parsed.initials && parsed.initials !== 'DG') {
      return parsed.initials;
    }
    const singleWord = words[0].replace(/[^a-zA-Z]/g, '');
    if (singleWord.length >= 2) {
      return (singleWord[0] + singleWord[1]).toUpperCase();
    }
    if (singleWord.length === 1) {
      return singleWord[0].toUpperCase();
    }
  }

  // 3. Fallback from email address (e.g. "satyamsahoo123@gmail.com" -> "SS")
  if (email) {
    const parsed = parseEmailToNameAndInitials(email);
    if (parsed.initials) {
      return parsed.initials;
    }
  }

  return 'DG';
};

const getInitialUserData = () => {
  try {
    let email = localStorage.getItem('user_email') || '';
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (!email && storedUser.email) email = storedUser.email;

    // As requested: derive profile name and initials strictly from the user's email only
    const fromEmail = parseEmailToNameAndInitials(email);
    let first = fromEmail.firstName || '';
    let last = fromEmail.lastName || '';
    let name = fromEmail.name || '';

    return { first, last, name, email };
  } catch {
    return { first: '', last: '', name: '', email: '' };
  }
};

const DropdownUser = () => {
  const initialData = getInitialUserData();
  const [firstName, setFirstName] = useState(initialData.first);
  const [lastName, setLastName] = useState(initialData.last);
  const [phoneNumber, setPhone] = useState('');
  const [email, setEmail] = useState(initialData.email);
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

  const isAdmin = storedUser?.role === 'admin' || localStorage.getItem('user_role') === 'admin';
  
  // Format clean display name derived strictly from the user's email
  const parsedFromEmail = parseEmailToNameAndInitials(email || storedUser?.email);
  const displayName = parsedFromEmail.name || (isAdmin ? 'Administrator' : 'Account');
  const roleLabel = isAdmin ? 'Super Admin' : (uin ? `UIN: ${uin}` : 'User Profile');

  const rawInitials = parsedFromEmail.initials || 'DG';
  const avatarInitials = (rawInitials === 'DG' && isAdmin) ? 'AD' : rawInitials;

  // Real-time synchronization when profile changes
  useEffect(() => {
    const syncUserFromStorage = () => {
      const latest = getInitialUserData();
      if (latest.first) setFirstName(latest.first);
      if (latest.last) setLastName(latest.last);
      if (latest.email) setEmail(latest.email);
    };

    window.addEventListener('user-profile-updated', syncUserFromStorage);
    window.addEventListener('storage', syncUserFromStorage);
    return () => {
      window.removeEventListener('user-profile-updated', syncUserFromStorage);
      window.removeEventListener('storage', syncUserFromStorage);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const user_id =
        getCookie('user_id') ||
        localStorage.getItem('user_id') ||
        storedUser?.id ||
        storedUser?._id;

      if (user_id) {
        try {
          const { data } = await getUserById(user_id);
          if (data) {
            if (data.email) {
              setEmail(data.email);
              localStorage.setItem('user_email', data.email);
            }
            const effectiveMail = data.email || email;
            const parsed = parseEmailToNameAndInitials(effectiveMail);
            if (parsed.name) {
              setFirstName(parsed.firstName);
              setLastName(parsed.lastName);
            }
            if (data.phoneNumber) setPhone(data.phoneNumber);
            if (data.uin_no) setUin(data.uin_no);
            if (data.profile_url) setImageUrl(data.profile_url);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [profileImage, email]);

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
            <span className="tracking-wide select-none">{avatarInitials}</span>
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
