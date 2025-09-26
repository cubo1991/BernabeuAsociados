'use client';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';


const users = [
  {
    uid: "1",
    email: "adavidlopezmathez@gmail.com",
    displayName: "David Lopez",
    role: "admin"
  },
  {
    uid: "2",
    email: "pedrojosebernabeu@gmail.com",
    displayName: "Pedro José Bernabeu",
    role: "admin"
  }
];

export default function CargarUsuariosButton() {
  const handleUpload = async () => {
    try {
      for (const user of users) {
        const ref = doc(db, 'usuarios', user.uid);
        await setDoc(ref, user);
        console.log(`✅ Usuario ${user.displayName} cargado`);
      }
      alert('🎉 Usuarios cargados correctamente');
    } catch (error) {
      console.error('❌ Error al cargar usuarios:', error);
      alert('Hubo un error al cargar los usuarios');
    }
  };

  return (
    <button
      onClick={handleUpload}
      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
    >
      Cargar usuarios admin
    </button>
  );
}
