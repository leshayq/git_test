document.addEventListener('DOMContentLoaded', () => {
    const openModalButton = document.querySelector('#btnOpenModal');
    const modalContainer = document.querySelector('#modalBlock');
    const closeModalButton = document.querySelector('#closeModal');
    const questionHeading = document.querySelector('#question');
    const answerContainer = document.querySelector('#formAnswers');
    const toggleBurger = document.getElementById('burger');
    const nextBtn = document.querySelector('#next');
    const previousBtn = document.querySelector('#prev');
    const modalContent = document.querySelector('.modal-dialog');
    
    let viewportWidth = document.documentElement.clientWidth;
    
    toggleBurger.style.display = viewportWidth < 768 ? "flex" : "none";
    
    const quizData = [
        {
            question: "Какого цвета бургер?",
            answers: [
                { text: 'Стандарт', image: './image/burger.png' },
                { text: 'Чёрный', image: './image/burgerBlack.png' }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                { text: 'Курица', image: './image/chickenMeat.png' },
                { text: 'Говядина', image: './image/beefMeat.png' },
                { text: 'Свинина', image: './image/porkMeat.png' }
            ],
            type: 'radio'
        }
    ];
    
    let offset = -100;
    
    const slideModal = () => {
        modalContent.style.top = `${offset}%`;
        offset += 4;
        if (offset < 0) {
            requestAnimationFrame(slideModal);
        } else {
            offset = -100;
        }
    };
    
    window.addEventListener('resize', () => {
        viewportWidth = document.documentElement.clientWidth;
        toggleBurger.style.display = viewportWidth < 768 ? 'flex' : 'none';
    });
    
    toggleBurger.addEventListener('click', () => {
        toggleBurger.classList.add('active');
        modalContainer.classList.add('d-block');
        startQuiz();
    });
    
    openModalButton.addEventListener('click', () => {
        requestAnimationFrame(slideModal);
        modalContainer.classList.add('d-block');
        startQuiz();
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.modal-dialog') && !e.target.closest('.openModalButton') && !e.target.closest('.burger')) {
            modalContainer.classList.remove('d-block');
            toggleBurger.classList.remove('active');
        }
    });
    
    closeModalButton.addEventListener('click', () => {
        modalContainer.classList.remove('d-block');
        toggleBurger.classList.remove('active');
    });
    
    const startQuiz = () => {
        let currentQuestion = 0;
        
        const showAnswers = (idx) => {
            quizData[idx].answers.forEach((ans) => {
                const answerElem = document.createElement('div');
                answerElem.classList.add('answers-item', 'd-flex', 'justify-content-center');
                answerElem.innerHTML = `
                    <input type="${quizData[idx].type}" id="${ans.text}" name="answer" class="d-none">
                    <label for="${ans.text}" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src="${ans.image}" alt="answer">
                        <span>${ans.text}</span>
                    </label>`;
                answerContainer.appendChild(answerElem);
            });
        };
        
        const displayQuestion = (idx) => {
            previousBtn.classList.toggle('hidden', idx === 0);
            nextBtn.classList.toggle('hidden', idx === quizData.length - 1);
            answerContainer.innerHTML = '';
            questionHeading.textContent = quizData[idx].question;
            showAnswers(idx);
        };
        
        displayQuestion(currentQuestion);
        
        nextBtn.onclick = () => {
            currentQuestion++;
            displayQuestion(currentQuestion);
        };
        
        previousBtn.onclick = () => {
            currentQuestion--;
            displayQuestion(currentQuestion);
        };
    };
});
