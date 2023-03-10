import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { fauth } from "../lib/firebase";
import styles from '../styles/login.scss';

export default function AuthScreen() {
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(undefined);

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    const attemptLogin = async () => {
        // Start login
        setLoading(true);

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
            <Text style={styles.txt}>Log In</Text>
            <Text style={styles.err}>{error}</Text>

            <TextInput style={styles.inp} label="Email" value={email} onChangeText={setEmail} left={
                <TextInput.Icon icon="email" />
            } />

            <TextInput style={styles.inp} label="Password" secureTextEntry value={password} onChangeText={setPassword} left={
                <TextInput.Icon icon="lock" />
            } />

            <View style={styles.btncol}>
                <Button style={styles.btn} icon="login" loading={loading} disabled={loading} mode="contained" onPress={attemptLogin}>Log In</Button>

                <Button icon="account-plus" loading={loading} disabled={loading} mode="contained" onPress={attemptLogin}>Sign Up</Button>
            </View>
        </SafeAreaView >
    );
}