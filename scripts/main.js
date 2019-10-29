// landing page

//start section

var landingPage = document.querySelector('.landing-page-container');
var adminPanel = document.querySelector('.admin-panel-container');
var quizPanel = document.querySelector('.quiz-container');


let startSectionModule = ( () => {
  const firstNameInput, lastNameInput, adminFirstName, adminLastName, startBtn;
  let userFirstName, userLastName, newStudent, studentList, studentIdNr;

// sets amin's
  adminFirstName = Bill;
  adminLastName = Marshal;
  studentIdNr = 0;
  studentList = [];
  firstNameInput = document.getElementById('firstname');
  lastNameInput = document.getElementById('lastname')
  startBtn = document.getElementById('start-btn');
  startBtn.addEventListener('click', openPanel);

  //checks if the input boxes are filled
  const validateNameInput = (firstNameInput, lastNameInput) =>
    if (firstNameInput.value & lastNameInput.value) {
      userFirstName = firstNameInput.value;
      userLastName = lastNameInput.value;
      return (userFirstName, userLastName);
    } else {
      alert ('Please fill in all the boxes');
    };

  //checks if the user is admin or student and displays the proper panel
  const checkPerson = () => {
    if (userFirstName === adminFirstName & userLastName === adminLastName) {
      //displays admin panel
      adminPanel.style.display = 'block';
      landingPage.style.display = 'none';
    } else {
      studentList.length > 0 ? checkStudent() :
      //displays quiz panel
      quizPanel.style.display = 'block';
      landingPage.style.display = 'none';



    }

    //checks if the student has already taken the quiz
    //if yes - retrievs it's data, if no-creates the new student

    //creates the student's Profile

    const checkStudent = () => {
      for (const student of studentList) {
        if student[1] === userFirstName & student[2] === userLastName) {
          const reply = confirm(`A student named ${userFirstName} ${userLastName} already took the test. Do you want to repeat it?`);
          reply != true ? getStudentData();
        } else {
          // creates the new student
        }
      }
    }

    //const getStudentData - retriev student data from localStorage
  }

  class Student {
    constructor (studentFirstName, studentLastName, studentIdNr) {
      this.studentFirstName = studentFirstName;
      this.studentLastName = studentLastName;
      this.studentIdNr = studentIdNr;
      this.studentScore = 0;
      this.studentProfile = [studentIdNr, studentFirstName, studentLastName, studentScore];
    }

    addStudent () => {
      //adds the student to studentList
      studentList.push(this.studentProfile);
      //saves the student to the Local Storage
      window.localStorage.setItem( this.studentIdNr, JSON.stringify('studentProfile'));
    }

    updateScore (newScore) => {
      //updates student's score
      this.studentScore= newScore;
      //updates student's score on Local storage
      window.localStorage.setItem(this.studentIdNr, JSON.strignify('studentProfile'));
    }

    deleteStudent () => {
      //removes the student from studentList
      studentList.push(this.studentProfile);
      //removes the student from the Local Storage
      window.localStorage.removeItem(this.studentIdNr);
    }

  }


  //if the user is a new student adds him to the students list and to local storage



  //checks if a questionnaire exists

  //makes the proper panel vizible
  const openPanel = (firstName, lastName) => {


  }
})();
