import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "@firebase/auth";
import { auth, db } from "../firebase";
import * as Google from "expo-google-app-auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import config from "./config";
const AuthContext = createContext({} as any);

//* AUTH CONTEXT GOOGLE CONFİG SECTION

export default function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState(null as any);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (temp) => {
      if (!error) {
        if (temp != null) {
          console.log("User Logged In");
          updateDoc(doc(db, `users`, temp.uid), {
            email: temp.email,
            uid: temp.uid,
            isFirstTime: false,
          })
            .catch((e) => {
              console.log(e);
              setDoc(doc(db, `users`, temp.uid), {
                email: temp.email,
                photoURL: temp.photoURL || "https://via.placeholder.com/150",
                uid: temp.uid,
                isFirstTime: true,
                chatWith: [],
              });
            })
            .then(() => {
              getDoc(doc(db, `users/${temp?.uid}`)).then((user: any) => {
                setCurrentUser(user.data());
                setLoading(false);
              });
            });
        } else {
          setCurrentUser(null);
          setLoading(false);
        }
      }
    });
    return () => {
      unsub();
    };
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    const result = await Google.logInAsync(config);
    if (result.type === "success") {
      const { idToken, accessToken } = result;
      const credential = GoogleAuthProvider.credential(idToken, accessToken);

      await signInWithCredential(auth, credential);
    } else {
      Promise.reject();
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth).catch((error) => {
      console.log(error);
    });
    setCurrentUser(null);
  };
  const memorizedVal = useMemo(() => ({
    currentUser,
    signInWithGoogle,
    logout,
    isLoggedIn: !!currentUser,
  }), [currentUser]);

  return (
    <AuthContext.Provider
      value={memorizedVal}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
