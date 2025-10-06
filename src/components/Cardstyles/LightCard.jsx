import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const LightCard = ({ cardData }) => {
  return (
    <div className="relative w-[400px] h-[600px] p-6 rounded-3xl text-center shadow-xl bg-gradient-to-br from-white to-blue-100 border border-slate-200 overflow-hidden">
      
     
      <div className="absolute top-0 left-0 w-full h-36 overflow-hidden bg-gradient-to-r from-blue-400 to-blue-600 rounded-b-[50px] flex justify-center items-center">
        
        
        <div className="absolute w-full h-full bg-opacity-10 bg-[url('https://www.transparenttextures.com/patterns/shine-dotted.png')]"></div>
      </div>

      
      {cardData.image && (
        <div className="relative mt-14 bg-white bg-opacity-70 backdrop-blur-md shadow-lg p-2 rounded-full border-4 border-blue-300 inline-block">
          <img
            src={cardData.image}
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full object-cover"
          />
        </div>
      )}

     
      <div className="mt-6 p-4 bg-white bg-opacity-80 backdrop-blur-md shadow-md rounded-xl border border-slate-300">
        <h3 className="text-2xl font-bold text-slate-800">{cardData.name}</h3>
        <p className="text-lg text-slate-600">{cardData.jobTitle}</p>
        <p className="text-sm text-slate-500">{cardData.company}</p>
      </div>

      
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-200 to-white rounded-lg border-l-4 border-blue-400 shadow-md">
        <p className="text-sm text-slate-700">{cardData.email}</p>
        <p className="text-sm text-slate-700">{cardData.phone}</p>
      </div>

      
      <div className="absolute bottom-18 left-1/2 z-10 transform -translate-x-1/2 w-4/5 p-2 bg-white bg-opacity-75 backdrop-blur-md rounded-full shadow-md flex justify-center gap-6 text-slate-600 border border-slate-300">
        <a href="#" className="hover:text-blue-500 text-2xl"><FaLinkedin /></a>
        <a href="#" className="hover:text-blue-400 text-2xl"><FaTwitter /></a>
        <a href="#" className="hover:text-pink-500 text-2xl"><FaInstagram /></a>
      </div>

      
      <div className="absolute bottom-0 left-0 w-full overflow-hidden h-24 bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-[50px]">
      <div className="absolute w-full h-full  bg-opacity-10 bg-[url('https://www.transparenttextures.com/patterns/shine-dotted.png')]"></div>
      </div>
    </div>
  );
};

export default LightCard;
