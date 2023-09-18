// API KEY
let myApiKey = () => {
  return "bb098d40-0dd4-4d04-9669-63e9129c59e4";
};

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

// ADDING EVENT-LISTENER TO DELETE BUTTONS
let addListenerToDeleteButtons = () => {
  // GETTING DELETE BUTTON NODE LISTS FROM DOM
  let deleteBtns = document.querySelectorAll(
    ".like-delete-container__btns-wrapper--delete"
  );
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      // GETTING CLICKED BUTTON = TARGET ELEMENT
      let eventTarget = event.target;
      // GETTING CLOSEST PARENT WITH MATCHED SELECTOR (EXPECTED PARENT = SIGNLE COMMENT OBJECT/ELEMENT)
      let closestParent = eventTarget.closest(".comment-content");
      // GETTING CLOSEST PARENT-ID
      let closestParentId = closestParent.id;

      // SENDING DELETE REQUEST WITH THE 'CLOSEST PARTENT-ID'
      axios
        .delete(
          `https://project-1-api.herokuapp.com/comments/${closestParentId}?api_key=${myApiKey()}`
        )
        .then((response) => {
          // GETTING DELETED COMMENT-ID FROM RESPONSE-DATA
          let deleteCommentId = response.data.id;
          // GETTING AND LOOPING THROUGH COMMENT-OBJECT NODE LISTS
          document
            .querySelectorAll(".comment-content")
            .forEach((commentNode) => {
              // GETTING ID FROM CURRENT COMMENT-NODE
              let currentCommentNodeId = commentNode.id;
              // IF CURRENT COMMENT-NODE-ID = DELELTED COMMENT-ID
              if (currentCommentNodeId === deleteCommentId) {
                // REMOVED CURRENT COMMENT-NODE FROM DOM
                commentNode.remove();
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
  // EVENT-TARGET ***
  let eventTarget;

  likeBtns.forEach((likeBtn) => {
    likeBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // stop bubbling-effect
      // SETTING EVENT-TARGET
      eventTarget = event.target;
      /*
       GETTING CLOSEST PARENT OF TARGET-ELEMENT WITH MATCHED SELECTOR 
       EXPECTED PARENT = (SIGNLE COMMENT OBJECT/ELEMENT)
       */
      let closestParent = eventTarget.closest(".comment-content");
      // GETTING CLOSEST PARENT-ID
      let closestParentId = closestParent.id;

      // SENDING LIKE REQUEST WITHD THE 'CLOSEST PARENT-ID'
      axios
        .put(
          `https://project-1-api.herokuapp.com/comments/${closestParentId}/like?api_key=${myApiKey()}`
        )
        .then((response) => {
          /*
           GET THE CLOSEST PARENT WITH MATCHED SELECTOR 
           EXPECTED PARENT - (LIKE-DELETE-CONTAINER ELEMENT)
           */
          let closestParent = eventTarget.closest(".like-delete-container");
          // GET FIRST-CHILD OF CLOSEST PARENT = WHICH IS <p> TAG THAT DISPLAY LIKE COUNT
          let firstChild = closestParent.firstElementChild;
          // UPDATE TEXT-CONTENT/INNER-TEXT OF <P> TAG = LIKE COUNT CONTAINER
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
        timeEl.innerText = new Date(commentObj.timestamp).toLocaleDateString();
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

/** INVOKES IMMEDIATELY AFTER PAGE LOADING IS FINISHED **/
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

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

// CALLBACK FOR FOR FORM ON-SUBMISSION
let onSubmit = (event) => {
  event.preventDefault();
  let nameInput = document.querySelector("#name"); // name
  let commentInput = document.querySelector("#comment"); // comment

  let nameVal;
  let commentVal;

  nameVal = nameInput.value;
  commentVal = commentInput.value;

  // VALIDATING FORM INPUTS VALUES
  if (nameVal && commentVal) {
    let commentObj = {
      name: nameVal,
      comment: commentVal,
    };

    // FORM SUBMISSION/POSTING VIA AXIOS
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
        timeEl.innerText = new Date(
          response.data.timestamp
        ).toLocaleDateString();
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
    defaultForm(); // invoking defaul-form function set the form to default
  } else {
    validateFormOnSubmit(nameInput, nameVal, commentInput, commentVal);
  }
};

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

// ADDING EVENT-LISTENER TO FORM-ELEMENT **
let addingEventHandlerToFormEls = () => {
  let form = document.querySelector(".comments__form"); // form
  let nameInput = document.querySelector(".input-elements__name-input"); // name-input
  let commentInput = document.querySelector(".input-elements__comments-input"); // comment-input

  /* 
  #1 - FORM
  - ON-SUBMIT
  */
  form.addEventListener("submit", (event) => {
    onSubmit(event); // invoking on-submit function
  });

  /* 
  #2(A) NAME-INPUT
  - WHEN FIELD CHANGED
  */

  nameInput.addEventListener("input", (event) => {
    event.stopPropagation(); // stoping bubbling-effect
    validateNameInput(nameInput);
  });

  /* 
  #2(B) NAME-INPUT
  - WHEN USER LEAVE INPUT FIELD 
  */ nameInput.addEventListener("blur", (event) => {
    event.stopPropagation(); // stoping bubbling-effect
    validateNameInput(nameInput);
  });

  /* 
  #2(A) COMMENT-INPUT
  - WHEN FIELD CHANGED
  */
  commentInput.addEventListener("input", (event) => {
    event.stopPropagation(); // stoping bubbling-effect
    validateCommentInput(commentInput);
  });

  /* 
  #3(B) COMMENT-INPUT
  - WHEN USER LEAVE INPUT FIELD 
  */ commentInput.addEventListener("blur", (event) => {
    event.stopPropagation(); // stoping bubbling-effect
    validateCommentInput(commentInput);
  });
};

/** INVOKES IMMEDIATELY AFTER PAGE LOADING IS FINISHED **/
addingEventHandlerToFormEls();
