
/* ==========================================
   JAD MATHY - MODELO DE REGISTRO
   ========================================== */


// 1. SELECCIONAR LOS ELEMENTOS DEL FORMULARIO

const formulario = document.getElementById("registerForm");

const nickname = document.getElementById("nickname");
const birthdate = document.getElementById("birthdate");

const email = document.getElementById("email");
const confirmEmail = document.getElementById("confirm-email");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

const terms = document.getElementById("terms");
const privacy = document.getElementById("privacy");

const mensaje = document.getElementById("registerMessage");


// 2. ESTABLECER FECHA MÁXIMA DE NACIMIENTO

// Evitar que el usuario seleccione fechas futuras.

const hoy = new Date();

const fechaActual = [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, "0"),
    String(hoy.getDate()).padStart(2, "0")
].join("-");

birthdate.max = fechaActual;


// 3. FUNCIÓN PARA CALCULAR LA EDAD

function calcularEdad(fechaNacimiento) {

    const hoy = new Date();

    const nacimiento = new Date(
        fechaNacimiento + "T00:00:00"
    );

    let edad = hoy.getFullYear() - nacimiento.getFullYear();

    const diferenciaMes =
        hoy.getMonth() - nacimiento.getMonth();

    if (
        diferenciaMes < 0 ||
        (
            diferenciaMes === 0 &&
            hoy.getDate() < nacimiento.getDate()
        )
    ) {
        edad--;
    }

    return edad;
}


// 4. FUNCIÓN PARA MOSTRAR MENSAJES

function mostrarMensaje(texto, tipo) {

    mensaje.textContent = texto;

    mensaje.className = tipo;
}


// 5. FUNCIÓN PARA LIMPIAR MENSAJES

function limpiarMensaje() {

    mensaje.textContent = "";

    mensaje.className = "";
}


// 6. VALIDAR NOMBRE DE NICK

function validarNickname() {

    const nombre = nickname.value.trim();

    const patron = /^[a-zA-Z0-9_]{3,20}$/;

    if (nombre === "") {

        nickname.setCustomValidity(
            "Debes ingresar un nombre de Nick."
        );

        return false;
    }

    if (!patron.test(nombre)) {

        nickname.setCustomValidity(
            "El Nick debe tener entre 3 y 20 caracteres. Usa letras, números o guion bajo."
        );

        return false;
    }

    nickname.setCustomValidity("");

    return true;
}


// 7. VALIDAR FECHA DE NACIMIENTO

function validarFecha() {

    if (!birthdate.value) {

        birthdate.setCustomValidity(
            "Debes ingresar tu fecha de nacimiento."
        );

        return false;
    }

    const fecha = new Date(
        birthdate.value + "T00:00:00"
    );

    if (
        Number.isNaN(fecha.getTime()) ||
        fecha.toISOString().slice(0, 10) !== birthdate.value
    ) {

        birthdate.setCustomValidity(
            "La fecha ingresada no es válida."
        );

        return false;
    }

    if (birthdate.value > fechaActual) {

        birthdate.setCustomValidity(
            "La fecha de nacimiento no puede ser futura."
        );

        return false;
    }

    const edad = calcularEdad(birthdate.value);

    if (edad < 8 || edad > 200) {

        birthdate.setCustomValidity(
            "Mathy está dirigido a usuarios de 8 años en adelante."
        );

        return false;
    }

    birthdate.setCustomValidity("");

    return true;
}


// 8. VALIDAR CORREO ELECTRÓNICO

