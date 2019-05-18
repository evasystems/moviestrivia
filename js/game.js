'use strict';

// Array that all questions are being pushed to from the constructor
Question.allQuestions = [];

var questionCounter = 0;
var downloadTimer = null;

// sound files
var correct = new Audio('sound/correct.mp3');
var gameover = new Audio('sound/gameover.mp3');
var ticktock = new Audio('sound/ticktock.mp3');
var outoftime = new Audio('sound/outoftime.mp3');
var winner = new Audio('sound/sparkle.mp3');
var soundsArray = [correct, gameover, ticktock, outoftime, winner];

// variables accessing elements in the HTML
var divQuestionEl = document.getElementById('question');
var divAnswerEl = document.getElementById('answers');
var divAnswerElAB = document.getElementById('answersAB');
var divAnswerElCD = document.getElementById('answersCD');
var nextQuestionDiv = document.getElementById('next-question');
var timerEl = document.getElementById('timer');
var divLevelIndicatorEl = document.getElementById('levelIndicator');
var endGameMsgEl = document.getElementById('endGameMsg');
var level = document.getElementById('level');
var divLogOutEl = document.getElementById('logout');
var rand = 0;

function User(username, password) {
  this.username = username;
  this.password = password;
  this.topScore = 0;
  User.allUsers.push(this);
}

// if page is refreshed set current user's score to 0 and save it to localStorage
// if currentUser's data exists in localStorage, retrieve it
User.currentUser = {name: '', score: 0, topScore: 0};
if(performance.navigation.type === 1 && localStorage.currentUser){
  checkSavedCurrentUser();
  returnUser();
  User.currentUser['score'] = 0;
  saveCurrentUser();
  questionCounter = 0;
}else if(performance.navigation.type === 0 && localStorage.currentUser){
  checkSavedCurrentUser();
  returnUser();
}

// Constructor function
function Question(question, answer, setOfAnswers, difficulty) {
  this.question = question;
  this.answer = answer;
  this.setOfAnswers = setOfAnswers;
  this.difficulty = difficulty;
  Question.allQuestions.push(this);
}

