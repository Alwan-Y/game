import express from 'express'
import PostController from '../../controllers/PostController'

const router = express.Router()

router.get('/posts', PostController.get)
router.get('/compChoice', PostController.getCompChoice)
router.post('/posts', PostController.create)
router.delete('/posts/:id', PostController.delete)

export default router
