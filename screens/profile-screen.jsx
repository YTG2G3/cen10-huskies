import { sendPasswordResetEmail, updateEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, View } from "react-native";
import { Button, Divider, Snackbar, Text, TextInput } from "react-native-paper";
import { fauth, fuser } from "../lib/firebase";
import SiteContext from "../lib/site-context";
import styles from '../styles/profile.scss';

export default function ProfileScreen() {
    const { t } = useTranslation();
    let [first_name, setFirstName] = useState("");
    let [last_name, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [sb, setSb] = useState(undefined);
    let { user } = useContext(SiteContext);

    // Load current
    useEffect(() => {
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setEmail(fauth.currentUser.email);
    }, []);

    // Save changes
    const saveInfo = async () => {
        try {
            await setDoc(doc(fuser, fauth.currentUser.uid), { first_name, last_name });
            if (fauth.currentUser.email !== email) await updateEmail(fauth.currentUser, email);

            setSb("Successfully applied changes.");
        } catch (err) {
            setSb(err.message);
        }
    }

    // Send pw reset request
    const resetPw = async () => {
        try {
            await sendPasswordResetEmail(fauth, fauth.currentUser.email);

            setSb("Successfully sent a reset email. Please check your inbox.");
        } catch (err) {
            setSb(err.message);
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text style={styles.txt}>{t("ChInfo")}</Text>

            <Divider bold={true} style={styles.div} />

            <TextInput style={styles.inp} value={first_name} onChangeText={setFirstName} label={t("FirstName")} />
            <TextInput style={styles.inp} value={last_name} onChangeText={setLastName} label={t("LastName")} />
            <TextInput style={styles.inp} value={email} onChangeText={setEmail} label={t("EmailLabel")} />

            <View style={styles.act}>
                <Button mode="contained" onPress={saveInfo}>{t("Save")}</Button>
                <Button onPress={resetPw}>{t("ResetPw")}</Button>
            </View>

            <Snackbar visible={sb} onDismiss={() => setSb(undefined)}>{sb}</Snackbar>
        </KeyboardAvoidingView>
    );
}