// New Instances of the constructor
//TV
new Question('Alan Reed is known for providing the voice of which character?', 'Fred Flintstone', [ 'Fred Flintstone', 'Bugs Bunny', 'Fangface', 'G.I. Joe'], 2);
new Question('From what show is the character \'James Doakes\'? ', 'Dexter', [ 'Dexter', 'Boardwalk Empire', 'Marvel\'s Daredevil', 'The Walking Dead'], 2);
new Question('Grant Gustin plays which superhero on the CW show of the same name?', 'The Flash', [ 'The Flash', 'Daredevil', 'Black Canary', 'The Arrow'], 1);
new Question('Guy\'s Grocery Games is hosted by which presenter?', 'Guy Fieri', [ 'Guy Fieri', 'Guy Ritchie', 'Guy Martin', 'Ainsley Harriott'], 1);
new Question('How long was Ken Jennings win streak on Jeopardy?', '74', [ '74', '88', '49', '62'], 2);
new Question('How many seasons did \'Stargate SG-1\' have?', '10', [ '10', '12', '7', '3'], 1);
new Question('How many seasons did the Sci-Fi television show \'Stargate Atlantis\' have?', '5', [ '5', '7', '10', '2'], 1);
new Question('How many seasons did the Sci-Fi television show \'Stargate Universe\' have?', '2', [ '2', '3', '10', '5'], 1);
new Question('How many seasons did the TV show \'Donkey Kong Country\' last?', '2', [ '2', '5', '4', '1'], 2);
new Question('In \'It\'s Always Sunny in Philadelphia\' what was the name of Frank\'s wrestling persona?', 'The Trash Man', [ 'The Trash Man', 'The Maniac', 'Day Man', 'Bird of War'], 3);
new Question('In what year did \'The Big Bang Theory\' debut on CBS?', '2007', [ '2007', '2009', '2008', '2006'], 2);
new Question('In which British seaside town was the BBC sitcom \'Fawlty Towers\' set?', 'Torquay', [ 'Torquay', 'Great Yarmouth', 'Blackpool', 'Bournemouth'], 1);
new Question('In which year did the British television series \'The Bill\' end?', '2010', [ '2010', '2007', '2001', '2012'], 2);
new Question('The \'Psycho\' series of videos on YouTube was created by which of the following?', 'RiDGiD STUDiOS', [ 'RiDGiD STUDiOS', 'VeganGainz', 'Billy Familia', 'Dan Bell'], 1);
new Question('What NBC sitcom once saw two of its characters try to pitch NBC on a sitcom about nothing?', 'Seinfeld', [ 'Seinfeld', 'Friends', 'Frasier', 'Becker'], 1);
new Question('What breed of dog is \'Scooby Doo\'?', 'Great Dane', [ 'Great Dane', 'Pit bull', 'Boxer', 'Doberman Pinscher'], 2);
new Question('What breed of dog is \'Scooby Doo\'?', 'Great Dane', [ 'Great Dane', 'Doberman Pinscher', 'Boxer', 'Pit bull'], 2);
new Question('What country is Cory in the House set in?', 'The United States of America', [ 'The United States of America', 'England', 'Venezuala', 'Canada'], 1);
new Question('What is Meg\'s full name in \'Family Guy\'?', 'Megatron Griffin', [ 'Megatron Griffin', 'Neil Griffin', 'Megan Griffin', 'Who\Cares Griffin'], 2);
new Question('What is the Klingon\'s afterlife called?', 'Sto-vo-kor', [ 'Sto-vo-kor', 'Valhalla', 'New Jersey', 'Karon\'gahk'], 3);
new Question('What is the name of Chris\'s brother in \'Everybody Hates Chris\'?', 'Drew', [ 'Drew', 'Joe', 'Greg', 'Jerome'], 1);
new Question('What is the name of Chris\'s brother in \'Everybody Hates Chris\'?', 'Drew', [ 'Drew', 'Greg', 'Jerome', 'Joe'], 1);
new Question('What is the name of the main antagonists in Battlestar Galactica?', 'The Cylons', [ 'The Cylons', 'The Collective', 'The Federation', 'The Rebels'], 2);
new Question('What is the name of the main character in \'The Flash\' TV series?', 'Barry Allen', [ 'Barry Allen', 'Bart Allen', 'Bruce Wayne', 'Oliver Queen'], 1);
new Question('What is the name of the planet that the Doctor from television series \'Doctor Who\' comes from?', 'Gallifrey', [ 'Gallifrey', 'Mondas', 'Sontar', 'Skaro'], 1);
new Question('What is the surname of the character Daryl in AMC\'s show The Walking Dead?', 'Dixon', [ 'Dixon', 'Dickinson', 'Grimes', 'Dicketson'], 2);
new Question('What was Nickelodeon\'s original name?', 'Pinwheel', [ 'Pinwheel', 'Splat!', 'MTVKids', 'KidsTV'], 2);
new Question('What was the callsign of Commander William Adama in Battlestar Galactica (2004)?', 'Husker', [ 'Husker', 'Apollo', 'Starbuck', 'Crashdown'], 3);
new Question('What was the name of Ross\' pet monkey on \'Friends\'?', 'Marcel', [ 'Marcel', 'George', 'Jojo', 'Champ'], 2);
new Question('What was the name of the the first episode of Doctor Who to air in 1963?', 'An Unearthly Child', [ 'An Unearthly Child', 'The Edge of Destruction', 'The Daleks', 'The Aztecs'], 1);
new Question('What year did the television company BBC officially launch the channel BBC One?', '1936', [ '1936', '1932', '1955', '1948'], 2);
new Question('What\'s Dr. Doofenshmirtz first name?', 'Heinz', [ 'Heinz', 'Hank', 'Heidi', 'Hans'], 3);
new Question('When did the TV show Rick and Morty first air on Adult Swim?', '2013', [ '2013', '2014', '2015', '2016'], 1);
new Question('Which British writer wrote for both Doctor Who and Sherlock?', 'Steven Moffatt', [ 'Steven Moffatt', 'Russell T Davies', 'Toby Whithouse', 'Phil Ford'], 2);
new Question('Which WWF wrestler had the nickname \'The Ayatollah of Rock \'N\' Rolla\'?', 'Chris Jericho', [ 'Chris Jericho', 'Shawn Michaels', 'Scott Hall', 'Marty Jannetty'], 2);
new Question('Which actor portrays \'Walter White\' in the series \'Breaking Bad\'?', 'Bryan Cranston', [ 'Bryan Cranston', 'Aaron Paul', 'RJ Mitte', 'Andrew Lincoln'], 1);
new Question('Which character does voice actress Tara Strong NOT voice?', 'Bubbles (2016)', [ 'Bubbles (2016)', 'Timmy Turner', 'Harley Quinn', 'Twilight Sparkle'], 2);
new Question('Which character was played by Dustin Diamond in the sitcom \'Saved by the Bell\'?', 'Screech', [ 'Screech', 'A.C. Slater', 'Zack', 'Mr. Belding'], 1);
new Question('Which company has exclusive rights to air episodes of the \'The Grand Tour\'?', 'Amazon', [ 'Amazon', 'CCTV', 'BBC', 'Netflix'], 1);
new Question('Which country does the YouTuber \'SinowBeats\' originate from?', 'Scotland', [ 'Scotland', 'England', 'Germany', 'Sweden'], 3);
new Question('Which of the following won the first season of American Idol in 2002?', 'Kelly Clarkson', [ 'Kelly Clarkson', 'Justin Guarini', 'Ruben Studdard', 'Chris Daughtry'], 1);
new Question('Which of these Bojack Horseman characters is a human?', 'Todd Chavez', [ 'Todd Chavez', 'Lennie Turtletaub', 'Princess Carolyn', 'Tom Jumbo-Grumbo'], 1);
new Question('Which of these Disney shows is classified as an anime?', 'Stitch!', [ 'Stitch!', 'The Emperor\'s New School', 'Cory in the House', 'Hannah Montana'], 1);
new Question('Which of these characters in \'Stranger Things\' has the power of Telekinesis?', 'Eleven', [ 'Eleven', 'Lucas', 'Mike', 'Karen'], 1);
new Question('Which of these in the Star Trek series is NOT Klingon food?', 'Hors d\'oeuvre', [ 'Hors d\'oeuvre', 'Racht', 'Gagh', 'Bloodwine'], 3);
new Question('Which of these television shows makes everyone look under their chair?', 'Oprah', [ 'Oprah', 'Larry Rubert', 'Saturday Night Live', 'Jimmy Fallon'], 2);
new Question('Which race enjoys a glass of warm baghol in \'Star Trek\'?', 'Klingon', [ 'Klingon', 'Vulcan', 'Botha', 'Human'], 3);
new Question('Which track by \'Massive Attack\' is used for the theme of \'House\'? ', 'Teardrop', [ 'Teardrop', 'Protection', 'Angel', 'Black Milk'], 2);
new Question('Who co-founded the YouTube Let\'s Play channel \'Game Grumps\' alongside Newgrounds animator Egoraptor?', 'JonTron', [ 'JonTron', 'Pewdiepie', 'Tobuscus', 'Markiplier'], 2);
new Question('Who is the main character in the show \'Burn Notice\'?', 'Michael Westen', [ 'Michael Westen', 'Sam Axe', 'Madeline Westen', 'Fiona Glenanne'], 1);
new Question('Who is the star of the AMC series Breaking Bad?', 'Walter White', [ 'Walter White', 'Jesse Pinkman', 'Saul Goodman', 'Skyler White'], 1);
new Question('Who played Agent Fox Mulder in the TV sci-fi drama \'The X-Files\'?', 'David Duchovny', [ 'David Duchovny', 'Mitch Pileggi', 'Robert Patrick', 'Gillian Anderson'], 1);
new Question('Who played the sun baby in the original run of Teletubbies?', 'Jessica Smith', [ 'Jessica Smith', 'Lisa Brockwell', 'Sue Monroe', 'Pui Fan Lee'], 3);
new Question('Who sang the theme song for the TV show \'Rawhide\'?', 'Frankie Laine', [ 'Frankie Laine', 'Slim Whitman', ' Tennessee Ernie Ford', 'Guy Mitchell'], 2);
new Question('Who was the first ever actor to play \'The Doctor\' on \'Doctor Who\'?', 'William Hartnell', [ 'William Hartnell', 'Tom Baker', 'Peter Capaldi', 'David Tennant'], 1);
new Question('Who was the star of the TV series \'24\'?', 'Kiefer Sutherland', [ 'Kiefer Sutherland', 'Hugh Laurie', 'Kevin Bacon', 'Rob Lowe'], 2);
new Question('Who was the winner of \'Big Brother\' Season 10?', 'Dan Gheesling', [ 'Dan Gheesling', 'Ryan Sutfin', 'Chris Mundorf', 'Bryce Kranyik'], 3);
new Question('Who was the winner of the 2016 WWE Royal Rumble?', 'Triple H', [ 'Triple H', 'AJ Styles', 'Dean Ambrose', 'Roman Reigns'], 2);
new Question('Who won Big Brother 2014 UK?', 'Helen Wood', [ 'Helen Wood', 'Pavandeep "Pav" Paul', 'Pauline Bennett', 'Christopher Hall'], 1);


