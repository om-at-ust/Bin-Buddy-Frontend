const BASE_URL = "http://localhost:8085/api";

export const getAllRoutes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/routes/getAllRoutes`);
    if (!response.ok) {
      throw new Error("Failed to fetch routes");
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    throw error;
  }
};

export const deleteRoute = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/routes?id=${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete route");
    }
    return await response.text();
  } catch (error) {
    throw error;
  }
};

export const createRoute = async () => {
  try {
    const response = await fetch(`${BASE_URL}/routes/createRoute`);
    if (!response.ok) {
      throw new Error("Failed to create route");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const assignRouteToTruck = async (routeId) => {
  try {
    const response = await fetch(
      `http://localhost:8083/api/trucks/assignRoute?routeId=${routeId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    return await response.text();
  } catch (error) {
    throw error;
  }
};

export const setRouteStatusAssigned = async (routeId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/routes/setRouteStatusAssigned/${routeId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update route status");
    }

    return await response.text();
  } catch (error) {
    throw error;
  }
};

export const getRouteById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/routes/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch route");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
