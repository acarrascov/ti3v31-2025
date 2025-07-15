// Importamos la fuente Montserrat desde Google Fonts
import { Montserrat } from "next/font/google";
import Header from './components/Header';
import Footer from './components/Footer';

// Importamos los estilos globales definidos en globals.css
import './globals.css';

// Configuramos la fuente Montserrat para usarla como variable CSS
const montserrat = Montserrat({
  subsets: ['latin'],               // Subconjunto latino para caracteres en español
  weight: ['400', '600', '700'],   // Pesos de la fuente que se usarán en el proyecto
  variable: '--font-montserrat'    // Nombre de la variable que se usará en el body
});

// Definimos los metadatos para el proyecto (SEO)
export const metadata = {
  title: 'Inscripciones a Talleres',  // Título que aparece en la pestaña del navegador
  description: 'SPA para visualizar inscripciones en Raíces Digitales',
};

// Componente layout que envuelve todo el sitio web
export default function RootLayout({ children }) {
  return (
    <html lang="es"> {/* Idioma del sitio configurado en español */}
      <body className={montserrat.variable}> {/* Aplicamos la fuente Montserrat */}
        {/* Encabezado global del sitio */}
       <Header /> {/* ✅ Header.jsx se usa correctamente aquí */}
        {/* Aquí se inyectan las páginas hijas, como page.js */}
        {children}
        {/* Pie de página fijo */}
        <Footer /> {/* ✅ Footer.jsx se usa correctamente aquí */}
      </body>
    </html>
  );
}