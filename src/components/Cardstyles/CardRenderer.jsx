// components/cards/CardRenderer.jsx
import DefaultCard from "./DefaultCard";
import ModernCard from "./ModernCard";
import DarkCard from "./DarkCard";
import LightCard from "./LightCard";

const CARD_MAP = {
  default: DefaultCard,
  modern: ModernCard,
  dark: DarkCard,
  light:LightCard
};

const CardRenderer = ({ design, data, isPreview = false ,plan = '' }) => {
  const CardComponent = CARD_MAP[design] || DefaultCard;
    return <CardComponent cardData={data} plan={plan} isPreview={isPreview} />;
};

export default CardRenderer;
// components/cards/CardRenderer.jsx
// import DefaultCard from "./DefaultCard";
// import ModernCard from "./ModernCard";
// import DarkCard from "./DarkCard";
// import LightCard from "./LightCard";

// const CARD_MAP = {
//   default: DefaultCard,
//   modern: ModernCard,
//   dark: DarkCard,
//   light: LightCard
// };

// const CardRenderer = ({ design, data, isPreview = false, plan = 'BusinessPremium' }) => {
//   const CardComponent = CARD_MAP[design] || DefaultCard;
  
//   // Log for debugging
//   console.log('🎨 CardRenderer:', { design, data, plan, isPreview });
  
//   // Pass props according to what each card component expects
//   return <CardComponent cardData={data} plan={plan} isPreview={isPreview} />;
// };

// export default CardRenderer;