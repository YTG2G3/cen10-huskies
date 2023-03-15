import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { signOut } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, Snackbar, TextInput } from "react-native-paper";
import { fauth, freport } from "../lib/firebase";
import SiteContext from "../lib/site-context";
import styles from '../styles/custom-drawer.scss';

export default function CustomDrawer(props) {
    let { setUser } = useContext(SiteContext);
    let [rep, setRep] = useState(false);
    let [inc, setInc] = useState("");
    let [snk, setSnk] = useState(false);

    // Completely logout from firebase auth
    const logout = () => {
        setUser(undefined);
        signOut(fauth);
    }

    // Report on /bug
    const reportBug = async () => {
        // TODO - check input
        resetDiag();
        await addDoc(freport, { uid: fauth.currentUser.uid, inc });
        setSnk(true);
    }

    const resetDiag = () => {
        setRep(false);
        setInc("");
    }

    // TODO - keyboard avoiding modal
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
            <View style={styles.ite}>
                <DrawerItemList {...props} />
            </View>

            <Button style={styles.btn} mode="contained" icon="bug" onPress={() => setRep(true)}>Bug Report</Button>
            <Button style={styles.btn} mode="contained" icon="logout" onPress={logout}>Logout</Button>

            <Portal>
                <Dialog style={styles.diag} visible={rep} onDismiss={() => setRep(false)}>
                    <Dialog.Title>Report a bug</Dialog.Title>

                    <Dialog.Content>
                        <TextInput value={inc} onChangeText={setInc} label="Inconvenience" />
                    </Dialog.Content>

                    <Dialog.Actions>
                        <Button onPress={reportBug}>Submit</Button>
                        <Button onPress={resetDiag}>Cancel</Button>
                    </Dialog.Actions>
                </Dialog>

                <Snackbar visible={snk} onDismiss={() => setSnk(false)}>Reported! Thank you for your cooperation.</Snackbar>
            </Portal>
        </DrawerContentScrollView>
    );
}