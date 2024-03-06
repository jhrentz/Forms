// JavaScript code for form validation

// RUBRIC: Retrieve the input field element (10%)
let inputField = document.getElementById("inputField");
inputField.value = "";
inputField.required = true;
inputField.focus();
inputField.addEventListener("input", validateForm);
let aValidCharacter = false; // becomes true after a valid alphanumeric is entered

// RUBRIC: Validate the input value using a regular expression (30%)
// I am still confused about the structure of "regular expressions", 
// but the following seemed to work. 
// Reference: 
// https://stackoverflow.com/questions/67134061/regex-allowing-a-za-z0-9-spaces-dots-commas-minus-and-not-allowing-newline
function isAlphanumeric(inputString) {
    return /^[A-Za-z0-9]+$/.test(inputString); 
}

let form = document.forms.myForm;
let submitBtn = form.elements[1];
submitBtn.addEventListener("click", submitForm);

// RUBRIC: Prevent form submission for non-alphanumeric values (15%)
// Submit button ONLY appears and is enabled when there is a 
// valid alphanumeric expression in the text field.
submitBtn.disabled = true; 

function validateForm() {
  // returns true if current input is valid
  // returns false if current input is not valid
  // enables and disables the [Submit] button
  // delivers appropriate message to user
  // non-alphanumeric characters do not appear in the input box
  inputField.checkValidity();
    if (inputField.validity.valueMissing) {
          // Display error message for empty field
          inputField.setCustomValidity("Please enter a VALID alphanumeric value:");
          submitBtn.disabled = true; // cannot submit
          return false;
    } else if (isAlphanumeric(inputField.value)) {
          // current entry is alphanumeric, an acceptable entry
          submitBtn.disabled = false; // can submit
          aValidCharacter = true; // at least one alphanumeric now exists in entry field
          return true;
    } else {
          // RUBRIC: Display error message for non-alphanumeric values (15%)
          // I could not get this to work properly using "setCustomValidity."
          // So, I used an "alert message" instead.
          alert("You may only enter ALPHANUMERIC data.");
          if (!aValidCharacter) {
              // clear non-alphanumeric character
              inputField.value=''; 
              submitBtn.disabled = true; // cannot submit
              return false;
          } else {
              // remove last "non-alphanumeric" character from current entry
              let entry = inputField.value;
              inputField.value = entry.substring(0, entry.length-1); 
              if(aValidCharacter) {
                  // valid alphanumeric entry exists
                  submitBtn.disabled = false; // can submit
                  submitBtn.style.color = "white"; //  shows [Submit]
                  return true;
              }
          }
    }
}

function submitForm() {
  // Display confirmation message upon 
  // successful validation and submission (15%)
  // guarded because of possible backspacing by user
    if (inputField.value != "") {
        alert("Submitted Form Data: \ninputField=" + inputField.value + "\n(This simulated a valid data submission.)");
        // clean-up characters in the input box after submission
        submitBtn.disabled = true; 
        inputField.value = "";
        inputField.focus();
        aValidCharacter = false;
    } else {
        submitBtn.disabled = true; // cannot submit
        inputField = document.getElementById("inputField");
        inputField.checkValidity();
        inputField.setCustomValidity("Please enter a VALID alphanumeric value:");
    }
}

// RUBRIC: Link is clickable and opens in a new window. (15%)