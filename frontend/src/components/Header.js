import {
  FaCog,
  FaChartBar,
  FaQuestionCircle,
  FaSignInAlt,
} from "react-icons/fa";

function Header({ mode, setPopup }) {
  return (
    <header className={`header-${mode}`}>
      <h1>Stockle</h1>

      <button
        className="header-button-1"
        onClick={() => setPopup("instructions")}
      >
        <FaQuestionCircle />
      </button>
      <button onClick={() => setPopup("statistics")}>
        <FaChartBar />
      </button>
      <button onClick={() => setPopup("settings")}>
        <FaCog />
      </button>
      <button onClick={() => setPopup("login")}>
        <FaSignInAlt /> <p>Login</p>
      </button>
    </header>
  );
}

export default Header;
