// ==================================================================================================
// rene stuff
var reneTimerLeft; // the countdown timer value in seconds
var reneTimer; // the timer object
var reneQuizRunning = false; // true if the quiz is running
function reneCountDownStart() {
  reneTimerLeft = 75;
  reneQuizRunning=true;
  reneTimer = setInterval(reneCountDown, 1000);
}

// called by timer every second
function reneCountDown() {
  if (reneTimerLeft <= 0) {
    document.getElementById("rene-timer").innerHTML = '0';
    reneStopCountDown();
    reneQuizRunning = false;
     // alert("Time's up!");
    // end quiz here
    showResult();
  } else {
    document.getElementById("rene-timer").innerHTML = reneTimerLeft;
    reneTimerLeft--;
  }
}

function renePenalty() {
  reneTimerLeft -= 10; // subtract 10 seconds from the timer
  if (reneTimerLeft < 0) {
    // probs better to just set it to 0
    reneQuizRunning = false;
    }
    //update the UI
  document.getElementById("rene-timer").innerHTML = reneTimerLeft;

  // see if we're out of time and end quiz here
  if (reneTimerLeft <= 0) {
    reneStopCountDown();
    reneQuizRunning = false;
    // alert("Time's up!");
    // end quiz here
    showResult();
  }
}

// call this if all the questions are answered or the timer runs out
function reneStopCountDown() {
  clearInterval(reneTimer);
}

function reneGetScore() {
    // could be negative due to penalties, so return 0 if it is
    if (reneTimerLeft <= 0) {
        return 0;
    }
    return reneTimerLeft;
}

// ==================================================================================================

// step 1: get all required elements
const start_btn = document.querySelector('.start_btn button');
const info_box = document.querySelector('.info_box');
const exit_btn = info_box.querySelector('.buttons .quit');
const continue_btn = info_box.querySelector('.buttons .restart');
const quiz_box = document.querySelector('.quiz_box');
const result_box = document.querySelector('.result_box');
const option_list = document.querySelector('.option_list');
const time_line = document.querySelector('header .time_line');
const timeText = document.querySelector('.timer .time_left_txt');
const timeCount = document.querySelector('.timer .timer_sec');

// step 2: when Start button is clicked, rules of the game are shown
start_btn.onclick = ()=>{
  reneCountDownStart();
  info_box.classList.add('activeInfo'); // show info box
};
// step 3: when Exit button is clicked, rules of the game are hidden
exit_btn.onclick = ()=>{
  info_box.classList.remove('activeInfo'); // hide info box
};
// step 4: when Continue button is clicked, rules of the game are hidden and the Quiz box is shown
continue_btn.onclick = ()=>{
  info_box.classList.remove('activeInfo'); // hide info box
  quiz_box.classList.add('activeQuiz'); // show quiz box
  showQuetions(0); // calling showQestions function
  queCounter(1); // passing 1 parameter to queCounter
  startTimer(15); // calling startTimer function
  startTimerLine(0); // calling startTimerLine function
};
let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
const restart_quiz = result_box.querySelector('.buttons .restart');
const quit_quiz = result_box.querySelector('.buttons .quit');

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
  quiz_box.classList.add('activeQuiz'); // show quiz box
  result_box.classList.remove('activeResult'); // hide result box
  timeValue = 15;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(que_count); // calling showQestions function
  queCounter(que_numb); // passing que_numb value to queCounter
  clearInterval(counter); // clear counter
  clearInterval(counterLine); // clear counterLine
  startTimer(timeValue); // calling startTimer function
  startTimerLine(widthValue); // calling startTimerLine function
  timeText.textContent = 'Time Left'; // change the text of timeText to Time Left
  next_btn.classList.remove('show'); // hide the next button
};
// reloads the page from the beginning
quit_quiz.onclick = ()=>{
  window.location.reload(); // reload the current window
};
const next_btn = document.querySelector('footer .next_btn');
const bottom_ques_counter = document.querySelector('footer .total_que');

