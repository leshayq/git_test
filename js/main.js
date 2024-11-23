document.addEventListener('DOMContentLoaded', () => {
    const authButton = document.querySelector('.button-auth');
    const logoutButton = document.querySelector('.button-out');
    const userNameDisplay = document.querySelector('.user-name');
    const modalAuth = document.querySelector('.modal-auth');
    const closeAuthButton = document.querySelector('.close-auth');
    const loginInput = document.querySelector('#login');
    const passwordInput = document.querySelector('#password');
    const loginForm = document.querySelector('#logInForm');
    const loginErrorStyle = '2px solid red';
    const defaultBorderStyle = '2px solid black';
    const authDetailsContainer = document.querySelector('.auth-details');

    let attemptedLogin = false; 

    const checkAuth = () => {
        const userLogin = localStorage.getItem('userLogin');
        const userPassword = localStorage.getItem('userPassword');

        if (userLogin) {
            authButton.style.display = 'none';
            logoutButton.style.display = 'inline-block';
            userNameDisplay.textContent = userLogin;

            authDetailsContainer.innerHTML = `
                <p><strong>Логін:</strong> ${userLogin}</p>
                <p><strong>Пароль:</strong> ${userPassword || '(приховано)'}</p>
            `;
        } else {
            logoutButton.style.display = 'none';
            authButton.style.display = 'inline-block';
            userNameDisplay.textContent = '';
            authDetailsContainer.innerHTML = '';
        }
    };

    const openAuthModal = () => {
        modalAuth.style.display = 'block';
        document.body.style.overflow = 'hidden'; 

        
        if (!attemptedLogin) {
            loginInput.style.border = defaultBorderStyle;
            passwordInput.style.border = defaultBorderStyle;
        }
    };

    const closeAuthModal = () => {
        modalAuth.style.display = 'none';
        document.body.style.overflow = ''; 
    };

    const login = (event) => {
        event.preventDefault();
        attemptedLogin = true;

        const loginValue = loginInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        let hasError = false;

        if (!loginValue) {
            loginInput.style.border = loginErrorStyle;
            hasError = true;
        } else {
            loginInput.style.border = defaultBorderStyle;
        }

        if (!passwordValue) {
            passwordInput.style.border = loginErrorStyle;
            hasError = true;
        } else {
            passwordInput.style.border = defaultBorderStyle;
        }

        if (hasError) {
            return;
        }

        localStorage.setItem('userLogin', loginValue);
        localStorage.setItem('userPassword', passwordValue);
        checkAuth();
        closeAuthModal();
    };

    const logout = () => {
        localStorage.removeItem('userLogin');
        localStorage.removeItem('userPassword');

        loginInput.value = '';
        passwordInput.value = '';
        attemptedLogin = false; 
        checkAuth();
    };

    const handleModalClick = (event) => {
        if (event.target === modalAuth) {
            closeAuthModal();
        }
    };

    authButton.addEventListener('click', openAuthModal);
    closeAuthButton.addEventListener('click', closeAuthModal);
    logoutButton.addEventListener('click', logout);
    loginForm.addEventListener('submit', login);
    modalAuth.addEventListener('click', handleModalClick);

    checkAuth();
});
