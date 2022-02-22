import { Request, Response } from 'express'
import { favoriteService } from '../services/favorite-service'

const favoritesController = {
  //GET /profiles/:profileId/favorites
  index: async (req: Request, res: Response) => {
    const { profileId } = req.params

    try {
      const favorites = await favoriteService.findByProfileId(profileId)
      return res.json(favorites)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // POST /profiles/:profileId/favorites/:courseId
  save: async (req: Request, res: Response) => {
    const profileId = Number(req.params.profileId)
    const courseId = Number(req.params.courseId)

    try {
      const favorite = await favoriteService.create(profileId, courseId)

      return res.status(201).json(favorite)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // DELETE /profiles/:profileId/favorites/:courseId
  delete: async (req: Request, res: Response) => {
    const { profileId, courseId } = req.params

    try {
      await favoriteService.delete(profileId, courseId)
      return res.status(204).send()
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
}

export { favoritesController }