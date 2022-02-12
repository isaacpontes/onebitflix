import { Request, Response } from 'express'
import { favoriteService } from '../services/favorite-service'
import { profileService } from '../services/profile-service'

const favoritesController = {
  //GET /profiles/:profile_id/favorites
  index: async (req: Request, res: Response) => {
    const { profile_id } = req.params

    try {
      const favorites = await favoriteService.findByProfileId(profile_id)
      return res.json(favorites)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // POST /profiles/:profile_id/favorites/:course_id
  save: async (req: Request, res: Response) => {
    const profile_id = Number(req.params.profile_id)
    const course_id = Number(req.params.course_id)

    try {
      const favoriteAlreadyExists = await favoriteService.findOne(profile_id, course_id)

      if (favoriteAlreadyExists) {
        throw new Error('Curso já existente na lista')
      }

      const favorite = await favoriteService.create(profile_id, course_id)

      return res.status(201).json(favorite)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  delete: async (req: Request, res: Response) => {
    const { profile_id, course_id } = req.params

    try {
      await favoriteService.delete(profile_id, course_id)
      return res.status(204).send()
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
}

export { favoritesController }