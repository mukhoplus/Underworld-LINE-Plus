const SocketService = {
  socket: null,

  connect: (url, setRoomList, setChatList) => {
    SocketService.socket = new WebSocket(url);

    SocketService.socket.onopen = () => {};

    SocketService.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { roomList, chatList } = data;

      setRoomList(roomList);
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

export default SocketService;
