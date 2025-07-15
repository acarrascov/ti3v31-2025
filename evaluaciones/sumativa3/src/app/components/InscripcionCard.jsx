// Este componente recibe una inscripción individual como prop
export default function InscripcionCard({ inscripcion }) {
  const {
    nombres,
    apellidos,
    correo,
    taller
  } = inscripcion;

  return (
    <div className="bg-[#F5F5F5] border border-[#F0C808] rounded-lg p-4 shadow-sm">
      {/* Nombre completo */}
      <h2 className="text-lg font-bold text-[#2E2E2E]">
        {nombres} {apellidos}
      </h2>

      {/* Correo */}
      <p className="text-sm text-gray-700 mt-1">{correo}</p>

      <hr className="my-3" />

      {/* Nombre del taller */}
      <p className="text-lg font-semibold text-[#2E2E2E]">
        Taller: {taller?.nombre || "No asignado"}
      </p>

      {/* Descripción del taller */}
      <p className="text-sm text-gray-700 mt">
        {taller?.descripcion || "Sin descripción disponible."}
      </p>

      {/* Profesor a cargo */}
      <p className="text-sm text-gray-700 mt-1">
        Profesor: {taller?.profesor || "No especificado"}
      </p>
    </div>
  );
}