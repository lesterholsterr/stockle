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
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const { username, email, password, password2 } = formData;
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    if (isError && typeof message === "object") {
      setFieldErrors((prev) => ({
        ...prev,
        ...message,
      }));
    } else if (isError && typeof message === "string") {
      toast.error(message);
    } else if (isSuccess && trigger === "register") {
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
    setFieldErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let newErrors = {
      username: "",
      email: "",
      password: "",
      password2: "",
    };
    let hasErrors = false;

    if (!username) {
      newErrors.username = "Username is required";
      hasErrors = true;
    }
    if (!password) {
      newErrors.password = "Password is required";
      hasErrors = true;
    }
    if (trigger === "register") {
      if (!email) {
        newErrors.email = "Email is required";
        hasErrors = true;
      } else if (!isValidEmail(email)) {
        newErrors.email = "Invalid email format";
        hasErrors = true;
      }

      if (password !== password2) {
        newErrors.password2 = "Passwords do not match";
        hasErrors = true;
      }
    }

    setFieldErrors(newErrors);

    if (!hasErrors) {
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
        <div className={`popup-inner ${mode} login-container`}>
          <section className="form">
            <h1 className="form-group">Login</h1>
            <form onSubmit={onSubmit}>
              <div>
                <div className="label">
                  <div>Username </div>
                  <div className="error-message">{fieldErrors.username}</div>
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  placeholder="Username"
                  onChange={onChange}
                  className={`${fieldErrors.username ? "input-error" : ""}`}
                />
              </div>
              <div>
                <div className="label">
                  <div>Password </div>
                  <div className="error-message">{fieldErrors.password}</div>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={onChange}
                  className={`${fieldErrors.password ? "input-error" : ""}`}
                />
              </div>
              <button className={`fancy-button-${mode}`} type="submit">
                Login
              </button>
            </form>
          </section>

          <button
            className="underline-btn"
            onClick={() => setPopup("register")}
          >
            Don't have an account?
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
        <div className={`popup-inner ${mode} login-container`}>
          <section className="form">
            <h1 className="form-group">Register</h1>
            <form onSubmit={onSubmit}>
              <div>
                <div className="label">
                  <div>Username </div>
                  <div className="error-message">{fieldErrors.username}</div>
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  placeholder="Username"
                  onChange={onChange}
                  className={`${fieldErrors.username ? "input-error" : ""}`}
                />
              </div>
              <div>
                <div className="label">
                  <div>Email </div>
                  <div className="error-message">{fieldErrors.email}</div>
                </div>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={onChange}
                  className={`${fieldErrors.email ? "input-error" : ""}`}
                />
              </div>
              <div>
                <div className="label">
                  <div>Password </div>
                  <div className="error-message">{fieldErrors.password}</div>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={onChange}
                  className={`${fieldErrors.password ? "input-error" : ""}`}
                />
              </div>
              <div>
                <div className="label">
                  <div>Confirm Password </div>
                  <div className="error-message">{fieldErrors.password2}</div>
                </div>
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  value={password2}
                  placeholder="Confirm Password"
                  onChange={onChange}
                  className={`${fieldErrors.password2 ? "input-error" : ""}`}
                />
              </div>
              <button className={`fancy-button-${mode}`} type="submit">
                Create Account
              </button>
            </form>
          </section>

          <button className="underline-btn" onClick={() => setPopup("login")}>
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
          <h1>Logout</h1>
          <p>Are you sure you want to log out?</p>
          <div className="logout-buttons">
            <button className={`fancy-button-${mode}`} onClick={onLogout}>
              Yes
            </button>
            <button className="underline-btn" onClick={() => setPopup("none")}>
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
