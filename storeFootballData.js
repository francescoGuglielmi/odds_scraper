import db from "./db.js";

async function storeFootballData(scrapedData) {
  for (let i = 0; i < scrapedData.length; i++) {
    await db('matches').insert({
      date: scrapedData[i].date,
      team_home: scrapedData[i].teamHome,
      team_away: scrapedData[i].teamAway,
      odds_team_home: scrapedData[i].oddsTeamHome,
      odds_draw: scrapedData[i].oddsDraw,
      odds_team_away: scrapedData[i].oddsTeamAway,
    });
  }
}

export default storeFootballData;