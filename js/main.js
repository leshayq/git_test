document.addEventListener("DOMContentLoaded", function () {
    const $authBtn = document.querySelector(".button-auth");
    const $logoutBtn = document.querySelector(".button-out");
    const $authModal = document.querySelector(".modal-auth");
    const $closeAuthBtn = document.querySelector(".close-auth");
    const $loginForm = document.getElementById("logInForm");
    const $loginField = document.getElementById("login");
    const $passwordField = document.getElementById("password");
    const $userNameDisplay = document.querySelector(".user-name");
    const $cardsWrap = document.querySelector(".cards.cards-restaurants");

    const eateries = [
        {
            name: "Піца плюс",
            time: "50 хвилин",
            rating: 4.5,
            price: "від 200 ₴",
            category: "Піца",
            image: "img/pizza-plus/preview.jpg"
        },
        {
            name: "Танукі",
            time: "60 хвилин",
            rating: 4.5,
            price: "От 1 200 ₴",
            category: "Суші, роли",
            image: "img/tanuki/preview.jpg"
        },
        {
            name: "FoodBand",
            time: "40 хвилин",
            rating: 4.5,
            price: "От 150 ₴",
            category: "Піца",
            image: "img/food-band/preview.jpg"
        },
        {
            name: "Ikigai",
            time: "55 хвилин",
            rating: 4.5,
            price: "От 250 ₴",
            category: "Піца",
            image: "img/palki-skalki/preview.jpg"
        },
        {
            name: "Пузата хата",
            time: "75 хвилин",
            rating: 4.5,
            price: "От 300 ₴",
            category: "Українські страви",
            image: "img/gusi-lebedi/preview.jpg"
        },
        {
            name: "PizzaBurger",
            time: "45 хвилин",
            rating: 4.5,
            price: "От 700 ₴",
            category: "Піца",
            image: "img/pizza-burger/preview.jpg"
        }
    ];

    function createCards() {
        eateries.forEach(eatery => {
            const card = `
                <a href="#" class="card card-restaurant">
                    <img src="${eatery.image}" alt="image" class="card-image" />
                    <div class="card-text">
                        <div class="card-heading">
                            <h3 class="card-title">${eatery.name}</h3>
                            <span class="card-tag tag">${eatery.time}</span>
                        </div>
                        <div class="card-info">
                            <div class="rating">${eatery.rating}</div>
                            <div class="price">${eatery.price}</div>
                            <div class="category">${eatery.category}</div>
                        </div>
                    </div>
                </a>
            `;
            $cardsWrap.insertAdjacentHTML("beforeend", card);
        });
    }

    $cardsWrap.addEventListener("click", function (e) {
        const card = e.target.closest(".card-restaurant");

        if (!card) return;

        e.preventDefault();

        if (!localStorage.getItem("login")) {
            $authModal.style.display = "block";
            document.body.style.overflow = "hidden";
        }
        if (localStorage.getItem("login")) {
            window.location.href = "restaurant.html";
        }
    });

    $authBtn.addEventListener("click", () => {
        $authModal.style.display = "block";
        document.body.style.overflow = "hidden";
        resetInputBorders();
    });

    $closeAuthBtn.addEventListener("click", () => {
        closeAuthModal();
    });

    $authModal.addEventListener("click", (e) => {
        if (e.target === $authModal) {
            closeAuthModal();
        }
    });

    if (localStorage.getItem("login")) {
        updateUIOnLogin(localStorage.getItem("login"));
    } else {
        updateUIOnLogout();
    }

    $loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const login = $loginField.value.trim();
        const password = $passwordField.value.trim();

        if (!login || !password) {
            if (!login) $loginField.style.borderColor = "red";
            if (!password) $passwordField.style.borderColor = "red";
        } else {
            localStorage.setItem("login", login);
            updateUIOnLogin(login);
            closeAuthModal();
        }
    });

    $logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("login");
        updateUIOnLogout();
    });

    function updateUIOnLogin(user) {
        $authBtn.style.display = "none";
        $logoutBtn.style.display = "inline-block";
        $userNameDisplay.textContent = 'Логін: ' + user;
        $userNameDisplay.style.display = "inline";
        resetInputBorders();
    }

    function updateUIOnLogout() {
        $authBtn.style.display = "inline-block";
        $logoutBtn.style.display = "none";
        $userNameDisplay.textContent = "";
        $userNameDisplay.style.display = "none";
        $loginField.value = "";
        $passwordField.value = "";
    }

    function closeAuthModal() {
        $authModal.style.display = "none";
        document.body.style.overflow = "";
        resetInputBorders();
    }

    function resetInputBorders() {
        $loginField.style.borderColor = "";
        $passwordField.style.borderColor = "";
    }

    createCards();
});
