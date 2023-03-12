import { format } from "date-fns";
import { getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Calendar } from "react-native-calendars";
import { fevent } from "../lib/firebase";
import SiteContext from "../lib/site-context";
import styles from '../styles/events.scss';

export default function EventsScreen() {
    let { dark } = useContext(SiteContext);
    let [marks, setMarks] = useState([]);
    let [rerender, setRerender] = useState(0);

    useEffect(() => { loadData() }, []);

    // Force rerendering calendar on changes
    useEffect(() => setRerender(Math.floor(Math.random() * 1000000)), [dark, marks]);

    // Load current events
    const loadData = async () => {
        let m = await getDocs(fevent);
        setMarks(m.docs);
    }

    // Render the events
    const renderDots = (marks) => {
        let tmp = {};

        for (let ev of marks) {
            let e = ev.data();

            let d = format(e.date.toDate(), "yyyy-MM-dd");
            let p = tmp[d] ? [...tmp[d].dots] : []

            tmp[d] = { dots: [...p, { key: ev.id, color: e.important ? "#F24343" : "#FAB9B9" }] }
        }

        return tmp;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Calendar
                key={rerender}
                markingType="multi-dot"
                markedDates={renderDots(marks)}
                theme={{
                    todayTextColor: "#F24343",
                    arrowColor: "#F24343",
                    monthTextColor: "#F24343",
                    calendarBackground: "transparent",
                    dayTextColor: dark ? "#FFFFFF" : "#3C1111",
                    textDisabledColor: dark ? "#2d4150" : "#d9e1e8",
                    'stylesheet.day.basic': { 'base': { height: 100 } }
                }}
                onDayPress={(day) => { }}
            />
        </SafeAreaView>
    );
}