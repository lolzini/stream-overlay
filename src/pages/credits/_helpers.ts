import sqlite3 from "sqlite3";
import { open } from "sqlite";

const db = await open({
  filename: "../tiktok-tts/database.sqlite",
  driver: sqlite3.Database,
});

export async function fetchAllPlatforms(selectedDate: string) {
  try {
    const result = await db.all(
      `SELECT 
        username, 
        platform, 
        interaction_count,
        date_added as formatted_date
      FROM chat_users 
      WHERE date(date_added) = date(?)
      ORDER BY interaction_count DESC`,
      [selectedDate],
    );

    return result;
  } catch (error) {
    console.error("Error fetching platforms:", error);
    return [];
  }
}
