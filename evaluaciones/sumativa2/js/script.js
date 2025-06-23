document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  // Limpiar mensajes de error anteriores
  document.querySelectorAll(".error").forEach(span => span.textContent = "");
  document.querySelectorAll("input, select").forEach(campo => campo.classList.remove("input-error"));

  if (validarFormulario()) {
    alert("Formulario enviado con éxito"); // Aquí puedes reemplazar por mensaje visual si prefieres
    formulario.reset(); // Reiniciar el formulario
  }
});

function validarFormulario() {
  let valido = true;

  const rut = document.getElementById("rut");
  const fecha = document.getElementById("fecha");
  const correo = document.getElementById("correo");

  // Validar RUT
  if (!validarRUT(rut.value.trim())) {
    document.getElementById("error-rut").textContent = "RUT inválido.";
    rut.classList.add("input-error");
    valido = false;
  }

  if (!validarFecha(fecha.value.trim())) {
    document.getElementById("error-fecha").textContent = "Debe tener al menos 14 años. O revise datos ingresados mm/dd/yyyy.";
    fecha.classList.add("input-error");
    valido = false;
  }

  if (!validarCorreo(correo.value.trim())) {
    document.getElementById("error-correo").textContent = "Correo electrónico inválido.";
    correo.classList.add("input-error");
    valido = false;
  }

  return valido;
}

// Validación de RUT chileno
function validarRUT(rutCompleto) {
  rutCompleto = rutCompleto.replace(/\s+/g, "").toUpperCase();
  const rutRegex = /^\d{7,8}-[\dK]$/;
  if (!rutRegex.test(rutCompleto)) return false;

  const [cuerpo, dv] = rutCompleto.split("-");
  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i)) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = suma % 11;
  let dvEsperado = 11 - resto;
  if (dvEsperado === 11) dvEsperado = "0";
  else if (dvEsperado === 10) dvEsperado = "K";
  else dvEsperado = dvEsperado.toString();

  return dv === dvEsperado;
}

// Validación de fecha y edad
function validarFecha(fecha) {
  const fechaRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = fecha.match(fechaRegex);
  if (!match) return false;

  const dia = parseInt(match[1]);
  const mes = parseInt(match[2]);
  const anio = parseInt(match[3]);

  if (dia < 1 || dia > 31 || mes < 1 || mes > 12) return false;

  const hoy = new Date();
  const nacimiento = new Date(anio, mes - 1, dia);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;

  return edad >= 14;
}

// Validación de correo electrónico
function validarCorreo(correo) {
  const correoRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]+$/;
  if (!correoRegex.test(correo)) return false;

  const [parte1, dominioPais] = correo.split("@");
  const [dominio, pais] = dominioPais.split(".");
  return /^[a-zA-Z0-9]+$/.test(pais);
}