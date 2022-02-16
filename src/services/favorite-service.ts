import { Favorite } from "../models/favorite"

const favoriteService = {
  findByProfileId: async (profile_id: string) => {
    const favorites = await Favorite.findAll({
      attributes: ['profile_id'],
      where: { profile_id },
      include: 'course'
    })

    const courses = favorites.map(favorite => favorite.course)

    return {
      profile_id,
      courses
    }
  },

  create: async (profile_id: number, course_id: number) => {
    const favoriteAlreadyExists = await Favorite.findOne({
      where: {
        profile_id,
        course_id
      }
    })

    if (favoriteAlreadyExists) {
      throw new Error('Curso já existente na lista')
    }

    const favorite = await Favorite.create({
      profile_id,
      course_id
    }, {
      fields: ['profile_id', 'course_id']
    })

    return favorite
  },

  delete: async (profile_id: string, course_id: string) => {
    await Favorite.destroy({
      where: {
        profile_id,
        course_id
      }
    })
  }
}

export { favoriteService }