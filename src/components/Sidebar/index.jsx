// import React, { useEffect, useRef, useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import SidebarLinkGroup from './SidebarLinkGroup';
// import Logo from '../../images/logo/logo.svg';
// import { RiBillLine, RiLuggageCartFill } from "react-icons/ri";
// import { LuLineChart, LuUser, LuActivity } from "react-icons/lu";
// import { useKyc } from '../../pages/Authentication/KycContext';
// import { IoStatsChart } from "react-icons/io5";
// import { GoPasskeyFill } from "react-icons/go";
// import { LuMonitor } from "react-icons/lu";
// import { GoDotFill } from "react-icons/go";
// import { HiOutlineSpeakerphone } from "react-icons/hi";
// // import { ProfileContext } from '../../pages/ProfileProvider';
// import { useSelector } from 'react-redux';
// // import { useContext } from 'react';
// import { LuPhoneCall } from "react-icons/lu";
// const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
//   const location = useLocation();
//   const { pathname } = location;

//   const trigger = useRef(null);
//   const sidebar = useRef(null);
//   const { isKycVerified } = useKyc();
//   // const {role} = useContext(ProfileContext);
//   const role =useSelector((state) => state.role.role);

//   const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
//   const [sidebarExpanded, setSidebarExpanded] = useState(
//     storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
//   );

//   // close on click outside
//   useEffect(() => {
//     const clickHandler = ({ target }) => {
//       if (!sidebar.current || !trigger.current) return;
//       if (
//         !sidebarOpen ||
//         sidebar.current.contains(target) ||
//         trigger.current.contains(target)
//       )
//         return;
//       setSidebarOpen(false);
//     };
//     document.addEventListener('click', clickHandler);
//     return () => document.removeEventListener('click', clickHandler);
//   }, [sidebarOpen, setSidebarOpen]);

//   // close if the esc key is pressed
//   useEffect(() => {
//     const keyHandler = ({ keyCode }) => {
//       if (!sidebarOpen || keyCode !== 27) return;
//       setSidebarOpen(false);
//     };
//     document.addEventListener('keydown', keyHandler);
//     return () => document.removeEventListener('keydown', keyHandler);
//   }, [sidebarOpen]);

//   useEffect(() => {
//     localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
//     if (sidebarExpanded) {
//       document.querySelector('body')?.classList.add('sidebar-expanded');
//     } else {
//       document.querySelector('body')?.classList.remove('sidebar-expanded');
//     }
//   }, [sidebarExpanded]);

//   return (
//     <aside
//       ref={sidebar}
//       className={`absolute left-0 top-0 z-999999 border-r border-slate-200 flex h-screen flex-col ${sidebarOpen ? 'overflow-y-hidden' : 'overflow-y-visible'}  bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0 w-65' : '-translate-x-full lg:w-17.5'
//         }`}
//     >
//       {/* <!-- SIDEBAR HEADER  lg:static lg:translate-x-0 --> sidebarOpen ? 'translate-x-0 w-67' : '-translate-x-full lg:-translate-x-1 w-20' */}
//       <div className={`flex items-center justify-center gap-2  ${sidebarOpen ? `px-6 py-4 lg:py-4` : `px-2 py-4`}`}>
//         {sidebarOpen ? (
//           <><img className='font-extrabold font-tourney text-title-sm border-blue-500  h-7 w-7 shadow-stone-900 transform hover:scale-105 duration-300' src="./src/images/original.png" />

//             <img className='font-extrabold font-tourney text-title-sm border-blue-500 h-9 shadow-stone-900 transform hover:scale-105 duration-300' src="./src/images/original2.png" />
//           </>

//           //  <h1 className='font-extrabold font-tourney text-title-sm border-blue-500  shadow-stone-900 transform hover:scale-105 duration-300'>uConnect</h1>
//         ) : (
//           // <IoStatsChart size={25} />
//           <img className='font-extrabold font-tourney text-title-sm border-blue-500  w-7 h-7 shadow-stone-900 transform hover:scale-105 duration-300' src="./src/images/original.png" />

//         )}


//         <button
//           // disabled={window.innerWidth > 400}
//           ref={window.innerWidth > 1024 ? null : trigger}
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           aria-controls="sidebar"
//           aria-expanded={sidebarOpen}
//           className=" bg-blue-500 lg:hidden block "
//         >
//         </button>
//       </div>
//       {/* <!-- SIDEBAR HEADER --> */}

//       <div className={`no-scrollbar flex flex-col ${sidebarOpen ? 'overflow-y-auto' : 'overflow-y-visible'} duration-300 ease-linear`}>
//         {/* <!-- Sidebar Menu --> */}
//         <nav className="mt-1 py-2 px-2 lg:mt-1 ">
//           {/* <!-- Menu Group --> */}
//           <div>
//             <h3 className={`  ${!sidebarOpen && 'hidden'} ${!isKycVerified ? 'text-gray-400 cursor-not-allowed' : ''}  mb-4 ml-2 text-[11px] font-[500]  text-bodydark2`}>
//               MENU
//             </h3>

