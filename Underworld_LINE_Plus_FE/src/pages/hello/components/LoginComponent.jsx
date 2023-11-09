import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  IdcardOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { warningModal, errorModal } from "../../../utils/ModalUtil";
import { getSessionUserId } from "../../../service/SessionService";
import { axiosRequest } from "../../../service/AxiosService";
import "../css/HelloComponent.css";

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
      <Form className="login-form">
        <h1 style={{ textAlign: "center", color: "#06c755" }}>
          Underworld-LINE
        </h1>
        <Form.Item name="id">
          <Input
            prefix={<IdcardOutlined />}
            placeholder="아이디"
            onChange={(event) => setId(event.target.value)}
            maxLength={20}
          />
        </Form.Item>
        <Form.Item name="password">
          <Input
            type={passwordVisible ? "text" : "password"}
            prefix={<LockOutlined />}
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
        <Form.Item className="form-btn">
          <Button
            type="primary"
            className="hello-btn"
            style={{ backgroundColor: "#06c755", marginRight: "60px" }}
            onClick={handleLogin}
          >
            로그인
          </Button>
          <Button
            className="hello-btn"
            style={{ border: "1px solid lightgray" }}
            onClick={() => setPage(1)}
          >
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginComponent;
