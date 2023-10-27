const LoginComponent = ({ setPage, setUserId, setIsSession }) => {
  const handleSignup = () => {
    setPage(1);
  };

  return (
    <>
      로그인
      <button onClick={() => setUserId(1)}>로그인인것</button>
      <button onClick={handleSignup}>회원가입</button>
    </>
  );
};

export default LoginComponent;
