// import React from "react";
// import { Link } from "react-router-dom";
// import { 
//     FileText, 
//     Palette, 
//     Globe, 
//     TrendingUp, 
//     Award, 
//     Share2, 
//     PenTool, 
//     Search, 
//     Briefcase,
//     Layout
// } from "lucide-react";

// // Reuse existing Layout Components
// import NavBar from "../Revayah/NavBar";
// import Footer from "../Revayah/Footer";

// const ResumeBuilder = () => {
//     return (
//         <div className="font-sans text-base text-slate-800 bg-white dark:text-slate-100 dark:bg-slate-900 h-screen overflow-y-auto flex flex-col">
//             <NavBar />

//             <main className="flex-grow w-full pt-20">
                
//                 {/* --- 1. HERO SECTION --- */}
//                 <section className="relative py-20 lg:py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden">
//                     {/* Background Decor */}
//                     <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
//                         <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-orange-500/5 rounded-full blur-3xl"></div>
//                         <div className="absolute top-[20%] right-[5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-3xl"></div>
//                     </div>

//                     <div className="container max-w-7xl px-4 mx-auto relative z-10">
//                         <div className="grid lg:grid-cols-2 gap-12 items-center">
//                             <div>
//                                 <h5 className="text-orange-600 dark:text-orange-400 font-bold tracking-widest uppercase mb-4 text-sm">
//                                     Reva-Yah Resume Builder
//                                 </h5>
//                                 <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
//                                     Create a <span className="text-orange-600">Job-Ready Resume</span> That Speaks About You
//                                 </h1>
//                                 <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
//                                     Rresume is a web resume, a digital form of your resume over the World Wide Web. Build the perfect resume in minutes with our Rresume builder.
//                                 </p>
//                                 <div className="flex flex-wrap gap-4">
//                                     <button className="px-8 py-3 bg-orange-600 text-white rounded font-medium hover:bg-orange-700 transition shadow-lg shadow-orange-500/30">
//                                         Start Now
//                                     </button>
//                                     <button className="px-8 py-3 bg-white text-orange-600 border border-slate-200 hover:border-orange-200 rounded font-medium hover:bg-slate-50 transition">
//                                         View Templates
//                                     </button>
//                                 </div>
//                             </div>
                            
//                             {/* Hero Image Placeholder */}
//                             <div className="relative">
//                                 <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 aspect-[4/3] flex items-center justify-center">
//                                     {/* Replace src with actual resume builder screenshot */}
//                                     <img 
//                                         src="https://placehold.co/800x600/fff7ed/ea580c?text=Resume+Builder+UI" 
//                                         alt="Rresume Builder Interface" 
//                                         className="w-full h-full object-cover"
//                                     />
//                                 </div>
//                                 {/* Floating Badge */}
//                                 <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
//                                     <div className="p-2 bg-green-100 rounded-full text-green-600">
//                                         <CheckCircleIcon /> 
//                                     </div>
//                                     <div>
//                                         <p className="font-bold text-slate-800 dark:text-white">ATS Friendly</p>
//                                         <p className="text-xs text-slate-500">Optimized for algorithms</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* --- 2. HOW IT WORKS (3 Steps) --- */}
//                 <section className="py-20 bg-white dark:bg-slate-900">
//                     <div className="container max-w-7xl px-4 mx-auto text-center">
//                         <h2 className="text-3xl font-bold mb-16 text-slate-800 dark:text-slate-50">Create your resume in 3 simple steps</h2>
                        
//                         <div className="grid md:grid-cols-3 gap-8 relative">
//                             {/* Connector Line (Desktop) */}
//                             <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-slate-200 dark:border-slate-700 z-0"></div>

//                             {[
//                                 { 
//                                     icon: <Layout className="size-8 text-orange-600" />, 
//                                     title: "Select a Template", 
//                                     desc: "Choose from our professional, recruiter-approved designs." 
//                                 },
//                                 { 
//                                     icon: <PenTool className="size-8 text-blue-600" />, 
//                                     title: "Build Your Resume", 
//                                     desc: "Simply type your information into the system using our easy editor." 
//                                 },
//                                 { 
//                                     icon: <Share2 className="size-8 text-green-600" />, 
//                                     title: "Save & Share", 
//                                     desc: "Download as PDF, print, or share your personal URL instantly." 
//                                 }
//                             ].map((step, idx) => (
//                                 <div key={idx} className="relative z-10 flex flex-col items-center">
//                                     <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700 shadow-lg flex items-center justify-center mb-6">
//                                         {step.icon}
//                                     </div>
//                                     <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
//                                     <p className="text-slate-600 dark:text-slate-400 max-w-xs">{step.desc}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </section>

