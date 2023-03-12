import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { fauth } from "../lib/firebase";
import SiteContext from "../lib/site-context";
import styles from '../styles/custom-drawer.scss';

export default function CustomDrawer(props) {
    let { setUser } = useContext(SiteContext);

    const logout = () => {
        setUser(undefined);
        signOut(fauth);
    }

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
            <View style={styles.ite}>
                <DrawerItemList {...props} />
            </View>

            <Button style={styles.btn} mode="contained" onPress={logout}>Logout</Button>
        </DrawerContentScrollView>
    );
}