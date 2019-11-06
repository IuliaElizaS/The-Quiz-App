// landing page



var landingPage = document.querySelector('.landing-page-container');
var adminPanel = document.querySelector('.admin-panel-container');
var quizPanel = document.querySelector('.quiz-container');


/* ------- START SECTION ----------*/
let  newStudent;

// sets the admin
  const adminFirstName = 'Bill';
  const adminLastName = 'Marshal';
  let studentIdNr = 'S'+ 1;
  let studentScore = 0;
  let studentList = [];
  let questionnaire = [];
  const startBtn = document.getElementById('start-btn');

  //checks if the input boxes are filled
  let validateNameInput = (firstNameInput, lastNameInput) => {
    console.log('validating input');//for debug
    if (firstNameInput.value != undefined & lastNameInput.value != undefined) {
      let userFirstName = firstNameInput.value;
      let userLastName = lastNameInput.value;
      checkPerson(userFirstName, userLastName);
    }else{
      alert ('Please fill in all the input boxes');
    }
  }

  //checks if the user is admin or student and displays the proper panel
  let checkPerson = (userFirstName, userLastName) => {
    console.log('checking person', userFirstName, userLastName); //for debug
    (userFirstName === adminFirstName & userLastName === adminLastName)
      ? //displays admin panel
        (adminPanel.style.display = 'block',
        landingPage.style.display = 'none')
      : //checks if a questionnaire exists
         questionnaire != undefined
         ? // if exists, checks the student list
          (studentList.length > 0)
            ? checkStudent(userFirstName, userLastName)
            : (createStudent(userFirstName, userLastName),
               displayQuizPanel())
        : // if not, alerts a message
          alert ('For the moment there is no quiz.Please come back later or contact the administrator')
  }

  //checks if a student with the same name has already taken the quiz
  let checkStudent = (userFirstName, userLastName) => {
    console.log('checking student');
    studentList.map((student, index) => {
      (student[1] === userFirstName & student[2] === userLastName)
        ? alert (`A student named ${userFirstName} ${userLastName} already took the test. Please register using your Midle Name or contact the quiz administrator`)
        : (createStudent(userFirstName, userLastName),
           displayQuizPanel());
    })
  }

  //creates the new student entry
  let createStudent = (userFirstName, userLastName) => {
    console.log('creating student');//for debug
    new Student (userFirstName, userLastName, studentIdNr);
    studentIdNr ++;
  }

  //displays the quiz panel
  const displayQuizPanel = () => {
    quizPanel.style.display = 'block';
    landingPage.style.display = 'none';
  }

  class Student {
    constructor (studentFirstName, studentLastName, studentIdNr, studentScore) {
      this.studentFirstName = studentFirstName;
      this.studentLastName = studentLastName;
      this.studentIdNr = studentIdNr;
      this.studentScore = studentScore;
      this.studentProfile = [studentIdNr, studentFirstName, studentLastName, studentScore];
    }

    addStudent = () => {
      //adds the student to studentList
      studentList.push(this.studentProfile);
      //saves the student to the Local Storage
      window.localStorage.setItem( this.studentIdNr, JSON.stringify('studentProfile'));
    }

    //updates student's score
    updateScore = (newScore) => {
      this.studentScore= newScore;
      window.localStorage.setItem(this.studentIdNr, JSON.strignify('studentProfile'));
    }

    //removes the student from studentList and Local Storage
    deleteStudent = () => {
      studentList.map((student, index) => {
        student === this.studentProfile ? studentList.splice(index, 1) : console.log ("couldn't find student");
      });
      window.localStorage.removeItem(this.studentIdNr);
    }
  };

  startBtn.addEventListener('click', ()=> {
    console.log('button clicked');
    let firstNameInput = document.getElementById('firstname');
    let lastNameInput = document.getElementById('lastname')
    validateNameInput(firstNameInput, lastNameInput);
  });






/* ------------ ADMIN PANEL ---------------- */

let questionText, correctAnswer;
let questionIdNr = 'Q' + 1;
let answerOptions = {};
let questionInputBox = document.getElementById('new-question-text');
let options = document.getElementsByClassName('admin-option');
let optionsContainer = document.getElementById('options-container');

