"use client"; // 🔒 Indica que este componente usa lógica del cliente (hooks, eventos)

import { useState, useEffect } from "react";
// Importamos el componente de lista de inscripciones
import InscripcionesList from "./components/InscripcionesList"; // 🧩 Lista de inscripciones

export default function Home() {
  // 🎯 Estados para guardar datos y controlar carga
  const [inscripciones, setInscripciones] = useState([]); // Guardará las inscripciones unidas con taller
  const [cargando, setCargando] = useState(true); // Bandera para saber si los datos se están cargando

  useEffect(() => {
    // 📡 Función asíncrona para obtener datos desde Firebase
    async function obtenerDatos() {
      try {
        // 🧾 Llamamos a ambos endpoints (inscripciones y talleres)
        const [resInsc, resTall] = await Promise.all([
          fetch("https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/inscripciones.json"),
          fetch("https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/talleres.json"),
        ]);

        // 🔄 Convertimos la respuesta a formato JSON
        const [dataInsc, dataTall] = await Promise.all([
          resInsc.json(),
          resTall.json()
        ]);

        // 🧹 Eliminamos valores nulos del arreglo (por si hay un índice [null])
        const inscripcionesLimpias = (dataInsc || []).filter(Boolean);
        const talleresLimpios = (dataTall || []).filter(Boolean);

        // 🔗 Relacionamos cada inscripción con el taller completo
        const inscripcionesCompletas = inscripcionesLimpias.map((ins) => {
          const tallerRelacionado = talleresLimpios.find(t => t.id === ins.taller);
          return {
            ...ins,               // Copiamos los datos de inscripción
            taller: tallerRelacionado || {} // Añadimos el taller correspondiente
          };
        });

        // 💾 Guardamos las inscripciones ya combinadas
        setInscripciones(inscripcionesCompletas);
      } catch (error) {
        console.error("Error al cargar datos desde Firebase:", error);
      } finally {
        setCargando(false); // 🔄 Ya terminó de cargar
      }
    }

    obtenerDatos(); // Ejecutamos la función cuando se monta el componente
  }, []); // ⬅️ Solo se ejecuta una vez al cargar la página

  return (
    <main className="min-h-screen bg-white text-gray-800">
      
      {cargando ? (
        // 🔄 Mientras carga, muestra este mensaje
        <p className="text-center text-gray-600 mt-10">Cargando inscripciones...</p>
      ) : (
        // ✅ Cuando ya están cargadas, mostramos el listado
        <InscripcionesList inscripciones={inscripciones} />
      )}

    </main>
  );
}
