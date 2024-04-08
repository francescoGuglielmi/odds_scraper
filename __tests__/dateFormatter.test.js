import dateFormatter from "../utils/dateFormatter.js";
import { getOrdinalIndicator } from "../utils/dateFormatter.js";

describe("dateFormatter", () => {
  test("should not modify the date if the date is not today's", () => {
    const randomDate = "Tue 31 st 01:00";

    expect(dateFormatter(randomDate)).toBe(randomDate);
  });

  test("should modify the date if the date is today's", () => {
    const timeOfTodaysMatch = "16:00";

    const formattedDate = dateFormatter(timeOfTodaysMatch);
    const regex = /\b[A-Za-z]{3} \d{1,2} (?:st|nd|rd|th) \d{2}:\d{2}\b/;
    
    expect(regex.test(formattedDate)).toBe(true);
  });
});

describe("getOrdinalIndicator", () => {
  test("should output the right ordinal indicator", () => {
    let dayOfTheMonth = "01"
    expect(getOrdinalIndicator(dayOfTheMonth)).toBe("st")
    
    dayOfTheMonth = "02"
    expect(getOrdinalIndicator(dayOfTheMonth)).toBe("nd")
    
    dayOfTheMonth = "03"
    expect(getOrdinalIndicator(dayOfTheMonth)).toBe("rd")
    
    dayOfTheMonth = "11"
    expect(getOrdinalIndicator(dayOfTheMonth)).toBe("th")
  });
});