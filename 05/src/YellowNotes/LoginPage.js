import React from "react";
import User from "./User";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: "", password: "" };
    this.userService = props.userService;
  }

  handleChangeLogin = (event) => {
    this.setState({ login: event.target.value });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event, setUserCallback) => {
    event.preventDefault();
    const user = new User(this.state.login, this.state.password);
    if (this.userService.readUser(user)) {
      setUserCallback(user)
    } else {
      window.alert("Błędny login lub hasło!");
    }
  };

  render() {
    return (
      <UserContext.Consumer>
        {({ currentUser, setCurrentUser }) => (
          <form onSubmit={(event) => this.handleSubmit(event, setCurrentUser)}>
            <legend>Logowanie</legend>
            <div className="form-group">
              <label className="form-control-label">Nazwa użytkownika</label>
              <input
                value={this.state.login}
                onChange={this.handleChangeLogin}
                className="form-control"
                placeholder="Login"
                type="text"
                required
                minLength="3"
                maxLength="30"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label">Hasło</label>
              <input
                value={this.state.password}
                onChange={this.handleChangePassword}
                className="form-control"
                placeholder="Hasło"
                type="password"
                required
                minLength="3"
                maxLength="30"
              />
            </div>
            <div className="text-right">
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Zaloguj się
                </button>

                <Link to={`/yellow_notes/register`} className="btn btn-link">
                  Rejestracja
                </Link>
              </div>
            </div>
          </form>
        )}
      </UserContext.Consumer>
    );
  }
}
//

export default LoginPage;
