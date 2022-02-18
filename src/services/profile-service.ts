import { Profile } from "../models"

const profileService = {
  findByUserId: async (user_id: number) => {
    const userProfiles = await Profile.findAll({
      attributes: ['id', 'name', 'avatar_url'],
      where: { user_id },
      order: [['created_at', 'ASC']]
    })
    return userProfiles
  },

  create: async (name: string, avatar_url: string, user_id: number) => {
    const profilesCount = await Profile.count({ where: { user_id } })

    if (profilesCount >= 4) {
      throw new Error('Número máximo de perfis atingido')
    }

    const profile = await Profile.create({
      name,
      avatar_url,
      user_id
    })

    return profile
  },

  updateOne: async (id: string, name: string, avatar_url: string) => {
    const [affectedRows, updatedProfiles] = await Profile.update({
      name,
      avatar_url
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
          'video_url',
          'seconds_long',
          'course_id'
        ]
      }
    })

    return watching
  }
}

export { profileService }