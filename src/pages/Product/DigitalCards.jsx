import React from "react";
import { Link } from "react-router-dom"; // 1. Import Link
import { 
    CreditCard, 
    Share2, 
    Smartphone, 
    User, 
    FileText, 
    ShoppingBag, 
    Layers, 
    RefreshCw, 
    Globe, 
    Check 
} from "lucide-react";

// Reuse your existing Layout Components
import NavBar from "../Revayah/NavBar";
import Footer from "../Revayah/Footer";

const DigitalCards = () => {
    return (
        <div className="font-sans text-base text-slate-800 bg-white dark:text-slate-100 dark:bg-slate-900 h-screen overflow-y-auto flex flex-col">
            <NavBar />

            <main className="flex-grow w-full pt-10">
                
                {/* --- 1. PRODUCT HERO --- */}
                <section className="relative py-20 lg:py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden">
                    {/* Background decor */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-50 dark:bg-rose-900/10 rounded-l-full opacity-60 translate-x-1/3"></div>

                    <div className="container max-w-7xl px-4 mx-auto relative z-10">
                        <div className="max-w-3xl">
                            <h5 className="text-rosey-600 dark:text-rose-400 font-bold tracking-widest uppercase mb-4 text-sm">
                                Revayah One – Digital Cards 
                            </h5>
                            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white mb-6">
                                Smart Digital Cards for the <br />
                                <span className="block mt-2 text-rosey-600">
                                    Modern World
                                </span>
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl">
                                Revayah One -Digital cards is a unified digital platform designed to simplify how individuals and businesses create, manage, and share their digital identity. 
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="#create-card" className="py-2 px-4 bg-rosey-600 text-white rounded font-medium hover:bg-rose-700 transition shadow-lg shadow-rose-500/30">
                                    Create Your Card
                                </a>
                                <a href="#view-samples" className="py-2 px-4 bg-white text-rosey-600 border border-dashed border-rose-200 rounded font-medium hover:bg-slate-50 transition">
                                    View Samples
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 2. THE PROBLEM & SOLUTION --- */}
                <section className="py-20 bg-white dark:bg-slate-900">
                    <div className="container max-w-7xl px-4 mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-50">
                                    One Smart, Hosted Digital Hub 
                                </h2>
                                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                    In a world where information is scattered across cards, documents, links, and profiles, Revayah One brings everything together into one smart, hosted digital hub. 
                                </p>
                                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                    From digital business cards and interactive catalogues to profile pages and resume builders, Revayah One enables users to present themselves professionally through a single, shareable link — accessible on smartphones, tablets, and computers, with no app required. 
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <Smartphone className="size-8 text-blue-500 mb-3" />
                                    <h4 className="font-bold text-slate-800 dark:text-slate-50 mb-1">No App Required </h4>
                                    <p className="text-sm text-slate-500">Accessible on all devices</p>
                                </div>
                                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 mt-8">
                                    <Share2 className="size-8 text-green-500 mb-3" />
                                    <h4 className="font-bold text-slate-800 dark:text-slate-50 mb-1">Single Link </h4>
                                    <p className="text-sm text-slate-500">Shareable everywhere</p>
                                </div>
                                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <RefreshCw className="size-8 text-yellow-500 mb-3" />
                                    <h4 className="font-bold text-slate-800 dark:text-slate-50 mb-1">Always Updated </h4>
                                    <p className="text-sm text-slate-500">Real-time changes</p>
                                </div>
                                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 mt-8">
                                    <Globe className="size-8 text-pink-500 mb-3" />
                                    <h4 className="font-bold text-slate-800 dark:text-slate-50 mb-1">Eco-Friendly </h4>
                                    <p className="text-sm text-slate-500">No paper waste</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 3. TARGET AUDIENCE --- */}
                <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
                    <div className="container max-w-7xl px-4 mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-50">Built For Everyone</h2>
                        <p className="text-lg text-slate-500 dark:text-slate-300 mb-12 max-w-3xl mx-auto">
                            Revayah One is built for professionals, entrepreneurs, startups, enterprises, educators, and job seekers, supporting both Indian and global use cases. 
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-3">
                            {["Professionals", "Entrepreneurs", "Startups", "Enterprises", "Educators", "Job Seekers"].map((tag, i) => (
                                <span key={i} className="px-5 py-2 rounded-full bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- 4. PRODUCT SUITE --- */}
                <section id="create-card" className="py-24 bg-white dark:bg-slate-900">
                    <div className="container max-w-7xl px-4 mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-50">Our Digital Products </h2>
                            <p className="text-slate-500 dark:text-slate-300">
                                At Revayah One, we believe one platform should be enough to represent who you are and what you do. 
                            </p>
                        </div>

                        <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Product 1 - Rbiz (LINKED TO NEW ROUTE) */}
                            <Link to="/revayah-business-card" className="group block p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:-translate-y-1 bg-white dark:bg-slate-800 cursor-pointer">
                                <div  className="size-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <CreditCard className="size-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Rbiz</h3>
                                <p className="text-slate-500 text-sm">Reva-Yah Business Card </p>
                                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">The ultimate digital visiting card solution for modern networking.</p>
                            </Link>

                            {/* Product 2 */}
                            <div className="group p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:-translate-y-1 bg-white dark:bg-slate-800">
                                <div className="size-12 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                    <User className="size-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Rpro</h3>
                                <p className="text-slate-500 text-sm">Reva-Yah Profile Builder </p>
                                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Create a comprehensive professional profile page in minutes.</p>
                            </div>

                            {/* Product 3 */}
                            <div className="group p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:-translate-y-1 bg-white dark:bg-slate-800">
                                <div className="size-12 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                    <ShoppingBag className="size-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Rcatalog</h3>
                                <p className="text-slate-500 text-sm">Reva-Yah Catalog </p>
                                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Showcase your products and services interactively.</p>
                            </div>

                            {/* Product 4 */}
                            <div className="group p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:-translate-y-1 bg-white dark:bg-slate-800">
                                <div className="size-12 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                    <FileText className="size-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Rresume</h3>
                                <p className="text-slate-500 text-sm">Reva-Yah Resume Builder </p>
                                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Build a standout digital resume to boost your career.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 5. CTA --- */}
                <section className="py-20 bg-white text-center">
                    <div className="container max-w-4xl px-4 mx-auto">
                        <h2 className="text-3xl font-bold text-zinc-800 mb-6">Upgrade Your Digital Identity Today</h2>
                        <p className="text-zinc-600 mb-8 text-lg">
                            Our platform replaces traditional paper and plastic formats with a flexible, eco-friendly, and always-updatable digital solution. 
                        </p>
                        <button className="px-8 py-3 bg-rosey-600 text-white font-bold rounded hover:bg-rose-700 transition">
                            Get Started Now
                        </button>
                    </div>
                </section>

            </main>
            
            <Footer />
        </div>
    );
};

export default DigitalCards;