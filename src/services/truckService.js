const BASE_URL = "http://localhost:8083/api";

export const getAllTrucks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/trucks`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateTruckStatus = async (truckId, newStatus) => {
  try {
    const response = await fetch(`${BASE_URL}/trucks/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ truckId, newStatus }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteTruck = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/trucks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    throw error;
  }
};