//            { role === 'admin' && <ul className="mb-6 flex flex-col gap-1.5">
//              <li
//                 className="api group relative flex items-center gap-2.5 rounded-sm font-medium text-bodydark2 duration-300 ease-in-out"
//               >
//                 <NavLink
//                   onClick={window.innerWidth > 1024 ? () => setSidebarOpen(true) : () => setSidebarOpen(false)}
//                   to="/apiCredential"
//                   className={`${!isKycVerified ? ' text-gray-400 pointer-events-none cursor-not-allowed ' : ''} rounded flex items-center duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-meta-4 ${pathname.includes('apiCredential') && 'bg-blue-100 opacity-70 text-blue-400 dark:bg-meta-4'
//                     } ${!sidebarOpen ? 'py-2 px-3.5' : '  px-5 w-full'}`}
//                 >
//                   <GoPasskeyFill className='icon-outline' size={sidebarOpen ? 17 : 20} />
//                   <span className={sidebarOpen && 'p-2'} > {sidebarOpen && 'API Key'}</span>

//                 </NavLink>

//                 {!sidebarOpen && window.innerWidth > 1023 && (
//                   <div className="absolute left-[62px] top-0 hidden group-hover:block w-50 bg-white dark:bg-meta-4 shadow-md rounded-e-md p-2">
//                     <NavLink
//                       onClick={() => setSidebarOpen(true)}
//                       to="/apiCredential"
//                       className={`${!isKycVerified ? 'pointer-events-none cursor-not-allowed ' : ''} block px-4 py-2 text-sm font-normal text-blue-400 hover:text-blue-500 dark:hover:bg-meta-3`}
//                     >
//                       API Key
//                     </NavLink>
//                   </div>
//                 )}
//               </li>


             


//            {sidebarOpen ? (<SidebarLinkGroup
//                 activeCondition={
//                   pathname.includes('archive') || pathname.includes('purchase') || pathname.includes('manage')
//                 }
//               >
//                 {(handleClick, open) => {
//                   return (
//                     <React.Fragment>
//                       <NavLink
//                         to="#"
//                         className={`group relative flex items-center gap-2.5 rounded-sm ${sidebarOpen ? 'px-[20px] py-2' : 'px-[13px] py-1'} font-normal   duration-300 ease-in-out hover:bg-blue-100  hover:text-blue-500 dark:hover:bg-meta-4 ${(pathname.includes('archive') ||
//                           pathname.includes('purchase')
//                           || pathname.includes('manage')) ?
//                           'bg-blue-100 text-blue-400 dark:bg-meta-4' : 'text-bodydark2'
//                           } `}
//                         onClick={(e) => {
//                           e.preventDefault();
//                           sidebarExpanded
//                             ? handleClick()
//                             : setSidebarExpanded(true);
//                         }}

//                       >
//                         <LuMonitor className='icon-outline' size={sidebarOpen ? 17 : 20} />
//                         {sidebarOpen && 'DIDs'}
//                         {sidebarOpen && (
//                           <svg
//                             className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'
//                               }`}
//                             width="20"
//                             height="20"
//                             viewBox="0 0 20 20"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               clipRule="evenodd"
//                               d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
//                               fill=""
//                             />
//                           </svg>
//                         )}

//                       </NavLink>
//                       {/* <!-- Dropdown Menu Start --> */}
//                       <div
//                         className={`translate transform overflow-hidden  ${!open && 'hidden'
//                           }`}
//                       >
//                         <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">

//                           <li>
//                             <NavLink
//                               onClick={window.innerWidth > 1024 ? () => setSidebarOpen(true) : () => setSidebarOpen(false)}
//                               to="/purchase"
//                               className={({ isActive }) =>
//                                 'group relative flex items-center gap-2.5 rounded-md px-1 font-medium text-bodydark2 duration-300 ease-in-out hover:text-blue-500 ' +
//                                 (isActive && '!text-blue-500') + (!isKycVerified ? ' pointer-events-none  cursor-not-allowed text-gray-400' : '')
//                               }
//                             >
//                               <GoDotFill size={8} />

