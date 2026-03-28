document.querySelectorAll(".toggle-password").forEach(function (toggleButton) {
  toggleButton.addEventListener("click", function () {
    const passwordInput = document.getElementById(toggleButton.dataset.target);
    const shouldShowPassword = passwordInput.type === "password";

    passwordInput.type = shouldShowPassword ? "text" : "password";
    toggleButton.textContent = shouldShowPassword ? "Hide" : "Show";
    toggleButton.setAttribute(
      "aria-label",
      shouldShowPassword ? "Hide password" : "Show password",
    );
  });
});
