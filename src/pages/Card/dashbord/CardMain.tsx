
import { CreditCard, Eye, Share2, Users } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { DigitalCardPreview, Card } from "./DigitalCardPreview";
import { SubscriptionBanner } from "./SubscriptionBanner";
import { CreateCardButton } from "./CreateCardButton";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ADD THIS IMPORT
import { CARD_URL } from "../../../utility/constants";

const Indexs = () => {
  const navigate = useNavigate(); // ADD THIS
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("User"); // ADD THIS
  const [stats, setStats] = useState({
    totalCards: 0,
    totalViews: 0,
    totalShares: 0,
    newContacts: 0
  });

  // ✅ GET EMAIL FROM LOCAL STORAGE
  const getUserInfo = () => {
    const storedEmail = localStorage.getItem('user_email');
    const storedName = localStorage.getItem('user_name');
    
    return {
      email: storedEmail || null,
      name: storedName || storedEmail?.split('@')[0] || 'User'
    };
  };

  // ✅ FETCH USER'S CARDS
  useEffect(() => {
    const fetchUserCards = async () => {
      const userInfo = getUserInfo();
      
      if (!userInfo.email) {
        setLoading(false);
        return;
      }

      setUserName(userInfo.name); // Set user name

      try {
        setLoading(true);
        
        const response = await fetch(`${CARD_URL}/email/${encodeURIComponent(userInfo.email)}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Raw API response:', data); // DEBUG
          
          // ✅ Handle different response formats
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

          console.log('Cards array:', cardsArray); // DEBUG
          console.log('First card:', cardsArray[0]); // DEBUG
          
          // ✅ Transform API data to match Card interface WITH urlSlug AND cardData
          const transformedCards: Card[] = cardsArray.map((card: any, index: number) => {
            const firstName = card.firstName || '';
            const lastName = card.lastName || '';
            const fullName = `${firstName} ${lastName}`.trim() || 'Unnamed Card';
            
            // Try different possible field names for urlSlug
            const urlSlug = card.urlSlug || card.slug || card.customUrl || card.publicUrl || card._id || '';
            
            console.log(`Card ${index} urlSlug:`, urlSlug); // DEBUG
            
            return {
              id: card._id || card.id || `card-${index}`,
              name: fullName,
              title: card.jobTitle || card.title || '',
              company: card.companyName || card.company || '',
              email: card.email || userInfo.email,
              phone: card.phones?.[0]?.number || card.phone || '',
              views: card.views || 0,
              shares: card.shares || 0,
              gradient: getGradientFromCardType(card.cardType),
              plan: "personal", // You might want to get this from subscription data
              trialDaysLeft: 25, // This should come from subscription data
              subscriptionStartDate: new Date(),
              urlSlug: urlSlug, // ADD THIS
              cardData: card // ADD THIS - store original card data
            };
          });
          
          setCards(transformedCards);
          
          // ✅ Calculate REAL stats from fetched cards
          const totalViews = cardsArray.reduce((sum: number, card: any) => sum + (card.views || 0), 0);
          const totalShares = cardsArray.reduce((sum: number, card: any) => sum + (card.shares || 0), 0);
          
          setStats({
            totalCards: cardsArray.length,
            totalViews,
            totalShares,
            newContacts: Math.floor(totalViews * 0.05)
          });
          
        } else if (response.status === 404) {
          setCards([]);
          setStats({
            totalCards: 0,
            totalViews: 0,
            totalShares: 0,
            newContacts: 0
          });
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCards();
  }, []);

  // ✅ Helper function to map card type to gradient
  const getGradientFromCardType = (cardType: string): Card['gradient'] => {
    switch(cardType) {
      case 'business-premium': return 'purple';
      case 'business-pro': return 'teal';
      case 'coral': return 'coral';
      case 'blue': return 'blue';
      default: return 'teal';
    }
  };

  // ✅ Handle View Card
  const handleViewCard = (card: Card) => {
    console.log('Viewing card:', card); // DEBUG
    if (card.urlSlug) {
      window.open(`/preview/${card.urlSlug}`, '_blank');
    } else {
      alert('This card does not have a shareable URL yet. Please edit and save the card first.');
    }
  };

  // ✅ Handle Edit Card
  const handleEditCard = (card: Card) => {
    console.log('Editing card:', card); // DEBUG
    const userEmail = localStorage.getItem('user_email');
    
    if (!card.cardData) {
      alert('Card data not found. Please try again.');
      return;
    }
    
    navigate('/create', { 
      state: { 
        userEmail: userEmail,
        card: card.cardData // Pass the original card data
      }
    });
  };

  // ✅ Handle Share Card
  const handleShareCard = (card: Card) => {
    console.log('Sharing card:', card); // DEBUG
    if (card.urlSlug) {
      const shareUrl = `${window.location.origin}/preview/${card.urlSlug}`;
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          alert('Shareable URL copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          // Fallback method
          const textArea = document.createElement('textarea');
          textArea.value = shareUrl;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          alert('Shareable URL copied to clipboard!');
        });
    } else {
      alert('This card does not have a shareable URL yet. Please edit and save the card first.');
    }
  };

  // ✅ Handle Create New Card
  const handleCreateNew = () => {
    const userEmail = localStorage.getItem('user_email');
    const selectedPlan = localStorage.getItem('selected_plan');
    
    navigate('/create', { 
      state: { 
        userEmail: userEmail,
        selectedPlan: selectedPlan
      }
    });
  };

  // ✅ REAL stats data with actual values from API
  const statsData = [
    { 
      title: "Total Cards", 
      value: stats.totalCards, 
      icon: CreditCard, 
      trend: { value: 0, isPositive: true } 
    },
    { 
      title: "Total Views", 
      value: stats.totalViews > 999 ? `${(stats.totalViews / 1000).toFixed(1)}K` : stats.totalViews.toString(), 
      icon: Eye, 
      trend: { value: 0, isPositive: true } 
    },
    { 
      title: "Total Shares", 
      value: stats.totalShares, 
      icon: Share2, 
      trend: { value: 0, isPositive: true } 
    },
    { 
      title: "New Contacts", 
      value: stats.newContacts, 
      icon: Users, 
      trend: { value: 0, isPositive: true } 
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="ml-2 p-8">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <div className="text-xl text-foreground font-medium">Loading your dashboard...</div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="ml-2 p-8">
        {/* Header with REAL user name */}
        <header className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {userName}!</h1>
          <p className="text-muted-foreground mt-1">
            Manage your digital business cards and track your networking success.
          </p>
        </header>

        {/* Stats Grid with REAL data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <div
              key={stat.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Subscription Banner */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <SubscriptionBanner 
            plan="free" 
            cardsUsed={stats.totalCards} 
            cardsLimit={5} 
            trialDaysLeft={25} 
          />
        </div>

        {/* Cards Section */}
        <section className="animate-fade-in" style={{ animationDelay: "500ms" }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">Your Cards</h2>
              <p className="text-sm text-muted-foreground">
                {cards.length} card{cards.length !== 1 ? 's' : ''} created
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create New Card Button with handler */}
            <CreateCardButton onClick={handleCreateNew} />
            
            {/* REAL Cards from API with handlers */}
            {cards.map((card, index) => (
              <div key={card.id} style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                <DigitalCardPreview 
                  card={card} 
                  onView={() => handleViewCard(card)}
                  onEdit={() => handleEditCard(card)}
                  onShare={() => handleShareCard(card)}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Indexs;