export const setUserId = (userId) => ({
  type: "SET_USER_ID",
  payload: userId,
});

export const setUserList = (userList) => ({
  type: "SET_USER_LIST",
  payload: userList,
});

export const setRoomList = (roomList) => ({
  type: "SET_ROOM_LIST",
  payload: roomList,
});

export const setRoomId = (roomId) => ({
  type: "SET_ROOM_ID",
  payload: roomId,
});

export const setChatList = (chatList) => ({
  type: "SET_CHAT_LIST",
  payload: chatList,
});
