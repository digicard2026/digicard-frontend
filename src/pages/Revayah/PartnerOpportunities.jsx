// import React from "react";
// import { Handshake, Globe, TrendingUp, Users, CheckCircle, FileText, Gift, Award, LogIn } from "lucide-react";

// // Reuse existing Layout Components
// import NavBar from "../Revayah/NavBar";
// import Footer from "../Revayah/Footer";

// const PartnerOpportunities = () => {
//     return (
//         <div className="font-sans text-base text-slate-800 bg-white dark:text-slate-100 dark:bg-slate-900 h-screen overflow-y-auto flex flex-col">
//             <NavBar />

//             <main className="flex-grow w-full pt-10">
                
//                 {/* --- 1. HERO SECTION --- */}
//                 <section className="relative py-20 lg:py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden">
//                     {/* Background Decor */}
//                     <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
//                         <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-rose-500/5 rounded-full blur-3xl"></div>
//                         <div className="absolute top-[20%] right-[5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-3xl"></div>
//                     </div>

//                     <div className="container max-w-7xl px-4 mx-auto relative z-10 text-center">
//                         <h5 className="text-rosey-600 dark:text-rose-400 font-semibold tracking-widest uppercase mb-4 text-sm">
//                             Reva-Yah Partner Program (RPP)
//                         </h5>
//                         <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight text-slate-900 dark:text-white">
//                             Partner with the Future of <br/> <span className="text-rosey-600">Digital Identity</span>
//                         </h1>
//                         <p className="text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
//                             Reva-Yah Partnering Program is designed to make more successful & promote Reva-Yah services & products in India. We welcome all the enterprising enthusiasts to grow their business under our single platform.
//                         </p>
//                         <div className="flex flex-wrap justify-center gap-4">
//                             <button className="py-2 px-4 bg-rosey-600 text-white rounded font-medium hover:bg-rose-700 transition shadow-lg shadow-rose-500/30">
//                                 Apply Now
//                             </button>
//                             <button className="py-2 px-4 bg-white text-rosey-600 border border-slate-200 hover:border-rose-200 rounded font-medium hover:bg-slate-50 transition">
//                                 Learn More
//                             </button>
//                         </div>
//                     </div>
//                 </section>

//                 {/* --- 2. ABOUT PROGRAM --- */}
//                 <section className="py-20 bg-white dark:bg-slate-900">
//                     <div className="container max-w-7xl px-4 mx-auto">
//                         <div className="grid lg:grid-cols-2 gap-12 items-center">
//                             <div>
//                                 <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
//                                     Grow Your Business With Us
//                                 </h2>
//                                 <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
//                                     We authorize you to represent us and promote the products & services as required by the client. Spread your work from home or from your own office just by managing your client base and offering our innovative products & services.
//                                 </p>
//                                 <p className="text-lg text-slate-600 dark:text-slate-300 font-medium border-l-4 border-rose-500 pl-4">
//                                     Enjoy the facility to earn unlimited & recurring income. Be your own boss and establish an earning mechanism without any initial expense.
//                                 </p>
//                             </div>
//                             <div className="relative">
//                                 <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
//                                     <img 
//                                         src="https://placehold.co/600x400/fff1f2/e11d48?text=Partner+Success" 
//                                         alt="Partnership" 
//                                         className="w-full h-full object-cover"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* --- 3. WHY US & ADVANTAGES --- */}
//                 <section className="py-24 bg-slate-50 dark:bg-slate-800/50">
//                     <div className="container max-w-7xl px-4 mx-auto">
//                         <div className="grid md:grid-cols-2 gap-16">
//                             {/* Why Us */}
//                             <div>
//                                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
//                                     <span className="bg-blue-100 text-blue-600 p-2 rounded-lg"><Globe className="size-6"/></span> Why Us?
//                                 </h3>
//                                 <ul className="space-y-4">
//                                     {[
//                                         "Wide range of products & services offered for businesses of all kinds & all stages.",
//                                         "A unique opportunity to become a channel partner in your respective region.",
//                                         "Unlimited earning potential.",
//                                         "Continuous R & D on new products & services.",
//                                         "Access to featured products."
//                                     ].map((item, i) => (
//                                         <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
//                                             <CheckCircle className="size-5 text-blue-600 shrink-0 mt-0.5"/>
//                                             <span>{item}</span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>

