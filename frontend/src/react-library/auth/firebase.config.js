// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FBapiKey,
	authDomain: import.meta.env.VITE_FBauthDomain,
	projectId: import.meta.env.VITE_FBprojectId,
	storageBucket: import.meta.env.VITE_FBstorageBucket,
	messagingSenderId: import.meta.env.VITE_FBmessagingSenderId,
	appId: import.meta.env.VITE_FBappId
};

console.log( import.meta.env.VITE_FBapiKey )

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };