import React, { useState } from "react";

// Import flag images
import usFlag from "../../../assets/images/flags/us.svg";
import esFlag from "../../../assets/images/flags/es.svg";
import deFlag from "../../../assets/images/flags/de.svg";
import frFlag from "../../../assets/images/flags/fr.svg";
import jpFlag from "../../../assets/images/flags/jp.svg";
import itFlag from "../../../assets/images/flags/it.svg";
import ruFlag from "../../../assets/images/flags/ru.svg";
import aeFlag from "../../../assets/images/flags/ae.svg";

const AuthDropdown = () => {
    const [selectedFlag, setSelectedFlag] = useState(usFlag);
    const [selectedLanguage, setSelectedLanguage] = useState("English");

    // Language options data
    const languageOptions = [
        { code: "en", flag: usFlag, name: "English" },
        { code: "es", flag: esFlag, name: "Spanish" },
        { code: "de", flag: deFlag, name: "German" },
        { code: "fr", flag: frFlag, name: "French" },
        { code: "jp", flag: jpFlag, name: "Japanese" },
        { code: "it", flag: itFlag, name: "Italian" },
        { code: "ru", flag: ruFlag, name: "Russian" },
        { code: "ae", flag: aeFlag, name: "Arabic" }
    ];

    const handleLanguageSelect = (flag, language) => {
        setSelectedFlag(flag);
        setSelectedLanguage(language);
    };

    return (
        <div className="relative">
            {/* Dropdown button */}
            <button
                type="button"
                className="inline-flex items-center gap-3 px-4 py-2 transition-all duration-200 ease-linear border rounded-md btn border-slate-200 dark:border-zink-500 group/items hover:border-custom-500 dark:hover:border-custom-500 focus:border-custom-500 dark:focus:border-custom-500"
                onClick={(e) => {
                    e.currentTarget.nextElementSibling?.classList.toggle("hidden");
                }}
            >
                <img 
                    src={selectedFlag} 
                    alt={`${selectedLanguage} flag`} 
                    className="object-cover w-5 h-5 rounded-full" 
                />
                <span className="text-base font-medium transition-all duration-200 ease-linear text-slate-600 group-hover/items:text-custom-500 dark:text-zink-200 dark:group-hover/items:text-custom-500">
                    {selectedLanguage}
                </span>
            </button>

            {/* Dropdown menu */}
            <div className="absolute right-0 z-50 hidden p-3 mt-1 bg-white rounded-md shadow-md dark:bg-zink-600 min-w-[9rem]">
                <div className="flex flex-col gap-3">
                    {languageOptions.map((language) => (
                        <button
                            key={language.code}
                            className="flex items-center gap-3 transition-colors duration-200 group/items hover:text-custom-500"
                            onClick={() => {
                                handleLanguageSelect(language.flag, language.name);
                                // Hide dropdown after selection
                                document.activeElement?.nextElementSibling?.classList.add("hidden");
                            }}
                        >
                            <img 
                                src={language.flag} 
                                alt={`${language.name} flag`} 
                                className="object-cover w-4 h-4 rounded-full" 
                            />
                            <span className="text-sm font-medium transition-all duration-200 ease-linear text-slate-600 group-hover/items:text-custom-500 dark:text-zink-200 dark:group-hover/items:text-custom-500">
                                {language.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AuthDropdown;