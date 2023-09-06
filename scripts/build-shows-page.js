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
/*------------------------------------------------------------------------------------------*/

// SHOWS-TABLE RENDERING-FUNCTION

let renderShowsInfo = (showTitleEl, showTableHeaderEl, showTableDataEl) => {
  let showsContainer = document.querySelector(".shows");
  showsContainer.appendChild(showTitleEl);
  showsContainer.appendChild(showTableHeaderEl);
  showsContainer.appendChild(showTableDataEl);
};

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

/* 
# CREATING SHOWS TABLE ELEMENTS
- THREE FUNCTION ARE BEING USED FOR CREATING CONCERT-TABLE ELEMENTS 
- EACH FUNCTION RETURNS ELEMENT AND THEY ARE STORE IN VARIABLES
*/

// (1) - CREATING SHOWS TITLE ELMENTS
let createShowTitleElements = () => {
  let showsTitleEl = document.createElement("h1");
  showsTitleEl.classList.add("shows__title");
  showsTitleEl.innerText = "Shows";

  // RETURNING-SHOWS-TITLE-EL
  return showsTitleEl;
};

// (2) - CREATING SHOWS-TABLE HEADER ELEMENTS TO USE ON TOP OF THE SHOWS-DATA TABLE
let createShowHeaderElements = () => {
  // HEADERS-CONTAINER
  let headerEl = document.createElement("div");
  headerEl.classList.add("shows-table-headers-container");

  // SHOWS-TABLE-HEADER - DATE
  let headerDateEl = document.createElement("h3");
  headerDateEl.classList.add("shows-table-headers-container__name");
  headerDateEl.innerText = "Date";
  headerEl.appendChild(headerDateEl); // appending to shows-header-container

  // SHOWS-TABLE-HEADER - VENUE
  let headerVenueEl = document.createElement("h3");
  headerVenueEl.classList.add("shows-table-headers-container__name");
  headerVenueEl.innerText = "Venue";
  headerEl.appendChild(headerVenueEl); // appending to shows-header-container

  // SHOWS-TABLE-HEADER - LOCATION
  let headerLocationEl = document.createElement("h3");
  headerLocationEl.classList.add("shows-table-headers-container__name");
  headerLocationEl.innerText = "Location";
  headerEl.appendChild(headerLocationEl); // appending to shows-header-container

  // RETURNS SHOW HEADER-EL
  return headerEl;
};

// CREATING SHOWS-TABLE HEADER ELEMENTS TO USE WITHIN THE SHOWS-DATA TABLE
// (3) - CREATING SHOW DATA ELEMENTS
let createShowDataElements = (datas) => {
  // TABLE-DATA-CONTAINER - SHOWS TABLE-ROWS ARE BEING WRAPPEND AS CHILDREN IN SINGLE CONTAINER
  let tableDataContainerEl = document.createElement("div");
  tableDataContainerEl.classList.add("shows-table-data-container");

  datas.forEach((element) => {
    // SHOWS-TABLE-DATA-CONTENT 'CONTAINER FOR INDIVIDUAL SHOWS ITEM'
    let tableDataContentEl = document.createElement("div");
    tableDataContentEl.classList.add("shows-table-data-container__content");
    tableDataContainerEl.appendChild(tableDataContentEl); // appending to shows-table-data-container

    // SHOWS-TABLE-DATAS - DATE
    let dateEl = document.createElement("p");
    dateEl.classList.add("shows-table-data__content--date");
    dateEl.innerText = element.date;
    tableDataContentEl.appendChild(dateEl); // appending to shows-table-data-content

    // SHOWS-TABLE-DATAS - VENUE
    let venueEl = document.createElement("p");
    venueEl.classList.add("shows-table-data__content--venue");
    venueEl.innerText = element.venue;
    tableDataContentEl.appendChild(venueEl); //  appending to shows-table-data-content

    // SHOWS-TABLE-DATAS - LOCATION
    let locationEl = document.createElement("p");
    locationEl.classList.add("shows-table-data__content--location");
    locationEl.innerText = element.location;
    tableDataContentEl.appendChild(locationEl); //  appending to shows-table-data-content

    // SHOWS-TABLE-DATAS - BUTTON
    let buttonEl = document.createElement("button");
    buttonEl.classList.add("shows-table-data__content--btn");
    buttonEl.innerText = "Buy Ticket";
    tableDataContentEl.appendChild(buttonEl); //  appending to shows-table-data-content
  });

  // RETURN TABLE-DATA-CONTAINER-EL
  return tableDataContainerEl;
};

/** INVOKES IMMEDIATELY AFTER PAGE LOADING IS FINISHED **/
renderShowsInfo(
  createShowTitleElements(),
  createShowHeaderElements(),
  createShowDataElements(showsDatas)
);

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

/*
# ADDING AND REMOVING CLASSES FROM CONCERT TABLE-ROW 
- TWO FUNCTION ARE BEING USED TO ADD & REMOVE CLASSES FROM CONCERT TABLE-ROW ELEMENT
 (1) ADDING AND REMOVING CLASS-NAME FROM CONCERT TABLE-ROW
 (2) CHECKING THE PRESENCE OF CONCERT TABLE-ROW TO ENSURE IF THE DOM-REDERING WAS SUCCESSFUL 
    AND THEN ADD EVENT-HANDLER 
*/

// (1) ADDING AND REMOVING CLASSES
let togglingConcertTableRowClasses = (tableRowList, closestParent) => {
  // REMOVING JS_TABLE-ROW-SELECTED CLASS FROM TABLE-ROW LIST
  tableRowList.forEach((element) => {
    element.classList.remove("shows-table-data-container__content-selected");
  });
  // ADDING JS_TABLE-ROW-SELECTED CLASS TO CLOSEST-PARENT OF TARGET ELEMENT
  closestParent.classList.add("shows-table-data-container__content-selected");
};

// (2) CHECKING THE PRESENCE OF CONCERT TABLE-ROW
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
        // GETTING CLOSEST-PARENT WITH MATCHING 'SELECTOR'
        let closetParent = eTarget.closest(
          ".shows-table-data-container__content"
        );

        // INVOKING TOGGLING-CONCERT-TABLE-ROW-CLASSES FUNCTION
        togglingConcertTableRowClasses(concertTableRow, closetParent);
      });
    });
  }
};

/** INVOKES IMMEDIATELY AFTER PAGE LOADING IS FINISHED **/
checkingConcertTableRow();

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/
