const questions=[
    {
        question:"What does CSS used for?",
        answers:[
            {text:"Scripting" , correct:"false"},
            {text:"Structuring" , correct:"false"},
            {text:"Styling" , correct:"true"},
            {text:"All the above" , correct:"false"}
        ]
    },
    {
        question:"How is Javascript embedded in HTML?",
        answers:[
            {text:"Inline" , correct:"false"},
            {text:"Internal" , correct:"false"},
            {text:"External" , correct:"false"},
            {text:"All the above" , correct:"true"}
        ]
    },
    {
        question:"Which is used to structure the webpage?",
        answers:[
            {text:"Javascript" , correct:"false"},
            {text:"HTML" , correct:"true"},
            {text:"CSS" , correct:"false"},
            {text:"SASS" , correct:"false"}
        ]
    },
    {
        question:"How are objects organized in HTML DOM?",
        answers:[
            {text:"Class-wise" , correct:"false"},
            {text:"Queue" , correct:"false"},
            {text:"Hierarchy" , correct:"true"},
            {text:"Stack" , correct:"false"}
        ]
    }
]

let questionElement=document.querySelector(".questions")
let answerElement=document.querySelector(".answers")
let nextBtn=document.getElementById("next")
let answerButton=document.querySelector(".option")

let currentQuestionIndex=0;
let score=0;

function start(){
    currentQuestionIndex=0;
    score=0;
    showQuestion();
 
}

function showQuestion(){
    resetState()
    //displaying question
    let currentItem=questions[currentQuestionIndex]
    let questionNumber=currentQuestionIndex + 1;
    questionElement.innerHTML=questionNumber + " . " + currentItem.question;
    
    //displaying answers
    currentItem.answers.forEach(answer=>{
        const button=document.createElement("button")
        button.innerHTML=answer.text;
        button.classList.add("btn")
        answerButton.appendChild(button)
        button.addEventListener("click",selectAnswer)
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        
        
})
}
function resetState(){
    nextBtn.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}
function selectAnswer(e){
    const selectedButton=e.target;
    const isCorrect=selectedButton.dataset.correct==="true";
    if(isCorrect){
        selectedButton.classList.add("correct");
        score++;
    }else{
        selectedButton.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    })
    nextBtn.style.display="initial";
}
function showScore(){
    resetState()
    questionElement.innerHTML=`You have scored ${score } out of ${questions.length} !`
    nextBtn.innerHTML="Play Again";
    nextBtn.style.display="initial"
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}
nextBtn.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }else{
        start()
    }
})

start()