//                               Purchase
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               onClick={window.innerWidth > 1024 ? () => setSidebarOpen(true) : () => setSidebarOpen(false)}
//                               to="/manage"
//                               className={({ isActive }) =>
//                                 'group relative flex items-center gap-2.5 rounded-md px-1 font-medium text-bodydark2 duration-300 ease-in-out hover:text-blue-600 ' +
//                                 (isActive && '!text-blue-500') + (!isKycVerified ? ' pointer-events-none  cursor-not-allowed text-gray-400' : '')
//                               }
//                             >
//                               <GoDotFill size={8} />
//                               Manage
//                             </NavLink>
//                           </li>
//                           {/* <li>
//                             <NavLink
//                               to="/auth/dashboard"
//                               className={({ isActive }) =>
//                                 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-blue-500 ' +
//                                 (isActive && '!text-blue-500')
//                               }
//                             >
//                               eCommerce
//                             </NavLink>
//                           </li> */}
//                           <li>
//                             <NavLink
//                               onClick={window.innerWidth > 1024 ? () => setSidebarOpen(true) : () => setSidebarOpen(false)}
//                               to="/archive"
//                               className={({ isActive }) =>
//                                 'group relative flex items-center gap-2.5 rounded-md px-1 font-medium text-bodydark2 duration-300 ease-in-out hover:text-blue-500 ' +
//                                 (isActive && '!text-blue-500') + (!isKycVerified ? ' pointer-events-none  cursor-not-allowed text-gray-400' : '')
//                               }
//                             >
//                               <GoDotFill size={8} />
//                               Released
//                             </NavLink>
//                           </li>
//                         </ul>
//                       </div>

//                       {/* <!-- Dropdown Menu End --> */}

//                     </React.Fragment>
//                   );
//                 }}
//               </SidebarLinkGroup>) : (<li
//                 className="group relative flex items-center gap-2.5 rounded-sm font-medium text-bodydark2 duration-300 ease-in-out"
//               >
//                 <NavLink

//                   className={`${!isKycVerified
//                     ? 'text-gray-400 pointer-events-none cursor-not-allowed '
//                     : ''
//                     } flex items-center rounded duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-meta-4 ${pathname.includes('purchase') && 'bg-blue-200 opacity-70 text-blue-400 dark:bg-meta-4'} ${pathname.includes('manage') && 'bg-blue-200 opacity-70 text-blue-400 dark:bg-meta-4'} ${pathname.includes('archive') && 'bg-blue-200 opacity-70 text-blue-400 dark:bg-meta-4'
//                     } ${!sidebarOpen ? 'py-2 px-[14.4px] ' : ''}`}
//                 >
//                   <LuMonitor className='icon-outline' size={19} />

//                 </NavLink>

                
//                 {!sidebarOpen && (

//                   <div className="absolute left-[62px] top-0 hidden group-hover:block w-50 bg-white dark:bg-meta-4 shadow-md rounded-e-md  p-2">

//                     <span className='relative flex items-center gap-2.5 rounded-md px-4 font-medium hover:text-blue-600 duration-300 ease-in-out pb-6 text-blue-500' >DIDs</span>

//                     <NavLink
//                       onClick={() => setSidebarOpen(true)}

//                       to="/purchase"
//                       className={({ isActive }) =>
//                         'block px-4 py-2 text-sm font-normal text-blue-400 hover:text-blue-500 dark:hover:bg-meta-3 ' +
//                         (isActive && '!text-blue-500') + (!isKycVerified ? ' pointer-events-none  cursor-not-allowed text-gray-400' : '')
//                       }


//                     >

//                       Purchase
//                     </NavLink>
//                     <NavLink
//                       onClick={() => setSidebarOpen(true)}

//                       to="/manage"
//                       className={({ isActive }) =>
//                         'block px-4 py-2 text-sm font-normal text-blue-400 hover:text-blue-500 dark:hover:bg-meta-3' +
//                         (isActive && '!text-blue-500') + (!isKycVerified ? ' pointer-events-none  cursor-not-allowed text-gray-400' : '')
//                       }
//                     >
//                       Manage
//                     </NavLink>
//                     <NavLink
//                       onClick={() => setSidebarOpen(true)}

//                       to="/archive"
//                       className={({ isActive }) =>
//                         'block px-4 py-2 text-sm font-normal text-blue-400 hover:text-blue-500 dark:hover:bg-meta-3 ' +
//                         (isActive && '!text-blue-500') + (!isKycVerified ? ' pointer-events-none  cursor-not-allowed text-gray-400' : '')
//                       }
//                     >
//                       Released
//                     </NavLink>



