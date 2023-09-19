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
