import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const FeatureCard = ({ title, description, icon, points, link }) => (
    <div className="group relative p-8 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
        <div className="mb-6 inline-flex items-center font-sans justify-center size-14 rounded-lg bg-rose-50 dark:bg-rose-900/30 text-rosey-600 dark:text-rose-400 shadow-sm">
            {icon}
        </div>
        <h3 className="mb-3 text-xl font-semibold text-slate-800 font-sans dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
        </h3>
        <p className="mb-5 text-slate-500 dark:text-slate-300 font-sans">
            {description}
        </p>
        <ul className="space-y-3 mb-6">
            {points.map((point, idx) => (
                <li key={idx} className="flex items-start font-sans gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="size-4  text-green-500 mt-0.5 shrink-0" />
                    <span>{point}</span>
                </li>
            ))}
        </ul>
        <a href={link} className="inline-flex items-center  text-blue-600 font-sans dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300">
            Learn More <ArrowRight className="ml-1 size-4" />
        </a>
    </div>
);

const Features = ({ title, subtitle, features }) => {
    return (
        <section className="relative py-24 bg-white dark:bg-slate-900" id="features">
            <div className="container max-w-7xl px-4 mx-auto">
                <div className="mx-auto text-center max-w-3xl mb-16">
                    <h1 className="mb-4 text-3xl font-bold leading-normal capitalize text-slate-800 dark:text-slate-50 font-sans">{title}</h1>
                    <p className="text-lg text-slate-500 dark:text-slate-300 font-sans">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 font-sans">
                    {features.map((feature, idx) => (
                        <FeatureCard key={idx} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;

// import React from "react";
// import { ArrowRight, CheckCircle2 } from "lucide-react";

// const FeatureCard = ({ title, description, icon, points, link }) => (
//     <div className="group relative p-8 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300 z-10">
//         <div className="mb-6 inline-flex items-center font-sans justify-center size-14 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm">
//             {icon}
//         </div>
//         <h3 className="mb-3 text-xl font-semibold text-slate-800 font-satoshi dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//             {title}
//         </h3>
//         <p className="mb-5 text-slate-500 dark:text-slate-300 font-satoshi">
//             {description}
//         </p>
//         <ul className="space-y-3 mb-6">
//             {points.map((point, idx) => (
//                 <li key={idx} className="flex items-start font-satoshi gap-2 text-sm text-slate-600 dark:text-slate-300">
//                     <CheckCircle2 className="size-4 text-green-500 mt-0.5 shrink-0" />
//                     <span>{point}</span>
//                 </li>
//             ))}
//         </ul>
//         <a href={link} className="inline-flex items-center text-blue-600 font-satoshi dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300">
//             Learn More <ArrowRight className="ml-1 size-4" />
//         </a>
//     </div>
// );

// const Features = ({ title, subtitle, features }) => {
//     return (
//         <section className="relative py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden" id="features">
//              {/* Background Decorations (Matching Hero) */}
//             <div className="absolute top-1/2 -left-40 -translate-y-1/2 rotate-45 border border-dashed size-[600px] border-slate-300 dark:border-slate-700 rounded-full opacity-40 z-0"></div>
            
//             <div className="container max-w-7xl px-4 mx-auto relative z-10">
//                 <div className="mx-auto text-center max-w-3xl mb-16">
//                     <h1 className="mb-4 text-3xl font-bold leading-normal capitalize text-slate-800 dark:text-slate-50 font-satoshi">{title}</h1>
//                     <p className="text-lg text-slate-500 dark:text-slate-300 font-satoshi">{subtitle}</p>
//                 </div>

//                 <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 font-satoshi">
//                     {features.map((feature, idx) => (
//                         <FeatureCard key={idx} {...feature} />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Features;