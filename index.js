import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { executablePath } from "puppeteer";
import storeFootballData from "./utils/storeFootballData.js";
import retrieveStoredData from "./utils/retrieveStoredData.js";
import db from "./db.js";
import clearOldDatabaseEntries from "./utils/clearOldDatabaseEntries.js";

puppeteer.use(StealthPlugin()); // This plugin helps for this script not to be recognised as a bot when scraping

async function main() {
  try {
    // 1. Launch browser and navigate to the page to be scrapped
    const browser = await puppeteer.launch({ executablePath: executablePath() });
    const page = await browser.newPage();
    await setUpPageToScrap(page);

    // 2. Scrap the data out of the page
    const scrapedData = await scrapFootballData(page);

    // 3. Store it in the database and clear older than 1 week rows
    await storeFootballData(scrapedData, db);
    await clearOldDatabaseEntries(db);

    // 4. Verify the process was successful and log the database data to the console
    const retrievedData = await retrieveStoredData(db);
    console.log("\nThe current data is: ", retrievedData);

    // 5. Close the browser
    await browser.close();
    await db.destroy();
  } catch(error) {
    console.error('\x1b[31m', error);
  }
}

async function setUpPageToScrap(page) {
  // Navigate
  await page.goto("https://www.betfred.com/sports/market-group/22234017.2");

  // Accept cookies
  await page.click('a.wscrOk');

  // We want to wait until the relevant page is fully loaded before scraping
  await page.waitForSelector('.sportsbook-simple-coupon'); 
}

async function scrapFootballData(page) {
  return await page.evaluate(() => {
    const matches = document.body.querySelectorAll('[data-id="sportsbook_market-group_simple-coupon_inline-outright"]');
    return Array.from(matches, (e) => ({
      date: e.querySelector(".sportsbook-inline-outright__header-bar-time").textContent,
      teamHome: e.querySelector(".sportsbook-inline-outright__teams-home").textContent,
      teamAway: e.querySelector(".sportsbook-inline-outright__teams-away").textContent,
      oddsTeamHome: e.querySelectorAll(".sportsbook-inline-selection")[0].textContent,
      oddsDraw: e.querySelectorAll(".sportsbook-inline-selection")[1].textContent,
      oddsTeamAway: e.querySelectorAll(".sportsbook-inline-selection")[2].textContent,
    }));
  });
}

main();
