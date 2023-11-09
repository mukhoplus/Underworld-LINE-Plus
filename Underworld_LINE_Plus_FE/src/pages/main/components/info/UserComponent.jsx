import { useState, useEffect } from "react";
import { axiosRequest } from "../../../../service/AxiosService";
import UserInfo from "./UserInfo";

const UserComponent = ({ userId, userList, setRoomId }) => {
  const [userInfo, setUserInfo] = useState([]);

  const getMyInfo = () => {
    return userList.find((item) => item.userId === userId);
  };

  const getFriendInfo = () => {
    return userList.filter((item) => item.userId !== userId);
  };

  const handleUserInfo = () => {
    if (userList.length === 0) return;

    const myInfo = getMyInfo();
    const friendInfo = getFriendInfo();

    setUserInfo([{ ...myInfo }, ...friendInfo]);
  };

  const handleChatIdToRoomId = async (userId) => {
    axiosRequest("get", `/room/user/${userId}`).then((response) => {
      setRoomId(response.data);
    });
  };

  useEffect(() => {
    handleUserInfo();
  }, [userList]);

  return (
    <>
      <UserInfo
        userId={userId}
        userInfo={userInfo}
        handleChatIdToRoomId={handleChatIdToRoomId}
      />
    </>
  );
};

export default UserComponent;
