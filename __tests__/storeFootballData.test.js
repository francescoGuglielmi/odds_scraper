import {jest} from '@jest/globals';
import storeFootballData from "../utils/storeFootballData.js";
import knexfile from "../knexfile.js";
import knex from "knex";

let db;

describe('storeFootballData', () => {

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

  test('should not add an entry if that entry already exists in the database', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

    await db('matches').insert({
      date: 'Sun 17 th 15:00',
      team_home: 'West End',
      team_away: 'Crystal Palace',
      odds_team_home: "5/4",
      odds_draw: "8/5",
      odds_team_away: "6/5"
    });

    const newEntries = [{
      date: 'Sun 17 th 15:00',
      teamHome: 'West End',
      teamAway: 'Crystal Palace',
      oddsTeamHome: "5/4",
      oddsDraw: "8/5",
      oddsTeamAway: "6/5"
    }];

    await storeFootballData(newEntries, db);
    const storedData = await db.select().from("matches");

    expect(consoleSpy).toBeCalled();
    expect(storedData.length).toBe(1);

    consoleSpy.mockRestore();
  });

  test("should add the entry if that entry did not exists in the database", async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    await db('matches').insert({
      date: 'Sun 31 th 15:00',
      team_home: 'West End',
      team_away: 'Crystal Palace',
      odds_team_home: "5/4",
      odds_draw: "8/5",
      odds_team_away: "6/5"
    });

    const newEntries = [{
      date: 'Sat 17 th 15:00',
      teamHome: 'Manchester United',
      teamAway: 'Chelsea',
      oddsTeamHome: "5/4",
      oddsDraw: "8/5",
      oddsTeamAway: "6/5"
    }];

    await storeFootballData(newEntries, db);
    const storedData = await db.select().from("matches");

    expect(consoleSpy).not.toBeCalled();
    expect(storedData.length).toBe(2);
  });
});