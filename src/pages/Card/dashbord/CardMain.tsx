
// import { CreditCard, Eye, Share2, Users } from "lucide-react";
// import { StatsCard } from "./StatsCard";
// import { DigitalCardPreview, Card } from "./DigitalCardPreview";
// import { SubscriptionBanner } from "./SubscriptionBanner";
// import { CreateCardButton } from "./CreateCardButton";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // ADD THIS IMPORT
// import { CARD_URL } from "../../../utility/constants";

// const Indexs = () => {
//   const navigate = useNavigate(); // ADD THIS
//   const [cards, setCards] = useState<Card[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [userName, setUserName] = useState<string>("User"); // ADD THIS
//   const [stats, setStats] = useState({
//     totalCards: 0,
//     totalViews: 0,
//     totalShares: 0,
//     newContacts: 0
//   });

//   // ✅ GET EMAIL FROM LOCAL STORAGE
//   const getUserInfo = () => {
//     const storedEmail = localStorage.getItem('user_email');
//     const storedName = localStorage.getItem('user_name');
    
//     return {
//       email: storedEmail || null,
//       name: storedName || storedEmail?.split('@')[0] || 'User'
//     };
//   };

//   // ✅ FETCH USER'S CARDS
//   useEffect(() => {
//     const fetchUserCards = async () => {
//       const userInfo = getUserInfo();
      
//       if (!userInfo.email) {
//         setLoading(false);
//         return;
//       }

//       setUserName(userInfo.name); // Set user name

//       try {
//         setLoading(true);
        
//         const response = await fetch(`${CARD_URL}/email/${encodeURIComponent(userInfo.email)}`);
        
//         if (response.ok) {
//           const data = await response.json();
//           console.log('Raw API response:', data); // DEBUG
          
//           // ✅ Handle different response formats
//           let cardsArray = [];
          
//           if (data.cards && Array.isArray(data.cards)) {
//             cardsArray = data.cards;
//           } else if (Array.isArray(data)) {
//             cardsArray = data;
//           } else if (data.data && Array.isArray(data.data)) {
//             cardsArray = data.data;
//           } else if (data.card) {
//             cardsArray = [data.card];
//           } else {
//             cardsArray = [];
//           }

//           console.log('Cards array:', cardsArray); // DEBUG
//           console.log('First card:', cardsArray[0]); // DEBUG
          
//           // ✅ Transform API data to match Card interface WITH urlSlug AND cardData
//           const transformedCards: Card[] = cardsArray.map((card: any, index: number) => {
//             const firstName = card.firstName || '';
//             const lastName = card.lastName || '';
//             const fullName = `${firstName} ${lastName}`.trim() || 'Unnamed Card';
            
//             // Try different possible field names for urlSlug
//             const urlSlug = card.urlSlug || card.slug || card.customUrl || card.publicUrl || card._id || '';
            
//             console.log(`Card ${index} urlSlug:`, urlSlug); // DEBUG
            
//             return {
//               id: card._id || card.id || `card-${index}`,
//               name: fullName,
//               title: card.jobTitle || card.title || '',
//               company: card.companyName || card.company || '',
//               email: card.email || userInfo.email,
//               phone: card.phones?.[0]?.number || card.phone || '',
//               views: card.views || 0,
//               shares: card.shares || 0,
//               gradient: getGradientFromCardType(card.cardType),
//               plan: "personal", // You might want to get this from subscription data
//               trialDaysLeft: 25, // This should come from subscription data
//               subscriptionStartDate: new Date(),
//               urlSlug: urlSlug, // ADD THIS
//               cardData: card // ADD THIS - store original card data
//             };
//           });
          
//           setCards(transformedCards);
          
//           // ✅ Calculate REAL stats from fetched cards
//           const totalViews = cardsArray.reduce((sum: number, card: any) => sum + (card.views || 0), 0);
//           const totalShares = cardsArray.reduce((sum: number, card: any) => sum + (card.shares || 0), 0);
          
//           setStats({
//             totalCards: cardsArray.length,
//             totalViews,
//             totalShares,
//             newContacts: Math.floor(totalViews * 0.05)
//           });
          
