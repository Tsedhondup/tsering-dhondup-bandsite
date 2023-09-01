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
// DISPLAY COMMENTS - RENDERING INTO DOM
const displayComment = (element) => {
  let el = document.querySelector(".comments__comments-container");
  el.appendChild(element);
};

// CREATING DOM ELEMENTS
const createEl = (comments) => {
  comments.forEach((element) => {
    // COMMENT-CONTENT/CONTAINER
    let commentsContainerEl = document.createElement("div");
    commentsContainerEl.classList.add("comment-content");

    // IMAGE-CONTAINTER
    let imgContainerEl = document.createElement("div");
    imgContainerEl.classList.add("comment-content__img-container");

    // IMAGE
    let imgEl = document.createElement("div");
    imgEl.classList.add("comment-content__img-container--img-base");
    // imgContainerEl.appendChild(imgEl);

    // CHECKING IF USER HAS UPLOAED IMG
    if (element.profileImg) {
      // IF "TRUE" - ADD IMG
      imgEl.style.backgroundImage = element.profileImg;
      imgContainerEl.appendChild(imgEl);
      commentsContainerEl.appendChild(imgContainerEl); // APPENDING IMAGE-CONTAINER INTO commentContainerEl
    } else {
      imgContainerEl.appendChild(imgEl);
      commentsContainerEl.appendChild(imgContainerEl); // APPENDING IMAGE-CONTAINER INTO commentContainerEl
    }

    // TEXT-CONTAINER
    let textContainerEl = document.createElement("div");
    textContainerEl.classList.add("comment-content__text-container");

    // TEXT-CONTAINER PART-1 : NAME-TIME-CONTAINER
    let nameTimeContainerEl = document.createElement("div");
    nameTimeContainerEl.classList.add("name-time-container");
    textContainerEl.appendChild(nameTimeContainerEl); // APPENDING TO textContainerEl

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

    // TEXT-CONTAINER PART-2 : COMMENT
    let commentTextEl = document.createElement("p");
    commentTextEl.innerText = element.commentText;
    commentTextEl.classList.add("comment-content__text-container--comments");
    textContainerEl.appendChild(commentTextEl); // APPENDING TO textContainerEl

    commentsContainerEl.appendChild(textContainerEl); // APPENDING TEXT-CONTAINER INTO commentContainerEl
    // INVOKING displayComment FUNCTION
    displayComment(commentsContainerEl);
  });
};

// FUNCTION TO CHECK IF THE COMMENT-ARRAY HAS VALUE
let isCommentArrayEmpty = (comments) => {
  // CREAT-EL FUNCTION WILL ONLY GET INVOKED IF THE COMMENT-ARRAY HAS VALUE
  if (comments.length > 0) {
    createEl(comments);
  }
};

/** INVOKES IMMEDIATELY AFTER PAGE LOADING IS FINISHED **/
isCommentArrayEmpty(commentArray);

// CALLBACK FOR FOR FORM SUBMISSION ***
let onSubmit = (event) => {
  // STOPING FORM FROM SUBMITING
  event.preventDefault();

  // VARIABLES TO STORE NAME, COMMENTS & IMG
  let nameVal;
  let commentVal;
  let img;

  // GETTING NAME-INPUT
  let nameInput = document.querySelector("#name");
  nameVal = nameInput.value;

  // GETTING COMMENT-INPUT
  let commentInput = document.querySelector("#comment");
  commentVal = commentInput.value;

  // GETTING IMG
  let profileImgBase = document.querySelector(
    ".profile-image-container__img-base"
  );

  // GETTING IMG COMPUTED-STYLES
  let profileImgBaseStyles = getComputedStyle(profileImgBase);

  // STORING IMG-URL IN IMG VARIABLE
  img = profileImgBaseStyles.backgroundImage;

  // CREATING COMMENT-OBJECT
  let commentOBj = {
    name: nameVal,
    timestamp: new Date().toLocaleDateString(),
    commentText: commentVal,
    profileImg: img,
  };

  // PUSHING/ADDING TO THE BEGINING OF COMMENTS-ARRAY
  commentArray.unshift(commentOBj);

  // EMPTYING COMMENTS FOR NEW-INJECTION
  document.querySelector(".comments__comments-container").innerHTML = "";

  // INVOKING-CREATE-EL-FUNCTION
  createEl(commentArray);
};

// ADDING EVENT-LISTENER TO FORM-ELEMENT **
let formEl = document.querySelector(".comments__form");
formEl.addEventListener("submit", (event) => {
  // INVOKING ON SUBMIT
  onSubmit(event);
});
