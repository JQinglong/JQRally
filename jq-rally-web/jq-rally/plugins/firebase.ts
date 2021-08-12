// // import firebase from 'firebase'
// import firebase from 'firebase/app'
// import 'firebase/auth'

// const firebaseConfig = {
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID
// }

// const googleProvider = new firebase.auth.GoogleAuthProvider()
// const facebookProvider = new firebase.auth.FacebookAuthProvider()

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig)
// }

// export const auth = firebase.auth()

// // export default firebase
// export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

// export { googleProvider }
// export { facebookProvider }
