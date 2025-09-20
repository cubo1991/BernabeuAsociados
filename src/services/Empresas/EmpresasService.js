export async function getEmpresasSafe(setStateCallback) {
  try {
    const res = await fetch('http://localhost:3001/empresas');
    if (!res.ok) throw new Error('Error al obtener empresas');
    const data = await res.json();
    setStateCallback(data);
  } catch (err) {
    console.error(err);
  }
}