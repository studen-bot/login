async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

document.getElementById("log").addEventListener("click", async function (e) {
  e.preventDefault();

  const emailInput = document.getElementById("emailLogin");
  const passwordInput = document.getElementById("pass3");
  const emailError = document.getElementById("emailloginError");
  const passwordError = document.getElementById("pass3Error");
  const loginMessage = document.getElementById("loginMessage");

  emailError.textContent = "";
  passwordError.textContent = "";
  loginMessage.textContent = "";

  let valid = true;

  if (!emailInput.value) {
    emailError.textContent = "Email is required";
    valid = false;
  }
  if (!passwordInput.value) {
    passwordError.textContent = "Password is required";
    valid = false;
  }

  if (!valid) return;

  const storedEmail = localStorage.getItem("email");
  const storedHash = localStorage.getItem("hashedPassword");

  if (!storedEmail || !storedHash) {
    loginMessage.textContent = "No user registered. Please sign up.";
    loginMessage.className = "error";
    return;
  }

  if (emailInput.value !== storedEmail) {
    emailError.textContent = "Invalid email";
    return;
  }

  const enteredHash = await hashPassword(passwordInput.value);
  if (enteredHash !== storedHash) {
    passwordError.textContent = "Incorrect password";
    return;
  }


  loginMessage.textContent = "You are successfully logged in!";
  loginMessage.className = "success";
});
