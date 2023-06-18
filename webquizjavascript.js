// getQuestionFromServerById-Funktion
async function getQuestionFromServerById(questionId) {
  const baseUrl = 'https://irene.informatik.htw-dresden.de:8888/api/quizzes/';
  const response = await fetch(baseUrl + questionId, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('test@gmail.com:secret')
    }
  });
  return await response.json();
}

// doRequest-Funktion
function doRequest(questionId) {
  const questionFromServer = getQuestionFromServerById(questionId);
  questionFromServer.then(questions => {
    console.log(questions);
  });
}

// sendQuestion-Funktion
function sendQuestion() {
  // Frage aus dem Textfeld abrufen
  var question = document.getElementById("question").value;

  // AJAX-Anfrage erstellen
  var xhr = new XMLHttpRequest();

  // URL des Servers festlegen
  var url = "http://irene.informatik.htw-dresden.de";

  // Daten für die Anfrage vorbereiten
  var data = JSON.stringify({ question: question });

  // Anfrage öffnen
  xhr.open("POST", url, true);

  // Setze den Content-Type auf JSON
  xhr.setRequestHeader("Content-Type", "application/json");

  // Callback-Funktion für die Serverantwort
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Serverantwort erhalten
      var response = JSON.parse(xhr.responseText);

      // Die Antwort anzeigen
      document.getElementById("answer").innerHTML = response.answer;
    }
  };

  // Anfrage senden
  xhr.send(data);
}

</script>
let questions = {
  allgemeine: [
    {
      question: "Frage 1 für allgemeine Fragen",
      answers: ["Antwort 1", "Antwort 2", "Antwort 3", "Antwort 4"],
      correctAnswer: 0
    },
    {
      question: "Frage 2 für allgemeine Fragen",
      answers: ["Antwort 1", "Antwort 2", "Antwort 3", "Antwort 4"],
      correctAnswer: 1
    },
    // Weitere allgemeine Fragen hier...
  ],
  internettechnologien: [
    {
      question: "Frage 1 für Internettechnologien",
      answers: ["Antwort 1", "Antwort 2", "Antwort 3", "Antwort 4"],
      correctAnswer: 2
    },
    {
      question: "Frage 2 für Internettechnologien",
      answers: ["Antwort 1", "Antwort 2", "Antwort 3", "Antwort 4"],
      correctAnswer: 3
    },
    // Weitere Fragen zu Internettechnologien hier...
  ],
  mathematik: [
    {
      question: "Frage 1 für Mathematik",
      answers: ["Antwort 1", "Antwort 2", "Antwort 3", "Antwort 4"],
      correctAnswer: 1
    },
    {
      question: "Frage 2 für Mathematik",
      answers: ["Antwort 1", "Antwort 2", "Antwort 3", "Antwort 4"],
      correctAnswer: 2
    },
    // Weitere mathematische Fragen hier...
  ]
};

// JavaScript-Code zum Aktualisieren des Lernfortschritts und der Fortschrittsleiste
let progress = document.querySelector(".progress");
let progressBar = document.querySelector(".progress");

let currentQuestionIndex = 0; // Index der aktuellen Frage
let score = 0; // Spielstand
let selectedTopic = ""; // Ausgewähltes Thema

// HTML-Elemente abrufen
const questionElement = document.getElementById("question");
const answerButtons = document.getElementsByClassName("answer");
const resultElement = document.getElementById("result");
const topicContainer = document.getElementById("topicContainer");
const quizContainer = document.getElementById("quizContainer");
const gameOverContainer = document.getElementById("gameOverContainer");

// Funktion, um die aktuelle Frage anzuzeigen
function showQuestion() {
  const currentQuestion = questions[selectedTopic][currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].textContent = currentQuestion.answers[i];
  }
}

// Funktion, um die Antwort zu überprüfen
function checkAnswer(answerIndex) {
  const currentQuestion = questions[selectedTopic][currentQuestionIndex];
  const selectedAnswer = answerButtons[answerIndex].textContent;

  if (selectedAnswer === currentQuestion.answers[currentQuestion.correctAnswer]) {
    score++;
    resultElement.textContent = "Richtig!";
  } else {
    resultElement.textContent = "Falsch!";
    score--;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions[selectedTopic].length) {
    showQuestion();
  } else {
    endGame();
  }sendStatistics
}

// Funktion, um das Spiel zu beenden
function endGame() {
  quizContainer.style.display = "none";
  gameOverContainer.style.display = "block";
  document.getElementById("gameOverScore").textContent = score;

  let message = "";


  document.getElementById("gameOverMessage").textContent = message;

  sendStatistics();
}

// AJAX POST-Anfrage zum Senden der Spielstatistik
function sendStatistics() {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "statistics", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("Spielstatistik erfolgreich gesendet!");
    }
  };
  const data = {
    score: score,
    totalQuestions: questions[selectedTopic].length
  };
  xhr.send(JSON.stringify(data));
}

// Event Listener für Antwortbuttons hinzufügen
for (let i = 0; i < answerButtons.length; i++) {
  answerButtons[i].addEventListener("click", function() {
    checkAnswer(i);
  });
}

// Funktion, um zur vorherigen Frage zu wechseln
function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
}

// Funktion, um zur nächsten Frage zu wechseln
function nextQuestion() {
  if (currentQuestionIndex < questions[selectedTopic].length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    // Alle Fragen beantwortet, Spiel beenden oder andere Logik hier einfügen
  }
}

// Lernfortschritt einbauen; Progressbar wird eingebaut 
function updateProgress(){
let progress = 0;
progress = score / 10
console.log("Fortschritt:", progress, "/ 10");
console.log("Fortschrittsbalken:", "#".repeat(progress));}


// Funktion zum Starten des Quiz basierend auf dem ausgewählten Thema
function startQuiz(topic) {
  selectedTopic = topic;
  currentQuestionIndex = 0;
  score = 0;
  topicContainer.style.display = "none";
  quizContainer.style.display = "";

  function calculateGrade(score) {
    if (score === questions.length) {
      return "A";
    } else if (score >= 4) {
      return "B";
    } else if (score >= 3) {
      return "C";
    } else if (score >= 2) {
      return "D";
    } else {
      return "F";
    }
  }
}

  function endGame() {
    const statisticsElement = document.getElementById("statistics");
    statisticsElement.textContent = "Statistik: " + score + " Punkte, Note: " + calculateGrade(score);
  }
  var progressValue = 0; // Fortschritt in Prozent

  function updateProgressBar() {
    var progressBar = document.querySelector('.progress');
    progressBar.style.width = progressValue + '%';
  }
  
  // Funktion, um den Fortschritt zu aktualisieren
  function updateProgress(value) {
    progressValue = value;
    updateProgressBar();
  }
  
  // Beispiel: Aktualisierung des Fortschritts auf 50 Prozent
 // updateProgress(50);
  
 if (antwortRichtig) {
  score += 10;
  updateProgress();
}

function updateProgress() {
  let progress = score * 20;
  progressValue.textContent = progress + "%";
  progressBar.style.width = progress + "%";
  
  if (progress === 100) {
    progressBar.classList.add("progress-filled");
  }
}

var gespeichertePunkte = localStorage.getItem('punkte');

// Überprüfen, ob Punkte vorhanden sind
if (gespeichertePunkte) {
  // Punkte in eine Zahl umwandeln (falls erforderlich)
  var erreichtePunkte = parseInt(gespeichertePunkte);

  // Punkte verwenden
  console.log('Gespeicherte Punkte: ' + erreichtePunkte);
} else {
  console.log('Keine gespeicherten Punkte gefunden.');
}