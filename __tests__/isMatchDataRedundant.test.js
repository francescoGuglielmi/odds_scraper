import isMatchDataRedundant from "../utils/isMatchDataRedundant.js";
import knexfile from "../knexfile.js";
import knex from "knex";
let db;

describe('isMatchDataRedundant', () => {

  beforeEach(async () => {
    db = knex(knexfile.test);

    await db.schema.createTable('matches', table => {
      table.increments('id');
      table.string('date').notNullable();
      table.string('team_home').notNullable();
      table.string('team_away').notNullable();
      table.string('odds_team_home').notNullable();
      table.string('odds_draw').notNullable();
      table.string('odds_team_away').notNullable();
      table.timestamps(true, true);
    });
  });

  afterEach(async () => {
    await db.schema.dropTable('matches');
    await db.destroy();
  });

  test('should return false if the new entry is not already present in the database', async () => {
    await db('matches').insert({
      date: 'Sun 17 th 15:00',
      team_home: 'West End',
      team_away: 'Crystal Palace',
      odds_team_home: "5/4",
      odds_draw: "8/5",
      odds_team_away: "6/5"
    });

    const newEntry = {
      date: 'Sat 31 th 15:00',
      teamHome: 'Manchester United',
      teamAway: 'Chelsea',
      oddsTeamHome: "5/4",
      oddsDraw: "8/5",
      oddsTeamAway: "6/5"
    }

    const result = await isMatchDataRedundant(newEntry, db);

    expect(result).toBe(false);
  });

  test('should return true if the new entry is already present in the database', async () => {
    await db('matches').insert({
      date: 'Sun 17 th 15:00',
      team_home: 'West End',
      team_away: 'Crystal Palace',
      odds_team_home: "5/4",
      odds_draw: "8/5",
      odds_team_away: "6/5"
    });

    const newEntry = {
      date: 'Sun 17 th 15:00',
      teamHome: 'West End',
      teamAway: 'Crystal Palace',
      oddsTeamHome: "5/4",
      oddsDraw: "8/5",
      oddsTeamAway: "6/5"
    }

    const result = await isMatchDataRedundant(newEntry, db);

    expect(result).toBe(true);
  });
});