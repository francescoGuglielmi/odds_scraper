// On Betfred.com if a match is happening today only the time of the event will be displayed.
// This function is making sure that even for matches happening today the date field will look consistent 
// with the other database entries.

function dateFormatter(scrapedDate) {
  const today = new Date();
  const isToday = !/\bMon|Tue|Wed|Thu|Fri|Sat|Sun\b/.test(scrapedDate);

  if (isToday) {
    const formattedDateParts = today.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit' }).split(" ");
    return `${formattedDateParts[1]} ${formattedDateParts[0]} ${getOrdinalIndicator(formattedDateParts[1])} ${scrapedDate}`;
  } else return scrapedDate;
}

export function getOrdinalIndicator(dayOfTheMonth) {
  if(dayOfTheMonth.split("")[1] === "1" && dayOfTheMonth !== "11") return "st";
  if(dayOfTheMonth.split("")[1] === "2") return "nd";
  if(dayOfTheMonth.split("")[1] === "3") return "rd";
  return "th";
}

export default dateFormatter;