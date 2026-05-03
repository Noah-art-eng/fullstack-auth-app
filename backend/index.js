const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('./middleware/auth')

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected ✅'))
    .catch(err => console.error('MongoDB error ❌', err))

// 测试接口
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// 登录接口（后面扩展）
app.post('/login', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (!user) {
        return res.json({ success: false, message: '用户不存在 ❌' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
        const token = jwt.sign(
            { userId: user._id },
            'secret-key',
            { expiresIn: '1d' }
        )

        res.json({ success: true, token })
    } else {
        res.json({ success: false, message: '密码错误 ❌' })
    }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body

    try {
        const existingUser = await User.findOne({ username })

        if (existingUser) {
            return res.json({ success: false, message: '用户已存在 ❌' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, password: hashedPassword })
        await user.save()

        res.json({ success: true, message: '注册成功 ✅' })
    } catch (err) {
        res.json({ success: false, message: '注册失败 ❌' })
    }
});

app.get('/profile', auth, async (req, res) => {
    const user = await User.findById(req.user.userId)

    if (!user) {
        return res.status(404).json({ message: '用户不存在 ❌' })
    }

    res.json({
        username: user.username,
        id: user._id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    })
})

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});