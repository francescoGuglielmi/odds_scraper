/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('match', table => {
    table.increments('id');
    table.string('team_home').notNullable();
    table.string('team_away').notNullable();
    table.string('odds_team_home').notNullable();
    table.string('odds_draw').notNullable();
    table.string('odds_team_away').notNullable();
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('match');
};
