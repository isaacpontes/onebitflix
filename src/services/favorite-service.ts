import { Favorite } from "../models/favorite"

const favoriteService = {
  findByProfileId: async (profileId: string) => {
    const favorites = await Favorite.findAll({
      attributes: [['profile_id', 'profileId']],
      where: { profileId },
      include: {
        association: 'course',
        attributes: [
          'id',
          'name',
          'synopsis',
          ['thumbnail_url', 'thumbnailUrl'],
          'featured',
          ['category_id', 'categoryId']
        ]
      },
    })

    const courses = favorites.map(favorite => favorite.course)

    return {
      profileId,
      courses
    }
  },

  create: async (profileId: number, courseId: number) => {
    const favoriteAlreadyExists = await Favorite.findOne({
      where: {
        profileId,
        courseId
      }
    })

    if (favoriteAlreadyExists) {
      throw new Error('Curso já existente na lista')
    }

    const favorite = await Favorite.create({
      profileId,
      courseId
    })

    return favorite
  },

  delete: async (profileId: string, courseId: string) => {
    await Favorite.destroy({
      where: {
        profileId,
        courseId
      }
    })
  }
}

export { favoriteService }