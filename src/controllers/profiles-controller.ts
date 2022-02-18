import { Request, Response } from "express";
import { RequestWithUser } from "../middlewares/auth";
import { profileService } from "../services/profile-service";

const profilesController = {
  // GET /profiles
  index: async (req: RequestWithUser, res: Response) => {
    const user_id = req.user!.id

    try {
      const profiles = await profileService.findByUserId(user_id)
      return res.json(profiles)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // POST /profiles
  save: async (req: RequestWithUser, res: Response) => {
    const { name, avatar_url } = req.body
    const user_id = req.user!.id

    try {
      const profile = await profileService.create(name, avatar_url, user_id)
      return res.status(201).json(profile)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // PUT /profiles/:id
  update: async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, avatar_url } = req.body

    try {
      const profile = await profileService.updateOne(id, name, avatar_url)
      return res.json(profile)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // DELETE /profiles/:id
  delete: async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      await profileService.deleteOne(id)
      return res.status(204).send()
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // GET /profiles/:id/watching
  watching: async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const watching = await profileService.findWatchingEpisodes(id)
      return res.json(watching)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
}

export { profilesController }