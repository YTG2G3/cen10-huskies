import { configureFonts, DefaultTheme } from "react-native-paper";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#F24343",
        fonts: configureFonts({ config: fontConfig, isV3: false })
    }
};

const fontConfig = {
    ...DefaultTheme.fonts,
    default: {
        fontFamily: "Poppins_400Regular",
        fontWeight: "normal"
    }
}

export default theme;