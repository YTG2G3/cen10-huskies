import { getDownloadURL, listAll } from "firebase/storage";
import { useEffect, useState } from "react";
import { Dimensions, Image, SafeAreaView } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Portal, Surface, Text } from "react-native-paper";
import { falbum } from "../lib/firebase";
const { width, height } = Dimensions.get('window');
import styles from '../styles/album.scss';

export default function AlbumScreen() {
    // TODO - cache with separated pages
    let [cache, setCache] = useState([]);

    // Start loading
    useEffect(() => { loadData() }, []);

    const loadData = async () => {
        let a = await listAll(falbum);
        let tmp = [];

        for (let i of a.items) {
            let uri = await getDownloadURL(i);
            tmp.push({ file: uri });
        }

        setCache(tmp);
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <FlatList
                scrollEnabled={false}
                contentContainerStyle={{ alignSelf: 'flex-start' }}
                numColumns={5}
                data={cache}
                renderItem={({ item }) => <Image resizeMode="contain" style={{ width: width / 5, height: width / 5 }} source={{ uri: item.file }} />}
            />

            <Portal>
                <Surface>

                </Surface>
            </Portal>
        </ScrollView>
    );
}