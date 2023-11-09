import RoomInfo from "./RoomInfo";

const RoomComponent = ({ userId, setRoomId, roomList }) => {
  return (
    <>
      <RoomInfo userId={userId} roomList={roomList} setRoomId={setRoomId} />
    </>
  );
};

export default RoomComponent;
