import { add, format } from "date-fns";
import { getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Dialog, List, Modal, Portal, Text } from "react-native-paper";
import { fevent } from "../lib/firebase";
import SiteContext from "../lib/site-context";
import { lightTheme } from "../lib/theme";
import styles from '../styles/events.scss';

export default function EventsScreen() {
    const { t } = useTranslation();
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

            // Important events get priority
            let dots = e.important ? [{ key: ev.id, color: e.important ? "#F24343" : "#FAB9B9" }, ...p] : [...p, { key: ev.id, color: e.important ? "#F24343" : "#FAB9B9" }];

            tmp[d] = { dots, selected: e.important ? true : tmp[d]?.selected ?? false };
            tt[ev.id] = e;
        }

        setMarks(tmp);
        setEvents(tt);
    }

    // TODO - scrollable list
    return (
        <SafeAreaView style={styles.container}>
            <View>
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

                <List.Section title="Upcoming events">
                    {new Array(3).fill(0).map((x, i) => (
                        <List.Accordion id={i + ""} key={i} title={format(add(new Date(), { days: i }), "yyyy/MM/dd")}>
                            {marks[format(add(new Date(), { days: i }), "yyyy-MM-dd")]?.dots.map((v, ii) => <List.Item key={ii} style={styles.item} title={events[v.key]?.name} description={events[v.key]?.description} left={() => <List.Icon color={events[v.key]?.important ? "#F24343" : undefined} icon={events[v.key]?.important ? "exclamation" : "pound"} />} />)}
                        </List.Accordion>
                    ))}
                </List.Section>
            </View>

            <Portal>
                <Dialog style={styles.diag} visible={selDay} onDismiss={() => setSelDay(undefined)}>
                    {selDay ? (
                        <>
                            <Dialog.Title>{selDay.dateString}</Dialog.Title>

                            <Dialog.Content>
                                {marks[selDay.dateString] ? (
                                    marks[selDay.dateString].dots.map((v, i) => (
                                        <View style={{ marginBottom: i < marks[selDay.dateString].dots.length - 1 ? 20 : 0 }} key={i}>
                                            <Text style={{ color: events[v.key].important ? "#F24343" : dark ? "white" : "black" }}>#{i + 1}: {events[v.key].name} {events[v.key].important ? "(IMPORTANT!)" : undefined}</Text>
                                            <Text style={{ alignSelf: 'flex-start' }}>{events[v.key].description}</Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text>No events scheduled...</Text>
                                )}
                            </Dialog.Content>
                        </>
                    ) : undefined}
                </Dialog>
            </Portal>
        </SafeAreaView>
    );
}