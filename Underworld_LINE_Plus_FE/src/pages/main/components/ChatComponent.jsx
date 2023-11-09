import { useState, useEffect, useRef } from "react";
import { Input, Button, Avatar } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import SocketService from "../../../service/SocketService";
import { axiosRequest } from "../../../service/AxiosService";
import { getChatDate, getChatTime } from "../../../utils/DateTimeUtil";
import { LongStringUtil } from "../../../utils/LongStringUtil";
import "./css/ChatComponent.css";

const ChatComponent = ({
  userId,
  roomId,
  setRoomId,
  chatList,
  roomList,
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

  const getRoomNameByRoomId = (roomList, roomId) => {
    if (roomId === 0) return "";
    const data = roomList.find((room) => room.roomId === roomId);

    if (!data) return "";
    return data.roomName;
  };

  useEffect(() => {
    setInputMessage("");
    handleChatList();

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
          <>
            <div className="chat-component">
              <div
                className="chat-list"
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <img
                  src="/images/chat_blank.png"
                  alt="새 채팅을 시작해보세요."
                  style={{
                    paddingTop: "84px",
                    width: "131px",
                    height: "137px",
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="chat-component">
              <div className="info-bar">
                <Button className="btn" onClick={() => setRoomId(0)}>
                  <ArrowLeftOutlined className="icon" />
                </Button>
                <span className="room-name">
                  {LongStringUtil(getRoomNameByRoomId(roomList, roomId), 16)}
                </span>
              </div>
              <div
                id="chat-list"
                ref={chatListRef}
                className="custom-scroll chat-list"
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
                          chat.sendUserId === userId
                            ? "flex-end"
                            : "flex-start",
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatComponent;
