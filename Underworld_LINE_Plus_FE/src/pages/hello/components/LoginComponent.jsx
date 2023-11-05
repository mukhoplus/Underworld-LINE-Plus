import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { warningModal, errorModal } from "../../../service/ModalService";
import { getSessionUserId } from "../../../service/SessionService";
import { axiosRequest } from "../../../service/AxiosService";

const LoginComponent = ({ setPage, setUserId, setIsSession }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    if (!id || !password) {
      await warningModal("알림", "아이디와 비밀번호를 입력해주세요.");
      return;
    }

    const postData = {
      id: id,
      password: password,
    };

    axiosRequest("post", `/user/login`, postData).then(async (response) => {
      if (response.data === "401 UNAUTHORIZED") {
        await errorModal(
          "로그인 실패",
          "아이디 또는 비밀번호가 일치하지 않습니다."
        );
        return;
      }

      if (response.data === "409 CONFLICT") {
        await errorModal("로그인 실패", "다른 환경에서 이미 로그인 중입니다.");
        return;
      }

      await getSessionUserId(setUserId, setIsSession);
      setPage(0);
    });
  };

  return (
    <>
      <h3>로그인</h3>
      <Form labelCol={6} wrapperCol={12} style={{ width: "500px" }}>
        <Form.Item label="아이디" name="id">
          <Input
            placeholder="아이디"
            onChange={(event) => setId(event.target.value)}
            maxLength={20}
          />
        </Form.Item>
        <Form.Item label="비밀번호" name="password">
          <Input
            type={passwordVisible ? "text" : "password"}
            placeholder="비밀번호"
            onChange={(event) => setPassword(event.target.value)}
            maxLength={16}
            suffix={
              passwordVisible ? (
                <EyeOutlined onClick={togglePasswordVisibility} />
              ) : (
                <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
              )
            }
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            style={{ backgroundColor: "#06c755" }}
            onClick={handleLogin}
          >
            로그인
          </Button>
          <Button onClick={() => setPage(1)}>회원가입</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginComponent;
