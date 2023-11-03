import { useEffect } from "react";
import { Row, Col, Table, Badge } from "antd";

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
      render: (text) => {
        const maxLength = 10;
        return text.length > maxLength
          ? `${text.slice(0, maxLength)}...`
          : text;
      },
    },

    {
      title: "안 읽은 메시지 수",
      dataIndex: "notReadCount",
      key: "notReadCount",
      render: (notReadCount) => <Badge count={notReadCount} showZero></Badge>,
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
            rowKey="roomId"
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
