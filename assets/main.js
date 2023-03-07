var myQuestions = [
    {
      question: "Which is the best description of a variable?",
      answers: {
        a: 'Identifies a portion of a string.',
        b: 'A method to join strings.',
        c: 'Allows you to make a decision based on a condition.',
        d: 'Allows you to store information so it can be reused throughout the program'
      },
      correctAnswer: 'd'
    },
    {
      question: "Which is the best description of the substring method?",
      answers: {
        a: 'Identifies a portion of a string.',
        b: 'A method to join strings.',
        c: 'Allows you to store information so it can be reused throughout the program',
        d: 'Allows you to make a decision based on a condition.'
        
      },
      correctAnswer: 'a'
    },
    {
      question: "Which is the best description of concatenation?" ,
      answers: {
        a: 'Identifies a portion of a string.',
        b: 'A method to join strings.',
        c: 'Allows you to store information so it can be reused throughout the program',
        d: 'Allows you to make a decision based on a condition.'
      },
      correctAnswer: 'b'

    },
    {
        question: "Which is the best description of an if statement?",
        answers: {
           a: 'Identifies a portion of a string.',
           b: 'A method to join strings.',
           c: 'Allows you to store information so it can be reused throughout the program',
           d: 'Allows you to make a decision based on a condition.', 
        },
        correctAnswer: 'd'
  
      }
  ];

function generateQuestionHtml(questionList) {
    questionList.forEach((question, questionIndex) => {
        let thisQuestionHtml = ''
        // generate question header text html
        thisQuestionHtml += ` <h2>${question.question}</h2>`  
        //loop through each possible answer
        thisQuestionHtml = thisQuestionHtml + `<div class="answers">`
        Object.keys(question.answers).forEach((answerKey) => {
           
            const answerText = question.answers[answerKey]
            let answerHtml = '<label>'
                + '<input type="radio" name="question'+questionIndex+'" value="'+answerKey+'">'
                + answerKey + ': '
                + answerText
                + '</label>'
            thisQuestionHtml += answerHtml
            
        })
        thisQuestionHtml += `</div>`
        //create an input element and add to thisQuestionHtml
        
        var questionsContainer = document.getElementById('questions')
        //attach thisquestionhtml to container with an id
        questionsContainer.innerHTML = questionsContainer.innerHTML + thisQuestionHtml
    }) 
}

//listen for user submit button
var submitButton = document.getElementById('submit-button')
submitButton.addEventListener('click', submitAnswers)

//check to see if they got their answers correct
function submitAnswers() {
    var questionsElement = document.getElementById('questions')

    var answersElementsArray = []
    for(i=0; i< questionsElement.children.length; i++ ) {
        if(questionsElement.children[i].tagName !== 'H2') {
            answersElementsArray.push(questionsElement.children[i])
        }
    }

    var usersAnswer = '';
    var numCorrect = 0;
    for(i=0; i< myQuestions.length; i++){
        usersAnswer = (answersElementsArray[i].querySelector('input[name=question'+i+']:checked')||{}).value;
        var correctAnswer = myQuestions[i].correctAnswer
     
        if(usersAnswer == correctAnswer) {
            numCorrect++
        }
    }
    
    var totalAnswers = myQuestions.length
    var userGrade = calculateGrade(numCorrect, totalAnswers)

    displayGrade(userGrade)
    var questionsElement = document.getElementById('questions')
    questionsElement.remove()
}

//calculate the score/grade 
function calculateGrade(numCorrect, numTotal){
    return numCorrect/numTotal * 100
}

//display the grade
function displayGrade(grade){
    var gradeElement = document.getElementById('grade')
    gradeElement.textContent = grade
}



//create timer
//when a user clicks submit, the timer must be at a value more than zero or else call function for score
//create button to start timer
//display the timer
//display grade when timer is done or click submit and timer stops

var startButton = document.getElementById('start-button')
startButton.addEventListener('click', startQuiz)

function startQuiz() {
  var startButton = document.getElementById('start-button')
  startButton.remove()
  generateQuestionHtml(myQuestions)
  var maxTime = 15000
  runTimer(15, maxTime)
}

function displayTimer(time){
  var timeElement = document.getElementById('time')
  timeElement.textContent = time
}

function runTimer(timeInterval, maxTime){
    var startTime = new Date().getTime()
    var timer = setInterval(function() {
        var currentTime = new Date().getTime()
        var elapsedTime = currentTime - startTime
        var remainingTime = (maxTime - elapsedTime)/1000
        displayTimer(remainingTime)
        if(elapsedTime > maxTime){
            submitAnswers()

            clearInterval(timer)
        }
    }, timeInterval)
    
}



