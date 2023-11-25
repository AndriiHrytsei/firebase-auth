/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch(error) {
      console.error(error);
      return error.message
    }
  };
  
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch(error) {
      console.error(error);
      return error.message
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch(error) {
      console.error(error);
      return error.message
    }
  };
  
  const logOut = async () => {
    try {
      await signOut(auth)
    } catch(error) {
      console.error(error);
      return error.message
    }
  };


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('signed in');
      } else {
        console.log('not signed in');
      }
    })
  }, [])

  // console.log(auth?.currentUser);

  return (
    <div>
      <input
        type="email"
        placeholder="Email..."
        onChange={(e) => setEmail(e.currentTarget.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="Password..."
        onChange={(e) => setPassword(e.currentTarget.value)}
        value={password}
      />
      {/* Sign up with email and password */}
      <button onClick={signUp}>Sign Up</button>
      {/* Sign in with email and password */}
      <button onClick={signIn}>Sign In</button>
      {/* Sign in with google*/}
      <button onClick={signInWithGoogle}>Sign in with google</button>
      {/*Logout*/}
      <button onClick={logOut}>Log out</button>
    </div>
  );
};

export default Auth;
