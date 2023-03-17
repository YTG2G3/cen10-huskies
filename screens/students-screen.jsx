import { addDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, SafeAreaView, ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Button, Dialog, Portal, Snackbar, Surface, Text, TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { fauth, freport, fstudent } from "../lib/firebase";
import styles from '../styles/students.scss';

export default function StudentsScreen() {
    const { t } = useTranslation();
    let [amd, setAmd] = useState(false);
    let [showDropdown, setShowDropdown] = useState(false);
    let [grad_year, setGradYear] = useState(undefined);
    let [name, setName] = useState("");
    let [sid, setSid] = useState("");
    let [snk, setSnk] = useState(undefined);
    let [students, setStudents] = useState([]);
    let [reporting, setReporting] = useState(-1);
    let [reason, setReason] = useState(undefined);

    // Load students
    useEffect(() => { loadData() }, []);

    const loadData = async () => {
        let { docs } = await getDocs(query(fstudent, where("uid", "==", fauth.currentUser.uid)));
        setStudents(docs);
    }

    // Try to add student
    const addStudent = async () => {
        // TODO - check validity
        try {
            resetDiag();
            await addDoc(fstudent, { uid: fauth.currentUser.uid, name, sid });
            setSnk(`Successfully associated ${name} with your account.`);
        } catch (err) {
            setSnk(err.message);
        }
    }

    const resetDiag = () => {
        setAmd(false);
        setGradYear(undefined);
        setName("");
        setSid("");
        loadData();
    }

    // Remove student
    const removeStudent = async (index) => {
        try {
            await deleteDoc(doc(fstudent, students[index].id));
            setSnk(`Successfully disassociated ${students[index].data().name} from your account.`);
            loadData();
        } catch (err) {
            setSnk(err.message);
        }
    }

    // Report absence
    const reportAbsence = async () => {
        try {
            setReporting(-1);
            setReason(undefined);
            await addDoc(freport, { uid: fauth.currentUser.uid, abs: students[reporting].id, req_at: new Date(), reason });
            setSnk(`Successfully reported absence for ${students[reporting].data().name}.`);
            loadData();
        } catch (err) {
            setSnk(err.message);
        }
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.pad}>
                {students.map((v, i) => (
                    <Surface key={i} style={{ ...styles.stu, ...styles.pen }}>
                        <Image style={styles.img} source={require('../assets/logo_tp.jpg')} />

                        <View style={styles.ls}>
                            <Text style={styles.lt}>{v.data().name}</Text>
                            <Text style={styles.st}>#{v.data().sid}</Text>
                        </View>

                        <View style={{ ...styles.pen, marginRight: 15 }}>
                            <Button style={{ marginRight: 10 }} onPress={() => setReporting(i)} mode="contained">{t("ReportAbsence")}</Button>
                            <Button onPress={() => removeStudent(i)}>{t("Remove")}</Button>
                        </View>
                    </Surface>
                ))}

                <TouchableOpacity onPress={() => setAmd(true)}>
                    <Surface style={{ ...styles.stu, ...styles.cen }}>
                        <Avatar.Icon style={styles.ico} color="#F24343" icon="plus-circle-outline" />
                    </Surface>
                </TouchableOpacity>
            </ScrollView>

            <Portal>
                <Dialog style={styles.diag} visible={amd} onDismiss={() => setAmd(false)}>
                    <Dialog.Title>{t("AddStudentTitle")}</Dialog.Title>

                    <Dialog.Content>
                        <TextInput style={styles.inp} value={name} onChangeText={setName} label={t("StudentFullName")} />
                        <TextInput style={styles.inp} value={sid} onChangeText={setSid} label={t("StudentNumber")} />
                        <DropDown
                            label={t("GraduationYear")}
                            mode="outlined"
                            visible={showDropdown}
                            showDropDown={() => setShowDropdown(true)}
                            onDismiss={() => setShowDropdown(false)}
                            value={grad_year}
                            setValue={setGradYear}
                            list={new Array(4).fill(new Date().getFullYear()).map((v, i) => ({ label: v + i + "", value: v + i + "" }))}
                        />
                    </Dialog.Content>

                    <Dialog.Actions>
                        <Button style={{ marginRight: 10 }} onPress={addStudent}>{t("Add")}</Button>
                        <Button onPress={resetDiag}>{t("Cancel")}</Button>
                    </Dialog.Actions>
                </Dialog>

                <Snackbar visible={snk} onDismiss={() => setSnk(undefined)}>{snk}</Snackbar>
            </Portal>

            <Portal>
                <Dialog style={{ marginHorizontal: "40%" }} visible={reporting >= 0} onDismiss={() => setReporting(-1)}>
                    <Dialog.Title>{t("ReportAbsence")}</Dialog.Title>

                    <Dialog.Content>
                        {reporting >= 0 ? (
                            <DropDown
                                label={t("Reasons")}
                                mode="outlined"
                                visible={showDropdown}
                                showDropDown={() => setShowDropdown(true)}
                                onDismiss={() => setShowDropdown(false)}
                                value={reason}
                                setValue={setReason}
                                list={[
                                    { label: "Medical Issues", value: "medical" },
                                    { label: "Family Emergency", value: "family" },
                                    { label: "Other...", value: "other" }
                                ]}
                            />
                        ) : undefined}
                    </Dialog.Content>

                    <Dialog.Actions>
                        <Button style={{ marginRight: 10 }} onPress={reportAbsence}>{t("Submit")}</Button>
                        <Button onPress={resetDiag}>{t("Cancel")}</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </SafeAreaView>
    );
}