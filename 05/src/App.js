import React from "react";
import HomePage from "./HomePage";
import TasksList from "./TasksList";
import { HashRouter , Route, Switch } from "react-router-dom";

function App() {
  return (
    <HashRouter basename="/">
      <Switch>
        <Route exact path="/" component={TasksList} />
        <Route path="/home_page">
          <HomePage title="Strona główna" />  
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
