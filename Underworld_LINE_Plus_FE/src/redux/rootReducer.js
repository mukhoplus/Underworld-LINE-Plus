const initialState = {
  userId: 0,
  roomList: [],
  chatId: 0,
  chatList: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_ID":
      return { ...state, userId: action.payload };
    case "SET_ROOM_LIST":
      return { ...state, roomList: action.payload };
    case "SET_CHAT_ID":
      return { ...state, chatId: action.payload };
    case "SET_CHAT_LIST":
      return { ...state, chatList: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
