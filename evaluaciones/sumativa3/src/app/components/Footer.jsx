// ✅ Componente Footer corregido
export default function Footer() {
  return (
    <footer className="bg-[#2E2E2E] text-white text-center py-4 mt-10 w-full">
      <p className="text-sm">
        © {new Date().getFullYear()} Contacto: talleresurbanos@raicesdigitales.cl
      </p>
      <p>Síguenos: @RaicesDigitales</p>
    </footer>
  );
}