import React, { useEffect } from "react";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <React.Fragment>
      <footer className="relative pt-20 pb-12 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="absolute left-0 size-64 bg-purple-500 -top-16 opacity-10 blur-3xl"></div>
        <div className="container 2xl:max-w-[87.5rem] px-4 mx-auto">
          
          {/* TOP NEWSLETTER SECTION */}
          <div className="relative z-10 grid grid-cols-12 gap-8 mb-16 pb-16 border-b border-slate-200 dark:border-zinc-800">
            <div className="col-span-12 lg:col-span-6" data-aos="fade-right">
              <h2 className="text-3xl font-bold mb-4 dark:text-zinc-100">
                Sign Up For Update & Newsletter
              </h2>
              <p className="text-slate-500 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                Tell us which describes you, and we'll get in touch with next steps.
              </p>
            </div>
            
            <div className="col-span-12 lg:col-span-6" data-aos="fade-left">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="digicardk@themesdesign"
                  className="flex-1 px-4 py-3 border border-slate-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm bg-white dark:bg-zinc-800 dark:text-zinc-100"
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>

          {/* MAIN FOOTER GRID */}
          <div className="relative z-10 grid grid-cols-12 gap-8">
            {/* Column 1 - Logo + Description + Social */}
            <div className="col-span-12 lg:col-span-4" data-aos="fade-up">
              <div className="mb-5">
                <a href="#!">
                  <img src={logoLight} alt="" className="hidden h-8 dark:block" />
                  <img src={logoDark} alt="" className="block h-8 dark:hidden" />
                </a>
              </div>
              <p className="mb-6 text-slate-500 dark:text-zinc-400 text-sm leading-relaxed">
                Digital Card.com has digital Personal card designs for every
                industry, and we're ready to help you find the perfect one!
                Just pick your industry or enter a keyword below.
              </p>
              
              <ul className="flex items-center gap-3">
                <li>
                  <a href="#" className="flex items-center justify-center size-10 transition-all duration-200 ease-linear border rounded-full text-slate-500 border-slate-200 dark:text-zinc-400 dark:border-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400">
                    <Facebook className="size-4" />
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-center size-10 transition-all duration-200 ease-linear border rounded-full text-slate-500 border-slate-200 dark:text-zinc-400 dark:border-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400">
                    <Linkedin className="size-4" />
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-center size-10 transition-all duration-200 ease-linear border rounded-full text-slate-500 border-slate-200 dark:text-zinc-400 dark:border-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400">
                    <Instagram className="size-4" />
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-center size-10 transition-all duration-200 ease-linear border rounded-full text-slate-500 border-slate-200 dark:text-zinc-400 dark:border-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400">
                    <Twitter className="size-4" />
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-center size-10 transition-all duration-200 ease-linear border rounded-full text-slate-500 border-slate-200 dark:text-zinc-400 dark:border-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400">
                    <Youtube className="size-4" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2 - Degicard.com Links */}
            <div className="col-span-6 md:col-span-4 lg:col-span-2" data-aos="fade-up">
              <h5 className="mb-5 font-semibold text-lg dark:text-zinc-100">Degicard.com</h5>
              <ul className="flex flex-col gap-3 text-sm">
                <li>
                  <a href="#" className="relative inline-block transition-all duration-200 ease-linear text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 before:absolute before:border-b before:border-slate-200 dark:before:border-zinc-700 before:inset-x-0 before:bottom-0 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-linear">
                    Digital Personal Cards
                  </a>
                </li>
                <li>
                  <a href="#" className="relative inline-block transition-all duration-200 ease-linear text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 before:absolute before:border-b before:border-slate-200 dark:before:border-zinc-700 before:inset-x-0 before:bottom-0 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-linear">
                    Link in Bio
                  </a>
                </li>
                <li>
                  <a href="#" className="relative inline-block transition-all duration-200 ease-linear text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 before:absolute before:border-b before:border-slate-200 dark:before:border-zinc-700 before:inset-x-0 before:bottom-0 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-linear">
                    Website Design
                  </a>
                </li>
                <li>
                  <a href="#" className="relative inline-block transition-all duration-200 ease-linear text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 before:absolute before:border-b before:border-slate-200 dark:before:border-zinc-700 before:inset-x-0 before:bottom-0 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-linear">
                    Free Personal Cards
                  </a>
                </li>
                <li>
                  <a href="#" className="relative inline-block transition-all duration-200 ease-linear text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 before:absolute before:border-b before:border-slate-200 dark:before:border-zinc-700 before:inset-x-0 before:bottom-0 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-linear">
                    Personal Cards
                  </a>
                </li>
                <li>
                  <a href="#" className="relative inline-block transition-all duration-200 ease-linear text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 before:absolute before:border-b before:border-slate-200 dark:before:border-zinc-700 before:inset-x-0 before:bottom-0 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-linear">
                    Design Ideas
                  </a>
                </li>
                <li>
                  <a href="#" className="relative inline-block transition-all duration-200 ease-linear text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 before:absolute before:border-b before:border-slate-200 dark:before:border-zinc-700 before:inset-x-0 before:bottom-0 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-linear">
                    Social Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="relative inline-block transition-all duration-200 ease-linear text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 before:absolute before:border-b before:border-slate-200 dark:before:border-zinc-700 before:inset-x-0 before:bottom-0 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-linear">
                    Design Templates
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - Company Links */}
            <div className="col-span-6 md:col-span-4 lg:col-span-3" data-aos="fade-up">
              <h5 className="mb-5 font-semibold text-lg dark:text-zinc-100">Company</h5>
              <ul className="flex flex-col gap-3 text-sm">
                <li>
                  <a href="#" className="relative inline-block transition-all duration-200 ease-linear text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 before:absolute before:border-b before:border-slate-200 dark:before:border-zinc-700 before:inset-x-0 before:bottom-0 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-linear">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="relative inline-block transition-all duration-200 ease-linear text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 before:absolute before:border-b before:border-slate-200 dark:before:border-zinc-700 before:inset-x-0 before:bottom-0 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-linear">
                    Affiliates
                  </a>
                </li>
                <li>
                  <a href="#" className="relative inline-block transition-all duration-200 ease-linear text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 before:absolute before:border-b before:border-slate-200 dark:before:border-zinc-700 before:inset-x-0 before:bottom-0 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-linear">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="relative inline-block transition-all duration-200 ease-linear text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 before:absolute before:border-b before:border-slate-200 dark:before:border-zinc-700 before:inset-x-0 before:bottom-0 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-linear">
                    Legals
                  </a>
                </li>
                <li>
                  <a href="#" className="relative inline-block transition-all duration-200 ease-linear text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 before:absolute before:border-b before:border-slate-200 dark:before:border-zinc-700 before:inset-x-0 before:bottom-0 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-linear">
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a href="#" className="relative inline-block transition-all duration-200 ease-linear text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 before:absolute before:border-b before:border-slate-200 dark:before:border-zinc-700 before:inset-x-0 before:bottom-0 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-linear">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4 - Get Help Links */}
            <div className="col-span-12 md:col-span-4 lg:col-span-3" data-aos="fade-up">
              <h5 className="mb-5 font-semibold text-lg dark:text-zinc-100">Get Help</h5>
              <ul className="flex flex-col gap-3 text-sm">
                <li>
                  <a href="#" className="relative inline-block transition-all duration-200 ease-linear text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 before:absolute before:border-b before:border-slate-200 dark:before:border-zinc-700 before:inset-x-0 before:bottom-0 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-linear">
                    Support Center
                  </a>
                </li>
                <li>
                  <a href="#" className="relative inline-block transition-all duration-200 ease-linear text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 before:absolute before:border-b before:border-slate-200 dark:before:border-zinc-700 before:inset-x-0 before:bottom-0 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-linear">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="relative inline-block transition-all duration-200 ease-linear text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 before:absolute before:border-b before:border-slate-200 dark:before:border-zinc-700 before:inset-x-0 before:bottom-0 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-linear">
                    Insurance & Billing
                  </a>
                </li>
                <li>
                  <a href="#" className="relative inline-block transition-all duration-200 ease-linear text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 before:absolute before:border-b before:border-slate-200 dark:before:border-zinc-700 before:inset-x-0 before:bottom-0 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-linear">
                    Refund & Cancellation
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* BOTTOM COPYRIGHT */}
          <div className="pt-10 mt-16 text-center border-t text-slate-500 dark:text-zinc-400 dark:border-zinc-800">
            <p>
              {new Date().getFullYear()} © Digicard. Design & Develop by{" "}
              <a href="#" className="underline text-slate-800 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400">
                Themesdesign
              </a>
            </p>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;