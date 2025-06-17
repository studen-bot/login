async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

document.getElementById("sub").addEventListener("click", async function (e) {
  e.preventDefault();
  const email = document.getElementById("email");
  const username = document.getElementById("username");
  const pass1 = document.getElementById("pass1");
  const pass2 = document.getElementById("pass2");


  const emailError = document.getElementById("emailError");
  const usernameError = document.getElementById("usernameError");
  const pass1Error = document.getElementById("pass1Error");
  const pass2Error = document.getElementById("pass2Error");
  const signupSuccess = document.getElementById("signupSuccess");


  emailError.textContent = "";
  usernameError.textContent = "";
  pass1Error.textContent = "";
  pass2Error.textContent = "";
  signupSuccess.textContent = "";
  
  let valid = true;
  if (!email.value) {
    emailError.textContent = "Email is required";
    valid = false;
  }
  if (!username.value) {
    usernameError.textContent = "Username is required";
    valid = false;
  }
  if (!pass1.value) {
    pass1Error.textContent = "Password is required";
    valid = false;
  }
  if (!pass2.value) {
    pass2Error.textContent = "Please confirm password";
    valid = false;
  } else if (pass1.value !== pass2.value) {
    pass2Error.textContent = "Passwords do not match";
    valid = false;
  }

  if (!valid) return;

  const hashedPassword = await hashPassword(pass1.value);
  localStorage.setItem("email", email.value);
  localStorage.setItem("username", username.value);
  localStorage.setItem("hashedPassword", hashedPassword);

  signupSuccess.textContent = "Signup successful! Now you can log in.";
  document.getElementById("signupForm").reset();
});