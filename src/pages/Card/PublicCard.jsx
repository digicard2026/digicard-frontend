import { useState, useEffect } from "react";
import DefaultCard from "../../components/Cardstyles/DefaultCard";
import ModernCard from "../../components/Cardstyles/ModernCard";
import DarkCard from "../../components/Cardstyles/DarkCard";
import LightCard from "../../components/Cardstyles/LightCard";

const PublicCard = () => {
  const [publicCard, setPublicCard] = useState(null);

  useEffect(() => {
    const card = JSON.parse(localStorage.getItem("publicCard"));
    setPublicCard(card);
  }, []);

  const renderCard = () => {
    if (!publicCard) return <p className="text-zinc-500">No public card selected.</p>;

    switch (publicCard.design) {
      case "modern":
        return <ModernCard cardData={publicCard} />;
      case "dark":
        return <DarkCard cardData={publicCard} />;
      case "light":
        return <LightCard cardData={publicCard} />;
      default:
        return <DefaultCard cardData={publicCard} />;
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800">
  {/* Background SVG Curve */}
  <div className="absolute inset-0 overflow-hidden">
    <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 320">
      <path fill="rgba(255,255,255,0.15)" d="M0,160L80,186.7C160,213,320,267,480,245.3C640,224,800,128,960,90.7C1120,53,1280,85,1360,101.3L1440,117.3L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
    </svg>
  </div>

  {/* Personal Card Container */}
  <div className="relative transform transition hover:scale-105 hover:shadow-2xl hover:rounded-xl">
    {renderCard()}
  </div>
</div>

  );
};

export default PublicCard;
