// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCvvEFS3s7GhzqMGcp5szjFk-_PP-XCjLM',
  authDomain: 'trading-platform-2024.firebaseapp.com',
  projectId: 'trading-platform-2024',
  storageBucket: 'trading-platform-2024.appspot.com',
  messagingSenderId: '166132272164',
  appId: '1:166132272164:web:df0d6e56d3404a3221dcb1'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
