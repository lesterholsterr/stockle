import '../css/Popup.css'
import { useContext } from 'react'
import { AppContext } from '../App'


function Popup ({toggleMode, trigger, setPopup}) {
  const { currAttempt, todayStock } = useContext(AppContext)

  if (trigger === 'instructions') {
    return (
      <div className="popup">
      <div className="popup-inner">
        <h3>Instructions</h3>
        <p>Figure it out yourself</p>
        <button 
          className='close-popup'
          onClick={() => setPopup('none')}>
          Close
        </button>
      </div>
    </div>
    )
  } else if (trigger === 'statistics') {
    return (
      <div className="popup">
      <div className="popup-inner">
        <h3>Statistics</h3>
        <p>Coming Soon</p>
        <button 
          className='close-popup'
          onClick={() => setPopup('none')}>
          Close
        </button>
      </div>
    </div>
    )
  } else if (trigger === 'settings') {
    return (
      <div className="popup">
      <div className="popup-inner">
        <h3>Settings</h3>
        <button
          onClick={toggleMode}>
          Switch Mode
        </button>
        <button 
          className='close-popup'
          onClick={() => setPopup('none')}>
          Close
        </button>
      </div>
    </div>
    )
  } else if (trigger === 'win') {
    return (
      <div className="popup">
      <div className="popup-inner">
        <h3>You Win!</h3>
        <br />
        <p>Today's Stock: {todayStock.name}</p>
        <p>Guesses Used: {currAttempt}</p>
        <br />
        <p>{todayStock.summary}</p>
        <button 
          className='close-popup'
          onClick={() => setPopup('none')}>
          Close
        </button>
      </div>
    </div>
    )
  } else if (trigger === 'lose') {
    return (
      <div className="popup">
      <div className="popup-inner">
        <h3>You Lose!</h3>
        <br />
        <p>Today's Stock: {todayStock.name}</p>
        <br />
        <p>{todayStock.summary}</p>
        <button 
          className='close-popup'
          onClick={() => setPopup('none')}>
          Close
        </button>
      </div>
    </div>
    )
  } else {
    return ("")
  }
}

export default Popup