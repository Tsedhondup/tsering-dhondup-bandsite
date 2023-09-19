// API KEY
let myApiKey = () => {
  return "bb098d40-0dd4-4d04-9669-63e9129c59e4";
};

/*------------------------------------------------------------------------------------------*/
let formateDate = (dates) => {
  let newDate = new Date(dates);
  let showDay = newDate.getDay();
  let showMonth = newDate.getMonth();
  let showDate = newDate.getDate();
  let showYear = newDate.getFullYear();

  // DAYS
  let day;
  let month;
  let date;
  let finalDate;

  // GETTING WEEK-DAYS NAME
  switch (showDay) {
    case 0:
      day = "Sun";
      break;
    case 1:
      day = "Mon";
      break;
    case 2:
      day = "Tue";
      break;
    case 3:
      day = "Wed";
      break;
    case 4:
      day = "Thu";
      break;
    case 5:
      day = "Fri";
      break;
    case 6:
      day = "Sat";
      break;
  }

  // GETTING MONTHS NAME
  switch (showMonth) {
    case 0:
      month = "Jan";
      break;
    case 1:
      month = "Feb";
      break;
    case 2:
      month = "Mar";
      break;
    case 3:
      month = "Apr";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "Jun";
      break;
    case 6:
      month = "Jul";
      break;
    case 7:
      month = "Aug";
      break;
    case 8:
      month = "Sept";
      break;
    case 9:
      month = "Oct";
      break;
    case 10:
      month = "Nov";
      break;
    case 11:
      month = "Dec";
      break;
  }

  // DATES - ADDING ZERO AT THE BEGINNING OF DATE IF IT IS SINGLE NUMBER e.g '01, 02, 06'
  showDate.toString().length > 1 ? (date = showDate) : (date = `0${showDate}`);

  // DATE-OBTAINED
  finalDate = `${day} ${month} ${date} ${showYear}`;
  return finalDate;
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
# CREATING SHOW-DATE ELEMENTS
*** THREE FUNCTION ARE BEING USED FOR CREATING CONCERT-TABLE ELEMENTS ***

(1) CREATES SHOW-DATE TITLE ELEMENT
(2) CREATES SHOW-DATE HEADER ELEMENTS TO PLACE ON TOP OF TABLE
(3) CREATES SHOW-DATE HEADER ELEMENTS TO PLACE WITHIN THE TABLE ALSO CALLED : INLINE HEADERS
(4) SHOW-DATES FUNCTION 
   (a) GETS SHOW-DATES FROM SERVER 
   (b) INVOKES OTHER FUNCTIONS AND RENDER SHOW ELEMENTS INTO DOM 
*/

// (1) - CREATING SHOW-DATE TITLE ELMENTS
let createShowTitleElements = () => {
  let showsTitleEl = document.createElement("h1");
  showsTitleEl.classList.add("shows__title-container--title");
  showsTitleEl.innerText = "Shows";
  // RETURNING-SHOWS-TITLE-EL
  return showsTitleEl;
};

/*------------------------------------------------------------------------------------------*/

// (2) - CREATING SHOW-DATE HEADER ELEMENTS TO USE ON TOP OF THE SHOW-DATE TABLE
let createShowHeaderElements = () => {
  // HEADERS-CONTAINER
  let headerEl = document.createElement("div");
  headerEl.classList.add("shows-table-headers-container");

  /*** 
   - EACH HEADER HAS A UNIQUE CLASS-NAME 
   - REASON : TO APPLY DIFFERENT FLEX PROPORTIONS ON SCREEN MIN-WIDTH:768PX = [ ] USING CSS/SASS *
   ***/
  // DATE
  let headerDateEl = document.createElement("h3");
  headerDateEl.classList.add("shows-table-headers-container__header"); // adding common-class
  headerDateEl.classList.add("shows-table-headers-container__header-date"); // adding unique class
  headerDateEl.innerText = "Date";
  headerEl.appendChild(headerDateEl); // appending to shows-header-container

  // VENUE
  let headerVenueEl = document.createElement("h3");
  headerVenueEl.classList.add("shows-table-headers-container__header"); // adding common-class
  headerVenueEl.classList.add("shows-table-headers-container__header-venue"); // adding unique class
  headerVenueEl.innerText = "Venue";
  headerEl.appendChild(headerVenueEl); // appending to shows-header-container

  // LOCATION
  let headerLocationEl = document.createElement("h3");
  headerLocationEl.classList.add("shows-table-headers-container__header"); // adding common-class
  headerLocationEl.classList.add(
    "shows-table-headers-container__header-location"
  ); // adding unique class
  headerLocationEl.innerText = "Location";
  headerEl.appendChild(headerLocationEl); // appending to shows-header-container

  // RETURNS SHOW HEADER-EL
  return headerEl;
};

/*------------------------------------------------------------------------------------------*/

// CREATING SHOWS-DATE HEADER ELEMENTS TO USE WITHIN THE SHOW-DATE TABLE - INLINE-HEADERS
let createInlineShowHeadersElements = () => {
  // ARRAYS TO STORE INLINE-SHOWS-TABLE HEADERS
  let inlineShowHeaders = [];

  // DATE
  let headerDateEl = document.createElement("h3");
  headerDateEl.classList.add(
    "shows-table-data-container__content--inline-header"
  );
  headerDateEl.innerText = "Date";
  inlineShowHeaders.push(headerDateEl); // adding into inlineShowsHeaderArray

  // VENUE
  let headerVenueEl = document.createElement("h3");
  headerVenueEl.classList.add(
    "shows-table-data-container__content--inline-header"
  );
  headerVenueEl.innerText = "Venue";
  inlineShowHeaders.push(headerVenueEl); // adding into inlineShowsHeaderArray

  // LOCATION
  let headerLocationEl = document.createElement("h3");
  headerLocationEl.classList.add(
    "shows-table-data-container__content--inline-header"
  );
  headerLocationEl.innerText = "Location";
  inlineShowHeaders.push(headerLocationEl); // adding into inlineShowsHeaderArray

  // RETURNING INLINE-SHOWS-HEADERS IN A FORM OF ARRAY = []
  return inlineShowHeaders;
};

/*------------------------------------------------------------------------------------------*/

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
