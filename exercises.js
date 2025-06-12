const majorScales = {
    "Do majeur": { sharps: 0, flats: 0 },
    "Sol majeur": { sharps: 1, flats: 0 },
    "Ré majeur": { sharps: 2, flats: 0 },
    "La majeur": { sharps: 3, flats: 0 },
    "Mi majeur": { sharps: 4, flats: 0 },
    "Si majeur": { sharps: 5, flats: 0 },
    "Fa# majeur": { sharps: 6, flats: 0 },
    "Do# majeur": { sharps: 7, flats: 0 },
    "Fa majeur": { sharps: 0, flats: 1 },
    "Sib majeur": { sharps: 0, flats: 2 },
    "Mib majeur": { sharps: 0, flats: 3 },
    "Lab majeur": { sharps: 0, flats: 4 },
    "Réb majeur": { sharps: 0, flats: 5 },
    "Solb majeur": { sharps: 0, flats: 6 },
    "Dob majeur": { sharps: 0, flats: 7 }
};

let currentExercise = { type: null, correctAnswer: null };
let score = 0;
let currentQuestion = 0;
const totalQuestions = 10;
let askedQuestionsCount = {};
let lastQuestionKey = null;

const feedbackMessages = {
    correct: [
        "✅ Bravo, vous êtes un génie musical!",
        "✅ Excellent, continuez comme ça!",
        "✅ Fantastique, vous maîtrisez les gammes!",
        "✅ Incroyable, vous êtes au top!",
        "✅ Parfait, c'est exactement ça!"
    ],
    incorrect: [
        "❌ Presque! Essayez encore!",
        "❌ Pas tout à fait, mais continuez à essayer!",
        "❌ Pas de chance, essayez une autre fois!",
        "❌ Presque là, ne lâchez rien!",
        "❌ Pas cette fois, mais vous allez y arriver!"
    ]
};

const params = new URLSearchParams(window.location.search);
const exerciseTypes = params.get('types') ? params.get('types').split(',') : ['sharps'];

function updateProgressBar() {
    const progressPercentage = (currentQuestion / totalQuestions) * 100;
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.textContent = `${currentQuestion}/${totalQuestions}`;
}

function showFeedback(isCorrect) {
    const feedbackElement = document.getElementById('feedback');
    const messages = isCorrect ? feedbackMessages.correct : feedbackMessages.incorrect;
    const randomIndex = Math.floor(Math.random() * messages.length);

    feedbackElement.textContent = messages[randomIndex];
    feedbackElement.className = isCorrect ? 'correct' : 'incorrect';

    if (isCorrect) {
        score++;
    }

    setTimeout(() => {
        feedbackElement.textContent = '';
        feedbackElement.className = '';
    }, 2000);
}

function generateExercise() {
    const scales = Object.keys(majorScales);
    let randomScale;
    let questionKey;
    let currentExerciseType = exerciseTypes[Math.floor(Math.random() * exerciseTypes.length)];

    do {
        randomScale = scales[Math.floor(Math.random() * scales.length)];
        const sharps = majorScales[randomScale].sharps;
        const flats = majorScales[randomScale].flats;

        if (sharps > 0 && currentExerciseType === 'sharps') {
            questionKey = `sharps-${randomScale}`;
        } else if (flats > 0 && currentExerciseType === 'flats') {
            questionKey = `flats-${randomScale}`;
        } else if (currentExerciseType === 'scaleName') {
            questionKey = `scaleName-${randomScale}`;
        }
    } while (questionKey === lastQuestionKey);

    askedQuestionsCount[questionKey] = (askedQuestionsCount[questionKey] || 0) + 1;
    lastQuestionKey = questionKey;

    let questionText, correctAnswer, options;

    const sharps = majorScales[randomScale].sharps;
    const flats = majorScales[randomScale].flats;

    if (currentExerciseType === 'sharps') {
        if (sharps > 0) {
            questionText = `Quelle est la gamme majeure avec ${sharps} dièse${sharps > 1 ? 's' : ''} ?`;
            correctAnswer = randomScale;
            options = [randomScale];
            while (options.length < 4) {
                const randomOption = scales[Math.floor(Math.random() * scales.length)];
                if (!options.includes(randomOption) && majorScales[randomOption].sharps > 0) {
                    options.push(randomOption);
                }
            }
        } else {
            questionText = `Quelle est la gamme majeure sans altération ?`;
            correctAnswer = "Do majeur";
            options = ["Do majeur"];
            while (options.length < 4) {
                const randomOption = scales[Math.floor(Math.random() * scales.length)];
                if (!options.includes(randomOption) && majorScales[randomOption].sharps === 0) {
                    options.push(randomOption);
                }
            }
        }
    } else if (currentExerciseType === 'flats') {
        if (flats > 0) {
            questionText = `Quelle est la gamme majeure avec ${flats} bémol${flats > 1 ? 's' : ''} ?`;
            correctAnswer = randomScale;
            options = [randomScale];
            while (options.length < 4) {
                const randomOption = scales[Math.floor(Math.random() * scales.length)];
                if (!options.includes(randomOption) && majorScales[randomOption].flats > 0) {
                    options.push(randomOption);
                }
            }
        } else {
            questionText = `Quelle est la gamme majeure sans altération ?`;
            correctAnswer = "Do majeur";
            options = ["Do majeur"];
            while (options.length < 4) {
                const randomOption = scales[Math.floor(Math.random() * scales.length)];
                if (!options.includes(randomOption) && majorScales[randomOption].flats === 0) {
                    options.push(randomOption);
                }
            }
        }
    } else if (currentExerciseType === 'scaleName') {
        if (sharps > 0) {
            questionText = `Quelles sont les altérations de la gamme ${randomScale} ?`;
            correctAnswer = `${sharps} dièse${sharps > 1 ? 's' : ''}`;
        } else if (flats > 0) {
            questionText = `Quelles sont les altérations de la gamme ${randomScale} ?`;
            correctAnswer = `${flats} bémol${flats > 1 ? 's' : ''}`;
        } else {
            questionText = `Quelles sont les altérations de la gamme ${randomScale} ?`;
            correctAnswer = `Aucune altération`;
        }
        options = [correctAnswer];
        while (options.length < 4) {
            const randomOption = Math.floor(Math.random() * 7) + 1;
            const randomAlterationType = Math.random() < 0.5 ? "dièse" : "bémol";
            const randomOptionText = `${randomOption} ${randomAlterationType}${randomOption > 1 ? 's' : ''}`;
            if (!options.includes(randomOptionText)) {
                options.push(randomOptionText);
            }
        }
    }

    options.sort(() => Math.random() - 0.5);
    currentExercise = { correctAnswer };

    document.getElementById('exercise-content').innerHTML = `
        <p>${questionText}</p>
        ${options.map(option => `
            <div>
                <input type="radio" id="${option}" name="answer" value="${option}">
                <label for="${option}">${option}</label>
            </div>
        `).join('')}
        <button onclick="checkAnswer()">Vérifier</button>
    `;
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert("Veuillez sélectionner une réponse.");
        return;
    }

    const userAnswer = selectedOption.value;
    showFeedback(userAnswer === currentExercise.correctAnswer);

    currentQuestion++;
    updateProgressBar();

    if (currentQuestion < totalQuestions) {
        setTimeout(generateExercise, 2000);
    } else {
        setTimeout(() => {
            document.getElementById('exercise-content').style.display = 'none';
            document.getElementById('final-score').style.display = 'block';
            document.getElementById('score-value').textContent = score;
        }, 2000);
    }
}

updateProgressBar();
generateExercise();
