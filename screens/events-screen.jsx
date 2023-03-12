import { useContext } from "react";
import { SafeAreaView } from "react-native";
import { Calendar } from "react-native-calendars";
import SiteContext from "../lib/site-context";
import styles from '../styles/events.scss';

export default function EventsScreen() {
    let { dark } = useContext(SiteContext);

    return (
        <SafeAreaView style={styles.container}>
            <Calendar
                key={dark}
                theme={{
                    todayTextColor: "#F24343",
                    arrowColor: "#F24343",
                    monthTextColor: "#F24343",
                    calendarBackground: "transparent",
                    dayTextColor: dark ? "#FFFFFF" : "#3C1111",
                    textDisabledColor: dark ? "#2d4150" : "#d9e1e8",
                    'stylesheet.day.basic': { 'base': { height: 100 } }
                }}
            />
        </SafeAreaView>
    );
}