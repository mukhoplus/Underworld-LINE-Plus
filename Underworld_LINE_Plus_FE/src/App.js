import React from "react";
import { connect } from "react-redux";
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

const App = ({ userId, roomList, chatId, chatList }) => {
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

export default connect(mapStateToProps)(App);
