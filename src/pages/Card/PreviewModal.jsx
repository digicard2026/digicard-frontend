import React from "react";

const PreviewModal = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[450px] relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-slate-500 hover:text-slate-800">
          ❌
        </button>
        <div className="relative">
          <h3 className="text-xl font-bold">{card.name}</h3>
          <p className="text-sm text-slate-500">{card.jobTitle}</p>
          <p className="text-sm">{card.email}</p>
          <p className="text-sm">{card.phone}</p>
        </div>
        <div
          className={`mt-4 w-full h-64 rounded-lg shadow-md ${
            card.design === "modern"
              ? "bg-gradient-to-r from-blue-500 to-purple-600"
              : card.design === "dark"
              ? "bg-gradient-to-br from-slate-900 to-purple-800"
              : card.design === "light"
              ? "bg-gradient-to-br from-white to-pink-300"
              : "bg-white"
          }`}
        >
          <p className="text-center pt-10 text-white font-semibold">Business Card Preview</p>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
