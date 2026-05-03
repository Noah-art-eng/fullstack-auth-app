import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from '../api/axios' // <-- Import the api instance

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const res = await api.post('/login', {
                username,
                password
            })

            if (res.data.success) {
                localStorage.setItem('token', res.data.token)
                navigate('/dashboard')
            } else {
                setMessage(res.data.message || 'Login failed')
            }
        } catch (err) {
            setMessage('Request error')
        }
    }

    const handleRegister = async () => {
        try {
            const res = await api.post('/register', {
                username,
                password
            })

            setMessage(res.data.message)
        } catch (err) {
            setMessage('Register request error')
        }
    }

    return (
        <div style={{ padding: 50 }}>
            <h2>Login</h2>

            <input
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>

            <p>{message}</p>
        </div>
    )
}

export default Login