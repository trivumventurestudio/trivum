import { getApps, getApp, initializeApp, FirebaseApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getAuth, Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

function createClientApp(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(firebaseConfig)
}

const clientApp = createClientApp()

export const clientDb: Firestore = getFirestore(clientApp)
export const clientAuth: Auth = getAuth(clientApp)
