// components/cards/CardRenderer.jsx
import DefaultCard from "./DefaultCard";
import ModernCard from "./ModernCard";
import DarkCard from "./DarkCard";
import LightCard from "./LightCard";
import ModernCard2 from "./ModernCard2";

const CARD_MAP = {
  default: DefaultCard,
  creative: ModernCard2,
  modern: ModernCard,
  dark: DarkCard,
  light: LightCard
};

const CardRenderer = ({ design, data, isPreview = false, isSnapshot = false, plan = '' }) => {
  if (!data) return null;
  const CardComponent = CARD_MAP[design] || DefaultCard;
  return <CardComponent cardData={data} plan={plan} isPreview={isPreview} isSnapshot={isSnapshot} />;
};

export default CardRenderer;
