// Get all the database rows from the table "matches"

import db from "../db.js";

async function retrieveStoredData() {
  const savedMatches = await db.select().from("matches");
  return savedMatches;
}

export default retrieveStoredData;