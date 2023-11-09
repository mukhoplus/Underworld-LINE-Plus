import { useEffect } from "react";
import RoomInfo from "./RoomInfo";

const RoomComponent = ({ userId, setRoomId, roomList, handleRoomList }) => {
  useEffect(() => {
    handleRoomList();
  }, []);

  return (
    <>
      <RoomInfo userId={userId} roomList={roomList} setRoomId={setRoomId} />
    </>
  );
};

export default RoomComponent;
