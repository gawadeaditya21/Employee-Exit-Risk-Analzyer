const API_URL = "http://localhost:8000";

export const predictExitRisk = async (employeeData) => {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    throw new Error("Backend server error");
  }

  return await response.json();
};