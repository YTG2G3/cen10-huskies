import { StatusBar } from "expo-status-bar";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { fauth } from "../lib/firebase";
import styles from '../styles/login.scss';

export default function LoginScreen({ navigation }) {
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(undefined);

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
        <SafeAreaView style={styles.container}>
            <StatusBar hidden />

            <Text style={styles.txt}>Log In</Text>

            <TextInput style={styles.inp} label="Email" value={email} onChangeText={setEmail} left={
                <TextInput.Icon icon="email" />
            } />

            <TextInput style={styles.inp} label="Password" secureTextEntry value={password} onChangeText={setPassword} left={
                <TextInput.Icon icon="lock" />
            } />

            <View style={styles.btncol}>
                <Button style={styles.btn} icon="login" loading={loading} disabled={loading} mode="contained" onPress={attemptLogin}>Log In</Button>

                <Button icon="account-plus" loading={loading} disabled={loading} mode="contained" onPress={() => navigation.navigate("signup")}>Sign Up</Button>
            </View>

            <Snackbar visible={error} onDismiss={() => setError(undefined)}>{error}</Snackbar>
        </SafeAreaView >
    );
}