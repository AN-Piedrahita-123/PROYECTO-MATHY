
// ==========================================
// CONFIGURACIÓN INICIAL DE JAD MATHY
// ==========================================


// 1. OBTENER LOS ELEMENTOS DEL HTML

const form = document.getElementById("configForm");

const btnNext = document.getElementById("btnNext");
const btnBack = document.getElementById("btnBack");
const btnFinish = document.getElementById("btnFinish");

const formMessage = document.getElementById("formMessage");

const panels = document.querySelectorAll(".form-step");

const steps = document.querySelectorAll(".test-step");

const indicators = document.querySelectorAll(
    ".progress-indicator"
);


// 2. VARIABLE PARA CONTROLAR EL PASO ACTUAL

let currentStep = 1;

const totalSteps = panels.length;


// 3. FUNCIÓN PARA MOSTRAR EL PASO

function showStep(step) {

    currentStep = step;

    // Ocultar todos los paneles
    panels.forEach(panel => {

        panel.hidden = true;
        panel.classList.remove("active");

    });

    // Mostrar el panel correspondiente
    const activePanel = document.querySelector(
        `[data-panel="${step}"]`
    );

    activePanel.hidden = false;
    activePanel.classList.add("active");


    // Actualizar los pasos del panel izquierdo
    steps.forEach(item => {

        const number = Number(item.dataset.step);

        item.classList.toggle(
            "active",
            number === step
        );

        item.classList.toggle(
            "completed",
            number < step
        );

    });


    // Actualizar la barra de progreso
    indicators.forEach((indicator, index) => {

        indicator.classList.toggle(
            "active",
            index < step
        );

    });


    // Controlar los botones
    btnBack.hidden = step === 1;

    btnNext.hidden = step === totalSteps;

    btnFinish.hidden = step !== totalSteps;


    // Limpiar mensajes
    formMessage.textContent = "";

}


// 4. FUNCIÓN PARA VALIDAR EL PASO ACTUAL

function validateStep() {

    const activePanel = document.querySelector(
        `[data-panel="${currentStep}"]`
    );

    const selectedOption = activePanel.querySelector(
        'input[type="radio"]:checked'
    );

    if (!selectedOption) {

        formMessage.textContent =
            "Por favor, selecciona una opción para continuar.";

        return false;

    }

    formMessage.textContent = "";

    return true;

}


// 5. BOTÓN SIGUIENTE

btnNext.addEventListener("click", function () {

    if (!validateStep()) {
        return;
    }

    if (currentStep < totalSteps) {

        showStep(currentStep + 1);

    }

});


// 6. BOTÓN ATRÁS

btnBack.addEventListener("click", function () {

    if (currentStep > 1) {

        showStep(currentStep - 1);

    }

});


// 7. CAMBIAR EL ESTILO DE LAS OPCIONES SELECCIONADAS

const optionLabels = document.querySelectorAll(
    ".grade-option"
);

optionLabels.forEach(label => {

    const radio = label.querySelector(
        'input[type="radio"]'
    );

    radio.addEventListener("change", function () {

        // Buscar las opciones del mismo grupo
        const group = radio.name;

        const options = document.querySelectorAll(
            `input[name="${group}"]`
        );

        options.forEach(option => {

            option.closest(".grade-option")
                .classList.remove("selected");

        });

        // Marcar la opción seleccionada
        label.classList.add("selected");

        formMessage.textContent = "";

    });

});


// 8. FINALIZAR Y GUARDAR LA CONFIGURACIÓN

form.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!validateStep()) {
        return;
    }

    // Obtener los valores seleccionados
    const grade = document.querySelector(
        'input[name="study-grade"]:checked'
    ).value;

    const dailyGoal = document.querySelector(
        'input[name="daily-goal"]:checked'
    ).value;

    const initialLevel = document.querySelector(
        'input[name="initial-level"]:checked'
    ).value;


    // Crear objeto con la configuración
    const configuration = {

        grado: grade,

        metaDiaria: Number(dailyGoal),

        nivelInicial: initialLevel,

        configuracionCompleta: true,

        fechaConfiguracion: new Date().toISOString()

    };


    // Guardar información en localStorage
    try {

        localStorage.setItem(
            "mathyConfiguration",
            JSON.stringify(configuration)
        );

        // Mostrar confirmación
        formMessage.textContent =
            "¡Excelente! Tu configuración se guardó correctamente. ¡Bienvenido a Mathy!";

        formMessage.style.color = "green";

        btnFinish.disabled = true;
        btnBack.disabled = true;

        console.log(
            "Configuración guardada:",
            configuration
        );

    } catch (error) {

        formMessage.textContent =
            "No fue posible guardar la configuración. Inténtalo nuevamente.";

        console.error(
            "Error al guardar:",
            error
        );

    }

});


// 9. INICIAR LA CONFIGURACIÓN

showStep(1);
