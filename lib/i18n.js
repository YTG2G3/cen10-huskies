import { getLocales } from "expo-localization";
import i18n from 'i18next';
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            // Log In / Sign Up Page
            "LogIn": "Log In",
            "EmailLabel": "Email",
            "PasswordLabel": "Password",
            "SignUp": "Sign Up",
            "FirstName": "First Name",
            "LastName": "Last Name",

            // My Students
            "ReportAbsence": "Report Absence",
            "Remove": "Remove",
            "AddStudentTitle": "Add New Student",
            "StudentFullName": "Student Full Name",
            "StudentNumber": "Student # (6 digits)",
            "GraduationYear": "Graduation Year",
            "Add": "Add",
            "Cancel": "Cancel",
            "Reasons": "Reasons",

            // Custom-drawer
            "BugReport": "Bug Report",
            "Logout": "Logout",
            "ReportText": "Report a bug",
            "Inconvenience": "Inconvenience",
            "Submit": "Submit",
            "BugText": "Reported! Thank you for your cooperation.",

            // Events
            "NoEvents": "No events scheduled...",

            // Titles
            "EventsTitle": "Events",
            "StudentsTitle": "My Students",
            "AlbumTitle": "Album",
            "ProfileTitle": "Profile",

            // Album
            "Uploading": "Uploading",
            "CompletedUp": "Completed image upload"
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