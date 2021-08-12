import Firebase from 'firebase/app'
import 'firebase/auth'

// config について一部省略。
const config = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
  // measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

const firebase = Firebase.apps.length ? Firebase.app() : Firebase.initializeApp(config)
export const auth = firebase.auth()

const googleProvider = new Firebase.auth.GoogleAuthProvider()
const facebookProvider = new Firebase.auth.FacebookAuthProvider()
export { googleProvider }
export { facebookProvider }
