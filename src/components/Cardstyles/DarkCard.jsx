import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const DarkCard = ({ cardData }) => {
  return (
    <div className="relative w-[400px] h-[600px] p-6 rounded-2xl text-center shadow-xl bg-gradient-to-br from-slate-900 to-purple-800 text-white overflow-hidden">
      
      
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-purple-900 to-slate-800 rounded-b-[50%] flex items-center justify-center">
        <div className="absolute w-full h-full bg-opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-denim.png')]"></div>
      </div>

      
      {cardData.image && (
        <div className="relative mt-20">
          <img
            src={cardData.image}
            alt="Profile"
            className="w-28 h-28 mx-auto rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      )}

     
      <h3 className="text-2xl font-bold mt-4">{cardData.name}</h3>
      <p className="text-lg text-gray-300">{cardData.jobTitle}</p>
      <p className="text-sm text-gray-400">{cardData.company}</p>

      
      <div className="mt-4 text-gray-300">
        <p className="text-sm">{cardData.email}</p>
        <p className="text-sm">{cardData.phone}</p>
      </div>

  
      <div className="absolute bottom-6 z-10 left-0 w-full flex justify-center gap-6 text-gray-400">
        <a href="#" className="hover:text-blue-600 text-2xl"><FaLinkedin /></a>
        <a href="#" className="hover:text-blue-600 text-2xl"><FaTwitter /></a>
        <a href="#" className="hover:text-slate-400 text-2xl"><FaGithub /></a>
      </div>

    
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-r from-purple-900 to-slate-800 rounded-t-[50%]"></div>
    </div>
  );
};

export default DarkCard;
