import {
  FaCog,
  FaChartBar,
  FaQuestionCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaWrench,
} from "react-icons/fa";
import { useSelector } from "react-redux";

function Header({ mode, setPopup }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className={`header-${mode}`}>
      <div className="filler"></div>
      <h1>Stockle</h1>
      <div className="menu-buttons">
      <button onClick={() => setPopup("alpha")}>
          <FaWrench />
        </button>
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
