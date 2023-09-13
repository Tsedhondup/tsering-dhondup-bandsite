// API KEY
let myApiKey = () => {
  return "85d3d688-1b7d-4f06-8841-3230dac7e82a";
};

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

// RENDERING COMMENTS INTO DOM
const displayComment = () => {
  axios
    .get(`https://project-1-api.herokuapp.com/comments?api_key=${myApiKey()}`)
    .then((response) => {
      response.data.forEach((commentObject) => {
        // CREATING ELEMENTS
        let commentContainerEl = document.createElement("div"); // sing-comment-container
        let imgContainerEl = document.createElement("div"); // image-container
        let imgEl = document.createElement("div"); // image
        let textAndButtonContainerEl = document.createElement("div"); // text & button container
        let nameTimeContainerEl = document.createElement("div"); // name & time-container
        let nameEl = document.createElement("h3"); // name
        let timeEl = document.createElement("time"); // timestamp
        let commentEl = document.createElement("p"); // comment
        let likeDeleteContainerEl = document.createElement("div"); // like & delete-container
        let likeEl = document.createElement("button"); // like-button
        let deleteEl = document.createElement("button"); // delete-button

        // ADDING CLASSES
        commentContainerEl.classList.add("comment-content");
        imgContainerEl.classList.add("comment-content__img-container");
        imgEl.classList.add("comment-content__img-container--img-base");
        textAndButtonContainerEl.classList.add(
          "comment-content__texts-and-buttons"
        );
        nameTimeContainerEl.classList.add("name-time-container");
        nameEl.classList.add("name-time-container__name");
        timeEl.classList.add("name-time-container__time");
        commentEl.classList.add("comment-content__texts-and-buttons--comments");
        likeDeleteContainerEl.classList.add("like-delete-container");
        likeEl.classList.add("like-delete-container__like");
        deleteEl.classList.add("like-delete-container__delete");

        // ADDING CONTENT/VALUE
        nameEl.innerText = commentObject.name;
        timeEl.innerText = commentObject.timestamp;
        commentEl.innerText = commentObject.comment;
        likeEl.innerText = commentObject.likes;
        deleteEl.innerText = "delete";

        // APPENDING TO PARENT-CONTAINER
        imgContainerEl.appendChild(imgEl); // appendind to image-container

        nameTimeContainerEl.appendChild(nameEl); // appending to name-time-container
        nameTimeContainerEl.appendChild(timeEl); // appending to name-time-container

        likeDeleteContainerEl.appendChild(likeEl); // appending to like-delete-container
        likeDeleteContainerEl.appendChild(deleteEl); // appending to like-delete-container

        textAndButtonContainerEl.appendChild(nameTimeContainerEl); // appending to text & button container
        textAndButtonContainerEl.appendChild(commentEl); // appending to text & button container
        textAndButtonContainerEl.appendChild(likeDeleteContainerEl); // appending to text & button container

        commentContainerEl.appendChild(imgContainerEl); // appending to comment-container - a single comment-element
        commentContainerEl.appendChild(textAndButtonContainerEl); // appending to comment-container - a single comment-element

        // RENDERING INTO DOM - COMMENT SECTION
        document
          .querySelector(".comments__comments-container")
          .appendChild(commentContainerEl);
      });
    });
};

displayComment();
/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

// ACTUAL TIME FROM MOMENT COMMENT IS BEING ADDED
let tractCommentMoment = () => {
  let currentMoment = 0; // in seconds
  let minute; // minute
  let moments; // actual moment

  // SET-INTERVAL
  setInterval(() => {
    currentMoment = currentMoment + 1;
  }, 1000);
  if (currentMoment < 60000) {
    moments = currentMoment + "s ago";
    return moments; // as seconds
  }
  if (currentMoment > 60000 && currentMoment < 3600000) {
    minute = currentMoment / 60; // converting to minutes
    if (minute < 1) {
      moments = minute + " ago";
      return moments; // as a minute
    }
    if (minute > 1) {
      moments = minute + "s ago";
      moments; // as  minutes
    }
  }
};

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

// EMPTYING FORM FIELD AND MESSAGES AFTER SUCCESSFUL FORM SUBMISION
let defaultForm = () => {
  let nameInput = document.querySelector(".input-elements__name-input"); // name-input
  nameInput.value = ""; // empting field
  nameInput.classList.remove("input-elements__pink-border"); // removing pink-border class

  let commentInput = document.querySelector(".input-elements__comments-input"); // comment-input
  commentInput.value = ""; // empting field
  commentInput.classList.remove("input-elements__pink-border"); // removing pink-border class

  document.querySelector(".input-elements__name-warning-msg").innerText = ""; // name-warning-msg
  document.querySelector(".input-elements__comment-warning-msg").innerText = ""; // comment-warning-msg
};

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

// VALIDATION FORM INPUTS DURING INTERACTION & BEFORE-SUBMISSION

// VALIDATE NAME-INPUT
let validateNameInput = (nameInput) => {
  let nameWarningEl = document.querySelector(
    ".input-elements__name-warning-msg"
  );
  nameWarningEl.classList.add("input-elements__warning-msg-display"); // adding warning-msg-display class
  nameWarningEl.innerText = "Name required! (e.g - Tsering Dhondup)"; // inserting warning message

  // ADDING PINK-BORDER CLASS
  nameInput.classList.add("input-elements__pink-border");
};

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

