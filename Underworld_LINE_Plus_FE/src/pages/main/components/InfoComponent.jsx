import { useState, useEffect } from "react";
import { Button, Row, Col, Badge } from "antd";
import {
  UserOutlined,
  MessageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import UserComponent from "./info/user/UserComponent";
import RoomComponent from "./info/room/RoomComponent";
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
  setChatList,
  allNotReadCount,
}) => {
  const [menu, setMenu] = useState(0);

  const handleUserList = async () => {
    axiosRequest("get", "/user/list")
      .then((response) => {
        const data = response.data;
        setUserList(data);
      })
      .catch(() => {
        resetStates();
      });
  };

  const handleRoomList = async () => {
    axiosRequest("get", `/room/list/${userId}`)
      .then((response) => {
        setRoomList(response.data);
      })
      .catch(() => {
        resetStates();
      });
  };

  const resetStates = () => {
    setUserId(0);
    setUserList([]);
    setRoomId(0);
    setRoomList([]);
    setChatList([]);
  };

  useEffect(() => {
    handleUserList();
    handleRoomList();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Row>
        <Col style={{ borderRight: "1px solid gainsboro" }}>
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
              <Badge
                style={{ fontSize: "10px" }}
                count={allNotReadCount}
                overflowCount={999}
              >
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
                axiosRequest("post", "/user/logout")
                  .then(() => {
                    SocketService.close();
                  })
                  .catch()
                  .finally(() => {
                    resetStates();
                  });
              }}
            >
              <LogoutOutlined className="icon" />
            </Button>
          </Row>
        </Col>
        <Col style={{ width: "389px" }}>
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
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default InfoComponent;
