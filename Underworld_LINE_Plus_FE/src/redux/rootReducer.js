const initialState = {
  userId: 0,
  userList: [],
  roomList: [],
  roomId: 0,
  chatList: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_ID":
      return { ...state, userId: action.payload };
    case "SET_USER_LIST":
      return { ...state, userList: action.payload };
    case "SET_ROOM_LIST":
      return { ...state, roomList: action.payload };
    case "SET_ROOM_ID":
      return { ...state, roomId: action.payload };
    case "SET_CHAT_LIST":
      return { ...state, chatList: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