//                             {/* Advantages */}
//                             <div>
//                                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
//                                     <span className="bg-rose-100 text-rosey-600 p-2 rounded-lg"><TrendingUp className="size-6"/></span> Advantages
//                                 </h3>
//                                 <ul className="space-y-4">
//                                     {[
//                                         "Be your own boss",
//                                         "Unlimited & recurring earning potential",
//                                         "Zero investment in infrastructure",
//                                         "Function from home or office with flexible timing",
//                                         "Wide range of products & services",
//                                         "Professional back-end support"
//                                     ].map((item, i) => (
//                                         <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
//                                             <CheckCircle className="size-5 text-rosey-600 shrink-0 mt-0.5"/>
//                                             <span>{item}</span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* --- 4. PARTNERSHIP OPPORTUNITIES (Cards) --- */}
//                 <section className="py-24 bg-white dark:bg-slate-900" id="models">
//                     <div className="container max-w-7xl px-4 mx-auto">
//                         <div className="text-center mb-16">
//                             <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Partnering Opportunities</h2>
//                             <p className="text-slate-600 dark:text-slate-400">Choose the model that fits your business goals.</p>
//                         </div>

//                         <div className="grid md:grid-cols-3 gap-8">
                            
//                             {/* Franchise */}
//                             <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all hover:-translate-y-1 bg-slate-50 dark:bg-slate-800 flex flex-col">
//                                 <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/30 text-rosey-600 rounded-lg flex items-center justify-center mb-6">
//                                     <Globe className="size-7" />
//                                 </div>
//                                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Reva –Yah Franchisee Program (RFP)</h3>
//                                 <div className="text-2xl font-bold text-rosey-600 mb-4">10,000 INR <span className="text-xs text-slate-500 font-normal line-through">Fees</span></div>
                                
//                                 <ul className="space-y-3 mb-8 flex-grow">
//                                     <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"><CheckCircle className="size-4 text-rose-500 shrink-0 mt-0.5"/> Develop & Promote Reva-Yah Services & Products in your region</li>
//                                     <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"><CheckCircle className="size-4 text-rose-500 shrink-0 mt-0.5"/> Develop Channel & Referral Partners</li>
//                                     <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"><CheckCircle className="size-4 text-rose-500 shrink-0 mt-0.5"/> Responsible for Institutional & Corporate Sales</li>
//                                     <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"><CheckCircle className="size-4 text-rose-500 shrink-0 mt-0.5"/> Unlimited & Recurring Earning Potential</li>
//                                 </ul>
                                
//                                 <div className="bg-rose-50 border border-rose-100 p-3 rounded-lg mb-6 text-center">
//                                     <p className="text-sm font-semibold text-rose-700">Partner fees are zero till March 31st 2026</p>
//                                 </div>
//                                 <button className="w-full py-2.5 bg-rosey-600 text-white rounded-lg font-medium hover:bg-rose-700 transition">APPLY NOW</button>
//                             </div>

//                             {/* Channel Partner */}
//                             <div className="p-8 rounded-2xl border-2 border-blue-500 shadow-xl relative bg-white dark:bg-slate-800 flex flex-col transform md:-translate-y-4">
//                                 <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
//                                 <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg flex items-center justify-center mb-6">
//                                     <Handshake className="size-7" />
//                                 </div>
//                                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Reva –Yah Channel Partner (RCP)</h3>
//                                 <div className="text-2xl font-bold text-blue-600 mb-4">5,000 INR <span className="text-xs text-slate-500 font-normal line-through">Fees</span></div>

//                                 <ul className="space-y-3 mb-8 flex-grow">
//                                     <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"><CheckCircle className="size-4 text-blue-500 shrink-0 mt-0.5"/> Develop & Promote Reva-Yah Services & Products in your region</li>
//                                     <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"><CheckCircle className="size-4 text-blue-500 shrink-0 mt-0.5"/> Unlimited & Recurring earning potential</li>
//                                 </ul>

//                                 <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg mb-6 text-center">
//                                     <p className="text-sm font-semibold text-blue-700">Partner fees are zero till March 31st 2026</p>
//                                 </div>
//                                 <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">APPLY NOW</button>
//                             </div>

