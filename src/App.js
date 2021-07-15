import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
        <div className="w-full flex bg-blue-400 px-3">
            <NavLink className="p-2 text-white font-semibold" to='/login'>Login</NavLink>
            <NavLink className="p-2 text-white font-semibold" to='/register'>Register</NavLink>
        </div>
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
        </Switch>
    </Router>
);
}

export default App;
