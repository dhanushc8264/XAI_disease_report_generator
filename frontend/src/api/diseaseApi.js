import axios from 'axios';



const API_BASE_URL  = import.meta.env.VITE_API_BASE_URL;




export const predictDiabetes = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/predict-diabetes`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


export const predictHeart = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/predict-heart`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};