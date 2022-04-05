import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAAhhq6dSSBvXvRjaR-8plbIaLK99D-Hfk",
  authDomain: "todo-react-7f424.firebaseapp.com",
  projectId: "todo-react-7f424",
  storageBucket: "todo-react-7f424.appspot.com",
  messagingSenderId: "234522056941",
  appId: "1:234522056941:web:6d1d3ffd417fd01f6014e4"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)

const todosRef = collection(db, "todos")

export { db, auth, todosRef }