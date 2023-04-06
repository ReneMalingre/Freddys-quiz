// pseudo-code:
// STEP 1 : create the following var 
// var Timer (value=60 seconds)
// var countdown (decrease by 1 second)
// var question (5 in total)
// var answers (15 in total, 3 per question)
// var submitAnswer (to submit the answers)

// STEP 2: start setup value for each.
// 


// STEP 1 & 2

// var Timer = 60, timer = setInterval(function() {
//  $("#timer").html(count--);
//  if (count === 1) clearInterval(timer);
// }, 1000);

const quizQuestions = [
{
    question: "Commonly used data types DO NOT include:?",
    answers: ["Strings", "Booleans", "Alerts", "Numbers"],
    correctAnswer: "Alerts",
    //     if.this(== alerts)
    //     console.log(document.this[2]); ???
  },
  {
    question: "The condition in an if/else statement is enclosed within _____.",
    answers: ["quotes", "curly brackets", "parenthesis", "square barckets"],
    correctAnswer: "parenthesis", 
    // this.answers[2] an option????
  },
  {
    question: "Arrays in JavaScrips can be used to store _____",
    answers: ["numbers and strings", "other arrays", "booleans", "all of the above" ],
    correctAnswer: "all of the above",
  },
  {
    question: "String values must be enclosed within _____ when assigned to variables.",
    answers: ["commas", "curly brackets", "quotes", "parenthesis"],
    correctAnswer: "curly brackets",
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is ",
    answers: ["JavaScript", "terminal / bash", "for loops", "console log"],
    correctAnswer: "console log",
  },
];



// Get the quiz container
const quizContainer = document.getElementById("quiz-container");
// Get the submit button and add a click event listener
const startTimerButton = document.getElementById("start-timer");
startTimerButton.addEventListener("click", startTimer);

// Start the timer function
function startTimer() {
  // Hide the submit button after it is clicked
  startTimerButton.style.display = "none";

  // Get the timer element
  const timer = document.getElementById("timer");

  // Set the initial time to 60 seconds
  let timeLeft = 60;

  // Set the timer to update every second
  const countdown = setInterval(() => {
    // Decrease the time left by 1 second
    timeLeft--;

    // Update the timer element with the new time left
    timer.textContent = `Time left: ${timeLeft}s`;

    // If the time has run out, stop the timer and show the results
    if (timeLeft <= 0) {
      clearInterval(countdown);
      showResults();
    }
  }, 1000);
}


// Create a function to generate the quiz
function generateQuiz() {
  // Loop through each question and create the HTML elements for the question and answers
  quizQuestions.forEach((question, index) => {
    // Create the question element
    const questionElement = document.createElement("h2");
    questionElement.textContent = `${index + 1}. ${question.question}`;

    // Create the answer options
    const answerOptions = document.createElement("div");
    question.answers.forEach((answer) => {
      const answerOption = document.createElement("label");
      const answerInput = document.createElement("input");
      answerInput.type = "radio";
      answerInput.name = `question-${index}`;
      answerInput.value = answer;

      answerOption.appendChild(answerInput);
      answerOption.appendChild(document.createTextNode(answer));

      answerOptions.appendChild(answerOption);
    });

    // Add the question and answers to the quiz container
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(answerOptions);
  });

  // Add a submit button
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit Quiz";
  quizContainer.appendChild(submitButton);

  // Add an event listener to the submit button to check the answers
  submitButton.addEventListener("click", checkAnswers);
}

// Create a function to check the answers
function checkAnswers() {
  let score = 0;

  // Loop through each question and check if the answer is correct
  quizQuestions.forEach((question, index) => {
    const selectedAnswer = document.querySelector(`input[name=question-${index}]:checked`);
    if (selectedAnswer && selectedAnswer.value === question.correctAnswer) {
      score++;
    }
  });

  // Display the score
  alert(`You scored ${score} out of ${quizQuestions.length}`);

  // Clear the quiz container
  quizContainer.innerHTML = "";
}

// Call the generateQuiz function to generate the quiz
generateQuiz();
