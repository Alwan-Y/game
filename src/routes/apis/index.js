import express from 'express'
import PostController from '../../controllers/PostController'

const router = express.Router()

router.get('/posts', PostController.get)
router.post('/posts', PostController.create)
router.patch('/posts/:id', PostController.update)
router.delete('/posts/:id', PostController.delete)

export default router
