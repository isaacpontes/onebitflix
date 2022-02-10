import { Response } from "express";
import { RequestWithUser } from "../middlewares/auth";
import { profileService } from "../services/profile-service";

const profilesController = {
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
  }
}

export { profilesController }