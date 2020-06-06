import React from "react";
import { HashRouter , Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import TasksList from "./TasksList";
import LightBulb from "./LightBulb";
import CommonPasswords from "./CommonPasswords";
import YellowNotes from "./YellowNotes/YellowNotes";

function App() {
  return (
    <HashRouter basename="/">
      <Switch>
        <Route exact path="/" component={TasksList} />
        <Route path="/home_page">
          <HomePage title="Strona główna" />  
        </Route>
        <Route path="/light_bulb">
          <LightBulb />  
        </Route>
        <Route path="/common_passwords">
          <CommonPasswords />  
        </Route>
        <Route path="/yellow_notes">
          <YellowNotes />  
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
