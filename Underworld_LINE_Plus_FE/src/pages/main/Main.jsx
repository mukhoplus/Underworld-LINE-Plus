import { connect } from "react-redux";
import { setUserId } from "../../redux/action";
import InfoComponent from "./components/InfoComponent";
import ChatComponent from "./components/ChatComponent";
import { axiosRequest } from "../../service/AxiosService";

const mapDispatchToProps = (dispatch) => ({
  setUserId: (userId) => dispatch(setUserId(userId)),
  setRoomList: (roomList) => dispatch(setUserId(roomList)),
  setChatId: (chatId) => dispatch(setUserId(chatId)),
  setChatList: (chatList) => dispatch(setUserId(chatList)),
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
  return (
    <>
      메인{userId}
      {roomList.length}
      {chatId}
      {chatList.length}
      <button
        onClick={() => {
          axiosRequest("post", "/user/logout").then(() => {
            setUserId(0);
          });
        }}
      >
        로그아웃인것
      </button>
      <InfoComponent
        userId={userId}
        roomList={roomList}
        setRoomList={setRoomList}
      />
      <ChatComponent
        userId={userId}
        chatId={setChatId}
        setChatId={setChatId}
        chatList={chatList}
        setChatList={setChatList}
      />
    </>
  );
};

export default connect(null, mapDispatchToProps)(Main);
