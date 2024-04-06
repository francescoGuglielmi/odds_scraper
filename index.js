import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { executablePath } from "puppeteer";
import storeFootballData from "./storeFootballData.js";
import retrieveStoredData from "./retrieveStoredData.js";
import db from "./db.js";

puppeteer.use(StealthPlugin());

async function main() {
  try {
    const browser = await puppeteer.launch({ executablePath: executablePath() });
    const page = await browser.newPage();
  
    await setUpPageToScrap(page);
    const scrapedData = await scrapFootballData(page);
    await browser.close();
    
    await storeFootballData(scrapedData);
    const retrievedData = await retrieveStoredData();
    console.log(retrievedData);
  
    await db.destroy();
  } catch(error) {
    console.log(error)
  }
}

async function setUpPageToScrap(page) {
  await page.goto("https://www.betfred.com/sports/market-group/22234017.2");
  await page.click('a.wscrOk');
  await page.waitForSelector('.sportsbook-simple-coupon');
}

async function scrapFootballData(page) {
  return await page.evaluate(() => {
    const matches = document.body.querySelectorAll(".sportsbook-inline-outright");
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
