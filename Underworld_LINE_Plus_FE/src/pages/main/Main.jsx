import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Row, Col, Badge } from "antd";
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
import { axiosRequest } from "../../service/AxiosService";

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
      "ws://localhost:8080/api/v1/socket",
      setRoomList,
      setChatList
    );
  }, []);

  useEffect(() => {
    setAllNotReadCount(getAllNotReadCount(roomList));
  }, [roomList]);

  return (
    <>
      <Row>
        <div>
          <p>메인 : {userId}</p>
          <p>유저 수 : {userList.length}</p>
          <p>채팅방 수 : {roomList.length}</p>
          <p>선택된 채팅방 번호 : {roomId}</p>
          <p>채팅 수 : {chatList.length}</p>
          <p>
            총 안 읽은 메시지 :{" "}
            {allNotReadCount ? (
              <Badge count={allNotReadCount} showZero></Badge>
            ) : (
              <></>
            )}
          </p>
        </div>
        <Button
          onClick={() => {
            axiosRequest("post", "/user/logout").then(() => {
              setUserId(0);
              SocketService.close();
            });
          }}
        >
          로그아웃인것
        </Button>
      </Row>
      <Row>
        <Col>
          <InfoComponent
            userId={userId}
            userList={userList}
            setUserList={setUserList}
            setRoomId={setRoomId}
            roomList={roomList}
            setRoomList={setRoomList}
          />
        </Col>
        <Col>
          <ChatComponent
            userId={userId}
            roomId={roomId}
            setRoomId={setRoomId}
            chatList={chatList}
            setChatList={setChatList}
          />
        </Col>
      </Row>
    </>
  );
};

export default connect(null, mapDispatchToProps)(Main);
