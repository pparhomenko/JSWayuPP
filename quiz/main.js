const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');   
      
const optionElements = document.querySelectorAll('.option');
const question = document.getElementById('question'); /*sam vopros*/ 
const numberOfQuestion = document.getElementById('number-of-question'); /*nomer voprosa*/
const numberOfAllQuestions = document.getElementById('number-of-all-questions');/*koli4estvo voprosov */

let indexOfQuestion;/*index tek voprosa */
let indexOfPage = 0;/*index stranici */

const answersTracker = document.getElementById('answers-tracker');/*obertka dlya trekera*/
const btnNext = document.getElementById('btn-next');//knopka dalee

let score = 0;//itogoviy resultat

const correctAnswer = document.getElementById('correct-answer');//koli4estvo pravilnix
const numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2');//koli4estvo v modalnom okne
const btnTryAgain = document.getElementById('btn-try-again');//knopka poprobovat snova


const questions = [
    {
            question: "Самый титулованный биатлонист Республики Беларусь",
            options: [
                "Олег Рыженков",
                "Антон Смольский",
                "Динара Алимбекова",
                "Дарья Домрачева",
            ],
            rightAnswer: 3
        
    },

    {
        question: "Первый фристайлист из стран СНГ в мире взявший 2 медали на зимних ОИ",
        options: [
            "Олег Рыженков",
            "Алла Цупер",
            "Дмитрий Дащинский",
            "Анна Гуськова",
        ],
        rightAnswer: 3
    
},

{
    question: "Какое итоговое  место заняла фигуриска из РБ в финале зимних ОИ 2022",
    options: [
        "6",
        "12",
        "14",
        "16",
    ],
    rightAnswer: 3

},
];

numberOfAllQuestions.innerHTML = questions.length;//vivodim koli4estvo voprosov
const load = () =>{
question.innerHTML = questions[indexOfQuestion].question;//sam vopros
//mapim otveti
option1.innerHTML = questions[indexOfQuestion].options[0];
option2.innerHTML = questions[indexOfQuestion].options[1];
option3.innerHTML = questions[indexOfQuestion].options[2];
option4.innerHTML = questions[indexOfQuestion].options[3];

numberOfQuestion.innerHTML = indexOfPage + 1;//ystanovka nomera stranici
indexOfPage++;//yveli4enie indexa stranici
};

let completedAnswers = [];//masiv dl9 zadanih voprosov

const randomOfQuestion = () => {
    let randomNumber =Math.floor( Math.random() * questions.length);
    let hitDuplicate = false;//9kor dl9 proverki odinakovih voprosov

    if(indexOfPage == questions.length){
        quizOver()//funkci9 na konec igri
    }else{
        if(completedAnswers.length >0){
            completedAnswers.forEach(item=>{
                if(item == randomNumber){
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate == true){
                randomOfQuestion();
            }else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0){
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};
const checkAnswer = el =>{
if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
    el.target.classList.add('correct');
    updateUnswerTracker('correct');
    score++;
}else{
    el.target.classList.add('wrong');
    updateUnswerTracker('wrong');
}
disableOption();
}
for(option of optionElements ){
    option.addEventListener('click',e =>checkAnswer(e));
}
const disableOption = ()=>{
    optionElements.forEach(item =>{
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer){
            item.classList.add('correct');

        }
    })
}
const enableOptions = () => {
    optionElements.forEach(item=>{
        item.classList.remove('disabled','correct','wrong');
    })
}

const answerTracker = ()=>{
    questions.forEach(()=>{
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};
const updateUnswerTracker = status => {
answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = ()=>{
    if(!optionElements[0].classList.contains('disabled')){
        alert('Вам нужно выбрать 1 из вариантов ответа ')

    }else{
        randomOfQuestion();
        enableOptions();
    }
}


const quizOver = () =>{
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML =questions.length;
};

const truAgain = ()=>{
    window.location.reload();
}
btnTryAgain.addEventListener('click',truAgain);

btnNext.addEventListener('click',()=>{
    validate();
})

window.addEventListener('load',()=>{
    randomOfQuestion();
    answerTracker();
})