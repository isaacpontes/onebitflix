import { Like } from "../models/like"

const likeService = {
  create: async (profileId: number, courseId: number) => {
    const likeAlreadyExists = await Like.findOne({
      where: {
        profileId,
        courseId
      }
    })

    if (likeAlreadyExists) {
      throw new Error('Este perfil já gostou deste curso')
    }

    const like = await Like.create({
      profileId,
      courseId
    })

    return like
  },

  delete: async (profileId: string, courseId: string) => {
    await Like.destroy({
      where: {
        profileId,
        courseId
      }
    })
  },

  isLiked: async (courseId: string | number, profileId: string | number) => {
    const like = await Like.findOne({
      where: {
        courseId,
        profileId
      }
    })

    return like ? true : false
  }
}

export { likeService }