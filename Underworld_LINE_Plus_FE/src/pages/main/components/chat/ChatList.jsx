import { axiosRequest } from "../../../../service/AxiosService";
import { Avatar } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getChatDate, getChatTime } from "../../../../utils/DateTimeUtil";
import { LongStringUtil } from "../../../../utils/LongStringUtil";

const ChatList = ({
  userId,
  chatList,
  roomId,
  setRoomId,
  roomList,
  setRoomList,
  setChatList,
  chatListRef,
  dateOutput,
}) => {
  const getRoomNameByRoomId = (roomList, roomId) => {
    const getRoomNameInRoomList = (roomList, roomId) => {
      return roomList.find((room) => room.roomId === roomId);
    };

    if (roomId === 0) return "";
    const data = getRoomNameInRoomList(roomList, roomId);

    if (!data) {
      const newData = axiosRequest("get", `/room/list/${userId}`).then(
        (response) => {
          setRoomList(response.data);
          return getRoomNameInRoomList(response.data, roomId);
        }
      );

      return newData.roomName || "";
    }

    return data.roomName;
  };

  const isChatDateInDateOutput = (date) => {
    return dateOutput.hasOwnProperty(getChatDate(date));
  };

  const handleChatDate = (date) => {
    const chatDate = getChatDate(date);

    dateOutput[chatDate] = true;
    return chatDate;
  };

  const handleBack = () => {
    setRoomId(0);
    setChatList([]);
  };

  return (
    <>
      <div className="info-bar">
        <ArrowLeftOutlined
          className="icon"
          style={{
            paddingLeft: "10px",
          }}
          onClick={handleBack}
        />
        <span className="room-name">
          {LongStringUtil(getRoomNameByRoomId(roomList, roomId), 20)}
        </span>
      </div>
      <div id="chat-list" ref={chatListRef} className="custom-scroll chat-list">
        {chatList.map((chat, index) => (
          <div className="chat-line" key={`chat-${index}`}>
            {!isChatDateInDateOutput(chat.sendAt) && (
              <div className="date-line" key={`date-${index}`}>
                <span className="chat-date">{handleChatDate(chat.sendAt)}</span>
              </div>
            )}
            <div
              id={`line-${index}`}
              key={`line-${index}`}
              style={{
                alignSelf:
                  chat.sendUserId === userId ? "flex-end" : "flex-start",
                maxWidth: "80%",
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
                    minWidth: "20%",
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
                  maxWidth: chat.sendUserId === userId ? "71%" : "65%",
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
                    minWidth: "20%",
                  }}
                >
                  {chat.notRead !== 0 && chat.notRead}
                  <br />
                  {getChatTime(chat.sendAt)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatList;
