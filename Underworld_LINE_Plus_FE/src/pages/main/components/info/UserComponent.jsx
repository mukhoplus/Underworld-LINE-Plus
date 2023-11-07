import { useState, useEffect } from "react";
import { Row, Col, Table, Badge, Avatar } from "antd";
import { axiosRequest } from "../../../../service/AxiosService";

const UserComponent = ({ userId, userList, setRoomId }) => {
  const [myInfo, setMyInfo] = useState({});
  const [friendInfo, setFriendInfo] = useState([]);

  const getMyInfo = () => {
    return userList.find((item) => item.userId === userId);
  };

  const getFriendInfo = () => {
    return userList.filter((item) => item.userId !== userId);
  };

  const handleUserList = () => {
    if (userList.length === 0) return;

    setMyInfo(getMyInfo());
    setFriendInfo(getFriendInfo());
  };

  const handleChatIdToRoomId = async (userId) => {
    axiosRequest("get", `/room/user/${userId}`).then((response) => {
      setRoomId(response.data);
    });
  };

  useEffect(() => {
    handleUserList();
  }, [userList]);

  const columns = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
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
  ];

  return (
    <>
      <Row>
        <Col>
          <Table
            dataSource={[{ ...myInfo }, ...friendInfo]}
            columns={columns}
            showHeader={false}
            pagination={false}
            rowKey="userId"
            onRow={(record) => ({
              onDoubleClick: () => handleChatIdToRoomId(record.userId),
            })}
          />
        </Col>
      </Row>
    </>
  );
};

export default UserComponent;
