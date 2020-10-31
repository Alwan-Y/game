import express from 'express'
import PostController from '../../controllers/PostController'

const router = express.Router()

router.get('/game', PostController.getGameView)
router.get('/homePage', PostController.getHomePageView)

export default router
