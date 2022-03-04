import { WatchTime } from "../models"

const episodeService = {
  getWatchTime: async (userId: string | number, episodeId: string | number) => {
    const watchTime = await WatchTime.findOne({
      attributes: ['seconds'],
      where: {
        userId,
        episodeId
      }
    })

    return watchTime
  },

  setWatchTime: async (userId: number, episodeId: number, seconds: number) => {
    const watchTimeAlreadyExists = await WatchTime.findOne({
      where: {
        userId,
        episodeId
      }
    })

    if (watchTimeAlreadyExists) {
      watchTimeAlreadyExists.seconds = seconds
      await watchTimeAlreadyExists.save()
      return watchTimeAlreadyExists
    } else {
      const newWatchTime = await WatchTime.create({
        userId,
        episodeId,
        seconds
      })
      return newWatchTime
    }
  }
}

export { episodeService }