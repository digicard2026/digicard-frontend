import React, { useEffect } from "react";
import { SiFacebook, SiInstagram, SiLinkedin, SiYoutube } from "react-icons/si";
import AOS from "aos";
import "aos/dist/aos.css";
import logoLight from "../../assets/images/logo-light.png";
import logoDark from "../../assets/images/logo-dark.png";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <footer className="bg-white text-slate-800 py-12 px-4 sm:px-5 border-t border-gray-200 mt-20 ml-0 sm:ml-20">
      {/* Newsletter Section */}
      <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-gray-200 pb-10 mb-10 px-0 sm:px-5">
        <div className="flex-1 min-w-[280px] mr-0 lg:mr-5 mb-5 lg:mb-0" data-aos="fade-right">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Sign Up For Update & Newsletter</h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Tell us which describes you, and we'll get in touch with next steps.
          </p>
        </div>
        <form className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto flex-1 min-w-[300px]" data-aos="fade-left">
          <input
            type="email"
            placeholder="digicard@gamil.com"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
            required
          />
          <button 
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-md font-semibold whitespace-nowrap"
          >
            Subscribe Now
          </button>
        </form>
      </section>

      {/* Footer Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-between mt-10 px-0 sm:px-5">
        {/* Column 1 - Logo and Description */}
        <div className="min-w-[200px] max-w-[300px]" data-aos="fade-up">
          <img src={logoDark} alt="Tailwick Logo" className="h-30 w-75 mb-4" />
          <p className="text-gray-500 text-sm mb-4">
         Digital Card.com has digital Personal card designs for every industry, and we’re ready to help you find the perfect one! Just pick your industry or enter a keyword below, and watch as we bring you designs that’ll make your brand shine. Ready to create something amazing? Let’s go!.
          </p>
          <div className="flex gap-2">
            <a href="#" className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-purple-600 hover:border-purple-600 transition-colors">
              <SiFacebook size={18} />
            </a>
            <a href="#" className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-purple-600 hover:border-purple-600 transition-colors">
              <SiLinkedin size={18} />
            </a>
            <a href="#" className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-purple-600 hover:border-purple-600 transition-colors">
              <SiInstagram size={18} />
            </a>
            <a href="#" className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-purple-600 hover:border-purple-600 transition-colors">
              <SiYoutube size={18} />
            </a>
          </div>
        </div>


        {/* Column 1 */}
        <div className="min-w-[200px]" data-aos="fade-up">
          <h4 className="font-semibold mb-3">Degicard.com</h4>
          <ul className="space-y-2">
            <li className="text-gray-500 text-sm cursor-pointer">Digital Personal Cards</li>
            <li className="text-gray-500 text-sm cursor-pointer">Link in Bio</li>
            <li className="text-gray-500 text-sm cursor-pointer">Website Design</li>
            <li className="text-gray-500 text-sm cursor-pointer">Free Personal Cards</li>
            <li className="text-gray-500 text-sm cursor-pointer">Personal Cards</li>
             <li className="text-gray-500 text-sm cursor-pointer">Design Ideas</li>
              <li className="text-gray-500 text-sm cursor-pointer">Social Templates</li>
               <li className="text-gray-500 text-sm cursor-pointer">Design Templates</li>
          </ul>
        </div>

       {/* Column 2 */}
        <div className="min-w-[200px]" data-aos="fade-up">
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2">
            <li className="text-gray-500 text-sm cursor-pointer">About us</li>
            <li className="text-gray-500 text-sm cursor-pointer">Affiliates</li>
            <li className="text-gray-500 text-sm cursor-pointer">Contact us</li>
            <li className="text-gray-500 text-sm cursor-pointer">Legals</li>
            <li className="text-gray-500 text-sm cursor-pointer">Privacy policy</li>
            <li className="text-gray-500 text-sm cursor-pointer">Help Center</li>
          </ul>
        </div>
        
        {/* Column 3 */}
        <div className="min-w-[200px]" data-aos="fade-up">
          <h4 className="font-semibold mb-3">Get Help</h4>
          <ul className="space-y-2">
            <li className="text-gray-500 text-sm cursor-pointer">Support Center</li>
            <li className="text-gray-500 text-sm cursor-pointer">Contact Us</li>
            <li className="text-gray-500 text-sm cursor-pointer">Insurance & Billing</li>
            <li className="text-gray-500 text-sm cursor-pointer">Refund & Cancellation</li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 pt-8 mt-10 text-center text-gray-500 text-sm px-0 sm:px-5">
        <p>
          {new Date().getFullYear()} ©Copywrite. Design & Develop by{" "}
          <a href="#" className="text-gray-800 underline">Digicard</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;