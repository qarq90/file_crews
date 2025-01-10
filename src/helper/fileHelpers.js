export async function createFile(crewId, fileData) {
  try {
    const response = await fetch("/api/post/files/create-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crew_id: crewId, fileData: fileData }),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create file");
  }
}

export async function fetchCrewFiles(crewId) {
  try {
    const response = await fetch("/api/post/files/file-crew", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(crewId),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function fetchFile(file_id) {
  try {
    const response = await fetch("/api/post/files/fetch-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(file_id),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function updateFile(crewId, file_id, fileData) {
  try {
    const response = await fetch("/api/post/files/update-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crew_id: crewId, file_id: file_id, fileData }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error in updateFile:", error);
    return { status: false, message: error.message };
  }
}

export async function deleteFile(crewId, file_id) {
  try {
    const response = await fetch("/api/post/files/delete-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crew_id: crewId, file_id: file_id }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error in updateFile:", error);
    return { status: false, message: error.message };
  }
}
