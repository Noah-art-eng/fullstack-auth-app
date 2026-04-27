const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 测试接口
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// 登录接口（后面扩展）
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === '123456') {
        res.json({ success: true, token: 'fake-jwt-token' });
    } else {
        res.json({ success: false, message: 'Invalid credentials' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});