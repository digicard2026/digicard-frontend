import React from "react";
import { Smartphone, Users } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative pb-36 pt-44 overflow-hidden" id="home">
            {/* Background Decorations (Using standard Slate colors) */}
            {/* <div className="absolute rotate-45  border border-dashed size-[500px] border-t-slate-600 dark:border-t-slate-600 border-l-slate-600 dark:border-l-slate-600 border-r-slate-700 dark:border-r-slate-500 border-b-slate-700 dark:border-b-slate-500 -bottom-[250px] rounded-full right-40 z-10 hidden lg:block opacity-60"></div>
          <div className="absolute rotate-45  border border-dashed size-[250px] border-t-slate-600 dark:border-t-slate-600 border-l-slate-600 dark:border-l-slate-600 border-r-slate-700 dark:border-r-slate-500 border-b-slate-700 dark:border-b-slate-500 -bottom-[125px] rounded-full right-60 z-10 hidden lg:block opacity-60"></div>
   */}

   <div className="absolute -bottom-[250px] right-40 z-10 hidden lg:block">
  {/* Outer Circle */}
  <div className="relative size-[500px] rotate-45 rounded-full border border-dashed
    border-t-slate-400 border-l-slate-400
    border-r-slate-700 border-b-slate-700
    opacity-60">
    
    {/* Inner Circle */}
    <div className="absolute inset-1/2 size-[320px] -translate-x-1/2 -translate-y-1/2
      rotate-45 rounded-full border border-dashed
      border-t-slate-400 border-l-slate-400
      border-r-slate-700 border-b-slate-700
      opacity-60">
    </div>

  </div>
</div>
            <div className="container max-w-7xl px-4 mx-auto relative z-20">
                <div className="grid grid-cols-12 gap-5 items-center">
                    <div className="col-span-12 lg:col-span-8">
                        <h1 className="mb-6 font-sans !leading-relaxed text-4xl md:text-5xl font-semibold text-slate-800 dark:text-slate-50">
                            One Identity. One Platform. <br />
                            <span className="relative inline-block px-2 mx-2">
                                {/* Highlight effect using Rose */}
                                <span className="absolute inset-0 bg-rose-100 dark:bg-rose-500/20 -skew-y-3 rounded-md"></span>
                                <span className="relative text-rosey-600 dark:text-rose-400 font-sans">Endless Possibilities.</span>
                            </span>
                        </h1>
                        <p className="mb-8 text-lg text-slate-500 dark:text-slate-300 leading-7 max-w-2xl font-sans">
                            Revayah One is a unified digital identity, NFC smart campus, and SaaS platform that helps institutions move to a <span className="font-semibold text-slate-700 dark:text-slate-100">secure, contactless, and digital-first future.</span>
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4">
                            <button type="button" className="py-2 px-4 font-sans text-white  bg-rosey-600 border border-rosey-600 hover:bg-rose-700 hover:border-rose-700 rounded shadow-lg shadow-rose-500/30 transition-all font-medium">
                                <Smartphone className="inline-block size-4 align-middle mr-2" /> 
                                Get a Demo
                            </button>
                            <button type="button" className="py-2 px-4 font-sans text-rosey-600 bg-white border border-dashed border-rose-500 hover:bg-rose-50 dark:bg-slate-800 dark:text-rose-400 dark:border-rose-400 dark:hover:bg-slate-700 rounded transition-all font-medium">
                                <Users className="inline-block size-4 align-middle mr-2" /> 
                                Talk to Sales
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

// import React from "react";
// import { Smartphone, Users } from "lucide-react";
// // Import your image here. Example: import heroImg from '../assets/hero.png';

// const Hero = () => {
//     return (
//         <section className="relative pb-36 pt-44 overflow-hidden" id="home">
//             {/* Background Decorations (Dashed Spirals) */}
//             <div className="absolute rotate-45 border border-dashed size-[500px] border-t-slate-300 dark:border-t-slate-600 border-l-slate-300 dark:border-l-slate-600 border-r-slate-700 dark:border-r-slate-500 border-b-slate-700 dark:border-b-slate-500 -bottom-[250px] rounded-full right-40 z-10 hidden lg:block opacity-60"></div>
//             <div className="absolute rotate-45 border border-dashed size-[700px] border-t-slate-200 dark:border-t-slate-700 border-l-slate-200 dark:border-l-slate-700 border-r-slate-800 dark:border-r-slate-600 border-b-slate-800 dark:border-b-slate-600 -bottom-[350px] rounded-full right-20 z-0 hidden lg:block opacity-40"></div>
            
//             <div className="container max-w-7xl px-4 mx-auto relative z-20">
//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
//                     <div className="col-span-12 lg:col-span-7">
//                         <h1 className="mb-6 font-sans !leading-relaxed text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-50">
//                             One Identity. One Platform. <br />
//                             <span className="relative inline-block px-2 mx-2">
//                                 {/* Highlight effect using Blue */}
//                                 <span className="absolute inset-0 bg-blue-100 dark:bg-blue-500/20 -skew-y-3 rounded-md"></span>
//                                 <span className="relative text-blue-600 dark:text-blue-400 font-satoshi">Endless Possibilities.</span>
//                             </span>
//                         </h1>
//                         <p className="mb-8 text-lg text-slate-500 dark:text-slate-300 leading-7 max-w-2xl font-satoshi">
//                             Revayah One is a unified digital identity, NFC smart campus, and SaaS platform that helps institutions move to a <span className="font-semibold text-slate-700 dark:text-slate-100">secure, contactless, and digital-first future.</span>
//                         </p>
                        
//                         <div className="flex flex-wrap items-center gap-4">
//                             <button type="button" className="py-3 px-8 font-satoshi text-white bg-blue-600 border border-blue-600 hover:bg-blue-700 hover:border-blue-700 rounded shadow-lg shadow-blue-500/30 transition-all font-medium">
//                                 <Smartphone className="inline-block size-4 align-middle mr-2" /> 
//                                 Get a Demo
//                             </button>
//                             <button type="button" className="py-3 px-8 font-satoshi text-blue-600 bg-white border border-dashed border-blue-500 hover:bg-blue-50 dark:bg-slate-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-slate-700 rounded transition-all font-medium">
//                                 <Users className="inline-block size-4 align-middle mr-2" /> 
//                                 Talk to Sales
//                             </button>
//                         </div>
//                     </div>
                    
//                     {/* Hero Image Section */}
//                     <div className="col-span-12 lg:col-span-5 relative">
//                         {/* Placeholder for Hero Image */}
//                         <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
//                              {/* Replace src with your actual image path */}
//                              <img 
//                                 src="https://placehold.co/600x400/e2e8f0/1e293b?text=Revayah+Platform+Preview" 
//                                 alt="Revayah One Platform Dashboard" 
//                                 className="w-full h-auto rounded-xl object-cover"
//                              />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Hero;