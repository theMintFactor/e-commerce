import { Route, Switch } from 'react-router-dom';
import React, {useEffect} from 'react';
import { ToastContainer } from 'react-toastify';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Header from './components/nav/Header';

import 'react-toastify/dist/ReactToastify.css';
import RegisterComplete from './pages/auth/RegisterComplete';

import {auth} from './firebase';
import {useDispatch} from 'react-redux';


function App() {
  const dispatch = useDispatch();

  //to check firebase auth state
  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged(async (user)=>{
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        console.log('user' ,user);

        dispatch({
          type:"LOGGED_IN_USER",
          payload: {
            email:user.email,
            token: idTokenResult.token,
          }
        })
      }
    });
    //clean up
    return ()=> unsubscribe();

  },[])

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
      </Switch>
    </>
  );
}

export default App;
