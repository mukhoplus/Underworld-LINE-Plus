import { useState, useEffect } from "react";
import { List, Input, Button, Avatar } from "antd";
import { SocketService } from "../../../service/SocketService";
import { axiosRequest } from "../../../service/AxiosService";

const ChatComponent = ({
  userId,
  roomId,
  setRoomId,
  chatList,
  setChatList,
}) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage) {
      setInputMessage("");
    }
  };

  const handleChatList = () => {
    if (roomId === 0) return;

    axiosRequest("get", `/chat/${roomId}`).then((response) => {
      setChatList(response.data);
    });
  };

  useEffect(() => {
    handleChatList();
  }, [roomId]);

  return (
    <>
      <div>
        {roomId === 0 ? (
          <>빈화면</>
        ) : (
          <>
            <div
              style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}
            >
              <List
                dataSource={chatList}
                renderItem={(chat) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar />}
                      title={chat.send_user_id}
                      description={chat.message}
                    />
                  </List.Item>
                )}
              />
              <div style={{ display: "flex" }}>
                <Input
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={handleInputChange}
                />
                <Button type="primary" onClick={handleSendMessage}>
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
