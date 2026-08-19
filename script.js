// ==========================================
// SERVICE4ALL - WEEK 3 JAVASCRIPT
// ==========================================


// ==========================================
// 1. MOBILE NAVIGATION
// ==========================================

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

menuButton.addEventListener("click", function () {

    const isClosed = mobileMenu.classList.contains("hidden");

    mobileMenu.classList.toggle("hidden");

    menuButton.textContent = isClosed ? "✕" : "☰";

    menuButton.setAttribute(
        "aria-expanded",
        isClosed ? "true" : "false"
    );

    menuButton.setAttribute(
        "aria-label",
        isClosed ? "Close menu" : "Open menu"
    );

});


// Close mobile menu when a link is clicked

const mobileLinks = document.querySelectorAll(".mobile-link");

mobileLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        mobileMenu.classList.add("hidden");

        menuButton.textContent = "☰";

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Open menu"
        );

    });

});


// ==========================================
// 2. DARK / LIGHT MODE
// ==========================================

const themeToggle = document.getElementById("themeToggle");
const mobileThemeToggle =
    document.getElementById("mobileThemeToggle");


// Check saved theme

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.documentElement.classList.add("dark");

}


// Function to update theme buttons

function updateThemeButtons() {

    const darkMode =
        document.documentElement.classList.contains("dark");


    if (darkMode) {

        themeToggle.textContent = "☀️";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        mobileThemeToggle.textContent =
            "☀️ Switch to Light Mode";

    } else {

        themeToggle.textContent = "🌙";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        mobileThemeToggle.textContent =
            "🌙 Switch to Dark Mode";

    }

}


// Function to toggle theme

function toggleTheme() {

    const isDark =
        document.documentElement.classList.toggle("dark");


    if (isDark) {

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        localStorage.setItem(
            "theme",
            "light"
        );

    }


    updateThemeButtons();

}


// Desktop theme button

themeToggle.addEventListener(
    "click",
    toggleTheme
);


// Mobile theme button

mobileThemeToggle.addEventListener(
    "click",
    function () {

        toggleTheme();

        mobileMenu.classList.add("hidden");

        menuButton.textContent = "☰";

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Open menu"
        );

    }
);


// Set correct button icon when page loads

updateThemeButtons();


// ==========================================
// 3. FAQ ACCORDION
// ==========================================

const faqQuestions =
    document.querySelectorAll(".faq-question");


faqQuestions.forEach(function (question) {

    question.addEventListener(
        "click",
        function () {

            const answer =
                question.nextElementSibling;

            const icon =
                question.querySelector(".faq-icon");


            // Close all other answers

            faqQuestions.forEach(function (otherQuestion) {

                if (otherQuestion !== question) {

                    const otherAnswer =
                        otherQuestion.nextElementSibling;

                    const otherIcon =
                        otherQuestion.querySelector(
                            ".faq-icon"
                        );

                    otherAnswer.classList.add(
                        "hidden"
                    );

                    otherIcon.textContent = "+";

                }

            });


            // Open / close selected answer

            answer.classList.toggle("hidden");


            if (answer.classList.contains("hidden")) {

                icon.textContent = "+";

            } else {

                icon.textContent = "−";

            }

        }
    );

});


// ==========================================
// 4. CONTACT FORM VALIDATION
// ==========================================

const contactForm =
    document.getElementById("contactForm");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const messageInput =
    document.getElementById("message");

const nameError =
    document.getElementById("nameError");

const emailError =
    document.getElementById("emailError");

const messageError =
    document.getElementById("messageError");

const formSuccess =
    document.getElementById("formSuccess");


// ==========================================
// Validation helper functions
// ==========================================

function setValid(input, errorElement) {

    input.classList.remove(
        "border-red-500"
    );

    input.classList.add(
        "border-green-500"
    );

    errorElement.textContent = "";

    errorElement.classList.add(
        "hidden"
    );

}


function setInvalid(
    input,
    errorElement,
    message
) {

    input.classList.remove(
        "border-green-500"
    );

    input.classList.add(
        "border-red-500"
    );

    errorElement.textContent =
        message;

    errorElement.classList.remove(
        "hidden"
    );

}


// ==========================================
// Validate Name
// ==========================================

function validateName() {

    const name =
        nameInput.value.trim();


    if (name.length === 0) {

        setInvalid(
            nameInput,
            nameError,
            "Name is required."
        );

        return false;

    }


    if (name.length < 2) {

        setInvalid(
            nameInput,
            nameError,
            "Name must contain at least 2 characters."
        );

        return false;

    }


    setValid(
        nameInput,
        nameError
    );

    return true;

}


// ==========================================
// Validate Email
// ==========================================

function validateEmail() {

    const email =
        emailInput.value.trim();


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (email.length === 0) {

        setInvalid(
            emailInput,
            emailError,
            "Email is required."
        );

        return false;

    }


    if (!emailPattern.test(email)) {

        setInvalid(
            emailInput,
            emailError,
            "Please enter a valid email address."
        );

        return false;

    }


    setValid(
        emailInput,
        emailError
    );

    return true;

}


// ==========================================
// Validate Message
// ==========================================

function validateMessage() {

    const message =
        messageInput.value.trim();


    if (message.length === 0) {

        setInvalid(
            messageInput,
            messageError,
            "Message is required."
        );

        return false;

    }


    if (message.length < 10) {

        setInvalid(
            messageInput,
            messageError,
            "Message must contain at least 10 characters."
        );

        return false;

    }


    setValid(
        messageInput,
        messageError
    );

    return true;

}


// ==========================================
// REAL-TIME VALIDATION
// ==========================================

nameInput.addEventListener(
    "input",
    validateName
);

emailInput.addEventListener(
    "input",
    validateEmail
);

messageInput.addEventListener(
    "input",
    validateMessage
);


// ==========================================
// FORM SUBMISSION
// ==========================================

contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const nameIsValid =
            validateName();

        const emailIsValid =
            validateEmail();

        const messageIsValid =
            validateMessage();


        if (
            nameIsValid &&
            emailIsValid &&
            messageIsValid
        ) {

            formSuccess.classList.remove(
                "hidden"
            );


            formSuccess.textContent =
                "Your message has been submitted successfully!";


            contactForm.reset();


            // Remove green borders after reset

            setTimeout(function () {

                nameInput.classList.remove(
                    "border-green-500"
                );

                emailInput.classList.remove(
                    "border-green-500"
                );

                messageInput.classList.remove(
                    "border-green-500"
                );

            }, 100);


            // Hide success message after 5 seconds

            setTimeout(function () {

                formSuccess.classList.add(
                    "hidden"
                );

            }, 5000);

        } else {

            formSuccess.classList.add(
                "hidden"
            );

        }

    }
);