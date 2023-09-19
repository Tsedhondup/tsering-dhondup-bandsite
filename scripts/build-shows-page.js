// API KEY
let myApiKey = () => {
  return "bb098d40-0dd4-4d04-9669-63e9129c59e4";
};

/*------------------------------------------------------------------------------------------*/

// (1) ADDING AND REMOVING CLASSES
let togglingConcertTableRowClasses = (tableRowList, closestParent) => {
  // REMOVING JS_TABLE-ROW-SELECTED CLASS FROM TABLE-ROW LIST
  tableRowList.forEach((element) => {
    element.classList.remove("shows-table-data-container__content-selected");
  });
  // ADDING JS_TABLE-ROW-SELECTED CLASS TO CLOSEST-PARENT OF TARGET ELEMENT
  closestParent.classList.add("shows-table-data-container__content-selected");
};

/*------------------------------------------------------------------------------------------*/

/* 
*** FOUR FUNCTIONS ARE BEING USED FOR CREATING SHOW-DATES ELEMENTS ***

(1) CREATES SHOW-DATE 'TITLE ELEMENT' => FROM 'CREATE-ELEMENTS.JS'
(2) CREATES SHOW-DATE 'HEADER ELEMENTS' TO PLACE ON TOP OF TABLE => FROM 'CREATE-ELEMENTS.JS'
(3) CREATES SHOW-DATE 'INLINE HEADERS' => FROM 'CREATE-ELEMENTS.JS'
(4) SHOW-DATES FUNCTION 
   (a) GETS SHOW-DATES FROM SERVER 
   (b) INVOKES OTHER FUNCTIONS AND RENDER SHOW ELEMENTS INTO DOM 
*/

// GETTING SHOW-DATES AND REDERING INTO DOM

let getShowDates = () => {
  // SHOW-DATE-CONTAINER - INDIVIDUAL SHOWS-TABLE ROWS ARE BEING WRAPPEND AS CHILDREN IN SINGLE CONTAINER
  let tableDateContainerEl = document.createElement("div");
  tableDateContainerEl.classList.add("shows-table-data-container");
  axios
    .get(`https://project-1-api.herokuapp.com/showdates?api_key=${myApiKey()}`)
    .then((response) => {
      response.data.forEach((element) => {
        // SINGLE SHOWS-DATE ROW
        let tableDateContentEl = document.createElement("div");
        tableDateContentEl.classList.add("shows-table-data-container__content");
        tableDateContainerEl.appendChild(tableDateContentEl); // appending to shows-date-container

        // INLINE-HEADER - DATE
        tableDateContentEl.appendChild(createInlineShowHeadersElements()[0]); // appending inline-shows-table-header

        // DATE
        let dateEl = document.createElement("p");
        dateEl.classList.add("shows-table-data-container__content--date");
        dateEl.innerText = formateDate(element.date); // invoking format-date function ***
        tableDateContentEl.appendChild(dateEl); // appending to shows-table-data-content

        // INLINE-HEADER - VENUE
        tableDateContentEl.appendChild(createInlineShowHeadersElements()[1]); // appending inline-shows-table-header

        // VENUE
        let venueEl = document.createElement("p");
        venueEl.classList.add("shows-table-data-container__content--venue");
        venueEl.innerText = element.place; // adding place
        tableDateContentEl.appendChild(venueEl); //  appending to shows-table-data-content

        // INLINE-HEADER - LOCATION
        tableDateContentEl.appendChild(createInlineShowHeadersElements()[2]); // appending inline-shows-table-header

        // LOCATION
        let locationEl = document.createElement("p");
        locationEl.classList.add(
          "shows-table-data-container__content--location"
        );
        locationEl.innerText = element.location; // adding location
        tableDateContentEl.appendChild(locationEl); //  appending to shows-table-date-content

        // BUY-BUTTON-CONTAINER
        let buttonContainerEl = document.createElement("div");
        buttonContainerEl.classList.add("shows-table-data-button-container");
        tableDateContentEl.appendChild(buttonContainerEl); // appending to shows-table-date-content

        // BUY-BUTTON
        let buttonEl = document.createElement("button");
        buttonEl.classList.add("shows-table-data-button-container__btn");
        buttonEl.innerText = "Buy Ticket"; // adding value
        buttonContainerEl.appendChild(buttonEl); // appending to button-container
      });
    })
    .then(() => {
      /*** RENDERING SHOW-DATES INTO DOM ***/

      let titleContainer = document.querySelector(".shows__title-container"); // show-title-container
      let showsDateContainer = document.querySelector(".shows__date-container"); // show-date-container

      titleContainer.appendChild(createShowTitleElements()); // appending show-title
      showsDateContainer.appendChild(createShowHeaderElements()); // appending shows-headers
      showsDateContainer.appendChild(tableDateContainerEl); // appending shows-dates
    })
    .then(() => {
      /*** ADDING-EVENT LISTENER TO SHOW-DATE ROW ***/

      // GETTING CONCERT TABLE-ROW NODE-LIST
      let concertTableRow = document.querySelectorAll(
        ".shows-table-data-container__content"
      );
      // ADDING EVENT-HANDLER TO CONCERT TABLE-RAW NODE-LIST
      concertTableRow.forEach((element) => {
        element.addEventListener("click", (event) => {
          // STOPPING BUBBLING-EFFECT
          event.stopPropagation();
          // GETTING EVENT-TARGET
          let eTarget = event.target;
          // GETTING CLOSEST-PARENT WITH MATCHING 'SELECTOR'
          let closetParent = eTarget.closest(
            ".shows-table-data-container__content"
          );

          // INVOKING TOGGLING-CONCERT-TABLE-ROW-CLASSES FUNCTION
          togglingConcertTableRowClasses(concertTableRow, closetParent);
        });
      });
    });
};

/** INVOKES IMMEDIATELY AFTER PAGE LOADING IS FINISHED **/
getShowDates();
