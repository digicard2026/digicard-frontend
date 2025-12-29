// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaEdit, FaEye, FaShareAlt, FaCalendarAlt, FaEnvelope, FaPlus, FaSearch, FaUser, FaBuilding, FaPhone, FaGlobe, FaArrowRight } from "react-icons/fa";
// import { CARD_URL } from "../../../src/utility/constants";

// const Card_Dashboard = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { userEmail: locationEmail, userData } = location.state || {};
  
//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [error, setError] = useState("");

//   // ✅ GET EMAIL FROM MULTIPLE SOURCES
//   const getUserEmail = () => {
//     // 1. From location state (when navigating from signup)
//     if (locationEmail) return locationEmail;
    
//     // 2. From localStorage (when user logs in)
//     const storedEmail = localStorage.getItem('user_email');
//     if (storedEmail) return storedEmail;
    
//     // 3. From user data in location
//     if (userData?.email) return userData.email;
    
//     return null;
//   };

//   const userEmail = getUserEmail();

//   // ✅ UPDATED: Fetch ALL user's cards by email
//   useEffect(() => {
//     const fetchUserCards = async () => {
//       const emailToFetch = getUserEmail();
      
//       if (!emailToFetch) {
//         setError("No user email found. Please login again.");
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         setError("");
        
//         console.log(`📧 Fetching ALL cards for email: ${emailToFetch}`);
//         console.log(`🔗 API URL: ${CARD_URL}/email/${encodeURIComponent(emailToFetch)}`);
        
//         const response = await fetch(`${CARD_URL}/email/${encodeURIComponent(emailToFetch)}`);
        
//         console.log('🔍 Response status:', response.status);
        
//         if (response.ok) {
//           const data = await response.json();
//           console.log('✅ API Response:', data);
          
//           // ✅ UPDATED: Handle the new response format with cards array
//           let cardsArray = [];
          
//           if (data.cards && Array.isArray(data.cards)) {
//             // Case: { success: true, cards: [...] }
//             cardsArray = data.cards;
//             console.log('📦 Case 1: cards array in response');
//           } else if (Array.isArray(data)) {
//             // Case: Direct array response
//             cardsArray = data;
//             console.log('📦 Case 2: direct array response');
//           } else if (data.data && Array.isArray(data.data)) {
//             // Case: { data: [...] }
//             cardsArray = data.data;
//             console.log('📦 Case 3: data array in response');
//           } else if (data.card) {
//             // Case: Single card (backward compatibility)
//             cardsArray = [data.card];
//             console.log('📦 Case 4: single card object');
//           } else {
//             // No cards found
//             cardsArray = [];
//             console.log('📦 Case 5: no cards found');
//           }
          
//           console.log('🃏 Final cards array:', cardsArray);
//           setCards(cardsArray);
          
//         } else if (response.status === 404) {
//           // No cards found for this email - this is normal for new users
//           console.log('ℹ️ No cards found for this email');
//           setCards([]);
//         } else {
//           const errorText = await response.text();
//           console.error('❌ API Error:', errorText);
//           throw new Error(`Failed to fetch cards: ${response.status}`);
//         }
//       } catch (error) {
//         console.error('🔥 Error fetching cards:', error);
//         setError("Failed to load your cards. Please try refreshing the page.");
//         setCards([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserCards();
//   }, [userEmail]);

//   // Handle edit card
//   const handleEditClick = (card) => {
//     console.log('Editing card:', card);
//     navigate('/create', { 
//       state: { 
//         userEmail: userEmail,
//         card: card 
//       }
//     });
//   };

//   // Handle view card
//   const handleViewClick = (card) => {
//     if (card.urlSlug) {
//       window.open(`/preview/${card.urlSlug}`, '_blank');
//     } else {
//       alert('This card does not have a shareable URL yet. Please edit and save the card first.');
//     }
//   };

//   // Handle share card
//   const handleShareClick = (card) => {
//     if (card.urlSlug) {
//       const shareUrl = `${window.location.origin}/preview/${card.urlSlug}`;
//       navigator.clipboard.writeText(shareUrl);
//       alert('Shareable URL copied to clipboard!');
//     } else {
//       alert('This card is not published yet. Please edit and save the card first.');
//     }
//   };

