import pg from "pg";

// SQL

// id integer NOT NULL DEFAULT nextval('chat_users_id_seq'::regclass),
// username text COLLATE pg_catalog."default" NOT NULL,
// interaction_count integer DEFAULT 1,
// date_added date NOT NULL,
// platform text COLLATE pg_catalog."default" NOT NULL,
// CONSTRAINT chat_users_pkey PRIMARY KEY (id),
// CONSTRAINT chat_users_username_date_added_key UNIQUE (username, date_added),
// CONSTRAINT unique_user_date_platform UNIQUE (username, date_added, platform)

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "stream-overlay",
  password: "12345678",
  port: 5432,
});

export async function fetchAllPlatforms(selectedDate: string) {
  try {
    const result = await pool.query(
      `SELECT username, platform, interaction_count, TO_CHAR(date_added, 'YYYY-MM-DD') AS formatted_date 
       FROM chat_users 
       WHERE date_added = $1`,
      [selectedDate],
    );

    return result.rows;
  } catch (error) {
    console.error("Error fetching platforms:", error);
  }
}
