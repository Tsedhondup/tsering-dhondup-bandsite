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

/* VALIDATING FORM INPUTS ON-SUBMISSION */
let validateFormOnSubmit = (nameInput, commentInput) => {
  console.log("your comment is empty");
};

/* CALLBACK FOR FOR FORM ON-SUBMISSION */
let onSubmit = (event) => {
  // STOPING FORM FROM SUBMITING
  event.preventDefault();

  // VARIABLES TO STORE NAME, COMMENTS & IMG
  let nameVal;
  let commentVal;
  let img;

  /* STORING FORM VALUES  */
  // NAME-INPUT
  let nameInput = document.querySelector("#name");
  nameVal = nameInput.value;

  // COMMENT-INPUT
  let commentInput = document.querySelector("#comment");
  commentVal = commentInput.value;

  // IMG
  let profileImgBase = document.querySelector(
    ".profile-image-container__img-base"
  );

  // GETTING IMG COMPUTED-STYLES
  let profileImgBaseStyles = getComputedStyle(profileImgBase);
  // STORING IMG-URL IN IMG VARIABLE
  imgUrl = profileImgBaseStyles.backgroundImage;

  /*
  # INVOKING VALIDATE-FORM-INPUT-ON-SUBMIT
  - CREATING OF COMMENT OBJ AND PUSHING INTO COMMENT ARRAY WILL STOP 
  - UNLESS THE VALID INPUTS ARE INSERT
  */

  if (nameVal && commentVal) {
    // CREATING COMMENT-OBJECT
    let commentObj = {
      name: nameVal,
      timestamp: new Date().toLocaleDateString(),
      commentText: commentVal,
      profileImg: imgUrl,
    };
    // PUSHING/ADDING TO THE BEGINING OF COMMENTS-ARRAY
    commentArray.unshift(commentObj);

    // EMPTYING COMMENTS FOR DOM NEW-INJECTION
    document.querySelector(".comments__comments-container").innerHTML = "";

    // INVOKING-CREATE-EL FUNCTION
    createEl(commentArray);
  } else {
    // INVOKING VALIDATE-FORM-ON-SUBMIT
    validateFormOnSubmit(nameInput, commentInput);
  }
};

// ADDING EVENT-LISTENER TO FORM-ELEMENT **
let formEl = document.querySelector(".comments__form");
formEl.addEventListener("submit", (event) => {
  // INVOKING ON SUBMIT
  onSubmit(event);
});

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/
