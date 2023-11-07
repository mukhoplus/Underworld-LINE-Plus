import { useEffect } from "react";
import { Row, Col, Table, Avatar, Badge } from "antd";
import { getRoomDateTime } from "../../../../service/DateTimeService";

const RoomComponent = ({ userId, setRoomId, roomList, handleRoomList }) => {
  useEffect(() => {
    handleRoomList();
  }, []);

  const columns = [
    {
      title: "이름",
      dataIndex: "roomName",
      key: "roomName",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar style={{ marginRight: "6px" }} />
          {record.userId === userId ? (
            <>
              <Badge count="나" style={{ backgroundColor: "#06c755" }} />
              <span style={{ margin: "0 4px" }}>{text}</span>
            </>
          ) : (
            <>{text}</>
          )}
        </div>
      ),
    },
    {
      title: "수정 시간",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => {
        return getRoomDateTime(updatedAt);
      },
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
      render: (notReadCount) => <Badge count={notReadCount} />,
    },
  ];

  return (
    <>
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
