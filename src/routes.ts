import express from 'express'
import { authController } from './controllers/auth-controller'
import { categoriesController } from './controllers/categories-controller'
import { coursesController } from './controllers/courses-controller'
import { episodesController } from './controllers/episodes-controller'
import { favoritesController } from './controllers/favorites-controller'
import { likesController } from './controllers/likes-controller'
import { profilesController } from './controllers/profiles-controller'
import { usersController } from './controllers/users-controller'
import { ensureAuth, ensureAuthViaQuery } from './middlewares/auth'

const router = express.Router()

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.get('/account', ensureAuth, usersController.show)
router.put('/account', ensureAuth, usersController.update)
router.put('/account/password', ensureAuth, usersController.updatePassword)

router.get('/categories', ensureAuth, categoriesController.index)
router.get('/categories/:id', ensureAuth, categoriesController.show)

router.get('/courses/featured', ensureAuth, coursesController.featured)
router.get('/courses/newest', ensureAuth, coursesController.newest)
router.get('/courses/popular', ensureAuth, coursesController.popular)
router.get('/courses/search', ensureAuth, coursesController.search)
router.get('/courses/:id', ensureAuth, coursesController.show)

router.get('/episodes/stream', ensureAuthViaQuery, episodesController.stream)
router.get('/episodes/:id/watchTime', ensureAuth, episodesController.getWatchTime)
router.post('/episodes/:id/watchTime', ensureAuth, episodesController.setWatchTime)

router.get('/profiles', ensureAuth, profilesController.index)
router.get('/profiles/:id/watching', ensureAuth, profilesController.watching)
router.post('/profiles', ensureAuth, profilesController.save)
router.put('/profiles/:id', ensureAuth, profilesController.update)
router.delete('/profiles/:id', ensureAuth, profilesController.delete)

router.get('/profiles/:profileId/favorites', ensureAuth, favoritesController.index)
router.post('/profiles/:profileId/favorites/:courseId', ensureAuth, favoritesController.save)
router.delete('/profiles/:profileId/favorites/:courseId', ensureAuth, favoritesController.delete)

router.post('/profiles/:profileId/likes/:courseId', ensureAuth, likesController.save)
router.delete('/profiles/:profileId/likes/:courseId', ensureAuth, likesController.delete)


export { router }