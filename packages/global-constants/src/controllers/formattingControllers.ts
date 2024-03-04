export const convertToStandardDateFormat = (dateString: string): string => {
  // Convert string to Date object
  const dateObj = new Date(dateString);

  // Define arrays for days and months
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get day, month, and year from the date object
  const dayOfWeek = daysOfWeek[dateObj.getDay()];
  const dayOfMonth = dateObj.getDate();
  const month = monthsOfYear[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  // Function to add ordinal suffix to day
  const addOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  // Format the date string
  const formattedDate = `${dayOfWeek}, ${addOrdinalSuffix(
    dayOfMonth
  )} ${month} ${year}`;

  return formattedDate;
};