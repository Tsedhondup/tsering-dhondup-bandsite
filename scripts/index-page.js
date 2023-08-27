// COMMENT ARRAY
let comments = [
  {
    name: "Connor Walton",
    timestamp: "02/17/2021",
    commentText: `This is art. 
    This is inexplicable magic expressed in the purest way, 
    everything that makes up this majestic work deserves reverence.
     Let us appreciate this for what it is and what it contains. `,
  },
  {
    name: "Emilie Beach",
    timestamp: "01/09/2021",
    commentText: `I feel blessed to have seen them in
    person. What a show! They were just
    perfection. If there was one day of my
    life I could relive, this would be it. What
    an incredible day.`,
  },
  {
    name: "Miles Acosta",
    timestamp: "12/20/2020",
    commentText: `This is art. 
    This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. 
    Let us appreciate this for what it is and what it contains. `,
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
    commentsContainerEl.classList.add("comments-content");

    // IMAGE-CONTAINTER
    let imgContainerEl = document.createElement("div");
    imgContainerEl.classList.add("comment-content__img-container");

    // IMAGE
    let imgEl = document.createElement("img");
    imgEl.classList.add("comment-content__img-container--img");
    imgContainerEl.appendChild(imgEl);

    commentsContainerEl.appendChild(imgContainerEl); // APPENDING IMAGE-CONTAINER INTO commentContainerEl

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
    commentTextEl.classList.add("comments-conten__text-container--comments");
    textContainerEl.appendChild(commentTextEl); // APPENDING TO textContainerEl

    commentsContainerEl.appendChild(textContainerEl); // APPENDING TEXT-CONTAINER INTO commentContainerEl

    // INVOKING displayComment FUNCTION
    displayComment(commentsContainerEl);
  });
};
//  INVOKES IMMEDIATELY AFTER PAGE LOADING IS FINISHED
createEl(comments);
