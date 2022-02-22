import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { episodeService } from '../services/episode-service'

const episodesController = {
  // GET /episodes/stream
  stream: async (req: Request, res: Response) => {
    const { videoUrl } = req.query

    try {
      if (typeof videoUrl !== 'string') {
        throw new Error('videoUrl must be of type \'string\'');
      }

      const filePath = path.join(__dirname, '../../uploads', videoUrl)
      const fileStat = fs.statSync(filePath)

      const range = req.headers.range

      if (range) {

        const parts = range.replace(/bytes=/, '').split('-')

        const start = parseInt(parts[0], 10)
        const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1

        const chunkSize = (end - start) + 1

        const file = fs.createReadStream(filePath, { start, end })

        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': 'video/mp4',
        }

        res.writeHead(206, head)

        file.pipe(res)

      } else {

        const head = {
          'Content-Length': fileStat.size,
          'Content-Type': 'video/mp4',
        }

        res.writeHead(200, head)

        fs.createReadStream(filePath).pipe(res)

      }

    } catch (err) {

      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }

    }
  },

  // GET /episodes/:id/watch_time
  getWatchTime: async (req: Request, res: Response) => {
    const episodeId = Number(req.params.id)
    const { profileId } = req.body

    try {
      const watchTime = await episodeService.getWatchTime(profileId, episodeId)
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
    const { profileId, seconds } = req.body

    try {
      const watchTime = await episodeService.setWatchTime(profileId, episodeId, seconds)
      return res.json(watchTime)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
}

export { episodesController }