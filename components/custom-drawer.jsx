import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { signOut } from "firebase/auth";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { fauth } from "../lib/firebase";
import styles from '../styles/custom-drawer.scss';

export default function CustomDrawer(props) {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
            <View style={styles.ite}>
                <DrawerItemList {...props} />
            </View>

            <Button style={styles.btn} mode="contained" onPress={() => signOut(fauth)}>Logout</Button>
        </DrawerContentScrollView>
    );
}