//                 {/* --- 3. FEATURES GRID --- */}
//                 <section className="py-24 bg-slate-50 dark:bg-slate-800/50">
//                     <div className="container max-w-7xl px-4 mx-auto">
//                         <div className="text-center mb-16">
//                             <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-50">Why Choose Rresume?</h2>
//                             <p className="text-lg text-slate-600 dark:text-slate-300">More than just a document—it's your personal professional website.</p>
//                         </div>

//                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                             <FeatureCard 
//                                 icon={<Palette className="size-6 text-purple-600" />}
//                                 title="Room for Self-Expression"
//                                 desc="The look, feel, and message are entirely up to you. You aren't bound by the space of a single sheet of paper."
//                             />
//                             <FeatureCard 
//                                 icon={<Briefcase className="size-6 text-blue-600" />}
//                                 title="Display Your Portfolio"
//                                 desc="Upload photos, artwork, videos, and certificates. A traditional resume has no room for these vital assets."
//                             />
//                             <FeatureCard 
//                                 icon={<Globe className="size-6 text-green-600" />}
//                                 title="Personal Web URL"
//                                 desc="Give hiring managers access to your entire professional portfolio all in one place with a unique link."
//                             />
//                             <FeatureCard 
//                                 icon={<TrendingUp className="size-6 text-red-600" />}
//                                 title="Grows With You"
//                                 desc="Edit content anytime, anywhere. Keep your resume up to date easily as your career progresses."
//                             />
//                             <FeatureCard 
//                                 icon={<Award className="size-6 text-yellow-600" />}
//                                 title="Better Impression"
//                                 desc="Loaded with features that ensure you stand out during employer searches compared to static PDFs."
//                             />
//                             <FeatureCard 
//                                 icon={<Share2 className="size-6 text-cyan-600" />}
//                                 title="Share & Download"
//                                 desc="Share via email, WhatsApp, or social media, and export as a PDF to apply directly to employers."
//                             />
//                         </div>
//                     </div>
//                 </section>

//                 {/* --- 4. ADDITIONAL SERVICES (Split) --- */}
//                 <section className="py-0 bg-white dark:bg-slate-900">
//                     <div className="grid md:grid-cols-2">
//                         {/* Resume Writer Service */}
//                         <div className="p-12 lg:p-20 bg-slate-100 dark:bg-slate-800 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700">
//                             <div className="max-w-md mx-auto">
//                                 <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg mb-6">
//                                     <PenTool className="size-6" />
//                                 </div>
//                                 <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Resume Writer</h3>
//                                 <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
//                                     Not finding the right words to showcase yourself? We provide professional resume writing services to help you tell your story.
//                                 </p>
//                                 <button className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded font-medium hover:opacity-90 transition">
//                                     Explore Services
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Job Search Service */}
//                         <div className="p-12 lg:p-20 bg-orange-50 dark:bg-slate-900 flex flex-col justify-center">
//                             <div className="max-w-md mx-auto">
//                                 <div className="inline-flex p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg mb-6">
//                                     <Search className="size-6" />
//                                 </div>
//                                 <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Your Dream Job is Waiting</h3>
//                                 <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
//                                     We’ve partnered with <strong>fingertipsjobs.com</strong> to bring you the most results in a single search. No need to visit multiple job boards.
//                                 </p>
//                                 <button className="px-6 py-3 bg-orange-600 text-white rounded font-medium hover:bg-orange-700 transition">
//                                     Search Jobs
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* --- 5. CTA --- */}
//                 <section className="py-20 bg-slate-900 text-center relative overflow-hidden">
//                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-orange-500/10 blur-3xl rounded-full pointer-events-none"></div>
//                     <div className="container max-w-4xl px-4 mx-auto relative z-10">
//                         <h2 className="text-3xl font-bold mb-4 font-sans text-white">
//                             Enough thinking. Let's get you hired.
//                         </h2>
//                         <p className="mb-8 text-slate-400 font-sans text-lg">
//                             Build your professional digital identity today with Rresume.
//                         </p>
//                         <button className="px-10 py-4 bg-white text-slate-900 font-bold rounded shadow-lg hover:bg-slate-100 transition-colors">
//                             Build My Resume
//                         </button>
//                     </div>
//                 </section>

//             </main>
            
//             <Footer />
//         </div>
//     );
// };

