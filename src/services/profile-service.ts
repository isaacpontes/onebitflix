import { Profile } from "../models"

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

  findWatchingEpisodes: async (id: string) => {
    const watching = await Profile.findByPk(id, {
      attributes: [],
      include: {
        association: 'episodes',
        attributes: [
          'id',
          'name',
          'synopsis',
          'order',
          ['video_url', 'videoUrl'],
          ['seconds_long', 'secondsLong'],
          ['course_id', 'courseId']
        ],
        through: {
          as: 'watchTime',
          attributes: ['seconds']
        }
      }
    })

    return watching
  }
}

export { profileService }