import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import { useEffect } from 'react';

import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    const isAuth = useSelector(state => state.auth.token)
    const dispatch  = useDispatch();

    // check local storage and state
    useEffect(() => {
        var token = localStorage.getItem('user-token')
        if(token && !isAuth){
            dispatch(authActions.setToken({
                token: JSON.stringify(token),
            }))
        }
    })

    const logoutHandler = () => {
        dispatch(authActions.logout())
      }

  return (
    <Router>
        {!isAuth && (
            <div className="w-full flex bg-blue-400 px-10">
                <NavLink activeClassName="underline" className="p-2 text-white font-semibold" to='/login'>Login</NavLink>
                <NavLink activeClassName="underline" className="p-2 text-white font-semibold" to='/register'>Register</NavLink>
            </div>
        )}
        {!!isAuth && (
            <div className="w-full flex bg-blue-400 px-10">
                <button onClick={logoutHandler} className="p-2 text-white font-semibold">Logout</button>
            </div>
        )}
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
        </Switch>
    </Router>
);
}

export default App;
