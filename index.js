const LABEL = "LABEL";

const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const password = inputs[3];
const confirmPassword = inputs[4];
const confirmPasswordLabel = confirmPassword.previousElementSibling;
const btn = document.querySelector("button");
const feedback = document.querySelector(".feedback");
const registrationData = {};

form.addEventListener("click", (e) => handleOnClick(e));
form.addEventListener("submit", (e) => handleOnSubmut(e));
confirmPassword.addEventListener("input", () => handleOnInput());

inputs.forEach((input) => {
  const label = input.previousElementSibling;

  input.addEventListener("focus", () => {
    label.classList.add("minimize", "focus");
    input.classList.add("focus");
  });

  input.addEventListener("blur", () => {
    if (input.value === "") {
      label.classList.remove("minimize", "focus");
      input.classList.remove("focus");
    }
  });
});

function handleOnClick(e) {
  const el = e.target;
  if (el.tagName !== LABEL) return;
  el.classList.add("minimize");
}

function handleOnSubmut(e) {
  e.preventDefault();

  inputs.forEach((input) => {
    const label = input.previousElementSibling;
    const labelText = label.innerText.toLowerCase();

    if (input !== confirmPassword) {
      registrationData[labelText] = input.value;
    }
  });

  console.log(registrationData);
}

function handleOnInput() {
  if (password.value !== confirmPassword.value) {
    confirmPassword.classList.add("error");
    confirmPasswordLabel.classList.add("error");
    btn.setAttribute("disabled", true);
  } else {
    confirmPassword.classList.remove("error");
    confirmPasswordLabel.classList.remove("error");
    btn.removeAttribute("disabled");
  }

  confirmPassword.classList.contains("error")
    ? (feedback.innerText = "The passwords don't match")
    : (feedback.innerText = "");
}
