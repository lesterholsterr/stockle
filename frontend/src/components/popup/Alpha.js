import React from "react";
import "../../css/Popup.css";

function Alpha({ mode, trigger, setPopup }) {
  if (trigger === "alpha") {
    return (
      <div className="popup">
        <div className={`popup-inner ${mode} alpha-container`}>
          <h1 className="alpha-header">Alpha Testing</h1>
          <p>
            Hey, thanks for volunteering to help test Stockle! Here are a few
            things to know before getting started:
          </p>
          <ul>
            <li>
              Please{" "}
              <b>
                <a className="underline-btn" onClick={() => setPopup("register")}>
                  create an account
                </a>
              </b>{" "}
              before doing anything else. Or don't, if you enjoy things not
              working as intended.
            </li>
            <li>
              Please have the window on full screen. I haven't added any dynamic
              resizing.
            </li>
            <li>
              Your password is encrypted with SHA256 and I am unable to see it.
            </li>
            <li>
              Any feedback whatsoever is appreciated. Just fill out the form
              below or message me if you have my socials.
            </li>
          </ul>
          <button
            className="underline-btn"
            onClick={() => setPopup("instructions")}
          >
            <b>Great, how do I play?</b>
          </button>

          <h2>Feedback Form</h2>
          <form
            action="https://formsubmit.co/mattyang98@gmail.com"
            method="POST"
          >
            <input
              type="hidden"
              name="_subject"
              value="Website form submission"
            />
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="me@gmail.com"
                required
              />
            </div>
            <label>Message</label>
            <textarea
              type="text"
              name="message"
              rows="5"
              placeholder="Flame the fuck out of this website"
              required
            ></textarea>
            <button type="submit" className={`fancy-button-${mode}`}>
              Send
            </button>
          </form>
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

export default Alpha;
