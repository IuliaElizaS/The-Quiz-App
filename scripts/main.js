// landing page



var landingPage = document.querySelector('.landing-page-container');
var adminPanel = document.querySelector('.admin-panel-container');
var quizPanel = document.querySelector('.quiz-container');


/* ------- START SECTION ----------*/
  let  userFirstName, userLastName, newStudent;

// sets the admin
  const adminFirstName = 'Bill';
  const adminLastName = 'Marshal';
  let studentIdNr = 0;
  let studentList = [];
  const firstNameInput = document.getElementById('firstname');
  const lastNameInput = document.getElementById('lastname')
  const startBtn = document.getElementById('start-btn');

  //checks if the input boxes are filled
  let validateNameInput = (firstNameInput, lastNameInput) => {
    console.log('validating input', firstNameInput, lastNameInput);//for debug
    if (firstNameInput.value & lastNameInput.value) {
      userFirstName = firstNameInput.value;
      userLastName = lastNameInput.value;
      checkPerson(userFirstName, userLastName);
    }else {
      alert ('Please fill in all the input boxes');
    }
  }

  //checks if the user is admin or student and displays the proper panel
  let checkPerson = (userFirstName, userLastName) => {
    console.log('checking student', userFirstName, userLastName); //for debug
    if(userFirstName === adminFirstName & userLastName === adminLastName) {
      //displays admin panel
      adminPanel.style.display = 'block';
      landingPage.style.display = 'none';
    } else if (studentList.length > 0) {
      checkStudent(userFirstName, userLastName);
    }else {
      createStudent(userFirstName, userLastName);
      displayQuizPanel();
    };
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

  /*checks if a questionnaire exists
  let checkQuestionnare = () => {

  }*/

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
    constructor (studentFirstName, studentLastName, studentIdNr) {
      this.studentFirstName = studentFirstName;
      this.studentLastName = studentLastName;
      this.studentIdNr = studentIdNr;
      this.studentScore = 0;
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

  startBtn.addEventListener('click', validateNameInput(firstNameInput, lastNameInput));

/* ------------ ADMIN PANEL ---------------- */
