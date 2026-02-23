const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')

router.get('/profile', authMiddleware, (req, res) => {
    res.json({message: 'Rota protegida funcionando', userID: req.userId})
})

module.exports = router