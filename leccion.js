
// ==========================================
// JAD MATHY - EVALUACIÓN DIAGNÓSTICA
// ==========================================


// 1. OBTENER ELEMENTOS DEL HTML

const introScreen = document.getElementById("introScreen");
const quizScreen = document.getElementById("quizScreen");
const resultsScreen = document.getElementById("resultsScreen");

const startButton = document.getElementById("startButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const finishButton = document.getElementById("finishButton");
const restartButton = document.getElementById("restartButton");

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const progressTrack = document.getElementById("progressTrack");

const questionCategory = document.getElementById("questionCategory");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");

const optionsContainer = document.getElementById("optionsContainer");
const selectionMessage = document.getElementById("selectionMessage");

const totalScore = document.getElementById("totalScore");
const scoreFill = document.getElementById("scoreFill");
const percentageText = document.getElementById("percentageText");

const areaResults = document.getElementById("areaResults");
const diagnosisText = document.getElementById("diagnosisText");

const tipText = document.getElementById("tipText");
const encouragementText = document.getElementById("encouragementText");


// 2. BANCO DE PREGUNTAS

const questions = [

    // ARITMÉTICA

    {
        category: "Aritmética",

        question: "¿Cuánto es 25 + 17?",

        options: ["32", "42", "45", "52"],

        correct: 1,

        tip: "Recuerda sumar primero las unidades y después las decenas."

    },

    {
        category: "Aritmética",

        question: "¿Cuánto es 8 × 7?",

        options: ["48", "54", "56", "64"],

        correct: 2,

        tip: "Puedes recordar las tablas de multiplicar para resolver esta operación."

    },

    {
        category: "Aritmética",

        question: "¿Cuál es el resultado de 1/2 + 1/4?",

        options: ["2/6", "3/4", "1/4", "1/2"],

        correct: 1,

        tip: "Para sumar fracciones, primero necesitas que tengan el mismo denominador."

    },


    // GEOMETRÍA

    {
        category: "Geometría",

        question: "¿Cuántos lados tiene un hexágono?",

        options: ["4", "5", "6", "8"],

        correct: 2,

        tip: "Recuerda que el prefijo hexa significa seis."

    },

    {
        category: "Geometría",

        question: "¿Cuál es el área de un rectángulo de 5 cm de largo y 3 cm de ancho?",

        options: ["8 cm²", "15 cm²", "16 cm²", "10 cm²"],

        correct: 1,

        tip: "El área de un rectángulo se calcula multiplicando largo por ancho."

    },

    {
        category: "Geometría",

        question: "¿Cuántos grados mide un ángulo recto?",

        options: ["45°", "60°", "90°", "180°"],

        correct: 2,

        tip: "Un ángulo recto forma una esquina como la de un cuadrado."

    },


    // ÁLGEBRA

    {
        category: "Álgebra",

        question: "Si x + 5 = 12, ¿cuánto vale x?",

        options: ["5", "6", "7", "8"],

        correct: 2,

        tip: "Para encontrar x, resta 5 a ambos lados de la igualdad."

    },

    {
        category: "Álgebra",

        question: "¿Qué número continúa la secuencia: 2, 4, 6, 8, ...?",

        options: ["9", "10", "11", "12"],

        correct: 1,

        tip: "Observa cuánto aumenta cada número respecto al anterior."

    },


    // ESTADÍSTICA

    {
        category: "Estadística",

        question: "¿Cuál es el promedio de 4, 6 y 8?",

        options: ["5", "6", "7", "8"],

        correct: 1,

        tip: "Suma todos los números y divide el resultado entre la cantidad de datos."

    },

    {
        category: "Estadística",

        question: "En el conjunto 2, 3, 3, 4, 5, ¿cuál es la moda?",

        options: ["2", "3", "4", "5"],

        correct: 1,

        tip: "La moda es el número que aparece con mayor frecuencia."

    }

];


// 3. VARIABLES DE CONTROL

let currentQuestion = 0;

let answers = new Array(questions.length).fill(null);

let evaluationFinished = false;


// 4. CONSEJOS DE MOTIVACIÓN

const encouragementMessages = [

    "¡Confía en tus conocimientos!",

    "¡Vas muy bien! Sigue intentando.",

    "Cada pregunta es una oportunidad para aprender.",

    "¡Tú puedes lograrlo!",

    "No te rindas, continúa aprendiendo."

];


// 5. MOSTRAR UNA PANTALLA

function showScreen(screen) {

    introScreen.classList.remove("active");
    quizScreen.classList.remove("active");
    resultsScreen.classList.remove("active");

    introScreen.hidden = true;
    quizScreen.hidden = true;
    resultsScreen.hidden = true;

    screen.hidden = false;
    screen.classList.add("active");

}


// 6. ACTUALIZAR LA BARRA DE PROGRESO

function updateProgress() {

    const total = questions.length;

    const percentage = ((currentQuestion + 1) / total) * 100;

    progressText.textContent =
        `Pregunta ${currentQuestion + 1}/${total}`;

    progressFill.style.width = `${percentage}%`;

    progressTrack.setAttribute(
        "aria-valuenow",
        currentQuestion + 1
    );

}


// 7. MOSTRAR UNA PREGUNTA

function showQuestion() {

    const question = questions[currentQuestion];

    // Mostrar categoría

    questionCategory.textContent =
        question.category.toUpperCase();


    // Mostrar número

    questionNumber.textContent =
        `Pregunta ${currentQuestion + 1}`;


    // Mostrar pregunta

    questionText.textContent =
        question.question;


    // Limpiar opciones anteriores

    optionsContainer.innerHTML = "";


    // Crear las opciones dinámicamente

    question.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.type = "button";

        button.classList.add("answer-option");

        button.textContent = option;

        button.setAttribute(
            "aria-pressed",
            answers[currentQuestion] === index
        );


        // Marcar respuesta seleccionada

        if (answers[currentQuestion] === index) {

            button.classList.add("selected");

        }


        // Detectar selección

        button.addEventListener("click", function () {

            selectAnswer(index);

        });


        optionsContainer.appendChild(button);

    });


    // Actualizar navegación

    previousButton.hidden = currentQuestion === 0;

    nextButton.hidden =
        currentQuestion === questions.length - 1;

    finishButton.hidden =
        currentQuestion !== questions.length - 1;


    // Mostrar consejo

    tipText.textContent = question.tip;


    // Mostrar mensaje

    if (answers[currentQuestion] !== null) {

        selectionMessage.textContent =
            "¡Respuesta seleccionada! Puedes cambiarla si lo deseas.";

    } else {

        selectionMessage.textContent =
            "Selecciona una respuesta para continuar.";

    }


    // Actualizar progreso

    updateProgress();

}


