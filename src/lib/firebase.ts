import { type FirebaseOptions, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { env } from "./env";

const firebaseConfig: FirebaseOptions = {
  apiKey: env.EXPO_PUBLIC_API_KEY,
  authDomain: env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: env.EXPO_PUBLIC_APP_ID,
};

export const firebase = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(firebase);
