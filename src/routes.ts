import express from 'express'
import { authController } from './controllers/auth-controller'
import { categoriesController } from './controllers/categories-controller'
import { coursesController } from './controllers/courses-controller'
import { episodesController } from './controllers/episodes-controller'
import { profilesController } from './controllers/profiles-controller'
import { ensureAuth, ensureAuthViaQuery } from './middlewares/auth'

const router = express.Router()

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.get('/categories', ensureAuth, categoriesController.index)
router.get('/categories/:id', ensureAuth, categoriesController.show)

router.get('/courses/featured', ensureAuth, coursesController.featured)
router.get('/courses/search', ensureAuth, coursesController.search)
router.get('/courses/:id', ensureAuth, coursesController.show)

router.get('/episodes/stream', ensureAuthViaQuery, episodesController.stream)

router.get('/profiles', ensureAuth, profilesController.index)
router.post('/profiles', ensureAuth, profilesController.save)
router.put('/profiles/:id', ensureAuth, profilesController.update)
router.delete('/profiles/:id', ensureAuth, profilesController.delete)

export { router }