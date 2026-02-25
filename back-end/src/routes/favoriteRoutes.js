const express = require("express")
const router = express.Router()

const favoriteController = require("../controllers/favoriteController")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/", authMiddleware, favoriteController.add)
router.get("/", authMiddleware, favoriteController.list)
router.delete('/:id', authMiddleware, favoriteController.remove)

module.exports = router