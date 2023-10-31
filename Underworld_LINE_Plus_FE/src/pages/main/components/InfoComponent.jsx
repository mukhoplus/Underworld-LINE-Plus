import { useState, useEffect } from "react";
import { Button, Row, Col } from "antd";
import UserComponent from "./info/UserComponent";
import RoomComponent from "./info/RoomComponent";
import { axiosRequest } from "../../../service/AxiosService";

const InfoComponent = ({
  userId,
  userList,
  setUserList,
  setRoomId,
  roomList,
  setRoomList,
}) => {
  const [menu, setMenu] = useState(0);

  const handleUserList = async () => {
    axiosRequest("get", "/user/list").then((response) => {
      const data = response.data;
      setUserList(data);
    });
  };

  const handleRoomList = async () => {
    axiosRequest("get", `/room/list/${userId}`).then((response) => {
      setRoomList(response.data);
    });
  };

  useEffect(() => {
    handleUserList();
    handleRoomList();
  }, [userId]);

  return (
    <>
      <Row>
        <Col>
          <Row>
            <Button onClick={() => setMenu(0)}>사용자 정보</Button>
          </Row>
          <Row>
            <Button onClick={() => setMenu(1)}>채팅방 목록</Button>
          </Row>
        </Col>
        <Col>
          {menu === 0 ? (
            <UserComponent
              userId={userId}
              userList={userList}
              setRoomId={setRoomId}
            />
          ) : (
            <RoomComponent
              userId={userId}
              setRoomId={setRoomId}
              roomList={roomList}
              handleRoomList={handleRoomList}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default InfoComponent;