//                             {/* Referral */}
//                             <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all hover:-translate-y-1 bg-slate-50 dark:bg-slate-800 flex flex-col">
//                                 <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg flex items-center justify-center mb-6">
//                                     <Users className="size-7" />
//                                 </div>
//                                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Reva-Yah Referral Partner (RRP)</h3>
//                                 <div className="text-2xl font-bold text-green-600 mb-4">No Fees</div>

//                                 <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm leading-relaxed flex-grow">
//                                     RRP is an independent partner, just refer Reva-Yah services & products to your family, friends & others & earn one time commission.
//                                 </p>
                                
//                                 <div className="bg-green-50 border border-green-100 p-3 rounded-lg mb-6 text-center">
//                                     <p className="text-sm font-semibold text-green-700">Come & be part of future.</p>
//                                 </div>
//                                 <button className="w-full py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">APPLY NOW</button>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* --- 5. HOW TO BECOME PARTNER --- */}
//                 <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
//                     <div className="container max-w-7xl px-4 mx-auto text-center">
//                         <h2 className="text-3xl font-bold mb-16 text-slate-900 dark:text-white">How to become Reva-Yah Partner</h2>
                        
//                         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
//                             {[
//                                 { step: "Step 1", title: "Become a member", desc: "Join Reva-Yah. Tell us your business interests and register using your business email address." },
//                                 { step: "Step 2", title: "Yours Information", desc: "Tell us about you & your company. Help us understand you & your company." },
//                                 { step: "Step 3", title: "Register", desc: "Accept terms and conditions. Register yourself by accepting terms and conditions." },
//                                 { step: "Step 4", title: "Complete KYC", desc: "Submit necessary documents for verification." },
//                                 { step: "Step 5", title: "Pay Partners Fees", desc: "Once approved, pay partners fees (if applicable)." },
//                                 { step: "Step 6", title: "Partner Account", desc: "As a partner, you will be given your own partner account." },
//                                 { step: "Step 7", title: "Get Trained", desc: "Get trained from our professional’s & start your business." },
//                             ].map((item, idx) => (
//                                 <div key={idx} className="bg-white dark:bg-slate-700 p-6 rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm">
//                                     <span className="text-xs font-bold text-rose-500 uppercase tracking-widest block mb-2">{item.step}</span>
//                                     <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
//                                     <p className="text-sm text-slate-600 dark:text-slate-300">{item.desc}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </section>

//                 {/* --- 6. WHAT YOU GET --- */}
//                 <section className="py-20 bg-white dark:bg-slate-900">
//                     <div className="container max-w-4xl px-4 mx-auto text-center">
//                         <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">What we will give after Reva-Yah partner</h2>
//                         <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
//                             <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-3">
//                                 <Award className="size-8 text-blue-600"/>
//                                 <span className="font-semibold text-slate-700 dark:text-slate-200">Partner Certificate</span>
//                             </div>
//                             <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-3">
//                                 <FileText className="size-8 text-orange-600"/>
//                                 <span className="font-semibold text-slate-700 dark:text-slate-200">Marketing Material</span>
//                             </div>
//                             <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-3">
//                                 <Gift className="size-8 text-rosey-600"/>
//                                 <span className="font-semibold text-slate-700 dark:text-slate-200">Product Access</span>
//                             </div>
//                             <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-3">
//                                 <LogIn className="size-8 text-green-600"/>
//                                 <span className="font-semibold text-slate-700 dark:text-slate-200">Login Access</span>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* --- 7. APPLICATION FORM --- */}
//                 <section className="py-24 bg-slate-50 dark:bg-slate-800">
//                     <div className="container max-w-3xl px-4 mx-auto text-center">
//                         <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Apply for Partnership</h2>
//                         <p className="mb-10 text-slate-600 dark:text-slate-300">
//                             Ready to join? Fill out the form below.
//                         </p>
                        
