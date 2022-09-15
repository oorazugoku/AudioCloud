import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import CommentsPage from "./components/CommentsPage";
import { ModalProvider } from './components/context/Modal';
import HomePage from "./components/HomePage";
import Stream from "./components/Stream";
import Upload from "./components/Upload";
import UserNav from "./components/UserNav";
import UserPage from "./components/UserPage";
import * as sessionActions from "./store/session";
import { getUsers } from "./store/users";




function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(()=>{
    dispatch(getUsers())
  }, [])

  return (
  <ModalProvider>
    <BrowserRouter>
    {user && (<UserNav />)}
      <Switch>
        {/* <Route exact path='/userNav'>
          <UserNav />
        </Route> */}
        <Route exact path='/comments'>
          <CommentsPage />
        </Route>
        <Route exact path='/upload'>
          <Upload />
        </Route>
        <Route exact path='/home'>
          <UserPage />
        </Route>
        <Route exact path='/stream'>
          <Stream />
        </Route>
        <Route exact path='/'>
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  </ModalProvider>
  );
}

export default App;
