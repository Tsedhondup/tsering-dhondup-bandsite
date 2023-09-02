// COMMENT ARRAY
let commentArray = [
  {
    name: "Connor Walton",
    timestamp: "02/17/2021",
    commentText:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains. ",
    profileImg: "",
  },
  {
    name: "Emilie Beach",
    timestamp: "01/09/2021",
    commentText:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    profileImg: "",
  },
  {
    name: "Miles Acosta",
    timestamp: "12/20/2020",
    commentText:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    profileImg: "",
  },
];

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

// RENDERING COMMENTS INTO DOM
const displayComment = (commentEl) => {
  let commentContainer = document.querySelector(
    ".comments__comments-container"
  );
  commentContainer.appendChild(commentEl);
};

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

/*
# CREATING COMMENT ELEMENTS  
- EACH 'COMMENT ELEMENT' CREATED WILL BE ADDED AS A CHILD OF COMMENTS_COMMENTS-CONTAINER IN BIO-PAGE
- EACH 'COMMENT ELEMENT' HAS TWO SECTION 
  (1) IMAGE
  (2) TEXT = [NAME, DATE AND COMMENT INPUTS]
*/

// CREATING COMMENT ELEMENTS
const createEl = (comments) => {
  comments.forEach((element) => {
    // A COMMENT ELEMENT
    let commentsContainerEl = document.createElement("div");
    commentsContainerEl.classList.add("comment-content");

    /* SECTION - 1 : IMAGE-CONTAINTER */
    let imgContainerEl = document.createElement("div");
    imgContainerEl.classList.add("comment-content__img-container");

    // IMAGE-BASE
    let imgEl = document.createElement("div");
    imgEl.classList.add("comment-content__img-container--img-base");

    // CHECKING IF USER HAS UPLOAED IMG
    if (element.profileImg) {
      imgEl.style.backgroundImage = element.profileImg; // USE EXTERNAL CSS
      imgContainerEl.appendChild(imgEl);
      commentsContainerEl.appendChild(imgContainerEl); // APPENDING IMAGE-CONTAINER TO COMMENT-CONTAINER-El
    } else {
      imgContainerEl.appendChild(imgEl);
      commentsContainerEl.appendChild(imgContainerEl); // APPENDING IMAGE-CONTAINER TO COMMENT-CONTAINER-El
    }

    /* SECTION - 2 : TEXT-CONTAINER */
    let textContainerEl = document.createElement("div");
    textContainerEl.classList.add("comment-content__text-container");

    // TEXT-CONTAINER : PART-1 =  NAME & TIME-CONTAINER
    let nameTimeContainerEl = document.createElement("div");
    nameTimeContainerEl.classList.add("name-time-container");
    textContainerEl.appendChild(nameTimeContainerEl); // APPENDING TEXT-CONTAINER-El

    // NAME
    let nameEl = document.createElement("h3");
    nameEl.classList.add("name-time-container__name");
    nameEl.innerText = element.name;
    nameTimeContainerEl.appendChild(nameEl);

    // TIME
    let timeEl = document.createElement("time");
    timeEl.classList.add("name-time-container__time");
    timeEl.innerText = element.timestamp;
    nameTimeContainerEl.appendChild(timeEl);

    // TEXT-CONTAINER : PART-2 = COMMENTS
    let commentEl = document.createElement("p");
    commentEl.innerText = element.commentText;
    commentEl.classList.add("comment-content__text-container--comments");
    textContainerEl.appendChild(commentEl); // APPENDING TO TEXT-CONTAINER-El

    commentsContainerEl.appendChild(textContainerEl); // APPENDING TO COMMENT-CONTAINER-El

    /* INVOKING DISPLAY-COMMENT FUNCTION FOR EACH ITERATION */
    displayComment(commentsContainerEl);
  });
};

/* 
# FUNCTION TO CHECK IF THE COMMENT-ARRAY HAS VALUE. 
- IF ALL COMMENTS ARE DELETED AND COMMENT-ARRAY IS EMTPY 
 (1) CREATE-EL FUNCTION WILL NOT GET INVOKE
 (2) DISPLAY-COMMENT FUNCTION NOT GET INVOKE
*/

// CREATING IS-COMMENT-ARRAY-EMPTY FUNCTION
let isCommentArrayEmpty = (comments) => {
  if (comments.length > 0) {
    createEl(comments);
  }
};

