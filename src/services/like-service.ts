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
  }
}

export { likeService }