import axios from "axios";

export const axiosRequest = async (method, url, data = null) => {
  return await axios({
    method: method,
    url: url,
    data: data,
    withCredentials: true,
  });
};
