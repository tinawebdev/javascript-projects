const form = document.getElementById('form');
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

let isValid = false;
let passwordsMatch = false;

function validateForm() {
   // Use HTML constraint API to check form validity
  isValid = form.checkValidity();
  // Style main message for an error
  if (!isValid) {
    message.textContent = 'Please fill out all fields.';
    message.style.color = 'var(--input-invalid-color)';
    messageContainer.style.borderColor = 'var(--input-invalid-color)';
    return;
  }
  // Check to see if passwords match
  if (password1El.value === password2El.value) {
    // If they match, set value to true and borders to green
    passwordsMatch = true;
    password1El.style.borderColor = 'var(--input-valid-color)';
    password2El.style.borderColor = 'var(--input-valid-color)';
  } else {
    // If they don't match, border color of input to red, change message
    passwordsMatch = false;
    message.textContent = 'Make sure passwords match.';
    message.style.color = 'var(--input-invalid-color)';
    messageContainer.style.borderColor = 'var(--input-invalid-color)';
    password1El.style.borderColor = 'var(--input-invalid-color)';
    password2El.style.borderColor = 'var(--input-invalid-color)';
    return;
  }
  // If form is valid and passwords match
  if (isValid && passwordsMatch) {
    // Style main message for success
    message.textContent = 'Successfully Registered!';
    message.style.color = 'var(--input-valid-color)';
    messageContainer.style.borderColor = 'var(--input-valid-color)';
  }
}

function storeFormData() {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password.value,
  };
  // Do something with user data
  console.log(user);
}

function processFormData(e) {
  e.preventDefault();
  // Validate Form
  validateForm();
  // Submit Form if Valid
  if (isValid && passwordsMatch) {
    storeFormData();
  }
}

// Event Listener
form.addEventListener('submit', processFormData);
