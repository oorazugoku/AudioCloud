import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, BrowserRouter, useHistory } from 'react-router-dom'
import AudioPlayer from "./components/AudioPlayer";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CommentsPage from "./components/CommentsPage";
import { ModalProvider } from './components/context/Modal';
import EditSong from "./components/EditSong";
import HomePage from "./components/HomePage";
import Stream from "./components/Stream";
import Upload from "./components/Upload";
import UserNav from "./components/UserNav";
import UserPage from "./components/UserPage";
import * as sessionActions from "./store/session";
import { getUsers } from "./store/users";


function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const song = useSelector(state => state.song);
  const [isLoaded, setIsLoaded] = useState(false);
  const check = Object.values(song)

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    // .then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(()=>{
    if (check.length > 0) setIsLoaded(true)
    if (user) setIsLoaded(true)
    if (!user && check.length == 0) setIsLoaded(false)
  }, [check, user])

  useEffect(()=>{
    dispatch(getUsers())
  }, [])

  return (
  <ModalProvider>
    <BrowserRouter>
    {user && (<UserNav exact path='/userNav'/>)}
    {isLoaded && (<AudioPlayer/>)}
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <ProtectedRoute exact path='/comments'>
          <CommentsPage />
        </ProtectedRoute>
        <ProtectedRoute exact path='/editSong'>
          <EditSong />
        </ProtectedRoute>
        <ProtectedRoute exact path='/upload'>
          <Upload />
        </ProtectedRoute>
        <ProtectedRoute exact path='/home'>
          <UserPage />
        </ProtectedRoute>
        <ProtectedRoute exact path='/stream'>
          <Stream />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  </ModalProvider>
  );
}

export default App;
