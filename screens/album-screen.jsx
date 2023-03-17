import { getDownloadURL, getMetadata, listAll, ref, uploadBytes, uploadString } from "firebase/storage";
import { useEffect, useState } from "react";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { IconButton, Portal, Snackbar, Surface } from "react-native-paper";
import { falbum, fstorage } from "../lib/firebase";
const { width } = Dimensions.get('window');
import styles from '../styles/album.scss';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { compareAsc } from "date-fns";

export default function AlbumScreen() {
    // TODO - cache with separated pages
    let [cache, setCache] = useState([]);
    let [snk, setSnk] = useState(undefined);

    // Start loading
    useEffect(() => { loadData() }, []);

    const loadData = async () => {
        let a = await listAll(falbum);
        let tmp = [];

        let d = a.items.sort(async (a, b) => {
            let aa = await getMetadata(a);
            let bb = await getMetadata(b);

            let ax = new Date(aa.timeCreated);
            let bx = new Date(bb.timeCreated);

            return compareAsc(ax, bx);
        });

        for (let i of d) {
            let uri = await getDownloadURL(i);
            tmp.push({ file: uri });
        }

        setCache(tmp);
    }

    // Add new image
    const uploadImage = async () => {
        // Open library
        let res = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });

        // Canceled?
        if (res.canceled) return;

        // Upload details
        let { uri } = res.assets[0];
        let filename = uri.substring(uri.lastIndexOf('/') + 1);
        setSnk(`Uploading ${filename}...`);

        // Start uploading
        let blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
        await uploadBytes(ref(fstorage, `album/${Math.floor(Math.random() * 1000) + filename}`), blob);

        // Completed upload
        setSnk("Completed image upload.");
        loadData();
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

            <Portal style={styles.btncon}>
                <TouchableOpacity style={styles.btnpress} onPress={uploadImage}>
                    <Surface style={styles.btnwrap}>
                        <IconButton size={40} icon="plus" />
                    </Surface>
                </TouchableOpacity>

                <Snackbar visible={snk} onDismiss={() => setSnk(undefined)}>{snk}</Snackbar>
            </Portal>
        </ScrollView>
    );
}