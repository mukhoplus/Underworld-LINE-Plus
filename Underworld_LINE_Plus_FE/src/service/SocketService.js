const SocketService = {
  socket: null,

  connect: (url) => {
    SocketService.socket = new WebSocket(url);

    SocketService.socket.onopen = () => {
      console.log("ㅎㅇ");
    };

    SocketService.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // 데이터 파싱(채팅방 목록, 채팅방)
      // 채팅방 목록 갱신
      // 채팅 목록 갱신
    };

    SocketService.socket.onclose = () => {};
  },

  send: (message) => {
    const data = JSON.parse(message);
    // 보내기
    SocketService.socket.send(data);
  },

  close: () => {
    console.log("ㅂㅂ");
    SocketService.socket.close();
  },
};

export default SocketService;
