import { useState } from 'react'
import axios from 'axios'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token'))
  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/login', {
        username,
        password
      })
      if (res.data.success) {
        localStorage.setItem('token', res.data.token)
        setToken(res.data.token)
        setMsg('登录成功 ✅')
      } else {
        setMsg('登录失败 ❌')
      }
    } catch (err) {
      setMsg('请求错误 ❌')
    }
  }

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:3000/register', {
        username,
        password
      });

      setMsg(res.data.message);
    } catch (err) {
      setMsg('注册请求错误 ❌');
    }
  }

  const getProfile = async () => {
    try {
      const token = localStorage.getItem('token')

      const res = await axios.get('http://localhost:3000/profile', {
        headers: {
          Authorization: token
        }
      })

      setUser(res.data)
    } catch (err) {
      setMsg('获取用户信息失败 ❌')
    }
  };

  return (
    <div style={{ padding: 50 }}>
      {token ? (
        <>
          <h2>已登录 ✅</h2>
          <button onClick={getProfile}>Get Profile</button>
          <button onClick={() => {
            localStorage.removeItem('token')
            setToken(null)
            setMsg('')
          }}>
            Logout
          </button>
          {user && (
            <div>
              <p>用户名: {user.username}</p>
              <p>ID: {user.id}</p>
              <p>注册时间: {new Date(user.createdAt).toLocaleString()}</p>
              <p>更新时间: {new Date(user.updatedAt).toLocaleString()}</p>
            </div>
          )}
        </>
      ) : (
        <>
          <h2>Login Demo</h2>

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
          <p>{msg}</p>
        </>
      )}
    </div>
  )
}

export default App