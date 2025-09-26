"use client";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      localStorage.removeItem("user"); // 🔒 limpiar sesión local
      router.push("/login"); // 🔁 redirigir al login
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      alert("❌ No se pudo cerrar sesión");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
    >
      Cerrar sesión
    </button>
  );
}