// 8. SELECCIONAR UNA RESPUESTA

function selectAnswer(index) {

    if (evaluationFinished) {
        return;
    }

    answers[currentQuestion] = index;

    // Actualizar las opciones visualmente

    const buttons = optionsContainer.querySelectorAll(
        ".answer-option"
    );

    buttons.forEach((button, buttonIndex) => {

        const selected = buttonIndex === index;

        button.classList.toggle("selected", selected);

        button.setAttribute(
            "aria-pressed",
            selected
        );

    });


    selectionMessage.textContent =
        "¡Muy bien! Tu respuesta ha sido seleccionada.";

    // Actualizar consejo motivacional

    const randomIndex = Math.floor(
        Math.random() * encouragementMessages.length
    );

    encouragementText.textContent =
        encouragementMessages[randomIndex];

}


// 9. BOTÓN COMENZAR

startButton.addEventListener("click", function () {

    currentQuestion = 0;

    showScreen(quizScreen);

    showQuestion();

    console.log("Evaluación diagnóstica iniciada.");

});


// 10. BOTÓN ANTERIOR

previousButton.addEventListener("click", function () {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

});


// 11. BOTÓN SIGUIENTE

nextButton.addEventListener("click", function () {

    // Validar que exista una respuesta

    if (answers[currentQuestion] === null) {

        selectionMessage.textContent =
            "Por favor, selecciona una respuesta antes de continuar.";

        selectionMessage.style.color = "#d93025";

        return;

    }


    // Avanzar a la siguiente pregunta

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        selectionMessage.style.color = "";

        showQuestion();

    }

});


// 12. CALCULAR RESULTADOS POR ÁREA

function calculateResults() {

    const results = {};

    // Crear categorías

    questions.forEach(question => {

        if (!results[question.category]) {

            results[question.category] = {

                correct: 0,

                total: 0

            };

        }

        results[question.category].total++;

    });


    let correctAnswers = 0;


    // Revisar las respuestas

    questions.forEach((question, index) => {

        if (answers[index] === question.correct) {

            correctAnswers++;

            results[question.category].correct++;

        }

    });


    return {

        correctAnswers,

        totalQuestions: questions.length,

        percentage: Math.round(
            (correctAnswers / questions.length) * 100
        ),

        areas: results

    };

}


// 13. MOSTRAR RESULTADOS

