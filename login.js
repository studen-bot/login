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

  // Inputs
  const emailInput = document.getElementById("emailLogin");
  const passwordInput = document.getElementById("pass3");

  // Error displays
  const emailError = document.getElementById("emailloginError");
  const passwordError = document.getElementById("pass3Error");
  const loginMessage = document.getElementById("loginMessage");

  // Clear previous messages
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

  // Retrieve stored values
  const storedEmail = localStorage.getItem("email");
  const storedHash = localStorage.getItem("hashedPassword");

  // Check stored values exist
  if (!storedEmail || !storedHash) {
    loginMessage.textContent = "No user registered. Please sign up.";
    loginMessage.className = "error";
    return;
  }

  // Check email and username
  if (emailInput.value !== storedEmail) {
    emailError.textContent = "Invalid email";
    return;
  }

  // Check password
  const enteredHash = await hashPassword(passwordInput.value);
  if (enteredHash !== storedHash) {
    passwordError.textContent = "Incorrect password";
    return;
  }

  // All matched
  loginMessage.textContent = "You are successfully logged in!";
  loginMessage.className = "success";
});