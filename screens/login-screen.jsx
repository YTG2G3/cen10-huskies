import { useState } from "react";
import { SafeAreaView } from "react-native";
import { Text, TextInput } from "react-native-paper";

export default function LoginScreen() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    return (
        <SafeAreaView>
            <Text>Log In</Text>
            <TextInput label="Email" value={email} onChangeText={setEmail} left={
                <TextInput.Icon icon="email" />
            } />
            <TextInput label="Password" secureTextEntry value={password} onChangeText={setPassword} left={
                <TextInput.Icon icon="lock" />
            } />
        </SafeAreaView>
    );
}