function showResults() {

    const results = calculateResults();

    evaluationFinished = true;


    // Mostrar pantalla de resultados

    showScreen(resultsScreen);


    // Calificación general

    totalScore.textContent =
        `${results.correctAnswers}/${results.totalQuestions}`;


    // Porcentaje

    percentageText.textContent =
        `${results.percentage}% de respuestas correctas`;


    // Barra de resultados

    scoreFill.style.width =
        `${results.percentage}%`;


    // Resultados por área

    areaResults.innerHTML = "";


    Object.entries(results.areas).forEach(([area, data]) => {

        const percentage = Math.round(
            (data.correct / data.total) * 100
        );

        const resultItem = document.createElement("div");

        resultItem.classList.add("area-result");

        const title = document.createElement("strong");

        title.textContent = area;


        const score = document.createElement("span");

        score.textContent =
            `${data.correct}/${data.total} respuestas correctas`;


        const bar = document.createElement("div");

        bar.classList.add("area-progress");


        const fill = document.createElement("div");

        fill.classList.add("area-progress-fill");

        fill.style.width = `${percentage}%`;


        bar.appendChild(fill);

        resultItem.appendChild(title);

        resultItem.appendChild(score);

        resultItem.appendChild(bar);

        areaResults.appendChild(resultItem);

    });


    // Generar diagnóstico

    let diagnosis = "";


    if (results.percentage >= 80) {

        diagnosis =
            "¡Excelente trabajo! Tienes una buena base de conocimientos matemáticos. " +
            "Puedes avanzar hacia desafíos de mayor dificultad y fortalecer los temas que aún necesitas practicar.";

    } else if (results.percentage >= 60) {

        diagnosis =
            "¡Vas por buen camino! Tienes conocimientos matemáticos importantes. " +
            "Te recomendamos reforzar algunas áreas para continuar avanzando con seguridad.";

    } else if (results.percentage >= 40) {

        diagnosis =
            "Estás construyendo tus conocimientos. Necesitas practicar algunas operaciones, " +
            "conceptos y ejercicios. Mathy te ayudará a mejorar paso a paso.";

    } else {

        diagnosis =
            "¡Este es el comienzo de tu aventura! Te recomendamos empezar por los conceptos " +
            "matemáticos básicos y avanzar a tu propio ritmo. Cada práctica te ayudará a mejorar.";

    }


    diagnosisText.textContent = diagnosis;


    // ==========================================
    // 14. GUARDAR RESULTADOS EN LOCALSTORAGE
    // ==========================================

    try {

        const previousConfiguration = JSON.parse(
            localStorage.getItem("mathyConfiguration")
        ) || {};


        const updatedConfiguration = {

            ...previousConfiguration,

            resultadoDiagnostico: {

                respuestasCorrectas: results.correctAnswers,

                totalPreguntas: results.totalQuestions,

                porcentaje: results.percentage,

                resultadosPorArea: results.areas,

                respuestas: answers.map((answer, index) => ({

                    pregunta: index + 1,

                    respuestaSeleccionada:
                        answer === null
                            ? null
                            : questions[index].options[answer],

                    respuestaCorrecta:
                        questions[index].options[
                            questions[index].correct
                        ],

                    correcta:
                        answer === questions[index].correct

                })),

                fecha: new Date().toISOString()

            }

        };


        localStorage.setItem(
            "mathyConfiguration",
            JSON.stringify(updatedConfiguration)
        );


        console.log(
            "Resultados de la evaluación guardados:",
            updatedConfiguration
        );


    } catch (error) {

        console.error(
            "Error al guardar los resultados:",
            error
        );

    }


    // Mostrar felicitación

    encouragementText.textContent =
        "¡Felicitaciones por completar tu evaluación!";

    tipText.textContent =
        "Ahora conocemos mejor tus habilidades y podemos ayudarte a seguir aprendiendo.";

    console.log("Evaluación finalizada:", results);

}


// 15. BOTÓN FINALIZAR

finishButton.addEventListener("click", function () {

    // Comprobar que todas las preguntas tengan respuesta

    const unanswered = answers.some(
        answer => answer === null
    );


    if (unanswered) {

        selectionMessage.textContent =
            "Debes responder esta pregunta antes de finalizar.";

        selectionMessage.style.color = "#d93025";

        return;

    }


    // Mostrar resultados

    showResults();

});


// 16. VOLVER A COMENZAR

restartButton.addEventListener("click", function () {

    // Reiniciar respuestas

    currentQuestion = 0;

    answers = new Array(questions.length).fill(null);

    evaluationFinished = false;


    // Reiniciar progreso

    progressFill.style.width = "0%";

    progressText.textContent = "Pregunta 0/10";

    progressTrack.setAttribute(
        "aria-valuenow",
        "0"
    );


    // Reiniciar mensajes

    selectionMessage.textContent = "";

    encouragementText.textContent =
        "¡Confía en tus conocimientos!";


    // Regresar a la introducción

    showScreen(introScreen);


    console.log("Evaluación reiniciada.");

});


// 17. INICIALIZAR LA EVALUACIÓN

function initializeEvaluation() {

    showScreen(introScreen);

    progressText.textContent = "Pregunta 0/10";

    progressFill.style.width = "0%";

    progressTrack.setAttribute(
        "aria-valuenow",
        "0"
    );

    console.log(
        "JAD Mathy: evaluación diagnóstica preparada."
    );

}


// Ejecutar al cargar el documento

initializeEvaluation();
