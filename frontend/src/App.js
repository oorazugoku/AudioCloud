import React from "react";
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { ModalProvider } from './components/context/Modal';
import HomePage from "./components/HomePage";

function App() {
  return (
  <ModalProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route path="/">
          Page Does Not Exist
        </Route>
      </Switch>
    </BrowserRouter>
  </ModalProvider>
  );
}

export default App;
