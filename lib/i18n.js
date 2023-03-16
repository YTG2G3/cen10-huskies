import { getLocales } from "expo-localization";
import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import 'intl-pluralrules';

const resources = {
    en: {
        translation: {
            "LogInTitle": "Log In"
        }
    },
    es: {
        translation: {

        }
    }
};

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: getLocales()[0].languageCode,
    fallbackLng: "en",
    interpolation: { escapeValue: false }
});

export default i18n;