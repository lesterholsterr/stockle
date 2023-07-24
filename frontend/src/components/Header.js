import {
  FaCog,
  FaChartBar,
  FaQuestionCircle,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";

function Header({ mode, setPopup }) {
  const { user } = useSelector((state) => state.auth);

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
            <button onClick={() => setPopup("logout")}>
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