// if Next button is clicked
next_btn.onclick = ()=>{
  if (que_count < questions.length - 1 && reneQuizRunning ) { // if question count is less than total question length
    que_count++; // increment the que_count value
    que_numb++; // increment the que_numb value
    showQuetions(que_count); // calling showQestions function
    queCounter(que_numb); // passing que_numb value to queCounter
    clearInterval(counter); // clear counter
    clearInterval(counterLine); // clear counterLine
    startTimer(timeValue); // calling startTimer function
    startTimerLine(widthValue); // calling startTimerLine function
    // timeText.textContent = "Time Left"; //change the timeText to Time Left
    next_btn.classList.remove('show'); // hide the next button
  } else {
    reneStopCountDown();
    clearInterval(counter); // clear counter
    clearInterval(counterLine); // clear counterLine
    showResult(); // calling showResult function
  }
};
// getting the questions and options from the array
function showQuetions(index) {
  const que_text = document.querySelector('.que_text');
  // creating a new span and div tag for question and option and passing the value using array index
  const que_tag = '<span>'+ questions[index].numb + '. ' + questions[index].question +'</span>';
  const option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>' +
    '<div class="option"><span>'+ questions[index].options[1] +'</span></div>' +
    '<div class="option"><span>'+ questions[index].options[2] +'</span></div>' +
    '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
  que_text.innerHTML = que_tag; // adding a new span tag inside que_tag
  option_list.innerHTML = option_tag; // adding a new div tag inside option_tag

  const option = option_list.querySelectorAll('.option');
  // set onclick attribute to all available options
  for (i=0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');
  }
}
// creating the new div tags which for icons
const tickIconTag = '<div class="icon tick"><p>&#10003;</p><i class="fas fa-check"></i></div>';
const crossIconTag = '<div class="icon cross"><p>&#x2717</p><i class="fas fa-times"></i></div>';

// if user clicked on option the following happen
function optionSelected(answer) {
  clearInterval(counter); // clear counter
  clearInterval(counterLine); // clear counterLine
  const userAns = answer.textContent; // getting user selected option
  const correcAns = questions[que_count].answer; // getting correct answer from array
  const allOptions = option_list.children.length; // getting all option items

  // logs the correct/wrong answer to the console
  if (userAns == correcAns) {
    userScore += 1; // upgrading score with +1 point
    answer.classList.add('correct'); // adding green color from CSS to correct selected option
    answer.insertAdjacentHTML('beforeend', tickIconTag); // adding tick icon to correct selected option
    console.log('Answer is correct!');
    console.log('Your correct answers = ' + userScore);
  } else {
    renePenalty();
    answer.classList.add('incorrect'); // adding red color from CSS file to correct selected option
    answer.insertAdjacentHTML('beforeend', crossIconTag); // adding cross icon to correct selected option
    console.log('Wrong Answer');
    for (i=0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) { // if there is an option which is matched to an array answer
        option_list.children[i].setAttribute('class', 'option correct'); // adding green color to matched option
        option_list.children[i].insertAdjacentHTML('beforeend', tickIconTag); // adding tick icon to matched option
        console.log('Auto selected correct answer.');
      }
    }
  }

  // disabling all other options once user selects one
  for (i=0; i < allOptions; i++) {
    option_list.children[i].classList.add('disabled');
  }
  next_btn.classList.add('show'); // show the next button if user selected any option
}
function showResult() {
  info_box.classList.remove('activeInfo'); // hide the info box
  quiz_box.classList.remove('activeQuiz'); // hide the quiz box
  result_box.classList.add('activeResult'); // show the result box
  const scoreText = result_box.querySelector('.score_text');
  if (userScore > 3) { // if user scored more than 3
    // creating a new span tag and passing the user score number and total question number
    const scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag; // adding new span tag inside score_Text
  } else if (userScore > 1) { // if user scored more than 1
    const scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
  } else { // if user scored less than 1
    const scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
  }
  document.getElementById('rene-score').textContent = 'Your Timer Score is: ' + reneGetScore();
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time; // changing the value of timeCount with time value
    time--; // decrement the time value
    if (time < 9) { // if timer is less than 9
      const addZero = timeCount.textContent;
      timeCount.textContent = '0' + addZero; // add a 0 before time value(ie: 09 seconds)
    }
    if (time < 0) { // if timer is less than 0
      clearInterval(counter); // clear counter
      timeText.textContent = 'Time Off'; // change the time text to time off
      const allOptions = option_list.children.length; // getting all option items
      const correcAns = questions[que_count].answer; // getting correct answer from array
      for (i=0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) { // if there is an option which is matched to an array answer
          option_list.children[i].setAttribute('class', 'option correct'); // adding green color to matched option
          option_list.children[i].insertAdjacentHTML('beforeend', tickIconTag); // adding tick icon to matched option
          console.log('Time Off: Auto selected correct answer.');
        }
      }
      for (i=0; i < allOptions; i++) {
        option_list.children[i].classList.add('disabled'); // once user select an option then disabled all options
      }
      next_btn.classList.add('show'); // show the next button if user selected any option
    }
  }
}
function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1; // upgrading time value with 1
    time_line.style.width = time + 'px'; // increasing width of time_line with px by time value
    if (time > 549) { // if time value is greater than 549
      clearInterval(counterLine); // clear counterLine
    }
  }
}
function queCounter(index) {
  // creating a new span tag and passing the question number and total question
  const totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
  bottom_ques_counter.innerHTML = totalQueCounTag; // adding new span tag inside bottom_ques_counter
}