//                   </div>
//                 )}
//               </li>)} 

              

            
//               {/* <li>
//                 <NavLink
//                   to="/calendar"
//                   className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-meta-4 ${
//                     pathname.includes('calendar') &&
//                     'bg-blue-100 dark:bg-meta-4'
//                   }`}
//                 >
//                   <svg
//                     className="fill-current"  
//                     width="18"
//                     height="18"
//                     viewBox="0 0 18 18"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M15.7499 2.9812H14.2874V2.36245C14.2874 2.02495 14.0062 1.71558 13.6405 1.71558C13.2749 1.71558 12.9937 1.99683 12.9937 2.36245V2.9812H4.97803V2.36245C4.97803 2.02495 4.69678 1.71558 4.33115 1.71558C3.96553 1.71558 3.68428 1.99683 3.68428 2.36245V2.9812H2.2499C1.29365 2.9812 0.478027 3.7687 0.478027 4.75308V14.5406C0.478027 15.4968 1.26553 16.3125 2.2499 16.3125H15.7499C16.7062 16.3125 17.5218 15.525 17.5218 14.5406V4.72495C17.5218 3.7687 16.7062 2.9812 15.7499 2.9812ZM1.77178 8.21245H4.1624V10.9968H1.77178V8.21245ZM5.42803 8.21245H8.38115V10.9968H5.42803V8.21245ZM8.38115 12.2625V15.0187H5.42803V12.2625H8.38115ZM9.64678 12.2625H12.5999V15.0187H9.64678V12.2625ZM9.64678 10.9968V8.21245H12.5999V10.9968H9.64678ZM13.8374 8.21245H16.228V10.9968H13.8374V8.21245ZM2.2499 4.24683H3.7124V4.83745C3.7124 5.17495 3.99365 5.48433 4.35928 5.48433C4.7249 5.48433 5.00615 5.20308 5.00615 4.83745V4.24683H13.0499V4.83745C13.0499 5.17495 13.3312 5.48433 13.6968 5.48433C14.0624 5.48433 14.3437 5.20308 14.3437 4.83745V4.24683H15.7499C16.0312 4.24683 16.2562 4.47183 16.2562 4.75308V6.94683H1.77178V4.75308C1.77178 4.47183 1.96865 4.24683 2.2499 4.24683ZM1.77178 14.5125V12.2343H4.1624V14.9906H2.2499C1.96865 15.0187 1.77178 14.7937 1.77178 14.5125ZM15.7499 15.0187H13.8374V12.2625H16.228V14.5406C16.2562 14.7937 16.0312 15.0187 15.7499 15.0187Z"
//                       fill=""
//                     />
//                   </svg>
//                   Calendar
//                 </NavLink>
//               </li> */}
//               {/* <!-- Menu Item Calendar --> */}

//               {/* <!-- Menu Item Profile --> */}
//               {/* <li>
//                 <NavLink
//                   to="/profile"
//                   className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-meta-4 ${
//                     pathname.includes('profile') && 'bg-blue-100 dark:bg-meta-4'
//                   }`}
//                 >
//                   <svg
//                     className="fill-current"
//                     width="18"
//                     height="18"
//                     viewBox="0 0 18 18"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
//                       fill=""
//                     />
//                     <path
//                       d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
//                       fill=""
//                     />
//                   </svg>
//                   Profile
//                 </NavLink>
//               </li>
//               */}

//               <li
//                 className="group relative flex items-center gap-2.5 rounded-sm font-medium text-bodydark2 duration-300 ease-in-out"
//               >
//                 <NavLink
//                   onClick={window.innerWidth > 1024 ? () => setSidebarOpen(true) : () => setSidebarOpen(false)}
//                   to="/transaction"
//                   className={`${!isKycVerified
//                     ? 'text-gray-400 pointer-events-none cursor-not-allowed '
//                     : ''
//                     } flex items-center duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-meta-4 rounded ${pathname.includes('transaction') && 'bg-blue-100 opacity-70  text-blue-400 dark:bg-meta-4'
//                     } ${!sidebarOpen ? 'py-2 px-3.5' : ' px-5 w-full'}`}
//                 >
//                   <RiBillLine className='icon-outline' size={sidebarOpen ? 17 : 20} />
//                   <span className={sidebarOpen && 'p-2'}  >    {sidebarOpen && 'Billing'}
//                   </span>
//                 </NavLink>

//                 {/* Dropdown Menu */}
//                 {!sidebarOpen && window.innerWidth > 1023 && (
//                   <div className="absolute left-[62px] top-0 hidden group-hover:block w-50 bg-white dark:bg-meta-4 shadow-md rounded-e-md p-2">
//                     <NavLink
//                       onClick={() => setSidebarOpen(true)}

//                       to="/transaction"
//                       className={`${!isKycVerified ? 'pointer-events-none cursor-not-allowed ' : ''} block px-4 py-2 text-sm font-normal text-blue-400 hover:text-blue-500 dark:hover:bg-meta-3`}
//                     >
//                       Billing
//                     </NavLink>
//                     {/* Add more dropdown items if needed */}
//                   </div>
//                 )}
//               </li>




//               <li
//                 className="group relative flex items-center gap-2.5 rounded-sm font-medium text-bodydark2 duration-300 ease-in-out"
//               >
//                 <NavLink
//                   onClick={window.innerWidth > 1024 ? () => setSidebarOpen(true) : () => setSidebarOpen(false)}
//                   to="/cdrReport"
//                   className={`${!isKycVerified ? 'text-gray-400 pointer-events-none cursor-not-allowed ' : ''} flex items-center duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-meta-4 rounded ${pathname.includes('cdrReport') && 'bg-blue-100 opacity-70  text-blue-400 dark:bg-meta-4'
//                     } ${!sidebarOpen ? 'py-2 px-3.5' : ' px-5 w-full'}`}
//                 >
//                   <LuLineChart className='icon-outline' size={sidebarOpen ? 17 : 20} />
//                   <span className={sidebarOpen && 'p-2'}  >    {sidebarOpen && 'CDRS'}
//                   </span>
//                 </NavLink>

