// Firebase init
import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { getStorage, ref } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyAjOGtB8_9QaUlxiRJoZ3ToqS7ub5zR6pc",
    authDomain: "cen10-huskies-fb.firebaseapp.com",
    projectId: "cen10-huskies-fb",
    storageBucket: "cen10-huskies-fb.appspot.com",
    messagingSenderId: "57565473493",
    appId: "1:57565473493:web:9a7b883e263b6c7074905c"
};

const fapp = initializeApp(firebaseConfig);
const fauth = initializeAuth(fapp, { persistence: getReactNativePersistence(AsyncStorage) });
const fstore = getFirestore(fapp);
const fstorage = getStorage(fapp);

const fuser = collection(fstore, "user");
const fevent = collection(fstore, "event");
const freport = collection(fstore, "report");
const fstudent = collection(fstore, "student");
const falbum = ref(fstorage, "album");

export { fapp, fauth, fstore, fstorage, fuser, fevent, freport, fstudent, falbum };