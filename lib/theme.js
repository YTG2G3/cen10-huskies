import { adaptNavigationTheme, configureFonts, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

// Convert into nav theme
const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

// Combine them
const lightTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        ...LightTheme.colors,
        primary: "#F24343"
    },
    fonts: configureFonts({ config: { fontFamily: "Poppins_400Regular" } })
};

const darkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        ...DarkTheme.colors,
        primary: "#F24343"
    },
    fonts: configureFonts({ config: { fontFamily: "Poppins_400Regular" } })
};

export { lightTheme, darkTheme };