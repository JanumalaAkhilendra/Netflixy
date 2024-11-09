// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB77kaw7K5ADwkxcc_l8bEJhBUC4zzNiP8",
  authDomain: "netflix-clone-d3776.firebaseapp.com",
  projectId: "netflix-clone-d3776",
  storageBucket: "netflix-clone-d3776.appspot.com",
  messagingSenderId: "943752793173",
  appId: "1:943752793173:web:6c8152e8a4320074d458dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider:"local",
            email,
        })
    } catch(error){
        console.log(error);
        toast.error(error.code);
    }
}

const login = async(email,password) =>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }catch (error){
        console.log(error);
        toast.error(error.code);
    }
}

const logout =()=>{
    signOut(auth);
}

export {auth,db,login, signup,logout}