import { Course } from "../models"

const courseService = {
  findByIdWithEpisodes: async (id: string) => {
    const courseWithEpisodes = await Course.findByPk(id, {
      attributes: ['id', 'name', 'synopsis', 'thumbnail_url'],
      include: {
        association: 'episodes',
        attributes: ['id', 'name', 'synopsis', 'order', 'video_url', 'seconds_long'],
        order: [['order', 'ASC']]
      }
    })

    return courseWithEpisodes
  }
}

export { courseService }