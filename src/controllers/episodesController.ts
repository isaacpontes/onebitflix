import { Request, Response } from 'express'
import { episodeService } from '../services/episodeService'

export const episodesController = {
  // GET /episodes/stream
  stream: async (req: Request, res: Response) => {
    const { videoUrl } = req.query
    const range = req.headers.range

    try {
      if (typeof videoUrl !== 'string') {
        throw new Error('videoUrl must be of type \'string\'');
      }

      episodeService.streamEpisodeToResponse(res, videoUrl, range)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // GET /episodes/:id/watch_time
  getWatchTime: async (req: Request, res: Response) => {
    const episodeId = Number(req.params.id)
    const { userId } = req.body

    try {
      const watchTime = await episodeService.getWatchTime(userId, episodeId)
      return res.json(watchTime)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // POST /episodes/:id/watch_time
  setWatchTime: async (req: Request, res: Response) => {
    const episodeId = Number(req.params.id)
    const { userId, seconds } = req.body

    try {
      const watchTime = await episodeService.setWatchTime(userId, episodeId, seconds)
      return res.json(watchTime)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
}