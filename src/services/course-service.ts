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
  },

  getRandomFeaturedCourses: async () => {
    const featuredCourses = await Course.findAll({
      attributes: ['id', 'name', 'synopsis', 'thumbnail_url'],
      where: {
        featured: true
      }
    })

    const randomFeaturedCourses = featuredCourses.sort(() => 0.5 - Math.random())

    return randomFeaturedCourses.slice(0, 4)
  }
}

export { courseService }