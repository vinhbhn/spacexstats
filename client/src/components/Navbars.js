import React from "react";

export default function NavBars() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        SpaceX
      </a>
      <button
        className="navbar-toggler collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor02"
        aria-controls="navbarColor02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor02">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/launches">
              Launches
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/history">
              History
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/ships">
              Ships
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/dragons">
              Dragons
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/landpads">
              LandingPad
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/payloads">
              Payloads
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
