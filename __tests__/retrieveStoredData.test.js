import retrieveStoredData from "../utils/retrieveStoredData.js";
import knexfile from "../knexfile.js";
import knex from "knex";
let db;

describe('retrieveStoredData', () => {

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

    await db.schema.createTable('dummy_table', table => {
      table.increments('id');
      table.string('random_column').notNullable();
      table.timestamps(true, true);
    });
  });
  
  afterEach(async() => {
    await db.schema.dropTable('matches');
    await db.schema.dropTable('dummy_table');
    await db.destroy();
  });

  test('should return all data from the table matches', async () => {
    await db('matches').insert({
      date: 'Sun 17 th 15:00',
      team_home: 'West End',
      team_away: 'Crystal Palace',
      odds_team_home: "5/4",
      odds_draw: "8/5",
      odds_team_away: "6/5"
    });

    await db('dummy_table').insert({
      random_column: "something-1"
    });

    const result = await retrieveStoredData(db);

    expect(result.date).not.toBe(false);
    expect(result.team_home).not.toBe(false);
    expect(result.team_away).not.toBe(false);
    expect(result.odds_team_home).not.toBe(false);
    expect(result.odds_draw).not.toBe(false);
    expect(result.odds_team_away).not.toBe(false);
  });
});