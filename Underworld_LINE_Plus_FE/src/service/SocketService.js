import store from "../redux/store";
import { isInNotReadMessages } from "../utils/MessageUtil";

const SocketService = {
  socket: null,

  connect: (url, setRoomList, setChatList) => {
    SocketService.socket = new WebSocket(url);

    SocketService.socket.onopen = () => {};

    SocketService.socket.onmessage = (event) => {
      const { userId, roomId } = store.getState();

      const data = JSON.parse(event.data);
      const { roomList, chatList } = data;

      setRoomList(roomList);

      if (roomId === 0) return;

      const recentlyRoomIdInChatList = roomList.length ? roomList[0].roomId : 0;
      if (roomId !== recentlyRoomIdInChatList) return;

      if (isInNotReadMessages(userId, chatList)) {
        SocketService.read(roomId, userId);
        return;
      }

      setChatList(chatList);
    };

    SocketService.socket.onclose = () => {};
  },

  send: (roomId, sendUserId, message) => {
    if (/^\s*$/.test(message)) return;

    const sendChatDto = {
      roomId,
      sendUserId,
      message,
    };

    const socketSendDto = {
      type: "chat",
      data: sendChatDto,
    };

    try {
      SocketService.socket.send(JSON.stringify(socketSendDto));
    } catch (error) {}
  },

  read: (roomId, readUserId) => {
    const sendChatDto = {
      roomId,
      sendUserId: readUserId,
      message: "",
    };

    const socketSendDto = {
      type: "read",
      data: sendChatDto,
    };

    try {
      SocketService.socket.send(JSON.stringify(socketSendDto));
    } catch (error) {}
  },

  close: () => {
    SocketService.socket.close();
  },
};

export default SocketService;
