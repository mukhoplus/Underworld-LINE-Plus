import { useState } from "react";
import UserComponent from "./info/UserComponent";
import RoomComponent from "./info/RoomComponent";

const InfoComponent = ({ userId, roomList, setRoomList }) => {
  const [menu, setMenu] = useState(0);

  return (
    <>
      <div>
        <button onClick={() => setMenu(0)}>사용자 정보</button>
        <button onClick={() => setMenu(1)}>채팅방 목록</button>
      </div>
      {menu === 0 ? (
        <UserComponent userId={userId} />
      ) : (
        <RoomComponent roomList={roomList} setRoomList={setRoomList} />
      )}
    </>
  );
};

export default InfoComponent;
