window.addEventListener("DOMContentLoaded", () => {
    const pass1 = document.querySelector(".p2 input");
    const pass2 = document.querySelector(".p4 input");
    const resetBtn = document.querySelector(".button button");

    resetBtn.addEventListener("click", (e) => {
        e.preventDefault();

        clearErrors();

        const newPassword = pass1.value.trim();
        const confirmPassword = pass2.value.trim();

        if (!newPassword || !confirmPassword) {
            showError(".p2", "Please enter new password.");
            showError(".p4", "Please confirm your password.");
            return;
        }

        if (newPassword !== confirmPassword) {
            showError(".p4", "Passwords do not match.");
            return;
        }

        if (newPassword.length < 8) {
            showError(".p2", "Password must be at least 8 characters.");
            return;
        }

        hashPassword(newPassword).then((hashed) => {
            localStorage.setItem("hashedPassword", hashed);
            alert("Password reset successful!");
            window.location.href = "index.html";
        });
    });

    function showError(selector, message) {
        let container = document.querySelector(selector);
        let span = document.createElement("span");
        span.className = "error-message";
        span.style.color = "red";
        span.textContent = message;
        container.appendChild(span);
    }

    function clearErrors() {
        document.querySelectorAll(".error-message").forEach(e => e.remove());
    }

    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
});