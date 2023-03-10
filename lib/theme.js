import { configureFonts, DefaultTheme } from "react-native-paper";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#F24343"
    },
    fonts: configureFonts({ config: { fontFamily: "Poppins_400Regular" } })
};

export default theme;