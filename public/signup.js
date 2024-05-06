// confirm password
document.addEventListener("DOMContentLoaded", function () {
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("repeatpassword");
    const checkPassword = document.getElementById('passwordCheck')
    const form = document.getElementById("signupForm");

    form.addEventListener("submit", function (event) {
        if (passwordField.value !== confirmPasswordField.value) {
            event.preventDefault(); // Prevent form submission
            checkPassword.style.display = 'block'
            checkPassword.textContent = "Passwords do not match!"
        }
    });
});