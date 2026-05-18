import 'server-only'

import { getApps, initializeApp, cert, App } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

function createAdminApp(): App {
  const existingApps = getApps()
  if (existingApps.length > 0) {
    return existingApps[0]
  }

  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  })
}

const adminApp = createAdminApp()

export const adminDb = getFirestore(adminApp)
export const adminAuth = getAuth(adminApp)
