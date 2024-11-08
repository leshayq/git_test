import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCa3fPhLVv39ZKgrLd0BJjPL5bURsmMHq8",
    authDomain: "myfirstproject-1529f.firebaseapp.com",
    databaseURL: "https://myfirstproject-1529f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "myfirstproject-1529f",
    storageBucket: "myfirstproject-1529f.firebasestorage.app",
    messagingSenderId: "640356794240",
    appId: "1:640356794240:web:c1e77cbf7ce2fb8d858b65",
    measurementId: "G-0W7L5KSQB7",
    databaseURL: "https://myfirstproject-1529f-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
    const openModalButton = document.querySelector('#btnOpenModal');
    const modalContainer = document.querySelector('#modalBlock');
    const closeModalButton = document.querySelector('#closeModal');
    const questionHeading = document.querySelector('#question');
    const answerContainer = document.querySelector('#formAnswers');
    const nextBtn = document.querySelector('#next');
    const previousBtn = document.querySelector('#prev');
    const sendBtn = document.querySelector('#send');
    const modalContent = document.querySelector('.modal-dialog');

    let viewportWidth = document.documentElement.clientWidth;
    let quizData = []; 
    let currentQuestion = 0; 
    let userAnswers = {}; 

    const getData = () => {
        fetch('./questions.json')
            .then(response => response.json())
            .then(data => {
                quizData = data.questions;
                startQuiz();
            })
            .catch(error => console.error('Ошибка при загрузке данных:', error));
    };

    const startQuiz = () => {
        currentQuestion = 0;
        displayQuestion(currentQuestion);
    };

    const displayQuestion = (idx) => {
        answerContainer.innerHTML = '';
        if (idx < quizData.length) {
            questionHeading.textContent = quizData[idx].question;
            showAnswers(idx);
            sendBtn.classList.add('d-none');
            nextBtn.classList.remove('d-none');
            if (idx === 0) previousBtn.classList.add('d-none');
            else previousBtn.classList.remove('d-none');
        } else if (idx === quizData.length) {
           
            questionHeading.textContent = 'Пожалуйста, введите ваше имя и номер телефона';
            answerContainer.innerHTML = `
                <div class="form-group">
                    <label for="name">Имя:</label>
                    <input type="text" id="name" class="form-control" placeholder="Ваше имя">
                </div>
                <div class="form-group">
                    <label for="phone">Номер телефона:</label>
                    <input type="tel" id="phone" class="form-control" placeholder="38 (___) ___-__-__">
                </div>`;
            nextBtn.classList.add('d-none');
            sendBtn.classList.remove('d-none');
        } else {
            questionHeading.textContent = 'Спасибо за прохождение теста!';
            answerContainer.innerHTML = `<p>Ваши ответы были отправлены. Благодарим за участие!</p>`;
            sendBtn.classList.add('d-none');
            previousBtn.classList.add('d-none');
        }
    };

    const showAnswers = (idx) => {
        quizData[idx].answers.forEach((answer) => {
            const answerElem = document.createElement('div');
            answerElem.classList.add('answers-item', 'd-flex', 'justify-content-center');
            answerElem.innerHTML = `
                <input type="${quizData[idx].type}" id="${answer.title}" name="answer" class="d-none">
                <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.url}" alt="answer">
                    <span>${answer.title}</span>
                </label>`;
            answerElem.querySelector('input').addEventListener('change', (e) => {
                if (quizData[idx].type === 'radio') {
                    userAnswers[quizData[idx].question] = e.target.id;
                } else {
                    if (!userAnswers[quizData[idx].question]) userAnswers[quizData[idx].question] = [];
                    if (e.target.checked) userAnswers[quizData[idx].question].push(e.target.id);
                    else userAnswers[quizData[idx].question] = userAnswers[quizData[idx].question].filter(a => a !== e.target.id);
                }
            });
            answerContainer.appendChild(answerElem);
        });
    };

    nextBtn.onclick = () => {
        currentQuestion++;
        displayQuestion(currentQuestion);
    };

    previousBtn.onclick = () => {
        if (currentQuestion > 0) currentQuestion--;
        displayQuestion(currentQuestion);
    };

    sendBtn.onclick = () => {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        if (name && phone) {
            userAnswers['Имя'] = name;
            userAnswers['Телефон'] = phone;
            saveDataToFirebase(userAnswers);
            currentQuestion++;
            displayQuestion(currentQuestion);
        } else {
            alert('Пожалуйста, заполните все поля.');
        }
    };

    const saveDataToFirebase = (data) => {
        const db = getDatabase();
        const newRef = push(ref(db, 'quizResponses'));
        set(newRef, data).then(() => console.log('Ответы сохранены'));
    };

    openModalButton.addEventListener('click', () => {
        modalContainer.classList.add('d-block');
        startQuiz();
    });

    closeModalButton.addEventListener('click', () => {
        modalContainer.classList.remove('d-block');
    });

    getData();
});