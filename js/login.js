const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const loginError = document.getElementById("loginError");

const togglePassword = document.getElementById("togglePassword");
const loginButton = document.getElementById("loginButton");


// Demo credentials
const demoEmail = "demo@fixmyarea.com";
const demoPassword = "demo123";


// Show error
function showError(element) {
    element.classList.remove("hidden");
}


// Hide error
function hideError(element) {
    element.classList.add("hidden");
}


// Validate email format
function isValidEmail(email) {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


// Validate login form
function validateLogin() {

    let isValid = true;

    const email = emailInput.value.trim();
    const password = passwordInput.value;


    // Email validation
    if (email === "" || !isValidEmail(email)) {
        showError(emailError);
        emailInput.classList.add("border-civic-error");
        isValid = false;
    } else {
        hideError(emailError);
        emailInput.classList.remove("border-civic-error");
    }


    // Password validation
    if (password === "") {
        showError(passwordError);
        passwordInput.classList.add("border-civic-error");
        isValid = false;
    } else {
        hideError(passwordError);
        passwordInput.classList.remove("border-civic-error");
    }


    return isValid;
}


// Login function
function handleLogin(event) {

    event.preventDefault();

    hideError(loginError);


    if (!validateLogin()) {
        return;
    }


    const email = emailInput.value.trim();
    const password = passwordInput.value;


    // Check demo credentials
    if (email === demoEmail && password === demoPassword) {

        loginButton.disabled = true;
        loginButton.textContent = "Login successful!";


        // Redirect to location page
        setTimeout(() => {
            window.location.href = "location.html";
        }, 500);

    } else {

        showError(loginError);

    }
}


// Show / hide password
function togglePasswordVisibility() {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.textContent = "Hide";

    } else {

        passwordInput.type = "password";
        togglePassword.textContent = "Show";

    }
}


// Live email validation
emailInput.addEventListener("input", () => {

    hideError(loginError);

    if (isValidEmail(emailInput.value.trim())) {
        hideError(emailError);
        emailInput.classList.remove("border-civic-error");
    }

});


// Live password validation
passwordInput.addEventListener("input", () => {

    hideError(loginError);

    if (passwordInput.value !== "") {
        hideError(passwordError);
        passwordInput.classList.remove("border-civic-error");
    }

});


loginForm.addEventListener("submit", handleLogin);

togglePassword.addEventListener("click", togglePasswordVisibility);


// Mobile menu
const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});