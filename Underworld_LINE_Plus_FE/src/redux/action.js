export const setUserId = (userId) => ({
  type: "SET_USER_ID",
  payload: userId,
});

export const setRoomList = (roomList) => ({
  type: "SET_ROOM_LIST",
  payload: roomList,
});

export const setChatId = (chatId) => ({
  type: "SET_CHAT_ID",
  payload: chatId,
});

export const setChatList = (chatList) => ({
  type: "SET_CHAT_LIST",
  payload: chatList,
});
