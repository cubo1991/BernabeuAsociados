// lib/scripts/runUploadUsers.js
import dotenv from 'dotenv';
dotenv.config(); // Carga automática desde .env en la raíz

import { uploadUsers } from './uploadUsers.js'; // 👈 extensión .js obligatoria

const run = async () => {
  try {
    await uploadUsers();
    console.log("✅ Script finalizado correctamente");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error al ejecutar el script:", err.message);
    process.exit(1);
  }
};

run();