//                 {/* Dropdown Menu */}
//                 {!sidebarOpen && window.innerWidth > 1023 && (

//                   <div className="absolute left-[62px] top-0 hidden group-hover:block w-50 bg-white dark:bg-meta-4 shadow-md rounded-e-md p-2">

//                     <NavLink
//                       onClick={() => setSidebarOpen(true)}

//                       to="/cdrReport"
//                       className={`${!isKycVerified ? 'pointer-events-none cursor-not-allowed ' : ''} block px-4 py-2 text-sm font-normal text-blue-400 hover:text-blue-500 dark:hover:bg-meta-3`}
//                     >
//                       CDRS
//                     </NavLink>

//                     {/* Add more dropdown items if needed */}

//                   </div>
//                 )}
//               </li>


//               <li
//                 className="group relative flex items-center gap-2.5 rounded-sm font-medium text-bodydark2 duration-300 ease-in-out"
//               >
//                 <NavLink
//                   onClick={window.innerWidth > 1024 ? () => setSidebarOpen(true) : () => setSidebarOpen(false)}
//                   to="/User"
//                   className={`${!isKycVerified ? 'text-gray-400 pointer-events-none cursor-not-allowed ' : ''} rounded flex items-center duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-meta-4 ${pathname.includes('User') && 'bg-blue-100 opacity-70  text-blue-400 dark:bg-meta-4'
//                     } ${!sidebarOpen ? 'py-2 px-3.5' : 'px-4.5 w-full'}`}
//                 >
//                   <LuUser className='icon-outline' size={sidebarOpen ? 18 : 20} />
//                   <span className={sidebarOpen && 'p-2'}  >    {sidebarOpen && 'Users'}
//                   </span>
//                 </NavLink>

//                 {!sidebarOpen && window.innerWidth > 1023 && (
//                   <div className="absolute left-[62px] top-0 hidden group-hover:block w-50 bg-white dark:bg-meta-4 shadow-md rounded-e-md p-2">
//                     <NavLink
//                       onClick={() => setSidebarOpen(true)}
//                       to="/User"
//                       className={`${!isKycVerified ? 'pointer-events-none cursor-not-allowed ' : ''} block px-4 py-2 text-sm font-normal text-blue-400 hover:text-blue-500 dark:hover:bg-meta-3`}
//                     >
//                       Users
//                     </NavLink>

//                   </div>
//                 )}
//               </li>


//               <li
//                 className="group relative flex items-center gap-2.5 rounded-sm font-medium text-bodydark2 duration-300 ease-in-out"
//               >
//                 <NavLink
//                   onClick={window.innerWidth > 1024 ? () => setSidebarOpen(true) : () => setSidebarOpen(false)}
//                   to="/ActivityLog"
//                   className={`${!isKycVerified ? 'text-gray-400 pointer-events-none cursor-not-allowed ' : ''} rounded flex items-center duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-meta-4 ${pathname.includes('ActivityLog') && 'bg-blue-100 opacity-70  text-blue-400 dark:bg-meta-4'
//                     } ${!sidebarOpen ? 'py-2 px-3.5' : ' px-4.5 w-full'}`}
//                 >
//                   <LuActivity className='icon-outline' size={sidebarOpen ? 18 : 20} />
//                   <span className={sidebarOpen && 'p-2'} >{sidebarOpen && 'Activity Log'}</span>

//                 </NavLink>

//                 {!sidebarOpen && window.innerWidth > 1023 && (
//                   <div className="absolute left-[62px] top-0 hidden group-hover:block w-50 bg-white dark:bg-meta-4 shadow-md rounded-e-md p-2">
//                     <NavLink

//                       onClick={() => setSidebarOpen(true)}
//                       to="/ActivityLog"
//                       className={`${!isKycVerified ? 'pointer-events-none cursor-not-allowed ' : ''} block px-4 py-2 text-sm font-normal text-blue-400 hover:text-blue-500 dark:hover:bg-meta-3`}
//                     >
//                       Activity Log
//                     </NavLink>
//                   </div>
//                 )}
//               </li>

//               {sidebarOpen ? (
//                 <SidebarLinkGroup
//                 activeCondition={
//                   pathname.includes('campaign') || pathname.includes('vblist') || pathname.includes('audiorecordings')
//                 }
//               >
//                 {(handleClick, open) => {
//                   return (
//                     <React.Fragment>
//                       <NavLink
//                         to="#"
//                         className={`group relative flex items-center gap-2.5 rounded-sm ${sidebarOpen ? 'px-[17px] py-2' : 'px-[13px] py-1'} font-normal   duration-300 ease-in-out hover:bg-blue-100  hover:text-blue-500 dark:hover:bg-meta-4 ${(pathname.includes('campaign') ||
//                           pathname.includes('vblist')
//                           || pathname.includes('audiorecordings')) ?
//                           'bg-blue-100 text-blue-400 dark:bg-meta-4' : 'text-bodydark2'
//                           } `}
//                         onClick={(e) => {
//                           e.preventDefault();
//                           sidebarExpanded
//                             ? handleClick()
//                             : setSidebarExpanded(true);
//                         }}

