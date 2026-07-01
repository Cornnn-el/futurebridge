import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Config Firebase ini AMAN buat ditaruh di client-side.
// Keamanan data diatur lewat Firestore Security Rules (bukan lewat merahasiakan apiKey ini).
const firebaseConfig = {
    apiKey: "AIzaSyC9wn4IVNq4kT50rrvi5kVtzDO01S-IAV0",
    authDomain: "future-bridge-859a1.firebaseapp.com",
    projectId: "future-bridge-859a1",
    storageBucket: "future-bridge-859a1.firebasestorage.app",
    messagingSenderId: "694306880632",
    appId: "1:694306880632:web:e173e80985c03d016a018d",
    measurementId: "G-94RSFE28QD",
}

// getApps() guard biar gak double-init pas Next.js hot-reload
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const db = getFirestore(app)
export default app