//         } else if (response.status === 404) {
//           setCards([]);
//           setStats({
//             totalCards: 0,
//             totalViews: 0,
//             totalShares: 0,
//             newContacts: 0
//           });
//         }
//       } catch (error) {
//         console.error('Error fetching cards:', error);
//         setCards([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserCards();
//   }, []);

//   // ✅ Helper function to map card type to gradient
//   const getGradientFromCardType = (cardType: string): Card['gradient'] => {
//     switch(cardType) {
//       case 'business-premium': return 'purple';
//       case 'business-pro': return 'teal';
//       case 'coral': return 'coral';
//       case 'blue': return 'blue';
//       default: return 'teal';
//     }
//   };

//   // ✅ Handle View Card
//   const handleViewCard = (card: Card) => {
//     console.log('Viewing card:', card); // DEBUG
//     if (card.urlSlug) {
//       window.open(`/preview/${card.urlSlug}`, '_blank');
//     } else {
//       alert('This card does not have a shareable URL yet. Please edit and save the card first.');
//     }
//   };

//   // ✅ Handle Edit Card
//   const handleEditCard = (card: Card) => {
//     console.log('Editing card:', card); // DEBUG
//     const userEmail = localStorage.getItem('user_email');
    
//     if (!card.cardData) {
//       alert('Card data not found. Please try again.');
//       return;
//     }
    
//     navigate('/create', { 
//       state: { 
//         userEmail: userEmail,
//         card: card.cardData // Pass the original card data
//       }
//     });
//   };

//   // ✅ Handle Share Card
//   const handleShareCard = (card: Card) => {
//     console.log('Sharing card:', card); // DEBUG
//     if (card.urlSlug) {
//       const shareUrl = `${window.location.origin}/preview/${card.urlSlug}`;
//       navigator.clipboard.writeText(shareUrl)
//         .then(() => {
//           alert('Shareable URL copied to clipboard!');
//         })
//         .catch(err => {
//           console.error('Failed to copy: ', err);
//           // Fallback method
//           const textArea = document.createElement('textarea');
//           textArea.value = shareUrl;
//           document.body.appendChild(textArea);
//           textArea.select();
//           document.execCommand('copy');
//           document.body.removeChild(textArea);
//           alert('Shareable URL copied to clipboard!');
//         });
//     } else {
//       alert('This card does not have a shareable URL yet. Please edit and save the card first.');
//     }
//   };

//   // ✅ Handle Create New Card
//   const handleCreateNew = () => {
//     const userEmail = localStorage.getItem('user_email');
//     const selectedPlan = localStorage.getItem('selected_plan');
    
//     navigate('/create', { 
//       state: { 
//         userEmail: userEmail,
//         selectedPlan: selectedPlan
//       }
//     });
//   };

//   // ✅ REAL stats data with actual values from API
//   const statsData = [
//     { 
//       title: "Total Cards", 
//       value: stats.totalCards, 
//       icon: CreditCard, 
//       trend: { value: 0, isPositive: true } 
//     },
//     { 
//       title: "Total Views", 
//       value: stats.totalViews > 999 ? `${(stats.totalViews / 1000).toFixed(1)}K` : stats.totalViews.toString(), 
//       icon: Eye, 
//       trend: { value: 0, isPositive: true } 
//     },
//     { 
//       title: "Total Shares", 
//       value: stats.totalShares, 
//       icon: Share2, 
//       trend: { value: 0, isPositive: true } 
//     },
//     { 
//       title: "New Contacts", 
//       value: stats.newContacts, 
//       icon: Users, 
//       trend: { value: 0, isPositive: true } 
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <main className="ml-2 p-8">
//           <div className="flex items-center justify-center h-96">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//               <div className="text-xl text-foreground font-medium">Loading your dashboard...</div>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <main className="ml-2 p-8">
//         {/* Header with REAL user name */}
//         <header className="mb-8 animate-fade-in">
//           <h1 className="text-3xl font-bold text-foreground">Welcome back, {userName}!</h1>
//           <p className="text-muted-foreground mt-1">
//             Manage your digital business cards and track your networking success.
//           </p>
//         </header>

//         {/* Stats Grid with REAL data */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {statsData.map((stat, index) => (
//             <div
//               key={stat.title}
//               className="animate-fade-in"
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <StatsCard {...stat} />
//             </div>
//           ))}
//         </div>

