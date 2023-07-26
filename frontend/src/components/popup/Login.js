import { React, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, register, reset } from "../../features/auth/authSlice";

import Spinner from "../Spinner";
import "../../css/Popup.css";
import "../../css/Login.css";

function Login({ mode, trigger, setPopup }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const { username, email, password, password2 } = formData;
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && trigger === "register") {
      toast.success("Your account has been registered");
      setPopup("none");
    } else if (isSuccess && trigger === "login") {
      toast.success("Login successful");
      setPopup("none");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, setPopup, trigger, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (trigger === "register" && password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        username,
        email,
        password,
      };

      if (trigger === "register") {
        dispatch(register(userData));
      } else if (trigger === "login") {
        dispatch(login(userData));
      }
    }
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    setPopup("none");
    toast.success("Logged out");
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (trigger === "login") {
    return (
      <div className="popup">
        <div className={`popup-inner ${mode}`}>
          <section className="form">
            <h3 className="form-group">Login</h3>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                placeholder="Username"
                onChange={onChange}
              />
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={onChange}
              />
              <button className={`fancy-button-${mode}`} type="submit">
                Login
              </button>
            </form>
          </section>

          <button
            className="change-option-btn"
            onClick={() => setPopup("register")}
          >
            Create an account
          </button>
          <div
            className={`close-popup-${mode}`}
            onClick={() => setPopup("none")}
          >
            <div className="close-line-1"></div>
            <div className="close-line-2"></div>
          </div>
        </div>
      </div>
    );
  } else if (trigger === "register") {
    return (
      <div className="popup">
        <div className={`popup-inner ${mode}`}>
          <section className="form">
            <h3 className="form-group">Register</h3>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                placeholder="Username"
                onChange={onChange}
              />
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={onChange}
              />
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={onChange}
              />
              <input
                type="password"
                id="password2"
                name="password2"
                value={password2}
                placeholder="Confirm Password"
                onChange={onChange}
              />
              <button className={`fancy-button-${mode}`} type="submit">
                Create Account
              </button>
            </form>
          </section>

          <button
            className="change-option-btn"
            onClick={() => setPopup("login")}
          >
            Already have an account?
          </button>
          <div
            className={`close-popup-${mode}`}
            onClick={() => setPopup("none")}
          >
            <div className="close-line-1"></div>
            <div className="close-line-2"></div>
          </div>
        </div>
      </div>
    );
  } else if (trigger === "logout") {
    return (
      <div className="popup">
        <div className={`popup-inner ${mode}`}>
          <h3>Logout</h3>
          <p>Are you sure you want to log out?</p>
          <div className="logout-buttons">
            <button className={`fancy-button-${mode}`} onClick={onLogout}>
              Yes
            </button>
            <button
              className="change-option-btn"
              onClick={() => setPopup("none")}
            >
              Cancel
            </button>
          </div>
          <div
            className={`close-popup-${mode}`}
            onClick={() => setPopup("none")}
          >
            <div className="close-line-1"></div>
            <div className="close-line-2"></div>
          </div>
        </div>
      </div>
    );
  } else {
    return "";
  }
}

export default Login;