// VALIDATE COMMENT-INPUT
let validateCommentInput = (commentInput) => {
  let commentWarningEl = document.querySelector(
    ".input-elements__comment-warning-msg"
  );
  commentWarningEl.classList.add("input-elements__warning-msg-display"); // adding warning-msg-display class
  commentWarningEl.innerText = "Cannot submit empty comments!"; // inserting warning message

  // ADDING PINK-BORDER CLASS
  commentInput.classList.add("input-elements__pink-border");
};

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

// VALIDATING FORM INPUTS ON-SUBMISSION - VALIDATION ONLY DONE WHEN INPUTS FIELDS ARE EMPTY!
let validateFormOnSubmit = (nameInput, nameVal, commentInput, commentVal) => {
  if (!nameVal) {
    validateNameInput(nameInput); // invoke validate-name-input only
  }

  if (!commentVal) {
    validateCommentInput(commentInput); // invoke validate-comment-input
  }
};

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

// CALLBACK FOR FOR FORM ON-SUBMISSION
let onSubmit = (event) => {
  event.preventDefault(); // stoping form from submitting

  // VARIABLES TO STORE NAME, COMMENTS & IMG
  let nameVal;
  let commentVal;

  // STORING FORM VALUES
  let nameInput = document.querySelector("#name");
  nameVal = nameInput.value; // name-input value

  let commentInput = document.querySelector("#comment");
  commentVal = commentInput.value; // comment-input value

  let imgBase = document.querySelector(".profile-image-container__img-base");

  // VALIDATING FORM INPUTS VALUES
  if (nameVal && commentVal) {
    // CREATING COMMENT-OBJECT IF NAME & COMMENT INPUTS WERE TRUE
    let commentObj = {
      name: nameVal,
      comment: commentVal,
    };

    // POSTING ON-TO SERVER
    axios
      .post(
        `https://project-1-api.herokuapp.com/comments?api_key=${myApiKey()}`,
        commentObj
      )
      .then((response) => {
        displayComment();
      });
    document.querySelector(".comments__comments-container").innerHTML = ""; // emptying comment-container <div> in bio-page
    defaultForm(); // invoking defaul-form function set the form to default
  } else {
    validateFormOnSubmit(nameInput, nameVal, commentInput, commentVal); // invoking validate-form-on-submit function
  }
};

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

// ADDING EVENT-LISTENER TO FORM-ELEMENT **
let addingEventHandlerToFormEls = () => {
  let form = document.querySelector(".comments__form"); // form
  let nameInput = document.querySelector(".input-elements__name-input"); // name-input
  let commentInput = document.querySelector(".input-elements__comments-input"); // comment-input

  // #1 - FORM
  // ON-SUBMIT
  form.addEventListener("submit", (event) => {
    onSubmit(event); // invoking on-submit function
  });

  /*--------------------------------------------*/

  // #2 NAME-INPUT
  // WHEN INPUT FIELD CHANGED
  nameInput.addEventListener("input", (event) => {
    event.stopPropagation(); // stoping bubbling-effect
    if (!nameInput.value) {
      validateNameInput(nameInput); // invoking validate-name-input
    } else {
      nameInput.classList.remove("input-elements__pink-border"); // removing pink-border class
      document.querySelector(".input-elements__name-warning-msg").innerText =
        ""; // removing warning-msg
    }
  });

  // WHEN USER LEAVE-INPUT FIELD
  nameInput.addEventListener("blur", (event) => {
    event.stopPropagation(); // stoping bubbling-effect
    if (!nameInput.value) {
      validateNameInput(nameInput); // invoking validate-name-input
    } else {
      nameInput.classList.remove("input-elements__pink-border"); // removing pink-border class
      document.querySelector(".input-elements__name-warning-msg").innerText =
        ""; // removing warning-msg
    }
  });

  /*--------------------------------------------*/

  // #3 COMMENT-INPUT
  // WHEN INPUT FIELD CHANGED
  commentInput.addEventListener("input", (event) => {
    event.stopPropagation(); // stoping bubbling-effect
    if (!commentInput.value) {
      validateCommentInput(commentInput); // invoking validate-comment-input
    } else {
      commentInput.classList.remove("input-elements__pink-border"); // removing pink-border class
      document.querySelector(".input-elements__comment-warning-msg").innerText =
        ""; // removing warning-msg
    }
  });

  // WHEN USER LEAVE INPUT FIELD
  commentInput.addEventListener("blur", (event) => {
    event.stopPropagation(); // stoping bubbling-effect
    if (!commentInput.value) {
      validateCommentInput(commentInput); // invoking validate-comment-input
    } else {
      commentInput.classList.remove("input-elements__pink-border"); // removing pink-border class
      document.querySelector(".input-elements__comment-warning-msg").innerText =
        ""; // removing warning-msg
    }
  });
};

/** INVOKES IMMEDIATELY AFTER PAGE LOADING IS FINISHED **/
// isCommentArrayEmpty(commentArray);
/** INVOKES IMMEDIATELY AFTER PAGE LOADING IS FINISHED **/
addingEventHandlerToFormEls();

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/
axios
  .get(
    `https://project-1-api.herokuapp.com/comments?api_key=85d3d688-1b7d-4f06-8841-3230dac7e82a`
  )
  .then((response) => {
    console.log(response.data[0]);
  });
