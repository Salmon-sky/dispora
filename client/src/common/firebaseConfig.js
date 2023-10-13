import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
  apiKey: "AIzaSyA_XESXcz0366VUC__0MHAWoqQBS8iq16Y",
  authDomain: "sistem-informasi-dispora-897e0.firebaseapp.com",
  projectId: "sistem-informasi-dispora-897e0",
  storageBucket: "sistem-informasi-dispora-897e0.appspot.com",
  messagingSenderId: "924042831493",
  appId: "1:924042831493:web:af90bbe30ca11020ababec",
  measurementId: "G-5NLN12N77B",
});
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;