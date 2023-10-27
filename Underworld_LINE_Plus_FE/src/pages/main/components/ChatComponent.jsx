const ChatComponent = ({
  userId,
  chatId,
  setChatId,
  chatList,
  setChatList,
}) => {
  return (
    <>
      <div>{chatId === 0 ? <>빈화면</> : <>채팅창</>}</div>
    </>
  );
};

export default ChatComponent;
