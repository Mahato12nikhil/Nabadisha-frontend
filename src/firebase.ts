import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  storageBucket:import.meta.env.BUCKET_URL,
};
console.log('firebase called')
const app = initializeApp(firebaseConfig);


export const storage = getStorage(app);