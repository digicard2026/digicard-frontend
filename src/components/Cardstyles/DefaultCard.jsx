import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const DefaultCard = ({ cardData }) => {
  return (
    <div className="relative w-[400px] h-[600px] p-6 rounded-2xl text-center shadow-lg bg-white overflow-hidden border border-slate-300">
      
      
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-orange-500 to-blue-500 flex items-center justify-center">
      <div className="absolute w-full h-full bg-opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      
      {cardData.image && (
        <div className="relative mt-20 p-1 bg-white rounded-lg shadow-lg border-2 border-blue-500 inline-block">
          <img
            src={cardData.image}
            alt="Profile"
            className="w-28 h-28 mx-auto rounded-lg object-cover"
          />
        </div>
      )}

    
      <div className="mt-6 p-3 bg-slate-100 rounded-lg shadow-sm border border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800">{cardData.name}</h3>
        <p className="text-lg text-slate-600">{cardData.jobTitle}</p>
        <p className="text-sm text-slate-500">{cardData.company}</p>
      </div>

    
      <div className="mt-4 p-3 bg-slate-100 rounded-lg shadow-sm border-l-4 border-orange-500">
        <p className="text-sm text-slate-700">{cardData.email}</p>
        <p className="text-sm text-slate-700">{cardData.phone}</p>
      </div>

     
      <div className="absolute bottom-6 left-0 w-full flex justify-center gap-6 text-slate-500">
        <a href="#" className="hover:text-orange-500 text-2xl"><FaLinkedin /></a>
        <a href="#" className="hover:text-blue-500 text-2xl"><FaTwitter /></a>
        <a href="#" className="hover:text-slate-700 text-2xl"><FaGithub /></a>
      </div>

      
      <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-orange-500 to-blue-500"></div>
    </div>
  );
};

export default DefaultCard;
