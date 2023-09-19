// API KEY
let myApiKey = () => {
  return "bb098d40-0dd4-4d04-9669-63e9129c59e4";
};

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
