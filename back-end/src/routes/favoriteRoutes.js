const express = require('express')
const router = express.Router()

const favoriteController = require('../controllers/favoriteController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, favoriteController.addFavorite)
router.get('/', authMiddleware, favoriteController.getFavorite)

module.exports = router