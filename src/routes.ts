import express from 'express'
import { categoriesController } from './controllers/categories-controller'
import { coursesController } from './controllers/courses-controller'

const router = express.Router()

router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)

router.get('/courses/featured', coursesController.featured)
router.get('/courses/:id', coursesController.show)

export { router }