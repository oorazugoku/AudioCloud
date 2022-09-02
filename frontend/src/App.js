import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { ModalProvider } from './components/context/Modal';
import HomePage from "./components/HomePage";
import UserNav from "./components/UserNav";
import * as sessionActions from "./store/session";





function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
  <ModalProvider>
    <BrowserRouter>
      <Switch>
        {isLoaded && (<Route exact path='/userNav'>
          <UserNav />
        </Route>)}
        <Route exact path='/'>
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  </ModalProvider>
  );
}

export default App;
