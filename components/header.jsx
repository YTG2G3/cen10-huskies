import { useContext } from "react";
import { View } from "react-native";
import { IconButton, Switch } from "react-native-paper";
import SiteContext from "../lib/site-context";
import styles from '../styles/header.scss';

export default function Header() {
    let { dark, setDark } = useContext(SiteContext);

    return (
        <View style={styles.container}>
            <IconButton icon={dark ? "weather-night" : "weather-sunset"} size={30} />
            <Switch style={styles.swt} value={dark} onValueChange={setDark} />
        </View >
    );
}