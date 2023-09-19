// VALIDATION FORM INPUTS DURING INTERACTION & BEFORE-SUBMISSION
// VALIDATE NAME-INPUT
let validateNameInput = (nameInput) => {
  if (!nameInput.value) {
    let nameWarningEl = document.querySelector(
      ".input-elements__name-warning-msg"
    );
    nameWarningEl.classList.add("input-elements__warning-msg-display"); // adding warning-msg-display class
    nameWarningEl.innerText = "Name required! (e.g - Tsering Dhondup)"; // inserting warning message
    nameInput.classList.add("input-elements__pink-border"); // adding pink-border class
  } else {
    nameInput.classList.remove("input-elements__pink-border"); // removing pink-border class
    document.querySelector(".input-elements__name-warning-msg").innerText = ""; // removing warning-msg
  }
};

/*------------------------------------------------------------------------------------------*/

// VALIDATE COMMENT-INPUT
let validateCommentInput = (commentInput) => {
  if (!commentInput.value) {
    let commentWarningEl = document.querySelector(
      ".input-elements__comment-warning-msg"
    );
    commentWarningEl.classList.add("input-elements__warning-msg-display"); // adding warning-msg-display class
    commentWarningEl.innerText = "Cannot submit empty comments!"; // inserting warning message
    commentInput.classList.add("input-elements__pink-border"); // adding pink-border class
  } else {
    document.querySelector(".input-elements__comment-warning-msg").innerText =
      ""; // removing warning-msg
    commentInput.classList.remove("input-elements__pink-border"); // removing pink-border class
  }
};

/*------------------------------------------------------------------------------------------*/

// VALIDATING FORM INPUTS ON-SUBMISSION - VALIDATION ONLY DONE WHEN INPUTS FIELDS ARE EMPTY!
let validateFormOnSubmit = (nameInput, nameVal, commentInput, commentVal) => {
  // NAME-INPUT
  if (!nameVal) {
    let nameWarningEl = document.querySelector(
      ".input-elements__name-warning-msg"
    );
    nameWarningEl.classList.add("input-elements__warning-msg-display"); // adding warning-msg-display class
    nameWarningEl.innerText = "Name required! (e.g - Tsering Dhondup)"; // inserting warning message

    // ADDING PINK-BORDER CLASS
    nameInput.classList.add("input-elements__pink-border");
  }

  // COMMENT-INPUT
  if (!commentVal) {
    let commentWarningEl = document.querySelector(
      ".input-elements__comment-warning-msg"
    );
    commentWarningEl.classList.add("input-elements__warning-msg-display"); // adding warning-msg-display class
    commentWarningEl.innerText = "Cannot submit empty comments!"; // inserting warning message

    // ADDING PINK-BORDER CLASS
    commentInput.classList.add("input-elements__pink-border");
  }
};
