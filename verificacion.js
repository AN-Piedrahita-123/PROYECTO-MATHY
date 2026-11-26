
// ============================================
// VERIFICACIÓN DE CORREO - JAD MATHY
// ============================================

// Seleccionar elementos del HTML
const verificationForm = document.getElementById("verificationForm");

const emailInput = document.getElementById("email");

const sendCodeButton = document.getElementById("sendCodeButton");
const verifyCodeButton = document.getElementById("verifyCodeButton");

const sendMessage = document.getElementById("sendMessage");
const verificationMessage = document.getElementById("verificationMessage");

const otpSection = document.getElementById("otpSection");
const verificationStatus = document.getElementById("verificationStatus");

// Seleccionar las cuatro casillas del código
const otpInputs = [
    document.getElementById("digit1"),
    document.getElementById("digit2"),
    document.getElementById("digit3"),
    document.getElementById("digit4")
];

// Variables para controlar la verificación
let codigoGenerado = "";
let correoVerificado = "";
let codigoEnviado = false;
let correoValidado = false;


// ============================================
// MOSTRAR MENSAJES
// ============================================

function mostrarMensaje(elemento, mensaje, tipo) {

    elemento.textContent = mensaje;
    elemento.className = tipo;

}


// ============================================
// LIMPIAR MENSAJES
// ============================================

function limpiarMensajes() {

    sendMessage.textContent = "";
    sendMessage.className = "";

    verificationMessage.textContent = "";
    verificationMessage.className = "";

}


// ============================================
// VALIDAR CORREO ELECTRÓNICO
// ============================================

function validarCorreo() {

    const correo = emailInput.value.trim();

    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (correo === "") {

        emailInput.setCustomValidity(
            "Debes ingresar tu correo electrónico."
        );

        emailInput.reportValidity();

        return false;

    }

    if (!expresionCorreo.test(correo)) {

        emailInput.setCustomValidity(
            "Ingresa un correo electrónico válido."
        );

        emailInput.reportValidity();

        return false;

    }

    emailInput.setCustomValidity("");

    return true;

}


// ============================================
// GENERAR CÓDIGO DE SEGURIDAD
// ============================================

function generarCodigo() {

    const numero = new Uint32Array(1);

    crypto.getRandomValues(numero);

    return String(numero[0] % 10000).padStart(4, "0");

}


// ============================================
// LIMPIAR CASILLAS DEL CÓDIGO
// ============================================

function limpiarCodigo() {

    otpInputs.forEach(function(input) {

        input.value = "";

    });

}


// ============================================
// ENVIAR CÓDIGO
// ============================================

sendCodeButton.addEventListener("click", function() {

    limpiarMensajes();

    // Validar el correo
    if (!validarCorreo()) {

        return;

    }

    const correoActual = emailInput.value.trim().toLowerCase();

    // Generar código de prueba
    codigoGenerado = generarCodigo();

    correoVerificado = correoActual;

    codigoEnviado = true;
    correoValidado = false;

    // Mostrar sección para ingresar el código
    otpSection.hidden = false;

    // Ocultar estado de verificación anterior
    verificationStatus.hidden = true;

    // Limpiar las casillas
    limpiarCodigo();

    // Mostrar mensaje de envío
    mostrarMensaje(
        sendMessage,
        "Se generó un código de prueba para tu verificación.",
        "status-success"
    );

    // Mostrar el código en la consola para realizar pruebas
    console.log("Código de prueba JAD Mathy:", codigoGenerado);

    console.log("Correo:", correoVerificado);

    // Llevar el cursor a la primera casilla
    otpInputs[0].focus();

});


// ============================================
// CONTROLAR LOS CUATRO DÍGITOS
// ============================================

otpInputs.forEach(function(input, index) {

    // Permitir solamente números
    input.addEventListener("input", function() {

        input.value = input.value.replace(/\D/g, "").slice(0, 1);

        limpiarMensajes();

        correoValidado = false;
        verificationStatus.hidden = true;

        // Pasar a la siguiente casilla
        if (input.value !== "" && index < otpInputs.length - 1) {

            otpInputs[index + 1].focus();

        }

    });


    // Retroceder a la casilla anterior
    input.addEventListener("keydown", function(event) {

        if (event.key === "Backspace" && input.value === "" && index > 0) {

            otpInputs[index - 1].focus();

        }

    });

});


// ============================================
// PEGAR EL CÓDIGO COMPLETO
// ============================================

otpInputs[0].addEventListener("paste", function(event) {

    event.preventDefault();

    const textoPegado = event.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 4);

    otpInputs.forEach(function(input, index) {

        input.value = textoPegado[index] || "";

    });

    limpiarMensajes();

    correoValidado = false;
    verificationStatus.hidden = true;

    // Enfocar la última casilla disponible
    const siguienteVacio = otpInputs.find(function(input) {

        return input.value === "";

    });

    if (siguienteVacio) {

        siguienteVacio.focus();

    } else {

        otpInputs[3].focus();

    }

});


// ============================================
// VERIFICAR CÓDIGO
// ============================================

verifyCodeButton.addEventListener("click", function() {

    limpiarMensajes();

    // Comprobar que se haya enviado un código
    if (!codigoEnviado) {

        mostrarMensaje(
            verificationMessage,
            "Primero debes solicitar un código de seguridad.",
            "error"
        );

        return;

    }

    // Comprobar que el correo no haya cambiado
    const correoActual = emailInput.value.trim().toLowerCase();

    if (correoActual !== correoVerificado) {

        mostrarMensaje(
            verificationMessage,
            "El correo cambió. Debes solicitar un nuevo código.",
            "error"
        );

        otpSection.hidden = true;
        codigoEnviado = false;

        return;

    }

    // Obtener los cuatro dígitos
    const codigoIngresado = otpInputs.map(function(input) {

        return input.value;

    }).join("");


    // Comprobar que se hayan ingresado los cuatro dígitos
    if (codigoIngresado.length !== 4) {

        mostrarMensaje(
            verificationMessage,
            "Debes ingresar los cuatro dígitos del código.",
            "error"
        );

        return;

    }


    // Comparar el código ingresado con el generado
    if (codigoIngresado !== codigoGenerado) {

        correoValidado = false;

        verificationStatus.hidden = true;

        mostrarMensaje(
            verificationMessage,
            "El código ingresado es incorrecto. Inténtalo nuevamente.",
            "error"
        );

        return;

    }


    // Verificación exitosa
    correoValidado = true;

    verificationStatus.hidden = false;

    mostrarMensaje(
        verificationMessage,
        "Tu correo electrónico fue verificado correctamente.",
        "success"
    );

    console.log("Correo verificado correctamente:", correoVerificado);

});


// ============================================
// DETECTAR CAMBIOS EN EL CORREO
// ============================================

emailInput.addEventListener("input", function() {

    emailInput.setCustomValidity("");

    limpiarMensajes();

    // Si el usuario modifica el correo,
    // debe solicitar un nuevo código.
    if (
        codigoEnviado &&
        emailInput.value.trim().toLowerCase() !== correoVerificado
    ) {

        codigoEnviado = false;
        correoValidado = false;

        codigoGenerado = "";

        otpSection.hidden = true;
        verificationStatus.hidden = true;

        limpiarCodigo();

    }

});


// ============================================
// INICIALIZACIÓN
// ============================================

console.log("JAD Mathy: módulo de verificación cargado.");
