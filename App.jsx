import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./lib/theme";
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import SplashScreen from "./screens/splash-screen";
import { useState } from "react";

export default function App() {
    // Is loading?
    let [loading, setLoading] = useState(null);

    // Load font
    const [fontLoaded] = useFonts({ Poppins_400Regular });

    // Splash screen while loading
    if (loading !== false || !fontLoaded) return <SplashScreen loading={loading} setLoading={setLoading} />;

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>

            </NavigationContainer>
        </PaperProvider>
    );
}