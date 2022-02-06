import { useTranslation as useTranslationI18 } from "react-i18next";

export const useTranslation = () => {
    const { t, i18n } = useTranslationI18("common");

    return {
        _: t,
        i18n
    };
};
