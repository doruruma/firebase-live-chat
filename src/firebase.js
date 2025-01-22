import { initializeApp } from "firebase/app"
import { addDoc, collection, getFirestore } from "firebase/firestore"
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { createUserWithEmailAndPassword } from "firebase/auth/cordova"
import { removeLocalStorage, setLocalStorage } from "./local_storage"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

onAuthStateChanged(auth, (user) => {
  if (user) {
    setLocalStorage("firebase_user", user)
    return
  }
  removeLocalStorage("firebase_user")
})

export const firebaseSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    return { data: userCredential.user, status: true }
  } catch (error) {
    return { error: error.code, status: false }
  }
}

export const firebaseSignIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    return { data: userCredential.user, status: true }
  } catch (error) {
    return { error: error.code, status: false }
  }
}

export const storeUser = async (name, phone, email, room_id = null) => {
  try {
    const data = await addDoc(collection(db, "users"), {
      name,
      phone,
      email,
      room_id,
    })
    return { data, status: true }
  } catch (error) {
    return { error: error.code, status: false }
  }
}
