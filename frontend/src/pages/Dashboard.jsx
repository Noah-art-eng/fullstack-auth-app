import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from '../api/axios' // <-- Import the api instance

function Dashboard() {
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const getProfile = async () => {
        try {
            const token = localStorage.getItem('token')

            const res = await api.get('/profile', {
                headers: {
                    Authorization: token
                }
            })

            setUser(res.data)
        } catch (err) {
            setMessage('Failed to fetch user info')
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div style={{ padding: 50 }}>
            <h2>Dashboard</h2>

            <button onClick={getProfile}>Get Profile</button>
            <button onClick={handleLogout}>Logout</button>

            {user && (
                <div>
                    <p>Username: {user.username}</p>
                    <p>ID: {user.id}</p>
                    <p>Created: {new Date(user.createdAt).toLocaleString()}</p>
                    <p>Updated: {new Date(user.updatedAt).toLocaleString()}</p>
                </div>
            )}

            <p>{message}</p>
        </div>
    )
}

export default Dashboard