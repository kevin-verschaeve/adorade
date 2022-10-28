import { initializeApp } from 'firebase/app'    
import { getFirestore } from 'firebase/firestore'
import variables from '$lib/variables'

const firebaseConfig = {
    apiKey: variables.firebaseApiKey,
    authDomain: "serial-looser.firebaseapp.com",
    databaseURL: "https://serial-looser.firebaseio.com",
    projectId: "serial-looser",
    storageBucket: "serial-looser.appspot.com",
    messagingSenderId: "855451240542",
    appId: variables.firebaseAppId,
    measurementId: "G-YS0WMGBKX1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db,
}
