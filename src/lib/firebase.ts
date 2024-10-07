import { type FirebaseOptions, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { env } from "./env";

const firebaseConfig: FirebaseOptions = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
};

export const firebase = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(firebase);
