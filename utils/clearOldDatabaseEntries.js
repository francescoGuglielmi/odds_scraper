// This function clears the football events that have created more than 1 week ago.
// Since Betfred only displays one week at the time, any older match is not relevant anymore.

import db from "../db.js";

async function clearOldDatabaseEntries() {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  await db("matches")
  .where('created_at', '<', oneWeekAgo)
  .del()
  .then((amount) => {
    if (amount) {
      console.warn('\x1b[32m%s\x1b[0m', `\n deleted ${amount} old entries\n`);
    }
  });
}

export default clearOldDatabaseEntries;