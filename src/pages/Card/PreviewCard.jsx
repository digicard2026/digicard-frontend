// import { useEffect, useState, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toPng } from "html-to-image";
// import DefaultCard from "../../components/Cardstyles/DefaultCard";
// import ModernCard from "../../components/Cardstyles/ModernCard";
// import DarkCard from "../../components/Cardstyles/DarkCard";
// import LightCard from "../../components/Cardstyles/LightCard";

// const PreviewCard = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const cardRef = useRef(null);
  
//   const [cardData, setCardData] = useState(null);
//   const [buttonsVisible, setButtonsVisible] = useState(false);

//   useEffect(() => {
//     if (location.state) {
//       setCardData(location.state);
//       setButtonsVisible(true); 
//     }
//   }, [location.state]);

//   const handleDownload = () => {
//     if (cardRef.current) {
//       toPng(cardRef.current).then((dataUrl) => {
//         const link = document.createElement("a");
//         link.href = dataUrl;
//         link.download = "Personal-card.png";
//         link.click();
//       });
//     }
//   };

//   const handleSave = () => {
//     const existingCards = JSON.parse(localStorage.getItem("PersonalCards")) || [];
//     localStorage.setItem("PersonalCards", JSON.stringify([...existingCards, cardData]));
//     navigate("/");
//   };

//   const handleSetPublic = () => {
//     localStorage.setItem("publicCard", JSON.stringify(cardData));
//     alert("This card is now public!");
//   };

//   const getPublicLink = () => {
//     return `${window.location.origin}/card/public`;
//   };

//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(getPublicLink());
//     alert("Public card link copied to clipboard!");
//   };

//   const renderCard = () => {
//     if (!cardData) return <p>Loading...</p>;

//     switch (cardData.design) {
//       case "modern":
//         return <ModernCard cardData={cardData} />;
//       case "dark":
//         return <DarkCard cardData={cardData} />;
//       case "light":
//         return <LightCard cardData={cardData} />;
//       default:
//         return <DefaultCard cardData={cardData} />;
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-100 p-6">
//       <h2 className="text-3xl font-bold mb-6 text-zinc-800">Preview Your Personal Card</h2>

//       <div ref={cardRef}>{renderCard()}</div>

//       {buttonsVisible && (
//         <div className="mt-6 flex gap-4">
//           <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded shadow-md">
//             Save
//           </button>
//           <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded shadow-md">
//             Download
//           </button>
//           <button onClick={handleSetPublic} className="bg-indigo-500 text-white px-4 py-2 rounded shadow-md">
//           Public</button>
//           <button onClick={handleCopyLink} className="bg-purple-500 text-white px-3 py-1 rounded-md text-sm">
//           Copy </button>

//           <button onClick={() => navigate("/")} className="bg-red-500 text-white px-4 py-2 rounded shadow-md">
//             Back
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PreviewCard;
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toPng } from "html-to-image";
import DefaultCard from "../../components/Cardstyles/DefaultCard";
import ModernCard from "../../components/Cardstyles/ModernCard";
import DarkCard from "../../components/Cardstyles/DarkCard";
import LightCard from "../../components/Cardstyles/LightCard";
import { CARD_URL } from "../../../src/utility/constants";

const PreviewCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { urlSlug } = useParams();
  const cardRef = useRef(null);
  
  const [cardData, setCardData] = useState(null);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ALWAYS fetch from database - never use location.state directly
    if (urlSlug) {
      // Shared URL: /preview/pinaki
      fetchCardFromDatabase(urlSlug, false);
    } else if (location.state?.cardData?._id) {
      // Coming from CreateCard with saved card ID
      fetchCardFromDatabase(location.state.cardData._id, true);
    } else if (location.state?.urlSlug) {
      // Coming from CreateCard with URL slug
      fetchCardFromDatabase(location.state.urlSlug, true);
    } else {
      setError("No card identifier found");
    }
  }, [location.state, urlSlug]);

  // SINGLE FUNCTION: Always fetch from database
  const fetchCardFromDatabase = async (identifier, showButtons = false) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Fetching card:', identifier);
      
      // Determine if identifier is ID or slug
      let url;
      if (identifier.length === 24) { // MongoDB ID length
        url = `${CARD_URL}/${identifier}`;
      } else {
        url = `${CARD_URL}/share/${identifier}`;
      }
      
      console.log('🌐 Fetching from URL:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Card not found: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 API response:', data);
      
      if (data.success && data.card) {
        setCardData(data.card);
        setButtonsVisible(showButtons);
      } else {
        throw new Error('Card data not found in response');
      }
    } catch (error) {
      console.error('💥 Error fetching card:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (cardRef.current) {
      toPng(cardRef.current).then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "Personal-card.png";
        link.click();
      });
    }
  };

  const handleSave = () => {
    const existingCards = JSON.parse(localStorage.getItem("PersonalCards")) || [];
    localStorage.setItem("PersonalCards", JSON.stringify([...existingCards, cardData]));
    alert("Card saved to local storage!");
  };

  const getPublicLink = () => {
    if (cardData?.urlSlug) {
      return `${window.location.origin}/preview/${cardData.urlSlug}`;
    }
    return "No shareable URL available";
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getPublicLink());
    alert("Shareable URL copied to clipboard!");
  };

  const renderCard = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-gray-600">Loading card...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="text-center p-8">
          <div className="text-red-500 text-2xl mb-4">❌</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Card Not Found</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Go Home
          </button>
        </div>
      );
    }
    
    if (!cardData) {
      return (
        <div className="text-center p-8">
          <p className="text-gray-600">No card data available</p>
        </div>
      );
    }

    console.log('🎨 Rendering card design:', cardData.design, cardData);

    // Render based on card design
    switch (cardData.design) {
      case "modern":
        return <ModernCard cardData={cardData} />;
      case "dark":
        return <DarkCard cardData={cardData} />;
      case "light":
        return <LightCard cardData={cardData} />;
      default:
        return <DefaultCard cardData={cardData} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-100 p-6">
      {/* <h2 className="text-3xl font-bold mb-6 text-zinc-800">
        {urlSlug ? `${cardData?.firstName || ''}'s Personal Card` : "Preview Your Personal Card"}
      </h2> */}

      <div ref={cardRef}>{renderCard()}</div>

      {buttonsVisible && cardData && (
        <div className="mt-6 flex gap-4 flex-wrap justify-center">
          <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600">
            Save Locally
          </button>
          <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600">
            Download PNG
          </button>
          <button onClick={handleCopyLink} className="bg-purple-500 text-white px-4 py-2 rounded shadow-md hover:bg-purple-600">
            Copy Share URL
          </button>
          <button onClick={() => navigate("/create-card")} className="bg-orange-500 text-white px-4 py-2 rounded shadow-md hover:bg-orange-600">
            Create New Card
          </button>
          <button onClick={() => navigate("/")} className="bg-gray-500 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600">
            Back Home
          </button>
        </div>
      )}

      {/* Simple back button for shared view */}
      {/* {urlSlug && !buttonsVisible && cardData && (
        <div className="mt-6 flex gap-4">
          <button onClick={() => navigate("/")} className="bg-gray-500 text-balck px-4 py-2 rounded shadow-md hover:bg-gray-600">
            Back to Home
          </button>
          <button onClick={handleCopyLink} className="bg-purple-500 text-white px-4 py-2 rounded shadow-md hover:bg-purple-600">
            Copy My Card URL
          </button>
        </div>
      )} */}
    </div>
  );
};

export default PreviewCard;