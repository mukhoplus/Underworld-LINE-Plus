import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setUserId } from "./redux/action";
import Hello from "./pages/hello/Hello";
import Main from "./pages/main/Main";
import { getSessionUserId } from "./service/SessionService";

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
    getSessionUserId(setUserId, setIsSession);
  }, [setUserId]);

  if (!isSession) return;
  return (
    <>
      {userId === 0 ? (
        <Hello setIsSession={setIsSession} />
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
