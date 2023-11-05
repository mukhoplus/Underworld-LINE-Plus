import { useState, useEffect, useRef } from "react";
import { Input, Button, Avatar } from "antd";
import SocketService from "../../../service/SocketService";
import { axiosRequest } from "../../../service/AxiosService";
import { getChatDate, getChatTime } from "../../../service/DateTimeService";
import "./css/ChatComponent.css";

const ChatComponent = ({
  userId,
  roomId,
  setRoomId,
  chatList,
  setChatList,
}) => {
  const [inputMessage, setInputMessage] = useState("");
  const chatListRef = useRef(null);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (!/^[a-z0-9_-]{5,20}$/.test(inputMessage)) {
      const trimMessage = inputMessage.trim();

      SocketService.send(roomId, userId, trimMessage);
      setInputMessage("");
    }
  };

  const handleChatList = () => {
    if (roomId === 0) return;

    axiosRequest("get", `/chat/${roomId}`).then((response) => {
      setChatList(response.data);
    });

    SocketService.read(roomId, userId);
  };

  useEffect(() => {
    handleChatList();
    setInputMessage("");

    if (chatListRef.current) {
      const element = document.getElementById("chat-list");
      element.scrollTop = element.scrollHeight;
    }
  }, [roomId]);

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
          <>빈화면</>
        ) : (
          <>
            <div
              id="chat-list"
              ref={chatListRef}
              className="custom-scroll"
              style={{
                maxWidth: "400px",
                width: "400px",
                height: "500px",
                margin: "0 auto",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                scrollBehavior: "auto",
              }}
            >
              {chatList.map((chat, index) => (
                <div
                  id={`line-${index}`}
                  key={`line-${index}`}
                  style={{
                    alignSelf:
                      chat.sendUserId === userId ? "flex-end" : "flex-start",
                    maxWidth: "70%",
                    display: "inline-flex",
                    alignItems: "flex-end",
                  }}
                >
                  {chat.sendUserId !== userId && (
                    <div style={{ paddingBottom: "5px" }}>
                      <Avatar />
                    </div>
                  )}
                  {chat.sendUserId === userId && (
                    <p
                      style={{
                        margin: 0,
                        paddingBottom: "5px",
                        textAlign: "right",
                        minWidth: "30%",
                      }}
                    >
                      {chat.notRead !== 0 && chat.notRead}
                      <br />
                      {getChatTime(chat.sendAt)}
                    </p>
                  )}
                  <div
                    id={`message-${index}`}
                    key={`message-${index}`}
                    style={{
                      alignSelf:
                        chat.sendUserId === userId ? "flex-end" : "flex-start",
                      margin: "5px",
                      padding: "10px",
                      maxWidth: chat.sendUserId === userId ? "59%" : "55%",
                      background:
                        chat.sendUserId === userId ? "#06c755" : "#e0e0e0",
                      color: chat.sendUserId === userId ? "white" : "black",
                      borderRadius: "8px",
                      whiteSpace: "pre-wrap",
                      overflowWrap: "break-word",
                    }}
                  >
                    {chat.message}
                  </div>
                  {chat.sendUserId !== userId && (
                    <p
                      style={{
                        margin: 0,
                        paddingBottom: "5px",
                        textAlign: "left",
                        minWidth: "30%",
                      }}
                    >
                      {chat.notRead !== 0 && chat.notRead}
                      <br />
                      {getChatTime(chat.sendAt)}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div style={{ display: "flex" }}>
              <Input.TextArea
                placeholder=""
                value={inputMessage}
                onChange={handleInputChange}
                style={{ flex: "1", marginRight: "10px" }}
                autoSize={{ minRows: 1, maxRows: 10 }}
              />
              <Button
                type="primary"
                style={{ backgroundColor: "#06c755" }}
                onClick={handleSendMessage}
              >
                전송
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatComponent;
