"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";



const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // 🔍 Buscar el documento del usuario por email
          const q = query(collection(db, "usuarios"), where("email", "==", firebaseUser.email));
          const snapshot = await getDocs(q);

          if (!snapshot.empty) {
            const userDoc = snapshot.docs[0];
            const profile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...userDoc.data()
            };
            localStorage.setItem("user", JSON.stringify(profile));
            setUser(profile);
          } else {
            // Si no se encuentra el documento, usar solo datos básicos
            setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
          }
        } catch (err) {
          console.error("Error al obtener usuario desde Firestore:", err);
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
        }
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
