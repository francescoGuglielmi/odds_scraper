// We want to make sure that if a match is already stored in the database we are not going to
// add the same entry twice. I feel this enables more control than using the 'unique' keyword in the schema creation.

async function isMatchDataRedundant(newMatch, db) {
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
  return !!storedData[0];
}

export default isMatchDataRedundant;