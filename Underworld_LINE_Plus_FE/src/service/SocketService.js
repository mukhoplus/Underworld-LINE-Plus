import store from "../redux/store";

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

      const roomIdInChatList = roomList.length ? roomList[0].roomId : 0;
      if (roomId !== roomIdInChatList) return;

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

    SocketService.socket.send(JSON.stringify(socketSendDto));
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

    SocketService.socket.send(JSON.stringify(socketSendDto));
  },

  close: () => {
    SocketService.socket.close();
  },
};

const isInNotReadMessages = (userId, newMessages) => {
  return newMessages.some(
    (message) => message.notRead === 1 && message.sendUserId !== userId
  );
};

export default SocketService;
