import { addDoc } from "firebase/firestore";
import { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Button, Dialog, Portal, Snackbar, Surface, TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { fauth, fstudent } from "../lib/firebase";
import styles from '../styles/students.scss';

export default function StudentsScreen() {
    let [amd, setAmd] = useState(false);
    let [showDropdown, setShowDropdown] = useState(false);
    let [grad_year, setGradYear] = useState(undefined);
    let [name, setName] = useState("");
    let [sid, setSid] = useState("");
    let [snk, setSnk] = useState(undefined);

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
    }

    return (
        <SafeAreaView>
            <ScrollView>


                <TouchableOpacity onPress={() => setAmd(true)}>
                    <Surface style={{ ...styles.stu, ...styles.cen }}>
                        <Avatar.Icon style={styles.ico} color="#F24343" icon="plus-circle-outline" />
                    </Surface>
                </TouchableOpacity>
            </ScrollView>

            <Portal>
                <Dialog style={styles.diag} visible={amd} onDismiss={() => setAmd(false)}>
                    <Dialog.Title>Add New Student</Dialog.Title>

                    <Dialog.Content>
                        <TextInput style={styles.inp} value={name} onChangeText={setName} label="Student Full Name" />
                        <TextInput style={styles.inp} value={sid} onChangeText={setSid} label="Student # (6 digits)" />
                        <DropDown
                            label="Graduation Year"
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
                        <Button onPress={addStudent}>Add</Button>
                        <Button onPress={resetDiag}>Cancel</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <Snackbar visible={snk} onDismiss={() => setSnk(undefined)}>{snk}</Snackbar>
        </SafeAreaView>
    );
}