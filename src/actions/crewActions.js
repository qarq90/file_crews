import pool from "@/lib/connection";

export async function createCrew(crewData) {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO crews 
       (crew_name, crew_token, crew_banner) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [crewData.crew_name, crewData.crew_token, crewData.crew_banner?.base64],
    );

    client.release();
    return result.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create crew");
  }
}

export async function fetchCrews() {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM crews`);

    client.release();
    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch crew");
  }
}

export async function fetchCrew(crewId) {
  try {
    const response = await fetch("/api/post/crews/fetch-crew", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(crewId),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function updateCrew(crewId, crewData) {
  try {
    const response = await fetch("/api/post/crews/update-crew", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crewId: crewId, crewData: crewData }),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function disbandCrew(crewId) {
  try {
    const response = await fetch("/api/post/crews/disband-crew", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(crewId),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
}
