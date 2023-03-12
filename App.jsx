import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./lib/theme";
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { useEffect, useState } from "react";
import { fauth, fuser } from "./lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, ScheduleScreen, SignupScreen, SplashScreen } from "./screens";
import 'react-native-gesture-handler';

// Auth navigator
const Stack = createNativeStackNavigator();

// Console navigator
const Drawer = createDrawerNavigator();

export default function App() {
    // User
    let [user, setUser] = useState(undefined);

    // Is displaying splash screen?
    let [splash, setSplash] = useState(true);

    // Load font
    const [fontLoaded] = useFonts({ Poppins_400Regular });

    // Listen to auth changes
    useEffect(() => {
        let unsub = fauth.onAuthStateChanged(fb => fb ? onLogin(fb) : undefined);
        return () => unsub();
    }, []);

    // On login
    const onLogin = async ({ uid }) => {
        let u = null;

        do { u = await getDoc(doc(fuser, uid)) }
        while (!u?.exists())

        setUser(u.data());
    }

    // Splash screen while loading
    if (splash || !fontLoaded) return <SplashScreen cb={() => setSplash(false)} />;

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                {user ? ( // Logged in
                    <Drawer.Navigator>
                        <Drawer.Screen name="schedule" component={ScheduleScreen} />
                    </Drawer.Navigator>
                ) : ( // Logged out
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="auth" component={LoginScreen} />
                        <Stack.Screen name="signup" component={SignupScreen} />
                    </Stack.Navigator>
                )}
            </NavigationContainer>
        </PaperProvider>
    );
}