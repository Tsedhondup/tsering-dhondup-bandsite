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

/*------------------------------------------------------------------------------------------*/

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
