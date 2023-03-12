import { format } from "date-fns";
import { getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Modal, Portal, Text } from "react-native-paper";
import { fevent } from "../lib/firebase";
import SiteContext from "../lib/site-context";
import styles from '../styles/events.scss';

export default function EventsScreen() {
    let { dark } = useContext(SiteContext);
    let [marks, setMarks] = useState({});
    let [events, setEvents] = useState({});
    let [rerender, setRerender] = useState(0);
    let [selDay, setSelDay] = useState(undefined);

    useEffect(() => { loadData() }, []);

    // Force rerendering calendar on changes
    useEffect(() => setRerender(Math.floor(Math.random() * 1000000)), [dark, marks]);

    // Load current events
    const loadData = async () => {
        let m = await getDocs(fevent);
        let tmp = {};
        let tt = {}

        for (let ev of m.docs) {
            let e = ev.data();

            let d = format(e.date.toDate(), "yyyy-MM-dd");
            let p = tmp[d] ? [...tmp[d].dots] : [];

            // Important stuff first
            let dots = e.important ? [{ key: ev.id, color: e.important ? "#F24343" : "#FAB9B9" }, ...p] : [...p, { key: ev.id, color: e.important ? "#F24343" : "#FAB9B9" }];

            tmp[d] = { dots, selected: e.important ? true : tmp[d]?.selected ?? false };
            tt[ev.id] = e;
        }

        setMarks(tmp);
        setEvents(tt);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Calendar
                key={rerender}
                markingType="multi-dot"
                markedDates={marks}
                theme={{
                    todayTextColor: "#00adf5",
                    arrowColor: "#F24343",
                    monthTextColor: "#F24343",
                    calendarBackground: "transparent",
                    dayTextColor: dark ? "#FFFFFF" : "#3C1111",
                    textDisabledColor: dark ? "#2d4150" : "#d9e1e8",
                    selectedDayTextColor: "#F24343",
                    selectedDayBackgroundColor: "transparent",
                    textDayFontSize: 22,
                    textMonthFontSize: 22,
                    textDayHeaderFontSize: 14,
                    'stylesheet.day.basic': { 'base': { height: 100 } }
                }}
                onDayPress={setSelDay}
            />

            <Portal>
                <Modal contentContainerStyle={styles.modal} visible={selDay} onDismiss={() => setSelDay(undefined)}>
                    {selDay ? <Text style={styles.cen}>{selDay.dateString}</Text> : undefined}
                    {selDay ? marks[selDay.dateString].dots.map((v, i) => (
                        <View style={{ marginBottom: i < marks[selDay.dateString].dots.length - 1 ? 20 : 0, alignSelf: 'flex-start' }} key={i}>

                            <Text style={{ color: events[v.key].important ? "red" : "black", alignSelf: 'flex-start' }}>#{i + 1}: {events[v.key].name} {events[v.key].important ? "(IMPORTANT!)" : undefined}</Text>
                            <Text style={{ alignSelf: 'flex-start' }}>{events[v.key].description}</Text>
                        </View>
                    )) : undefined}
                </Modal>
            </Portal>
        </SafeAreaView>
    );
}