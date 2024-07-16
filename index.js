// ############### Constants ###############

const ADD = "ADD";
const INPUT = "INPUT";
const LABEL = "LABEL";
const REMOVE = "REMOVE";

// ############### Create References To "Global" Elements ###############

const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

// ############### Initialize Event Listeners ###############

// In order to minmize the amount of events I put them on the form element instead of the individual inputs, labels and whatnots.
form.addEventListener("click", (e) => handleOnClick(e));
form.addEventListener("input", (e) => handleOnInput(e));
form.addEventListener("submit", (e) => handleOnSubmit(e));

// The focusin event listens to all focusable element inside the form element.
form.addEventListener("focusin", (e) => handleOnFocusIn(e));

// The focusout does the opposite.
form.addEventListener("focusout", (e) => handleOnFocusOut(e));

// ############### Functions ###############

function checkConfirmPasswordInput() {
  const confirmPasswordLabel = confirmPassword.previousElementSibling;
  const classList = confirmPassword.classList;
  const elementsToToggle = [confirmPassword, confirmPasswordLabel];

  isConfirmPasswordValid()
    ? toggleClassesOnElements(elementsToToggle, ["error"], REMOVE)
    : toggleClassesOnElements(elementsToToggle, ["error"], ADD);

  classList.contains("error") ? updateFeedback("The passwords don't match") : updateFeedback("");
}

function checkEnableSubmit() {
  const btn = document.querySelector(".submit-btn");

  // Convert nodeList to an array in order to access array methods.
  const inputsAsArray = Array.from(inputs);

  // .every() return true if every element passes the predicate, otherwise false.
  const allInputsHaveValue = inputsAsArray.every((input) => {
    return input.value !== "";
  });

  const passwordsAreValid = isConfirmPasswordValid() && isPasswordValid();

  passwordsAreValid && allInputsHaveValue
    ? btn.removeAttribute("disabled")
    : btn.setAttribute("disabled", true);
}

function checkPasswordInput() {
  const passwordLabel = password.previousElementSibling;
  const classList = password.classList;
  const elementsToToggle = [password, passwordLabel];

  isPasswordValid()
    ? toggleClassesOnElements(elementsToToggle, ["error"], REMOVE)
    : toggleClassesOnElements(elementsToToggle, ["error"], ADD);

  classList.contains("error")
    ? updateFeedback("Password must be atleast 8 characters")
    : updateFeedback("");
}

function handleOnClick(e) {
  const el = e.target;

  // If clicked element is not a label, just cancel.
  if (el.tagName !== LABEL) return;

  el.classList.add("minimize");
  el.nextElementSibling.focus();
}

function handleOnFocusIn(e) {
  if (e.target.tagName !== INPUT) return;

  const input = e.target;
  const label = input.previousElementSibling;

  toggleClassesOnElements([label], ["minimize", "focus"], ADD);
  toggleClassesOnElements([input], ["focus"], ADD);
}

function handleOnFocusOut(e) {
  if (e.target.tagName !== INPUT) return;

  const input = e.target;
  const label = input.previousElementSibling;

  if (input.value === "") {
    toggleClassesOnElements([label], ["minimize", "focus"], REMOVE);
    toggleClassesOnElements([input], ["focus"], REMOVE);
  }
}

function handleOnInput(e) {
  const element = e.target;
  const id = element.id;

  switch (id) {
    case "password":
      checkPasswordInput();
      break;
    case "confirmPassword":
      checkConfirmPasswordInput();
      break;
  }

  checkEnableSubmit();
}

function handleOnSubmit(e) {
  e.preventDefault();

  const registrationData = {};

  inputs.forEach((input) => {
    const label = input.previousElementSibling;
    const labelText = label.innerText.toLowerCase();

    // Ignore confirmPassword when adding to registrationData
    if (input !== confirmPassword) {
      registrationData[labelText] = input.value;
    }
  });

  console.log(registrationData);
}

function isConfirmPasswordValid() {
  const passwordValue = password.value;
  const cofirmPasswordValue = confirmPassword.value;
  return cofirmPasswordValue === passwordValue;
}

function isPasswordValid() {
  const value = password.value;
  return value.length >= 8;
}

function toggleClassesOnElements(elements, classNames, action) {
  elements.forEach((element) => {
    classNames.forEach((className) => {
      switch (action) {
        case ADD:
          element.classList.add(className);
          break;
        case REMOVE:
          element.classList.remove(className);
          break;
      }
    });
  });
}

function updateFeedback(feedback) {
  const feedbackEl = document.querySelector(".feedback");
  feedbackEl.innerText = feedback;
}
