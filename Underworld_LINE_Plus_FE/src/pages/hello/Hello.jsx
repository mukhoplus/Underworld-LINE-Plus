import { useState } from "react";
import { connect } from "react-redux";
import { setUserId } from "../../redux/action";
import LoginComponent from "./components/LoginComponent";
import SignupComponent from "./components/SignupComponent";
import "../css/Main.css";

const mapDispatchToProps = (dispatch) => ({
  setUserId: (id) => dispatch(setUserId(id)),
});

const Hello = ({ setUserId, setIsSession }) => {
  const [page, setPage] = useState(0);
  return (
    <>
      <div className="component">
        {page === 0 ? (
          <LoginComponent
            setPage={setPage}
            setUserId={setUserId}
            setIsSession={setIsSession}
          />
        ) : (
          <SignupComponent
            setPage={setPage}
            setUserId={setUserId}
            setIsSession={setIsSession}
          />
        )}
      </div>
    </>
  );
};

export default connect(null, mapDispatchToProps)(Hello);