//         {/* Subscription Banner */}
//         <div className="mb-8 animate-fade-in" style={{ animationDelay: "400ms" }}>
//           <SubscriptionBanner 
//             plan="free" 
//             cardsUsed={stats.totalCards} 
//             cardsLimit={5} 
//             trialDaysLeft={25} 
//           />
//         </div>

//         {/* Cards Section */}
//         <section className="animate-fade-in" style={{ animationDelay: "500ms" }}>
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className="text-xl font-bold text-foreground">Your Cards</h2>
//               <p className="text-sm text-muted-foreground">
//                 {cards.length} card{cards.length !== 1 ? 's' : ''} created
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {/* Create New Card Button with handler */}
//             <CreateCardButton onClick={handleCreateNew} />
            
//             {/* REAL Cards from API with handlers */}
//             {cards.map((card, index) => (
//               <div key={card.id} style={{ animationDelay: `${(index + 1) * 100}ms` }}>
//                 <DigitalCardPreview 
//                   card={card} 
//                   onView={() => handleViewCard(card)}
//                   onEdit={() => handleEditCard(card)}
//                   onShare={() => handleShareCard(card)}
//                 />
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Indexs;

import { CreditCard, Eye, Share2, Lock } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { DigitalCardPreview, Card, CardType } from "./DigitalCardPreview";
import { SubscriptionBanner } from "./SubscriptionBanner";
import { CreateCardButton } from "./CreateCardButton";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CARD_URL, CHECK_URL } from "../../../utility/constants";

