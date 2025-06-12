document.addEventListener('DOMContentLoaded', function() {
    const tutorialContent = document.getElementById('tutorial-content');
    const homeButton = document.getElementById('home-button');

    // Contenu du tutoriel
    const tutorialSteps = [
        {
            title: "Introduction aux Armures",
            content: "Les armures sont des ensembles d'altérations (dièses ou bémols) placées à la clé en début de portée. Elles indiquent la tonalité de la pièce musicale."
        },
        {
            title: "Étape 1 : Les Exceptions",
            content: "Do Majeur n'a aucune altération à la clé. Fa Majeur a un bémol à la clé.",
            verification: {
                question: "Si il y a un bémol à la clé, dans quelle tonalité sommes-nous ?",
                answer: "Fa Majeur"
            }
        },
        {
            title: "Étape 2 : Les Dièses",
            content: "Règle : Tonique - 1/2 ton donne le dernier dièse à la clé. La tonique est la note principale d'une gamme.",
            verification: {
                question: "Si la tonique est Sol, quel est le dernier dièse à la clé ?",
                answer: "Fa#"
            }
        },
        {
            title: "Étape 3 : Les Bémols",
            content: "Règle : Tonique = avant-dernier bémol à la clé. La tonique est la note principale d'une gamme.",
            verification: {
                question: "Si la tonique est Sib, combien de bémols y a-t-il à la clé ?",
                answer: "2"
            }
        },
        {
            title: "Conclusion",
            content: "Félicitations ! Vous avez terminé le tutoriel sur les armures. Nous vous encourageons à faire les exercices et les défis pour renforcer votre compréhension."
        }
    ];

    // Fonction pour afficher le contenu du tutoriel
    function displayTutorial() {
        tutorialSteps.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = 'tutorial-step';
            stepElement.innerHTML = `
                <h2>${step.title}</h2>
                <p>${step.content}</p>
            `;
            if (step.verification) {
                const verificationElement = document.createElement('div');
                verificationElement.className = 'verification';
                verificationElement.innerHTML = `
                    <p><strong>Vérification :</strong> ${step.verification.question}</p>
                    <input type="text" id="answer-${index}" placeholder="Votre réponse">
                    <button onclick="checkAnswer(${index}, '${step.verification.answer}')">Vérifier</button>
                    <p id="feedback-${index}"></p>
                `;
                stepElement.appendChild(verificationElement);
            }
            tutorialContent.appendChild(stepElement);
        });

        // Afficher le bouton pour retourner à l'accueil à la fin du tutoriel
        homeButton.style.display = 'block';
    }

    // Fonction pour vérifier les réponses
    window.checkAnswer = function(index, correctAnswer) {
        const userAnswer = document.getElementById(`answer-${index}`).value;
        const feedbackElement = document.getElementById(`feedback-${index}`);
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            feedbackElement.textContent = "Correct !";
            feedbackElement.style.color = "green";
        } else {
            feedbackElement.textContent = "Incorrect. Essayez encore.";
            feedbackElement.style.color = "red";
        }
    };

    // Afficher le tutoriel
    displayTutorial();

    // Gérer le clic sur le bouton pour retourner à l'accueil
    homeButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});
