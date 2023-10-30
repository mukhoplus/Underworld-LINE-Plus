import { useState, useEffect } from "react";
import { Button, Row, Col } from "antd";
import UserComponent from "./info/UserComponent";
import RoomComponent from "./info/RoomComponent";
import { axiosRequest } from "../../../service/AxiosService";

const InfoComponent = ({ userId, roomList, setRoomList }) => {
  const [menu, setMenu] = useState(0);

  const getRoomList = async () => {
    axiosRequest("get", `/room/list/${userId}`).then((response) => {
      setRoomList(response.data);
    });
  };

  useEffect(() => {
    getRoomList();
  }, [setRoomList]);

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
            <UserComponent userId={userId} />
          ) : (
            <RoomComponent roomList={roomList} setRoomList={setRoomList} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default InfoComponent;
