import { type FirebaseOptions, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBAsM-SKqq7qMKdBAvh2i2YioZqQNUMgGQ",
  authDomain: "dna-mecha-turbo-52e86.firebaseapp.com",
  projectId: "dna-mecha-turbo-52e86",
  storageBucket: "dna-mecha-turbo-52e86.appspot.com",
  messagingSenderId: "86762752951",
  appId: "1:86762752951:web:6c47595a7b294f580c7632",
};

export const firebase = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(firebase);