//   // Handle create new card
//   const handleCreateNew = () => {
//     const selectedPlan = localStorage.getItem('selected_plan');
    
//     console.log('Creating new card with:', {
//       userEmail: userEmail,
//       selectedPlan: selectedPlan
//     });

//     navigate('/create', { 
//       state: { 
//         userEmail: userEmail,
//         selectedPlan: selectedPlan
//       }
//     });
//   };

//   // Filter cards based on search
//   const filteredCards = cards.filter(card =>
//     card.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     card.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     card.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     card.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     card.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // ✅ SHOW EMAIL NOT FOUND ERROR
//   if (!userEmail && !loading) {
//     return (
//       <div className="min-h-screen bg-[#eef3f9] flex items-center justify-center">
//         <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FaUser className="w-8 h-8 text-red-500" />
//           </div>
//           <h2 className="text-xl font-bold text-gray-800 mb-2">User Not Found</h2>
//           <p className="text-gray-600 mb-4">Unable to identify user. Please login again.</p>
//           <button
//             onClick={() => navigate('/signin/franchise')}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#eef3f9] flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <div className="text-xl text-gray-600">Loading your cards...</div>
//           <p className="text-sm text-gray-500 mt-2">for {userEmail}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#eef3f9] py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <div className="text-center md:text-left">
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">
//               My Digital Business Cards
//             </h1>
//             <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
//               <FaUser className="text-blue-500" />
//               Welcome! Managing cards for: <span className="font-semibold text-blue-600">{userEmail}</span>
//             </p>
//             {cards.length > 0 && (
//               <p className="text-sm text-gray-500 mt-1">
//                 {cards.length} card{cards.length !== 1 ? 's' : ''} found
//               </p>
//             )}
//           </div>
          
//           <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
//             {/* Search Bar - Only show if there are cards */}
//             {cards.length > 0 && (
//               <div className="relative">
//                 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search cards..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
//                 />
//               </div>
//             )}
            
//             {/* Create New Card Button */}
//             <button
//               onClick={handleCreateNew}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
//             >
//               <FaPlus />
//               Create New Card
//             </button>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//             <p className="text-red-700">{error}</p>
//           </div>
//         )}

//         {/* Debug Info - Remove in production */}
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-sm">
//           <p><strong>Debug Info:</strong> Email: {userEmail} | Cards Found: {cards.length}</p>
//         </div>