function randomNumGenerator(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Fisher-Yates Shuffle gives us a random order of an array
function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Main game question function
function gameQuestions() {
  divAnswerEl.addEventListener('click', answerButtonHandler);
  timerEl.removeAttribute('class', 'hidden-element');
  questionCounter += 1;
  countDownTimer();

  // pulling a random number from our array of questions
  if (questionCounter < 4) {
    do { rand = randomNumGenerator(0, Question.allQuestions.length - 1);
    } while (Question.allQuestions[rand].difficulty !== 1);
  } else if (questionCounter < 7) {
    do { rand = randomNumGenerator(0, Question.allQuestions.length - 1);
    } while (Question.allQuestions[rand].difficulty !== 2);
  } else {
    for (var x = Question.allQuestions.length - 1; x >= 0 ; x--) {
      if (Question.allQuestions[x].difficulty === 1 || Question.allQuestions[x].difficulty === 2) {
        Question.allQuestions.splice(x, 1);
      }
    }
    if (Question.allQuestions.length === 0) {
      endingGame();
    }
    rand = randomNumGenerator(0, Question.allQuestions.length - 1);
  }

  var q1 = Question.allQuestions[rand];
  var pEl = document.createElement('p');
  pEl.textContent = q1.question;

  //appending random question to an element in game.html
  divQuestionEl.appendChild(pEl);

  // shuffling the array of possible answer so that they appear in a random order and assigning to a variable
  var answerArray = shuffle(q1.setOfAnswers);

  // for loop to assign a letter to each question in the correct order
  for (var i = 0; i < answerArray.length; i++) {
    var letterIndex;
    if (i === 0) {
      letterIndex = ' ';
    } else if (i === 1) {
      letterIndex = ' ';
    } else if (i === 2) {
      letterIndex = ' ' ;
    } else {
      letterIndex = ' ';
    }

    // creating button elements for each letter/answer, assigning the value of an answer and appending to the element that holds the buttons/answers
    var button = document.createElement('button');
    button.setAttribute('class', 'answerButton');
    var span = document.createElement('span');
    span.textContent = letterIndex;
    button.setAttribute('name', answerArray[i]);
    button.innerHTML = answerArray[i];
    if (i === 0 || i === 1) {
      divAnswerElAB.appendChild(span);
      divAnswerElAB.appendChild(button);
    } else if (i === 2 || i === 3) {
      divAnswerElCD.appendChild(span);
      divAnswerElCD.appendChild(button);
    }
  }

  //remove previous level indicator
  if (divLevelIndicatorEl.childElementCount !== 0){
    removeLevelIndicator();
    levelIndicator();
  } else {
    //display current level
    levelIndicator();
  }
}

// Event Listener on div that holds questions
function answerButtonHandler(e) {
  var target = e.target.name;
  var correctAnswer = Question.allQuestions[rand].answer;
  var answerChoice = e.srcElement;
  var answerButtonEls = document.querySelectorAll('button.answerButton');
  if (!e.target.name) {
    return;
  }

  divAnswerEl.removeEventListener('click', answerButtonHandler);
  timerEl.setAttribute('class', 'hidden-element');
  if (correctAnswer === target) {
    answerChoice.setAttribute('id', 'correct');
    for (var i = 0; i < answerButtonEls.length; i++) {
      answerButtonEls[i].setAttribute('class', 'no-hover');
    }

    User.currentUser['score'] += 1;

    soundsArray[2].pause();
    soundsArray[0].play();

    resetCurrentUserTopScore();
    saveCurrentUser();
    Question.allQuestions.splice(rand, 1);
    clearCountDown();

    var nextQuestionBtn = document.createElement('button');
    nextQuestionBtn.innerHTML = 'Next Question';
    nextQuestionDiv.appendChild(nextQuestionBtn);
    nextQuestionBtn.addEventListener('click', nextQuestionHandler);

  } else {
    answerChoice.setAttribute('id', 'incorrect');
    for (var j = 0; j < answerButtonEls.length; j++) {
      answerButtonEls[j].setAttribute('class', 'no-hover');
      if (correctAnswer === answerButtonEls[j].name) {
        answerButtonEls[j].setAttribute('id', 'correct');
      }
    }
    clearCountDown();

    soundsArray[2].pause();
    soundsArray[1].play();

    // resetCurrentUserScore();
    resetCurrentUserTopScore();
    console.log('are you saving?');
    //if user's score is greater than top score, set a new top score
    if(User.currentUser['score'] > User.currentUser['topScore']){
      User.currentUser['topScore'] = User.currentUser['score'];
    }
    saveCurrentUser();
    updateCUToAllUser();

    //ending game
    timerEl.innerHTML = '';
    endGameMsgEl.innerHTML = '<h2>Incorrect - Game Over</h2>';
    window.setInterval(function() {
      endingGame();
    }, 3000);
  }
}

function nextQuestionHandler(){
  divQuestionEl.innerHTML = '';
  divAnswerElAB.innerHTML = '';
  divAnswerElCD.innerHTML = '';
  nextQuestionDiv.innerHTML = '';
  gameQuestions();
}

function checkSavedCurrentUser(){
  var retrieve = JSON.parse(localStorage.getItem('currentUser'));
  User.currentUser['name'] = retrieve.name;
  User.currentUser['topScore'] = retrieve.topScore;

}

function saveCurrentUser(){
  localStorage.setItem('currentUser', JSON.stringify(User.currentUser));
}

function endingGame(){
  //retrieve currentUser info
  checkSavedCurrentUser();

  // clear out div
  endGameMsgEl.innerHTML = '';
  divLevelIndicatorEl.innerHTML = '';
  divQuestionEl.innerHTML = '';
  divAnswerEl.innerHTML = '';
  clearCountDown();
  timerEl.style.display = 'none';

  //display current user's name & score
  var nameScore = document.createElement('h2');
  nameScore.textContent = User.currentUser['name'].charAt(0).toUpperCase() + User.currentUser['name'].slice(1) + ', your score is: ' + User.currentUser['score'];


  // display message to user
  var newHiH3 = document.createElement('h3');
  if (User.currentUser['score'] === 0) {
    newHiH3 = document.createElement('h3');
    newHiH3.textContent = 'Keep learning, grasshopper.';
  } else if (User.currentUser['score'] < 3) {
    newHiH3 = document.createElement('h3');
    newHiH3.textContent = 'You are a Trivia Student...keep learning.';
  } else if (User.currentUser['score'] < 5) {
    newHiH3 = document.createElement('h3');
    newHiH3.textContent = 'You are a Trivia Novice...keep learning.';
  } else if (User.currentUser['score'] < 7) {
    newHiH3 = document.createElement('h3');
    newHiH3.textContent = 'Well done, you are on your way to becoming a Trivia Wizard.';
  } else if (User.currentUser['score'] < 9) {
    newHiH3 = document.createElement('h3');
    newHiH3.textContent = 'You are a Trivia Master! Keep going to reach Trivia Wizard status!';
  } else if (User.currentUser['score'] > 8) {
    newHiH3 = document.createElement('h3');
    soundsArray[4].play();
    newHiH3.textContent = 'Congrats, you are a Trivia Wizard!';
  }
  divQuestionEl.appendChild(nameScore);
  divQuestionEl.appendChild(newHiH3);

  //display play again button
  var playAgainBtn = document.createElement('button');
  playAgainBtn.className = 'play-again';
  playAgainBtn.innerHTML = 'Play Again!';
  divQuestionEl.appendChild(playAgainBtn);
  playAgainBtn.addEventListener('click', pageReload);

  //save user info into localStorage
  saveCurrentUser();
}

function pageReload(){
  location.reload();
}

function countDownTimer(){
  var timeleft = 10;
  downloadTimer = setInterval(function() {
    document.getElementById('timer').innerHTML = --timeleft;

    soundsArray[2].play();
    if (timeleft <= 0){
      soundsArray[2].pause();
      soundsArray[3].play();

      clearInterval(downloadTimer);
      document.getElementById('timer').innerHTML = '';
      endingGame();
    }
  }, 1000);
}

function clearCountDown() {
  clearInterval(downloadTimer);
  timerEl.innerHTML = '';
}

// display level the user is on
function levelIndicator() {
  if (questionCounter < 4) {
    level.textContent = 'Question ' + questionCounter + ' - Level EASY';
    divLevelIndicatorEl.appendChild(level);
  } else if (questionCounter > 3 && questionCounter < 7) {
    level.textContent = 'Question ' + questionCounter + ' - Level MEDIUM';
    level.setAttribute('id', 'medium-difficulty');
    divLevelIndicatorEl.appendChild(level);
  } else {
    level.textContent = 'Question ' + questionCounter + ' - Level HARD';
    level.setAttribute('id', 'hard-difficulty');
    divLevelIndicatorEl.appendChild(level);
  }
}

function removeLevelIndicator(){
  level.remove;
}

function resetCurrentUserTopScore(){
  if(User.currentUser['score'] > User.currentUser['topScore']) {
    User.currentUser['topScore'] = User.currentUser['score'];
  }
}

function updateCUToAllUser(){
  User.allUsers = JSON.parse(localStorage.getItem('allUsers'));
  for(var x = 0; x < User.allUsers.length; x++) {
    if(User.allUsers[x].username === User.currentUser['name']) {
      User.allUsers[x].topScore = User.currentUser['topScore'];
      localStorage.setItem('allUsers', JSON.stringify(User.allUsers));
    }
  }
}

function dispalyLogoutBtn(){
  var logOutBtn = document.createElement('button');
  logOutBtn.innerHTML = 'Logout';
  divLogOutEl.appendChild(logOutBtn);
  logOutBtn.addEventListener('click', logOutHandler);
  logOutBtn.className = 'log-out';
}

function logOutHandler(e){
  e.preventDefault();
  //remove logout button
  divLogOutEl.innerHTML = '';
  //remove currentUser from localStorage
  localStorage.removeItem('currentUser');
  resetCurrentUserTopScore();
  updatingCurrentUserAllUserObject();

  //back to index.page
  window.location.href = 'index.html';
}

function returnUser() {
  //if currentUser exists in localStorage
  if (User.currentUser['name'].length > 0) {
    //don't display login form
    //instead display welcome back message
    dispalyLogoutBtn();
  }
}

function updatingCurrentUserAllUserObject(){
  for (var i in User.allUsers) {
    if (User.allUsers[i].name === User.currentUser['name']) {
      User.allUsers[i].topScore = User.currentUser['topScore'];
    }
  }
}

// calling the main game function on page load
gameQuestions();