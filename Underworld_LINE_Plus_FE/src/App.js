import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setUserId } from "./redux/action";
import Hello from "./pages/hello/Hello";
import Main from "./pages/main/Main";

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    roomList: state.roomList,
    chatId: state.chatId,
    chatList: state.chatList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setUserId: (id) => dispatch(setUserId(id)),
});

const App = ({ userId, setUserId, roomList, chatId, chatList }) => {
  const [isSession, setIsSession] = useState(false);

  useEffect(() => {
    const getSessionUserId = async () => {
      await axios.get("/user/session").then((response) => {
        const sessionUserId = response.data;
        setUserId(sessionUserId);
        setIsSession(true);
      });
    };

    getSessionUserId();
  }, [setUserId]);

  if (!isSession) return;
  return (
    <>
      {userId === 0 ? (
        <Hello />
      ) : (
        <Main
          userId={userId}
          roomList={roomList}
          chatId={chatId}
          chatList={chatList}
        />
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
