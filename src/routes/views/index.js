import express from 'express'
import PostController from '../../controllers/PostController'

const router = express.Router()

router.get('/index', PostController.getIndexView)

export default router
