import { motion } from "framer-motion";
import { useLanguage } from "../hooks/LanguageProvider";
import { LANGUAGE } from "../utils/contants";

const Tag: React.FC = () => {
    const text_bn = "নব\u00A0উদ্যম,\u00A0নব\u00A0দিশা...";
    const text_en = "New\u00A0Zeal,\u00A0New\u00A0Hope...";
    const { language } = useLanguage();

    const text = language === LANGUAGE.bn ? text_bn : text_en;

    return (
        <motion.p
            className="text-2xl text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            {text}
        </motion.p>
    );
};

export default Tag;
