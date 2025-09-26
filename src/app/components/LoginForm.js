"use client";

import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "../../../lib/firebase";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;

      // 🔍 Buscar el documento del usuario en Firestore por email
      const q = query(collection(db, "usuarios"), where("email", "==", userEmail));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError("Usuario no registrado en Firestore");
        return;
      }

      const userDoc = snapshot.docs[0];
      const userData = userDoc.data();

      // 🔐 Validar que tenga campo 'role'
      if (!userData.role) {
        setError("Este usuario no tiene rol asignado");
        return;
      }

      // ✅ Guardar sesión con rol
      localStorage.setItem("user", JSON.stringify({
        uid: userCredential.user.uid,
        email: userEmail,
        role: userData.role,
      }));

      // 🔁 Redirigir según rol
      if (userData.role === "admin") {
        router.push("/");
      } else {
        router.push("/"); // o a otra ruta según el rol
      }
    } catch (err) {
      console.error("Error al loguear:", err);
      setError("Credenciales inválidas o error de conexión");
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold text-center">Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
        Acceder
      </button>
    </form>
  );
}
