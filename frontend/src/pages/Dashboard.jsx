import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from '../api/axios' // <-- Import the api instance


function Dashboard() {
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)


    const getProfile = async () => {
        try {
            setLoading(true)

            const res = await api.get('/profile')
            setUser(res.data)

        } catch (err) {
            setMessage('Failed to fetch user info')
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Dashboard</h2>

                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={getProfile}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Get Profile'}
                </button>

                {user && (
                    <div className="mt-6 border rounded p-4 bg-gray-50">
                        <h3 className="text-lg font-semibold mb-3">User Profile</h3>
                        <p><span className="font-medium">Username:</span> {user.username}</p>
                        <p><span className="font-medium">ID:</span> {user.id}</p>
                        <p><span className="font-medium">Created:</span> {new Date(user.createdAt).toLocaleString()}</p>
                        <p><span className="font-medium">Updated:</span> {new Date(user.updatedAt).toLocaleString()}</p>
                    </div>
                )}

                {message && (
                    <p className="text-red-500 mt-4">{message}</p>
                )}
            </div>
        </div>
    )
}

export default Dashboard