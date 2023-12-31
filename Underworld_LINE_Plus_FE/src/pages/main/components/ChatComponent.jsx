import { useState, useEffect, useRef } from "react";
import { Input, Button } from "antd";
import SocketService from "../../../service/SocketService";
import { axiosRequest } from "../../../service/AxiosService";
import { isInNotReadMessages } from "../../../utils/MessageUtil";
import ChatBlank from "./chat/ChatBlank";
import ChatList from "./chat/ChatList";
import "./css/ChatComponent.css";

const ChatComponent = ({
  userId,
  roomId,
  setRoomId,
  chatList,
  roomList,
  setRoomList,
  setChatList,
}) => {
  const [inputMessage, setInputMessage] = useState("");
  const chatListRef = useRef(null);
  let dateOutput = {};

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const sendMessageValidation = () => {
    return !/^\s*$/.test(inputMessage);
  };

  const handleSendMessage = () => {
    if (sendMessageValidation()) {
      const trimMessage = inputMessage.trim();

      SocketService.send(roomId, userId, trimMessage);
      setInputMessage("");
    }
  };

  const handleChatList = async () => {
    if (roomId === 0) return;

    await axiosRequest("get", `/chat/${roomId}`)
      .then((response) => {
        const newChatList = response.data;

        if (isInNotReadMessages(userId, newChatList)) {
          SocketService.read(roomId, userId);
          return;
        }

        setChatList(newChatList);
      })
      .catch(() => {});
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        setInputMessage((prevMessage) => prevMessage + "\n");
      } else {
        handleSendMessage();
      }
      e.preventDefault();
    }
  };

  useEffect(() => {
    setInputMessage("");
    dateOutput = {}; // eslint-disable-line react-hooks/exhaustive-deps
    handleChatList();

    if (chatListRef.current) {
      const element = document.getElementById("chat-list");
      element.scrollTop = element.scrollHeight;
    }
  }, [roomId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (chatListRef.current) {
      const element = document.getElementById("chat-list");
      element.scrollTop = element.scrollHeight;
    }
  }, [chatList]);

  return (
    <>
      <div>
        {roomId === 0 ? (
          <ChatBlank />
        ) : (
          <>
            <div className="chat-component">
              <ChatList
                userId={userId}
                chatList={chatList}
                roomId={roomId}
                setRoomId={setRoomId}
                roomList={roomList}
                setRoomList={setRoomList}
                setChatList={setChatList}
                chatListRef={chatListRef}
                dateOutput={dateOutput}
              />
              <div style={{ display: "flex", margin: "1px 0px" }}>
                <Input.TextArea
                  id="chat-input"
                  placeholder=""
                  value={inputMessage}
                  onChange={handleInputChange}
                  style={{ flex: "1", marginRight: "10px" }}
                  autoSize={{ minRows: 1, maxRows: 1 }}
                  onKeyPress={handleEnterKey}
                />
                <Button
                  className="submit-btn"
                  type="primary"
                  onClick={handleSendMessage}
                  disabled={!sendMessageValidation()}
                >
                  전송
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatComponent;
