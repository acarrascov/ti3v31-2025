// ✅ Componente de encabezado (header) de la SPA
export default function Header() {
  return (
    // 🎨 Fondo azul profundo (paleta oficial), texto blanco, padding vertical y sombra inferior
    <header className="bg-[#1B1F3B] text-white py-6 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        {/* 📝 Título principal (centrado, negrita, adaptativo en tamaño) */}
        {/* El texto ahora será blanco al heredar de text-white del header */}
       <h1 className="text-xl md:text-1xl font-bold text-center">
          📋 Inscripciones a Talleres - Raíces Digitales
        </h1>
      </div>
    </header>
  );
}