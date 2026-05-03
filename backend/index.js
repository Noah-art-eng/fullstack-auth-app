const express = require('express');
const cors = require('cors');
const app = express();
const users = []; // 模拟数据库存储用户信息

app.use(cors());
app.use(express.json());

// 测试接口
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// 登录接口（后面扩展）
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // 这里简单返回一个固定的 token，实际项目中应该使用 JWT 或其他方式生成
        res.json({ success: true, token: 'fake-jwt-token' });
    } else {
        res.json({ success: false, message: 'Invalid username or password' });
    }
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
        return res.json({ success: false, message: 'Username already exists' });
    }
    users.push({ username, password });
    res.json({ success: true, message: 'Registration successful' });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});