//                         <form className="space-y-4 text-left bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl">
//                             <div className="grid md:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
//                                     <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none" placeholder="John Doe" />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
//                                     <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none" placeholder="Your Business Ltd." />
//                                 </div>
//                             </div>
//                             <div className="grid md:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
//                                     <input type="email" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none" placeholder="john@example.com" />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
//                                     <input type="tel" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none" placeholder="+91 98765 43210" />
//                                 </div>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Partnership Type</label>
//                                 <select className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none">
//                                     <option>Franchise Partner (RFP)</option>
//                                     <option>Channel Partner (RCP)</option>
//                                     <option>Referral Partner (RRP)</option>
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
//                                 <textarea rows="4" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none" placeholder="Tell us about your interest..."></textarea>
//                             </div>
//                             <button type="button" className="w-full py-3 bg-rosey-600 text-white font-bold rounded-lg hover:bg-rose-700 transition">
//                                 Submit Application
//                             </button>
//                         </form>
//                     </div>
//                 </section>

//             </main>
            
//             <Footer />
//         </div>
//     );
// };

// export default PartnerOpportunities;

import React from "react";
import { motion } from "framer-motion"; // Make sure to install framer-motion
import { Handshake, Globe, TrendingUp, Users, CheckCircle, FileText, Gift, Award, LogIn, Mail } from "lucide-react";

// Reuse existing Layout Components
import NavBar from "../Revayah/NavBar";
import Footer from "../Revayah/Footer";
import PartnerImage from "../../assets/images/partner-program.png"; // Example image import

