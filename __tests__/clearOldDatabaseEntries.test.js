import {jest} from "@jest/globals";
import clearOldDatabaseEntries from "../utils/clearOldDatabaseEntries.js";
import knexfile from "../knexfile.js";
import knex from "knex";
let db;

describe('clearOldDatabaseEntries', () => {

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
  
  afterEach(async() => {
    await db.schema.dropTable('matches');
    await db.destroy();
  });

  test('should not delete entries that are more recent that 1 week ago', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    await db('matches').insert({
      date: 'Sun 17 th 15:00',
      team_home: 'West End',
      team_away: 'Crystal Palace',
      odds_team_home: "5/4",
      odds_draw: "8/5",
      odds_team_away: "6/5",
      created_at: yesterday,
    });

    await clearOldDatabaseEntries(db);

    expect(consoleSpy).not.toBeCalled();

    const data = await db.select().from("matches");

    expect(data.length).toBe(1);
    expect(data[0].team_home).not.toBe(false);
  });

  test('should delete entries that older that 1 week ago', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    const eightDaysAgo = new Date();
    eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);

    await db('matches').insert({
      date: 'Sun 17 th 15:00',
      team_home: 'West End',
      team_away: 'Crystal Palace',
      odds_team_home: "5/4",
      odds_draw: "8/5",
      odds_team_away: "6/5",
      created_at: eightDaysAgo,
    });

    await clearOldDatabaseEntries(db);

    expect(consoleSpy).toBeCalled();

    const data = await db.select().from("matches");

    expect(data.length).toBe(0);
  });
});