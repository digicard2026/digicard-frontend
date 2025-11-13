import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEdit, FaEye, FaShareAlt, FaCalendarAlt, FaEnvelope, FaPlus, FaSearch, FaUser, FaBuilding, FaPhone, FaGlobe, FaArrowRight } from "react-icons/fa";
import { CARD_URL } from "../../../src/utility/constants";

const Card_Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userEmail: locationEmail, userData } = location.state || {};
  
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

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

  // ✅ UPDATED: Fetch ALL user's cards by email
  useEffect(() => {
    const fetchUserCards = async () => {
      const emailToFetch = getUserEmail();
      
      if (!emailToFetch) {
        setError("No user email found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        
        console.log(`📧 Fetching ALL cards for email: ${emailToFetch}`);
        console.log(`🔗 API URL: ${CARD_URL}/email/${encodeURIComponent(emailToFetch)}`);
        
        const response = await fetch(`${CARD_URL}/email/${encodeURIComponent(emailToFetch)}`);
        
        console.log('🔍 Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('✅ API Response:', data);
          
          // ✅ UPDATED: Handle the new response format with cards array
          let cardsArray = [];
          
          if (data.cards && Array.isArray(data.cards)) {
            // Case: { success: true, cards: [...] }
            cardsArray = data.cards;
            console.log('📦 Case 1: cards array in response');
          } else if (Array.isArray(data)) {
            // Case: Direct array response
            cardsArray = data;
            console.log('📦 Case 2: direct array response');
          } else if (data.data && Array.isArray(data.data)) {
            // Case: { data: [...] }
            cardsArray = data.data;
            console.log('📦 Case 3: data array in response');
          } else if (data.card) {
            // Case: Single card (backward compatibility)
            cardsArray = [data.card];
            console.log('📦 Case 4: single card object');
          } else {
            // No cards found
            cardsArray = [];
            console.log('📦 Case 5: no cards found');
          }
          
          console.log('🃏 Final cards array:', cardsArray);
          setCards(cardsArray);
          
        } else if (response.status === 404) {
          // No cards found for this email - this is normal for new users
          console.log('ℹ️ No cards found for this email');
          setCards([]);
        } else {
          const errorText = await response.text();
          console.error('❌ API Error:', errorText);
          throw new Error(`Failed to fetch cards: ${response.status}`);
        }
      } catch (error) {
        console.error('🔥 Error fetching cards:', error);
        setError("Failed to load your cards. Please try refreshing the page.");
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCards();
  }, [userEmail]);

  // Handle edit card
  const handleEditClick = (card) => {
    console.log('Editing card:', card);
    navigate('/create', { 
      state: { 
        userEmail: userEmail,
        card: card 
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
    const selectedPlan = localStorage.getItem('selected_plan');
    
    console.log('Creating new card with:', {
      userEmail: userEmail,
      selectedPlan: selectedPlan
    });

    navigate('/create', { 
      state: { 
        userEmail: userEmail,
        selectedPlan: selectedPlan
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

  // ✅ SHOW EMAIL NOT FOUND ERROR
  if (!userEmail && !loading) {
    return (
      <div className="min-h-screen bg-[#eef3f9] flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUser className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">User Not Found</h2>
          <p className="text-gray-600 mb-4">Unable to identify user. Please login again.</p>
          <button
            onClick={() => navigate('/signin/franchise')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#eef3f9] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading your cards...</div>
          <p className="text-sm text-gray-500 mt-2">for {userEmail}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef3f9] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              My Digital Business Cards
            </h1>
            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
              <FaUser className="text-blue-500" />
              Welcome! Managing cards for: <span className="font-semibold text-blue-600">{userEmail}</span>
            </p>
            {cards.length > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                {cards.length} card{cards.length !== 1 ? 's' : ''} found
              </p>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
            {/* Search Bar - Only show if there are cards */}
            {cards.length > 0 && (
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                />
              </div>
            )}
            
            {/* Create New Card Button */}
            <button
              onClick={handleCreateNew}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <FaPlus />
              Create New Card
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Debug Info - Remove in production */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-sm">
          <p><strong>Debug Info:</strong> Email: {userEmail} | Cards Found: {cards.length}</p>
        </div>

        {/* Cards Grid */}
        {filteredCards.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-lg">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {cards.length === 0 ? "No Cards Found" : "No Matching Cards"}
              </h3>
              <p className="text-gray-600 mb-6">
                {cards.length === 0 
                  ? `You haven't created any digital business cards with ${userEmail}. Create your first card to get started!`
                  : "No cards match your search criteria."
                }
              </p>
              <button
                onClick={handleCreateNew}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2 mx-auto"
              >
                <FaPlus />
                Create Your First Card
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((card) => (
              <CardItem 
                key={card._id} 
                card={card} 
                onEdit={handleEditClick}
                onView={handleViewClick}
                onShare={handleShareClick}
                userEmail={userEmail}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Individual Card Component (Keep this same as before)
const CardItem = ({ card, onEdit, onView, onShare, userEmail }) => {
  const displayName = `${card.firstName || ''} ${card.lastName || ''}`.trim() || 'Unnamed Card';
  const displayEmail = card.email || userEmail || 'No email';
  const profilePhoto = card.profilePhoto || "https://cdn-icons-png.flaticon.com/512/9131/9131529.png";
  const companyLogo = card.companyLogo || null;
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Get card type display name
  const getCardTypeDisplay = (cardType) => {
    const typeMap = {
      'business': 'Business',
      'business-premium': 'Business Premium',
      'business-pro': 'Business Professional'
    };
    return typeMap[cardType] || cardType || 'Business';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      {/* Card Header with Profile and Company */}
      <div className="flex flex-col items-center -mt-14 mb-4">
        <div className="relative">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-1 shadow-lg">
            <img
              src={profilePhoto}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-white"
            />
          </div>
          {companyLogo && (
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
              <img
                src={companyLogo}
                alt="company logo"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Card main info */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">{displayName}</h2>
        
        {card.jobTitle && (
          <p className="text-sm text-blue-600 font-medium mb-2">{card.jobTitle}</p>
        )}
        
        <p className="text-sm text-gray-500 mb-2 flex items-center justify-center gap-2">
          <FaEnvelope className="text-gray-400" />
          {displayEmail}
        </p>

        {card.companyName && (
          <p className="text-sm text-gray-700 mb-2 flex items-center justify-center gap-2">
            <FaBuilding className="text-gray-400" />
            {card.companyName}
          </p>
        )}

        {/* Card Type Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 
          bg-blue-100 text-blue-800 border border-blue-200">
          {getCardTypeDisplay(card.cardType)}
        </div>

        {/* Status and Date */}
        <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
          <div className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${
              card.isPublic ? 'bg-green-500' : 'bg-yellow-500'
            }`}></span>
            {card.isPublic ? 'Published' : 'Draft'}
          </div>
          
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="text-gray-400" />
            {formatDate(card.updatedAt || card.createdAt)}
          </div>
        </div>

        {/* Quick Stats */}
        {(card.phones?.length > 0 || card.websites?.length > 0) && (
          <div className="flex justify-center gap-4 mt-3 text-xs text-gray-500">
            {card.phones?.length > 0 && (
              <div className="flex items-center gap-1">
                <FaPhone className="text-gray-400" />
                {card.phones.length} phone{card.phones.length !== 1 ? 's' : ''}
              </div>
            )}
            {card.websites?.length > 0 && (
              <div className="flex items-center gap-1">
                <FaGlobe className="text-gray-400" />
                {card.websites.length} website{card.websites.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex border-t border-gray-200 pt-4">
        <button 
          onClick={() => onEdit(card)}
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-l-lg transition-colors font-medium text-sm"
          title="Edit this card - Email will be auto-filled"
        >
          <FaEdit />
          Edit
        </button>
        
        <button 
          onClick={() => onView(card)}
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors font-medium text-sm"
        >
          <FaEye />
          Preview
        </button>
        
        <button 
          onClick={() => onShare(card)}
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-r-lg transition-colors font-medium text-sm"
        >
          <FaShareAlt />
          Share
        </button>
      </div>

      {/* URL Slug Display */}
      {card.urlSlug && (
        <div className="mt-3 p-2 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            URL: <span className="font-mono text-gray-700">/preview/{card.urlSlug}</span>
          </p>
        </div>
      )}

      {/* Edit Instruction */}
      <div className="mt-2 text-center">
        <p className="text-xs text-blue-600 flex items-center justify-center gap-1">
          <FaArrowRight className="w-3 h-3" />
          Click "Edit" to modify this card
        </p>
      </div>
    </div>
  );
};

export default Card_Dashboard;