//                       >
//                         <HiOutlineSpeakerphone className='icon-outline' size={sidebarOpen ? 20 : 22} />
//                         {sidebarOpen && 'Voice Blast'}
//                         {sidebarOpen && (
//                           <svg
//                             className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'
//                               }`}
//                             width="20"
//                             height="20"
//                             viewBox="0 0 20 20"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               clipRule="evenodd"
//                               d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
//                               fill=""
//                             />
//                           </svg>
//                         )}

//                       </NavLink>
//                       {/* <!-- Dropdown Menu Start --> */}
//                       <div
//                         className={`translate transform overflow-hidden  ${!open && 'hidden'
//                           }`}
//                       >
//                         <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">

//                           <li>
//                             <NavLink
//                               onClick={ window.innerWidth > 1024 ? () => setSidebarOpen(true) :  () => setSidebarOpen(false)}
//                               to="/campaign"
//                               className={({ isActive }) =>
//                                 'group relative flex items-center gap-2.5 rounded-md px-1 font-medium text-bodydark2 duration-300 ease-in-out hover:text-blue-500 ' +
//                                 (isActive && '!text-blue-500') + (!isKycVerified ? ' pointer-events-none  cursor-not-allowed text-gray-400' : '') 
//                               }


//                             >
//                               <GoDotFill size={8} />

//                               Campaign
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                             onClick={ window.innerWidth > 1024 ? () => setSidebarOpen(true) :  () => setSidebarOpen(false)}
//                               to="/vblist"
//                               className={({ isActive }) =>
//                                 'group relative flex items-center gap-2.5 rounded-md px-1 font-medium text-bodydark2 duration-300 ease-in-out hover:text-blue-600 ' +
//                                 (isActive && '!text-blue-500') + (!isKycVerified ? ' pointer-events-none  cursor-not-allowed text-gray-400' : '')
//                               }
//                             >
//                                <GoDotFill size={8} />
//                               V.B List
//                             </NavLink>
//                           </li>
//                           {/* <li>
//                             <NavLink
//                               to="/auth/dashboard"
//                               className={({ isActive }) =>
//                                 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-blue-500 ' +
//                                 (isActive && '!text-blue-500')
//                               }
//                             >
//                               eCommerce
//                             </NavLink>
//                           </li> */}
//                           <li>
//                             <NavLink
//                             onClick={ window.innerWidth > 1024 ? () => setSidebarOpen(true) :  () => setSidebarOpen(false)}
//                               to="/audiorecordings"
//                               className={({ isActive }) =>
//                                 'group relative flex items-center gap-2.5 rounded-md px-1 font-medium text-bodydark2 duration-300 ease-in-out hover:text-blue-500 ' +
//                                 (isActive && '!text-blue-500') + (!isKycVerified ? ' pointer-events-none  cursor-not-allowed text-gray-400' : '')
//                               }
//                             >
//                                <GoDotFill size={8} />
//                               Audio Recordings
//                             </NavLink>
//                           </li>
//                         </ul>
//                       </div>

//                       {/* <!-- Dropdown Menu End --> */}

//                     </React.Fragment>
//                   );
//                 }}
//               </SidebarLinkGroup>) : (<li
//                 className="group relative flex items-center gap-2.5 rounded-sm font-medium text-bodydark2 duration-300 ease-in-out"
//               >
//                 <NavLink

//                   className={`${!isKycVerified
//                     ? 'text-gray-400 pointer-events-none cursor-not-allowed '
//                     : ''
//                     } flex items-center rounded duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-meta-4 ${pathname.includes('campaign') && 'bg-blue-100 opacity-70 text-blue-400 dark:bg-meta-4'} ${pathname.includes('vblist') && 'bg-blue-100 opacity-70 text-blue-400 dark:bg-meta-4'} ${ pathname.includes('audiorecordings') && 'bg-blue-200 opacity-70 text-blue-400 dark:bg-meta-4'
//                     } ${!sidebarOpen ? 'py-2 px-[14.4px] ' : ''}`}
//                 >
//                   <HiOutlineSpeakerphone className='icon-outline' size={22} />

//                 </NavLink>

//                 {/* Dropdown Menu */}
//                 {!sidebarOpen && (

//                   <div className="absolute left-[62px] top-0 hidden group-hover:block w-50 bg-white dark:bg-meta-4 shadow-md rounded-e-md  p-2">

//                     <span className='relative flex items-center gap-2.5 rounded-md px-4 font-medium hover:text-blue-600 duration-300 ease-in-out pb-6 text-blue-500' >Voice Blast</span>