/** INVOKES IMMEDIATELY AFTER PAGE LOADING IS FINISHED **/
isCommentArrayEmpty(commentArray);

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/
// EMPTYING FORM FIELD AND MESSAGES AFTER SUCCESSFUL FORM SUBMISION
let emptyForm = () => {
  document.querySelector(".input-elements__name-input").value = ""; // name-input
  document.querySelector(".input-elements__comments-input").value = ""; // comment-input
  document.querySelector(".input-elements__name-warning-msg").innerText = ""; // name-warning-msg
  document.querySelector(".input-elements__comment-warning-msg").innerText = ""; // comment-warning-msg
};

// VALIDATING FORM-INPUTS DURING INTERACTION
// let nameInputHanlder = () => {

// };
// VALIDATION FORM INPUTS BEFORE-SUBMISSION
// VALIDATE NAME-INPUT
let validateNameInput = () => {
  let nameWarningEl = document.querySelector(
    ".input-elements__name-warning-msg"
  );
  nameWarningEl.classList.add("input-elements__warning-msg-display"); // adding class
  nameWarningEl.innerText = "Invalid name!"; // inserting warning message
};

// VALIDATE COMMENT-INPUT
let validateCommentInput = () => {
  let commentWarningEl = document.querySelector(
    ".input-elements__comment-warning-msg"
  );
  commentWarningEl.classList.add("input-elements__warning-msg-display"); // adding class
  commentWarningEl.innerText = "Cannot submit empty comments!"; // inserting warning message
};

// VALIDATING FORM INPUTS ON-SUBMISSION
let validateFormOnSubmit = (nameInput, nameVal, commentInput, commentVal) => {
  if (!nameVal) {
    validateNameInput(); // invoke validate-name-input
  }

  if (!commentVal) {
    validateCommentInput(); // invoke validate-comment-input
  }
};

// CALLBACK FOR FOR FORM ON-SUBMISSION
let onSubmit = (event) => {
  event.preventDefault(); // stoping form from submitting

  // VARIABLES TO STORE NAME, COMMENTS & IMG
  let nameVal;
  let commentVal;
  let imgUrl;

  // STORING FORM VALUES
  let nameInput = document.querySelector("#name");
  nameVal = nameInput.value; // name-input value

  let commentInput = document.querySelector("#comment");
  commentVal = commentInput.value; // comment-input value

  let imgBase = document.querySelector(".profile-image-container__img-base");
  let profileImgBaseStyles = getComputedStyle(imgBase); // getting computed-styles for imgBase
  imgUrl = profileImgBaseStyles.backgroundImage; // img-url

  /*
  # FORM INPUTS VALUES WILL BE VALIDATE BEFORE BEFORE
   - CREATING FORM/COMMENTS OBJECT 
   - ADDING TO COMMENT-ARRAY
   - RENDER INTO DOM VIA DISPLAY-COMMENT FUNCTION
  */

  // VALIDATING FORM INPUTS VALUES
  if (nameVal && commentVal) {
    // CREATING COMMENT-OBJECT IF NAME & COMMENT INPUTS WERE TRUE
    let commentObj = {
      name: nameVal,
      timestamp: new Date().toLocaleDateString(),
      commentText: commentVal,
      profileImg: imgUrl,
    };

    commentArray.unshift(commentObj); // adding comment-object at the begining of comment-array
    document.querySelector(".comments__comments-container").innerHTML = ""; // emptying comment-container <div> in bio-page
    createEl(commentArray); // invoking create-el function

    // INVOKING-EMPTY-FORM FUNCTION TO CLEAR FORM
    emptyForm();
  } else {
    validateFormOnSubmit(nameInput, nameVal, commentInput, commentVal); // invoking validate-form-on-submit function
  }
};

// ADDING EVENT-LISTENER TO FORM-ELEMENT **
let addingEventHandlerToFormEls = () => {
  let form = document.querySelector(".comments__form");
  let nameInput = document.querySelector(".input-elements__name-input"); // name-input
  let commentInput = document.querySelector(".input-elements__comments-input"); // comment-input

  form.addEventListener("submit", (event) => {
    onSubmit(event); // invoking on-submit function
  });
  nameInput.addEventListener("input", () => {
    console.log("hey");
  });
  commentInput.addEventListener("input", () => {
    console.log("hey");
  });
};

/** INVOKES IMMEDIATELY AFTER PAGE LOADING IS FINISHED **/
addingEventHandlerToFormEls();
/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/
