import React from "react";
import { CreditCard, Building2, Layout, Hospital, GraduationCap } from "lucide-react";

// Import custom components
import NavBar from "./NavBar";
import Hero from "./Hero";
import Features from "./Features";
import UseCases from "./UseCases";
import Footer from "./Footer";

const RevayahHome = () => {

    // --- Data Configurations ---
    const featuresList = [
        {
            title: "Digital Identity Solutions",
            description: "Create and share smart digital cards for individuals and businesses—no paper, no printing, always up to date.",
            icon: <CreditCard className="size-8" />,
            points: [
                "Digital visiting cards",
                "Share via NFC, QR, or link",
                "Real-time updates"
            ],
            link: "/revayah-digital-cards"
        },
        {
            title: "NFC-Based Smart Campus",
            description: "Transform campuses with secure, contactless authentication using NFC cards or mobile NFC.",
            icon: <Building2 className="size-8" />,
            points: [
                "Access control (ICU, labs, hostels)",
                "Attendance & movement tracking",
                "Offline + online operation"
            ],
            link: "#smart-campus"
        },
        {
            title: "SaaS Platforms for Institutions",
            description: "Cloud-based software designed to simplify administration, improve security, and ensure compliance.",
            icon: <Layout className="size-8" />,
            points: [
                "Admin dashboards & Reports",
                "ERP / HMS / LMS integration",
                "Scalable & subscription-based"
            ],
            link: "#saas-platforms"
        }
    ];

    const useCasesList = [
        {
            category: "Hospitals",
            icon: <Hospital className="size-6 text-current" />,
            items: ["Secure ICU & OT access", "Doctor & nurse shift authentication", "Visitor control & audit trails"]
        },
        {
            category: "Schools & Colleges",
            icon: <GraduationCap className="size-6 text-current" />,
            items: ["Student entry/exit tracking", "Staff attendance", "Smart classrooms, labs & hostels"]
        },
        {
            category: "Enterprises",
            icon: <Building2 className="size-6 text-current" />,
            items: ["Employee access management", "Visitor authentication", "Multi-location control"]
        }
    ];

    return (
        <React.Fragment>
            {/* FIXED: Changed 'min-h-screen' to 'h-screen overflow-y-auto' to ensure scrolling works even if body is locked by theme */}
            <div className="font-sans text-base text-slate-800 bg-slate-50 dark:text-slate-100 dark:bg-slate-900 h-screen overflow-y-auto flex flex-col">
                
                <NavBar />

                <main className="flex-grow w-full">
                    <Hero />

                    {/* Trusted For Strip */}
                    <section className="py-8 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
                        <div className="container max-w-7xl px-4 mx-auto text-center ">
                            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Trusted For</p>
                            <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-80 text-slate-600 dark:text-slate-300">
                                <span className="flex items-center gap-2 font-medium font-sans"><Hospital className="size-5 "/> Hospitals</span>
                                <span className="flex items-center gap-2 font-medium font-sans"><GraduationCap className="size-5"/> Education</span>
                                <span className="flex items-center gap-2 font-medium font-sans"><Building2 className="size-5"/> Enterprises</span>
                            </div>
                        </div>
                    </section>

                    <Features
                        title="What We Offer"
                        subtitle="Comprehensive solutions connecting people, places, and systems."
                        features={featuresList}
                    />

                    {/* How It Works Section */}
                    <section className="py-10 bg-slate-50 dark:bg-slate-800/50">
                        <div className="container max-w-7xl px-4 mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-10 text-slate-800 dark:text-slate-50 font-sans">How Revayah One Works</h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                {[
                                    { step: "01", title: "Create Identity", desc: "Digital profile or NFC card" },
                                    { step: "02", title: "Authenticate", desc: "Tap card or mobile" },
                                    { step: "03", title: "Authorize", desc: "Role & time-based access" },
                                    { step: "04", title: "Track & Analyze", desc: "Real-time logs & reports" }
                                ].map((item, i) => (
                                    <div key={i} className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm border font-sans border-slate-100 dark:border-slate-700">
                                        <span className="text-4xl font-bold text-blue-200 block mb-2">{item.step}</span>
                                        <h4 className="font-bold text-lg mb-1 text-slate-800 dark:text-slate-50">{item.title}</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-300">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <UseCases data={useCasesList} />

                    {/* CTA Section */}
                    <section className="py-24 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-zinc-900 dark:to-black text-center">
  <div className="container max-w-7xl px-4 mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white font-sans">
      Ready to Go Contactless?
    </h2>

    <p className="mb-8 text-slate-600 dark:text-slate-400 font-sans max-w-2xl mx-auto">
      Upgrade your institution with smart identity and secure access.
    </p>

    <button className="px-8 py-3 rounded-md font-semibold font-sans
      bg-rosey-600 text-white
      hover:bg-pink-600
      dark:bg-white dark:text-black dark:hover:bg-slate-200
      transition-colors shadow-lg">
      Request a Demo
    </button>
  </div>
</section>

                </main>

                <Footer />
            </div>
        </React.Fragment>
    );
};

export default RevayahHome;

// import React from "react";
// import { CreditCard, Building2, Layout, Hospital, GraduationCap } from "lucide-react";

// // Import custom components
// import NavBar from "./NavBar";
// import Hero from "./Hero";
// import Features from "./Features";
// import UseCases from "./UseCases";
// import Footer from "./Footer";

// const RevayahHome = () => {

//     // --- Data Configurations ---
//     const featuresList = [
//         {
//             title: "Digital Identity Solutions",
//             description: "Create and share smart digital cards for individuals and businesses—no paper, no printing, always up to date.",
//             icon: <CreditCard className="size-8" />,
//             points: [
//                 "Digital visiting cards",
//                 "Share via NFC, QR, or link",
//                 "Real-time updates"
//             ],
//             link: "#digital-identity"
//         },
//         {
//             title: "NFC-Based Smart Campus",
//             description: "Transform campuses with secure, contactless authentication using NFC cards or mobile NFC.",
//             icon: <Building2 className="size-8" />,
//             points: [
//                 "Access control (ICU, labs, hostels)",
//                 "Attendance & movement tracking",
//                 "Offline + online operation"
//             ],
//             link: "#smart-campus"
//         },
//         {
//             title: "SaaS Platforms for Institutions",
//             description: "Cloud-based software designed to simplify administration, improve security, and ensure compliance.",
//             icon: <Layout className="size-8" />,
//             points: [
//                 "Admin dashboards & Reports",
//                 "ERP / HMS / LMS integration",
//                 "Scalable & subscription-based"
//             ],
//             link: "#saas-platforms"
//         }
//     ];

//     const useCasesList = [
//         {
//             category: "Hospitals",
//             icon: <Hospital className="size-6 text-current" />,
//             items: ["Secure ICU & OT access", "Doctor & nurse shift authentication", "Visitor control & audit trails"]
//         },
//         {
//             category: "Schools & Colleges",
//             icon: <GraduationCap className="size-6 text-current" />,
//             items: ["Student entry/exit tracking", "Staff attendance", "Smart classrooms, labs & hostels"]
//         },
//         {
//             category: "Enterprises",
//             icon: <Building2 className="size-6 text-current" />,
//             items: ["Employee access management", "Visitor authentication", "Multi-location control"]
//         }
//     ];

//     return (
//         <React.Fragment>
//             {/* Main Wrapper */}
//             <div className="font-sans text-base text-slate-800 bg-white dark:text-slate-100 dark:bg-slate-900 h-screen overflow-y-auto flex flex-col">
                
//                 <NavBar />

//                 <main className="flex-grow w-full">
//                     <Hero />

//                     {/* Trusted For Strip */}
//                     <section className="py-8 bg-slate-50 dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
//                         <div className="container max-w-7xl px-4 mx-auto text-center ">
//                             <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Trusted For</p>
//                             <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-80 text-slate-600 dark:text-slate-300">
//                                 <span className="flex items-center gap-2 font-medium font-sans"><Hospital className="size-5 "/> Hospitals</span>
//                                 <span className="flex items-center gap-2 font-medium font-sans"><GraduationCap className="size-5"/> Education</span>
//                                 <span className="flex items-center gap-2 font-medium font-sans"><Building2 className="size-5"/> Enterprises</span>
//                             </div>
//                         </div>
//                     </section>

//                     <Features
//                         title="What We Offer"
//                         subtitle="Comprehensive solutions connecting people, places, and systems."
//                         features={featuresList}
//                     />

//                     {/* How It Works Section */}
//                     <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
//                         <div className="container max-w-7xl px-4 mx-auto text-center">
//                             <h2 className="text-3xl font-bold mb-10 text-slate-800 dark:text-slate-50 font-sans">How Revayah One Works</h2>
//                             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//                                 {[
//                                     { step: "01", title: "Create Identity", desc: "Digital profile or NFC card" },
//                                     { step: "02", title: "Authenticate", desc: "Tap card or mobile" },
//                                     { step: "03", title: "Authorize", desc: "Role & time-based access" },
//                                     { step: "04", title: "Track & Analyze", desc: "Real-time logs & reports" }
//                                 ].map((item, i) => (
//                                     <div key={i} className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm border font-sans border-slate-100 dark:border-slate-700">
//                                         <span className="text-4xl font-bold text-blue-200 block mb-2">{item.step}</span>
//                                         <h4 className="font-bold text-lg mb-1 text-slate-800 dark:text-slate-50">{item.title}</h4>
//                                         <p className="text-sm text-slate-500 dark:text-slate-300">{item.desc}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </section>

//                     <UseCases data={useCasesList} />

//                     {/* CTA Section */}
//                     <section className="py-20 bg-blue-900 text-white text-center">
//                         <div className="container max-w-7xl px-4 mx-auto">
//                             <h2 className="text-3xl font-bold mb-4 font-sans">Ready to Go Contactless?</h2>
//                             <p className="mb-8 text-blue-200 font-sans">Upgrade your institution with smart identity and secure access.</p>
//                             <button className="px-8 py-3 bg-white text-blue-900 font-bold rounded shadow font-sans hover:bg-slate-100 transition-colors">
//                                 Request a Demo
//                             </button>
//                         </div>
//                     </section>
//                 </main>

//                 <Footer />
//             </div>
//         </React.Fragment>
//     );
// };

// export default RevayahHome;