const PartnerOpportunities = () => {
    // Animation variants
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerContainer = {
        animate: { transition: { staggerChildren: 0.1 } }
    };

    return (
        <div className="font-sans text-base text-slate-800 bg-white dark:text-slate-100 dark:bg-slate-900 h-screen overflow-y-auto flex flex-col scroll-smooth">
            <NavBar />

            <main className="flex-grow w-full pt-10">
                
                {/* --- 1. HERO SECTION --- */}
                <section className="relative py-20 lg:py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden">
                    {/* Background Decor - Following DigitalCard style */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-50 dark:bg-rose-900/10 rounded-l-full opacity-60 translate-x-1/3 z-0"></div>
                    <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-3xl"></div>

                    <motion.div 
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="container max-w-7xl px-4 mx-auto relative z-10 text-center"
                    >
                        <motion.h5 variants={fadeIn} className="text-rosey-600 dark:text-rose-400 font-bold tracking-widest uppercase mb-4 text-sm">
                            Reva-Yah Partner Program (RPP)
                        </motion.h5>
                        <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-semibold mb-6 leading-tight text-slate-900 dark:text-white">
                            Partner with the Future of <br/> <span className="text-rosey-600">Digital Identity</span>
                        </motion.h1>
                        <motion.p variants={fadeIn} className="text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
                            Reva-Yah Partnering Program is designed to make more successful & promote Reva-Yah services & products in India. We welcome all the enterprising enthusiasts to grow their business under our single platform.
                        </motion.p>
                        <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-4">
                            <button className="py-2 px-6 bg-rosey-600 text-white rounded font-medium hover:bg-rose-700 transition shadow-lg shadow-rose-500/30 active:scale-95">
                                Apply Now
                            </button>
                            <button className="py-2 px-6 bg-white text-rosey-600 border border-slate-200 hover:border-rose-200 rounded font-medium hover:bg-slate-50 transition active:scale-95">
                                Learn More
                            </button>
                        </motion.div>
                    </motion.div>
                </section>

                {/* --- 2. ABOUT PROGRAM --- */}
                <section className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
                    <div className="container max-w-7xl px-4 mx-auto relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div 
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                                    Grow Your Business With Us
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                    We authorize you to represent us and promote the products & services as required by the client. Spread your work from home or from your own office just by managing your client base and offering our innovative products & services.
                                </p>
                                <p className="text-lg text-slate-600 dark:text-slate-300 font-medium border-l-4 border-rose-500 pl-4 bg-rose-50/50 dark:bg-rose-900/10 py-2">
                                    Enjoy the facility to earn unlimited & recurring income. Be your own boss and establish an earning mechanism without any initial expense.
                                </p>
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
                                    <img 
                                        src={PartnerImage} 
                                        alt="Partnership" 
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                {/* Decorative circle behind image */}
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl z-[-1]"></div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* --- 3. WHY US & ADVANTAGES --- */}
                <section className="py-24 bg-slate-50 dark:bg-slate-800/50 relative">
                    <div className="container max-w-7xl px-4 mx-auto">
                        <div className="grid md:grid-cols-2 gap-16">
                            {/* Why Us */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 p-2 rounded-lg"><Globe className="size-6"/></span> Why Us?
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        "Wide range of products & services offered for businesses of all kinds & all stages.",
                                        "A unique opportunity to become a channel partner in your respective region.",
                                        "Unlimited earning potential.",
                                        "Continuous R & D on new products & services.",
                                        "Access to featured products."
                                    ].map((item, i) => (
                                        <motion.li 
                                            key={i} 
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
                                        >
                                            <CheckCircle className="size-5 text-blue-600 shrink-0 mt-0.5"/>
                                            <span>{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Advantages */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                    <span className="bg-rose-100 dark:bg-rose-900/30 text-rosey-600 p-2 rounded-lg"><TrendingUp className="size-6"/></span> Advantages
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        "Be your own boss",
                                        "Unlimited & recurring earning potential",
                                        "Zero investment in infrastructure",
                                        "Function from home or office with flexible timing",
                                        "Wide range of products & services",
                                        "Professional back-end support"
                                    ].map((item, i) => (
                                        <motion.li 
                                            key={i} 
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
                                        >
                                            <CheckCircle className="size-5 text-rosey-600 shrink-0 mt-0.5"/>
                                            <span>{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* --- 4. PARTNERSHIP OPPORTUNITIES --- */}
                <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden" id="models">
                    {/* Background decor */}
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl"></div>
                    
                    <div className="container max-w-7xl px-4 mx-auto relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Partnering Opportunities</h2>
                            <p className="text-slate-600 dark:text-slate-400">Choose the model that fits your business goals.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Franchise */}
                            <motion.div whileHover={{ y: -10 }} className="p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all bg-slate-50 dark:bg-slate-800 flex flex-col">
                                <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/30 text-rosey-600 rounded-lg flex items-center justify-center mb-6">
                                    <Globe className="size-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Franchisee (RFP)</h3>
                                <div className="text-2xl font-bold text-rosey-600 mb-4">10,000 INR <span className="text-xs text-slate-500 font-normal line-through">Fees</span></div>
                                <ul className="space-y-3 mb-8 flex-grow text-sm text-slate-600 dark:text-slate-300">
                                    <li className="flex items-start gap-2"><CheckCircle className="size-4 text-rose-500 shrink-0 mt-0.5"/> Regional Promotion</li>
                                    <li className="flex items-start gap-2"><CheckCircle className="size-4 text-rose-500 shrink-0 mt-0.5"/> Develop Channel Partners</li>
                                    <li className="flex items-start gap-2"><CheckCircle className="size-4 text-rose-500 shrink-0 mt-0.5"/> Corporate Sales Focus</li>
                                </ul>
                                <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/30 p-3 rounded-lg mb-6 text-center">
                                    <p className="text-xs font-semibold text-rose-700 dark:text-rose-400 uppercase">Zero fees till March 31st 2026</p>
                                </div>
                                <button className="w-full py-2.5 bg-rosey-600 text-white rounded-lg font-medium hover:bg-rose-700 transition">APPLY NOW</button>
                            </motion.div>

                            {/* Channel Partner - Popular */}
                            <motion.div 
                                initial={{ y: 0 }}
                                whileInView={{ y: -16 }}
                                whileHover={{ y: -24 }}
                                className="p-8 rounded-2xl border-2 border-blue-500 shadow-xl relative bg-white dark:bg-slate-800 flex flex-col z-20"
                            >
                                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
                                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                                    <Handshake className="size-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Channel Partner (RCP)</h3>
                                <div className="text-2xl font-bold text-blue-600 mb-4">5,000 INR <span className="text-xs text-slate-500 font-normal line-through">Fees</span></div>
                                <ul className="space-y-3 mb-8 flex-grow text-sm text-slate-600 dark:text-slate-300">
                                    <li className="flex items-start gap-2"><CheckCircle className="size-4 text-blue-500 shrink-0 mt-0.5"/> Regional Sales & Support</li>
                                    <li className="flex items-start gap-2"><CheckCircle className="size-4 text-blue-500 shrink-0 mt-0.5"/> Unlimited Earning Potential</li>
                                </ul>
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 p-3 rounded-lg mb-6 text-center">
                                    <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase">Zero fees till March 31st 2026</p>
                                </div>
                                <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">APPLY NOW</button>
                            </motion.div>

                            {/* Referral */}
                            <motion.div whileHover={{ y: -10 }} className="p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all bg-slate-50 dark:bg-slate-800 flex flex-col">
                                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg flex items-center justify-center mb-6">
                                    <Users className="size-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Referral Partner (RRP)</h3>
                                <div className="text-2xl font-bold text-green-600 mb-4">No Fees</div>
                                <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm leading-relaxed flex-grow">
                                    Just refer Reva-Yah services to your network and earn one-time commissions.
                                </p>
                                <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 p-3 rounded-lg mb-6 text-center">
                                    <p className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase">Be part of the future</p>
                                </div>
                                <button className="w-full py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">APPLY NOW</button>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* --- 5. HOW TO BECOME PARTNER (STAGGERED STEPS) --- */}
                <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
                    <div className="container max-w-7xl px-4 mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-16 text-slate-900 dark:text-white">How to become Reva-Yah Partner</h2>
                        
                        <motion.div 
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
                        >
                            {[
                                { step: "Step 1", title: "Become a member", desc: "Join Reva-Yah and register your interest." },
                                { step: "Step 2", title: "Information", desc: "Tell us about your company and background." },
                                { step: "Step 3", title: "Register", desc: "Accept terms and conditions to proceed." },
                                { step: "Step 4", title: "Complete KYC", desc: "Submit documents for verification." },
                                { step: "Step 5", title: "Pay Fees", desc: "Pay partners fees where applicable." },
                                { step: "Step 6", title: "Partner Account", desc: "Receive your unique partner credentials." },
                                { step: "Step 7", title: "Get Trained", desc: "Get trained by professionals and start." },
                                { step: "Step 8", title: "Launch", desc: "Begin your journey as an official partner." },
                            ].map((item, idx) => (
                                <motion.div 
                                    variants={fadeIn}
                                    key={idx} 
                                    className="bg-white dark:bg-slate-700 p-6 rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm hover:border-rose-300 transition-colors"
                                >
                                    <span className="text-xs font-bold text-rose-500 uppercase tracking-widest block mb-2">{item.step}</span>
                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* --- 6. WHAT YOU GET --- */}
                <section className="py-20 bg-white dark:bg-slate-900">
                    <div className="container max-w-4xl px-4 mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-10 text-slate-900 dark:text-white">Partner Benefits</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { icon: Award, label: "Certificate", color: "text-blue-600" },
                                { icon: FileText, label: "Marketing", color: "text-orange-600" },
                                { icon: Gift, label: "Product Access", color: "text-rose-600" },
                                { icon: LogIn, label: "Login Access", color: "text-green-600" }
                            ].map((item, i) => (
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    key={i} 
                                    className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-3 shadow-sm"
                                >
                                    <item.icon className={`size-8 ${item.color}`}/>
                                    <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">{item.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- 7. NEW ANIMATED CONTACT BANNER (Replaced Form) --- */}
                <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden relative">
                     {/* Decorative Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 bg-rose-600/5 -rotate-6 z-0"></div>

                    <div className="container max-w-5xl px-4 mx-auto relative z-10">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-rosey-600 to-rose-700 rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl shadow-rose-500/20"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm"
                            >
                                <Mail className="size-10 text-white" />
                            </motion.div>
                            
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
                            <p className="text-lg text-rose-100 mb-10 max-w-2xl mx-auto">
                                Reach out to us directly via email or phone to submit your partnership application.
                            </p>
                            
                            <div className="flex flex-wrap justify-center gap-6">
                                <a href="mailto:shilajit.roy@gravitywavelabs.com" className="bg-white text-rosey-600 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition shadow-lg active:scale-95">
                                    Email Us Now
                                </a>
                                <div className="bg-rose-800/40 backdrop-blur-md border border-white/20 px-8 py-3 rounded-full font-semibold">
                                    Call: 020 – 6732 0467
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

            </main>
            
            <Footer />
        </div>
    );
};

export default PartnerOpportunities;