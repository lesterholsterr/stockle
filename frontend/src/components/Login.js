import { React, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "./Spinner";

import "../css/Popup.css";

function Login({ toggleMode, trigger, setPopup }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("You are now logged in");
      setPopup("none");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (trigger === "login") {
    return (
      <div className="popup">
        <div className="popup-inner">
          <h3>Login</h3>

          <section className="form">
            <form onSubmit={onSubmit}>
              <div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  placeholder="username"
                  onChange={onChange}
                />
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="password"
                  onChange={onChange}
                />
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </section>

          <button onClick={() => setPopup("register")}>
            Create an account
          </button>
          <button className="close-popup" onClick={() => setPopup("none")}>
            Close
          </button>
        </div>
      </div>
    );
  } else if (trigger === "register") {
    return (
      <div className="popup">
        <div className="popup-inner">
          <h3>Register</h3>
          <p>Register</p>
          <button className="close-popup" onClick={() => setPopup("none")}>
            Close
          </button>
        </div>
      </div>
    );
  } else {
    return "";
  }
}

export default Login;
