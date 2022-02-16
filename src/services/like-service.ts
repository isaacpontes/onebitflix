import { Like } from "../models/like"

const likeService = {
  create: async (profile_id: number, course_id: number) => {
    const likeAlreadyExists = await Like.findOne({
      where: {
        profile_id,
        course_id
      }
    })

    if (likeAlreadyExists) {
      throw new Error('Este perfil já gostou deste curso')
    }

    const like = await Like.create({
      profile_id,
      course_id
    }, {
      fields: ['profile_id', 'course_id']
    })

    return like
  },

  delete: async (profile_id: string, course_id: string) => {
    await Like.destroy({
      where: {
        profile_id,
        course_id
      }
    })
  },

  isLiked: async (course_id: string | number, profile_id: string | number) => {
    const like = await Like.findOne({
      where: {
        course_id,
        profile_id
      }
    })

    return like ? true : false
  }
}

export { likeService }