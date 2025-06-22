document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault(); 
  if (validarFormulario()) {
    alert("Formulario enviado con éxito");    
  }
});

function validarFormulario() {
  const rut = document.getElementById("rut").value.trim();
  const fecha = document.getElementById("fecha").value.trim();
  const correo = document.getElementById("correo").value.trim();

  if (!validarRUT(rut)) {
    alert("RUT inválido");
    return false;
  }

  if (!validarFecha(fecha)) {
    alert("Debe tener al menos 14 años y usar el formato dd/mm/aaaa");
    return false;
  }

  if (!validarCorreo(correo)) {
    alert("Correo electrónico inválido");
    return false;
  }

  return true;
}
function validarRUT(rutCompleto) {
  // Eliminar espacios y convertir a mayúsculas
  rutCompleto = rutCompleto.replace(/\s+/g, "").toUpperCase();

  // Validar formato general
  const rutRegex = /^\d{7,8}-[\dK]$/;
  if (!rutRegex.test(rutCompleto)) {
    return false;
  }

  // Separar cuerpo y dígito verificador
  const [cuerpo, dv] = rutCompleto.split("-");

  // Calcular dígito verificador esperado
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
function validarFecha(fecha) {
  // Validar formato con expresión regular
  const fechaRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = fecha.match(fechaRegex);
  if (!match) return false;

  const dia = parseInt(match[1]);
  const mes = parseInt(match[2]);
  const anio = parseInt(match[3]);

  // Verificar rangos válidos
  if (dia < 1 || dia > 31 || mes < 1 || mes > 12 || anio < 0 || anio > 9999) {
    return false;
  }

  // Calcular edad
  const hoy = new Date();
  const fechaNacimiento = new Date(anio, mes - 1, dia); // JS cuenta los meses desde 0

  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const m = hoy.getMonth() - fechaNacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }

  return edad >= 14;
}

function validarCorreo(correo) {
  // Expresión regular personalizada según los requisitos
  const correoRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]+$/;

  // Verifica formato general
  if (!correoRegex.test(correo)) {
    return false;
  }

  // Extraer partes para validaciones adicionales
  const [parte1, dominioPais] = correo.split("@");
  const [dominio, pais] = dominioPais.split(".");

  // Validar que país no tenga puntos ni guiones
  const paisValido = /^[a-zA-Z0-9]+$/.test(pais);
  return paisValido;
}