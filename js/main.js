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
    const authDetailsContainer = document.querySelector('.auth-details');

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
    };

    const closeAuthModal = () => {
        modalAuth.style.display = 'none';
    };

    const login = (event) => {
        event.preventDefault();
        const loginValue = loginInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        if (!loginValue) {
            loginInput.style.border = loginErrorStyle;
            return;
        }

        loginInput.style.border = '';
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

        checkAuth();
    };

    authButton.addEventListener('click', openAuthModal);
    closeAuthButton.addEventListener('click', closeAuthModal);
    logoutButton.addEventListener('click', logout);
    loginForm.addEventListener('submit', login);

    checkAuth();
});
