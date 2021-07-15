import React from 'react';
import apiClient from '../services/apiClient';

const Login = (props) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        apiClient.get('sanctum/csrf-cookie')
        .then(response =>{
            apiClient.post('api/login', {
                email: email,
                password: password
            }).then(response => {
                console.log(response)
            });
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-box">
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );    
}

export default Login;