//                     <NavLink
//                         onClick={() => setSidebarOpen(true)}

//                       to="/campaign"
//                       className={({ isActive }) =>
//                         'block px-4 py-2 text-sm font-normal text-blue-400 hover:text-blue-500 dark:hover:bg-meta-3 ' +
//                         (isActive && '!text-blue-500') + (!isKycVerified ? ' pointer-events-none  cursor-not-allowed text-gray-400' : '')
//                       }
//                     >                      
//                       Campaign
//                     </NavLink>
//                     <NavLink
//                         onClick={() => setSidebarOpen(true)}

//                       to="/vblist"
//                       className={({ isActive }) =>
//                         'block px-4 py-2 text-sm font-normal text-blue-400 hover:text-blue-500 dark:hover:bg-meta-3' +
//                         (isActive && '!text-blue-500') + (!isKycVerified ? ' pointer-events-none  cursor-not-allowed text-gray-400' : '') 
//                       }
//                     >
//                       V.B List
//                     </NavLink>
//                     <NavLink
//                         onClick={() => setSidebarOpen(true)}

//                       to="/audiorecordings"
//                       className={({ isActive }) =>
//                         'block px-4 py-2 text-sm font-normal text-blue-400 hover:text-blue-500 dark:hover:bg-meta-3 ' +
//                         (isActive && '!text-blue-500') + (!isKycVerified ? ' pointer-events-none  cursor-not-allowed text-gray-400' : '')
//                       }
//                     >
//                       Audio Recordings
//                     </NavLink>
                   



//                   </div>
//                 )}
//               </li>)}
           

//             </ul>}
//             {
//               role === 'agent' &&  
//               <ul className="mb-6 flex flex-col gap-1.5">
//               <li
//                 className="group relative flex items-center gap-2.5 rounded-sm font-medium text-bodydark2 duration-300 ease-in-out"
//               >
//                 <NavLink
//                   onClick={window.innerWidth > 1024 ? () => setSidebarOpen(true) : () => setSidebarOpen(false)}
//                   to="/calls"
//                   className={`${!isKycVerified ? 'text-gray-400 pointer-events-none cursor-not-allowed ' : ''} rounded flex items-center duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-meta-4 ${pathname.includes('calls') && 'bg-blue-100 bg-opacity-50  text-blue-500 dark:bg-meta-4'
//                     } ${!sidebarOpen ? 'py-2 px-3.5' : ' px-4.5 w-full'}`}
//                 >
//                   <LuPhoneCall className='icon-outline' size={sidebarOpen ? 18 : 20} />
//                   <span className={sidebarOpen && 'p-2'} >{sidebarOpen && 'Calls'}</span>

//                 </NavLink>

//                 {!sidebarOpen && window.innerWidth > 1023 && (
//                   <div className="absolute left-[62px] top-0 hidden group-hover:block w-50 bg-white dark:bg-meta-4 shadow-md rounded-e-md p-2">
//                     <NavLink

//                       onClick={() => setSidebarOpen(true)}
//                       to="/calls"
//                       className={`${!isKycVerified ? 'pointer-events-none cursor-not-allowed ' : ''} block px-4 py-2 text-sm font-normal text-blue-400 hover:text-blue-500 dark:hover:bg-meta-3`}
//                     >
//                       Calls
//                     </NavLink>
//                   </div>
//                 )}
//               </li>
//                 </ul>
//             }
//           </div>

//           {/* <!-- Others Group --> */}
//           <div>
//             {/* <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
//               OTHERS
//             </h3> */}

//             <ul className="mb-6 flex flex-col gap-1.5">

