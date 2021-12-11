/** Array of question objects we are using as placeholders until DB fully functional */

let questionsMongo

//Randomly selects a question from the list of questions for this level
let currentQuestion

//Plays the audio file associated with the button
function playAudio(input) {
  Swal.fire({
    text: `Play audio for option ${input + 1} now`,
    showCancelButton: true,
    confirmButtonColor: '#32CD32',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Select'
  }).then((result) => {
    if (result.isConfirmed) {
      if(currentQuestion.responses[`option${input + 1}`].answer == "correct") {
        Swal.fire("Correct")
      } else {
        Swal.fire("Incorrect")
      }
    }
  })
  function play() {
    var filename = currentQuestion.responses[`option${input + 1}`].hint;
    var audio = new Audio(`http://ugdev.cs.smu.ca/~group16/backend/public/files/${currentQuestion.responses[`option${input + 1}`].audioLink}`)
    console.log('The audio link is ', `http://ugdev.cs.smu.ca/~group16/backend/public/files/${currentQuestion.responses[`option${input + 1}`].audioLink}`)
    audio.play()
  }
  play();
}

//Handles check to see if answer is right or wrong
function submit(input) {
  if(currentQuestion.responses[`option${input + 1}`].answer == "correct") {
    Swal.fire("Correct")
  } else {
    Swal.fire("Incorrect")
  }
}

//Handles page load
function onLoadFunction() {
  fetch("http://ugdev.cs.smu.ca:3021/level/1")
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log("This is the data", data)
      questionsMongo = data
      currentQuestion = questionsMongo[Math.floor((Math.random() * questionsMongo.length))]
      document.getElementById('displayPic').setAttribute("src", `http://ugdev.cs.smu.ca/~group16/backend/public/files/${currentQuestion.imageLink}`)
    })
    .catch(err => console.log(err))

  
}

//Provides user a hint when clicking hint button
function seeHint() {
  //current array
  let hint

  if(currentQuestion.responses.option1.answer == "correct") {
    hint = currentQuestion.responses.option1.hint
  } else if(currentQuestion.responses.option1.answer == "correct") {
    hint = currentQuestion.responses.option2.hint
  } else {
    hint = currentQuestion.responses.option3.hint
  }
  Swal.fire('Here is your hint!', hint)
}

//Handles button press for next question
function newPage() {
  if(questionsMongo.length > 1) {
    questionsMongo = questionsMongo.filter(element => currentQuestion._id != element._id)

    //Generates random question selection
    currentQuestion = questionsMongo[Math.floor((Math.random() * questionsMongo.length))]

    //Sets new question
    document.getElementById('displayPic').setAttribute("src", `http://ugdev.cs.smu.ca/~group16/backend/public/files/${currentQuestion.imageLink}`)
  }
}

//Takes user to next level
function nextLevel() {
  window.location = "Level2.html";
}

/**
 * button action for index (Start learning)
 */
function startLBTN() {
  window.location = "frontend/Level1.html";
}

/**
 * button action for index (Second level)
 */
function secondBTN() {
  window.location = "frontend/Level2.html";
}

function home() {
  window.location = "../index.html";
}

function form() {
  window.location = "frontend/submissionPage.html";
}
