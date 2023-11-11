import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setUserId } from "./redux/action";
import Hello from "./pages/hello/Hello";
import Main from "./pages/main/Main";
import { getSessionUserId } from "./service/SessionService";

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    userList: state.userList,
    roomList: state.roomList,
    roomId: state.roomId,
    chatList: state.chatList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setUserId: (id) => dispatch(setUserId(id)),
});

const App = ({ userId, setUserId, userList, roomList, roomId, chatList }) => {
  const [isSession, setIsSession] = useState(false);

  useEffect(() => {
    getSessionUserId(setUserId, setIsSession);
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isSession) return;
  return (
    <>
      {userId === 0 ? (
        <Hello setIsSession={setIsSession} />
      ) : (
        <Main
          userId={userId}
          userList={userList}
          roomList={roomList}
          roomId={roomId}
          chatList={chatList}
        />
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
