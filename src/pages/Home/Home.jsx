import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [savedCards, setSavedCards] = useState([]);

  useEffect(() => {
    const cards = JSON.parse(localStorage.getItem("businessCards")) || [];
    setSavedCards(cards);
  }, []);

  const handleEdit = (card) => {
    navigate("/create", { state: { card } });
  };

  const handlePreview = (card) => {
    navigate("/preview", { state: card });
  };

  const handleDelete = (index) => {
    const updatedCards = savedCards.filter((_, i) => i !== index);
    setSavedCards(updatedCards);
    localStorage.setItem("businessCards", JSON.stringify(updatedCards));
  };

  const handleSetPublic = (card) => {
    localStorage.setItem("publicCard", JSON.stringify(card));
    alert("This card is now public!");
  };

  const getPublicLink = () => {
    return `${window.location.origin}/card/public`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getPublicLink());
    alert("Public card link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <h1 className="text-3xl text-zinc-600 font-bold text-center mb-6">Business Card Generator</h1>

      <div className="flex justify-center mb-6">
        <Link to="/create" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md shadow-md">
          <div className="flex items-center gap-2">
            <img className="w-5 h-5 " src="https://img.icons8.com/?size=100&id=cAd29bV1wGyF&format=png&color=000000" alt="" />
            <p>Create New Card</p>
          </div>

        </Link>
      </div>

      <h2 className="text-2xl font-semibold pl-1 mb-4">Your Cards</h2>
      <div className=" max-h-[500px] p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedCards.length > 0 ? (
            savedCards.map((card, index) => (
              <div key={index} className="bg-white shadow-md p-4 rounded-lg relative">
                <div className="h-40 bg-zinc-200 flex items-center justify-center rounded-md overflow-hidden">
                  {card.image ? (
                    <img src={card.image} alt="Card Thumbnail" className="w-full h-full object-cover" />
                  ) : (
                    <p className="text-zinc-500">No Image</p>
                  )}
                </div>

                <h3 className="text-lg font-semibold mt-3">{card.name}</h3>
                <p className="text-sm text-zinc-500">{card.jobTitle}</p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handlePreview(card)}
                    className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    🔍 Preview
                  </button>
                  <button
                    onClick={() => handleEdit(card)}
                    className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
                <div className="flex justify-between mt-2">
                  <button onClick={() => handleSetPublic(card)} className="bg-gradient-to-r from-indigo-500 to-blue-400 text-white px-3 py-1 rounded-md text-sm">🌍 Public</button>
                  <button onClick={handleCopyLink} className=" bg-gradient-to-r from-purple-500 to-pink-400 text-white px-3 py-1 rounded-md text-sm">🔗 Copy </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-zinc-500">No saved cards yet. Create one now!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;


