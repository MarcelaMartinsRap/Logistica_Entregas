import axios from "axios";

const API_URL = "http://localhost:3000/api";

const getRotasEntrega = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching delivery routes:", error);
    throw error;
  }
};

export { getRotasEntrega };
