import { Request, Response } from 'express'
import { likeService } from '../services/like-service'

const likesController = {
  // POST /profiles/:profile_id/likes/:course_id
  save: async (req: Request, res: Response) => {
    const profile_id = Number(req.params.profile_id)
    const course_id = Number(req.params.course_id)

    try {
      const like = await likeService.create(profile_id, course_id)

      return res.status(201).json(like)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // DELETE /profiles/:profile_id/likes/:course_id
  delete: async (req: Request, res: Response) => {
    const { profile_id, course_id } = req.params

    try {
      await likeService.delete(profile_id, course_id)
      return res.status(204).send()
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
}

export { likesController }