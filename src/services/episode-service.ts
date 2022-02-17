import { WatchTime } from "../models"

const episodeService = {
  getWatchTime: async (profileId: string | number, episodeId: string | number) => {
    const watchTime = await WatchTime.findOne({
      attributes: ['seconds'],
      where: {
        profileId,
        episodeId
      }
    })

    return watchTime
  },

  setWatchTime: async (profileId: number, episodeId: number, seconds: number) => {
    const watchTimeAlreadyExists = await WatchTime.findOne({
      where: {
        profileId,
        episodeId
      }
    })

    if (watchTimeAlreadyExists) {
      watchTimeAlreadyExists.seconds = seconds
      await watchTimeAlreadyExists.save()
      return watchTimeAlreadyExists
    } else {
      const newWatchTime = await WatchTime.create({
        profileId,
        episodeId,
        seconds
      })
      return newWatchTime
    }
  }
}

export { episodeService }