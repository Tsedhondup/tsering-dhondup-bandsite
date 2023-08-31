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

/*---------- DOM-RENDERING FUNCTION() ----------*/

// RENDER-SHOW-TITLE FUNCTION
let renderShowTitle = (showTitleEl) => {
  let showsContainer = document.querySelector(".shows");
  showsContainer.appendChild(showTitleEl);
};

// RENDER-SHOW-HEADER FUNCTION()
let renderShowsHeader = (headerEl) => {
  let showsContainer = document.querySelector(".shows");
  showsContainer.appendChild(headerEl);
};

// RENDER-SHOW-TABLE FUNCTION()
let renderShowsTable = (showsTableDataEl) => {
  let showsContainer = document.querySelector(".shows");
  showsContainer.appendChild(showsTableDataEl);
};

// COMMAN-RENDER-FUNCTION

let renderDOM = (showTitleEl, showTableHeaderEl, showTableDataEl) => {
  let showsContainer = document.querySelector(".shows");
  showsContainer.appendChild(showTitleEl);
  showsContainer.appendChild(showTableHeaderEl);
  showsContainer.appendChild(showTableDataEl);
};
/*---------- ELEMENT-CREATING FUNCTION() ----------*/

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
  let headerEl = document.createElement("div");
  headerEl.classList.add("shows-table-headers-container");
  showsTableContainerEl.appendChild(headerEl); // APPENDING TO SHOW-TABLE-CONTAINER

  // SHOWS-TABLE-HEADER__NAME - DATE
  let headerDateEl = document.createElement("h3");
  headerDateEl.classList.add("shows-table-headers-container__name");
  headerDateEl.innerText = "Date";
  headerEl.appendChild(headerDateEl); // APPENDING TO SHOW-HEADERS

  // SHOWS-TABLE-HEADER__NAME - VENUE
  let headerVenueEl = document.createElement("h3");
  headerVenueEl.classList.add("shows-table-headers-container__name");
  headerDateEl.innerText = "Venue";
  headerEl.appendChild(headerVenueEl); // APPENDING TO SHOW-HEADERS

  // SHOWS-TABLE-HEADER__NAME - LOCATION
  let headerLocationEl = document.createElement("h3");
  headerLocationEl.classList.add("shows-table-headers-container__name");
  headerDateEl.innerText = "Location";
  headerEl.appendChild(headerLocationEl); // APPENDING TO SHOW-HEADERS

  // RETURNS SHOW HEADER-EL
  return headerEl;
};

// CREATING SHOW DATA ELEMENTS
let createShowDataElements = (datas) => {
  let tableDataContainerEl = document.createElement("div");
  tableDataContainerEl.classList.add("shows-table-data-container");
  // LOOPING THROUGH THE SHOWS-DATAS ARRAY
  showsDatas.forEach((element) => {
    // SECTION -2 : SHOWS-TABLE-DATA-CONTAINER

    // SHOW-TABLE-DATA-CONTENT
    let tableDataContentEl = document.createElement("div");
    tableDataContentEl.classList.add("shows-table-data-container__content");
    tableDataContainerEl.appendChild(tableDataContentEl); // APPENDING TO SHOW-TABLE-DATA-CONTAINER

    // SHOWS-TABLE-DATAS__DATE
    let dateEl = document.createElement("p");
    dateEl.classList.add("shows-table-data__content--name");
    tableDataContentEl.appendChild(dateEl); // APPENDING TO SHOW-TABLE-DATA-CONTENT

    // SHOWS-TABLE-DATAS__VENUE
    let venueEl = document.createElement("p");
    venueEl.classList.add("shows-table-data__content--venue");
    tableDataContentEl.appendChild(venueEl); // APPENDING TO SHOW-TABLE-DATA-CONTENT

    // SHOWS-TABLE-DATAS__LOCATION
    let locationEl = document.createElement("p");
    locationEl.classList.add("shows-table-data__content--location");
    tableDataContentEl.appendChild(locationEl); // APPENDING TO SHOW-TABLE-DATA-CONTENT

    // SHOWS-TABLE-DATAS__BUTTON
    let buttonEl = document.createElement("button");
    locationEl.classList.add("shows-table-data__content--btn");
    buttonEl.innerText = "Buy Ticket";
    tableDataContentEl.appendChild(buttonEl); // APPENDING TO SHOW-TABLE-DATA-CONTENT
    dateEl.innerText = element.date;
    venueEl.innerText = element.venue;
    locationEl.innerText = element.location;
  });

  // RETURN TABLE-DATA-CONTAINER-EL
  return tableDataContainerEl;
};
