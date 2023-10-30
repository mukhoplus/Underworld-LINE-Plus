import { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Row, Col } from "antd";
import {
  setUserId,
  setRoomList,
  setChatId,
  setChatList,
} from "../../redux/action";
import SocketService from "../../service/SocketService";
import InfoComponent from "./components/InfoComponent";
import ChatComponent from "./components/ChatComponent";
import { axiosRequest } from "../../service/AxiosService";

const mapDispatchToProps = (dispatch) => ({
  setUserId: (userId) => dispatch(setUserId(userId)),
  setRoomList: (roomList) => dispatch(setRoomList(roomList)),
  setChatId: (chatId) => dispatch(setChatId(chatId)),
  setChatList: (chatList) => dispatch(setChatList(chatList)),
});

const Main = ({
  userId,
  roomList,
  chatId,
  chatList,
  setUserId,
  setRoomList,
  setChatId,
  setChatList,
}) => {
  useEffect(() => {
    SocketService.connect("ws://localhost:8080/api/v1/socket");
  }, []);

  return (
    <>
      <Row>
        메인{userId}
        {roomList.length}
        {chatId}
        {chatList.length}
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
            roomList={roomList}
            setRoomList={setRoomList}
          />
        </Col>
        <Col>
          <ChatComponent
            userId={userId}
            chatId={chatId}
            setChatId={setChatId}
            chatList={chatList}
            setChatList={setChatList}
          />
        </Col>
      </Row>
    </>
  );
};

export default connect(null, mapDispatchToProps)(Main);
