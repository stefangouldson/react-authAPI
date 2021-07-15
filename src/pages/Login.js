import React from 'react';
import apiClient from '../services/apiClient';

const Login = (props) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const resetForm = () =>{
        setEmail('');
        setPassword('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        apiClient.get('sanctum/csrf-cookie')
        .then(response =>{
            apiClient.post('api/login', {
                email: email,
                password: password
            }).then(response => {
                console.log(response)
                resetForm()
            });
        })
    }

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <h1 className="text-center text-4xl mb-10 pt-5">Login</h1>
            <form onSubmit={handleSubmit} className="mx-auto px-10">
                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required className="w-full text-lg py-1 px-2 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring focus:ring-opacity-50 rounded-md shadow-sm"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required className="w-full text-lg py-1 px-2 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring focus:ring-opacity-50 rounded-md shadow-sm"
                    />
                </div>
                <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-700 focus:border-blue-900 focus:border" type="submit">Login</button>
            </form>
        </div>
    );    
}

export default Login;