// // Internal Sub-component for features
// const FeatureCard = ({ icon, title, desc }) => (
//     <div className="p-8 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md transition-shadow">
//         <div className="mb-4 bg-slate-50 dark:bg-slate-600 w-fit p-3 rounded-lg">
//             {icon}
//         </div>
//         <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h4>
//         <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{desc}</p>
//     </div>
// );

// // Simple check icon for the badge
// const CheckCircleIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg>
// );

// export default ResumeBuilder;

// import React from "react";
// import { Link } from "react-router-dom";
// import { 
//     FileText, 
//     Palette, 
//     Globe, 
//     TrendingUp, 
//     Award, 
//     Share2, 
//     PenTool, 
//     Search, 
//     Briefcase,
//     Layout
// } from "lucide-react";

// // Reuse existing Layout Components
// import NavBar from "../Revayah/NavBar";
// import Footer from "../Revayah/Footer";

// const ResumeBuilder = () => {
//     return (
//         <div className="font-sans text-base text-slate-800 bg-white dark:text-slate-100 dark:bg-slate-900 h-screen overflow-y-auto flex flex-col">
//             <NavBar />

//             <main className="flex-grow w-full pt-20">
                
//                 {/* --- 1. HERO SECTION --- */}
//                 <section className="relative py-20 lg:py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden">
//                     {/* Background Decor */}
//                     <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
//                         <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-rose-500/5 rounded-full blur-3xl"></div>
//                         <div className="absolute top-[20%] right-[5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-3xl"></div>
//                     </div>

//                     <div className="container max-w-7xl px-4 mx-auto relative z-10">
//                         <div className="grid lg:grid-cols-2 gap-12 items-center">
//                             <div>
//                                 <h5 className="text-rose-600 dark:text-rose-400 font-bold tracking-widest uppercase mb-4 text-sm">
//                                     Reva-Yah Resume Builder
//                                 </h5>
//                                 <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
//                                     Create a <span className="text-rose-600">Job-Ready Resume</span> That Speaks About You
//                                 </h1>
//                                 <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
//                                     Rresume is a web resume, a digital form of your resume over the World Wide Web. Build the perfect resume in minutes with our Rresume builder.
//                                 </p>
//                                 <div className="flex flex-wrap gap-4">
//                                     {/* Updated Button Sizes & Color */}
//                                     <button className="px-6 py-2.5 bg-rose-600 text-white rounded font-medium hover:bg-rose-700 transition shadow-lg shadow-rose-500/30">
//                                         Start Now
//                                     </button>
//                                     <button className="px-6 py-2.5 bg-white text-rose-600 border border-slate-200 hover:border-rose-200 rounded font-medium hover:bg-slate-50 transition">
//                                         View Templates
//                                     </button>
//                                 </div>
//                             </div>
                            
//                             {/* Hero Image Placeholder */}
//                             <div className="relative">
//                                 <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 aspect-[4/3] flex items-center justify-center">
//                                     {/* Replace src with actual resume builder screenshot */}
//                                     <img 
//                                         src="https://placehold.co/800x600/fff1f2/e11d48?text=Resume+Builder+UI" 
//                                         alt="Rresume Builder Interface" 
//                                         className="w-full h-full object-cover"
//                                     />
//                                 </div>
//                                 {/* Floating Badge */}
//                                 <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
//                                     <div className="p-2 bg-green-100 rounded-full text-green-600">
//                                         <CheckCircleIcon /> 
//                                     </div>
//                                     <div>
//                                         <p className="font-bold text-slate-800 dark:text-white">ATS Friendly</p>
//                                         <p className="text-xs text-slate-500">Optimized for algorithms</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* --- 2. HOW IT WORKS (3 Steps) --- */}
//                 <section className="py-20 bg-white dark:bg-slate-900">
//                     <div className="container max-w-7xl px-4 mx-auto text-center">
//                         <h2 className="text-3xl font-bold mb-16 text-slate-800 dark:text-slate-50">Create your resume in 3 simple steps</h2>
                        
//                         <div className="grid md:grid-cols-3 gap-8 relative">
//                             {/* Connector Line (Desktop) */}
//                             <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-slate-200 dark:border-slate-700 z-0"></div>

