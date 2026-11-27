
// ==========================================
// JAD MATHY - CONFIGURACIÓN DE META DIARIA
// ==========================================


// 1. OBTENER ELEMENTOS DEL HTML

const dailyForm = document.getElementById("dailyForm");

const btnBack = document.getElementById("btnBack");

const btnStart = document.getElementById("btnStart");

const dailyMessage = document.getElementById("dailyMessage");

const dailyOptions = document.querySelectorAll(".daily-option");


// 2. RECUPERAR CONFIGURACIÓN GUARDADA

let configuration = {};

try {

    configuration = JSON.parse(
        localStorage.getItem("mathyConfiguration")
    ) || {};

} catch (error) {

    console.error("Error al recuperar la configuración:", error);

    configuration = {};

}


// 3. RECUPERAR LA META DIARIA

const savedGoal = configuration.metaDiaria;

const validGoals = ["5", "10", "15", "20"];

const initialGoal = validGoals.includes(String(savedGoal))
    ? String(savedGoal)
    : "10";


// Seleccionar la meta guardada o 10 minutos por defecto

const savedOption = document.querySelector(
    `input[name="daily-goal"][value="${initialGoal}"]`
);

if (savedOption) {

    savedOption.checked = true;

}


// 4. ACTUALIZAR LA SELECCIÓN VISUAL

function updateSelectedOption() {

    dailyOptions.forEach(option => {

        const radio = option.querySelector(
            'input[type="radio"]'
        );

        option.classList.toggle(
            "selected",
            radio.checked
        );

    });

}


// Ejecutar al cargar la página

updateSelectedOption();


// 5. DETECTAR CAMBIOS EN LAS OPCIONES

dailyOptions.forEach(option => {

    const radio = option.querySelector(
        'input[name="daily-goal"]'
    );

    radio.addEventListener("change", function () {

        updateSelectedOption();

        dailyMessage.textContent = "";

    });

});


// 6. BOTÓN ATRÁS

btnBack.addEventListener("click", function () {

    // Regresar a la pantalla de grado de estudio

    window.location.href = "configuracion.html";

});


// 7. FINALIZAR Y GUARDAR LA META DIARIA

dailyForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Obtener la opción seleccionada

    const selectedGoal = document.querySelector(
        'input[name="daily-goal"]:checked'
    );


    // Validar selección

    if (!selectedGoal) {

        dailyMessage.textContent =
            "Por favor, selecciona una meta diaria.";

        dailyMessage.style.color = "#d93025";

        return;

    }


    // Convertir el tiempo a número

    const dailyGoal = Number(selectedGoal.value);


    // Actualizar la configuración anterior
    // sin eliminar el grado ni otros datos guardados

    const updatedConfiguration = {

        ...configuration,

        metaDiaria: dailyGoal,

        fechaActualizacion: new Date().toISOString()

    };


    // Guardar información

    try {

        localStorage.setItem(
            "mathyConfiguration",
            JSON.stringify(updatedConfiguration)
        );


        // Actualizar variable de configuración

        configuration = updatedConfiguration;


        // Mostrar confirmación

        dailyMessage.textContent =
            `¡Excelente! Tu meta diaria es de ${dailyGoal} minutos.`;

        dailyMessage.style.color = "green";


        // Desactivar botón mientras se cambia de pantalla

        btnStart.disabled = true;

        btnStart.textContent = "GUARDANDO...";


        console.log(
            "Meta diaria guardada:",
            updatedConfiguration
        );


        // Continuar a la pantalla de nivel inicial

        setTimeout(function () {

            window.location.href = "nivel_inicial.html";

        }, 1000);


    } catch (error) {

        dailyMessage.textContent =
            "No se pudo guardar tu meta diaria. Inténtalo nuevamente.";

        dailyMessage.style.color = "#d93025";

        console.error(
            "Error al guardar la meta:",
            error
        );

    }

});
