import { Profile } from "../models"
import { EpisodeInstance } from "../models/episode"

function filterLastEpisodeFromEachCourse(episodes: EpisodeInstance[]) {
  const coursesOnList: number[] = []

  const lastEpisodes = episodes.reduce((currentList, episode) => {
    if (!coursesOnList.includes(episode.courseId)) {
      coursesOnList.push(episode.courseId)
      currentList.push(episode)
      return currentList
    }

    const episodeFromSameCourse = currentList.find(e => e.courseId === episode.courseId)

    if (episodeFromSameCourse!.order > episode.order) {
      return currentList
    }

    const listWithoutEpisodeFromSameCourse = currentList.filter(e => e.courseId !== episode.courseId)
    listWithoutEpisodeFromSameCourse.push(episode)

    return listWithoutEpisodeFromSameCourse
  }, [] as EpisodeInstance[])

  return lastEpisodes
}

const profileService = {
  findByUserId: async (userId: number) => {
    const userProfiles = await Profile.findAll({
      attributes: ['id', 'name', ['avatar_url', 'avatarUrl']],
      where: { userId },
      order: [['created_at', 'ASC']]
    })
    return userProfiles
  },

  create: async (name: string, avatarUrl: string, userId: number) => {
    const profilesCount = await Profile.count({ where: { userId } })

    if (profilesCount >= 4) {
      throw new Error('Número máximo de perfis atingido')
    }

    const profile = await Profile.create({
      name,
      avatarUrl,
      userId
    })

    return profile
  },

  updateOne: async (id: string, name: string, avatarUrl: string) => {
    const [affectedRows, updatedProfiles] = await Profile.update({
      name,
      avatarUrl
    }, {
      where: { id },
      returning: true
    })

    if (affectedRows === 0) {
      throw new Error('Perfil não encontrado')
    }

    return updatedProfiles[0]
  },

  deleteOne: async (id: string) => {
    await Profile.destroy({
      where: { id }
    })
  },

  getKeepWatchingList: async (id: string) => {
    const profileWithWatchingEpisodes = await Profile.findByPk(id, {
      attributes: [],
      include: {
        association: 'episodes',
        include: [{
          association: 'course'
        }],
        through: {
          as: 'watchTime'
        }
      }
    })

    if (!profileWithWatchingEpisodes) {
      throw new Error('Profile not found!')
    }

    const keepWatchingList = filterLastEpisodeFromEachCourse(profileWithWatchingEpisodes.episodes!)
    // @ts-ignore
    keepWatchingList.sort((a, b) => a.watchTime.updatedAt < b.watchTime.updatedAt ? 1 : -1)
    return keepWatchingList
  }
}

export { profileService }