//                             {[
//                                 { 
//                                     icon: <Layout className="size-8 text-rose-600" />, 
//                                     title: "Select a Template", 
//                                     desc: "Choose from our professional, recruiter-approved designs." 
//                                 },
//                                 { 
//                                     icon: <PenTool className="size-8 text-blue-600" />, 
//                                     title: "Build Your Resume", 
//                                     desc: "Simply type your information into the system using our easy editor." 
//                                 },
//                                 { 
//                                     icon: <Share2 className="size-8 text-green-600" />, 
//                                     title: "Save & Share", 
//                                     desc: "Download as PDF, print, or share your personal URL instantly." 
//                                 }
//                             ].map((step, idx) => (
//                                 <div key={idx} className="relative z-10 flex flex-col items-center">
//                                     <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700 shadow-lg flex items-center justify-center mb-6">
//                                         {step.icon}
//                                     </div>
//                                     <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
//                                     <p className="text-slate-600 dark:text-slate-400 max-w-xs">{step.desc}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </section>

//                 {/* --- 3. FEATURES GRID --- */}
//                 <section className="py-24 bg-slate-50 dark:bg-slate-800/50">
//                     <div className="container max-w-7xl px-4 mx-auto">
//                         <div className="text-center mb-16">
//                             <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-50">Why Choose Rresume?</h2>
//                             <p className="text-lg text-slate-600 dark:text-slate-300">More than just a document—it's your personal professional website.</p>
//                         </div>

//                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                             <FeatureCard 
//                                 icon={<Palette className="size-6 text-purple-600" />}
//                                 title="Room for Self-Expression"
//                                 desc="The look, feel, and message are entirely up to you. You aren't bound by the space of a single sheet of paper."
//                             />
//                             <FeatureCard 
//                                 icon={<Briefcase className="size-6 text-blue-600" />}
//                                 title="Display Your Portfolio"
//                                 desc="Upload photos, artwork, videos, and certificates. A traditional resume has no room for these vital assets."
//                             />
//                             <FeatureCard 
//                                 icon={<Globe className="size-6 text-green-600" />}
//                                 title="Personal Web URL"
//                                 desc="Give hiring managers access to your entire professional portfolio all in one place with a unique link."
//                             />
//                             <FeatureCard 
//                                 icon={<TrendingUp className="size-6 text-red-600" />}
//                                 title="Grows With You"
//                                 desc="Edit content anytime, anywhere. Keep your resume up to date easily as your career progresses."
//                             />
//                             <FeatureCard 
//                                 icon={<Award className="size-6 text-yellow-600" />}
//                                 title="Better Impression"
//                                 desc="Loaded with features that ensure you stand out during employer searches compared to static PDFs."
//                             />
//                             <FeatureCard 
//                                 icon={<Share2 className="size-6 text-cyan-600" />}
//                                 title="Share & Download"
//                                 desc="Share via email, WhatsApp, or social media, and export as a PDF to apply directly to employers."
//                             />
//                         </div>
//                     </div>
//                 </section>

//                 {/* --- 4. ADDITIONAL SERVICES (Split) --- */}
//                 <section className="py-0 bg-white dark:bg-slate-900">
//                     <div className="grid md:grid-cols-2">
//                         {/* Resume Writer Service */}
//                         <div className="p-12 lg:p-20 bg-slate-100 dark:bg-slate-800 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700">
//                             <div className="max-w-md mx-auto">
//                                 <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg mb-6">
//                                     <PenTool className="size-6" />
//                                 </div>
//                                 <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Resume Writer</h3>
//                                 <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
//                                     Not finding the right words to showcase yourself? We provide professional resume writing services to help you tell your story.
//                                 </p>
//                                 <button className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded font-medium hover:opacity-90 transition">
//                                     Explore Services
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Job Search Service */}
//                         <div className="p-12 lg:p-20 bg-rose-50 dark:bg-slate-900 flex flex-col justify-center">
//                             <div className="max-w-md mx-auto">
//                                 <div className="inline-flex p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 rounded-lg mb-6">
//                                     <Search className="size-6" />
//                                 </div>
//                                 <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Your Dream Job is Waiting</h3>
//                                 <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
//                                     We’ve partnered with <strong>fingertipsjobs.com</strong> to bring you the most results in a single search. No need to visit multiple job boards.
//                                 </p>
//                                 <button className="px-6 py-2.5 bg-rose-600 text-white rounded font-medium hover:bg-rose-700 transition">
//                                     Search Jobs
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* --- 5. CTA --- */}
//                 <section className="py-20 bg-slate-900 text-center relative overflow-hidden">
//                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-rose-500/10 blur-3xl rounded-full pointer-events-none"></div>
//                     <div className="container max-w-4xl px-4 mx-auto relative z-10">
//                         <h2 className="text-3xl font-bold mb-4 font-sans text-white">
//                             Enough thinking. Let's get you hired.
//                         </h2>
//                         <p className="mb-8 text-slate-400 font-sans text-lg">
//                             Build your professional digital identity today with Rresume.
//                         </p>
//                         <button className="px-8 py-3 bg-white text-slate-900 font-bold rounded shadow-lg hover:bg-slate-100 transition-colors">
//                             Build My Resume
//                         </button>
//                     </div>
//                 </section>