//             </ul>
//           </div>
//         </nav>
//         {/* <!-- Sidebar Menu --> */}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
// components/Sidebar/index.jsx
// components/Sidebar/index.jsx
import React, { useEffect, useRef, useState } from 'react';
import { NavLink as RouterNavLink, useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Home, Settings, User, Zap, LogOut, HelpCircle, Menu, X } from "lucide-react";

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

  // State for user data
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    photo: ''
  });

  // Get stored sidebar state from localStorage
  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // Calculate if sidebar should show text (expanded or open)
  const showText = sidebarOpen || sidebarExpanded;

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = () => {
      try {
        // Get user data from localStorage
        const storedEmail = localStorage.getItem('user_email');
        const storedName = localStorage.getItem('user_name');
        const storedPhoto = localStorage.getItem('user_photo');
        
        if (storedEmail) {
          setUserData({
            name: storedName || storedEmail.split('@')[0] || 'User',
            email: storedEmail,
            photo: storedPhoto || `https://ui-avatars.com/api/?name=${storedEmail.split('@')[0]}&background=blue&color=fff`
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    
    // Listen for storage changes (if user updates profile)
    const handleStorageChange = () => {
      fetchUserData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [navigate]);

  // close on click outside (mobile only)
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

  // close if the esc key is pressed (mobile only)
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen]);

  // Save sidebar expanded state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  // Handle logout
  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_photo');
    localStorage.removeItem('auth_token');
    
    // Navigate to login
    navigate('/signin');
  };

  return (
    <aside
      ref={sidebar}
      className={cn(
        "fixed left-0 top-0 z-999999 border-r border-slate-200 flex h-screen flex-col overflow-y-auto bg-white duration-300 ease-linear dark:bg-slate-900 lg:static",
        sidebarOpen ? 'translate-x-0 w-60' : '-translate-x-full lg:translate-x-0',
        showText ? 'lg:w-60' : 'lg:w-20'
      )}
    >
      {/* Sidebar Header */}
      <div className={cn(
        "flex items-center justify-between border-b border-slate-200 dark:border-slate-800",
        showText ? 'px-6 py-4' : 'px-3 py-4'
      )}>
        {showText ? (
          <div className="flex items-center gap-3">
            <img 
              src="/src/assets/images/logo-light.png" 
              alt="Digi Card Logo" 
              className="w-12 h-12 object-contain"
            />
            <span className="text-xl font-bold text-slate-800 dark:text-white">Digi Card</span>
          </div>
        ) : (
          <img 
            src="/src/assets/images/logo-light.png" 
            alt="Digi Card Logo" 
            className="w-10 h-10 object-contain mx-auto"
          />
        )}
        
        {/* Mobile menu button */}
        <button
          ref={window.innerWidth > 1024 ? null : trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white lg:hidden"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear flex-1">
        <nav className="mt-5 py-4 px-4 lg:mt-5">
          {/* Main Navigation */}
          <ul className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <li key={item.title} className="group relative flex items-center gap-2.5 rounded-sm font-medium text-slate-600 dark:text-slate-300 duration-300 ease-in-out">
                <NavLink
                  to={item.url}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                  className={cn(
                    "flex items-center rounded-lg duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-slate-800 dark:hover:text-blue-400",
                    pathname === item.url && "bg-blue-100 text-blue-500 dark:bg-slate-800 dark:text-blue-400",
                    showText ? "px-4 py-3 w-full" : "py-2 px-3.5 justify-center"
                  )}
                >
                  <item.icon className={showText ? "w-5 h-5" : "w-6 h-6"} />
                  {showText && <span className="ml-3">{item.title}</span>}
                </NavLink>

                {/* Hover tooltip for collapsed state */}
                {!showText && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-slate-900 dark:bg-slate-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                    {item.title}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Spacer to push bottom items down */}
        <div className="flex-1"></div>

        {/* Bottom Section (Help & Support, Log Out) */}
        <div className="px-4 pb-4">
          <ul className="flex flex-col gap-1.5">
            {bottomItems.map((item) => (
              <li key={item.title} className="group relative flex items-center gap-2.5 rounded-sm font-medium text-slate-600 dark:text-slate-300 duration-300 ease-in-out">
                <NavLink
                  to={item.url}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                  className={cn(
                    "flex items-center rounded-lg duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-slate-800 dark:hover:text-blue-400",
                    pathname === item.url && "bg-blue-100 text-blue-500 dark:bg-slate-800 dark:text-blue-400",
                    showText ? "px-4 py-3 w-full" : "py-2 px-3.5 justify-center"
                  )}
                >
                  <item.icon className={showText ? "w-5 h-5" : "w-6 h-6"} />
                  {showText && <span className="ml-3">{item.title}</span>}
                </NavLink>

                {/* Hover tooltip for collapsed state */}
                {!showText && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-slate-900 dark:bg-slate-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                    {item.title}
                  </div>
                )}
              </li>
            ))}

            {/* Log Out Button */}
            <li className="group relative flex items-center gap-2.5 rounded-sm font-medium text-slate-600 dark:text-slate-300 duration-300 ease-in-out">
              {/* <button
                onClick={handleLogout}
                className={cn(
                  "flex items-center rounded-lg duration-300 ease-in-out hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400 w-full",
                  showText ? "px-4 py-3" : "py-2 px-3.5 justify-center"
                )}
              >
                <LogOut className={showText ? "w-5 h-5" : "w-6 h-6"} />
                {showText && <span className="ml-3">Log Out</span>}
              </button> */}

              {/* Hover tooltip for collapsed state */}
              {/* {!showText && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-slate-900 dark:bg-slate-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                  Log Out
                </div>
              )} */}
            </li>
          </ul>

          {/* User Profile Section */}
          <div className="mt-6 p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              {/* User Profile Picture */}
              {/* <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-blue-100 dark:border-blue-900">
                {userData.photo ? (
                  <img 
                    src={userData.photo} 
                    alt={userData.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${userData.name}&background=blue&color=fff`;
                    }}
                  />
                ) : (
                  <span className="text-sm font-semibold text-white">
                    {userData.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
              </div> */}
              
              {/* User Info (only shows when sidebar is expanded) */}
              {/* {showText && userData.email && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                    {userData.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {userData.email}
                  </p>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;