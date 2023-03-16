import { StatusBar } from "expo-status-bar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, View } from "react-native";
import { Button, IconButton, Snackbar, Switch, Text, TextInput } from "react-native-paper";
import { fauth } from "../lib/firebase";
import SiteContext from "../lib/site-context";
import styles from '../styles/login.scss';

export default function LoginScreen({ navigation }) {
    const { t } = useTranslation();
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(undefined);
    let { dark, setDark } = useContext(SiteContext);

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    const attemptLogin = async () => {
        // Start login
        setLoading(true);

        // TODO - validity check

        // Login
        try {
            await signInWithEmailAndPassword(fauth, email, password);
        } catch (err) {
            // TODO - error handling
            setError(err.message);
        }

        // Attempt complete (may be either success or fail)
        setLoading(false);
    }

    // TODO - helpertext for textinputs
    return (
        <KeyboardAvoidingView style={{ ...styles.container }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <StatusBar hidden />

            <Text style={styles.txt}>{t("LogIn")}</Text>

            <TextInput style={styles.inp} label={t("EmailLabel")} value={email} onChangeText={setEmail} left={
                <TextInput.Icon icon="email" />
            } />

            <TextInput style={styles.inp} label={t("PasswordLabel")} secureTextEntry value={password} onChangeText={setPassword} left={
                <TextInput.Icon icon="lock" />
            } />

            <View style={styles.btncol}>
                <Button style={styles.btn} icon="login" loading={loading} disabled={loading} mode="contained" onPress={attemptLogin}>{t("LogIn")}</Button>

                <Button icon="account-plus" loading={loading} disabled={loading} mode="contained" onPress={() => navigation.navigate("Signup")}>{t("SignUpButton")}</Button>
            </View>

            <Snackbar visible={error} onDismiss={() => setError(undefined)}>{error}</Snackbar>

            <View style={styles.rc}>
                <IconButton icon={dark ? "weather-night" : "weather-sunset"} size={30} />
                <Switch style={styles.swt} value={dark} onValueChange={setDark} />
            </View>
        </KeyboardAvoidingView >
    );
}