function validarCorreo() {

    email.setCustomValidity("");
    confirmEmail.setCustomValidity("");

    const correo = email.value.trim().toLowerCase();

    const confirmacion =
        confirmEmail.value.trim().toLowerCase();

    if (!email.value.trim()) {

        email.setCustomValidity(
            "Debes ingresar tu correo electrónico."
        );

        return false;
    }

    if (!email.checkValidity()) {

        email.setCustomValidity(
            "Ingresa un correo electrónico válido."
        );

        return false;
    }

    if (!confirmEmail.value.trim()) {

        confirmEmail.setCustomValidity(
            "Debes confirmar tu correo electrónico."
        );

        return false;
    }

    if (!confirmEmail.checkValidity()) {

        confirmEmail.setCustomValidity(
            "Ingresa un correo de confirmación válido."
        );

        return false;
    }

    if (correo !== confirmacion) {

        confirmEmail.setCustomValidity(
            "Los correos electrónicos no coinciden."
        );

        return false;
    }

    return true;
}


// 9. VALIDAR CONTRASEÑA

function validarPassword() {

    const clave = password.value;

    const patron = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

    if (clave === "") {

        password.setCustomValidity(
            "Debes ingresar una contraseña."
        );

        return false;
    }

    if (!patron.test(clave)) {

        password.setCustomValidity(
            "La contraseña debe tener mínimo 8 caracteres y contener letras y números."
        );

        return false;
    }

    password.setCustomValidity("");

    return true;
}


// 10. VALIDAR CONFIRMACIÓN DE CONTRASEÑA

function validarConfirmacionPassword() {

    if (confirmPassword.value === "") {

        confirmPassword.setCustomValidity(
            "Debes confirmar tu contraseña."
        );

        return false;
    }

    if (password.value !== confirmPassword.value) {

        confirmPassword.setCustomValidity(
            "Las contraseñas no coinciden."
        );

        return false;
    }

    confirmPassword.setCustomValidity("");

    return true;
}


// 11. MOSTRAR Y OCULTAR CONTRASEÑAS

document.querySelectorAll(".input-icon").forEach((icono) => {

    const alternarPassword = () => {

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
    };

    icono.style.cursor = "pointer";

    // Activar mediante clic.

    icono.addEventListener("click", alternarPassword);

    // Activar mediante teclado.

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


// 12. VALIDAR EL FORMULARIO AL ENVIAR

formulario.addEventListener("submit", function(event) {

    // Evitar que el formulario recargue la página.

    event.preventDefault();

    // Limpiar mensajes anteriores.

    limpiarMensaje();

    // Ejecutar las validaciones.

    const nickValido = validarNickname();

    const fechaValida = validarFecha();

    const correoValido = validarCorreo();

    const passwordValido = validarPassword();

    const confirmacionValida =
        validarConfirmacionPassword();


    // Comprobar que las condiciones estén aceptadas.

    if (!terms.checked || !privacy.checked) {

        mostrarMensaje(
            "Debes aceptar los términos de servicio y la política de privacidad.",
            "error"
        );

        if (!terms.checked) {

            terms.focus();

        } else {

            privacy.focus();
        }

        return;
    }


    // Comprobar que todos los campos sean válidos.

    if (
        !nickValido ||
        !fechaValida ||
        !correoValido ||
        !passwordValido ||
        !confirmacionValida
    ) {

        mostrarMensaje(
            "Por favor, revisa los datos ingresados.",
            "error"
        );

        formulario.reportValidity();

        return;
    }


    // Mostrar mensaje de éxito.

    mostrarMensaje(
        "¡Excelente! Tu información es válida. El registro está listo para conectarse al servidor.",
        "success"
    );

    console.log(
        "JAD Mathy: validación del registro completada."
    );

});


// 13. LIMPIAR ERRORES AL MODIFICAR LOS CAMPOS

const campos = [

    nickname,
    birthdate,
    email,
    confirmEmail,
    password,
    confirmPassword

];

campos.forEach((campo) => {

    campo.addEventListener("input", () => {

        campo.setCustomValidity("");

        limpiarMensaje();

    });

});


// 14. LIMPIAR MENSAJES AL CAMBIAR LAS CASILLAS

[terms, privacy].forEach((casilla) => {

    casilla.addEventListener("change", limpiarMensaje);

});


// 15. MENSAJE DE INICIALIZACIÓN

console.log(
    "JAD Mathy: modelo de registro JavaScript cargado correctamente."
);
