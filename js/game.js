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
//Films
new Question('In the 1979 British film \'Quadrophenia\' what is the name of the seaside city the mods are visiting?', 'Brighton', [ 'Brighton', 'Mousehole', 'Bridlington', 'Eastbourne'], 2);
new Question('In the movie \'Cast Away\' the main protagonist\'s best friend while on the island is named', 'Wilson', [ 'Wilson', 'Jackson', 'Willy', 'Carson'], 1);
new Question('In the movie \'Scream\' who is Ghost Face?', 'Billy Loomis and Stu Macher', [ 'Billy Loomis and Stu Macher', 'Sidney Prescott', 'Archie Prescott and Philip Marv', 'Dewey Riley'], 3);
new Question('In what year did Clint Eastwood star as Inspector Harry Callahan in the film \'Dirty Harry\'?', '1971', [ '1971', '1983', '1969', '1975'], 3);
new Question('In what year does Jurassic World open in the \'Jurassic Park\' universe?', '2005', [ '2005', '2020', '2015', '2007'], 3);
new Question('In what year was the first Transformers movie released?', '1986', [ '1986', '2009', '1984', '2007'], 2);
new Question('In what year was the movie \'Police Academy\' released?', '1984', [ '1984', '1985', '1986', '1983'], 2);
new Question('In which 1955 film does Frank Sinatra play Nathan Detroit?', 'Guys and Dolls', [ 'Guys and Dolls', 'High Society', 'From Here to Eternity', 'Anchors Aweigh'], 2);
new Question('In which 1973 film does Yul Brynner play a robotic cowboy who malfunctions and goes on a killingtspree?', 'Westworld', [ 'Westworld', 'Android', 'Runaway', 'The Terminators'], 2);
new Question('In which African country was the 2006 film \'Blood Diamond\' mostly set in?', 'Sierra Leone', [ 'Sierra Leone', 'Burkina Faso', 'Liberia', 'Central African Republic'], 2);
new Question('In which movie does Robin Williams character have to disguise themselves into a woman?', 'Mrs. Doubtfire', [ 'Mrs. Doubtfire', 'Old Dogs', 'Awakenings', 'Jumanji'], 2);
new Question('Leonardo Di Caprio won his first Best Actor Oscar for his performance in which film?', 'The Revenant', [ 'The Revenant', 'Shutter Island', 'Inception', 'The Wolf Of Wall Street'], 2);
new Question('Mark Wahlberg played the titular character of which 2008 video-game adaptation?', 'Max Payne', [ 'Max Payne', 'God Of War', 'Hitman', 'Alan Wake'], 2);
new Question('The 2002 film \'28 Days Later\' is mainly set in which European country?', 'United Kingdom', [ 'United Kingdom', 'Italy', 'France', 'Germany'], 1);
new Question('The 2016 Disney animated film \'Moana\' is based on which culture?', 'Polynesian', [ 'Polynesian', 'Nordic', 'Native American', 'Japanese'], 1);
new Question('The Queen song `A Kind Of Magic` is featured in which 1986 film?', 'Highlander', [ 'Highlander', 'Labyrinth', 'Flash Gordon', 'Howard the Duck'], 1);
new Question('This trope refers to minor characters that are killed off to show how a monster works.', 'Red Shirt', [ 'Red Shirt', 'Minions', 'Cannon Fodder', 'Expendables'], 2);
new Question('Velma Kelly and Roxie Hart are the protagonists of which Oscar winning movie?', 'Chicago', [ 'Chicago', 'Cabaret', 'All That Jazz', 'Dreamgirls'], 2);
new Question('What character in the Winnie the Pooh films was added by Disney and does not appear in the original books?', 'Gopher', [ 'Gopher', 'Tigger', 'Rabbit', 'Heffalumps'], 2);
new Question('What did Alfred Hitchcock use as blood in the film \'Psycho\'? ', 'Chocolate syrup', [ 'Chocolate syrup', 'Maple syrup', 'Red food coloring', 'Ketchup'], 3);
new Question('What did the first moving picture depict?', 'A galloping horse', [ 'A galloping horse', 'A woman in a dress', 'A man walking', 'A crackling fire'], 3);
new Question('What film did James Cameron\'s Avatar dethrone as the highest-grossing film ever?', 'Titanic', [ 'Titanic', 'Jaws', 'Gone with the Wind', 'Star Wars'], 2);
new Question('What is the correct spelling of the protagonist of the book in The NeverEnding Story (1984)?', 'Atreyu', [ 'Atreyu', 'Atrayu', 'Atraiyu', 'Atraeyu'], 2);
new Question('What is the highest grossing film of all time (without adjusting for inflation)?', 'Avatar', [ 'Avatar', 'Star Wars: The Force Awakens', 'Jurassic World', 'Godfather'], 1);
new Question('What is the name of James Dean\'s character in the 1955 movie \'Rebel Without a Cause\'?', 'Jim Stark', [ 'Jim Stark', 'Ned Stark', 'Frank Stark', 'Jim Kane'], 2);
new Question('What is the name of the assassin in the first \'Hellboy\' movie?', 'Karl Ruprecht Kroenen', [ 'Karl Ruprecht Kroenen', 'Klaus Werner von Krupt', 'Ilsa Haupstein', 'Grigori Efimovich Rasputin'], 3);
new Question('What is the name of the dog that played Toto in the 1939 film \'The Wizard of Oz\'?', 'Terry', [ 'Terry', 'Toto', 'Tommy', 'Teddy'], 2);
new Question('What is the name of the first \'Star Wars\' film by release order?', 'A New Hope', [ 'A New Hope', 'Revenge of the Sith', 'The Force Awakens', 'The Phantom Menace'], 2);
new Question('What is the name of the island that \'Jurassic Park\' is built on?', 'Isla Nublar', [ 'Isla Nublar', 'Isla Pena', 'Isla Muerta', 'Isla Sorna'], 1);
new Question('What is the name of the queen\'s pet in A Bug\'s Life?', 'Aphie', [ 'Aphie', 'Hopper', 'Dot', 'Flik'], 2);
new Question('What is the name of the robot in the 1951 science fiction film classic \'The Day the Earth Stood Still\'?', 'Gort', [ 'Gort', 'Robby', 'Box', 'Colossus'], 2);
new Question('What is the name of the supercomputer located in the control room in \'Jurassic Park\'?', 'Thinking Machines CM-5', [ 'Thinking Machines CM-5', 'IBM Blue Gene/Q', 'Cray XK7', 'Cray X-MP'], 3);
new Question('What is the name of the villian in the 2015 Russian-American Sci-Fi Movie \'Hardcore Henry\'?', 'Akan', [ 'Akan', 'Henry', 'Estelle', 'Jimmy'], 2);
new Question('What is the oldest Disney film?', 'Snow White and the Seven Dwarfs', [ 'Snow White and the Seven Dwarfs', 'Dumbo', 'Pinocchio', 'Fantasia'], 1);
new Question('What is the species of the \'Predator\' in the 1987 movie \'Predator\'?', 'Yautja', [ 'Yautja', 'Phocrex', 'Praetorian', 'Xenomorph'], 3);
new Question('What name did Tom Hanks give to his volleyball companion in the film `Cast Away`?', 'Wilson', [ 'Wilson', 'Friday', 'Jones', 'Billy'], 1);
new Question('What was Bruce Campbell\'s iconic one-liner after getting a chainsaw hand in Evil Dead 2?', 'Groovy.', [ 'Groovy.', 'Perfect.', 'Gnarly.', 'Nice.'], 1);
new Question('What was Dorothy\'s surname in \'The Wizard Of Oz\'?', 'Gale', [ 'Gale', 'Parker', 'Perkins', 'Day'], 1);
new Question('What was Marilyn Monroe`s character\'s first name in the film \'Some Like It Hot\'?', 'Sugar', [ 'Sugar', 'Caramel', 'Candy', 'Honey'], 2);
new Question('What was the first James Bond film?', 'Dr. No', [ 'Dr. No', 'Goldfinger', 'Thunderball', 'From Russia With Love'], 1);
new Question('What was the first feature-length computer-animated movie?', 'Toy Story', [ 'Toy Story', 'Tron', 'Lion king', '101 Dalmatians'], 1);
new Question('What was the first monster to appear alongside Godzilla?', 'Anguirus', [ 'Anguirus', 'King Kong', 'King Ghidora', 'Mothra'], 1);
new Question('What was the first movie to ever use a Wilhelm Scream?', 'Distant Drums', [ 'Distant Drums', 'Treasure of the Sierra Madre', 'Indiana Jones', 'The Charge at Feather River'], 3);
new Question('What was the last Marx Brothers film to feature Zeppo?', 'Duck Soup', [ 'Duck Soup', 'A Day at the Races', 'A Night at the Opera', 'Monkey Business'], 3);
new Question('What was the name of the planet in \'Aliens\'?', 'LV-426', [ 'LV-426', 'Weyland Yutani Corporation Base', 'DI-621', 'FR-838'], 3);
new Question('What was the name of the protagonist in the movie Commando (1985)?', 'John Matrix', [ 'John Matrix', 'Ben Richards', 'Douglas Quaid', 'Harry Tasker'], 2);
new Question('What was the name of the protagonist in the movie Commando (1985)?', 'John Matrix', [ 'John Matrix', 'Harry Tasker', 'Douglas Quaid', 'Ben Richards'], 2);
new Question('What year did the James Cameron film \'Titanic\' come out in theaters?', '1997', [ '1997', '1999', '1996', '1998'], 2);
new Question('When was the movie \'Con Air\' released?', '1997', [ '1997', '1999', '1990', '1985'], 1);
new Question('Where does the original Friday The 13th movie take place?', 'Camp Crystal Lake', [ 'Camp Crystal Lake', 'Packanack', 'Camp Forest Green', 'Higgins Haven'], 1);
new Question('Which 1958 movie starred Kirk Douglas and Tony Curtis as half-brothers Einar and Eric?', 'The Vikings ', [ 'The Vikings ', 'The Long Ships', 'Spartacus', 'Prince Valiant'], 2);
new Question('Which actor played the main character in the 1990 film \'Edward Scissorhands\'?', 'Johnny Depp', [ 'Johnny Depp', 'Ben Stiller', ' Clint Eastwood', 'Leonardo DiCaprio'], 2);
new Question('Which actor plays Obi-Wan Kenobi in Star Wars Episodes I-lll?', 'Ewan McGregor', [ 'Ewan McGregor', 'Liam Neeson', 'Hayden Christensen', 'Alec Guinness'], 1);
new Question('Which actress danced the twist with John Travolta in \'Pulp Fiction\'?', 'Uma Thurman', [ 'Uma Thurman', 'Pam Grier', 'Kathy Griffin', 'Bridget Fonda'], 1);
new Question('Which actress portrayed Dr. Grace Augustine in the James Cameron movie \'Avatar\'?', 'Sigourney Weaver', [ 'Sigourney Weaver', 'Jessica Chastain', 'Melissa Beckett', 'Alyssa Monroe '], 3);
new Question('Which animated movie was first to feature a celebrity as a voice actor?', 'Aladdin', [ 'Aladdin', 'Toy Story', 'The Hunchback of Notre Dame', 'James and the Giant Peach'], 1);
new Question('Which former Star Trek actor directed Three Men and a Baby (1987)?', 'Leonard Nimoy', [ 'Leonard Nimoy', 'William Shatner', 'James Doohan', 'George Takei'], 2);
new Question('Which of the following James Bond villains is not affiliated with the SPECTRE organization?', 'Auric Goldfinger', [ 'Auric Goldfinger', 'Dr. Julius No', 'Rosa Klebb', 'Emilio Largo'], 2);
new Question('Which of the following is not the name of a \'Bond Girl\'? ', 'Vanessa Kensington', [ 'Vanessa Kensington', 'Pam Bouvier', 'Wai Lin', 'Mary Goodnight'], 1);
new Question('Which of the following movies was not based on a novel by Stephen King? ', 'The Thing', [ 'The Thing', 'Misery', 'Carrie', 'The Green Mile'], 1);
new Question('Which of the following was not one of \'The Magnificent Seven\'?', 'Clint Eastwood', [ 'Clint Eastwood', 'Charles Bronson', 'Steve McQueen', 'Robert Vaughn'], 1);
new Question('Which of these actors/actresses is NOT a part of the cast for the 2016 movie \'Suicide Squad\'?', 'Scarlett Johansson', [ 'Scarlett Johansson', 'Will Smith', 'Margot Robbie', 'Jared Leto'], 1);
new Question('Which one of these films are shot entirely in one-take?', 'Russian Ark', [ 'Russian Ark', 'Schindler&#039;s List', 'Good Will Hunting', 'Birdman'], 2);
new Question('Which town is the setting for the Disney movie The Love Bug (1968)?', 'San Francisco', [ 'San Francisco', 'San Jose', 'Sacramento', 'Los Angeles'], 2);
new Question('Which was the first of Alfred Hitchcock\'s movies to be filmed in colour?', 'Rope', [ 'Rope', 'Vertigo', 'Rebecca', 'Psycho'], 3);
new Question('Who directed \'E.T. the Extra-Terrestrial\' (1982)?', 'Steven Spielberg', [ 'Steven Spielberg', 'Tim Burton', 'James Cameron', 'Stanley Kubrick'], 1);
new Question('Who directed the 1973 film \'American Graffiti\'?', 'George Lucas', [ 'George Lucas', 'Francis Ford Coppola', 'Ron Howard', 'Steven Spielberg'], 2);
new Question('Who directed the 2015 movie \'The Revenant\'?', 'Alejandro G. Iñárritu', [ 'Alejandro G. Iñárritu', 'Christopher Nolan', 'Wes Anderson', 'David Fincher'], 1);
new Question('Who is the director of the 1991 film \'Silence of the Lambs\'?', 'Jonathan Demme', [ 'Jonathan Demme', 'Michael Bay', 'Frank Darabont', 'Stanley Kubrick'], 2);
new Question('Who played Batman in the 1997 film \'Batman and Robin\'?', 'George Clooney', [ 'George Clooney', 'Michael Keaton', 'Val Kilmer', 'Christian Bale'], 2);
new Question('Who played Deputy Marshal Samuel Gerard in the 1993 film \'The Fugitive\'?', 'Tommy Lee Jones', [ 'Tommy Lee Jones', 'Harvey Keitel', 'Martin Landau', 'Harrison Ford'], 1);
new Question('Who played Sgt. Gordon Elias in \'Platoon\' (1986)?', 'Willem Dafoe', [ 'Willem Dafoe', 'Johnny Depp', 'Matt Damon', 'Charlie Sheen'], 2);
new Question('Who played the female lead in the 1933 film \'King Kong\'?', 'Fay Wray', [ 'Fay Wray', 'Vivien Leigh', 'Mae West', 'Jean Harlow'], 1);
new Question('Who plays \'Bruce Wayne\' in the 2008 movie \'The Dark Knight\'?', 'Christian Bale', [ 'Christian Bale', 'Heath Ledger', 'Michael Caine', 'Ron Dean'], 2);
new Question('Who plays Alice in the Resident Evil movies?', 'Milla Jovovich', [ 'Milla Jovovich', 'Milla Johnson', 'Kim Demp', 'Madison Derpe'], 1);
new Question('Who plays the character of Po in the Kung Fu Panda movies?', 'Jack Black', [ 'Jack Black', 'Mirana Jonnes', 'Jim Petersson', 'McConahey Ramses'], 1);
new Question('Who starred as Bruce Wayne and Batman in Tim Burton\'s 1989 movie \'Batman\'?', 'Michael Keaton', [ 'Michael Keaton', 'Val Kilmer', 'Adam West', 'George Clooney'], 1);
new Question('Who starred in the film 1973 movie \'Enter The Dragon\'?', 'Bruce Lee', [ 'Bruce Lee', 'Jackie Chan', 'Jet Li', ' Yun-Fat Chow'], 1);
new Question('Who voiced Metalbeard in \'The Lego Movie\'?', 'Nick Offerman', [ 'Nick Offerman', 'Will Arnet', 'Morgan Freeman', 'Liam Neeson'], 2);
new Question('Who voiced the character Draco in the 1996 movie \'DragonHeart\'?', 'Sean Connery', [ 'Sean Connery', 'Pete Postlethwaite', 'Dennis Quaid', 'Brian Thompson'], 2);
new Question('Who voices the main character Blu in the 2011 animated film \'Rio\'?', 'Jesse Eisenberg', [ 'Jesse Eisenberg', 'Michael Cera', 'Zach Galifianakis', 'Jonah Hill'], 2);
new Question('Who was the director of \'Scott Pilgrim vs. the World (2010)\'?', 'Edgar Wright', [ 'Edgar Wright', 'Seth Rogan', 'Phil Lord', 'Chris Miller'], 2);
new Question('Who wrote and directed the 1986 film \'Platoon\'?', 'Oliver Stone', [ 'Oliver Stone', 'Stanley Kubrick', 'Michael Cimino', 'Francis Ford Coppola'], 1);


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