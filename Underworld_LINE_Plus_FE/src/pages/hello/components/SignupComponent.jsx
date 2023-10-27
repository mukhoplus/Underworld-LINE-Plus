import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { warningModal } from "../../../service/ModalService";
import { getSessionUserId } from "../../../service/SessionService";
import { axiosRequest } from "../../../service/AxiosService";

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

  const handleIdOnChenge = (event) => {
    setId(event.target.value);
  };

  const handlePasswordOnChenge = (event) => {
    setPassword(event.target.value);
  };

  const handleNameOnChenge = (event) => {
    setName(event.target.value);
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

  const handleLogin = () => {
    setPage(0);
  };

  return (
    <>
      <Form>
        <Form.Item
          label="아이디"
          name="아이디"
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
            placeholder="아이디"
            onChange={handleIdOnChenge}
            maxLength={20}
          />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name="비밀번호"
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
                    "8~16자의 영어 대/소문자, 숫자, 특수문자만 사용 가능합니다."
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
            placeholder="비밀번호"
            onChange={handlePasswordOnChenge}
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
        <Form.Item
          label="이름"
          name="이름"
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
                    "1~40자의 한글, 영문 대/소문자를 사용해 주세요. (특수기호, 공백 사용 불가)"
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
            placeholder="이름"
            onChange={handleNameOnChenge}
            maxLength={40}
          />
        </Form.Item>
        <Form.Item>
          <Button onClick={handleLogin}>뒤로가기</Button>
          <Button type="primary" onClick={handleSignup}>
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignupComponent;
