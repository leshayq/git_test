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

    let quizData = []; 

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
                    <input type="${quizData[idx].type}" id="${ans.title}" name="answer" class="d-none">
                    <label for="${ans.title}" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src="${ans.url}" alt="answer">
                        <span>${ans.title}</span>
                    </label>`;
                answerContainer.appendChild(answerElem);
            });
        };

        const displayQuestion = (idx) => {
            answerContainer.innerHTML = '';
            if (idx < quizData.length) {
                questionHeading.textContent = quizData[idx].question;
                showAnswers(idx);

            
                if (idx === 0) {
                    previousBtn.classList.add('hidden');
                    nextBtn.classList.remove('hidden');
                } else {
                    previousBtn.classList.remove('hidden');
                    nextBtn.classList.remove('hidden');
                }
            } else {
                questionHeading.textContent = 'Спасибо за прохождение теста!';
                answerContainer.innerHTML = `
                    <div class="final-message">
                        <p>Мы благодарим вас за участие. Ваши результаты будут обработаны.</p>
                    </div>`;
                nextBtn.classList.add('hidden');
                previousBtn.classList.add('hidden');
            }
        };

        if (quizData.length > 0) {
            displayQuestion(currentQuestion);
        } else {
            console.error("Нет данных для отображения.");
        }

        nextBtn.onclick = () => {
            if (currentQuestion < quizData.length) {
                currentQuestion++;
                displayQuestion(currentQuestion);
            }
        };

        previousBtn.onclick = () => {
            if (currentQuestion > 0) {
                currentQuestion--;
                displayQuestion(currentQuestion);
            }
        };
    };

    const getData = () => {
        console.log("Начинаем загрузку данных...");
        fetch('./questions.json') 
            .then(response => {
                if (!response.ok) {
                    throw new Error("Ошибка загрузки файла JSON");
                }
                return response.json();
            })
            .then(data => {
                quizData = data.questions; 
                console.log("Данные загружены успешно:", quizData);
                startQuiz();  
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
            });
    };

    getData();  
});
