import { Request, Response } from 'express'
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
  }
}

export { coursesController }