const Indexs = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("User");
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [rawCardsArray, setRawCardsArray] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalCards: 0,
    totalViews: 0,
    totalShares: 0,
    newContacts: 0,
  });

  // ✅ GET USER INFO
  const getUserInfo = () => {
    const storedEmail = localStorage.getItem("user_email");
    const storedName = localStorage.getItem("user_name");
    const storedUserId = localStorage.getItem("user_id");

    const userInfo = {
      email: storedEmail || null,
      name: storedName || storedEmail?.split("@")[0] || "User",
      userId: storedUserId || storedEmail,
      identifier: storedUserId || storedEmail || "unknown",
    };

    setUserName(userInfo.name);
    return userInfo;
  };

  // ✅ FETCH SUBSCRIPTION STATUS
  const fetchSubscriptionStatus = async () => {
    try {
      const response = await fetch(`${CHECK_URL}/status`, {
        method: "GET",
        credentials: "include", // 🔥 Important: cookie-based auth
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Subscription check failed");
      }

      const enhancedData = {
        ...data.data,
        planType: extractPlanType(data.data),
        price: data.data.price || getDefaultPriceForPlan(extractPlanType(data.data)),
        maxCards: getMaxCardsForPlan(extractPlanType(data.data)),
      };

      setSubscriptionData(enhancedData);

      if (enhancedData.status === "expired" || enhancedData.daysLeft <= 0) {
        setShowSubscriptionModal(true);
      }

      return enhancedData;
    } catch (error) {
      console.error("Error fetching subscription status:", error);
      const fallback = {
        hasSubscription: false,
        status: "inactive",
        daysLeft: 0,
        planType: "free",
        maxCards: 5,
      };
      setSubscriptionData(fallback);
      return fallback;
    }
  };

  // ✅ HELPER FUNCTIONS
  const extractPlanType = (data: any): "free" | "Personal" | "Business" | "Business Premium" => {
    if (!data || !data.hasSubscription || data.status === "expired" || data.status === "inactive") return "free";
    if (data.planType) return data.planType;
    if (data.planName) {
      if (data.planName.includes("Business Premium")) return "Business Premium";
      if (data.planName.includes("Business")) return "Business";
      if (data.planName.includes("Personal")) return "Personal";
      if (data.planName.includes("free")) return "free";
    }
    return data.hasSubscription ? "Personal" : "free";
  };

  const getMaxCardsForPlan = (planType: string) => {
    switch (planType) {
      case "Personal": return 10;
      case "Business": return 50;
      case "Business Premium": return 999;
      default: return 5;
    }
  };

  const getDefaultPriceForPlan = (planType: string) => {
    switch (planType) {
      case "Personal": return "$5/month";
      case "Business": return "$15/month";
      case "Business Premium": return "$29/month";
      default: return "Free";
    }
  };

  const getRemainingDays = () => {
    if (!subscriptionData?.endDate) return subscriptionData?.daysLeft || 0;
    const endDate = new Date(subscriptionData.endDate);
    const now = new Date();
    const diffDays = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const isSubscriptionExpired = subscriptionData?.status === "expired" || subscriptionData?.daysLeft <= 0;
  const maxCards = subscriptionData?.maxCards || 5;
  const canCreateMoreCards = () => !isSubscriptionExpired && cards.length < maxCards;
  const isCardLocked = (cardIndex: number) => cardIndex >= maxCards;

  const getGradientFromCardType = (cardType: CardType): Card["gradient"] => {
    switch (cardType) {
      case "Business Premium": return "purple";
      case "Business": return "teal";
      case "Personal": return "blue";
      default: return "teal";
    }
  };

  // ✅ FETCH CARDS
  useEffect(() => {
    const fetchUserData = async () => {
      const userInfo = getUserInfo();
      if (!userInfo.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const subscription = await fetchSubscriptionStatus();

        const response = await fetch(
          `${CARD_URL}/email/${encodeURIComponent(userInfo.email)}`,
          { method: "GET", credentials: "include" }
        );

        if (!response.ok) {
          if (response.status === 404) {
            setCards([]);
            setStats({ totalCards: 0, totalViews: 0, totalShares: 0, newContacts: 0 });
          }
          throw new Error("Failed to fetch cards");
        }

        const data = await response.json();
        const cardsArray = Array.isArray(data.cards) ? data.cards : data.data || [];

        const userCards = cardsArray.filter((c: any) => (c.email || c.userEmail) === userInfo.email);
        setRawCardsArray(userCards);

        const limitedCards = userCards.slice(0, subscription?.maxCards || 5);

        const transformedCards: Card[] = limitedCards.map((card: any, index: number) => {
          const firstName = card.firstName || card.name?.split(" ")[0] || "";
          const lastName = card.lastName || card.name?.split(" ").slice(1).join(" ") || "";
          const fullName = `${firstName} ${lastName}`.trim() || "Unnamed Card";

          const urlSlug = card.urlSlug || card.slug || card.customUrl || card.publicUrl || card._id || "";

          const cardType: CardType = card.cardType === "Business Premium"
            ? "Business Premium"
            : card.cardType === "Business"
            ? "Business"
            : "Personal";

          return {
            id: card._id || card.id || `card-${index}`,
            name: fullName,
            title: card.jobTitle || card.title || card.position || "",
            company: card.companyName || card.company || card.organization || "",
            email: card.email || card.primaryEmail || userInfo.email,
            phone: card.phones?.[0]?.number || card.phone || card.mobile || "",
            views: card.views || card.viewCount || 0,
            shares: card.shares || card.shareCount || 0,
            gradient: getGradientFromCardType(cardType),
            cardType,
            trialDaysLeft: subscription?.daysLeft || 0,
            subscriptionStartDate: subscription?.startDate ? new Date(subscription.startDate) : new Date(),
            urlSlug,
            cardData: card,
          };
        });

        setCards(transformedCards);

        setStats({
          totalCards: transformedCards.length,
          totalViews: transformedCards.reduce((sum, c) => sum + c.views, 0),
          totalShares: transformedCards.reduce((sum, c) => sum + c.shares, 0),
          newContacts: Math.floor(transformedCards.reduce((sum, c) => sum + c.views, 0) * 0.05),
        });
      } catch (error) {
        console.error("Error fetching cards:", error);
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // ✅ HANDLERS
  const handleViewCard = (card: Card) => {
    if (isSubscriptionExpired) {
      setShowSubscriptionModal(true);
      return;
    }
    if (card.urlSlug) window.open(`/preview/${card.urlSlug}`, "_blank");
    else alert("This card does not have a shareable URL yet.");
  };

  const handleEditCard = (card: Card, index: number) => {
    if (isSubscriptionExpired || isCardLocked(index)) {
      setShowSubscriptionModal(true);
      return;
    }
    const userEmail = localStorage.getItem("user_email");
    navigate("/create", { state: { userEmail, card: card.cardData } });
  };

  const handleShareCard = (card: Card, index: number) => {
    if (isSubscriptionExpired || isCardLocked(index)) {
      setShowSubscriptionModal(true);
      return;
    }
    if (card.urlSlug) {
      const shareUrl = `${window.location.origin}/preview/${card.urlSlug}`;
      navigator.clipboard.writeText(shareUrl).then(() => alert("Shareable URL copied!"));
    } else alert("This card does not have a shareable URL yet.");
  };

  const handleCreateNew = () => {
    if (!canCreateMoreCards()) {
      setShowSubscriptionModal(true);
      return;
    }
    const userEmail = localStorage.getItem("user_email");
    const selectedPlan = subscriptionData?.planType || "free";
    navigate("/create", { state: { userEmail, selectedPlan } });
  };

  const handleUpgradeSubscription = () => {
    setShowSubscriptionModal(false);
    navigate("/pricing", {
      state: {
        userEmail: localStorage.getItem("user_email"),
        currentPlan: subscriptionData?.planType || "free",
        currentCards: cards.length,
      },
    });
  };

  // ✅ AUTH CHECK
  if (!loading && !localStorage.getItem("user_email")) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to access this page.</p>
          <button
            onClick={() => navigate("/signin")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="ml-2 p-8">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <div className="text-xl text-foreground font-medium">Loading your dashboard...</div>
              <p className="text-gray-500 mt-2">for {userName || "User"}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ✅ RENDER DASHBOARD
  return (
    <div className="min-h-screen bg-background">
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Lock className="w-6 h-6 text-red-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
              {isSubscriptionExpired ? "Access Restricted" : "Plan Limit Reached"}
            </h3>
            <p className="text-gray-600 text-center mb-6">
              {isSubscriptionExpired
                ? "Your free trial has ended. Your card management features are now locked."
                : `You have reached the limit of ${maxCards} cards on your ${subscriptionData?.planType || "free"} plan.`}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubscriptionModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Dismiss
              </button>
              <button
                onClick={handleUpgradeSubscription}
                className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {isSubscriptionExpired ? "Renew Subscription" : "Upgrade Plan"}
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="ml-2 p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Cards", value: stats.totalCards, icon: CreditCard },
            { title: "Total Views", value: stats.totalViews, icon: Eye },
            { title: "Total Shares", value: stats.totalShares, icon: Share2 },
          ].map((stat, index) => (
            <div key={stat.title}>
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Subscription Banner */}
        <SubscriptionBanner
          subscriptionData={subscriptionData}
          remainingDays={getRemainingDays()}
          cardsUsed={stats.totalCards}
          maxCards={maxCards}
          userCards={rawCardsArray}
          onUpgrade={handleUpgradeSubscription}
        />

        {/* Cards Section */}
        <section className={`${isSubscriptionExpired ? "opacity-50 pointer-events-none relative" : ""}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">Your Cards</h2>
              <p className="text-sm text-muted-foreground">
                {cards.length} of {maxCards} cards used • {subscriptionData?.planType || "Free"} Plan
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CreateCardButton
              onClick={handleCreateNew}
              disabled={isSubscriptionExpired || !canCreateMoreCards()}
              label={
                isSubscriptionExpired
                  ? "Upgrade to Create Card"
                  : !canCreateMoreCards()
                  ? "Plan Limit Reached"
                  : "Create New Card"
              }
            />

            {cards.map((card, index) => (
              <div key={card.id}>
                {isCardLocked(index) ? (
                  <div className="relative opacity-50">
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl z-10 flex flex-col items-center justify-center p-4">
                      <Lock className="w-5 h-5 text-red-500 mb-2" />
                      <p className="text-sm text-gray-700 text-center">Upgrade to unlock</p>
                    </div>
                    <DigitalCardPreview card={card} onView={() => {}} onEdit={() => {}} onShare={() => {}} />
                  </div>
                ) : (
                  <DigitalCardPreview
                    card={card}
                    onView={() => handleViewCard(card)}
                    onEdit={() => handleEditCard(card, index)}
                    onShare={() => handleShareCard(card, index)}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Indexs;
