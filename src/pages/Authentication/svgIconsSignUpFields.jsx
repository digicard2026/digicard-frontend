
import React from 'react';

export const EmailIcon = () => (
  <svg class=" text-gray-500"
    height="22"
    width="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export const MobileIcon = () => (
  <svg class="text-gray-500"
    width="24" height="24"
    viewBox="0 0 22 22"
    stroke-width="2"
    stroke="currentColor"
    fill="none" stroke-linecap="round"
    stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" />
    <rect x="7" y="4" width="10"
      height="16" rx="1" />
    <line x1="11" y1="5" x2="13" y2="5" />
    <line x1="12" y1="17" x2="12" y2="17.01" />
  </svg>
);
export const LandLineIcon = () => (
  <svg class=" text-gray-500"
    width="22"
    height="22"
    viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <polyline points="19 1 23 5 19 9" />  <line x1="15" y1="5" x2="23" y2="5" />
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);
export const PasswordIcon = () => (
  <svg class=" text-gray-500"
  height="22"
  width="22"
  fill="none"
  viewBox="0 0 22 22"
  stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
</svg>
);
export const NameIcon = () => (
  <svg class=" text-gray-500"
    height="22"
    width="22"
    viewBox="0 0 22 22" fill="none"

    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" /></svg>
);
export const AddressIcon = () => (
  <svg class=" text-gray-500"
    width="22"
    height="22"
    fill="none"
    viewBox="0 0 22 22"
    stroke="currentColor">
    <path stroke-linecap="round"
      stroke-linejoin="round" stroke-width="2"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path stroke-linecap="round"
      stroke-linejoin="round" stroke-width="2"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);



// Export all icons as a single object for easier import
export default {
  email: <EmailIcon />,
  mobile: <MobileIcon />,
  name: <NameIcon />,
  address: <AddressIcon />,
  landLine: <LandLineIcon />,
  password: <PasswordIcon />,
 
};
