import InscripcionCard from "./InscripcionCard"; // 🧩 Importamos el componente que representa cada tarjeta individual

// 🎯 Este componente recibe la lista completa de inscripciones desde page.js
export default function InscripcionesList({ inscripciones }) {

  // ❌ Si no hay inscripciones disponibles, se muestra un mensaje de advertencia
  if (inscripciones.length === 0) {
    return (
      <p className="text-center text-red-500 mt-10">
        ⚠️ No hay inscripciones disponibles en este momento.
      </p>
    );
  }

  // ✅ Si hay inscripciones, se muestran en un layout tipo grilla (grid)
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
      {inscripciones.map((inscripcion) => (
        // 🔄 Recorremos cada inscripción y la mostramos con el componente InscripcionCard
        <InscripcionCard key={inscripcion.id} inscripcion={inscripcion} />
      ))}
    </div>
  );
}