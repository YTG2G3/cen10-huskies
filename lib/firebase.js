// Firebase init
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAjOGtB8_9QaUlxiRJoZ3ToqS7ub5zR6pc",
    authDomain: "cen10-huskies-fb.firebaseapp.com",
    projectId: "cen10-huskies-fb",
    storageBucket: "cen10-huskies-fb.appspot.com",
    messagingSenderId: "57565473493",
    appId: "1:57565473493:web:9a7b883e263b6c7074905c"
};

const fapp = initializeApp(firebaseConfig);
const fauth = getAuth(fapp);
const fstore = getFirestore(fapp);

const fuser = collection(fstore, "user");

export { fapp, fauth, fstore, fuser };