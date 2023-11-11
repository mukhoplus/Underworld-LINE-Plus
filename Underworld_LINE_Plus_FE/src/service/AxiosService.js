import axios from "axios";

export const axiosRequest = async (method, url, data = null) => {
  const headers = {
    "Content-Type": "application/json",
    "Mukho-Auth-Token": "Underworld",
  };

  return await axios({
    headers,
    method,
    url,
    data,
    withCredentials: true,
  });
};
