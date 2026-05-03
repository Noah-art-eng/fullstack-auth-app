const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : authHeader

    if (!token) {
        return res.status(401).json({ message: '未登录 ❌' })
    }

    try {
        const decoded = jwt.verify(token, 'secret-key')
        req.user = decoded
        next()
    } catch (err) {
        res.status(401).json({ message: 'token 无效 ❌' })
    }
}