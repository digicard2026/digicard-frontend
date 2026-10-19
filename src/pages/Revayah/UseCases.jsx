import React from "react";

const UseCases = ({ data }) => {
    return (
        <section className="py-10 bg-slate-50 dark:bg-slate-800/50" id="use-cases">
            <div className="container max-w-7xl px-4 mx-auto">
                <div className="mb-12 text-center md:text-left font-sans">
                    <h2 className="mb-4 text-3xl font-bold text-slate-800 dark:text-slate-50 font-sans">Use Cases</h2>
                    <p className="text-lg text-slate-500 dark:text-slate-300 font-sans">Tailored solutions for every industry.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((useCase, idx) => (
                        <div key={idx} className="flex flex-col gap-4 p-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-blue-600 dark:text-blue-400 font-sans">
                                    {useCase.icon}
                                </div>
                                <h5 className="text-xl font-bold text-slate-800 dark:text-slate-50 font-sans">{useCase.category}</h5>
                            </div>
                            <ul className="space-y-2 mt-2">
                                {useCase.items.map((item, iIdx) => (
                                    <li key={iIdx} className="text-slate-600 dark:text-slate-300 flex items-start gap-3 font-sans">
                                        <span className="mt-2 size-1.5 rounded-full bg-slate-400 shrink-0 font-sans"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UseCases;