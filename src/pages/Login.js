import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth';
import apiClient from '../services/apiClient';

const Login = (props) => {
    const dispatch = useDispatch()

    const email = useSelector(state => state.auth.email);
    const password = useSelector(state => state.auth.password);
    const error = useSelector(state => state.auth.error);
    const token = useSelector(state => state.auth.token);
    
    const setEmail = (e) => {
        dispatch(authActions.setEmail(e.target.value));
    }

    const setPassword = (e) => {
        dispatch(authActions.setPassword(e.target.value))
    }

    const setToken = (data) => {
        dispatch(authActions.setToken(data))
    }

    const setError = (value) => {
        dispatch(authActions.setError(value))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        apiClient.get('sanctum/csrf-cookie')
        .then(response =>{
            apiClient.post('api/login', {
                email: email,
                password: password
            }).then(res => {
                // console.log(res.data.token);
                setToken({token: res.data.token});
                console.log(token);
                dispatch(authActions.resetForm())
            }).catch(err => {
                console.error(err);
                setError(true);
            })         
        })
    }

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <h1 className="text-center text-4xl mb-10 pt-5">Login</h1>
            {error && <p className="text-center text-red-500 mb-3">Error on Login</p>}
            <form onSubmit={handleSubmit} className="mx-auto px-10">
                <div className="mb-4">
                    <input
                    type="email" name="email" placeholder="Email" value={email} onChange={setEmail}
                    required className="w-full text-lg py-1 px-2 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring focus:ring-opacity-50 rounded-md shadow-sm"
                    />
                </div>
                <div className="mb-4">
                    <input type="password" name="password" placeholder="Password" value={password} onChange={setPassword}
                    required className="w-full text-lg py-1 px-2 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring focus:ring-opacity-50 rounded-md shadow-sm"
                    />
                </div>
                <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-700 focus:border-blue-900 focus:border" type="submit">Login</button>
            </form>
        </div>
    );    
}

export default Login;