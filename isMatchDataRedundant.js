import db from "./db.js";

async function isMatchDataRedundant(newMatch) {
  const storedData = await db
  .select()
  .from("matches")
  .where({
    date: newMatch.date,
    team_home: newMatch.teamHome,
    team_away: newMatch.teamAway,
    odds_team_home: newMatch.oddsTeamHome,
    odds_draw: newMatch.oddsDraw,
    odds_team_away: newMatch.oddsTeamAway,
  });
  return !!storedData;
}

export default isMatchDataRedundant;