import { getLocales } from "expo-localization";
import i18n from 'i18next';
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "LogIn": "Log In",
            "EmailLabel": "Email",
            "PasswordLabel": "Password",
            "SignUp": "Sign Up",
            "FirstName": "First Name",
            "LastName": "Last Name",


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