// -----------------LOG OUT button
const logOut = document.getElementById('admin-logout-btn');
logOut.addEventListener('click', logOutAdmin());

//logs out the admin
let logOutAdmin = () => {
  adminResponse = confirm('You are going to leave this section. All unsaved data will be lost');
  adminResponse = true ? displayLandingPage() : console.log('log out canceled');
}

//displays the landing page
const displayLandingPage = () => {
  quizPanel.style.display = 'none';
  landingPage.style.display = 'block';
};

// ---------ADD NEW ANSWER buttton
const addNewAnswer = document.getElementById('new-answer-btn');
addNewAnswer.addEventListener('click', createNewAnswerBox());

//creates new answer box
let createNewAnswerBox = () => {
  const answerBox = document.createElement('div');
  optionsContainer.appendChild(answerBox);
  answerBox.className = "admin-option-wrapper"
  answerBox.innerHTML = '<input type="radio" class="admin-option-0" name="answer" value="0">
                         <input type="text" class="admin-option admin-option-0" placeholder="Answer option" value="">';
};


// ----------CLEAR QUESTION buttton
const clearQuestion = document.getElementById('questions-clear-btn');
clearQuestion.addEventListener ('click', emptyQuestionForm());

//clears the QuestionForm
const emptyQuestionForm = () => {
  questionInputBox.value = '';
  optionsContainer.innerHTML =
    '<div class="admin-option-wrapper">
      <input type="radio" class="admin-option-0" name="answer" value="0">
      <input type="text" class="admin-option admin-option-0" placeholder="Answer option" value="">
    </div>';
}

// -------------INSERT QUESTION buttton
const insertQuestion = document.getElementById('question-insert-btn');
insertQuestion.addEventListener('click', validateQuestion());

//validates the question
const validateQuestion = () => {
  //checks question input box
  questionInputBox.value == undefined
    ? alert ('please insert a question')
    : (questionText = questionInputBox.value,
      //checks answer options
       options.length <= 1
        ? alert ('please fill in at least two answers')
        : (options.map( (option, index) => {
            //checks if all answer input boxes are filled in
            option.value == undefined
            ? alert ('please fill in all the input boxes')
            : (//adds each option to the answerOptions obj
             answerOptions.index = 'option.value',
             //checks if the option is selected, if yes sets it as the correct answer
             option.previousElementSibling.checked
              ? correctAnswer = option.value
            )
          }),
          correctAnswer != undefined
            ? //calls createQuestion
              createQuestion(questionText, answerOptions, correctAnswer, questionIdNr);
    );
}

//creates the new question
const createQuestion = (questionText, answerOptions, correctAnswer, questionIdNr) => {
  console.log('creating question');//for debug
  new Question (questionText, answerOptions, correctAnswer, questionIdNr);
  questionIdNr ++;
  emptyQuestionForm();
}


//QUESTION SECTION
class Question {
  constructor (questionText, answerOptions, correctAnswer, questionIdNr) {
    this.questionText = questionText;
    this.answerOptions = answerOptions;
    this.correctAnswer = correctAnswer;
    this.questionIdNr = questionIdNr;
    this.fullQuestion = [questionIdNr, questionText, answerOptions, correctAnswer];
  }

  //adds the question to questionnaire and LocalStorage
  addQuestion = () => {
    questionnaire.push(this.fullQuestion);
    window.localStorage.setItem( this.questionIdNr, JSON.stringify('fullQuestion'));
  }

  //TO DO updates question
  updateQuestion = () => {
    //TO DO
    this.fullQuestion= updatedQuestion;
    window.localStorage.setItem(this.questionIdNr, JSON.strignify('fullQuestion'));
  }

  //removes the question from questionnaire and Local Storage
  deleteQuestion = () => {
    questionnaire.map((question, index) => {
      question === this.fullQuestion ? questionnaire.splice(index, 1) : console.log ("couldn't find question");
    });
    window.localStorage.removeItem(this.questionIdNr);
  }

}

// variables needed globaly : questionnaire, adminPanel, quizPanel, landingPage
