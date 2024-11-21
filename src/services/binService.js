const API_URL = "http://localhost:8082/bins";
const GEOAPIFY_API_KEY = "e40bf7725f014f46b46609ebb9112a9a";

export async function fetchBins() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch bins");
  return response.json();
}

export async function getBinById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch bin");
  return response.json();
}

export async function saveBin(bin) {
  try {
    if (bin.latitude && bin.longitude) {
      const locationString = await getLocationFromCoordinates(
        bin.latitude,
        bin.longitude
      );
      bin.location = locationString;
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bin),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `Failed to create bin: ${response.status} - ${errorData}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Full error details:", error);
    throw error;
  }
}

export async function updateBin(id, bin) {
  if (bin.latitude && bin.longitude) {
    const locationString = await getLocationFromCoordinates(
      bin.latitude,
      bin.longitude
    );
    bin.location = locationString;
  }

  const response = await fetch(`${API_URL}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bin),
  });
  if (!response.ok) throw new Error("Failed to update bin");
  return response.json();
}

export async function deleteBin(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete bin");
}

export async function updateBinFillLevel(id, fillLevel) {
  const response = await fetch(
    `${API_URL}/${id}/update-fill-level?fillLevel=${fillLevel}`,
    {
      method: "POST",
    }
  );
  if (!response.ok) throw new Error("Failed to update bin fill level");
  return response.json();
}

export async function getFullOrOverflowingBins() {
  const response = await fetch(`${API_URL}/full-overflowing`);
  if (!response.ok) throw new Error("Failed to fetch full/overflowing bins");
  return response.json();
}

export async function getLocationFromCoordinates(latitude, longitude) {
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${GEOAPIFY_API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch location data");

  const data = await response.json();

  if (data.results && data.results.length > 0) {
    const location = data.results[0];

    // Build location string with fallbacks
    const parts = [
      location.name || "Unknown Location",
      location.city || location.county || location.state_district || "",
      location.state || "",
      location.country_code ? location.country_code.toUpperCase() : "",
    ];

    // Filter out empty strings and join with commas
    return parts.filter((part) => part).join(", ");
  }

  return "Location not found";
}

export const generateRoute = async () => {
  try {
    const response = await fetch(
      "http://localhost:8085/api/routes/createRoute"
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to generate route: ${errorText}`);
    }

    const text = await response.text();
    if (!text) {
      throw new Error("Empty response received from server");
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      throw new Error(`Invalid JSON response: ${text}`);
    }
  } catch (error) {
    console.error("Error details:", error);
    throw error;
  }
};
