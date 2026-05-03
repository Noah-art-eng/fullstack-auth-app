import { useState } from 'react'
import axios from 'axios'
const token = localStorage.getItem('token')
function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/login', {
        username,
        password
      })
      if (res.data.success) {
        setMsg('登录成功 ✅')
        localStorage.setItem('token', res.data.token)
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
  };

  return (
    <div style={{ padding: 50 }}>
      {token ? (
        <>
          <h2>已登录 ✅</h2>
          <button onClick={() => {
            localStorage.removeItem('token')
            window.location.reload()
          }}>
            Logout
          </button>
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