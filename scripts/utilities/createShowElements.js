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

// (3) - CREATING SHOWS-DATE HEADER ELEMENTS TO USE WITHIN THE SHOW-DATE TABLE - INLINE-HEADERS
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
