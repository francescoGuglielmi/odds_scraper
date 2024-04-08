// This function stores the scraped data into the database you are connected to.

import isMatchDataRedundant from "./isMatchDataRedundant.js";
import dateFormatter from "./dateFormatter.js";

async function storeFootballData(scrapedData, db) {
  for (let i = 0; i < scrapedData.length; i++) {
    if (await isMatchDataRedundant(scrapedData[i], db)) {
      console.warn('\x1b[33m%s\x1b[0m', "This entry is redundant, therefore it won't be added");
      continue;
    }
    await db('matches').insert({
      date: dateFormatter(scrapedData[i].date),
      team_home: scrapedData[i].teamHome,
      team_away: scrapedData[i].teamAway,
      odds_team_home: scrapedData[i].oddsTeamHome,
      odds_draw: scrapedData[i].oddsDraw,
      odds_team_away: scrapedData[i].oddsTeamAway,
    });
  }
}

export default storeFootballData;