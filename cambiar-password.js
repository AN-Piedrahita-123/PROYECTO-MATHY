
// ==========================================
// JAD MATHY - MODELO DE CAMBIO DE CONTRASEÑA
// ==========================================


// 1. SELECCIONAR LOS ELEMENTOS DEL FORMULARIO

const formulario = document.getElementById("passwordForm");

const nuevaPassword = document.getElementById("new-password");

const confirmarPassword =
    document.getElementById("confirm-password");

const botonVerificar =
    document.getElementById("verifyPassword");

const botonEnviar =
    document.getElementById("submitPassword");

const estadoVerificacion =
    document.getElementById("verificationStatus");

const mensaje =
    document.getElementById("passwordMessage");


// 2. VARIABLE PARA CONTROLAR LA VERIFICACIÓN

let passwordVerificada = false;


// 3. FUNCIÓN PARA MOSTRAR MENSAJES

function mostrarMensaje(texto, tipo) {

    mensaje.textContent = texto;

    mensaje.className = tipo;
}


// 4. FUNCIÓN PARA LIMPIAR MENSAJES

function limpiarMensaje() {

    mensaje.textContent = "";

    mensaje.className = "";
}


// 5. FUNCIÓN PARA OCULTAR EL ESTADO DE VERIFICACIÓN

function reiniciarVerificacion() {

    passwordVerificada = false;

    estadoVerificacion.hidden = true;

    limpiarMensaje();
}


// 6. VALIDAR LA NUEVA CONTRASEÑA

function validarNuevaPassword() {

    const clave = nuevaPassword.value;

    // Mínimo 8 y máximo 16 caracteres.
    // Debe contener al menos una letra y un número.

    const patron = /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/;

    if (clave === "") {

        nuevaPassword.setCustomValidity(
            "Debes ingresar una nueva contraseña."
        );

        return false;
    }

    if (!patron.test(clave)) {

        nuevaPassword.setCustomValidity(
            "La contraseña debe tener entre 8 y 16 caracteres e incluir letras y números."
        );

        return false;
    }

    nuevaPassword.setCustomValidity("");

    return true;
}


// 7. VALIDAR CONFIRMACIÓN DE CONTRASEÑA

function validarConfirmacion() {

    const clave = nuevaPassword.value;

    const confirmacion = confirmarPassword.value;

    if (confirmacion === "") {

        confirmarPassword.setCustomValidity(
            "Debes confirmar tu nueva contraseña."
        );

        return false;
    }

    if (clave !== confirmacion) {

        confirmarPassword.setCustomValidity(
            "Las contraseñas no coinciden."
        );

        return false;
    }

    confirmarPassword.setCustomValidity("");

    return true;
}


// 8. MOSTRAR Y OCULTAR CONTRASEÑAS

document.querySelectorAll(".input-icon").forEach((icono) => {

    function alternarPassword() {

        const input = icono.previousElementSibling;

        if (input.type === "password") {

            input.type = "text";

            icono.alt = "Ocultar contraseña";

            icono.setAttribute(
                "aria-label",
                "Ocultar contraseña"
            );

        } else {

            input.type = "password";

            icono.alt = "Mostrar contraseña";

            icono.setAttribute(
                "aria-label",
                "Mostrar contraseña"
            );

        }
    }

    icono.style.cursor = "pointer";

    // Activar con clic.

    icono.addEventListener("click", alternarPassword);

    // Activar con teclado.

    icono.addEventListener("keydown", (event) => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            alternarPassword();
        }

    });

});


// 9. BOTÓN VERIFICAR

botonVerificar.addEventListener("click", function() {

    limpiarMensaje();

    // Ejecutar las validaciones.

    const passwordValida = validarNuevaPassword();

    const confirmacionValida = validarConfirmacion();

    // Comprobar los resultados.

    if (!passwordValida || !confirmacionValida) {

        estadoVerificacion.hidden = true;

        passwordVerificada = false;

        mostrarMensaje(
            "Verifica los datos. Hay errores en las contraseñas.",
            "error"
        );

        formulario.reportValidity();

        return;
    }

    // Si todo está correcto, activar la verificación.

    passwordVerificada = true;

    estadoVerificacion.hidden = false;

    mostrarMensaje(
        "¡Excelente! La nueva contraseña cumple las condiciones.",
        "success"
    );

    console.log(
        "JAD Mathy: contraseña verificada correctamente."
    );

});


// 10. BOTÓN ENVIAR

formulario.addEventListener("submit", function(event) {

    // Evitar recargar la página.

    event.preventDefault();

    limpiarMensaje();

    // Comprobar nuevamente las contraseñas.

    const passwordValida = validarNuevaPassword();

    const confirmacionValida = validarConfirmacion();

    if (!passwordValida || !confirmacionValida) {

        passwordVerificada = false;

        estadoVerificacion.hidden = true;

        mostrarMensaje(
            "Debes corregir los errores antes de continuar.",
            "error"
        );

        formulario.reportValidity();

        return;
    }

    // Comprobar que el usuario haya presionado Verificar.

    if (!passwordVerificada) {

        mostrarMensaje(
            "Primero debes verificar tu nueva contraseña.",
            "error"
        );

        return;
    }

    // Mostrar resultado de la validación.

    mostrarMensaje(
        "¡Perfecto! La contraseña está validada y lista para enviarse al servidor.",
        "success"
    );

    console.log(
        "JAD Mathy: formulario de cambio de contraseña validado."
    );

});


// 11. LIMPIAR ERRORES CUANDO CAMBIEN LOS CAMPOS

[nuevaPassword, confirmarPassword].forEach((campo) => {

    campo.addEventListener("input", function() {

        campo.setCustomValidity("");

        // Si el usuario modifica una contraseña,
        // debe volver a verificarla.

        reiniciarVerificacion();

    });

});


// 12. MENSAJE DE INICIALIZACIÓN

console.log(
    "JAD Mathy: modelo de cambio de contraseña cargado correctamente."
);
