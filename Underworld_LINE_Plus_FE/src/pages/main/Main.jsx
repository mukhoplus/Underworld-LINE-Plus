import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import {
  setUserId,
  setUserList,
  setRoomList,
  setRoomId,
  setChatList,
} from "../../redux/action";
import SocketService from "../../service/SocketService";
import InfoComponent from "./components/InfoComponent";
import ChatComponent from "./components/ChatComponent";
import { BaseURL } from "../../service/HostingService";
import "../css/Main.css";

const getAllNotReadCount = (roomList) => {
  return roomList.reduce((acc, cur) => {
    return acc + cur.notReadCount;
  }, 0);
};

const mapDispatchToProps = (dispatch) => ({
  setUserId: (userId) => dispatch(setUserId(userId)),
  setUserList: (userList) => dispatch(setUserList(userList)),
  setRoomList: (roomList) => dispatch(setRoomList(roomList)),
  setRoomId: (roomId) => dispatch(setRoomId(roomId)),
  setChatList: (chatList) => dispatch(setChatList(chatList)),
});

const Main = ({
  userId,
  userList,
  roomList,
  roomId,
  chatList,
  setUserId,
  setUserList,
  setRoomList,
  setRoomId,
  setChatList,
}) => {
  const [allNotReadCount, setAllNotReadCount] = useState(0);

  useEffect(() => {
    SocketService.connect(
      `ws://${BaseURL}/api/v1/socket`,
      setRoomList,
      setChatList
    );
  }, []);

  useEffect(() => {
    setAllNotReadCount(getAllNotReadCount(roomList));
  }, [roomList, chatList]);

  return (
    <>
      <Row>
        <Col className="component">
          <InfoComponent
            userId={userId}
            setUserId={setUserId}
            userList={userList}
            setUserList={setUserList}
            setRoomId={setRoomId}
            roomList={roomList}
            setRoomList={setRoomList}
            setChatList={setChatList}
            allNotReadCount={allNotReadCount}
          />
        </Col>
        <Col className="component">
          <ChatComponent
            userId={userId}
            roomId={roomId}
            setRoomId={setRoomId}
            chatList={chatList}
            roomList={roomList}
            setChatList={setChatList}
          />
        </Col>
      </Row>
    </>
  );
};

export default connect(null, mapDispatchToProps)(Main);
