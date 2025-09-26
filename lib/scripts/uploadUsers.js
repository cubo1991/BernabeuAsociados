// lib/scripts/uploadUsers.js
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase.js'; // Asegurate de que este archivo use módulos ES

// 🔍 Validación de configuración
const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

const missingVars = requiredEnvVars.filter((key) => !process.env[key]);
if (missingVars.length > 0) {
  console.error('❌ Variables de entorno faltantes:', missingVars.join(', '));
  process.exit(1);
}

// 👥 Usuarios a cargar
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

// 🔐 Validación de cada usuario
const validateUser = (user) => {
  const requiredFields = ['uid', 'email', 'displayName', 'role'];
  const missing = requiredFields.filter((field) => !user[field]);
  if (missing.length > 0) {
    throw new Error(`Usuario con UID ${user.uid} tiene campos faltantes: ${missing.join(', ')}`);
  }
};

export const uploadUsers = async () => {
  try {
    for (const user of users) {
      validateUser(user);
      const ref = doc(db, 'usuarios', user.uid);
      await setDoc(ref, user);
      console.log(`✅ Usuario ${user.displayName} cargado`);
    }
    console.log('🎉 Todos los usuarios fueron cargados correctamente');
  } catch (error) {
    console.error('❌ Error al cargar usuarios:', error.message);
    process.exit(1);
  }
};
