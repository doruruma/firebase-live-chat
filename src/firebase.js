import { initializeApp } from "firebase/app"
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore"
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { createUserWithEmailAndPassword } from "firebase/auth/cordova"
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "./local_storage"

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

export const getUserDoc = async (email) => {
  try {
    const docRef = doc(db, "users", email)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) return { data: docSnap.data(), status: true }
    return { data: null, status: true }
  } catch (error) {
    return { error: error.code, status: false }
  }
}

export const upsertUser = async (params = {}) => {
  try {
    const ref = doc(db, "users", params.email)
    const data = await setDoc(ref, params)
    return { data, status: true }
  } catch (error) {
    return { error: error.code, status: false }
  }
}

export const updateCurrentUserRoomId = async (room_id) => {
  try {
    const email = getLocalStorage("firebase_user").email
    const ref = doc(db, "users", email)
    const data = await updateDoc(ref, { room_id })
    return { data, status: true }
  } catch (error) {
    return { error: error.code, status: false }
  }
}

export const insertChat = async (text) => {
  try {
    const { email, name, room_id } = getLocalStorage("user")
    const ref = await addDoc(collection(db, "chat"), {
      sender_email: email,
      sender_name: name,
      room_id,
      text,
      created_at: serverTimestamp(),
    })
    return { data: ref.id, status: true }
  } catch (error) {
    return { error: error.code, status: false }
  }
}

export const listenToChatsByRoomId = async (room_id, callBack = () => {}) => {
  try {
    const chatsQuery = query(
      collection(db, "chat"),
      where("room_id", "==", room_id),
      orderBy("created_at", "asc")
    )
    const unsubscribe = onSnapshot(chatsQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type != "removed") callBack(change.doc.data())
      })
    })
    return unsubscribe
  } catch (error) {
    console.log(error)
    return null
  }
}

export const listenToAuthenticatedUser = async (callBack = () => {}) => {
  try {
    const email = getLocalStorage("firebase_user").email
    const docRef = doc(db, "users", email)
    const unsubscribe = onSnapshot(docRef, (doc) => {
      callBack(doc.data())
    })
    return unsubscribe
  } catch (error) {
    console.log(error)
    return null
  }
}

window.updateCurrentUserRoomId = updateCurrentUserRoomId
