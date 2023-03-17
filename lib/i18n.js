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
            "ReportAbsence": "Report Absence",
            "Remove": "Remove",
            "AddStudentTitle": "Add New Student",
            "StudentFullName": "Student Full Name",
            "StudentNumber": "Student # (6 digits)",
            "GraduationYear": "Graduation Year",
            "Add": "Add",
            "Cancel": "Cancel",
            "Reasons": "Reasons",
            "BugReport": "Bug Report",
            "Logout": "Logout",
            "ReportText": "Report a bug",
            "Inconvenience": "Inconvenience",
            "Submit": "Submit",
            "BugText": "Reported! Thank you for your cooperation.",
            "NoEvents": "No events scheduled...",
            "EventsTitle": "Events",
            "StudentsTitle": "My Students",
            "AlbumTitle": "Album",
            "ProfileTitle": "Profile",
            "Uploading": "Uploading",
            "CompletedUp": "Completed image upload",
            "Upcoming": "Upcoming events",
            "Important": "(IMPORTANT!)",
            "Save": "Save",
            "ResetPw": "Reset Password",
            "ChInfo": "Change Information"
        }
    },
    es: {
        translation: {
            "LogIn": "Acceso",
            "EmailLabel": "Correo electrónico",
            "PasswordLabel": "Contraseña",
            "SignUp": "Inscribirse",
            "FirstName": "Nombre de pila",
            "LastName": "Apellido",
            "ReportAbsence": "Reportar Ausencia",
            "Remove": "Eliminar",
            "AddStudentTitle": "Agregar nuevo estudiante",
            "StudentFullName": "Nombre completo del estudiante",
            "StudentNumber": "Alumno",
            "GraduationYear": "Año de graduación",
            "Add": "Agregar",
            "Cancel": "Cancelar",
            "Reasons": "Razones",
            "BugReport": "Informe de error",
            "Logout": "Cerrar sesión",
            "ReportText": "Reportar un error",
            "Inconvenience": "Inconveniencia",
            "Submit": "Entregar",
            "BugText": "Reportado! ",
            "NoEvents": "No hay eventos programados...",
            "EventsTitle": "Eventos",
            "StudentsTitle": "Mis estudiantes",
            "AlbumTitle": "Álbum",
            "ProfileTitle": "Perfil",
            "Uploading": "Cargando",
            "CompletedUp": "Carga de imagen completada",
            "Upcoming": "Próximos Eventos",
            "Important": "(¡IMPORTANTE!)",
            "Save": "Ahorrar",
            "ResetPw": "Restablecer la contraseña",
            "ChInfo": "Cambiar información"
        }
    }
};

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: "es",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
});

export default i18n;