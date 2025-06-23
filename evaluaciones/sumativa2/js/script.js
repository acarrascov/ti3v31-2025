document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    limpiarErrores();

    if (validarFormulario()) {
      alert("Formulario enviado con éxito");
      formulario.reset();
    }
  });
});

function limpiarErrores() {
  document.querySelectorAll(".error").forEach(span => span.textContent = "");
  document.querySelectorAll("input, select").forEach(campo => campo.classList.remove("input-error"));
}

function mostrarError(campoId, mensaje) {
  document.getElementById(`error-${campoId}`).textContent = mensaje;
  document.getElementById(campoId).classList.add("input-error");
}

function validarFormulario() {
  const campos = {
    rut: document.getElementById("rut"),
    fecha: document.getElementById("fecha"),
    correo: document.getElementById("correo"),
  };

  let valido = true;

  if (!validarRUT(campos.rut.value.trim())) {
    mostrarError("rut", "RUT inválido.");
    valido = false;
  }

  if (!validarFecha(campos.fecha.value.trim())) {
    mostrarError("fecha", "Debe tener al menos 14 años. O revise datos ingresados mm/dd/yyyy.");
    valido = false;
  }

  if (!validarCorreo(campos.correo.value.trim())) {
    mostrarError("correo", "Correo electrónico inválido.");
    valido = false;
  }

  return valido;
}

// --- Validaciones específicas ---

function validarRUT(rutCompleto) {
  rutCompleto = rutCompleto.replace(/\s+/g, "").toUpperCase();
  const rutRegex = /^\d{7,8}-[\dK]$/;
  if (!rutRegex.test(rutCompleto)) return false;

  const [cuerpo, dv] = rutCompleto.split("-");
  let suma = 0, multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = suma % 11;
  const dvEsperado = (11 - resto === 11) ? "0" :
                     (11 - resto === 10) ? "K" :
                     (11 - resto).toString();

  return dv === dvEsperado;
}

function validarFecha(fecha) {
  const fechaRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = fecha.match(fechaRegex);
  if (!match) return false;

  const [_, dd, mm, yyyy] = match.map(Number);
  if (dd < 1 || dd > 31 || mm < 1 || mm > 12) return false;

  const nacimiento = new Date(yyyy, mm - 1, dd);
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();

  const mesDiff = hoy.getMonth() - nacimiento.getMonth();
  if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < nacimiento.getDate())) edad--;

  return edad >= 14;
}

function validarCorreo(correo) {
  const correoRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return correoRegex.test(correo);
}