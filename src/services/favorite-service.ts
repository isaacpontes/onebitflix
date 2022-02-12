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

  findOne:async (profile_id: number, course_id: number) => {
    const favorite = await Favorite.findOne({
      where: {
        profile_id,
        course_id
      }
    })

    return favorite
  },

  create: async (profile_id: number, course_id: number) => {
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