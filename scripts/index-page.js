// API KEY
let myApiKey = () => {
  return "85204702-0307-4f2b-8c6f-98a3fd6d0b2e";
};

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

// ADDING EVENT-LISTENER TO DELETE BUTTONS
let addListenerToDeleteButtons = () => {
  let deleteBtns = document.querySelectorAll(
    ".like-delete-container__btns-wrapper--delete"
  );
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // stop bubbling-effect
      let eventTarget = event.target;
      let closestParent = eventTarget.closest(".comment-content");
      let closestParentId = closestParent.id;

      // SENDING DELETE REQUEST
      axios
        .delete(
          `https://project-1-api.herokuapp.com/comments/${closestParentId}?api_key=${myApiKey()}`
        )
        .then((response) => {
          let deleteCommentId = response.data.id;
          // GETTING COMMENT NODE-LIST
          document.querySelectorAll(".comment-content").forEach((comment) => {
            // IF CURRENT COMMENT-ID = DELELTED COMMEND-ID
            if (comment.id === deleteCommentId) {
              // REMOVED CURRENT COMMENT-ID
              comment.remove();
            }
          });
        });
    });
  });
};

// ADDING EVENT-LISTENER TO LIKE BUTTON
let addListenerToLikeButtons = () => {
  let likeBtns = document.querySelectorAll(
    ".like-delete-container__btns-wrapper--like"
  );
  let eventTarget; // to use on multiple scope or subsequent pomise methods
  likeBtns.forEach((likeBtn) => {
    likeBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // stop bubbling-effect
      // INCREMENT LIKE COUNT BY ONE EVERY 'CLICK'
      eventTarget = event.target;
      let closestParent = eventTarget.closest(".comment-content");
      let closestParentId = closestParent.id;

      // SENDING LIKE REQUEST
      axios
        .put(
          `https://project-1-api.herokuapp.com/comments/${closestParentId}/like?api_key=${myApiKey()}`
        )
        .then((response) => {
          // GET THE CLOSEST PARENT WITH MATCHED SELECTOR
          let closestParent = eventTarget.closest(".like-delete-container");
          // GET FIRST-CHILD OF CLOSEST PARENT = WHICH IS LIKE COUNT IN THIS CASE
          let firstChild = closestParent.firstElementChild;
          // UPDATE TEXT-CONTENT OF FIRST-CHILD
          firstChild.innerText = response.data.likes;
        });
    });
  });
};
/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

