import { axiosRequest } from "./AxiosService";

export const getSessionUserId = async (setUserId, setIsSession) => {
  axiosRequest("get", "/user/session", null).then((response) => {
    const sessionUserId = Number(response.data);
    setUserId(sessionUserId);
    setIsSession(true);
  });
};
