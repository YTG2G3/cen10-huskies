import { StatusBar } from "expo-status-bar";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { Button, IconButton, Snackbar, Switch, Text, TextInput } from "react-native-paper";
import { fauth, fuser } from "../lib/firebase";
import SiteContext from "../lib/site-context";
import styles from '../styles/login.scss'

export default function SignupScreen() {
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(undefined);
    let { dark, setDark } = useContext(SiteContext);

    let [first_name, setFirstName] = useState("");
    let [last_name, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    const attemptSignup = async () => {
        // Start sign up
        setLoading(true);

        // TODO - validity check

        // Sign up
        try {
            let { user } = await createUserWithEmailAndPassword(fauth, email, password);

            // Enter user data
            await setDoc(doc(fuser, user.uid), { first_name, last_name });
        } catch (err) {
            // TODO - error handling
            setError(err.message);
        }

        // Attempt complete (may be either success or fail)
        setLoading(false);
    }

    return (
        <KeyboardAvoidingView style={{ ...styles.container }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <StatusBar hidden />

            <Text style={styles.txt}>Sign Up</Text>

            <TextInput style={styles.inp} label="First Name" value={first_name} onChangeText={setFirstName} left={
                <TextInput.Icon icon="account" />
            } />

            <TextInput style={styles.inp} label="Last Name" value={last_name} onChangeText={setLastName} left={
                <TextInput.Icon icon="account" />
            } />

            <TextInput style={styles.inp} label="Email" value={email} onChangeText={setEmail} left={
                <TextInput.Icon icon="email" />
            } />

            <TextInput style={styles.inp} label="Password" secureTextEntry value={password} onChangeText={setPassword} left={
                <TextInput.Icon icon="lock" />
            } />

            {/* <View style={styles.inp}>
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
            </View> */}

            <View style={styles.btncol}>
                <Button style={styles.btn} icon="account-plus" loading={loading} disabled={loading} mode="contained" onPress={attemptSignup}>Sign Up</Button>
            </View>

            <Snackbar visible={error} onDismiss={() => setError(undefined)}>{error}</Snackbar>

            <View style={styles.rc}>
                <IconButton icon={dark ? "weather-night" : "weather-sunset"} size={30} />
                <Switch style={styles.swt} value={dark} onValueChange={setDark} />
            </View>
        </KeyboardAvoidingView>
    );
}