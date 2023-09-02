// SHOWS-INFO ARRAY
let showsDatas = [
  {
    date: "Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tue Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Oct 15 2021",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 06 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 15 2021",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

/*------------------------------------------------------------------------------------------*/

// SHOW-TABLE RENDERING-FUNCTION

let renderDOM = (showTitleEl, showTableHeaderEl, showTableDataEl) => {
  let showsContainer = document.querySelector(".shows");
  showsContainer.appendChild(showTitleEl);
  showsContainer.appendChild(showTableHeaderEl);
  showsContainer.appendChild(showTableDataEl);
};

/*------------------------------------------------------------------------------------------*/

/* 
  # FUNCTIONS FOR CREATING CONCERT-TABLE ELEMENTS 
  # EACH FUNCTION RETURNS ELEMENT AND THEY ARE STORE IN SEPARATE VARIABLES
*/

// CREATING SHOW TITLE ELMENTS
let createShowTitleElements = () => {
  let showsTitleEl = document.createElement("h1");
  showsTitleEl.classList.add("shows__title");
  showsTitleEl.innerText = "Shows";

  // RETURNING-SHOW-TITLE-EL
  return showsTitleEl;
};

// CREATING SHOW HEADER ELEMENTS
let createShowHeaderElements = () => {
  // HEADERS-CONTAINER
  let headerEl = document.createElement("div");
  headerEl.classList.add("shows-table-headers-container");

  // SHOWS-TABLE-HEADER__NAME - DATE
  let headerDateEl = document.createElement("h3");
  headerDateEl.classList.add("shows-table-headers-container__name");
  headerDateEl.innerText = "Date";
  headerEl.appendChild(headerDateEl); // APPENDING TO SHOW-HEADERS

  // SHOWS-TABLE-HEADER__NAME - VENUE
  let headerVenueEl = document.createElement("h3");
  headerVenueEl.classList.add("shows-table-headers-container__name");
  headerVenueEl.innerText = "Venue";
  headerEl.appendChild(headerVenueEl); // APPENDING TO SHOW-HEADERS

  // SHOWS-TABLE-HEADER__NAME - LOCATION
  let headerLocationEl = document.createElement("h3");
  headerLocationEl.classList.add("shows-table-headers-container__name");
  headerLocationEl.innerText = "Location";
  headerEl.appendChild(headerLocationEl); // APPENDING TO SHOW-HEADERS

  // RETURNS SHOW HEADER-EL
  return headerEl;
};

// CREATING SHOW DATA ELEMENTS
let createShowDataElements = (datas) => {
  // TABLE-DATA-CONTAINER - SHOW TABLE-ROWS ARE BEING WRAPPEND IN SINGLE CONTAINER
  let tableDataContainerEl = document.createElement("div");
  tableDataContainerEl.classList.add("shows-table-data-container");

  datas.forEach((element) => {
    // SHOW-TABLE-DATA-CONTENT 'CONTAINER FOR INDIVIDUAL SHOWS ITEM'
    let tableDataContentEl = document.createElement("div");
    tableDataContentEl.classList.add("shows-table-data-container__content");
    tableDataContainerEl.appendChild(tableDataContentEl); // APPENDING TO SHOW-TABLE-DATA-CONTAINER

    // SHOWS-TABLE-DATAS__DATE
    let dateEl = document.createElement("p");
    dateEl.classList.add("shows-table-data__content--name");
    dateEl.innerText = element.date;
    tableDataContentEl.appendChild(dateEl); // APPENDING TO SHOW-TABLE-DATA-CONTENT

    // SHOWS-TABLE-DATAS__VENUE
    let venueEl = document.createElement("p");
    venueEl.classList.add("shows-table-data__content--venue");
    venueEl.innerText = element.venue;
    tableDataContentEl.appendChild(venueEl); // APPENDING TO SHOW-TABLE-DATA-CONTENT

    // SHOWS-TABLE-DATAS__LOCATION
    let locationEl = document.createElement("p");
    locationEl.classList.add("shows-table-data__content--location");
    locationEl.innerText = element.location;
    tableDataContentEl.appendChild(locationEl); // APPENDING TO SHOW-TABLE-DATA-CONTENT

    // SHOWS-TABLE-DATAS__BUTTON
    let buttonEl = document.createElement("button");
    locationEl.classList.add("shows-table-data__content--btn");
    buttonEl.innerText = "Buy Ticket";
    tableDataContentEl.appendChild(buttonEl); // APPENDING TO SHOW-TABLE-DATA-CONTENT
  });

  // RETURN TABLE-DATA-CONTAINER-EL
  return tableDataContainerEl;
};

/** INVOKES IMMEDIATELY AFTER PAGE LOADING IS FINISHED **/
renderDOM(
  createShowTitleElements(),
  createShowHeaderElements(),
  createShowDataElements(showsDatas)
);

/*------------------------------------------------------------------------------------------*/

/*
# ADDING EVENT-LISTENER TO INDIVIDUAL CONCERT TABLE-ROW
- INSTRUCTIONS ARE BEING PLACED INTO THREE SEPARATED FUNCTIONS
- (1) ADDING AND REMOVING CLASS NAME FROM SELECTED CONCERT TABLE-ROW
- (2) ADDING EVENT-LISTENER
- (3) CHECKING THE PRESENCE OF CONCERT TABLE-ROW
*/

// ADDING AND REMOVING CLASSES
let togglingConcertTableRowClasses = (tableRowList) => {
  // REMOVED JS_TABLE-ROW-SELECTED CLASS FROM NODE-LIST
  tableRowList.forEach((element) => {
    element.classList.remove("js_table-row-selected");
  });
  // console.log(tableRowList);
  // ADD JS_TABLE-ROW-SELECTED CLASS TO CLICKED ROW
};

// ADDING EVENT-LISTENER
let concertTableRowOnClick = (concertTableRow) => {
  concertTableRow.forEach((element) => {
    element.addEventListener("click", (event) => {
      // STOPPING BUBBLING-EFFECT
      event.stopPropagation();
      console.log(event.target);
      // TABLE-ROW NODE-LIST
      let tableRow = document.querySelectorAll(
        ".shows-table-data-container__content"
      );

      // CLICKED ROW
      let clickedEl = event.srcElement;

      // CLICKED-EL IMMEDIATE PARENT-ELEMENT
      let rowEl = clickedEl.parentElement;

      console.log("clicked el: " + clickedEl);
    });
  });
};

// CHECKING THE PRESENCE OF CONCERT TABLE-ROW TO ENSURE DOM-REDERING WAS SUCCESSFUL
let checkingConcertTableRow = () => {
  // GETTING CONCERT TABLE-ROW NODE-LIST
  let concertTableRow = document.querySelectorAll(
    ".shows-table-data-container__content"
  );
  // VERIFYING CONCERT TABLE-ROW NODE-LIST
  if (concertTableRow) {
    // ADDING EVENT-HANDLER TO CONCERT TABLE-RAW NODE-LIST
    concertTableRow.forEach((element) => {
      element.addEventListener("click", (event) => {
        // STOPPING BUBBLING-EFFECT
        event.stopPropagation();
        // GETTING EVENT-TARGET
        let eTarget = event.target;
        // GETTING CLOSEST-PARENT WITH MATCHING 'SELELCTOR'
        let closetParent = eTarget.closest(
          ".shows-table-data-container__content"
        );

        // INVOKING TOGGLING-CONCERT-TABLE-ROW-CLASSES FUNCTION
        togglingConcertTableRowClasses(event);
      });
    });
  }
};

/** INVOKES IMMEDIATELY AFTER PAGE LOADING IS FINISHED **/
checkingConcertTableRow();

/*------------------------------------------------------------------------------------------*/
