import './Popup.css'

function Popup ({toggleMode, trigger, setPopup}) {
  if (trigger === 'instructions') {
    return (
      <div className="popup">
      <div className="popup-inner">
        <h3>Instructions</h3>
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
  } else {
    return ("")
  }
}

export default Popup