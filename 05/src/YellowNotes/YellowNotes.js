import React from "react";
import "../css/bootstrap.css";
import User from "./User";
import RegisterPage from "./RegisterPage";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import Navbar from "./Navbar";
import { UserContext } from "./UserContext";
import UserService from "./UserSerivce";
import HomePage from "./HomePage";

class YellowNotes extends React.Component {
  constructor(props) {
    super(props);
    this.userService = new UserService("users");

    this.setCurrentUser = (user) => {
      this.setState({ currentUser: user });
    };

    this.state = {
      currentUser: {},
      setCurrentUser: this.setCurrentUser,
    };
  }

  register = () => {
    this.userService.createUser(new User("test", "test123"));
  };

  render() {
    return (
      <UserContext.Provider value={this.state}>
        <Navbar />
        <div className="container my-3">
          <Switch>
            <Route exact path={"/yellow_notes/"}>
              <HomePage />
            </Route>
            <Route path={"/yellow_notes/register"}>
              <RegisterPage userService={this.userService} />
            </Route>
            <Route path={"/yellow_notes/login"}>
              <LoginPage userService={this.userService} />
            </Route>
          </Switch>
        </div>
      </UserContext.Provider>
    );
  }
}

export default YellowNotes;
