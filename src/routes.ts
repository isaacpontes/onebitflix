import express from 'express'
import { authController } from './controllers/auth-controller'
import { categoriesController } from './controllers/categories-controller'
import { coursesController } from './controllers/courses-controller'
import { episodesController } from './controllers/episodes-controller'

const router = express.Router()

router.post('/auth/register', authController.register)

router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)

router.get('/courses/featured', coursesController.featured)
router.get('/courses/search', coursesController.search)
router.get('/courses/:id', coursesController.show)

router.get('/episodes/stream', episodesController.stream)

export { router }