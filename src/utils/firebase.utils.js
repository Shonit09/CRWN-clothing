import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
 } from 'firebase/auth';
 import {
    getFirestore,
    doc,
    getDoc,
    setDoc
 } from 'firebase/firestore'

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp7kOptnvEiL71FfeWG0s9IzPXVxFmkxA",
  authDomain: "crwn-clothing-db-1adea.firebaseapp.com",
  projectId: "crwn-clothing-db-1adea",
  storageBucket: "crwn-clothing-db-1adea.appspot.com",
  messagingSenderId: "755583440296",
  appId: "1:755583440296:web:872cd330816adb2f84f99d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider=new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth=getAuth();
export const signInWithGooglePopup=()=>signInWithPopup(auth,provider);

export const db=getFirestore();

export const createUserDocumentFromAuth=async(userAuth)=>{
    const userDocRef=doc(db, 'users', userAuth.uid)

    const userSnapshot=await getDoc(userDocRef);

    //if user does not exist
    if(!userSnapshot.exists()){
        //create/set the document with the data from userAuth in my collection
        const { displayName,email }=userAuth;
        const createdAt=new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
            });
        }
        catch(error){
            console.log('error creating the user',error.message)
        }
    }

    return userDocRef;
};