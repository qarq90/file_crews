export async function createCrew(crewData) {
  try {
    const response = await fetch("/api/post/crews/create-crew", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(crewData),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function fetchCrews() {
  try {
    const response = await fetch("/api/get/crews/fetch-crews", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    return await response.json();
  } catch (err) {
    console.log(err);
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
