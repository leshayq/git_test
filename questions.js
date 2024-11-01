const questions = [
    {
        question: "Какого цвета бургер?",
        answers: [
            {
                title: 'Стандарт',
                url: './image/burger.png'
            },
            {
                title: 'Черный',
                url: './image/burgerBlack.png'
            }
        ],
        type: 'radio'
    },
    {
        question: "Из какого мяса котлета?",
        answers: [
            {
                title: 'Курица',
                url: './image/chickenMeat.png'
            },
            {
                title: 'Говядина',
                url: './image/beefMeat.png'
            },
            {
                title: 'Свинина',
                url: './image/porkMeat.png'
            }
        ],
        type: 'radio'
    },
];

const obj = {}

const getData = () => {
    formAnswers.textContent = 'LOAD';

    setTimeout(() => {
        fetch('http://localhost:81/Quiz__intens/db.json')
            .then(res => res.json())
            .then(obj => playTest(obj.questions))
    }, 2000);
}

const obj = {};

const inputs = [...formAnswers.elements]
    .filter(elem => elem.checked)

inputs.forEach((elem, index) => {
    obj[`${index}_${questions[numberQuestion].question}`] = elem.value;
})
finalAnswers.push(obj)
