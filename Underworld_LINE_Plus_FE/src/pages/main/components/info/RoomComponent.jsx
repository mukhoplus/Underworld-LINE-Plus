import { useEffect } from "react";
import { Row, Col, Table } from "antd";

const RoomComponent = ({ userId, setRoomId, roomList, handleRoomList }) => {
  useEffect(() => {
    handleRoomList();
  }, []);

  const columns = [
    {
      title: "이름",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "수정 시간",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "마지막 메시지",
      dataIndex: "lastMessage" || "",
      key: "lastMessage",
    },

    {
      title: "안 읽은 메시지 수",
      dataIndex: "notReadCount",
      key: "notReadCount",
    },
  ];
  return (
    <>
      <div>채팅방 목록</div>
      <Row>
        <Col>
          <Table
            dataSource={[...roomList]}
            columns={columns}
            showHeader={false}
            pagination={false}
            onRow={(record) => ({
              onDoubleClick: () => setRoomId(record.roomId),
            })}
          />
        </Col>
      </Row>
    </>
  );
};

export default RoomComponent;
