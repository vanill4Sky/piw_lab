import React from "react";
import "../css/bootstrap.css";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isCollapsed: true };
  }

  handleClick = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  };

  handleLogout = (setCurrentUser) => {
    setCurrentUser({});
  }

  render() {
    return (
      <UserContext.Consumer>
        {({ currentUser, setCurrentUser }) => (
          <div className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/yellow_notes/" className="navbar-brand">
              Yellow Notes
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarColor02"
              onClick={this.handleClick}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className={`navbar-collapse ${
                this.state.isCollapsed ? "collapse" : ""
              }`}
              id="navbarColor02"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/yellow_notes/notes" className="nav-link">
                    Notatki
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/yellow_notes/login" className="nav-link">
                    Logowanie
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/yellow_notes/register" className="nav-link">
                    Rejestracja
                  </Link>
                </li>
              </ul>
              <div className={`${currentUser.login ? "" : "d-none"}`}>
                <span className="mr-4 text-info">{currentUser.login}</span>
                <button className="btn btn-secondary" type="submit" onClick={() => this.handleLogout(setCurrentUser)}>
                  Wyloguj się
                </button>
              </div>
            </div>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default Navbar;