//             </main>
            
//             <Footer />
//         </div>
//     );
// };

// // Internal Sub-component for features
// const FeatureCard = ({ icon, title, desc }) => (
//     <div className="p-8 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md transition-shadow">
//         <div className="mb-4 bg-slate-50 dark:bg-slate-600 w-fit p-3 rounded-lg">
//             {icon}
//         </div>
//         <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h4>
//         <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{desc}</p>
//     </div>
// );

// // Simple check icon for the badge
// const CheckCircleIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg>
// );

// export default ResumeBuilder;

import React from "react";
import { Link } from "react-router-dom";
import { 
    FileText, 
    Palette, 
    Globe, 
    TrendingUp, 
    Award, 
    Share2, 
    PenTool, 
    Search, 
    Briefcase,
    Layout
} from "lucide-react";

// Reuse existing Layout Components
import NavBar from "../Revayah/NavBar";
import Footer from "../Revayah/Footer";

const ResumeBuilder = () => {
    return (
        <div className="font-sans text-base text-slate-800 bg-white dark:text-slate-100 dark:bg-slate-900 h-screen overflow-y-auto flex flex-col">
            <NavBar />

            <main className="flex-grow w-full pt-10">
                
                {/* --- 1. HERO SECTION --- */}
                <section className="relative py-20 lg:py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden">
                    {/* Background Decor */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-rose-500/5 rounded-full blur-3xl"></div>
                        <div className="absolute top-[20%] right-[5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-3xl"></div>
                    </div>

                    <div className="container max-w-7xl px-4 mx-auto relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h5 className="text-rose-600 dark:text-rose-400 font-bold tracking-widest uppercase mb-4 text-sm">
                                    Reva-Yah Resume Builder
                                </h5>
                                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                                    Create a <span className="text-rose-600">Job-Ready Resume</span> That Speaks About You
                                </h1>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                                    Rresume is a web resume, a digital form of your resume over the World Wide Web. Build the perfect resume in minutes with our Rresume builder.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    {/* Updated Button Sizes & Color (Rose) */}
                                    <button className="px-6 py-2.5 bg-rose-600 text-white rounded font-medium hover:bg-rose-700 transition shadow-lg shadow-rose-500/30">
                                        Start Now
                                    </button>
                                    <button className="px-6 py-2.5 bg-white text-rose-600 border border-slate-200 hover:border-rose-200 rounded font-medium hover:bg-slate-50 transition">
                                        View Templates
                                    </button>
                                </div>
                            </div>
                            
                            {/* Hero Image Placeholder */}
                            <div className="relative">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 aspect-[4/3] flex items-center justify-center">
                                    {/* Replace src with actual resume builder screenshot */}
                                    <img 
                                        src="https://placehold.co/800x600/fff1f2/e11d48?text=Resume+Builder+UI" 
                                        alt="Rresume Builder Interface" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Floating Badge */}
                                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-full text-green-600">
                                        <CheckCircleIcon /> 
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 dark:text-white">ATS Friendly</p>
                                        <p className="text-xs text-slate-500">Optimized for algorithms</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 2. HOW IT WORKS (3 Steps) --- */}
                <section className="py-20 bg-white dark:bg-slate-900">
                    <div className="container max-w-7xl px-4 mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-16 text-slate-800 dark:text-slate-50">Create your resume in 3 simple steps</h2>
                        
                        <div className="grid md:grid-cols-3 gap-8 relative">
                            {/* Connector Line (Desktop) */}
                            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-slate-200 dark:border-slate-700 z-0"></div>

                            {[
                                { 
                                    icon: <Layout className="size-8 text-rose-600" />, 
                                    title: "Select a Template", 
                                    desc: "Choose from our professional, recruiter-approved designs." 
                                },
                                { 
                                    icon: <PenTool className="size-8 text-blue-600" />, 
                                    title: "Build Your Resume", 
                                    desc: "Simply type your information into the system using our easy editor." 
                                },
                                { 
                                    icon: <Share2 className="size-8 text-green-600" />, 
                                    title: "Save & Share", 
                                    desc: "Download as PDF, print, or share your personal URL instantly." 
                                }
                            ].map((step, idx) => (
                                <div key={idx} className="relative z-10 flex flex-col items-center">
                                    <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700 shadow-lg flex items-center justify-center mb-6">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 max-w-xs">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- 3. FEATURES GRID --- */}
                <section className="py-24 bg-slate-50 dark:bg-slate-800/50">
                    <div className="container max-w-7xl px-4 mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-50">Why Choose Rresume?</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300">More than just a document—it's your personal professional website.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureCard 
                                icon={<Palette className="size-6 text-purple-600" />}
                                title="Room for Self-Expression"
                                desc="The look, feel, and message are entirely up to you. You aren't bound by the space of a single sheet of paper."
                            />
                            <FeatureCard 
                                icon={<Briefcase className="size-6 text-blue-600" />}
                                title="Display Your Portfolio"
                                desc="Upload photos, artwork, videos, and certificates. A traditional resume has no room for these vital assets."
                            />
                            <FeatureCard 
                                icon={<Globe className="size-6 text-green-600" />}
                                title="Personal Web URL"
                                desc="Give hiring managers access to your entire professional portfolio all in one place with a unique link."
                            />
                            <FeatureCard 
                                icon={<TrendingUp className="size-6 text-red-600" />}
                                title="Grows With You"
                                desc="Edit content anytime, anywhere. Keep your resume up to date easily as your career progresses."
                            />
                            <FeatureCard 
                                icon={<Award className="size-6 text-yellow-600" />}
                                title="Better Impression"
                                desc="Loaded with features that ensure you stand out during employer searches compared to static PDFs."
                            />
                            <FeatureCard 
                                icon={<Share2 className="size-6 text-cyan-600" />}
                                title="Share & Download"
                                desc="Share via email, WhatsApp, or social media, and export as a PDF to apply directly to employers."
                            />
                        </div>
                    </div>
                </section>

                {/* --- 4. ADDITIONAL SERVICES (Split) --- */}
                <section className="py-0 bg-white dark:bg-slate-900">
                    <div className="grid md:grid-cols-2">
                        {/* Resume Writer Service */}
                        <div className="p-12 lg:p-20 bg-slate-100 dark:bg-slate-800 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700">
                            <div className="max-w-md mx-auto">
                                <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg mb-6">
                                    <PenTool className="size-6" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Resume Writer</h3>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                                    Not finding the right words to showcase yourself? We provide professional resume writing services to help you tell your story.
                                </p>
                                <button className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded font-medium hover:opacity-90 transition">
                                    Explore Services
                                </button>
                            </div>
                        </div>

                        {/* Job Search Service */}
                        <div className="p-12 lg:p-20 bg-rose-50 dark:bg-slate-900 flex flex-col justify-center">
                            <div className="max-w-md mx-auto">
                                <div className="inline-flex p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 rounded-lg mb-6">
                                    <Search className="size-6" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Your Dream Job is Waiting</h3>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                                    We’ve partnered with <strong>fingertipsjobs.com</strong> to bring you the most results in a single search. No need to visit multiple job boards.
                                </p>
                                <button className="px-6 py-2.5 bg-rose-600 text-white rounded font-medium hover:bg-rose-700 transition">
                                    Search Jobs
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 5. CTA --- */}
                <section className="py-20 bg-slate-900 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-rose-500/10 blur-3xl rounded-full pointer-events-none"></div>
                    <div className="container max-w-4xl px-4 mx-auto relative z-10">
                        <h2 className="text-3xl font-bold mb-4 font-sans text-white">
                            Enough thinking. Let's get you hired.
                        </h2>
                        <p className="mb-8 text-slate-400 font-sans text-lg">
                            Build your professional digital identity today with Rresume.
                        </p>
                        <button className="px-8 py-3 bg-white text-slate-900 font-bold rounded shadow-lg hover:bg-slate-100 transition-colors">
                            Build My Resume
                        </button>
                    </div>
                </section>

            </main>
            
            <Footer />
        </div>
    );
};

// Internal Sub-component for features
const FeatureCard = ({ icon, title, desc }) => (
    <div className="p-8 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md transition-shadow">
        <div className="mb-4 bg-slate-50 dark:bg-slate-600 w-fit p-3 rounded-lg">
            {icon}
        </div>
        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h4>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{desc}</p>
    </div>
);

// Simple check icon for the badge
const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg>
);

export default ResumeBuilder;