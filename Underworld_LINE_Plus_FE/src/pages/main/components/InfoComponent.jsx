import { useState, useEffect } from "react";
import { Button, Row, Col, Badge } from "antd";
import {
  UserOutlined,
  MessageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import UserComponent from "./info/UserComponent";
import RoomComponent from "./info/RoomComponent";
import { axiosRequest } from "../../../service/AxiosService";
import SocketService from "../../../service/SocketService";
import "./css/InfoComponent.css";

const InfoComponent = ({
  userId,
  setUserId,
  userList,
  setUserList,
  setRoomId,
  roomList,
  setRoomList,
  allNotReadCount,
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
            <Button className="btn-icon" onClick={() => setMenu(0)}>
              <UserOutlined
                className="icon"
                style={{ color: menu === 0 ? "#06c755" : null }}
              />
            </Button>
          </Row>
          <Row>
            <Button className="btn-icon" onClick={() => setMenu(1)}>
              <Badge count={allNotReadCount}>
                <MessageOutlined
                  className="icon"
                  style={{ color: menu === 1 ? "#06c755" : null }}
                />
              </Badge>
            </Button>
          </Row>
          <Row>
            <div className="btn-icon-temp" />
          </Row>
          <Row>
            <Button
              className="btn-icon"
              onClick={() => {
                axiosRequest("post", "/user/logout").then(() => {
                  setUserId(0);
                  SocketService.close();
                });
              }}
            >
              <LogoutOutlined className="icon" />
            </Button>
          </Row>
        </Col>
        <Col style={{ width: "390px" }}>
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