// RENDERING COMMENTS INTO DOM
const displayComment = () => {
  axios
    .get(`https://project-1-api.herokuapp.com/comments?api_key=${myApiKey()}`)
    .then((response) => {
      response.data.reverse().forEach((commentObj) => {
        /*--------------- CREATING ELEMENTS ---------------*/

        // COMMENT-CONTAINER
        let commentContainerEl = document.createElement("div"); // sing-comment-container
        commentContainerEl.setAttribute("id", `${commentObj.id}`);

        // IMAGE
        let imgContainerEl = document.createElement("div"); // image-container
        let imgBase = document.createElement("div"); // image-wrapper

        // TEXT & BUTTONS
        let textAndButtonContainerEl = document.createElement("div"); // text & button container

        // TEXT
        let nameTimeContainerEl = document.createElement("div"); // name & time-container
        let nameEl = document.createElement("h3"); // name
        let timeEl = document.createElement("time"); // timestamp
        let commentEl = document.createElement("p"); // comment

        // BUTTONS
        let likeDeleteContainerEl = document.createElement("div"); // like & delete-container
        let likeCount = document.createElement("p"); // like count
        let likeDeleteButtonsWrapper = document.createElement("div"); // like & delete button wrapper
        let likeEl = document.createElement("button"); // like-button
        let deleteEl = document.createElement("button"); // delete-button

        /*--------------- ADDING CLASSES ---------------*/

        // COMMENT-CONTAINER
        commentContainerEl.classList.add("comment-content");

        // IMAGE
        imgContainerEl.classList.add("comment-content__image-container");
        imgBase.classList.add("comment-content__image-container--img-base");

        // TEXT & BUTTONS
        textAndButtonContainerEl.classList.add(
          "comment-content__texts-and-buttons"
        );

        // TEXT
        nameTimeContainerEl.classList.add("name-time-container");
        nameEl.classList.add("name-time-container__name");
        timeEl.classList.add("name-time-container__time");
        commentEl.classList.add("comment-content__texts-and-buttons--comments");

        // BUTTONS
        likeDeleteContainerEl.classList.add("like-delete-container");
        likeCount.classList.add("like-delete-container__like-counts");
        likeDeleteButtonsWrapper.classList.add(
          "like-delete-container__btns-wrapper"
        );
        likeEl.classList.add("like-delete-container__btns-wrapper--like");
        deleteEl.classList.add("like-delete-container__btns-wrapper--delete");

        /*--------------- ADDING CONTENTS/VALUES ---------------*/

        nameEl.innerText = commentObj.name;
        timeEl.innerText = commentObj.timestamp;
        commentEl.innerText = commentObj.comment;

        likeCount.innerText = commentObj.likes;
        likeEl.innerText = "like";
        deleteEl.innerText = "delete";

        /* APPENDING TO PARENT RESPECTIVE PARENT CONTAINERS */

        // IMAGE-SOURCE IS CHECKED BEFORE ADDING IMG-EL
        imgContainerEl.appendChild(imgBase); // appendind to image-container

        nameTimeContainerEl.appendChild(nameEl); // appending to name-time-container
        nameTimeContainerEl.appendChild(timeEl); // appending to name-time-container

        likeDeleteContainerEl.appendChild(likeCount); // appending to like-delete-container
        likeDeleteContainerEl.appendChild(likeDeleteButtonsWrapper); // appending to like-delete-container
        likeDeleteButtonsWrapper.appendChild(likeEl); // appending to like-delete-wrapper
        likeDeleteButtonsWrapper.appendChild(deleteEl); // appending to like-delete-wrapper

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
    })
    .then(() => {
      addListenerToDeleteButtons(); // adding event-listener to delete-buttons after comments are loaded
      addListenerToLikeButtons(); // adding event-listener to like-buttons after comments are loaded
    });
};

displayComment();

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

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
  let nameVal; // name
  let commentVal; // comment
  let imgSrc; // image-source

  // STORING FORM VALUES
  let nameInput = document.querySelector("#name");
  nameVal = nameInput.value; // name-input value

  let commentInput = document.querySelector("#comment");
  commentVal = commentInput.value; // comment-input value

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
        /*--------------- CREATING ELEMENTS ---------------*/

        // COMMENT-CONTAINER
        let commentContainerEl = document.createElement("div"); // sing-comment-container
        commentContainerEl.setAttribute("id", `${response.data.id}`);

        // IMAGE
        let imgContainerEl = document.createElement("div"); // image-container
        let imgBase = document.createElement("div"); // image-wrapper

        // TEXT & BUTTONS
        let textAndButtonContainerEl = document.createElement("div"); // text & button container

        // TEXT
        let nameTimeContainerEl = document.createElement("div"); // name & time-container
        let nameEl = document.createElement("h3"); // name
        let timeEl = document.createElement("time"); // timestamp
        let commentEl = document.createElement("p"); // comment

        // BUTTONS
        let likeDeleteContainerEl = document.createElement("div"); // like & delete-container
        let likeCount = document.createElement("p"); // like count
        let likeDeleteButtonsWrapper = document.createElement("div"); // like & delete button wrapper
        let likeEl = document.createElement("button"); // like-button
        let deleteEl = document.createElement("button"); // delete-button

        /*--------------- ADDING CLASSES ---------------*/

        // COMMENT-CONTAINER
        commentContainerEl.classList.add("comment-content");

        // IMAGE
        imgContainerEl.classList.add("comment-content__image-container");
        imgBase.classList.add("comment-content__image-container--img-base");

        // TEXT & BUTTONS
        textAndButtonContainerEl.classList.add(
          "comment-content__texts-and-buttons"
        );

        // TEXT
        nameTimeContainerEl.classList.add("name-time-container");
        nameEl.classList.add("name-time-container__name");
        timeEl.classList.add("name-time-container__time");
        commentEl.classList.add("comment-content__texts-and-buttons--comments");

        // BUTTONS
        likeDeleteContainerEl.classList.add("like-delete-container");
        likeCount.classList.add("like-delete-container__like-counts");
        likeDeleteButtonsWrapper.classList.add(
          "like-delete-container__btns-wrapper"
        );
        likeEl.classList.add("like-delete-container__btns-wrapper--like");
        deleteEl.classList.add("like-delete-container__btns-wrapper--delete");

        /*--------------- ADDING CONTENTS/VALUES ---------------*/

        nameEl.innerText = response.data.name;
        timeEl.innerText = response.data.timestamp;
        commentEl.innerText = response.data.comment;

        likeCount.innerText = response.data.likes;
        likeEl.innerText = "like";
        deleteEl.innerText = "delete";

        /* APPENDING TO PARENT RESPECTIVE PARENT CONTAINERS */

        // IMAGE-SOURCE IS CHECKED BEFORE ADDING IMG-EL
        imgContainerEl.appendChild(imgBase); // appendind to image-container

        nameTimeContainerEl.appendChild(nameEl); // appending to name-time-container
        nameTimeContainerEl.appendChild(timeEl); // appending to name-time-container

        likeDeleteContainerEl.appendChild(likeCount); // appending to like-delete-container
        likeDeleteContainerEl.appendChild(likeDeleteButtonsWrapper); // appending to like-delete-container
        likeDeleteButtonsWrapper.appendChild(likeEl); // appending to like-delete-wrapper
        likeDeleteButtonsWrapper.appendChild(deleteEl); // appending to like-delete-wrapper

        textAndButtonContainerEl.appendChild(nameTimeContainerEl); // appending to text & button container
        textAndButtonContainerEl.appendChild(commentEl); // appending to text & button container
        textAndButtonContainerEl.appendChild(likeDeleteContainerEl); // appending to text & button container

        commentContainerEl.appendChild(imgContainerEl); // appending to comment-container - a single comment-element
        commentContainerEl.appendChild(textAndButtonContainerEl); // appending to comment-container - a single comment-element

        // RENDERING INTO DOM - COMMENT SECTION
        document
          .querySelector(".comments__comments-container")
          .prepend(commentContainerEl);
      })
      .then(() => {
        addListenerToDeleteButtons(); // adding event-listener to delete-buttons after comments are loaded
        addListenerToLikeButtons(); // adding event-listener to like-buttons after comments are loaded
      });
    // document.querySelector(".comments__comments-container").innerHTML = ""; // emptying comment-container <div> in bio-page
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
addingEventHandlerToFormEls();

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/
axios
  .get(`https://project-1-api.herokuapp.com/comments?api_key=${myApiKey()}`)
  .then((response) => {
    console.log(response.data);
  });

// ADDING EVENT HANDLER TO DELETE BUTTONS
