import React from "react";
import User from "./User";
import { Link } from "react-router-dom";

class RegisterPage extends React.Component {
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

  handleSubmit = (event) => {
    event.preventDefault();
    const newUser = new User(this.state.login, this.state.password);
    console.log(this.state.login, this.state.password);
    this.userService.createUser(newUser);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <legend>Rejestracja</legend>
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
              Zarejestruj się
            </button>
            <Link to={`/yellow_notes`} className="btn btn-link">
              Anuluj
            </Link>
          </div>
        </div>
      </form>
    );
  }
}
//

export default RegisterPage;
