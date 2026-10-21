import React from "react";
import { Smartphone, Users } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative pb-36 pt-44 overflow-hidden" id="home">
            <div className="absolute -bottom-[250px] right-40 z-10 hidden lg:block">
                {/* Outer Circle */}
                <div className="relative size-[500px] rotate-45 rounded-full border border-dashed border-t-slate-400 border-l-slate-400 border-r-slate-700 border-b-slate-700 opacity-60">
                    {/* Inner Circle */}
                    <div className="absolute inset-1/2 size-[320px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full border border-dashed border-t-slate-400 border-l-slate-400 border-r-slate-700 border-b-slate-700 opacity-60"></div>
                </div>
            </div>

            <div className="container max-w-7xl px-4 mx-auto relative z-20">
                <div className="grid grid-cols-12 gap-5 items-center">
                    <div className="col-span-12 lg:col-span-8">
                        <h1 className="mb-6 font-sans !leading-relaxed text-4xl md:text-5xl font-semibold text-slate-800 dark:text-slate-50">
                            One Identity. One Platform. <br />
                            <span className="relative inline-block px-2 mx-2">
                                {/* Highlight effect using Blue from Image */}
                                <span className="absolute inset-0 bg-blue-100 dark:bg-blue-500/20 -skew-y-3 rounded-md"></span>
                                <span className="relative text-blue-600 dark:text-blue-400 font-sans">Endless Possibilities.</span>
                            </span>
                        </h1>
                        <p className="mb-8 text-lg text-slate-500 dark:text-slate-300 leading-7 max-w-2xl font-sans">
                            Revayah One is a unified digital identity, NFC smart campus, and SaaS platform that helps institutions move to a <span className="font-semibold text-slate-700 dark:text-slate-100">secure, contactless, and digital-first future.</span>
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4">
                            <button type="button" className="py-2 px-4 font-sans text-white bg-slate-900 border border-slate-900 hover:bg-slate-800 hover:border-slate-800 rounded shadow-lg shadow-slate-900/20 transition-all font-medium">
                                <Smartphone className="inline-block size-4 align-middle mr-2" /> 
                                Get a Demo
                            </button>
                            <button type="button" className="py-2 px-4 font-sans text-slate-800 bg-white border border-dashed border-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-700 rounded transition-all font-medium">
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