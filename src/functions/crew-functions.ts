import pool from "@/lib/neon";

export async function createCrew(
    crewData: CrewType
): Promise<CrewCreateResponseType> {
    try {
        const client = await pool.connect();
        const result = await client.query(
            `INSERT INTO crews 
             (crew_name, crew_token, banner_id, banner_name, banner_type, banner_url, banner_hash) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) 
             RETURNING *`,
            [
                crewData.crew_name,
                crewData.crew_token,
                crewData.banner_id,
                crewData.banner_name,
                crewData.banner_type,
                crewData.banner_url,
                crewData.banner_hash,
            ]
        );

        client.release();
        return {
            result: result.rows[0],
            status: true,
            message: "Crew Created Successfully",
        };
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to create crew");
    }
}

export async function uploadBanner(
    crew_banner: File
): Promise<FilePinataResultType> {
    if (!crew_banner) {
        throw new Error("No banner file provided");
    }

    try {
        const data = new FormData();
        data.append("crew_banner", crew_banner);

        const response = await fetch("/api/post/crews/upload-banner", {
            method: "POST",
            body: data,
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Error uploading banner:", err);
        throw err;
    }
}

export async function fetchCrews(): Promise<CrewsNeonResultType> {
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM crews`);

        client.release();
        return {
            result: result.rows,
            status: true,
            message: "Crew Created Successfully",
        };
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to create crew");
    }
}

export async function fetchCrew(crew_id: string): Promise<CrewNeonResultType> {
    try {
        const client = await pool.connect();
        const result = await client.query(
            `SELECT * FROM crews WHERE crew_id = $1`,
            [crew_id]
        );

        client.release();
        return {
            result: result.rows[0],
            status: true,
            message: "Crew Created Successfully",
        };
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to create crew");
    }
}
