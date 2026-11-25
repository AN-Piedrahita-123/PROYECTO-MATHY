
// ============================================
// INICIO DE SESIÓN - JAD MATHY
// ============================================

// Seleccionar los elementos del HTML
const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginMessage = document.getElementById("loginMessage");
const loginButton = document.getElementById("loginButton");

// Seleccionar el icono para mostrar u ocultar contraseña
const passwordIcon = document.querySelector(".input-wrapper .input-icon");


// ============================================
// FUNCIÓN PARA MOSTRAR MENSAJES
// ============================================

function mostrarMensaje(mensaje, tipo) {

    loginMessage.textContent = mensaje;

    loginMessage.className = tipo;

}


// ============================================
// FUNCIÓN PARA LIMPIAR MENSAJES
// ============================================

function limpiarMensaje() {

    loginMessage.textContent = "";

    loginMessage.className = "";

}


// ============================================
// VALIDAR CORREO ELECTRÓNICO
// ============================================

function validarCorreo() {

    const correo = emailInput.value.trim();

    if (correo === "") {

        emailInput.setCustomValidity("Ingresa tu correo electrónico.");

        return false;

    }

    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionCorreo.test(correo)) {

        emailInput.setCustomValidity("Ingresa un correo electrónico válido.");

        return false;

    }

    emailInput.setCustomValidity("");

    return true;

}


// ============================================
// VALIDAR CONTRASEÑA
// ============================================

function validarPassword() {

    const password = passwordInput.value;

    if (password.trim() === "") {

        passwordInput.setCustomValidity("Ingresa tu contraseña.");

        return false;

    }

    passwordInput.setCustomValidity("");

    return true;

}


// ============================================
// MOSTRAR Y OCULTAR CONTRASEÑA
// ============================================

function cambiarVisibilidadPassword() {

    const estaOculta = passwordInput.type === "password";

    passwordInput.type = estaOculta ? "text" : "password";

    passwordIcon.setAttribute(
        "aria-label",
        estaOculta ? "Ocultar contraseña" : "Mostrar contraseña"
    );

    passwordIcon.alt = estaOculta
        ? "Ocultar contraseña"
        : "Mostrar contraseña";

}


// Detectar clic en el icono
passwordIcon.addEventListener("click", cambiarVisibilidadPassword);


// Permitir utilizar el icono con el teclado
passwordIcon.addEventListener("keydown", function(event) {

    if (event.key === "Enter" || event.key === " ") {

        event.preventDefault();

        cambiarVisibilidadPassword();

    }

});


// ============================================
// VALIDAR FORMULARIO AL INICIAR SESIÓN
// ============================================

loginForm.addEventListener("submit", function(event) {

    // Evitar el envío automático del formulario
    event.preventDefault();

    limpiarMensaje();

    // Ejecutar las validaciones
    const correoValido = validarCorreo();

    const passwordValida = validarPassword();


    // Comprobar si los campos son válidos
    if (!correoValido || !passwordValida) {

        mostrarMensaje(
            "Por favor, revisa los datos ingresados.",
            "error"
        );

        loginForm.reportValidity();

        return;

    }


    // Si todo está correcto
    mostrarMensaje(
        "Los datos tienen un formato válido. El inicio de sesión está listo para conectarse con el servidor.",
        "success"
    );

    console.log("Correo:", emailInput.value.trim());

    console.log("Validación del formulario completada.");

});


// ============================================
// LIMPIAR ERRORES AL ESCRIBIR
// ============================================

emailInput.addEventListener("input", function() {

    emailInput.setCustomValidity("");

    limpiarMensaje();

});


passwordInput.addEventListener("input", function() {

    passwordInput.setCustomValidity("");

    limpiarMensaje();

});


// ============================================
// BOTONES DE INICIO DE SESIÓN SOCIAL
// ============================================

document.getElementById("googleLogin").addEventListener("click", function() {

    mostrarMensaje(
        "El inicio de sesión con Google todavía no está configurado.",
        "error"
    );

});


document.getElementById("facebookLogin").addEventListener("click", function() {

    mostrarMensaje(
        "El inicio de sesión con Facebook todavía no está configurado.",
        "error"
    );

});


// ============================================
// MENSAJE DE INICIALIZACIÓN
// ============================================

console.log("JAD Mathy: formulario de inicio de sesión cargado.");
