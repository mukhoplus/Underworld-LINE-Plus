const SignupComponent = ({ setPage, setUserId }) => {
  const handleLogin = () => {
    setPage(0);
  };

  return (
    <>
      회원가입
      <button onClick={() => setUserId(1)}>회원가입인것</button>
      <button onClick={handleLogin}>뒤로가기</button>
    </>
  );
};

export default SignupComponent;
