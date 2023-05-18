import settingsCog from '../images/settings.png'
import instructions from '../images/help.png'
import statistics from '../images/stats.png'

function Header({mode, setPopup}) {
  return (
    <header className={`header-${mode}`}>
      <h1>Stockle</h1>
      <img 
        src={instructions} alt="" 
        className='header-button-1' 
        onClick={() => setPopup('instructions')}
      />
      <img 
        src={statistics} alt=""
        onClick={() => setPopup('statistics')}
      />
      <img 
        src={settingsCog} alt="" 
        onClick={() => setPopup('settings')}
      />
    </header>
  );
}

export default Header;
