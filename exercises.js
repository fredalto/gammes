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

function updateProgressBar() {
    const progressPercentage = (currentQuestion / totalQuestions) * 100;
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.style.backgroundColor = 'green';
}

function showFeedback(isCorrect) {
    const feedbackElement = document.getElementById('feedback');
    const messages = isCorrect ? feedbackMessages.correct : feedbackMessages.incorrect;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    feedbackElement.textContent = randomMessage;
    feedbackElement.style.color = isCorrect ? 'green' : 'red';

    if (isCorrect) {
        score++;
    }
}

function generateExercise() {
    const scaleNames = Object.keys(majorScales);
    let randomScale;
    do {
        randomScale = scaleNames[Math.floor(Math.random() * scaleNames.length)];
    } while (askedQuestionsCount[randomScale] >= 2);

    askedQuestionsCount[randomScale] = (askedQuestionsCount[randomScale] || 0) + 1;
    lastQuestionKey = randomScale;

    const { sharps, flats } = majorScales[randomScale];
    let questionText, correctAnswer, options;

    if (sharps > 0) {
        questionText = `Combien de dièses dans la gamme ${randomScale} ?`;
        correctAnswer = `${sharps} dièse${sharps > 1 ? 's' : ''}`;
        options = [correctAnswer];
        while (options.length < 4) {
            const randomOption = Math.floor(Math.random() * 7) + 1;
            const randomOptionText = `${randomOption} dièse${randomOption > 1 ? 's' : ''}`;
            if (!options.includes(randomOptionText)) {
                options.push(randomOptionText);
            }
        }
    } else if (flats > 0) {
        questionText = `Combien de bémols dans la gamme ${randomScale} ?`;
        correctAnswer = `${flats} bémol${flats > 1 ? 's' : ''}`;
        options = [correctAnswer];
        while (options.length < 4) {
            const randomOption = Math.floor(Math.random() * 7) + 1;
            const randomOptionText = `${randomOption} bémol${randomOption > 1 ? 's' : ''}`;
            if (!options.includes(randomOptionText)) {
                options.push(randomOptionText);
            }
        }
    } else {
        questionText = `Quelles sont les altérations de la gamme ${randomScale} ?`;
        correctAnswer = `Aucune altération`;
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
