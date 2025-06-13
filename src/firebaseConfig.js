import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB1T8j8i0Ma8tCX6pVnN4rGiMSV18PMmAg',
  authDomain: 'kit-global-test-7a56f.firebaseapp.com',
  projectId: 'kit-global-test-7a56f',
  databaseURL:
    'https://kit-global-test-7a56f-default-rtdb.europe-west1.firebasedatabase.app/',
  storageBucket: 'kit-global-test-7a56f.firebasestorage.app',
  messagingSenderId: '766094959365',
  appId: '1:766094959365:web:58e780194a81a8e19d0d6c',
  measurementId: 'G-39C9LFC220',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
