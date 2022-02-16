import { Op, Sequelize } from 'sequelize'
import { Course } from '../models'

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
  },

  getTopTenByLikes: async () => {
    const results = await Course.sequelize?.query(
      `SELECT
        courses.id,
        courses.name,
        courses.synopsis,
        courses.thumbnail_url,
        COUNT(profiles.id) AS likes
      FROM courses
        LEFT OUTER JOIN likes
          ON courses.id = likes.course_id
          INNER JOIN profiles
            ON profiles.id = likes.profile_id
      GROUP BY courses.id
      ORDER BY likes DESC
      LIMIT 10;`
    )

    if (results) {
      const [topTen, metada] = results
      return topTen
    } else {
      return null
    }
  },

  findByName: async (name: string, page: number, perPage: number) => {
    const offset = (page - 1) * perPage

    const { count, rows } = await Course.findAndCountAll({
      attributes: ['id', 'name', 'synopsis', 'thumbnail_url'],
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      limit: perPage,
      offset
    })

    return {
      courses: rows,
      page,
      perPage,
      total: count
    }
  }
}

export { courseService }