import {
  FaCog,
  FaChartBar,
  FaQuestionCircle,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header({ mode, setPopup }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <header className={`header-${mode}`}>
      <h1>Stockle</h1>

      <div className="menu-buttons">
        <button onClick={() => setPopup("instructions")}>
          <FaQuestionCircle />
        </button>
        <button onClick={() => setPopup("statistics")}>
          <FaChartBar />
        </button>
        <button onClick={() => setPopup("settings")}>
          <FaCog />
        </button>
        {user ? (
          <>
            <button onClick={onLogout}>
              <FaSignOutAlt /> <p>Logout</p>
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setPopup("login")}>
              <FaSignInAlt /> <p>Login</p>
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
