import { Request, Response } from 'express'
import { likeService } from '../services/like-service'

const likesController = {
  // POST /profiles/:profileId/likes/:courseId
  save: async (req: Request, res: Response) => {
    const profileId = Number(req.params.profileId)
    const courseId = Number(req.params.courseId)

    try {
      const like = await likeService.create(profileId, courseId)

      return res.status(201).json(like)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // DELETE /profiles/:profileId/likes/:courseId
  delete: async (req: Request, res: Response) => {
    const { profileId, courseId } = req.params

    try {
      await likeService.delete(profileId, courseId)
      return res.status(204).send()
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
}

export { likesController }