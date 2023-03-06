import { Image, SafeAreaView, Dimensions } from "react-native";
import styles from '../styles/splash.scss';
import { useSpring, animated, config } from "@react-spring/native";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from 'react-native-paper';

const { width, height } = Dimensions.get('window');
const logoDim = Math.min(width, height);
const logoMax = 250;

export default function SplashScreen({ loading, setLoading }) {
    // Fade animation
    let fadeAnim = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 100,
        config: config.molasses
    });

    // Jump animation
    let jumpAnim = useSpring({
        from: { marginTop: 100 },
        to: { marginTop: 0 },
        delay: 100,
        config: { friction: 10 },
        onRest: () => {
            setTimeout(() => {
                setLoading(true);

                // TODO - hard coding
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }, 500);
        }
    });

    return (
        <SafeAreaView style={styles.screen}>
            <StatusBar hidden />

            <animated.View style={{ ...styles.container, ...fadeAnim, ...jumpAnim }}>
                <Image style={{ width: logoDim * 0.8, height: logoDim * 0.8, maxWidth: logoMax, maxHeight: logoMax }} source={require('../assets/logo.png')} />
                <ActivityIndicator animating={loading} size="small" />
            </animated.View>
        </SafeAreaView>
    );
}