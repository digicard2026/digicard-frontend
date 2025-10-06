import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toPng } from "html-to-image";
import DefaultCard from "../../components/Cardstyles/DefaultCard";
import ModernCard from "../../components/Cardstyles/ModernCard";
import DarkCard from "../../components/Cardstyles/DarkCard";
import LightCard from "../../components/Cardstyles/LightCard";

const PreviewCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardRef = useRef(null);
  
  const [cardData, setCardData] = useState(null);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    if (location.state) {
      setCardData(location.state);
      setButtonsVisible(true); 
    }
  }, [location.state]);

  const handleDownload = () => {
    if (cardRef.current) {
      toPng(cardRef.current).then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "business-card.png";
        link.click();
      });
    }
  };

  const handleSave = () => {
    const existingCards = JSON.parse(localStorage.getItem("businessCards")) || [];
    localStorage.setItem("businessCards", JSON.stringify([...existingCards, cardData]));
    navigate("/");
  };

  const handleSetPublic = () => {
    localStorage.setItem("publicCard", JSON.stringify(cardData));
    alert("This card is now public!");
  };

  const getPublicLink = () => {
    return `${window.location.origin}/card/public`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getPublicLink());
    alert("Public card link copied to clipboard!");
  };

  const renderCard = () => {
    if (!cardData) return <p>Loading...</p>;

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
      <h2 className="text-3xl font-bold mb-6 text-zinc-800">Preview Your Business Card</h2>

      <div ref={cardRef}>{renderCard()}</div>

      {buttonsVisible && (
        <div className="mt-6 flex gap-4">
          <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded shadow-md">
            Save
          </button>
          <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded shadow-md">
            Download
          </button>
          <button onClick={handleSetPublic} className="bg-indigo-500 text-white px-4 py-2 rounded shadow-md">
          Public</button>
          <button onClick={handleCopyLink} className="bg-purple-500 text-white px-3 py-1 rounded-md text-sm">
          Copy </button>

          <button onClick={() => navigate("/")} className="bg-red-500 text-white px-4 py-2 rounded shadow-md">
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default PreviewCard;
