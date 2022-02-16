import { Request, Response } from 'express'
import { getPaginationParams } from '../helpers/get-pagination-params'
import { courseService } from '../services/course-service'
import { likeService } from '../services/like-service'

const coursesController = {
  // GET /courses/:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params
    const { profile_id } = req.body

    try {
      const course = await courseService.findByIdWithEpisodes(id)

      if (course) {
        const liked = await likeService.isLiked(course.id, profile_id)
        return res.json({ ...course.get(), liked })
      } else {
        return res.status(404).json({ message: 'Curso não encontrado' })
      }
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  featured: async (req: Request, res: Response) => {
    try {
      const featuredCourses = await courseService.getRandomFeaturedCourses()
      return res.json(featuredCourses)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // GET /courses/search
  search: async (req: Request, res: Response) => {
    const { name } = req.body
    const [page, perPage] = getPaginationParams(req.query)

    try {
      const courses = await courseService.findByName(name, page, perPage)
      return res.json(courses)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // GET /courses/popular
  popular: async (req: Request, res: Response) => {
    try {
      const topTen = await courseService.getTopTenByLikes()
      return res.json(topTen)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
}

export { coursesController }