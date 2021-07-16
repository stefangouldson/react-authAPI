import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import { useEffect } from 'react';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import About from './pages/About';

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
        dispatch(authActions.logout());
      }

  return (
    <Router>
        <div className="w-full flex bg-blue-400 px-10">
            <NavLink exact activeClassName="underline" className="p-2 text-white font-semibold" to='/'>Home</NavLink>

        {!isAuth && (
                <React.Fragment>
                    <NavLink activeClassName="underline" className="p-2 text-white font-semibold" to='/login'>Login</NavLink>
                    <NavLink activeClassName="underline" className="p-2 text-white font-semibold" to='/register'>Register</NavLink>
                </React.Fragment>
        )}
        {!!isAuth && (
            <React.Fragment>
                <NavLink activeClassName="underline" className="p-2 text-white font-semibold" to='/about'>About</NavLink>
                <button onClick={logoutHandler} className="p-2 text-white font-semibold ml-auto">Logout</button>
            </React.Fragment>

        )}
        </div>
        
        <Switch>
        <Route path='/' component={Home} exact />

        <Route path='/login'>
            {!isAuth && <Login /> }
            {!!isAuth && <Redirect to='/' />}
        </Route>
        <Route path='/register'>
            {!isAuth &&<Register /> }
            {!!isAuth && <Redirect to='/' />}
        </Route>
        
        <Route path='/about' exact>
            {!!isAuth && <About />}
            {!isAuth && <Redirect to='/login' />}
        </Route>
        
        </Switch>

        <Route path="*">
            <Redirect to='/' />
        </Route>
    </Router>
    );
}

export default App;
