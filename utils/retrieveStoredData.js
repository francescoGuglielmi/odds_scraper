// Get all the database rows from the table "matches"

async function retrieveStoredData(db) {
  return await db.select().from("matches");
}

export default retrieveStoredData;