//         {/* Cards Grid */}
//         {filteredCards.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-lg">
//               <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FaEnvelope className="w-8 h-8 text-blue-500" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                 {cards.length === 0 ? "No Cards Found" : "No Matching Cards"}
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 {cards.length === 0 
//                   ? `You haven't created any digital business cards with ${userEmail}. Create your first card to get started!`
//                   : "No cards match your search criteria."
//                 }
//               </p>
//               <button
//                 onClick={handleCreateNew}
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2 mx-auto"
//               >
//                 <FaPlus />
//                 Create Your First Card
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredCards.map((card) => (
//               <CardItem 
//                 key={card._id} 
//                 card={card} 
//                 onEdit={handleEditClick}
//                 onView={handleViewClick}
//                 onShare={handleShareClick}
//                 userEmail={userEmail}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Individual Card Component (Keep this same as before)
// const CardItem = ({ card, onEdit, onView, onShare, userEmail }) => {
//   const displayName = `${card.firstName || ''} ${card.lastName || ''}`.trim() || 'Unnamed Card';
//   const displayEmail = card.email || userEmail || 'No email';
//   const profilePhoto = card.profilePhoto || "https://cdn-icons-png.flaticon.com/512/9131/9131529.png";
//   const companyLogo = card.companyLogo || null;
  
//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'Unknown date';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       day: 'numeric', 
//       month: 'short', 
//       year: 'numeric' 
//     });
//   };

//   // Get card type display name
//   const getCardTypeDisplay = (cardType) => {
//     const typeMap = {
//       'business': 'Business',
//       'business-premium': 'BusinessPremium',
//       'business-pro': 'Business Professional'
//     };
//     return typeMap[cardType] || cardType || 'Business';
//   };

//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
//       {/* Card Header with Profile and Company */}
//       <div className="flex flex-col items-center -mt-14 mb-4">
//         <div className="relative">
//           <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-1 shadow-lg">
//             <img
//               src={profilePhoto}
//               alt="profile"
//               className="w-20 h-20 rounded-full object-cover border-4 border-white"
//             />
//           </div>
//           {companyLogo && (
//             <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
//               <img
//                 src={companyLogo}
//                 alt="company logo"
//                 className="w-8 h-8 rounded-full object-cover"
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Card main info */}
//       <div className="text-center mb-4">
//         <h2 className="text-xl font-bold text-gray-800 mb-1">{displayName}</h2>
        
//         {card.jobTitle && (
//           <p className="text-sm text-blue-600 font-medium mb-2">{card.jobTitle}</p>
//         )}
        
//         <p className="text-sm text-gray-500 mb-2 flex items-center justify-center gap-2">
//           <FaEnvelope className="text-gray-400" />
//           {displayEmail}
//         </p>

//         {card.companyName && (
//           <p className="text-sm text-gray-700 mb-2 flex items-center justify-center gap-2">
//             <FaBuilding className="text-gray-400" />
//             {card.companyName}
//           </p>
//         )}

//         {/* Card Type Badge */}
//         <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 
//           bg-blue-100 text-blue-800 border border-blue-200">
//           {getCardTypeDisplay(card.cardType)}
//         </div>

//         {/* Status and Date */}
//         <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
//           <div className="flex items-center gap-1">
//             <span className={`w-2 h-2 rounded-full ${
//               card.isPublic ? 'bg-green-500' : 'bg-yellow-500'
//             }`}></span>
//             {card.isPublic ? 'Published' : 'Draft'}
//           </div>
          
//           <div className="flex items-center gap-1">
//             <FaCalendarAlt className="text-gray-400" />
//             {formatDate(card.updatedAt || card.createdAt)}
//           </div>
//         </div>

//         {/* Quick Stats */}
//         {(card.phones?.length > 0 || card.websites?.length > 0) && (
//           <div className="flex justify-center gap-4 mt-3 text-xs text-gray-500">
//             {card.phones?.length > 0 && (
//               <div className="flex items-center gap-1">
//                 <FaPhone className="text-gray-400" />
//                 {card.phones.length} phone{card.phones.length !== 1 ? 's' : ''}
//               </div>
//             )}
//             {card.websites?.length > 0 && (
//               <div className="flex items-center gap-1">
//                 <FaGlobe className="text-gray-400" />
//                 {card.websites.length} website{card.websites.length !== 1 ? 's' : ''}
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Action Buttons */}
//       <div className="flex border-t border-gray-200 pt-4">
//         <button 
//           onClick={() => onEdit(card)}
//           className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-l-lg transition-colors font-medium text-sm"
//           title="Edit this card - Email will be auto-filled"
//         >
//           <FaEdit />
//           Edit
//         </button>
        
//         <button 
//           onClick={() => onView(card)}
//           className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors font-medium text-sm"
//         >
//           <FaEye />
//           Preview
//         </button>
        
//         <button 
//           onClick={() => onShare(card)}
//           className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-r-lg transition-colors font-medium text-sm"
//         >
//           <FaShareAlt />
//           Share
//         </button>
//       </div>

//       {/* URL Slug Display */}
//       {card.urlSlug && (
//         <div className="mt-3 p-2 bg-gray-50 rounded-lg">
//           <p className="text-xs text-gray-500 text-center">
//             URL: <span className="font-mono text-gray-700">/preview/{card.urlSlug}</span>
//           </p>
//         </div>
//       )}

//       {/* Edit Instruction */}
//       <div className="mt-2 text-center">
//         <p className="text-xs text-blue-600 flex items-center justify-center gap-1">
//           <FaArrowRight className="w-3 h-3" />
//           Click "Edit" to modify this card
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Card_Dashboard;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEdit, FaEye, FaShareAlt, FaCalendarAlt, FaEnvelope, FaPlus, FaSearch, FaUser, FaBuilding, FaPhone, FaGlobe, FaArrowRight, FaCreditCard, FaChartLine, FaUsers, FaQrcode, FaEllipsisV, FaCheck, FaExclamationTriangle, FaLock } from "react-icons/fa";
import { CARD_URL } from "../../../src/utility/constants";

