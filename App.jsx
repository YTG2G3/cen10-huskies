import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { lightTheme, darkTheme } from "./lib/theme";
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { useEffect, useState } from "react";
import { fauth, fuser } from "./lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, ProfileScreen, EventsScreen, SignupScreen, SplashScreen, StudentsScreen, ScheduleScreen, AnnouncementsScreen } from "./screens";
import 'react-native-gesture-handler';
import SiteContext from "./lib/site-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "./components/header";
import CustomDrawer from "./components/custom-drawer";

// Auth navigator
const Stack = createNativeStackNavigator();

// Console navigator
const Drawer = createDrawerNavigator();

export default function App() {
    // User
    let [user, setUser] = useState(undefined);

    // THE DARK SIDE
    let [dark, setDark] = useState(false);

    // Is displaying splash screen?
    let [splash, setSplash] = useState(true);

    // Load font
    const [fontLoaded] = useFonts({ Poppins_400Regular });

    // Listen to auth changes
    useEffect(() => {
        // Dark mode?
        loadDarkMode();

        // Firebase session
        let unsub = fauth.onAuthStateChanged(fb => fb ? onLogin(fb) : undefined);
        return () => unsub();
    }, []);

    // Dark mode
    const loadDarkMode = async () => {
        try {
            let d = JSON.parse(await AsyncStorage.getItem("dark"));

            if (d) setDark(d);
            else AsyncStorage.setItem("dark", "false");
        } catch (error) {
            AsyncStorage.setItem("dark", "false");
        }
    };

    useEffect(() => { AsyncStorage.setItem("dark", JSON.stringify(dark)) }, [dark]);

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
        <SiteContext.Provider value={{ user, setUser, dark, setDark }}>
            <PaperProvider theme={dark ? darkTheme : lightTheme}>
                <NavigationContainer theme={dark ? darkTheme : lightTheme}>
                    {user ? ( // Logged in
                        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />} screenOptions={{ headerRight: () => <Header /> }}>
                            <Drawer.Screen name="Events" component={EventsScreen} />
                            <Drawer.Screen name="Announcements" component={AnnouncementsScreen} />
                            <Drawer.Screen name="My Students" component={StudentsScreen} />
                            <Drawer.Screen name="Bell Schedule" component={ScheduleScreen} />
                            <Drawer.Screen name="Profile" component={ProfileScreen} />
                        </Drawer.Navigator>
                    ) : ( // Logged out
                        <Stack.Navigator screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="Auth" component={LoginScreen} />
                            <Stack.Screen name="Signup" component={SignupScreen} />
                        </Stack.Navigator>
                    )}
                </NavigationContainer>
            </PaperProvider>
        </SiteContext.Provider>
    );
}