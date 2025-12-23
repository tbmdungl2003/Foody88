import axios from "./axios.js";

export const loginAction = ({ email, password }) => {
  const URL = "/auth/login";
  const data = {
    email,
    password,
  };
  return axios.post(URL, data);
};

export const register = ({ email, password, username }) => {
  const URL = "/auth/register";
  const data = {  
    email,
    password,
    username,
  };
  return axios.post(URL, data);
};

export const getFoods = () => {
  const URL = "/foods";
  return axios.get(URL);
};
export const getStores = () => {
  const URL = "/store";
  return axios.get(URL);
}
export const updateUserProfile = (formDataObject) => {
  const URL = "/auth/profile";
  const formData = new FormData();
  for (const key in formDataObject) {
    if (formDataObject[key] !== null && formDataObject[key] !== undefined) {
      formData.append(key, formDataObject[key]);
    }
  }
  return axios.put(URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export const getFoodById = (id) => axios.get(`/foods/${id}`);

export const getStoreById = (id) => axios.get(`/store/${id}`);