const Card_Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userEmail: locationEmail, userData } = location.state || {};

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [stats, setStats] = useState({
    totalCards: 0,
    totalViews: 0,
    totalShares: 0,
    newContents: 0
  });

  // Check if subscription is expired
  const isSubscriptionExpired = subscriptionData?.status === "expired" || subscriptionData?.daysLeft <= 0;

  // ✅ GET AUTH TOKEN
  // const getAuthToken = () => {
  //   return localStorage.getItem('auth_token') || 
  //          localStorage.getItem('token') || 
  //          localStorage.getItem('accessToken') ||
  //          sessionStorage.getItem('auth_token');
  // };

  const getAuthToken = () => {
  // 1️⃣ Try to get token from cookies (non-httpOnly only)
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  };

  return (
    getCookie('auth_token') ||
    getCookie('token') ||
    getCookie('accessToken') ||

    // 2️⃣ Fallbacks (won’t break existing code)
    localStorage.getItem('auth_token') ||
    localStorage.getItem('token') ||
    localStorage.getItem('accessToken') ||
    sessionStorage.getItem('auth_token')
  );
};


  // ✅ GET EMAIL FROM MULTIPLE SOURCES
  const getUserEmail = () => {
    // 1. From location state (when navigating from signup)
    if (locationEmail) return locationEmail;
   
    // 2. From localStorage (when user logs in)
    const storedEmail = localStorage.getItem('user_email');
    if (storedEmail) return storedEmail;
   
    // 3. From user data in location
    if (userData?.email) return userData.email;
   
    return null;
  };

  const userEmail = getUserEmail();
  const authToken = getAuthToken();

  // ✅ Fetch subscription status WITH CREDENTIALS and auth token
  const fetchSubscriptionStatus = async () => {
    try {
      // Prepare headers
      const headers = {
        'Content-Type': 'application/json',
      };

      // Add authorization header if token exists
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      // Try with credentials first (session-based auth)
      let response = await fetch('http://localhost:3000/api/v1/check/status', {
        method: 'GET',
        credentials: 'include', // Include cookies
        headers: headers,
      });
      
      // If 401 Unauthorized, try without credentials but with token
      if (response.status === 401 && authToken) {
        console.log('Session expired, trying with token only...');
        response = await fetch('http://localhost:3000/api/v1/check/status', {
          method: 'GET',
          headers: headers, // Token only, no credentials
        });
      }
      
      const data = await response.json();
      
      if (data.success) {
        setSubscriptionData(data.data);
        
        // Show modal if subscription is expired
        if (data.data.status === "expired" || data.data.daysLeft <= 0) {
          setShowSubscriptionModal(true);
        }
      } else if (response.status === 401) {
        console.warn('Authentication required for subscription check');
        // If auth fails, assume trial hasn't started or user needs to login
        // You can set a default subscription state here
        setSubscriptionData({
          hasSubscription: false,
          status: "inactive",
          daysLeft: 0,
          startDate: null,
          endDate: null
        });
      } else {
        console.warn('Subscription API returned success: false', data);
      }
    } catch (error) {
      console.error('Error fetching subscription status:', error);
      // Set default subscription data on error
      setSubscriptionData({
        hasSubscription: false,
        status: "error",
        daysLeft: 0,
        startDate: null,
        endDate: null
      });
    }
  };

  // ✅ UPDATED: Fetch ALL user's cards by email
  useEffect(() => {
    const fetchUserData = async () => {
      const emailToFetch = getUserEmail();
     
      if (!emailToFetch) {
        setError("No user email found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
       
        // Fetch subscription status
        await fetchSubscriptionStatus();
       
        // Fetch user cards
        const headers = {
          'Content-Type': 'application/json',
        };

        // Add authorization header if token exists
        if (authToken) {
          headers['Authorization'] = `Bearer ${authToken}`;
        }

        const response = await fetch(`${CARD_URL}/email/${encodeURIComponent(emailToFetch)}`, {
          method: 'GET',
          headers: headers,
        });
       
        if (response.ok) {
          const data = await response.json();
         
          let cardsArray = [];
         
          if (data.cards && Array.isArray(data.cards)) {
            cardsArray = data.cards;
          } else if (Array.isArray(data)) {
            cardsArray = data;
          } else if (data.data && Array.isArray(data.data)) {
            cardsArray = data.data;
          } else if (data.card) {
            cardsArray = [data.card];
          } else {
            cardsArray = [];
          }
         
          setCards(cardsArray);
         
          // Calculate stats based on cards
          const totalViews = cardsArray.reduce((sum, card) => sum + (card.views || 0), 0);
          const totalShares = cardsArray.reduce((sum, card) => sum + (card.shares || 0), 0);
         
          setStats({
            totalCards: cardsArray.length,
            totalViews,
            totalShares,
            newContents: Math.floor(totalViews * 0.05)
          });
         
        } else if (response.status === 404) {
          console.log('ℹ️ No cards found for this email');
          setCards([]);
        } else if (response.status === 401) {
          setError("Session expired. Please login again.");
          // Optionally redirect to login
          // navigate('/signin/franchise');
        } else {
          const errorText = await response.text();
          throw new Error(`Failed to fetch cards: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
        setError("Failed to load your cards. Please try refreshing the page.");
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userEmail, authToken]);

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

  // Calculate remaining days with countdown
  const getRemainingDays = () => {
    if (!subscriptionData?.endDate) return 0;
    
    const endDate = new Date(subscriptionData.endDate);
    const now = new Date();
    const diffTime = endDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };

  // Handle edit card
  const handleEditClick = (card) => {
    // Check if subscription is active before allowing edit
    if (isSubscriptionExpired) {
      setShowSubscriptionModal(true);
      return;
    }
    
    navigate('/create', {
      state: {
        userEmail: userEmail,
        card: card,
        authToken: authToken
      }
    });
  };

  // Handle view card
  const handleViewClick = (card) => {
    if (card.urlSlug) {
      window.open(`/preview/${card.urlSlug}`, '_blank');
    } else {
      alert('This card does not have a shareable URL yet. Please edit and save the card first.');
    }
  };

  // Handle share card
  const handleShareClick = (card) => {
    if (card.urlSlug) {
      const shareUrl = `${window.location.origin}/preview/${card.urlSlug}`;
      navigator.clipboard.writeText(shareUrl);
      alert('Shareable URL copied to clipboard!');
    } else {
      alert('This card is not published yet. Please edit and save the card first.');
    }
  };

  // Handle create new card
  const handleCreateNew = () => {
    // Check if subscription is active before allowing creation
    if (isSubscriptionExpired) {
      setShowSubscriptionModal(true);
      return;
    }
    
    const selectedPlan = localStorage.getItem('selected_plan');
   
    navigate('/create', {
      state: {
        userEmail: userEmail,
        selectedPlan: selectedPlan,
        authToken: authToken
      }
    });
  };

  // Filter cards based on search
  const filteredCards = cards.filter(card =>
    card.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle subscription renewal
  const handleRenewSubscription = () => {
    setShowSubscriptionModal(false);
    navigate("/pricing", {
      state: {
        userEmail: userEmail,
        authToken: authToken
      }
    });
  };

  // Handle login redirect
  const handleLoginRedirect = () => {
    // Clear any existing auth data
    localStorage.removeItem('auth_token');
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('auth_token');
    
    navigate('/signin');
  };

  // ✅ SHOW AUTH ERROR
  if (!authToken && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaLock className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to access this page.</p>
          <button
            onClick={handleLoginRedirect}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors font-medium"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-xl text-gray-700 font-medium">Loading your dashboard...</div>
          <p className="text-gray-500 mt-2">for {userEmail || 'User'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Subscription Expiry Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FaLock className="w-6 h-6 text-red-500" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
                Access Restricted
              </h3>
              
              <p className="text-gray-600 text-center mb-6">
                {subscriptionData?.status === "expired" 
                  ? "Your free trial has ended. Your card management features are now locked."
                  : "Your subscription is not active. Please upgrade to access card management features."
                }
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">
                    {subscriptionData?.status === "expired" ? "Trial Ended" : "Access Locked"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {subscriptionData?.endDate 
                      ? `Ended on ${formatDate(subscriptionData.endDate)}` 
                      : 'No active subscription'
                    }
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSubscriptionModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Dismiss
                </button>
                <button
                  onClick={handleRenewSubscription}
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Upgrade to Unlock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="p-4 sm:p-6 lg:p-8">
        {/* Subscription Status Banner */}
        {subscriptionData && (
          <div className="mb-6">
            <SubscriptionBanner 
              data={subscriptionData}
              remainingDays={getRemainingDays()}
              onUpgrade={() => navigate("/pricing", { 
                state: { userEmail, authToken }
              })}
            />
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Cards"
            value={stats.totalCards}
            change="+0% from last month"
            icon={<FaCreditCard className="w-5 h-5" />}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
         
          <StatCard
            title="Total Views"
            value={stats.totalViews.toLocaleString()}
            change="+0% from last month"
            icon={<FaEye className="w-5 h-5" />}
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />
         
          <StatCard
            title="Total Shares"
            value={stats.totalShares}
            change="+0% from last month"
            icon={<FaShareAlt className="w-5 h-5" />}
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
          />
         
          <StatCard
            title="New Contents"
            value={stats.newContents}
            change="+0% from last month"
            icon={<FaEnvelope className="w-5 h-5" />}
            iconBg="bg-yellow-100"
            iconColor="text-yellow-600"
          />
        </div>

        {/* Subscription Plan Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  subscriptionData?.status === "active" 
                    ? "text-blue-600 bg-blue-100" 
                    : "text-red-600 bg-red-100"
                }`}>
                  {subscriptionData?.status === "active" 
                    ? `${getRemainingDays()} Days Left` 
                    : subscriptionData?.status === "expired"
                    ? "Subscription Expired"
                    : "No Active Subscription"}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {subscriptionData?.hasSubscription ? "Manage Your Subscription" : "Choose Your Plan"}
              </h3>
              <p className="text-gray-600 mb-6">
                {subscriptionData?.status === "expired" 
                  ? "Your subscription has expired. Upgrade now to continue using all features."
                  : subscriptionData?.status === "active"
                  ? `Plan active until ${formatDate(subscriptionData.endDate)}`
                  : "Start your free trial or choose a plan to create digital business cards."
                }
              </p>

              {/* Card Status */}
              <div className="mb-6">
                <div className="flex justify-between mb-4">
                  <span className="font-medium text-gray-700">Card Listed</span>
                  <button 
                    onClick={() => navigate("/pricing", { 
                      state: { userEmail, authToken }
                    })}
                    className="text-blue-600 font-medium hover:text-blue-800"
                  >
                    View Plans
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <PlanStatus
                    title="Current Status"
                    value="500/mo"
                    isActive={false}
                  />
                  <PlanStatus
                    title="Business Status"
                    value="800/mo"
                    isActive={true}
                  />
                  <PlanStatus
                    title="Premium Status"
                    value="1200/mo"
                    isActive={false}
                  />
                </div>
              </div>

              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                onClick={() => navigate("/pricing", { 
                  state: { userEmail, authToken }
                })}
              >
                {subscriptionData?.status === "expired" ? "Renew Subscription" : "View Plans"}
              </button>
            </div>
          </div>
        </div>

        {/* Cards Section - DISABLED WHEN EXPIRED */}
        <div className={`${isSubscriptionExpired ? 'opacity-50 pointer-events-none' : ''}`}>
          {/* Overlay when expired */}
          {isSubscriptionExpired && (
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl z-10 flex flex-col items-center justify-center p-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <FaLock className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Card Management Locked</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Your subscription has expired. Upgrade to unlock card management features.
                </p>
                <button
                  onClick={() => setShowSubscriptionModal(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Upgrade to Unlock
                </button>
              </div>
            </div>
          )}

          {/* Cards Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-black">Your Cards</h2>
              <p className="text-sm text-gray-600">
                {cards.length} card{cards.length !== 1 ? 's' : ''} created
              </p>
            </div>
           
            <div className="flex items-center gap-4">
              {cards.length > 0 && (
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search cards..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    disabled={isSubscriptionExpired}
                    className={`pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 ${
                      isSubscriptionExpired 
                        ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed' 
                        : 'border-gray-300'
                    }`}
                  />
                </div>
              )}
              <button
                onClick={handleCreateNew}
                disabled={isSubscriptionExpired}
                className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                  isSubscriptionExpired 
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <FaPlus /> 
                {isSubscriptionExpired ? "Upgrade to Create Card" : "Create New Card"}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Cards Grid */}
          {filteredCards.length === 0 ? (
            <EmptyState
              userEmail={userEmail}
              hasCards={cards.length > 0}
              onCreateNew={handleCreateNew}
              isSubscriptionExpired={isSubscriptionExpired}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Existing Cards */}
              {filteredCards.map((card) => (
                <CardItem
                  key={card._id}
                  card={card}
                  onEdit={handleEditClick}
                  onView={handleViewClick}
                  onShare={handleShareClick}
                  userEmail={userEmail}
                  isSubscriptionExpired={isSubscriptionExpired}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Subscription Banner Component
const SubscriptionBanner = ({ data, remainingDays, onUpgrade }) => {
  if (!data) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "expired": return "bg-red-100 text-red-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active": return "ACTIVE";
      case "expired": return "EXPIRED";
      case "inactive": return "INACTIVE";
      case "pending": return "PENDING";
      default: return "UNKNOWN";
    }
  };

  return (
    <div className={`rounded-xl p-4 border ${
      data.status === "expired" ? "border-red-200 bg-red-50" : 
      data.status === "active" ? "border-green-200 bg-green-50" : 
      "border-gray-200 bg-gray-50"
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            data.status === "expired" ? "bg-red-100" : 
            data.status === "active" ? "bg-green-100" : 
            "bg-gray-100"
          }`}>
            {data.status === "expired" ? (
              <FaLock className="w-5 h-5 text-red-500" />
            ) : data.status === "active" ? (
              <FaCheck className="w-5 h-5 text-green-500" />
            ) : (
              <FaExclamationTriangle className="w-5 h-5 text-gray-500" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">
              {data.status === "expired" ? "Subscription Expired" : 
               data.status === "active" ? "Active Subscription" : 
               "Subscription Status"}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(data.status)}`}>
                {getStatusText(data.status)}
              </span>
              <span className="text-sm text-gray-600">
                {remainingDays > 0 ? `${remainingDays} days remaining` : 
                 data.status === "expired" ? "Trial ended" : 
                 "No active trial"}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm text-gray-600">
              {data.status === "active" ? "Expires on" : 
               data.status === "expired" ? "Expired on" : 
               "Start Date"}
            </div>
            <div className="font-semibold text-gray-800">
              {data.endDate ? new Date(data.endDate).toLocaleDateString() : 
               data.startDate ? new Date(data.startDate).toLocaleDateString() : 
               "N/A"}
            </div>
          </div>
          
          {(data.status === "expired" || data.status === "inactive") && (
            <button
              onClick={onUpgrade}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
            >
              {data.status === "expired" ? "Renew Now" : "Start Trial"}
            </button>
          )}
        </div>
      </div>
      
      {/* Countdown Timer - Only show for active subscriptions */}
      {data.status === "active" && remainingDays > 0 && (
        <div className="mt-4">
          <div className="text-sm text-gray-600 mb-2">Trial ends in</div>
          <div className="flex gap-2">
            <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-center">
              <div className="text-lg font-bold text-gray-800">{remainingDays}</div>
              <div className="text-xs text-gray-500">Days</div>
            </div>
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (remainingDays / 30) * 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Start: {data.startDate ? new Date(data.startDate).toLocaleDateString() : "N/A"}</span>
                <span>End: {data.endDate ? new Date(data.endDate).toLocaleDateString() : "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// New StatCard component to match image
const StatCard = ({ title, value, change, icon, iconBg, iconColor }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
        <p className="text-xs text-gray-500 mt-2">
          <span className="text-red-500">{change}</span>
        </p>
      </div>
      <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}>
        <div className={iconColor}>
          {icon}
        </div>
      </div>
    </div>
  </div>
);

// Plan Status component
const PlanStatus = ({ title, value, isActive }) => (
  <div className={`p-4 rounded-lg border ${isActive ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white'}`}>
    <p className="text-sm text-gray-500 mb-1">{title}</p>
    <p className={`font-semibold ${isActive ? 'text-blue-600' : 'text-gray-800'}`}>
      {value}
    </p>
  </div>
);

// Updated Empty State component
const EmptyState = ({ userEmail, hasCards, onCreateNew, isSubscriptionExpired }) => (
  <div className="text-center py-12">
    <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-sm border border-gray-200">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FaEnvelope className="w-6 h-6 text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {hasCards ? "No Matching Cards" : "No Cards Found"}
      </h3>
      <p className="text-gray-600 mb-6 text-sm">
        {isSubscriptionExpired 
          ? "Your subscription has expired. Please renew to create new cards."
          : hasCards
          ? "No cards match your search criteria."
          : `You haven't created any digital business cards yet.`
        }
      </p>
      <button
        onClick={onCreateNew}
        disabled={isSubscriptionExpired}
        className={`px-6 py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 mx-auto ${
          isSubscriptionExpired
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        <FaPlus />
        {isSubscriptionExpired ? "Renew to Create Card" : "Create Your First Card"}
      </button>
    </div>
  </div>
);

// Updated CardItem component
const CardItem = ({ card, onEdit, onView, onShare, userEmail, isSubscriptionExpired }) => {
  const displayName = `${card.firstName || ''} ${card.lastName || ''}`.trim() || 'Unnamed Card';

  const getCardBg = () => {
    switch(card.cardType) {
      case 'business-premium': return 'bg-gradient-to-r from-purple-600 to-pink-500';
      case 'business-pro': return 'bg-gradient-to-r from-teal-600 to-emerald-500';
      default: return 'bg-gradient-to-r from-blue-600 to-cyan-500';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow relative ${
      isSubscriptionExpired ? 'opacity-50' : ''
    }`}>
      {/* Lock icon overlay for expired subscription */}
      {isSubscriptionExpired && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-red-100 text-red-600 p-2 rounded-full">
            <FaLock className="w-4 h-4" />
          </div>
        </div>
      )}
      
      <div className={`p-6 text-white ${getCardBg()} ${isSubscriptionExpired ? 'opacity-80' : ''}`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold">{displayName}</h3>
            {card.jobTitle && (
              <p className="text-sm opacity-90">{card.jobTitle}</p>
            )}
            {card.companyName && (
              <p className="text-xs opacity-75 mt-1">{card.companyName}</p>
            )}
          </div>
          <FaQrcode className="w-6 h-6 opacity-80" />
        </div>
       
        <div className="space-y-1 text-sm">
          <p className="opacity-90">{card.email || userEmail || 'No email'}</p>
          {card.phones?.[0] && (
            <p className="opacity-90">{card.phones[0].number}</p>
          )}
        </div>
      </div>

      <div className={`p-4 ${isSubscriptionExpired ? 'bg-gray-50' : ''}`}>
        <div className="flex justify-between items-center mb-3">
          <div>
            <h4 className="font-semibold text-gray-800">{displayName}</h4>
            <p className="text-sm text-gray-600">{card.companyName || 'No company'}</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <FaEllipsisV />
          </button>
        </div>

        <div className="flex gap-2 mb-3">
          <button
            onClick={() => onView(card)}
            disabled={isSubscriptionExpired}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              isSubscriptionExpired
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            <FaEye /> View
          </button>
          <button
            onClick={() => onEdit(card)}
            disabled={isSubscriptionExpired}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              isSubscriptionExpired
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            <FaEdit /> {isSubscriptionExpired ? 'Locked' : 'Edit'}
          </button>
          <button
            onClick={() => onShare(card)}
            disabled={isSubscriptionExpired}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              isSubscriptionExpired
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            <FaShareAlt /> {isSubscriptionExpired ? 'Locked' : 'Share'}
          </button>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <FaEye className="w-3 h-3" /> {card.views || 0}
            </span>
            <span className="flex items-center gap-1">
              <FaShareAlt className="w-3 h-3" /> {card.shares || 0}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="w-3 h-3" />
            <span>
              {card.updatedAt
                ? new Date(card.updatedAt).toLocaleDateString()
                : 'Recently'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card_Dashboard;