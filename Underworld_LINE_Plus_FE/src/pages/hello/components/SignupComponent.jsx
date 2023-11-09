import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  IdcardOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { warningModal } from "../../../utils/ModalUtil";
import { getSessionUserId } from "../../../service/SessionService";
import { axiosRequest } from "../../../service/AxiosService";
import "../css/HelloComponent.css";

const SignupComponent = ({ setPage, setUserId, setIsSession }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isIdOk, setIsIdOk] = useState(false);
  const [isPasswordOk, setIsPasswordOk] = useState(false);
  const [isNameOk, setIsNameOk] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignup = async () => {
    if (!(isIdOk && isPasswordOk && isNameOk)) {
      await warningModal("알림", "입력한 정보를 다시 확인해주세요.");
      return;
    }

    const postData = {
      id: id,
      password: password,
      name: name,
    };

    axiosRequest("post", "/user/signup", postData).then(async () => {
      await getSessionUserId(setUserId, setIsSession);
      setPage(0);
    });
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSignup();
    }
  };

  return (
    <>
      <Form className="signup-form">
        <h1 style={{ textAlign: "center", color: "#06c755" }}>회원가입</h1>
        <Form.Item
          name="id"
          rules={[
            {
              validator: async (rule, value) => {
                if (value.length === 0) {
                  setIsIdOk(false);
                  return Promise.reject("아이디를 입력해주세요.");
                }

                if (!/^[a-z0-9_-]{5,20}$/.test(value)) {
                  setIsIdOk(false);
                  return Promise.reject(
                    "5-20자의 영어 소문자, 숫자, _, -만 사용 가능합니다."
                  );
                }

                await axios.get(`/user/name/${value}`).then((response) => {
                  if (!response.data) {
                    setIsIdOk(true);
                    return Promise.resolve();
                  } else {
                    setIsIdOk(false);
                    return Promise.reject("사용할 수 없는 아이디입니다.");
                  }
                });
              },
            },
          ]}
        >
          <Input
            prefix={<IdcardOutlined />}
            placeholder="아이디"
            onChange={(event) => setId(event.target.value)}
            maxLength={20}
            onKeyPress={handleEnterKey}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              validator: (rule, value) => {
                if (value.length === 0) {
                  setIsPasswordOk(false);
                  return Promise.reject("비밀번호를 입력해주세요.");
                }

                if (!/^[a-zA-Z0-9_\-!@#$%^&*]{8,16}$/.test(value)) {
                  setIsPasswordOk(false);
                  return Promise.reject(
                    "8-16자의 영어, 숫자, 특수문자만 사용 가능합니다."
                  );
                }

                const hasEnglish = /[a-zA-Z]/.test(value);
                const hasNumber = /[0-9]/.test(value);
                const hasSpecialCharacter = /[_\-!@#$%^&*]/.test(value);

                if (!hasEnglish || !hasNumber || !hasSpecialCharacter) {
                  setIsPasswordOk(false);
                  return Promise.reject(
                    "영어, 숫자, 특수문자가 각각 1자 이상씩 있어야 합니다."
                  );
                }

                setIsPasswordOk(true);
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            type={passwordVisible ? "text" : "password"}
            prefix={<LockOutlined />}
            placeholder="비밀번호"
            onChange={(event) => setPassword(event.target.value)}
            maxLength={16}
            onKeyPress={handleEnterKey}
            suffix={
              passwordVisible ? (
                <EyeOutlined onClick={togglePasswordVisibility} />
              ) : (
                <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
              )
            }
          />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[
            {
              validator: async (rule, value) => {
                if (value.length === 0) {
                  setIsNameOk(false);
                  return Promise.reject("이름를 입력해주세요.");
                }

                if (!/^[가-힣A-Za-z]{1,40}$/.test(value)) {
                  setIsNameOk(false);
                  return Promise.reject(
                    "1~40자의 한글, 영문 대/소문자를 사용해 주세요."
                  );
                }

                await axios.get(`/user/name/${value}`).then((response) => {
                  if (!response.data) {
                    setIsNameOk(true);
                    return Promise.resolve();
                  } else {
                    setIsNameOk(false);
                    return Promise.reject("사용할 수 없는 이름입니다.");
                  }
                });
              },
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="이름"
            onChange={(event) => setName(event.target.value)}
            maxLength={40}
            onKeyPress={handleEnterKey}
          />
        </Form.Item>
        <Form.Item className="form-btn">
          <Button
            className="hello-btn"
            style={{ border: "1px solid lightgray" }}
            onClick={() => setPage(0)}
          >
            뒤로가기
          </Button>
          <Button
            type="primary"
            className="hello-btn"
            style={{ backgroundColor: "#06c755", marginLeft: "60px" }}
            onClick={handleSignup}
          >
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignupComponent;
