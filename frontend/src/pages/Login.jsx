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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                <input
                    className="w-full border p-2 mb-3 rounded"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className="w-full border p-2 mb-3 rounded"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="w-full bg-blue-500 text-white p-2 rounded mb-2 hover:bg-blue-600"
                    onClick={handleLogin}
                >
                    Login
                </button>

                <button
                    className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                    onClick={handleRegister}
                >
                    Register
                </button>

                <p className="text-red-500 mt-2 text-center">{message}</p>
            </div>
        </div>
    )
}

export default Login