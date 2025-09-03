import React, { useState } from 'react';
import { useTranslation, Language } from '../lib/i18n';
import { FlagEN } from './icons/FlagEN';
import { FlagNL } from './icons/FlagNL';
import { FlagFR } from './icons/FlagFR';
import { FlagDE } from './icons/FlagDE';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

const languageConfig: { [key in Language]: { name: string; icon: React.ReactNode } } = {
    en: { name: 'English', icon: <FlagEN className="h-5 w-5 rounded-full object-cover" /> },
    nl: { name: 'Nederlands', icon: <FlagNL className="h-5 w-5 rounded-full object-cover" /> },
    fr: { name: 'Français', icon: <FlagFR className="h-5 w-5 rounded-full object-cover" /> },
    de: { name: 'Deutsch', icon: <FlagDE className="h-5 w-5 rounded-full object-cover" /> },
};

export const LanguageSwitcher: React.FC = () => {
    const { lang, setLang } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const selectLanguage = (selectedLang: Language) => {
        setLang(selectedLang);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent"
            >
                {languageConfig[lang].icon}
                <span className="font-semibold text-sm text-white hidden md:inline">{lang.toUpperCase()}</span>
                <ChevronDownIcon className="h-4 w-4 text-slate-400" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-accent rounded-lg shadow-xl border border-accent-dark z-50">
                    <ul>
                        {(Object.keys(languageConfig) as Language[]).map((key) => (
                            <li key={key}>
                                <button
                                    onClick={() => selectLanguage(key)}
                                    className={`w-full text-left flex items-center space-x-3 p-3 hover:bg-accent-dark ${lang === key ? 'font-bold text-secondary' : 'text-white'}`}
                                >
                                    {languageConfig[key].icon}
                                    <span>{languageConfig[key].name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};