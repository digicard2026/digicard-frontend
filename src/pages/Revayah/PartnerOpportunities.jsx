import React from "react";
import { Handshake, Globe, TrendingUp, Users, CheckCircle } from "lucide-react";

// Reuse existing Layout Components
import NavBar from "../Revayah/NavBar";
import Footer from "../Revayah/Footer";

const PartnerOpportunities = () => {
    return (
        <div className="font-sans text-base text-slate-800 bg-white dark:text-slate-100 dark:bg-slate-900 h-screen overflow-y-auto flex flex-col">
            <NavBar />

            <main className="flex-grow w-full pt-20">
                
                {/* --- HERO SECTION --- */}
                <section className="relative py-20 lg:py-32 bg-slate-900 overflow-hidden text-white">
                    {/* Background Decor */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/20 rounded-l-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-rose-600/10 rounded-r-full blur-3xl"></div>

                    <div className="container max-w-7xl px-4 mx-auto relative z-10 text-center">
                        <h5 className="text-rose-500 font-bold tracking-widest uppercase mb-4 text-sm">
                            Grow With Revayah One
                        </h5>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Partner with the Future of <br/> <span className="text-blue-400">Digital Identity</span>
                        </h1>
                        <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                            Join our network of innovators. Whether you are a reseller, system integrator, or franchise seeker, we have a growth path tailored for you.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="px-8 py-3 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
                                Apply Now
                            </button>
                            <button className="px-8 py-3 bg-transparent border border-slate-600 text-white rounded font-medium hover:bg-slate-800 transition">
                                Learn More
                            </button>
                        </div>
                    </div>
                </section>

                {/* --- PARTNERSHIP MODELS --- */}
                <section className="py-24 bg-white dark:bg-slate-900">
                    <div className="container max-w-7xl px-4 mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Partnership Models</h2>
                            <p className="text-slate-600 dark:text-slate-400">Choose how you want to collaborate with us.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Franchise */}
                            <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all hover:-translate-y-1 bg-slate-50 dark:bg-slate-800">
                                <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/30 text-rose-600 rounded-lg flex items-center justify-center mb-6">
                                    <Globe className="size-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Franchise Partner</h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-6">
                                    Own a region and represent Revayah One exclusively. Ideal for entrepreneurs looking for a high-growth business model.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><CheckCircle className="size-4 text-rose-500"/> Exclusive Territory Rights</li>
                                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><CheckCircle className="size-4 text-rose-500"/> Full Marketing Support</li>
                                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><CheckCircle className="size-4 text-rose-500"/> Recurring Revenue Share</li>
                                </ul>
                            </div>

                            {/* Channel Partner */}
                            <div className="p-8 rounded-2xl border-2 border-blue-500 shadow-xl relative bg-white dark:bg-slate-800">
                                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
                                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                                    <Handshake className="size-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Channel Partner</h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-6">
                                    For IT companies, consultants, and agencies who want to resell our solutions to their existing clients.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><CheckCircle className="size-4 text-blue-500"/> High Margin Commission</li>
                                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><CheckCircle className="size-4 text-blue-500"/> Sales & Tech Training</li>
                                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><CheckCircle className="size-4 text-blue-500"/> Co-branded Collaterals</li>
                                </ul>
                            </div>

                            {/* Referral */}
                            <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all hover:-translate-y-1 bg-slate-50 dark:bg-slate-800">
                                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg flex items-center justify-center mb-6">
                                    <Users className="size-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Referral Partner</h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-6">
                                    Simply refer a lead to us. If they convert, you earn. Perfect for freelancers and industry influencers.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><CheckCircle className="size-4 text-green-500"/> No Investment Needed</li>
                                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><CheckCircle className="size-4 text-green-500"/> Simple Lead Submission</li>
                                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><CheckCircle className="size-4 text-green-500"/> Instant Payouts</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- WHY PARTNER WITH US --- */}
                <section className="py-20 bg-slate-50 dark:bg-slate-900">
                    <div className="container max-w-7xl px-4 mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                                    Why Partner With Revayah One?
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                                    We provide the technology, support, and brand value you need to succeed in the booming digital identity market.
                                </p>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="shrink-0 size-12 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-rose-600 font-bold">1</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-lg">Growing Market Demand</h4>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm">Tap into the multi-billion dollar digital identity and SaaS market.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="shrink-0 size-12 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-blue-600 font-bold">2</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-lg">Comprehensive Training</h4>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm">We don't just give you a product; we teach you how to sell and support it.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="shrink-0 size-12 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-green-600 font-bold">3</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-lg">Dedicated Support Manager</h4>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm">You get a dedicated point of contact to help you close deals.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                {/* Placeholder Image */}
                                <div className="rounded-2xl overflow-hidden shadow-2xl">
                                    <img 
                                        src="https://placehold.co/600x500/e2e8f0/1e293b?text=Partnership+Success" 
                                        alt="Partnership" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- CTA FORM --- */}
                <section className="py-24 bg-white dark:bg-slate-800">
                    <div className="container max-w-3xl px-4 mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Become a Partner Today</h2>
                        <p className="mb-10 text-slate-600 dark:text-slate-300">
                            Fill out the form below and our partnership team will get back to you within 24 hours.
                        </p>
                        
                        <form className="space-y-4 text-left bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
                                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Your Business Ltd." />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                                    <input type="email" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                                    <input type="tel" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="+91 98765 43210" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Partnership Type</label>
                                <select className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                                    <option>Franchise Partner</option>
                                    <option>Channel Partner</option>
                                    <option>Referral Partner</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                                <textarea rows="4" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Tell us about your business..."></textarea>
                            </div>
                            <button type="button" className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
                                Submit Application
                            </button>
                        </form>
                    </div>
                </section>

            </main>
            
            <Footer />
        </div>
    );
};

export default PartnerOpportunities;