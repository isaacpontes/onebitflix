import { Request, Response } from 'express'
import { getPaginationParams } from '../helpers/get-pagination-params'
import { courseService } from '../services/course-service'

const coursesController = {
  // GET /courses/:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const course = await courseService.findByIdWithEpisodes(id)
      return res.json(course)
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
  }
}

export { coursesController }