import React from "react";
import HomePage from "./components/HomePage";
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Switch>
    <Route exact path="/">
      <HomePage />
    </Route>
    <Route path="/">
      Page Does Not Exist
    </Route>
  </Switch>
  );
}

export default App;
