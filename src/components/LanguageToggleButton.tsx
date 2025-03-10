import { useLanguage } from "../hooks/LanguageProvider";
import { LANGUAGE } from "../utils/contants";

const LanguageToggle = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2 p-2 bg-toggle-button-back dark:bg-gray-800 rounded-full">
            <button
                onClick={toggleLanguage}
                className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                    language === LANGUAGE.bn
                        ? "bg-blue-600 text-white"
                        : "bg-transparent text-gray-600 dark:text-gray-300"
                }`}
            >
                বা
            </button>
            <button
                onClick={toggleLanguage}
                className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                    language === LANGUAGE.en
                        ? "bg-blue-600 text-white"
                        : "bg-transparent text-gray-600 dark:text-gray-300"
                }`}
            >
                En
            </button>
        </div>
    );
};

export default LanguageToggle;
